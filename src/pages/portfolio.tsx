import fs from "fs/promises";
import { basename, dirname, extname, join } from "path";
import klaw from "klaw";
import matter from "gray-matter";
import type { GetStaticProps } from "next";
import { parseMarkdown } from "../util/markdown";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions, SafeAreaView, ScrollView } from "react-native";
import Masonry from "@react-native-seoul/masonry-list";
import type { Offset } from "../types/interface";
import type { Item } from "../types/portfolio";
import Header from "../components/header";
import Footer from "../components/footer";
import PortfolioCard from "../components/card";

const Portfolio: React.FC<{ items: { [key: string]: Item } }> = ({
	items,
}) => {
	const { width } = useWindowDimensions();
	const offset = useRef<{
		offset: Offset;
		callback: (offset: Offset) => void;
	}>({
		offset: { dir: 0, x: 0, y: 0 },
		callback: () => {},
	});
	const [columns, setColumns] = useState(1);

	useEffect(
		() => setColumns(Math.max(1, Math.floor((width - 100) / 350))),
		[width],
	);

	const renderItem = useCallback(
		({ item: [key, item], i }: { item: [string, Item]; i: number }) => {
			return <PortfolioCard item={item} />;
		},
		[],
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView
				stickyHeaderIndices={[0]}
				nestedScrollEnabled={true}
				onScroll={(ev) => {
					offset.current.offset = {
						...ev.nativeEvent.contentOffset,
						dir:
							ev.nativeEvent.contentOffset.y -
							offset.current.offset.y,
					};
					offset.current.callback(offset.current.offset);
				}}
				scrollEventThrottle={100}>
				<Header setter={(fn) => (offset.current.callback = fn)} />
				<Masonry
					data={Object.entries(items)}
					renderItem={renderItem}
					contentContainerStyle={{
						alignItems: "center",
						marginVertical: 50,
					}}
					numColumns={columns}
				/>
				<Footer />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Portfolio;

export const getStaticProps: GetStaticProps = async () => {
	const dir = join(process.cwd(), "content/portfolio");
	const items: Record<string, Item> = {};
	const tags: Set<string> = new Set();
	for await (const { path, stats } of klaw(dir, { depthLimit: 2 })) {
		if (stats.isFile()) {
			const key = basename(dirname(path));
			const lang = basename(path, extname(path));
			const matt = matter(await fs.readFile(path, "utf8"));
			const root = parseMarkdown(matt.content);
			if (items[key]) {
				items[key][lang] = {
					...matt.data,
					tags: matt.data.tags?.split(" "),
					root,
				} as any;
			} else {
				items[key] = {
					[lang]: {
						...matt.data,
						tags: matt.data.tags?.split(" "),
						root,
					} as any,
				};
			}
			matt.data.tags.split(" ").forEach((t: string) => tags.add(t));
		}
	}
	return { props: { items } };
};

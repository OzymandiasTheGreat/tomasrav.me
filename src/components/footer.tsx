import React from "react";
import Link from "next/link";
import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { A, Footer, P } from "@expo/html-elements";
import Icon from "@mdi/react";
import { mdiCopyright } from "@mdi/js";
import {
	COLOR_SITE_BG,
	COLOR_TEXT_BG,
	FONT_LINK_R,
	setOpacity,
	STYLE_BODY,
} from "../theme";

const SiteFooter: React.FC = () => {
	const { t } = useTranslation();
	const { query } = useLanguageQuery();

	return (
		<Footer
			style={{
				alignItems: "center",
				justifyContent: "space-around",
				width: "100%",
				height: 250,
				backgroundColor: setOpacity(COLOR_SITE_BG, 0.75),
				paddingVertical: 45,
			}}>
			<P style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
				{t("footer.license")}
				<A
					href="https://creativecommons.org/licenses/by/4.0/"
					style={[FONT_LINK_R]}>
					CC-BY 4.0
				</A>
			</P>
			<P style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
				<Icon
					path={mdiCopyright}
					color={COLOR_TEXT_BG}
					size="24px"
					title={"Copyright"}
					style={{ verticalAlign: "middle", marginRight: 15 }}
				/>
				{t("footer.copyright")}
			</P>
			<P style={[STYLE_BODY, { color: COLOR_TEXT_BG }]}>
				<Link passHref href={{ pathname: "/credits", query }}>
					<A style={[FONT_LINK_R]}>{t("footer.third-party")}</A>
				</Link>
			</P>
		</Footer>
	);
};

export default SiteFooter;

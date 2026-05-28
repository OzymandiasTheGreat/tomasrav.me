import MDI from "@expo/vector-icons/MaterialCommunityIcons"
import { FetchOptions } from "@ozymandiasthegreat/supafetch"
import useFetch from "@ozymandiasthegreat/use-fetch"
import { Link } from "expo-router"
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import {
  ActivityIndicator,
  type ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native"
import Animated, {
  type SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated"

import API from "@/assets/content/showcase.json"
import { useHomeStrings } from "@/hooks/use-content"
import { createThemedStylesheet } from "@/hooks/use-theme"

const DUPLICATE_ITEMS = 3
const VISIBLE_LENGTH = API.content.length
const ITEMS_START = DUPLICATE_ITEMS
const ITEMS_END = VISIBLE_LENGTH + DUPLICATE_ITEMS
const EDGE_THRESHOLD = 0.15

const fetchOptions: FetchOptions<any> = {
  cache: { duration: "1h" },
  limits: [
    { requests: 1, duration: "1s" },
    { requests: 30, duration: "1m" },
  ],
  retry: {
    attempts: 5,
    delay: "30s",
    status: [
      [429, 429],
      [500, 599],
    ],
  },
}

type GithubResponse = {
  description: string
  stargazers_count: number
}

type NPMResponse = {
  downloads: number
}

type CratesResponse = {
  version_downloads: [{ version: number; downloads: number }]
}

type PyPIResponse = {
  value: string
}

type CarouselItem = {
  id: string
  github: string
  npm?: string
  crate?: string
  pypi?: string
}

const CarouselItem: React.FC<{
  item: CarouselItem
  width: number
  index: number
  offset: SharedValue<number>
}> = ({ item, index, width, offset }) => {
  const strings = useHomeStrings()
  const styles = useStyles()
  const { width: windowWidth, height: windowHeight, scale } = useWindowDimensions()
  const contentWidth = useMemo(() => {
    const landscape = windowWidth > windowHeight
    const percentage = landscape ? 0.175 : 0.3
    return windowWidth * percentage * scale
  }, [scale, windowHeight, windowWidth])
  const animatedStyle = useAnimatedStyle(() => {
    const itemCenter = index * width + width * 0.5
    const distance = Math.abs(itemCenter - (offset.value + windowWidth / 2)) / windowWidth
    const opacity = interpolate(distance, [0, 0.6], [1, 0], "clamp")
    const scale = interpolate(distance, [0, 0.6], [1.25, 0.75], "clamp")

    return { opacity, transform: [{ scale }] }
  })

  const [githubResponse, githubLoading] = useFetch<GithubResponse>(
    API.endpoint.github.uri.replace(API.endpoint.github.slug, item.github),
    { headers: API.endpoint.github.headers },
    fetchOptions,
  )
  const [npmResponse, npmLoading] = useFetch<NPMResponse>(
    item.npm ? API.endpoint.npm.uri.replace(API.endpoint.npm.package, item.npm) : null,
    undefined,
    fetchOptions,
  )
  const [cratesResponse, cratesLoading] = useFetch<CratesResponse>(
    item.crate ? API.endpoint.crates.uri.replace(API.endpoint.crates.crate, item.crate) : null,
    undefined,
    fetchOptions,
  )
  const [pypiResponse, pypiLoading] = useFetch<PyPIResponse>(
    item.pypi ? API.endpoint.pypi.uri.replace(API.endpoint.pypi.package, item.pypi) : null,
    { headers: API.endpoint.pypi.headers },
    fetchOptions,
  )

  const cratesDownloads = useMemo(() => {
    if (!cratesResponse || !cratesResponse.version_downloads) return -1

    return cratesResponse.version_downloads.reduce((acc, i) => acc + i.downloads, 0)
  }, [cratesResponse])
  const pypiDownloads = useMemo(() => {
    if (!pypiResponse) return -1

    const match = [...pypiResponse.value.matchAll(new RegExp(API.endpoint.pypi.regex, "g"))][0]

    if (!match) return -1

    const [, downloads, multiplier] = match

    return (
      parseFloat(downloads) * (multiplier === "k" ? 1_000 : multiplier === "M" ? 1_000_000 : 1)
    )
  }, [pypiResponse])

  return (
    <Animated.View style={[styles.itemContainer, { width }, animatedStyle]}>
      <View style={[styles.itemContent, { width: contentWidth }]}>
        {githubLoading || npmLoading || cratesLoading || pypiLoading ? (
          <ActivityIndicator animating size={128} color={styles.itemLoading.color} />
        ) : (
          <>
            <Text style={styles.itemDescription}>{githubResponse?.description}</Text>
            <Link
              href={`https://github.com/${item.github}`}
              target="_blank"
              style={styles.itemRepository}
            >
              {`https://github.com/${item.github}`}
            </Link>
            <View style={styles.itemStatsContainer}>
              <Link
                href={`https://github.com/${item.github}`}
                target="_blank"
                style={styles.itemStatsLink}
              >
                <MDI
                  name="github"
                  size={24}
                  color={styles.itemStatsIcon.color}
                  style={styles.itemStatsIcon}
                />
                {`${githubResponse?.stargazers_count ?? -1} ${strings.stars}`}
              </Link>

              {npmResponse && (
                <Link
                  href={`https://npmjs.com/package/${item.npm}`}
                  target="_blank"
                  style={styles.itemStatsLink}
                >
                  <MDI
                    name="npm"
                    size={24}
                    color={styles.itemStatsIcon.color}
                    style={styles.itemStatsIcon}
                  />
                  {`${npmResponse.downloads} ${strings.downloads}`}
                </Link>
              )}

              {cratesResponse && (
                <Link
                  href={`https://crates.io/package/${item.crate}`}
                  target="_blank"
                  style={styles.itemStatsLink}
                >
                  <MDI
                    name="language-rust"
                    size={24}
                    color={styles.itemStatsIcon.color}
                    style={styles.itemStatsIcon}
                  />
                  {`${cratesDownloads} ${strings.downloads}`}
                </Link>
              )}

              {pypiResponse && (
                <Link
                  href={`https://pypi.org/package/${item.pypi}`}
                  target="_blank"
                  style={styles.itemStatsLink}
                >
                  <MDI
                    name="language-python"
                    size={24}
                    color={styles.itemStatsIcon.color}
                    style={styles.itemStatsIcon}
                  />
                  {`${pypiDownloads} ${strings.downloads}`}
                </Link>
              )}
            </View>
          </>
        )}
      </View>
    </Animated.View>
  )
}

const CarouselIndicator: React.FC<{
  index: number
  active: number
  flatList: React.RefObject<Animated.FlatList | null>
}> = ({ active, index, flatList }) => {
  const styles = useStyles()
  const scrollToItem = useCallback(() => {
    flatList.current?.scrollToIndex({
      animated: false,
      index: index + DUPLICATE_ITEMS + (active < index ? -1 : 1),
      viewPosition: 0.5,
    })
    flatList.current?.scrollToIndex({
      animated: true,
      index: index + DUPLICATE_ITEMS,
      viewPosition: 0.5,
    })
  }, [index, flatList])

  return (
    <Pressable
      onPress={scrollToItem}
      style={[styles.indicator, index === active && styles.indicatorActive]}
    />
  )
}

export default function Carousel() {
  const strings = useHomeStrings()
  const styles = useStyles()
  const flatList = useRef<Animated.FlatList>(null)
  const [visibleIndex, setVisibleIndex] = useState(0)
  const items = useMemo<CarouselItem[]>(() => {
    const unique = API.content.map((item) => ({
      ...item,
      id: `unique-${item.github}`,
    }))
    const prepend = API.content.slice(VISIBLE_LENGTH - DUPLICATE_ITEMS).map((item) => ({
      ...item,
      id: `prepend-${item.github}`,
    }))
    const append = API.content.slice(0, DUPLICATE_ITEMS).map((item) => ({
      ...item,
      id: `append-${item.github}`,
    }))

    return [...prepend, ...unique, ...append]
  }, [])

  const { width: windowWidth, height: windowHeight, scale } = useWindowDimensions()
  const itemWidth = useMemo(() => {
    const landscape = windowWidth > windowHeight
    const percentage = landscape ? 0.25 : 0.4

    return windowWidth * percentage * scale
  }, [scale, windowHeight, windowWidth])
  const offset = useSharedValue(itemWidth * (DUPLICATE_ITEMS - 1) * 0.5)

  const keyExtractor = useCallback((item: CarouselItem) => item.id, [])
  const renderItem = useCallback<ListRenderItem<CarouselItem>>(
    ({ item, index }) => (
      <CarouselItem item={item} index={index} width={itemWidth} offset={offset} />
    ),
    [itemWidth],
  )
  const getItemLayout = useCallback(
    (_: ArrayLike<CarouselItem> | null | undefined, index: number) => ({
      length: itemWidth,
      offset: itemWidth * index,
      index,
    }),
    [itemWidth],
  )

  useEffect(() => {
    const timeout = setInterval(() => {
      const index = visibleIndex + DUPLICATE_ITEMS + 1

      if (!visibleIndex) {
        flatList.current?.scrollToIndex({
          animated: false,
          index: index - 1,
          viewPosition: 0.5,
        })
      }

      flatList.current?.scrollToIndex({
        animated: true,
        index,
        viewPosition: 0.5,
      })
    }, 5_000)

    return () => clearInterval(timeout)
  }, [visibleIndex])

  const onEdgeReached = useCallback(
    ({
      distanceFromStart,
      distanceFromEnd,
    }: {
      distanceFromStart?: number
      distanceFromEnd?: number
    }) => {
      if (distanceFromStart) {
        flatList.current?.scrollToOffset({
          animated: false,
          offset: itemWidth * VISIBLE_LENGTH + distanceFromStart,
        })
      }

      if (distanceFromEnd) {
        flatList.current?.scrollToOffset({
          animated: false,
          offset: itemWidth * (VISIBLE_LENGTH - 1) - distanceFromEnd,
        })
      }
    },
    [itemWidth],
  )
  const onScroll = useAnimatedScrollHandler({
    onScroll(event) {
      const contentOffset = event.contentOffset.x
      let visibleIndex = Math.round((contentOffset + itemWidth * 0.5) / itemWidth)

      if (visibleIndex < ITEMS_START) {
        visibleIndex += VISIBLE_LENGTH - DUPLICATE_ITEMS
      } else if (visibleIndex >= ITEMS_END) {
        visibleIndex -= VISIBLE_LENGTH + DUPLICATE_ITEMS
      } else {
        visibleIndex -= DUPLICATE_ITEMS
      }

      setVisibleIndex(visibleIndex)
      offset.value = contentOffset
    },
  })

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{strings.showcase}</Text>
      </View>

      <Animated.FlatList
        ref={flatList}
        horizontal
        data={items}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onStartReached={onEdgeReached}
        onStartReachedThreshold={EDGE_THRESHOLD}
        onEndReached={onEdgeReached}
        onEndReachedThreshold={EDGE_THRESHOLD}
        getItemLayout={getItemLayout}
        initialScrollIndex={DUPLICATE_ITEMS - 1 + 0.5}
      />

      <View style={styles.indicatorContainer}>
        {API.content.map((_, index) => (
          <CarouselIndicator
            key={`${index}`}
            index={index}
            active={visibleIndex}
            flatList={flatList}
          />
        ))}
      </View>
    </View>
  )
}

const useStyles = createThemedStylesheet((theme, portrait) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "85%",
      backgroundColor: theme.colors.card,
    },
    titleContainer: {
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      paddingVertical: 32,
    },
    title: {
      ...theme.fonts.ui.bold,
      fontSize: 32,
      color: theme.colors.primary,
    },
    flatListContainer: {
      width: "100%",
      height: "85%",
    },
    indicatorContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 32,
    },
    indicator: {
      backgroundColor: theme.colors.secondary,
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 5,
    },
    indicatorActive: {
      backgroundColor: theme.colors.primary,
    },
    itemContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    itemContent: {
      height: "30%",
      paddingHorizontal: portrait ? 16 : 0,
    },
    itemLoading: {
      color: theme.colors.primary,
    },
    itemDescription: {
      ...theme.fonts.prose.regular,
      fontSize: 24,
      color: theme.colors.text,
      lineHeight: 32,
      marginBottom: 24,
    },
    itemRepository: {
      ...theme.fonts.ui.regular,
      fontSize: 16,
      color: theme.colors.secondary,
      marginBottom: 24,
    },
    itemStatsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      width: "100%",
      gap: 8,
    },
    itemStatsLink: {
      ...theme.fonts.ui.regular,
      fontSize: 16,
      color: theme.colors.text,
    },
    itemStatsIcon: {
      color: theme.colors.primary,
      marginEnd: 8,
      verticalAlign: "middle",
    },
  }),
)

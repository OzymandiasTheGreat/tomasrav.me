import { Redirect } from "expo-router"

import { useLocale } from "@/hooks/use-locale"

export default function Home() {
  const [locale] = useLocale()

  return <Redirect href={`/${locale}`} />
}

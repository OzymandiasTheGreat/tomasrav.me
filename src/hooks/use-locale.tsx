import { useLocales } from "expo-localization"
import { useLocalSearchParams } from "expo-router"
import { usePathname, useRouter } from "expo-router"
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

const STORAGE_KEY = "PREFERRED_LOCALE"

type LocaleSetter = (locale: string) => void
type LocaleContext = [string, string[], LocaleSetter] | null

const LocaleContext = createContext<LocaleContext>(null)

export const LocaleProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { locale: route } = useLocalSearchParams<Record<string, string>>()
  const pathname = usePathname()
  const router = useRouter()
  const available = useAvailableLocales()
  const system = useLocales().find((loc) => available.includes(loc.languageCode!))?.languageCode
  const locale = useMemo(
    () => (available.includes(route) ? route : (system ?? available[0])),
    [available, route, system],
  )
  const [current, setCurrent] = useState(system ?? available[0])
  const setLocale = useCallback<LocaleSetter>(
    (locale) => {
      if (available.includes(locale)) {
        const path = pathname.split("/")
        const current = path[1]

        globalThis.localStorage.setItem(STORAGE_KEY, locale)
        setCurrent(locale)

        if (available.includes(current)) {
          path[1] = locale
          router.replace(path.join("/") as any)
        }
      }
    },
    [available, pathname, route, router],
  )

  useEffect(() => {
    const storage = globalThis.localStorage.getItem(STORAGE_KEY)

    setCurrent((current) =>
      current === route
        ? available.includes(route)
          ? route
          : (storage ?? system ?? available[0])
        : (storage ?? system ?? available[0]),
    )
  }, [available, route, system])

  return (
    <LocaleContext.Provider value={[current, available, setLocale]}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): [string, string[], LocaleSetter] {
  const available = useAvailableLocales()
  const system = useLocales().find((locale) =>
    available.includes(locale.languageCode!),
  )?.languageCode
  const preferred = globalThis.localStorage.getItem(STORAGE_KEY)
  const context = useContext(LocaleContext)

  return context ?? [preferred ?? system ?? available[0], available, noop]
}

function useAvailableLocales(): string[] {
  const context = require.context("../../assets/content", true, /^\.\/\w{2}\/locale\.js$/)
  const locales = context.keys().map((locale) => context(locale))

  return locales
}

function noop(..._args: any[]) {}

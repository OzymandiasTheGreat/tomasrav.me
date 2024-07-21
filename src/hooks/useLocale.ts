import { createContext, useContext } from "react"
import { defaultLang, Locales, type Lang } from "@/i18n"
import { Language } from "@/lib/storage"
import { getLocales } from "expo-localization"

export const LocaleContext = createContext<Lang>(defaultLang)
export const UpdateLocaleContext = createContext<(locale: Lang) => void>(() => {})

export const getLocale = (user?: Lang | null, system?: Lang | null): Lang => {
  if (!user) {
    user = Language.get()
  }
  if (!system) {
    system = getLocales()[0].languageCode as Lang
  }
  return Locales.includes(user!) ? user! : Locales.includes(system) ? system : defaultLang
}

export const useLocale = (): [Lang, (locale: Lang) => void] => {
  const locale = useContext(LocaleContext)
  const update = useContext(UpdateLocaleContext)
  return [locale, update]
}

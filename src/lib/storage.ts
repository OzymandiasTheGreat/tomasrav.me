import type { ColorSchemeName } from "react-native"
import type { Lang } from "@/i18n"

const LocalStorage = globalThis.localStorage

export default LocalStorage

const LANGUAGE = "__language"
const COLORSCHEME = "__colorScheme"

export const Language = {
  get(): Lang | null {
    return LocalStorage.getItem(LANGUAGE) as Lang
  },
  set(lang: Lang) {
    return LocalStorage.setItem(LANGUAGE, lang)
  },
  clear() {
    return LocalStorage.removeItem(LANGUAGE)
  }
}

export const ColorScheme = {
  get(): ColorSchemeName {
    return LocalStorage.getItem(COLORSCHEME) as ColorSchemeName
  },
  set(scheme: ColorSchemeName) {
    return LocalStorage.setItem(COLORSCHEME, scheme as string)
  },
  clear() {
    return LocalStorage.removeItem(COLORSCHEME)
  }
}

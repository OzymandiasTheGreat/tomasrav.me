import * as en from "./en"
import * as lt from "./lt"

export const Pages = { en, lt }

export type Page = keyof typeof en | keyof typeof lt

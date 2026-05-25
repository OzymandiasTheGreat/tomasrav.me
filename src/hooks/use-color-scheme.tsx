import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useColorScheme as useNativeColorScheme, type ColorSchemeName } from "react-native"

const STORAGE_KEY = "PREFERRED_COLOR_SCHEME"

type ColorSchemeSetter = (theme: ColorSchemeName) => void
type ColorSchemeContext = [ColorSchemeName, ColorSchemeSetter] | null

const ColorSchemeContext = createContext<ColorSchemeContext>(null)

export const ColorSchemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const native = useNativeColorScheme()
  const [current, setCurrent] = useState(native)
  const setColorScheme = useCallback<ColorSchemeSetter>((theme) => {
    globalThis.localStorage.setItem(STORAGE_KEY, theme)
    setCurrent(theme)
  }, [])

  useEffect(() => {
    const storage = globalThis.localStorage.getItem(STORAGE_KEY) as ColorSchemeName | null

    setCurrent(storage ?? native)
  }, [native])

  return (
    <ColorSchemeContext.Provider value={[current, setColorScheme]}>
      {children}
    </ColorSchemeContext.Provider>
  )
}

export function useColorScheme(): ColorSchemeName {
  const context = useContext(ColorSchemeContext)?.[0]
  const storage = globalThis.localStorage.getItem(STORAGE_KEY) as ColorSchemeName | null
  const native = useNativeColorScheme()

  return context ?? storage ?? native
}

export function useSetColorScheme() {
  const context = useContext(ColorSchemeContext)?.[1]

  return context ?? noop
}

function noop(..._args: any[]) {}

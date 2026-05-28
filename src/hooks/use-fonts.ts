import { useFonts as useNativeFonts } from "expo-font"
import { FiraCode_400Regular } from "@expo-google-fonts/fira-code"
import { FiraSans_400Regular, FiraSans_700Bold } from "@expo-google-fonts/fira-sans"
import {
  Merriweather_300Light_Italic,
  Merriweather_400Regular,
  Merriweather_400Regular_Italic,
  Merriweather_700Bold,
} from "@expo-google-fonts/merriweather"
import { Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins"

export function useMainFonts() {
  return useNativeFonts({
    FiraCode_400Regular,
    Merriweather_300Light_Italic,
    Merriweather_400Regular,
    Merriweather_700Bold,
    Poppins_400Regular,
    Poppins_700Bold,
  })
}

export function useBlogFonts() {
  return useNativeFonts({
    FiraCode_400Regular,
    FiraSans_400Regular,
    FiraSans_700Bold,
    Merriweather_400Regular,
    Merriweather_400Regular_Italic,
    Merriweather_700Bold,
  })
}

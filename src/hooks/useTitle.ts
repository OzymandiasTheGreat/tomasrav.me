import { usePathname } from "expo-router"
import { useStrings } from "./useStrings"

export const useTitle = () => {
  const pathname = usePathname()
  const strings = useStrings()

  switch (pathname) {
    case "/":
      return strings.me
    case "/about":
      return `${strings.about} | ${strings.me}`
    case "/showcase":
      return `${strings.showcase} | ${strings.me}`
    case "/support":
      return `${strings.support} | ${strings.me}`
    default:
      return `404 Not Found | ${strings.me}`
  }
}

export const Colors = {
  light: {
    background: "#F8BBD0",
    text: "#21212190",
    inverted: "#FAFAFA90",
    shadow: "#21212190",
    shadowInverted: "#FAFAFA90",
    card: "#EFEFEF",
    link: "#2962FF"
  },
  dark: {
    background: "#880E4F",
    text: "#FAFAFA90",
    inverted: "#21212190",
    shadow: "#FAFAFA90",
    shadowInverted: "#21212190",
    card: "#424242",
    link: "#82B1FF"
  }
}

export type Colors = (typeof Colors)["light"] | (typeof Colors)["dark"]

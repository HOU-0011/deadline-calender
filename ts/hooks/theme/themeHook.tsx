import React, {Context, HtmlHTMLAttributes, useContext, useEffect, useState} from "react";
import {initTheme, ThemeJson} from "./themeJson";

let ThemeContext: Context<ThemeJson> = React.createContext(initTheme())
let themeSetter: (theme: ThemeJson) => void = () => {
}

interface ThemeProviderProp extends HtmlHTMLAttributes<HTMLDivElement> {
}

export function ThemeProvider(props: ThemeProviderProp) {
  const [theme, setState] = useState(initTheme)
  const [font, setFont] = useState("")
  themeSetter = setState
  const nonNullTheme = theme == undefined ? initTheme() : theme

  useEffect(() => {
    const promises = theme.fonts.map((font) => {
      return new FontFace(font.name, "url(" + font.url + ")").load()
    })

    Promise.all(promises).then((fontFaces) => {
      fontFaces.forEach((font) => {
        (document.fonts as FontFaceSet).add(font)
      })
      let fontsStr = ""
      for (const font of theme.fonts) {
        fontsStr = fontsStr == "" ? fontsStr + font.name : fontsStr + "," + font.name
      }
      setFont(fontsStr)
    }, (e: DOMException) => {
      console.error(e)
    })
  }, [theme])

  return <ThemeContext.Provider value={nonNullTheme}>
    <div
      {...props}
      css={{
      color: nonNullTheme.textBase,
      backgroundColor: nonNullTheme.base,
      fontFamily: font,
      minHeight: "100vh"
    }}/>
  </ThemeContext.Provider>
}

export function useTheme(): ThemeJson {
  return useContext(ThemeContext)
}

export function setTheme(theme: ThemeJson) {
  themeSetter(theme)
}
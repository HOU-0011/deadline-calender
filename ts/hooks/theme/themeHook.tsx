import React, {Context, HtmlHTMLAttributes, useContext, useEffect, useState} from "react";
import {initTheme, ThemeJson} from "./themeJson";
import {css, Global} from "@emotion/react";

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
    <Global styles={css`
      * {
        margin: 0;
        padding: 0;
        border: 0;
      }

      a {
        color: unset;
        text-decoration: unset;
      }

      button {
        background-color: unset;
        font-family: ${font};
      }

      p {
        font-family: ${font};
      }

      h2 {
        font-family: ${font}
      }
    `}/>


    <div {...props} css={css`
      background-color: ${nonNullTheme.base};
      font-family:  ${font};
      color: ${nonNullTheme.textBase};
    `}>
      {props.children}
    </div>
  </ThemeContext.Provider>
}

export function useTheme(): ThemeJson {
  return useContext(ThemeContext)
}

export function setTheme(theme: ThemeJson) {
  themeSetter(theme)
}
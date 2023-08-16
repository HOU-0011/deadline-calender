import React, {Context, useContext, useEffect, useState} from "react";
import {initTheme, Theme} from "./theme";

let ThemeContext: Context<Theme> = React.createContext(initTheme())
let setTheme: (theme: Theme) => void = () => {
}

export function ThemeProvider(props: any) {
    const [theme, setState] = useState(initTheme)
    const [font, setFont] = useState("")
    setTheme = setState
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
        <div style={{
            color: nonNullTheme.textBase, backgroundColor: nonNullTheme.base,
            fontFamily: font
        }}>
            {props.children}
        </div>
    </ThemeContext.Provider>
}

export function useTheme(): Theme {
    return useContext(ThemeContext)
}
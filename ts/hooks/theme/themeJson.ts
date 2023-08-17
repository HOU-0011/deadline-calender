import {UrlString} from "../../service/types";

export interface ThemeJson {
    main: string
    base: string
    base2: string
    base3: string
    plain: string
    textAccent: string
    textBase: string
    fonts: Font[]
}


export function initTheme(): ThemeJson {
    return {
        base: "#f5f5f5",
        base2: "#dcdcdc",
        base3: "#999",
        main: "#ffa75e",
        plain: "",
        textAccent: "#d2cf1e",
        textBase: "#4b4b4b",
        fonts: [
            {name: "jetbrains", url: "/font/JetBrainsMono-2.242/fonts/webfonts/JetBrainsMono-Light.woff2"},
            {name: "hannari", url: "/font/hannari/HannariMincho-Regular.otf"},
        ],
    }
}

export interface Font {
    name: string
    url: UrlString
}

export function initFont(): Font {
    return {
        name: "",
        url: "",
    }
}
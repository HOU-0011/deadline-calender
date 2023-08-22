import {UrlString} from "../../service/types";

export interface ThemeJson {
    main: string
    base: string
    base2: string
    accent: string
    accent2: string
    plain: string
    textAccent: string
    textBase: string
    fonts: Font[]
}


export function initTheme(): ThemeJson {
    return {
        base: "#f5f5f5",
        base2: "#eee",
        accent: "#ddd",
        accent2: "#999",
        main: "rgba(0,163,129,0.53)",
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
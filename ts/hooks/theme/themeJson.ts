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
        base: "#f7f7f7",
        base2: "#eee",
        accent: "#ddd",
        accent2: "#999",
        main: "rgba(0,163,129,0.53)",
        plain: "",
        textAccent: "#000",
        textBase: "#4b4b4b",
        fonts: [
            {name: "noto-sans", url: "/font/Noto_Sans_JP/static/NotoSansJP-Light.ttf"},
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
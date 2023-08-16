import {createURL, getDefault, getValue} from "../util/util";
import {UrlString} from "../json/theme";
import {useEffect, useState} from "react";
import {debug} from "../bundle";

export class JsonError extends Error {
    url: URL
    searchParams: URLSearchParams | undefined
    init: RequestInit | undefined
    response: Response | undefined
    reason: any | undefined

    constructor(
        url: URL,
        searchParams: URLSearchParams | undefined,
        init: RequestInit | undefined,
        response: Response | undefined,
        reason: any | undefined
    ) {
        super()
        this.url = url
        this.searchParams = searchParams
        this.init = init
        this.response = response
        this.reason = reason
    }
}

export async function fetchRest<T = any>(
    url: URL | UrlString,
    searchParams?: URLSearchParams | undefined,
    init?: RequestInit | undefined
): Promise<Response> {
    const urlObj = createURL(url)
    if (urlObj == undefined) {
        console.error("url is not valid")
        return null
    }
    const currentUrl = createURL(window.location.href)

    if (urlObj.host == currentUrl.host) {
        urlObj.protocol = currentUrl.protocol
    }

    if (searchParams != undefined) {
        searchParams.forEach((value, key) => {
            urlObj.searchParams.append(key, value)
        })
    }

    if (debug) console.debug(urlObj)


    const initObj = getDefault(init, {})
    initObj.headers = getDefault(initObj.headers, {"Content-Type": "application/json"})

    return await fetch(urlObj, initObj)
}

export async function fetchJson<T = any>(
    url: URL | UrlString,
    searchParams?: URLSearchParams | undefined,
    init?: RequestInit | undefined,
): Promise<T> {
    const res = await fetchRest(url, searchParams, init)

    if (!res.ok) {
        console.error(res.status)
        console.error(res.statusText)

        throw new JsonError(createURL(url), searchParams, init, res, undefined)
    }

    return await res.json().catch((reason) => {
        console.error(url, reason)

        throw new JsonError(createURL(url), searchParams, init, res, undefined)
    })
}


export function useJson<T = any>(
    generator: (
        fetch: (
            url: URL | UrlString,
            searchParams?: URLSearchParams | undefined,
            init?: RequestInit | undefined
        ) => Promise<T>
    ) => Promise<T>,
    defaultValue: T | (() => T),
    deps: any[],
    err: ((info: JsonError) => T | undefined),
): T {
    const [restObj, setObj] = useState<T>()

    useEffect(() => {

        generator((url, searchParams, init) => {
            return fetchJson(url, searchParams, init)
        })
            .then((result) => setObj(result))
            .catch((error) => err(error))

    }, [...deps])

    if (restObj) return restObj

    return getValue(defaultValue)
}

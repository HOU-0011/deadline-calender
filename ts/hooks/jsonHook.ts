// noinspection JSUnusedGlobalSymbols

import {createURL, getDefault, getValue} from "../util/util";
import {UrlString} from "../service/types";
import {useEffect, useState} from "react";


export class JsonError extends Error {
  url: URL | undefined
  searchParams: URLSearchParams | undefined
  init: RequestInit | undefined
  response: Response | undefined
  reason: any | undefined

  constructor(
    url: URL | undefined,
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
): Promise<Response | undefined> {
  const urlObj = createURL(url)
  if (urlObj == undefined) {
    console.error("url is not valid")
    return undefined
  }
  const currentUrl = createURL(window.location.href)

  if (currentUrl != undefined && urlObj.host == currentUrl.host) {
    urlObj.protocol = currentUrl.protocol
  }

  if (searchParams != undefined) {
    searchParams.forEach((value, key) => {
      urlObj.searchParams.append(key, value)
    })
  }

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

  if (res == undefined) {
    throw new JsonError(createURL(url), searchParams, init, res, undefined)
  }
  if (!res.ok) {
    console.error(url, res.status, res.statusText)

    throw new JsonError(createURL(url), searchParams, init, res, res.statusText)
  }

  return await res.json().catch((reason) => {
    console.error(url, reason)

    throw new JsonError(createURL(url), searchParams, init, res, reason)
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
  err: ((info: JsonError) => void),
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

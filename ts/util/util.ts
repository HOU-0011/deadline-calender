// noinspection JSUnusedGlobalSymbols

import {JsonError} from '../hooks/jsonHook'
import {UrlString, UrlTemplate} from "../service/types";

export function createErrorMessage(err: JsonError, message: string) {
    const status = err.response == undefined ? undefined : err.response.status
    const pathname = err.url == undefined ? undefined : err.url.pathname

    message = message + ": [status : " + status
    if (err.reason) message = message + ", reason : " + err.reason.toString()
    message = message + ", path : " + pathname + "]"

    return message
}

export function mapSpringUrl(urlTemplate: UrlTemplate, key: string, value: string): URL | undefined {
    return createURL(urlTemplate.replace("{" + key + "}", value))
}

export function mapReactPath(urlTemplate: UrlTemplate, key: string, value: string): string {
    return urlTemplate.replace(":" + key, value)
}

export function createURL(url: URL | UrlString | string): URL | undefined {
    try {
        return new URL(url, window.location.href)
    } catch (e) {
        console.error(e)
        return undefined
    }
}

export function getDefaultObj<T>(value: T, defaultValue: T) {
    const result = {...value}
    Object.getOwnPropertyNames(defaultValue).forEach((propertyName) => {
        (result as any)[propertyName] = (defaultValue as any)[propertyName]
    })
    return result
}

export function getValue<T>(value: T | (() => T)) {
    return value instanceof Function ? value() : value
}

export function getDefault<T>(value: T | undefined, defaultValue: T): T {
    if (value == undefined) {
        return defaultValue
    }
    return value
}

export function appendClass(...className: (string | undefined)[]) {
    return " " + className.map((str) => {
        return getDefault(str, "").trim()
    }).join(" ") + " "
}
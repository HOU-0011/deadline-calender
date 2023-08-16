import {useEffect, useState} from 'react'
import {useBeforeUnload} from 'react-router-dom'

export class GlobalState<T> {
    private readonly setters: ((value: T) => void)[] = []
    private defaultValue: T | (() => T) | undefined

    constructor(defaultValue: T | (() => T) = undefined) {
        this.defaultValue = defaultValue
    }

    public use(): T {
        const [value, setKeywords] =
            this.defaultValue == undefined ? useState<T>() : useState(this.defaultValue)

        useEffect(() => {
            this.setters.push(setKeywords)

            return () => {
                const index = this.setters.indexOf(setKeywords)
                if (index > -1) this.setters.slice(index, 1)
            }
        })

        useBeforeUnload(() => {
            const index = this.setters.indexOf(setKeywords)
            if (index > -1) this.setters.slice(index, 1)
        })
        return value
    }

    public set(value: T) {
        this.defaultValue = value
        this.setters.forEach((setter) => {
            setter(value)
        })
    }

}


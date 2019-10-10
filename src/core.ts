/**
 * core.ts
 */

/* eslint-disable @typescript-eslint/promise-function-async */

namespace debug {
    export const io = require('debug')('jsv:io')
}

import { Either } from 'purify-ts/Either'


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JSON = any

export function readFile(file: string): Either<Error, JSON> {
    debug.io(`Reading file ${file}`)
    return Either.encase(() => require(file))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function prop(data: JSON): (key: string) => any {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function accessProperty(key: string): any {
        debug.io(`Accessing property '${key}'`)
        return data[key]
    }
}

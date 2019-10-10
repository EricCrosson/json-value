/**
 * core.ts
 */

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

export function prop(data: JSON) {
    return function accessProperty(key: string) {
        debug.io(`Accessing property '${key}'`)
        return data[key]
    }
}

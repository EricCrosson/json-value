#!/usr/bin/env node
/**
 * json-value
 * Extract values from json from the CLI
 */

namespace debug {
    export const options = require('debug')('jsv:options')
}

import * as path from 'path'
import { docopt } from 'docopt'
import { version } from './version'
import { readFile, prop } from './core'


interface UserOptions {
    "<file>": string;
    "<keys>": string[];
}


const docstring = `
Usage:
    jsv <file> <keys>...
`

function main(): void {

    const options: UserOptions = docopt(docstring, {
        help: true,
        version: version,
        exit: true
    })
    debug.options(JSON.stringify(options, null, 4))

    const file = path.resolve(process.cwd(), options['<file>'])
    readFile(file)
        .map(json => options['<keys>'].map(prop(json)))
        .bimap(
            (error) => {
                console.error(error)
                process.exit(1)
            },
            (properties: string[]) => {
                properties.forEach(property => console.log(property))
            }
        )
}

main()

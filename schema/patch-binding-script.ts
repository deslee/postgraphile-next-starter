// temporary workaround for

'use strict'

import * as fs from 'fs';

type FindAndReplace = {
    find: string,
    replace: string
}

const fileToPatch = process.argv.slice(2)[0];
const findAndReplace: FindAndReplace[] = [
    {
        find: `import * as schema from  './schema.graphql'`,
        replace: ''
    },
    {
        find: `export const Binding = makeBindingClass<BindingConstructor<Binding>>({ schema })`,
        replace: ``
    }
]
const disableTslint: string = '/* tslint:disable */'

fs.readFile(fileToPatch, 'utf8', function (err, data) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    findAndReplace.forEach(pairs => {
        var result = data.replace(pairs.find, pairs.replace);
        if (result === data) {
            console.log(`[bindingFix.js] can not find the line '${pairs.find}' for patching, skipping...`);
        }
        data = result;
    })

    if (data.startsWith(disableTslint)) {
        console.log(`[bindingFix.js] tslint is already disabled, skipping...`);
    } else {
        data = `${disableTslint}\n${data}`;
    }

    fs.writeFile(fileToPatch, data, 'utf8', function (err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
});
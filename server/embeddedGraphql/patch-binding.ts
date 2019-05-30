// temporary workaround for

'use strict'

import * as fs from 'fs';

type FindAndReplace = {
    find: string,
    replace: string
}

const fileToPatch = 'server/embeddedGraphql/bindings/generated.ts';
const findAndReplace: FindAndReplace[] = [
    {
        find: `import * as schema from  '..\\generated\\typedef.graphql'`,
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

    let result = data.toString();

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
        result = `${disableTslint}\n${data}`;
    }

    fs.writeFile(fileToPatch, result, 'utf8', function (err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
    });
});
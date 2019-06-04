import Router from 'next/router'
import {CustomNextContext} from "./CustomNextContext";

export default (context: CustomNextContext, target: string) => {
    if (context.res) {
        // server
        // 303: "See other"
        context.res.writeHead(303, { Location: target })
        context.res.end()
    } else {
        Router.replace(target)
    }
}
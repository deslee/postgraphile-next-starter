import * as React from 'react'
import { connect, FormikContext } from 'formik'
import Router from 'next/Router'

interface ComponentProps {
    message?: string;
}

interface InjectedProps {
    formik: FormikContext<any>
}

type Props = InjectedProps & ComponentProps;

const FormChangesGuard = ({message = "You have unsaved changes. Are you sure you want to leave?", formik: { dirty }}: Props) => {
    React.useEffect(() => {
        const domEventHandler = function(e) {
            e.preventDefault();
            e.returnValue = message;
            return message
        };
        const nextEventHandler = (_: string) => {
            if (confirm(message)) {
                // do nothing
            } else {
                throw new Error("workaround");
            }
        };
        if (dirty) {
            window.addEventListener("beforeunload", domEventHandler);
            Router.events.on('routeChangeStart', nextEventHandler)
        }
        return () => {
            window.removeEventListener("beforeunload", domEventHandler);
            Router.events.off('routeChangeStart', nextEventHandler);
        };
    }, [message, dirty]);

    return <></>;
};

export default connect<ComponentProps>(FormChangesGuard)

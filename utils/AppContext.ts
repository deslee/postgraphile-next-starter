import * as React from 'react';

export interface AppContext {
    s3Url: string;
}

export const AppContext = React.createContext<AppContext>({
    s3Url: ''
})
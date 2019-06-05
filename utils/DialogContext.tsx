import * as React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogContext = React.createContext<ContextValue>({
    confirmDialog: async () => false
});

export const useDialog = () => {
    const dialogContext = React.useContext(DialogContext);
    return dialogContext
}

interface Props {
    children?: React.ReactNode;
}

type DialogType = 'CONFIRM';

interface Dialog {
    type: DialogType,
    text: string,
    close: () => void,
    confirm: () => void
}

interface ContextValue {
    confirmDialog: (question: string) => Promise<boolean>
}

export const DialogProvider = ({ children }: Props) => {
    const [dialogs, setDialogs] = React.useState<Dialog[]>([]);
    return <DialogContext.Provider value={{
        confirmDialog: (question: string) => new Promise((resolve, reject) => {
            setDialogs([
                {
                    type: 'CONFIRM',
                    text: question,
                    close: () => { 
                        const [_, ...rest] = dialogs
                        resolve(false);
                        setDialogs(rest);
                    },
                    confirm: () => { 
                        const [_, ...rest] = dialogs
                        resolve(true);
                        setDialogs(rest);
                    }
                },
                ...dialogs
            ])
        })
    } as ContextValue}>
        {children}
        <Dialog
            open={dialogs.length > 0}
            onClose={() => dialogs[0].close()}
            aria-labelledby="Confirmation"
            aria-describedby={dialogs.length > 0 && dialogs[0].text}
        >
            {dialogs.length > 0 && <>
                <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{dialogs[0].text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => dialogs[0].close()} color="primary">
                        No
                    </Button>
                    <Button onClick={() => { dialogs[0].confirm(); dialogs[0].close() }} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </>}
        </Dialog>
    </DialogContext.Provider>
}

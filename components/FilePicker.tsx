import * as React from 'react'
import {Omit} from "../utils/TypeUtils";
import Button, {ButtonProps} from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface Props extends Omit<ButtonProps, 'onClick'> {
    handleFilePicked: (files: FileList | null) => Promise<void>;
    children: React.ReactNode;
}

const useStyle = makeStyles(() => ({
    fileInput: {
        display: 'none'
    }
}));

const FilePicker = ({handleFilePicked, children, ...btnProps}: Props) => {
    const inputEl = React.useRef<HTMLInputElement>(null);
    const classes = useStyle();

    const fileChanged = async (e) => {
        await handleFilePicked(inputEl.current.files);
        inputEl.current.value = null;
    };

    const buttonClicked = () => {
        inputEl.current.click();
    };

    return <>
        <input className={classes.fileInput} onChange={fileChanged} ref={inputEl} type="file" style={{display: 'none'}} />
        {}
        <Button {...btnProps} onClick={buttonClicked}>{children}</Button>
    </>
};

export default FilePicker;

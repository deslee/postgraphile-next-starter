import * as React from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface Props {

}

const useStyles = makeStyles(theme => ({
    textArea: {
    }
}))

const TextSlice = (props: Props) => {
    const classes = useStyles()
    const [value, setValue] = React.useState('')

    return <>
        <TextField 
            className={classes.textArea}
            multiline 
            fullWidth
            rowsMax={16}
            placeholder="..."
            help
            helperText="This supports Markdown"
        />
    </>
}

export default TextSlice;
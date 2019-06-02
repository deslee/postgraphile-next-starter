import * as React from 'react'
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    textArea: {
        minHeight: 350
    }
}))

interface Props {

}

const VideoSlice = (props: Props) => {
    const classes = useStyles()
    return <></>
}

export default VideoSlice;
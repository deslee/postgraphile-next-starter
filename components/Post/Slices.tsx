import * as React from 'react';
import Slice from './Slice';
import * as uuid from 'uuid/v4';
import { Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Formik } from 'formik';
import { DatePicker } from '@material-ui/pickers';
import debounce from '../../utils/debounce';
import arrayMove from '../../utils/arrayMove';
import posed, { PoseGroup } from 'react-pose';
const Item = posed.div();



type SliceState = 'NEW' | 'ACTIVE' | 'DELETED'

export interface SliceModel {
    id: string,
    state: SliceState
}

interface Props {
    slices: SliceModel[]
    onSlicesUpdate: (slices: SliceModel[]) => void;
}

const useStyles = makeStyles(theme => ({
    addSliceAction: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    addSliceButton: {
    },
    addSliceIcon: {
        marginRight: theme.spacing(1)
    },
}))

const Slices = ({ slices, onSlicesUpdate }: Props) => {
    const classes = useStyles();
    const [newSlice, setNewSlice] = React.useState({ id: uuid(), state: 'NEW' } as SliceModel)
    React.useEffect(() => {
        debounce(() => {
            onSlicesUpdate(slices.filter(s => s.state === 'ACTIVE'))
        }, 1500, false)
    }, [slices.filter(s => s.state === 'ACTIVE').map(s => s.id).join(',')])

    const onAdd = (slice: SliceModel) => {
        onSlicesUpdate([...slices, { ...slice, state: 'ACTIVE' }])
    }

    const onRemove = (slice: SliceModel) => {
        onSlicesUpdate(slices.map(s => ({ ...s, state: s.id === slice.id ? 'DELETED' : s.state })))
    }

    const onMoveUp = (slice: SliceModel) => {
        const index = slices.indexOf(slice);
        onSlicesUpdate(arrayMove(slices, index, index-1))
    }

    const onMoveDown = (slice: SliceModel) => {
        const index = slices.indexOf(slice);
        onSlicesUpdate(arrayMove(slices, index, index+1))
    }

    return <>
        <PoseGroup>{[...slices, newSlice].map(slice => <Item key={slice.id}>
            <Slice slice={slice} onRemoveSlice={() => onRemove(slice)} onMoveUp={() => onMoveUp(slice)} onMoveDown={() => onMoveDown(slice)} />
        </Item>)}</PoseGroup>
        <div className={classes.addSliceAction}>
            <Fab onClick={() => {
                onAdd(newSlice);
                setNewSlice({ id: uuid(), state: 'NEW' } as SliceModel)
            }}
                variant="extended"
                className={classes.addSliceButton}
                color="primary"
                size="medium"
                aria-label="Add Slice"
            >
                <AddIcon className={classes.addSliceIcon} />Add Slice
        </Fab>
        </div>
    </>
}
const propsAreEqual = ({slices: prevSlices}: Props, {slices}: Props) => slices.filter(s => s.state === 'ACTIVE').map(s => s.id).join(',') === prevSlices.filter(s => s.state === 'ACTIVE').map(s => s.id).join(',')
export default React.memo<Props>(Slices, propsAreEqual);
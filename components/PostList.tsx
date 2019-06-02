import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as uuid from 'uuid/v4';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Grid, List, ListItem, Divider } from '@material-ui/core';
import Link from 'next/link';

interface Props {

}

const useStyles = makeStyles(theme => ({
    root: {
        overflowX: 'auto',
        height: '100%'
    },
    row: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
    }
}));

function createData(id, title, date) {
    return { id, title, date };
}

const rows = [
    createData(uuid(), 'Frozen yoghurt', '06/28/2019'),
    createData(uuid(), 'Ice cream sandwich', '06/28/2019'),
    createData(uuid(), 'Eclair', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
    createData(uuid(), 'Frozen yoghurt', '06/28/2019'),
    createData(uuid(), 'Ice cream sandwich', '06/28/2019'),
    createData(uuid(), 'Eclair', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
    createData(uuid(), 'Frozen yoghurt', '06/28/2019'),
    createData(uuid(), 'Ice cream sandwich', '06/28/2019'),
    createData(uuid(), 'Eclair', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
    createData(uuid(), 'Frozen yoghurt', '06/28/2019'),
    createData(uuid(), 'Ice cream sandwich', '06/28/2019'),
    createData(uuid(), 'Eclair', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
    createData(uuid(), 'Frozen yoghurt', '06/28/2019'),
    createData(uuid(), 'Ice cream sandwich', '06/28/2019'),
    createData(uuid(), 'Eclair', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
    createData(uuid(), 'Cupcake', '06/28/2019'),
    createData(uuid(), 'Gingerbread', '06/28/2019'),
];

const PostList = (props: Props) => {
    const classes = useStyles();

    return <Paper className={classes.root}>
        <List>
            <ListItem>
                <Grid container>
                    <Grid container item xs>Title</Grid>
                    <Grid container item xs={3}>Date</Grid>
                </Grid>
            </ListItem>
        </List>
        <Divider />
        <List>
            {rows.map((row, i) => <React.Fragment key={row.id}>
                <Link href={`/posts?postId=${row.id}`} as={`/posts/${row.id}`}>
                    <ListItem button component="a" href={`/posts/${row.id}`}>
                        <Grid container className={classes.row}>
                            <Grid container item xs>{row.title}</Grid>
                            <Grid container item xs={3}>{row.date}</Grid>
                        </Grid>
                    </ListItem>
                </Link>
                {i !== rows.length - 1 && <Divider />}
            </React.Fragment>)}
        </List>
    </Paper>
}

export default PostList;
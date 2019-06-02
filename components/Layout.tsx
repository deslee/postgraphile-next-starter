import * as React from 'react';
import { makeStyles, CssBaseline, AppBar, Toolbar, IconButton, Typography, Badge, Drawer, Divider, List, Container, Grid, Paper, ListItem, ListItemIcon, ListItemText, ListSubheader, createMuiTheme } from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PostIcon from '@material-ui/icons/Notes';
import AssetsIcon from '@material-ui/icons/Collections';
import SettingsIcon from '@material-ui/icons/Settings';
import constants from '../constants';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../theme'

export const mainListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Site" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <PostIcon />
            </ListItemIcon>
            <ListItemText primary="Posts" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssetsIcon />
            </ListItemIcon>
            <ListItemText primary="Assets" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItem>
    </div>
);

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    toolbarTitle: {
        flexGrow: 1,
        paddingLeft: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: constants.drawerWidth,
        width: `calc(100% - ${constants.drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: constants.drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

interface Props {
    children: React.ReactNode
}

const darkTheme = createMuiTheme({
    ...theme,
    palette: {
        type: 'dark'
    },
});

function Layout(props: Props) {
    const classes = useStyles();
    const { children } = props;
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                </Typography>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <ThemeProvider theme={darkTheme}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarHeader}>
                        <Typography variant="h6" className={classes.toolbarTitle}>Admin</Typography>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                </Drawer>
            </ThemeProvider>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {children}
                </Container>
            </main>
        </div>
    );
}

export default Layout;
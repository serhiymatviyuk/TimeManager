import * as React from "react";
import { AppBar, createStyles, IconButton, Link, makeStyles, Menu, MenuItem, Theme, Toolbar, Tooltip, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        appBar:{
            backgroundColor: '#808080'
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
      });
});

const AppHeader: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleRedirect = (url: string) => {
        history.push(url);
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                <IconButton aria-controls="simple-menu" 
                    aria-haspopup="true"
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuOpen}>
                    <MenuIcon/>
                </IconButton>
                <Menu id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleRedirect}>
                    <MenuItem onClick={() => handleRedirect("/projects")}>Projects</MenuItem>
                    <MenuItem onClick={() => handleRedirect("/about")}>About</MenuItem>
                </Menu>
                <Typography variant="h6" className={classes.title}>
                    Time Manager
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default AppHeader;
import React, {MouseEvent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Menu, MenuItem, AppBar, 
  IconButton, Toolbar, Typography, ListItemIcon, ListItemText
} from '@material-ui/core';
import { 
  Menu as MenuIcon,
  AccountBalanceWallet as LogoutIcon,
  MoreVert as MoreIcon,
} from '@material-ui/icons';
const ITEM_HEIGHT = 60;

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
  }
}));

type Props = {
  signOut: () => void;
}

const Header: React.FC<Props> = ({signOut}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl); 

  const handleLogout = () => {
    signOut();
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as HTMLButtonElement);
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          edge="start"
          //onClick={handleDrawerToggle}
          //disabled={(handleDrawerToggle === null)}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>

        <Typography className={classes.title} variant="h6" noWrap>
          Management Console
        </Typography>
        
        <Box mr={0} ml="auto">
          <Grid container>
            <IconButton
              data-testid="openMenuButton"
              color="inherit"
              aria-label="More"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              data-testid="long-menu"
              anchorEl={anchorEl}
              elevation={0}
              getContentAnchorEl={null}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              <MenuItem 
                data-testid="signoutMenuItem" 
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Sing Out</ListItemText>
              </MenuItem>
              
            </Menu>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
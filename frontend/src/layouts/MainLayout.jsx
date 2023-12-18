import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
//import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StoreIcon from '@mui/icons-material/Store';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ShopIcon from '@mui/icons-material/Shop';
import ReceiptIcon from '@mui/icons-material/Receipt';
//
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


//----------------

export default function MainLayout({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

//----------datetime
  useEffect(() => {
    // Update the current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once when the component mounts
//-----------------------


  const iconStyle = { color: 'rgba(0, 0, 0, 0.87)' };

  
//--------expand more
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

//------------


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <a className="navbar-brand" style={{ color: 'white' }} href="/">
            The Sweet
          </a>
          
            <p>{currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</p>
                      
        </div>
          
          {/* <Typography variant="h6" noWrap component="div">The Sweet</Typography>*/}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>  
        <DrawerHeader sx={{ backgroundColor: '#1976d2' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: 'white' }}/> : <ChevronLeftIcon style={{ color: 'white' }}/>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            { text: 'Sell', link: '/pos', icon: <ShoppingBagIcon style={iconStyle} /> },
            { text: 'Add Products', link: '/add', icon: <AddBusinessIcon style={iconStyle} /> },
            { text: 'Store', link: '/store', icon: <StoreIcon style={iconStyle} /> },
            {
              text: 'Reports',
              link: null,
              icon: <QueryStatsIcon style={iconStyle} />,
              children: [
                { text: 'Bills', link: '/billReport', icon: <ReceiptIcon style={iconStyle} /> },
                { text: 'Sales Report', link: '/salesReport', icon: <AttachMoneyIcon style={iconStyle} /> },
                { text: 'Stock Report', link: '/stockReport', icon: <ShopIcon style={iconStyle} /> },
                // Add more sub-items as needed
              ],
            },
          ].map((item, index) => (
            item.children ? (
              <div key={item.text}>
                <ListItemButton
                  onClick={handleExpandClick}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                  <ExpandMore
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </ListItemButton>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((childItem, childIndex) => (
                      <ListItem key={childItem.text} disablePadding sx={{ display: 'block' }}>
                        <Link to={childItem.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? 'initial' : 'center',
                              px: 4.5,
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                              }}
                            >
                              {childItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={childItem.text} sx={{ opacity: open ? 1 : 0 }} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </div>
            ) : (
              <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            )
          ))}
        </List>

        {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon style={iconStyle} /> : <MailIcon style={iconStyle} />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <main>
          <div className="container mt-3">{React.cloneElement(children, {
            currentDateTime: currentDateTime,
            setCurrentDateTime: setCurrentDateTime,
          })}</div>
          <ToastContainer />
        </main>
      </Box>
    </Box>
  );
}


import * as React from "react";
import { useEffect, useState } from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import Link from "@mui/material/Link";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems } from "./listItems";
import mainListItemsComponent from "./listItems";

import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";
import TaskSummary from "./TaskSummary";
import { useRouter } from "next/router";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { deleteCookie } from "cookies-next";
import { notifySuccess } from "../../utils/toast";

import { useTranslations } from "next-intl";

import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import PaymentIcon from "@mui/icons-material/Payment";
import TaskIcon from '@mui/icons-material/Task';
import ReceiptIcon from "@mui/icons-material/Receipt";
import InventoryIcon from "@mui/icons-material/Inventory";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import SettingsIcon from "@mui/icons-material/Settings";
const pagesArray = [
  {
    name: "Dashboard",
    link: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    name: "Users",
    link: "/users",
    icon: <GroupIcon />,
  },
  {
    name: "Expenses",
    link: "/expenses",
    icon: <PaymentIcon />,
  },
  {
    name: "task",
    link: "/task",
    icon: <TaskIcon />,
  },
  // {
  //   name: "Invoices",
  //   link: "/invoices",
  //   icon: <ReceiptIcon />,
  // },
  {
    name: "Inventory",
    link: "/inventory",
    icon: <InventoryIcon />,
  },
  // {
  //   name: "tasks",
  //   link: "/tasks",
  //   icon: <QrCode2Icon />,
  // },
  {
    name: "Employees",
    link: "/employees",
    icon: <GroupIcon />,
  },
  {
    name: "Settings",
    link: "/settings",
    icon: <SettingsIcon />,
  },
];

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Language({ active, handleLanguageActive }) {
  const t = useTranslations("header");
  const route = useRouter();
  return (
    <>
      <span
        onClick={() => handleLanguageActive("lang")}
        className="bg-dark px-4 py-2 text-white offcanvas__lang-selected-lang tp-lang-toggle"
        id="tp-offcanvas-lang-toggle"
      >
        {route.locale == "ar" ? "عربي" : "English"}
      </span>

      <Select
        // value={age}
        label="Language"
        // onChange={handleChange}
        sx={{
          marginLeft: 1,
          marginRight: 1,
          width: 50,
        }}
      >
        <MenuItem style={{ backgroundColor: "transparent" }}>
          {route.locale == "ar" ? (
            <li>
              <a
                rel="noopener noreferrer"
                href={`/en${route.asPath}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                English
              </a>
            </li>
          ) : (
            <li>
              <a
                rel="noopener noreferrer"
                href={`/ar${route.asPath}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                Arabic
              </a>
            </li>
          )}
        </MenuItem>
      </Select>
      {/* <ul
        className={`offcanvas__lang-list tp-lang-list py-2 ${
          active === "lang" ? "tp-lang-list-open" : ""
        }`}
      >
        {route.locale == "ar" ? (
          <li>
            <a rel="noopener noreferrer" href={`/en${route.asPath}`}>
              English
            </a>
          </li>
        ) : (
          <li>
            <a rel="noopener noreferrer" href={`/ar${route.asPath}`}>
              Arabic
            </a>
          </li>
        )}
      </ul> */}
    </>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [openModal, setOpenModal] = React.useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [active, setIsActive] = useState("");

  const t = useTranslations("header");

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const router = useRouter();

  const deleteCookies = () => {
    deleteCookie("userInfo");
    notifySuccess("Successfully Logout");
    router.push("/login");
  };

  const handleLanguageActive = (type) => {
    if (type === active) {
      setIsActive("");
    } else {
      setIsActive(type);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open} 
        sx={{
          right: router?.locale === "ar" ? "240px" : "0"
        }}
        >
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {router?.pathname === "/" ? (
                <span> {t("Dashboard")}</span>
              ) : (
                t(
                  router.pathname.split("/")[1].charAt(0).toUpperCase() +
                    router.pathname.split("/")[1].slice(1)
                )
              )}
            </Typography>

            <div className="offcanvas__lang-wrapper">
              <Language
                active={active}
                handleLanguageActive={handleLanguageActive}
              />
            </div>
            <Tooltip title="Logout">
              <IconButton color="inherit" onClick={() => setOpenModal(true)}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

        
        <Drawer variant="permanent" open={open}
            sx={{
              borderRight: router?.locale === "en" ? "1px solid #757575" :"0px solid ",
              borderLeft: router?.locale === "ar" ? "1px solid #757575" :"0px solid "

            }}
        >
 
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {
              console.log("qqq" , router?.pathname)
            }
         
            {pagesArray?.map((item, index) => {
              return (
                <ListItemButton key={item?.name + index}>
                  {console.log("router?.pathname.includes(item?.name)" , router?.pathname.includes(item?.name.toLocaleLowerCase()))}
                  <Link
                    href={item.link}
                    style={{
                      display: "flex",
                      textDecoration: "none",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon sx={{
                      color: router?.pathname.includes(item?.name.toLocaleLowerCase()) ? "#EF3D49" : "black"
                    }}>{item?.icon}</ListItemIcon>
                    <ListItemText
                      primary={t(item?.name)}
                      sx={{
                        color: router?.pathname.includes(item?.name.toLocaleLowerCase()) ?  "#EF3D49" : "black",
                      }}
                    />
                  </Link>
                </ListItemButton>
              );
            })}
          </List>
        </Drawer>
        {(router.pathname.split("/")[1] === "dashboard" ||
          router?.pathname === "/") && (
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                {/* <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Chart />
                  </Paper>
                </Grid> */}

            <Grid item xs={12} md={8} lg={9}>
                <TaskSummary />
              </Grid>
                
                {/* Recent Deposits */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 240,
                    }}
                  >
                    <Deposits />
                  </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Orders />
                  </Paper>
                </Grid>
              </Grid>
              {/* <Copyright sx={{ pt: 4 }} /> */}
            </Container>
          </Box>
        )}
      </Box>
      <React.Fragment>
        <Dialog
          open={openModal}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("Are You Sure you want to logout?")}
          </DialogTitle>
          {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
          <DialogActions>
            <Button onClick={handleClose}>{t("Cancel")}</Button>
            <Button autoFocus variant="contained" onClick={deleteCookies}>
              {t("Logout")}
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </ThemeProvider>
  );
}

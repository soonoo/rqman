import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  CssBaseline,
  Menu,
  Tabs,
  Tab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { FC, PropsWithChildren, useState } from "react";
import { useToggle } from "usehooks-ts";
import Link from "next/link";
import { useRouter } from "next/router";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const [open, toggleDrawer] = useToggle(true);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          marginLeft: open ? "240px" : "",
          width: "100%",
          // width: open ? `calc(100% - 240px)` : "100%",
          transition: "all .25s",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            rqman
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{
        width: "100%",
        transition: "all .25s",
        paddingTop: "64px",
        height: "100vh",
        display: "flex",
        flexDirection: "column"
      }}>
        <Tabs value={router.pathname} onChange={(e, value) => router.push(value)}>
          <Tab value={"/menu/query-runner"} label="Query runner"></Tab>
          <Tab value={"/menu/cluster-status"} label="Cluster status"></Tab>
        </Tabs>
        {children}
      </main>
    </Box>
  );
};

export default Layout;

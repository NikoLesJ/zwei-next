"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

import {
    RoofingOutlined,
    QuestionAnswerOutlined,
    AutoGraphOutlined,
    SettingsSuggestOutlined,
    WarehouseOutlined,
    DisplaySettingsOutlined,
    PointOfSaleOutlined
  } from "@mui/icons-material";
import Link from 'next/link';

export default function NavSide() {
  const [open, setOpen] = React.useState(false);
  const [activeLink, setActiveLink] = React.useState(null);

    const menuItems = [
      { icon: <RoofingOutlined />, name: "Home", link: "/" },
      { icon: <WarehouseOutlined />, name: "Sklad", link: "/sklad" },
      { icon: <PointOfSaleOutlined />, name: "Sales", link: "/sales" },
      { icon: <QuestionAnswerOutlined />, name: "Blog", link: "/blog" },
      { icon: <AutoGraphOutlined />, name: "About", link: "/about" },
      { icon: <DisplaySettingsOutlined />, name: "Attributes", link: "/attributes" },
      { icon: <SettingsSuggestOutlined />, name: "Settings", link: "/settings" }
    ]

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLinkClick = (index) => {
    setActiveLink(index);
  };
  

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
            <Link
                key={index}
                onClick={() => handleLinkClick(index)}
                href={item.link}
            >
                <ListItem disablePadding>
                    <ListItemButton className={activeLink === index ? 'Mui-selected' : ""}>
                        <ListItemIcon sx={activeLink === index ? {color: "rgb(21 128 61)"} : ""}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                </ListItem>
            </Link>
        ))}
      </List>
      <Divider />
      <List sx={{ position: "absolute", bottom: "50px"}}>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}><MenuIcon sx={{ color: "white", fontSize: "2.5rem"}} /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

// Sidebar.js
import React from 'react';
import { Drawer, Box } from '@mui/material';
import SidebarItems from './SidebarItems';
import UserCard from '../../shared/UserCard';
import Icon from "../logo/Icon"
import { NavGroupSkeleton } from './navGroup/NavGroup';
import { NavItemSkeleton } from './navItem';

const Sidebar = ({ userData, accessibleContent, setContent }) => {
  const sidebarWidth = '300px';

  return (
    <Drawer
      anchor='left'
      variant='permanent'
      PaperProps={{
        sx: {
          color:'secondary',
          width: sidebarWidth,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        },
      }}
    >
      <Box px={4}>
        <Box px={2}><Icon /></Box>
        <Box><UserCard /></Box>
        {!userData ?
        <>
            <NavGroupSkeleton />
            <NavItemSkeleton />
            <NavGroupSkeleton />
            <NavItemSkeleton />
            <NavItemSkeleton />
            <NavItemSkeleton />
        </>
        :
        <SidebarItems accessibleContent={accessibleContent} setContent={setContent} />
        }
      </Box>
    </Drawer>
  );
};

export default Sidebar;

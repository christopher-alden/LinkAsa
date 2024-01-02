// Sidebar.js
import React from 'react';
import { Drawer, Box, Stack } from '@mui/material';
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
          boxShadow: "0px 0px 60px -10px rgba(0, 0, 0, 0.1)",
          color:'secondary',
          width: sidebarWidth,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          border:'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        },
      }}
    >
      <Box px={4}>
        <Stack sx={{position:'sticky', backgroundColor:'white', zIndex:10, top:0}}>
          <Box px={2}><Icon /></Box>
          <Box><UserCard /></Box>
        </Stack>
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

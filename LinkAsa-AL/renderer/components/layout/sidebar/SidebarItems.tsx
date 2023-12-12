// SidebarItems.js
import React, { Fragment } from 'react';
import { Box, List } from '@mui/material';
import NavItem from './navItem';
import NavGroup from './navGroup/NavGroup';
import generateSidebarMenuContent from './MenuItems';

const SidebarItems = ({ accessibleContent, setContent }) => {
  return (
    <Box sx={{ px: 0 }}>
      <List sx={{ pt: 0 }} component="div">
        {accessibleContent.map(({ label, items }) => (
          <Fragment key={label}>
            <NavGroup item={{ subheader: label.replace(/_/g, ' ') }} />
            {items.map((key) => {
              const content = generateSidebarMenuContent(key);
              return (
                <NavItem
                  item={content}
                  key={content.id}
                  onClick={() => setContent(key)}
                />
              );
            })}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};


export default SidebarItems;

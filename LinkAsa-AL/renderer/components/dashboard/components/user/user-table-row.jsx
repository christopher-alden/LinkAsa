import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../label/Label';

import {
  IconEdit,
  IconUserEdit,
} from "@tabler/icons-react";
import { UserStatus } from '../../../../model/userAttributes';


// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  username,
  avatarUrl,
  email,
  role,
  isVerified,
  status,
  handleClick,
  handleUpdate
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const statusLabelColor = {
    [UserStatus.active]: "success",
    [UserStatus.pending]: "info",
    [UserStatus.leave]: "default",
    [UserStatus.deactivated]: "error",
  };
  

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" sx={{width:350}} >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={username} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap>
              {username}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell sx={{width:350}}>{email}</TableCell>
        <TableCell  sx={{width:350}}>{role}</TableCell>


        <TableCell>
          <Label color={statusLabelColor[status]}>{status}</Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <IconEdit/>
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClick={handleUpdate}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleCloseMenu} sx={{display:"flex", gap:1.5, padding:2}}>
          <IconUserEdit/>
          Update
        </MenuItem>

      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  email: PropTypes.any,
  handleClick: PropTypes.func,
  handleUpdate: PropTypes.func,
  isVerified: PropTypes.any,
  username: PropTypes.any,
  role: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};

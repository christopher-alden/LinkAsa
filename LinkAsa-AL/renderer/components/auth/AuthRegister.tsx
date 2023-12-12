import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from "@mui/material";
import { Select, MenuItem } from "@mui/material";
import CustomTextField from "../forms/CustomTextField";
import { Stack } from "@mui/system";
import { useRegister } from "../../hooks/useRegister";
import { UserRole } from '../../model/userAttributes';
import { SelectChangeEvent } from '@mui/material/Select';

interface registerType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  onRegistration?: (result: { success: boolean; error?: string }) => void;
}


const AuthRegister = ({ title, subtitle, subtext, onRegistration }: registerType) => {
  const { handleRegister} = useRegister();
  const [selectedRole, setSelectedRole] = useState(UserRole.Testing);

  const handleRoleChange = (event: SelectChangeEvent<UserRole>) => {
    setSelectedRole(event.target.value as UserRole);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[2].value;
    const password = e.target[4].value;
    const result = await handleRegister(username, email, password, selectedRole);
    onRegistration?.(result)
  };

  
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <form onSubmit={onSubmit}>
        <Box>
          <Stack mb={3}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Name
            </Typography>
            <CustomTextField id="name" variant="outlined" fullWidth />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
              mt="25px"
            >
              Email Address
            </Typography>
            <CustomTextField id="email" variant="outlined" fullWidth />

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
              mt="25px"
            >
              Password
            </Typography>
            <CustomTextField id="password" variant="outlined" fullWidth />
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="role"
              mb="5px"
              mt="25px"
            >
              Role
            </Typography>
            <Select
              id="role"
              value={selectedRole}
              onChange={handleRoleChange}
              fullWidth
            >
              {Object.values(UserRole).map((role) => (
                <MenuItem key={role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
            
          </Stack>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            sx={{
              p:2,
              my:2
            }}
          >
            Create Account
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;

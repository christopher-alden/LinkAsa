import React, { useState } from "react";
import { UserRole, UserStatus } from "../../../model/userAttributes";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CustomTextField from "../../forms/CustomTextField";
import { updateUser } from "../../../services/userDataAccess";

interface UpdateEmployeeProps {
  open: boolean;
  onClose: () => void;
  onUpdate?: (result: { success: boolean; error?: string }) => void;
  user: UserModel;
}

const UpdateEmployee = ({ open, onClose, onUpdate, user }: UpdateEmployeeProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(user!.role);
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>(
    user!.status
  );

  const selectedStatusChange = (e: SelectChangeEvent<UserStatus>) => {
    setSelectedStatus(e.target.value as UserStatus);
  };

  const handleRoleChange = (e: SelectChangeEvent<UserRole>) => {
    setSelectedRole(e.target.value as UserRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      username: e.target.username.value,
      email: e.target.email.value,
      role: selectedRole,
      status: selectedStatus,
    };

    try {
      const result = await updateUser(user.uid, updatedUserData);
      onUpdate?.(result)
      onClose();
    } catch (error) {
      console.error("Error updating user on server:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Employee</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack mb={3} spacing={2}>
            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="name"
              mb="5px"
            >
              Name
            </Typography>
            <CustomTextField
              id="username"
              variant="outlined"
              defaultValue={user?.username}
              fullWidth
            />

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
            <CustomTextField
              id="email"
              variant="outlined"
              defaultValue={user?.email}
              fullWidth
            />
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

            <Typography
              variant="subtitle2"
              fontWeight={600}
              component="label"
              htmlFor="role"
              mb="5px"
              mt="25px"
            >
              Status
            </Typography>
            <Select
              id="status"
              value={selectedStatus}
              onChange={selectedStatusChange}
              fullWidth
            >
              {Object.values(UserStatus).map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              Update
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateEmployee;

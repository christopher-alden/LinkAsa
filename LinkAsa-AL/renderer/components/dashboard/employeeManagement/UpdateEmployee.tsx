import React, { useState } from "react";
import { UserRole } from "../../../model/userAttributes";
import { UserStatus } from "../../../model/status";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import CustomTextField from "../../forms/CustomTextField";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";

type UpdateEmployeeProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: (result: { success: boolean; error?: string }) => void;
  data: UserModel;
};

const UpdateEmployee = ({
  open,
  onClose,
  onUpdate,
  data,
}: UpdateEmployeeProps) => {
  const { updateDocument } = useCrud({ db: clientDb, collectionName: "users" });
  const [selectedRole, setSelectedRole] = useState<UserRole>(data.role);
  const [selectedStatus, setSelectedStatus] = useState<UserStatus>(data.status);

  const handleStatusChange = (e: SelectChangeEvent<UserStatus>) => {
    setSelectedStatus(e.target.value as UserStatus);
  };

  const handleRoleChange = (e: SelectChangeEvent<UserRole>) => {
    setSelectedRole(e.target.value as UserRole);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedUserData = {
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      role: selectedRole,
      status: selectedStatus,
    };
    try {
      const result = await updateDocument(data.id, updatedUserData);
      onUpdate(result);
    } catch (error) {
      onUpdate({ success: false, error: error.message });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <Box sx={{ backgroundColor: "white !important" }}>
        <DialogTitle>
          <Typography variant="h5" py={2}>
            Update Employee
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
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
              <CustomTextField
                name="username"
                variant="outlined"
                defaultValue={data?.username}
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
                name="email"
                variant="outlined"
                defaultValue={data?.email}
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
                name="role"
                value={selectedRole}
                onChange={handleRoleChange}
                fullWidth
              >
                {Object.values(UserRole).map((role) => (
                  <MenuItem
                    key={role}
                    value={role}
                    sx={{ backgroundColor: "white !important" }}
                  >
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
                onChange={handleStatusChange}
                fullWidth
              >
                {Object.values(UserStatus).map((status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    sx={{ backgroundColor: "white !important" }}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <DialogActions>
              <Button sx={{ px: 2, p: 1.5 }} onClick={onClose}>
                Cancel
              </Button>
              <Button
                sx={{ px: 2, p: 1.5 }}
                variant="outlined"
                type="submit"
                color="primary"
              >
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default UpdateEmployee;

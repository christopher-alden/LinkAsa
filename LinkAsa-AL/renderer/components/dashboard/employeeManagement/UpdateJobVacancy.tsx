import React, { useState } from "react";
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
  Chip,
} from "@mui/material";
import CustomTextField from "../../forms/CustomTextField";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { UserRole } from "../../../model/userAttributes";
import { JobVacanciesStatus } from "../../../model/status";

type UpdateJobVacancyProps = {
  open: boolean;
  onClose: () => void;
  onUpdate?: (result: { success: boolean; error?: string }) => void;
  data: JobVacancies;
};

const UpdateJobVacancy = ({
  open,
  onClose,
  onUpdate,
  data,
}: UpdateJobVacancyProps) => {
  const { updateDocument } = useCrud({
    db: clientDb,
    collectionName: "job_vacancy",
  });
  const [selectedRole, setSelectedRole] = useState(data.role);
  const [selectedStatus, setSelectedStatus] = useState(data.status);
  const [requirements, setRequirements] = useState<string[]>(data.requirements);
  const [currentRequirement, setCurrentRequirement] = useState("");

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleAddRequirement = () => {
    if (currentRequirement !== "") {
      setRequirements((prev) => [...prev, currentRequirement]);
      setCurrentRequirement("");
    }
  };

  const handleRequirementDelete = (requirementToDelete) => () => {
    setRequirements(requirements.filter((req) => req !== requirementToDelete));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedJobData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      maxQuota: formData.get("maxQuota") as unknown as number,
      role: selectedRole,
      status: selectedStatus,
      requirements: requirements,
    };

    try {
      const result = await updateDocument(data.id, updatedJobData);
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
            Update Job Vacancy
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
                name="name"
                defaultValue={data?.name}
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
                Description
              </Typography>
              <CustomTextField
                name="description"
                multiline
                rows={4}
                defaultValue={data?.description}
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
                Max Quota
              </Typography>
              <CustomTextField
                name="maxQuota"
                type="number"
                defaultValue={data?.maxQuota}
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

              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  component="label"
                  htmlFor="requirements"
                  mb="5px"
                  mt="25px"
                >
                  Requirements:
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CustomTextField
                    fullWidth
                    value={currentRequirement}
                    onChange={(e) => setCurrentRequirement(e.target.value)}
                    placeholder="Add a requirement"
                  />
                  <Button
                    sx={{ padding: 2, paddingInline: 4 }}
                    variant="outlined"
                    onClick={handleAddRequirement}
                  >
                    Add
                  </Button>
                </Stack>
                <Box
                  sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}
                >
                  {requirements.map((requirement, index) => (
                    <Chip
                      key={index}
                      label={requirement}
                      onDelete={handleRequirementDelete(requirement)}
                    />
                  ))}
                </Box>
              </Box>
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
                {Object.values(JobVacanciesStatus).map((status) => (
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

export default UpdateJobVacancy;

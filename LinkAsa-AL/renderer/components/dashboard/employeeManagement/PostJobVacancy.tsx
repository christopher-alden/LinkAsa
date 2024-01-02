import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  TextField,
  Snackbar,
  Alert,
  Select,
  MenuItem,
} from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import CustomTextField from "../../forms/CustomTextField";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { UserRole } from "../../../model/userAttributes";
import { JobVacanciesStatus } from "../../../model/status";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import { SelectChangeEvent } from "@mui/material/Select";
import TopDown from "../../layout/chat/TopDown";

const PostJobVacancy = () => {
  const { createDocument } = useCrud({
    db: clientDb,
    collectionName: "job_vacancy",
  });
  const [requirements, setRequirements] = useState<string[]>([]);
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [selectedRole, setSelectedRole] = useState(UserRole.Staff);

  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const handleRoleChange = (event: SelectChangeEvent<UserRole>) => {
    setSelectedRole(event.target.value as UserRole);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jobVacancyData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      maxQuota: formData.get("maxQuota") as unknown as number,
      quota: 0 as number,
      role: selectedRole as UserRole,
      requirements: requirements as string[],
      status: JobVacanciesStatus.active as JobVacanciesStatus,
    };

    try {
      await createDocument(jobVacancyData);
      handleSnackbarResponse(
        { success: true },
        "Job Vacancy Posted Successfully"
      );
    } catch (error) {
      handleSnackbarResponse({ success: false, error: error.message }, "");
    }
  };

  return (
    <DashboardCard title="Post Job Vacancy">
      <>
        <form onSubmit={handleSubmit}>
          <TopDown>
            <Stack mb={3}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
              >
                Job Name
              </Typography>
              <CustomTextField name="name" />

              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="name"
                mb="5px"
                mt="25px"
              >
                Job Description
              </Typography>
              <CustomTextField name="description" multiline rows={4} />

              <Typography
                variant="subtitle2"
                fontWeight={600}
                component="label"
                htmlFor="maxQuota"
                mb="5px"
                mt="25px"
              >
                Max Quota
              </Typography>
              <CustomTextField name="maxQuota" type="number" />
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
            </Stack>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              fullWidth
              sx={{ p: 2, mt: "25px" }}
            >
              Post Job Vacancy
            </Button>
          </TopDown>
        </form>
        <Snackbar
          open={snackbarStatus.open}
          autoHideDuration={snackbarDuration}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={snackbarStatus.severity}>
            {snackbarStatus.message}
          </Alert>
        </Snackbar>
      </>
    </DashboardCard>
  );
};

export default PostJobVacancy;

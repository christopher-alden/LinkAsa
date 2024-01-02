import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import AuthRegister from "../../auth/AuthRegister";
import DashboardCard from "../../shared/DashboardCard";
import { useSnackbar } from "../../../hooks/useSnackbar";



const CreateAccount = () => {

  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } = useSnackbar();

  const snackbarDuration = 3000;

  return (
    <DashboardCard title="Create Account">
      <>
        <AuthRegister
          onRegistration={(result) =>{handleSnackbarResponse(result, 'Account Successfully Created')}}
        />
        <Snackbar
          open={snackbarStatus.open}
          autoHideDuration={snackbarDuration}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert severity={snackbarStatus.severity}>
            {snackbarStatus.message}
          </Alert>
        </Snackbar>
      </>
    </DashboardCard>
  );
};

export default CreateAccount;

import React, { Suspense, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/userContext";
import { CircularProgress, Snackbar, Alert } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const snackbarDuration = 2000;

  useEffect(() => {
    if (!loading && !user) {
      setSnackbarOpen(true);

      const timer = setTimeout(() => {
        router.push("/login/page");
      }, snackbarDuration);

      return () => clearTimeout(timer);
    }
  }, [user, loading, router]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (!loading && !user) {
    return (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={snackbarDuration}
          onClose={handleSnackbarClose}
        >
          <Alert severity="error">Unauthorized Access</Alert>
        </Snackbar>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

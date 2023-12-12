import { useCallback, useState } from "react";

export const useSnackbar = () => {
    const [snackbarStatus, setSnackbarStatus] = useState<SnackbarProps>({
      open: false,
      message: '',
      severity: 'error',
    });
  
    const handleSnackbarClose = useCallback(() => {
      setSnackbarStatus((prev) => ({ ...prev, open: false }));
    }, []);
  
    const handleSnackbarResponse = useCallback((result: { success: boolean; error?: string }, successMessage:string) => {
      if (result.success) {
        setSnackbarStatus({
          open: true,
          message: successMessage,
          severity: 'success',
        });
      } else if (result.error) {
        setSnackbarStatus({
          open: true,
          message: result.error,
          severity: 'error',
        });
      }
    }, []);
  
    return { snackbarStatus, handleSnackbarClose, handleSnackbarResponse };
  };
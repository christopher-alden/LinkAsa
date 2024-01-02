import { useState } from "react";
import { UserRole } from "../model/userAttributes";
import { UserStatus } from "../model/status";

export const useRegister = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    success: false,
  });

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    const defaultStatus = UserStatus.active;
    setState({ ...state, loading: true });

    try {
      const response = await fetch("/api/registerAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          username,
          email,
          password,
          role,
          status: defaultStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, Message: ${errorData.error}`
        );
      }

      setState({ loading: false, error: null, success: true });
      return { success: true, error: null };
    } catch (error) {
      setState({ loading: false, error: error.message, success: false });
      return { success: false, error: error.message };
    }
  };

  return { ...state, handleRegister };
};

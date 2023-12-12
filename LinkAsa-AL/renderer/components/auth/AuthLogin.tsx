import React, { useContext, useEffect } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";

import CustomTextField from "../forms/CustomTextField";
import { useRouter } from "next/router";
import { UserContext } from "../../context/userContext";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const { user, error, login } = useContext(UserContext); 
  const router = useRouter();

  useEffect(() => {
    console.log(user)
    if (user && !error){
      console.log("login success")
      router.push('/dashboard/page');
    }
  }, [user]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const email = e.target[0].value
    const password = e.target[2].value
    await login(email, password);
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
        <Stack>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={300}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Username
            </Typography>
            <CustomTextField variant="outlined" fullWidth />
          </Box>
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={300}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField type="password" variant="outlined" fullWidth />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remeber this Device"
              />
            </FormGroup>
            <Typography
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            sx={{ padding: "16px", fontWeight: "bold" }}
          >
            Sign In
          </Button>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;

"use client";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";

import PageContainer from "../../components/container/PageContainer";
import Logo from "../../components/layout/logo/Logo";
import AuthLogin from "../../components/auth/AuthLogin";
import Button from "@mui/material/Button"
import { useRouter } from "next/router";

const Login = () => {
  console.log("masuk sini ke login")
  const router = useRouter();
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            backgroundImage: "url('/images/LinkAsa_BG.jpg')",
            backgroundSize: "cover",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.5",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={10}
              sx={{
                p: 4,
                zIndex: 1,
                width: "100%",
                maxWidth: "500px",
                opacity: "0.9"
              }}
            >
              
              <Box
                sx={{ marginBottom: "1vh" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Logo />
              </Box>
              <AuthLogin />
              <Button onClick={()=>{router.push("/register/page")}}>Register</Button>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login;

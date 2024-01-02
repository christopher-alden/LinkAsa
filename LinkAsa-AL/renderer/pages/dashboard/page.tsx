// Dashboard.js
import React, { Suspense, useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import Sidebar from "../../components/layout/sidebar/Sidebar";
import { useUser } from "../../hooks/useUser";
import { useContent } from "../../hooks/useContent";
import { dashboardContents } from "../../services/dashboardAuthorize";
import ProtectedRoute from "../../components/middleware/ProtectedRoute";
import Header from "../../components/layout/header/Header";
import Logo from "../../components/layout/logo/Logo";

const DashboardPlaceholder = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection:"column",
        width: "full",
        height: "full",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        flexGrow:1,
        gap:4
      }}
    >
      <Logo />
      <Typography variant="button">if this issue presists, please contact hrd</Typography>
    </div>
  );
};

const Dashboard = () => {
  const { userData } = useUser();
  const { content, switchContent, accessibleContentObjects } = useContent(userData?.role);
  
  const renderContent = () => {
    const ContentComponent = dashboardContents[content];
    return (
      ContentComponent || <DashboardPlaceholder/>
    );
  };

  
  return (
    <ProtectedRoute>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          backgroundColor:'transparent'
        }}
        
      >
        <Box sx={{ width: "300px", flexShrink: 0 }}>
          <Sidebar
            userData={userData}
            accessibleContent={accessibleContentObjects}
            setContent={switchContent}
          />
        </Box>
        <Box sx={{ flexGrow: 1, flexShrink: 1, overflowY: "auto" }}>
          <Header />
          <Box sx={{ padding: 0, px: 8 }}>
            <Suspense fallback={<CircularProgress />}>
              {renderContent()}
            </Suspense>
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default Dashboard;

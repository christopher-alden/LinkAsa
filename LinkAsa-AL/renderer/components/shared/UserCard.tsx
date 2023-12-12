import { useUser } from "../../hooks/useUser";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

const UserCardSkeleton = () => {
  return (
    <Card variant="outlined" sx={{ padding: "8px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="60%" />
      </Box>
    </Card>
  );
};

const UserCard = ({}) => {
  const { userData, loading, error } = useUser();
  if (loading) return <UserCardSkeleton />;

  if (error) return <div>Error: {error.message}</div>;

  if (!userData) return <UserCardSkeleton />;

  return (
    <Tooltip title="Account Information">
      <Card
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        <Box px={2} py={1}>
          <Typography
            variant="body1"
            sx={{ fontWeight: "700", textTransform: "capitalize" }}
          >
            {userData.username}
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "text.secondary", textTransform: "capitalize" }}
          >
            {userData.role}
          </Typography>
        </Box>
      </Card>
    </Tooltip>
  );
};

export default UserCard;

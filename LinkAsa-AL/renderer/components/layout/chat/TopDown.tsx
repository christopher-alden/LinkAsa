import { Box, TextField, Button, CircularProgress } from '@mui/material';
const TopDown = ({children}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        minHeight:"80vh",
        gap: "1rem",
        flexShrink: 1,
        flexGrow:1,
        justifyContent:'space-between'
      }}
    >
      {children}
    </Box>
  );
};

export default TopDown
import { Typography, Stack, Card, Box, Tooltip, IconButton } from "@mui/material";

import {
  IconInfoCircle
} from "@tabler/icons-react";
import { LostItemStatus } from "../../../model/status";
import Label from "../label/Label";
// ----------------------------------------------------------------------
const statusLabelColor = {
  [LostItemStatus.claimed]: "default",
  [LostItemStatus.unclaimed]: "success",
  [LostItemStatus.untrackable]: "error",
};
// color={statusLabelColor[item.status]}
const ItemCard = ({ item }) => {
  const renderInfoIcon = (
    <Tooltip title={item.description}>
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <IconInfoCircle color="white"/>
      </IconButton>
    </Tooltip>
  );

  const renderImg = (
    <Box
      sx={{
        backgroundColor:"#000000",
      }}
    >
      <img
        alt={item.name}
        src={item.photo}
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.3s',
        }}
      />
      {renderInfoIcon}
    </Box>
  );

  return (
    <Card
      elevation={2}
      sx={{
        backgroundColor: "white",
        borderRadius: 3,
        boxShadow: "0px 0px 20px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ pt: "100%", position: "relative" }}>{renderImg}</Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1" noWrap>
            {item.name}
          </Typography>
          
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle2" color="#aaa" noWrap>
            {item.timestamp}
          </Typography>
          <Label color={statusLabelColor[item.status]}>{item.status}</Label>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ItemCard;

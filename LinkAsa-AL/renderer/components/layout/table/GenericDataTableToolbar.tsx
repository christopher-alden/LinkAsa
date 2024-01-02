import PropTypes from "prop-types";

import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import { IconSearch, IconCategory2, IconEye } from "@tabler/icons-react";
import { ChangeEvent } from "react";

// ----------------------------------------------------------------------
type GenericDataTableToolbarProps = {
  placeholder?: string;
  filterName: string;
  onFilterName: (event: ChangeEvent) => void;
};
const GenericDataTableToolbar = ({
  placeholder = "Search...",
  filterName,
  onFilterName,
}: GenericDataTableToolbarProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <OutlinedInput
        value={filterName}
        onChange={onFilterName}
        placeholder={placeholder}
        sx={{ display: "flex", gap: 1 }}
        startAdornment={
          <InputAdornment position="start">
            <IconSearch />
          </InputAdornment>
        }
      />
    </div>
  );
};

export default GenericDataTableToolbar;

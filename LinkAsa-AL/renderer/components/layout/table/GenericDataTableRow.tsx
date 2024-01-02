import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  Popover,
  MenuItem,
} from "@mui/material";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import Label from "../../widgets/label/Label";
import { IncidentStatus, UserStatus } from "../../../model/status";


type GenericDataTableRowProps<T> = {
  row: T;
  columns: Column[];
  selected?: boolean;
  handleClick?: any;
  handleUpdate?: any;
  handleDelete?: any;
};

const statusLabelColor: GlobalStatus = {
  [UserStatus.active]: "success",
  [UserStatus.pending]: "info",
  [UserStatus.leave]: "default",
  [UserStatus.deactivated]: "error",
  [IncidentStatus.severe]:"error",
  [IncidentStatus.moderate]:"warning",
  [IncidentStatus.light]:"warning",
  [IncidentStatus.resolved]:"success"
};

const GenericDataTableRow = <T extends DataModel>({
  row,
  columns,
  selected,
  handleClick,
  handleUpdate,
  handleDelete,
}: GenericDataTableRowProps<T>) => {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      {columns.map((column) => (
        <TableCell
          key={column.id}
          align={column.id === "edit" ? "right" : "inherit"}
          width={column.id === "edit" ? "50px" : "350px"}
          
          sx={{ zIndex: column.id === "edit" ? 0 : 10 , maxWidth:'350px'}}
        >
          {column.id === "status" ? (
            <div onClick={() => handleClick(row)}>
              <Label color={statusLabelColor[row.status]}>{row.status}</Label>
            </div>
          ) : column.id === "edit" ? (
            <IconButton onClick={handleOpenMenu}>
              <IconDotsVertical />
            </IconButton>
          ) : (
            <div className="line-clamp" onClick={() => handleClick(row)}>{row[column.id]}</div>
          )}
        </TableCell>
      ))}
      <Popover
        open={!!open}
        anchorEl={open}
        onClick={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 140,
            backgroundColor: "white",
            boxShadow: "0px 0px 20px -5px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <MenuItem
          onClick={handleUpdate}
          sx={{ display: "flex", gap: 1.5, padding: 2 }}
        >
          <IconEdit />
          Update
        </MenuItem>
        <MenuItem
          onClick={handleDelete}
          sx={{ display: "flex", gap: 1.5, padding: 2 }}
        >
          <IconTrash />
          Delete
        </MenuItem>
      </Popover>
    </TableRow>
  );
};

export default GenericDataTableRow;

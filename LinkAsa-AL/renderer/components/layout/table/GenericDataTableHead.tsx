import React from 'react';
import PropTypes from 'prop-types';
import { Box, TableRow, Checkbox, TableHead, TableCell, TableSortLabel, Typography } from '@mui/material';
import { visuallyHidden } from './utils';

type HeadCell = {
  id: string;
  label: string;
  align?: 'right' | 'left' | 'center';
  width?: string;
  minWidth?: string;
};

type GenericDataTableHeadProps = {
  order?: 'asc' | 'desc';
  orderBy?: string;
  rowCount?: number;
  headLabel?: Array<HeadCell>;
  numSelected?: number;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const GenericDataTableHead = ({
  order,
  orderBy,
  rowCount,
  headLabel,
  onRequestSort,
}: GenericDataTableHeadProps) => {
  const onSort = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort?.(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headLabel?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSort(headCell.id)}
            >
              <Typography variant='subtitle2' fontWeight={700}>{headCell.label}</Typography>
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default GenericDataTableHead;

import PropTypes from 'prop-types';

import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { IconSearch, IconCategory2, IconEye} from '@tabler/icons-react';


// ----------------------------------------------------------------------

export default function UserTableToolbar({ numSelected, filterName, onFilterName }) {
  return (
    <div
      style={{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:'2rem'
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
       
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          // sx={{display:'flex',gap:1}}
          
          startAdornment={
            <InputAdornment position="start" >
              <IconSearch/>
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="View Details">
          <IconEye/>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconCategory2/>
        </Tooltip>
      )}
    </div>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

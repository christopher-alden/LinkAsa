import PropTypes from 'prop-types';

import {Box,TableRow,Typography,TableCell} from '@mui/material';


// ----------------------------------------------------------------------
type GenericDataTableNoData = {
    query: string
}
const GenericDataTableNoData = ({ query }: GenericDataTableNoData) => {
  return (
    <TableRow>
      <TableCell colSpan={6} sx={{ py: 6,alignItems:'center' }}>
        <Box
        // elevation={0}
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Not found
          </Typography>

          <Typography variant="body2">
            No results found for &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> "Yang beneeer searchnya" -AL.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default GenericDataTableNoData


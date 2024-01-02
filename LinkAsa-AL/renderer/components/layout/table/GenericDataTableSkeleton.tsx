import {
  Card,
  TableContainer,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Skeleton,
} from "@mui/material";

const GenericDataTableSkeleton: React.FC = () => {
  const numberOfRows = 5;

  return (
    <Card sx={{boxShadow:'none'}}>
      <TableContainer>
        <Table sx={{ maxWidth: "100%" }} padding="normal">
          <TableBody>
            {Array.from(new Array(numberOfRows)).map((_, index) => (
              <TableRow key={index}>
                <TableCell sx={{ padding: 3 }} padding="checkbox">
                  <Skeleton variant="rectangular" width={24} height={24} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell>
                  <Skeleton variant="text" />
                </TableCell>
                <TableCell align="right">
                  <Skeleton variant="text" width={24} height={24} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default GenericDataTableSkeleton;

import PropTypes from 'prop-types';
import { ListSubheader, styled, Theme, Skeleton, Box } from '@mui/material';

type NavGroup = {
  navlabel?: boolean;
  subheader?: string;
};

interface ItemType {
  item: NavGroup;
}

export const NavGroupSkeleton = () => {
  return (
    <Box sx={{ px: 3, py: 1, mt:2 }}>
      <Skeleton variant="text" width="100%" height={24} />
    </Box>
  );
};


const NavGroup = ({ item }: ItemType) => {
  const ListSubheaderStyle = styled((props: Theme | any) => <ListSubheader disableSticky {...props} />)(
    ({ theme }) => ({
      // ...theme.typography.overline,
      fontFamily:"suisse",
      fontWeight: '700',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0),
      color: theme.palette.text.primary,
      lineHeight: '26px',
      padding: '3px 12px',
    }),
  );

  const title = item.subheader.replace(/_/g, ' ').charAt(0).toUpperCase() +  item.subheader.replace(/_/g, ' ').slice(1);
  return (
    <ListSubheaderStyle>{title}</ListSubheaderStyle>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object,
};

export default NavGroup;

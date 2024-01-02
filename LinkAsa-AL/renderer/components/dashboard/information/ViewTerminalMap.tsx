
import DashboardCard from '../../shared/DashboardCard';

import Grid from "@mui/material/Unstable_Grid2";
import TerminalMapCard from '../../widgets/cards/TerminalMapCard';

const TerminalMapsDashboard = () => {
  const terminalMaps = [
    { id: '1', title: 'Terminal A', image: '/images/TerminalA.jpg' },
    { id: '2', title: 'Terminal B', image: '/images/TerminalB.webp' },
    { id: '3', title: 'Terminal C', image: '/images/TerminalC.webp' },
    { id: '4', title: 'Terminal D', image: '/images/TerminalD.webp' },
  ];

  return (
    <DashboardCard title="View Terminal Map">
      <>
        <Grid container spacing={3}>
          {terminalMaps.map((map) => (
            <Grid key={map.id} xs={12} sm={6} md={3}>
              <TerminalMapCard key={map.id} map={map} />
            </Grid>
          ))}
        </Grid>
      </>
    </DashboardCard>
  );
};

export default TerminalMapsDashboard;

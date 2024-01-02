import React, { useEffect, useState } from "react";
import useCrud from "../../../hooks/useCrud";
import { clientDb } from "../../../lib/firebase";
import GenericDataTable from "../../layout/table/GenericDataTable";
import DashboardCard from "../../shared/DashboardCard";
import GenericDataTableSkeleton from "../../layout/table/GenericDataTableSkeleton";
import { useSnackbar } from "../../../hooks/useSnackbar";
import { Snackbar, Alert } from "@mui/material/";
import UpdateFlight from "./UpdateFlight";

const ViewFlights: React.FC = () => {
  const [detailedFlights, setDetailedFlights] = useState([]);

  const { documents:planes } = useCrud({
    db: clientDb,
    collectionName: "planes",
  });
  const { documents:airports } = useCrud({
    db: clientDb,
    collectionName: "airports",
  });
  const {documents:flights ,loading ,deleteDocument,} = useCrud({
    db: clientDb,
    collectionName: "flights",
  });

  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { snackbarStatus, handleSnackbarClose, handleSnackbarResponse } =
    useSnackbar();
  const snackbarDuration = 3000;

  const planesById = planes.reduce((acc, plane) => {
    acc[plane.id] = plane;
    return acc;
  }, {});
  
  const airportsById = airports.reduce((acc, airport) => {
    acc[airport.id] = airport;
    return acc;
  }, {});

  useEffect(() => {
    const fetchDetails = () => {
        const detailedData = flights.map(flight => {
          const plane = planesById[flight.planeId];
          const departure = airportsById[flight.departureId];
          const arrival = airportsById[flight.arrivalId];
    
          return {
            ...flight,
            planeCode: plane?.code,
            departureCode: departure?.code,
            arrivalCode: arrival?.code,
          };
        });
    
        setDetailedFlights(detailedData);
      };

    if (flights.length > 0) {
      fetchDetails();
    }
    else setDetailedFlights([])
  }, [flights]);

  const headLabel = [
    { id: "flightId", label: "Flight ID" },
    { id: "planeCode", label: "Plane Code" },
    { id: "departureCode", label: "Departure" },
    { id: "arrivalCode", label: "Arrival" },
    { id: "timestamp", label: "Time" },
    // { id: "price", label: "Price" },
    { id: "status", label: "Status" },
    { id: "edit", label: "" },
  ];

  const handleDelete = (id: string) => {
    deleteDocument(id);
  };

  const handleUpdateDialogOpen = (data) => {
    setSelectedData(data);
    setIsUpdateDialogOpen(true);
  };

  const handleUpdateDialogClose = () => {
    setIsUpdateDialogOpen(false);
  };

  return (
    <DashboardCard title="View Flights">
      <>
        {loading ? (
          <GenericDataTableSkeleton />
        ) : (
          <GenericDataTable
            filterBy={"flightId"}
            columns={headLabel}
            data={detailedFlights}
            onUpdate={handleUpdateDialogOpen}
            onDelete={handleDelete}
          />
        )}
        {isUpdateDialogOpen && (
          <UpdateFlight
            onUpdate={(result) => {
              handleSnackbarResponse(result, "Flight Successfully Updated");
            }}
            open={isUpdateDialogOpen}
            onClose={handleUpdateDialogClose}
            data={selectedData}
          />
        )}

        <Snackbar
          open={snackbarStatus.open}
          autoHideDuration={snackbarDuration}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={snackbarStatus.severity}>
            {snackbarStatus.message}
          </Alert>
        </Snackbar>
      </>
    </DashboardCard>
  );
};

export default ViewFlights;

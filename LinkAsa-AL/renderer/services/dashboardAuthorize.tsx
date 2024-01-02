import React from 'react';

// const TableDisplay = React.lazy(() => import('../components/dashboard/scheduleManagement/TableDisplay'));
const ViewSchedule = React.lazy(() => import('../components/dashboard/scheduleManagement/ViewSchedule'));
const CreateSchedule = React.lazy(() => import('../components/dashboard/scheduleManagement/CreateSchedule'));
const CreateAccount = React.lazy(()=> import('../components/dashboard/employeeManagement/CreateAccount'))
const JobVacancies = React.lazy(()=> import('../components/dashboard/employeeManagement/JobVacancies'))
const PostJobVacancy = React.lazy(()=> import('../components/dashboard/employeeManagement/PostJobVacancy'))
const EmployeeData = React.lazy(()=> import('../components/dashboard/employeeManagement/EmployeeData'))
const Broadcast = React.lazy(()=> import('../components/dashboard/chat/Broadcast'))
const InterDepartment = React.lazy(()=> import('../components/dashboard/chat/InterDepartment'))
const WeatherDashboard = React.lazy(()=> import('../components/dashboard/weather/WeatherDashboard'))
const RegisterLostItem = React.lazy(()=> import('../components/dashboard/lostAndFound/RegisterLostItem'))
const ViewLostItem = React.lazy(()=> import('../components/dashboard/lostAndFound/ViewLostItem'))
const CreateTrainingSchedule = React.lazy(()=> import('../components/dashboard/employeeManagement/CreateTrainingSchedule'))
const ViewTrainingSchedule = React.lazy(()=> import('../components/dashboard/employeeManagement/ViewTrainingSchedule'))
const RegisterPlane = React.lazy(()=> import('../components/dashboard/flightOperationManagement/RegisterPlane'))
const ViewPlane =  React.lazy(()=> import('../components/dashboard/flightOperationManagement/ViewPlane'))
const RegisterAirport =  React.lazy(()=> import('../components/dashboard/flightOperationManagement/RegisterAirport'))
const ViewAirport =  React.lazy(()=> import('../components/dashboard/flightOperationManagement/ViewAirport'))
const RegisterFlight =  React.lazy(()=> import('../components/dashboard/flightManagement/RegisterFlight'))
const ViewFlight =  React.lazy(()=> import('../components/dashboard/flightManagement/ViewFlight'))
const CreateIncidentLog =  React.lazy(()=> import('../components/dashboard/securityManagement/CreateIncidentLog'))
const ViewIncidentLog =  React.lazy(()=> import('../components/dashboard/securityManagement/ViewIncidentLog'))
const ViewTerminalMap =  React.lazy(()=> import('../components/dashboard/information/ViewTerminalMap'))
const FlightEntry =  React.lazy(()=> import('../components/dashboard/passengerManagement/FlightEntry'))
const ViewPassengerDetail =  React.lazy(()=> import('../components/dashboard/passengerManagement/ViewPassengerDetail'))
const ViewLuggageDetail =  React.lazy(()=> import('../components/dashboard/passengerManagement/ViewLuggageDetail'))
const AddMaintenanceSchedule =  React.lazy(()=> import('../components/dashboard/maintenanceManagement/AddMaintenanceSchedule'))
const ViewMaintenanceSchedule =  React.lazy(()=> import('../components/dashboard/maintenanceManagement/ViewMaintenanceSchedule'))

export const dashboardContents = {
  // Dashboard: <TableDisplay />,
  View_Schedule: <ViewSchedule />,
  Create_Schedule: <CreateSchedule />,
  Create_Account: <CreateAccount/>,
  Employee_Data: <EmployeeData/>,
  Broadcast: <Broadcast/>,
  Inter_Department : <InterDepartment/>,
  Weather_Dashboard: <WeatherDashboard/>,
  Register_Lost_Item: <RegisterLostItem/>,
  View_Lost_Item: <ViewLostItem/>,
  Job_Vacancies: <JobVacancies/>,
  Post_Job_Vacancy: <PostJobVacancy/>,
  Create_Training_Schedule: <CreateTrainingSchedule/>,
  View_Training_Schedule:<ViewTrainingSchedule/>,
  Register_Plane:<RegisterPlane/>,
  View_Plane: <ViewPlane/>,
  Register_Airport:<RegisterAirport/>,
  View_Airport:<ViewAirport/>,
  Register_Flight:<RegisterFlight/>,
  View_Flight:<ViewFlight/>,
  Create_Incident_Log:<CreateIncidentLog/>,
  View_Incident_Log:<ViewIncidentLog/>,
  View_Terminal_Map:<ViewTerminalMap/>,
  Flight_Entry:<FlightEntry/>,
  View_Passenger_Detail:<ViewPassengerDetail/>,
  View_Luggage_Detail:<ViewLuggageDetail/>,
  Add_Maintenance:<AddMaintenanceSchedule/>,
  View_Maintenance:<ViewMaintenanceSchedule/>
};

import React from 'react';

const TableDisplay = React.lazy(() => import('../components/dashboard/scheduleManagement/TableDisplay'));
const ViewSchedule = React.lazy(() => import('../components/dashboard/scheduleManagement/ViewSchedule'));
const CreateSchedule = React.lazy(() => import('../components/dashboard/scheduleManagement/CreateSchedule'));
const CreateAccount = React.lazy(()=> import('../components/dashboard/accountManagement/CreateAccount'))
const EmployeeData = React.lazy(()=> import('../components/dashboard/accountManagement/EmployeeData'))
const Broadcast = React.lazy(()=> import('../components/dashboard/chat/Broadcast'))
const InterDepartment = React.lazy(()=> import('../components/dashboard/chat/InterDepartment'))

export const dashboardContents = {
  Dashboard: <TableDisplay />,
  View_Schedule: <ViewSchedule />,
  Create_Schedule: <CreateSchedule />,
  Create_Account: <CreateAccount/>,
  Employee_Data: <EmployeeData/>,
  Broadcast: <Broadcast/>,
  Inter_Department : <InterDepartment/>
};

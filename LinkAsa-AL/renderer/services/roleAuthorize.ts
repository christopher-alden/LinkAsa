import { UserRole } from "../model/userAttributes";

export const roleAuthorize = {
  [UserRole.Testing]: {
    DASHBOARD: ["Dashboard"],
    SCHEDULE_MANAGEMENT: ["Create_Schedule", "View_Schedule"],
    EMPLOYEE_MANAGEMENT: ["Create_Account","Employee_Data"],
    COMMUNICATION: ["Broadcast", "Inter_Department"]
  },
  [UserRole.Airport_Operations_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Baggage_Security_Supervisor]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.CEO]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.CFO]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.COO]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.CSO]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Cargo_Handlers]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Cargo_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.CheckIn_Staff]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Civil_Engineering_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Customer_Service_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Customs_and_Border_Controls_Officer]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Flight_Operations_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Fuel_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Gate_Agents]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Ground_Handling_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.HRD]:{
    DASHBOARD: ["Dashboard"],
    EMPLOYEE_MANAGEMENT: ["Create_Account","Employee_Data"],
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Information_Desk_Staff]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Landside_Operations_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Logistics_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Lost_and_Found_Staff]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
  [UserRole.Maintenance_Manager]:{
    COMMUNICATION: ["Broadcast","Inter_Department"]
  },
};

export const getAccessibleContent = (role: UserRole) => {
  const access = roleAuthorize[role] || {};
  return Object.entries(access).map(([label, items]) => ({ label, items }));
};

import {
  IconCopy,
  IconLayoutDashboard,
  IconTypography,
  IconUserPlus,
  IconUsersGroup,
  IconBroadcast,
  IconMessages,
  IconCloud,
  IconLuggageOff,
  IconPackages,
  IconBriefcase2,
  IconBriefcase,
  IconMoodSmileBeam,
  IconMoodWink2,
  IconPlane,
  IconWorld,
  IconPlaneDeparture,
  IconPlaneTilt,
  IconAlertTriangle
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const iconsMap = {
  Dashboard: IconLayoutDashboard,
  View_Schedule: IconTypography,
  Create_Schedule: IconCopy,
  Create_Account: IconUserPlus,
  Employee_Data: IconUsersGroup,
  Broadcast: IconBroadcast,
  Inter_Department: IconMessages,
  Weather_Dashboard: IconCloud,
  Register_Lost_Item: IconLuggageOff,
  View_Lost_Item: IconPackages,
  Job_Vacancies: IconBriefcase2,
  Post_Job_Vacancy: IconBriefcase,
  Create_Training_Schedule: IconMoodSmileBeam,
  View_Training_Schedule: IconMoodWink2,
  Register_Plane: IconPlane,
  View_Plane: IconPlane,
  Register_Airport: IconWorld,
  View_Airport: IconWorld,
  Register_Flight:IconPlaneDeparture,
  View_Flight:IconPlaneTilt,
  Create_Incident_Log:IconAlertTriangle,
  View_Incident_Log:IconAlertTriangle
};


export { iconsMap };


const generateSidebarMenuContent = (key) => {
  const title = key.replace(/_/g, ' ')
  return {
    id: uniqueId(),
    title: title,
    icon: iconsMap[key],
  };
};


export default generateSidebarMenuContent;

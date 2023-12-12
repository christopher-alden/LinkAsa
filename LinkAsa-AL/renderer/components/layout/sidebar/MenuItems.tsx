import {
  IconCopy,
  IconLayoutDashboard,
  IconTypography,
  IconUserPlus,
  IconUsersGroup,
  IconBroadcast,
  IconMessages
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const iconsMap = {
  Dashboard: IconLayoutDashboard,
  View_Schedule: IconTypography,
  Create_Schedule: IconCopy,
  Create_Account: IconUserPlus,
  Employee_Data: IconUsersGroup,
  Broadcast: IconBroadcast,
  Inter_Department: IconMessages
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

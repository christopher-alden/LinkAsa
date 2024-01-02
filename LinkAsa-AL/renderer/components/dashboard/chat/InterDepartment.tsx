import DashboardCard from "../../shared/DashboardCard";
import { UserRole } from "../../../model/userAttributes";
import {
  Select,
  Box,
  MenuItem,
  SelectChangeEvent,
  Button,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import TopDown from "../../layout/chat/TopDown";
import { useUser } from "../../../hooks/useUser";
import { fetchRoomChat, sendMessage } from "../../../services/chatRoomAccess";
import MessageBubble from "../../widgets/message/MessageBubble";

function getKeyByValue(value: string) {
  const indexOfS = Object.values(UserRole).indexOf(value as UserRole);
  return Object.keys(UserRole)[indexOfS];;
}
const getRoom = (role1: UserRole, role2: UserRole) => {
  return [getKeyByValue(role1), getKeyByValue(role2)].sort().join("-");
};

const InterDepartment = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState(UserRole.Airport_Operations_Manager);
  const { userData, loading } = useUser();
  const [currRoom, setCurrRoom] = useState<string | null>(null);
  const messagesEndRef = useRef(null);

  const handleRoleChange = (event: SelectChangeEvent<UserRole>) => {
    setSelectedRole(event.target.value as UserRole);
  };

  const excludeRoles = () => {
    const rolesToExclude = [userData.role, UserRole.CEO, UserRole.CFO, UserRole.COO, UserRole.CSO, UserRole.Staff, UserRole.Flight_Crew as UserRole]
    return Object.values(UserRole).filter(role => !rolesToExclude.includes(role));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      await sendMessage(
        currRoom,
        userData.username,
        newMessage,
        userData.role
      );
      setNewMessage("");
    }
  };

  useEffect(() => {
    if (!loading && userData.role) {
      setCurrRoom(getRoom(userData.role, selectedRole));
    }
  }, [userData, selectedRole, loading]);

  useEffect(() => {
    let unsubscribe = () => {};
    if (currRoom) {
      unsubscribe = fetchRoomChat(currRoom, setMessages);
    }
    return unsubscribe;
  }, [currRoom]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
 

  
  if (loading) return <></>;
  
  const departmentRole = excludeRoles();

  return (
    <DashboardCard title="Inter Department">
        <TopDown>
        <Select
          id="role"
          value={selectedRole}
          onChange={handleRoleChange}
          fullWidth
        >
          {Object.values(departmentRole).map((role) => (
            <MenuItem key={role} value={role} sx={{backgroundColor:'white !important'}}>
              {role}
            </MenuItem>
          ))}
        </Select>
          <Box
            sx={{
              flexGrow: 0,
              overflowY: "auto",
              padding: 1,
              minHeight: "75%",
            }}
          >
            {messages.map((message, index, arr) => {
              const showSender =
                index === 0 || arr[index - 1].sender !== message.sender;
              return (
                <MessageBubble
                  currentUser={userData.username}
                  showSender={showSender}
                  key={message.id}
                  message={message}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </Box>
          <form onSubmit={handleSendMessage}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type to chat"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button
                sx={{ padding: 2, paddingInline: 4 }}
                type="submit"
                variant="contained"
              >
                Send
              </Button>
            </Box>
          </form>
        </TopDown>
    </DashboardCard>
  );
};

export default InterDepartment;

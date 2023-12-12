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
import ChatRoom from "../components/message/ChatRoom";
import { useUser } from "../../../hooks/useUser";
import { fetchRoomChat, sendMessage } from "../../../services/chatRoomAccess";
import MessageBubble from "../components/message/MessageBubble";

function getKeyByValue(value: string) {
  const indexOfS = Object.values(UserRole).indexOf(
    value as unknown as UserRole
  );

  const key = Object.keys(UserRole)[indexOfS];

  return key;
}
const getRoom = (role1: UserRole, role2: UserRole) => {
  return [getKeyByValue(role1), getKeyByValue(role2)].sort().join("-");
};

const InterDepartment = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState(UserRole.Testing);
  const { userData, loading } = useUser();
  const [currRoom, setCurrRoom] = useState<string | null>(null);
  const messagesEndRef = useRef(null);

  const handleRoleChange = (event: SelectChangeEvent<UserRole>) => {
    setSelectedRole(event.target.value as UserRole);
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

  return (
    <DashboardCard title="Inter Department">
      <>
        <ChatRoom>
        <Select
          id="role"
          value={selectedRole}
          onChange={handleRoleChange}
          fullWidth
        >
          {Object.values(UserRole).map((role) => (
            <MenuItem key={role} value={role}>
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
        </ChatRoom>
      </>
    </DashboardCard>
  );
};

export default InterDepartment;

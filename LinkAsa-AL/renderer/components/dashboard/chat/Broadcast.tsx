import React, { useState, useEffect, useRef } from "react";
import { fetchRoomChat, sendMessage } from "../../../services/chatRoomAccess";
import MessageBubble from "../../widgets/message/MessageBubble";
import { useUser } from "../../../hooks/useUser";
import { Box, TextField, Button } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";
import TopDown from "../../layout/chat/TopDown";

const Broadcast = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userData, loading } = useUser();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const unsubscribe = fetchRoomChat("broadcast", setMessages);
    return unsubscribe;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      await sendMessage(
        "broadcast",
        userData.username,
        newMessage,
        userData.role
      );
      setNewMessage("");
    }
  };

  if (loading) return <></>;

  return (
    <DashboardCard title="Broadcast">
      <TopDown>
        <Box
          sx={{ flexGrow: 0, overflowY: "auto", padding: 1, minHeight: "80%" }}
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
              placeholder="Broadcast to Global Chat"
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

export default Broadcast;

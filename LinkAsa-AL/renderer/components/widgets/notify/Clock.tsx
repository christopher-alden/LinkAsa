"use client"

import { useState, useEffect } from "react"
import { Typography} from "@mui/material"
const Clock = () =>{
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        const time = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setCurrentTime(time);
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <Typography variant="h6">{currentTime}</Typography>
    );
}

export default Clock
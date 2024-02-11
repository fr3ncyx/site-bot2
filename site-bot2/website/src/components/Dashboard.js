import React, { useState, useEffect } from "react";

// Make the dashboard component
const Dashboard = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:3000");

        ws.onopen = () => {
            console.log('[✓]', "WebSocket connection open");
        };

        ws.onmessage = (event) => {
            console.log(`Received message: ${event.data}`);
        };

        setSocket(ws);

        return () => {
            ws.close();
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();


        const message = event.target.message.value;

        socket.send(message);

        console.log(`Sent message: ${message}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="message" />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
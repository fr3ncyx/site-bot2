import React, { useState, useEffect} from "react";

const App = ({wsClient}) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        wsClient.onopen = () => {
            console.log("WebSocket client connected!")
        };

        wsClient.onmessage = (event) => {
            setMessages([...messages, event.data]);
        };

        return () => {
            wsClient.close();
        }
    }, []);

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        wsClient.send(message);
        setMessage("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                value= {message}
                onChange={handleMessageChange}
                />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((message, index) => {
                    <li key={index}>{message}</li>
                })}
            </ul>
        </div>
    );
};

export default App;
export function createWebSocketClient() {
    const socket = new WebSocket("ws://localhost:3000");

    socket.addEventListener("open", (event) => {
        console.log("Websocket connected")
    });

    socket.addEventListener("message", (event) => {
        console.log("Websocket message received:", event.data)
    });

    return socket;
}
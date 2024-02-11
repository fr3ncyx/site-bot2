const {
    Client,
    GatewayIntentBits,
    Partials,
    Collection
} = require("discord.js");
const express = require("express");
const http = require("http");
const { Server } = require("ws");
const path = require("path");

const port = 3000;
const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)]
});

const { loadCommands } = require("./bot/Handlers/commandHandler.js");
const { loadEvents } = require("./bot/Handlers/eventHandler");

client.commands = new Collection();
client.config = require("./config.json");

client.login(client.config.token).then(() => {
    loadCommands(client);
    loadEvents(client);
});

// Serve the React dashboard using express
app.use(express.static(path.join(__dirname, "/website/build")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/website/build", "index.html"));
});

//Create websocket server
wss.on("connection", (ws) => {
    // Listen for the websockets "message" event (built-in)
    ws.on("message", (message) => {
        // Handle incoming messages from the react dashboard
        console.log(`Received message: ${message}`);
    });
});

// Start the server on the given port (3000)
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
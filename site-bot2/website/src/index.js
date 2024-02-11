import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createWebSocketClient } from "./websocket";

const wsClient = createWebSocketClient();

ReactDOM.render(
    <React.StrictMode>
        <App wsClient={wsClient}></App>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
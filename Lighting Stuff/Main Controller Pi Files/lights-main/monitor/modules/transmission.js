import { rootCertificates } from "tls";
import { WebSocket } from "ws";
export const rootCertificate = `-----BEGIN CERTIFICATE-----
MIIGQjCCBCoCCQCt8tI7yxq1QjANBgkqhkiG9w0BAQsFADCB4jELMAkGA1UEBhMC
Q0ExEDAOBgNVBAgMB0FsYmVydGExEDAOBgNVBAcMB0NhbGdhcnkxGjAYBgNVBAoM
EUphZGUgSW5jb3Jwb3JhdGVkMTowOAYDVQQLDDFUaGVKYWRlcydzIENlcnRpZmlj
YXRlIEF1dGhvcml0eSBmb3IgUGVyc29uYWwgVXNlMS0wKwYDVQQDDCRSb290IEF1
dGhvcml0eSBvZiBUaGVKYWRlcydzIE5ldHdvcmsxKDAmBgkqhkiG9w0BCQEWGXRo
ZWphZGVzaXNmYXQ3N0BnbWFpbC5jb20wHhcNMjIwODIyMDU1NTU3WhcNMjcwODIx
MDU1NTU3WjCB4jELMAkGA1UEBhMCQ0ExEDAOBgNVBAgMB0FsYmVydGExEDAOBgNV
BAcMB0NhbGdhcnkxGjAYBgNVBAoMEUphZGUgSW5jb3Jwb3JhdGVkMTowOAYDVQQL
DDFUaGVKYWRlcydzIENlcnRpZmljYXRlIEF1dGhvcml0eSBmb3IgUGVyc29uYWwg
VXNlMS0wKwYDVQQDDCRSb290IEF1dGhvcml0eSBvZiBUaGVKYWRlcydzIE5ldHdv
cmsxKDAmBgkqhkiG9w0BCQEWGXRoZWphZGVzaXNmYXQ3N0BnbWFpbC5jb20wggIi
MA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoICAQDFbkt5TQsT2cSQQwW94KIBB1G3
1/Igmw6H+ZVu/wGXOhCGYDhWUq5EZiNQxnPa/sCMl1/zli5qreNd8dL1EKGUhTdI
qK5uXY+N2+vN4j+0WFH+DZxY8LmjEMD3h+ad6+sn4siJmrAsvaYLLjFKF3vHiAJ4
/AXUhCFNPi3o+OwNdrYQNv05K3EDP1RIwwc5HkN3A0/s9Sva3FMjOXv61pecbaaq
JdenX1Ye80fnzE8hISEgP4rXFqoPvzqa/vx9aozyntFVb/U+d76rGAWx9waoRbnu
o8Rbm/cYoAuuk0juCBh6dR2fp0eKhFnVQ2th83UXTIvGAERv8g9kusNKPOdANDsE
z4RUmlLSGMxR6NffeeAWGUP/ZY3eS8Is78ven7VyQXfX7y1ZKuc4zVLFDTRuf9kz
OTVX9bvNqv8mVZV/0Wmh66vxiwzVllM0DPZTYex9aINg8uZSD0YcBv8OpJfnVPjY
lFg7DEszC7/YH8huJxb+I+31ePvaIO8AdFnuPXYKYpVqROdcv+1J2r5+4PUfwLqA
AxSp+yrckYl46e9e/9/1uGVCwwLWMgShER79Tv2PXO5raw5hDZ1DIzxmnflxvTz9
5hSVHdw0r5zvHXyJn0JwCYsdB+yKVDHGG9ZRcwNrXI1WoQo9VdL3rKbzmbpszeF6
3DV816S77gG+OPpMHQIDAQABMA0GCSqGSIb3DQEBCwUAA4ICAQBOciEBxA4czjaG
01EqvT7SJ5F2TqcsHIm70W5d5b1eM9umGMnlM09BMyEvTGYrDqE6UJKu5FHpccrE
Zd7kkuoCSXr5ed4iHvt0d6UcrMOVgs9lPOenol4IGOhlq5P76a4oxEXn57J7k56y
qYGHZbs5rXGZzB72mqD6zYZwrnUd28UOneWdptdt+ZBH4R0Ouljjl3xJ7cZXON2u
ppMG4KpQpLYRdcd4GYQ2z1CFD9Sw1XrVphGUquz7AH3T3mC1/NZ2/6J9tbRW36D6
hBfj7UW3pXHZiDxwsAPbm4A9HXhboI/occruIh+EDxCFRg0bqbzroVn8+4LFNoO6
UH2IXR8guWz0MAnZLxMO/6ktgwYqH1CVt6rZrNObqGgi+PC4afmqyUPjgMThLY+v
olTp7za+PhyVS03Wt4n+rSbxFVXSSkx9rcs0va8RBJDypXoQFeNxA4TB7+4D+FUN
Pxxi2TgXHrCYPr+M9ZYO8SPpaIAE8G6OQt9zkhn4QMt2YZTPgyUxPk9IrpaEK4vd
7gKDnZyBH5B1vFiv17liJx+vXdRjL27h05nnb4dkMRCpj97mMAEBnsw4SRCFQ6J2
ScsMHmXJLcTmVzGNiF8M45iZipxIa8/UYBWhUpPe10nBzywS1LFLPz8vcK7/DQ/W
o6O53P1YdA0x+Lfox1012C9h+39gaw==
-----END CERTIFICATE-----`;
export class TransmissionRequest {
    constructor(messageID, messageTask, messageContent, callback) {
        this.messageID = messageID;
        this.messageTask = messageTask;
        this.messageContent = messageContent;
        this.callback = callback;
    }
}
export const trustedCertificates = [rootCertificate];
for (let rootCertificate of rootCertificates) {
    trustedCertificates.push(rootCertificate);
}
export class TransmissionServer {
    constructor(webSocketServer, authenticationKey = null) {
        this.listeners = new Map();
        this.connectedSockets = [];
        this.listeners = new Map();
        this.authenticationKey = authenticationKey;
        this.connectedSockets = [];
        webSocketServer.on("connection", (socket) => {
            let processTransmissionMessage = (recievedMessage) => {
                let message = JSON.parse(String(recievedMessage));
                let messageId = message.MessageID;
                let messageContent = message.MessageContent;
                let messageTask = message.MessageTask;
                switch (messageTask) {
                    default: {
                        if (this.listeners.has(messageTask)) {
                            this.listeners.get(messageTask)(messageContent).then(data => {
                                socket.send(JSON.stringify({
                                    MessageID: messageId,
                                    MessageContent: data
                                }));
                            });
                        }
                        else {
                        }
                    }
                }
            };
            if (this.authenticationKey) {
                socket.once("message", (recievedMessage) => {
                    let message = JSON.parse(String(recievedMessage));
                    let messageContent = message.MessageContent;
                    let messageTask = message.MessageTask;
                    if (messageTask == "Authenticate" && messageContent == this.authenticationKey) {
                        this.connectedSockets.push(socket);
                        socket.on("message", processTransmissionMessage);
                    }
                    else
                        socket.close();
                });
            }
            else {
                this.connectedSockets.push(socket);
                socket.on("message", processTransmissionMessage);
            }
            let keepAliveInterval = setInterval(() => {
                socket.ping();
            }, 2000);
            socket.once("close", () => {
                clearInterval(keepAliveInterval);
                let index = this.connectedSockets.findIndex(iSocket => socket == iSocket);
                if (index == -1)
                    return;
                this.connectedSockets.splice(index, 1);
            });
            socket.once("error", () => {
                clearInterval(keepAliveInterval);
                let index = this.connectedSockets.findIndex(iSocket => socket == iSocket);
                if (index == -1)
                    return;
                this.connectedSockets.splice(index, 1);
            });
        });
    }
    sendMessage(messageTask, content) {
        for (let connectedSocket of this.connectedSockets) {
            connectedSocket.send(JSON.stringify({
                GlobalMessage: true,
                MessageTask: messageTask,
                MessageContent: content
            }));
        }
    }
    attachListener(messageTask, processor) {
        this.listeners.set(messageTask, processor);
    }
}
export class Transmission {
    constructor(hostname, port = 443, authenticationKey = null) {
        this.currentMessageId = 0;
        this.host = "";
        this.connectionState = "disconnected";
        this.runningWebSocket = null;
        this.globalMessageListeners = new Map();
        this.pendingRequests = new Map();
        this.autoReconnect = true;
        this.autoReconnectTimer = 1000;
        this.currentMessageId = 0;
        this.connectionState = "disconnected";
        this.runningWebSocket = null;
        this.globalMessageListeners = new Map();
        this.pendingRequests = new Map();
        this.host = `wss://${hostname}:${port}`;
        this.authenticationKey = authenticationKey;
    }
    queryMessage(messageTask, messageContent) {
        return new Promise((accept) => {
            this.currentMessageId += 1;
            let pendingRequest = new TransmissionRequest(this.currentMessageId, messageTask, messageContent, accept);
            this.pendingRequests.set(pendingRequest.messageID, pendingRequest);
            if (this.connectionState == "connected") {
                this.runningWebSocket.send(JSON.stringify({
                    MessageID: pendingRequest.messageID,
                    MessageTask: pendingRequest.messageTask,
                    MessageContent: pendingRequest.messageContent,
                }));
            }
        });
    }
    attachGlobalMessageListener(messageTask, messageListener) {
        if (this.globalMessageListeners.has(messageTask) == false) {
            this.globalMessageListeners.set(messageTask, []);
        }
        this.globalMessageListeners.get(messageTask).push(messageListener);
    }
    attemptConnection() {
        return new Promise((accept, reject) => {
            if (this.connectionState == "disconnected") {
                let webSocket = new WebSocket(this.host, {
                    ca: trustedCertificates
                });
                this.runningWebSocket = webSocket;
                this.connectionState = "connecting";
                webSocket.addEventListener("message", (recievedMessage) => {
                    let message = JSON.parse(String(recievedMessage.data));
                    let messageId = message.MessageID;
                    let messageContent = message.MessageContent;
                    if (message.GlobalMessage) {
                        let messageTask = message.MessageTask;
                        let listeners = this.globalMessageListeners.get(messageTask);
                        if (listeners) {
                            for (let listener of listeners) {
                                listener(messageContent);
                            }
                        }
                    }
                    else {
                        let pendingRequest = this.pendingRequests.get(messageId);
                        pendingRequest === null || pendingRequest === void 0 ? void 0 : pendingRequest.callback(messageContent);
                        this.pendingRequests.delete(messageId);
                    }
                });
                webSocket.addEventListener("close", () => {
                    this.runningWebSocket = null;
                    this.connectionState = "disconnected";
                    if (this.autoReconnect) {
                        setTimeout(() => {
                            this.attemptConnection();
                        }, this.autoReconnectTimer);
                    }
                }, {
                    once: true
                });
                webSocket.addEventListener("error", (error) => {
                    this.runningWebSocket = null;
                    this.connectionState = "disconnected";
                    if (this.autoReconnect) {
                        setTimeout(() => {
                            this.attemptConnection();
                        }, this.autoReconnectTimer);
                    }
                }, {
                    once: true
                });
                webSocket.addEventListener("open", () => {
                    webSocket.send(JSON.stringify({
                        MessageTask: "Authenticate",
                        MessageContent: this.authenticationKey
                    }));
                    let previousPendingRequest = this.pendingRequests.values();
                    this.pendingRequests = new Map();
                    this.connectionState = "connected";
                    for (let pendingRequest of previousPendingRequest) {
                        this.queryMessage(pendingRequest.messageTask, pendingRequest.messageContent).then(pendingRequest.callback);
                    }
                    // let connectionPingInterval = setInterval(()=>{
                    //     webSocket.send(JSON.stringify({
                    //     }));
                    // }, 1000);
                }, {
                    once: true
                });
            }
            this.runningWebSocket.addEventListener("open", () => {
                accept();
            }, {
                once: true
            });
            this.runningWebSocket.addEventListener("error", (error) => {
                reject(error.message);
            }, {
                once: true
            });
        });
    }
}
//# sourceMappingURL=transmission.js.map
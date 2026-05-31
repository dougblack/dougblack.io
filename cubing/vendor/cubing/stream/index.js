import {
  Move,
  QuantumMove
} from "../chunks/chunk-O6HEZXGY.js";

// src/cubing/stream/twizzle/TwizzleStream.ts
var TwizzleStream = class extends EventTarget {
  socket;
  constructor(url) {
    super();
    this.socket = new WebSocket(url);
    this.socket.onmessage = this.onMessage.bind(this);
  }
  onMessage(msg) {
    try {
      const json = JSON.parse(msg.data);
      if (json.event === "move") {
        const move = json.data.latestMove;
        if (move.type !== "blockMove") {
          throw new Error("Invalid move!");
        }
        this.dispatchEvent(
          new CustomEvent("move", {
            detail: {
              move: new Move(new QuantumMove(move.family), move.amount)
            }
          })
        );
      }
    } catch (e) {
      console.error("Could not handle message:", e);
    }
  }
};
var TwizzleStreamServer = class {
  async streams() {
    return (await (await fetch("https://api.twizzle.net/v0/streams")).json()).streams;
  }
  connect(streamID) {
    return new TwizzleStream(
      `wss://api.twizzle.net/v0/streams/${streamID}/socket`
    );
  }
};

// src/cubing/stream/websocket-proxy.ts
var WebSocketProxySender = class {
  websocket;
  constructor(url) {
    this.websocket = new WebSocket(url);
    this.websocket.onopen = this.onopen.bind(this);
    this.websocket.onerror = this.onerror.bind(this);
    this.websocket.onmessage = this.onmessage.bind(this);
  }
  sendMoveEvent(e) {
    e.latestAlgLeaf = e.latestAlgLeaf.toString();
    this.sendProxyEvent({
      event: "move",
      data: e
    });
  }
  sendOrientationEvent(e) {
    this.sendProxyEvent({
      event: "orientation",
      data: e
    });
  }
  sendResetEvent() {
    this.sendProxyEvent({ event: "reset" });
  }
  sendProxyEvent(proxyEvent) {
    this.websocket.send(JSON.stringify(proxyEvent));
  }
  onopen() {
    console.log("Sending socket is open!");
  }
  onerror(error) {
    console.error("WebSocket sender error:", error);
  }
  onmessage(_e) {
  }
};
var WebSocketProxyReceiver = class {
  websocket;
  constructor(url, socketOrigin) {
    if (!socketOrigin) {
      console.log("No socket origin specified. Will not attempt to connect.");
      return;
    }
    this.websocket = new WebSocket(url);
    console.log(this.websocket);
    this.websocket.onopen = this.onopen.bind(this);
    this.websocket.onerror = this.onerror.bind(this);
    this.websocket.onmessage = this.onmessage.bind(this);
  }
  onopen() {
    console.log("Receiving socket is open!");
  }
  onerror(error) {
    console.error("WebSocket receiver error:", error);
  }
  onmessage(e) {
    this.onProxyEvent(JSON.parse(e.data));
  }
};
export {
  TwizzleStreamServer as ExperimentalTwizzleStreamServer,
  WebSocketProxyReceiver as ExperimentalWebSocketProxyReceiver,
  WebSocketProxySender as ExperimentalWebSocketProxySender
};
//# sourceMappingURL=index.js.map

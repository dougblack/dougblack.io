import { P as ProxyEvent, A as AlgLeafEvent, O as OrientationEvent } from '../events-CewDA1aS.js';
export { a as ExperimentalProxyMoveEvent, b as ExperimentalProxyOrientationEvent, c as ExperimentalProxyResetEvent } from '../events-CewDA1aS.js';
import '../PuzzleLoader-Bp8zngUn.js';
import 'type-fest';
import 'three/src/Three.js';

declare class TwizzleStream extends EventTarget {
    socket: WebSocket;
    constructor(url: string);
    onMessage(msg: MessageEvent): void;
}
type StreamsField = {
    streamID: string;
    senders: {
        name: string;
        twizzleUserID: string;
        wcaID: string | null;
    }[];
}[];
declare class TwizzleStreamServer {
    streams(): Promise<StreamsField>;
    connect(streamID: string): TwizzleStream;
}

declare class WebSocketProxySender {
    protected websocket: WebSocket;
    constructor(url: string);
    sendMoveEvent(e: AlgLeafEvent): void;
    sendOrientationEvent(e: OrientationEvent): void;
    sendResetEvent(): void;
    protected sendProxyEvent(proxyEvent: ProxyEvent): void;
    protected onopen(): void;
    protected onerror(error: any): void;
    protected onmessage(_e: MessageEvent): void;
}
declare abstract class WebSocketProxyReceiver {
    protected websocket?: WebSocket;
    constructor(url: string, socketOrigin?: string);
    protected onopen(): void;
    protected onerror(error: any): void;
    protected onmessage(e: MessageEvent): void;
    abstract onProxyEvent(e: ProxyEvent): void;
}

export { AlgLeafEvent as ExperimentalAlgLeafEvent, OrientationEvent as ExperimentalOrientationEvent, ProxyEvent as ExperimentalProxyEvent, TwizzleStreamServer as ExperimentalTwizzleStreamServer, WebSocketProxyReceiver as ExperimentalWebSocketProxyReceiver, WebSocketProxySender as ExperimentalWebSocketProxySender };

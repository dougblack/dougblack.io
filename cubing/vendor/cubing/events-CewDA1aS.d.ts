import { A as AlgLeaf, K as KPattern } from './PuzzleLoader-Bp8zngUn.js';

/** @category Smart Puzzles */
interface AlgLeafEvent {
    latestAlgLeaf: AlgLeaf;
    timeStamp: number;
    debug?: Record<string, unknown>;
    pattern?: KPattern;
    quaternion?: any;
}
/** @category Smart Puzzles */
interface OrientationEvent {
    quaternion: {
        x: number;
        y: number;
        z: number;
        w: number;
    };
    timeStamp: number;
    debug?: Record<string, unknown>;
}
interface ProxyMoveEvent {
    event: "move";
    data: AlgLeafEvent;
}
interface ProxyOrientationEvent {
    event: "orientation";
    data: OrientationEvent;
}
interface ProxyResetEvent {
    event: "reset";
}
type ProxyEvent = ProxyMoveEvent | ProxyOrientationEvent | ProxyResetEvent;

export type { AlgLeafEvent as A, OrientationEvent as O, ProxyEvent as P, ProxyMoveEvent as a, ProxyOrientationEvent as b, ProxyResetEvent as c };

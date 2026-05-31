import {
  LazyPromise,
  puzzles
} from "./chunk-VRTKWZPL.js";
import {
  KPattern
} from "./chunk-RINY3U6G.js";
import {
  Alg,
  AlgBuilder,
  Move
} from "./chunk-O6HEZXGY.js";

// src/cubing/search/inside/solve/puzzles/3x3x3/index.ts
import { randomChoice as randomChoice2 } from "../../random-uint-below/index.js";

// src/cubing/search/inside/inside-worker.ts
var isInsideWorker = false;
function setIsInsideWorker(inside) {
  isInsideWorker = inside;
}
function mustBeInsideWorker() {
  if (!isInsideWorker) {
    throw new Error(
      "Must be called from inside a worker, to avoid impact on page performance. Try importing from the top level of `cubing/solve`?"
    );
  }
}

// src/cubing/search/inside/solve/addOrientationSuffix.ts
import { randomChoice } from "../../random-uint-below/index.js";
function addOrientationSuffix(alg, suffixSpec) {
  const algBuilder = new AlgBuilder();
  algBuilder.experimentalPushAlg(alg);
  for (const suffix of suffixSpec) {
    const choice = randomChoice(suffix);
    if (choice !== null) {
      algBuilder.push(Move.fromString(choice));
    }
  }
  return algBuilder.toAlg();
}

// src/cubing/search/inside/solve/puzzles/dynamic/3x3x3/index.ts
var dynamic3x3x3min2phase = new LazyPromise(
  () => import("./search-dynamic-solve-3x3x3-B2L4IN34.js")
);

// src/cubing/search/inside/solve/puzzles/3x3x3/convert.ts
var reidEdgeOrder = "UF UR UB UL DF DR DB DL FR FL BR BL".split(" ");
var reidCornerOrder = "UFR URB UBL ULF DRF DFL DLB DBR".split(" ");
var centerOrder = "U L F R B D".split(" ");
var map = [
  [1, 2, 0],
  [0, 2, 0],
  [1, 1, 0],
  [0, 3, 0],
  [2, 0, 0],
  [0, 1, 0],
  [1, 3, 0],
  [0, 0, 0],
  [1, 0, 0],
  [1, 0, 2],
  [0, 1, 1],
  [1, 1, 1],
  [0, 8, 1],
  [2, 3, 0],
  [0, 10, 1],
  [1, 4, 1],
  [0, 5, 1],
  [1, 7, 2],
  [1, 3, 2],
  [0, 0, 1],
  [1, 0, 1],
  [0, 9, 0],
  [2, 2, 0],
  [0, 8, 0],
  [1, 5, 1],
  [0, 4, 1],
  [1, 4, 2],
  [1, 5, 0],
  [0, 4, 0],
  [1, 4, 0],
  [0, 7, 0],
  [2, 5, 0],
  [0, 5, 0],
  [1, 6, 0],
  [0, 6, 0],
  [1, 7, 0],
  [1, 2, 2],
  [0, 3, 1],
  [1, 3, 1],
  [0, 11, 1],
  [2, 1, 0],
  [0, 9, 1],
  [1, 6, 1],
  [0, 7, 1],
  [1, 5, 2],
  [1, 1, 2],
  [0, 2, 1],
  [1, 2, 1],
  [0, 10, 0],
  [2, 4, 0],
  [0, 11, 0],
  [1, 7, 1],
  [0, 6, 1],
  [1, 6, 2]
];
function rotateLeft(s, i) {
  return s.slice(i) + s.slice(0, i);
}
function toReid333Struct(pattern) {
  const output = [[], []];
  for (let i = 0; i < 6; i++) {
    if (pattern.patternData["CENTERS"].pieces[i] !== i) {
      throw new Error("non-oriented puzzles are not supported");
    }
  }
  for (let i = 0; i < 12; i++) {
    output[0].push(
      rotateLeft(
        reidEdgeOrder[pattern.patternData["EDGES"].pieces[i]],
        pattern.patternData["EDGES"].orientation[i]
      )
    );
  }
  for (let i = 0; i < 8; i++) {
    output[1].push(
      rotateLeft(
        reidCornerOrder[pattern.patternData["CORNERS"].pieces[i]],
        pattern.patternData["CORNERS"].orientation[i]
      )
    );
  }
  output.push(centerOrder);
  return output;
}
function toMin2PhasePattern(pattern) {
  const reid = toReid333Struct(pattern);
  return map.map(([orbit, perm, ori]) => reid[orbit][perm][ori]).join("");
}

// src/cubing/search/inside/solve/puzzles/3x3x3/filter.ts
function isEquivalentTranformationIgnoringCENTERS(t1, t2) {
  const t1NoCenterOri = new KPattern(t1.kpuzzle, {
    EDGES: t1.patternData["EDGES"],
    CORNERS: t1.patternData["CORNERS"],
    CENTERS: {
      pieces: t1.patternData["CENTERS"].pieces,
      orientation: new Array(6).fill(0)
    }
  }).experimentalToTransformation();
  const t2NoCenterOri = new KPattern(t2.kpuzzle, {
    EDGES: t2.patternData["EDGES"],
    CORNERS: t2.patternData["CORNERS"],
    CENTERS: {
      pieces: t2.patternData["CENTERS"].pieces,
      orientation: new Array(6).fill(0)
    }
  }).experimentalToTransformation();
  return t1NoCenterOri.isIdentical(t2NoCenterOri);
}
function passesFilter(kpuzzle, pattern) {
  if (isEquivalentTranformationIgnoringCENTERS(kpuzzle.defaultPattern(), pattern)) {
    return false;
  }
  for (const face of "ULFRBD") {
    for (let amount = 1; amount < 4; amount++) {
      const transformation = kpuzzle.moveToTransformation(new Move(face, amount)).toKPattern();
      if (isEquivalentTranformationIgnoringCENTERS(transformation, pattern)) {
        return false;
      }
    }
  }
  return true;
}

// src/cubing/search/inside/solve/puzzles/3x3x3/legacy-sgs.ts
var sgs3x3x3 = [
  [
    "R U'",
    "R2 B",
    //
    "D2 B2",
    "D' L B'",
    //
    "R' U'",
    "B",
    //
    "D B2",
    "R' B",
    //
    "L' U",
    "L2 B'",
    //
    "B2",
    "D L B'",
    //
    "L U",
    "B'",
    //
    "U'",
    "R B",
    //
    "D' B2",
    "L B'",
    //
    "U2",
    "U L' B'",
    //
    "",
    "U' L' B'",
    //
    "U",
    "L' B'"
  ],
  [
    "F2 L2",
    "F' L'",
    "R' F L2",
    //
    "D' L2",
    "F L2",
    "F2 L'",
    //
    "R' F' L'",
    "R2 F L2",
    "R2 F2 L'",
    //
    "L2",
    "F L'",
    "D' L",
    //
    "D2 L2",
    "R2 F' L'",
    "D L",
    //
    "",
    "L2 F L'",
    "L F' L2",
    //
    "L F L'",
    "F' L2",
    "L'",
    //
    "D L2",
    "D F L'",
    "L"
  ],
  [
    "R B U2 B'",
    "R2 B U' B'",
    //
    "F2 B U B'",
    "F B2 L' B2",
    //
    "B2 L B2",
    "B U' B'",
    //
    "R2 B U2 B'",
    "R' B U' B'",
    //
    "B2 L' B2",
    "F B U B'",
    //
    "B2 U' B2",
    "B' L B",
    //
    "L F' B D' B'",
    "B' U' B2 D B'",
    //
    "B U2 B'",
    "R B U' B'",
    //
    "B2 L2 B2",
    "D' B' L B",
    //
    "B U B'",
    "F' B2 L' B2",
    //
    "",
    "B2 L' B' U' B'"
  ],
  [
    "U F2 L2 U'",
    "F' U L' U'",
    //
    "F2 U L' U'",
    "U F L2 U'",
    //
    "U2 B2 U2",
    "R' U' B U",
    //
    "D2 U L U'",
    "D U2 B' U2",
    //
    "U L2 U'",
    "F U L' U'",
    //
    "D U L U'",
    "U2 B' U2",
    //
    "",
    "U2 B' U' L' U'",
    //
    "U2 L' U2",
    "U' B U",
    //
    "U L U'",
    "D' U2 B' U2",
    //
    "U L' U'",
    "U2 B U2"
  ],
  [
    "R' D' F2",
    "F'",
    //
    "F2",
    "D R F'",
    //
    "R D' F2",
    "R2 F'",
    //
    "D' F2",
    "R F'",
    //
    "F2 R' D' F2",
    "F",
    //
    "D2 F2",
    "D' R F'",
    //
    "R2 D' F2",
    "R' F'",
    //
    "D F2",
    "D2 R F'",
    //
    "",
    "F R' D' F2"
  ],
  [
    "R' D2 F' D F",
    "R F2 R2 F2",
    "R2 F' D2 F",
    //
    "F' R2 D2 F",
    "L D' L'",
    "D F' D2 F",
    //
    "F2 R2 F2",
    "R F' D2 F",
    "F' R2 D' F",
    //
    "F' R' D2 F",
    "F2 R' F2",
    "L D L'",
    //
    "F' R D' F",
    "F2 R F2",
    "F' D2 F",
    //
    "",
    "L D2 R D' L'",
    "F' D2 F' R F2",
    //
    "D2 R2 F2 R2 F2",
    "D F' D' F",
    "F' D F"
  ],
  [
    "U F2 U'",
    "R U F' U'",
    //
    "D R U F2 U'",
    "U F U'",
    //
    "R2 U F2 U'",
    "R' U F' U'",
    //
    "R U F2 U'",
    "R2 U F' U'",
    //
    "",
    "U L D L' F U'",
    //
    "F2 D' R D F2",
    "D2 U F U'",
    //
    "R' U F2 U'",
    "U F' U'",
    //
    "F2 D2 R D2 F2",
    "D U F U'"
  ],
  [
    "R2",
    "R' B' D B",
    //
    "D R'",
    "F' R2 F",
    //
    "",
    "R B' D B",
    //
    "R'",
    "B' D B",
    //
    "D' R'",
    "D2 F' R2 F",
    //
    "R",
    "R2 B' D B",
    //
    "D2 R'",
    "B' D' B"
  ],
  [
    "R2 D' R2",
    "F' R' F R",
    "R D' R2 D R'",
    //
    "D2 R2 D2 R2",
    "R' D' F' R F",
    "U F D F' U'",
    //
    "",
    "R2 D2 B R' B' R'",
    "R' F D' F2 R F",
    //
    "R2 D R2",
    "F2 U F U' F",
    "R' D F' R F",
    //
    "D R2 D2 R2",
    "U F D' F' U'",
    "D R' D2 F' R F",
    //
    "R2 D2 R2",
    "U F D2 F' U'",
    "R' D2 F' R F"
  ],
  [
    "B R B'",
    "F D F' B R2 B'",
    //
    "D B R2 B'",
    "D2 B R' B'",
    //
    "B R2 B'",
    "D B R' B'",
    //
    "D' B R2 B'",
    "B R' B'",
    //
    "",
    "B R2 B' D B R' B'",
    //
    "D2 B R2 B'",
    "D' B R' B'"
  ],
  [
    "",
    "R' D R F D2 F'",
    //
    "R' D R",
    "D F D' F'",
    //
    "R F' R' F",
    "F D' F'",
    //
    "R' D' R",
    "F D2 F'",
    //
    "R' D2 R",
    "F D F'"
  ],
  [
    "",
    "F2 D2 R F' R' D2 F' D2 F'",
    "F2 D2 F' D' F D' F' D2 F'",
    //
    "F2 D F2 D F2 D2 F2",
    "D2 F L D2 L' D2 F'",
    "D F D2 L D2 L' F'",
    //
    "R' D B' D2 B D' R",
    "R' D2 B' D2 B R",
    "F D2 F' D F D F'",
    //
    "F D' L D2 L' D F'",
    "B D' F D B' D' F'",
    "F D2 L D2 L' F'",
    //
    "F D' L D L' D F'",
    "F L D2 L' D2 F'",
    "R' B' D2 B D2 R"
  ],
  [
    "D'",
    "F L D L' D' F'",
    //
    "D2",
    "L B D B' D' L'",
    //
    "D",
    "B' L' D' L D B",
    //
    "",
    "D F L D L' D' F'"
  ],
  [
    "F' D2 F D F' D F",
    "F' D' R' D R F",
    //
    "F' R' D' R D F",
    "B D R D' R' B'",
    //
    "",
    "D B' D' L' D L B"
  ],
  [
    "D F D F' D F D2 F'",
    "F' U2 B' R' B U2 F' L F' L' F'",
    //
    "",
    "D2 L D L2 F L F2 D F"
  ],
  [
    "L B' L' F L B L' F'",
    "F2 U F' D2 F U' F' D2 F'",
    "D' F' D B D' F D B'",
    //
    "F L2 F R2 F' L2 F R2 F2",
    "D B D' F' D B' D' F",
    "R F L F' R' F L' F'",
    //
    "",
    "D2 B L' U2 L B' D2 B L' U2 L B'",
    "D2 F R' U2 R F' D2 F R' U2 R F'",
    //
    "R F L' F' R' F L F'",
    "D F D' B' D F' D' B",
    "L2 F2 L' B2 L F2 L' B2 L'"
  ],
  [
    "L B R' B' L' B R B'",
    "R' B R F' R' B' R F",
    "L D2 L U L' D2 L U' L2",
    //
    "",
    "D2 B' D2 F D' L2 F L2 F' D2 B D' F'",
    "D2 F' R' F R2 B' D2 B D2 R' F D2 F'",
    //
    "L B L' F L B' L' F'",
    "F' D2 F' U' F D2 F' U F2",
    "D' B' D F D' B D F'"
  ],
  ["", "D2 F' L U2 L' F D2 F' L U2 L' F", "D2 B' R U2 R' B D2 B' R U2 R' B"]
];

// src/cubing/search/inside/solve/puzzles/3x3x3/index.ts
async function random333Pattern() {
  const kpuzzle = await puzzles["3x3x3"].kpuzzle();
  let pattern = kpuzzle.defaultPattern();
  for (const piece of sgs3x3x3) {
    pattern = pattern.applyAlg(Alg.fromString(randomChoice2(piece)));
  }
  if (!passesFilter(kpuzzle, pattern)) {
    return random333Pattern();
  }
  return pattern;
}
async function solve333(s) {
  mustBeInsideWorker();
  return Alg.fromString(
    (await dynamic3x3x3min2phase).solvePattern(toMin2PhasePattern(s))
  );
}
async function random333Scramble() {
  return solve333(await random333Pattern());
}
async function initialize333() {
  (await dynamic3x3x3min2phase).initialize();
}
var randomSuffixes = [
  [null, "Rw", "Rw2", "Rw'", "Fw", "Fw'"],
  [null, "Dw", "Dw2", "Dw'"]
];
async function random333OrientedScramble() {
  return addOrientationSuffix(await random333Scramble(), randomSuffixes);
}

// src/cubing/vendor/apache/comlink-everywhere/comlink.ts
var proxyMarker = Symbol("Comlink.proxy");
var createEndpoint = Symbol("Comlink.endpoint");
var releaseProxy = Symbol("Comlink.releaseProxy");
var finalizer = Symbol("Comlink.finalizer");
var throwMarker = Symbol("Comlink.thrown");
var REF_COUNT_BY_DEFAULT = true;
var isObject = (val) => typeof val === "object" && val !== null || typeof val === "function";
var proxyTransferHandler = {
  canHandle: (val) => isObject(val) && val[proxyMarker],
  serialize(obj) {
    const { port1, port2 } = new MessageChannel();
    expose(obj, port1);
    return [port2, [port2]];
  },
  deserialize(port) {
    port.start();
    return wrap(port);
  }
};
var throwTransferHandler = {
  canHandle: (value) => isObject(value) && throwMarker in value,
  serialize({ value }) {
    let serialized;
    if (value instanceof Error) {
      serialized = {
        isError: true,
        value: {
          message: value.message,
          name: value.name,
          stack: value.stack
        }
      };
    } else {
      serialized = { isError: false, value };
    }
    return [serialized, []];
  },
  deserialize(serialized) {
    if (serialized.isError) {
      throw Object.assign(
        new Error(serialized.value.message),
        serialized.value
      );
    }
    throw serialized.value;
  }
};
function unrefWorkaround(reffable) {
  const unref = reffable.unref?.bind(reffable);
  if (!unref) {
    return;
  }
  return () => {
    for (let i = 0; i < 5; i++) {
      unref();
    }
  };
}
var transferHandlers = /* @__PURE__ */ new Map([
  ["proxy", proxyTransferHandler],
  ["throw", throwTransferHandler]
]);
function nodeEndpoint(rawEndpoint) {
  const listeners = {};
  function removeEventListener(event, eh) {
    const l = listeners[event]?.get(eh);
    if (!l) {
      return;
    }
    rawEndpoint.off(event, l);
    listeners[event]?.delete(eh);
  }
  return {
    postMessage: rawEndpoint.postMessage.bind(rawEndpoint),
    addEventListener: (event, handler, options) => {
      const listener = (data) => {
        if (options?.once) {
          removeEventListener(event, listener);
        }
        if ("handleEvent" in handler) {
          handler.handleEvent({ data });
        } else {
          handler({ data });
        }
      };
      rawEndpoint.on(event, listener);
      (listeners[event] ?? /* @__PURE__ */ new WeakMap()).set(handler, listener);
    },
    removeEventListener,
    // In theory, `node` exposes these on `Symbol.for('nodejs.ref') ` and
    // `Symbol.for('nodejs.unref') ` fields. In practice, this is not supported across all runtimes.
    ref: rawEndpoint.ref?.bind(rawEndpoint),
    unref: unrefWorkaround(rawEndpoint),
    start: rawEndpoint.start?.bind(rawEndpoint),
    terminate: rawEndpoint.terminate?.bind(
      rawEndpoint
    ),
    close: rawEndpoint.close?.bind(rawEndpoint)
  };
}
function toEndpoint(endpoint) {
  if (!("addEventListener" in endpoint) || !("removeEventListener" in endpoint)) {
    return nodeEndpoint(endpoint);
  }
  return endpoint;
}
function isAllowedOrigin(allowedOrigins, origin) {
  for (const allowedOrigin of allowedOrigins) {
    if (origin === allowedOrigin || allowedOrigin === "*") {
      return true;
    }
    if (allowedOrigin instanceof RegExp && allowedOrigin.test(origin)) {
      return true;
    }
  }
  return false;
}
function defaultExposeEndpoint() {
  return globalThis.process?.getBuiltinModule("node:worker_threads").parentPort ?? globalThis;
}
function expose(obj, endpoint = defaultExposeEndpoint(), allowedOrigins = ["*"]) {
  const ep = toEndpoint(endpoint);
  ep.addEventListener("message", function callback(ev) {
    if (!ev || !ev.data) {
      return;
    }
    if (!isAllowedOrigin(allowedOrigins, ev.origin)) {
      console.warn(`Invalid origin '${ev.origin}' for comlink proxy`);
      return;
    }
    const { id, type, path } = {
      path: [],
      ...ev.data
    };
    const argumentList = (ev.data.argumentList || []).map(fromWireValue);
    let returnValue;
    try {
      const parent = path.slice(0, -1).reduce((obj2, prop) => obj2[prop], obj);
      const rawValue = path.reduce((obj2, prop) => obj2[prop], obj);
      switch (type) {
        case "GET" /* GET */:
          {
            returnValue = rawValue;
          }
          break;
        case "SET" /* SET */:
          {
            parent[path.slice(-1)[0]] = fromWireValue(ev.data.value);
            returnValue = true;
          }
          break;
        case "APPLY" /* APPLY */:
          {
            returnValue = rawValue.apply(parent, argumentList);
          }
          break;
        case "CONSTRUCT" /* CONSTRUCT */:
          {
            const value = new rawValue(...argumentList);
            returnValue = proxy(value);
          }
          break;
        case "ENDPOINT" /* ENDPOINT */:
          {
            const { port1, port2 } = new MessageChannel();
            expose(obj, port2);
            returnValue = transfer(port1, [port1]);
          }
          break;
        case "RELEASE" /* RELEASE */:
          {
            returnValue = void 0;
          }
          break;
        default:
          return;
      }
    } catch (value) {
      returnValue = { value, [throwMarker]: 0 };
    }
    Promise.resolve(returnValue).catch((value) => {
      return { value, [throwMarker]: 0 };
    }).then((returnValue2) => {
      const [wireValue, transferables] = toWireValue(returnValue2);
      ep.postMessage({ ...wireValue, id }, transferables);
      if (type === "RELEASE" /* RELEASE */) {
        ep.removeEventListener("message", callback);
        closeEndPoint(ep);
        if (finalizer in obj && typeof obj[finalizer] === "function") {
          obj[finalizer]();
        }
      }
    }).catch((_error) => {
      console.log(_error);
      const [wireValue, transferables] = toWireValue({
        value: new TypeError("Unserializable return value"),
        [throwMarker]: 0
      });
      ep.postMessage({ ...wireValue, id }, transferables);
    });
  });
  ep.start?.();
}
function closeEndPoint(endpoint) {
  endpoint.close?.();
  endpoint.terminate?.();
}
function wrap(endpoint, target, options) {
  const ep = toEndpoint(endpoint);
  const pendingListeners = /* @__PURE__ */ new Map();
  ep.addEventListener("message", function handleMessage(ev) {
    const { data } = ev;
    if (!data || !data.id) {
      return;
    }
    const resolver = pendingListeners.get(data.id);
    if (!resolver) {
      return;
    }
    try {
      resolver(data);
    } finally {
      pendingListeners.delete(data.id);
      if (pendingListeners.size === 0 && (options?.refCount ?? REF_COUNT_BY_DEFAULT)) {
        ep.unref?.();
      }
    }
  });
  return createProxy({ endpoint: ep, pendingListeners }, [], target);
}
function throwIfProxyReleased(isReleased) {
  if (isReleased) {
    throw new Error("Proxy has been released and is not useable");
  }
}
function releaseEndpoint(epWithPendingListeners) {
  return requestResponseMessage(epWithPendingListeners, {
    type: "RELEASE" /* RELEASE */
  }).then(() => {
    closeEndPoint(epWithPendingListeners.endpoint);
  });
}
var proxyCounter = /* @__PURE__ */ new WeakMap();
var proxyFinalizers = "FinalizationRegistry" in globalThis && new FinalizationRegistry(
  (epWithPendingListeners) => {
    const newCount = (proxyCounter.get(epWithPendingListeners) || 0) - 1;
    proxyCounter.set(epWithPendingListeners, newCount);
    if (newCount === 0) {
      void releaseEndpoint(epWithPendingListeners).finally(() => {
        epWithPendingListeners.pendingListeners.clear();
      });
    }
  }
);
function registerProxy(proxy2, epWithPendingListeners) {
  const newCount = (proxyCounter.get(epWithPendingListeners) || 0) + 1;
  proxyCounter.set(epWithPendingListeners, newCount);
  if (proxyFinalizers) {
    proxyFinalizers.register(proxy2, epWithPendingListeners, proxy2);
  }
}
function unregisterProxy(proxy2) {
  if (proxyFinalizers) {
    proxyFinalizers.unregister(proxy2);
  }
}
function createProxy(epWithPendingListeners, path = [], target = () => {
}) {
  let isProxyReleased = false;
  const proxy2 = new Proxy(target, {
    get(_target, prop) {
      throwIfProxyReleased(isProxyReleased);
      if (prop === releaseProxy) {
        return () => {
          unregisterProxy(proxy2);
          void releaseEndpoint(epWithPendingListeners).finally(() => {
            epWithPendingListeners.pendingListeners.clear();
          });
          isProxyReleased = true;
        };
      }
      if (prop === "then") {
        if (path.length === 0) {
          return { then: () => proxy2 };
        }
        const r = requestResponseMessage(epWithPendingListeners, {
          type: "GET" /* GET */,
          path: path.map((p) => p.toString())
        }).then(fromWireValue);
        return r.then.bind(r);
      }
      return createProxy(epWithPendingListeners, [...path, prop]);
    },
    set(_target, prop, rawValue) {
      throwIfProxyReleased(isProxyReleased);
      const [value, transferables] = toWireValue(rawValue);
      return requestResponseMessage(
        epWithPendingListeners,
        {
          type: "SET" /* SET */,
          path: [...path, prop].map((p) => p.toString()),
          value
        },
        transferables
      ).then(fromWireValue);
    },
    apply(_target, _thisArg, rawArgumentList) {
      throwIfProxyReleased(isProxyReleased);
      const last = path[path.length - 1];
      if (last === createEndpoint) {
        return requestResponseMessage(epWithPendingListeners, {
          type: "ENDPOINT" /* ENDPOINT */
        }).then(fromWireValue);
      }
      if (last === "bind") {
        return createProxy(epWithPendingListeners, path.slice(0, -1));
      }
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(
        epWithPendingListeners,
        {
          type: "APPLY" /* APPLY */,
          path: path.map((p) => p.toString()),
          argumentList
        },
        transferables
      ).then(fromWireValue);
    },
    construct(_target, rawArgumentList) {
      throwIfProxyReleased(isProxyReleased);
      const [argumentList, transferables] = processArguments(rawArgumentList);
      return requestResponseMessage(
        epWithPendingListeners,
        {
          type: "CONSTRUCT" /* CONSTRUCT */,
          path: path.map((p) => p.toString()),
          argumentList
        },
        transferables
      ).then(fromWireValue);
    }
  });
  registerProxy(proxy2, epWithPendingListeners);
  return proxy2;
}
function myFlat(arr) {
  return Array.prototype.concat.apply([], arr);
}
function processArguments(argumentList) {
  const processed = argumentList.map(toWireValue);
  return [processed.map((v) => v[0]), myFlat(processed.map((v) => v[1]))];
}
var transferCache = /* @__PURE__ */ new WeakMap();
function transfer(obj, transfers) {
  transferCache.set(obj, transfers);
  return obj;
}
function proxy(obj) {
  return Object.assign(obj, { [proxyMarker]: true });
}
function toWireValue(value) {
  for (const [name, handler] of transferHandlers) {
    if (handler.canHandle(value)) {
      const [serializedValue, transferables] = handler.serialize(value);
      return [
        {
          type: "HANDLER" /* HANDLER */,
          name,
          value: serializedValue
        },
        transferables
      ];
    }
  }
  return [
    {
      type: "RAW" /* RAW */,
      value
    },
    transferCache.get(value) || []
  ];
}
function fromWireValue(value) {
  switch (value.type) {
    case "HANDLER" /* HANDLER */:
      return transferHandlers.get(value.name).deserialize(value.value);
    case "RAW" /* RAW */:
      return value.value;
  }
}
function requestResponseMessage(epWithPendingListeners, msg, transfers) {
  const ep = epWithPendingListeners.endpoint;
  const pendingListeners = epWithPendingListeners.pendingListeners;
  return new Promise((resolve) => {
    const id = generateUUID();
    pendingListeners.set(id, resolve);
    ep.start?.();
    ep.ref?.();
    ep.postMessage({ id, ...msg }, transfers);
  });
}
function generateUUID() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}

// src/cubing/vendor/apache/comlink-everywhere/PortableWorker.ts
function isCrossOrigin(url) {
  if (!globalThis.location) {
    return false;
  }
  const scriptOrigin = globalThis.location.origin;
  const workerOrigin = new URL(url, globalThis.location.href).origin;
  return scriptOrigin !== workerOrigin;
}
function constructPortableWebWorker(url, workerOptions) {
  const useTrampoline = isCrossOrigin(url);
  if (useTrampoline) {
    const trampolineSource = `import ${JSON.stringify(url.toString())};`;
    const blob = new Blob([trampolineSource], {
      type: "text/javascript"
    });
    url = URL.createObjectURL(blob);
  }
  const worker = new globalThis.Worker(url, {
    ...workerOptions,
    type: "module"
  });
  if (useTrampoline) {
    const originalTerminate = worker.terminate.bind(worker);
    Object.defineProperty(worker, "terminate", {
      get() {
        URL.revokeObjectURL(url);
        originalTerminate();
      }
    });
  }
  return worker;
}
function constructNodeStyleWorker(url, workerOptions) {
  const { Worker: NodeWorker } = globalThis.process.getBuiltinModule(
    "node:worker_threads"
  );
  url = typeof url === "string" && url.startsWith("file://") ? new URL(url) : url;
  return new NodeWorker(url, workerOptions);
}
function constructPortableWorker(url, workerOptions) {
  const hasWebWorkers = globalThis.Worker;
  const hasBuiltinModules = !!globalThis.process?.getBuiltinModule;
  if (hasWebWorkers && !hasBuiltinModules) {
    return constructPortableWebWorker(url, workerOptions);
  }
  const webWorkersHaveUnref = globalThis.Worker?.prototype.unref;
  if (hasWebWorkers && hasBuiltinModules && webWorkersHaveUnref) {
    return constructPortableWebWorker(url, workerOptions);
  } else {
    return constructNodeStyleWorker(url, workerOptions);
  }
}
var PortableWorker = constructPortableWorker;

export {
  setIsInsideWorker,
  mustBeInsideWorker,
  addOrientationSuffix,
  random333Pattern,
  solve333,
  random333Scramble,
  initialize333,
  random333OrientedScramble,
  expose,
  wrap,
  PortableWorker
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=chunk-SGJ5WPE4.js.map

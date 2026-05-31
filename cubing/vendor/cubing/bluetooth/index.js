import {
  binaryComponentsToReid3x3x3,
  twizzleBinaryToBinaryComponents
} from "../chunks/chunk-NGW52SHR.js";
import {
  puzzles
} from "../chunks/chunk-FLK6AZKB.js";
import {
  cube3x3x3,
  experimental3x3x3KPuzzle
} from "../chunks/chunk-FUHYAW74.js";
import {
  KPattern
} from "../chunks/chunk-RINY3U6G.js";
import {
  Alg,
  Move,
  experimentalAppendMove,
  keyToMove
} from "../chunks/chunk-O6HEZXGY.js";

// src/cubing/bluetooth/debug.ts
var DEBUG_LOGGING_ENABLED = false;
function enableDebugLogging(enable) {
  DEBUG_LOGGING_ENABLED = enable;
}
function debugLog(...args) {
  if (!DEBUG_LOGGING_ENABLED) {
    return;
  }
  if (console.info) {
    console.info(...args);
  } else {
    console.log(...args);
  }
}

// src/cubing/bluetooth/transformer.ts
import { Quaternion } from "three/src/math/Quaternion.js";
import { Vector3 } from "three/src/math/Vector3.js";
function maxAxis(v) {
  const maxVal = Math.max(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
  switch (maxVal) {
    case v.x:
      return "x";
    case -v.x:
      return "-x";
    case v.y:
      return "y";
    case -v.y:
      return "-y";
    case v.z:
      return "z";
    case -v.z:
      return "-z";
    default:
      throw new Error("Uh-oh.");
  }
}
var s2 = Math.sqrt(0.5);
var m = {
  "y z": new Quaternion(0, 0, 0, 1),
  "-z y": new Quaternion(s2, 0, 0, s2),
  "x z": new Quaternion(0, 0, -s2, s2),
  "-x z": new Quaternion(0, 0, s2, s2)
};
var BasicRotationTransformer = class {
  // private reorientQuat = new Quaternion();
  transformAlgLeaf(_algLeafEvent) {
  }
  transformOrientation(orientationEvent) {
    const { x, y, z, w } = orientationEvent.quaternion;
    const quat = new Quaternion(x, y, z, w);
    const U = new Vector3(0, 1, 0);
    const F = new Vector3(0, 0, 1);
    const maxU = maxAxis(U.applyQuaternion(quat));
    const maxF = maxAxis(F.applyQuaternion(quat));
    const oriQuat = m[`${maxU} ${maxF}`] || m["y z"];
    console.log(quat);
    console.log(oriQuat);
    const q2 = quat.premultiply(oriQuat);
    console.log(q2);
    orientationEvent.quaternion = quat;
    console.log(orientationEvent.quaternion);
  }
};

// src/cubing/bluetooth/smart-puzzle/bluetooth-puzzle.ts
var BluetoothPuzzle = class extends EventTarget {
  transformers = [];
  listeners = [];
  // TODO: type
  orientationListeners = [];
  // TODO: Can we make this reutrn (async) on success?
  // TODO: require subclasses to implement this?
  async getPattern() {
    throw new Error("cannot get pattern");
  }
  addAlgLeafListener(listener) {
    this.listeners.push(listener);
  }
  addOrientationListener(listener) {
    this.orientationListeners.push(listener);
  }
  experimentalAddBasicRotationTransformer() {
    this.transformers.push(new BasicRotationTransformer());
  }
  dispatchAlgLeaf(algLeaf) {
    for (const transformer of this.transformers) {
      transformer.transformAlgLeaf(algLeaf);
    }
    for (const l of this.listeners) {
      l(algLeaf);
    }
  }
  dispatchOrientation(orientationEvent) {
    for (const transformer of this.transformers) {
      transformer.transformOrientation(orientationEvent);
    }
    const { x, y, z, w } = orientationEvent.quaternion;
    orientationEvent.quaternion = {
      x,
      y,
      z,
      w
    };
    for (const l of this.orientationListeners) {
      l(orientationEvent);
    }
  }
};

// src/cubing/bluetooth/keyboard.ts
var KeyboardPuzzle = class extends BluetoothPuzzle {
  // (e: KeyboardEvent) => Promise<void>;
  // TODO: Decide on the right arguments.
  // TODO: support tying the puzzle to a TwistyPlayer.
  constructor(target, puzzle = "3x3x3") {
    super();
    this.target = target;
    this.listener = this.onKeyDown.bind(this);
    target.addEventListener("keydown", this.listener);
    this.keyMappingAndPatternPromise = this.setPuzzleInternal(puzzle);
  }
  keyMappingAndPatternPromise;
  listener;
  name() {
    return "Keyboard Input";
  }
  async setPuzzleInternal(puzzle) {
    const puzzleLoader = await (async () => typeof puzzle === "string" ? (await import("../puzzles/index.js")).puzzles[puzzle] : puzzle)();
    const kpuzzle = await (async () => puzzleLoader.kpuzzle())();
    return Promise.all([puzzleLoader.keyMapping?.(), kpuzzle.defaultPattern()]);
  }
  disconnect() {
    this.target.removeEventListener("keydown", this.listener);
  }
  async getPattern() {
    return (await this.keyMappingAndPatternPromise)[1];
  }
  async onKeyDown(e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
      return;
    }
    this.keyMappingAndPatternPromise = (async () => {
      const [keyMapping, pattern] = await this.keyMappingAndPatternPromise;
      const algLeaf = keyToMove(keyMapping, e);
      let newPattern;
      if (algLeaf) {
        newPattern = pattern.applyAlg(new Alg([algLeaf]));
        this.dispatchAlgLeaf({
          latestAlgLeaf: algLeaf,
          timeStamp: e.timeStamp,
          pattern: newPattern
        });
        e.preventDefault();
      }
      return [keyMapping, newPattern ?? pattern];
    })();
  }
};
async function debugKeyboardConnect(target = globalThis, puzzle = "3x3x3") {
  return new KeyboardPuzzle(target, puzzle);
}

// src/cubing/bluetooth/connect/index.ts
function requestOptions(configs, acceptAllDevices = false) {
  const options = acceptAllDevices ? {
    acceptAllDevices: true,
    optionalServices: []
  } : {
    filters: [],
    optionalServices: []
  };
  for (const config of configs) {
    if (!acceptAllDevices) {
      options.filters = options.filters.concat(config.filters);
    }
    options.optionalServices = options.optionalServices.concat(
      config.optionalServices
    );
  }
  debugLog({ requestOptions: options });
  return options;
}
var consecutiveFailures = 0;
var MAX_FAILURES_BEFORE_ACCEPT_ALL_FALLBACK = 2;
async function bluetoothConnect(configs, options = {}) {
  debugLog("Attempting to pair.");
  let device;
  try {
    let acceptAllDevices = options.acceptAllDevices;
    if (!acceptAllDevices && consecutiveFailures >= MAX_FAILURES_BEFORE_ACCEPT_ALL_FALLBACK) {
      console.info(
        `The last ${MAX_FAILURES_BEFORE_ACCEPT_ALL_FALLBACK} Bluetooth puzzle connection attempts failed. This time, the Bluetooth prompt will show all possible devices.`
      );
      acceptAllDevices = true;
    }
    device = await navigator.bluetooth.requestDevice(
      requestOptions(configs, acceptAllDevices)
    );
    consecutiveFailures = 0;
  } catch (e) {
    consecutiveFailures++;
    throw e;
  }
  debugLog("Device:", device);
  if (typeof device.gatt === "undefined") {
    return Promise.reject("Device did not have a GATT server.");
  }
  const server = await device.gatt.connect();
  debugLog("Server:", server);
  const name = server.device?.name || "";
  for (const config of configs) {
    for (const prefix of config.prefixes) {
      if (name?.startsWith(prefix)) {
        return config.connect(server, device);
      }
    }
  }
  throw Error("Unknown Bluetooth devive.");
}

// src/cubing/bluetooth/smart-puzzle/gan.ts
import { Quaternion as Quaternion2 } from "three/src/math/Quaternion.js";

// src/cubing/vendor/public-domain/unsafe-raw-aes/unsafe-raw-aes.ts
var blockSize = 16;
var zeros = new Uint8Array(blockSize);
var paddingBlockPlaintext = new Uint8Array(
  new Array(blockSize).fill(blockSize)
);
var AES_CBC = "AES-CBC";
async function importKey(keyBytes) {
  return await crypto.subtle.importKey(
    "raw",
    keyBytes,
    AES_CBC,
    true,
    ["encrypt", "decrypt"]
  );
}
async function unsafeEncryptBlockWithIV(key, plaintextBlock, iv) {
  const cryptoResult = await globalThis.crypto.subtle.encrypt(
    {
      name: AES_CBC,
      iv
    },
    key,
    plaintextBlock
  );
  return cryptoResult.slice(0, blockSize);
}
async function unsafeEncryptBlock(key, plaintextBlock) {
  return (await unsafeEncryptBlockWithIV(key, plaintextBlock, zeros)).slice(
    0,
    blockSize
  );
}
async function unsafeDecryptBlock(key, ciphertextBlock) {
  const paddingBlock = await unsafeEncryptBlockWithIV(
    key,
    paddingBlockPlaintext,
    ciphertextBlock
  );
  const cbcCiphertext = new Uint8Array(2 * blockSize);
  cbcCiphertext.set(new Uint8Array(ciphertextBlock), 0);
  cbcCiphertext.set(new Uint8Array(paddingBlock), blockSize);
  const cryptoResult = await globalThis.crypto.subtle.decrypt(
    {
      name: AES_CBC,
      iv: zeros
    },
    key,
    cbcCiphertext
  );
  return cryptoResult.slice(0, blockSize);
}

// src/cubing/bluetooth/smart-puzzle/common.ts
var reidEdgeOrder = "UF UR UB UL DF DR DB DL FR FL BR BL".split(" ");
var reidCornerOrder = "UFR URB UBL ULF DRF DFL DLB DBR".split(" ");
function rotateLeft(s, i) {
  return s.slice(i) + s.slice(0, i);
}
var pieceMap = {};
reidEdgeOrder.forEach((edge, idx) => {
  for (let i = 0; i < 2; i++) {
    pieceMap[rotateLeft(edge, i)] = { piece: idx, orientation: i };
  }
});
reidCornerOrder.forEach((corner, idx) => {
  for (let i = 0; i < 3; i++) {
    pieceMap[rotateLeft(corner, i)] = { piece: idx, orientation: i };
  }
});
function getPatternData(stickers, faceOrder3, edgeMappings, cornerMappings) {
  const patternData = {
    CORNERS: {
      pieces: [],
      orientation: []
    },
    EDGES: {
      pieces: [],
      orientation: []
    },
    CENTERS: {
      pieces: [0, 1, 2, 3, 4, 5],
      orientation: [0, 0, 0, 0, 0, 0],
      orientationMod: [1, 1, 1, 1, 1, 1]
    }
  };
  for (const cornerMapping of cornerMappings) {
    const pieceInfo = pieceMap[cornerMapping.map((i) => faceOrder3[stickers[i]]).join("")];
    patternData["CORNERS"].pieces.push(pieceInfo.piece);
    patternData["CORNERS"].orientation.push(pieceInfo.orientation);
  }
  for (const edgeMapping of edgeMappings) {
    const pieceInfo = pieceMap[edgeMapping.map((i) => faceOrder3[stickers[i]]).join("")];
    patternData["EDGES"].pieces.push(pieceInfo.piece);
    patternData["EDGES"].orientation.push(pieceInfo.orientation);
  }
  return patternData;
}

// src/cubing/bluetooth/smart-puzzle/gan.ts
var DEFAULT_INTERVAL_MS = 150;
var MAX_LATEST_MOVES = 6;
var ganMoveToBlockMove = {
  0: new Move("U"),
  2: new Move("U", -1),
  3: new Move("R"),
  5: new Move("R", -1),
  6: new Move("F"),
  8: new Move("F", -1),
  9: new Move("D"),
  11: new Move("D", -1),
  12: new Move("L"),
  14: new Move("L", -1),
  15: new Move("B"),
  17: new Move("B", -1)
};
var homeQuatInverse = null;
function probablyDecodedCorrectly(data) {
  return data[13] < 18 && data[14] < 18 && data[15] < 18 && data[16] < 18 && data[17] < 18 && data[18] < 18;
}
var key10 = new Uint8Array([
  198,
  202,
  21,
  223,
  79,
  110,
  19,
  182,
  119,
  13,
  230,
  89,
  58,
  175,
  186,
  162
]);
var key11 = new Uint8Array([
  67,
  226,
  91,
  214,
  125,
  220,
  120,
  216,
  7,
  96,
  163,
  218,
  130,
  60,
  1,
  241
]);
async function decryptPattern(data, aesKey) {
  if (aesKey === null) {
    return data;
  }
  const copy = new Uint8Array(data);
  copy.set(new Uint8Array(await unsafeDecryptBlock(aesKey, copy.slice(3))), 3);
  copy.set(
    new Uint8Array(await unsafeDecryptBlock(aesKey, copy.slice(0, 16))),
    0
  );
  if (probablyDecodedCorrectly(copy)) {
    return copy;
  }
  throw new Error("Invalid Gan cube pattern");
}
var PhysicalState = class _PhysicalState {
  constructor(dataView, timeStamp) {
    this.dataView = dataView;
    this.timeStamp = timeStamp;
    this.arr = new Uint8Array(dataView.buffer);
    if (this.arr.length !== this.arrLen) {
      throw new Error("Unexpected array length");
    }
  }
  static async read(characteristic, aesKey) {
    const value = await decryptPattern(
      new Uint8Array((await characteristic.readValue()).buffer),
      aesKey
    );
    const timeStamp = Date.now();
    return new _PhysicalState(new DataView(value.buffer), timeStamp);
  }
  arr;
  arrLen = 19;
  rotQuat() {
    let x = this.dataView.getInt16(0, true) / 16384;
    let y = this.dataView.getInt16(2, true) / 16384;
    let z = this.dataView.getInt16(4, true) / 16384;
    [x, y, z] = [-y, z, -x];
    const wSquared = 1 - (x * x + y * y + z * z);
    const w = wSquared > 0 ? Math.sqrt(wSquared) : 0;
    const quat = new Quaternion2(x, y, z, w);
    if (!homeQuatInverse) {
      homeQuatInverse = quat.clone().invert();
    }
    return quat.clone().multiply(homeQuatInverse.clone());
  }
  // Loops from 255 to 0.
  moveCounter() {
    return this.arr[12];
  }
  numMovesSince(previousMoveCounter) {
    return this.moveCounter() - previousMoveCounter & 255;
  }
  // Due to the design of the Gan356i protocol, it's common to query for the
  // latest physical state and find 0 moves have been performed since the last
  // query. Therefore, it's useful to allow 0 as an argument.
  latestMoves(n) {
    if (n < 0 || n > MAX_LATEST_MOVES) {
      throw new Error(`Must ask for 0 to 6 latest moves. (Asked for ${n})`);
    }
    return Array.from(this.arr.slice(19 - n, 19)).map(
      (i) => ganMoveToBlockMove[i]
    );
  }
  debugInfo() {
    return {
      arr: this.arr
    };
  }
};
var UUIDs = {
  ganCubeService: "0000fff0-0000-1000-8000-00805f9b34fb",
  physicalStateCharacteristic: "0000fff5-0000-1000-8000-00805f9b34fb",
  actualAngleAndBatteryCharacteristic: "0000fff7-0000-1000-8000-00805f9b34fb",
  faceletStatus1Characteristic: "0000fff2-0000-1000-8000-00805f9b34fb",
  faceletStatus2Characteristic: "0000fff3-0000-1000-8000-00805f9b34fb",
  infoService: "0000180a-0000-1000-8000-00805f9b34fb",
  systemIDCharacteristic: "00002a23-0000-1000-8000-00805f9b34fb",
  versionCharacteristic: "00002a28-0000-1000-8000-00805f9b34fb"
};
var commands = {
  reset: new Uint8Array([
    0,
    0,
    36,
    0,
    73,
    146,
    36,
    73,
    109,
    146,
    219,
    182,
    73,
    146,
    182,
    36,
    109,
    219
  ])
};
function buf2hex(buffer) {
  return Array.prototype.map.call(
    new Uint8Array(buffer),
    (x) => `00${x.toString(16)}`.slice(-2)
  ).join(" ");
}
var gan356iCornerMappings = [
  [0, 21, 15],
  [5, 13, 47],
  [7, 45, 39],
  [2, 37, 23],
  [29, 10, 16],
  [31, 18, 32],
  [26, 34, 40],
  [24, 42, 8]
];
var gan356iEdgeMappings = [
  [1, 22],
  [3, 14],
  [6, 46],
  [4, 38],
  [30, 17],
  [27, 9],
  [25, 41],
  [28, 33],
  [19, 12],
  [20, 35],
  [44, 11],
  [43, 36]
];
var faceOrder = "URFDLB";
async function getKey(server) {
  const infoService = await server.getPrimaryService(UUIDs.infoService);
  const versionCharacteristic = await infoService.getCharacteristic(
    UUIDs.versionCharacteristic
  );
  const versionBuffer = new Uint8Array(
    (await versionCharacteristic.readValue()).buffer
  );
  const versionValue = ((versionBuffer[0] << 8) + versionBuffer[1] << 8) + versionBuffer[2];
  if (versionValue < 65544) {
    return null;
  }
  const keyXor = versionValue < 65792 ? key10 : key11;
  const systemIDCharacteristic = await infoService.getCharacteristic(
    UUIDs.systemIDCharacteristic
  );
  const systemID = new Uint8Array(
    (await systemIDCharacteristic.readValue()).buffer
  ).reverse();
  const key = new Uint8Array(keyXor);
  for (let i = 0; i < systemID.length; i++) {
    key[i] = (key[i] + systemID[i]) % 256;
  }
  return importKey(key);
}
var GanCube = class _GanCube extends BluetoothPuzzle {
  constructor(kpuzzle, service, server, physicalStateCharacteristic, lastMoveCounter, aesKey) {
    super();
    this.kpuzzle = kpuzzle;
    this.service = service;
    this.server = server;
    this.physicalStateCharacteristic = physicalStateCharacteristic;
    this.lastMoveCounter = lastMoveCounter;
    this.aesKey = aesKey;
    this.pattern = kpuzzle.defaultPattern();
    this.startTrackingMoves();
  }
  // We have to perform async operations before we call the constructor.
  static async connect(server) {
    const ganCubeService = await server.getPrimaryService(UUIDs.ganCubeService);
    debugLog("Service:", ganCubeService);
    const physicalStateCharacteristic = await ganCubeService.getCharacteristic(
      UUIDs.physicalStateCharacteristic
    );
    debugLog("Characteristic:", physicalStateCharacteristic);
    const aesKey = await getKey(server);
    const initialMoveCounter = (await PhysicalState.read(physicalStateCharacteristic, aesKey)).moveCounter();
    debugLog("Initial Move Counter:", initialMoveCounter);
    const cube = new _GanCube(
      await puzzles["3x3x3"].kpuzzle(),
      ganCubeService,
      server,
      physicalStateCharacteristic,
      initialMoveCounter,
      aesKey
    );
    return cube;
  }
  INTERVAL_MS = DEFAULT_INTERVAL_MS;
  intervalHandle = null;
  pattern;
  cachedFaceletStatus1Characteristic;
  cachedFaceletStatus2Characteristic;
  cachedActualAngleAndBatteryCharacteristic;
  name() {
    return this.server.device.name;
  }
  disconnect() {
    this.server.disconnect();
  }
  startTrackingMoves() {
    this.intervalHandle = window.setInterval(
      this.intervalHandler.bind(this),
      this.INTERVAL_MS
    );
  }
  stopTrackingMoves() {
    if (!this.intervalHandle) {
      throw new Error("Not tracking moves!");
    }
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
  }
  // TODO: Can we ever receive async responses out of order?
  async intervalHandler() {
    const physicalState = await PhysicalState.read(
      this.physicalStateCharacteristic,
      this.aesKey
    );
    let numInterveningMoves = physicalState.numMovesSince(this.lastMoveCounter);
    if (numInterveningMoves > MAX_LATEST_MOVES) {
      debugLog(
        `Too many moves! Dropping ${numInterveningMoves - MAX_LATEST_MOVES} moves`
      );
      numInterveningMoves = MAX_LATEST_MOVES;
    }
    for (const move of physicalState.latestMoves(numInterveningMoves)) {
      this.pattern = this.pattern.applyMove(move);
      this.dispatchAlgLeaf({
        latestAlgLeaf: move,
        timeStamp: physicalState.timeStamp,
        debug: physicalState.debugInfo(),
        pattern: this.pattern
        // quaternion: physicalState.rotQuat(),
      });
    }
    this.dispatchOrientation({
      timeStamp: physicalState.timeStamp,
      quaternion: physicalState.rotQuat()
    });
    this.lastMoveCounter = physicalState.moveCounter();
  }
  async getBattery() {
    return new Uint8Array(
      await this.readActualAngleAndBatteryCharacteristic()
    )[7];
  }
  async getPattern() {
    const arr = await decryptPattern(
      new Uint8Array(await this.readFaceletStatus1Characteristic()),
      this.aesKey
    );
    const stickers = [];
    for (let i = 0; i < 18; i += 3) {
      let v = ((arr[i ^ 1] << 8) + arr[i + 1 ^ 1] << 8) + arr[i + 2 ^ 1];
      for (let j = 0; j < 8; j++) {
        stickers.push(v & 7);
        v >>= 3;
      }
    }
    return new KPattern(
      this.kpuzzle,
      getPatternData(
        stickers,
        faceOrder,
        gan356iEdgeMappings,
        gan356iCornerMappings
      )
    );
  }
  async faceletStatus1Characteristic() {
    this.cachedFaceletStatus1Characteristic = this.cachedFaceletStatus1Characteristic || this.service.getCharacteristic(UUIDs.faceletStatus1Characteristic);
    return this.cachedFaceletStatus1Characteristic;
  }
  async faceletStatus2Characteristic() {
    this.cachedFaceletStatus2Characteristic = this.cachedFaceletStatus2Characteristic || this.service.getCharacteristic(UUIDs.faceletStatus2Characteristic);
    return this.cachedFaceletStatus2Characteristic;
  }
  async actualAngleAndBatteryCharacteristic() {
    this.cachedActualAngleAndBatteryCharacteristic = this.cachedActualAngleAndBatteryCharacteristic || this.service.getCharacteristic(UUIDs.actualAngleAndBatteryCharacteristic);
    return this.cachedActualAngleAndBatteryCharacteristic;
  }
  async reset() {
    const faceletStatus1Characteristic = await this.faceletStatus1Characteristic();
    await faceletStatus1Characteristic.writeValue(commands["reset"]);
  }
  async readFaceletStatus1Characteristic() {
    const faceletStatus1Characteristic = await this.faceletStatus1Characteristic();
    return (await faceletStatus1Characteristic.readValue()).buffer;
  }
  async readFaceletStatus2Characteristic() {
    const faceletStatus2Characteristic = await this.faceletStatus2Characteristic();
    return buf2hex((await faceletStatus2Characteristic.readValue()).buffer);
  }
  async readActualAngleAndBatteryCharacteristic() {
    const actualAngleAndBatteryCharacteristic = await this.actualAngleAndBatteryCharacteristic();
    return (await actualAngleAndBatteryCharacteristic.readValue()).buffer;
  }
  // TODO
  // private onphysicalStateCharacteristicChanged(event: any): void {
  //   var val = event.target.value;
  //   debugLog(val);
  // }
};
var ganConfig = {
  connect: GanCube.connect.bind(GanCube),
  prefixes: ["GAN"],
  filters: [{ namePrefix: "GAN" }],
  optionalServices: [UUIDs.ganCubeService, UUIDs.infoService]
};

// src/cubing/bluetooth/smart-puzzle/giiker.ts
var MESSAGE_LENGTH = 20;
var UUIDs2 = {
  cubeService: "0000aadb-0000-1000-8000-00805f9b34fb",
  cubeCharacteristic: "0000aadc-0000-1000-8000-00805f9b34fb"
};
function giikerMoveToAlgMove(face, amount) {
  switch (amount) {
    case 3: {
      amount = -1;
      break;
    }
    case 9: {
      debugLog("Encountered 9", face, amount);
      amount = -2;
      break;
    }
  }
  const family = ["?", "B", "D", "L", "U", "R", "F"][face];
  return new Move(family, amount);
}
function giikerStateStr(giikerState) {
  let str = "";
  str += giikerState.slice(0, 8).join(".");
  str += "\n";
  str += giikerState.slice(8, 16).join(".");
  str += "\n";
  str += giikerState.slice(16, 28).join(".");
  str += "\n";
  str += giikerState.slice(28, 32).join(".");
  str += "\n";
  str += giikerState.slice(32, 40).join(".");
  return str;
}
var Reid333SolvedCenters = {
  pieces: [0, 1, 2, 3, 4, 5],
  orientation: [0, 0, 0, 0, 0, 0],
  orientationMod: [1, 1, 1, 1, 1, 1]
  // TODO
};
var epGiiKERtoReid333 = [4, 8, 0, 9, 5, 1, 3, 7, 6, 10, 2, 11];
var epReid333toGiiKER = [2, 5, 10, 6, 0, 4, 8, 7, 1, 3, 9, 11];
var preEO = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
var postEO = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
var cpGiiKERtoReid333 = [4, 0, 3, 5, 7, 1, 2, 6];
var cpReid333toGiiKER = [1, 5, 6, 2, 0, 3, 7, 4];
var preCO = [1, 2, 1, 2, 2, 1, 2, 1];
var postCO = [2, 1, 2, 1, 1, 2, 1, 2];
var coFlip = [-1, 1, -1, 1, 1, -1, 1, -1];
function getNibble(val, i) {
  if (i % 2 === 1) {
    return val[i / 2 | 0] % 16;
  }
  return 0 | val[i / 2 | 0] / 16;
}
function probablyEncrypted(data) {
  return data[18] === 167;
}
var lookup = [
  176,
  81,
  104,
  224,
  86,
  137,
  237,
  119,
  38,
  26,
  193,
  161,
  210,
  126,
  150,
  81,
  93,
  13,
  236,
  249,
  89,
  235,
  88,
  24,
  113,
  81,
  214,
  131,
  130,
  199,
  2,
  169,
  39,
  165,
  171,
  41
];
function decryptState(data) {
  const offset1 = getNibble(data, 38);
  const offset2 = getNibble(data, 39);
  const output = new Uint8Array(MESSAGE_LENGTH);
  for (let i = 0; i < MESSAGE_LENGTH; i++) {
    output[i] = data[i] + lookup[offset1 + i] + lookup[offset2 + i];
  }
  return output;
}
async function decodeState(data) {
  if (!probablyEncrypted(data)) {
    return data;
  }
  return decryptState(data);
}
var GiiKERCube = class _GiiKERCube extends BluetoothPuzzle {
  constructor(server, cubeCharacteristic, originalValue) {
    super();
    this.server = server;
    this.cubeCharacteristic = cubeCharacteristic;
    this.originalValue = originalValue;
  }
  static async connect(server) {
    const cubeService = await server.getPrimaryService(UUIDs2.cubeService);
    debugLog("Service:", cubeService);
    const cubeCharacteristic = await cubeService.getCharacteristic(
      UUIDs2.cubeCharacteristic
    );
    debugLog("Characteristic:", cubeCharacteristic);
    const originalValue = await decodeState(
      new Uint8Array((await cubeCharacteristic.readValue()).buffer)
    );
    debugLog("Original value:", originalValue);
    const cube = new _GiiKERCube(server, cubeCharacteristic, originalValue);
    await cubeCharacteristic.startNotifications();
    cubeCharacteristic.addEventListener(
      "characteristicvaluechanged",
      cube.onCubeCharacteristicChanged.bind(cube)
    );
    return cube;
  }
  name() {
    return this.server.device.name;
  }
  disconnect() {
    this.server.disconnect();
  }
  async getPattern() {
    return this.toReid333(
      new Uint8Array((await this.cubeCharacteristic.readValue()).buffer)
    );
  }
  getBit(val, i) {
    const n = i / 8 | 0;
    const shift = 7 - i % 8;
    return val[n] >> shift & 1;
  }
  toReid333(val) {
    const patternData = {
      EDGES: {
        pieces: new Array(12),
        orientation: new Array(12)
      },
      CORNERS: {
        pieces: new Array(8),
        orientation: new Array(8)
      },
      CENTERS: Reid333SolvedCenters
    };
    for (let i = 0; i < 12; i++) {
      const gi = epReid333toGiiKER[i];
      patternData["EDGES"].pieces[i] = epGiiKERtoReid333[getNibble(val, gi + 16) - 1];
      patternData["EDGES"].orientation[i] = this.getBit(val, gi + 112) ^ preEO[patternData["EDGES"].pieces[i]] ^ postEO[i];
    }
    for (let i = 0; i < 8; i++) {
      const gi = cpReid333toGiiKER[i];
      patternData["CORNERS"].pieces[i] = cpGiiKERtoReid333[getNibble(val, gi) - 1];
      patternData["CORNERS"].orientation[i] = (getNibble(val, gi + 8) * coFlip[gi] + preCO[patternData["CORNERS"].pieces[i]] + postCO[i]) % 3;
    }
    return new KPattern(experimental3x3x3KPuzzle, patternData);
  }
  async onCubeCharacteristicChanged(event) {
    const val = await decodeState(new Uint8Array(event.target.value.buffer));
    debugLog(val);
    debugLog(val);
    if (this.isRepeatedInitialValue(val)) {
      debugLog("Skipping repeated initial value.");
      return;
    }
    const giikerState = [];
    for (let i = 0; i < MESSAGE_LENGTH; i++) {
      giikerState.push(Math.floor(val[i] / 16));
      giikerState.push(val[i] % 16);
    }
    debugLog(giikerState);
    const str = giikerStateStr(giikerState);
    debugLog(str);
    this.dispatchAlgLeaf({
      latestAlgLeaf: giikerMoveToAlgMove(giikerState[32], giikerState[33]),
      timeStamp: event.timeStamp,
      debug: {
        stateStr: str
      },
      pattern: this.toReid333(val)
    });
  }
  isRepeatedInitialValue(val) {
    if (typeof this.originalValue === "undefined") {
      throw new Error("GiiKERCube has uninitialized original value.");
    }
    if (this.originalValue === null) {
      return false;
    }
    const originalValue = this.originalValue;
    this.originalValue = null;
    debugLog("Comparing against original value.");
    for (let i = 0; i < MESSAGE_LENGTH - 2; i++) {
      if (originalValue[i] !== val[i]) {
        debugLog("Different at index ", i);
        return false;
      }
    }
    return true;
  }
};
var giiKERConfig = {
  connect: GiiKERCube.connect.bind(GiiKERCube),
  prefixes: ["Gi", "", "Mi", "Hi-"],
  // Hack
  filters: [
    // Known prefixes: GiC, GiS (3x3x3), Gi2 (2x2x2)
    // Suspected prefixes GiY, Gi3
    { namePrefix: "Gi" },
    { namePrefix: "Mi" },
    { namePrefix: "Hi-" },
    { services: ["0000aadb-0000-1000-8000-00805f9b34fb"] },
    { services: ["0000aaaa-0000-1000-8000-00805f9b34fb"] },
    { services: ["0000fe95-0000-1000-8000-00805f9b34fb"] }
  ],
  optionalServices: [
    // "00001530-1212-efde-1523-785feabcd123",
    // "0000aaaa-0000-1000-8000-00805f9b34fb",
    UUIDs2.cubeService
    // "0000180f-0000-1000-8000-00805f9b34fb",
    // "0000180a-0000-1000-8000-00805f9b34fb"
  ]
};

// src/cubing/bluetooth/smart-puzzle/gocube.ts
import { Quaternion as Quaternion3 } from "three/src/math/Quaternion.js";
var UUIDs3 = {
  goCubeService: "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
  goCubeStateCharacteristic: "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
};
function buf2hex2(buffer) {
  return Array.prototype.map.call(
    new Uint8Array(buffer),
    (x) => `00${x.toString(16)}`.slice(-2)
  ).join(" ");
}
function bufferToString(buffer) {
  const byteView = new Uint8Array(buffer);
  let str = "";
  for (const charCode of byteView) {
    str += String.fromCharCode(charCode);
  }
  return str;
}
var moveMap = [
  new Move("B", 1),
  new Move("B", -1),
  new Move("F", 1),
  new Move("F", -1),
  new Move("U", 1),
  new Move("U", -1),
  new Move("D", 1),
  new Move("D", -1),
  new Move("R", 1),
  new Move("R", -1),
  new Move("L", 1),
  new Move("L", -1)
];
var GoCube = class _GoCube extends BluetoothPuzzle {
  constructor(server, goCubeStateCharacteristic) {
    super();
    this.server = server;
    this.goCubeStateCharacteristic = goCubeStateCharacteristic;
  }
  // We have to perform async operations before we call the constructor.
  static async connect(server) {
    const service = await server.getPrimaryService(UUIDs3.goCubeService);
    debugLog({ service });
    const goCubeStateCharacteristic = await service.getCharacteristic(
      UUIDs3.goCubeStateCharacteristic
    );
    debugLog({ goCubeStateCharacteristic });
    const cube = new _GoCube(server, goCubeStateCharacteristic);
    await goCubeStateCharacteristic.startNotifications();
    goCubeStateCharacteristic.addEventListener(
      "characteristicvaluechanged",
      cube.onCubeCharacteristicChanged.bind(cube)
    );
    return cube;
  }
  // public async getState(): Promise<PuzzleState> {
  //   return new Promise((resolve, reject) => {
  //     this.resolve = (value: any) => {
  //       resolve(buf2hex(value.buffer) as any);
  //     };
  //     this.goCubeStateCharacteristic.startNotifications();
  //   });
  // }
  recorded = [];
  homeQuatInverse = null;
  lastRawQuat = new Quaternion3(0, 0, 0, 1);
  currentQuat = new Quaternion3(0, 0, 0, 1);
  lastTarget = new Quaternion3(0, 0, 0, 1);
  alg = new Alg();
  disconnect() {
    this.server.disconnect();
  }
  reset() {
    this.resetAlg();
    this.resetOrientation();
  }
  resetAlg(alg) {
    this.alg = alg || new Alg();
  }
  resetOrientation() {
    this.homeQuatInverse = this.lastRawQuat.clone().invert();
    this.currentQuat = new Quaternion3(0, 0, 0, 1);
    this.lastTarget = new Quaternion3(0, 0, 0, 1);
  }
  name() {
    return this.server.device.name;
  }
  onCubeCharacteristicChanged(event) {
    const buffer = event.target.value;
    this.recorded.push([event.timeStamp, buf2hex2(buffer.buffer)]);
    if (buffer.byteLength < 16) {
      for (let i = 3; i < buffer.byteLength - 4; i += 2) {
        const move = moveMap[buffer.getUint8(i)];
        this.alg = experimentalAppendMove(this.alg, move);
        this.dispatchAlgLeaf({
          latestAlgLeaf: moveMap[buffer.getUint8(i)],
          timeStamp: event.timeStamp,
          debug: {
            stateStr: buf2hex2(buffer.buffer)
          }
        });
      }
    } else {
      const coords = bufferToString(
        buffer.buffer.slice(3, buffer.byteLength - 3)
      ).split("#").map((s) => parseInt(s, 10) / 16384);
      const quat = new Quaternion3(coords[0], coords[1], coords[2], coords[3]);
      this.lastRawQuat = quat.clone();
      if (!this.homeQuatInverse) {
        this.homeQuatInverse = quat.clone().invert();
      }
      const targetQuat = quat.clone().multiply(this.homeQuatInverse.clone());
      targetQuat.y = -targetQuat.y;
      this.lastTarget.slerp(targetQuat, 0.5);
      this.currentQuat.rotateTowards(this.lastTarget, rotateTowardsRate);
      this.dispatchOrientation({
        quaternion: this.currentQuat,
        timeStamp: event.timeStamp
      });
    }
  }
};
var rotateTowardsRate = 0.5;
var goCubeConfig = {
  connect: GoCube.connect.bind(GoCube),
  prefixes: ["GoCube", "Rubik"],
  filters: [{ namePrefix: "GoCube" }, { namePrefix: "Rubik" }],
  optionalServices: [UUIDs3.goCubeService]
};

// src/cubing/bluetooth/smart-puzzle/endianness.ts
function flipBitOrder(v, numBits) {
  let result = 0;
  for (let i = 0; i < numBits; i++) {
    const shiftLeft = numBits - 1 - 2 * i;
    const unShiftedBit = v & 1 << i;
    result += shiftLeft < 0 ? unShiftedBit >> -shiftLeft : unShiftedBit << shiftLeft;
  }
  return result;
}

// src/cubing/bluetooth/smart-puzzle/Heykube.ts
var UUIDs4 = {
  heykubeService: "b46a791a-8273-4fc1-9e67-94d3dc2aac1c",
  stateCharacteristic: "a2f41a4e-0e31-4bbc-9389-4253475481fb",
  batteryCharacteristic: "fd51b3ba-99c7-49c6-9f85-5644ff56a378"
};
var HeykubeCube = class _HeykubeCube extends BluetoothPuzzle {
  constructor(_kpuzzle, _service, device, server, stateCharacteristic) {
    super();
    this.server = server;
    this.stateCharacteristic = stateCharacteristic;
    device.addEventListener(
      "gattserverdisconnected",
      this.onDisconnect.bind(this)
    );
    this.stateCharacteristic.startNotifications();
    this.startTrackingMoves();
  }
  // We have to perform async operations before we call the constructor.
  static async connect(server, device) {
    const service = await server.getPrimaryService(UUIDs4.heykubeService);
    debugLog("Service:", service);
    const stateCharacteristic = await service.getCharacteristic(
      UUIDs4.stateCharacteristic
    );
    debugLog("Characteristic:", stateCharacteristic);
    const cube = new _HeykubeCube(
      await puzzles["3x3x3"].kpuzzle(),
      service,
      device,
      server,
      stateCharacteristic
    );
    return cube;
  }
  name() {
    return this.server.device.name;
  }
  disconnect() {
    this.server.disconnect();
  }
  onDisconnect() {
    this.dispatchEvent(new CustomEvent("disconnect"));
  }
  startTrackingMoves() {
    this.stateCharacteristic.addEventListener(
      "characteristicvaluechanged",
      (e) => this.onStateCharacteristic(e)
    );
  }
  // public stopTrackingMoves(): void {}
  // public async getBattery(): Promise<number> {
  //   return new Uint8Array(
  //     await this.readActualAngleAndBatteryCharacteristic(),
  //   )[7];
  // }srcElement: BluetoothRemoteGATTCharacteristic
  onStateCharacteristic(event) {
    const state = this.decodeState(event.target.value);
    this.dispatchAlgLeaf({
      latestAlgLeaf: state.latestMove,
      timeStamp: event.timeStamp,
      pattern: state.pattern
    });
  }
  decodeState(dv) {
    const moves = [
      new Move("U"),
      new Move("U'"),
      new Move("B"),
      new Move("B'"),
      new Move("F"),
      new Move("F'"),
      null,
      null,
      new Move("L"),
      new Move("L'"),
      new Move("D"),
      new Move("D'"),
      new Move("R"),
      new Move("R'")
      // null,
      // null,
    ];
    const b2 = new Uint8Array(dv.byteLength);
    for (let i = 0; i < dv.byteLength; i++) {
      b2[i] = flipBitOrder(dv.getUint8(i), 8);
    }
    const components1 = twizzleBinaryToBinaryComponents(
      b2.slice(0, 11)
    );
    const components2 = {
      epLex: flipBitOrder(components1.epLex, 29),
      eoMask: flipBitOrder(components1.eoMask, 12),
      cpLex: flipBitOrder(components1.cpLex, 16),
      coMask: flipBitOrder(components1.coMask, 13),
      poIdxL: 0,
      poIdxU: 7,
      moSupport: 1,
      // TODO
      moMask: 0
    };
    return {
      pattern: binaryComponentsToReid3x3x3(components2),
      latestMove: moves[b2[20] & 15]
    };
  }
  async getPattern() {
    const b1 = await this.stateCharacteristic.readValue();
    return this.decodeState(b1).pattern;
  }
};
var heykubeConfig = {
  connect: HeykubeCube.connect.bind(HeykubeCube),
  prefixes: ["HEYKUBE"],
  filters: [{ namePrefix: "HEYKUBE" }],
  optionalServices: [UUIDs4.heykubeService]
};

// src/cubing/bluetooth/smart-puzzle/qiyi.ts
var UUIDs5 = {
  qiyiMainService: 65520,
  qiyiMainCharacteristic: 65526
};
var qiyiMoveToBlockMove = {
  1: new Move("L", -1),
  2: new Move("L"),
  3: new Move("R", -1),
  4: new Move("R"),
  5: new Move("D", -1),
  6: new Move("D"),
  7: new Move("U", -1),
  8: new Move("U"),
  9: new Move("F", -1),
  10: new Move("F"),
  11: new Move("B", -1),
  12: new Move("B")
};
var faceOrder2 = "LRDUFB";
var qiyiCornerMappings = [
  [8, 20, 9],
  // UFR,
  [2, 11, 45],
  // URB,
  [0, 47, 36],
  // UBL,
  [6, 38, 18],
  // ULF,
  [29, 15, 26],
  // DRF,
  [27, 24, 44],
  // DFL,
  [33, 42, 53],
  // DLB,
  [35, 51, 17]
  // DBR,
];
var qiyiEdgeMappings = [
  [7, 19],
  // UF,
  [5, 10],
  // UR,
  [1, 46],
  // UB,
  [3, 37],
  // UL,
  [28, 25],
  // DF,
  [32, 16],
  // DR,
  [34, 52],
  // DB,
  [30, 43],
  // DL,
  [23, 12],
  // FR,
  [21, 41],
  // FL,
  [48, 14],
  // BR,
  [50, 39]
  // BL,
];
function generateChecksum(data) {
  const TABLE = new Uint16Array([
    0,
    49345,
    49537,
    320,
    49921,
    960,
    640,
    49729,
    50689,
    1728,
    1920,
    51009,
    1280,
    50625,
    50305,
    1088,
    52225,
    3264,
    3456,
    52545,
    3840,
    53185,
    52865,
    3648,
    2560,
    51905,
    52097,
    2880,
    51457,
    2496,
    2176,
    51265,
    55297,
    6336,
    6528,
    55617,
    6912,
    56257,
    55937,
    6720,
    7680,
    57025,
    57217,
    8e3,
    56577,
    7616,
    7296,
    56385,
    5120,
    54465,
    54657,
    5440,
    55041,
    6080,
    5760,
    54849,
    53761,
    4800,
    4992,
    54081,
    4352,
    53697,
    53377,
    4160,
    61441,
    12480,
    12672,
    61761,
    13056,
    62401,
    62081,
    12864,
    13824,
    63169,
    63361,
    14144,
    62721,
    13760,
    13440,
    62529,
    15360,
    64705,
    64897,
    15680,
    65281,
    16320,
    16e3,
    65089,
    64001,
    15040,
    15232,
    64321,
    14592,
    63937,
    63617,
    14400,
    10240,
    59585,
    59777,
    10560,
    60161,
    11200,
    10880,
    59969,
    60929,
    11968,
    12160,
    61249,
    11520,
    60865,
    60545,
    11328,
    58369,
    9408,
    9600,
    58689,
    9984,
    59329,
    59009,
    9792,
    8704,
    58049,
    58241,
    9024,
    57601,
    8640,
    8320,
    57409,
    40961,
    24768,
    24960,
    41281,
    25344,
    41921,
    41601,
    25152,
    26112,
    42689,
    42881,
    26432,
    42241,
    26048,
    25728,
    42049,
    27648,
    44225,
    44417,
    27968,
    44801,
    28608,
    28288,
    44609,
    43521,
    27328,
    27520,
    43841,
    26880,
    43457,
    43137,
    26688,
    30720,
    47297,
    47489,
    31040,
    47873,
    31680,
    31360,
    47681,
    48641,
    32448,
    32640,
    48961,
    32e3,
    48577,
    48257,
    31808,
    46081,
    29888,
    30080,
    46401,
    30464,
    47041,
    46721,
    30272,
    29184,
    45761,
    45953,
    29504,
    45313,
    29120,
    28800,
    45121,
    20480,
    37057,
    37249,
    20800,
    37633,
    21440,
    21120,
    37441,
    38401,
    22208,
    22400,
    38721,
    21760,
    38337,
    38017,
    21568,
    39937,
    23744,
    23936,
    40257,
    24320,
    40897,
    40577,
    24128,
    23040,
    39617,
    39809,
    23360,
    39169,
    22976,
    22656,
    38977,
    34817,
    18624,
    18816,
    35137,
    19200,
    35777,
    35457,
    19008,
    19968,
    36545,
    36737,
    20288,
    36097,
    19904,
    19584,
    35905,
    17408,
    33985,
    34177,
    17728,
    34561,
    18368,
    18048,
    34369,
    33281,
    17088,
    17280,
    33601,
    16640,
    33217,
    32897,
    16448
  ]);
  let crc = 65535;
  for (const dataPoint of data) {
    const xor = (dataPoint ^ crc) & 255;
    crc >>= 8;
    crc ^= TABLE[xor];
  }
  return crc;
}
async function prepareMessage(message, aesKey) {
  const messageCopyForChecksum = structuredClone(message);
  const checksum = generateChecksum(messageCopyForChecksum);
  messageCopyForChecksum.push(checksum & 255);
  messageCopyForChecksum.push(checksum >> 8);
  const paddedLength = Math.ceil(messageCopyForChecksum.length / 16) * 16;
  const paddedArray = new Uint8Array([
    ...messageCopyForChecksum,
    ...Array(paddedLength - messageCopyForChecksum.length).fill(0)
  ]);
  const encryptedMessage = new Uint8Array(paddedLength);
  for (let i = 0; i < paddedArray.length / 16; i++) {
    const encryptedBlock = new Uint8Array(
      await unsafeEncryptBlock(aesKey, paddedArray.slice(i * 16, (i + 1) * 16))
    );
    encryptedMessage.set(encryptedBlock, i * 16);
  }
  return encryptedMessage;
}
async function decryptMessage(encryptedMessage, aesKey) {
  const decryptedMessage = new Uint8Array(encryptedMessage.length);
  for (let i = 0; i < encryptedMessage.length / 16; i++) {
    const decryptedBlock = new Uint8Array(
      await unsafeDecryptBlock(
        aesKey,
        encryptedMessage.slice(i * 16, (i + 1) * 16)
      )
    );
    decryptedMessage.set(decryptedBlock, i * 16);
  }
  return decryptedMessage;
}
function getMacAddress(device) {
  if (device.name === void 0) {
    return;
  }
  return [
    204,
    163,
    0,
    0,
    parseInt(device.name.slice(10, 12), 16),
    parseInt(device.name.slice(12, 14), 16)
  ];
}
var MAX_TIMESTAMP_COUNT = 12;
var TIMESTAMP_SCALE = 1.6;
var CUBE_HELLO = 2;
var STATE_CHANGE = 3;
var QiyiCube = class _QiyiCube extends BluetoothPuzzle {
  constructor(kpuzzle, aesKey, server) {
    super();
    this.kpuzzle = kpuzzle;
    this.aesKey = aesKey;
    this.server = server;
    this.allTimeStamps = /* @__PURE__ */ new Set();
    this.allTimeStampsQueue = [];
    void (async () => {
      await this.startNotifications();
      void this.sendAppHello();
    })();
  }
  latestTimestamp;
  allTimeStamps;
  // Without this set, moves are constantly duplicated
  allTimeStampsQueue;
  stickers = [
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5
  ];
  batteryLevel = 100;
  static async connect(server) {
    const aesKey = await importKey(
      new Uint8Array([
        87,
        177,
        249,
        171,
        205,
        90,
        232,
        167,
        156,
        185,
        140,
        231,
        87,
        140,
        81,
        8
      ])
    );
    return new _QiyiCube(await puzzles["3x3x3"].kpuzzle(), aesKey, server);
  }
  async sendAppHello() {
    const mainService = await this.server.getPrimaryService(
      UUIDs5.qiyiMainService
    );
    const mainCharacteristic = await mainService.getCharacteristic(
      UUIDs5.qiyiMainCharacteristic
    );
    for (let macGuessCounter = 0; macGuessCounter < 8; macGuessCounter++) {
      const mac = getMacAddress(this.server.device);
      mac[3] = macGuessCounter;
      const reversedMac = mac.reverse();
      const appHello = [
        254,
        21,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        ...reversedMac
      ];
      const appHelloMessage = await prepareMessage(appHello, this.aesKey);
      await mainCharacteristic.writeValue(appHelloMessage);
    }
  }
  async startNotifications() {
    const mainService = await this.server.getPrimaryService(
      UUIDs5.qiyiMainService
    );
    const mainCharacteristic = await mainService.getCharacteristic(
      UUIDs5.qiyiMainCharacteristic
    );
    mainCharacteristic.addEventListener(
      "characteristicvaluechanged",
      this.cubeMessageHandler.bind(this)
    );
    await mainCharacteristic.startNotifications();
  }
  async cubeMessageHandler(event) {
    const characteristic = event.target;
    const decryptedMessage = await decryptMessage(
      new Uint8Array(characteristic.value.buffer),
      this.aesKey
    );
    const opCode = decryptedMessage[2];
    let needsAck = false;
    switch (opCode) {
      case CUBE_HELLO: {
        const initialState = decryptedMessage.slice(7, 34);
        this.updateState(initialState);
        this.batteryLevel = decryptedMessage[35];
        needsAck = true;
        break;
      }
      case STATE_CHANGE: {
        const state = decryptedMessage.slice(7, 34);
        this.updateState(state);
        const latestMove = qiyiMoveToBlockMove[decryptedMessage[34]];
        const latestTimestamp = new DataView(
          decryptedMessage.slice(3, 7).buffer
        ).getInt32(0);
        const moves = [[latestMove, latestTimestamp]];
        const previousMoves = new DataView(
          decryptedMessage.slice(36, 91).buffer
        );
        for (let i = previousMoves.byteLength - 1; i > 0 && previousMoves.getUint8(i) !== 255; i -= 5) {
          const move = qiyiMoveToBlockMove[previousMoves.getUint8(i)];
          const timestamp = previousMoves.getUint32(i - 4);
          if (this.latestTimestamp === void 0 || timestamp <= this.latestTimestamp) {
            continue;
          }
          moves.push([move, timestamp]);
        }
        moves.sort((a, b) => a[1] - b[1]);
        for (const move of moves) {
          const latestAlgLeaf = move[0];
          const timeStamp = Math.round(move[1] / TIMESTAMP_SCALE);
          if (!this.allTimeStamps.has(timeStamp)) {
            this.dispatchAlgLeaf({
              latestAlgLeaf,
              timeStamp
            });
            this.allTimeStamps.add(timeStamp);
            this.allTimeStampsQueue.push(timeStamp);
            if (this.allTimeStampsQueue.length > MAX_TIMESTAMP_COUNT) {
              this.allTimeStamps.delete(this.allTimeStampsQueue.shift());
            }
          }
        }
        this.latestTimestamp = latestTimestamp;
        needsAck = decryptedMessage[91] === 1;
        break;
      }
      default:
        console.error(`Opcode not implemented: ${opCode}`);
        break;
    }
    if (needsAck) {
      await characteristic.writeValue(
        await prepareMessage(
          [254, 9, ...decryptedMessage.slice(2, 7)],
          this.aesKey
        )
      );
    }
  }
  updateState(state) {
    this.stickers = Array.from(state).flatMap((twoPieces) => [
      twoPieces & 15,
      twoPieces >> 4
    ]);
  }
  name() {
    return this.server.device.name;
  }
  disconnect() {
    this.server.disconnect();
  }
  async getPattern() {
    return new KPattern(
      this.kpuzzle,
      getPatternData(
        this.stickers,
        faceOrder2,
        qiyiEdgeMappings,
        qiyiCornerMappings
      )
    );
  }
  getBattery() {
    return this.batteryLevel;
  }
};
var qiyiConfig = {
  connect: QiyiCube.connect.bind(QiyiCube),
  prefixes: ["QY-QYSC"],
  filters: [
    {
      namePrefix: "QY-QYSC"
    }
  ],
  optionalServices: [UUIDs5.qiyiMainService]
};

// src/cubing/bluetooth/smart-puzzle/connect.ts
var smartPuzzleConfigs = [
  ganConfig,
  goCubeConfig,
  heykubeConfig,
  qiyiConfig,
  giiKERConfig
  // GiiKER must be last, due to Xiaomi naming. TODO: enforce this using tests.
];
async function connectSmartPuzzle(options) {
  return bluetoothConnect(smartPuzzleConfigs, options);
}

// src/cubing/bluetooth/smart-robot/GanRobot.ts
function buf2hex3(buffer) {
  return Array.prototype.map.call(
    new Uint8Array(buffer),
    (x) => `00${x.toString(16)}`.slice(-2)
  ).join(" ");
}
var MAX_NIBBLES_PER_WRITE = 18 * 2;
var QUANTUM_TURN_DURATION_MS = 150;
var DOUBLE_TURN_DURATION_MS = 250;
var U_D_SWAP = new Alg("F B R2 L2 B' F'");
var U_D_UNSWAP = U_D_SWAP.invert();
var F_B_SWAP = new Alg("U D R2 L2 D' U'");
var F_B_UNSWAP = F_B_SWAP.invert();
var UUIDs6 = {
  ganRobotService: "0000fff0-0000-1000-8000-00805f9b34fb",
  statusCharacteristic: "0000fff2-0000-1000-8000-00805f9b34fb",
  moveCharacteristic: "0000fff3-0000-1000-8000-00805f9b34fb"
};
var moveMap2 = {
  R: 0,
  R2: 1,
  "R2'": 1,
  "R'": 2,
  F: 3,
  F2: 4,
  "F2'": 4,
  "F'": 5,
  D: 6,
  D2: 7,
  "D2'": 7,
  "D'": 8,
  L: 9,
  L2: 10,
  "L2'": 10,
  "L'": 11,
  B: 12,
  B2: 13,
  "B2'": 13,
  "B'": 14
};
var moveMapX = {
  R: 0,
  R2: 1,
  "R2'": 1,
  "R'": 2,
  U: 3,
  U2: 4,
  "U2'": 4,
  "U'": 5,
  F: 6,
  F2: 7,
  "F2'": 7,
  "F'": 8,
  L: 9,
  L2: 10,
  "L2'": 10,
  "L'": 11,
  D: 12,
  D2: 13,
  "D2'": 13,
  "D'": 14
};
function isDoubleTurnNibble(nibble) {
  return nibble % 3 === 1;
}
function nibbleDuration(nibble) {
  return isDoubleTurnNibble(nibble) ? DOUBLE_TURN_DURATION_MS : QUANTUM_TURN_DURATION_MS;
}
function throwInvalidAlgNode(algNode) {
  console.error("invalid alg node", algNode, algNode.toString());
  throw new Error("invalid alg node!");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var GanRobot = class _GanRobot extends EventTarget {
  constructor(_service, server, device, statusCharacteristic, moveCharacteristic) {
    super();
    this.server = server;
    this.statusCharacteristic = statusCharacteristic;
    this.moveCharacteristic = moveCharacteristic;
    device.addEventListener(
      "gattserverdisconnected",
      this.onDisconnect.bind(this)
    );
  }
  experimentalDebugOnSend = null;
  experimentalDebugLog = () => {
  };
  // Because our Bluetooth connection code is set up not to know what kind of device is connecting, we put these options directly on the class.
  experimentalOptions = {
    xAngle: false,
    singleMoveFixHack: false,
    bufferQueue: 0,
    postSleep: 0
  };
  // We have to perform async operations before we call the constructor.
  static async connect(server, device) {
    const ganTimerService = await server.getPrimaryService(
      UUIDs6.ganRobotService
    );
    const statusCharacteristic = await ganTimerService.getCharacteristic(
      UUIDs6.statusCharacteristic
    );
    const moveCharacteristic = await ganTimerService.getCharacteristic(
      UUIDs6.moveCharacteristic
    );
    const timer = new _GanRobot(
      ganTimerService,
      server,
      device,
      statusCharacteristic,
      moveCharacteristic
    );
    return timer;
  }
  name() {
    return this.server.device.name;
  }
  disconnect() {
    this.server.disconnect();
  }
  onDisconnect() {
    this.dispatchEvent(new CustomEvent("disconnect"));
  }
  algNodeToNibble(algNode) {
    const move = algNode.as(Move);
    if (!move) {
      throwInvalidAlgNode(algNode);
    }
    const nibble = (this.experimentalOptions.xAngle ? moveMapX : moveMap2)[move.toString()] ?? null;
    if (nibble === null) {
      throwInvalidAlgNode(move);
    }
    return nibble;
  }
  async writeNibbles(nibbles) {
    if (nibbles.length > MAX_NIBBLES_PER_WRITE) {
      throw new Error(
        `Can only write ${MAX_NIBBLES_PER_WRITE} nibbles at a time!`
      );
    }
    const bytes = new Uint8Array(18);
    let i;
    for (i = 0; i < nibbles.length; i++) {
      const byteIdx = Math.floor(i / 2);
      bytes[byteIdx] += nibbles[i];
      if (i % 2 === 0) {
        bytes[byteIdx] *= 16;
      }
    }
    if (nibbles.length % 2 === 1) {
      bytes[Math.ceil(nibbles.length / 2) - 1] += 15;
    }
    for (let i2 = Math.ceil(nibbles.length / 2); i2 < 18; i2++) {
      bytes[i2] = 255;
    }
    let sleepDuration = 0;
    for (const nibble of nibbles) {
      sleepDuration += nibbleDuration(nibble);
    }
    this.experimentalDebugLog("WRITING:", buf2hex3(bytes));
    await this.moveCharacteristic.writeValue(bytes);
    await sleep(sleepDuration * 0.75);
    while ((await this.getStatus()).movesRemaining > 0) {
    }
    await sleep(this.experimentalOptions.postSleep);
  }
  async getStatus() {
    const statusBytes = new Uint8Array(
      (await this.statusCharacteristic.readValue()).buffer
    );
    this.experimentalDebugLog("moves remaining:", statusBytes[0]);
    return {
      movesRemaining: statusBytes[0]
    };
  }
  locked = false;
  processQueue() {
  }
  moveQueue = new Alg();
  // TODO: Don't let this resolve until the move is done?
  async queueMoves(moves) {
    this.moveQueue = this.moveQueue.concat(moves).experimentalSimplify({
      puzzleSpecificSimplifyOptions: cube3x3x3.puzzleSpecificSimplifyOptions
    });
    if (!this.locked) {
      try {
        this.locked = true;
        if (this.moveQueue.experimentalNumChildAlgNodes() === 1) {
          await sleep(this.experimentalOptions.bufferQueue);
        }
        while (this.moveQueue.experimentalNumChildAlgNodes() > 0) {
          let algNodes = Array.from(this.moveQueue.childAlgNodes());
          if (this.experimentalOptions.singleMoveFixHack && algNodes.length === 1) {
            const move = algNodes[0].as(Move);
            if (move) {
              if (move.amount === 2) {
                algNodes = [
                  move.modified({ amount: 1 }),
                  move.modified({ amount: 1 })
                ];
              } else {
                algNodes = [
                  move.modified({ amount: -move.amount }),
                  move.modified({ amount: 2 })
                ];
              }
            }
          }
          const splicedAlgNodes = algNodes.splice(
            0,
            MAX_NIBBLES_PER_WRITE
          );
          const nibbles = splicedAlgNodes.map(
            this.algNodeToNibble.bind(this)
          );
          const sending = new Alg(splicedAlgNodes);
          this.experimentalDebugLog("SENDING", sending.toString());
          if (this.experimentalDebugOnSend) {
            this.experimentalDebugOnSend(sending);
          }
          const write = this.writeNibbles(nibbles);
          this.moveQueue = new Alg(algNodes);
          await write;
        }
      } finally {
        this.locked = false;
      }
    }
  }
  async applyMoves(moves) {
    for (const move of moves) {
      const str = move.toString();
      if (str in (this.experimentalOptions.xAngle ? moveMapX : moveMap2)) {
        await this.queueMoves(new Alg([move]));
      } else if (move.family === (this.experimentalOptions.xAngle ? "B" : "U")) {
        await Promise.all([
          this.queueMoves(
            this.experimentalOptions.xAngle ? F_B_SWAP : U_D_SWAP
          ),
          this.queueMoves(
            new Alg([
              move.modified({
                family: this.experimentalOptions.xAngle ? "F" : "D"
              })
            ]).concat(
              this.experimentalOptions.xAngle ? F_B_UNSWAP : U_D_UNSWAP
            )
          )
        ]);
      }
    }
  }
};
var ganTimerConfig = {
  connect: GanRobot.connect.bind(GanRobot),
  prefixes: ["GAN"],
  filters: [{ namePrefix: "GAN" }],
  optionalServices: [UUIDs6.ganRobotService]
};

// src/cubing/bluetooth/smart-robot/index.ts
var smartRobotConfigs = [ganTimerConfig];
async function connectSmartRobot(options) {
  return bluetoothConnect(smartRobotConfigs, options);
}

// src/cubing/bluetooth/smart-timer/GanTimer.ts
var UUIDs7 = {
  ganTimerService: "0000fff0-0000-1000-8000-00805f9b34fb",
  timeCharacteristic: "0000fff2-0000-1000-8000-00805f9b34fb"
};
var GanTimer = class _GanTimer extends EventTarget {
  constructor(_service, server, device, timeCharacteristic) {
    super();
    this.server = server;
    this.timeCharacteristic = timeCharacteristic;
    this.startPolling();
    console.log(server);
    device.addEventListener(
      "gattserverdisconnected",
      this.onDisconnect.bind(this)
    );
  }
  polling = false;
  previousDetail = null;
  // We have to perform async operations before we call the constructor.
  static async connect(server, device) {
    const ganTimerService = await server.getPrimaryService(
      UUIDs7.ganTimerService
    );
    console.log("Service:", ganTimerService);
    const timeCharacteristic = await ganTimerService.getCharacteristic(
      UUIDs7.timeCharacteristic
    );
    console.log("Characteristic:", timeCharacteristic);
    const timer = new _GanTimer(
      ganTimerService,
      server,
      device,
      timeCharacteristic
    );
    return timer;
  }
  disconnect() {
    this.server.disconnect();
  }
  async poll() {
    if (!this.polling) {
      return;
    }
    const value = await this.getTimeCharacteristic();
    const detail = {
      currentTime: this.decodeTimeMs(value.slice(0, 4)),
      latestTimes: [
        this.decodeTimeMs(value.slice(4, 8)),
        this.decodeTimeMs(value.slice(8, 12)),
        this.decodeTimeMs(value.slice(12, 16))
      ]
    };
    if (detail.currentTime === 0) {
      if (this.previousDetail && this.previousDetail.currentTime !== 0) {
        this.dispatchEvent(new CustomEvent("reset"));
      }
    }
    if (detail.currentTime !== 0 && this.previousDetail) {
      if (this.previousDetail.currentTime === 0) {
        this.dispatchEvent(new CustomEvent("start"));
      }
      if (detail.currentTime !== this.previousDetail.currentTime) {
        this.dispatchEvent(new CustomEvent("update", { detail }));
        if (detail.currentTime === detail.latestTimes[0] && detail.latestTimes[1] === this.previousDetail.latestTimes[0] && detail.latestTimes[2] === this.previousDetail.latestTimes[1]) {
          this.dispatchEvent(new CustomEvent("stop", { detail }));
        }
      }
    }
    this.previousDetail = detail;
    void this.poll();
  }
  onDisconnect() {
    this.dispatchEvent(new CustomEvent("disconnect"));
  }
  async getTimeCharacteristic() {
    return new Uint8Array((await this.timeCharacteristic.readValue()).buffer);
  }
  async getTime() {
    const value = await this.getTimeCharacteristic();
    return this.decodeTimeMs(value.slice(0, 4));
  }
  decodeTimeMs(bytes) {
    return (bytes[0] * 60 + bytes[1]) * 1e3 + bytes[2] + bytes[3] * 256;
  }
  startPolling() {
    this.polling = true;
    void this.poll();
  }
  stopPolling() {
    this.polling = false;
  }
};
var ganTimerConfig2 = {
  connect: GanTimer.connect.bind(GanTimer),
  prefixes: ["GAN"],
  filters: [{ namePrefix: "GAN" }],
  optionalServices: [UUIDs7.ganTimerService]
};

// src/cubing/bluetooth/smart-timer/index.ts
var smartTimerConfigs = [ganTimerConfig2];
async function connectSmartTimer(options) {
  return bluetoothConnect(smartTimerConfigs, options);
}
export {
  GanCube,
  GiiKERCube,
  GoCube,
  KeyboardPuzzle,
  connectSmartPuzzle,
  connectSmartRobot,
  connectSmartTimer,
  debugKeyboardConnect,
  enableDebugLogging
};
//# sourceMappingURL=index.js.map

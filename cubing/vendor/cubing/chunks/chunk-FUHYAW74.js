import {
  KPattern,
  KPuzzle
} from "./chunk-RINY3U6G.js";
import {
  Alg,
  Commutator,
  Conjugate,
  Move,
  Pause,
  QuantumMove,
  TraversalDownUp,
  functionFromTraversal
} from "./chunk-O6HEZXGY.js";

// src/cubing/vendor/mit/p-lazy/p-lazy.ts
var PLazy = class _PLazy extends Promise {
  constructor(executor) {
    super((resolve) => {
      resolve();
    });
    this._executor = executor;
  }
  static from(function_) {
    return new _PLazy((resolve) => {
      resolve(function_());
    });
  }
  static resolve(value) {
    return new _PLazy((resolve) => {
      resolve(value);
    });
  }
  static reject(error) {
    return new _PLazy((_resolve, reject) => {
      reject(error);
    });
  }
  // biome-ignore lint/suspicious/noThenProperty: This is implementing the `Promise` API.
  then(onFulfilled, onRejected) {
    this._promise = this._promise || new Promise(this._executor);
    return this._promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    this._promise = this._promise || new Promise(this._executor);
    return this._promise.catch(onRejected);
  }
};
function from(function_) {
  return new PLazy((resolve) => {
    resolve(function_());
  });
}

// src/cubing/puzzles/stickerings/mask.ts
function getFaceletStickeringMask(stickeringMask, orbitName, pieceIdx, faceletIdx, hint) {
  const orbitStickeringMask = stickeringMask.orbits[orbitName];
  const pieceStickeringMask = orbitStickeringMask.pieces[pieceIdx];
  if (pieceStickeringMask === null) {
    return regular;
  }
  const faceletStickeringMask = pieceStickeringMask.facelets?.[faceletIdx];
  if (faceletStickeringMask === null) {
    return regular;
  }
  if (typeof faceletStickeringMask === "string") {
    return faceletStickeringMask;
  }
  if (hint) {
    return faceletStickeringMask.hintMask ?? faceletStickeringMask.mask;
  }
  console.log(faceletStickeringMask);
  return faceletStickeringMask.mask;
}
var PieceAnnotation = class {
  stickerings = /* @__PURE__ */ new Map();
  constructor(kpuzzle, defaultValue) {
    for (const orbitDefinition of kpuzzle.definition.orbits) {
      this.stickerings.set(
        orbitDefinition.orbitName,
        new Array(orbitDefinition.numPieces).fill(defaultValue)
      );
    }
  }
};
var regular = "regular";
var ignored = "ignored";
var oriented = "oriented";
var experimentalOriented2 = "experimentalOriented2";
var invisible = "invisible";
var dim = "dim";
var mystery = "mystery";
var pieceStickerings = {
  // regular
  ["Regular" /* Regular */]: {
    // r
    facelets: [regular, regular, regular, regular, regular]
  },
  // ignored
  ["Ignored" /* Ignored */]: {
    // i
    facelets: [ignored, ignored, ignored, ignored, ignored]
  },
  // oriented stickers
  ["OrientationStickers" /* OrientationStickers */]: {
    // o
    facelets: [oriented, oriented, oriented, oriented, oriented]
  },
  // "OLL"
  ["IgnoreNonPrimary" /* IgnoreNonPrimary */]: {
    // riiii
    facelets: [regular, ignored, ignored, ignored, ignored]
  },
  // invisible
  ["Invisible" /* Invisible */]: {
    // invisiblePiece
    facelets: [invisible, invisible, invisible, invisible, invisible]
  },
  // "PLL"
  ["PermuteNonPrimary" /* PermuteNonPrimary */]: {
    // drrrr
    facelets: [dim, regular, regular, regular, regular]
  },
  // ignored
  ["Dim" /* Dim */]: {
    // d
    facelets: [dim, dim, dim, dim, dim]
  },
  // "OLL"
  ["Ignoriented" /* Ignoriented */]: {
    // diiii
    facelets: [dim, ignored, ignored, ignored, ignored]
  },
  ["OrientationWithoutPermutation" /* OrientationWithoutPermutation */]: {
    // oiiii
    facelets: [oriented, ignored, ignored, ignored, ignored]
  },
  ["ExperimentalOrientationWithoutPermutation2" /* ExperimentalOrientationWithoutPermutation2 */]: {
    // oiiii
    facelets: [experimentalOriented2, ignored, ignored, ignored, ignored]
  },
  ["Mystery" /* Mystery */]: {
    // oiiii
    facelets: [mystery, mystery, mystery, mystery, mystery]
  }
};
function getPieceStickeringMask(pieceStickering) {
  return pieceStickerings[pieceStickering];
}
var PuzzleStickering = class extends PieceAnnotation {
  constructor(kpuzzle) {
    super(kpuzzle, "Regular" /* Regular */);
  }
  set(pieceSet, pieceStickering) {
    for (const [orbitName, pieces] of this.stickerings.entries()) {
      for (let i = 0; i < pieces.length; i++) {
        if (pieceSet.stickerings.get(orbitName)[i]) {
          pieces[i] = pieceStickering;
        }
      }
    }
    return this;
  }
  toStickeringMask() {
    const stickeringMask = { orbits: {} };
    for (const [orbitName, pieceStickerings2] of this.stickerings.entries()) {
      const pieces = [];
      const orbitStickeringMask = {
        pieces
      };
      stickeringMask.orbits[orbitName] = orbitStickeringMask;
      for (const pieceStickering of pieceStickerings2) {
        pieces.push(getPieceStickeringMask(pieceStickering));
      }
    }
    return stickeringMask;
  }
};
var StickeringManager = class {
  constructor(kpuzzle) {
    this.kpuzzle = kpuzzle;
  }
  and(pieceSets) {
    const newPieceSet = new PieceAnnotation(this.kpuzzle, false);
    for (const orbitDefinition of this.kpuzzle.definition.orbits) {
      pieceLoop: for (let i = 0; i < orbitDefinition.numPieces; i++) {
        newPieceSet.stickerings.get(orbitDefinition.orbitName)[i] = true;
        for (const pieceSet of pieceSets) {
          if (!pieceSet.stickerings.get(orbitDefinition.orbitName)[i]) {
            newPieceSet.stickerings.get(orbitDefinition.orbitName)[i] = false;
            continue pieceLoop;
          }
        }
      }
    }
    return newPieceSet;
  }
  or(pieceSets) {
    const newPieceSet = new PieceAnnotation(this.kpuzzle, false);
    for (const orbitDefinition of this.kpuzzle.definition.orbits) {
      pieceLoop: for (let i = 0; i < orbitDefinition.numPieces; i++) {
        newPieceSet.stickerings.get(orbitDefinition.orbitName)[i] = false;
        for (const pieceSet of pieceSets) {
          if (pieceSet.stickerings.get(orbitDefinition.orbitName)[i]) {
            newPieceSet.stickerings.get(orbitDefinition.orbitName)[i] = true;
            continue pieceLoop;
          }
        }
      }
    }
    return newPieceSet;
  }
  not(pieceSet) {
    const newPieceSet = new PieceAnnotation(this.kpuzzle, false);
    for (const orbitDefinition of this.kpuzzle.definition.orbits) {
      for (let i = 0; i < orbitDefinition.numPieces; i++) {
        newPieceSet.stickerings.get(orbitDefinition.orbitName)[i] = !pieceSet.stickerings.get(orbitDefinition.orbitName)[i];
      }
    }
    return newPieceSet;
  }
  all() {
    return this.and(this.moves([]));
  }
  move(moveSource) {
    const transformation = this.kpuzzle.moveToTransformation(moveSource);
    const newPieceSet = new PieceAnnotation(this.kpuzzle, false);
    for (const orbitDefinition of this.kpuzzle.definition.orbits) {
      for (let i = 0; i < orbitDefinition.numPieces; i++) {
        if (transformation.transformationData[orbitDefinition.orbitName].permutation[i] !== i || transformation.transformationData[orbitDefinition.orbitName].orientationDelta[i] !== 0) {
          newPieceSet.stickerings.get(orbitDefinition.orbitName)[i] = true;
        }
      }
    }
    return newPieceSet;
  }
  moves(moveSources) {
    return moveSources.map((moveSource) => this.move(moveSource));
  }
  orbits(orbitNames) {
    const pieceSet = new PieceAnnotation(this.kpuzzle, false);
    for (const orbitName of orbitNames) {
      pieceSet.stickerings.get(orbitName).fill(true);
    }
    return pieceSet;
  }
  orbitPrefix(orbitPrefix) {
    const pieceSet = new PieceAnnotation(this.kpuzzle, false);
    for (const orbitDefinition of this.kpuzzle.definition.orbits) {
      if (orbitDefinition.orbitName.startsWith(orbitPrefix)) {
        pieceSet.stickerings.get(orbitDefinition.orbitName).fill(true);
      }
    }
    return pieceSet;
  }
  // trueCounts(pieceSet: PieceSet): Record<string, number> {
  //   const counts: Record<string, number> = {};
  //   for (const orbitDefinition of this.def.orbits) {
  //     let count = 0;
  //     for (let i = 0; i < orbitDefinition.numPieces; i++) {
  //       if (pieceSet.stickerings.get(orbitDefinition.orbitName)![i]) {
  //         count++;
  //       }
  //     }
  //     counts[orbitName] = count;
  //   }
  //   return counts;
  // }
};

// src/cubing/puzzles/stickerings/puzzle-stickerings.ts
var LL = "Last Layer";
var LS = "Last Slot";
var megaAnd3x3x3LL = {
  "3x3x3": LL,
  megaminx: LL
};
var megaAnd3x3x3LS = {
  "3x3x3": LS,
  megaminx: LS
};
var experimentalStickerings = {
  full: { groups: { "3x3x3": "Stickering", megaminx: "Stickering" } },
  // default
  OLL: { groups: megaAnd3x3x3LL },
  PLL: { groups: megaAnd3x3x3LL },
  LL: { groups: megaAnd3x3x3LL },
  EOLL: { groups: megaAnd3x3x3LL },
  COLL: { groups: megaAnd3x3x3LL },
  OCLL: { groups: megaAnd3x3x3LL },
  CPLL: { groups: megaAnd3x3x3LL },
  CLL: { groups: megaAnd3x3x3LL },
  EPLL: { groups: megaAnd3x3x3LL },
  ELL: { groups: megaAnd3x3x3LL },
  ZBLL: { groups: megaAnd3x3x3LL },
  LS: { groups: megaAnd3x3x3LS },
  LSOLL: { groups: megaAnd3x3x3LS },
  LSOCLL: { groups: megaAnd3x3x3LS },
  ELS: { groups: megaAnd3x3x3LS },
  CLS: { groups: megaAnd3x3x3LS },
  ZBLS: { groups: megaAnd3x3x3LS },
  VLS: { groups: megaAnd3x3x3LS },
  WVLS: { groups: megaAnd3x3x3LS },
  F2L: { groups: { "3x3x3": "CFOP (Fridrich)" } },
  Daisy: { groups: { "3x3x3": "CFOP (Fridrich)" } },
  Cross: { groups: { "3x3x3": "CFOP (Fridrich)" } },
  EO: { groups: { "3x3x3": "ZZ" } },
  EOline: { groups: { "3x3x3": "ZZ" } },
  EOcross: { groups: { "3x3x3": "ZZ" } },
  FirstBlock: { groups: { "3x3x3": "Roux" } },
  SecondBlock: { groups: { "3x3x3": "Roux" } },
  CMLL: { groups: { "3x3x3": "Roux" } },
  L10P: { groups: { "3x3x3": "Roux" } },
  L6E: { groups: { "3x3x3": "Roux" } },
  L6EO: { groups: { "3x3x3": "Roux" } },
  "2x2x2": { groups: { "3x3x3": "Petrus" } },
  "2x2x3": { groups: { "3x3x3": "Petrus" } },
  EODF: { groups: { "3x3x3": "Nautilus" } },
  G1: { groups: { "3x3x3": "FMC" } },
  L2C: {
    groups: {
      "4x4x4": "Reduction",
      "5x5x5": "Reduction",
      "6x6x6": "Reduction"
    }
  },
  OBL: { groups: { "2x2x2": "General" } },
  PBL: {
    groups: {
      "2x2x2": "Ortega"
    }
  },
  "Void Cube": { groups: { "3x3x3": "Miscellaneous" } },
  invisible: { groups: { "3x3x3": "Miscellaneous" } },
  picture: { groups: { "3x3x3": "Miscellaneous" } },
  "centers-only": { groups: { "3x3x3": "Miscellaneous" } },
  // TODO
  "opposite-centers": { groups: { "4x4x4": "Reduction" } },
  // TODO
  "experimental-centers-U": {},
  "experimental-centers-U-D": {},
  "experimental-centers-U-L-D": {},
  "experimental-centers-U-L-B-D": {},
  "experimental-centers": {},
  "experimental-fto-fc": { groups: { fto: "Bencisco" } },
  "experimental-fto-f2t": { groups: { fto: "Bencisco" } },
  "experimental-fto-sc": { groups: { fto: "Bencisco" } },
  "experimental-fto-l2c": { groups: { fto: "Bencisco" } },
  "experimental-fto-lbt": { groups: { fto: "Bencisco" } },
  "experimental-fto-l3t": { groups: { fto: "Bencisco" } }
};

// src/cubing/puzzles/stickerings/cube-like-stickerings.ts
async function cubeLikeStickeringMask(puzzleLoader, stickering) {
  return (await cubeLikePuzzleStickering(puzzleLoader, stickering)).toStickeringMask();
}
async function cubeLikePuzzleStickering(puzzleLoader, stickering) {
  const kpuzzle = await puzzleLoader.kpuzzle();
  const puzzleStickering = new PuzzleStickering(kpuzzle);
  const m = new StickeringManager(kpuzzle);
  const LL2 = () => m.move("U");
  const orUD = () => m.or(m.moves(["U", "D"]));
  const orLR = () => m.or(m.moves(["L", "R"]));
  const M = () => m.not(orLR());
  const F2L = () => m.not(LL2());
  const CENTERS = () => m.orbitPrefix("CENTER");
  const CENTER = (faceMove) => m.and([m.move(faceMove), CENTERS()]);
  const EDGES = () => m.orbitPrefix("EDGE");
  const EDGE = (faceMoves) => m.and([m.and(m.moves(faceMoves)), EDGES()]);
  const CORNERS = () => m.or([
    m.orbitPrefix("CORNER"),
    m.orbitPrefix("C4RNER"),
    m.orbitPrefix("C5RNER")
  ]);
  const L6E = () => m.or([M(), m.and([LL2(), EDGES()])]);
  const centerLL = () => m.and([LL2(), CENTERS()]);
  const edgeFR = () => m.and([m.and(m.moves(["F", "R"])), EDGES()]);
  const cornerDFR = () => m.and([m.and(m.moves(["F", "R"])), CORNERS(), m.not(LL2())]);
  const slotFR = () => m.or([cornerDFR(), edgeFR()]);
  function dimF2L() {
    puzzleStickering.set(F2L(), "Dim" /* Dim */);
  }
  function setPLL() {
    puzzleStickering.set(LL2(), "PermuteNonPrimary" /* PermuteNonPrimary */);
    puzzleStickering.set(centerLL(), "Dim" /* Dim */);
  }
  function setOLL() {
    puzzleStickering.set(LL2(), "IgnoreNonPrimary" /* IgnoreNonPrimary */);
    puzzleStickering.set(centerLL(), "Regular" /* Regular */);
  }
  function dimOLL() {
    puzzleStickering.set(LL2(), "Ignoriented" /* Ignoriented */);
    puzzleStickering.set(centerLL(), "Dim" /* Dim */);
  }
  switch (stickering) {
    case "full":
      break;
    case "PLL": {
      dimF2L();
      setPLL();
      break;
    }
    case "CLS": {
      dimF2L();
      puzzleStickering.set(cornerDFR(), "Regular" /* Regular */);
      puzzleStickering.set(LL2(), "Ignoriented" /* Ignoriented */);
      puzzleStickering.set(m.and([LL2(), CENTERS()]), "Dim" /* Dim */);
      puzzleStickering.set(
        m.and([LL2(), CORNERS()]),
        "IgnoreNonPrimary" /* IgnoreNonPrimary */
      );
      break;
    }
    case "OLL": {
      dimF2L();
      setOLL();
      break;
    }
    case "EOLL": {
      dimF2L();
      setOLL();
      puzzleStickering.set(m.and([LL2(), CORNERS()]), "Ignored" /* Ignored */);
      break;
    }
    case "COLL": {
      dimF2L();
      puzzleStickering.set(m.and([LL2(), EDGES()]), "Ignoriented" /* Ignoriented */);
      puzzleStickering.set(m.and([LL2(), CENTERS()]), "Dim" /* Dim */);
      puzzleStickering.set(m.and([LL2(), CORNERS()]), "Regular" /* Regular */);
      break;
    }
    case "OCLL": {
      dimF2L();
      dimOLL();
      puzzleStickering.set(
        m.and([LL2(), CORNERS()]),
        "IgnoreNonPrimary" /* IgnoreNonPrimary */
      );
      break;
    }
    case "CPLL": {
      dimF2L();
      puzzleStickering.set(
        m.and([CORNERS(), LL2()]),
        "PermuteNonPrimary" /* PermuteNonPrimary */
      );
      puzzleStickering.set(
        m.and([m.not(CORNERS()), LL2()]),
        "Dim" /* Dim */
      );
      break;
    }
    case "CLL": {
      dimF2L();
      puzzleStickering.set(
        m.not(m.and([CORNERS(), LL2()])),
        "Dim" /* Dim */
      );
      break;
    }
    case "EPLL": {
      dimF2L();
      puzzleStickering.set(LL2(), "Dim" /* Dim */);
      puzzleStickering.set(
        m.and([LL2(), EDGES()]),
        "PermuteNonPrimary" /* PermuteNonPrimary */
      );
      break;
    }
    case "ELL": {
      dimF2L();
      puzzleStickering.set(LL2(), "Dim" /* Dim */);
      puzzleStickering.set(m.and([LL2(), EDGES()]), "Regular" /* Regular */);
      break;
    }
    case "ELS": {
      dimF2L();
      setOLL();
      puzzleStickering.set(m.and([LL2(), CORNERS()]), "Ignored" /* Ignored */);
      puzzleStickering.set(edgeFR(), "Regular" /* Regular */);
      puzzleStickering.set(cornerDFR(), "Ignored" /* Ignored */);
      break;
    }
    case "LL": {
      dimF2L();
      break;
    }
    case "F2L": {
      puzzleStickering.set(LL2(), "Ignored" /* Ignored */);
      break;
    }
    case "ZBLL": {
      dimF2L();
      puzzleStickering.set(LL2(), "PermuteNonPrimary" /* PermuteNonPrimary */);
      puzzleStickering.set(centerLL(), "Dim" /* Dim */);
      puzzleStickering.set(m.and([LL2(), CORNERS()]), "Regular" /* Regular */);
      break;
    }
    case "ZBLS": {
      dimF2L();
      puzzleStickering.set(slotFR(), "Regular" /* Regular */);
      setOLL();
      puzzleStickering.set(m.and([LL2(), CORNERS()]), "Ignored" /* Ignored */);
      break;
    }
    case "VLS": {
      dimF2L();
      puzzleStickering.set(slotFR(), "Regular" /* Regular */);
      setOLL();
      break;
    }
    case "WVLS": {
      dimF2L();
      puzzleStickering.set(slotFR(), "Regular" /* Regular */);
      puzzleStickering.set(m.and([LL2(), EDGES()]), "Ignoriented" /* Ignoriented */);
      puzzleStickering.set(m.and([LL2(), CENTERS()]), "Dim" /* Dim */);
      puzzleStickering.set(
        m.and([LL2(), CORNERS()]),
        "IgnoreNonPrimary" /* IgnoreNonPrimary */
      );
      break;
    }
    case "LS": {
      dimF2L();
      puzzleStickering.set(slotFR(), "Regular" /* Regular */);
      puzzleStickering.set(LL2(), "Ignored" /* Ignored */);
      puzzleStickering.set(centerLL(), "Dim" /* Dim */);
      break;
    }
    case "LSOLL": {
      dimF2L();
      setOLL();
      puzzleStickering.set(slotFR(), "Regular" /* Regular */);
      break;
    }
    case "LSOCLL": {
      dimF2L();
      dimOLL();
      puzzleStickering.set(
        m.and([LL2(), CORNERS()]),
        "IgnoreNonPrimary" /* IgnoreNonPrimary */
      );
      puzzleStickering.set(slotFR(), "Regular" /* Regular */);
      break;
    }
    case "EO": {
      puzzleStickering.set(CORNERS(), "Ignored" /* Ignored */);
      puzzleStickering.set(
        EDGES(),
        "OrientationWithoutPermutation" /* OrientationWithoutPermutation */
      );
      break;
    }
    case "EOline": {
      puzzleStickering.set(CORNERS(), "Ignored" /* Ignored */);
      puzzleStickering.set(
        EDGES(),
        "OrientationWithoutPermutation" /* OrientationWithoutPermutation */
      );
      puzzleStickering.set(m.and(m.moves(["D", "M"])), "Regular" /* Regular */);
      break;
    }
    case "EOcross": {
      puzzleStickering.set(
        EDGES(),
        "OrientationWithoutPermutation" /* OrientationWithoutPermutation */
      );
      puzzleStickering.set(m.move("D"), "Regular" /* Regular */);
      puzzleStickering.set(CORNERS(), "Ignored" /* Ignored */);
      break;
    }
    case "CMLL": {
      puzzleStickering.set(F2L(), "Dim" /* Dim */);
      puzzleStickering.set(L6E(), "Ignored" /* Ignored */);
      puzzleStickering.set(m.and([LL2(), CORNERS()]), "Regular" /* Regular */);
      break;
    }
    case "L10P": {
      puzzleStickering.set(m.not(L6E()), "Dim" /* Dim */);
      puzzleStickering.set(m.and([CORNERS(), LL2()]), "Regular" /* Regular */);
      break;
    }
    case "L6E": {
      puzzleStickering.set(m.not(L6E()), "Dim" /* Dim */);
      break;
    }
    case "L6EO": {
      puzzleStickering.set(m.not(L6E()), "Dim" /* Dim */);
      puzzleStickering.set(
        L6E(),
        "ExperimentalOrientationWithoutPermutation2" /* ExperimentalOrientationWithoutPermutation2 */
      );
      puzzleStickering.set(
        m.and([CENTERS(), orUD()]),
        "ExperimentalOrientationWithoutPermutation2" /* ExperimentalOrientationWithoutPermutation2 */
      );
      puzzleStickering.set(
        m.and([m.move("M"), m.move("E")]),
        "Ignored" /* Ignored */
      );
      break;
    }
    case "Daisy": {
      puzzleStickering.set(m.all(), "Ignored" /* Ignored */);
      puzzleStickering.set(CENTERS(), "Dim" /* Dim */);
      puzzleStickering.set(
        m.and([m.move("D"), CENTERS()]),
        "Regular" /* Regular */
      );
      puzzleStickering.set(
        m.and([m.move("U"), EDGES()]),
        "IgnoreNonPrimary" /* IgnoreNonPrimary */
      );
      break;
    }
    case "Cross": {
      puzzleStickering.set(m.all(), "Ignored" /* Ignored */);
      puzzleStickering.set(CENTERS(), "Dim" /* Dim */);
      puzzleStickering.set(
        m.and([m.move("D"), CENTERS()]),
        "Regular" /* Regular */
      );
      puzzleStickering.set(
        m.and([m.move("D"), EDGES()]),
        "Regular" /* Regular */
      );
      break;
    }
    case "2x2x2": {
      puzzleStickering.set(
        m.or(m.moves(["U", "F", "R"])),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(
        m.and([m.or(m.moves(["U", "F", "R"])), CENTERS()]),
        "Dim" /* Dim */
      );
      break;
    }
    case "2x2x3": {
      puzzleStickering.set(m.all(), "Dim" /* Dim */);
      puzzleStickering.set(
        m.or(m.moves(["U", "F", "R"])),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(
        m.and([m.or(m.moves(["U", "F", "R"])), CENTERS()]),
        "Dim" /* Dim */
      );
      puzzleStickering.set(
        m.and([m.move("F"), m.not(m.or(m.moves(["U", "R"])))]),
        "Regular" /* Regular */
      );
      break;
    }
    case "G1": {
      puzzleStickering.set(
        m.all(),
        "ExperimentalOrientationWithoutPermutation2" /* ExperimentalOrientationWithoutPermutation2 */
      );
      puzzleStickering.set(
        m.or(m.moves(["E"])),
        "OrientationWithoutPermutation" /* OrientationWithoutPermutation */
      );
      puzzleStickering.set(m.and(m.moves(["E", "S"])), "Ignored" /* Ignored */);
      break;
    }
    case "L2C": {
      puzzleStickering.set(
        m.or(m.moves(["L", "R", "B", "D"])),
        "Dim" /* Dim */
      );
      puzzleStickering.set(m.not(CENTERS()), "Ignored" /* Ignored */);
      break;
    }
    case "PBL": {
      puzzleStickering.set(m.all(), "Ignored" /* Ignored */);
      puzzleStickering.set(
        m.or(m.moves(["U", "D"])),
        "PermuteNonPrimary" /* PermuteNonPrimary */
      );
      break;
    }
    case "FirstBlock": {
      puzzleStickering.set(
        m.not(m.and([m.and(m.moves(["L"])), m.not(LL2())])),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(CENTER("R"), "Dim" /* Dim */);
      break;
    }
    case "SecondBlock": {
      puzzleStickering.set(
        m.not(m.and([m.and(m.moves(["L"])), m.not(LL2())])),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(
        m.and([m.and(m.moves(["L"])), m.not(LL2())]),
        "Dim" /* Dim */
      );
      puzzleStickering.set(
        m.and([m.and(m.moves(["R"])), m.not(LL2())]),
        "Regular" /* Regular */
      );
      break;
    }
    case "EODF": {
      dimF2L();
      puzzleStickering.set(
        m.or([cornerDFR(), m.and([LL2(), CORNERS()])]),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(
        m.or([m.and([LL2(), EDGES()]), edgeFR()]),
        "OrientationWithoutPermutation" /* OrientationWithoutPermutation */
      );
      puzzleStickering.set(EDGE(["D", "F"]), "Regular" /* Regular */);
      puzzleStickering.set(CENTER("F"), "Regular" /* Regular */);
      break;
    }
    case "Void Cube": {
      puzzleStickering.set(CENTERS(), "Invisible" /* Invisible */);
      break;
    }
    case "picture":
    // fallthrough
    case "invisible": {
      puzzleStickering.set(m.all(), "Invisible" /* Invisible */);
      break;
    }
    case "centers-only": {
      puzzleStickering.set(m.not(CENTERS()), "Ignored" /* Ignored */);
      break;
    }
    case "opposite-centers": {
      puzzleStickering.set(
        m.not(m.and([CENTERS(), m.or(m.moves(["U", "D"]))])),
        "Ignored" /* Ignored */
      );
      break;
    }
    case "OBL": {
      puzzleStickering.set(
        m.or(m.moves(["U", "D"])),
        "IgnoreNonPrimary" /* IgnoreNonPrimary */
      );
      break;
    }
    default:
      console.warn(
        `Unsupported stickering for ${puzzleLoader.id}: ${stickering}. Setting all pieces to dim.`
      );
      puzzleStickering.set(m.and(m.moves([])), "Dim" /* Dim */);
  }
  return puzzleStickering;
}
async function cubeLikeStickeringList(puzzleID, options) {
  const stickerings = [];
  const stickeringsFallback = [];
  for (const [name, info] of Object.entries(experimentalStickerings)) {
    if (info.groups) {
      if (puzzleID in info.groups) {
        stickerings.push(name);
      } else if (options?.use3x3x3Fallbacks && "3x3x3" in info.groups) {
        stickeringsFallback.push(name);
      }
    }
  }
  return stickerings.concat(stickeringsFallback);
}

// src/cubing/puzzles/async/lazy-cached.ts
function getCached(getValue) {
  let cachedPromise = null;
  return () => {
    return cachedPromise ??= getValue();
  };
}

// src/cubing/puzzles/async/async-pg3d.ts
async function asyncGetPuzzleGeometry(puzzleName) {
  const puzzleGeometry = await import("../puzzle-geometry/index.js");
  return puzzleGeometry.getPuzzleGeometryByName(puzzleName, {
    allMoves: true,
    orientCenters: true,
    addRotations: true
  });
}
async function asyncGetBasePuzzleGeometry(puzzleName) {
  const puzzleGeometry = await import("../puzzle-geometry/index.js");
  return puzzleGeometry.getPuzzleGeometryByName(puzzleName);
}
async function asyncGetKPuzzle(pgPromise, puzzleName, setOrientationModTo1ForPiecesOfOrbits) {
  const pg = await pgPromise;
  const kpuzzleDefinition = pg.getKPuzzleDefinition(true);
  kpuzzleDefinition.name = puzzleName;
  const puzzleGeometry = await import("../puzzle-geometry/index.js");
  const pgNotation = new puzzleGeometry.ExperimentalPGNotation(
    pg,
    pg.getOrbitsDef(true)
  );
  if (setOrientationModTo1ForPiecesOfOrbits) {
    const setOrientationModTo1ForPiecesOfOrbitsSet = new Set(
      setOrientationModTo1ForPiecesOfOrbits
    );
    for (const [orbitName, orbitData] of Object.entries(
      kpuzzleDefinition.defaultPattern
    )) {
      if (setOrientationModTo1ForPiecesOfOrbitsSet.has(orbitName)) {
        orbitData.orientationMod = new Array(
          orbitData.pieces.length
          // TODO: get this from the orbit definition, especially once we allow empty entries.
        ).fill(1);
      }
    }
  }
  return new KPuzzle(pgNotation.remapKPuzzleDefinition(kpuzzleDefinition), {
    experimentalPGNotation: pgNotation
  });
}
var PGPuzzleLoader = class {
  pgId;
  id;
  fullName;
  inventedBy;
  inventionYear;
  #setOrientationModTo1ForPiecesOfOrbits;
  //  // TODO: make this unhacky
  constructor(info) {
    this.pgId = info.pgID;
    this.id = info.id;
    this.fullName = info.fullName;
    this.inventedBy = info.inventedBy;
    this.inventionYear = info.inventionYear;
    this.#setOrientationModTo1ForPiecesOfOrbits = info.setOrientationModTo1ForPiecesOfOrbits;
  }
  #cachedPG;
  pg() {
    return this.#cachedPG ??= asyncGetPuzzleGeometry(this.pgId ?? this.id);
  }
  #cachedBasePG;
  basePG() {
    return this.#cachedBasePG ??= asyncGetBasePuzzleGeometry(
      this.pgId ?? this.id
    );
  }
  #cachedKPuzzle;
  kpuzzle() {
    return this.#cachedKPuzzle ??= asyncGetKPuzzle(
      this.pg(),
      this.id,
      this.#setOrientationModTo1ForPiecesOfOrbits
    );
  }
  #cachedSVG;
  svg() {
    return this.#cachedSVG ??= (async () => (await this.pg()).generatesvg())();
  }
  puzzleSpecificSimplifyOptionsPromise = puzzleSpecificSimplifyOptionsPromise(
    this.kpuzzle.bind(this)
  );
};
var CubePGPuzzleLoader = class extends PGPuzzleLoader {
  stickeringMask(stickering) {
    return cubeLikeStickeringMask(this, stickering);
  }
  stickerings = () => cubeLikeStickeringList(this.id, { use3x3x3Fallbacks: true });
  algTransformData = cubeMirrorTransforms;
};
function puzzleSpecificSimplifyOptionsPromise(kpuzzlePromiseFn) {
  return new PLazy(
    async (resolve) => {
      const kpuzzle = await kpuzzlePromiseFn();
      resolve({
        quantumMoveOrder: (m) => {
          return kpuzzle.moveToTransformation(new Move(m)).repetitionOrder();
        }
      });
    }
  );
}

// src/cubing/puzzles/implementations/dynamic/3x3x3/3x3x3.kpuzzle.json.ts
var cube3x3x3KPuzzleDefinition = {
  name: "3x3x3",
  orbits: [
    { orbitName: "EDGES", numPieces: 12, numOrientations: 2 },
    { orbitName: "CORNERS", numPieces: 8, numOrientations: 3 },
    { orbitName: "CENTERS", numPieces: 6, numOrientations: 4 }
  ],
  defaultPattern: {
    EDGES: {
      pieces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      orientation: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    CORNERS: {
      pieces: [0, 1, 2, 3, 4, 5, 6, 7],
      orientation: [0, 0, 0, 0, 0, 0, 0, 0]
    },
    CENTERS: {
      pieces: [0, 1, 2, 3, 4, 5],
      orientation: [0, 0, 0, 0, 0, 0],
      orientationMod: [1, 1, 1, 1, 1, 1]
    }
  },
  moves: {
    U: {
      EDGES: {
        permutation: [1, 2, 3, 0, 4, 5, 6, 7, 8, 9, 10, 11],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      CORNERS: {
        permutation: [1, 2, 3, 0, 4, 5, 6, 7],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      CENTERS: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientationDelta: [1, 0, 0, 0, 0, 0]
      }
    },
    y: {
      EDGES: {
        permutation: [1, 2, 3, 0, 5, 6, 7, 4, 10, 8, 11, 9],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
      },
      CORNERS: {
        permutation: [1, 2, 3, 0, 7, 4, 5, 6],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      CENTERS: {
        permutation: [0, 2, 3, 4, 1, 5],
        orientationDelta: [1, 0, 0, 0, 0, 3]
      }
    },
    x: {
      EDGES: {
        permutation: [4, 8, 0, 9, 6, 10, 2, 11, 5, 7, 1, 3],
        orientationDelta: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0]
      },
      CORNERS: {
        permutation: [4, 0, 3, 5, 7, 6, 2, 1],
        orientationDelta: [2, 1, 2, 1, 1, 2, 1, 2]
      },
      CENTERS: {
        permutation: [2, 1, 5, 3, 0, 4],
        orientationDelta: [0, 3, 0, 1, 2, 2]
      }
    },
    L: {
      EDGES: {
        permutation: [0, 1, 2, 11, 4, 5, 6, 9, 8, 3, 10, 7],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      CORNERS: {
        permutation: [0, 1, 6, 2, 4, 3, 5, 7],
        orientationDelta: [0, 0, 2, 1, 0, 2, 1, 0]
      },
      CENTERS: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientationDelta: [0, 1, 0, 0, 0, 0]
      }
    },
    F: {
      EDGES: {
        permutation: [9, 1, 2, 3, 8, 5, 6, 7, 0, 4, 10, 11],
        orientationDelta: [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0]
      },
      CORNERS: {
        permutation: [3, 1, 2, 5, 0, 4, 6, 7],
        orientationDelta: [1, 0, 0, 2, 2, 1, 0, 0]
      },
      CENTERS: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientationDelta: [0, 0, 1, 0, 0, 0]
      }
    },
    R: {
      EDGES: {
        permutation: [0, 8, 2, 3, 4, 10, 6, 7, 5, 9, 1, 11],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      CORNERS: {
        permutation: [4, 0, 2, 3, 7, 5, 6, 1],
        orientationDelta: [2, 1, 0, 0, 1, 0, 0, 2]
      },
      CENTERS: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientationDelta: [0, 0, 0, 1, 0, 0]
      }
    },
    B: {
      EDGES: {
        permutation: [0, 1, 10, 3, 4, 5, 11, 7, 8, 9, 6, 2],
        orientationDelta: [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1]
      },
      CORNERS: {
        permutation: [0, 7, 1, 3, 4, 5, 2, 6],
        orientationDelta: [0, 2, 1, 0, 0, 0, 2, 1]
      },
      CENTERS: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientationDelta: [0, 0, 0, 0, 1, 0]
      }
    },
    D: {
      EDGES: {
        permutation: [0, 1, 2, 3, 7, 4, 5, 6, 8, 9, 10, 11],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      },
      CORNERS: {
        permutation: [0, 1, 2, 3, 5, 6, 7, 4],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      CENTERS: {
        permutation: [0, 1, 2, 3, 4, 5],
        orientationDelta: [0, 0, 0, 0, 0, 1]
      }
    },
    z: {
      EDGES: {
        permutation: [9, 3, 11, 7, 8, 1, 10, 5, 0, 4, 2, 6],
        orientationDelta: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
      },
      CORNERS: {
        permutation: [3, 2, 6, 5, 0, 4, 7, 1],
        orientationDelta: [1, 2, 1, 2, 2, 1, 2, 1]
      },
      CENTERS: {
        permutation: [1, 5, 2, 0, 4, 3],
        orientationDelta: [1, 1, 1, 1, 3, 1]
      }
    },
    M: {
      EDGES: {
        permutation: [2, 1, 6, 3, 0, 5, 4, 7, 8, 9, 10, 11],
        orientationDelta: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0]
      },
      CORNERS: {
        permutation: [0, 1, 2, 3, 4, 5, 6, 7],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      CENTERS: {
        permutation: [4, 1, 0, 3, 5, 2],
        orientationDelta: [2, 0, 0, 0, 2, 0]
      }
    },
    E: {
      EDGES: {
        permutation: [0, 1, 2, 3, 4, 5, 6, 7, 9, 11, 8, 10],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
      },
      CORNERS: {
        permutation: [0, 1, 2, 3, 4, 5, 6, 7],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      CENTERS: {
        permutation: [0, 4, 1, 2, 3, 5],
        orientationDelta: [0, 0, 0, 0, 0, 0]
      }
    },
    S: {
      EDGES: {
        permutation: [0, 3, 2, 7, 4, 1, 6, 5, 8, 9, 10, 11],
        orientationDelta: [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0]
      },
      CORNERS: {
        permutation: [0, 1, 2, 3, 4, 5, 6, 7],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      CENTERS: {
        permutation: [1, 5, 2, 0, 4, 3],
        orientationDelta: [1, 1, 0, 1, 0, 1]
      }
    },
    u: {
      EDGES: {
        permutation: [1, 2, 3, 0, 4, 5, 6, 7, 10, 8, 11, 9],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
      },
      CORNERS: {
        permutation: [1, 2, 3, 0, 4, 5, 6, 7],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      CENTERS: {
        permutation: [0, 2, 3, 4, 1, 5],
        orientationDelta: [1, 0, 0, 0, 0, 0]
      }
    },
    l: {
      EDGES: {
        permutation: [2, 1, 6, 11, 0, 5, 4, 9, 8, 3, 10, 7],
        orientationDelta: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0]
      },
      CORNERS: {
        permutation: [0, 1, 6, 2, 4, 3, 5, 7],
        orientationDelta: [0, 0, 2, 1, 0, 2, 1, 0]
      },
      CENTERS: {
        permutation: [4, 1, 0, 3, 5, 2],
        orientationDelta: [2, 1, 0, 0, 2, 0]
      }
    },
    f: {
      EDGES: {
        permutation: [9, 3, 2, 7, 8, 1, 6, 5, 0, 4, 10, 11],
        orientationDelta: [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0]
      },
      CORNERS: {
        permutation: [3, 1, 2, 5, 0, 4, 6, 7],
        orientationDelta: [1, 0, 0, 2, 2, 1, 0, 0]
      },
      CENTERS: {
        permutation: [1, 5, 2, 0, 4, 3],
        orientationDelta: [1, 1, 1, 1, 0, 1]
      }
    },
    r: {
      EDGES: {
        permutation: [4, 8, 0, 3, 6, 10, 2, 7, 5, 9, 1, 11],
        orientationDelta: [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0]
      },
      CORNERS: {
        permutation: [4, 0, 2, 3, 7, 5, 6, 1],
        orientationDelta: [2, 1, 0, 0, 1, 0, 0, 2]
      },
      CENTERS: {
        permutation: [2, 1, 5, 3, 0, 4],
        orientationDelta: [0, 0, 0, 1, 2, 2]
      }
    },
    b: {
      EDGES: {
        permutation: [0, 5, 10, 1, 4, 7, 11, 3, 8, 9, 6, 2],
        orientationDelta: [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1]
      },
      CORNERS: {
        permutation: [0, 7, 1, 3, 4, 5, 2, 6],
        orientationDelta: [0, 2, 1, 0, 0, 0, 2, 1]
      },
      CENTERS: {
        permutation: [3, 0, 2, 5, 4, 1],
        orientationDelta: [3, 3, 0, 3, 1, 3]
      }
    },
    d: {
      EDGES: {
        permutation: [0, 1, 2, 3, 7, 4, 5, 6, 9, 11, 8, 10],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
      },
      CORNERS: {
        permutation: [0, 1, 2, 3, 5, 6, 7, 4],
        orientationDelta: [0, 0, 0, 0, 0, 0, 0, 0]
      },
      CENTERS: {
        permutation: [0, 4, 1, 2, 3, 5],
        orientationDelta: [0, 0, 0, 0, 0, 1]
      }
    }
  },
  derivedMoves: {
    Uw: "u",
    Lw: "l",
    Fw: "f",
    Rw: "r",
    Bw: "b",
    Dw: "d",
    Uv: "y",
    Lv: "x'",
    Fv: "z",
    Rv: "x",
    Bv: "z'",
    Dv: "y'",
    "2U": "u U'",
    "2L": "l L'",
    "2F": "f F'",
    "2R": "r R'",
    "2B": "b B'",
    "2D": "d D'"
  }
};

// src/cubing/puzzles/implementations/dynamic/3x3x3/puzzle-orientation.ts
function puzzleOrientation3x3x3Idx(pattern) {
  const idxU = pattern.patternData["CENTERS"].pieces[0];
  const idxD = pattern.patternData["CENTERS"].pieces[5];
  const unadjustedIdxL = pattern.patternData["CENTERS"].pieces[1];
  let idxL = unadjustedIdxL;
  if (idxU < unadjustedIdxL) {
    idxL--;
  }
  if (idxD < unadjustedIdxL) {
    idxL--;
  }
  return [idxU, idxL];
}
var puzzleOrientationCacheRaw = new Array(6).fill(0).map(() => {
  return new Array(6);
});
var puzzleOrientationCacheInitialized = false;
function puzzleOrientation3x3x3Cache() {
  if (!puzzleOrientationCacheInitialized) {
    {
      const uAlgs = ["", "z", "x", "z'", "x'", "x2"].map(
        (s) => Alg.fromString(s)
      );
      const yAlg = new Alg("y");
      for (const uAlg of uAlgs) {
        let transformation = experimental3x3x3KPuzzle.algToTransformation(uAlg);
        for (let i = 0; i < 4; i++) {
          transformation = transformation.applyAlg(yAlg);
          const [idxU, idxL] = puzzleOrientation3x3x3Idx(
            transformation.toKPattern()
          );
          puzzleOrientationCacheRaw[idxU][idxL] = transformation.invert();
        }
      }
    }
  }
  return puzzleOrientationCacheRaw;
}
function normalize3x3x3Orientation(pattern) {
  const [idxU, idxL] = puzzleOrientation3x3x3Idx(pattern);
  const orientationTransformation = puzzleOrientation3x3x3Cache()[idxU][idxL];
  return pattern.applyTransformation(orientationTransformation);
}
function experimentalIs3x3x3Solved(pattern, options) {
  if (options.ignorePuzzleOrientation) {
    pattern = normalize3x3x3Orientation(pattern);
  }
  if (options.ignoreCenterOrientation) {
    pattern = new KPattern(pattern.kpuzzle, {
      EDGES: pattern.patternData["EDGES"],
      CORNERS: pattern.patternData["CORNERS"],
      CENTERS: {
        pieces: pattern.patternData["CENTERS"].pieces,
        orientation: new Array(6).fill(0)
      }
    });
  }
  return !!pattern.experimentalToTransformation()?.isIdentityTransformation();
}

// src/cubing/puzzles/PuzzleLoader.ts
async function getPartialAppendOptionsForPuzzleSpecificSimplifyOptions(puzzleLoader) {
  const puzzleSpecificSimplifyOptions = await (puzzleLoader.puzzleSpecificSimplifyOptions ?? puzzleLoader.puzzleSpecificSimplifyOptionsPromise);
  if (!puzzleSpecificSimplifyOptions) {
    return {};
  }
  return { puzzleLoader: { puzzleSpecificSimplifyOptions } };
}

// src/cubing/puzzles/transformAlg.ts
var TransformAlg = class extends TraversalDownUp {
  traverseAlg(alg, dataDown) {
    const algNodes = [];
    for (const algNode of alg.childAlgNodes()) {
      algNodes.push(this.traverseAlgNode(algNode, dataDown));
    }
    return new Alg(algNodes);
  }
  traverseGrouping(grouping, dataDown) {
    return grouping.modified({ alg: this.traverseAlg(grouping.alg, dataDown) });
  }
  traverseMove(move, dataDown) {
    const invert = (() => {
      const { invertExceptByFamily } = dataDown;
      if (!invertExceptByFamily) {
        return false;
      }
      return !invertExceptByFamily.has(move.family);
    })();
    return move.modified({
      amount: invert ? -move.amount : move.amount,
      family: dataDown.replaceMovesByFamily[move.family] ?? move.family
    });
  }
  traverseCommutator(commutator, dataDown) {
    return new Commutator(
      this.traverseAlg(commutator.A, dataDown),
      this.traverseAlg(commutator.B, dataDown)
    );
  }
  traverseConjugate(conjugate, dataDown) {
    return new Conjugate(
      this.traverseAlg(conjugate.A, dataDown),
      this.traverseAlg(conjugate.B, dataDown)
    );
  }
  // TODO: Remove spaces between repeated pauses (in traverseSequence)
  traversePause(pause, _dataDown) {
    return pause;
  }
  traverseNewline(newLine, _dataDown) {
    return newLine;
  }
  // TODO: Enforce being followed by a newline (or the end of the alg)?
  traverseLineComment(comment, _dataDown) {
    return comment;
  }
};
var transformAlg = functionFromTraversal(TransformAlg);

// src/cubing/puzzles/customPGPuzzleLoader.ts
async function descAsyncGetPuzzleGeometry(desc, options) {
  const puzzleGeometry = await import("../puzzle-geometry/index.js");
  return puzzleGeometry.getPuzzleGeometryByDesc(desc, {
    allMoves: options?.allMoves ?? true,
    orientCenters: options?.orientCenters ?? true,
    addRotations: options?.addRotations ?? true,
    ...options
  });
}
async function asyncGetKPuzzleByDesc(desc, options) {
  const pgPromise = descAsyncGetPuzzleGeometry(desc, options);
  return asyncGetKPuzzle(pgPromise, `description: ${desc}`);
}
var nextCustomID = 1;
function customPGPuzzleLoader(desc, info) {
  const customID = nextCustomID++;
  let cachedKPuzzle = null;
  const kpuzzlePromiseFn = async () => {
    return cachedKPuzzle ??= asyncGetKPuzzleByDesc(desc);
  };
  const puzzleLoader = {
    id: `custom-${customID}`,
    fullName: info?.fullName ?? `Custom Puzzle (instance #${customID})`,
    kpuzzle: kpuzzlePromiseFn,
    svg: async () => {
      const pg = await descAsyncGetPuzzleGeometry(desc);
      return pg.generatesvg();
    },
    pg: async () => {
      return descAsyncGetPuzzleGeometry(desc);
    },
    basePG: async () => {
      return descAsyncGetPuzzleGeometry(desc, {
        allMoves: false,
        orientCenters: false,
        addRotations: false
      });
    },
    puzzleSpecificSimplifyOptionsPromise: puzzleSpecificSimplifyOptionsPromise(kpuzzlePromiseFn)
  };
  if (info?.inventedBy) {
    puzzleLoader.inventedBy = info.inventedBy;
  }
  if (info?.inventionYear) {
    puzzleLoader.inventionYear = info.inventionYear;
  }
  return puzzleLoader;
}

// src/cubing/puzzles/implementations/dynamic/2x2x2/puzzle-orientation.ts
function puzzleOrientation2x2x2Idx(pattern) {
  const inverse = pattern.experimentalToTransformation().invert();
  const inverseDFL = inverse.transformationData["CORNERS"];
  return inverseDFL.permutation[6] * 3 + inverseDFL.orientationDelta[6];
}
var puzzleOrientationCacheRaw2 = new Array(24);
var puzzleOrientationCacheInitialized2 = false;
function puzzleOrientation2x2x2Cache(kpuzzle) {
  if (!puzzleOrientationCacheInitialized2) {
    {
      const uAlgs = ["", "z", "x", "z'", "x'", "x2"].map(
        (s) => Alg.fromString(s)
      );
      const yAlg = new Alg("y");
      for (const uAlg of uAlgs) {
        let transformation = kpuzzle.algToTransformation(uAlg);
        for (let i = 0; i < 4; i++) {
          transformation = transformation.applyAlg(yAlg);
          const idx = puzzleOrientation2x2x2Idx(transformation.toKPattern());
          puzzleOrientationCacheRaw2[idx] = {
            transformation: transformation.invert(),
            alg: uAlg.concat(yAlg)
          };
        }
      }
    }
  }
  return puzzleOrientationCacheRaw2;
}
function normalize2x2x2Orientation(pattern) {
  const idx = puzzleOrientation2x2x2Idx(pattern);
  const { transformation, alg } = puzzleOrientation2x2x2Cache(pattern.kpuzzle)[idx];
  return {
    normalizedPattern: pattern.applyTransformation(transformation),
    normalizationAlg: alg.invert()
  };
}
function experimentalIs2x2x2Solved(pattern, options) {
  if (options.ignorePuzzleOrientation) {
    pattern = normalize2x2x2Orientation(pattern).normalizedPattern;
  }
  return !!pattern.experimentalToTransformation().isIdentityTransformation();
}

// src/cubing/puzzles/cubing-private/index.ts
var experimental3x3x3KPuzzle = new KPuzzle(
  cube3x3x3KPuzzleDefinition
);
cube3x3x3KPuzzleDefinition.experimentalIsPatternSolved = experimentalIs3x3x3Solved;
var bigCubePuzzleOrientation = getCached(
  () => import("./big-puzzle-orientation-ZVZQJEF5.js")
);

// src/cubing/puzzles/implementations/3x3x3/cube3x3x3KeyMapping.ts
var cube3x3x3KeyMapping = {
  KeyI: new Move("R"),
  KeyK: new Move("R'"),
  KeyW: new Move("B"),
  KeyO: new Move("B'"),
  KeyS: new Move("D"),
  KeyL: new Move("D'"),
  KeyD: new Move("L"),
  KeyE: new Move("L'"),
  KeyJ: new Move("U"),
  KeyF: new Move("U'"),
  KeyH: new Move("F"),
  KeyG: new Move("F'"),
  KeyC: new Move("l"),
  KeyR: new Move("l'"),
  KeyU: new Move("r"),
  KeyM: new Move("r'"),
  KeyX: new Move("d"),
  Comma: new Move("d'"),
  KeyT: new Move("x"),
  KeyY: new Move("x"),
  KeyV: new Move("x'"),
  KeyN: new Move("x'"),
  Semicolon: new Move("y"),
  KeyA: new Move("y'"),
  KeyP: new Move("z"),
  KeyQ: new Move("z'"),
  KeyZ: new Move("M'"),
  KeyB: new Move("M"),
  Period: new Move("M'"),
  Backquote: new Pause()
};

// src/cubing/puzzles/implementations/3x3x3/puzzle-specific-simplifications.ts
function makeSourceInfo(moveStrings, type, from2, to) {
  const output = [];
  for (const moveString of moveStrings) {
    const move = Move.fromString(moveString);
    const { family, amount: direction } = move;
    if (![-1, 1].includes(direction)) {
      throw new Error("Invalid config move");
    }
    output.push({ family, direction, type, from: from2, to });
  }
  return output;
}
var axisInfos = {
  ["x axis" /* X */]: {
    sliceDiameter: 3,
    extendsThroughEntirePuzzle: true,
    moveSourceInfos: [
      ...makeSourceInfo(["R"], 0 /* INDEXABLE_SLICE_NEAR */, 0, 3),
      ...makeSourceInfo(["L'"], 1 /* INDEXABLE_SLICE_FAR */, 0, 3),
      ...makeSourceInfo(["r", "Rw"], 2 /* INDEXABLE_WIDE_NEAR */, 0, 2),
      ...makeSourceInfo(["l'", "Lw'"], 3 /* INDEXABLE_WIDE_FAR */, 0, 2),
      ...makeSourceInfo(["M'"], 4 /* SPECIFIC_SLICE */, 1, 2),
      // TODO: remove some indices?
      ...makeSourceInfo(["x", "Uv", "Dv'"], 5 /* ROTATION */, 0, 3)
      // TODO: remove some indices?
    ]
  },
  ["y axis" /* Y */]: {
    sliceDiameter: 3,
    extendsThroughEntirePuzzle: true,
    moveSourceInfos: [
      ...makeSourceInfo(["U"], 0 /* INDEXABLE_SLICE_NEAR */, 0, 3),
      ...makeSourceInfo(["D'"], 1 /* INDEXABLE_SLICE_FAR */, 0, 3),
      ...makeSourceInfo(["u", "Uw"], 2 /* INDEXABLE_WIDE_NEAR */, 0, 2),
      ...makeSourceInfo(["d'", "Dw'"], 3 /* INDEXABLE_WIDE_FAR */, 0, 2),
      ...makeSourceInfo(["E'"], 4 /* SPECIFIC_SLICE */, 1, 2),
      // TODO: remove some indices?
      ...makeSourceInfo(["y", "Uv", "Dv'"], 5 /* ROTATION */, 0, 3)
      // TODO: remove some indices?
    ]
  },
  ["z axis" /* Z */]: {
    sliceDiameter: 3,
    extendsThroughEntirePuzzle: true,
    moveSourceInfos: [
      ...makeSourceInfo(["F"], 0 /* INDEXABLE_SLICE_NEAR */, 0, 3),
      ...makeSourceInfo(["B'"], 1 /* INDEXABLE_SLICE_FAR */, 0, 3),
      ...makeSourceInfo(["f", "Fw"], 2 /* INDEXABLE_WIDE_NEAR */, 0, 3),
      ...makeSourceInfo(["b'", "Bw'"], 3 /* INDEXABLE_WIDE_FAR */, 0, 3),
      ...makeSourceInfo(["S"], 4 /* SPECIFIC_SLICE */, 1, 2),
      // TODO: remove some indices?
      ...makeSourceInfo(["z", "Fv", "Bv'"], 5 /* ROTATION */, 0, 3)
      // TODO: remove some indices?
    ]
  }
};
var byFamily = {};
for (const [axis, info] of Object.entries(axisInfos)) {
  for (const moveSourceInfo of info.moveSourceInfos) {
    byFamily[moveSourceInfo.family] = { axis, moveSourceInfo };
  }
}
var byAxisThenType = {};
for (const axis of Object.keys(axisInfos)) {
  const entry = {};
  byAxisThenType[axis] = entry;
  for (const moveSourceInfo of axisInfos[axis].moveSourceInfos) {
    (entry[moveSourceInfo.type] ??= []).push(moveSourceInfo);
  }
}
var byAxisThenSpecificSlices = {};
for (const axis of Object.keys(axisInfos)) {
  const entry = /* @__PURE__ */ new Map();
  byAxisThenSpecificSlices[axis] = entry;
  for (const moveSourceInfo of axisInfos[axis].moveSourceInfos) {
    if (!entry.get(moveSourceInfo.from)) {
      entry.set(moveSourceInfo.from, moveSourceInfo);
    }
  }
}
function firstOfType(axis, moveSourceType) {
  const entry = byAxisThenType[axis][moveSourceType]?.[0];
  if (!entry) {
    throw new Error(
      `Could not find a reference move (axis: ${axis}, move source type: ${moveSourceType})`
    );
  }
  return entry;
}
var areQuantumMovesSameAxis = (quantumMove1, quantumMove2) => {
  return byFamily[quantumMove1.family].axis === byFamily[quantumMove2.family].axis;
};
function simplestMove(axis, from2, to, directedAmount) {
  if (from2 + 1 === to) {
    const sliceSpecificInfo = byAxisThenSpecificSlices[axis].get(from2);
    if (sliceSpecificInfo) {
      return new Move(
        new QuantumMove(sliceSpecificInfo.family),
        directedAmount * sliceSpecificInfo.direction
      );
    }
  }
  const axisInfo = axisInfos[axis];
  const { sliceDiameter } = axisInfo;
  if (from2 === 0 && to === sliceDiameter) {
    const moveSourceInfo2 = firstOfType(axis, 5 /* ROTATION */);
    return new Move(
      new QuantumMove(moveSourceInfo2.family),
      directedAmount * moveSourceInfo2.direction
    );
  }
  const far = from2 + to > sliceDiameter;
  if (far) {
    [from2, to] = [sliceDiameter - to, sliceDiameter - from2];
  }
  let outerLayer = from2 + 1;
  let innerLayer = to;
  const slice = outerLayer === innerLayer;
  if (slice) {
    innerLayer = null;
  }
  if (outerLayer === 1) {
    outerLayer = null;
  }
  if (slice && outerLayer === 1) {
    innerLayer = null;
  }
  if (!slice && innerLayer === 2) {
    innerLayer = null;
  }
  const moveSourceType = slice ? far ? 1 /* INDEXABLE_SLICE_FAR */ : 0 /* INDEXABLE_SLICE_NEAR */ : far ? 3 /* INDEXABLE_WIDE_FAR */ : 2 /* INDEXABLE_WIDE_NEAR */;
  const moveSourceInfo = firstOfType(axis, moveSourceType);
  return new Move(
    new QuantumMove(moveSourceInfo.family, innerLayer, outerLayer),
    directedAmount * moveSourceInfo.direction
  );
}
function simplifySameAxisMoves(moves, quantumMod = true) {
  if (moves.length === 0) {
    return [];
  }
  const axis = byFamily[moves[0].family].axis;
  const axisInfo = axisInfos[axis];
  const { sliceDiameter } = axisInfo;
  const sliceDeltas = /* @__PURE__ */ new Map();
  let lastCandidateRange = null;
  function adjustValue(idx, relativeDelta) {
    let newDelta = (sliceDeltas.get(idx) ?? 0) + relativeDelta;
    if (quantumMod) {
      newDelta = newDelta % 4 + 5 % 4 - 1;
    }
    if (newDelta === 0) {
      sliceDeltas.delete(idx);
    } else {
      sliceDeltas.set(idx, newDelta);
    }
  }
  let suffixLength = 0;
  for (const move of Array.from(moves).reverse()) {
    suffixLength++;
    const { moveSourceInfo } = byFamily[move.family];
    const directedAmount2 = move.amount * moveSourceInfo.direction;
    switch (moveSourceInfo.type) {
      case 0 /* INDEXABLE_SLICE_NEAR */: {
        const idx = (move.innerLayer ?? 1) - 1;
        adjustValue(idx, directedAmount2);
        adjustValue(idx + 1, -directedAmount2);
        break;
      }
      case 1 /* INDEXABLE_SLICE_FAR */: {
        const idx = sliceDiameter - (move.innerLayer ?? 1);
        adjustValue(idx, directedAmount2);
        adjustValue(idx + 1, -directedAmount2);
        break;
      }
      case 2 /* INDEXABLE_WIDE_NEAR */: {
        adjustValue((move.outerLayer ?? 1) - 1, directedAmount2);
        adjustValue(move.innerLayer ?? 2, -directedAmount2);
        break;
      }
      case 3 /* INDEXABLE_WIDE_FAR */: {
        adjustValue(sliceDiameter - (move.innerLayer ?? 2), directedAmount2);
        adjustValue(
          sliceDiameter - ((move.outerLayer ?? 1) - 1),
          -directedAmount2
        );
        break;
      }
      case 4 /* SPECIFIC_SLICE */: {
        adjustValue(moveSourceInfo.from, directedAmount2);
        adjustValue(moveSourceInfo.to, -directedAmount2);
        break;
      }
      case 5 /* ROTATION */: {
        adjustValue(0, directedAmount2);
        adjustValue(sliceDiameter, -directedAmount2);
        break;
      }
    }
    if ([0, 2].includes(sliceDeltas.size)) {
      lastCandidateRange = { suffixLength, sliceDeltas: new Map(sliceDeltas) };
    }
  }
  if (sliceDeltas.size === 0) {
    return [];
  }
  if (!lastCandidateRange) {
    return moves;
  }
  let [from2, to] = lastCandidateRange.sliceDeltas.keys();
  if (from2 > to) {
    [from2, to] = [to, from2];
  }
  const directedAmount = lastCandidateRange.sliceDeltas.get(from2);
  return [
    ...moves.slice(0, -lastCandidateRange.suffixLength),
    ...directedAmount !== 0 ? [simplestMove(axis, from2, to, directedAmount)] : []
  ];
}
var puzzleSpecificSimplifyOptions333 = {
  quantumMoveOrder: () => 4,
  // doQuantumMovesCommute: areQuantumMovesSameAxis,
  axis: { areQuantumMovesSameAxis, simplifySameAxisMoves }
};

// src/cubing/puzzles/implementations/3x3x3/index.ts
var cubeMirrorTransforms = {
  "\u2194 Mirror (M)": {
    replaceMovesByFamily: {
      L: "R",
      R: "L",
      l: "r",
      r: "l",
      Lw: "Rw",
      Rw: "Lw",
      Lv: "Rv",
      Rv: "Lv"
    },
    invertExceptByFamily: /* @__PURE__ */ new Set(["x", "M", "m"])
  },
  "\u2922 Mirror (S)": {
    replaceMovesByFamily: {
      F: "B",
      B: "F",
      f: "b",
      b: "f",
      Fw: "Bw",
      Bw: "Fw",
      Fv: "Bv",
      Bv: "Fv"
    },
    invertExceptByFamily: /* @__PURE__ */ new Set(["z", "S", "s"])
  },
  "\u2195 Mirror (E)": {
    replaceMovesByFamily: {
      U: "D",
      D: "U",
      u: "d",
      d: "u",
      Uw: "Dw",
      Dw: "Uw",
      Uv: "Dv",
      Dv: "Uv"
    },
    invertExceptByFamily: /* @__PURE__ */ new Set(["y", "E", "e"])
  }
};
var cube3x3x3 = {
  id: "3x3x3",
  fullName: "3\xD73\xD73 Cube",
  inventedBy: ["Ern\u0151 Rubik"],
  inventionYear: 1974,
  // https://en.wikipedia.org/wiki/Rubik%27s_Cube#Conception_and_development
  kpuzzle: getCached(async () => {
    return experimental3x3x3KPuzzle;
  }),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-3x3x3-FYXD7SIU.js")).cube3x3x3SVG;
  }),
  llSVG: getCached(async () => {
    return (await import("./puzzles-dynamic-3x3x3-FYXD7SIU.js")).cube3x3x3LLSVG;
  }),
  llFaceSVG: getCached(async () => {
    return (await import("./puzzles-dynamic-3x3x3-FYXD7SIU.js")).cube3x3x3LLFaceSVG;
  }),
  pg: getCached(async () => {
    return asyncGetPuzzleGeometry("3x3x3");
  }),
  stickeringMask: (stickering) => cubeLikeStickeringMask(cube3x3x3, stickering),
  stickerings: () => cubeLikeStickeringList("3x3x3"),
  puzzleSpecificSimplifyOptions: puzzleSpecificSimplifyOptions333,
  keyMapping: async () => cube3x3x3KeyMapping,
  // TODO: async loading
  algTransformData: cubeMirrorTransforms
};

export {
  from,
  getCached,
  cube3x3x3KPuzzleDefinition,
  puzzleOrientation3x3x3Idx,
  puzzleOrientation3x3x3Cache,
  normalize3x3x3Orientation,
  getPartialAppendOptionsForPuzzleSpecificSimplifyOptions,
  descAsyncGetPuzzleGeometry,
  asyncGetKPuzzleByDesc,
  customPGPuzzleLoader,
  experimentalIs2x2x2Solved,
  getFaceletStickeringMask,
  getPieceStickeringMask,
  PuzzleStickering,
  StickeringManager,
  experimental3x3x3KPuzzle,
  bigCubePuzzleOrientation,
  cubeLikeStickeringMask,
  cubeLikeStickeringList,
  cube3x3x3KeyMapping,
  cubeMirrorTransforms,
  cube3x3x3,
  asyncGetPuzzleGeometry,
  PGPuzzleLoader,
  CubePGPuzzleLoader
};
//# sourceMappingURL=chunk-FUHYAW74.js.map

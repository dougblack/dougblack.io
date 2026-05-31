import {
  CubePGPuzzleLoader,
  PGPuzzleLoader,
  PuzzleStickering,
  StickeringManager,
  asyncGetKPuzzleByDesc,
  asyncGetPuzzleGeometry,
  bigCubePuzzleOrientation,
  cube3x3x3,
  cube3x3x3KeyMapping,
  cubeLikeStickeringList,
  cubeLikeStickeringMask,
  cubeMirrorTransforms,
  descAsyncGetPuzzleGeometry,
  experimentalIs2x2x2Solved,
  from,
  getCached
} from "./chunk-FUHYAW74.js";
import {
  KPuzzle
} from "./chunk-RINY3U6G.js";
import {
  Move,
  Pause
} from "./chunk-O6HEZXGY.js";

// src/cubing/puzzles/events.ts
var wcaEvents = {
  "333": {
    puzzleID: "3x3x3",
    eventName: "3x3x3 Cube",
    scramblesImplemented: "random-state"
  },
  "222": {
    puzzleID: "2x2x2",
    eventName: "2x2x2 Cube",
    scramblesImplemented: "random-state"
  },
  "444": {
    puzzleID: "4x4x4",
    eventName: "4x4x4 Cube",
    scramblesImplemented: "random-state"
  },
  "555": {
    puzzleID: "5x5x5",
    eventName: "5x5x5 Cube",
    scramblesImplemented: "random-moves"
  },
  "666": {
    puzzleID: "6x6x6",
    eventName: "6x6x6 Cube",
    scramblesImplemented: "random-moves"
  },
  "777": {
    puzzleID: "7x7x7",
    eventName: "7x7x7 Cube",
    scramblesImplemented: "random-moves"
  },
  "333bf": {
    puzzleID: "3x3x3",
    eventName: "3x3x3 Blindfolded",
    scramblesImplemented: "random-state"
  },
  "333fm": {
    puzzleID: "3x3x3",
    eventName: "3x3x3 Fewest Moves",
    scramblesImplemented: "random-state"
  },
  "333oh": {
    puzzleID: "3x3x3",
    eventName: "3x3x3 One-Handed",
    scramblesImplemented: "random-state"
  },
  clock: {
    puzzleID: "clock",
    eventName: "Clock",
    scramblesImplemented: "random-state"
  },
  minx: {
    puzzleID: "megaminx",
    eventName: "Megaminx",
    scramblesImplemented: "random-moves"
  },
  pyram: {
    puzzleID: "pyraminx",
    eventName: "Pyraminx",
    scramblesImplemented: "random-state"
  },
  skewb: {
    puzzleID: "skewb",
    eventName: "Skewb",
    scramblesImplemented: "random-state"
  },
  sq1: {
    puzzleID: "square1",
    eventName: "Square-1",
    scramblesImplemented: "random-state"
  },
  "444bf": {
    puzzleID: "4x4x4",
    eventName: "4x4x4 Blindfolded",
    scramblesImplemented: "random-state"
  },
  "555bf": {
    puzzleID: "5x5x5",
    eventName: "5x5x5 Blindfolded",
    scramblesImplemented: "random-moves"
  },
  "333mbf": {
    puzzleID: "3x3x3",
    eventName: "3x3x3 Multi-Blind",
    scramblesImplemented: "random-state"
  }
};
function wcaEventInfo(event) {
  return wcaEvents[event] ?? null;
}
var twizzleEvents = {
  ...wcaEvents,
  fto: {
    puzzleID: "fto",
    eventName: "Face-Turning Octahedron",
    scramblesImplemented: "random-state"
  },
  master_tetraminx: {
    puzzleID: "master_tetraminx",
    eventName: "Master Tetraminx",
    scramblesImplemented: "random-state"
  },
  kilominx: {
    puzzleID: "kilominx",
    eventName: "Kilominx",
    scramblesImplemented: "random-state"
  },
  redi_cube: {
    puzzleID: "redi_cube",
    eventName: "Redi Cube",
    scramblesImplemented: "random-state"
  },
  baby_fto: {
    puzzleID: "baby_fto",
    eventName: "Baby FTO",
    scramblesImplemented: "random-state"
  },
  loopover: {
    puzzleID: "loopover",
    eventName: "Loopover",
    scramblesImplemented: null
  }
};
function eventInfo(event) {
  return twizzleEvents[event] ?? null;
}

// src/cubing/puzzles/implementations/2x2x2/index.ts
var cube2x2x2 = {
  id: "2x2x2",
  fullName: "2\xD72\xD72 Cube",
  kpuzzle: getCached(async () => {
    const kpuzzle = new KPuzzle(
      (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).cube2x2x2JSON
    );
    kpuzzle.definition.experimentalIsPatternSolved = experimentalIs2x2x2Solved;
    return kpuzzle;
  }),
  svg: async () => (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).cube2x2x2SVG,
  llSVG: getCached(
    async () => (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).cube2x2x2LLSVG
  ),
  pg: getCached(async () => {
    return asyncGetPuzzleGeometry("2x2x2");
  }),
  stickeringMask: (stickering) => cubeLikeStickeringMask(cube2x2x2, stickering),
  stickerings: () => cubeLikeStickeringList("2x2x2", { use3x3x3Fallbacks: true }),
  algTransformData: cubeMirrorTransforms
};

// src/cubing/puzzles/implementations/4x4x4/cube4x4x4And5x5x5KeyMapping.ts
var cube4x4x4And5x5x5KeyMapping = {
  ...cube3x3x3KeyMapping,
  KeyZ: new Move("m'"),
  KeyB: new Move("m"),
  Period: new Move("m'")
};

// src/cubing/puzzles/implementations/4x4x4/index.ts
var cube4x4x4 = new CubePGPuzzleLoader({
  id: "4x4x4",
  fullName: "4\xD74\xD74 Cube",
  inventedBy: ["Peter Sebest\xE9ny"],
  inventionYear: 1981
});
cube4x4x4.llSVG = getCached(async () => {
  return (await import("./puzzles-dynamic-4x4x4-REUXFQJ4.js")).cube4x4x4LLSVG;
});
cube4x4x4.keyMapping = async () => cube4x4x4And5x5x5KeyMapping;
cube4x4x4.kpuzzle = getCached(async () => {
  const kpuzzle = await PGPuzzleLoader.prototype.kpuzzle.call(cube4x4x4);
  kpuzzle.definition.defaultPattern["CENTERS"].pieces = [
    // U
    0,
    0,
    0,
    0,
    // L
    4,
    4,
    4,
    4,
    // F
    8,
    8,
    8,
    8,
    // R
    12,
    12,
    12,
    12,
    // B
    16,
    16,
    16,
    16,
    // D
    20,
    20,
    20,
    20
  ];
  const { experimentalIsBigCubeSolved } = await bigCubePuzzleOrientation();
  kpuzzle.definition.experimentalIsPatternSolved = experimentalIsBigCubeSolved;
  return kpuzzle;
});

// src/cubing/puzzles/implementations/5x5x5/index.ts
var cube5x5x5 = new CubePGPuzzleLoader({
  id: "5x5x5",
  fullName: "5\xD75\xD75 Cube",
  inventedBy: ["Udo Krell"],
  inventionYear: 1981
});
cube5x5x5.keyMapping = async () => cube4x4x4And5x5x5KeyMapping;
cube5x5x5.kpuzzle = getCached(async () => {
  const kpuzzle = await PGPuzzleLoader.prototype.kpuzzle.call(cube5x5x5);
  const speffzDistinguishableCenters = [
    // U
    0,
    0,
    0,
    0,
    // L
    4,
    4,
    4,
    4,
    // F
    8,
    8,
    8,
    8,
    // R
    12,
    12,
    12,
    12,
    // B
    16,
    16,
    16,
    16,
    // D
    20,
    20,
    20,
    20
  ];
  kpuzzle.definition.defaultPattern["CENTERS"].pieces = speffzDistinguishableCenters;
  kpuzzle.definition.defaultPattern["CENTERS2"].pieces = speffzDistinguishableCenters;
  kpuzzle.definition.defaultPattern["CENTERS3"].orientationMod = new Array(
    6
  ).fill(1);
  const { experimentalIsBigCubeSolved } = await bigCubePuzzleOrientation();
  kpuzzle.definition.experimentalIsPatternSolved = experimentalIsBigCubeSolved;
  return kpuzzle;
});

// src/cubing/puzzles/stickerings/fto-stickerings.ts
async function ftoStickering(puzzleLoader, stickering) {
  const kpuzzle = await puzzleLoader.kpuzzle();
  const puzzleStickering = new PuzzleStickering(kpuzzle);
  const m = new StickeringManager(kpuzzle);
  const experimentalFTO_FC = () => m.and([m.move("U"), m.not(m.or(m.moves(["F", "BL", "BR"])))]);
  const experimentalFTO_F2T = () => m.and([m.move("U"), m.not(m.move("F"))]);
  const experimentalFTO_SC = () => m.or([
    experimentalFTO_F2T(),
    m.and([m.move("F"), m.not(m.or(m.moves(["U", "BL", "BR"])))])
  ]);
  const experimentalFTO_L2C = () => m.not(
    m.or([
      m.and([m.move("U"), m.move("F")]),
      m.and([m.move("F"), m.move("BL")]),
      m.and([m.move("F"), m.move("BR")]),
      m.and([m.move("BL"), m.move("BR")])
    ])
  );
  const experimentalFTO_LBT = () => m.not(
    m.or([
      m.and([m.move("F"), m.move("BL")]),
      m.and([m.move("F"), m.move("BR")]),
      m.and([m.move("BL"), m.move("BR")])
    ])
  );
  switch (stickering) {
    case "full":
      break;
    case "experimental-fto-fc": {
      puzzleStickering.set(
        m.not(experimentalFTO_FC()),
        "Ignored" /* Ignored */
      );
      break;
    }
    case "experimental-fto-f2t": {
      puzzleStickering.set(
        m.not(experimentalFTO_F2T()),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(experimentalFTO_FC(), "Dim" /* Dim */);
      break;
    }
    case "experimental-fto-sc": {
      puzzleStickering.set(
        m.not(experimentalFTO_SC()),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(experimentalFTO_F2T(), "Dim" /* Dim */);
      break;
    }
    case "experimental-fto-l2c": {
      puzzleStickering.set(
        m.not(experimentalFTO_L2C()),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(experimentalFTO_SC(), "Dim" /* Dim */);
      break;
    }
    case "experimental-fto-lbt": {
      puzzleStickering.set(
        m.not(experimentalFTO_LBT()),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(experimentalFTO_L2C(), "Dim" /* Dim */);
      break;
    }
    case "experimental-fto-l3t": {
      puzzleStickering.set(experimentalFTO_LBT(), "Dim" /* Dim */);
      break;
    }
    default:
      console.warn(
        `Unsupported stickering for ${puzzleLoader.id}: ${stickering}. Setting all pieces to dim.`
      );
      puzzleStickering.set(m.and(m.moves([])), "Dim" /* Dim */);
  }
  return puzzleStickering.toStickeringMask();
}
async function ftoStickerings() {
  return [
    "full",
    "experimental-fto-fc",
    "experimental-fto-f2t",
    "experimental-fto-sc",
    "experimental-fto-l2c",
    "experimental-fto-lbt",
    "experimental-fto-l3t"
  ];
}

// src/cubing/puzzles/implementations/fto/ftoKeyMapping.ts
var ftoKeyMapping = {
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
  KeyN: new Move("Rv'"),
  KeyC: new Move("l"),
  KeyR: new Move("l'"),
  KeyU: new Move("r"),
  KeyM: new Move("r'"),
  KeyX: new Move("d"),
  Comma: new Move("d'"),
  KeyT: new Move("Lv'"),
  KeyY: new Move("Rv"),
  KeyV: new Move("Lv"),
  Semicolon: new Move("Uv"),
  KeyA: new Move("Uv'"),
  KeyP: new Move("BR'"),
  KeyQ: new Move("BL"),
  KeyZ: new Move("BL'"),
  KeyB: new Move("T"),
  Period: new Move("BR"),
  Backquote: new Pause()
};

// src/cubing/puzzles/implementations/baby_fto/index.ts
var BabyFTOPuzzleLoader = class extends PGPuzzleLoader {
  constructor() {
    super({
      pgID: "skewb diamond",
      id: "baby_fto",
      fullName: "Baby FTO",
      inventedBy: ["Uwe M\xE8ffert"],
      // inventionYear: TODO
      setOrientationModTo1ForPiecesOfOrbits: ["CENTERS"]
    });
  }
  stickeringMask(stickering) {
    return ftoStickering(this, stickering);
  }
  svg = getCached(async () => {
    return (await import("./puzzles-dynamic-unofficial-P3TW433I.js")).babyFTOSVG;
  });
  keyMapping = async () => ftoKeyMapping;
};
var baby_fto = new BabyFTOPuzzleLoader();

// src/cubing/puzzles/implementations/clock/index.ts
var clock = {
  id: "clock",
  fullName: "Clock",
  inventedBy: ["Christopher C. Wiggs", "Christopher J. Taylor"],
  inventionYear: 1988,
  // Patent application year: https://www.jaapsch.net/puzzles/patents/us4869506.pdf
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).clockJSON
    )
  ),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).clockSVG;
  })
};

// src/cubing/puzzles/implementations/fto/index.ts
var FTOPuzzleLoader = class extends PGPuzzleLoader {
  constructor() {
    super({
      pgID: "FTO",
      id: "fto",
      fullName: "Face-Turning Octahedron",
      inventedBy: ["Karl Rohrbach", "David Pitcher"],
      // http://twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=1663
      inventionYear: 1983
      // http://twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=1663
    });
  }
  stickeringMask(stickering) {
    return ftoStickering(this, stickering);
  }
  stickerings = ftoStickerings;
  svg = getCached(async () => {
    return (await import("./puzzles-dynamic-unofficial-P3TW433I.js")).ftoSVG;
  });
  keyMapping = async () => ftoKeyMapping;
  algTransformData = {
    "\u2194 Mirror (x)": {
      replaceMovesByFamily: {
        L: "R",
        R: "L",
        l: "r",
        r: "l",
        Lw: "Rw",
        Rw: "Lw",
        Lv: "Rv",
        Rv: "Lv",
        BL: "BR",
        BR: "BL",
        bl: "br",
        br: "bl",
        BLw: "BRw",
        BRw: "BLw",
        BLv: "BRv",
        BRv: "BLv"
      },
      invertExceptByFamily: /* @__PURE__ */ new Set(["x"])
    }
  };
};
var fto = new FTOPuzzleLoader();

// src/cubing/puzzles/implementations/kilominx/index.ts
var KILOMINX_PUZZLE_DESCRIPTION = "d f 0.56";
var kilominx = {
  id: "kilominx",
  fullName: "Kilominx",
  kpuzzle: getCached(
    () => asyncGetKPuzzleByDesc(KILOMINX_PUZZLE_DESCRIPTION, {
      includeCenterOrbits: false,
      includeEdgeOrbits: false
    })
  ),
  pg: () => descAsyncGetPuzzleGeometry(KILOMINX_PUZZLE_DESCRIPTION, {
    includeCenterOrbits: false,
    includeEdgeOrbits: false
  }),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-unofficial-P3TW433I.js")).kilominxSVG;
  })
};

// src/cubing/puzzles/implementations/loopover/index.ts
var loopover = {
  id: "loopover",
  fullName: "Loopover",
  inventedBy: ["Cary Huang"],
  inventionYear: 2018,
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-unofficial-P3TW433I.js")).loopoverJSON
    )
  ),
  svg: async () => {
    return (await import("./puzzles-dynamic-unofficial-P3TW433I.js")).loopoverSVG;
  }
};

// src/cubing/puzzles/stickerings/megaminx-stickerings.ts
async function megaminxStickeringMask(puzzleLoader, stickering) {
  if ((await megaminxStickerings()).includes(stickering)) {
    return cubeLikeStickeringMask(puzzleLoader, stickering);
  }
  console.warn(
    `Unsupported stickering for ${puzzleLoader.id}: ${stickering}. Setting all pieces to dim.`
  );
  return cubeLikeStickeringMask(puzzleLoader, "full");
}
var megaminxStickeringListPromise = from(
  () => cubeLikeStickeringList("megaminx")
);
function megaminxStickerings() {
  return megaminxStickeringListPromise;
}

// src/cubing/puzzles/implementations/megaminx/megaminxKeyMapping.ts
var megaminxKeyMapping = {
  KeyI: new Move("R"),
  KeyK: new Move("R'"),
  KeyW: new Move("B"),
  KeyO: new Move("B'"),
  KeyS: new Move("FR"),
  KeyL: new Move("FR'"),
  KeyD: new Move("L"),
  KeyE: new Move("L'"),
  KeyJ: new Move("U"),
  KeyF: new Move("U'"),
  KeyH: new Move("F"),
  KeyG: new Move("F'"),
  KeyC: new Move("Lw"),
  KeyR: new Move("Lw'"),
  KeyU: new Move("Rw"),
  KeyM: new Move("Rw'"),
  KeyX: new Move("d"),
  Comma: new Move("d'"),
  KeyT: new Move("Rv"),
  KeyY: new Move("Rv"),
  KeyV: new Move("Rv'"),
  KeyN: new Move("Rv'"),
  Semicolon: new Move("y"),
  KeyA: new Move("y'"),
  KeyP: new Move("z"),
  KeyQ: new Move("z'"),
  KeyZ: new Move("2L'"),
  KeyB: new Move("2R"),
  Period: new Move("2R'"),
  Backquote: new Pause()
};

// src/cubing/puzzles/implementations/megaminx/index.ts
var MegaminxPuzzleLoader = class extends PGPuzzleLoader {
  constructor() {
    super({
      id: "megaminx",
      fullName: "Megaminx",
      // Too many simultaneous inventors to name.
      inventionYear: 1981
      // Earliest date from https://www.jaapsch.net/puzzles/megaminx.htm
    });
  }
  stickeringMask(stickering) {
    return megaminxStickeringMask(this, stickering);
  }
  stickerings = megaminxStickerings;
  llSVG = getCached(async () => {
    return (await import("./puzzles-dynamic-megaminx-2LVHIDL4.js")).megaminxLLSVG;
  });
  keyMapping = async () => megaminxKeyMapping;
  // TODO: async loading
};
var megaminx = new MegaminxPuzzleLoader();

// src/cubing/puzzles/implementations/melindas2x2x2x2/index.ts
var melindas2x2x2x2 = {
  id: "melindas2x2x2x2",
  fullName: "Melinda's 2\xD72\xD72\xD72",
  inventedBy: ["Melinda Green"],
  // inventionYear: 20__, // TODO
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).melindas2x2x2x2OrbitJSON
    )
  ),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).melindas2x2x2x2OrbitSVG;
  })
};

// src/cubing/puzzles/implementations/pyraminx/index.ts
var PyraminxPuzzleLoader = class extends PGPuzzleLoader {
  constructor() {
    super({
      id: "pyraminx",
      fullName: "Pyraminx",
      inventedBy: ["Uwe Meffert"]
    });
  }
  svg = getCached(async () => {
    return (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).pyraminxSVG;
  });
  algTransformData = {
    "\u2194 Mirror (x)": {
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
      invertExceptByFamily: /* @__PURE__ */ new Set([])
    }
  };
};
var pyraminx = new PyraminxPuzzleLoader();

// src/cubing/puzzles/implementations/redi-cube/index.ts
var rediCube = {
  id: "redi_cube",
  fullName: "Redi Cube",
  // Announced 2009-07-21: https://www.youtube.com/watch?v=cjfMzA1u3vM
  // https://twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=1520
  inventedBy: ["Oskar van Deventer"],
  inventionYear: 2009,
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-unofficial-P3TW433I.js")).rediCubeJSON
    )
  ),
  svg: async () => {
    return (await import("./puzzles-dynamic-unofficial-P3TW433I.js")).rediCubeSVG;
  }
};

// src/cubing/puzzles/implementations/square1/index.ts
var square1 = {
  id: "square1",
  fullName: "Square-1",
  inventedBy: ["Karel Hr\u0161el", "Vojtech Kopsk\xFD"],
  inventionYear: 1990,
  // Czech patent application year: http://spisy.upv.cz/Patents/FullDocuments/277/277266.pdf
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).sq1HyperOrbitJSON
    )
  ),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).sq1HyperOrbitSVG;
  })
};

// src/cubing/puzzles/implementations/tri_quad/index.ts
var tri_quad = {
  id: "tri_quad",
  fullName: "TriQuad",
  inventedBy: ["Bram Cohen", "Carl Hoff"],
  inventionYear: 2018,
  // https://twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=6809
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).triQuadJSON
    )
  ),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-side-events-IMYJ533P.js")).triQuadSVG;
  })
};

// src/cubing/puzzles/index.ts
var puzzles = {
  /******** Start of WCA Puzzles *******/
  "3x3x3": cube3x3x3,
  "2x2x2": cube2x2x2,
  "4x4x4": cube4x4x4,
  "5x5x5": cube5x5x5,
  "6x6x6": new CubePGPuzzleLoader({ id: "6x6x6", fullName: "6\xD76\xD76 Cube" }),
  "7x7x7": new CubePGPuzzleLoader({ id: "7x7x7", fullName: "7\xD77\xD77 Cube" }),
  "40x40x40": new CubePGPuzzleLoader({
    id: "40x40x40",
    fullName: "40\xD740\xD740 Cube"
  }),
  // 3x3x3 Blindfolded
  // 3x3x3 Fewest Moves
  // 3x3x3 One-Handed
  clock,
  megaminx,
  pyraminx,
  skewb: new PGPuzzleLoader({
    id: "skewb",
    fullName: "Skewb",
    inventedBy: ["Tony Durham"]
    // https://www.jaapsch.net/puzzles/skewb.htm
    // inventionYear: 1982, // 1982 is actually the year of Hofstadter's column.
  }),
  square1,
  // 4x4x4 Blindfolded
  // 5x5x5 Blindfolded
  /******** End of WCA puzzles ********/
  fto,
  gigaminx: new PGPuzzleLoader({
    id: "gigaminx",
    fullName: "Gigaminx",
    inventedBy: ["Tyler Fox"],
    inventionYear: 2006
    // Earliest date from https://www.twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=1475
  }),
  master_tetraminx: new PGPuzzleLoader({
    pgID: "master tetraminx",
    id: "master_tetraminx",
    fullName: "Master Tetraminx",
    inventedBy: ["Katsuhiko Okamoto"],
    // Using master pyraminx: https://twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=1352
    inventionYear: 2002
    // Using master pyraminx: https://twistypuzzles.com/cgi-bin/puzzle.cgi?pkey=1352
  }),
  kilominx,
  redi_cube: rediCube,
  melindas2x2x2x2,
  loopover,
  tri_quad,
  baby_fto
};

export {
  wcaEvents,
  wcaEventInfo,
  twizzleEvents,
  eventInfo,
  cube2x2x2,
  puzzles
};
//# sourceMappingURL=chunk-FLK6AZKB.js.map

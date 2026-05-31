import {
  Move,
  QuantumMove
} from "../chunks/chunk-O6HEZXGY.js";

// src/cubing/puzzle-geometry/colors.ts
function defaultPlatonicColorSchemes() {
  return {
    // the colors should use the same naming convention as the nets, above.
    4: {
      F: "#44ee00" /* Green */,
      D: "#f4f400" /* Yellow */,
      L: "#ff0000" /* Red */,
      R: "#2266ff" /* Blue */
    },
    6: {
      U: "#ffffff" /* White */,
      F: "#44ee00" /* Green */,
      R: "#ff0000" /* Red */,
      D: "#f4f400" /* Yellow */,
      B: "#2266ff" /* Blue */,
      L: "#ff8000" /* Orange */
    },
    8: {
      U: "#ffffff" /* White */,
      F: "#44ee00" /* Green */,
      R: "#ff0000" /* Red */,
      D: "#f4f400" /* Yellow */,
      BB: "#2266ff" /* Blue */,
      L: "#8800dd" /* Purple */,
      BL: "#ff8000" /* Orange */,
      BR: "#888888" /* MediumGray */
    },
    12: {
      U: "#ffffff" /* White */,
      F: "#008800" /* DarkGreen */,
      R: "#ff0000" /* Red */,
      C: "#e8d0a0" /* Cream */,
      A: "#3399ff" /* Aqua */,
      L: "#8800dd" /* Purple */,
      E: "#ff66cc" /* Pink */,
      BF: "#99ff00" /* Lime */,
      BR: "#0000ff" /* BoldBlue */,
      BL: "#f4f400" /* Yellow */,
      I: "#ff8000" /* Orange */,
      D: "#888888" /* MediumGray */
    },
    20: {
      R: "#f4f400" /* Yellow */,
      C: "#d41f69" /* Cerise */,
      F: "#008800" /* DarkGreen */,
      E: "#5c5c5c" /* DarkGray */,
      L: "#8800dd" /* Purple */,
      U: "#ffffff" /* White */,
      A: "#007a89" /* Teal */,
      G: "#ff0000" /* Red */,
      I: "#7d3b11" /* Brown */,
      S: "#b9a1ff" /* Lavender */,
      H: "#3399ff" /* Aqua */,
      J: "#5ec4b6" /* SeaGreen */,
      B: "#44ee00" /* Green */,
      K: "#e8d0a0" /* Cream */,
      D: "#aaaaaa" /* LightGray */,
      M: "#ff66cc" /* Pink */,
      O: "#292929" /* harcoal */,
      P: "#ff8000" /* Orange */,
      N: "#980000" /* Burgundy */,
      Q: "#0000ff" /* BoldBlue */
    }
  };
}

// src/cubing/puzzle-geometry/FaceNameSwizzler.ts
var FaceNameSwizzler = class {
  constructor(facenames, gripnames_arg) {
    this.facenames = facenames;
    if (gripnames_arg) {
      this.gripnames = gripnames_arg;
    }
    for (let i = 0; this.prefixFree && i < facenames.length; i++) {
      for (let j = 0; this.prefixFree && j < facenames.length; j++) {
        if (i !== j && facenames[i].startsWith(facenames[j])) {
          this.prefixFree = false;
        }
      }
    }
  }
  prefixFree = true;
  gripnames = [];
  setGripNames(names) {
    this.gripnames = names;
  }
  // split a string into face names and return a list of
  // indices.
  splitByFaceNames(s) {
    const r = [];
    let at = 0;
    while (at < s.length) {
      if (at > 0 && at < s.length && s[at] === "_") {
        at++;
      }
      let currentMatch = -1;
      for (let i = 0; i < this.facenames.length; i++) {
        if (s.substr(at).startsWith(this.facenames[i]) && (currentMatch < 0 || this.facenames[i].length > this.facenames[currentMatch].length)) {
          currentMatch = i;
        }
      }
      if (currentMatch >= 0) {
        r.push(currentMatch);
        at += this.facenames[currentMatch].length;
      } else {
        throw new Error(`Could not split ${s} into face names.`);
      }
    }
    return r;
  }
  // cons a grip from an array of numbers.
  joinByFaceIndices(list) {
    let sep = "";
    const r = [];
    for (let i = 0; i < list.length; i++) {
      r.push(sep);
      r.push(this.facenames[list[i]]);
      if (!this.prefixFree) {
        sep = "_";
      }
    }
    return r.join("");
  }
  /*
   *   Try to match something the user gave us with some geometric
   *   feature.  We used to have strict requirements:
   *
   *      a)  The set of face names are prefix free
   *      b)  When specifying a corner, all coincident planes were
   *          specified
   *
   *   But, to allow megaminx to have more reasonable and
   *   conventional names, and to permit shorter canonical
   *   names, we are relaxing these requirements and adding
   *   new syntax.  Now:
   *
   *      a)  Face names need not be syntax free.
   *      b)  When parsing a geometric name, we use greedy
   *          matching, so the longest name that matches the
   *          user string at the current position is the one
   *          assumed to match.
   *      c)  Underscores are permitted to separate face names
   *          (both in user input and in geometric
   *          descriptions).
   *      d)  Default names of corner moves where corners have
   *          more than three corners, need only include three
   *          of the corners.
   *
   *   This code is not performance-sensitive so we can do it a
   *   slow and simple way.
   */
  spinmatch(userinput, longname) {
    if (userinput === longname) {
      return true;
    }
    try {
      const e1 = this.splitByFaceNames(userinput);
      const e2 = this.splitByFaceNames(longname);
      if (e1.length !== e2.length && e1.length < 3) {
        return false;
      }
      for (let i = 0; i < e1.length; i++) {
        for (let j = 0; j < i; j++) {
          if (e1[i] === e1[j]) {
            return false;
          }
        }
        let found = false;
        for (let j = 0; j < e2.length; j++) {
          if (e1[i] === e2[j]) {
            found = true;
            break;
          }
        }
        if (!found) {
          return false;
        }
      }
      return true;
    } catch {
      return false;
    }
  }
  /* same as above, but permit both to have v's on the end. */
  spinmatchv(userinput, longname) {
    if (userinput.endsWith("v") && longname.endsWith("v")) {
      return this.spinmatch(
        userinput.slice(0, userinput.length - 1),
        longname.slice(0, longname.length - 1)
      );
    } else {
      return this.spinmatch(userinput, longname);
    }
  }
  unswizzle(s) {
    if ((s.endsWith("v") || s.endsWith("w")) && s[0] <= "Z") {
      s = s.slice(0, s.length - 1);
    }
    const upperCaseGrip = s.toUpperCase();
    for (let i = 0; i < this.gripnames.length; i++) {
      const g = this.gripnames[i];
      if (this.spinmatch(upperCaseGrip, g)) {
        return g;
      }
    }
    return s;
  }
};

// src/cubing/puzzle-geometry/notation-mapping/FaceRenamingMapper.ts
var FaceRenamingMapper = class {
  constructor(internalNames, externalNames) {
    this.internalNames = internalNames;
    this.externalNames = externalNames;
  }
  // TODO:  consider putting a cache in front of this
  convertString(grip, a, b) {
    let suffix = "";
    if ((grip.endsWith("v") || grip.endsWith("v")) && grip <= "_") {
      suffix = grip.slice(grip.length - 1);
      grip = grip.slice(0, grip.length - 1);
    }
    const upper = grip.toUpperCase();
    let isLowerCase = false;
    if (grip !== upper) {
      isLowerCase = true;
      grip = upper;
    }
    grip = b.joinByFaceIndices(a.splitByFaceNames(grip));
    if (isLowerCase) {
      grip = grip.toLowerCase();
    }
    return grip + suffix;
  }
  convert(move, a, b) {
    const grip = move.family;
    const ngrip = this.convertString(grip, a, b);
    if (grip === ngrip) {
      return move;
    } else {
      return new Move(
        new QuantumMove(ngrip, move.innerLayer, move.outerLayer),
        move.amount
      );
    }
  }
  notationToInternal(move) {
    const r = this.convert(move, this.externalNames, this.internalNames);
    return r;
  }
  notationToExternal(move) {
    return this.convert(move, this.internalNames, this.externalNames);
  }
};

// src/cubing/puzzle-geometry/notation-mapping/FTONotationMapper.ts
var FTONotationMapper = class {
  constructor(child, sw) {
    this.child = child;
    this.sw = sw;
  }
  notationToInternal(move) {
    if (move.family === "T" && move.innerLayer === void 0 && move.outerLayer === void 0) {
      return new Move(
        new QuantumMove("FLRv", move.innerLayer, move.outerLayer),
        move.amount
      );
    } else {
      const r = this.child.notationToInternal(move);
      return r;
    }
  }
  // we never rewrite click moves to these moves.
  notationToExternal(move) {
    let fam = move.family;
    if (fam.length > 0 && fam[fam.length - 1] === "v") {
      fam = fam.substring(0, fam.length - 1);
    }
    if (this.sw.spinmatch(fam, "FLUR")) {
      return new Move(
        new QuantumMove("T", move.innerLayer, move.outerLayer),
        move.amount
      );
    }
    return this.child.notationToExternal(move);
  }
};

// src/cubing/puzzle-geometry/notation-mapping/MegaminxScramblingNotationMapper.ts
var MegaminxScramblingNotationMapper = class {
  constructor(child) {
    this.child = child;
  }
  notationToInternal(move) {
    if (move.innerLayer === void 0 && move.outerLayer === void 0) {
      if (Math.abs(move.amount) === 1) {
        if (move.family === "R++") {
          return new Move(new QuantumMove("L", 3, 2), -2 * move.amount);
        } else if (move.family === "R--") {
          return new Move(new QuantumMove("L", 3, 2), 2 * move.amount);
        } else if (move.family === "D++") {
          return new Move(new QuantumMove("U", 3, 2), -2 * move.amount);
        } else if (move.family === "D--") {
          return new Move(new QuantumMove("U", 3, 2), 2 * move.amount);
        }
        if (move.family === "R_PLUSPLUS_") {
          return new Move(new QuantumMove("L", 3, 2), -2 * move.amount);
        } else if (move.family === "D_PLUSPLUS_") {
          return new Move(new QuantumMove("U", 3, 2), -2 * move.amount);
        }
      }
      if (move.family === "y") {
        return new Move("Uv", move.amount);
      }
      if (move.family === "x" && Math.abs(move.amount) === 2) {
        return new Move("ERv", move.amount / 2);
      }
    }
    return this.child.notationToInternal(move);
  }
  // we never rewrite click moves to these moves.
  notationToExternal(move) {
    if (move.family === "ERv" && Math.abs(move.amount) === 1) {
      return new Move(
        new QuantumMove("x", move.innerLayer, move.outerLayer),
        move.amount * 2
      );
    }
    if (move.family === "ILv" && Math.abs(move.amount) === 1) {
      return new Move(
        new QuantumMove("x", move.innerLayer, move.outerLayer),
        -move.amount * 2
      );
    }
    if (move.family === "Uv") {
      return new Move(
        new QuantumMove("y", move.innerLayer, move.outerLayer),
        move.amount
      );
    }
    if (move.family === "Dv") {
      return new Move("y", -move.amount);
    }
    return this.child.notationToExternal(move);
  }
};

// src/cubing/puzzle-geometry/notation-mapping/NullMapper.ts
var NullMapper = class {
  notationToInternal(move) {
    return move;
  }
  notationToExternal(move) {
    return move;
  }
};

// src/cubing/puzzle-geometry/notation-mapping/NxNxNCubeMapper.ts
var NxNxNCubeMapper = class {
  constructor(slices) {
    this.slices = slices;
  }
  notationToInternal(move) {
    const grip = move.family;
    if (!(move.innerLayer || move.outerLayer)) {
      if (grip === "x") {
        move = new Move("Rv", move.amount);
      } else if (grip === "y") {
        move = new Move("Uv", move.amount);
      } else if (grip === "z") {
        move = new Move("Fv", move.amount);
      }
      if ((this.slices & 1) === 1) {
        if (grip === "E") {
          move = new Move(
            new QuantumMove("D", (this.slices + 1) / 2),
            move.amount
          );
        } else if (grip === "M") {
          move = new Move(
            new QuantumMove("L", (this.slices + 1) / 2),
            move.amount
          );
        } else if (grip === "S") {
          move = new Move(
            new QuantumMove("F", (this.slices + 1) / 2),
            move.amount
          );
        }
      }
      if (this.slices > 2) {
        if (grip === "e") {
          move = new Move(
            new QuantumMove("D", this.slices - 1, 2),
            move.amount
          );
        } else if (grip === "m") {
          move = new Move(
            new QuantumMove("L", this.slices - 1, 2),
            move.amount
          );
        } else if (grip === "s") {
          move = new Move(
            new QuantumMove("F", this.slices - 1, 2),
            move.amount
          );
        }
      }
    }
    return move;
  }
  // do we want to map slice moves to E/M/S instead of 2U/etc.?
  notationToExternal(move) {
    const grip = move.family;
    if (!(move.innerLayer || move.outerLayer)) {
      if (grip === "Rv") {
        return new Move("x", move.amount);
      } else if (grip === "Uv") {
        return new Move("y", move.amount);
      } else if (grip === "Fv") {
        return new Move("z", move.amount);
      } else if (grip === "Lv") {
        return new Move("x", -move.amount);
      } else if (grip === "Dv") {
        return new Move("y", -move.amount);
      } else if (grip === "Bv") {
        return new Move("z", -move.amount);
      }
    }
    return move;
  }
};

// src/cubing/puzzle-geometry/notation-mapping/PyraminxNotationMapper.ts
var pyraminxFamilyMap = {
  U: "frl",
  L: "fld",
  R: "fdr",
  B: "dlr",
  u: "FRL",
  l: "FLD",
  r: "FDR",
  b: "DLR",
  Uv: "FRLv",
  Lv: "FLDv",
  Rv: "FDRv",
  Bv: "DLRv",
  D: "D",
  F: "F",
  BL: "L",
  BR: "R"
};
var tetraminxFamilyMap = {
  U: "FRL",
  L: "FLD",
  R: "FDR",
  B: "DLR",
  u: "frl",
  l: "fld",
  r: "fdr",
  b: "dlr",
  Uv: "FRLv",
  Lv: "FLDv",
  Rv: "FDRv",
  Bv: "DLRv",
  D: "D",
  F: "F",
  BL: "L",
  BR: "R",
  d: "d",
  f: "f",
  bl: "l",
  br: "r"
};
var pyraminxFamilyMapWCA = {
  U: "FRL",
  L: "FLD",
  R: "FDR",
  B: "DLR"
};
var pyraminxExternalQuantumY = new QuantumMove("y");
var pyraminxInternalQuantumY = new QuantumMove("Dv");
var PyraminxNotationMapper = class {
  constructor(child) {
    this.child = child;
  }
  wcaHack = false;
  map = pyraminxFamilyMap;
  notationToInternal(move) {
    if (this.wcaHack && move.innerLayer === 2 && move.outerLayer === null) {
      const newFamilyWCA = pyraminxFamilyMapWCA[move.family];
      if (newFamilyWCA) {
        return new Move(
          new QuantumMove(newFamilyWCA, move.innerLayer, move.outerLayer),
          move.amount
        );
      }
    }
    const newFamily = this.map[move.family];
    if (newFamily) {
      return new Move(
        new QuantumMove(newFamily, move.innerLayer, move.outerLayer),
        move.amount
      );
    } else if (pyraminxExternalQuantumY.isIdentical(move.quantum)) {
      return new Move(pyraminxInternalQuantumY, -move.amount);
    } else {
      return null;
    }
  }
  // we never rewrite click moves to these moves.
  notationToExternal(move) {
    if (this.wcaHack && move.innerLayer === 2 && move.outerLayer === null) {
      for (const [external, internal] of Object.entries(pyraminxFamilyMapWCA)) {
        if (this.child.spinmatch(move.family, internal)) {
          return new Move(
            new QuantumMove(external, move.innerLayer, move.outerLayer),
            move.amount
          );
        }
      }
    }
    for (const [external, internal] of Object.entries(this.map)) {
      if (this.child.spinmatch(move.family, internal)) {
        return new Move(
          new QuantumMove(external, move.innerLayer, move.outerLayer),
          move.amount
        );
      }
    }
    if (pyraminxInternalQuantumY.isIdentical(move.quantum)) {
      return new Move(pyraminxExternalQuantumY, -move.amount);
    } else {
      return null;
    }
  }
};
var TetraminxNotationMapper = class extends PyraminxNotationMapper {
  wcaHack = true;
  constructor(child) {
    super(child);
    this.map = tetraminxFamilyMap;
  }
};

// src/cubing/puzzle-geometry/notation-mapping/SkewbNotationMapper.ts
var skewbFamilyMap = {
  U: "UBL",
  UL: "ULF",
  F: "UFR",
  UR: "URB",
  B: "DBL",
  D: "DFR",
  L: "DLF",
  R: "DRB",
  Uv: "UBLv",
  ULv: "ULFv",
  Fv: "UFRv",
  URv: "URBv",
  Bv: "DBLv",
  Dv: "DFRv",
  Lv: "DLFv",
  Rv: "DRBv"
};
var skewbExternalQuantumX = new QuantumMove("x");
var skewbInternalQuantumX = new QuantumMove("Rv");
var skewbInternalQuantumXPrime = new QuantumMove("Lv");
var skewbExternalQuantumY = new QuantumMove("y");
var skewbInternalQuantumY = new QuantumMove("Uv");
var skewbInternalQuantumYPrime = new QuantumMove("Dv");
var skewbExternalQuantumZ = new QuantumMove("z");
var skewbInternalQuantumZ = new QuantumMove("Fv");
var skewbInternalQuantumZPrime = new QuantumMove("Bv");
var SkewbNotationMapper = class {
  constructor(child) {
    this.child = child;
  }
  notationToInternal(move) {
    if (move.innerLayer || move.outerLayer) {
      return null;
    }
    const newFamily = skewbFamilyMap[move.family];
    if (newFamily) {
      return new Move(
        new QuantumMove(newFamily, move.outerLayer, move.innerLayer),
        move.amount
      );
    }
    if (skewbExternalQuantumX.isIdentical(move.quantum)) {
      return new Move(skewbInternalQuantumX, move.amount);
    }
    if (skewbExternalQuantumY.isIdentical(move.quantum)) {
      return new Move(skewbInternalQuantumY, move.amount);
    }
    if (skewbExternalQuantumZ.isIdentical(move.quantum)) {
      return new Move(skewbInternalQuantumZ, move.amount);
    }
    return null;
  }
  // we never rewrite click moves to these moves.
  notationToExternal(move) {
    for (const [external, internal] of Object.entries(skewbFamilyMap)) {
      if (this.child.spinmatchv(move.family, internal)) {
        return new Move(
          new QuantumMove(external, move.innerLayer, move.outerLayer),
          move.amount
        );
      }
    }
    if (skewbInternalQuantumX.isIdentical(move.quantum)) {
      return new Move(skewbExternalQuantumX, move.amount);
    }
    if (skewbInternalQuantumXPrime.isIdentical(move.quantum)) {
      return new Move(skewbExternalQuantumX, -move.amount);
    }
    if (skewbInternalQuantumY.isIdentical(move.quantum)) {
      return new Move(skewbExternalQuantumY, move.amount);
    }
    if (skewbInternalQuantumYPrime.isIdentical(move.quantum)) {
      return new Move(skewbExternalQuantumY, -move.amount);
    }
    if (skewbInternalQuantumZ.isIdentical(move.quantum)) {
      return new Move(skewbExternalQuantumZ, move.amount);
    }
    if (skewbInternalQuantumZPrime.isIdentical(move.quantum)) {
      return new Move(skewbExternalQuantumZ, -move.amount);
    }
    return null;
  }
};

// src/cubing/puzzle-geometry/notation-mapping/NotationMapper.ts
function remapKPuzzleDefinition(internalDefinition, notationMapper) {
  const externalDefinition = {
    ...internalDefinition,
    moves: {}
  };
  for (const [internalMoveName, transformationData] of Object.entries(
    internalDefinition.moves
  )) {
    let prefix = internalMoveName;
    let suffix = "";
    if (["v", "w"].includes(internalMoveName.at(-1))) {
      prefix = internalMoveName.slice(0, -1);
      suffix = internalMoveName.slice(-1);
    }
    const externalPrefix = notationMapper.notationToExternal(
      Move.fromString(prefix)
    );
    if (!externalPrefix) {
      continue;
    }
    const externalMoveName = externalPrefix + suffix;
    if (!externalMoveName) {
      throw new Error(
        `Missing external move name for: ${internalMoveName.toString()}`
      );
    }
    externalDefinition.moves[externalMoveName.toString()] = transformationData;
  }
  return externalDefinition;
}

// src/cubing/puzzle-geometry/Options.ts
var PuzzleGeometryFullOptions = class {
  verbosity = 0;
  // verbosity (console.log)
  allMoves = false;
  // generate all slice moves in ksolve
  outerBlockMoves = false;
  // generate outer block moves
  vertexMoves = false;
  // generate vertex moves
  addRotations = false;
  // add symmetry information to ksolve output
  moveList = null;
  // move list to generate
  fixedOrientation = false;
  // eliminate any orientations
  fixedPieceType = null;
  // fix a piece?
  orientCenters = false;
  // orient centers?
  // TODO: Group these into a single object?
  includeCornerOrbits = true;
  // include corner orbits
  includeCenterOrbits = true;
  // include center orbits
  includeEdgeOrbits = true;
  // include edge orbits
  // Overrides the previous options.
  excludeOrbits = [];
  // exclude these orbits
  optimizeOrbits = false;
  // optimize PermOri
  grayCorners = false;
  // make corner sets gray
  grayCenters = false;
  // make center sets gray
  grayEdges = false;
  // make edge sets gray
  puzzleOrientation = null;
  // single puzzle orientation from options
  puzzleOrientations = null;
  // puzzle orientation override object from options // TODO: is this needed?
  scrambleAmount = 0;
  // scramble?
  constructor(options = {}) {
    const optionsWithoutUndefined = Object.fromEntries(
      Object.entries(options).filter(
        ([_, value]) => typeof value !== "undefined"
      )
    );
    Object.assign(this, optionsWithoutUndefined);
  }
};

// src/cubing/puzzle-geometry/Perm.ts
var zeroCache = [];
var iotaCache = [];
function zeros(n) {
  if (!zeroCache[n]) {
    const c = Array(n);
    for (let i = 0; i < n; i++) {
      c[i] = 0;
    }
    zeroCache[n] = c;
  }
  return zeroCache[n];
}
function iota(n) {
  if (!iotaCache[n]) {
    const c = Array(n);
    for (let i = 0; i < n; i++) {
      c[i] = i;
    }
    iotaCache[n] = c;
  }
  return iotaCache[n];
}
function identity(n) {
  return new Perm(iota(n));
}
function factorial(a) {
  let r = BigInt(1);
  while (a > 1) {
    r *= BigInt(a);
    a--;
  }
  return r;
}
function gcd(a, b) {
  if (a > b) {
    const t = a;
    a = b;
    b = t;
  }
  while (a > 0) {
    const m = b % a;
    b = a;
    a = m;
  }
  return b;
}
function lcm(a, b) {
  return a / gcd(a, b) * b;
}
var Perm = class _Perm {
  n;
  // length
  p;
  // The permutation itself
  constructor(a) {
    this.n = a.length;
    this.p = a;
  }
  toString() {
    return `Perm[${this.p.join(" ")}]`;
  }
  mul(p2) {
    const c = Array(this.n);
    for (let i = 0; i < this.n; i++) {
      c[i] = p2.p[this.p[i]];
    }
    return new _Perm(c);
  }
  rmul(p2) {
    const c = Array(this.n);
    for (let i = 0; i < this.n; i++) {
      c[i] = this.p[p2.p[i]];
    }
    return new _Perm(c);
  }
  inv() {
    const c = Array(this.n);
    for (let i = 0; i < this.n; i++) {
      c[this.p[i]] = i;
    }
    return new _Perm(c);
  }
  compareTo(p2) {
    for (let i = 0; i < this.n; i++) {
      if (this.p[i] !== p2.p[i]) {
        return this.p[i] - p2.p[i];
      }
    }
    return 0;
  }
  toGap() {
    const cyc = [];
    const seen = new Array(this.n);
    for (let i = 0; i < this.p.length; i++) {
      if (seen[i] || this.p[i] === i) {
        continue;
      }
      const incyc = [];
      for (let j = this.p[i]; !seen[j]; j = this.p[j]) {
        incyc.push(1 + j);
        seen[j] = true;
      }
      cyc.push(`(${incyc.reverse().join(",")})`);
    }
    return cyc.join("");
  }
  toMathematica() {
    const cyc = [];
    const seen = new Array(this.n);
    for (let i = 0; i < this.p.length; i++) {
      if (seen[i] || this.p[i] === i) {
        continue;
      }
      const incyc = [];
      for (let j = this.p[i]; !seen[j]; j = this.p[j]) {
        incyc.push(1 + j);
        seen[j] = true;
      }
      cyc.push(`{${incyc.reverse().join(",")}}`);
    }
    return `Cycles[{${cyc.join(",")}}]`;
  }
  order() {
    let r = 1;
    const seen = new Array(this.n);
    for (let i = 0; i < this.p.length; i++) {
      if (seen[i] || this.p[i] === i) {
        continue;
      }
      let cs = 0;
      for (let j = i; !seen[j]; j = this.p[j]) {
        cs++;
        seen[j] = true;
      }
      r = lcm(r, cs);
    }
    return r;
  }
};

// src/cubing/puzzle-geometry/PermOriSet.ts
var PGOrbitDef = class {
  constructor(size, mod) {
    this.size = size;
    this.mod = mod;
  }
  reassemblySize() {
    return factorial(this.size) * BigInt(this.mod) ** BigInt(this.size);
  }
};
var lastGlobalDefinitionCounter = 0;
function externalName(mapper, moveString) {
  const mv = Move.fromString(moveString);
  const mv2 = mapper.notationToExternal(mv);
  if (mv2 === null || mv === mv2) {
    return moveString;
  }
  return mv2.toString();
}
var PGOrbitsDef = class _PGOrbitsDef {
  constructor(orbitnames, orbitdefs, solved, movenames, moveops, isRotation, forcenames) {
    this.orbitnames = orbitnames;
    this.orbitdefs = orbitdefs;
    this.solved = solved;
    this.movenames = movenames;
    this.moveops = moveops;
    this.isRotation = isRotation;
    this.forcenames = forcenames;
  }
  toKTransformationData(t) {
    const ktransformationData = {};
    for (let i = 0; i < this.orbitnames.length; i++) {
      ktransformationData[this.orbitnames[i]] = t.orbits[i].toKTransformationOrbitData();
    }
    return ktransformationData;
  }
  toKPatternData(t) {
    const kpatternData = {};
    for (let i = 0; i < this.orbitnames.length; i++) {
      kpatternData[this.orbitnames[i]] = t.orbits[i].toKPatternOrbitData();
    }
    return kpatternData;
  }
  // TODO: remove this
  static transformToKTransformationData(orbitnames, t) {
    const mp = {};
    for (let j = 0; j < orbitnames.length; j++) {
      mp[orbitnames[j]] = t.orbits[j].toKTransformationOrbitData();
    }
    return mp;
  }
  describeSet(s, r, mapper) {
    const n = this.orbitdefs[s].size;
    const m = new Array(n);
    for (let i = 0; i < n; i++) {
      m[i] = [];
    }
    for (let i = 0; i < this.movenames.length; i++) {
      if (this.isRotation[i]) {
        continue;
      }
      let mvname = this.movenames[i];
      if (!this.forcenames[i]) {
        mvname = externalName(mapper, mvname);
        if (mvname[mvname.length - 1] === "'") {
          mvname = mvname.substring(0, mvname.length - 1);
        }
      }
      const pd = this.moveops[i].orbits[s];
      for (let j = 0; j < n; j++) {
        if (pd.perm[j] !== j || pd.ori[j] !== 0) {
          m[j].push(mvname);
        }
      }
    }
    for (let j = 0; j < n; j++) {
      r.push(`# ${j + 1} ${m[j].join(" ")}`);
    }
  }
  toKsolve(name, mapper = new NullMapper()) {
    const result = [];
    result.push(`Name ${name}`);
    result.push("");
    for (let i = 0; i < this.orbitnames.length; i++) {
      result.push(
        `Set ${this.orbitnames[i]} ${this.orbitdefs[i].size} ${this.orbitdefs[i].mod}`
      );
      this.describeSet(i, result, mapper);
    }
    result.push("");
    result.push("Solved");
    for (let i = 0; i < this.orbitnames.length; i++) {
      this.solved.orbits[i].appendDefinition(
        result,
        this.orbitnames[i],
        false,
        false
      );
    }
    result.push("End");
    for (let i = 0; i < this.movenames.length; i++) {
      result.push("");
      let name2 = this.movenames[i];
      if (!this.forcenames[i]) {
        name2 = externalName(mapper, this.movenames[i]);
      }
      let doinv = false;
      if (name2[name2.length - 1] === "'") {
        doinv = true;
        name2 = name2.substring(0, name2.length - 1);
      }
      result.push(`Move ${name2}`);
      for (let j = 0; j < this.orbitnames.length; j++) {
        if (doinv) {
          this.moveops[i].orbits[j].inv().appendDefinition(result, this.orbitnames[j], true);
        } else {
          this.moveops[i].orbits[j].appendDefinition(
            result,
            this.orbitnames[j],
            true
          );
        }
      }
      result.push("End");
    }
    return result;
  }
  // TODO: return type.
  toKPuzzleDefinition(includemoves) {
    const orbits = [];
    const defaultPatternData = {};
    for (let i = 0; i < this.orbitnames.length; i++) {
      orbits.push({
        orbitName: this.orbitnames[i],
        numPieces: this.orbitdefs[i].size,
        numOrientations: this.orbitdefs[i].mod
      });
      const defaultPatternFrom = this.solved.orbits[i].toKTransformationOrbitData();
      defaultPatternData[this.orbitnames[i]] = {
        pieces: defaultPatternFrom.permutation,
        orientation: defaultPatternFrom.orientationDelta
      };
    }
    const moves = {};
    if (includemoves) {
      for (let i = 0; i < this.movenames.length; i++) {
        moves[this.movenames[i]] = this.toKTransformationData(this.moveops[i]);
      }
    }
    return {
      name: `PG3D #${++lastGlobalDefinitionCounter}`,
      orbits,
      defaultPattern: defaultPatternData,
      moves
    };
  }
  optimize() {
    const neworbitnames = [];
    const neworbitdefs = [];
    const newsolved = [];
    const newmoveops = [];
    for (let j = 0; j < this.moveops.length; j++) {
      newmoveops.push([]);
    }
    for (let i = 0; i < this.orbitdefs.length; i++) {
      const om = this.orbitdefs[i].mod;
      const n = this.orbitdefs[i].size;
      const du = new DisjointUnion(n);
      const changed = new Array(this.orbitdefs[i].size);
      for (let k = 0; k < n; k++) {
        changed[k] = false;
      }
      for (let j = 0; j < this.moveops.length; j++) {
        for (let k = 0; k < n; k++) {
          if (this.moveops[j].orbits[i].perm[k] !== k || this.moveops[j].orbits[i].ori[k] !== 0) {
            if (!this.isRotation[j]) {
              changed[k] = true;
            }
            du.union(k, this.moveops[j].orbits[i].perm[k]);
          }
        }
      }
      let keepori = true;
      if (om > 1) {
        keepori = false;
        const duo = new DisjointUnion(this.orbitdefs[i].size * om);
        for (let j = 0; j < this.moveops.length; j++) {
          for (let k = 0; k < n; k++) {
            if (this.moveops[j].orbits[i].perm[k] !== k || this.moveops[j].orbits[i].ori[k] !== 0) {
              for (let o = 0; o < om; o++) {
                duo.union(
                  k * om + o,
                  this.moveops[j].orbits[i].perm[k] * om + (o + this.moveops[j].orbits[i].ori[k]) % om
                );
              }
            }
          }
        }
        for (let j = 0; !keepori && j < n; j++) {
          for (let o = 1; o < om; o++) {
            if (duo.find(j * om) === duo.find(j * om + o)) {
              keepori = true;
            }
          }
        }
        for (let j = 0; !keepori && j < n; j++) {
          for (let k = 0; k < j; k++) {
            if (this.solved.orbits[i].perm[j] === this.solved.orbits[i].perm[k]) {
              keepori = true;
            }
          }
        }
      }
      let nontriv = -1;
      let multiple = false;
      for (let j = 0; j < this.orbitdefs[i].size; j++) {
        if (changed[j]) {
          const h = du.find(j);
          if (nontriv < 0) {
            nontriv = h;
          } else if (nontriv !== h) {
            multiple = true;
          }
        }
      }
      for (let j = 0; j < this.orbitdefs[i].size; j++) {
        if (!changed[j]) {
          continue;
        }
        const h = du.find(j);
        if (h !== j) {
          continue;
        }
        const no = [];
        const on = [];
        let nv = 0;
        for (let k = 0; k < this.orbitdefs[i].size; k++) {
          if (du.find(k) === j) {
            no[nv] = k;
            on[k] = nv;
            nv++;
          }
        }
        if (multiple) {
          neworbitnames.push(`${this.orbitnames[i]}_p${j}`);
        } else {
          neworbitnames.push(this.orbitnames[i]);
        }
        if (keepori) {
          neworbitdefs.push(new PGOrbitDef(nv, this.orbitdefs[i].mod));
          newsolved.push(this.solved.orbits[i].remapVS(no, nv));
          for (let k = 0; k < this.moveops.length; k++) {
            newmoveops[k].push(this.moveops[k].orbits[i].remap(no, on, nv));
          }
        } else {
          neworbitdefs.push(new PGOrbitDef(nv, 1));
          newsolved.push(this.solved.orbits[i].remapVS(no, nv).killOri());
          for (let k = 0; k < this.moveops.length; k++) {
            newmoveops[k].push(
              this.moveops[k].orbits[i].remap(no, on, nv).killOri()
            );
          }
        }
      }
    }
    return new _PGOrbitsDef(
      neworbitnames,
      neworbitdefs,
      new VisibleState(newsolved),
      this.movenames,
      newmoveops.map((_) => new PGTransform(_)),
      this.isRotation,
      this.forcenames
    );
  }
  // replace the solved state with a new scrambled state.
  scramble(n) {
    this.solved = this.solved.mul(this.getScrambleTransformation(n));
  }
  // generate a new "random" position based on an entropy pool
  // this should be significantly faster and more random than just
  // doing a large number of random moves, especially on big puzzles.
  getScrambleTransformation(n) {
    if (n < 100) {
      n = 100;
    }
    const pool = [];
    for (let i = 0; i < this.moveops.length; i++) {
      pool[i] = this.moveops[i];
    }
    for (let i = 0; i < pool.length; i++) {
      const j = Math.floor(Math.random() * pool.length);
      const t = pool[i];
      pool[i] = pool[j];
      pool[j] = t;
    }
    if (n < pool.length) {
      n = pool.length;
    }
    for (let i = 0; i < n; i++) {
      const ri = Math.floor(Math.random() * pool.length);
      const rj = Math.floor(Math.random() * pool.length);
      const rm = Math.floor(Math.random() * this.moveops.length);
      pool[ri] = pool[ri].mul(pool[rj]).mul(this.moveops[rm]);
      if (Math.random() < 0.1) {
        pool[ri] = pool[ri].mul(this.moveops[rm]);
      }
    }
    let s = pool[0];
    for (let i = 1; i < pool.length; i++) {
      s = s.mul(pool[i]);
    }
    return s;
  }
  reassemblySize() {
    let n = BigInt(1);
    for (let i = 0; i < this.orbitdefs.length; i++) {
      n *= this.orbitdefs[i].reassemblySize();
    }
    return n;
  }
};
var PGOrbit = class _PGOrbit {
  constructor(perm, ori, orimod) {
    this.perm = perm;
    this.ori = ori;
    this.orimod = orimod;
  }
  static ktransformationCache = [];
  static e(n, mod) {
    return new _PGOrbit(iota(n), zeros(n), mod);
  }
  mul(b) {
    const n = this.perm.length;
    const newPerm = new Array(n);
    if (this.orimod === 1) {
      for (let i = 0; i < n; i++) {
        newPerm[i] = this.perm[b.perm[i]];
      }
      return new _PGOrbit(newPerm, this.ori, this.orimod);
    } else {
      const newOri = new Array(n);
      for (let i = 0; i < n; i++) {
        newPerm[i] = this.perm[b.perm[i]];
        newOri[i] = (this.ori[b.perm[i]] + b.ori[i]) % this.orimod;
      }
      return new _PGOrbit(newPerm, newOri, this.orimod);
    }
  }
  inv() {
    const n = this.perm.length;
    const newPerm = new Array(n);
    const newOri = new Array(n);
    for (let i = 0; i < n; i++) {
      newPerm[this.perm[i]] = i;
      newOri[this.perm[i]] = (this.orimod - this.ori[i]) % this.orimod;
    }
    return new _PGOrbit(newPerm, newOri, this.orimod);
  }
  equal(b) {
    const n = this.perm.length;
    for (let i = 0; i < n; i++) {
      if (this.perm[i] !== b.perm[i] || this.ori[i] !== b.ori[i]) {
        return false;
      }
    }
    return true;
  }
  // in-place mutator
  killOri() {
    const n = this.perm.length;
    for (let i = 0; i < n; i++) {
      this.ori[i] = 0;
    }
    this.orimod = 1;
    return this;
  }
  toPerm() {
    const o = this.orimod;
    if (o === 1) {
      return new Perm(this.perm);
    }
    const n = this.perm.length;
    const newPerm = new Array(n * o);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < o; j++) {
        newPerm[i * o + j] = o * this.perm[i] + (this.ori[i] + j) % o;
      }
    }
    return new Perm(newPerm);
  }
  // returns tuple of sets of identical pieces in this orbit
  identicalPieces() {
    const done = [];
    const n = this.perm.length;
    const r = [];
    for (let i = 0; i < n; i++) {
      const v = this.perm[i];
      if (done[v] === void 0) {
        const s = [i];
        done[v] = true;
        for (let j = i + 1; j < n; j++) {
          if (this.perm[j] === v) {
            s.push(j);
          }
        }
        r.push(s);
      }
    }
    return r;
  }
  order() {
    return this.toPerm().order();
  }
  isIdentity() {
    const n = this.perm.length;
    if (this.perm === iota(n) && this.ori === zeros(n)) {
      return true;
    }
    for (let i = 0; i < n; i++) {
      if (this.perm[i] !== i || this.ori[i] !== 0) {
        return false;
      }
    }
    return true;
  }
  zeroOris() {
    const n = this.perm.length;
    if (this.ori === zeros(n)) {
      return true;
    }
    for (let i = 0; i < n; i++) {
      if (this.ori[i] !== 0) {
        return false;
      }
    }
    return true;
  }
  remap(no, on, nv) {
    const newPerm = new Array(nv);
    const newOri = new Array(nv);
    for (let i = 0; i < nv; i++) {
      newPerm[i] = on[this.perm[no[i]]];
      newOri[i] = this.ori[no[i]];
    }
    return new _PGOrbit(newPerm, newOri, this.orimod);
  }
  remapVS(no, nv) {
    const newPerm = new Array(nv);
    const newOri = new Array(nv);
    let nextNew = 0;
    const reassign = [];
    for (let i = 0; i < nv; i++) {
      const ov = this.perm[no[i]];
      if (reassign[ov] === void 0) {
        reassign[ov] = nextNew++;
      }
      newPerm[i] = reassign[ov];
      newOri[i] = this.ori[no[i]];
    }
    return new _PGOrbit(newPerm, newOri, this.orimod);
  }
  appendDefinition(result, name, useVS, concise = true) {
    if (concise && this.isIdentity()) {
      return;
    }
    result.push(name);
    result.push(this.perm.map((_) => _ + 1).join(" "));
    if (!this.zeroOris()) {
      if (useVS) {
        const newori = new Array(this.ori.length);
        for (let i = 0; i < newori.length; i++) {
          newori[this.perm[i]] = this.ori[i];
        }
        result.push(newori.join(" "));
      } else {
        result.push(this.ori.join(" "));
      }
    }
  }
  toKTransformationOrbitData() {
    const n = this.perm.length;
    if (this.isIdentity()) {
      if (!_PGOrbit.ktransformationCache[n]) {
        _PGOrbit.ktransformationCache[n] = {
          permutation: iota(n),
          orientationDelta: zeros(n)
        };
      }
      return _PGOrbit.ktransformationCache[n];
    } else {
      return { permutation: this.perm, orientationDelta: this.ori };
    }
  }
  toKPatternOrbitData() {
    const n = this.perm.length;
    return {
      pieces: this.perm,
      orientation: this.ori,
      orientationMod: zeros(n)
    };
  }
};
var PGTransformBase = class {
  constructor(orbits) {
    this.orbits = orbits;
  }
  internalMul(b) {
    const newOrbits = [];
    for (let i = 0; i < this.orbits.length; i++) {
      newOrbits.push(this.orbits[i].mul(b.orbits[i]));
    }
    return newOrbits;
  }
  internalInv() {
    const newOrbits = [];
    for (const orbit of this.orbits) {
      newOrbits.push(orbit.inv());
    }
    return newOrbits;
  }
  equal(b) {
    for (let i = 0; i < this.orbits.length; i++) {
      if (!this.orbits[i].equal(b.orbits[i])) {
        return false;
      }
    }
    return true;
  }
  killOri() {
    for (const orbit of this.orbits) {
      orbit.killOri();
    }
    return this;
  }
  toPerm() {
    const perms = [];
    let n = 0;
    for (const orbit of this.orbits) {
      const p = orbit.toPerm();
      perms.push(p);
      n += p.n;
    }
    const newPerm = new Array(n);
    n = 0;
    for (const p of perms) {
      for (let j = 0; j < p.n; j++) {
        newPerm[n + j] = n + p.p[j];
      }
      n += p.n;
    }
    return new Perm(newPerm);
  }
  identicalPieces() {
    const r = [];
    let n = 0;
    for (const orbit of this.orbits) {
      const o = orbit.orimod;
      const s = orbit.identicalPieces();
      for (let j = 0; j < s.length; j++) {
        r.push(s[j].map((_) => _ * o + n));
      }
      n += o * orbit.perm.length;
    }
    return r;
  }
  order() {
    let r = 1;
    for (const orbit of this.orbits) {
      r = lcm(r, orbit.order());
    }
    return r;
  }
};
var PGTransform = class _PGTransform extends PGTransformBase {
  mul(b) {
    return new _PGTransform(this.internalMul(b));
  }
  mulScalar(n) {
    if (n === 0) {
      return this.e();
    }
    let t = this;
    if (n < 0) {
      t = t.inv();
      n = -n;
    }
    while ((n & 1) === 0) {
      t = t.mul(t);
      n >>= 1;
    }
    if (n === 1) {
      return t;
    }
    let s = t;
    let r = this.e();
    while (n > 0) {
      if (n & 1) {
        r = r.mul(s);
      }
      if (n > 1) {
        s = s.mul(s);
      }
      n >>= 1;
    }
    return r;
  }
  inv() {
    return new _PGTransform(this.internalInv());
  }
  e() {
    return new _PGTransform(
      this.orbits.map((_) => PGOrbit.e(_.perm.length, _.orimod))
    );
  }
};
var VisibleState = class _VisibleState extends PGTransformBase {
  mul(b) {
    return new _VisibleState(this.internalMul(b));
  }
};
var DisjointUnion = class {
  constructor(n) {
    this.n = n;
    this.heads = new Array(n);
    for (let i = 0; i < n; i++) {
      this.heads[i] = i;
    }
  }
  heads;
  find(v) {
    let h = this.heads[v];
    if (this.heads[h] === h) {
      return h;
    }
    h = this.find(this.heads[h]);
    this.heads[v] = h;
    return h;
  }
  union(a, b) {
    const ah = this.find(a);
    const bh = this.find(b);
    if (ah < bh) {
      this.heads[bh] = ah;
    } else if (ah > bh) {
      this.heads[ah] = bh;
    }
  }
};
function showcanon(g, disp) {
  const n = g.moveops.length;
  if (n > 30) {
    throw new Error("Canon info too big for bitmask");
  }
  const orders = [];
  const commutes = [];
  for (let i = 0; i < n; i++) {
    const permA = g.moveops[i];
    orders.push(permA.order());
    let bits = 0;
    for (let j = 0; j < n; j++) {
      if (j === i) {
        continue;
      }
      const permB = g.moveops[j];
      if (permA.mul(permB).equal(permB.mul(permA))) {
        bits |= 1 << j;
      }
    }
    commutes.push(bits);
  }
  let curlev = {};
  curlev[0] = 1;
  for (let d = 0; d < 100; d++) {
    let sum = 0;
    const nextlev = {};
    let uniq = 0;
    for (const sti in curlev) {
      const st = +sti;
      const cnt = curlev[st];
      sum += cnt;
      uniq++;
      for (let mv = 0; mv < orders.length; mv++) {
        if ((st >> mv & 1) === 0 && (st & commutes[mv] & (1 << mv) - 1) === 0) {
          const nst = st & commutes[mv] | 1 << mv;
          if (nextlev[nst] === void 0) {
            nextlev[nst] = 0;
          }
          nextlev[nst] += (orders[mv] - 1) * cnt;
        }
      }
    }
    disp(`${d}: canonseq ${sum} states ${uniq}`);
    curlev = nextlev;
  }
}

// src/cubing/puzzle-geometry/Quat.ts
var eps = 1e-9;
function centermassface(face) {
  let s = new Quat(0, 0, 0, 0);
  for (let i = 0; i < face.length; i++) {
    s = s.sum(face[i]);
  }
  return s.smul(1 / face.length);
}
function solvethreeplanes(p1, p2, p3, planes) {
  const p = planes[p1].intersect3(planes[p2], planes[p3]);
  if (!p) {
    return p;
  }
  for (let i = 0; i < planes.length; i++) {
    if (i !== p1 && i !== p2 && i !== p3) {
      const dt = planes[i].b * p.b + planes[i].c * p.c + planes[i].d * p.d;
      if (planes[i].a > 0 && dt > planes[i].a || planes[i].a < 0 && dt < planes[i].a) {
        return false;
      }
    }
  }
  return p;
}
var Quat = class _Quat {
  constructor(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }
  mul(q) {
    return new _Quat(
      this.a * q.a - this.b * q.b - this.c * q.c - this.d * q.d,
      this.a * q.b + this.b * q.a + this.c * q.d - this.d * q.c,
      this.a * q.c - this.b * q.d + this.c * q.a + this.d * q.b,
      this.a * q.d + this.b * q.c - this.c * q.b + this.d * q.a
    );
  }
  toString() {
    return `Q[${this.a},${this.b},${this.c},${this.d}]`;
  }
  dist(q) {
    return Math.hypot(this.a - q.a, this.b - q.b, this.c - q.c, this.d - q.d);
  }
  len() {
    return Math.hypot(this.a, this.b, this.c, this.d);
  }
  cross(q) {
    return new _Quat(
      0,
      this.c * q.d - this.d * q.c,
      this.d * q.b - this.b * q.d,
      this.b * q.c - this.c * q.b
    );
  }
  dot(q) {
    return this.b * q.b + this.c * q.c + this.d * q.d;
  }
  normalize() {
    const d = Math.sqrt(this.dot(this));
    return new _Quat(this.a / d, this.b / d, this.c / d, this.d / d);
  }
  makenormal() {
    return new _Quat(0, this.b, this.c, this.d).normalize();
  }
  normalizeplane() {
    const d = Math.hypot(this.b, this.c, this.d);
    return new _Quat(this.a / d, this.b / d, this.c / d, this.d / d);
  }
  smul(m) {
    return new _Quat(this.a * m, this.b * m, this.c * m, this.d * m);
  }
  sum(q) {
    return new _Quat(this.a + q.a, this.b + q.b, this.c + q.c, this.d + q.d);
  }
  sub(q) {
    return new _Quat(this.a - q.a, this.b - q.b, this.c - q.c, this.d - q.d);
  }
  angle() {
    return 2 * Math.acos(this.a);
  }
  invrot() {
    return new _Quat(this.a, -this.b, -this.c, -this.d);
  }
  det3x3(a00, a01, a02, a10, a11, a12, a20, a21, a22) {
    return a00 * (a11 * a22 - a12 * a21) + a01 * (a12 * a20 - a10 * a22) + a02 * (a10 * a21 - a11 * a20);
  }
  rotateplane(q) {
    const t = q.mul(new _Quat(0, this.b, this.c, this.d)).mul(q.invrot());
    t.a = this.a;
    return t;
  }
  // return any vector orthogonal to the given one.  Find the smallest
  // component (in absolute value) and return the cross product of that
  // axis with the given vector.
  orthogonal() {
    const ab = Math.abs(this.b);
    const ac = Math.abs(this.c);
    const ad = Math.abs(this.d);
    if (ab < ac && ab < ad) {
      return this.cross(new _Quat(0, 1, 0, 0)).normalize();
    } else if (ac < ab && ac < ad) {
      return this.cross(new _Quat(0, 0, 1, 0)).normalize();
    } else {
      return this.cross(new _Quat(0, 0, 0, 1)).normalize();
    }
  }
  // return the Quaternion that will rotate the this vector
  // to the b vector through rotatepoint.
  pointrotation(b) {
    const a = this.normalize();
    b = b.normalize();
    if (a.sub(b).len() < eps) {
      return new _Quat(1, 0, 0, 0);
    }
    let h = a.sum(b);
    if (h.len() < eps) {
      h = h.orthogonal();
    } else {
      h = h.normalize();
    }
    const r = a.cross(h);
    r.a = a.dot(h);
    return r;
  }
  // given two vectors, return the portion of the first that
  // is not in the direction of the second.
  unproject(b) {
    return this.sum(b.smul(-this.dot(b) / (this.len() * b.len())));
  }
  rotatepoint(q) {
    return q.mul(this).mul(q.invrot());
  }
  rotateface(face) {
    return face.map((_) => _.rotatepoint(this));
  }
  intersect3(p2, p3) {
    const det = this.det3x3(
      this.b,
      this.c,
      this.d,
      p2.b,
      p2.c,
      p2.d,
      p3.b,
      p3.c,
      p3.d
    );
    if (Math.abs(det) < eps) {
      return false;
    }
    return new _Quat(
      0,
      this.det3x3(this.a, this.c, this.d, p2.a, p2.c, p2.d, p3.a, p3.c, p3.d) / det,
      this.det3x3(this.b, this.a, this.d, p2.b, p2.a, p2.d, p3.b, p3.a, p3.d) / det,
      this.det3x3(this.b, this.c, this.a, p2.b, p2.c, p2.a, p3.b, p3.c, p3.a) / det
    );
  }
  side(x) {
    if (x > eps) {
      return 1;
    }
    if (x < -eps) {
      return -1;
    }
    return 0;
  }
  /**
   * Cuts a face by this plane, or returns null if there
   * is no intersection.
   * @param face The face to cut.
   */
  cutface(face) {
    const d = this.a;
    let seen = 0;
    let r = null;
    for (let i = 0; i < face.length; i++) {
      seen |= 1 << this.side(face[i].dot(this) - d) + 1;
    }
    if ((seen & 5) === 5) {
      r = [];
      const inout = face.map((_) => this.side(_.dot(this) - d));
      for (let s = -1; s <= 1; s += 2) {
        const nface = [];
        for (let k = 0; k < face.length; k++) {
          if (inout[k] === s || inout[k] === 0) {
            nface.push(face[k]);
          }
          const kk = (k + 1) % face.length;
          if (inout[k] + inout[kk] === 0 && inout[k] !== 0) {
            const vk = face[k].dot(this) - d;
            const vkk = face[kk].dot(this) - d;
            const r2 = vk / (vk - vkk);
            const pt = face[k].smul(1 - r2).sum(face[kk].smul(r2));
            nface.push(pt);
          }
        }
        r.push(nface);
      }
    }
    return r;
  }
  cutfaces(faces) {
    const nfaces = [];
    for (let j = 0; j < faces.length; j++) {
      const face = faces[j];
      const t = this.cutface(face);
      if (t) {
        nfaces.push(t[0]);
        nfaces.push(t[1]);
      } else {
        nfaces.push(face);
      }
    }
    return nfaces;
  }
  faceside(face) {
    const d = this.a;
    for (let i = 0; i < face.length; i++) {
      const s = this.side(face[i].dot(this) - d);
      if (s !== 0) {
        return s;
      }
    }
    throw new Error("Could not determine side of plane in faceside");
  }
  sameplane(p) {
    const a = this.normalize();
    const b = p.normalize();
    return a.dist(b) < eps || a.dist(b.smul(-1)) < eps;
  }
  makecut(r) {
    return new _Quat(r, this.b, this.c, this.d);
  }
};

// src/cubing/puzzle-geometry/PlatonicGenerator.ts
var eps2 = 1e-9;
function cube() {
  const s5 = Math.sqrt(0.5);
  return [new Quat(s5, s5, 0, 0), new Quat(s5, 0, s5, 0)];
}
function tetrahedron() {
  return [new Quat(0.5, 0.5, 0.5, 0.5), new Quat(0.5, 0.5, 0.5, -0.5)];
}
function dodecahedron() {
  const d36 = 2 * Math.PI / 10;
  let dx = 0.5 + 0.3 * Math.sqrt(5);
  let dy = 0.5 + 0.1 * Math.sqrt(5);
  const dd = Math.sqrt(dx * dx + dy * dy);
  dx /= dd;
  dy /= dd;
  return [
    new Quat(Math.cos(d36), dx * Math.sin(d36), dy * Math.sin(d36), 0),
    new Quat(0.5, 0.5, 0.5, 0.5)
  ];
}
function icosahedron() {
  let dx = 1 / 6 + Math.sqrt(5) / 6;
  let dy = 2 / 3 + Math.sqrt(5) / 3;
  const dd = Math.sqrt(dx * dx + dy * dy);
  dx /= dd;
  dy /= dd;
  const ang = 2 * Math.PI / 6;
  return [
    new Quat(Math.cos(ang), dx * Math.sin(ang), dy * Math.sin(ang), 0),
    new Quat(Math.cos(ang), -dx * Math.sin(ang), dy * Math.sin(ang), 0)
  ];
}
function octahedron() {
  const s5 = Math.sqrt(0.5);
  return [new Quat(0.5, 0.5, 0.5, 0.5), new Quat(s5, 0, 0, s5)];
}
function closure(g) {
  const q = [new Quat(1, 0, 0, 0)];
  for (let i = 0; i < q.length; i++) {
    for (let j = 0; j < g.length; j++) {
      const ns = g[j].mul(q[i]);
      const negns = ns.smul(-1);
      let wasseen = false;
      for (let k = 0; k < q.length; k++) {
        if (ns.dist(q[k]) < eps2 || negns.dist(q[k]) < eps2) {
          wasseen = true;
          break;
        }
      }
      if (!wasseen) {
        q.push(ns);
      }
    }
  }
  return q;
}
function uniqueplanes(p, g) {
  const planes = [];
  const planerot = [];
  for (let i = 0; i < g.length; i++) {
    const p2 = p.rotateplane(g[i]);
    let wasseen = false;
    for (let j = 0; j < planes.length; j++) {
      if (p2.dist(planes[j]) < eps2) {
        wasseen = true;
        break;
      }
    }
    if (!wasseen) {
      planes.push(p2);
      planerot.push(g[i]);
    }
  }
  return planerot;
}
function getface(planes) {
  const face = [];
  for (let i = 1; i < planes.length; i++) {
    for (let j = i + 1; j < planes.length; j++) {
      const p = solvethreeplanes(0, i, j, planes);
      if (p) {
        let wasseen = false;
        for (let k = 0; k < face.length; k++) {
          if (p.dist(face[k]) < eps2) {
            wasseen = true;
            break;
          }
        }
        if (!wasseen) {
          face.push(p);
        }
      }
    }
  }
  for (; ; ) {
    let changed = false;
    for (let i = 0; i < face.length; i++) {
      const j = (i + 1) % face.length;
      if (planes[0].dot(face[i].cross(face[j])) < 0) {
        const t = face[i];
        face[i] = face[j];
        face[j] = t;
        changed = true;
      }
    }
    if (!changed) {
      break;
    }
  }
  return face;
}

// src/cubing/puzzle-geometry/pgPuzzles.ts
var pgPuzzle = {
  "2x2x2": "c f 0",
  "3x3x3": "c f 0.333333333333333",
  "4x4x4": "c f 0.5 f 0",
  "5x5x5": "c f 0.6 f 0.2",
  "6x6x6": "c f 0.666666666666667 f 0.333333333333333 f 0",
  "7x7x7": "c f 0.714285714285714 f 0.428571428571429 f 0.142857142857143",
  "8x8x8": "c f 0.75 f 0.5 f 0.25 f 0",
  "9x9x9": "c f 0.777777777777778 f 0.555555555555556 f 0.333333333333333 f 0.111111111111111",
  "10x10x10": "c f 0.8 f 0.6 f 0.4 f 0.2 f 0",
  "11x11x11": "c f 0.818181818181818 f 0.636363636363636 f 0.454545454545455 f 0.272727272727273 f 0.0909090909090909",
  "12x12x12": "c f 0.833333333333333 f 0.666666666666667 f 0.5 f 0.333333333333333 f 0.166666666666667 f 0",
  "13x13x13": "c f 0.846153846153846 f 0.692307692307692 f 0.538461538461538 f 0.384615384615385 f 0.230769230769231 f 0.0769230769230769",
  "20x20x20": "c f 0 f .1 f .2 f .3 f .4 f .5 f .6 f .7 f .8 f .9",
  "30x30x30": "c f 0 f .066667 f .133333 f .2 f .266667 f .333333 f .4 f .466667 f .533333 f .6 f .666667 f .733333 f .8 f .866667 f .933333",
  "40x40x40": "c f 0 f .05 f .1 f .15 f .2 f .25 f .3 f .35 f .4 f .45 f .5 f .55 f .6 f .65 f .7 f .75 f .8 f .85 f .9 f .95",
  skewb: "c v 0",
  "master skewb": "c v 0.275",
  "professor skewb": "c v 0 v 0.38",
  "compy cube": "c v 0.915641442663986",
  helicopter: "c e 0.707106781186547",
  "curvy copter": "c e 0.83",
  dino: "c v 0.577350269189626",
  "little chop": "c e 0",
  pyramorphix: "t e 0",
  mastermorphix: "t e 0.346184634065199",
  pyraminx: "t v 0.333333333333333 v 1.66666666666667",
  tetraminx: "t v 0.333333333333333",
  "master pyraminx": "t v 0 v 1 v 2",
  "master tetraminx": "t v 0 v 1",
  "professor pyraminx": "t v -0.2 v 0.6 v 1.4 v 2.2",
  "professor tetraminx": "t v -0.2 v 0.6 v 1.4",
  "royal pyraminx": "t v -0.333333333333333 v 0.333333333333333 v 1 v 1.66666666666667 v 2.33333333333333",
  "royal tetraminx": "t v -0.333333333333333 v 0.333333333333333 v 1 v 1.66666666666667",
  "emperor pyraminx": "t v -0.428571428571429 v 0.142857142857143 v 0.714285714285714 v 1.28571428571429 v 1.85714285714286 v 2.42857142857143",
  "emperor tetraminx": "t v -0.428571428571429 v 0.142857142857143 v 0.714285714285714 v 1.28571428571429 v 1.85714285714286",
  "Jing pyraminx": "t f 0",
  "master pyramorphix": "t e 0.866025403784437",
  megaminx: "d f 0.7",
  gigaminx: "d f 0.64 f 0.82",
  teraminx: "d f 0.64 f 0.76 f 0.88",
  petaminx: "d f 0.64 f 0.73 f 0.82 f 0.91",
  examinx: "d f 0.64 f 0.712 f 0.784 f 0.856 f 0.928",
  zetaminx: "d f 0.64 f 0.7 f 0.76 f 0.82 f 0.88 f 0.94",
  yottaminx: "d f 0.64 f 0.6914 f 0.7429 f 0.7943 f 0.8457 f 0.8971 f 0.9486",
  pentultimate: "d f 0",
  "master pentultimate": "d f 0.1",
  "elite pentultimate": "d f 0 f 0.145905",
  // exact value for starminx is sqrt(5(5-2 sqrt(5))/3)
  starminx: "d v 0.937962370425399",
  "starminx 2": "d f 0.23606797749979",
  "pyraminx crystal": "d f 0.447213595499989",
  chopasaurus: "d v 0",
  "big chop": "d e 0",
  "skewb diamond": "o f 0",
  FTO: "o f 0.333333333333333",
  "master FTO": "o f 0.5 f 0",
  "Christopher's jewel": "o v 0.577350269189626",
  octastar: "o e 0",
  "Trajber's octahedron": "o v 0.433012701892219",
  "radio chop": "i f 0",
  icosamate: "i v 0",
  "Regular Astrominx": "i v 0.18759247376021",
  "Regular Astrominx + Big Chop": "i v 0.18759247376021 e 0",
  Redicosahedron: "i v 0.794654472291766",
  "Redicosahedron with centers": "i v 0.84",
  Icosaminx: "i v 0.73",
  "Eitan's star": "i f 0.61803398874989",
  "2x2x2 + dino": "c f 0 v 0.577350269189626",
  "2x2x2 + little chop": "c f 0 e 0",
  "dino + little chop": "c v 0.577350269189626 e 0",
  "2x2x2 + dino + little chop": "c f 0 v 0.577350269189626 e 0",
  "megaminx + chopasaurus": "d f 0.61803398875 v 0",
  "starminx combo": "d f 0.23606797749979 v 0.937962370425399"
};

// src/cubing/puzzle-geometry/SchreierSims.ts
var FactoredNumber = class {
  mult;
  constructor() {
    this.mult = [];
  }
  multiply(n) {
    for (let f = 2; f * f <= n; f++) {
      while (n % f === 0) {
        if (void 0 !== this.mult[f]) {
          this.mult[f]++;
        } else {
          this.mult[f] = 1;
        }
        n /= f;
      }
    }
    if (n > 1) {
      if (void 0 !== this.mult[n]) {
        this.mult[n]++;
      } else {
        this.mult[n] = 1;
      }
    }
  }
  toString() {
    let r = "";
    for (let i = 0; i < this.mult.length; i++) {
      if (void 0 !== this.mult[i]) {
        if (r !== "") {
          r += "*";
        }
        r += i;
        if (this.mult[i] > 1) {
          r += `^${this.mult[i]}`;
        }
      }
    }
    return r;
  }
};
function schreierSims(g, disp) {
  const n = g[0].p.length;
  const e = identity(n);
  let sgs = [];
  let sgsi = [];
  let sgslen = [];
  let Tk = [];
  let Tklen = [];
  function resolve(p) {
    for (let i = p.p.length - 1; i >= 0; i--) {
      const j = p.p[i];
      if (j !== i) {
        if (!sgs[i][j]) {
          return false;
        }
        p = p.mul(sgsi[i][j]);
      }
    }
    return true;
  }
  function knutha(k, p, len) {
    Tk[k].push(p);
    Tklen[k].push(len);
    for (let i = 0; i < sgs[k].length; i++) {
      if (sgs[k][i]) {
        knuthb(k, sgs[k][i].mul(p), len + sgslen[k][i]);
      }
    }
  }
  function knuthb(k, p, len) {
    const j = p.p[k];
    if (!sgs[k][j]) {
      sgs[k][j] = p;
      sgsi[k][j] = p.inv();
      sgslen[k][j] = len;
      for (let i = 0; i < Tk[k].length; i++) {
        knuthb(k, p.mul(Tk[k][i]), len + Tklen[k][i]);
      }
      return;
    }
    const p2 = p.mul(sgsi[k][j]);
    if (!resolve(p2)) {
      knutha(k - 1, p2, len + sgslen[k][j]);
    }
  }
  function getsgs() {
    sgs = [];
    sgsi = [];
    Tk = [];
    sgslen = [];
    Tklen = [];
    for (let i = 0; i < n; i++) {
      sgs.push([]);
      sgsi.push([]);
      sgslen.push([]);
      Tk.push([]);
      Tklen.push([]);
      sgs[i][i] = e;
      sgsi[i][i] = e;
      sgslen[i][i] = 0;
    }
    let none = 0;
    let sz = BigInt(1);
    for (let i = 0; i < g.length; i++) {
      knutha(n - 1, g[i], 1);
      sz = BigInt(1);
      let tks = 0;
      let sollen = 0;
      const avgs = [];
      const mults = new FactoredNumber();
      for (let j = 0; j < n; j++) {
        let cnt = 0;
        let lensum = 0;
        for (let k = 0; k < n; k++) {
          if (sgs[j][k]) {
            cnt++;
            lensum += sgslen[j][k];
            if (j !== k) {
              none++;
            }
          }
        }
        tks += Tk[j].length;
        sz *= BigInt(cnt);
        if (cnt > 1) {
          mults.multiply(cnt);
        }
        const avg = lensum / cnt;
        avgs.push(avg);
        sollen += avg;
      }
      disp(
        `${i}: sz ${sz} T ${tks} sol ${sollen} none ${none} mults ${mults.toString()}`
      );
    }
    return sz;
  }
  return getsgs();
}

// src/cubing/puzzle-geometry/PuzzleGeometry.ts
function tstart(s) {
  return s;
}
function tend(_) {
}
var Face = class _Face {
  coords;
  length;
  constructor(q) {
    this.coords = new Array(q.length * 3);
    for (let i = 0; i < q.length; i++) {
      this.coords[3 * i] = q[i].b;
      this.coords[3 * i + 1] = q[i].c;
      this.coords[3 * i + 2] = q[i].d;
    }
    this.length = q.length;
  }
  get(off) {
    return new Quat(
      0,
      this.coords[3 * off],
      this.coords[3 * off + 1],
      this.coords[3 * off + 2]
    );
  }
  centermass() {
    let sx = 0;
    let sy = 0;
    let sz = 0;
    for (let i = 0; i < this.length; i++) {
      sx += this.coords[3 * i];
      sy += this.coords[3 * i + 1];
      sz += this.coords[3 * i + 2];
    }
    return new Quat(0, sx / this.length, sy / this.length, sz / this.length);
  }
  rotate(q) {
    const a = [];
    for (let i = 0; i < this.length; i++) {
      a.push(this.get(i).rotatepoint(q));
    }
    return new _Face(a);
  }
  rotateforward() {
    const a = [];
    for (let i = 1; i < this.length; i++) {
      a.push(this.get(i));
    }
    a.push(this.get(0));
    return new _Face(a);
  }
};
var FaceTree = class _FaceTree {
  constructor(face, left, right) {
    this.face = face;
    this.left = left;
    this.right = right;
  }
  split(q) {
    const t = q.cutface(this.face);
    if (t !== null) {
      if (this.left === void 0) {
        this.left = new _FaceTree(t[0]);
        this.right = new _FaceTree(t[1]);
      } else {
        this.left = this.left?.split(q);
        this.right = this.right?.split(q);
      }
    }
    return this;
  }
  collect(arr, leftfirst) {
    if (this.left === void 0) {
      arr.push(new Face(this.face));
    } else if (leftfirst) {
      this.left?.collect(arr, false);
      this.right?.collect(arr, true);
    } else {
      this.right?.collect(arr, false);
      this.left?.collect(arr, true);
    }
    return arr;
  }
};
function expandfaces(rots, faces) {
  const nfaces = [];
  for (const rot of rots) {
    for (const face of faces) {
      nfaces.push(face.rotate(rot));
    }
  }
  return nfaces;
}
var eps3 = 1e-9;
var copyright = "PuzzleGeometry 0.1 Copyright 2018 Tomas Rokicki.";
var permissivieMoveParsing = false;
function defaultnets() {
  return {
    // four faces: tetrahedron
    4: [["F", "D", "L", "R"]],
    // six faces: cube
    6: [
      ["F", "D", "L", "U", "R"],
      ["R", "F", "", "B", ""]
    ],
    // eight faces: octahedron
    8: [
      ["F", "D", "L", "R"],
      ["D", "F", "BR", ""],
      ["BR", "D", "", "BB"],
      ["BB", "BR", "U", "BL"]
    ],
    // twelve faces:  dodecahedron; U/F/R/F/BL/BR from megaminx
    12: [
      ["U", "F", "", "", "", ""],
      ["F", "U", "R", "C", "A", "L"],
      ["R", "F", "", "", "E", ""],
      ["E", "R", "", "BF", "", ""],
      ["BF", "E", "BR", "BL", "I", "D"]
    ],
    // twenty faces: icosahedron
    20: [
      ["R", "C", "F", "E"],
      ["F", "R", "L", "U"],
      ["L", "F", "A", ""],
      ["E", "R", "G", "I"],
      ["I", "E", "S", "H"],
      ["S", "I", "J", "B"],
      ["B", "S", "K", "D"],
      ["K", "B", "M", "O"],
      ["O", "K", "P", "N"],
      ["P", "O", "Q", ""]
    ]
  };
}
var orientationDefaults = {
  4: {
    v: ["DFR", "DLF", "DRL", "FLR"],
    e: ["FR", "LF", "DF", "DL", "RD", "RL"],
    c: ["DF", "FD", "RL", "LR"]
  },
  6: {
    v: ["URF", "UBR", "ULB", "UFL", "DFR", "DRB", "DBL", "DLF"],
    e: ["UF", "UR", "UB", "UL", "DF", "DR", "DB", "DL", "FR", "FL", "BR", "BL"],
    c: ["UB", "LU", "FU", "RU", "BU", "DF"]
  },
  8: {
    v: ["UBBBRR", "URFL", "ULBLBB", "DBRBBBL", "DBLLF", "DFRBR"],
    e: [
      "UL",
      "UBB",
      "UR",
      "BRD",
      "BLD",
      "FD",
      "BRR",
      "FR",
      "FL",
      "BLL",
      "BLBB",
      "BRBB"
    ],
    c: ["BBU", "LU", "RU", "BRD", "FD", "BLD", "DF", "UBB"]
  },
  12: {
    v: [
      "URF",
      "UFL",
      "ULBL",
      "UBLBR",
      "UBRR",
      "DEBF",
      "DBFI",
      "DIA",
      "DAC",
      "DCE",
      "LAI",
      "ALF",
      "FCA",
      "CFR",
      "REC",
      "ERBR",
      "BRBFE",
      "BFBRBL",
      "BLIBF",
      "IBLL"
    ],
    e: [
      "UF",
      "UR",
      "UBR",
      "UBL",
      "UL",
      "ER",
      "EBR",
      "EBF",
      "ED",
      "EC",
      "IBF",
      "IBL",
      "IL",
      "IA",
      "ID",
      "AC",
      "CF",
      "FA",
      "BFBR",
      "BRBL",
      "BLBF",
      "CD",
      "AD",
      "AL",
      "FL",
      "FR",
      "CR",
      "BFD",
      "BRR",
      "BLL"
    ],
    c: [
      "UF",
      "FU",
      "DBF",
      "BFD",
      "AD",
      "CD",
      "BRU",
      "BLU",
      "LA",
      "RA",
      "EBR",
      "IBL"
    ]
  },
  20: {
    v: [
      "FLPQU",
      "FUGER",
      "FRCAL",
      "HCREI",
      "ISBDH",
      "JSIEG",
      "BSJMK",
      "MQPOK",
      "ONDBK",
      "NOPLA",
      "UQMJG",
      "DNACH"
    ],
    e: [
      "FU",
      "FL",
      "FR",
      "EG",
      "ER",
      "EI",
      "SJ",
      "SI",
      "SB",
      "KM",
      "KB",
      "KO",
      "PQ",
      "PO",
      "PL",
      "UG",
      "JG",
      "MQ",
      "UQ",
      "HC",
      "HD",
      "ND",
      "NA",
      "JM",
      "CA",
      "AL",
      "CR",
      "HI",
      "DB",
      "NO"
    ],
    c: [
      "FU",
      "UF",
      "GE",
      "EG",
      "JS",
      "SJ",
      "MK",
      "KM",
      "QP",
      "PQ",
      "LA",
      "AL",
      "RC",
      "CR",
      "IH",
      "HI",
      "BD",
      "DB",
      "ON",
      "NO"
    ]
  }
};
function defaultOrientations() {
  return {
    4: [
      ["FLR", [0, 1, 0]],
      ["F", [0, 0, 1]]
    ],
    // FLR towards viewer
    6: [
      ["U", [0, 1, 0]],
      ["F", [0, 0, 1]]
    ],
    // URF towards viewer
    8: [
      ["U", [0, 1, 0]],
      ["F", [0, 0, 1]]
    ],
    // FLUR towards viewer
    12: [
      ["U", [0, 1, 0]],
      ["F", [0, 0, 1]]
    ],
    // F towards viewer
    20: [
      ["GUQMJ", [0, 1, 0]],
      ["F", [0, 0, 1]]
    ]
    // F towards viewer
  };
}
function findelement(a, p) {
  for (let i = 0; i < a.length; i++) {
    if (a[i][0].dist(p) < eps3) {
      return i;
    }
  }
  throw Error("Element not found");
}
function getPG3DNamedPuzzles() {
  return pgPuzzle;
}
function getPuzzleDescriptionString(puzzleName) {
  return pgPuzzle[puzzleName];
}
var PUZZLE_BASE_SHAPES = ["c", "t", "o", "d", "i"];
var PUZZLE_CUT_TYPES = ["f", "v", "e"];
function parsePuzzleDescription(s) {
  const a = s.split(/ /).filter(Boolean);
  if (a.length % 2 === 0) {
    return null;
  }
  const shape = a[0];
  if (shape !== "o" && shape !== "c" && shape !== "i" && shape !== "d" && shape !== "t") {
    return null;
  }
  const cuts = [];
  for (let i = 1; i < a.length; i += 2) {
    if (a[i] !== "f" && a[i] !== "v" && a[i] !== "e") {
      return null;
    }
    cuts.push({
      cutType: a[i],
      distance: parseFloat(a[i + 1])
    });
  }
  return { shape, cuts };
}
function getPuzzleGeometryByDesc(desc, options = {}) {
  const parsed = parsePuzzleDescription(desc);
  if (parsed === null) {
    throw Error("Could not parse the puzzle description");
  }
  const pg = new PuzzleGeometry(
    parsed,
    Object.assign({}, { allMoves: true }, options)
  );
  pg.allstickers();
  pg.genperms();
  return pg;
}
function getPuzzleGeometryByName(puzzleName, options) {
  return getPuzzleGeometryByDesc(pgPuzzle[puzzleName], options);
}
function getmovename(geo, bits, slices) {
  let inverted = false;
  if (slices - bits[1] < bits[0]) {
    geo = [geo[2], geo[3], geo[0], geo[1]];
    bits = [slices - bits[1], slices - bits[0]];
    inverted = true;
  }
  let movenameFamily = geo[0];
  let movenamePrefix = "";
  if (bits[0] === 0 && bits[1] === slices) {
    movenameFamily = `${movenameFamily}v`;
  } else if (bits[0] === bits[1]) {
    if (bits[1] > 0) {
      movenamePrefix = String(bits[1] + 1);
    }
  } else if (bits[0] === 0) {
    movenameFamily = movenameFamily.toLowerCase();
    if (bits[1] > 1) {
      movenamePrefix = String(bits[1] + 1);
    }
  } else {
    throw Error(
      `We only support slice and outer block moves right now. ${bits}`
    );
  }
  return [movenamePrefix + movenameFamily, inverted];
}
function splitByFaceNames(s, facenames) {
  const r = [];
  let at = 0;
  while (at < s.length) {
    if (at > 0 && at < s.length && s[at] === "_") {
      at++;
    }
    let currentMatch = "";
    for (const facename of facenames) {
      if (s.substr(at).startsWith(facename[1]) && facename[1].length > currentMatch.length) {
        currentMatch = facename[1];
      }
    }
    if (currentMatch !== "") {
      r.push(currentMatch);
      at += currentMatch.length;
    } else {
      throw Error(`Could not split ${s} into face names.`);
    }
  }
  return r;
}
function toCoords(q, maxdist) {
  return [q.b / maxdist, -q.c / maxdist, q.d / maxdist];
}
function toFaceCoords(q, maxdist) {
  const r = [];
  const n = q.length;
  for (let i = 0; i < n; i++) {
    const pt = toCoords(q.get(n - i - 1), maxdist);
    r[3 * i] = pt[0];
    r[3 * i + 1] = pt[1];
    r[3 * i + 2] = pt[2];
  }
  return r;
}
var PuzzleGeometry = class {
  constructor(puzzleDescription, options) {
    this.puzzleDescription = puzzleDescription;
    const t1 = tstart("genperms");
    this.options = new PuzzleGeometryFullOptions(options);
    if (this.options.verbosity > 0) {
      console.log(this.header("# "));
    }
    const { shape, cuts } = puzzleDescription;
    this.movePlanes = [];
    this.movePlanesFiltered = [];
    this.faces = [];
    this.cubies = [];
    let g = null;
    switch (shape) {
      case "c": {
        g = cube();
        break;
      }
      case "o": {
        g = octahedron();
        break;
      }
      case "i": {
        g = icosahedron();
        break;
      }
      case "t": {
        g = tetrahedron();
        break;
      }
      case "d": {
        g = dodecahedron();
        break;
      }
      default:
        throw Error(`Bad shape argument: ${shape}`);
    }
    this.rotations = closure(g);
    if (this.options.verbosity) {
      console.log(`# Rotations: ${this.rotations.length}`);
    }
    const baseplane = g[0];
    this.basePlaneRotations = uniqueplanes(baseplane, this.rotations);
    const baseplanes = this.basePlaneRotations.map(
      (_) => baseplane.rotateplane(_)
    );
    this.basePlanes = baseplanes;
    this.baseFaceCount = baseplanes.length;
    const net = defaultnets()[baseplanes.length];
    this.net = net;
    this.colors = defaultPlatonicColorSchemes()[baseplanes.length];
    if (this.options.verbosity > 0) {
      console.log(`# Base planes: ${baseplanes.length}`);
    }
    const baseface = getface(baseplanes);
    const zero = new Quat(0, 0, 0, 0);
    if (this.options.verbosity > 0) {
      console.log(`# Face vertices: ${baseface.length}`);
    }
    const facenormal = baseplanes[0].makenormal();
    const edgenormal = baseface[0].sum(baseface[1]).makenormal();
    const vertexnormal = baseface[0].makenormal();
    const boundary = new Quat(1, facenormal.b, facenormal.c, facenormal.d);
    if (this.options.verbosity > 0) {
      console.log(`# Boundary is ${boundary}`);
    }
    const planerot = uniqueplanes(boundary, this.rotations);
    const planes = planerot.map((_) => boundary.rotateplane(_));
    const firstface = getface(planes);
    this.edgeDistance = firstface[0].sum(firstface[1]).smul(0.5).dist(zero);
    this.vertexDistance = firstface[0].dist(zero);
    const cutplanes = [];
    const intersects = [];
    let sawface = false;
    let sawedge = false;
    let sawvertex = false;
    for (const cut of cuts) {
      let normal = null;
      let distance = 0;
      switch (cut.cutType) {
        case "f": {
          normal = facenormal;
          distance = 1;
          sawface = true;
          break;
        }
        case "v": {
          normal = vertexnormal;
          distance = this.vertexDistance;
          sawvertex = true;
          break;
        }
        case "e": {
          normal = edgenormal;
          distance = this.edgeDistance;
          sawedge = true;
          break;
        }
        default:
          throw Error(`Bad cut argument: ${cut.cutType}`);
      }
      cutplanes.push(normal.makecut(cut.distance));
      intersects.push(cut.distance < distance);
    }
    if (this.options.addRotations) {
      if (!sawface) {
        cutplanes.push(facenormal.makecut(10));
      }
      if (!sawvertex) {
        cutplanes.push(vertexnormal.makecut(10));
      }
      if (!sawedge) {
        cutplanes.push(edgenormal.makecut(10));
      }
    }
    this.baseFaces = [];
    for (const baseplanerot of this.basePlaneRotations) {
      const face = baseplanerot.rotateface(firstface);
      this.baseFaces.push(new Face(face));
    }
    const facenames = [];
    const faceplanes = [];
    const vertexnames = [];
    const edgenames = [];
    const edgesperface = firstface.length;
    function searchaddelement(a, p, name) {
      for (const el of a) {
        if (el[0].dist(p) < eps3) {
          el.push(name);
          return;
        }
      }
      a.push([p, name]);
    }
    for (let i = 0; i < this.basePlaneRotations.length; i++) {
      const face = this.basePlaneRotations[i].rotateface(firstface);
      for (let j = 0; j < face.length; j++) {
        const jj = (j + 1) % face.length;
        const midpoint = face[j].sum(face[jj]).smul(0.5);
        searchaddelement(edgenames, midpoint, i);
      }
    }
    const otherfaces = [];
    for (let i = 0; i < this.basePlaneRotations.length; i++) {
      const face = this.basePlaneRotations[i].rotateface(firstface);
      const facelist = [];
      for (let j = 0; j < face.length; j++) {
        const jj = (j + 1) % face.length;
        const midpoint = face[j].sum(face[jj]).smul(0.5);
        const el = edgenames[findelement(edgenames, midpoint)];
        if (i === el[1]) {
          facelist.push(el[2]);
        } else if (i === el[2]) {
          facelist.push(el[1]);
        } else {
          throw Error("Could not find edge");
        }
      }
      otherfaces.push(facelist);
    }
    const facenametoindex = {};
    const faceindextoname = [];
    faceindextoname.push(net[0][0]);
    facenametoindex[net[0][0]] = 0;
    faceindextoname[otherfaces[0][0]] = net[0][1];
    facenametoindex[net[0][1]] = otherfaces[0][0];
    for (const neti of net) {
      const f0 = neti[0];
      const fi = facenametoindex[f0];
      if (fi === void 0) {
        throw Error("Bad edge description; first edge not connected");
      }
      let ii = -1;
      for (let j = 0; j < otherfaces[fi].length; j++) {
        const fn2 = faceindextoname[otherfaces[fi][j]];
        if (fn2 !== void 0 && fn2 === neti[1]) {
          ii = j;
          break;
        }
      }
      if (ii < 0) {
        throw Error("First element of a net not known");
      }
      for (let j = 2; j < neti.length; j++) {
        if (neti[j] === "") {
          continue;
        }
        const of = otherfaces[fi][(j + ii - 1) % edgesperface];
        const fn2 = faceindextoname[of];
        if (fn2 !== void 0 && fn2 !== neti[j]) {
          throw Error("Face mismatch in net");
        }
        faceindextoname[of] = neti[j];
        facenametoindex[neti[j]] = of;
      }
    }
    for (let i = 0; i < this.basePlaneRotations.length; i++) {
      const face = this.basePlaneRotations[i].rotateface(firstface);
      const faceplane = boundary.rotateplane(this.basePlaneRotations[i]);
      const facename = faceindextoname[i];
      facenames.push([face, facename]);
      faceplanes.push([faceplane, facename]);
    }
    for (let i = 0; i < this.basePlaneRotations.length; i++) {
      const face = this.basePlaneRotations[i].rotateface(firstface);
      const facename = faceindextoname[i];
      for (let j = 0; j < face.length; j++) {
        const jj = (j + 1) % face.length;
        const midpoint = face[j].sum(face[jj]).smul(0.5);
        const jjj = (j + 2) % face.length;
        const midpoint2 = face[jj].sum(face[jjj]).smul(0.5);
        const e1 = findelement(edgenames, midpoint);
        const e2 = findelement(edgenames, midpoint2);
        searchaddelement(vertexnames, face[jj], [facename, e2, e1]);
      }
    }
    this.swizzler = new FaceNameSwizzler(facenames.map((_) => _[1]));
    const sep = this.swizzler.prefixFree ? "" : "_";
    const oridata = orientationDefaults[this.baseFaceCount];
    const markedface = [];
    for (let i = 0; i < this.baseFaceCount; i++) {
      markedface[1 << i] = i;
    }
    {
      const oriprefs = oridata["v"];
      for (const name of oriprefs) {
        const fn = this.swizzler.splitByFaceNames(name);
        let bits = 0;
        for (const i of fn) {
          bits |= 1 << i;
        }
        markedface[bits] = fn[0];
      }
    }
    {
      const oriprefs = oridata["e"];
      for (const name of oriprefs) {
        const fn = this.swizzler.splitByFaceNames(name);
        let bits = 0;
        for (const i of fn) {
          bits |= 1 << i;
        }
        markedface[bits] = fn[0];
      }
    }
    {
      const oriprefs = oridata["c"];
      for (const name of oriprefs) {
        const fn = this.swizzler.splitByFaceNames(name);
        const bits = 1 << fn[0] | 1 << this.baseFaceCount;
        markedface[bits] = fn[1];
      }
    }
    for (let i = 0; i < edgenames.length; i++) {
      if (edgenames[i].length !== 3) {
        throw Error(`Bad length in edge names ${edgenames[i]}`);
      }
      const f1 = edgenames[i][1];
      const f2 = edgenames[i][2];
      let c1 = faceindextoname[f1];
      const c2 = faceindextoname[f2];
      const bits = 1 << f1 | 1 << f2;
      if (markedface[bits] === f1) {
        c1 = c1 + sep + c2;
      } else {
        c1 = c2 + sep + c1;
      }
      edgenames[i] = [edgenames[i][0], c1];
    }
    for (let i = 0; i < vertexnames.length; i++) {
      let bits = 0;
      if (vertexnames[i].length < 4) {
        throw Error("Bad length in vertex names");
      }
      for (let j = 1; j < vertexnames[i].length; j++) {
        bits |= 1 << facenametoindex[vertexnames[i][j][0]];
      }
      const fi = markedface[bits];
      let st = -1;
      for (let j = 1; j < vertexnames[i].length; j++) {
        if (fi === facenametoindex[vertexnames[i][j][0]]) {
          st = j;
        }
      }
      if (st < 0) {
        throw Error(
          "Internal error; couldn't find face name when fixing corners"
        );
      }
      let r = "";
      for (let j = 1; j < vertexnames[i].length; j++) {
        if (j === 1) {
          r = vertexnames[i][st][0];
        } else {
          r = r + sep + vertexnames[i][st][0];
        }
        for (let k = 1; k < vertexnames[i].length; k++) {
          if (vertexnames[i][st][1] === vertexnames[i][k][2]) {
            st = k;
            break;
          }
        }
      }
      vertexnames[i] = [vertexnames[i][0], r];
    }
    this.markedFaceLookup = markedface;
    if (this.options.verbosity > 1) {
      console.log(`# Face names: ${facenames.map((_) => _[1]).join(" ")}`);
      console.log(`# Edge names: ${edgenames.map((_) => _[1]).join(" ")}`);
      console.log(`# Vertex names: ${vertexnames.map((_) => _[1]).join(" ")}`);
    }
    const geonormals = [];
    for (const faceplane of faceplanes) {
      geonormals.push([faceplane[0].makenormal(), faceplane[1], "f"]);
    }
    for (const edgename of edgenames) {
      geonormals.push([edgename[0].makenormal(), edgename[1], "e"]);
    }
    for (const vertexname of vertexnames) {
      geonormals.push([vertexname[0].makenormal(), vertexname[1], "v"]);
    }
    this.faceNames = facenames;
    this.facePlanes = faceplanes;
    this.edgeNames = edgenames;
    this.vertexNames = vertexnames;
    this.geometryNormals = geonormals;
    const geonormalnames = geonormals.map((_) => _[1]);
    this.swizzler.setGripNames(geonormalnames);
    if (this.options.verbosity > 0) {
      console.log(
        `# Distances: face ${1} edge ${this.edgeDistance} vertex ${this.vertexDistance}`
      );
    }
    for (let c = 0; c < cutplanes.length; c++) {
      for (const rotation of this.rotations) {
        const q = cutplanes[c].rotateplane(rotation);
        let wasseen = false;
        for (const moveplane of this.movePlanes) {
          if (q.sameplane(moveplane)) {
            wasseen = true;
            break;
          }
        }
        if (!wasseen) {
          this.movePlanes.push(q);
          if (intersects[c]) {
            this.movePlanesFiltered.push(q);
          }
        }
      }
    }
    let ft = new FaceTree(firstface);
    const tar = this.movePlanesFiltered.slice();
    let rval = 31;
    for (let i = 0; i < tar.length; i++) {
      const j = i + Math.floor((tar.length - i) * (rval / 65536));
      ft = ft.split(tar[j]);
      tar[j] = tar[i];
      rval = (rval * 1657 + 101) % 65536;
    }
    const faces = ft.collect([], true);
    this.faces = faces;
    if (this.options.verbosity > 0) {
      console.log(`# Faces is now ${faces.length}`);
    }
    this.stickersPerFace = faces.length;
    const simplerot = [];
    const cm = centermassface(firstface);
    for (const rotation of this.rotations) {
      const f = rotation.rotateface(firstface);
      if (cm.dist(centermassface(f)) < eps3) {
        simplerot.push(rotation);
      }
    }
    const finished = new Array(faces.length);
    const sortme = [];
    for (let i = 0; i < faces.length; i++) {
      const cm2 = faces[i].centermass();
      sortme.push([cm.dist(cm2), cm2, i]);
    }
    sortme.sort((a, b) => a[0] - b[0]);
    for (let ii = 0; ii < faces.length; ii++) {
      const i = sortme[ii][2];
      if (!finished[i]) {
        finished[i] = true;
        for (const rot of simplerot) {
          const f2 = faces[i].rotate(rot);
          const cm2 = f2.centermass();
          for (let kk = ii + 1; kk < faces.length; kk++) {
            if (sortme[kk][0] - sortme[ii][0] > eps3) {
              break;
            }
            const k = sortme[kk][2];
            if (!finished[k] && cm2.dist(sortme[kk][1]) < eps3) {
              finished[k] = true;
              faces[k] = f2;
              break;
            }
          }
        }
      }
    }
    this.shortestEdge = 1e99;
    for (const face of faces) {
      for (let j = 0; j < face.length; j++) {
        const k = (j + 1) % face.length;
        const t = face.get(j).dist(face.get(k));
        if (t < this.shortestEdge) {
          this.shortestEdge = t;
        }
      }
    }
    if (this.options.verbosity > 0) {
      console.log(`# Short edge is ${this.shortestEdge}`);
    }
    if (shape === "c" && sawface && !sawedge && !sawvertex) {
      this.addNotationMapper = "NxNxNCubeMapper";
      this.setReidOrSpeffzOrder = true;
    }
    if (shape === "c" && sawvertex && !sawface && !sawedge) {
      this.addNotationMapper = "SkewbMapper";
    }
    if (shape === "t" && (sawvertex || sawface) && !sawedge) {
      this.addNotationMapper = "PyraminxOrTetraminxMapper";
    }
    if (shape === "o" && sawface) {
      this.notationMapper = new FaceRenamingMapper(
        this.swizzler,
        new FaceNameSwizzler(["F", "D", "L", "BL", "R", "U", "BR", "B"])
      );
      if (!(sawedge || sawvertex)) {
        this.addNotationMapper = "FTOMapper";
      }
    }
    if (shape === "d" && sawface) {
      this.addNotationMapper = "MegaminxMapper";
      this.notationMapper = new FaceRenamingMapper(
        this.swizzler,
        new FaceNameSwizzler([
          "U",
          "F",
          "L",
          "BL",
          "BR",
          "R",
          "FR",
          "FL",
          "DL",
          "B",
          "DR",
          "D"
        ])
      );
    }
    tend(t1);
  }
  rotations;
  // all members of the rotation group
  basePlaneRotations;
  // unique rotations of the baseplane
  basePlanes;
  // planes, corresponding to faces
  faceNames;
  // face names
  facePlanes;
  // face planes
  edgeNames;
  // edge names
  vertexNames;
  // vertexnames
  geometryNormals;
  // all geometric directions, with names and types
  movePlanes;
  // the planes that split moves
  movePlanesFiltered;
  // the planes that split moves, filtered
  movePlaneSets;
  // the move planes, in parallel sets
  movePlaneNormals;
  // one move plane
  movesetorders;
  // the order of rotations for each move set
  movesetgeos;
  // geometric feature information for move sets
  baseFaces;
  // polytope faces before cuts
  faces;
  // all the stickers
  faceCenterMass;
  // center of mass of all faces
  baseFaceCount;
  // number of base faces
  stickersPerFace;
  // number of stickers per face
  shortestEdge;
  markedFaceLookup;
  // given a bitmap of faces, identify the marked one
  cubies;
  // the cubies
  vertexDistance;
  // vertex distance
  edgeDistance;
  // edge distance
  faceToCubie;
  // map a face to a cubie index
  faceToCubieOrd;
  // map a face to a cubie ord
  moveRotations;
  // move rotations
  faceListHash;
  // face list by key
  cubieSetNames;
  // cubie set names
  cubieOrbitSizes;
  // the size of each orbit
  cubieSetNums;
  cubieOrdNums;
  orbitOrientations;
  // the orientation size of each orbit
  cubieValueMap;
  // the map for identical cubies
  cubieSetCubies;
  // cubies in each cubie set
  cmovesBySlice = [];
  // cmoves as perms by slice
  parsedMoveList;
  // parsed move list
  duplicatedFaces = [];
  // which faces are duplicated
  duplicatedCubies = [];
  // which cubies are duplicated
  fixedCubie = -1;
  // fixed cubie, if any
  net = [];
  colors = [];
  swizzler;
  notationMapper = new NullMapper();
  addNotationMapper = "";
  setReidOrSpeffzOrder = false;
  options;
  keyface(face) {
    return this.keyface2(face.centermass());
  }
  keyface2(cm) {
    let s = "";
    const sfcc = String.fromCharCode;
    for (const moveplaneset of this.movePlaneSets) {
      if (moveplaneset.length > 0) {
        const dv = cm.dot(moveplaneset[0]);
        let t = 0;
        let b = 1;
        while (b * 2 <= moveplaneset.length) {
          b *= 2;
        }
        for (; b > 0; b >>= 1) {
          if (t + b <= moveplaneset.length && dv > moveplaneset[t + b - 1].a) {
            t += b;
          }
        }
        if (t < 47) {
          s = s + sfcc(33 + t);
        } else if (t < 47 + 47 * 47) {
          s = s + sfcc(33 + 47 + Math.floor(t / 47) - 1) + sfcc(33 + t % 47);
        } else if (t < 47 + 47 * 47 + 47 * 47 * 47) {
          s = s + sfcc(33 + 47 + Math.floor((t - 47) / (47 * 47) - 1)) + sfcc(33 + 47 + Math.floor((t - 47) / 47) % 47) + sfcc(33 + t % 47);
        } else {
          throw Error("Too many slices for cubie encoding");
        }
      }
    }
    return s;
  }
  // same as above, but instead of returning an encoded string, return
  // an array with offsets.
  keyface3(face) {
    const cm = face.centermass();
    const r = [];
    for (const moveplaneset of this.movePlaneSets) {
      if (moveplaneset.length > 0) {
        const dv = cm.dot(moveplaneset[0]);
        let t = 0;
        let b = 1;
        while (b * 2 <= moveplaneset.length) {
          b *= 2;
        }
        for (; b > 0; b >>= 1) {
          if (t + b <= moveplaneset.length && dv > moveplaneset[t + b - 1].a) {
            t += b;
          }
        }
        r.push(t);
      }
    }
    return r;
  }
  findface(cm) {
    const key = this.keyface2(cm);
    const arr = this.faceListHash.get(key);
    if (arr.length === 1) {
      return arr[0];
    }
    for (let i = 0; i + 1 < arr.length; i++) {
      const face2 = this.faceListHash.get(key)[i];
      if (Math.abs(cm.dist(this.faceCenterMass[face2])) < eps3) {
        return face2;
      }
    }
    return arr[arr.length - 1];
  }
  project2d(facen, edgen, targvec) {
    const face = this.faceNames[facen][0];
    const edgen2 = (edgen + 1) % face.length;
    const plane = this.basePlanes[facen];
    let x0 = face[edgen2].sub(face[edgen]);
    const olen = x0.len();
    x0 = x0.normalize();
    const y0 = x0.cross(plane).normalize();
    let delta = targvec[1].sub(targvec[0]);
    const len = delta.len() / olen;
    delta = delta.normalize();
    const cosr = delta.b;
    const sinr = delta.c;
    const x1 = x0.smul(cosr).sub(y0.smul(sinr)).smul(len);
    const y1 = y0.smul(cosr).sum(x0.smul(sinr)).smul(len);
    const off = new Quat(
      0,
      targvec[0].b - x1.dot(face[edgen]),
      targvec[0].c - y1.dot(face[edgen]),
      0
    );
    return [x1, y1, off];
  }
  // Given an string of uppercase letters, make a bitmask
  // indicating what letters are in it.  Cheap swizzling
  // for internal use.
  upperStringToBitSet(geo) {
    let r = 0;
    for (let i = 0; i < geo.length; i++) {
      r |= 1 << geo.charCodeAt(i) - 65;
    }
    return r;
  }
  allstickers() {
    const t1 = tstart("allstickers");
    this.faces = expandfaces(this.basePlaneRotations, this.faces);
    if (this.options.verbosity > 0) {
      console.log(`# Total stickers is now ${this.faces.length}`);
    }
    this.faceCenterMass = new Array(this.faces.length);
    for (let i = 0; i < this.faces.length; i++) {
      this.faceCenterMass[i] = this.faces[i].centermass();
    }
    const moveplanesets = [];
    const moveplanenormals = [];
    for (const q of this.movePlanes) {
      const qnormal = q.makenormal();
      let wasseen = false;
      for (const moveplanenormal of moveplanenormals) {
        if (qnormal.sameplane(moveplanenormal.makenormal())) {
          wasseen = true;
        }
      }
      if (!wasseen) {
        moveplanenormals.push(qnormal);
        moveplanesets.push([]);
      }
    }
    for (const q of this.movePlanesFiltered) {
      const qnormal = q.makenormal();
      for (let j = 0; j < moveplanenormals.length; j++) {
        if (qnormal.sameplane(moveplanenormals[j])) {
          moveplanesets[j].push(q);
          break;
        }
      }
    }
    for (let i = 0; i < moveplanesets.length; i++) {
      const q = moveplanesets[i].map((_) => _.normalizeplane());
      const goodnormal = moveplanenormals[i];
      for (let j = 0; j < q.length; j++) {
        if (q[j].makenormal().dist(goodnormal) > eps3) {
          q[j] = q[j].smul(-1);
        }
      }
      q.sort((a, b) => a.a - b.a);
      moveplanesets[i] = q;
    }
    this.movePlaneSets = moveplanesets;
    this.movePlaneNormals = moveplanenormals;
    const sizes = moveplanesets.map((_) => _.length);
    if (this.options.verbosity > 0) {
      console.log(`# Move plane sets: ${sizes}`);
    }
    const moverotations = [];
    for (let i = 0; i < moveplanesets.length; i++) {
      moverotations.push([]);
    }
    for (const q of this.rotations) {
      if (Math.abs(Math.abs(q.a) - 1) < eps3) {
        continue;
      }
      const qnormal = q.makenormal();
      for (let j = 0; j < moveplanesets.length; j++) {
        if (qnormal.sameplane(moveplanenormals[j])) {
          moverotations[j].push(q);
          break;
        }
      }
    }
    this.moveRotations = moverotations;
    for (let i = 0; i < moverotations.length; i++) {
      const r = moverotations[i];
      const goodnormal = r[0].makenormal();
      for (let j = 0; j < r.length; j++) {
        if (goodnormal.dist(r[j].makenormal()) > eps3) {
          r[j] = r[j].smul(-1);
        }
      }
      r.sort((a, b) => a.angle() - b.angle());
      if (moverotations[i][0].dot(moveplanenormals[i]) < 0) {
        r.reverse();
      }
    }
    const sizes2 = moverotations.map((_) => 1 + _.length);
    this.movesetorders = sizes2;
    const movesetgeos = [];
    let gtype = "?";
    for (let i = 0; i < moveplanesets.length; i++) {
      const p0 = moveplanenormals[i];
      let neg = null;
      let pos = null;
      for (const geonormal of this.geometryNormals) {
        const d = p0.dot(geonormal[0]);
        if (Math.abs(d - 1) < eps3) {
          pos = [geonormal[1], geonormal[2]];
          gtype = geonormal[2];
        } else if (Math.abs(d + 1) < eps3) {
          neg = [geonormal[1], geonormal[2]];
          gtype = geonormal[2];
        }
      }
      if (pos === null || neg === null) {
        throw Error("Saw positive or negative sides as null");
      }
      movesetgeos.push([
        pos[0],
        pos[1],
        neg[0],
        neg[1],
        1 + moveplanesets[i].length
      ]);
      if (this.addNotationMapper === "NxNxNCubeMapper" && gtype === "f") {
        this.notationMapper = new NxNxNCubeMapper(1 + moveplanesets[i].length);
        this.addNotationMapper = "";
      }
      if (this.addNotationMapper === "SkewbMapper" && moveplanesets[0].length === 1) {
        this.notationMapper = new SkewbNotationMapper(this.swizzler);
        this.addNotationMapper = "";
      }
      if (this.addNotationMapper === "PyraminxOrTetraminxMapper") {
        if (moveplanesets[0].length === 2 && moveplanesets[0][0].a === 0.333333333333333 && moveplanesets[0][1].a === 1.66666666666667) {
          this.notationMapper = new PyraminxNotationMapper(this.swizzler);
          this.addNotationMapper = "";
        } else {
          this.notationMapper = new TetraminxNotationMapper(this.swizzler);
          this.addNotationMapper = "";
        }
      }
      if (this.addNotationMapper === "MegaminxMapper" && gtype === "f") {
        if (1 + moveplanesets[i].length === 3) {
          this.notationMapper = new MegaminxScramblingNotationMapper(
            this.notationMapper
          );
        }
        this.addNotationMapper = "";
      }
      if (this.addNotationMapper === "FTOMapper" && gtype === "f") {
        if (1 + moveplanesets[i].length === 3) {
          this.notationMapper = new FTONotationMapper(
            this.notationMapper,
            this.swizzler
          );
        }
        this.addNotationMapper = "";
      }
    }
    this.movesetgeos = movesetgeos;
    const facelisthash = /* @__PURE__ */ new Map();
    const faces = this.faces;
    for (let i = 0; i < faces.length; i++) {
      const face = faces[i];
      const s = this.keyface(face);
      if (!facelisthash.get(s)) {
        facelisthash.set(s, [i]);
      } else {
        const arr = facelisthash.get(s);
        arr.push(i);
        if (arr.length === this.baseFaceCount) {
          if (this.options.verbosity > 0) {
            console.log("# Splitting core.");
          }
          for (let suff = 0; suff < arr.length; suff++) {
            const s2 = `${s} ${suff}`;
            facelisthash.set(s2, [arr[suff]]);
          }
        }
      }
    }
    this.faceListHash = facelisthash;
    if (this.options.verbosity > 0) {
      console.log(`# Cubies: ${facelisthash.size}`);
    }
    const cubies = [];
    const facetocubie = [];
    const facetoord = [];
    for (const facelist of facelisthash.values()) {
      if (facelist.length === this.baseFaceCount) {
        continue;
      }
      if (facelist.length > 1) {
        const cm = facelist.map((_) => faces[_].centermass());
        const cmall = centermassface(cm);
        for (let looplimit = 0; facelist.length > 2; looplimit++) {
          let changed = false;
          for (let i = 0; i < facelist.length; i++) {
            const j = (i + 1) % facelist.length;
            if (cmall.dot(cm[i].cross(cm[j])) < 0) {
              const u = cm[i];
              cm[i] = cm[j];
              cm[j] = u;
              const v = facelist[i];
              facelist[i] = facelist[j];
              facelist[j] = v;
              changed = true;
            }
          }
          if (!changed) {
            break;
          }
          if (looplimit > 1e3) {
            throw Error("Bad epsilon math; too close to border");
          }
        }
        let bits = 0;
        for (const f of facelist) {
          bits |= 1 << Math.floor(f / this.stickersPerFace);
        }
        const markedface = this.markedFaceLookup[bits];
        let mini = -1;
        for (let i = 0; i < facelist.length; i++) {
          if (Math.floor(facelist[i] / this.stickersPerFace) === markedface) {
            mini = i;
          }
        }
        if (mini < 0) {
          throw Error("Could not find marked face in list");
        }
        if (mini !== 0) {
          const ofacelist = facelist.slice();
          for (let i = 0; i < facelist.length; i++) {
            facelist[i] = ofacelist[(mini + i) % facelist.length];
          }
        }
      }
      for (let j = 0; j < facelist.length; j++) {
        const k = facelist[j];
        facetocubie[k] = cubies.length;
        facetoord[k] = j;
      }
      cubies.push(facelist);
    }
    this.cubies = cubies;
    this.faceToCubie = facetocubie;
    this.faceToCubieOrd = facetoord;
    const typenames = ["?", "CENTERS", "EDGES", "CORNERS", "C4RNER", "C5RNER"];
    const cubiesetnames = [];
    const cubietypecounts = [0, 0, 0, 0, 0, 0];
    const orbitoris = [];
    const seen = [];
    let cubiesetnum = 0;
    const cubiesetnums = [];
    const cubieordnums = [];
    const cubieords = [];
    const cubievaluemap = [];
    const getcolorkey = (cubienum) => {
      return cubies[cubienum].map((_) => this.getfaceindex(_)).join(" ");
    };
    const cubiesetcubies = [];
    for (let i = 0; i < cubies.length; i++) {
      const cubie = cubies[i];
      if (cubie.length === 0) {
        continue;
      }
      if (seen[i]) {
        continue;
      }
      const cubiekeymap = {};
      let cubievalueid = 0;
      cubieords.push(0);
      cubiesetcubies.push([]);
      const facecnt = cubie.length;
      const typectr = cubietypecounts[facecnt]++;
      let typename = typenames[facecnt];
      if (typename === void 0 || facecnt === this.baseFaceCount) {
        typename = "CORE";
      }
      typename = typename + (typectr === 0 ? "" : typectr + 1);
      cubiesetnames[cubiesetnum] = typename;
      orbitoris[cubiesetnum] = facecnt;
      const queue = [i];
      let qg = 0;
      seen[i] = true;
      while (qg < queue.length) {
        const cind = queue[qg++];
        const cubiecolorkey = getcolorkey(cind);
        if (cubie.length > 1 || cubiekeymap[cubiecolorkey] === void 0) {
          cubiekeymap[cubiecolorkey] = cubievalueid++;
        }
        cubievaluemap[cind] = cubiekeymap[cubiecolorkey];
        cubiesetnums[cind] = cubiesetnum;
        cubiesetcubies[cubiesetnum].push(cind);
        cubieordnums[cind] = cubieords[cubiesetnum]++;
        if (queue.length < this.rotations.length) {
          const cm = this.faceCenterMass[cubies[cind][0]];
          for (const moverotation of moverotations) {
            const tq = this.faceToCubie[this.findface(cm.rotatepoint(moverotation[0]))];
            if (!seen[tq]) {
              queue.push(tq);
              seen[tq] = true;
            }
          }
        }
      }
      cubiesetnum++;
    }
    if (this.setReidOrSpeffzOrder && 4 <= this.stickersPerFace) {
      const reidorder = [
        [
          "UF",
          "UR",
          "UB",
          "UL",
          "DF",
          "DR",
          "DB",
          "DL",
          "FR",
          "FL",
          "BR",
          "BL"
        ],
        ["UFR", "URB", "UBL", "ULF", "DRF", "DFL", "DLB", "DBR"],
        ["U", "L", "F", "R", "B", "D"]
      ];
      const spefffaceorder = ["U", "L", "F", "R", "B", "D"];
      const speffcornerorder = [
        "UBL",
        "URB",
        "UFR",
        "ULF",
        "UBL",
        "ULF",
        "DFL",
        "DLB",
        "ULF",
        "UFR",
        "DRF",
        "DFL",
        "UFR",
        "URB",
        "DBR",
        "DRF",
        "URB",
        "UBL",
        "DLB",
        "DBR",
        "DFL",
        "DRF",
        "DBR",
        "DLB"
      ];
      const reidmap = {};
      for (const cubie of reidorder) {
        for (let j = 0; j < cubie.length; j++) {
          reidmap[this.upperStringToBitSet(cubie[j])] = j;
        }
      }
      const cornerloc = {};
      const spefffacelookup = {};
      const speffcornerlocs = [];
      const speffuncorner = [
        -1,
        0,
        1,
        0,
        2,
        -1,
        1,
        -1,
        3,
        3,
        -1,
        -1,
        2,
        -1,
        -1,
        -1
      ];
      if (this.stickersPerFace > 9) {
        for (const vertex of this.vertexNames) {
          cornerloc[this.upperStringToBitSet(vertex[1])] = vertex[0];
        }
        for (let i = 0; i < 6; i++) {
          spefffacelookup[spefffaceorder[i]] = i;
        }
        for (const co of speffcornerorder) {
          speffcornerlocs.push(cornerloc[this.upperStringToBitSet(co)]);
        }
      }
      for (const cubieset of cubiesetcubies) {
        for (const cubienum of cubieset) {
          if (cubies[cubienum].length === 3 || this.stickersPerFace <= 9) {
            let mask = 0;
            for (const cubie of cubies[cubienum]) {
              mask |= 1 << this.faceNames[this.getfaceindex(cubie)][1].charCodeAt(0) - 65;
            }
            cubieordnums[cubienum] = reidmap[mask];
          } else {
            if (cubies[cubienum].length <= 2) {
              const ordset = [];
              for (let k = 0; k < cubies[cubienum].length; k++) {
                const sticker = cubies[cubienum][k];
                const facekey = spefffacelookup[this.faceNames[this.getfaceindex(sticker)][1]];
                let bestdist = 1e20;
                const cubieloc = this.faces[sticker].centermass();
                let bestmask = 0;
                for (let i = 0; i < 4; i++) {
                  const t = cubieloc.dist(speffcornerlocs[4 * facekey + i]);
                  if (t + eps3 < bestdist) {
                    bestdist = t;
                    bestmask = 1 << i;
                  } else if (t < bestdist + eps3) {
                    bestmask |= 1 << i;
                  }
                }
                bestmask = speffuncorner[bestmask];
                if (bestmask >= 0) {
                  const speffind = 4 * facekey + bestmask;
                  ordset.push([speffind, speffcornerorder[speffind]]);
                }
              }
              if (ordset.length > 0) {
                if (cubies[cubienum].length === 1) {
                  cubieordnums[cubienum] = ordset[0][0];
                } else if (ordset.length === 2 && ordset[0][1] === ordset[1][1]) {
                  let k = 0;
                  const f0c = spefffaceorder[ordset[0][0] >> 2];
                  const f1c = spefffaceorder[ordset[1][0] >> 2];
                  const corn = ordset[0][1];
                  while (k < 3 && (f0c === corn.charAt(k) || f1c === corn.charAt(k))) {
                    k++;
                  }
                  if (k === 3) {
                    throw Error("Internal error (2) in Speffz");
                  }
                  k = (k + 1) % 3;
                  if (f0c === corn.charAt(k)) {
                    cubieordnums[cubienum] = ordset[0][0];
                  } else if (f1c === corn.charAt(k)) {
                    cubieordnums[cubienum] = ordset[1][0];
                  } else {
                    console.log(f0c, f1c, corn, k, ordset);
                    throw Error("Internal error (3) in Speffz");
                  }
                }
              }
            }
          }
        }
      }
    }
    this.cubieSetNums = cubiesetnums;
    this.cubieOrdNums = cubieordnums;
    this.cubieSetNames = cubiesetnames;
    this.cubieOrbitSizes = cubieords;
    this.orbitOrientations = orbitoris;
    this.cubieValueMap = cubievaluemap;
    this.cubieSetCubies = cubiesetcubies;
    if (this.options.fixedPieceType !== null) {
      for (let i = 0; i < cubies.length; i++) {
        if (this.options.fixedPieceType === "v" && cubies[i].length > 2 || this.options.fixedPieceType === "e" && cubies[i].length === 2 || this.options.fixedPieceType === "f" && cubies[i].length === 1) {
          this.fixedCubie = i;
          break;
        }
      }
      if (this.fixedCubie < 0) {
        throw Error(
          `Could not find a cubie of type ${this.options.fixedPieceType} to fix.`
        );
      }
    }
    if (this.options.verbosity > 0) {
      console.log(`# Cubie orbit sizes ${cubieords}`);
    }
    tend(t1);
  }
  unswizzle(mv) {
    const newmv = this.notationMapper.notationToInternal(mv);
    if (newmv === null) {
      return null;
    }
    return newmv.modified({ family: this.swizzler.unswizzle(newmv.family) });
  }
  // TODO: remove this in favor of `Move.fromString(…)`
  // We use an extremely permissive parse here; any character but
  // digits are allowed in a family name.
  stringToBlockMove(mv) {
    const re = /^(([0-9]+)-)?([0-9]+)?([^0-9]+)([0-9]+'?)?$/;
    const p = mv.match(re);
    if (p === null) {
      throw Error(`Bad move passed ${mv}`);
    }
    const grip = p[4];
    let loslice;
    let hislice;
    if (p[2] !== void 0) {
      if (p[3] === void 0) {
        throw Error("Missing second number in range");
      }
      loslice = parseInt(p[2], 10);
    }
    if (p[3] !== void 0) {
      hislice = parseInt(p[3], 10);
    }
    let amountstr = "1";
    let amount = 1;
    if (p[5] !== void 0) {
      amountstr = p[5];
      if (amountstr[0] === "'") {
        amountstr = `-${amountstr.substring(1)}`;
      }
      amount = parseInt(amountstr, 10);
    }
    return new Move(new QuantumMove(grip, hislice, loslice), amount);
  }
  parseMove(move) {
    const bm = this.notationMapper.notationToInternal(move);
    if (bm === null) {
      throw Error(`Bad move ${move.family}`);
    }
    move = bm;
    let grip = move.family;
    let fullrotation = false;
    if (grip.endsWith("v") && grip[0] <= "Z") {
      if (move.innerLayer !== void 0 || move.outerLayer !== void 0) {
        throw Error("Cannot use a prefix with full cube rotations");
      }
      grip = grip.slice(0, -1);
      fullrotation = true;
    }
    if (grip.endsWith("w") && grip[0] <= "Z") {
      grip = grip.slice(0, -1).toLowerCase();
    }
    let geo;
    let msi = -1;
    const geoname = this.swizzler.unswizzle(grip);
    let firstgrip = false;
    for (let i = 0; i < this.movesetgeos.length; i++) {
      const g = this.movesetgeos[i];
      if (geoname === g[0]) {
        firstgrip = true;
        geo = g;
        msi = i;
      }
      if (geoname === g[2]) {
        firstgrip = false;
        geo = g;
        msi = i;
      }
    }
    let loslice = 1;
    let hislice = 1;
    if (grip.toUpperCase() !== grip) {
      hislice = 2;
    }
    if (geo === void 0) {
      throw Error(`Bad grip in move ${move.family}`);
    }
    if (move.outerLayer !== void 0) {
      loslice = move.outerLayer;
    }
    if (move.innerLayer !== void 0) {
      if (move.outerLayer === void 0) {
        hislice = move.innerLayer;
        if (grip <= "Z") {
          loslice = hislice;
        } else {
          loslice = 1;
        }
      } else {
        hislice = move.innerLayer;
      }
    }
    loslice--;
    hislice--;
    const movePlaneSets = this.movePlaneSets;
    if (fullrotation) {
      loslice = 0;
      hislice = movePlaneSets[msi].length;
    }
    if (loslice < 0 || loslice > movePlaneSets[msi].length || hislice < 0 || hislice > movePlaneSets[msi].length) {
      throw Error(
        `Bad slice spec ${loslice} ${hislice} vs ${movePlaneSets[msi].length}`
      );
    }
    if (!permissivieMoveParsing && loslice === 0 && hislice === movePlaneSets[msi].length && !fullrotation) {
      throw Error("! full puzzle rotations must be specified with v suffix.");
    }
    return [void 0, msi, loslice, hislice, firstgrip, move.amount];
  }
  parsemove(mv) {
    if (mv instanceof Move) {
      mv = mv.toString();
    }
    const r = this.parseMove(this.stringToBlockMove(mv));
    r[0] = mv;
    return r;
  }
  genperms() {
    const t1 = tstart("genperms");
    if (this.cmovesBySlice.length > 0) {
      return;
    }
    const cmovesbyslice = [];
    if (this.options.orientCenters) {
      for (let k = 0; k < this.cubies.length; k++) {
        if (this.cubies[k].length === 1) {
          const kk = this.cubies[k][0];
          const i = this.getfaceindex(kk);
          const center = this.baseFaces[i].centermass();
          if (center.dist(this.faceCenterMass[kk]) < eps3) {
            const bits = 1 << i | 1 << this.baseFaceCount;
            const towards = this.markedFaceLookup[bits];
            const normal = this.basePlanes[towards].makenormal();
            let hiv = -1;
            let hii = -1;
            for (let ii = 0; ii < this.faces[kk].length; ii++) {
              const pt = this.faces[kk].get(ii);
              const t = normal.dot(pt.sub(center));
              if (t > hiv) {
                hiv = t;
                hii = ii;
              }
            }
            const hii2 = (hii + 1) % this.faces[kk].length;
            if (Math.abs(normal.dot(this.faces[kk].get(hii2).sub(center)) - hiv) < eps3) {
              hii = hii2;
            }
            if (hii !== 0) {
              const qs = [];
              for (let ii = 0; ii < this.faces[kk].length; ii++) {
                qs.push(this.faces[kk].get((ii + hii) % this.faces[kk].length));
              }
              this.faces[kk] = new Face(qs);
            }
            const o = this.baseFaces[i].length;
            for (let m = 1; m < o; m++) {
              this.cubies[k].push(this.cubies[k][m - 1]);
            }
            this.duplicatedFaces[kk] = o;
            this.duplicatedCubies[k] = o;
            this.orbitOrientations[this.cubieSetNums[k]] = o;
          }
        }
      }
    }
    for (let k = 0; k < this.movePlaneSets.length; k++) {
      const moveplaneset = this.movePlaneSets[k];
      const slicenum = [];
      const slicecnts = [moveplaneset.length + 1, 0];
      let bhi = 1;
      while (bhi * 2 <= moveplaneset.length) {
        bhi *= 2;
      }
      for (let i = 0; i < this.faces.length; i++) {
        let t = 0;
        if (moveplaneset.length > 0) {
          const dv = this.faceCenterMass[i].dot(moveplaneset[0]);
          for (let b = bhi; b > 0; b >>= 1) {
            if (t + b <= moveplaneset.length && dv > moveplaneset[t + b - 1].a) {
              t += b;
            }
          }
          t = moveplaneset.length - t;
        }
        slicenum.push(t);
        while (slicecnts.length <= t) {
          slicecnts.push(0);
        }
        slicecnts[t]++;
      }
      const axiscmoves = new Array(slicecnts.length);
      for (let sc = 0; sc < slicecnts.length; sc++) {
        axiscmoves[sc] = [];
      }
      const cubiedone = [];
      for (let i = 0; i < this.faces.length; i++) {
        if (slicenum[i] < 0) {
          continue;
        }
        const b = [this.faceToCubie[i], this.faceToCubieOrd[i]];
        let cm = this.faceCenterMass[i];
        const ocm = cm;
        let fi2 = i;
        const sc = slicenum[fi2];
        for (; ; ) {
          slicenum[fi2] = -1;
          const cm2 = cm.rotatepoint(this.moveRotations[k][0]);
          if (cm2.dist(ocm) < eps3) {
            break;
          }
          fi2 = this.findface(cm2);
          b.push(this.faceToCubie[fi2], this.faceToCubieOrd[fi2]);
          cm = cm2;
        }
        if (b.length > 2 && this.options.orientCenters && (this.cubies[b[0]].length === 1 || this.duplicatedCubies[b[0]] > 1)) {
          if (
            // TODO: refactor to avoid non-null-assertion
            this.faceCenterMass[i].dist(
              this.baseFaces[this.getfaceindex(i)].centermass()
            ) < eps3
          ) {
            let face1 = this.faces[this.cubies[b[0]][0]];
            for (let ii = 0; ii < b.length; ii += 2) {
              const face0 = this.faces[this.cubies[b[ii]][0]];
              let o = -1;
              for (let jj = 0; jj < face1.length; jj++) {
                if (face0.get(jj).dist(face1.get(0)) < eps3) {
                  o = jj;
                  break;
                }
              }
              if (o < 0) {
                throw Error(
                  "Couldn't find rotation of center faces; ignoring for now."
                );
              } else {
                b[ii + 1] = o;
                face1 = face1.rotate(this.moveRotations[k][0]);
              }
            }
          }
        }
        if (b.length === 2 && this.options.orientCenters) {
          const dir = this.faceCenterMass[i].dot(this.movePlaneNormals[k]);
          for (let ii = 1; ii < this.movesetorders[k]; ii++) {
            if (dir > 0) {
              b.push(b[0], ii);
            } else {
              b.push(
                b[0],
                (this.movesetorders[k] - ii) % this.movesetorders[k]
                // TODO: refactor to avoid non-null-assertion
              );
            }
          }
        }
        if (b.length > 2 && !cubiedone[b[0]]) {
          if (b.length !== 2 * this.movesetorders[k]) {
            throw Error("Bad length in perm gen");
          }
          for (const v of b) {
            axiscmoves[sc].push(v);
          }
        }
        for (let j = 0; j < b.length; j += 2) {
          cubiedone[b[j]] = true;
        }
      }
      for (let kk = 0; kk < axiscmoves.length; kk++) {
        axiscmoves[kk] = axiscmoves[kk].slice();
      }
      cmovesbyslice.push(axiscmoves);
    }
    this.cmovesBySlice = cmovesbyslice;
    if (this.options.moveList) {
      const parsedmovelist = [];
      for (const moveString of this.options.moveList) {
        parsedmovelist.push(this.parsemove(moveString));
      }
      this.parsedMoveList = parsedmovelist;
    }
    this.faceListHash.clear();
    this.faceCenterMass = [];
    tend(t1);
  }
  getboundarygeometry() {
    return {
      baseplanes: this.basePlanes,
      facenames: this.faceNames,
      faceplanes: this.facePlanes,
      vertexnames: this.vertexNames,
      edgenames: this.edgeNames,
      geonormals: this.geometryNormals
    };
  }
  getmovesets(k) {
    const slices = this.movePlaneSets[k].length;
    let r = [];
    if (this.parsedMoveList !== void 0) {
      for (const parsedmove of this.parsedMoveList) {
        if (parsedmove[1] !== k) {
          continue;
        }
        if (parsedmove[4]) {
          r.push([parsedmove[2], parsedmove[3]]);
        } else {
          r.push([slices - parsedmove[3], slices - parsedmove[2]]);
        }
        r.push(parsedmove[5]);
      }
    } else {
      const msg = this.movesetgeos[k];
      const isTetrahedron = msg[1] !== msg[3];
      if (this.options.vertexMoves && isTetrahedron && !this.options.allMoves) {
        if (msg[1] !== msg[3]) {
          for (let i = 0; i < slices; i++) {
            if (msg[1] !== "v") {
              if (this.options.outerBlockMoves) {
                r.push([i + 1, slices]);
              } else {
                r.push([i + 1, i + 1]);
              }
              r.push(1);
            } else {
              if (this.options.outerBlockMoves) {
                r.push([0, i]);
              } else {
                r.push([i, i]);
              }
              r.push(1);
            }
          }
        }
      } else {
        for (let i = 0; i <= slices; i++) {
          if (!this.options.allMoves && i + i === slices) {
            continue;
          }
          if (this.options.outerBlockMoves) {
            if (i + i > slices) {
              r.push([i, slices]);
            } else {
              r.push([0, i]);
            }
          } else {
            r.push([i, i]);
          }
          r.push(1);
        }
      }
    }
    if (this.fixedCubie >= 0) {
      const dep = this.keyface3(this.faces[this.cubies[this.fixedCubie][0]])[k];
      const newr = [];
      for (let i = 0; i < r.length; i += 2) {
        let o = r[i];
        if (dep >= o[0] && dep <= o[1]) {
          if (o[0] === 0) {
            o = [o[1] + 1, slices];
          } else if (slices === o[1]) {
            o = [0, o[0] - 1];
          } else {
            throw Error("fixed cubie option would disconnect move");
          }
        }
        let found = false;
        for (let j = 0; j < newr.length; j += 2) {
          if (newr[j][0] === o[0] && newr[j][1] === o[1] && newr[j + 1] === r[i + 1]) {
            found = true;
            break;
          }
        }
        if (!found) {
          newr.push(o);
          newr.push(r[i + 1]);
        }
      }
      r = newr;
    }
    return r;
  }
  graybyori(cubie) {
    let ori = this.cubies[cubie].length;
    if (this.duplicatedCubies[cubie]) {
      ori = 1;
    }
    return ori === 1 && (this.options.grayCenters || !this.options.includeCenterOrbits) || ori === 2 && (this.options.grayEdges || !this.options.includeEdgeOrbits) || ori > 2 && (this.options.grayCorners || !this.options.includeCornerOrbits);
  }
  skipbyori(cubie) {
    let ori = this.cubies[cubie].length;
    if (this.duplicatedCubies[cubie]) {
      ori = 1;
    }
    return ori === 1 && !this.options.includeCenterOrbits || ori === 2 && !this.options.includeEdgeOrbits || ori > 2 && !this.options.includeCornerOrbits;
  }
  skipcubie(fi) {
    return this.skipbyori(fi);
  }
  header(comment) {
    return `${comment + copyright}
${comment}
`;
  }
  writegap() {
    const os = this.getOrbitsDef(false);
    const r = [];
    const mvs = [];
    for (let i = 0; i < os.moveops.length; i++) {
      let movename = os.movenames[i];
      if (!os.forcenames[i]) {
        movename = `M_${externalName(this.notationMapper, movename)}`;
      }
      movename = `M_${movename}`;
      let doinv = false;
      if (movename[movename.length - 1] === "'") {
        movename = movename.substring(0, movename.length - 1);
        doinv = true;
      }
      mvs.push(movename);
      if (doinv) {
        r.push(`${movename}:=${os.moveops[i].toPerm().inv().toGap()};`);
      } else {
        r.push(`${movename}:=${os.moveops[i].toPerm().toGap()};`);
      }
    }
    r.push("Gen:=[");
    r.push(mvs.join(","));
    r.push("];");
    const ip = os.solved.identicalPieces();
    r.push(
      `ip:=[${ip.map((_) => `[${_.map((__) => __ + 1).join(",")}]`).join(",")}];`
    );
    r.push("# Size(Group(Gen));");
    r.push("# Size(Stabilizer(Group(Gen), ip, OnTuplesSets));");
    r.push("");
    return this.header("# ") + r.join("\n");
  }
  writemathematica() {
    const os = this.getOrbitsDef(false);
    const r = [];
    const mvs = [];
    r.push(`(* ${this.header("").trim()} *)`);
    for (let i = 0; i < os.moveops.length; i++) {
      let movename = `m${externalName(this.notationMapper, os.movenames[i])}`;
      let doinv = false;
      if (movename[movename.length - 1] === "'") {
        movename = movename.substring(0, movename.length - 1);
        doinv = true;
      }
      mvs.push(movename);
      if (doinv) {
        r.push(`${movename}=${os.moveops[i].toPerm().inv().toMathematica()};`);
      } else {
        r.push(`${movename}=${os.moveops[i].toPerm().toMathematica()};`);
      }
    }
    r.push(`gen={${mvs.join(",")}};`);
    return r.join("\n");
  }
  writeksolve(name = "PuzzleGeometryPuzzle") {
    const od = this.getOrbitsDef(false);
    return this.header("# ") + od.toKsolve(name, this.notationMapper).join("\n");
  }
  getKPuzzleDefinition(fortwisty = true, includemoves = true) {
    const od = this.getOrbitsDef(fortwisty, includemoves);
    const internalDefinition = od.toKPuzzleDefinition(includemoves);
    internalDefinition.experimentalPuzzleDescription = this.puzzleDescription;
    if (!internalDefinition) {
      throw Error("Missing definition!");
    }
    return internalDefinition;
  }
  getMoveFromBits(moverange, amount, inverted, axiscmoves, setmoves, movesetorder) {
    const moveorbits = [];
    const perms = [];
    const oris = [];
    for (const len of this.cubieOrbitSizes) {
      perms.push(iota(len));
      oris.push(zeros(len));
    }
    for (let m = moverange[0]; m <= moverange[1]; m++) {
      const slicecmoves = axiscmoves[m];
      for (let j = 0; j < slicecmoves.length; j += 2 * movesetorder) {
        const mperm = slicecmoves.slice(j, j + 2 * movesetorder);
        const setnum = this.cubieSetNums[mperm[0]];
        for (let ii = 0; ii < mperm.length; ii += 2) {
          mperm[ii] = this.cubieOrdNums[mperm[ii]];
        }
        let inc = 2;
        let oinc = 3;
        if (inverted) {
          inc = mperm.length - 2;
          oinc = mperm.length - 1;
        }
        if (perms[setnum] === iota(this.cubieOrbitSizes[setnum])) {
          perms[setnum] = perms[setnum].slice();
          if (this.orbitOrientations[setnum] > 1 && // TODO: refactor to avoid non-null-assertion
          !this.options.fixedOrientation) {
            oris[setnum] = oris[setnum].slice();
          }
        }
        for (let ii = 0; ii < mperm.length; ii += 2) {
          perms[setnum][mperm[(ii + inc) % mperm.length]] = mperm[ii];
          if (this.orbitOrientations[setnum] > 1 && // TODO: refactor to avoid non-null-assertion
          !this.options.fixedOrientation) {
            oris[setnum][mperm[ii]] = (mperm[(ii + oinc) % mperm.length] - mperm[(ii + 1) % mperm.length] + 2 * this.orbitOrientations[setnum]) % // TODO: refactor to avoid non-null-assertion
            this.orbitOrientations[setnum];
          }
        }
      }
    }
    let lastId = new PGOrbit(iota(24), zeros(24), 1);
    for (let ii = 0; ii < this.cubieSetNames.length; ii++) {
      if (setmoves && !setmoves[ii]) {
        continue;
      }
      if (this.orbitOrientations[ii] === 1 || this.options.fixedOrientation) {
        if (perms[ii] === iota(lastId.perm.length)) {
          if (perms[ii] !== lastId.perm) {
            lastId = new PGOrbit(perms[ii], oris[ii], 1);
          }
          moveorbits.push(lastId);
        } else {
          moveorbits.push(new PGOrbit(perms[ii], oris[ii], 1));
        }
      } else {
        const no = new Array(oris[ii].length);
        for (let jj = 0; jj < perms[ii].length; jj++) {
          no[jj] = oris[ii][perms[ii][jj]];
        }
        moveorbits.push(
          new PGOrbit(perms[ii], no, this.orbitOrientations[ii])
        );
      }
    }
    let mv = new PGTransform(moveorbits);
    if (amount !== 1) {
      mv = mv.mulScalar(amount);
    }
    return mv;
  }
  omitSet(name) {
    for (const excludedSet of this.options.excludeOrbits) {
      if (excludedSet === name) {
        return true;
      }
    }
    return false;
  }
  diffmvsets(a, b, slices, neg) {
    for (let i = 0; i < a.length; i += 2) {
      let found = false;
      for (let j = 0; !found && j < b.length; j += 2) {
        if (neg) {
          if (a[i][0] + b[j][1] === slices && a[i][1] + b[j][0] === slices && a[i + 1] === b[j + 1]) {
            found = true;
          }
        } else {
          if (a[i][0] === b[j][0] && a[i][1] === b[j][1] && a[i + 1] === b[j + 1]) {
            found = true;
          }
        }
      }
      if (!found) {
        return true;
      }
    }
    return false;
  }
  // TODO: This is only public for testing; can we make it private again?
  getOrbitsDef(fortwisty, includemoves = true) {
    const setmoves = [];
    if (fortwisty) {
      for (let i = 0; i < this.cubieSetNames.length; i++) {
        setmoves.push(1);
      }
    }
    const setnames = [];
    const setdefs = [];
    const mps = [];
    const addrot = [];
    for (let k = 0; k < this.movePlaneSets.length; k++) {
      const moveset = this.getmovesets(k);
      mps.push(moveset);
      if (this.options.addRotations) {
        addrot.push(1);
      } else {
        addrot.push(0);
      }
    }
    const hasrotation = [];
    for (let k = 0; k < this.movePlaneSets.length; k++) {
      const slices = this.movePlaneSets[k].length;
      let sawone = false;
      const moveset = mps[k];
      for (let i = 0; i < moveset.length; i += 2) {
        if (moveset[i][0] === 0 && moveset[i][1] === slices) {
          sawone = true;
        }
      }
      hasrotation[k] = sawone;
    }
    if (this.options.addRotations && (this.options.moveList || this.options.fixedPieceType !== null)) {
      for (let i = 0; i < this.moveRotations.length; i++) {
        addrot[i] = 0;
      }
      for (let k = 0; k < this.movePlaneSets.length; k++) {
        if (hasrotation[k]) {
          addrot[k] = 3;
          continue;
        }
        for (let i = 0; i < this.moveRotations.length; i++) {
          let nn = this.movePlaneNormals[k];
          for (let ii = 1; ii * 2 <= this.movesetorders[i]; ii++) {
            nn = nn.rotatepoint(this.moveRotations[i][0]);
            if (addrot[i] & ii) {
              continue;
            }
            let found = -1;
            let neg = false;
            for (let j = 0; j < this.movePlaneNormals.length; j++) {
              if (nn.dist(this.movePlaneNormals[j]) < eps3) {
                found = j;
                break;
              } else if (nn.dist(this.movePlaneNormals[j].smul(-1)) < eps3) {
                found = j;
                neg = true;
                break;
              }
            }
            if (found < 0) {
              throw Error("Could not find rotation");
            }
            const cmp = mps[found];
            if (cmp.length !== mps[k].length || this.movePlaneSets[k].length !== // TODO
            this.movePlaneSets[found].length || // TODO
            this.diffmvsets(
              cmp,
              mps[k],
              this.movePlaneSets[found].length,
              // TODO
              neg
            )) {
              addrot[i] |= ii;
            }
          }
        }
      }
      for (let i = 0; i < this.moveRotations.length; i++) {
        if (addrot[i] === 0) {
          addrot[i] = 1;
        } else if (addrot[i] === 1) {
          if (this.movesetorders[i] > 3) {
            addrot[i] = 2;
          } else {
            addrot[i] = 0;
          }
        } else if (addrot[i] === 3) {
          addrot[i] = 0;
        } else {
          throw Error("Impossible addrot val");
        }
      }
    }
    for (let k = 0; k < this.movePlaneSets.length; k++) {
      if (addrot[k] !== 0 && !hasrotation[k]) {
        mps[k].push([0, this.movePlaneSets[k].length]);
        mps[k].push(addrot[k]);
      }
    }
    for (let k = 0; k < this.movePlaneSets.length; k++) {
      const moveset = mps[k];
      const movesetorder = this.movesetorders[k];
      for (let i = 0; i < moveset.length; i += 2) {
        for (let j = 0; j < i; j += 2) {
          if (moveset[i][0] === moveset[j][0] && moveset[i][1] === moveset[j][1]) {
            throw Error("Redundant moves in moveset.");
          }
        }
      }
      const allbits = [];
      for (let i = 0; i < moveset.length; i += 2) {
        for (let j = moveset[i][0]; j <= moveset[i][1]; j++) {
          allbits[j] = 1;
        }
      }
      const axiscmoves = this.cmovesBySlice[k];
      for (let i = 0; i < axiscmoves.length; i++) {
        if (allbits[i] !== 1) {
          continue;
        }
        const slicecmoves = axiscmoves[i];
        for (let j = 0; j < slicecmoves.length; j += 2 * movesetorder) {
          if (this.skipcubie(slicecmoves[j])) {
            continue;
          }
          const ind = this.cubieSetNums[slicecmoves[j]];
          setmoves[ind] = 1;
        }
      }
    }
    for (let i = 0; i < this.cubieSetNames.length; i++) {
      if (!setmoves[i]) {
        continue;
      }
      if (this.omitSet(this.cubieSetNames[i])) {
        setmoves[i] = 0;
        continue;
      }
      setnames.push(this.cubieSetNames[i]);
      setdefs.push(
        new PGOrbitDef(
          this.cubieOrbitSizes[i],
          // TODO: refactor to avoid non-null-assertion
          this.options.fixedOrientation ? 1 : this.orbitOrientations[i]
          // TODO: refactor to avoid non-null-assertion
        )
      );
    }
    const solved = [];
    for (let i = 0; i < this.cubieSetNames.length; i++) {
      if (!setmoves[i]) {
        continue;
      }
      if (this.omitSet(this.cubieSetNames[i])) {
        continue;
      }
      const p = Array(this.cubieOrbitSizes[i]).fill(-1);
      const o = [];
      for (let j = 0; j < this.cubieOrbitSizes[i]; j++) {
        if (fortwisty) {
          p[j] = j;
        } else {
          const cubie = this.cubieSetCubies[i][j];
          p[this.cubieOrdNums[cubie]] = this.cubieValueMap[cubie];
        }
        o.push(0);
      }
      solved.push(
        new PGOrbit(
          p,
          o,
          this.options.fixedOrientation ? 1 : this.orbitOrientations[i]
          // TODO: refactor to avoid non-null-assertion
        )
      );
    }
    const movenames = [];
    const forcenames = [];
    const moves = [];
    const isrots = [];
    if (includemoves) {
      for (let k = 0; k < this.movePlaneSets.length; k++) {
        const moveplaneset = this.movePlaneSets[k];
        const slices = moveplaneset.length;
        const moveset = mps[k];
        const movesetgeo = this.movesetgeos[k];
        for (let i = 0; i < moveset.length; i += 2) {
          const movebits = moveset[i];
          let nameoverride;
          let inverted = false;
          if (this.parsedMoveList !== void 0) {
            for (const parsedmove of this.parsedMoveList) {
              if (parsedmove[1] !== k) {
                continue;
              }
              let r2 = [];
              if (parsedmove[4]) {
                r2 = [parsedmove[2], parsedmove[3]];
              } else {
                r2 = [slices - parsedmove[3], slices - parsedmove[2]];
              }
              if (r2[0] === movebits[0] && r2[1] === movebits[1]) {
                nameoverride = parsedmove[0];
                inverted = !parsedmove[4];
              }
            }
          }
          if (nameoverride) {
            movenames.push(nameoverride);
            forcenames.push(true);
          } else {
            const mna = getmovename(movesetgeo, movebits, slices);
            inverted = mna[1];
            const movename = mna[0];
            if (moveset[i + 1] === 1) {
              movenames.push(movename);
            } else {
              movenames.push(movename + moveset[i + 1]);
            }
            forcenames.push(false);
          }
          isrots.push(movebits[0] === 0 && movebits[1] === slices);
          const mv = this.getMoveFromBits(
            movebits,
            moveset[i + 1],
            inverted,
            this.cmovesBySlice[k],
            setmoves,
            this.movesetorders[k]
            // TODO: refactor to avoid non-null-assertion
          );
          moves.push(mv);
        }
      }
    }
    let r = new PGOrbitsDef(
      setnames,
      setdefs,
      new VisibleState(solved),
      movenames,
      moves,
      isrots,
      forcenames
    );
    if (this.options.optimizeOrbits) {
      r = r.optimize();
    }
    if (this.options.scrambleAmount !== 0) {
      r.scramble(this.options.scrambleAmount);
    }
    return r;
  }
  getScramble(n = 0) {
    const od = this.getOrbitsDef(false);
    return od.toKTransformationData(od.getScrambleTransformation(n));
  }
  getMovesAsPerms() {
    return this.getOrbitsDef(false).moveops.map((_) => _.toPerm());
  }
  showcanon(disp) {
    showcanon(this.getOrbitsDef(false), disp);
  }
  getsolved() {
    const r = [];
    for (let i = 0; i < this.baseFaceCount; i++) {
      for (let j = 0; j < this.stickersPerFace; j++) {
        r.push(i);
      }
    }
    return new Perm(r);
  }
  // Given a rotation description that says to align feature1
  // with a given vector, and then as much as possible feature2
  // with another given vector, return a Quaternion that
  // performs this rotation.
  getOrientationRotation(desiredRotation) {
    const [feature1name, [x1, y1, z1]] = desiredRotation[0];
    const direction1 = new Quat(0, x1, -y1, z1);
    const [feature2name, [x2, y2, z2]] = desiredRotation[1];
    const direction2 = new Quat(0, x2, -y2, z2);
    let feature1 = null;
    let feature2 = null;
    const feature1geoname = this.swizzler.unswizzle(feature1name);
    const feature2geoname = this.swizzler.unswizzle(feature2name);
    for (const gn of this.geometryNormals) {
      if (feature1geoname === gn[1]) {
        feature1 = gn[0];
      }
      if (feature2geoname === gn[1]) {
        feature2 = gn[0];
      }
    }
    if (!feature1) {
      throw Error(`Could not find feature ${feature1name}`);
    }
    if (!feature2) {
      throw Error(`Could not find feature ${feature2name}`);
    }
    const r1 = feature1.pointrotation(direction1);
    const feature2rot = feature2.rotatepoint(r1);
    const r2 = feature2rot.unproject(direction1).pointrotation(direction2.unproject(direction1));
    return r2.mul(r1);
  }
  getInitial3DRotation() {
    const basefacecount = this.baseFaceCount;
    let orientationDescription = null;
    if (this.options.puzzleOrientation) {
      orientationDescription = this.options.puzzleOrientation;
    } else if (this.options.puzzleOrientations) {
      orientationDescription = this.options.puzzleOrientations[basefacecount];
    }
    if (!orientationDescription) {
      orientationDescription = defaultOrientations()[basefacecount];
    }
    if (!orientationDescription) {
      throw Error("No default orientation?");
    }
    return this.getOrientationRotation(orientationDescription);
  }
  generate2dmapping(w = 800, h = 500, trim = 10, threed = false, twodshrink = 0.92) {
    w -= 2 * trim;
    h -= 2 * trim;
    function extendedges(a, n) {
      let dx = a[1][0] - a[0][0];
      let dy = a[1][1] - a[0][1];
      const ang = 2 * Math.PI / n;
      const cosa = Math.cos(ang);
      const sina = Math.sin(ang);
      for (let i = 2; i < n; i++) {
        const ndx = dx * cosa + dy * sina;
        dy = dy * cosa - dx * sina;
        dx = ndx;
        a.push([a[i - 1][0] + dx, a[i - 1][1] + dy]);
      }
    }
    this.genperms();
    const boundarygeo = this.getboundarygeometry();
    const face0 = boundarygeo.facenames[0][0];
    const polyn = face0.length;
    const net = this.net;
    if (net === null) {
      throw Error("No net?");
    }
    const edges = {};
    let minx = 0;
    let miny = 0;
    let maxx = 1;
    let maxy = 0;
    edges[net[0][0]] = [
      [1, 0],
      [0, 0]
    ];
    extendedges(edges[net[0][0]], polyn);
    for (const neti of net) {
      const f0 = neti[0];
      if (!edges[f0]) {
        throw Error("Bad edge description; first edge not connected.");
      }
      for (let j = 1; j < neti.length; j++) {
        const f1 = neti[j];
        if (f1 === "" || edges[f1]) {
          continue;
        }
        edges[f1] = [edges[f0][j % polyn], edges[f0][(j + polyn - 1) % polyn]];
        extendedges(edges[f1], polyn);
      }
    }
    for (const f in edges) {
      const es = edges[f];
      for (const esi of es) {
        minx = Math.min(minx, esi[0]);
        maxx = Math.max(maxx, esi[0]);
        miny = Math.min(miny, esi[1]);
        maxy = Math.max(maxy, esi[1]);
      }
    }
    const sc = Math.min(w / (maxx - minx), h / (maxy - miny));
    const xoff = 0.5 * (w - sc * (maxx + minx));
    const yoff = 0.5 * (h - sc * (maxy + miny));
    const geos = {};
    const bg = this.getboundarygeometry();
    const edges2 = {};
    const initv = [
      [sc + xoff, yoff],
      [xoff, yoff]
    ];
    edges2[net[0][0]] = initv;
    extendedges(edges2[net[0][0]], polyn);
    geos[this.faceNames[0][1]] = this.project2d(0, 0, [
      new Quat(0, initv[0][0], initv[0][1], 0),
      new Quat(0, initv[1][0], initv[1][1], 0)
    ]);
    const connectat = [];
    connectat[0] = 0;
    for (const neti of net) {
      const f0 = neti[0];
      if (!edges2[f0]) {
        throw Error("Bad edge description; first edge not connected.");
      }
      let gfi = -1;
      for (let j = 0; j < bg.facenames.length; j++) {
        if (f0 === bg.facenames[j][1]) {
          gfi = j;
          break;
        }
      }
      if (gfi < 0) {
        throw Error(`Could not find first face name ${f0}`);
      }
      const thisface = bg.facenames[gfi][0];
      for (let j = 1; j < neti.length; j++) {
        const f1 = neti[j];
        if (f1 === "" || edges2[f1]) {
          continue;
        }
        edges2[f1] = [
          edges2[f0][j % polyn],
          edges2[f0][(j + polyn - 1) % polyn]
        ];
        extendedges(edges2[f1], polyn);
        const caf0 = connectat[gfi];
        const mp = thisface[(caf0 + j) % polyn].sum(thisface[(caf0 + j + polyn - 1) % polyn]).smul(0.5);
        const epi = findelement(bg.edgenames, mp);
        const edgename = bg.edgenames[epi][1];
        const el = splitByFaceNames(edgename, this.faceNames);
        const gf1 = el[f0 === el[0] ? 1 : 0];
        let gf1i = -1;
        for (let k = 0; k < bg.facenames.length; k++) {
          if (gf1 === bg.facenames[k][1]) {
            gf1i = k;
            break;
          }
        }
        if (gf1i < 0) {
          throw Error("Could not find second face name");
        }
        const otherface = bg.facenames[gf1i][0];
        for (let k = 0; k < otherface.length; k++) {
          const mp2 = otherface[k].sum(otherface[(k + 1) % polyn]).smul(0.5);
          if (mp2.dist(mp) <= eps3) {
            const p1 = edges2[f0][(j + polyn - 1) % polyn];
            const p2 = edges2[f0][j % polyn];
            connectat[gf1i] = k;
            geos[gf1] = this.project2d(gf1i, k, [
              new Quat(0, p2[0], p2[1], 0),
              new Quat(0, p1[0], p1[1], 0)
            ]);
            break;
          }
        }
      }
    }
    let hix = 0;
    let hiy = 0;
    const rot = this.getInitial3DRotation();
    for (let face of this.faces) {
      if (threed) {
        face = face.rotate(rot);
      }
      for (let j = 0; j < face.length; j++) {
        hix = Math.max(hix, Math.abs(face.get(j).b));
        hiy = Math.max(hiy, Math.abs(face.get(j).c));
      }
    }
    const sc2 = Math.min(h / hiy / 2, (w - trim) / hix / 4);
    const mappt2d = (fn, q) => {
      if (threed) {
        q = q.rotatepoint(rot);
        const xoff2 = 0.5 * trim + 0.25 * w;
        const xmul = this.basePlanes[fn].rotateplane(rot).d < 0 ? 1 : -1;
        return [
          trim + w * 0.5 + xmul * (xoff2 - q.b * sc2),
          trim + h * 0.5 + q.c * sc2
        ];
      } else {
        const g = geos[this.faceNames[fn][1]];
        return [
          trim + twodshrink * q.dot(g[0]) + g[2].b,
          trim + h - twodshrink * q.dot(g[1]) - g[2].c
        ];
      }
    };
    return mappt2d;
  }
  generatesvg(w = 800, h = 500, trim = 10, threed = false) {
    const mappt2d = this.generate2dmapping(w, h, trim, threed);
    function drawedges(id, pts, color) {
      return `<polygon id="${id}" class="sticker" style="fill: ${color}" points="${pts.map((p) => `${p[0]} ${p[1]}`).join(" ")}"/>
`;
    }
    const pos = this.getsolved();
    const colormap = [];
    const facegeo = [];
    for (let i = 0; i < this.baseFaceCount; i++) {
      colormap[i] = this.colors[this.faceNames[i][1]];
    }
    for (let i = 0; i < this.faces.length; i++) {
      const face = this.faces[i];
      const facenum = Math.floor(i / this.stickersPerFace);
      const fg = [];
      for (let j = 0; j < face.length; j++) {
        fg.push(mappt2d(facenum, face.get(j)));
      }
      facegeo.push(fg);
    }
    const svg = [];
    for (let j = 0; j < this.baseFaceCount; j++) {
      svg.push("<g>");
      svg.push(`<title>${this.faceNames[j][1]}</title>
`);
      for (let ii = 0; ii < this.stickersPerFace; ii++) {
        const i = j * this.stickersPerFace + ii;
        const cubie = this.faceToCubie[i];
        const cubieori = this.faceToCubieOrd[i];
        const cubiesetnum = this.cubieSetNums[cubie];
        const cubieord = this.cubieOrdNums[cubie];
        const color = this.graybyori(cubie) ? "#808080" : colormap[pos.p[i]];
        let id = `${this.cubieSetNames[cubiesetnum]}-l${cubieord}-o${cubieori}`;
        svg.push(drawedges(id, facegeo[i], color));
        if (this.duplicatedFaces[i]) {
          for (let jj = 1; jj < this.duplicatedFaces[i]; jj++) {
            id = `${this.cubieSetNames[cubiesetnum]}-l${cubieord}-o${jj}`;
            svg.push(drawedges(id, facegeo[i], color));
          }
        }
      }
      svg.push("</g>");
    }
    const html = `<svg id="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 800 500">
<style type="text/css"><![CDATA[.sticker { stroke: #000000; stroke-width: 1px; }]]></style>
${svg.join(
      ""
    )}</svg>`;
    return html;
  }
  // The colorfrac parameter says how much of the face should be
  // colored (vs dividing lines); we default to 0.77 which seems
  // to work pretty well.  It should be a number between probably
  // 0.4 and 0.9.
  get3d(options) {
    const stickers = [];
    const rot = this.getInitial3DRotation();
    const faces = [];
    const maxdist = 0.52 * this.baseFaces[0].get(0).len();
    for (let i = 0; i < this.baseFaces.length; i++) {
      const coords = this.baseFaces[i].rotate(rot);
      const name = this.faceNames[i][1];
      faces.push({ coords: toFaceCoords(coords, maxdist), name });
    }
    for (let i = 0; i < this.faces.length; i++) {
      const facenum = Math.floor(i / this.stickersPerFace);
      const cubie = this.faceToCubie[i];
      const cubieori = this.faceToCubieOrd[i];
      const cubiesetnum = this.cubieSetNums[cubie];
      const cubieord = this.cubieOrdNums[cubie];
      let color = this.graybyori(cubie) ? options?.darkIgnoredOrbits ? "#222222" : "#808080" : this.colors[this.faceNames[facenum][1]];
      if (options?.stickerColors) {
        color = options.stickerColors[i];
      }
      const coords = this.faces[i].rotate(rot);
      stickers.push({
        coords: toFaceCoords(coords, maxdist),
        color,
        orbit: this.cubieSetNames[cubiesetnum],
        // TODO: refactor to avoid non-null-assertion
        ord: cubieord,
        ori: cubieori,
        face: facenum
      });
      let fcoords = coords;
      if (this.duplicatedFaces[i]) {
        const rotdist = fcoords.length / this.duplicatedFaces[i];
        for (let jj = 1; jj < this.duplicatedFaces[i]; jj++) {
          for (let k = 0; k < rotdist; k++) {
            fcoords = fcoords.rotateforward();
          }
          stickers.push({
            coords: toFaceCoords(fcoords, maxdist),
            color,
            orbit: this.cubieSetNames[cubiesetnum],
            // TODO: refactor to avoid non-null-assertion
            ord: cubieord,
            ori: jj,
            face: facenum,
            isDup: true
          });
        }
      }
    }
    const grips = [];
    for (let i = 0; i < this.movesetgeos.length; i++) {
      const msg = this.movesetgeos[i];
      const order = this.movesetorders[i];
      for (const gn of this.geometryNormals) {
        if (msg[0] === gn[1] && msg[1] === gn[2]) {
          grips.push({
            coordinates: toCoords(gn[0].rotatepoint(rot), 1),
            quantumMove: new Move(msg[0]),
            order
          });
          grips.push({
            coordinates: toCoords(gn[0].rotatepoint(rot).smul(-1), 1),
            quantumMove: new Move(msg[2]),
            order
          });
        }
      }
    }
    const twodmapper = this.generate2dmapping(2880, 2160, 0, false, 1);
    const g = (() => {
      const irot = rot.invrot();
      return (facenum, coords) => {
        let q = new Quat(
          0,
          coords[0] * maxdist,
          -coords[1] * maxdist,
          coords[2] * maxdist
        );
        q = q.rotatepoint(irot);
        const x = twodmapper(facenum, q);
        x[0] /= 2880;
        x[1] = 1 - x[1] / 2160;
        return x;
      };
    })().bind(this);
    return {
      stickers,
      faces,
      axis: grips,
      unswizzle: this.unswizzle.bind(this),
      notationMapper: this.notationMapper,
      textureMapper: { getuv: g }
    };
  }
  //  From the name of a geometric element (face, vertex, edge), get a
  //  normal vector respecting the default orientation.  This is useful
  //  to define the initial position of the camera in a 3D scene.  The
  //  return value is normalized, so multiply it by the camera distance.
  //  Returns undefined if no such geometric element.
  getGeoNormal(geoname) {
    const rot = this.getInitial3DRotation();
    const grip = this.swizzler.unswizzle(geoname);
    for (const gn of this.geometryNormals) {
      if (grip === gn[1]) {
        const r = toCoords(gn[0].rotatepoint(rot), 1);
        if (Math.abs(r[0]) < eps3 && Math.abs(r[2]) < eps3) {
          r[0] = 0;
          r[2] = 1e-6;
        }
        return r;
      }
    }
    return void 0;
  }
  getfaceindex(facenum) {
    const divid = this.stickersPerFace;
    return Math.floor(facenum / divid);
  }
  textForTwizzleExplorer() {
    return `Faces ${this.basePlaneRotations.length}
Stickers per face ${this.stickersPerFace}
Short edge ${this.shortestEdge}
Cubies ${this.cubies.length}
Edge distance ${this.edgeDistance}
Vertex distance ${this.vertexDistance}`;
  }
  writeSchreierSims(tw) {
    const os = this.getOrbitsDef(false);
    const as = os.reassemblySize();
    tw(`Reassembly size is ${as}`);
    const ss = schreierSims(this.getMovesAsPerms(), tw);
    const r = as / ss;
    tw(`Ratio is ${r}`);
  }
};
var PGNotation = class {
  constructor(pg, od) {
    this.pg = pg;
    this.orbitNames = od.orbitnames;
  }
  orbitNames;
  lookupMove(move) {
    const mv = this.pg.parseMove(move);
    if (this.pg.parsedMoveList) {
      let found = false;
      for (const parsedmove of this.pg.parsedMoveList) {
        if (parsedmove[1] === mv[1] && parsedmove[2] === mv[2] && parsedmove[3] === mv[3] && parsedmove[4] === mv[4]) {
          found = true;
        }
      }
      if (!found) {
        return null;
      }
    }
    let bits = [mv[2], mv[3]];
    if (!mv[4]) {
      const slices = this.pg.movePlaneSets[mv[1]].length;
      bits = [slices - mv[3], slices - mv[2]];
    }
    const pgmv = this.pg.getMoveFromBits(
      bits,
      mv[5],
      !mv[4],
      this.pg.cmovesBySlice[mv[1]],
      void 0,
      this.pg.movesetorders[mv[1]]
      // TODO: refactor to avoid non-null-assertion
    );
    const r = PGOrbitsDef.transformToKTransformationData(this.orbitNames, pgmv);
    return r;
  }
  remapKPuzzleDefinition(kpuzzleDefinition) {
    return remapKPuzzleDefinition(kpuzzleDefinition, this.pg.notationMapper);
  }
};
export {
  PUZZLE_BASE_SHAPES as EXPERIMENTAL_PUZZLE_BASE_SHAPES,
  PUZZLE_CUT_TYPES as EXPERIMENTAL_PUZZLE_CUT_TYPES,
  PGNotation as ExperimentalPGNotation,
  PuzzleGeometry,
  Quat,
  getPG3DNamedPuzzles,
  getPuzzleDescriptionString,
  getPuzzleGeometryByDesc,
  getPuzzleGeometryByName,
  parsePuzzleDescription,
  schreierSims
};
//# sourceMappingURL=index.js.map

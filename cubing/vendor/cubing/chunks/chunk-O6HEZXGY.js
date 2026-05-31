// src/cubing/alg/common.ts
var writeAlgDebugField = false;
var Comparable = class {
  is(c) {
    return this instanceof c;
  }
  as(c) {
    return this instanceof c ? this : null;
  }
};
var AlgCommon = class extends Comparable {
  constructor() {
    super();
    if (writeAlgDebugField) {
      Object.defineProperty(this, "_debugStr", {
        get: () => {
          return this.toString();
        }
      });
    }
  }
  get log() {
    return console.log.bind(console, this, this.toString());
  }
};

// src/cubing/alg/iteration.ts
function toggleDirection(iterationDirection, flip = true) {
  if (!flip) {
    return iterationDirection;
  }
  switch (iterationDirection) {
    case 1 /* Forwards */:
      return -1 /* Backwards */;
    case -1 /* Backwards */:
      return 1 /* Forwards */;
  }
}
function direct(g, iterDir) {
  return iterDir === -1 /* Backwards */ ? Array.from(g).reverse() : g;
}
function reverse(g) {
  return Array.from(g).reverse();
}
function* directedGenerator(g, direction) {
  direction === -1 /* Backwards */ ? yield* reverseGenerator(g) : yield* g;
}
function* reverseGenerator(g) {
  for (const t of Array.from(g).reverse()) {
    yield t;
  }
}

// src/cubing/alg/alg-nodes/containers/Commutator.ts
var Commutator = class _Commutator extends AlgCommon {
  #A;
  #B;
  constructor(aSource, bSource) {
    super();
    this.#A = experimentalEnsureAlg(aSource);
    this.#B = experimentalEnsureAlg(bSource);
  }
  get A() {
    return this.#A;
  }
  get B() {
    return this.#B;
  }
  isIdentical(other) {
    const otherAsCommutator = other.as(_Commutator);
    return !!(otherAsCommutator?.A.isIdentical(this.A) && otherAsCommutator?.B.isIdentical(this.B));
  }
  invert() {
    return new _Commutator(this.#B, this.#A);
  }
  *experimentalExpand(iterDir = 1 /* Forwards */, depth) {
    depth ??= Infinity;
    if (depth === 0) {
      yield iterDir === 1 /* Forwards */ ? this : this.invert();
    } else {
      if (iterDir === 1 /* Forwards */) {
        yield* this.A.experimentalExpand(
          1 /* Forwards */,
          depth - 1
        );
        yield* this.B.experimentalExpand(
          1 /* Forwards */,
          depth - 1
        );
        yield* this.A.experimentalExpand(
          -1 /* Backwards */,
          depth - 1
        );
        yield* this.B.experimentalExpand(
          -1 /* Backwards */,
          depth - 1
        );
      } else {
        yield* this.B.experimentalExpand(
          1 /* Forwards */,
          depth - 1
        );
        yield* this.A.experimentalExpand(
          1 /* Forwards */,
          depth - 1
        );
        yield* this.B.experimentalExpand(
          -1 /* Backwards */,
          depth - 1
        );
        yield* this.A.experimentalExpand(
          -1 /* Backwards */,
          depth - 1
        );
      }
    }
  }
  toString(experimentalSerializationOptions) {
    return `[${this.#A.toString(experimentalSerializationOptions)}, ${this.#B.toString(experimentalSerializationOptions)}]`;
  }
};

// src/cubing/alg/alg-nodes/containers/Conjugate.ts
var Conjugate = class _Conjugate extends AlgCommon {
  #A;
  #B;
  constructor(aSource, bSource) {
    super();
    this.#A = experimentalEnsureAlg(aSource);
    this.#B = experimentalEnsureAlg(bSource);
  }
  get A() {
    return this.#A;
  }
  get B() {
    return this.#B;
  }
  isIdentical(other) {
    const otherAsConjugate = other.as(_Conjugate);
    return !!(otherAsConjugate?.A.isIdentical(this.A) && otherAsConjugate?.B.isIdentical(this.B));
  }
  invert() {
    return new _Conjugate(this.#A, this.#B.invert());
  }
  *experimentalExpand(iterDir, depth) {
    depth ??= Infinity;
    if (depth === 0) {
      yield iterDir === 1 /* Forwards */ ? this : this.invert();
    } else {
      yield* this.A.experimentalExpand(1 /* Forwards */, depth - 1);
      yield* this.B.experimentalExpand(iterDir, depth - 1);
      yield* this.A.experimentalExpand(-1 /* Backwards */, depth - 1);
    }
  }
  toString(experimentalSerializationOptions) {
    return `[${this.A.toString(experimentalSerializationOptions)}: ${this.B.toString(experimentalSerializationOptions)}]`;
  }
};

// src/cubing/alg/limits.ts
var MAX_INT = 2147483647;
var MAX_INT_DESCRIPTION = "2^31 - 1";
var MIN_INT = -2147483648;

// src/cubing/alg/AlgBuilder.ts
var AlgBuilder = class {
  #algNodes = [];
  push(u) {
    this.#algNodes.push(u);
  }
  // TODO: Allow FlexibleAlgSource?
  /** @deprecated */
  experimentalPushAlg(alg) {
    for (const u of alg.childAlgNodes()) {
      this.push(u);
    }
  }
  // TODO: can we guarantee this to be fast in the permanent API?
  experimentalNumAlgNodes() {
    return this.#algNodes.length;
  }
  // can be called multiple times, even if you push alg nodes inbetween.
  toAlg() {
    return new Alg(this.#algNodes);
  }
  reset() {
    this.#algNodes = [];
  }
};

// src/cubing/alg/alg-nodes/leaves/LineComment.ts
var LineComment = class _LineComment extends AlgCommon {
  #text;
  constructor(commentText) {
    super();
    if (commentText.includes("\n") || commentText.includes("\r")) {
      throw new Error("LineComment cannot contain newline");
    }
    this.#text = commentText;
  }
  get text() {
    return this.#text;
  }
  isIdentical(other) {
    const otherAsLineComment = other;
    return other.is(_LineComment) && this.#text === otherAsLineComment.#text;
  }
  invert() {
    return this;
  }
  *experimentalExpand(_iterDir = 1 /* Forwards */, _depth = Infinity) {
    yield this;
  }
  toString(_experimentalSerializationOptions) {
    return `//${this.#text}`;
  }
  // toJSON(): LineCommentJSON {
  //   return {
  //     type: "comment",
  //     text: this.#text,
  //   };
  // }
};

// src/cubing/alg/alg-nodes/leaves/Newline.ts
var Newline = class _Newline extends AlgCommon {
  toString(_experimentalSerializationOptions) {
    return "\n";
  }
  isIdentical(other) {
    return other.is(_Newline);
  }
  invert() {
    return this;
  }
  *experimentalExpand(_iterDir = 1 /* Forwards */, _depth = Infinity) {
    yield this;
  }
};

// src/cubing/alg/alg-nodes/leaves/Pause.ts
var Pause = class _Pause extends AlgCommon {
  experimentalNISSGrouping;
  // TODO: tie this to the alg
  toString(_experimentalSerializationOptions) {
    return ".";
  }
  isIdentical(other) {
    return other.is(_Pause);
  }
  invert() {
    return this;
  }
  *experimentalExpand(_iterDir = 1 /* Forwards */, _depth = Infinity) {
    yield this;
  }
};

// src/cubing/alg/debug.ts
var algDebugGlobals = {
  caretNISSNotationEnabled: true
};
function setAlgDebug(options) {
  if ("caretNISSNotationEnabled" in options) {
    algDebugGlobals.caretNISSNotationEnabled = !!options.caretNISSNotationEnabled;
  }
}

// src/cubing/alg/parseAlg.ts
function parseIntWithEmptyFallback(n, emptyFallback) {
  return n ? parseInt(n, 10) : emptyFallback;
}
var AMOUNT_REGEX = /^(\d+)?('?)/;
var MOVE_START_REGEX = /^[_\dA-Za-z]/;
var QUANTUM_MOVE_REGEX = /^((([1-9]\d*)-)?([1-9]\d*))?([_A-Za-z]+)/;
var COMMENT_TEXT_REGEX = /^[^\n]*/;
var SQUARE1_PAIR_START_REGEX = /^(-?\d+), ?/;
var SQUARE1_PAIR_END_REGEX = /^(-?\d+)\)/;
function parseAlg(s) {
  return new AlgParser().parseAlg(s);
}
function parseMove(s) {
  return new AlgParser().parseMove(s);
}
function parseQuantumMove(s) {
  return new AlgParser().parseQuantumMove(s);
}
var startCharIndexKey = Symbol("startCharIndex");
var endCharIndexKey = Symbol("endCharIndex");
function addCharIndices(t, startCharIndex, endCharIndex) {
  const parsedT = t;
  parsedT[startCharIndexKey] = startCharIndex;
  parsedT[endCharIndexKey] = endCharIndex;
  return parsedT;
}
function transferCharIndex(from, to) {
  if (startCharIndexKey in from) {
    to[startCharIndexKey] = from[startCharIndexKey];
  }
  if (endCharIndexKey in from) {
    to[endCharIndexKey] = from[endCharIndexKey];
  }
  return to;
}
var AlgParser = class {
  #input = "";
  #idx = 0;
  #nissQueue = [];
  parseAlg(input) {
    this.#input = input;
    this.#idx = 0;
    const alg = this.parseAlgWithStopping([]);
    this.mustBeAtEndOfInput();
    const algNodes = Array.from(alg.childAlgNodes());
    if (this.#nissQueue.length > 0) {
      for (const nissGrouping of this.#nissQueue.reverse()) {
        algNodes.push(nissGrouping);
      }
    }
    const newAlg = new Alg(algNodes);
    const {
      [startCharIndexKey]: startCharIndex,
      [endCharIndexKey]: endCharIndex
    } = alg;
    addCharIndices(newAlg, startCharIndex, endCharIndex);
    return newAlg;
  }
  parseMove(input) {
    this.#input = input;
    this.#idx = 0;
    const move = this.parseMoveImpl();
    this.mustBeAtEndOfInput();
    return move;
  }
  parseQuantumMove(input) {
    this.#input = input;
    this.#idx = 0;
    const quantumMove = this.parseQuantumMoveImpl();
    this.mustBeAtEndOfInput();
    return quantumMove;
  }
  mustBeAtEndOfInput() {
    if (this.#idx !== this.#input.length) {
      throw new Error("parsing unexpectedly ended early");
    }
  }
  parseAlgWithStopping(stopBefore) {
    let algStartIdx = this.#idx;
    let algEndIdx = this.#idx;
    const algBuilder = new AlgBuilder();
    let crowded = false;
    const mustNotBeCrowded = (idx) => {
      if (crowded) {
        throw new Error(
          `Unexpected character at index ${idx}. Are you missing a space?`
        );
      }
    };
    while (this.#idx < this.#input.length) {
      const savedCharIndex = this.#idx;
      if (stopBefore.includes(this.#input[this.#idx])) {
        return addCharIndices(algBuilder.toAlg(), algStartIdx, algEndIdx);
      }
      if (this.tryConsumeNext(" ")) {
        crowded = false;
        if (algBuilder.experimentalNumAlgNodes() === 0) {
          algStartIdx = this.#idx;
        }
      } else if (MOVE_START_REGEX.test(this.#input[this.#idx])) {
        mustNotBeCrowded(savedCharIndex);
        const move = this.parseMoveImpl();
        algBuilder.push(move);
        crowded = true;
        algEndIdx = this.#idx;
      } else if (this.tryConsumeNext("(")) {
        mustNotBeCrowded(savedCharIndex);
        const sq1PairStartMatch = this.tryRegex(SQUARE1_PAIR_START_REGEX);
        if (sq1PairStartMatch) {
          const topAmountString = sq1PairStartMatch[1];
          const savedCharIndexD = this.#idx;
          const sq1PairEndMatch = this.parseRegex(SQUARE1_PAIR_END_REGEX);
          const uMove = addCharIndices(
            new Move(new QuantumMove("U_SQ_"), parseInt(topAmountString, 10)),
            savedCharIndex + 1,
            savedCharIndex + 1 + topAmountString.length
          );
          const dMove = addCharIndices(
            new Move(
              new QuantumMove("D_SQ_"),
              parseInt(sq1PairEndMatch[1], 10)
            ),
            savedCharIndexD,
            this.#idx - 1
          );
          const alg = addCharIndices(
            new Alg([uMove, dMove]),
            savedCharIndex + 1,
            this.#idx - 1
          );
          algBuilder.push(
            addCharIndices(new Grouping(alg), savedCharIndex, this.#idx)
          );
          crowded = true;
          algEndIdx = this.#idx;
        } else {
          const alg = this.parseAlgWithStopping([")"]);
          this.mustConsumeNext(")");
          const amount = this.parseAmount();
          algBuilder.push(
            addCharIndices(
              new Grouping(alg, amount),
              savedCharIndex,
              this.#idx
            )
          );
          crowded = true;
          algEndIdx = this.#idx;
        }
      } else if (this.tryConsumeNext("^")) {
        if (!algDebugGlobals.caretNISSNotationEnabled) {
          throw new Error(
            "Alg contained a caret but caret NISS notation is not enabled."
          );
        }
        this.mustConsumeNext("(");
        const alg = this.parseAlgWithStopping([")"]);
        this.popNext();
        const grouping = new Grouping(alg, -1);
        const placeholder = new Pause();
        grouping.experimentalNISSPlaceholder = placeholder;
        placeholder.experimentalNISSGrouping = grouping;
        this.#nissQueue.push(grouping);
        algBuilder.push(placeholder);
      } else if (this.tryConsumeNext("[")) {
        mustNotBeCrowded(savedCharIndex);
        const A = this.parseAlgWithStopping([",", ":"]);
        const separator = this.popNext();
        const B = this.parseAlgWithStopping(["]"]);
        this.mustConsumeNext("]");
        let unrepeated;
        switch (separator) {
          case ":": {
            unrepeated = addCharIndices(
              new Conjugate(A, B),
              savedCharIndex,
              this.#idx
            );
            crowded = true;
            algEndIdx = this.#idx;
            break;
          }
          case ",": {
            unrepeated = addCharIndices(
              new Commutator(A, B),
              savedCharIndex,
              this.#idx
            );
            crowded = true;
            algEndIdx = this.#idx;
            break;
          }
          default:
            throw new Error("unexpected parsing error");
        }
        const afterClosingBracketIdx = this.#idx;
        const amount = this.parseAmount();
        if (amount === 1) {
          algBuilder.push(unrepeated);
        } else {
          const unrepeatedAlg = addCharIndices(
            new Alg([unrepeated]),
            savedCharIndex,
            afterClosingBracketIdx
          );
          const grouping = addCharIndices(
            new Grouping(unrepeatedAlg, amount),
            savedCharIndex,
            this.#idx
          );
          algBuilder.push(grouping);
        }
        crowded = true;
        algEndIdx = this.#idx;
      } else if (this.tryConsumeNext("\n")) {
        algBuilder.push(
          addCharIndices(new Newline(), savedCharIndex, this.#idx)
        );
        crowded = false;
        algEndIdx = this.#idx;
      } else if (this.tryConsumeNext("/")) {
        if (this.tryConsumeNext("/")) {
          mustNotBeCrowded(savedCharIndex);
          const [text] = this.parseRegex(COMMENT_TEXT_REGEX);
          algBuilder.push(
            addCharIndices(new LineComment(text), savedCharIndex, this.#idx)
          );
          crowded = false;
          algEndIdx = this.#idx;
        } else {
          algBuilder.push(
            addCharIndices(new Move("_SLASH_"), savedCharIndex, this.#idx)
          );
          crowded = true;
          algEndIdx = this.#idx;
        }
      } else if (this.tryConsumeNext(".")) {
        mustNotBeCrowded(savedCharIndex);
        algBuilder.push(addCharIndices(new Pause(), savedCharIndex, this.#idx));
        crowded = true;
        algEndIdx = this.#idx;
      } else {
        throw new Error(`Unexpected character: ${this.popNext()}`);
      }
    }
    if (this.#idx !== this.#input.length) {
      throw new Error("did not finish parsing?");
    }
    if (stopBefore.length > 0) {
      throw new Error("expected stopping");
    }
    return addCharIndices(algBuilder.toAlg(), algStartIdx, algEndIdx);
  }
  parseQuantumMoveImpl() {
    const [, , , outerLayerStr, innerLayerStr, family] = this.parseRegex(QUANTUM_MOVE_REGEX);
    return new QuantumMove(
      family,
      parseIntWithEmptyFallback(innerLayerStr, void 0),
      parseIntWithEmptyFallback(outerLayerStr, void 0)
    );
  }
  parseMoveImpl() {
    const savedCharIndex = this.#idx;
    if (this.tryConsumeNext("/")) {
      return addCharIndices(new Move("_SLASH_"), savedCharIndex, this.#idx);
    }
    let quantumMove = this.parseQuantumMoveImpl();
    let [amount, hadEmptyAbsAmount] = this.parseAmountAndTrackEmptyAbsAmount();
    const suffix = this.parseMoveSuffix();
    if (suffix) {
      if (amount < 0) {
        throw new Error("uh-oh");
      }
      if ((suffix === "++" || suffix === "--") && amount !== 1) {
        throw new Error(
          "Pochmann ++ or -- moves cannot have an amount other than 1."
        );
      }
      if ((suffix === "++" || suffix === "--") && !hadEmptyAbsAmount) {
        throw new Error(
          "Pochmann ++ or -- moves cannot have an amount written as a number."
        );
      }
      if ((suffix === "+" || suffix === "-") && hadEmptyAbsAmount) {
        throw new Error(
          "Clock dial moves must have an amount written as a natural number followed by + or -."
        );
      }
      if (suffix.startsWith("+")) {
        quantumMove = quantumMove.modified({
          family: `${quantumMove.family}_${suffix === "+" ? "PLUS" : "PLUSPLUS"}_`
          // TODO
        });
      }
      if (suffix.startsWith("-")) {
        quantumMove = quantumMove.modified({
          family: `${quantumMove.family}_${suffix === "-" ? "PLUS" : "PLUSPLUS"}_`
          // TODO
        });
        amount *= -1;
      }
    }
    const move = addCharIndices(
      new Move(quantumMove, amount),
      savedCharIndex,
      this.#idx
    );
    return move;
  }
  parseMoveSuffix() {
    if (this.tryConsumeNext("+")) {
      if (this.tryConsumeNext("+")) {
        return "++";
      }
      return "+";
    }
    if (this.tryConsumeNext("-")) {
      if (this.tryConsumeNext("-")) {
        return "--";
      }
      return "-";
    }
    return null;
  }
  parseAmountAndTrackEmptyAbsAmount() {
    const savedIdx = this.#idx;
    const [, absAmountStr, primeStr] = this.parseRegex(AMOUNT_REGEX);
    if (absAmountStr?.startsWith("0") && absAmountStr !== "0") {
      throw new Error(
        `Error at char index ${savedIdx}: An amount can only start with 0 if it's exactly the digit 0.`
      );
    }
    return [
      parseIntWithEmptyFallback(absAmountStr, 1) * (primeStr === "'" ? -1 : 1),
      !absAmountStr
    ];
  }
  parseAmount() {
    const savedIdx = this.#idx;
    const [, absAmountStr, primeStr] = this.parseRegex(AMOUNT_REGEX);
    if (absAmountStr?.startsWith("0") && absAmountStr !== "0") {
      throw new Error(
        `Error at char index ${savedIdx}: An amount number can only start with 0 if it's exactly the digit 0.`
      );
    }
    return parseIntWithEmptyFallback(absAmountStr, 1) * (primeStr === "'" ? -1 : 1);
  }
  parseRegex(regex) {
    const arr = regex.exec(this.remaining());
    if (arr === null) {
      throw new Error("internal parsing error");
    }
    this.#idx += arr[0].length;
    return arr;
  }
  // TOD: can we avoid this?
  tryRegex(regex) {
    const arr = regex.exec(this.remaining());
    if (arr === null) {
      return null;
    }
    this.#idx += arr[0].length;
    return arr;
  }
  remaining() {
    return this.#input.slice(this.#idx);
  }
  popNext() {
    const next = this.#input[this.#idx];
    this.#idx++;
    return next;
  }
  tryConsumeNext(expected) {
    if (this.#input[this.#idx] === expected) {
      this.#idx++;
      return true;
    }
    return false;
  }
  mustConsumeNext(expected) {
    const next = this.popNext();
    if (next !== expected) {
      throw new Error(
        `expected \`${expected}\` while parsing, encountered ${next}`
      );
    }
    return next;
  }
};

// src/cubing/alg/warnOnce.ts
var warned = /* @__PURE__ */ new Set();
function warnOnce(s) {
  if (!warned.has(s)) {
    console.warn(s);
    warned.add(s);
  }
}

// src/cubing/alg/alg-nodes/QuantumWithAmount.ts
var QuantumWithAmount = class {
  quantum;
  amount;
  constructor(quantum, amount = 1) {
    this.quantum = quantum;
    this.amount = amount;
    if (!Number.isInteger(this.amount) || this.amount < MIN_INT || this.amount > MAX_INT) {
      throw new Error(
        `AlgNode amount absolute value must be a non-negative integer below ${MAX_INT_DESCRIPTION}.`
      );
    }
  }
  suffix() {
    let s = "";
    const absAmount = Math.abs(this.amount);
    if (absAmount !== 1) {
      s += absAmount;
    }
    if (this.amount < 0) {
      s += "'";
    }
    return s;
  }
  isIdentical(other) {
    return this.quantum.isIdentical(other.quantum) && this.amount === other.amount;
  }
  // TODO: `Conjugate` and `Commutator` decrement `depth` inside the quantum, `Grouping` has to do it outside the quantum.
  *experimentalExpand(iterDir, depth) {
    const absAmount = Math.abs(this.amount);
    const newIterDir = toggleDirection(iterDir, this.amount < 0);
    for (let i = 0; i < absAmount; i++) {
      yield* this.quantum.experimentalExpand(newIterDir, depth);
    }
  }
};

// src/cubing/alg/alg-nodes/leaves/Move.ts
var QuantumMove = class _QuantumMove extends Comparable {
  #family;
  #innerLayer;
  #outerLayer;
  constructor(family, innerLayer, outerLayer) {
    super();
    this.#family = family;
    this.#innerLayer = innerLayer ?? null;
    this.#outerLayer = outerLayer ?? null;
    Object.freeze(this);
    if (this.#innerLayer !== null && (!Number.isInteger(this.#innerLayer) || this.#innerLayer < 1 || this.#innerLayer > MAX_INT)) {
      throw new Error(
        `QuantumMove inner layer must be a positive integer below ${MAX_INT_DESCRIPTION}.`
      );
    }
    if (this.#outerLayer !== null && (!Number.isInteger(this.#outerLayer) || this.#outerLayer < 1 || this.#outerLayer > MAX_INT)) {
      throw new Error(
        `QuantumMove outer layer must be a positive integer below ${MAX_INT_DESCRIPTION}.`
      );
    }
    if (this.#outerLayer !== null && this.#innerLayer !== null && this.#innerLayer <= this.#outerLayer) {
      throw new Error(
        "QuantumMove outer layer must be smaller than inner layer."
      );
    }
    if (this.#outerLayer !== null && this.#innerLayer === null) {
      throw new Error(
        "QuantumMove with an outer layer must have an inner layer"
      );
    }
  }
  static fromString(s) {
    return parseQuantumMove(s);
  }
  // TODO: `modify`?
  modified(modifications) {
    return new _QuantumMove(
      modifications.family ?? this.#family,
      modifications.innerLayer ?? this.#innerLayer,
      modifications.outerLayer ?? this.#outerLayer
    );
  }
  isIdentical(other) {
    const otherAsQuantumMove = other;
    return other.is(_QuantumMove) && this.#family === otherAsQuantumMove.#family && this.#innerLayer === otherAsQuantumMove.#innerLayer && this.#outerLayer === otherAsQuantumMove.#outerLayer;
  }
  // TODO: provide something more useful on average.
  /** @deprecated */
  get family() {
    return this.#family;
  }
  // TODO: provide something more useful on average.
  /** @deprecated */
  get outerLayer() {
    return this.#outerLayer;
  }
  // TODO: provide something more useful on average.
  /** @deprecated */
  get innerLayer() {
    return this.#innerLayer;
  }
  experimentalExpand() {
    throw new Error(
      "experimentalExpand() cannot be called on a `QuantumMove` directly."
    );
  }
  toString(_experimentalSerializationOptions) {
    let s = this.#family;
    if (this.#innerLayer !== null) {
      s = String(this.#innerLayer) + s;
      if (this.#outerLayer !== null) {
        s = `${String(this.#outerLayer)}-${s}`;
      }
    }
    return s;
  }
};
var Move = class _Move extends AlgCommon {
  // @ts-expect-error False positive due to the `return` in the constructor.
  #quantumWithAmount;
  constructor(...args) {
    super();
    if (typeof args[0] === "string") {
      if (args[1] ?? null) {
        this.#quantumWithAmount = new QuantumWithAmount(
          QuantumMove.fromString(args[0]),
          args[1]
        );
        return;
      } else {
        return _Move.fromString(args[0]);
      }
    }
    this.#quantumWithAmount = new QuantumWithAmount(
      args[0],
      args[1]
    );
  }
  isIdentical(other) {
    const otherAsMove = other.as(_Move);
    return !!otherAsMove && this.#quantumWithAmount.isIdentical(otherAsMove.#quantumWithAmount);
  }
  invert() {
    return transferCharIndex(
      this,
      new _Move(
        this.#quantumWithAmount.quantum,
        this.#isSlash() ? this.amount : -this.amount
      )
    );
  }
  *experimentalExpand(iterDir = 1 /* Forwards */) {
    if (iterDir === 1 /* Forwards */) {
      yield this;
    } else {
      yield this.modified({
        amount: -this.amount
      });
    }
  }
  get quantum() {
    return this.#quantumWithAmount.quantum;
  }
  // TODO: `modify`?
  modified(modifications) {
    return new _Move(
      this.#quantumWithAmount.quantum.modified(modifications),
      modifications.amount ?? this.amount
    );
  }
  static fromString(s) {
    return parseMove(s);
  }
  get amount() {
    return this.#quantumWithAmount.amount;
  }
  /** @deprecated */
  get type() {
    warnOnce("deprecated: type");
    return "blockMove";
  }
  /** @deprecated */
  get family() {
    return this.#quantumWithAmount.quantum.family ?? void 0;
  }
  /** @deprecated */
  get outerLayer() {
    return this.#quantumWithAmount.quantum.outerLayer ?? void 0;
  }
  /** @deprecated */
  get innerLayer() {
    return this.#quantumWithAmount.quantum.innerLayer ?? void 0;
  }
  #cachedSlashMove;
  #isSlash() {
    return this.isIdentical(this.#cachedSlashMove ??= new _Move("_SLASH_"));
  }
  toString(experimentalSerializationOptions) {
    if (experimentalSerializationOptions?.notation !== "LGN") {
      if (this.#isSlash()) {
        return "/";
      }
      if (this.family.endsWith("_PLUS_")) {
        return this.#quantumWithAmount.quantum.toString().slice(0, -6) + Math.abs(this.amount) + (this.amount < 0 ? "-" : "+");
      }
      if (this.family.endsWith("_PLUSPLUS_")) {
        const absAmount = Math.abs(this.amount);
        return this.#quantumWithAmount.quantum.toString().slice(0, -10) + (absAmount === 1 ? "" : absAmount) + (this.amount < 0 ? "--" : "++");
      }
    }
    return this.#quantumWithAmount.quantum.toString(
      experimentalSerializationOptions
    ) + this.#quantumWithAmount.suffix();
  }
  // // TODO: Serialize as a string?
  // toJSON(): MoveJSON {
  //   return {
  //     type: "move",
  //     family: this.family,
  //     innerLayer: this.innerLayer,
  //     outerLayer: this.outerLayer,
  //   };
  // }
};

// src/cubing/alg/alg-nodes/containers/Grouping.ts
var Square1TupleFormatter = class {
  quantumU_SQ_ = null;
  quantumD_SQ_ = null;
  format(grouping, experimentalSerializationOptions) {
    if (experimentalSerializationOptions?.notation === "LGN") {
      return null;
    }
    if (grouping.amount !== 1) {
      return null;
    }
    const amounts = this.tuple(grouping);
    if (!amounts) {
      return null;
    }
    return `(${amounts.map((move) => move.amount).join(", ")})`;
  }
  tuple(grouping) {
    if (grouping.amount !== 1) {
      return null;
    }
    this.quantumU_SQ_ ||= new QuantumMove("U_SQ_");
    this.quantumD_SQ_ ||= new QuantumMove("D_SQ_");
    const quantumAlg = grouping.alg;
    if (quantumAlg.experimentalNumChildAlgNodes() === 2) {
      const [U, D] = quantumAlg.childAlgNodes();
      if (U.as(Move)?.quantum.isIdentical(this.quantumU_SQ_) && D.as(Move)?.quantum.isIdentical(this.quantumD_SQ_)) {
        return [U, D];
      }
    }
    return null;
  }
};
var square1TupleFormatterInstance = new Square1TupleFormatter();
var Grouping = class _Grouping extends AlgCommon {
  #quantumWithAmount;
  experimentalNISSPlaceholder;
  // TODO: tie this to the alg
  constructor(algSource, amount) {
    super();
    const alg = experimentalEnsureAlg(algSource);
    this.#quantumWithAmount = new QuantumWithAmount(alg, amount);
  }
  isIdentical(other) {
    const otherAsGrouping = other;
    return other.is(_Grouping) && this.#quantumWithAmount.isIdentical(otherAsGrouping.#quantumWithAmount);
  }
  get alg() {
    return this.#quantumWithAmount.quantum;
  }
  get amount() {
    return this.#quantumWithAmount.amount;
  }
  modified(modifications) {
    return new _Grouping(
      modifications.alg ?? this.alg,
      modifications.amount ?? this.amount
    );
  }
  /** @deprecated */
  get experimentalRepetitionSuffix() {
    return this.#quantumWithAmount.suffix();
  }
  invert() {
    const amounts = square1TupleFormatterInstance.tuple(this);
    if (amounts) {
      const [moveU, moveD] = amounts;
      return new _Grouping(new Alg([moveU.invert(), moveD.invert()]));
    }
    return new _Grouping(
      this.#quantumWithAmount.quantum,
      -this.#quantumWithAmount.amount
    );
  }
  *experimentalExpand(iterDir = 1 /* Forwards */, depth) {
    depth ??= Infinity;
    if (depth === 0) {
      yield iterDir === 1 /* Forwards */ ? this : this.invert();
    } else {
      yield* this.#quantumWithAmount.experimentalExpand(iterDir, depth - 1);
    }
  }
  static fromString() {
    throw new Error("unimplemented");
  }
  #unrepeatedString(experimentalSerializationOptions) {
    const insideString = this.#quantumWithAmount.quantum.toString(
      experimentalSerializationOptions
    );
    const iter = this.alg.childAlgNodes();
    const { value } = iter.next();
    if (iter.next().done && (value?.is(Commutator) || value?.is(Conjugate))) {
      return insideString;
    }
    return `(${insideString})`;
  }
  toString(experimentalSerializationOptions) {
    return square1TupleFormatterInstance.format(
      this,
      experimentalSerializationOptions
    ) ?? `${this.#unrepeatedString(experimentalSerializationOptions)}${this.#quantumWithAmount.suffix()}`;
  }
  experimentalAsSquare1Tuple() {
    return square1TupleFormatterInstance.tuple(this);
  }
  // toJSON(): GroupingJSON {
  //   return {
  //     type: "grouping",
  //     alg: this.#quanta.quantum.toJSON(),
  //   };
  // }
};

// src/cubing/alg/is.ts
function experimentalIs(v, c) {
  return v instanceof c;
}
function experimentalIsAlgNode(v) {
  return experimentalIs(v, Grouping) || experimentalIs(v, LineComment) || experimentalIs(v, Commutator) || experimentalIs(v, Conjugate) || experimentalIs(v, Move) || experimentalIs(v, Newline) || experimentalIs(v, Pause);
}

// src/cubing/alg/simplify/options.ts
var DEFAULT_DIRECTIONAL = "any-direction";
var AppendOptionsHelper = class {
  constructor(config = {}) {
    this.config = config;
  }
  cancelQuantum() {
    const { cancel } = this.config;
    if (cancel === true) {
      return DEFAULT_DIRECTIONAL;
    }
    if (cancel === false) {
      return "none";
    }
    return cancel?.directional ?? "none";
  }
  cancelAny() {
    return this.config.cancel && this.cancelQuantum() !== "none";
  }
  cancelPuzzleSpecificModWrap() {
    const { cancel } = this.config;
    if (cancel === true || cancel === false) {
      return "canonical-centered";
    }
    if (cancel?.puzzleSpecificModWrap) {
      return cancel?.puzzleSpecificModWrap;
    }
    return cancel?.directional === "same-direction" ? "preserve-sign" : "canonical-centered";
  }
  puzzleSpecificSimplifyOptions() {
    return this.config.puzzleLoader?.puzzleSpecificSimplifyOptions ?? this.config.puzzleSpecificSimplifyOptions;
  }
};

// src/cubing/alg/simplify/append.ts
function areSameDirection(direction, move2) {
  return direction * Math.sign(move2.amount) >= 0;
}
function offsetMod(x, positiveMod, offset = 0) {
  return ((x - offset) % positiveMod + positiveMod) % positiveMod + offset;
}
function experimentalAppendMove(alg, addedMove, options) {
  const optionsHelper = new AppendOptionsHelper(options);
  const outputPrefix = Array.from(alg.childAlgNodes());
  let outputSuffix = [addedMove];
  function output() {
    return new Alg([...outputPrefix, ...outputSuffix]);
  }
  function modMove(move) {
    if (optionsHelper.cancelPuzzleSpecificModWrap() === "none") {
      return move;
    }
    const quantumMoveOrder = optionsHelper.puzzleSpecificSimplifyOptions()?.quantumMoveOrder;
    if (!quantumMoveOrder) {
      return move;
    }
    const mod = quantumMoveOrder(addedMove.quantum);
    let offset;
    switch (optionsHelper.cancelPuzzleSpecificModWrap()) {
      case "gravity": {
        offset = -Math.floor((mod - (move.amount < 0 ? 0 : 1)) / 2);
        break;
      }
      case "canonical-centered": {
        offset = -Math.floor((mod - 1) / 2);
        break;
      }
      case "canonical-positive": {
        offset = 0;
        break;
      }
      case "preserve-sign": {
        offset = move.amount < 0 ? 1 - mod : 0;
        break;
      }
      default: {
        throw new Error("Unknown mod wrap");
      }
    }
    const offsetAmount = offsetMod(move.amount, mod, offset);
    return move.modified({ amount: offsetAmount });
  }
  if (optionsHelper.cancelAny()) {
    let canCancelMoveBasedOnQuantum;
    const axis = optionsHelper.puzzleSpecificSimplifyOptions()?.axis;
    if (axis) {
      canCancelMoveBasedOnQuantum = (move) => axis.areQuantumMovesSameAxis(addedMove.quantum, move.quantum);
    } else {
      const newMoveQuantumString = addedMove.quantum.toString();
      canCancelMoveBasedOnQuantum = (move) => move.quantum.toString() === newMoveQuantumString;
    }
    const sameDirectionOnly = optionsHelper.cancelQuantum() === "same-direction";
    const quantumDirections = /* @__PURE__ */ new Map();
    quantumDirections.set(
      addedMove.quantum.toString(),
      Math.sign(addedMove.amount)
    );
    let i;
    for (i = outputPrefix.length - 1; i >= 0; i--) {
      const move = outputPrefix[i].as(Move);
      if (!move) {
        break;
      }
      if (!canCancelMoveBasedOnQuantum(move)) {
        break;
      }
      const quantumKey = move.quantum.toString();
      if (sameDirectionOnly) {
        const existingQuantumDirectionOnAxis = quantumDirections.get(quantumKey);
        if (existingQuantumDirectionOnAxis && // Short-circuits, but that's actually okay here.
        !areSameDirection(existingQuantumDirectionOnAxis, move)) {
          break;
        }
        quantumDirections.set(quantumKey, Math.sign(move.amount));
      }
    }
    const suffix = [...outputPrefix.splice(i + 1), addedMove];
    if (axis) {
      outputSuffix = axis.simplifySameAxisMoves(
        suffix,
        optionsHelper.cancelPuzzleSpecificModWrap() !== "none"
      );
    } else {
      const amount = suffix.reduce(
        (sum, move) => sum + move.amount,
        0
      );
      if (quantumDirections.size !== 1) {
        throw new Error(
          "Internal error: multiple quantums when one was expected"
        );
      }
      outputSuffix = [new Move(addedMove.quantum, amount)];
    }
  }
  outputSuffix = outputSuffix.map((m) => modMove(m)).filter((move) => move.amount !== 0);
  return output();
}
function experimentalAppendNode(alg, leaf, options) {
  const maybeMove = leaf.as(Move);
  if (maybeMove) {
    return experimentalAppendMove(alg, maybeMove, options);
  } else {
    return new Alg([...alg.childAlgNodes(), leaf]);
  }
}

// src/cubing/alg/traversal.ts
function dispatch(t, algNode, dataDown) {
  if (algNode.is(Grouping)) {
    return t.traverseGrouping(algNode, dataDown);
  }
  if (algNode.is(Move)) {
    return t.traverseMove(algNode, dataDown);
  }
  if (algNode.is(Commutator)) {
    return t.traverseCommutator(algNode, dataDown);
  }
  if (algNode.is(Conjugate)) {
    return t.traverseConjugate(algNode, dataDown);
  }
  if (algNode.is(Pause)) {
    return t.traversePause(algNode, dataDown);
  }
  if (algNode.is(Newline)) {
    return t.traverseNewline(algNode, dataDown);
  }
  if (algNode.is(LineComment)) {
    return t.traverseLineComment(algNode, dataDown);
  }
  throw new Error("unknown AlgNode");
}
function mustBeAlgNode(t) {
  if (t.is(Grouping) || t.is(Move) || t.is(Commutator) || t.is(Conjugate) || t.is(Pause) || t.is(Newline) || t.is(LineComment)) {
    return t;
  }
  throw new Error("internal error: expected AlgNode");
}
var TraversalDownUp = class {
  // Immediate subclasses should overwrite this.
  traverseAlgNode(algNode, dataDown) {
    return dispatch(this, algNode, dataDown);
  }
  traverseIntoAlgNode(algNode, dataDown) {
    return mustBeAlgNode(this.traverseAlgNode(algNode, dataDown));
  }
};
var TraversalUp = class extends TraversalDownUp {
  traverseAlgNode(algNode) {
    return dispatch(
      this,
      algNode,
      void 0
    );
  }
  traverseIntoAlgNode(algNode) {
    return mustBeAlgNode(this.traverseAlgNode(algNode));
  }
};
function functionFromTraversal(traversalConstructor, constructorArgs) {
  const instance = new traversalConstructor(
    ...constructorArgs ?? []
  );
  return instance.traverseAlg.bind(instance);
}

// src/cubing/alg/simplify/simplify.ts
var Simplify = class extends TraversalDownUp {
  #newPlaceholderAssociationsMap;
  #newPlaceholderAssociations() {
    return this.#newPlaceholderAssociationsMap ??= /* @__PURE__ */ new Map();
  }
  // TODO: avoid allocations?
  #descendOptions(options) {
    return {
      ...options,
      depth: options.depth ? options.depth - 1 : null
    };
  }
  // TODO: Handle
  *traverseAlg(alg, options) {
    if (options.depth === 0) {
      yield* alg.childAlgNodes();
      return;
    }
    let output = [];
    const newOptions = this.#descendOptions(options);
    for (const algNode of alg.childAlgNodes()) {
      for (const traversedNode of this.traverseAlgNode(algNode, newOptions)) {
        output = Array.from(
          experimentalAppendNode(
            new Alg(output),
            traversedNode,
            newOptions
          ).childAlgNodes()
        );
      }
    }
    for (const newAlgNode of output) {
      yield newAlgNode;
    }
  }
  *traverseGrouping(grouping, options) {
    if (options.depth === 0) {
      yield grouping;
      return;
    }
    if (grouping.amount === 0) {
      return;
    }
    const newGrouping = new Grouping(
      this.traverseAlg(grouping.alg, this.#descendOptions(options)),
      grouping.amount
    );
    if (newGrouping.alg.experimentalIsEmpty()) {
      return;
    }
    const newPlaceholder = this.#newPlaceholderAssociations().get(grouping);
    if (newPlaceholder) {
      newGrouping.experimentalNISSPlaceholder = newPlaceholder;
      newPlaceholder.experimentalNISSGrouping = newGrouping;
    }
    yield newGrouping;
  }
  *traverseMove(move, _options) {
    yield move;
  }
  #doChildrenCommute(A, B, options) {
    if (A.experimentalNumChildAlgNodes() === 1 && B.experimentalNumChildAlgNodes() === 1) {
      const aMove = Array.from(A.childAlgNodes())[0]?.as(Move);
      const bMove = Array.from(B.childAlgNodes())[0]?.as(Move);
      if (!(aMove && bMove)) {
        return false;
      }
      if (bMove.quantum.isIdentical(aMove.quantum)) {
        return true;
      }
      const appendOptionsHelper = new AppendOptionsHelper(options);
      if (appendOptionsHelper.puzzleSpecificSimplifyOptions()?.axis?.areQuantumMovesSameAxis(aMove.quantum, bMove.quantum)) {
        return true;
      }
    }
    return false;
  }
  *traverseCommutator(commutator, options) {
    if (options.depth === 0) {
      yield commutator;
      return;
    }
    const newOptions = this.#descendOptions(options);
    const newCommutator = new Commutator(
      this.traverseAlg(commutator.A, newOptions),
      this.traverseAlg(commutator.B, newOptions)
    );
    if (newCommutator.A.experimentalIsEmpty() || newCommutator.B.experimentalIsEmpty() || newCommutator.A.isIdentical(newCommutator.B) || newCommutator.A.isIdentical(newCommutator.B.invert()) || this.#doChildrenCommute(newCommutator.A, newCommutator.B, options)) {
      return;
    }
    yield newCommutator;
  }
  *traverseConjugate(conjugate, options) {
    if (options.depth === 0) {
      yield conjugate;
      return;
    }
    const newOptions = this.#descendOptions(options);
    const newConjugate = new Conjugate(
      this.traverseAlg(conjugate.A, newOptions),
      this.traverseAlg(conjugate.B, newOptions)
    );
    if (newConjugate.B.experimentalIsEmpty()) {
      return;
    }
    if (newConjugate.A.experimentalIsEmpty() || newConjugate.A.isIdentical(newConjugate.B) || newConjugate.A.isIdentical(newConjugate.B.invert()) || this.#doChildrenCommute(newConjugate.A, newConjugate.B, options)) {
      yield* conjugate.B.childAlgNodes();
      return;
    }
    yield newConjugate;
  }
  *traversePause(pause, _options) {
    if (pause.experimentalNISSGrouping) {
      const newPause = new Pause();
      this.#newPlaceholderAssociations().set(
        pause.experimentalNISSGrouping,
        newPause
      );
      yield newPause;
    } else {
      yield pause;
    }
  }
  *traverseNewline(newline, _options) {
    yield newline;
  }
  *traverseLineComment(comment, _options) {
    yield comment;
  }
};
var simplify = functionFromTraversal(Simplify);

// src/cubing/alg/Alg.ts
function toIterable(input) {
  if (!input) {
    return [];
  }
  if (experimentalIs(input, Alg)) {
    return input.childAlgNodes();
  }
  if (typeof input === "string") {
    return parseAlg(input).childAlgNodes();
  }
  const iter = input;
  if (typeof iter[Symbol.iterator] === "function") {
    return iter;
  }
  throw new Error("Invalid AlgNode");
}
function experimentalEnsureAlg(alg) {
  if (experimentalIs(alg, Alg)) {
    return alg;
  }
  return new Alg(alg);
}
var Alg = class _Alg extends AlgCommon {
  // #debugString: string;
  #algNodes;
  // TODO: freeze?
  constructor(alg) {
    super();
    this.#algNodes = Array.from(toIterable(alg));
    for (const algNode of this.#algNodes) {
      if (!experimentalIsAlgNode(algNode)) {
        throw new Error("An alg can only contain alg nodes.");
      }
    }
  }
  /**
   * Checks whether this Alg is structurally identical to another Alg. This
   * essentially means that they are written identically apart from whitespace.
   *
   *     const alg1 = new Alg("R U L'");
   *     const alg2 = new Alg("L U' R'").invert();
   *     // true
   *     alg1.isIdentical(alg2);
   *
   *     // false
   *     new Alg("[R, U]").isIdentical(new Alg("R U R' U'"));
   *     // true
   *     new Alg("[R, U]").expand().isIdentical(new Alg("R U R' U'"));
   *
   * Note that .isIdentical() efficiently compares algorithms, but mainly exists
   * to help optimize code when the structure of an algorithm hasn't changed.
   * There are many ways to write the "same" alg on most puzzles, but is
   * *highly* recommended to avoid expanding two Alg instances to compare them,
   * since that can easily slow your program to a crawl if someone inputs an alg
   * containing a large repetition. In general, you should use `cubing/kpuzzle`
   * to compare if two algs have the same effect on a puzzle.
   *
   * Also note that parser annotations are not taken into account while comparing
   * algs:
   *
   *     const alg = new Alg([new Move("R"), new Move("U2")]);
   *     // true, even though one of the algs has parser annotations
   *     alg.isIdentical(new Alg("R U2"))
   *
   */
  isIdentical(other) {
    const otherAsAlg = other;
    if (!other.is(_Alg)) {
      return false;
    }
    const l1 = Array.from(this.#algNodes);
    const l2 = Array.from(otherAsAlg.#algNodes);
    if (l1.length !== l2.length) {
      return false;
    }
    for (let i = 0; i < l1.length; i++) {
      if (!l1[i].isIdentical(l2[i])) {
        return false;
      }
    }
    return true;
  }
  /**
   * Returns the inverse of the given alg.
   *
   * Note that that this does not make any assumptions about what puzzle the alg
   * is for. For example, U2 is its own inverse on a cube, but U2' has the same
   * effect U3 (and not U2) on Megaminx:
   *
   *     // Outputs: R U2' L'
   *     new Alg("L U2 R'").invert().log();
   */
  invert() {
    return new _Alg(reverse(Array.from(this.#algNodes).map((u) => u.invert())));
  }
  /** @deprecated Use {@link Alg.expand} instead. */
  *experimentalExpand(iterDir = 1 /* Forwards */, depth) {
    depth ??= Infinity;
    for (const algNode of direct(this.#algNodes, iterDir)) {
      yield* algNode.experimentalExpand(iterDir, depth);
    }
  }
  /**
   * Expands all Grouping, Commutator, and Conjugate parts nested inside the
   * alg.
   *
   *     // F R U R' U' F'
   *     new Alg("[F: [R, U]]").expand().log();
   *
   *     // F [R, U] F'
   *     new Alg("[F: [R, U]]").expand(({ depth: 1 }).log();
   *
   * Avoid calling this on a user-provided alg unless the user explicitly asks
   * to see the expanded alg. Otherwise, it's easy to make your program freeze
   * when someone passes in an alg like: (R U)10000000
   *
   * Generally, if you want to perform an operation on an entire alg, you'll
   * want to use something based on the `Traversal` mechanism, like countMoves()
   * from `cubing/notation`.
   */
  expand(options) {
    return new _Alg(
      this.experimentalExpand(
        1 /* Forwards */,
        options?.depth ?? Infinity
      )
    );
  }
  /** @deprecated */
  *experimentalLeafMoves() {
    for (const leaf of this.experimentalExpand()) {
      if (leaf.is(Move)) {
        yield leaf;
      }
    }
  }
  concat(input) {
    return new _Alg(
      Array.from(this.#algNodes).concat(Array.from(toIterable(input)))
    );
  }
  /** @deprecated */
  experimentalIsEmpty() {
    for (const _ of this.#algNodes) {
      return false;
    }
    return true;
  }
  static fromString(s) {
    return parseAlg(s);
  }
  /** @deprecated */
  units() {
    return this.childAlgNodes();
  }
  *childAlgNodes() {
    for (const algNode of this.#algNodes) {
      yield algNode;
    }
  }
  /** @deprecated */
  experimentalNumUnits() {
    return this.experimentalNumChildAlgNodes();
  }
  experimentalNumChildAlgNodes() {
    return Array.from(this.#algNodes).length;
  }
  /** @deprecated */
  get type() {
    warnOnce("deprecated: type");
    return "sequence";
  }
  /**
   * Converts the Alg to a string:
   *
   *     const alg = new Alg([new Move("R"), new Move("U2"), new Move("L")])
   *     // R U2 L
   *     console.log(alg.toString())
   */
  toString(experimentalSerializationOptions) {
    let output = "";
    let previousVisibleAlgNode = null;
    for (const algNode of this.#algNodes) {
      if (previousVisibleAlgNode) {
        output += spaceBetween(previousVisibleAlgNode, algNode);
      }
      const nissGrouping = algNode.as(Pause)?.experimentalNISSGrouping;
      if (nissGrouping) {
        if (nissGrouping.amount !== -1) {
          throw new Error("Invalid NISS Grouping amount!");
        }
        output += `^(${nissGrouping.alg.toString(experimentalSerializationOptions)})`;
      } else if (algNode.as(Grouping)?.experimentalNISSPlaceholder) {
      } else {
        output += algNode.toString(experimentalSerializationOptions);
      }
      previousVisibleAlgNode = algNode;
    }
    return output;
  }
  /**
   * `experimentalSimplify` can perform several mostly-syntactic simplifications on an alg:
   *
   *     // Logs: R' U3
   *     import { Alg } from "cubing/alg";
   *     new Alg("R R2' U U2").experimentalSimplify({ cancel: true }).log()
   *
   * You can pass in a `PuzzleLoader` (currently only for 3x3x3) for puzzle-specific simplifications:
   *
   *     // Logs: R' U'
   *     import { Alg } from "cubing/alg";
   *     import { cube3x3x3 } from "cubing/puzzles";
   *     new Alg("R R2' U U2").experimentalSimplify({ cancel: true, puzzleLoader: cube3x3x3 }).log()
   *
   * You can also cancel only moves that are in the same direction:
   *
   *     // Logs: R R2' U'
   *     import { Alg } from "cubing/alg";
   *     import { cube3x3x3 } from "cubing/puzzles";
   *     new Alg("R R2' U U2").experimentalSimplify({
   *       cancel: { directional: "same-direction" },
   *       puzzleLoader: cube3x3x3
   *     }).log()
   *
   * Additionally, you can specify how moves are "wrapped":
   *
   *     import { Alg } from "cubing/alg";
   *     import { cube3x3x3 } from "cubing/puzzles";
   *
   *     function example(puzzleSpecificModWrap) {
   *       alg.experimentalSimplify({
   *         cancel: { puzzleSpecificModWrap },
   *         puzzleLoader: cube3x3x3
   *       }).log()
   *     }
   *
   *     const alg = new Alg("R7' . R6' . R5' . R6")
   *     example("none")               // R7' . R6' . R5' . R6
   *     example("gravity")            // R . R2' . R' . R2
   *     example("canonical-centered") // R . R2 . R' . R2
   *     example("canonical-positive") // R . R2 . R3 . R2
   *     example("preserve-sign")      // R3' . R2' . R' . R2
   *
   * Same-axis and simultaneous move canonicalization is not implemented yet:
   *
   *     // Logs: R L R
   *     import { Alg } from "cubing/alg";
   *     import { cube3x3x3 } from "cubing/puzzles";
   *     new Alg("R L R").experimentalSimplify({ cancel: true, puzzleLoader: cube3x3x3 }).log()
   */
  experimentalSimplify(options) {
    return new _Alg(simplify(this, options ?? {}));
  }
  /** @deprecated See {@link experimentalSimplify} */
  simplify(options) {
    return this.experimentalSimplify(options);
  }
};
function spaceBetween(u1, u2) {
  if (u1.is(Newline) || u2.is(Newline)) {
    return "";
  }
  if (u2.as(Grouping)?.experimentalNISSPlaceholder) {
    return "";
  }
  if (u1.is(LineComment) && !u2.is(Newline)) {
    return "\n";
  }
  return " ";
}

// src/cubing/alg/example.ts
var Example = {
  Sune: new Alg([
    new Move("R", 1),
    new Move("U", 1),
    new Move("R", -1),
    new Move("U", 1),
    new Move("R", 1),
    new Move("U", -2),
    new Move("R", -1)
  ]),
  AntiSune: new Alg([
    new Move("R", 1),
    new Move("U", 2),
    new Move("R", -1),
    new Move("U", -1),
    new Move("R", 1),
    new Move("U", -1),
    new Move("R", -1)
  ]),
  SuneCommutator: new Alg([
    new Commutator(
      new Alg([new Move("R", 1), new Move("U", 1), new Move("R", -2)]),
      new Alg([
        new Conjugate(new Alg([new Move("R", 1)]), new Alg([new Move("U", 1)]))
      ])
    )
  ]),
  Niklas: new Alg([
    new Move("R", 1),
    new Move("U", -1),
    new Move("L", -1),
    new Move("U", 1),
    new Move("R", -1),
    new Move("U", -1),
    new Move("L", 1),
    new Move("U", 1)
  ]),
  EPerm: new Alg([
    new Move("x", -1),
    new Commutator(
      new Alg([
        new Conjugate(
          new Alg([new Move("R", 1)]),
          new Alg([new Move("U", -1)])
        )
      ]),
      new Alg([new Move("D", 1)])
    ),
    new Commutator(
      new Alg([
        new Conjugate(new Alg([new Move("R", 1)]), new Alg([new Move("U", 1)]))
      ]),
      new Alg([new Move("D", 1)])
    ),
    new Move("x", 1)
  ]),
  FURURFCompact: new Alg([
    new Conjugate(
      new Alg([new Move("F", 1)]),
      new Alg([
        new Commutator(
          new Alg([new Move("U", 1)]),
          new Alg([new Move("R", 1)])
        )
      ])
    )
  ]),
  APermCompact: new Alg([
    new Conjugate(
      new Alg([new Move("R", 2)]),
      new Alg([
        new Commutator(
          new Alg([new Move("F", 2)]),
          new Alg([new Move("R", -1), new Move("B", -1), new Move("R", 1)])
        )
      ])
    )
  ]),
  FURURFMoves: new Alg([
    new Move("F", 1),
    new Move("U", 1),
    new Move("R", 1),
    new Move("U", -1),
    new Move("R", -1),
    new Move("F", -1)
  ]),
  TPerm: new Alg([
    new Move("R", 1),
    new Move("U", 1),
    new Move("R", -1),
    new Move("U", -1),
    new Move("R", -1),
    new Move("F", 1),
    new Move("R", 2),
    new Move("U", -1),
    new Move("R", -1),
    new Move("U", -1),
    new Move("R", 1),
    new Move("U", 1),
    new Move("R", -1),
    new Move("F", -1)
  ]),
  HeadlightSwaps: new Alg([
    new Conjugate(
      new Alg([new Move("F", 1)]),
      new Alg([
        new Grouping(
          new Alg([
            new Commutator(
              new Alg([new Move("R", 1)]),
              new Alg([new Move("U", 1)])
            )
          ]),
          3
        )
      ])
    )
  ]),
  TriplePause: new Alg([new Pause(), new Pause(), new Pause()])
  // AllAlgParts: [
  //   new Alg([new Move("R", 1), new Move("U", -1)]),
  //   new Grouping(new Alg([new Move("F", 1)]), 2),
  //   // new Rotation("y", -1),
  //   new Move("R", 2),
  //   new Commutator(new Alg([new Move("R", 2)]), new Alg([new Move("U", 2)]), 2),
  //   new Conjugate(new Alg([new Move("L", 2)]), new Alg([new Move("D", -1)]), 2),
  //   new Pause(),
  //   new Newline(),
  //   new LineComment("line comment"),
  // ],
};

// src/cubing/alg/keyboard.ts
function keyToMove(keyMapping, e) {
  if (e.altKey || e.ctrlKey) {
    return null;
  }
  const layoutIndepdendentCode = e.code;
  return keyMapping?.[layoutIndepdendentCode] ?? null;
}

// src/cubing/alg/url.ts
function serializeURLParam(a) {
  let escaped = a.toString();
  escaped = escaped.replace(/_/g, "&#95;").replace(/ /g, "_");
  escaped = escaped.replace(/\+/g, "&#2b;");
  escaped = escaped.replace(/-/g, "&#45;").replace(/'/g, "-");
  return escaped;
}
function experimentalAlgCubingNetLink(options) {
  const url = new URL("https://alg.cubing.net");
  if (!options.alg) {
    throw new Error("An alg parameter is required.");
  }
  url.searchParams.set("alg", serializeURLParam(options.alg));
  if (options.setup) {
    url.searchParams.set("setup", serializeURLParam(options.setup));
  }
  if (options.title) {
    url.searchParams.set("title", options.title);
  }
  if (options.puzzle) {
    if (![
      "1x1x1",
      "2x2x2",
      "3x3x3",
      "4x4x4",
      "5x5x5",
      "6x6x6",
      "7x7x7",
      "8x8x8",
      "9x9x9",
      "10x10x10",
      "11x11x11",
      "12x12x12",
      "13x13x13",
      "14x14x14",
      "16x16x16",
      "17x17x17"
    ].includes(options.puzzle)) {
      throw new Error(`Invalid puzzle parameter: ${options.puzzle}`);
    }
    url.searchParams.set("puzzle", options.puzzle);
  }
  if (options.stage) {
    if (![
      "full",
      "cross",
      "F2L",
      "LL",
      "OLL",
      "PLL",
      "CLS",
      "ELS",
      "L6E",
      "CMLL",
      "WV",
      "ZBLL",
      "void"
    ].includes(options.stage)) {
      throw new Error(`Invalid stage parameter: ${options.stage}`);
    }
    url.searchParams.set("stage", options.stage);
  }
  if (options.view) {
    if (!["editor", "playback", "fullscreen"].includes(options.view)) {
      throw new Error(`Invalid view parameter: ${options.view}`);
    }
    url.searchParams.set("view", options.view);
  }
  if (options.type) {
    if (![
      "moves",
      "reconstruction",
      "alg",
      "reconstruction-end-with-setup"
    ].includes(options.type)) {
      throw new Error(`Invalid type parameter: ${options.type}`);
    }
    url.searchParams.set("type", options.type);
  }
  return url.toString();
}

export {
  direct,
  directedGenerator,
  Commutator,
  Conjugate,
  AlgBuilder,
  LineComment,
  Newline,
  Pause,
  setAlgDebug,
  startCharIndexKey,
  endCharIndexKey,
  QuantumMove,
  Move,
  Grouping,
  experimentalIs,
  offsetMod,
  experimentalAppendMove,
  TraversalDownUp,
  TraversalUp,
  functionFromTraversal,
  Alg,
  Example,
  keyToMove,
  experimentalAlgCubingNetLink
};
//# sourceMappingURL=chunk-O6HEZXGY.js.map

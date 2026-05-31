import {
  cube3x3x3KPuzzleDefinition
} from "./chunk-FUHYAW74.js";
import {
  TraversalUp,
  functionFromTraversal
} from "./chunk-O6HEZXGY.js";

// src/cubing/notation/CountAnimatedLeaves.ts
var CountAnimatedLeaves = class extends TraversalUp {
  traverseAlg(alg) {
    let total = 0;
    for (const part of alg.childAlgNodes()) {
      total += this.traverseAlgNode(part);
    }
    return total;
  }
  traverseGrouping(grouping) {
    return this.traverseAlg(grouping.alg) * Math.abs(grouping.amount);
  }
  traverseMove(_move) {
    return 1;
  }
  traverseCommutator(commutator) {
    return 2 * (this.traverseAlg(commutator.A) + this.traverseAlg(commutator.B));
  }
  traverseConjugate(conjugate) {
    return 2 * this.traverseAlg(conjugate.A) + this.traverseAlg(conjugate.B);
  }
  traversePause(_pause) {
    return 1;
  }
  traverseNewline(_newline) {
    return 0;
  }
  traverseLineComment(_comment) {
    return 0;
  }
};
var countAnimatedLeaves = functionFromTraversal(CountAnimatedLeaves);

// src/cubing/notation/commonMetrics.ts
var CommonMetric = /* @__PURE__ */ ((CommonMetric2) => {
  CommonMetric2["OuterBlockTurnMetric"] = "OBTM";
  CommonMetric2["RangeBlockTurnMetric"] = "RBTM";
  CommonMetric2["SingleSliceTurnMetric"] = "SSTM";
  CommonMetric2["OuterBlockQuantumTurnMetric"] = "OBQTM";
  CommonMetric2["RangeBlockQuantumTurnMetric"] = "RBQTM";
  CommonMetric2["SingleSliceQuantumTurnMetric"] = "SSQTM";
  CommonMetric2["ExecutionTurnMetric"] = "ETM";
  return CommonMetric2;
})(CommonMetric || {});
var CommonMetricAlias = /* @__PURE__ */ ((CommonMetricAlias2) => {
  CommonMetricAlias2["QuantumTurnMetric"] = "OBQTM";
  CommonMetricAlias2["HandTurnMetric"] = "OBTM";
  CommonMetricAlias2["SliceTurnMetric"] = "RBTM";
  return CommonMetricAlias2;
})(CommonMetricAlias || {});

// src/cubing/notation/cube3x3x3Metrics.ts
function uncachedMoveCount(moveQuantumString) {
  if (moveQuantumString.endsWith("v") || ["x", "y", "z"].includes(moveQuantumString)) {
    return "Rotation" /* Rotation */;
  }
  if (moveQuantumString.startsWith("2") || ["M", "E", "S"].includes(moveQuantumString)) {
    return "Inner" /* Inner */;
  }
  return "Outer" /* Outer */;
}
var cache;
function getCache() {
  if (cache) {
    return cache;
  }
  cache = {};
  const moveQuantumStrings = [
    ...Object.keys(cube3x3x3KPuzzleDefinition.moves),
    ...Object.keys(cube3x3x3KPuzzleDefinition.derivedMoves)
  ];
  for (const moveQuantumString of moveQuantumStrings) {
    cache[moveQuantumString] = uncachedMoveCount(moveQuantumString);
  }
  return cache;
}
var costFactorsByMetric = {
  // Note: these are hardcoded for 3x3x3. They will not automatically generalize to any other puzzles.
  ["OBTM" /* OuterBlockTurnMetric */]: {
    ["Rotation" /* Rotation */]: { constantFactor: 0, amountFactor: 0, zeroAmount: 0 },
    ["Outer" /* Outer */]: { constantFactor: 1, amountFactor: 0, zeroAmount: 0 },
    ["Inner" /* Inner */]: { constantFactor: 2, amountFactor: 0, zeroAmount: 0 }
  },
  ["RBTM" /* RangeBlockTurnMetric */]: {
    ["Rotation" /* Rotation */]: { constantFactor: 0, amountFactor: 0, zeroAmount: 0 },
    ["Outer" /* Outer */]: { constantFactor: 1, amountFactor: 0, zeroAmount: 0 },
    ["Inner" /* Inner */]: { constantFactor: 1, amountFactor: 0, zeroAmount: 0 }
  },
  ["OBQTM" /* OuterBlockQuantumTurnMetric */]: {
    ["Rotation" /* Rotation */]: { constantFactor: 0, amountFactor: 0, zeroAmount: 0 },
    ["Outer" /* Outer */]: { constantFactor: 0, amountFactor: 1, zeroAmount: 0 },
    ["Inner" /* Inner */]: { constantFactor: 0, amountFactor: 2, zeroAmount: 0 }
  },
  ["RBQTM" /* RangeBlockQuantumTurnMetric */]: {
    ["Rotation" /* Rotation */]: { constantFactor: 0, amountFactor: 0, zeroAmount: 0 },
    ["Outer" /* Outer */]: { constantFactor: 0, amountFactor: 1, zeroAmount: 0 },
    ["Inner" /* Inner */]: { constantFactor: 0, amountFactor: 1, zeroAmount: 0 }
  },
  ["ETM" /* ExecutionTurnMetric */]: {
    ["Rotation" /* Rotation */]: { constantFactor: 1, amountFactor: 0, zeroAmount: 1 },
    ["Outer" /* Outer */]: { constantFactor: 1, amountFactor: 0, zeroAmount: 1 },
    ["Inner" /* Inner */]: { constantFactor: 1, amountFactor: 0, zeroAmount: 1 }
  }
};
function countMove3x3x3(metric, move) {
  const costFactors = costFactorsByMetric[metric];
  if (!costFactors) {
    throw new Error(`Invalid metric for 3x3x3: ${metric}`);
  }
  const cache2 = getCache();
  const moveQuantumString = move.quantum.toString();
  if (!(moveQuantumString in cache2)) {
    throw new Error(`Invalid move for 3x3x3 ${metric}: ${moveQuantumString}`);
  }
  const costType = cache2[moveQuantumString];
  const { constantFactor, amountFactor, zeroAmount } = costFactors[costType];
  if (move.amount === 0) {
    return zeroAmount;
  }
  return constantFactor + amountFactor * Math.abs(move.amount);
}

// src/cubing/notation/CountMoves.ts
var CountMoves = class extends TraversalUp {
  constructor(metric) {
    super();
    this.metric = metric;
  }
  traverseAlg(alg) {
    let r = 0;
    for (const algNode of alg.childAlgNodes()) {
      r += this.traverseAlgNode(algNode);
    }
    return r;
  }
  traverseGrouping(grouping) {
    const alg = grouping.alg;
    return this.traverseAlg(alg) * Math.abs(grouping.amount);
  }
  traverseMove(move) {
    return this.metric(move);
  }
  traverseCommutator(commutator) {
    return 2 * (this.traverseAlg(commutator.A) + this.traverseAlg(commutator.B));
  }
  traverseConjugate(conjugate) {
    return 2 * this.traverseAlg(conjugate.A) + this.traverseAlg(conjugate.B);
  }
  // TODO: Remove spaces between repeated pauses (in traverseSequence)
  traversePause(_pause) {
    return 0;
  }
  traverseNewline(_newLine) {
    return 0;
  }
  // TODO: Enforce being followed by a newline (or the end of the alg)?
  traverseLineComment(_comment) {
    return 0;
  }
};
var CountLeavesInExpansionForSimultaneousMoveIndexer = class extends TraversalUp {
  traverseAlg(alg) {
    let r = 0;
    for (const algNode of alg.childAlgNodes()) {
      r += this.traverseAlgNode(algNode);
    }
    return r;
  }
  traverseGrouping(grouping) {
    const alg = grouping.alg;
    return this.traverseAlg(alg) * Math.abs(grouping.amount);
  }
  traverseMove(_move) {
    return 1;
  }
  traverseCommutator(commutator) {
    return 2 * (this.traverseAlg(commutator.A) + this.traverseAlg(commutator.B));
  }
  traverseConjugate(conjugate) {
    return 2 * this.traverseAlg(conjugate.A) + this.traverseAlg(conjugate.B);
  }
  // TODO: Remove spaces between repeated pauses (in traverseSequence)
  traversePause(_pause) {
    return 1;
  }
  traverseNewline(_newLine) {
    return 1;
  }
  // TODO: Enforce being followed by a newline (or the end of the alg)?
  traverseLineComment(_comment) {
    return 1;
  }
};
function isCharUppercase(c) {
  return "A" <= c && c <= "Z";
}
function baseMetric(move) {
  const fam = move.family;
  if (isCharUppercase(fam[0]) && fam[fam.length - 1] === "v" || fam === "x" || fam === "y" || fam === "z" || fam === "T") {
    return 0;
  } else {
    return 1;
  }
}
function etmMetric(_move) {
  return 1;
}
function rangeBlockTurnMetric(move) {
  const fam = move.family;
  if (isCharUppercase(fam[0]) && fam[fam.length - 1] === "v" || fam === "x" || fam === "y" || fam === "z" || fam === "T") {
    return 0;
  } else {
    return 1;
  }
}
function quantumMetric(move) {
  return Math.abs(move.amount) * rangeBlockTurnMetric(move);
}
var countMoves = functionFromTraversal(CountMoves, [baseMetric]);
var countMovesETM = functionFromTraversal(CountMoves, [etmMetric]);
var countRangeBlockQuantumMovesPG = functionFromTraversal(CountMoves, [
  quantumMetric
]);
var countRangeBlockMovesPG = functionFromTraversal(CountMoves, [
  rangeBlockTurnMetric
]);
var countLeavesInExpansionForSimultaneousMoveIndexer = functionFromTraversal(CountLeavesInExpansionForSimultaneousMoveIndexer, []);
function countMetricMoves(puzzleLoader, metric, alg) {
  if (puzzleLoader.id === "3x3x3") {
    if (metric in costFactorsByMetric) {
      return functionFromTraversal(CountMoves, [
        (move) => countMove3x3x3(metric, move)
      ])(alg);
    }
  } else {
    switch (metric) {
      case "ETM" /* ExecutionTurnMetric */:
        return countMovesETM(alg);
      case "RBTM" /* RangeBlockTurnMetric */: {
        if (puzzleLoader.pg) {
          return countRangeBlockMovesPG(alg);
        }
        break;
      }
      case "RBQTM" /* RangeBlockQuantumTurnMetric */: {
        if (puzzleLoader.pg) {
          return countRangeBlockQuantumMovesPG(alg);
        }
        break;
      }
    }
  }
  throw new Error("Unsupported puzzle or metric.");
}

export {
  countAnimatedLeaves,
  CommonMetric,
  CommonMetricAlias,
  countMoves,
  countMovesETM,
  countLeavesInExpansionForSimultaneousMoveIndexer,
  countMetricMoves
};
//# sourceMappingURL=chunk-ZU7PSGX4.js.map

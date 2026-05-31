import {
  KPattern,
  KPuzzle
} from "./chunk-RINY3U6G.js";
import {
  Alg,
  AlgBuilder,
  Commutator,
  Conjugate,
  Grouping,
  LineComment,
  Move,
  Newline,
  Pause,
  QuantumMove,
  TraversalDownUp,
  TraversalUp,
  direct,
  directedGenerator,
  endCharIndexKey,
  experimentalAppendMove,
  functionFromTraversal,
  offsetMod,
  startCharIndexKey
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

// src/cubing/puzzles/async/lazy-cached.ts
function getCached(getValue) {
  let cachedPromise = null;
  return () => {
    return cachedPromise ??= getValue();
  };
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

// src/cubing/twisty/LazyPromise.ts
var LazyPromise = class {
  #executor;
  constructor(executor) {
    this.#executor = executor;
  }
  #cached;
  async #getCached() {
    return this.#cached ??= Promise.resolve(this.#executor());
  }
  // Type signature from TypeScript
  // biome-ignore lint/suspicious/noThenProperty: We're implementing the `Promise` API!
  async then(onfulfilled, onrejected) {
    return this.#getCached().then(onfulfilled, onrejected);
  }
  // Type signature from TypeScript
  catch(onrejected) {
    return this.#getCached().catch(onrejected);
  }
  // Type signature from TypeScript
  async finally(onfinally) {
    return this.#getCached().finally(onfinally);
  }
  get [Symbol.toStringTag]() {
    return "LazyPromise";
  }
};

// src/cubing/twisty/model/PromiseFreshener.ts
var StaleDropper = class {
  #latestAssignedIdx = 0;
  #latestResolvedIdx = 0;
  queue(p) {
    return new Promise(async (resolve, reject) => {
      try {
        const idx = ++this.#latestAssignedIdx;
        const result = await p;
        if (idx > this.#latestResolvedIdx) {
          this.#latestResolvedIdx = idx;
          resolve(result);
        }
      } catch (e) {
        reject(e);
      }
    });
  }
};

// src/cubing/twisty/model/props/TwistyProp.ts
var globalSourceGeneration = 0;
var TwistyPropParent = class {
  // Don't overwrite this. Overwrite `canReuseValue` instead.
  canReuse(v1, v2) {
    return v1 === v2 || this.canReuseValue(v1, v2);
  }
  // Overwrite with a cheap semantic comparison when possible.
  // Note that this is not called if `v1 === v2` (in which case the value is automatically reused).
  canReuseValue(_v1, _v2) {
    return false;
  }
  debugGetChildren() {
    return Array.from(this.#children.values());
  }
  // Propagation
  #children = /* @__PURE__ */ new Set();
  addChild(child) {
    this.#children.add(child);
  }
  removeChild(child) {
    this.#children.delete(child);
  }
  lastSourceGeneration = 0;
  // Synchronously marks all descendants as stale. This doesn't actually
  // literally mark as stale, but it updates the last source generation, which
  // is used to tell if a cahced result is stale.
  markStale(sourceEvent) {
    if (sourceEvent.detail.generation !== globalSourceGeneration) {
      throw new Error("A TwistyProp was marked stale too late!");
    }
    if (this.lastSourceGeneration === sourceEvent.detail.generation) {
      return;
    }
    this.lastSourceGeneration = sourceEvent.detail.generation;
    for (const child of this.#children) {
      child.markStale(sourceEvent);
    }
    this.#scheduleRawDispatch();
  }
  #rawListeners = /* @__PURE__ */ new Set();
  /** @deprecated */
  addRawListener(listener, options) {
    this.#rawListeners.add(listener);
    if (options?.initial) {
      listener();
    }
  }
  /** @deprecated */
  removeRawListener(listener) {
    this.#rawListeners.delete(listener);
  }
  /** @deprecated */
  #scheduleRawDispatch() {
    if (!this.#rawDispatchPending) {
      this.#rawDispatchPending = true;
      setTimeout(() => this.#dispatchRawListeners(), 0);
    }
  }
  #rawDispatchPending = false;
  #dispatchRawListeners() {
    if (!this.#rawDispatchPending) {
      throw new Error("Invalid dispatch state!");
    }
    for (const listener of this.#rawListeners) {
      listener();
    }
    this.#rawDispatchPending = false;
  }
  #freshListeners = /* @__PURE__ */ new Map();
  // TODO: Pick a better name.
  addFreshListener(listener) {
    const staleDropper = new StaleDropper();
    let lastResult = null;
    const callback = async () => {
      const result = await staleDropper.queue(this.get());
      if (lastResult !== null && this.canReuse(lastResult, result)) {
        return;
      }
      lastResult = result;
      listener(result);
    };
    this.#freshListeners.set(listener, callback);
    this.addRawListener(callback, { initial: true });
  }
  removeFreshListener(listener) {
    this.removeRawListener(this.#freshListeners.get(listener));
    this.#freshListeners.delete(listener);
  }
};
var TwistyPropSource = class extends TwistyPropParent {
  #value;
  constructor(initialValue) {
    super();
    this.#value = new LazyPromise(async () => this.getDefaultValue());
    if (initialValue) {
      this.#value = this.deriveFromPromiseOrValue(initialValue, this.#value);
    }
  }
  set(input) {
    this.#value = this.deriveFromPromiseOrValue(input, this.#value);
    const sourceEventDetail = {
      sourceProp: this,
      value: this.#value,
      generation: ++globalSourceGeneration
    };
    this.markStale(
      new CustomEvent("stale", {
        detail: sourceEventDetail
      })
    );
  }
  async get() {
    return this.#value;
  }
  async deriveFromPromiseOrValue(input, oldValuePromise) {
    return this.derive(await input, oldValuePromise);
  }
};
var SimpleTwistyPropSource = class extends TwistyPropSource {
  derive(input) {
    return input;
  }
};
var NO_VALUE = Symbol("no value");
var TwistyPropDerived = class extends TwistyPropParent {
  constructor(parents, userVisibleErrorTracker) {
    super();
    this.userVisibleErrorTracker = userVisibleErrorTracker;
    this.#parents = parents;
    for (const parent of Object.values(parents)) {
      parent.addChild(this);
    }
  }
  // cachedInputs:
  #parents;
  #cachedLastSuccessfulCalculation = null;
  #cachedLatestGenerationCalculation = null;
  async get() {
    const generation = this.lastSourceGeneration;
    if (this.#cachedLatestGenerationCalculation?.generation === generation) {
      return this.#cachedLatestGenerationCalculation.output;
    }
    const latestGenerationCalculation = {
      generation,
      output: this.#cacheDerive(
        this.#getParents(),
        generation,
        this.#cachedLastSuccessfulCalculation
      )
    };
    this.#cachedLatestGenerationCalculation = latestGenerationCalculation;
    this.userVisibleErrorTracker?.reset();
    return latestGenerationCalculation.output;
  }
  async #getParents() {
    const inputValuePromises = {};
    for (const [key, parent] of Object.entries(this.#parents)) {
      inputValuePromises[key] = parent.get();
    }
    const inputs = {};
    for (const key in this.#parents) {
      inputs[key] = await inputValuePromises[key];
    }
    return inputs;
  }
  async #cacheDerive(inputsPromise, generation, cachedLatestGenerationCalculation = null) {
    const inputs = await inputsPromise;
    const cache2 = (output) => {
      this.#cachedLastSuccessfulCalculation = {
        inputs,
        output: Promise.resolve(output),
        generation
      };
      return output;
    };
    if (!cachedLatestGenerationCalculation) {
      return cache2(await this.derive(inputs));
    }
    const cachedInputs = cachedLatestGenerationCalculation.inputs;
    for (const key in this.#parents) {
      const parent = this.#parents[key];
      if (!parent.canReuse(inputs[key], cachedInputs[key])) {
        return cache2(await this.derive(inputs));
      }
    }
    return cachedLatestGenerationCalculation.output;
  }
};
var FreshListenerManager = class {
  #disconnectionFunctions = [];
  addListener(prop, listener) {
    let disconnected = false;
    const wrappedListener = (value) => {
      if (disconnected) {
        return;
      }
      listener(value);
    };
    prop.addFreshListener(wrappedListener);
    this.#disconnectionFunctions.push(() => {
      prop.removeFreshListener(wrappedListener);
      disconnected = true;
    });
  }
  // TODO: Figure out the signature to let us do overloads
  /** @deprecated */
  addMultiListener3(props, listener) {
    this.addMultiListener(props, listener);
  }
  addMultiListener(props, listener) {
    let disconnected = false;
    let initialIgnoresLeft = props.length - 1;
    const wrappedListener = async (_) => {
      if (initialIgnoresLeft > 0) {
        initialIgnoresLeft--;
        return;
      }
      if (disconnected) {
        return;
      }
      const promises = props.map(
        (prop) => prop.get()
      );
      const values = await Promise.all(promises);
      listener(values);
    };
    for (const prop of props) {
      prop.addFreshListener(wrappedListener);
    }
    this.#disconnectionFunctions.push(() => {
      for (const prop of props) {
        prop.removeFreshListener(wrappedListener);
      }
      disconnected = true;
    });
  }
  disconnect() {
    for (const disconnectionFunction of this.#disconnectionFunctions) {
      disconnectionFunction();
    }
  }
};

// src/cubing/twisty/model/props/puzzle/display/StickeringRequestProp.ts
var StickeringRequestProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return null;
  }
};

// src/cubing/twisty/views/node-custom-element-shims.ts
var HTMLElementStub = class {
};
var HTMLElementShim;
if (globalThis.HTMLElement) {
  HTMLElementShim = globalThis.HTMLElement;
} else {
  HTMLElementShim = HTMLElementStub;
}
var CustomElementsStub = class {
  define() {
  }
};
var customElementsShim;
if (globalThis.customElements) {
  customElementsShim = globalThis.customElements;
} else {
  customElementsShim = new CustomElementsStub();
}
var cssStyleSheetShim;
var CSSStyleSheetStub = class {
  replaceSync() {
  }
};
if (globalThis.CSSStyleSheet) {
  cssStyleSheetShim = globalThis.CSSStyleSheet;
} else {
  cssStyleSheetShim = CSSStyleSheetStub;
}

// src/cubing/twisty/views/ManagedCustomElement.ts
var ManagedCustomElement = class extends HTMLElementShim {
  shadow;
  // TODO: hide this
  contentWrapper;
  // TODO: can we get rid of this wrapper?
  constructor(options) {
    super();
    this.shadow = this.attachShadow({ mode: options?.mode ?? "closed" });
    this.contentWrapper = document.createElement("div");
    this.contentWrapper.classList.add("wrapper");
    this.shadow.appendChild(this.contentWrapper);
  }
  // Add the source, if not already added.
  // Returns the existing if it's already on the element.
  addCSS(cssSource) {
    this.shadow.adoptedStyleSheets.push(cssSource);
  }
  removeCSS(cssSource) {
    const cssIndex = this.shadow.adoptedStyleSheets.indexOf(cssSource);
    if (typeof cssIndex !== "undefined") {
      this.shadow.adoptedStyleSheets.splice(cssIndex, cssIndex + 1);
    }
  }
  addElement(element) {
    return this.contentWrapper.appendChild(element);
  }
  prependElement(element) {
    this.contentWrapper.prepend(element);
  }
  removeElement(element) {
    return this.contentWrapper.removeChild(element);
  }
};
customElementsShim.define(
  "twisty-managed-custom-element",
  ManagedCustomElement
);

// src/cubing/twisty/views/stream/TwistyStreamSource.css.ts
var twistyStreamSourceCSS = new cssStyleSheetShim();
twistyStreamSourceCSS.replaceSync(
  `
:host {
  width: 384px;
  height: 256px;
  display: grid;

  font-family: "Ubuntu", sans-serif;
}

.wrapper {
  display: grid;
  place-content: center;
  gap: 0.5em;
}
`
);

// src/cubing/twisty/views/stream/TwistyStreamSource.ts
var BluetoothStreamSource = class _BluetoothStreamSource extends EventTarget {
  constructor(puzzle) {
    super();
    this.puzzle = puzzle;
    puzzle.addAlgLeafListener((e) => {
      const move = e.latestAlgLeaf.as(Move);
      if (!move) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("move", {
          detail: {
            move
          }
        })
      );
    });
  }
  static async connect() {
    const bluetooth = await import("../bluetooth/index.js");
    const puzzle = await bluetooth.connectSmartPuzzle();
    return new _BluetoothStreamSource(puzzle);
  }
  disconnect() {
    this.puzzle.disconnect();
  }
};
var KeyboardStreamSource = class _KeyboardStreamSource extends EventTarget {
  constructor(puzzle) {
    super();
    this.puzzle = puzzle;
    puzzle.addAlgLeafListener((e) => {
      const move = e.latestAlgLeaf.as(Move);
      if (!move) {
        return;
      }
      this.dispatchEvent(
        new CustomEvent("move", {
          detail: {
            move
          }
        })
      );
    });
  }
  static async connect() {
    const bluetooth = await import("../bluetooth/index.js");
    const puzzle = await bluetooth.debugKeyboardConnect();
    return new _KeyboardStreamSource(puzzle);
  }
  disconnect() {
    this.puzzle.disconnect();
  }
};
var TwistyStreamSource = class extends ManagedCustomElement {
  constructor() {
    super();
    this.addCSS(twistyStreamSourceCSS);
    this.addElement(document.createElement("span")).textContent = "Connect a stream source:";
    const bluetoothButton = this.addSource(
      "\u{1F4E1} Bluetooth",
      BluetoothStreamSource
    );
    this.addSource("\u2328\uFE0F Keyboard", KeyboardStreamSource);
    this.addStreamSource();
    if (!navigator?.bluetooth) {
      bluetoothButton.disabled = true;
    }
  }
  addSource(label, sourceClass) {
    const button = this.addElement(document.createElement("button"));
    button.textContent = label;
    button.addEventListener("click", async () => {
      const source = await sourceClass.connect();
      button.disabled = true;
      button.textContent += " \u2705";
      source.addEventListener(
        "move",
        ((e) => {
          this.dispatchEvent(new CustomEvent("move", e));
        })
        // TODO: https://github.com/microsoft/TypeScript/issues/28357
      );
    });
    return button;
  }
  addStreamSource() {
    const SENTINEL_VALUE = "SENTINEL";
    const button = this.addElement(document.createElement("button"));
    button.textContent = "\u{1F534} Get Twizzle streams";
    const select = this.addElement(document.createElement("select"));
    select.appendChild(document.createElement("option")).textContent = "Streams";
    select.disabled = true;
    let streamServer = null;
    button.addEventListener("click", async () => {
      const TwizzleStreamServer = (await import("../stream/index.js")).ExperimentalTwizzleStreamServer;
      streamServer ||= new TwizzleStreamServer();
      const streams = await streamServer.streams();
      select.textContent = "";
      select.disabled = false;
      const info = select.appendChild(document.createElement("option"));
      info.textContent = `Select a stream (${streams.length} available)`;
      info.value = SENTINEL_VALUE;
      for (const stream of streams) {
        const firstSender = stream.senders[0];
        const option = select.appendChild(document.createElement("option"));
        option.value = stream.streamID;
        option.textContent = `${firstSender.name} (${stream.streamID.slice(
          -2
        )})`;
      }
    });
    select.addEventListener("change", () => {
      const streamID = select.value;
      if (streamID === SENTINEL_VALUE) {
        return;
      }
      const stream = streamServer.connect(streamID);
      stream.addEventListener(
        "move",
        ((moveEvent) => {
          console.log(moveEvent);
          this.dispatchEvent(new CustomEvent("move", moveEvent));
        })
        // TODO: https://github.com/microsoft/TypeScript/issues/28357
      );
    });
  }
};
customElementsShim.define("twisty-stream-source", TwistyStreamSource);

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
function makeSourceInfo(moveStrings, type, from, to) {
  const output = [];
  for (const moveString of moveStrings) {
    const move = Move.fromString(moveString);
    const { family, amount: direction } = move;
    if (![-1, 1].includes(direction)) {
      throw new Error("Invalid config move");
    }
    output.push({ family, direction, type, from, to });
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
function simplestMove(axis, from, to, directedAmount) {
  if (from + 1 === to) {
    const sliceSpecificInfo = byAxisThenSpecificSlices[axis].get(from);
    if (sliceSpecificInfo) {
      return new Move(
        new QuantumMove(sliceSpecificInfo.family),
        directedAmount * sliceSpecificInfo.direction
      );
    }
  }
  const axisInfo = axisInfos[axis];
  const { sliceDiameter } = axisInfo;
  if (from === 0 && to === sliceDiameter) {
    const moveSourceInfo2 = firstOfType(axis, 5 /* ROTATION */);
    return new Move(
      new QuantumMove(moveSourceInfo2.family),
      directedAmount * moveSourceInfo2.direction
    );
  }
  const far = from + to > sliceDiameter;
  if (far) {
    [from, to] = [sliceDiameter - to, sliceDiameter - from];
  }
  let outerLayer = from + 1;
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
  let [from, to] = lastCandidateRange.sliceDeltas.keys();
  if (from > to) {
    [from, to] = [to, from];
  }
  const directedAmount = lastCandidateRange.sliceDeltas.get(from);
  return [
    ...moves.slice(0, -lastCandidateRange.suffixLength),
    ...directedAmount !== 0 ? [simplestMove(axis, from, to, directedAmount)] : []
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
var megaminxStickeringListPromise = new LazyPromise(
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

// src/cubing/twisty/controllers/indexer/AlgDuration.ts
function defaultDurationForAmount(amount) {
  switch (Math.abs(amount)) {
    case 0:
      return 0;
    case 1:
      return 1e3;
    case 2:
      return 1500;
    default:
      return 2e3;
  }
}
var AlgDuration = class extends TraversalUp {
  // TODO: Pass durationForAmount as Down type instead?
  constructor(durationForAmount = defaultDurationForAmount) {
    super();
    this.durationForAmount = durationForAmount;
  }
  traverseAlg(alg) {
    let total = 0;
    for (const algNode of alg.childAlgNodes()) {
      total += this.traverseAlgNode(algNode);
    }
    return total;
  }
  traverseGrouping(grouping) {
    return grouping.amount * this.traverseAlg(grouping.alg);
  }
  traverseMove(move) {
    return this.durationForAmount(move.amount);
  }
  traverseCommutator(commutator) {
    return 2 * (this.traverseAlg(commutator.A) + this.traverseAlg(commutator.B));
  }
  traverseConjugate(conjugate) {
    return 2 * this.traverseAlg(conjugate.A) + this.traverseAlg(conjugate.B);
  }
  traversePause(_pause) {
    return this.durationForAmount(1);
  }
  traverseNewline(_newline) {
    return this.durationForAmount(1);
  }
  traverseLineComment(_comment) {
    return this.durationForAmount(0);
  }
};

// src/cubing/twisty/controllers/indexer/SimpleAlgIndexer.ts
var SimpleAlgIndexer = class {
  constructor(kpuzzle, alg) {
    this.kpuzzle = kpuzzle;
    this.moves = new Alg(alg.experimentalExpand());
  }
  moves;
  // TODO: Allow custom `durationFn`.
  durationFn = new AlgDuration(
    defaultDurationForAmount
  );
  getAnimLeaf(index) {
    return Array.from(this.moves.childAlgNodes())[index];
  }
  indexToMoveStartTimestamp(index) {
    const alg = new Alg(Array.from(this.moves.childAlgNodes()).slice(0, index));
    return this.durationFn.traverseAlg(alg);
  }
  timestampToIndex(timestamp) {
    let cumulativeTime = 0;
    let i;
    for (i = 0; i < this.numAnimatedLeaves(); i++) {
      cumulativeTime += this.durationFn.traverseMove(this.getAnimLeaf(i));
      if (cumulativeTime >= timestamp) {
        return i;
      }
    }
    return i;
  }
  patternAtIndex(index) {
    return this.kpuzzle.defaultPattern().applyTransformation(this.transformationAtIndex(index));
  }
  transformationAtIndex(index) {
    let pattern = this.kpuzzle.identityTransformation();
    for (const move of Array.from(this.moves.childAlgNodes()).slice(0, index)) {
      pattern = pattern.applyMove(move);
    }
    return pattern;
  }
  algDuration() {
    return this.durationFn.traverseAlg(this.moves);
  }
  numAnimatedLeaves() {
    return countAnimatedLeaves(this.moves);
  }
  moveDuration(index) {
    return this.durationFn.traverseMove(this.getAnimLeaf(index));
  }
};

// src/cubing/twisty/controllers/indexer/tree/AlgWalker.ts
var AlgWalkerDecoration = class {
  constructor(moveCount, duration, forward, backward, children = []) {
    this.moveCount = moveCount;
    this.duration = duration;
    this.forward = forward;
    this.backward = backward;
    this.children = children;
  }
};
var DecoratorConstructor = class extends TraversalUp {
  constructor(kpuzzle) {
    super();
    this.kpuzzle = kpuzzle;
    this.identity = kpuzzle.identityTransformation();
    this.dummyLeaf = new AlgWalkerDecoration(
      0,
      0,
      this.identity,
      this.identity,
      []
    );
  }
  identity;
  dummyLeaf;
  durationFn = new AlgDuration(
    defaultDurationForAmount
  );
  cache = {};
  traverseAlg(alg) {
    let moveCount = 0;
    let duration = 0;
    let transformation = this.identity;
    const child = [];
    for (const algNode of alg.childAlgNodes()) {
      const apd = this.traverseAlgNode(algNode);
      moveCount += apd.moveCount;
      duration += apd.duration;
      if (transformation === this.identity) {
        transformation = apd.forward;
      } else {
        transformation = transformation.applyTransformation(apd.forward);
      }
      child.push(apd);
    }
    return new AlgWalkerDecoration(
      moveCount,
      duration,
      transformation,
      transformation.invert(),
      child
    );
  }
  traverseGrouping(grouping) {
    const dec = this.traverseAlg(grouping.alg);
    return this.mult(dec, grouping.amount, [dec]);
  }
  traverseMove(move) {
    const key = move.toString();
    let r2 = this.cache[key];
    if (r2) {
      return r2;
    }
    const transformation = this.kpuzzle.moveToTransformation(move);
    r2 = new AlgWalkerDecoration(
      1,
      this.durationFn.traverseAlgNode(move),
      transformation,
      transformation.invert()
    );
    this.cache[key] = r2;
    return r2;
  }
  traverseCommutator(commutator) {
    const decA = this.traverseAlg(commutator.A);
    const decB = this.traverseAlg(commutator.B);
    const AB = decA.forward.applyTransformation(decB.forward);
    const ApBp = decA.backward.applyTransformation(decB.backward);
    const ABApBp = AB.applyTransformation(ApBp);
    const dec = new AlgWalkerDecoration(
      2 * (decA.moveCount + decB.moveCount),
      2 * (decA.duration + decB.duration),
      ABApBp,
      ABApBp.invert(),
      [decA, decB]
    );
    return this.mult(dec, 1, [dec, decA, decB]);
  }
  traverseConjugate(conjugate) {
    const decA = this.traverseAlg(conjugate.A);
    const decB = this.traverseAlg(conjugate.B);
    const AB = decA.forward.applyTransformation(decB.forward);
    const ABAp = AB.applyTransformation(decA.backward);
    const dec = new AlgWalkerDecoration(
      2 * decA.moveCount + decB.moveCount,
      2 * decA.duration + decB.duration,
      ABAp,
      ABAp.invert(),
      [decA, decB]
    );
    return this.mult(dec, 1, [dec, decA, decB]);
  }
  traversePause(pause) {
    if (pause.experimentalNISSGrouping) {
      return this.dummyLeaf;
    }
    return new AlgWalkerDecoration(
      1,
      this.durationFn.traverseAlgNode(pause),
      this.identity,
      this.identity
    );
  }
  traverseNewline(_newline) {
    return this.dummyLeaf;
  }
  traverseLineComment(_comment) {
    return this.dummyLeaf;
  }
  mult(apd, n, child) {
    const absn = Math.abs(n);
    const st = apd.forward.selfMultiply(n);
    return new AlgWalkerDecoration(
      apd.moveCount * absn,
      apd.duration * absn,
      st,
      st.invert(),
      child
    );
  }
};
var WalkerDown = class {
  constructor(apd, back) {
    this.apd = apd;
    this.back = back;
  }
};
var AlgWalker = class extends TraversalDownUp {
  constructor(kpuzzle, algOrAlgNode, apd) {
    super();
    this.kpuzzle = kpuzzle;
    this.algOrAlgNode = algOrAlgNode;
    this.apd = apd;
    this.i = -1;
    this.dur = -1;
    this.goalIndex = -1;
    this.goalDuration = -1;
    this.move = void 0;
    this.back = false;
    this.moveDuration = 0;
    this.st = this.kpuzzle.identityTransformation();
    this.root = new WalkerDown(this.apd, false);
  }
  move;
  moveDuration;
  back;
  st;
  root;
  i;
  dur;
  goalIndex;
  goalDuration;
  moveByIndex(loc) {
    if (this.i >= 0 && this.i === loc) {
      return this.move !== void 0;
    }
    return this.dosearch(loc, Infinity);
  }
  moveByDuration(dur) {
    if (this.dur >= 0 && this.dur < dur && this.dur + this.moveDuration >= dur) {
      return this.move !== void 0;
    }
    return this.dosearch(Infinity, dur);
  }
  dosearch(loc, dur) {
    this.goalIndex = loc;
    this.goalDuration = dur;
    this.i = 0;
    this.dur = 0;
    this.move = void 0;
    this.moveDuration = 0;
    this.back = false;
    this.st = this.kpuzzle.identityTransformation();
    const r2 = this.algOrAlgNode.is(Alg) ? this.traverseAlg(this.algOrAlgNode, this.root) : this.traverseAlgNode(this.algOrAlgNode, this.root);
    return r2;
  }
  traverseAlg(alg, wd) {
    if (!this.firstcheck(wd)) {
      return false;
    }
    let i = wd.back ? alg.experimentalNumChildAlgNodes() - 1 : 0;
    for (const algNode of directedGenerator(
      alg.childAlgNodes(),
      wd.back ? -1 /* Backwards */ : 1 /* Forwards */
    )) {
      if (this.traverseAlgNode(
        algNode,
        new WalkerDown(wd.apd.children[i], wd.back)
      )) {
        return true;
      }
      i += wd.back ? -1 : 1;
    }
    return false;
  }
  traverseGrouping(grouping, wd) {
    if (!this.firstcheck(wd)) {
      return false;
    }
    const back = this.domult(wd, grouping.amount);
    return this.traverseAlg(
      grouping.alg,
      new WalkerDown(wd.apd.children[0], back)
    );
  }
  traverseMove(move, wd) {
    if (!this.firstcheck(wd)) {
      return false;
    }
    this.move = move;
    this.moveDuration = wd.apd.duration;
    this.back = wd.back;
    return true;
  }
  traverseCommutator(commutator, wd) {
    if (!this.firstcheck(wd)) {
      return false;
    }
    const back = this.domult(wd, 1);
    if (back) {
      return this.traverseAlg(
        commutator.B,
        new WalkerDown(wd.apd.children[2], !back)
      ) || this.traverseAlg(
        commutator.A,
        new WalkerDown(wd.apd.children[1], !back)
      ) || this.traverseAlg(
        commutator.B,
        new WalkerDown(wd.apd.children[2], back)
      ) || this.traverseAlg(commutator.A, new WalkerDown(wd.apd.children[1], back));
    } else {
      return this.traverseAlg(
        commutator.A,
        new WalkerDown(wd.apd.children[1], back)
      ) || this.traverseAlg(
        commutator.B,
        new WalkerDown(wd.apd.children[2], back)
      ) || this.traverseAlg(
        commutator.A,
        new WalkerDown(wd.apd.children[1], !back)
      ) || this.traverseAlg(
        commutator.B,
        new WalkerDown(wd.apd.children[2], !back)
      );
    }
  }
  traverseConjugate(conjugate, wd) {
    if (!this.firstcheck(wd)) {
      return false;
    }
    const back = this.domult(wd, 1);
    if (back) {
      return this.traverseAlg(
        conjugate.A,
        new WalkerDown(wd.apd.children[1], !back)
      ) || this.traverseAlg(
        conjugate.B,
        new WalkerDown(wd.apd.children[2], back)
      ) || this.traverseAlg(conjugate.A, new WalkerDown(wd.apd.children[1], back));
    } else {
      return this.traverseAlg(
        conjugate.A,
        new WalkerDown(wd.apd.children[1], back)
      ) || this.traverseAlg(
        conjugate.B,
        new WalkerDown(wd.apd.children[2], back)
      ) || this.traverseAlg(conjugate.A, new WalkerDown(wd.apd.children[1], !back));
    }
  }
  traversePause(pause, wd) {
    if (!this.firstcheck(wd)) {
      return false;
    }
    this.move = pause;
    this.moveDuration = wd.apd.duration;
    this.back = wd.back;
    return true;
  }
  traverseNewline(_newline, _wd) {
    return false;
  }
  traverseLineComment(_lineComment, _wd) {
    return false;
  }
  firstcheck(wd) {
    if (wd.apd.moveCount + this.i <= this.goalIndex && wd.apd.duration + this.dur < this.goalDuration) {
      return this.keepgoing(wd);
    }
    return true;
  }
  domult(wd, amount) {
    let back = wd.back;
    if (amount === 0) {
      return back;
    }
    if (amount < 0) {
      back = !back;
      amount = -amount;
    }
    const base = wd.apd.children[0];
    const full = Math.min(
      Math.floor((this.goalIndex - this.i) / base.moveCount),
      Math.ceil((this.goalDuration - this.dur) / base.duration - 1)
    );
    if (full > 0) {
      this.keepgoing(new WalkerDown(base, back), full);
    }
    return back;
  }
  keepgoing(wd, mul = 1) {
    this.i += mul * wd.apd.moveCount;
    this.dur += mul * wd.apd.duration;
    if (mul !== 1) {
      if (wd.back) {
        this.st = this.st.applyTransformation(
          wd.apd.backward.selfMultiply(mul)
        );
      } else {
        this.st = this.st.applyTransformation(wd.apd.forward.selfMultiply(mul));
      }
    } else {
      if (wd.back) {
        this.st = this.st.applyTransformation(wd.apd.backward);
      } else {
        this.st = this.st.applyTransformation(wd.apd.forward);
      }
    }
    return false;
  }
};

// src/cubing/twisty/controllers/indexer/tree/chunkAlgs.ts
var MIN_CHUNKING_THRESHOLD = 16;
function chunkifyAlg(alg, chunkMaxLength) {
  const mainAlgBuilder = new AlgBuilder();
  const chunkAlgBuilder = new AlgBuilder();
  for (const algNode of alg.childAlgNodes()) {
    chunkAlgBuilder.push(algNode);
    if (chunkAlgBuilder.experimentalNumAlgNodes() >= chunkMaxLength) {
      mainAlgBuilder.push(new Grouping(chunkAlgBuilder.toAlg()));
      chunkAlgBuilder.reset();
    }
  }
  mainAlgBuilder.push(new Grouping(chunkAlgBuilder.toAlg()));
  return mainAlgBuilder.toAlg();
}
var ChunkAlgs = class extends TraversalUp {
  traverseAlg(alg) {
    const algLength = alg.experimentalNumChildAlgNodes();
    if (algLength < MIN_CHUNKING_THRESHOLD) {
      return alg;
    }
    return chunkifyAlg(alg, Math.ceil(Math.sqrt(algLength)));
  }
  traverseGrouping(grouping) {
    return new Grouping(
      this.traverseAlg(grouping.alg),
      grouping.amount
      // TODO
    );
  }
  traverseMove(move) {
    return move;
  }
  traverseCommutator(commutator) {
    return new Conjugate(
      this.traverseAlg(commutator.A),
      this.traverseAlg(commutator.B)
    );
  }
  traverseConjugate(conjugate) {
    return new Conjugate(
      this.traverseAlg(conjugate.A),
      this.traverseAlg(conjugate.B)
    );
  }
  traversePause(pause) {
    return pause;
  }
  traverseNewline(newline) {
    return newline;
  }
  traverseLineComment(comment) {
    return comment;
  }
};
var chunkAlgs = functionFromTraversal(ChunkAlgs);

// src/cubing/twisty/controllers/indexer/tree/TreeAlgIndexer.ts
var TreeAlgIndexer = class {
  constructor(kpuzzle, alg) {
    this.kpuzzle = kpuzzle;
    const deccon = new DecoratorConstructor(this.kpuzzle);
    const chunkedAlg = chunkAlgs(alg);
    this.decoration = deccon.traverseAlg(chunkedAlg);
    this.walker = new AlgWalker(this.kpuzzle, chunkedAlg, this.decoration);
  }
  decoration;
  walker;
  getAnimLeaf(index) {
    if (this.walker.moveByIndex(index)) {
      if (!this.walker.move) {
        throw new Error("`this.walker.mv` missing");
      }
      const move = this.walker.move;
      if (this.walker.back) {
        return move.invert();
      }
      return move;
    }
    return null;
  }
  indexToMoveStartTimestamp(index) {
    if (this.walker.moveByIndex(index) || this.walker.i === index) {
      return this.walker.dur;
    }
    throw new Error(`Out of algorithm: index ${index}`);
  }
  indexToMovesInProgress(index) {
    if (this.walker.moveByIndex(index) || this.walker.i === index) {
      return this.walker.dur;
    }
    throw new Error(`Out of algorithm: index ${index}`);
  }
  patternAtIndex(index, startPattern) {
    this.walker.moveByIndex(index);
    return (startPattern ?? this.kpuzzle.defaultPattern()).applyTransformation(
      this.walker.st
    );
  }
  // TransformAtIndex does not reflect the start pattern; it only reflects
  // the change from the start pattern to the current move index.  If you
  // want the actual pattern, use patternAtIndex.
  transformationAtIndex(index) {
    this.walker.moveByIndex(index);
    return this.walker.st;
  }
  numAnimatedLeaves() {
    return this.decoration.moveCount;
  }
  timestampToIndex(timestamp) {
    this.walker.moveByDuration(timestamp);
    return this.walker.i;
  }
  algDuration() {
    return this.decoration.duration;
  }
  moveDuration(index) {
    this.walker.moveByIndex(index);
    return this.walker.moveDuration;
  }
};

// src/cubing/twisty/debug.ts
var twistyDebugGlobals = {
  shareAllNewRenderers: "auto",
  showRenderStats: false
};
function setTwistyDebug(options) {
  for (const [key, value] of Object.entries(options)) {
    if (key in twistyDebugGlobals) {
      twistyDebugGlobals[key] = value;
    }
  }
}

// src/cubing/twisty/model/props/viewer/BackViewProp.ts
var backViewLayouts = {
  none: true,
  // default
  "side-by-side": true,
  "top-right": true
};
var BackViewProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/views/2D/TwistyAnimatedSVG.ts
var xmlns = "http://www.w3.org/2000/svg";
var DATA_COPY_ID_ATTRIBUTE = "data-copy-id";
var svgCounter = 0;
function nextSVGID() {
  svgCounter += 1;
  return `svg${svgCounter.toString()}`;
}
var colorMaps = {
  dim: {
    white: "#dddddd",
    orange: "#884400",
    limegreen: "#008800",
    red: "#660000",
    "rgb(34, 102, 255)": "#000088",
    // TODO
    yellow: "#888800",
    "rgb(102, 0, 153)": "rgb(50, 0, 76)",
    purple: "#3f003f"
  },
  oriented: "#44ddcc",
  ignored: "#555555",
  invisible: "#00000000"
};
var TwistyAnimatedSVG = class {
  constructor(kpuzzle, svgSource, experimentalStickeringMask, showUnknownOrientations = false) {
    this.kpuzzle = kpuzzle;
    this.showUnknownOrientations = showUnknownOrientations;
    if (!svgSource) {
      throw new Error(`No SVG definition for puzzle type: ${kpuzzle.name()}`);
    }
    this.svgID = nextSVGID();
    this.wrapperElement = document.createElement("div");
    this.wrapperElement.classList.add("svg-wrapper");
    this.wrapperElement.innerHTML = svgSource;
    const svgElem = this.wrapperElement.querySelector("svg");
    if (!svgElem) {
      throw new Error("Could not get SVG element");
    }
    this.svgElement = svgElem;
    if (xmlns !== svgElem.namespaceURI) {
      throw new Error("Unexpected XML namespace");
    }
    svgElem.style.maxWidth = "100%";
    svgElem.style.maxHeight = "100%";
    this.gradientDefs = document.createElementNS(xmlns, "defs");
    svgElem.insertBefore(this.gradientDefs, svgElem.firstChild);
    for (const orbitDefinition of kpuzzle.definition.orbits) {
      for (let idx = 0; idx < orbitDefinition.numPieces; idx++) {
        for (let orientation = 0; orientation < orbitDefinition.numOrientations; orientation++) {
          const id = this.elementID(
            orbitDefinition.orbitName,
            idx,
            orientation
          );
          const elem = this.elementByID(id);
          let originalColor = elem?.style.fill;
          if (experimentalStickeringMask) {
            (() => {
              const a = experimentalStickeringMask.orbits;
              if (!a) {
                return;
              }
              const orbitStickeringMask = a[orbitDefinition.orbitName];
              if (!orbitStickeringMask) {
                return;
              }
              const pieceStickeringMask = orbitStickeringMask.pieces[idx];
              if (!pieceStickeringMask) {
                return;
              }
              const faceletStickeringMasks = pieceStickeringMask.facelets[orientation];
              if (!faceletStickeringMasks) {
                return;
              }
              const stickeringMask = typeof faceletStickeringMasks === "string" ? faceletStickeringMasks : faceletStickeringMasks?.mask;
              const colorMap = colorMaps[stickeringMask];
              if (typeof colorMap === "string") {
                originalColor = colorMap;
              } else if (colorMap) {
                originalColor = colorMap[originalColor];
              }
            })();
          } else {
            originalColor = elem?.style.fill;
          }
          this.originalColors[id] = originalColor;
          this.gradients[id] = this.newGradient(id, originalColor);
          this.gradientDefs.appendChild(this.gradients[id]);
          elem?.setAttribute("style", `fill: url(#grad-${this.svgID}-${id})`);
        }
      }
    }
    for (const hintElem of Array.from(
      svgElem.querySelectorAll(`[${DATA_COPY_ID_ATTRIBUTE}]`)
    )) {
      const id = hintElem.getAttribute(DATA_COPY_ID_ATTRIBUTE);
      hintElem.setAttribute("style", `fill: url(#grad-${this.svgID}-${id})`);
    }
    if (this.showUnknownOrientations) {
      this.drawPattern(this.kpuzzle.defaultPattern());
    }
  }
  wrapperElement;
  svgElement;
  gradientDefs;
  originalColors = {};
  gradients = {};
  svgID;
  drawPattern(pattern, nextPattern, fraction) {
    this.draw(pattern, nextPattern, fraction);
  }
  // TODO: save definition in the constructor?
  draw(pattern, nextPattern, fraction) {
    const nextTransformation = nextPattern?.experimentalToTransformation();
    if (!pattern) {
      throw new Error("Distinguishable pieces are not handled for SVG yet!");
    }
    for (const orbitDefinition of pattern.kpuzzle.definition.orbits) {
      const currentPatternOrbit = pattern.patternData[orbitDefinition.orbitName];
      const nextTransformationOrbit = nextTransformation ? nextTransformation.transformationData[orbitDefinition.orbitName] : null;
      for (let idx = 0; idx < orbitDefinition.numPieces; idx++) {
        for (let orientation = 0; orientation < orbitDefinition.numOrientations; orientation++) {
          const id = this.elementID(
            orbitDefinition.orbitName,
            idx,
            orientation
          );
          const fromCur = this.elementID(
            orbitDefinition.orbitName,
            currentPatternOrbit.pieces[idx],
            (orbitDefinition.numOrientations - currentPatternOrbit.orientation[idx] + orientation) % orbitDefinition.numOrientations
          );
          let singleColor = false;
          if (nextTransformationOrbit) {
            const fromNext = this.elementID(
              orbitDefinition.orbitName,
              nextTransformationOrbit.permutation[idx],
              (orbitDefinition.numOrientations - nextTransformationOrbit.orientationDelta[idx] + orientation) % orbitDefinition.numOrientations
            );
            if (fromCur === fromNext) {
              singleColor = true;
            }
            fraction = fraction || 0;
            const easedBackwardsPercent = 100 * (1 - fraction * fraction * (2 - fraction * fraction));
            this.gradients[id].children[0].setAttribute(
              "stop-color",
              this.originalColors[fromCur]
            );
            this.gradients[id].children[0].setAttribute(
              "offset",
              `${Math.max(easedBackwardsPercent - 5, 0)}%`
            );
            this.gradients[id].children[1].setAttribute(
              "offset",
              `${Math.max(easedBackwardsPercent - 5, 0)}%`
            );
            this.gradients[id].children[2].setAttribute(
              "offset",
              `${easedBackwardsPercent}%`
            );
            this.gradients[id].children[3].setAttribute(
              "offset",
              `${easedBackwardsPercent}%`
            );
            this.gradients[id].children[3].setAttribute(
              "stop-color",
              this.originalColors[fromNext]
            );
          } else {
            singleColor = true;
          }
          if (singleColor) {
            if (this.showUnknownOrientations && currentPatternOrbit.orientationMod?.[idx] === 1) {
              this.gradients[id].children[0].setAttribute("stop-color", "#000");
              this.gradients[id].children[0].setAttribute("offset", "5%");
              this.gradients[id].children[1].setAttribute("offset", "5%");
              this.gradients[id].children[2].setAttribute("offset", "20%");
              this.gradients[id].children[3].setAttribute("offset", "20%");
              this.gradients[id].children[3].setAttribute(
                "stop-color",
                this.originalColors[fromCur]
              );
            } else {
              this.gradients[id].children[0].setAttribute(
                "stop-color",
                this.originalColors[fromCur]
              );
              this.gradients[id].children[0].setAttribute("offset", "100%");
              this.gradients[id].children[1].setAttribute("offset", "100%");
              this.gradients[id].children[2].setAttribute("offset", "100%");
              this.gradients[id].children[3].setAttribute("offset", "100%");
            }
          }
        }
      }
    }
  }
  newGradient(id, originalColor) {
    const grad = document.createElementNS(
      xmlns,
      "radialGradient"
    );
    grad.setAttribute("id", `grad-${this.svgID}-${id}`);
    grad.setAttribute("r", "70.7107%");
    const stopDefs = [
      { offset: 0, color: originalColor },
      { offset: 0, color: "black" },
      { offset: 0, color: "black" },
      { offset: 0, color: originalColor }
    ];
    for (const stopDef of stopDefs) {
      const stop = document.createElementNS(xmlns, "stop");
      stop.setAttribute("offset", `${stopDef.offset}%`);
      stop.setAttribute("stop-color", stopDef.color);
      stop.setAttribute("stop-opacity", "1");
      grad.appendChild(stop);
    }
    return grad;
  }
  elementID(orbitName, idx, orientation) {
    return `${orbitName}-l${idx}-o${orientation}`;
  }
  elementByID(id) {
    return this.wrapperElement.querySelector(`#${id}`);
  }
};

// src/cubing/twisty/views/ClassListManager.ts
var ClassListManager = class {
  // The prefix should ideally end in a dash.
  constructor(elem, prefix, validSuffixes) {
    this.elem = elem;
    this.prefix = prefix;
    this.validSuffixes = validSuffixes;
  }
  #currentClassName = null;
  // Does nothing if there was no value.
  clearValue() {
    if (this.#currentClassName) {
      this.elem.contentWrapper.classList.remove(this.#currentClassName);
    }
    this.#currentClassName = null;
  }
  // Returns if the value changed
  setValue(suffix) {
    if (!this.validSuffixes.includes(suffix)) {
      throw new Error(`Invalid suffix: ${suffix}`);
    }
    const newClassName = `${this.prefix}${suffix}`;
    const changed = this.#currentClassName !== newClassName;
    if (changed) {
      this.clearValue();
      this.elem.contentWrapper.classList.add(newClassName);
      this.#currentClassName = newClassName;
    }
    return changed;
  }
};

// src/cubing/twisty/controllers/RenderScheduler.ts
var RenderScheduler = class {
  constructor(callback) {
    this.callback = callback;
  }
  animFrameID = null;
  animFrame = this.animFrameWrapper.bind(this);
  requestIsPending() {
    return !!this.animFrameID;
  }
  requestAnimFrame() {
    if (!this.animFrameID) {
      this.animFrameID = requestAnimationFrame(this.animFrame);
    }
  }
  cancelAnimFrame() {
    if (this.animFrameID) {
      cancelAnimationFrame(this.animFrameID);
      this.animFrameID = 0;
    }
  }
  animFrameWrapper(timestamp) {
    this.animFrameID = 0;
    this.callback(timestamp);
  }
};

// src/cubing/twisty/model/helpers.ts
function arrayEquals(a, b) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
function arrayEqualsCompare(a, b, compare) {
  if (a === b) {
    return true;
  }
  if (a.length !== b.length) {
    return false;
  }
  for (let i = 0; i < a.length; i++) {
    if (!compare(a[i], b[i])) {
      return false;
    }
  }
  return true;
}
function modIntoRange(v, rangeMin, rangeMax) {
  return offsetMod(v, rangeMax - rangeMin, rangeMin);
}

// src/cubing/twisty/controllers/AnimationTypes.ts
function directionScalar(direction) {
  return direction;
}

// src/cubing/twisty/controllers/TwistyAnimationController.ts
var CatchUpHelper = class {
  // TODO
  constructor(model) {
    this.model = model;
    model.tempoScale.addFreshListener((tempoScale) => {
      this.tempoScale = tempoScale;
    });
  }
  catchingUp = false;
  pendingFrame = false;
  tempoScale = 1;
  scheduler = new RenderScheduler(
    this.animFrame.bind(this)
  );
  start() {
    if (!this.catchingUp) {
      this.lastTimestamp = performance.now();
    }
    this.catchingUp = true;
    this.pendingFrame = true;
    this.scheduler.requestAnimFrame();
  }
  stop() {
    this.catchingUp = false;
    this.scheduler.cancelAnimFrame();
  }
  catchUpMs = 500;
  lastTimestamp = 0;
  animFrame(timestamp) {
    this.scheduler.requestAnimFrame();
    const delta = this.tempoScale * (timestamp - this.lastTimestamp) / this.catchUpMs;
    this.lastTimestamp = timestamp;
    this.model.catchUpMove.set(
      (async () => {
        const previousCatchUpMove = await this.model.catchUpMove.get();
        if (previousCatchUpMove.move === null) {
          return previousCatchUpMove;
        }
        const amount = previousCatchUpMove.amount + delta;
        if (amount >= 1) {
          this.pendingFrame = true;
          this.stop();
          this.model.timestampRequest.set("end");
          return {
            move: null,
            amount: 0
          };
        }
        this.pendingFrame = false;
        return {
          move: previousCatchUpMove.move,
          amount
        };
      })()
    );
  }
};
var TwistyAnimationController = class {
  constructor(model, delegate) {
    this.delegate = delegate;
    this.model = model;
    this.lastTimestampPromise = this.#effectiveTimestampMilliseconds();
    this.model.playingInfo.addFreshListener(this.onPlayingProp.bind(this));
    this.catchUpHelper = new CatchUpHelper(this.model);
    this.model.catchUpMove.addFreshListener(this.onCatchUpMoveProp.bind(this));
  }
  // TODO: #private?
  playing = false;
  direction = 1 /* Forwards */;
  catchUpHelper;
  model;
  lastDatestamp = 0;
  lastTimestampPromise;
  scheduler = new RenderScheduler(
    this.animFrame.bind(this)
  );
  // TODO: Do we need this?
  async onPlayingProp(playingInfo) {
    if (playingInfo.playing !== this.playing) {
      playingInfo.playing ? this.play(playingInfo) : this.pause();
    }
  }
  // TODO: Do we need this?
  async onCatchUpMoveProp(catchUpMove) {
    const catchingUp = catchUpMove.move !== null;
    if (catchingUp !== this.catchUpHelper.catchingUp) {
      catchingUp ? this.catchUpHelper.start() : this.catchUpHelper.stop();
    }
    this.scheduler.requestAnimFrame();
  }
  async #effectiveTimestampMilliseconds() {
    return (await this.model.detailedTimelineInfo.get()).timestamp;
  }
  // TODO: Return the animation we've switched to.
  jumpToStart(options) {
    this.model.timestampRequest.set("start");
    this.pause();
    if (options?.flash) {
      this.delegate.flash();
    }
  }
  // TODO: Return the animation we've switched to.
  jumpToEnd(options) {
    this.model.timestampRequest.set("end");
    this.pause();
    if (options?.flash) {
      this.delegate.flash();
    }
  }
  // TODO: Return the playing info we've switched to.
  playPause() {
    if (this.playing) {
      this.pause();
    } else {
      this.play();
    }
  }
  // TODO: bundle playing direction, and boundary into `toggle`.
  play(options) {
    void (async () => {
      const direction = options?.direction ?? 1 /* Forwards */;
      const coarseTimelineInfo = await this.model.coarseTimelineInfo.get();
      if (options?.autoSkipToOtherEndIfStartingAtBoundary ?? true) {
        if (direction === 1 /* Forwards */ && coarseTimelineInfo.atEnd) {
          this.model.timestampRequest.set("start");
          this.delegate.flash();
        }
        if (direction === -1 /* Backwards */ && coarseTimelineInfo.atStart) {
          this.model.timestampRequest.set("end");
          this.delegate.flash();
        }
      }
      this.model.playingInfo.set({
        playing: true,
        direction,
        untilBoundary: options?.untilBoundary ?? "entire-timeline" /* EntireTimeline */,
        loop: options?.loop ?? false
      });
      this.playing = true;
      this.lastDatestamp = performance.now();
      this.lastTimestampPromise = this.#effectiveTimestampMilliseconds();
      this.scheduler.requestAnimFrame();
    })();
  }
  pause() {
    this.playing = false;
    this.scheduler.cancelAnimFrame();
    this.model.playingInfo.set({
      playing: false,
      untilBoundary: "entire-timeline" /* EntireTimeline */
    });
  }
  #animFrameEffectiveTimestampStaleDropper = new StaleDropper();
  async animFrame(frameDatestamp) {
    if (this.playing) {
      this.scheduler.requestAnimFrame();
    }
    const lastDatestamp = this.lastDatestamp;
    const freshenerResult = await this.#animFrameEffectiveTimestampStaleDropper.queue(
      Promise.all([
        this.model.playingInfo.get(),
        this.lastTimestampPromise,
        this.model.timeRange.get(),
        this.model.tempoScale.get(),
        this.model.currentMoveInfo.get()
      ])
    );
    const [playingInfo, lastTimestamp, timeRange, tempoScale, currentMoveInfo] = freshenerResult;
    if (!playingInfo.playing) {
      this.playing = false;
      return;
    }
    let end = currentMoveInfo.earliestEnd;
    if (currentMoveInfo.currentMoves.length === 0 || playingInfo.untilBoundary === "entire-timeline" /* EntireTimeline */) {
      end = timeRange.end;
    }
    let start = currentMoveInfo.latestStart;
    if (currentMoveInfo.currentMoves.length === 0 || playingInfo.untilBoundary === "entire-timeline" /* EntireTimeline */) {
      start = timeRange.start;
    }
    let delta = (frameDatestamp - lastDatestamp) * directionScalar(this.direction) * tempoScale;
    delta = Math.max(delta, 1);
    delta *= playingInfo.direction;
    let newTimestamp = lastTimestamp + delta;
    let newSmartTimestampRequest = null;
    if (newTimestamp >= end) {
      if (playingInfo.loop) {
        newTimestamp = modIntoRange(
          newTimestamp,
          timeRange.start,
          timeRange.end
        );
      } else {
        if (newTimestamp === timeRange.end) {
          newSmartTimestampRequest = "end";
        } else {
          newTimestamp = end;
        }
        this.playing = false;
        this.model.playingInfo.set({
          playing: false
        });
      }
    } else if (newTimestamp <= start) {
      if (playingInfo.loop) {
        newTimestamp = modIntoRange(
          newTimestamp,
          timeRange.start,
          timeRange.end
        );
      } else {
        if (newTimestamp === timeRange.start) {
          newSmartTimestampRequest = "start";
        } else {
          newTimestamp = start;
        }
        this.playing = false;
        this.model.playingInfo.set({
          playing: false
        });
      }
    }
    this.lastDatestamp = frameDatestamp;
    this.lastTimestampPromise = Promise.resolve(
      newTimestamp
    );
    this.model.timestampRequest.set(newSmartTimestampRequest ?? newTimestamp);
  }
};

// src/cubing/twisty/controllers/TwistyPlayerController.ts
var TwistyPlayerController = class {
  constructor(model, delegate) {
    this.model = model;
    this.animationController = new TwistyAnimationController(model, delegate);
  }
  animationController;
  jumpToStart(options) {
    this.animationController.jumpToStart(options);
  }
  jumpToEnd(options) {
    this.animationController.jumpToEnd(options);
  }
  togglePlay(play) {
    if (typeof play === "undefined") {
      this.animationController.playPause();
    }
    play ? this.animationController.play() : this.animationController.pause();
  }
  async visitTwizzleLink() {
    const a = document.createElement("a");
    a.href = await this.model.twizzleLink();
    a.target = "_blank";
    a.click();
  }
};

// src/cubing/twisty/model/props/viewer/ControlPanelProp.ts
var controlsLocations = {
  "bottom-row": true,
  // default
  none: true
};
var ControlPanelProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/heavy-code-imports/3d.ts
var bulk3DCode = new LazyPromise(
  () => import("./twisty-dynamic-3d-5NZRNZ7C.js")
);

// src/cubing/twisty/views/TwistyViewerWrapper.css.ts
var twistyViewerWrapperCSS = new cssStyleSheetShim();
twistyViewerWrapperCSS.replaceSync(
  `
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.wrapper > * {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wrapper.back-view-side-by-side {
  grid-template-columns: 1fr 1fr;
}

.wrapper.back-view-top-right {
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 3fr;
}

.wrapper.back-view-top-right > :nth-child(1) {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}

.wrapper.back-view-top-right > :nth-child(2) {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
`
);

// src/cubing/twisty/model/props/puzzle/display/HintFaceletProp.ts
var hintFaceletStyles = {
  floating: true,
  // default
  none: true
};
var HintFaceletProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/views/2D/Twisty2DPuzzle.css.ts
var twisty2DSVGCSS = new cssStyleSheetShim();
twisty2DSVGCSS.replaceSync(
  `
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.svg-wrapper,
twisty-2d-svg,
svg {
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 0;
}

svg {
  animation: fade-in 0.25s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hint-facelets-none .hint-facelet {
  display: none;
}
`
);

// src/cubing/twisty/views/2D/Twisty2DPuzzle.ts
var Twisty2DPuzzle = class extends ManagedCustomElement {
  // TODO: pull when needed.
  constructor(model, kpuzzle, svgSource, options, puzzleLoader) {
    super();
    this.model = model;
    this.kpuzzle = kpuzzle;
    this.svgSource = svgSource;
    this.options = options;
    this.puzzleLoader = puzzleLoader;
    this.addCSS(twisty2DSVGCSS);
    this.resetSVG();
    this.#freshListenerManager.addListener(
      this.model.puzzleID,
      (puzzleID) => {
        if (puzzleLoader?.id !== puzzleID) {
          this.disconnect();
        }
      }
    );
    this.#freshListenerManager.addListener(
      this.model.twistySceneModel.hintFacelet,
      (hintFacelet) => {
        this.setHintFacelet(hintFacelet);
      }
    );
    this.#freshListenerManager.addListener(
      this.model.legacyPosition,
      this.onPositionChange.bind(this)
    );
    if (this.options?.experimentalStickeringMask) {
      this.experimentalSetStickeringMask(
        this.options.experimentalStickeringMask
      );
    }
  }
  svgWrapper;
  scheduler = new RenderScheduler(this.render.bind(this));
  #cachedPosition = null;
  #freshListenerManager = new FreshListenerManager();
  disconnect() {
    this.#freshListenerManager.disconnect();
  }
  onPositionChange(position) {
    try {
      if (position.movesInProgress.length > 0) {
        const move = position.movesInProgress[0].move;
        let partialMove = move;
        if (position.movesInProgress[0].direction === -1 /* Backwards */) {
          partialMove = move.invert();
        }
        const newPattern = position.pattern.applyMove(partialMove);
        this.svgWrapper?.draw(
          position.pattern,
          newPattern,
          position.movesInProgress[0].fraction
        );
      } else {
        this.svgWrapper?.draw(position.pattern);
        this.#cachedPosition = position;
      }
    } catch (e) {
      console.warn(
        "Bad position (this doesn't necessarily mean something is wrong). Pre-emptively disconnecting:",
        this.puzzleLoader?.id,
        e
      );
      this.disconnect();
    }
  }
  scheduleRender() {
    this.scheduler.requestAnimFrame();
  }
  experimentalSetStickeringMask(stickeringMask) {
    this.resetSVG(stickeringMask);
  }
  // TODO: do this without constructing a new SVG.
  resetSVG(stickeringMask) {
    if (this.svgWrapper) {
      this.removeElement(this.svgWrapper.wrapperElement);
    }
    if (!this.kpuzzle) {
      return;
    }
    this.svgWrapper = new TwistyAnimatedSVG(
      this.kpuzzle,
      this.svgSource,
      stickeringMask
    );
    this.addElement(this.svgWrapper.wrapperElement);
    if (this.#cachedPosition) {
      this.onPositionChange(this.#cachedPosition);
    }
  }
  hintFaceletsClassListManager = new ClassListManager(
    this,
    "hint-facelets-",
    Object.keys(hintFaceletStyles)
  );
  setHintFacelet(hintFacelet) {
    this.hintFaceletsClassListManager.setValue(
      hintFacelet === "auto" ? "floating" : hintFacelet
    );
  }
  render() {
  }
};
customElementsShim.define("twisty-2d-puzzle", Twisty2DPuzzle);

// src/cubing/twisty/views/2D/Twisty2DPuzzleWrapper.ts
var Twisty2DPuzzleWrapper = class {
  constructor(model, schedulable, puzzleLoader, effectiveVisualization) {
    this.model = model;
    this.schedulable = schedulable;
    this.puzzleLoader = puzzleLoader;
    this.effectiveVisualization = effectiveVisualization;
    void this.twisty2DPuzzle();
    this.#freshListenerManager.addListener(
      this.model.twistySceneModel.stickeringMask,
      async (stickeringMask) => {
        (await this.twisty2DPuzzle()).experimentalSetStickeringMask(
          stickeringMask
        );
      }
    );
  }
  #freshListenerManager = new FreshListenerManager();
  disconnect() {
    this.#freshListenerManager.disconnect();
  }
  // TODO: Hook this up nicely.
  scheduleRender() {
  }
  #cachedTwisty2DPuzzle = null;
  // TODO: Stale dropper?
  async twisty2DPuzzle() {
    return this.#cachedTwisty2DPuzzle ??= (async () => {
      const svgPromise = this.effectiveVisualization === "experimental-2D-LL-face" ? this.puzzleLoader.llFaceSVG() : this.effectiveVisualization === "experimental-2D-LL" ? this.puzzleLoader.llSVG() : this.puzzleLoader.svg();
      return new Twisty2DPuzzle(
        this.model,
        await this.puzzleLoader.kpuzzle(),
        await svgPromise,
        {},
        this.puzzleLoader
      );
    })();
  }
};

// src/cubing/twisty/views/2D/Twisty2DSceneWrapper.ts
var Twisty2DSceneWrapper = class extends ManagedCustomElement {
  constructor(model, effectiveVisualization) {
    super();
    this.model = model;
    this.effectiveVisualization = effectiveVisualization;
  }
  #freshListenerManager = new FreshListenerManager();
  disconnect() {
    this.#freshListenerManager.disconnect();
  }
  async connectedCallback() {
    this.addCSS(twistyViewerWrapperCSS);
    if (this.model) {
      this.#freshListenerManager.addListener(
        this.model.twistyPlayerModel.puzzleLoader,
        this.onPuzzleLoader.bind(this)
      );
    }
  }
  #cachedScene;
  async scene() {
    return this.#cachedScene ??= (async () => new (await bulk3DCode).ThreeScene())();
  }
  scheduleRender() {
    this.#currentTwisty2DPuzzleWrapper?.scheduleRender();
  }
  #currentTwisty2DPuzzleWrapper;
  currentTwisty2DPuzzleWrapper() {
    return this.#currentTwisty2DPuzzleWrapper;
  }
  // #oldTwisty3DPuzzleWrappers: Twisty3DPuzzleWrapper[] = []; // TODO: Animate these out.
  async setCurrentTwisty2DPuzzleWrapper(twisty2DPuzzleWrapper) {
    const old = this.#currentTwisty2DPuzzleWrapper;
    this.#currentTwisty2DPuzzleWrapper = twisty2DPuzzleWrapper;
    old?.disconnect();
    const twisty2DPuzzlePromise = twisty2DPuzzleWrapper.twisty2DPuzzle();
    this.contentWrapper.textContent = "";
    this.addElement(await twisty2DPuzzlePromise);
  }
  async onPuzzleLoader(puzzleLoader) {
    this.#currentTwisty2DPuzzleWrapper?.disconnect();
    const twisty2DPuzzleWrapper = new Twisty2DPuzzleWrapper(
      this.model.twistyPlayerModel,
      this,
      puzzleLoader,
      this.effectiveVisualization
    );
    void this.setCurrentTwisty2DPuzzleWrapper(twisty2DPuzzleWrapper);
  }
};
customElementsShim.define("twisty-2d-scene-wrapper", Twisty2DSceneWrapper);

// src/cubing/twisty/views/InitialValueTracker.ts
var InitialValueTracker = class {
  // @ts-expect-error: We do initialize this synchronously (assuming no one has tampered with the `Promise` constructor).
  #resolve;
  // @ts-expect-error: We do initialize this synchronously (assuming no one has tampered with the `Promise` constructor).
  reject;
  // TODO: AbortController?
  promise;
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.#resolve = resolve;
      this.reject = reject;
    });
  }
  handleNewValue(t) {
    this.#resolve(t);
  }
};

// src/cubing/twisty/views/3D/Twisty3DPuzzleWrapper.ts
var Twisty3DPuzzleWrapper = class extends EventTarget {
  constructor(model, schedulable, puzzleLoader, visualizationStrategy) {
    super();
    this.model = model;
    this.schedulable = schedulable;
    this.puzzleLoader = puzzleLoader;
    this.visualizationStrategy = visualizationStrategy;
    void this.twisty3DPuzzle();
    this.#freshListenerManager.addListener(
      this.model.puzzleLoader,
      (puzzleLoader2) => {
        if (this.puzzleLoader.id !== puzzleLoader2.id) {
          this.disconnect();
        }
      }
    );
    this.#freshListenerManager.addListener(
      this.model.legacyPosition,
      async (position) => {
        try {
          (await this.twisty3DPuzzle()).onPositionChange(position);
          this.scheduleRender();
        } catch {
          this.disconnect();
        }
      }
    );
    this.#freshListenerManager.addListener(
      this.model.twistySceneModel.hintFacelet,
      async (hintFaceletStyle) => {
        (await this.twisty3DPuzzle()).experimentalUpdateOptions({
          hintFacelets: hintFaceletStyle === "auto" ? "floating" : hintFaceletStyle
        });
        this.scheduleRender();
      }
    );
    this.#freshListenerManager.addListener(
      this.model.twistySceneModel.foundationDisplay,
      async (foundationDisplay) => {
        (await this.twisty3DPuzzle()).experimentalUpdateOptions({
          showFoundation: foundationDisplay !== "none"
        });
        this.scheduleRender();
      }
    );
    this.#freshListenerManager.addListener(
      this.model.twistySceneModel.stickeringMask,
      async (stickeringMask) => {
        const twisty3D = await this.twisty3DPuzzle();
        twisty3D.setStickeringMask(stickeringMask);
        this.scheduleRender();
      }
    );
    this.#freshListenerManager.addListener(
      this.model.twistySceneModel.faceletScale,
      async (faceletScale) => {
        (await this.twisty3DPuzzle()).experimentalUpdateOptions({
          faceletScale
        });
        this.scheduleRender();
      }
    );
    this.#freshListenerManager.addMultiListener3(
      [
        this.model.twistySceneModel.stickeringMask,
        this.model.twistySceneModel.foundationStickerSprite,
        this.model.twistySceneModel.hintStickerSprite
      ],
      async (inputs) => {
        if ("experimentalUpdateTexture" in await this.twisty3DPuzzle()) {
          (await this.twisty3DPuzzle()).experimentalUpdateTexture(
            inputs[0].specialBehaviour === "picture",
            inputs[1],
            inputs[2]
          );
          this.scheduleRender();
        }
      }
    );
  }
  #freshListenerManager = new FreshListenerManager();
  disconnect() {
    this.#freshListenerManager.disconnect();
  }
  scheduleRender() {
    this.schedulable.scheduleRender();
    this.dispatchEvent(new CustomEvent("render-scheduled"));
  }
  #cachedTwisty3DPuzzle = null;
  async twisty3DPuzzle() {
    return this.#cachedTwisty3DPuzzle ??= (async () => {
      if (this.puzzleLoader.id === "3x3x3" && this.visualizationStrategy === "Cube3D") {
        const [
          foundationSprite,
          hintSprite,
          experimentalStickeringMask,
          initialHintFaceletsAnimation
        ] = await Promise.all([
          this.model.twistySceneModel.foundationStickerSprite.get(),
          this.model.twistySceneModel.hintStickerSprite.get(),
          this.model.twistySceneModel.stickeringMask.get(),
          this.model.twistySceneModel.initialHintFaceletsAnimation.get()
        ]);
        return (await bulk3DCode).cube3DShim(
          () => this.schedulable.scheduleRender(),
          {
            foundationSprite,
            hintSprite,
            experimentalStickeringMask,
            initialHintFaceletsAnimation
          }
        );
      } else {
        const [hintFacelets, foundationSprite, hintSprite, faceletScale] = await Promise.all([
          this.model.twistySceneModel.hintFacelet.get(),
          this.model.twistySceneModel.foundationStickerSprite.get(),
          this.model.twistySceneModel.hintStickerSprite.get(),
          this.model.twistySceneModel.faceletScale.get()
        ]);
        const pg3d = (await bulk3DCode).pg3dShim(
          () => this.schedulable.scheduleRender(),
          this.puzzleLoader,
          hintFacelets === "auto" ? "floating" : hintFacelets,
          faceletScale,
          this.puzzleLoader.id === "kilominx"
          // TODO: generalize to other puzzles
        );
        pg3d.then(
          (p) => p.experimentalUpdateTexture(
            true,
            foundationSprite ?? void 0,
            hintSprite ?? void 0
          )
        );
        return pg3d;
      }
    })();
  }
  async raycastMove(raycasterPromise, transformations) {
    const puzzle = await this.twisty3DPuzzle();
    if (!("experimentalGetControlTargets" in puzzle)) {
      console.info("not PG3D! skipping raycast");
      return;
    }
    const targets = puzzle.experimentalGetControlTargets();
    const [raycaster, movePressCancelOptions] = await Promise.all([
      raycasterPromise,
      this.model.twistySceneModel.movePressCancelOptions.get()
    ]);
    const intersects = raycaster.intersectObjects(targets);
    if (intersects.length > 0) {
      const closestMove = puzzle.getClosestMoveToAxis(
        intersects[0].point,
        transformations
      );
      if (closestMove) {
        this.model.experimentalAddMove(closestMove.move, {
          cancel: movePressCancelOptions
        });
      } else {
        console.info("Skipping move!");
      }
    }
  }
};

// src/cubing/vendor/mit/three/examples/jsm/libs/stats.modified.module.ts
var performance2 = globalThis.performance;
var Stats = class {
  mode = 0;
  dom = document.createElement("div");
  constructor() {
    this.dom.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";
    this.dom.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        this.showPanel(++this.mode % this.dom.children.length);
      },
      false
    );
    this.showPanel(0);
  }
  addPanel(panel) {
    this.dom.appendChild(panel.dom);
    return panel;
  }
  showPanel(id) {
    for (let i = 0; i < this.dom.children.length; i++) {
      this.dom.children[i].style.display = i === id ? "block" : "none";
    }
    this.mode = id;
  }
  beginTime = (performance2 || Date).now();
  prevTime = this.beginTime;
  frames = 0;
  fpsPanel = this.addPanel(new StatsPanel("FPS", "#0ff", "#002"));
  msPanel = this.addPanel(new StatsPanel("MS", "#0f0", "#020"));
  memPanel = performance2?.memory ? this.addPanel(new StatsPanel("MB", "#f08", "#201")) : null;
  REVISION = 16;
  begin() {
    this.beginTime = (performance2 || Date).now();
  }
  end() {
    this.frames++;
    const time = (performance2 || Date).now();
    this.msPanel.update(time - this.beginTime, 200);
    if (time >= this.prevTime + 1e3) {
      this.fpsPanel.update(this.frames * 1e3 / (time - this.prevTime), 100);
      this.prevTime = time;
      this.frames = 0;
      if (this.memPanel) {
        const memory = performance2.memory;
        this.memPanel.update(
          memory.usedJSHeapSize / 1048576,
          memory.jsHeapSizeLimit / 1048576
        );
      }
    }
    return time;
  }
  update() {
    this.beginTime = this.end();
  }
};
var PR = Math.round(globalThis?.window?.devicePixelRatio ?? 1);
var WIDTH = 80 * PR;
var HEIGHT = 48 * PR;
var TEXT_X = 3 * PR;
var TEXT_Y = 2 * PR;
var GRAPH_X = 3 * PR;
var GRAPH_Y = 15 * PR;
var GRAPH_WIDTH = 74 * PR;
var GRAPH_HEIGHT = 30 * PR;
var StatsPanel = class {
  constructor(name, fg, bg) {
    this.name = name;
    this.fg = fg;
    this.bg = bg;
    this.dom.width = WIDTH;
    this.dom.height = HEIGHT;
    this.dom.style.cssText = "width:80px;height:48px";
    this.context.font = `bold ${9 * PR}px Helvetica,Arial,sans-serif`;
    this.context.textBaseline = "top";
    this.context.fillStyle = bg;
    this.context.fillRect(0, 0, WIDTH, HEIGHT);
    this.context.fillStyle = fg;
    this.context.fillText(name, TEXT_X, TEXT_Y);
    this.context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
    this.context.fillStyle = bg;
    this.context.globalAlpha = 0.9;
    this.context.fillRect(GRAPH_X, GRAPH_Y, GRAPH_WIDTH, GRAPH_HEIGHT);
  }
  min = Infinity;
  max = 0;
  dom = document.createElement("canvas");
  context = this.dom.getContext("2d");
  update(value, maxValue) {
    this.min = Math.min(this.min, value);
    this.max = Math.max(this.max, value);
    this.context.fillStyle = this.bg;
    this.context.globalAlpha = 1;
    this.context.fillRect(0, 0, WIDTH, GRAPH_Y);
    this.context.fillStyle = this.fg;
    this.context.fillText(
      `${Math.round(value)} ${this.name} (${Math.round(this.min)}-${Math.round(
        this.max
      )})`,
      TEXT_X,
      TEXT_Y
    );
    this.context.drawImage(
      this.dom,
      GRAPH_X + PR,
      GRAPH_Y,
      GRAPH_WIDTH - PR,
      GRAPH_HEIGHT,
      GRAPH_X,
      GRAPH_Y,
      GRAPH_WIDTH - PR,
      GRAPH_HEIGHT
    );
    this.context.fillRect(
      GRAPH_X + GRAPH_WIDTH - PR,
      GRAPH_Y,
      PR,
      GRAPH_HEIGHT
    );
    this.context.fillStyle = this.bg;
    this.context.globalAlpha = 0.9;
    this.context.fillRect(
      GRAPH_X + GRAPH_WIDTH - PR,
      GRAPH_Y,
      PR,
      Math.round((1 - value / maxValue) * GRAPH_HEIGHT)
    );
  }
};

// src/cubing/twisty/views/canvas.ts
var globalPixelRatioOverride = null;
function pixelRatio() {
  return globalPixelRatioOverride ?? (devicePixelRatio || 1);
}

// src/cubing/twisty/views/3D/DragTracker.ts
var MOVEMENT_EPSILON = 0.1;
var DragTracker = class extends EventTarget {
  constructor(target) {
    super();
    this.target = target;
  }
  #dragInfoMap = /* @__PURE__ */ new Map();
  // Idempotent
  start() {
    this.addTargetListener("pointerdown", this.onPointerDown.bind(this));
    this.addTargetListener("contextmenu", (e) => {
      e.preventDefault();
    });
    this.addTargetListener(
      "touchmove",
      (e) => e.preventDefault()
    );
    this.addTargetListener("dblclick", (e) => e.preventDefault());
  }
  // Idempotent
  stop() {
    for (const [eventType, listener] of this.#targetListeners.entries()) {
      this.target.removeEventListener(
        eventType,
        listener
      );
    }
    this.#targetListeners.clear();
    this.#lazyListenersRegistered = false;
  }
  #targetListeners = /* @__PURE__ */ new Map();
  addTargetListener(eventType, listener) {
    if (!this.#targetListeners.has(eventType)) {
      this.target.addEventListener(
        eventType,
        listener
        // TODO
      );
      this.#targetListeners.set(eventType, listener);
    }
  }
  // This allows us to avoid getting a callback every time the pointer moves over the canvas, until we have a down event.
  // TODO: Ideally we'd also support unregistering when we're certain there are no more active touches. But this means we need to properly handle every way a pointer "click" can end, which is tricky across environments (due to e.g. mouse vs. touch vs. stylues, canvas/viewport/window/scroll boundaries, right-click and other ways of losing focus, etc.), so we conservatively leave the listeners on.
  #lazyListenersRegistered = false;
  #registerLazyListeners() {
    if (this.#lazyListenersRegistered) {
      return;
    }
    this.addTargetListener("pointermove", this.onPointerMove.bind(this));
    this.addTargetListener("pointerup", this.onPointerUp.bind(this));
    this.#lazyListenersRegistered = true;
  }
  #clear(e) {
    this.#dragInfoMap.delete(e.pointerId);
  }
  // `null`: means: ignore this result (no movement, or not
  #trackDrag(e) {
    const existing = this.#dragInfoMap.get(e.pointerId);
    if (!existing) {
      return { movementInfo: null, hasMoved: false };
    }
    let movementInfo;
    if ((e.movementX ?? 0) !== 0 || (e.movementY ?? 0) !== 0) {
      movementInfo = {
        attachedInfo: existing.attachedInfo,
        movementX: e.movementX,
        movementY: e.movementY,
        elapsedMs: e.timeStamp - existing.lastTimeStamp
      };
    } else {
      movementInfo = {
        attachedInfo: existing.attachedInfo,
        movementX: e.clientX - existing.lastClientX,
        movementY: e.clientY - existing.lastClientY,
        elapsedMs: e.timeStamp - existing.lastTimeStamp
      };
    }
    existing.lastClientX = e.clientX;
    existing.lastClientY = e.clientY;
    existing.lastTimeStamp = e.timeStamp;
    if (Math.abs(movementInfo.movementX) < MOVEMENT_EPSILON && Math.abs(movementInfo.movementY) < MOVEMENT_EPSILON) {
      return { movementInfo: null, hasMoved: existing.hasMoved };
    } else {
      existing.hasMoved = true;
      return { movementInfo, hasMoved: existing.hasMoved };
    }
  }
  onPointerDown(e) {
    this.#registerLazyListeners();
    const newDragInfo = {
      attachedInfo: {},
      hasMoved: false,
      lastClientX: e.clientX,
      lastClientY: e.clientY,
      lastTimeStamp: e.timeStamp
    };
    this.#dragInfoMap.set(e.pointerId, newDragInfo);
    this.target.setPointerCapture(e.pointerId);
  }
  onPointerMove(e) {
    const movementInfo = this.#trackDrag(e).movementInfo;
    if (movementInfo) {
      e.preventDefault();
      this.dispatchEvent(
        new CustomEvent("move", {
          detail: movementInfo
        })
      );
    }
  }
  onPointerUp(e) {
    const trackDragResult = this.#trackDrag(e);
    const existing = this.#dragInfoMap.get(e.pointerId);
    this.#clear(e);
    this.target.releasePointerCapture(e.pointerId);
    let event;
    if (trackDragResult.hasMoved) {
      event = new CustomEvent("up", {
        detail: { attachedInfo: existing.attachedInfo }
      });
    } else {
      const { altKey, ctrlKey, metaKey, shiftKey } = e;
      event = new CustomEvent("press", {
        detail: {
          normalizedX: e.offsetX / this.target.offsetWidth * 2 - 1,
          normalizedY: 1 - e.offsetY / this.target.offsetHeight * 2,
          rightClick: !!(e.button & 2),
          keys: {
            altKey,
            ctrlOrMetaKey: ctrlKey || metaKey,
            shiftKey
          }
        }
      });
    }
    this.dispatchEvent(event);
  }
};

// src/cubing/twisty/views/3D/RendererPool.ts
var renderers = [];
async function rawRenderPooled(width, height, scene, camera) {
  if (renderers.length === 0) {
    renderers.push(newRenderer());
  }
  const renderer = await renderers[0];
  renderer.setSize(width, height);
  renderer.render(scene, camera);
  return renderer.domElement;
}
async function renderPooled(width, height, canvas, scene, camera) {
  if (width === 0 || height === 0) {
    return;
  }
  if (renderers.length === 0) {
    renderers.push(newRenderer());
  }
  const rendererCanvas = await rawRenderPooled(width, height, scene, camera);
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(rendererCanvas, 0, 0);
}
var linearSRGBColorSpace = "srgb-linear";
async function newRenderer() {
  const rendererConstructor = (await bulk3DCode).ThreeWebGLRenderer;
  const renderer = new rendererConstructor({
    antialias: true,
    alpha: true
  });
  renderer.outputColorSpace = linearSRGBColorSpace;
  renderer.setPixelRatio(pixelRatio());
  return renderer;
}

// src/cubing/twisty/views/3D/TAU.ts
var TAU = Math.PI * 2;
var DEGREES_PER_RADIAN = 360 / TAU;

// src/cubing/twisty/views/3D/Twisty3DVantage.css.ts
var twisty3DVantageCSS = new cssStyleSheetShim();
twisty3DVantageCSS.replaceSync(
  `
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  place-content: center;
  contain: strict;
}

.loading {
  width: 4em;
  height: 4em;
  border-radius: 2.5em;
  border: 0.5em solid rgba(0, 0, 0, 0);
  border-top: 0.5em solid rgba(0, 0, 0, 0.7);
  border-right: 0.5em solid rgba(0, 0, 0, 0.7);
  animation: fade-in-delayed 4s, rotate 1s linear infinite;
}

@keyframes fade-in-delayed {
  0% { opacity: 0; }
  25% {opacity: 0; }
  100% { opacity: 1; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* TODO: This is due to stats hack. Replace with \`canvas\`. */
.wrapper > canvas {
  max-width: 100%;
  max-height: 100%;
  animation: fade-in 0.25s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.wrapper.invisible {
  opacity: 0;
}

.wrapper.drag-input-enabled > canvas {
  cursor: grab;
}

.wrapper.drag-input-enabled > canvas:active {
  cursor: grabbing;
}
`
);

// src/cubing/twisty/views/3D/TwistyOrbitControls.ts
var INERTIA_DEFAULT = true;
var INERTIA_DURATION_MS = 500;
var INERTIA_TIMEOUT_MS = 50;
var VERTICAL_MOVEMENT_BASE_SCALE = 0.75;
function momentumScale(progress) {
  return (Math.exp(1 - progress) - (1 - progress)) / (1 - Math.E) + 1;
}
var Inertia = class {
  constructor(startTimestamp, momentumX, momentumY, callback) {
    this.startTimestamp = startTimestamp;
    this.momentumX = momentumX;
    this.momentumY = momentumY;
    this.callback = callback;
    this.scheduler.requestAnimFrame();
    this.lastTimestamp = startTimestamp;
  }
  scheduler = new RenderScheduler(this.render.bind(this));
  lastTimestamp;
  render(now) {
    const progressBefore = (this.lastTimestamp - this.startTimestamp) / INERTIA_DURATION_MS;
    const progressAfter = Math.min(
      1,
      (now - this.startTimestamp) / INERTIA_DURATION_MS
    );
    if (progressBefore === 0 && progressAfter > INERTIA_TIMEOUT_MS / INERTIA_DURATION_MS) {
      return;
    }
    const delta = momentumScale(progressAfter) - momentumScale(progressBefore);
    this.callback(this.momentumX * delta * 1e3, this.momentumY * delta * 1e3);
    if (progressAfter < 1) {
      this.scheduler.requestAnimFrame();
    }
    this.lastTimestamp = now;
  }
};
var TwistyOrbitControls = class {
  constructor(model, mirror, canvas, dragTracker) {
    this.model = model;
    this.mirror = mirror;
    this.canvas = canvas;
    this.dragTracker = dragTracker;
    this.dragTracker.addEventListener(
      "move",
      this.onMove.bind(this)
      // TODO: https://github.com/microsoft/TypeScript/issues/28357
    );
    this.dragTracker.addEventListener(
      "up",
      this.onUp.bind(this)
      // TODO: https://github.com/microsoft/TypeScript/issues/28357
    );
  }
  /** @deprecated */
  experimentalInertia = INERTIA_DEFAULT;
  onMovementBound = this.onMovement.bind(this);
  experimentalHasBeenMoved = false;
  // f is the fraction of the canvas traversed per ms.
  temperMovement(f) {
    return Math.sign(f) * Math.log(Math.abs(f * 10) + 1) / 6;
  }
  onMove(e) {
    e.detail.attachedInfo ??= {};
    const { temperedX, temperedY } = this.onMovement(
      e.detail.movementX,
      e.detail.movementY
    );
    const attachedInfo = e.detail.attachedInfo;
    attachedInfo.lastTemperedX = temperedX * 10;
    attachedInfo.lastTemperedY = temperedY * 10;
    attachedInfo.timestamp = e.timeStamp;
  }
  onMovement(movementX, movementY) {
    const scale = this.mirror ? -1 : 1;
    const minDim = Math.min(this.canvas.offsetWidth, this.canvas.offsetHeight);
    const temperedX = this.temperMovement(movementX / minDim);
    const temperedY = this.temperMovement(
      movementY / minDim * VERTICAL_MOVEMENT_BASE_SCALE
    );
    this.model.twistySceneModel.orbitCoordinatesRequest.set(
      (async () => {
        const prevCoords = await this.model.twistySceneModel.orbitCoordinates.get();
        const newCoords = {
          latitude: prevCoords.latitude + 2 * temperedY * DEGREES_PER_RADIAN * scale,
          longitude: prevCoords.longitude - 2 * temperedX * DEGREES_PER_RADIAN
        };
        return newCoords;
      })()
    );
    return { temperedX, temperedY };
  }
  onUp(e) {
    e.preventDefault();
    if ("lastTemperedX" in e.detail.attachedInfo && "lastTemperedY" in e.detail.attachedInfo && "timestamp" in e.detail.attachedInfo && e.timeStamp - e.detail.attachedInfo["timestamp"] < 60) {
      new Inertia(
        e.timeStamp,
        // TODO
        e.detail.attachedInfo.lastTemperedX,
        e.detail.attachedInfo.lastTemperedY,
        this.onMovementBound
      );
    }
  }
};

// src/cubing/twisty/views/3D/Twisty3DVantage.ts
async function setCameraFromOrbitCoordinates(camera, orbitCoordinates, backView = false) {
  const spherical = new (await bulk3DCode).ThreeSpherical(
    orbitCoordinates.distance,
    (90 - (backView ? -1 : 1) * orbitCoordinates.latitude) / DEGREES_PER_RADIAN,
    ((backView ? 180 : 0) + orbitCoordinates.longitude) / DEGREES_PER_RADIAN
  );
  spherical.makeSafe();
  camera.position.setFromSpherical(spherical);
  camera.lookAt(0, 0, 0);
}
var dedicatedRenderersSoFar = 0;
var DEFAULT_MAX_DEDICATED_RENDERERS = 2;
var sharingRenderers = false;
function shareRenderer() {
  if (twistyDebugGlobals.shareAllNewRenderers !== "auto") {
    if (!twistyDebugGlobals.shareAllNewRenderers) {
      dedicatedRenderersSoFar++;
    }
    return twistyDebugGlobals.shareAllNewRenderers !== "never";
  }
  if (dedicatedRenderersSoFar < DEFAULT_MAX_DEDICATED_RENDERERS) {
    dedicatedRenderersSoFar++;
    return false;
  } else {
    sharingRenderers = true;
    return true;
  }
}
function haveStartedSharingRenderers() {
  return sharingRenderers;
}
var Twisty3DVantage = class extends ManagedCustomElement {
  constructor(model, scene, options) {
    super();
    this.model = model;
    this.options = options;
    this.scene = scene ?? null;
    this.loadingElement = this.addElement(document.createElement("div"));
    this.loadingElement.classList.add("loading");
    if (twistyDebugGlobals.showRenderStats) {
      this.stats = new Stats();
      this.stats.dom.style.position = "absolute";
      this.contentWrapper.appendChild(this.stats.dom);
    }
  }
  scene = null;
  stats = null;
  rendererIsShared = shareRenderer();
  loadingElement = null;
  async connectedCallback() {
    this.addCSS(twisty3DVantageCSS);
    this.addElement((await this.canvasInfo()).canvas);
    void this.#onResize();
    const observer = new ResizeObserver(this.#onResize.bind(this));
    observer.observe(this.contentWrapper);
    void this.orbitControls();
    void this.#setupBasicPresses();
    this.scheduleRender();
  }
  async #setupBasicPresses() {
    const dragTracker = await this.#dragTracker();
    dragTracker.addEventListener(
      "press",
      (async (e) => {
        const movePressInput = await this.model.twistySceneModel.movePressInput.get();
        if (movePressInput !== "basic") {
          return;
        }
        this.dispatchEvent(
          new CustomEvent("press", {
            detail: {
              pressInfo: e.detail,
              cameraPromise: this.camera()
            }
          })
        );
      })
      // TODO
    );
  }
  #onResizeStaleDropper = new StaleDropper();
  async clearCanvas() {
    if (this.rendererIsShared) {
      const canvasInfo = await this.canvasInfo();
      canvasInfo.context.clearRect(
        0,
        0,
        canvasInfo.canvas.width,
        canvasInfo.canvas.height
      );
    } else {
      const renderer = await this.renderer();
      const context = renderer.getContext();
      context.clear(context.COLOR_BUFFER_BIT);
    }
  }
  // TODO: Why doesn't this work for the top-right back view height?
  #width = 0;
  #height = 0;
  async #onResize() {
    const camera = await this.#onResizeStaleDropper.queue(this.camera());
    const w = this.contentWrapper.clientWidth;
    const h = this.contentWrapper.clientHeight;
    this.#width = w;
    this.#height = h;
    const off = 0;
    let yoff = 0;
    let excess = 0;
    if (h > w) {
      excess = h - w;
      yoff = -Math.floor(0.5 * excess);
    }
    camera.aspect = w / h;
    camera.setViewOffset(w, h - excess, off, yoff, w, h);
    camera.updateProjectionMatrix();
    void this.clearCanvas();
    if (this.rendererIsShared) {
      const canvasInfo = await this.canvasInfo();
      canvasInfo.canvas.width = w * pixelRatio();
      canvasInfo.canvas.height = h * pixelRatio();
      canvasInfo.canvas.style.width = `${w.toString()}px`;
      canvasInfo.canvas.style.height = `${h.toString()}px`;
    } else {
      const renderer = await this.renderer();
      renderer.setSize(w, h, true);
    }
    this.scheduleRender();
  }
  #cachedRenderer = null;
  async renderer() {
    if (this.rendererIsShared) {
      throw new Error("renderer expected to be shared.");
    }
    return this.#cachedRenderer ??= newRenderer();
  }
  #cachedCanvas = null;
  async canvasInfo() {
    return this.#cachedCanvas ??= (async () => {
      let canvas;
      if (this.rendererIsShared) {
        canvas = this.addElement(document.createElement("canvas"));
      } else {
        const renderer = await this.renderer();
        canvas = this.addElement(renderer.domElement);
      }
      this.loadingElement?.remove();
      const context = canvas.getContext("2d");
      return { canvas, context };
    })();
  }
  #cachedDragTracker = null;
  async #dragTracker() {
    return this.#cachedDragTracker ??= (async () => {
      const dragTracker = new DragTracker((await this.canvasInfo()).canvas);
      this.model?.twistySceneModel.dragInput.addFreshListener(
        (dragInputMode) => {
          let dragInputEnabled = false;
          switch (dragInputMode) {
            case "auto": {
              dragTracker.start();
              dragInputEnabled = true;
              break;
            }
            case "none": {
              dragTracker.stop();
              break;
            }
          }
          this.contentWrapper.classList.toggle(
            "drag-input-enabled",
            dragInputEnabled
          );
        }
      );
      return dragTracker;
    })();
  }
  #cachedCamera = null;
  async camera() {
    return this.#cachedCamera ??= (async () => {
      const camera = new (await bulk3DCode).ThreePerspectiveCamera(
        20,
        1,
        // We rely on the resize logic to handle this.
        0.1,
        20
      );
      camera.position.copy(
        new (await bulk3DCode).ThreeVector3(2, 4, 4).multiplyScalar(
          this.options?.backView ? -1 : 1
        )
      );
      camera.lookAt(0, 0, 0);
      return camera;
    })();
  }
  #cachedOrbitControls = null;
  async orbitControls() {
    return this.#cachedOrbitControls ??= (async () => {
      const orbitControls = new TwistyOrbitControls(
        this.model,
        !!this.options?.backView,
        (await this.canvasInfo()).canvas,
        await this.#dragTracker()
      );
      if (this.model) {
        this.addListener(
          this.model.twistySceneModel.orbitCoordinates,
          async (orbitCoordinates) => {
            const camera = await this.camera();
            void setCameraFromOrbitCoordinates(
              camera,
              orbitCoordinates,
              this.options?.backView
            );
            this.scheduleRender();
          }
        );
      }
      return orbitControls;
    })();
  }
  addListener(prop, listener) {
    prop.addFreshListener(listener);
    this.#disconnectionFunctions.push(() => {
      prop.removeFreshListener(listener);
    });
  }
  #disconnectionFunctions = [];
  disconnect() {
    for (const fn of this.#disconnectionFunctions) {
      fn();
    }
    this.#disconnectionFunctions = [];
  }
  #experimentalNextRenderFinishedCallback = null;
  experimentalNextRenderFinishedCallback(callback) {
    this.#experimentalNextRenderFinishedCallback = callback;
  }
  async render() {
    if (!this.scene) {
      throw new Error("Attempted to render without a scene");
    }
    this.stats?.begin();
    const [scene, camera, canvas] = await Promise.all([
      this.scene.scene(),
      this.camera(),
      this.canvasInfo()
    ]);
    if (this.rendererIsShared) {
      await renderPooled(
        this.#width,
        this.#height,
        canvas.canvas,
        scene,
        camera
      );
    } else {
      (await this.renderer()).render(scene, camera);
    }
    this.stats?.end();
    this.#experimentalNextRenderFinishedCallback?.();
    this.#experimentalNextRenderFinishedCallback = null;
  }
  #scheduler = new RenderScheduler(this.render.bind(this));
  scheduleRender() {
    this.#scheduler.requestAnimFrame();
  }
};
customElementsShim.define("twisty-3d-vantage", Twisty3DVantage);

// src/cubing/twisty/views/3D/Twisty3DSceneWrapper.ts
var Twisty3DSceneWrapper = class extends ManagedCustomElement {
  constructor(model) {
    super();
    this.model = model;
  }
  // @ts-expect-error TypeScript type inference appears to be borked: ts(2322)
  #backViewClassListManager = new ClassListManager(this, "back-view-", [
    "auto",
    "none",
    "side-by-side",
    "top-right"
  ]);
  #freshListenerManager = new FreshListenerManager();
  disconnect() {
    this.#freshListenerManager.disconnect();
  }
  async connectedCallback() {
    this.addCSS(twistyViewerWrapperCSS);
    const vantage = new Twisty3DVantage(this.model, this);
    this.addVantage(vantage);
    if (this.model) {
      this.#freshListenerManager.addMultiListener(
        [this.model.puzzleLoader, this.model.visualizationStrategy],
        this.onPuzzle.bind(this)
      );
      this.#freshListenerManager.addListener(
        this.model.backView,
        // @ts-expect-error TypeScript type inference appears to be borked: ts(2322)
        this.setBackView.bind(this)
      );
    }
    this.scheduleRender();
  }
  #backViewVantage = null;
  setBackView(backView) {
    const shouldHaveBackView = ["side-by-side", "top-right"].includes(backView);
    const hasBackView = this.#backViewVantage !== null;
    this.#backViewClassListManager.setValue(backView);
    if (shouldHaveBackView) {
      if (!hasBackView) {
        this.#backViewVantage = new Twisty3DVantage(this.model, this, {
          backView: true
        });
        this.addVantage(this.#backViewVantage);
        this.scheduleRender();
      }
    } else {
      if (this.#backViewVantage) {
        this.removeVantage(this.#backViewVantage);
        this.#backViewVantage = null;
      }
    }
  }
  async onPress(e) {
    const twisty3DPuzzleWrapper = this.#currentTwisty3DPuzzleWrapper;
    if (!twisty3DPuzzleWrapper) {
      console.info("no wrapper; skipping scene wrapper press!");
      return;
    }
    const raycasterPromise = (async () => {
      const [camera, { ThreeRaycaster, ThreeVector2 }] = await Promise.all([
        e.detail.cameraPromise,
        (async () => {
          const { ThreeRaycaster: ThreeRaycaster2, ThreeVector2: ThreeVector22 } = await bulk3DCode;
          return { ThreeRaycaster: ThreeRaycaster2, ThreeVector2: ThreeVector22 };
        })()
      ]);
      const raycaster = new ThreeRaycaster();
      const mouse = new ThreeVector2(
        e.detail.pressInfo.normalizedX,
        e.detail.pressInfo.normalizedY
      );
      raycaster.setFromCamera(mouse, camera);
      return raycaster;
    })();
    twisty3DPuzzleWrapper.raycastMove(raycasterPromise, {
      invert: !e.detail.pressInfo.rightClick,
      depth: e.detail.pressInfo.keys.ctrlOrMetaKey ? "rotation" : e.detail.pressInfo.keys.shiftKey ? "secondSlice" : "none"
    });
  }
  #cachedScene;
  async scene() {
    return this.#cachedScene ??= (async () => new (await bulk3DCode).ThreeScene())();
  }
  #vantages = /* @__PURE__ */ new Set();
  addVantage(vantage) {
    vantage.addEventListener(
      "press",
      this.onPress.bind(this)
      // TODO: https://github.com/microsoft/TypeScript/issues/28357
    );
    this.#vantages.add(vantage);
    this.contentWrapper.appendChild(vantage);
  }
  removeVantage(vantage) {
    this.#vantages.delete(vantage);
    vantage.remove();
    vantage.disconnect();
    this.#currentTwisty3DPuzzleWrapper?.disconnect();
  }
  experimentalVantages() {
    return this.#vantages.values();
  }
  scheduleRender() {
    for (const vantage of this.#vantages) {
      vantage.scheduleRender();
    }
  }
  #currentTwisty3DPuzzleWrapper = null;
  // #oldTwisty3DPuzzleWrappers: Twisty3DPuzzleWrapper[] = []; // TODO: Animate these out.
  async setCurrentTwisty3DPuzzleWrapper(scene, twisty3DPuzzleWrapper) {
    const old = this.#currentTwisty3DPuzzleWrapper;
    try {
      this.#currentTwisty3DPuzzleWrapper = twisty3DPuzzleWrapper;
      old?.disconnect();
      scene.add(await twisty3DPuzzleWrapper.twisty3DPuzzle());
    } finally {
      if (old) {
        scene.remove(await old.twisty3DPuzzle());
      }
    }
    this.#initialWrapperTracker.handleNewValue(twisty3DPuzzleWrapper);
  }
  #initialWrapperTracker = new InitialValueTracker();
  /** @deprecated */
  async experimentalTwisty3DPuzzleWrapper() {
    return this.#currentTwisty3DPuzzleWrapper || this.#initialWrapperTracker.promise;
  }
  #twisty3DStaleDropper = new StaleDropper();
  async onPuzzle(inputs) {
    if (inputs[1] === "2D") {
      return;
    }
    this.#currentTwisty3DPuzzleWrapper?.disconnect();
    const [scene, twisty3DPuzzleWrapper] = await this.#twisty3DStaleDropper.queue(
      Promise.all([
        this.scene(),
        new Twisty3DPuzzleWrapper(this.model, this, inputs[0], inputs[1])
        // TODO
      ])
    );
    void this.setCurrentTwisty3DPuzzleWrapper(scene, twisty3DPuzzleWrapper);
  }
};
customElementsShim.define("twisty-3d-scene-wrapper", Twisty3DSceneWrapper);

// src/cubing/twisty/views/document.ts
var globalSafeDocument = typeof document === "undefined" ? null : document;

// src/cubing/twisty/views/control-panel/webkit-fullscreen.ts
var fullscreenEnabled = globalSafeDocument?.fullscreenEnabled || !!globalSafeDocument?.webkitFullscreenEnabled;
function documentExitFullscreen() {
  if (document.exitFullscreen) {
    return document.exitFullscreen();
  } else {
    return document.webkitExitFullscreen();
  }
}
function documentFullscreenElement() {
  if (document.fullscreenElement) {
    return document.fullscreenElement;
  } else {
    return document.webkitFullscreenElement ?? null;
  }
}
function requestFullscreen(element) {
  if (element.requestFullscreen) {
    return element.requestFullscreen();
  } else {
    return element.webkitRequestFullscreen();
  }
}

// src/cubing/twisty/model/props/viewer/ButtonAppearanceProp.ts
var buttonIcons = [
  "skip-to-start",
  "skip-to-end",
  "step-forward",
  "step-backward",
  "pause",
  "play",
  "enter-fullscreen",
  "exit-fullscreen",
  "twizzle-tw"
];
var ButtonAppearanceProp = class extends TwistyPropDerived {
  // TODO: This still seems to fire twice for play/pause?
  derive(inputs) {
    const buttonAppearances = {
      fullscreen: {
        // TODO: Cache?// TODO: Cache?
        enabled: fullscreenEnabled,
        icon: (
          // TODO: Check against the expected element?
          // TODO: This will *not* update when we enter/leave fullscreen. We need to work more closely with the controller.
          document.fullscreenElement === null ? "enter-fullscreen" : "exit-fullscreen"
        ),
        title: "Enter fullscreen"
      },
      "jump-to-start": {
        enabled: !inputs.coarseTimelineInfo.atStart,
        icon: "skip-to-start",
        title: "Restart"
      },
      "play-step-backwards": {
        enabled: !inputs.coarseTimelineInfo.atStart,
        icon: "step-backward",
        title: "Step backward"
      },
      "play-pause": {
        enabled: !(inputs.coarseTimelineInfo.atStart && inputs.coarseTimelineInfo.atEnd),
        icon: inputs.coarseTimelineInfo.playing ? "pause" : "play",
        title: inputs.coarseTimelineInfo.playing ? "Pause" : "Play"
      },
      "play-step": {
        enabled: !inputs.coarseTimelineInfo.atEnd,
        icon: "step-forward",
        title: "Step forward"
      },
      "jump-to-end": {
        enabled: !inputs.coarseTimelineInfo.atEnd,
        icon: "skip-to-end",
        title: "Skip to End"
      },
      "twizzle-link": {
        enabled: true,
        icon: "twizzle-tw",
        title: "View at Twizzle",
        hidden: inputs.viewerLink === "none"
      }
    };
    return buttonAppearances;
  }
};

// src/cubing/twisty/views/control-panel/TwistyButtons.css.ts
var buttonGridCSS = new cssStyleSheetShim();
buttonGridCSS.replaceSync(
  `
:host {
  width: 384px;
  height: 24px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.wrapper {
  grid-auto-flow: column;
}

.viewer-link-none .twizzle-link-button {
  display: none;
}

.wrapper twisty-button,
.wrapper twisty-control-button {
  width: inherit;
  height: inherit;
}
`
);
var buttonCSS = new cssStyleSheetShim();
buttonCSS.replaceSync(
  `
:host:not([hidden]) {
  display: grid;
}

:host {
  width: 48px;
  height: 24px;
}

.wrapper {
  width: 100%;
  height: 100%;
}

button {
  width: 100%;
  height: 100%;
  border: none;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  background-color: rgba(196, 196, 196, 0.75);
}

button:enabled {
  background-color: rgba(196, 196, 196, 0.75)
}

.dark-mode button:enabled {
  background-color: #88888888;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0.25;
  pointer-events: none;
}

.dark-mode button:disabled {
  background-color: #ffffff44;
}

button:enabled:hover {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

/* TODO: fullscreen icons have too much padding?? */
.svg-skip-to-start button,
button.svg-skip-to-start {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjQzIDEwMzdxMTktMTkgMzItMTN0MTMgMzJ2MTQ3MnEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djcxMHEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djY3OHEwIDI2LTE5IDQ1dC00NSAxOUg5NjBxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWgxMjhxMjYgMCA0NSAxOXQxOSA0NXY2NzhxNC0xMSAxMy0xOWw3MTAtNzEwcTE5LTE5IDMyLTEzdDEzIDMydjcxMHE0LTExIDEzLTE5eiIvPjwvc3ZnPg==");
}

.svg-skip-to-end button,
button.svg-skip-to-end {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik05NDEgMjU0N3EtMTkgMTktMzIgMTN0LTEzLTMyVjEwNTZxMC0yNiAxMy0zMnQzMiAxM2w3MTAgNzEwcTggOCAxMyAxOXYtNzEwcTAtMjYgMTMtMzJ0MzIgMTNsNzEwIDcxMHE4IDggMTMgMTl2LTY3OHEwLTI2IDE5LTQ1dDQ1LTE5aDEyOHEyNiAwIDQ1IDE5dDE5IDQ1djE0MDhxMCAyNi0xOSA0NXQtNDUgMTloLTEyOHEtMjYgMC00NS0xOXQtMTktNDV2LTY3OHEtNSAxMC0xMyAxOWwtNzEwIDcxMHEtMTkgMTktMzIgMTN0LTEzLTMydi03MTBxLTUgMTAtMTMgMTl6Ii8+PC9zdmc+");
}

.svg-step-forward button,
button.svg-step-forward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDE1NjhxMCAyNi0xOSA0NWwtNTEyIDUxMnEtMTkgMTktNDUgMTl0LTQ1LTE5cS0xOS0xOS0xOS00NXYtMjU2aC0yMjRxLTk4IDAtMTc1LjUgNnQtMTU0IDIxLjVxLTc2LjUgMTUuNS0xMzMgNDIuNXQtMTA1LjUgNjkuNXEtNDkgNDIuNS04MCAxMDF0LTQ4LjUgMTM4LjVxLTE3LjUgODAtMTcuNSAxODEgMCA1NSA1IDEyMyAwIDYgMi41IDIzLjV0Mi41IDI2LjVxMCAxNS04LjUgMjV0LTIzLjUgMTBxLTE2IDAtMjgtMTctNy05LTEzLTIydC0xMy41LTMwcS03LjUtMTctMTAuNS0yNC0xMjctMjg1LTEyNy00NTEgMC0xOTkgNTMtMzMzIDE2Mi00MDMgODc1LTQwM2gyMjR2LTI1NnEwLTI2IDE5LTQ1dDQ1LTE5cTI2IDAgNDUgMTlsNTEyIDUxMnExOSAxOSAxOSA0NXoiLz48L3N2Zz4=");
}

.svg-step-backward button,
button.svg-step-backward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDIwNDhxMCAxNjYtMTI3IDQ1MS0zIDctMTAuNSAyNHQtMTMuNSAzMHEtNiAxMy0xMyAyMi0xMiAxNy0yOCAxNy0xNSAwLTIzLjUtMTB0LTguNS0yNXEwLTkgMi41LTI2LjV0Mi41LTIzLjVxNS02OCA1LTEyMyAwLTEwMS0xNy41LTE4MXQtNDguNS0xMzguNXEtMzEtNTguNS04MC0xMDF0LTEwNS41LTY5LjVxLTU2LjUtMjctMTMzLTQyLjV0LTE1NC0yMS41cS03Ny41LTYtMTc1LjUtNmgtMjI0djI1NnEwIDI2LTE5IDQ1dC00NSAxOXEtMjYgMC00NS0xOWwtNTEyLTUxMnEtMTktMTktMTktNDV0MTktNDVsNTEyLTUxMnExOS0xOSA0NS0xOXQ0NSAxOXExOSAxOSAxOSA0NXYyNTZoMjI0cTcxMyAwIDg3NSA0MDMgNTMgMTM0IDUzIDMzM3oiLz48L3N2Zz4=");
}

.svg-pause button,
button.svg-pause {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNTYwIDEwODh2MTQwOHEwIDI2LTE5IDQ1dC00NSAxOWgtNTEycS0yNiAwLTQ1LTE5dC0xOS00NVYxMDg4cTAtMjYgMTktNDV0NDUtMTloNTEycTI2IDAgNDUgMTl0MTkgNDV6bS04OTYgMHYxNDA4cTAgMjYtMTkgNDV0LTQ1IDE5aC01MTJxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWg1MTJxMjYgMCA0NSAxOXQxOSA0NXoiLz48L3N2Zz4=");
}

.svg-play button,
button.svg-play {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNDcyLjUgMTgyM2wtMTMyOCA3MzhxLTIzIDEzLTM5LjUgM3QtMTYuNS0zNlYxMDU2cTAtMjYgMTYuNS0zNnQzOS41IDNsMTMyOCA3MzhxMjMgMTMgMjMgMzF0LTIzIDMxeiIvPjwvc3ZnPg==");
}

.svg-enter-fullscreen button,
button.svg-enter-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkgMTZIN3Y1aDV2LTJIOXYtM3ptLTItNGgyVjloM1Y3SDd2NXptMTIgN2gtM3YyaDV2LTVoLTJ2M3pNMTYgN3YyaDN2M2gyVjdoLTV6Ii8+PC9zdmc+");
}

.svg-exit-fullscreen button,
button.svg-exit-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTcgMThoM3YzaDJ2LTVIN3Yyem0zLThIN3YyaDVWN2gtMnYzem02IDExaDJ2LTNoM3YtMmgtNXY1em0yLTExVjdoLTJ2NWg1di0yaC0zeiIvPjwvc3ZnPg==");
}

.svg-twizzle-tw button,
button.svg-twizzle-tw {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODY0IiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzk3LjU4MSAxNTEuMTh2NTcuMDg0aC04OS43MDN2MjQwLjM1MmgtNjYuOTU1VjIwOC4yNjRIMTUxLjIydi01Ny4wODNoMjQ2LjM2MXptNTQuMzEgNzEuNjc3bDcuNTEyIDMzLjY5MmMyLjcxOCAxMi4xNiA1LjU4IDI0LjY4IDguNTg0IDM3LjU1NWEyMTgwLjc3NSAyMTgwLjc3NSAwIDAwOS40NDIgMzguODQzIDEyNjYuMyAxMjY2LjMgMCAwMDEwLjA4NiAzNy41NTVjMy43Mi0xMi41OSA3LjM2OC0yNS40NjYgMTAuOTQ1LTM4LjYyOCAzLjU3Ni0xMy4xNjIgNy4wMS0yNi4xMSAxMC4zLTM4Ljg0M2w1Ljc2OS0yMi40NTZjMS4yNDgtNC44ODcgMi40NzItOS43MDUgMy42NzQtMTQuNDU1IDMuMDA0LTExLjg3NSA1LjY1MS0yMi45NjIgNy45NC0zMy4yNjNoNDYuMzU0bDIuMzg0IDEwLjU2M2EyMDAwLjc3IDIwMDAuNzcgMCAwMDMuOTM1IDE2LjgyOGw2LjcxMSAyNy43MWMxLjIxMyA0Ljk1NiAyLjQ1IDkuOTggMy43MDkgMTUuMDczYTMxMTkuNzc3IDMxMTkuNzc3IDAgMDA5Ljg3MSAzOC44NDMgMTI0OS4yMjcgMTI0OS4yMjcgMCAwMDEwLjczIDM4LjYyOCAxOTA3LjYwNSAxOTA3LjYwNSAwIDAwMTAuMzAxLTM3LjU1NSAxMzk3Ljk0IDEzOTcuOTQgMCAwMDkuNjU3LTM4Ljg0M2w0LjQtMTkuMDQ2Yy43MTUtMy4xMyAxLjQyMS02LjIzNiAyLjExOC05LjMyMWw5LjU3Ny00Mi44OGg2Ni41MjZhMjk4OC43MTggMjk4OC43MTggMCAwMS0xOS41MjkgNjYuMzExbC01LjcyOCAxOC40ODJhMzIzNy40NiAzMjM3LjQ2IDAgMDEtMTQuMDE1IDQzLjc1MmMtNi40MzggMTkuNi0xMi43MzMgMzcuNjk4LTE4Ljg4NSA1NC4yOTRsLTMuMzA2IDguODI1Yy00Ljg4NCAxMi44OTgtOS40MzMgMjQuMjYzLTEzLjY0NyAzNC4wOTVoLTQ5Ljc4N2E4NDE3LjI4OSA4NDE3LjI4OSAwIDAxLTIxLjAzMS02NC44MDkgMTI4OC42ODYgMTI4OC42ODYgMCAwMS0xOC44ODUtNjQuODEgMTk3Mi40NDQgMTk3Mi40NDQgMCAwMS0xOC4yNCA2NC44MSAyNTc5LjQxMiAyNTc5LjQxMiAwIDAxLTIwLjM4OCA2NC44MWgtNDkuNzg3Yy00LjY4Mi0xMC45MjYtOS43Mi0yMy43NDMtMTUuMTEtMzguNDUxbC0xLjYyOS00LjQ3Yy01LjI1OC0xNC41MjEtMTAuNjgtMzAuMTkyLTE2LjI2Ni00Ny4wMTRsLTIuNDA0LTcuMjhjLTYuNDM4LTE5LjYtMTMuMDItNDAuMzQ0LTE5Ljc0My02Mi4yMzRhMjk4OC43MDcgMjk4OC43MDcgMCAwMS0xOS41MjktNjYuMzExaDY3LjM4NXoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==");
}
`
);

// src/cubing/twisty/views/control-panel/TwistyButtons.ts
var buttonCommands = {
  fullscreen: true,
  "jump-to-start": true,
  "play-step-backwards": true,
  "play-pause": true,
  "play-step": true,
  "jump-to-end": true,
  "twizzle-link": true
};
var TwistyButtons = class extends ManagedCustomElement {
  // TODO: Privacy
  constructor(model, controller, defaultFullscreenElement) {
    super();
    this.model = model;
    this.controller = controller;
    this.defaultFullscreenElement = defaultFullscreenElement;
  }
  buttons = null;
  connectedCallback() {
    this.addCSS(buttonGridCSS);
    const buttons = {};
    for (const command in buttonCommands) {
      const button = new TwistyButton();
      buttons[command] = button;
      button.htmlButton.addEventListener(
        "click",
        () => this.#onCommand(command)
      );
      this.addElement(button);
    }
    this.buttons = buttons;
    this.model?.buttonAppearance.addFreshListener(this.update.bind(this));
    this.model?.twistySceneModel.colorScheme.addFreshListener(
      this.updateColorScheme.bind(this)
    );
  }
  #onCommand(command) {
    switch (command) {
      case "fullscreen": {
        void this.onFullscreenButton();
        break;
      }
      case "jump-to-start": {
        this.controller?.jumpToStart({ flash: true });
        break;
      }
      case "play-step-backwards": {
        this.controller?.animationController.play({
          direction: -1 /* Backwards */,
          untilBoundary: "move" /* Move */
        });
        break;
      }
      case "play-pause": {
        this.controller?.togglePlay();
        break;
      }
      case "play-step": {
        this.controller?.animationController.play({
          direction: 1 /* Forwards */,
          untilBoundary: "move" /* Move */
        });
        break;
      }
      case "jump-to-end": {
        this.controller?.jumpToEnd({ flash: true });
        break;
      }
      case "twizzle-link": {
        void this.controller?.visitTwizzleLink();
        break;
      }
      default:
        throw new Error("Missing command");
    }
  }
  // TODO: Should we have a prop, or a way to query if we're fullscreen?
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
  async onFullscreenButton() {
    if (!this.defaultFullscreenElement) {
      throw new Error("Attempted to go fullscreen without an element.");
    }
    if (documentFullscreenElement() === this.defaultFullscreenElement) {
      void documentExitFullscreen();
    } else {
      this.buttons?.fullscreen.setIcon("exit-fullscreen");
      void requestFullscreen(
        await this.model?.twistySceneModel.fullscreenElement.get() ?? this.defaultFullscreenElement
      );
      const onFullscreen = () => {
        if (documentFullscreenElement() !== this.defaultFullscreenElement) {
          this.buttons?.fullscreen.setIcon("enter-fullscreen");
          globalThis.removeEventListener("fullscreenchange", onFullscreen);
        }
      };
      globalThis.addEventListener("fullscreenchange", onFullscreen);
    }
  }
  async update(buttonAppearances) {
    for (const command in buttonCommands) {
      const button = this.buttons[command];
      const info = buttonAppearances[command];
      button.htmlButton.disabled = !info.enabled;
      button.htmlButton.title = info.title;
      button.setIcon(info.icon);
      button.hidden = !!info.hidden;
    }
  }
  updateColorScheme(colorScheme) {
    for (const button of Object.values(this.buttons ?? {})) {
      button.updateColorScheme(colorScheme);
    }
  }
};
customElementsShim.define("twisty-buttons", TwistyButtons);
var TwistyButton = class extends ManagedCustomElement {
  htmlButton = document.createElement("button");
  // TODO: async?
  updateColorScheme(colorScheme) {
    this.contentWrapper.classList.toggle("dark-mode", colorScheme === "dark");
  }
  connectedCallback() {
    this.addCSS(buttonCSS);
    this.addElement(this.htmlButton);
  }
  #iconManager = new ClassListManager(
    this,
    "svg-",
    buttonIcons
  );
  setIcon(iconName) {
    this.#iconManager.setValue(iconName);
  }
};
customElementsShim.define("twisty-button", TwistyButton);

// src/cubing/twisty/views/control-panel/TwistyScrubber.css.ts
var twistyScrubberCSS = new cssStyleSheetShim();
twistyScrubberCSS.replaceSync(
  `
:host {
  width: 384px;
  height: 16px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(196, 196, 196, 0.75);
}

input:not(:disabled) {
  cursor: ew-resize;
}

.wrapper.dark-mode {
  background: #666666;
}
`
);

// src/cubing/twisty/views/control-panel/TwistyScrubber.ts
var SLOW_DOWN_SCRUBBING = false;
var isMouseDown = false;
globalSafeDocument?.addEventListener(
  "mousedown",
  (event) => {
    if (event.which) {
      isMouseDown = true;
    }
  },
  true
);
globalSafeDocument?.addEventListener(
  "mouseup",
  (event) => {
    if (event.which) {
      isMouseDown = false;
    }
  },
  true
);
var y = 0;
var clickNum = 0;
globalSafeDocument?.addEventListener(
  "mousedown",
  () => {
    clickNum++;
  },
  false
);
globalSafeDocument?.addEventListener("mousemove", onMouseUpdate, false);
globalSafeDocument?.addEventListener("mouseenter", onMouseUpdate, false);
function onMouseUpdate(e) {
  y = e.pageY;
}
var lastVal = 0;
var lastPreval = 0;
var scaling = false;
var currentClickNum = 0;
var TwistyScrubber = class extends ManagedCustomElement {
  constructor(model, controller) {
    super();
    this.model = model;
    this.controller = controller;
  }
  async onDetailedTimelineInfo(detailedTimelineInfo) {
    const inputElem = await this.inputElem();
    inputElem.min = detailedTimelineInfo.timeRange.start.toString();
    inputElem.max = detailedTimelineInfo.timeRange.end.toString();
    inputElem.disabled = inputElem.min === inputElem.max;
    inputElem.value = detailedTimelineInfo.timestamp.toString();
  }
  async connectedCallback() {
    this.addCSS(twistyScrubberCSS);
    this.addElement(await this.inputElem());
    this.model?.twistySceneModel.colorScheme.addFreshListener(
      this.updateColorScheme.bind(this)
    );
  }
  updateColorScheme(colorScheme) {
    this.contentWrapper.classList.toggle("dark-mode", colorScheme === "dark");
  }
  #inputElem = null;
  async inputElem() {
    return this.#inputElem ??= (async () => {
      const elem = document.createElement("input");
      elem.type = "range";
      elem.disabled = true;
      this.model?.detailedTimelineInfo.addFreshListener(
        this.onDetailedTimelineInfo.bind(this)
      );
      elem.addEventListener("input", this.onInput.bind(this));
      elem.addEventListener("keydown", this.onKeypress.bind(this));
      return elem;
    })();
  }
  async onInput(e) {
    if (scaling) {
      return;
    }
    const inputElem = await this.inputElem();
    await this.slowDown(e, inputElem);
    const value = parseInt(inputElem.value, 10);
    this.model?.playingInfo.set({ playing: false });
    this.model?.timestampRequest.set(value);
  }
  onKeypress(e) {
    switch (e.key) {
      case "ArrowLeft":
      // fallthrough
      case "ArrowRight": {
        this.controller?.animationController.play({
          direction: e.key === "ArrowLeft" ? -1 /* Backwards */ : 1 /* Forwards */,
          untilBoundary: "move" /* Move */
        });
        e.preventDefault();
        break;
      }
      case " ": {
        this.controller?.togglePlay();
        e.preventDefault();
        break;
      }
    }
  }
  async slowDown(e, inputElem) {
    if (!SLOW_DOWN_SCRUBBING) {
      return;
    }
    if (isMouseDown) {
      const rect = inputElem.getBoundingClientRect();
      const sliderY = rect.top + rect.height / 2;
      console.log(sliderY, e, y, isMouseDown);
      const yDist = Math.abs(sliderY - y);
      let scale = 1;
      if (yDist > 64) {
        scale = Math.max(2 ** (-(yDist - 64) / 64), 1 / 32);
      }
      const preVal = parseInt(inputElem.value, 10);
      console.log("cl", currentClickNum, clickNum, preVal);
      if (currentClickNum === clickNum) {
        const delta = (preVal - lastPreval) * scale;
        console.log("delta", delta, yDist);
        scaling = true;
        let newVal = preVal;
        newVal = lastVal + delta * scale + (preVal - lastVal) * Math.min(1, (1 / 2) ** (yDist * yDist / 64));
        inputElem.value = newVal.toString();
        console.log(scale);
        scaling = false;
        this.contentWrapper.style.opacity = scale.toString();
      } else {
        currentClickNum = clickNum;
      }
      lastPreval = preVal;
    }
  }
};
customElementsShim.define("twisty-scrubber", TwistyScrubber);

// src/cubing/twisty/views/screenshot.ts
var cachedCamera = null;
async function screenshot(model, options) {
  const [
    { ThreePerspectiveCamera, ThreeScene },
    puzzleLoader,
    visualizationStrategy,
    _stickering,
    // TODO
    _stickeringMaskRequest,
    // TODO
    _legacyPosition,
    orbitCoordinates
  ] = await Promise.all([
    (async () => {
      const { ThreePerspectiveCamera: ThreePerspectiveCamera2, ThreeScene: ThreeScene2 } = await bulk3DCode;
      return { ThreePerspectiveCamera: ThreePerspectiveCamera2, ThreeScene: ThreeScene2 };
    })(),
    await model.puzzleLoader.get(),
    await model.visualizationStrategy.get(),
    await model.twistySceneModel.stickeringRequest.get(),
    await model.twistySceneModel.stickeringMaskRequest.get(),
    await model.legacyPosition.get(),
    await model.twistySceneModel.orbitCoordinates.get()
  ]);
  const width = options?.width ?? 2048;
  const height = options?.height ?? 2048;
  const aspectRatio = width / height;
  const camera = cachedCamera ??= await (async () => {
    return new ThreePerspectiveCamera(20, aspectRatio, 0.1, 20);
  })();
  const scene = new ThreeScene();
  const twisty3DWrapper = new Twisty3DPuzzleWrapper(
    model,
    { scheduleRender: () => {
    } },
    puzzleLoader,
    visualizationStrategy
  );
  scene.add(await twisty3DWrapper.twisty3DPuzzle());
  await setCameraFromOrbitCoordinates(camera, orbitCoordinates);
  const rendererCanvas = await rawRenderPooled(width, height, scene, camera);
  const dataURL = rendererCanvas.toDataURL();
  const defaultFilename = await getDefaultFilename(model);
  return {
    dataURL,
    download: async (filename) => {
      downloadURL(dataURL, filename ?? defaultFilename);
    }
  };
}
async function getDefaultFilename(model) {
  const [puzzleID, algWithIssues] = await Promise.all([
    model.puzzleID.get(),
    model.alg.get()
  ]);
  return `[${puzzleID}]${algWithIssues.alg.experimentalNumChildAlgNodes() === 0 ? "" : ` ${algWithIssues.alg.toString()}`}`;
}
function downloadURL(url, name, extension = "png") {
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}.${extension}`;
  a.click();
}

// src/cubing/twisty/views/TwistyPlayer.css.ts
var twistyPlayerCSS = new cssStyleSheetShim();
twistyPlayerCSS.replaceSync(
  `
:host {
  width: 384px;
  height: 256px;
  display: grid;

  -webkit-user-select: none;
  user-select: none;
}

.wrapper {
  display: grid;
  overflow: hidden;
  contain: size;
  grid-template-rows: 7fr minmax(1.5em, 0.5fr) minmax(2em, 1fr);
}

.wrapper > * {
  width: inherit;
  height: inherit;
  overflow: hidden;
}

.wrapper.controls-none {
  grid-template-rows: 7fr;
}

.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-control-button-panel ,
.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-buttons {
  display: none;
}

twisty-scrubber {
  background: rgba(196, 196, 196, 0.5);
}

.wrapper.checkered,
.wrapper.checkered-transparent {
  background-color: #EAEAEA;
  background-image: linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD),
    linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
}

.wrapper.checkered-transparent {
  background-color: #F4F4F4;
  background-image: linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88),
    linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88);
}

.wrapper.dark-mode {
  background-color: #444;
  background-image: linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b),
    linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b);
}

.visualization-wrapper > * {
  width: 100%;
  height: 100%;
}

.error-elem {
  width: 100%;
  height: 100%;
  display: none;
  place-content: center;
  font-family: sans-serif;
  box-shadow: inset 0 0 2em rgb(255, 0, 0);
  color: red;
  text-shadow: 0 0 0.2em white;
  background: rgba(255, 255, 255, 0.25);
}

.wrapper.error .visualization-wrapper {
  display: none;
}

.wrapper.error .error-elem {
  display: grid;
}
`
);

// src/cubing/twisty/model/props/general/ArbitraryStringProp.ts
var ArbitraryStringProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return null;
  }
};

// src/cubing/twisty/model/props/general/URLProp.ts
var URLProp = class extends TwistyPropSource {
  getDefaultValue() {
    return null;
  }
  derive(input) {
    if (typeof input === "string") {
      return new URL(input, location.href);
    }
    return input;
  }
};

// src/cubing/twisty/model/props/puzzle/state/AlgProp.ts
var AlgIssues = class _AlgIssues {
  // TODO: (string | Error)[]
  warnings;
  errors;
  constructor(issues) {
    this.warnings = Object.freeze(issues?.warnings ?? []);
    this.errors = Object.freeze(issues?.errors ?? []);
    Object.freeze(this);
  }
  add(issues) {
    return new _AlgIssues({
      warnings: this.warnings.concat(issues?.warnings ?? []),
      errors: this.errors.concat(issues?.errors ?? [])
    });
  }
  /** @deprecated */
  log() {
    if (this.errors.length > 0) {
      console.error(`\u{1F6A8} ${this.errors[0]}`);
    } else if (this.warnings.length > 0) {
      console.warn(`\u26A0\uFE0F ${this.warnings[0]}`);
    } else {
      console.info("\u{1F60E} No issues!");
    }
  }
};
function algWithIssuesFromString(s) {
  try {
    const alg = Alg.fromString(s);
    const warnings = [];
    if (alg.toString() !== s) {
      warnings.push("Alg is non-canonical!");
    }
    return {
      alg,
      issues: new AlgIssues({ warnings })
    };
  } catch (e) {
    return {
      alg: new Alg(),
      issues: new AlgIssues({
        errors: [`Malformed alg: ${e.toString()}`]
      })
    };
  }
}
function algWithIssuesEquals(a1, a2) {
  return a1.alg.isIdentical(a2.alg) && arrayEquals(a1.issues.warnings, a2.issues.warnings) && arrayEquals(a1.issues.errors, a2.issues.errors);
}
var AlgProp = class extends TwistyPropSource {
  getDefaultValue() {
    return { alg: new Alg(), issues: new AlgIssues() };
  }
  canReuseValue(v1, v2) {
    return algWithIssuesEquals(v1, v2);
  }
  async derive(newAlg) {
    if (typeof newAlg === "string") {
      return algWithIssuesFromString(newAlg);
    } else {
      return {
        alg: newAlg,
        issues: new AlgIssues()
      };
    }
  }
};

// src/cubing/twisty/model/props/puzzle/state/AlgTransformationProp.ts
var AlgTransformationProp = class extends TwistyPropDerived {
  derive(input) {
    return input.kpuzzle.algToTransformation(input.setupAlg.alg);
  }
};

// src/cubing/twisty/model/props/puzzle/state/AnchorTransformationProp.ts
var AnchorTransformationProp = class extends TwistyPropDerived {
  derive(inputs) {
    if (inputs.setupTransformation) {
      return inputs.setupTransformation;
    }
    switch (inputs.setupAnchor) {
      case "start":
        return inputs.setupAlgTransformation;
      case "end": {
        const algTransformation = inputs.indexer.transformationAtIndex(
          inputs.indexer.numAnimatedLeaves()
        );
        const inverseAlgTransformation = algTransformation.invert();
        return inputs.setupAlgTransformation.applyTransformation(
          inverseAlgTransformation
        );
      }
      default:
        throw new Error("Unimplemented!");
    }
  }
};

// src/cubing/twisty/model/props/puzzle/state/AnimationTimelineLeavesRequestProp.ts
var AnimationTimelineLeavesRequestProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return null;
  }
};

// src/cubing/twisty/model/props/puzzle/state/CatchUpMoveProp.ts
var CatchUpMoveProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return { move: null, amount: 0 };
  }
  canReuseValue(v1, v2) {
    return v1.move === v2.move && v1.amount === v2.amount;
  }
};

// src/cubing/twisty/model/props/puzzle/state/CurrentLeavesSimplified.ts
var CurrentLeavesSimplifiedProp = class extends TwistyPropDerived {
  derive(inputs) {
    return {
      patternIndex: inputs.currentMoveInfo.patternIndex,
      movesFinishing: inputs.currentMoveInfo.movesFinishing.map(
        (currentMoveInfo) => currentMoveInfo.move
      ),
      movesFinished: inputs.currentMoveInfo.movesFinished.map(
        (currentMoveInfo) => currentMoveInfo.move
      )
    };
  }
  canReuseValue(v1, v2) {
    return v1.patternIndex === v2.patternIndex && arrayEqualsCompare(
      v1.movesFinishing,
      v2.movesFinishing,
      (m1, m2) => m1.isIdentical(m2)
    ) && arrayEqualsCompare(
      v1.movesFinished,
      v2.movesFinished,
      (m1, m2) => m1.isIdentical(m2)
    );
  }
};

// src/cubing/twisty/model/props/puzzle/state/CurrentMoveInfoProp.ts
var CurrentMoveInfoProp = class extends TwistyPropDerived {
  derive(inputs) {
    function addCatchUpMove(currentMoveInfo) {
      if (inputs.detailedTimelineInfo.atEnd && inputs.catchUpMove.move !== null) {
        currentMoveInfo.currentMoves.push({
          move: inputs.catchUpMove.move,
          direction: -1 /* Backwards */,
          fraction: 1 - inputs.catchUpMove.amount,
          startTimestamp: -1,
          // TODO
          endTimestamp: -1
          // TODO
        });
      }
      return currentMoveInfo;
    }
    if (inputs.indexer.currentMoveInfo) {
      return addCatchUpMove(
        inputs.indexer.currentMoveInfo(inputs.detailedTimelineInfo.timestamp)
      );
    } else {
      const idx = inputs.indexer.timestampToIndex(
        inputs.detailedTimelineInfo.timestamp
      );
      const currentMoveInfo = {
        patternIndex: idx,
        currentMoves: [],
        movesFinishing: [],
        movesFinished: [],
        movesStarting: [],
        latestStart: -Infinity,
        earliestEnd: Infinity
      };
      if (inputs.indexer.numAnimatedLeaves() > 0) {
        const move = inputs.indexer.getAnimLeaf(idx)?.as(Move);
        if (!move) {
          return addCatchUpMove(currentMoveInfo);
        }
        const start = inputs.indexer.indexToMoveStartTimestamp(idx);
        const duration = inputs.indexer.moveDuration(idx);
        const fraction = duration ? (inputs.detailedTimelineInfo.timestamp - start) / duration : 0;
        const end = start + duration;
        const currentMove = {
          move,
          direction: 1 /* Forwards */,
          fraction,
          startTimestamp: start,
          endTimestamp: end
        };
        if (fraction === 0) {
          currentMoveInfo.movesStarting.push(currentMove);
        } else if (fraction === 1) {
          currentMoveInfo.movesFinishing.push(currentMove);
        } else {
          currentMoveInfo.currentMoves.push(currentMove);
          currentMoveInfo.latestStart = Math.max(
            currentMoveInfo.latestStart,
            start
          );
          currentMoveInfo.earliestEnd = Math.min(
            currentMoveInfo.earliestEnd,
            end
          );
        }
      }
      return addCatchUpMove(currentMoveInfo);
    }
  }
};

// src/cubing/twisty/model/props/puzzle/state/CurrentPatternProp.ts
var CurrentPatternProp = class extends TwistyPropDerived {
  derive(inputs) {
    let transformation = inputs.indexer.transformationAtIndex(
      inputs.currentLeavesSimplified.patternIndex
    );
    transformation = inputs.anchoredStart.applyTransformation(transformation);
    for (const finishingMove of inputs.currentLeavesSimplified.movesFinishing) {
      transformation = transformation.applyMove(finishingMove);
    }
    for (const finishedMove of inputs.currentLeavesSimplified.movesFinished) {
      transformation = transformation.applyMove(finishedMove);
    }
    return transformation.toKPattern();
  }
};

// src/cubing/twisty/controllers/indexer/simultaneous-moves/simul-moves.ts
var axisLookup = {
  u: "y",
  l: "x",
  f: "z",
  r: "x",
  b: "z",
  d: "y",
  m: "x",
  e: "y",
  s: "z",
  x: "x",
  y: "y",
  z: "z"
};
function isSameAxis(move1, move2) {
  return axisLookup[move1.family[0].toLowerCase()] === axisLookup[move2.family[0].toLowerCase()];
}
var LocalSimulMoves = class extends TraversalUp {
  traverseAlg(alg) {
    const processed = [];
    for (const childAlgNode of alg.childAlgNodes()) {
      processed.push(this.traverseAlgNode(childAlgNode));
    }
    return Array.prototype.concat(...processed);
  }
  traverseGroupingOnce(alg) {
    if (alg.experimentalIsEmpty()) {
      return [];
    }
    const moves = [];
    for (const algNode of alg.childAlgNodes()) {
      if (!(algNode.is(Move) || algNode.is(LineComment) || algNode.is(Newline))) {
        return this.traverseAlg(alg);
      }
      const asMove = algNode.as(Move);
      if (asMove) {
        moves.push(asMove);
      }
    }
    let maxSimulDur = defaultDurationForAmount(moves[0].amount);
    for (let i = 0; i < moves.length - 1; i++) {
      for (let j = 1; j < moves.length; j++) {
        if (!isSameAxis(moves[i], moves[j])) {
          return this.traverseAlg(alg);
        }
      }
      maxSimulDur = Math.max(
        maxSimulDur,
        defaultDurationForAmount(moves[i].amount)
      );
    }
    const localMovesWithRange = moves.map(
      (blockMove) => {
        return {
          animLeafAlgNode: blockMove,
          msUntilNext: 0,
          duration: maxSimulDur
        };
      }
    );
    localMovesWithRange[localMovesWithRange.length - 1].msUntilNext = maxSimulDur;
    return localMovesWithRange;
  }
  traverseGrouping(grouping) {
    const processed = [];
    const segmentOnce = grouping.amount > 0 ? grouping.alg : grouping.alg.invert();
    for (let i = 0; i < Math.abs(grouping.amount); i++) {
      processed.push(this.traverseGroupingOnce(segmentOnce));
    }
    return Array.prototype.concat(...processed);
  }
  traverseMove(move) {
    const duration = defaultDurationForAmount(move.amount);
    return [
      {
        animLeafAlgNode: move,
        msUntilNext: duration,
        duration
      }
    ];
  }
  traverseCommutator(commutator) {
    const processed = [];
    const segmentsOnce = [
      commutator.A,
      commutator.B,
      commutator.A.invert(),
      commutator.B.invert()
    ];
    for (const segment of segmentsOnce) {
      processed.push(this.traverseGroupingOnce(segment));
    }
    return Array.prototype.concat(...processed);
  }
  traverseConjugate(conjugate) {
    const processed = [];
    const segmentsOnce = [
      conjugate.A,
      conjugate.B,
      conjugate.A.invert()
    ];
    for (const segment of segmentsOnce) {
      processed.push(this.traverseGroupingOnce(segment));
    }
    return Array.prototype.concat(...processed);
  }
  traversePause(pause) {
    if (pause.experimentalNISSGrouping) {
      return [];
    }
    const duration = defaultDurationForAmount(1);
    return [
      {
        animLeafAlgNode: pause,
        msUntilNext: duration,
        // TODO
        duration
      }
    ];
  }
  traverseNewline(_newline) {
    return [];
  }
  traverseLineComment(_comment) {
    return [];
  }
};
var localSimulMoves = functionFromTraversal(LocalSimulMoves);
function simulMoves(a) {
  let timestamp = 0;
  const l = localSimulMoves(a).map(
    (localSimulMove) => {
      const leafWithRange = {
        animLeaf: localSimulMove.animLeafAlgNode,
        start: timestamp,
        end: timestamp + localSimulMove.duration
      };
      timestamp += localSimulMove.msUntilNext;
      return leafWithRange;
    }
  );
  return l;
}

// src/cubing/twisty/controllers/indexer/simultaneous-moves/SimultaneousMoveIndexer.ts
var SimultaneousMoveIndexer = class {
  // TODO: Allow custom `durationFn`.
  constructor(kpuzzle, alg, options) {
    this.kpuzzle = kpuzzle;
    this.animLeaves = options?.animationTimelineLeaves ?? simulMoves(alg);
  }
  animLeaves;
  getAnimLeaf(index) {
    return this.animLeaves[Math.min(index, this.animLeaves.length - 1)]?.animLeaf ?? null;
  }
  getAnimationTimelineLeaf(index) {
    return this.animLeaves[Math.min(index, this.animLeaves.length - 1)];
  }
  indexToMoveStartTimestamp(index) {
    let start = 0;
    if (this.animLeaves.length > 0) {
      start = this.animLeaves[Math.min(index, this.animLeaves.length - 1)].start;
    }
    return start;
  }
  timestampToIndex(timestamp) {
    let i = 0;
    for (i = 0; i < this.animLeaves.length; i++) {
      if (this.animLeaves[i].start >= timestamp) {
        return Math.max(0, i - 1);
      }
    }
    return Math.max(0, i - 1);
  }
  timestampToPosition(timestamp, startPattern) {
    const currentMoveInfo = this.currentMoveInfo(timestamp);
    let pattern = startPattern ?? this.kpuzzle.identityTransformation().toKPattern();
    for (const leafWithRange of this.animLeaves.slice(
      0,
      currentMoveInfo.patternIndex
    )) {
      const move = leafWithRange.animLeaf.as(Move);
      if (move !== null) {
        pattern = pattern.applyMove(move);
      }
    }
    return {
      pattern,
      movesInProgress: currentMoveInfo.currentMoves
    };
  }
  // TODO: Caching
  currentMoveInfo(timestamp) {
    let windowEarliestTimestamp = Infinity;
    for (const leafWithRange of this.animLeaves) {
      if (leafWithRange.start <= timestamp && leafWithRange.end >= timestamp) {
        windowEarliestTimestamp = Math.min(
          windowEarliestTimestamp,
          leafWithRange.start
        );
      } else if (leafWithRange.start > timestamp) {
        break;
      }
    }
    const currentMoves = [];
    const movesStarting = [];
    const movesFinishing = [];
    const movesFinished = [];
    let latestStart = -Infinity;
    let earliestEnd = Infinity;
    let patternIndex = 0;
    for (const leafWithRange of this.animLeaves) {
      if (leafWithRange.end <= windowEarliestTimestamp) {
        if (
          // biome-ignore lint/suspicious/noGlobalIsFinite: TODO: wait on Biome to remove this check by default
          !isFinite(windowEarliestTimestamp) && leafWithRange.start > timestamp
        ) {
          break;
        }
        patternIndex++;
      } else if (leafWithRange.start > timestamp) {
        break;
      } else {
        const move = leafWithRange.animLeaf.as(Move);
        if (move !== null) {
          let fraction = (timestamp - leafWithRange.start) / (leafWithRange.end - leafWithRange.start);
          let moveFinished = false;
          if (fraction > 1) {
            fraction = 1;
            moveFinished = true;
          }
          const currentMove = {
            move,
            direction: 1 /* Forwards */,
            fraction,
            startTimestamp: leafWithRange.start,
            endTimestamp: leafWithRange.end
          };
          switch (fraction) {
            case 0: {
              movesStarting.push(currentMove);
              break;
            }
            case 1: {
              if (moveFinished) {
                movesFinished.push(currentMove);
              } else {
                movesFinishing.push(currentMove);
              }
              break;
            }
            default:
              currentMoves.push(currentMove);
              latestStart = Math.max(latestStart, leafWithRange.start);
              earliestEnd = Math.min(earliestEnd, leafWithRange.end);
          }
        }
      }
    }
    return {
      patternIndex,
      currentMoves,
      latestStart,
      earliestEnd,
      movesStarting,
      movesFinishing,
      movesFinished
    };
  }
  patternAtIndex(index, startPattern) {
    let pattern = startPattern ?? this.kpuzzle.defaultPattern();
    for (let i = 0; i < this.animLeaves.length && i < index; i++) {
      const leafWithRange = this.animLeaves[i];
      const move = leafWithRange.animLeaf.as(Move);
      if (move !== null) {
        pattern = pattern.applyMove(move);
      }
    }
    return pattern;
  }
  transformationAtIndex(index) {
    let transformation = this.kpuzzle.identityTransformation();
    for (const leafWithRange of this.animLeaves.slice(0, index)) {
      const move = leafWithRange.animLeaf.as(Move);
      if (move !== null) {
        transformation = transformation.applyMove(move);
      }
    }
    return transformation;
  }
  algDuration() {
    let max = 0;
    for (const leafWithRange of this.animLeaves) {
      max = Math.max(max, leafWithRange.end);
    }
    return max;
  }
  numAnimatedLeaves() {
    return this.animLeaves.length;
  }
  moveDuration(index) {
    const move = this.getAnimationTimelineLeaf(index);
    return move.end - move.start;
  }
};

// src/cubing/twisty/model/props/puzzle/state/IndexerConstructorProp.ts
var SIMULTANEOUS_INDEXER_MAX_EXPANDED_LEAVES = 1024;
var IndexerConstructorProp = class extends TwistyPropDerived {
  derive(inputs) {
    switch (inputs.indexerConstructorRequest) {
      case "auto":
        if (inputs.animationTimelineLeaves !== null) {
          return SimultaneousMoveIndexer;
        }
        if (countLeavesInExpansionForSimultaneousMoveIndexer(inputs.alg.alg) <= SIMULTANEOUS_INDEXER_MAX_EXPANDED_LEAVES && inputs.puzzle === "3x3x3" && inputs.visualizationStrategy === "Cube3D") {
          return SimultaneousMoveIndexer;
        } else {
          return TreeAlgIndexer;
        }
      case "tree":
        return TreeAlgIndexer;
      case "simple":
        return SimpleAlgIndexer;
      case "simultaneous":
        return SimultaneousMoveIndexer;
      default:
        throw new Error("Invalid indexer request!");
    }
  }
};

// src/cubing/twisty/model/props/puzzle/state/IndexerConstructorRequestProp.ts
var IndexerConstructorRequestProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/puzzle/state/IndexerProp.ts
var IndexerProp = class extends TwistyPropDerived {
  derive(input) {
    return new input.indexerConstructor(
      input.kpuzzle,
      input.algWithIssues.alg,
      { animationTimelineLeaves: input.animationTimelineLeaves }
    );
  }
};

// src/cubing/twisty/model/props/puzzle/state/LegacyPositionProp.ts
var LegacyPositionProp = class extends TwistyPropDerived {
  derive(inputs) {
    return {
      pattern: inputs.currentPattern,
      movesInProgress: inputs.currentMoveInfo.currentMoves
    };
  }
};

// src/cubing/twisty/model/props/puzzle/state/PuzzleAlgProp.ts
var validate = true;
var PuzzleAlgProp = class extends TwistyPropDerived {
  async derive(inputs) {
    try {
      if (validate) {
        inputs.kpuzzle.algToTransformation(inputs.algWithIssues.alg);
      }
      return inputs.algWithIssues;
    } catch (e) {
      return {
        alg: new Alg(),
        issues: new AlgIssues({
          errors: [`Invalid alg for puzzle: ${e.toString()}`]
        })
      };
    }
  }
};

// src/cubing/twisty/model/props/puzzle/state/SetupAnchorProp.ts
var SetupAnchorProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "start";
  }
};

// src/cubing/twisty/model/props/puzzle/state/SetupTransformationProp.ts
var SetupTransformationProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return null;
  }
};

// src/cubing/twisty/model/props/puzzle/structure/KPuzzleProp.ts
var KPuzzleProp = class extends TwistyPropDerived {
  async derive(inputs) {
    return inputs.puzzleLoader.kpuzzle();
  }
};

// src/cubing/twisty/model/props/puzzle/structure/PuzzleDescriptionProp.ts
var PGPuzzleDescriptionStringProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return NO_VALUE;
  }
};

// src/cubing/twisty/model/props/puzzle/structure/PuzzleIDProp.ts
var PuzzleIDProp = class extends TwistyPropDerived {
  async derive(inputs) {
    return inputs.puzzleLoader.id;
  }
};

// src/cubing/twisty/model/props/puzzle/structure/PuzzleIDRequestProp.ts
var PuzzleIDRequestProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return NO_VALUE;
  }
};

// src/cubing/twisty/model/props/puzzle/structure/PuzzleLoaderProp.ts
var PuzzleLoaderProp = class extends TwistyPropDerived {
  derive(inputs) {
    if (inputs.puzzleIDRequest && inputs.puzzleIDRequest !== NO_VALUE) {
      const puzzleLoader = puzzles[inputs.puzzleIDRequest];
      if (!puzzleLoader) {
        this.userVisibleErrorTracker.set({
          errors: [`Invalid puzzle ID: ${inputs.puzzleIDRequest}`]
        });
      }
      return puzzleLoader;
    }
    if (inputs.puzzleDescriptionRequest && inputs.puzzleDescriptionRequest !== NO_VALUE) {
      return customPGPuzzleLoader(inputs.puzzleDescriptionRequest);
    }
    return cube3x3x3;
  }
};

// src/cubing/twisty/model/props/timeline/CoarseTimelineInfoProp.ts
var CoarseTimelineInfoProp = class extends TwistyPropDerived {
  derive(inputs) {
    return {
      playing: inputs.playingInfo.playing,
      atStart: inputs.detailedTimelineInfo.atStart,
      atEnd: inputs.detailedTimelineInfo.atEnd
    };
  }
  canReuseValue(v1, v2) {
    return v1.playing === v2.playing && v1.atStart === v2.atStart && v1.atEnd === v2.atEnd;
  }
};

// src/cubing/twisty/model/props/timeline/DetailedTimelineInfoProp.ts
var DetailedTimelineInfoProp = class extends TwistyPropDerived {
  derive(inputs) {
    let timestamp = this.#requestedTimestampToMilliseconds(inputs);
    let atStart = false;
    let atEnd = false;
    if (timestamp >= inputs.timeRange.end) {
      atEnd = true;
      timestamp = Math.min(
        inputs.timeRange.end,
        timestamp
      );
    }
    if (timestamp <= inputs.timeRange.start) {
      atStart = true;
      timestamp = Math.max(
        inputs.timeRange.start,
        timestamp
      );
    }
    return {
      timestamp,
      timeRange: inputs.timeRange,
      atStart,
      atEnd
    };
  }
  #requestedTimestampToMilliseconds(inputs) {
    switch (inputs.timestampRequest) {
      case "auto":
        return inputs.setupAnchor === "start" && inputs.setupAlg.alg.experimentalIsEmpty() ? inputs.timeRange.end : inputs.timeRange.start;
      case "start":
        return inputs.timeRange.start;
      case "end":
        return inputs.timeRange.end;
      case "anchor":
        return inputs.setupAnchor === "start" ? inputs.timeRange.start : inputs.timeRange.end;
      case "opposite-anchor":
        return inputs.setupAnchor === "start" ? inputs.timeRange.end : inputs.timeRange.start;
      default:
        return inputs.timestampRequest;
    }
  }
  canReuseValue(v1, v2) {
    return v1.timestamp === v2.timestamp && v1.timeRange.start === v2.timeRange.start && v1.timeRange.end === v2.timeRange.end && v1.atStart === v2.atStart && v1.atEnd === v2.atEnd;
  }
};

// src/cubing/twisty/model/props/timeline/PlayingInfoProp.ts
var PlayingInfoProp = class extends TwistyPropSource {
  async getDefaultValue() {
    return {
      direction: 1 /* Forwards */,
      playing: false,
      untilBoundary: "entire-timeline" /* EntireTimeline */,
      loop: false
    };
  }
  async derive(newInfo, oldValuePromise) {
    const oldValue = await oldValuePromise;
    const newValue = Object.assign({}, oldValue);
    Object.assign(newValue, newInfo);
    return newValue;
  }
  canReuseValue(v1, v2) {
    return v1.direction === v2.direction && v1.playing === v2.playing && v1.untilBoundary === v2.untilBoundary && v1.loop === v2.loop;
  }
};

// src/cubing/twisty/model/props/timeline/TempoScaleProp.ts
var TempoScaleProp = class extends TwistyPropSource {
  getDefaultValue() {
    return 1;
  }
  derive(v) {
    return v < 0 ? 1 : v;
  }
};

// src/cubing/twisty/model/props/timeline/TimestampRequestProp.ts
var smartTimestamps = {
  auto: true,
  start: true,
  end: true,
  anchor: true,
  "opposite-anchor": true
};
var TimestampRequestProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
  set(v) {
    const currentValue = this.get();
    super.set(
      (async () => {
        if (!this.validInput(await v)) {
          return currentValue;
        }
        return v;
      })()
    );
  }
  validInput(v) {
    if (typeof v === "number") {
      return true;
    }
    if (smartTimestamps[v]) {
      return true;
    }
    return false;
  }
};

// src/cubing/twisty/model/props/viewer/TimeRangeProp.ts
var TimeRangeProp = class extends TwistyPropDerived {
  derive(inputs) {
    return {
      start: 0,
      end: inputs.indexer.algDuration()
    };
  }
};

// src/cubing/twisty/model/props/viewer/ViewerLinkProp.ts
var ViewerLinkProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/viewer/VisualizationProp.ts
var VisualizationFormatProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/viewer/VisualizationStrategyProp.ts
var VisualizationStrategyProp = class extends TwistyPropDerived {
  derive(inputs) {
    switch (inputs.puzzleID) {
      case "clock":
      case "square1":
      case "redi_cube":
      case "melindas2x2x2x2":
      case "tri_quad":
      case "loopover":
        return "2D";
      case "3x3x3":
        switch (inputs.visualizationRequest) {
          case "auto":
          case "3D":
            return "Cube3D";
          default:
            return inputs.visualizationRequest;
        }
      default:
        switch (inputs.visualizationRequest) {
          case "auto":
          case "3D":
            return "PG3D";
          case "experimental-2D-LL":
          case "experimental-2D-LL-face":
            if (["2x2x2", "4x4x4", "megaminx"].includes(inputs.puzzleID)) {
              return "experimental-2D-LL";
            } else {
              return "2D";
            }
          default:
            return inputs.visualizationRequest;
        }
    }
  }
};

// src/cubing/twisty/model/props/puzzle/display/FaceletScaleProp.ts
var FaceletScaleProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/puzzle/display/FoundationDisplayProp.ts
var FoundationDisplayProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/puzzle/display/InitialHintFaceletsAnimationProp.ts
var InitialHintFaceletsAnimationProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/puzzle/display/SpriteProp.ts
var cachedLoader = null;
async function loader() {
  return cachedLoader ??= new (await bulk3DCode).ThreeTextureLoader();
}
var SpriteProp = class extends TwistyPropDerived {
  async derive(inputs) {
    const { spriteURL: textureURL } = inputs;
    if (textureURL === null) {
      return null;
    }
    return new Promise(async (resolve, _reject) => {
      const onLoadingError = () => {
        console.warn("Could not load sprite:", textureURL.toString());
        resolve(null);
      };
      try {
        (await loader()).load(
          textureURL.toString(),
          resolve,
          onLoadingError,
          onLoadingError
        );
      } catch {
        onLoadingError();
      }
    });
  }
};

// src/cubing/twisty/model/props/puzzle/display/StickeringMaskProp.ts
var r = {
  facelets: ["regular", "regular", "regular", "regular", "regular"]
};
async function fullStickeringMask(puzzleLoader) {
  const { definition } = await puzzleLoader.kpuzzle();
  const fullStickeringMask2 = { orbits: {} };
  for (const orbitDefinition of definition.orbits) {
    fullStickeringMask2.orbits[orbitDefinition.orbitName] = {
      pieces: new Array(orbitDefinition.numPieces).fill(r)
    };
  }
  return fullStickeringMask2;
}
var StickeringMaskProp = class extends TwistyPropDerived {
  getDefaultValue() {
    return { orbits: {} };
  }
  async derive(inputs) {
    if (inputs.stickeringMaskRequest) {
      return inputs.stickeringMaskRequest;
    }
    if (inputs.stickeringRequest === "picture") {
      return {
        specialBehaviour: "picture",
        orbits: {}
      };
    }
    return inputs.puzzleLoader.stickeringMask?.(
      inputs.stickeringRequest ?? "full"
    ) ?? fullStickeringMask(inputs.puzzleLoader);
  }
  // TODO: Implement canReuseValue?
};

// src/cubing/twisty/model/props/puzzle/display/parseSerializedStickeringMask.ts
var charMap = {
  "-": "Regular" /* Regular */,
  D: "Dim" /* Dim */,
  I: "Ignored" /* Ignored */,
  // o: ExperimentalPieceStickering.OrientationStickers, // TODO: hack for centers
  X: "Invisible" /* Invisible */,
  O: "IgnoreNonPrimary" /* IgnoreNonPrimary */,
  // orient color known
  P: "PermuteNonPrimary" /* PermuteNonPrimary */,
  // Example: PLL
  o: "Ignoriented" /* Ignoriented */,
  // Example: LL edges during CLS
  "?": "OrientationWithoutPermutation" /* OrientationWithoutPermutation */,
  // ACube: ignore position
  M: "Mystery" /* Mystery */,
  // This piece needs highlighting, but we know nothing about it.
  "@": "Regular" /* Regular */
  // ACube: ignore orientation // TODO: distinguish from "regular"
};
function parseSerializedStickeringMask(serializedStickeringMask) {
  const stickeringMask = {
    orbits: {}
  };
  const serializedOrbits = serializedStickeringMask.split(",");
  for (const serializedOrbit of serializedOrbits) {
    const [orbitName, serializedOrbitPieces, ...rest] = serializedOrbit.split(":");
    if (rest.length > 0) {
      throw new Error(
        `Invalid serialized orbit stickering mask (too many colons): \`${serializedOrbit}\``
      );
    }
    const pieces = [];
    stickeringMask.orbits[orbitName] = { pieces };
    for (const char of serializedOrbitPieces) {
      const pieceStickering = charMap[char];
      pieces.push(getPieceStickeringMask(pieceStickering));
    }
  }
  return stickeringMask;
}

// src/cubing/twisty/model/props/puzzle/display/StickeringMaskRequestProp.ts
var StickeringMaskRequestProp = class extends TwistyPropSource {
  getDefaultValue() {
    return null;
  }
  derive(input) {
    if (input === null) {
      return null;
    } else if (typeof input === "string") {
      return parseSerializedStickeringMask(input);
    } else {
      return input;
    }
  }
};

// src/cubing/twisty/model/props/puzzle/state/DragInputProp.ts
var DragInputProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/puzzle/state/MovePressCancelOptions.ts
var MovePressCancelOptions = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return {};
  }
};

// src/cubing/twisty/model/props/puzzle/state/MovePressInputProp.ts
var MovePressInputProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/viewer/BackgroundProp.ts
var BackgroundProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/viewer/ColorSchemeProp.ts
var ColorSchemeProp = class extends TwistyPropDerived {
  derive(inputs) {
    return inputs.colorSchemeRequest === "dark" ? "dark" : "light";
  }
};

// src/cubing/twisty/model/props/viewer/ColorSchemeRequestProp.ts
var ColorSchemeRequestProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
};

// src/cubing/twisty/model/props/viewer/DOMElementReferenceProp.ts
var DOMElementReferenceProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return null;
  }
};

// src/cubing/twisty/model/props/viewer/LatitudeLimit.ts
var DEFAULT_LATITUDE_LIMIT = 35;
var LatitudeLimitProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return DEFAULT_LATITUDE_LIMIT;
  }
};

// src/cubing/twisty/model/props/viewer/OrbitCoordinatesRequestProp.ts
function orbitCoordinatesEqual(c1, c2) {
  return c1.latitude === c2.latitude && c1.longitude === c2.longitude && c1.distance === c2.distance;
}
var OrbitCoordinatesRequestProp = class extends TwistyPropSource {
  getDefaultValue() {
    return "auto";
  }
  canReuseValue(v1, v2) {
    return v1 === v2 || orbitCoordinatesEqual(v1, v2);
  }
  async derive(newCoordinates, oldValuePromise) {
    if (newCoordinates === "auto") {
      return "auto";
    }
    let oldValue = await oldValuePromise;
    if (oldValue === "auto") {
      oldValue = {};
    }
    const newValue = Object.assign({}, oldValue);
    Object.assign(newValue, newCoordinates);
    if (typeof newValue.latitude !== "undefined") {
      newValue.latitude = Math.min(Math.max(newValue.latitude, -90), 90);
    }
    if (typeof newValue.longitude !== "undefined") {
      newValue.longitude = modIntoRange(newValue.longitude, 180, -180);
    }
    return newValue;
  }
};

// src/cubing/twisty/model/props/viewer/OrbitCoordinatesProp.ts
var OrbitCoordinatesProp = class extends TwistyPropDerived {
  canReuseValue(v1, v2) {
    return orbitCoordinatesEqual(v1, v2);
  }
  async derive(inputs) {
    if (inputs.orbitCoordinatesRequest === "auto") {
      return defaultCameraOrbitCoordinates(inputs.puzzleID, inputs.strategy);
    }
    const req = Object.assign(
      Object.assign(
        {},
        defaultCameraOrbitCoordinates(inputs.puzzleID, inputs.strategy),
        inputs.orbitCoordinatesRequest
      )
    );
    if (Math.abs(req.latitude) <= inputs.latitudeLimit) {
      return req;
    } else {
      const { latitude, longitude, distance } = req;
      return {
        latitude: inputs.latitudeLimit * Math.sign(latitude),
        longitude,
        distance
      };
    }
  }
};
var centeredCameraOrbitCoordinates = {
  latitude: 31.717474411461005,
  longitude: 0,
  distance: 5.877852522924731
};
var cubeCube3DCameraOrbitCoordinates = {
  latitude: 35,
  longitude: 30,
  distance: 6
};
var cubePG3DCameraOrbitCoordinates = {
  latitude: 35,
  longitude: 30,
  distance: 6.25
};
var megaminxCameraOrbitCoordinates = {
  latitude: Math.atan(1 / 2) * DEGREES_PER_RADIAN,
  longitude: 0,
  distance: 6.7
};
var pyraminxCameraOrbitCoordinates = {
  latitude: 26.56505117707799,
  longitude: 0,
  distance: 6
};
function defaultCameraOrbitCoordinates(puzzleID, strategy) {
  if (puzzleID[1] === "x") {
    if (strategy === "Cube3D") {
      return cubeCube3DCameraOrbitCoordinates;
    } else {
      return cubePG3DCameraOrbitCoordinates;
    }
  } else {
    switch (puzzleID) {
      case "megaminx":
      case "gigaminx":
        return megaminxCameraOrbitCoordinates;
      case "pyraminx":
      case "master_tetraminx":
        return pyraminxCameraOrbitCoordinates;
      case "skewb":
        return cubePG3DCameraOrbitCoordinates;
      default:
        return centeredCameraOrbitCoordinates;
    }
  }
}

// src/cubing/twisty/model/TwistySceneModel.ts
var TwistySceneModel = class {
  constructor(twistyPlayerModel) {
    this.twistyPlayerModel = twistyPlayerModel;
    this.orbitCoordinates = new OrbitCoordinatesProp({
      orbitCoordinatesRequest: this.orbitCoordinatesRequest,
      latitudeLimit: this.latitudeLimit,
      puzzleID: twistyPlayerModel.puzzleID,
      strategy: twistyPlayerModel.visualizationStrategy
    });
    this.stickeringMask = new StickeringMaskProp({
      stickeringMaskRequest: this.stickeringMaskRequest,
      stickeringRequest: this.stickeringRequest,
      puzzleLoader: twistyPlayerModel.puzzleLoader
    });
  }
  // Depth 0
  background = new BackgroundProp();
  colorSchemeRequest = new ColorSchemeRequestProp();
  dragInput = new DragInputProp();
  foundationDisplay = new FoundationDisplayProp();
  foundationStickerSpriteURL = new URLProp();
  fullscreenElement = new DOMElementReferenceProp();
  hintFacelet = new HintFaceletProp();
  hintStickerSpriteURL = new URLProp();
  initialHintFaceletsAnimation = new InitialHintFaceletsAnimationProp();
  latitudeLimit = new LatitudeLimitProp();
  movePressInput = new MovePressInputProp();
  movePressCancelOptions = new MovePressCancelOptions();
  orbitCoordinatesRequest = new OrbitCoordinatesRequestProp();
  // `stickeringMaskRequest` takes priority over `stickeringRequest`
  stickeringMaskRequest = new StickeringMaskRequestProp();
  stickeringRequest = new StickeringRequestProp();
  faceletScale = new FaceletScaleProp();
  // Depth 1
  colorScheme = new ColorSchemeProp({
    colorSchemeRequest: this.colorSchemeRequest
  });
  foundationStickerSprite = new SpriteProp({
    spriteURL: this.foundationStickerSpriteURL
  });
  hintStickerSprite = new SpriteProp({
    spriteURL: this.hintStickerSpriteURL
  });
  // Dependence on TwistyPlayerModel
  orbitCoordinates;
  stickeringMask;
};

// src/cubing/twisty/model/UserVisibleErrorTracker.ts
var EMPTY_ERRORS = { errors: [] };
var UserVisibleErrorTracker = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return EMPTY_ERRORS;
  }
  reset() {
    this.set(this.getDefaultValue());
  }
  canReuseValue(_v1, _v2) {
    return arrayEquals(_v1.errors, _v2.errors);
  }
};

// src/cubing/twisty/model/TwistyPlayerModel.ts
var TwistyPlayerModel = class {
  // TODO: incorporate error handling into the entire prop graph.
  // TODO: Make this something that can't get confused with normal props?
  userVisibleErrorTracker = new UserVisibleErrorTracker();
  // TODO: Redistribute and group props with controllers.
  /******************************** Depth 0 ********************************/
  alg = new AlgProp();
  backView = new BackViewProp();
  controlPanel = new ControlPanelProp();
  catchUpMove = new CatchUpMoveProp();
  indexerConstructorRequest = new IndexerConstructorRequestProp();
  playingInfo = new PlayingInfoProp();
  puzzleDescriptionRequest = new PGPuzzleDescriptionStringProp();
  puzzleIDRequest = new PuzzleIDRequestProp();
  setupAnchor = new SetupAnchorProp();
  setupAlg = new AlgProp();
  setupTransformation = new SetupTransformationProp();
  tempoScale = new TempoScaleProp();
  timestampRequest = new TimestampRequestProp();
  viewerLink = new ViewerLinkProp();
  visualizationFormat = new VisualizationFormatProp();
  // Metadata
  title = new ArbitraryStringProp();
  videoURL = new URLProp();
  competitionID = new ArbitraryStringProp();
  /**
   * `<twisty-player>` interally supports associating custom timing information
   * for this move, but there is not an API for this yet. In order to support
   * exploratory use cases for such a feature in the future, this property
   * allows setting timeline information.
   *
   * Note that this feature may not work as expected when combined with other
   * features. In particular, it will cause sync issues with an associated
   * `<twisty-alg-viewer>` depending on how the alg/moves are constructed.
   *
   * Usage example:
   *
   * ```ts
   * import { Move, Pause } from "cubing/alg";
   * import { TwistyPlayer } from "cubing/twisty";
   *
   * const player = document.body.appendChild(new TwistyPlayer());
   * player.alg = "R U' D2 R'";
   *
   * // Note that:
   * // - The leaves must match those of the alg. (No consistency checks are performed at this time.)
   * // - Leaves may overlap if they can be simultaneously animated.
   * // - There must always be at least one animating leaf at any moment. You can use a `Pause` for this if there is a gap between moves.
   * player.experimentalModel.animationTimelineLeavesRequest.set([
   *   { animLeaf: new Move("R", 1), start: 0, end: 200 },
   *   { animLeaf: new Pause(), start: 200, end: 218 },
   *   { animLeaf: new Move("U", -1), start: 218, end: 370 },
   *   { animLeaf: new Move("D", 2), start: 249, end: 520 },
   *   { animLeaf: new Pause(), start: 520, end: 530 },
   *   { animLeaf: new Move("R", -1), start: 530, end: 790 },
   * ]);
   * ```
   */
  animationTimelineLeavesRequest = new AnimationTimelineLeavesRequestProp();
  /******************************** Depth 1 ********************************/
  puzzleLoader = new PuzzleLoaderProp(
    {
      puzzleIDRequest: this.puzzleIDRequest,
      puzzleDescriptionRequest: this.puzzleDescriptionRequest
    },
    this.userVisibleErrorTracker
  );
  /******************************** Depth 2 ********************************/
  kpuzzle = new KPuzzleProp({ puzzleLoader: this.puzzleLoader });
  puzzleID = new PuzzleIDProp({ puzzleLoader: this.puzzleLoader });
  /******************************** Depth 3 ********************************/
  puzzleAlg = new PuzzleAlgProp({
    algWithIssues: this.alg,
    kpuzzle: this.kpuzzle
  });
  puzzleSetupAlg = new PuzzleAlgProp({
    algWithIssues: this.setupAlg,
    kpuzzle: this.kpuzzle
  });
  visualizationStrategy = new VisualizationStrategyProp({
    visualizationRequest: this.visualizationFormat,
    puzzleID: this.puzzleID
  });
  /******************************** Depth 4 ********************************/
  indexerConstructor = new IndexerConstructorProp({
    alg: this.alg,
    puzzle: this.puzzleID,
    visualizationStrategy: this.visualizationStrategy,
    indexerConstructorRequest: this.indexerConstructorRequest,
    animationTimelineLeaves: this.animationTimelineLeavesRequest
  });
  setupAlgTransformation = new AlgTransformationProp({
    setupAlg: this.puzzleSetupAlg,
    kpuzzle: this.kpuzzle
  });
  /******************************** Depth 5 ********************************/
  indexer = new IndexerProp({
    indexerConstructor: this.indexerConstructor,
    algWithIssues: this.puzzleAlg,
    kpuzzle: this.kpuzzle,
    animationTimelineLeaves: this.animationTimelineLeavesRequest
  });
  /******************************** Depth 6 ********************************/
  anchorTransformation = new AnchorTransformationProp({
    setupTransformation: this.setupTransformation,
    setupAnchor: this.setupAnchor,
    setupAlgTransformation: this.setupAlgTransformation,
    indexer: this.indexer
  });
  timeRange = new TimeRangeProp({
    indexer: this.indexer
  });
  /******************************** Depth 7 ********************************/
  detailedTimelineInfo = new DetailedTimelineInfoProp(
    {
      timestampRequest: this.timestampRequest,
      timeRange: this.timeRange,
      setupAnchor: this.setupAnchor,
      setupAlg: this.setupAlg
    }
  );
  /******************************** Depth 8 ********************************/
  coarseTimelineInfo = new CoarseTimelineInfoProp({
    detailedTimelineInfo: this.detailedTimelineInfo,
    playingInfo: this.playingInfo
  });
  currentMoveInfo = new CurrentMoveInfoProp({
    indexer: this.indexer,
    detailedTimelineInfo: this.detailedTimelineInfo,
    catchUpMove: this.catchUpMove
  });
  /******************************** Depth 9 ********************************/
  // TODO: Inline Twisty3D management.
  buttonAppearance = new ButtonAppearanceProp({
    coarseTimelineInfo: this.coarseTimelineInfo,
    viewerLink: this.viewerLink
  });
  currentLeavesSimplified = new CurrentLeavesSimplifiedProp({
    currentMoveInfo: this.currentMoveInfo
  });
  /******************************** Depth 10 ********************************/
  currentPattern = new CurrentPatternProp({
    anchoredStart: this.anchorTransformation,
    currentLeavesSimplified: this.currentLeavesSimplified,
    indexer: this.indexer
  });
  /******************************** Depth 11 ********************************/
  legacyPosition = new LegacyPositionProp({
    currentMoveInfo: this.currentMoveInfo,
    currentPattern: this.currentPattern
  });
  twistySceneModel = new TwistySceneModel(this);
  async twizzleLink() {
    const [
      viewerLink,
      puzzleID,
      puzzleDescription,
      alg,
      setup,
      anchor,
      experimentalStickeringRequest,
      experimentalTitle
    ] = await Promise.all([
      this.viewerLink.get(),
      this.puzzleID.get(),
      this.puzzleDescriptionRequest.get(),
      this.alg.get(),
      this.setupAlg.get(),
      this.setupAnchor.get(),
      this.twistySceneModel.stickeringRequest.get(),
      this.twistySceneModel.twistyPlayerModel.title.get()
    ]);
    const isExplorer = viewerLink === "experimental-twizzle-explorer";
    const url = new URL(
      `https://alpha.twizzle.net/${isExplorer ? "explore" : "edit"}/`
    );
    if (!alg.alg.experimentalIsEmpty()) {
      url.searchParams.set("alg", alg.alg.toString());
    }
    if (!setup.alg.experimentalIsEmpty()) {
      url.searchParams.set("setup-alg", setup.alg.toString());
    }
    if (anchor !== "start") {
      url.searchParams.set("setup-anchor", anchor);
    }
    if (experimentalStickeringRequest !== "full" && experimentalStickeringRequest !== null) {
      url.searchParams.set(
        "experimental-stickering",
        experimentalStickeringRequest
      );
    }
    if (isExplorer && puzzleDescription !== NO_VALUE) {
      url.searchParams.set("puzzle-description", puzzleDescription);
    } else if (puzzleID !== "3x3x3") {
      url.searchParams.set("puzzle", puzzleID);
    }
    if (experimentalTitle) {
      url.searchParams.set("title", experimentalTitle);
    }
    return url.toString();
  }
  experimentalAddAlgLeaf(algLeaf, options) {
    const maybeMove = algLeaf.as(Move);
    if (maybeMove) {
      this.experimentalAddMove(maybeMove, options);
    } else {
      this.alg.set(
        (async () => {
          const alg = (await this.alg.get()).alg;
          const newAlg = alg.concat(new Alg([algLeaf]));
          this.timestampRequest.set("end");
          return newAlg;
        })()
      );
    }
  }
  // TODO: Animate the new move.
  experimentalAddMove(flexibleMove, options) {
    const move = typeof flexibleMove === "string" ? new Move(flexibleMove) : flexibleMove;
    this.alg.set(
      (async () => {
        const [{ alg }, puzzleLoader] = await Promise.all([
          this.alg.get(),
          this.puzzleLoader.get()
        ]);
        const newAlg = experimentalAppendMove(alg, move, {
          ...options,
          ...await getPartialAppendOptionsForPuzzleSpecificSimplifyOptions(
            puzzleLoader
          )
        });
        this.timestampRequest.set("end");
        this.catchUpMove.set({
          move,
          amount: 0
        });
        return newAlg;
      })()
    );
  }
  // TODO: allow more than 1?
  experimentalRemoveFinalChild() {
    this.alg.set(
      (async () => {
        const alg = (await this.alg.get()).alg;
        const children = Array.from(alg.childAlgNodes());
        const [finalChild] = children.splice(-1);
        if (!finalChild) {
          return alg;
        }
        this.timestampRequest.set("end");
        const finalChildMove = finalChild.as(Move);
        if (finalChildMove) {
          this.catchUpMove.set({
            move: finalChildMove.invert(),
            amount: 0
          });
        }
        return new Alg(children);
      })()
    );
  }
};

// src/cubing/twisty/views/TwistyPlayerSettable.ts
function err(propName) {
  return new Error(
    `Cannot get \`.${propName}\` directly from a \`TwistyPlayer\`.`
  );
}
var TwistyPlayerSettable = class extends ManagedCustomElement {
  experimentalModel = new TwistyPlayerModel();
  set alg(newAlg) {
    this.experimentalModel.alg.set(newAlg);
  }
  get alg() {
    throw err("alg");
  }
  set experimentalSetupAlg(newSetup) {
    this.experimentalModel.setupAlg.set(newSetup);
  }
  get experimentalSetupAlg() {
    throw err("setup");
  }
  set experimentalSetupAnchor(anchor) {
    this.experimentalModel.setupAnchor.set(anchor);
  }
  get experimentalSetupAnchor() {
    throw err("anchor");
  }
  set puzzle(puzzleID) {
    this.experimentalModel.puzzleIDRequest.set(puzzleID);
  }
  get puzzle() {
    throw err("puzzle");
  }
  set experimentalPuzzleDescription(puzzleDescription) {
    this.experimentalModel.puzzleDescriptionRequest.set(puzzleDescription);
  }
  get experimentalPuzzleDescription() {
    throw err("experimentalPuzzleDescription");
  }
  set timestamp(timestamp) {
    this.experimentalModel.timestampRequest.set(timestamp);
  }
  get timestamp() {
    throw err("timestamp");
  }
  set hintFacelets(hintFaceletStyle) {
    this.experimentalModel.twistySceneModel.hintFacelet.set(hintFaceletStyle);
  }
  get hintFacelets() {
    throw err("hintFacelets");
  }
  set experimentalStickering(stickering) {
    this.experimentalModel.twistySceneModel.stickeringRequest.set(stickering);
  }
  get experimentalStickering() {
    throw err("experimentalStickering");
  }
  set experimentalStickeringMaskOrbits(stickeringMask) {
    this.experimentalModel.twistySceneModel.stickeringMaskRequest.set(
      stickeringMask
    );
  }
  get experimentalStickeringMaskOrbits() {
    throw err("experimentalStickeringMaskOrbits");
  }
  set experimentalFaceletScale(faceletScale) {
    this.experimentalModel.twistySceneModel.faceletScale.set(faceletScale);
  }
  get experimentalFaceletScale() {
    throw err("experimentalFaceletScale");
  }
  set backView(backView) {
    this.experimentalModel.backView.set(backView);
  }
  get backView() {
    throw err("backView");
  }
  set background(backgroundTheme) {
    this.experimentalModel.twistySceneModel.background.set(backgroundTheme);
  }
  get background() {
    throw err("background");
  }
  set colorScheme(colorScheme) {
    this.experimentalModel.twistySceneModel.colorSchemeRequest.set(colorScheme);
  }
  get colorScheme() {
    throw err("colorScheme");
  }
  set controlPanel(newControlPanel) {
    this.experimentalModel.controlPanel.set(newControlPanel);
  }
  get controlPanel() {
    throw err("controlPanel");
  }
  set visualization(visualizationFormat) {
    this.experimentalModel.visualizationFormat.set(visualizationFormat);
  }
  get visualization() {
    throw err("visualization");
  }
  set experimentalTitle(title) {
    this.experimentalModel.title.set(title);
  }
  get experimentalTitle() {
    throw err("experimentalTitle");
  }
  set experimentalVideoURL(videoURL) {
    this.experimentalModel.videoURL.set(videoURL);
  }
  get experimentalVideoURL() {
    throw err("experimentalVideoURL");
  }
  set experimentalCompetitionID(competitionID) {
    this.experimentalModel.competitionID.set(competitionID);
  }
  get experimentalCompetitionID() {
    throw err("experimentalCompetitionID");
  }
  set viewerLink(viewerLinkPage) {
    this.experimentalModel.viewerLink.set(viewerLinkPage);
  }
  get viewerLink() {
    throw err("viewerLink");
  }
  set experimentalMovePressInput(movePressInput) {
    this.experimentalModel.twistySceneModel.movePressInput.set(movePressInput);
  }
  get experimentalMovePressInput() {
    throw err("experimentalMovePressInput");
  }
  set experimentalMovePressCancelOptions(movePressCancelOptions) {
    this.experimentalModel.twistySceneModel.movePressCancelOptions.set(
      movePressCancelOptions
    );
  }
  get experimentalMovePressCancelOptions() {
    throw err("experimentalMovePressCancelOptions");
  }
  set cameraLatitude(latitude) {
    this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({
      latitude
    });
  }
  get cameraLatitude() {
    throw err("cameraLatitude");
  }
  set cameraLongitude(longitude) {
    this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({
      longitude
    });
  }
  get cameraLongitude() {
    throw err("cameraLongitude");
  }
  set cameraDistance(distance) {
    this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({
      distance
    });
  }
  get cameraDistance() {
    throw err("cameraDistance");
  }
  set cameraLatitudeLimit(latitudeLimit) {
    this.experimentalModel.twistySceneModel.latitudeLimit.set(latitudeLimit);
  }
  get cameraLatitudeLimit() {
    throw err("cameraLatitudeLimit");
  }
  set indexer(indexer) {
    this.experimentalModel.indexerConstructorRequest.set(indexer);
  }
  get indexer() {
    throw err("indexer");
  }
  set tempoScale(newTempoScale) {
    this.experimentalModel.tempoScale.set(newTempoScale);
  }
  get tempoScale() {
    throw err("tempoScale");
  }
  set experimentalSprite(url) {
    this.experimentalModel.twistySceneModel.foundationStickerSpriteURL.set(url);
  }
  get experimentalSprite() {
    throw err("experimentalSprite");
  }
  set experimentalHintSprite(url) {
    this.experimentalModel.twistySceneModel.hintStickerSpriteURL.set(url);
  }
  get experimentalHintSprite() {
    throw err("experimentalHintSprite");
  }
  set fullscreenElement(element) {
    this.experimentalModel.twistySceneModel.fullscreenElement.set(element);
  }
  get fullscreenElement() {
    throw err("fullscreenElement");
  }
  set experimentalInitialHintFaceletsAnimation(anim) {
    this.experimentalModel.twistySceneModel.initialHintFaceletsAnimation.set(
      anim
    );
  }
  get experimentalInitialHintFaceletsAnimation() {
    throw err("experimentalInitialHintFaceletsAnimation");
  }
  set experimentalDragInput(dragInputMode) {
    this.experimentalModel.twistySceneModel.dragInput.set(dragInputMode);
  }
  get experimentalDragInput() {
    throw err("experimentalDragInput");
  }
  experimentalGet = new ExperimentalGetters(this.experimentalModel);
};
var ExperimentalGetters = class {
  constructor(model) {
    this.model = model;
  }
  async alg() {
    return (await this.model.alg.get()).alg;
  }
  async setupAlg() {
    return (await this.model.setupAlg.get()).alg;
  }
  puzzleID() {
    return this.model.puzzleID.get();
  }
  async timestamp() {
    return (await this.model.detailedTimelineInfo.get()).timestamp;
  }
};

// src/cubing/twisty/views/TwistyPlayer.ts
var DATA_ATTRIBUTE_PREFIX = "data-";
var twistyPlayerAttributeMap = {
  // TODO: We assume each of these can be set using a string or will be automatically converted by JS (e.g. numbers). Can we enforce
  // that with types? Do we need to add a translation mechanism for things we
  // don't want to leave settable as strings?
  // TODO: Enum validation.
  // Alg
  alg: "alg",
  "experimental-setup-alg": "experimentalSetupAlg",
  // String-based
  "experimental-setup-anchor": "experimentalSetupAnchor",
  puzzle: "puzzle",
  "experimental-puzzle-description": "experimentalPuzzleDescription",
  visualization: "visualization",
  "hint-facelets": "hintFacelets",
  "experimental-stickering": "experimentalStickering",
  "experimental-stickering-mask-orbits": "experimentalStickeringMaskOrbits",
  background: "background",
  "color-scheme": "colorScheme",
  "control-panel": "controlPanel",
  "back-view": "backView",
  "experimental-initial-hint-facelets-animation": "experimentalInitialHintFaceletsAnimation",
  // "indexer": "indexer",
  "viewer-link": "viewerLink",
  "experimental-move-press-input": "experimentalMovePressInput",
  "experimental-drag-input": "experimentalDragInput",
  // Metadata
  "experimental-title": "experimentalTitle",
  "experimental-video-url": "experimentalVideoURL",
  "experimental-competition-id": "experimentalCompetitionID",
  // Number-based
  "camera-latitude": "cameraLatitude",
  "camera-longitude": "cameraLongitude",
  "camera-distance": "cameraDistance",
  "camera-latitude-limit": "cameraLatitudeLimit",
  "tempo-scale": "tempoScale",
  // URL-based
  "experimental-sprite": "experimentalSprite",
  "experimental-hint-sprite": "experimentalHintSprite"
};
var configKeys = Object.fromEntries(
  Object.values(twistyPlayerAttributeMap).map((s) => [s, true])
);
var propOnly = {
  experimentalMovePressCancelOptions: true
};
var cachedSharedIntersectionObserver;
var intersectedCallback = Symbol("intersectedCallback");
function waitForIntersection(player) {
  cachedSharedIntersectionObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRect.height > 0) {
          entry.target[intersectedCallback]();
          observer.unobserve(entry.target);
        }
      }
    }
  );
  cachedSharedIntersectionObserver.observe(player);
}
var TwistyPlayer = class extends TwistyPlayerSettable {
  controller = new TwistyPlayerController(
    this.experimentalModel,
    this
  );
  buttons;
  experimentalCanvasClickCallback = () => {
  };
  // #onCanvasClick() {
  // }
  constructor(config = {}) {
    super();
    for (const [propName, value] of Object.entries(config)) {
      if (!(configKeys[propName] || propOnly[propName])) {
        console.warn(`Invalid config passed to TwistyPlayer: ${propName}`);
        break;
      }
      this[propName] = value;
    }
  }
  #controlsManager = new ClassListManager(
    this,
    "controls-",
    ["auto"].concat(
      Object.keys(controlsLocations)
    )
  );
  #visualizationWrapperElem = document.createElement("div");
  // TODO: Better pattern.
  #errorElem = document.createElement("div");
  // TODO: Better pattern.
  #alreadyConnected = false;
  // TODO: support resetting
  connectedCallback() {
    this.addCSS(twistyPlayerCSS);
    waitForIntersection(this);
  }
  async [intersectedCallback]() {
    if (this.#alreadyConnected) {
      return;
    }
    this.#alreadyConnected = true;
    this.addElement(this.#visualizationWrapperElem).classList.add(
      "visualization-wrapper"
    );
    this.addElement(this.#errorElem).classList.add("error-elem");
    this.#errorElem.textContent = "Error";
    this.experimentalModel.userVisibleErrorTracker.addFreshListener(
      (userVisibleError) => {
        const errorString = userVisibleError.errors[0] ?? null;
        this.contentWrapper.classList.toggle("error", !!errorString);
        if (errorString) {
          this.#errorElem.textContent = errorString;
        }
      }
    );
    const scrubber = new TwistyScrubber(
      this.experimentalModel,
      this.controller
    );
    this.contentWrapper.appendChild(scrubber);
    this.buttons = new TwistyButtons(
      this.experimentalModel,
      this.controller,
      this
    );
    this.contentWrapper.appendChild(this.buttons);
    this.experimentalModel.twistySceneModel.background.addFreshListener(
      (backgroundTheme) => {
        this.contentWrapper.classList.toggle(
          "checkered",
          ["auto", "checkered"].includes(backgroundTheme)
        );
        this.contentWrapper.classList.toggle(
          "checkered-transparent",
          backgroundTheme === "checkered-transparent"
        );
      }
    );
    this.experimentalModel.twistySceneModel.colorScheme.addFreshListener(
      (colorScheme) => {
        this.contentWrapper.classList.toggle(
          "dark-mode",
          ["dark"].includes(colorScheme)
        );
      }
    );
    this.experimentalModel.controlPanel.addFreshListener(
      (controlPanel) => {
        this.#controlsManager.setValue(controlPanel);
      }
    );
    this.experimentalModel.visualizationStrategy.addFreshListener(
      this.#setVisualizationWrapper.bind(this)
    );
    this.experimentalModel.puzzleID.addFreshListener(this.flash.bind(this));
  }
  #flashLevel = "auto";
  /** @deprecated */
  experimentalSetFlashLevel(newLevel) {
    this.#flashLevel = newLevel;
  }
  flash() {
    if (this.#flashLevel === "auto") {
      this.#visualizationWrapper?.animate([{ opacity: 0.25 }, { opacity: 1 }], {
        duration: 250,
        easing: "ease-out"
      });
    }
  }
  #visualizationWrapper = null;
  #initial3DVisualizationWrapper = new InitialValueTracker();
  #visualizationStrategy = null;
  #setVisualizationWrapper(strategy) {
    if (strategy !== this.#visualizationStrategy) {
      this.#visualizationWrapper?.remove();
      this.#visualizationWrapper?.disconnect();
      let newWrapper;
      switch (strategy) {
        case "2D":
        case "experimental-2D-LL":
        case "experimental-2D-LL-face": {
          newWrapper = new Twisty2DSceneWrapper(
            this.experimentalModel.twistySceneModel,
            strategy
          );
          break;
        }
        case "Cube3D":
        case "PG3D": {
          newWrapper = new Twisty3DSceneWrapper(this.experimentalModel);
          this.#initial3DVisualizationWrapper.handleNewValue(newWrapper);
          break;
        }
        default:
          throw new Error("Invalid visualization");
      }
      this.#visualizationWrapperElem.appendChild(newWrapper);
      this.#visualizationWrapper = newWrapper;
      this.#visualizationStrategy = strategy;
    }
  }
  async experimentalCurrentVantages() {
    this.connectedCallback();
    const wrapper = this.#visualizationWrapper;
    if (wrapper instanceof Twisty3DSceneWrapper) {
      return wrapper.experimentalVantages();
    }
    return [];
  }
  async experimentalCurrentCanvases() {
    const vantages = await this.experimentalCurrentVantages();
    const canvases = [];
    for (const vantage of vantages) {
      canvases.push((await vantage.canvasInfo()).canvas);
    }
    return canvases;
  }
  /**
   * Get the first available puzzle `Object3D`. This can be inserted into
   * another `three.js` scene, essentially "adopting" it from the
   * `TwistyPlayer`'s scenes while still allowing the `TwistyPlayer` to animate
   * it. The function returns a `Promise` that returns if and when the
   * `Object3D` is available, and accepts a callback that is called whenever a
   * render is scheduled for the puzzle (essentially, if something about the
   * puzzle has changed, like its appearance or current animated state).
   *
   * Note:
   * - This may never resolve if the player never creates the relevant 3D object
   *   under the hood (e.g. if the config is set to 2D, or is not valid for
   *   rendering a puzzle)
   * - The architecture of `cubing.js` may change significantly, so it is not
   *   guaranteed that a `three.js` `Object3D` will be available from the main
   *   thread in the future.
   * - This function only returns the current `three.js` puzzle object (once one
   *   exists). If you change e.g. the `puzzle` config for the player, then the
   *   object will currently become stale. This may be replaced with more
   *   convenient behaviour in the future.
   *
   * @deprecated */
  async experimentalCurrentThreeJSPuzzleObject(puzzleRenderScheduledCallback) {
    this.connectedCallback();
    const sceneWrapper = await this.#initial3DVisualizationWrapper.promise;
    const puzzleWrapper = await sceneWrapper.experimentalTwisty3DPuzzleWrapper();
    const twisty3DPuzzlePromise = puzzleWrapper.twisty3DPuzzle();
    const safeToCallback = (async () => {
      await twisty3DPuzzlePromise;
      await new Promise((resolve) => setTimeout(resolve, 0));
    })();
    if (puzzleRenderScheduledCallback) {
      const scheduler = new RenderScheduler(async () => {
      });
      puzzleWrapper.addEventListener("render-scheduled", async () => {
        if (!scheduler.requestIsPending()) {
          scheduler.requestAnimFrame();
          await safeToCallback;
          puzzleRenderScheduledCallback();
        }
      });
    }
    return twisty3DPuzzlePromise;
  }
  jumpToStart(options) {
    this.controller.jumpToStart(options);
  }
  jumpToEnd(options) {
    this.controller.jumpToEnd(options);
  }
  play() {
    this.controller.togglePlay(true);
  }
  pause() {
    this.controller.togglePlay(false);
  }
  // Inspiration:
  // - https://developer.mozilla.org/en-US/docs/Web/API/Element/toggleAttribute (`force` argument)
  // - https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList/toggle (`force` argument)
  // We still provide `play()` and `pause()` individually for convenience, though.
  togglePlay(play) {
    this.controller.togglePlay(play);
  }
  // TODO: Animate the new move.
  // TODO: Automatically handle puzzle.
  experimentalAddMove(flexibleMove, options) {
    this.experimentalModel.experimentalAddMove(flexibleMove, options);
  }
  // TODO: Animate the new move.
  // TODO: Automatically handle puzzle.
  experimentalAddAlgLeaf(algLeaf, options) {
    this.experimentalModel.experimentalAddAlgLeaf(algLeaf, options);
  }
  static get observedAttributes() {
    const observed = [];
    for (const key of Object.keys(twistyPlayerAttributeMap)) {
      observed.push(key, DATA_ATTRIBUTE_PREFIX + key);
    }
    return observed;
  }
  experimentalRemoveFinalChild() {
    this.experimentalModel.experimentalRemoveFinalChild();
  }
  attributeChangedCallback(attributeName, _oldValue, newValue) {
    if (attributeName.startsWith(DATA_ATTRIBUTE_PREFIX)) {
      attributeName = attributeName.slice(DATA_ATTRIBUTE_PREFIX.length);
    }
    const setterName = twistyPlayerAttributeMap[attributeName];
    if (!setterName) {
      return;
    }
    this[setterName] = newValue;
  }
  // TODO: Make this more ergonomic and flexible.
  // TODO: dimensions.
  async experimentalScreenshot(options) {
    return (await screenshot(this.experimentalModel, options)).dataURL;
  }
  // TODO: Make this more ergonomic and flexible.
  // TODO: dimensions.
  async experimentalDownloadScreenshot(filename) {
    if (["2D", "experimental-2D-LL", "experimental-2D-LL-face"].includes(
      await this.experimentalModel.visualizationStrategy.get()
    )) {
      const wrapper2D = this.#visualizationWrapper;
      const twisty2DPuzzle = await wrapper2D.currentTwisty2DPuzzleWrapper().twisty2DPuzzle();
      const str = new XMLSerializer().serializeToString(
        twisty2DPuzzle.svgWrapper.svgElement
      );
      const url = URL.createObjectURL(new Blob([str]));
      downloadURL(
        url,
        filename ?? await getDefaultFilename(this.experimentalModel),
        "svg"
      );
    } else {
      await (await screenshot(this.experimentalModel)).download(filename);
    }
  }
};
customElementsShim.define("twisty-player", TwistyPlayer);

// src/cubing/twisty/views/TwistyAlgEditor/LeafTokens.ts
var LeafTokens = class extends TraversalDownUp {
  traverseAlg(alg, dataDown) {
    const algNodeArrays = [];
    let numMovesInside = 0;
    for (const algNode of alg.childAlgNodes()) {
      const dataUp = this.traverseAlgNode(algNode, {
        numMovesSoFar: dataDown.numMovesSoFar + numMovesInside
      });
      algNodeArrays.push(dataUp.tokens);
      numMovesInside += dataUp.numLeavesInside;
    }
    return {
      tokens: Array.prototype.concat(...algNodeArrays),
      numLeavesInside: numMovesInside
    };
  }
  traverseGrouping(grouping, dataDown) {
    const dataUp = this.traverseAlg(grouping.alg, dataDown);
    return {
      tokens: dataUp.tokens,
      numLeavesInside: dataUp.numLeavesInside * grouping.amount
    };
  }
  traverseMove(move, dataDown) {
    return {
      tokens: [
        {
          leaf: move,
          idx: dataDown.numMovesSoFar
        }
      ],
      numLeavesInside: 1
    };
  }
  traverseCommutator(commutator, dataDown) {
    const dataUpA = this.traverseAlg(commutator.A, dataDown);
    const dataUpB = this.traverseAlg(commutator.B, {
      numMovesSoFar: dataDown.numMovesSoFar + dataUpA.numLeavesInside
    });
    return {
      tokens: dataUpA.tokens.concat(dataUpB.tokens),
      numLeavesInside: dataUpA.numLeavesInside * 2 + dataUpB.numLeavesInside
    };
  }
  traverseConjugate(conjugate, dataDown) {
    const dataUpA = this.traverseAlg(conjugate.A, dataDown);
    const dataUpB = this.traverseAlg(conjugate.B, {
      numMovesSoFar: dataDown.numMovesSoFar + dataUpA.numLeavesInside
    });
    return {
      tokens: dataUpA.tokens.concat(dataUpB.tokens),
      numLeavesInside: dataUpA.numLeavesInside * 2 + dataUpB.numLeavesInside * 2
    };
  }
  traversePause(pause, dataDown) {
    return {
      tokens: [
        {
          leaf: pause,
          idx: dataDown.numMovesSoFar
        }
      ],
      numLeavesInside: 1
    };
  }
  traverseNewline(_newline, _dataDown) {
    return {
      tokens: [],
      numLeavesInside: 0
    };
  }
  traverseLineComment(_comment, _dataDown) {
    return {
      tokens: [],
      numLeavesInside: 0
    };
  }
};
var leafTokens = functionFromTraversal(LeafTokens);

// src/cubing/twisty/views/TwistyAlgEditor/model.ts
var TwistyAlgEditorValueProp = class extends SimpleTwistyPropSource {
  getDefaultValue() {
    return "";
  }
};
var AlgEditorAlgWithIssuesProp = class extends TwistyPropDerived {
  derive(input) {
    return algWithIssuesFromString(input.value);
  }
  // TODO: canReuse needs to take the source string into account.
};
var TwistyAlgEditorSelectionProp = class extends TwistyPropSource {
  getDefaultValue() {
    return {
      selectionStart: 0,
      selectionEnd: 0,
      endChangedMostRecently: false
    };
  }
  async derive(input, oldValue) {
    const { selectionStart, selectionEnd } = input;
    const lastResult = await oldValue;
    const endChangedMostRecently = input.selectionStart === lastResult.selectionStart && input.selectionEnd !== (await oldValue).selectionEnd;
    return {
      selectionStart,
      selectionEnd,
      endChangedMostRecently
    };
  }
};
var TargetCharProp = class extends TwistyPropDerived {
  derive(inputs) {
    return inputs.selectionInfo.endChangedMostRecently ? inputs.selectionInfo.selectionEnd : inputs.selectionInfo.selectionStart;
  }
};
var LeafTokensProp = class extends TwistyPropDerived {
  derive(inputs) {
    return leafTokens(inputs.algWithIssues.alg, {
      numMovesSoFar: 0
    }).tokens;
  }
};
var LeafToHighlightProp = class extends TwistyPropDerived {
  derive(inputs) {
    function withWhere(leafInfo) {
      if (leafInfo === null) {
        return null;
      }
      let where;
      if (inputs.targetChar < leafInfo.leaf[startCharIndexKey]) {
        where = "before";
      } else if (inputs.targetChar === leafInfo.leaf[startCharIndexKey]) {
        where = "start";
      } else if (inputs.targetChar < leafInfo.leaf[endCharIndexKey]) {
        where = "inside";
      } else if (inputs.targetChar === leafInfo.leaf[endCharIndexKey]) {
        where = "end";
      } else {
        where = "after";
      }
      return {
        leafInfo,
        where
      };
    }
    let lastLeafInfo = null;
    for (const leafInfo of inputs.leafTokens) {
      if (inputs.targetChar < leafInfo.leaf[startCharIndexKey] && lastLeafInfo !== null) {
        return withWhere(lastLeafInfo);
      }
      if (inputs.targetChar <= leafInfo.leaf[endCharIndexKey]) {
        return withWhere(leafInfo);
      }
      lastLeafInfo = leafInfo;
    }
    return withWhere(lastLeafInfo);
  }
};
var TwistyAlgEditorModel = class {
  valueProp = new TwistyAlgEditorValueProp();
  selectionProp = new TwistyAlgEditorSelectionProp();
  targetCharProp = new TargetCharProp({ selectionInfo: this.selectionProp });
  algEditorAlgWithIssues = new AlgEditorAlgWithIssuesProp({
    value: this.valueProp
  });
  leafTokensProp = new LeafTokensProp({
    algWithIssues: this.algEditorAlgWithIssues
  });
  leafToHighlight = new LeafToHighlightProp({
    leafTokens: this.leafTokensProp,
    targetChar: this.targetCharProp
  });
};

// src/cubing/twisty/views/TwistyAlgEditor/paste.ts
var COMMENT_DELIMITER = "//";
function maybeParse(str) {
  try {
    return Alg.fromString(str);
  } catch {
    return null;
  }
}
function sliceBeforeFirstOccurrence(str, delimiter) {
  const idx = str.indexOf(delimiter);
  if (idx === -1) {
    return [str, ""];
  }
  return [str.slice(0, idx), str.slice(idx)];
}
function replaceSmartQuotesOutsideComments(str) {
  const linesOut = [];
  for (const line of str.split("\n")) {
    let [before, after] = sliceBeforeFirstOccurrence(line, COMMENT_DELIMITER);
    before = before.replaceAll("\u2019", "'");
    linesOut.push(before + after);
  }
  return linesOut.join("\n");
}
function pasteIntoTextArea(textArea, pastedText) {
  const { value: oldValue } = textArea;
  const { selectionStart, selectionEnd } = textArea;
  const textPrecedingSelection = oldValue.slice(0, selectionStart);
  const textFollowingSelection = oldValue.slice(selectionEnd);
  pastedText = pastedText.replaceAll("\r\n", "\n");
  const selectionStartsInExistingComment = textPrecedingSelection.match(/\/\/[^\n]*$/);
  const pasteCreatesStartingComment = oldValue[selectionStart - 1] === "/" && pastedText[0] === "/";
  const pasteStartsWithCommentText = selectionStartsInExistingComment || pasteCreatesStartingComment;
  const pasteEndsWithComment = pastedText.match(/\/\/[^\n]*$/);
  let replacement = pastedText;
  if (pasteStartsWithCommentText) {
    const [before, after] = sliceBeforeFirstOccurrence(pastedText, "\n");
    replacement = before + replaceSmartQuotesOutsideComments(after);
  } else {
    replacement = replaceSmartQuotesOutsideComments(pastedText);
  }
  const tryAddSpaceBefore = !pasteStartsWithCommentText && selectionStart !== 0 && // Not at text start
  !["\n", " "].includes(replacement[0]) && !["\n", " "].includes(oldValue[selectionStart - 1]);
  const tryAddSpaceAfter = !pasteEndsWithComment && selectionEnd !== oldValue.length && // Not at text end
  !["\n", " "].includes(replacement.at(-1)) && !["\n", " "].includes(oldValue[selectionEnd]);
  function adoptSpacingIfValid(prefix, suffix) {
    const candidate = prefix + replacement + suffix;
    const valid = !!maybeParse(
      textPrecedingSelection + candidate + textFollowingSelection
    );
    if (valid) {
      replacement = candidate;
    }
    return valid;
  }
  tryAddSpaceBefore && tryAddSpaceAfter && adoptSpacingIfValid(" ", " ") || // Paste "R U R' U'" over " " in "F F'" to create "F R U R' U' F'"
  tryAddSpaceBefore && adoptSpacingIfValid(" ", "") || // Paste "U" after "R'" in "R' L'" to create "R' U L'"
  tryAddSpaceAfter && adoptSpacingIfValid("", " ");
  const execCommandSuccess = globalSafeDocument?.execCommand(
    "insertText",
    false,
    replacement
  );
  if (!execCommandSuccess) {
    textArea.setRangeText(replacement, selectionStart, selectionEnd, "end");
  }
}

// src/cubing/twisty/views/TwistyAlgEditor/TwistyAlgEditor.css.ts
var twistyAlgEditorCSS = new cssStyleSheetShim();
twistyAlgEditorCSS.replaceSync(
  `
:host {
  width: 384px;
  display: grid;
}

.wrapper {
  /*overflow: hidden;
  resize: horizontal;*/

  background: var(--background, none);
  display: grid;
}

textarea, .carbon-copy {
  grid-area: 1 / 1 / 2 / 2;

  width: 100%;
  font-family: sans-serif;
  line-height: 1.2em;

  font-size: var(--font-size, inherit);
  font-family: var(--font-family, sans-serif);

  box-sizing: border-box;

  padding: var(--padding, 0.5em);
  /* Prevent horizontal growth. */
  overflow-x: hidden;
}

textarea {
  resize: none;
  background: none;
  z-index: 2;
  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.25));
  overflow: hidden;
}

.carbon-copy {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: transparent;
  user-select: none;
  pointer-events: none;

  z-index: 1;
}

.carbon-copy .highlight {
  background: var(--highlight-color, rgba(255, 128, 0, 0.5));
  padding: 0.1em 0.2em;
  margin: -0.1em -0.2em;
  border-radius: 0.2em;
}

.wrapper.issue-warning textarea,
.wrapper.valid-for-puzzle-warning textarea {
  outline: none;
  border: 1px solid rgba(200, 200, 0, 0.5);
  background: rgba(255, 255, 0, 0.1);
}

.wrapper.issue-error textarea,
.wrapper.valid-for-puzzle-error textarea {
  outline: none;
  border: 1px solid red;
  background: rgba(255, 0, 0, 0.1);
}
`
);

// src/cubing/twisty/views/TwistyAlgEditor/TwistyAlgEditor.ts
var ATTRIBUTE_FOR_TWISTY_PLAYER = "for-twisty-player";
var ATTRIBUTE_PLACEHOLDER = "placeholder";
var ATTRIBUTE_TWISTY_PLAYER_PROP = "twisty-player-prop";
var TwistyAlgEditor = class extends ManagedCustomElement {
  model = new TwistyAlgEditorModel();
  // #alg: Alg = new Alg();
  #textarea = document.createElement("textarea");
  #carbonCopy = document.createElement("div");
  #carbonCopyPrefix = document.createElement("span");
  #carbonCopyHighlight = document.createElement("span");
  #carbonCopySuffix = document.createElement("span");
  // #textareaClassListManager: ClassListManager<"none" | "warning" | "error"> =
  //   new ClassListManager(this, "issue-", ["none", "warning", "error"]);
  #textareaClassListValidForPuzzleManager = new ClassListManager(this, "valid-for-puzzle-", [
    "none",
    "warning",
    "error"
  ]);
  #twistyPlayer = null;
  #twistyPlayerProp;
  get #algProp() {
    if (this.#twistyPlayer === null) {
      return null;
    } else {
      return this.#twistyPlayer.experimentalModel[this.#twistyPlayerProp];
    }
  }
  // Temporary Workaround for Twizzle Explorer
  debugNeverRequestTimestamp = false;
  constructor(options) {
    super();
    this.#carbonCopy.classList.add("carbon-copy");
    this.addElement(this.#carbonCopy);
    this.#textarea.rows = 1;
    this.addElement(this.#textarea);
    this.#carbonCopyPrefix.classList.add("prefix");
    this.#carbonCopy.appendChild(this.#carbonCopyPrefix);
    this.#carbonCopyHighlight.classList.add("highlight");
    this.#carbonCopy.appendChild(this.#carbonCopyHighlight);
    this.#carbonCopySuffix.classList.add("suffix");
    this.#carbonCopy.appendChild(this.#carbonCopySuffix);
    this.#textarea.placeholder = "Alg";
    this.#textarea.setAttribute("spellcheck", "false");
    this.addCSS(twistyAlgEditorCSS);
    this.#textarea.addEventListener("input", () => {
      this.#onInputHasFired = true;
      this.onInput();
    });
    this.#textarea.addEventListener("blur", () => this.onBlur());
    document.addEventListener(
      "selectionchange",
      () => this.onSelectionChange()
    );
    if (options?.twistyPlayer) {
      this.twistyPlayer = options.twistyPlayer;
    }
    this.#twistyPlayerProp = options?.twistyPlayerProp ?? "alg";
    if (options?.twistyPlayerProp === "alg") {
      this.model.leafToHighlight.addFreshListener(
        (highlightInfo) => {
          if (highlightInfo) {
            this.highlightLeaf(highlightInfo.leafInfo.leaf);
          }
        }
      );
    }
  }
  connectedCallback() {
    this.#textarea.addEventListener("paste", (e) => {
      const text = e.clipboardData?.getData("text");
      if (text) {
        pasteIntoTextArea(this.#textarea, text);
        e.preventDefault();
        this.onInput();
      }
    });
  }
  // TODO
  set algString(s) {
    this.#textarea.value = s;
    this.onInput();
  }
  // TODO: remove?
  get algString() {
    return this.#textarea.value;
  }
  // To we need a getter?
  set placeholder(placeholderText) {
    this.#textarea.placeholder = placeholderText;
  }
  #onInputHasFired = false;
  onInput() {
    this.#carbonCopyHighlight.hidden = true;
    this.highlightLeaf(null);
    const endTrimmed = this.#textarea.value.trimEnd();
    this.model.valueProp.set(endTrimmed);
    this.#algProp?.set(endTrimmed);
  }
  async onSelectionChange() {
    if (document.activeElement !== this || this.shadow.activeElement !== this.#textarea) {
      return;
    }
    if (this.#twistyPlayerProp !== "alg") {
      return;
    }
    const { selectionStart, selectionEnd } = this.#textarea;
    this.model.selectionProp.set({
      selectionStart,
      selectionEnd
    });
  }
  async onBlur() {
  }
  setAlgIssueClassForPuzzle(issues) {
    this.#textareaClassListValidForPuzzleManager.setValue(issues);
  }
  // `white-space: pre;` mostly matches the formatting of the `<textarea>`, *except* when we end with a newline.
  // So we add an space to ensure that there is a character on the final line (that is very unlikely to trigger extra line wrapping).
  #padSuffix(s) {
    return s.endsWith("\n") ? `${s} ` : s;
  }
  #highlightedLeaf = null;
  // TODO: support a primary highlighted move and secondary ones.
  highlightLeaf(leaf) {
    if (leaf === null) {
      this.#carbonCopyPrefix.textContent = "";
      this.#carbonCopyHighlight.textContent = "";
      this.#carbonCopySuffix.textContent = this.#padSuffix(
        this.#textarea.value
      );
      return;
    }
    if (leaf === this.#highlightedLeaf) {
      return;
    }
    this.#highlightedLeaf = leaf;
    this.#carbonCopyPrefix.textContent = this.#textarea.value.slice(
      0,
      leaf[startCharIndexKey]
    );
    this.#carbonCopyHighlight.textContent = this.#textarea.value.slice(
      leaf[startCharIndexKey],
      leaf[endCharIndexKey]
    );
    this.#carbonCopySuffix.textContent = this.#padSuffix(
      this.#textarea.value.slice(leaf[endCharIndexKey])
    );
    this.#carbonCopyHighlight.hidden = false;
  }
  get twistyPlayer() {
    return this.#twistyPlayer;
  }
  // TODO: spread out this impl over private methods instead of self-listeners.
  set twistyPlayer(twistyPlayer) {
    if (this.#twistyPlayer) {
      console.warn("twisty-player reassignment/clearing is not supported");
      return;
    }
    this.#twistyPlayer = twistyPlayer;
    if (!twistyPlayer) {
      return;
    }
    void (async () => {
      this.algString = this.#algProp ? (await this.#algProp.get()).alg.toString() : "";
    })();
    if (this.#twistyPlayerProp === "alg") {
      this.#twistyPlayer?.experimentalModel.puzzleAlg.addFreshListener(
        (algWithIssues) => {
          if (algWithIssues.issues.errors.length === 0) {
            this.setAlgIssueClassForPuzzle(
              // TODO: Allow trailing spaces.
              algWithIssues.issues.warnings.length === 0 ? "none" : "warning"
            );
            const newAlg = algWithIssues.alg;
            const oldAlg = Alg.fromString(this.algString);
            if (!newAlg.isIdentical(oldAlg)) {
              this.algString = newAlg.toString();
              this.onInput();
            } else {
            }
          } else {
            this.setAlgIssueClassForPuzzle("error");
          }
        }
      );
      this.model.leafToHighlight.addFreshListener(
        async (highlightInfo) => {
          if (highlightInfo === null) {
            return;
          }
          const [indexer, timestampRequest] = await Promise.all([
            await twistyPlayer.experimentalModel.indexer.get(),
            await twistyPlayer.experimentalModel.timestampRequest.get()
          ]);
          if (timestampRequest === "auto" && !this.#onInputHasFired) {
            return;
          }
          const moveStartTimestamp = indexer.indexToMoveStartTimestamp(
            highlightInfo.leafInfo.idx
          );
          const duration = indexer.moveDuration(highlightInfo.leafInfo.idx);
          let newTimestamp;
          switch (highlightInfo.where) {
            case "before": {
              newTimestamp = moveStartTimestamp;
              break;
            }
            case "start":
            case "inside": {
              newTimestamp = moveStartTimestamp + duration / 4;
              break;
            }
            case "end":
            case "after": {
              newTimestamp = moveStartTimestamp + duration;
              break;
            }
            default:
              console.log("invalid where");
              throw new Error("Invalid where!");
          }
          if (!this.debugNeverRequestTimestamp) {
            twistyPlayer.experimentalModel.timestampRequest.set(newTimestamp);
          }
        }
      );
      twistyPlayer.experimentalModel.currentLeavesSimplified.addFreshListener(
        async (currentLeavesSimplified) => {
          const indexer = await twistyPlayer.experimentalModel.indexer.get();
          const leaf = indexer.getAnimLeaf(
            currentLeavesSimplified.patternIndex
          );
          this.highlightLeaf(leaf);
        }
      );
    }
  }
  attributeChangedCallback(attributeName, _oldValue, newValue) {
    switch (attributeName) {
      case ATTRIBUTE_FOR_TWISTY_PLAYER: {
        const elem = document.getElementById(newValue);
        if (!elem) {
          console.warn(`${ATTRIBUTE_FOR_TWISTY_PLAYER}= elem does not exist`);
          return;
        }
        if (!(elem instanceof TwistyPlayer)) {
          console.warn(`${ATTRIBUTE_FOR_TWISTY_PLAYER}=is not a twisty-player`);
          return;
        }
        this.twistyPlayer = elem;
        return;
      }
      case ATTRIBUTE_PLACEHOLDER: {
        this.placeholder = newValue;
        return;
      }
      case ATTRIBUTE_TWISTY_PLAYER_PROP: {
        if (this.#twistyPlayer) {
          console.log("cannot set prop");
          throw new Error("cannot set prop after twisty player");
        }
        this.#twistyPlayerProp = newValue;
        return;
      }
    }
  }
  static get observedAttributes() {
    return [
      ATTRIBUTE_FOR_TWISTY_PLAYER,
      ATTRIBUTE_PLACEHOLDER,
      ATTRIBUTE_TWISTY_PLAYER_PROP
    ];
  }
};
customElementsShim.define("twisty-alg-editor", TwistyAlgEditor);

// src/cubing/twisty/views/firstElementWithId.ts
async function firstElementWithId(id) {
  return new Promise((resolve, reject) => {
    try {
      const currentElem = document.getElementById(id);
      if (currentElem) {
        resolve(currentElem);
      }
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.attributeName === "id" && mutation.target instanceof Element && mutation.target.getAttribute("id") === id) {
            resolve(mutation.target);
            observer.disconnect();
          }
        }
      });
      observer.observe(document.body, {
        attributeFilter: ["id"],
        subtree: true
      });
    } catch (e) {
      reject(e);
    }
  });
}

// src/cubing/twisty/views/TwistyAlgViewer.css.ts
var twistyAlgViewerCSS = new cssStyleSheetShim();
twistyAlgViewerCSS.replaceSync(
  `
:host {
  display: inline;
}

.wrapper {
  display: inline;
}

a:not(:hover) {
  color: inherit;
  text-decoration: none;
}

twisty-alg-leaf-elem.twisty-alg-comment {
  color: rgba(0, 0, 0, 0.4);
}

.wrapper.current-move {
  background: rgba(66, 133, 244, 0.3);
  margin-left: -0.1em;
  margin-right: -0.1em;
  padding-left: 0.1em;
  padding-right: 0.1em;
  border-radius: 0.1em;
}
`
);

// src/cubing/twisty/views/TwistyAlgViewer.ts
var DEFAULT_OFFSET_FRACTION = 0.25;
var TwistyAlgLeafElem = class extends ManagedCustomElement {
  constructor(className, text, dataDown, algOrAlgNode, offsetIntoMove, clickable) {
    super({ mode: "open" });
    this.algOrAlgNode = algOrAlgNode;
    this.classList.add(className);
    this.addCSS(twistyAlgViewerCSS);
    if (clickable) {
      const anchor = this.contentWrapper.appendChild(
        document.createElement("a")
      );
      anchor.href = "#";
      anchor.textContent = text;
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        void dataDown.twistyAlgViewer.jumpToIndex(
          dataDown.earliestMoveIndex,
          offsetIntoMove
        );
      });
    } else {
      this.contentWrapper.appendChild(
        document.createElement("span")
      ).textContent = text;
    }
  }
  pathToIndex(_index) {
    return [];
  }
  setCurrentMove(current) {
    this.contentWrapper.classList.toggle("current-move", current);
  }
};
customElementsShim.define("twisty-alg-leaf-elem", TwistyAlgLeafElem);
var TwistyAlgWrapperElem = class extends HTMLElementShim {
  constructor(className, algOrAlgNode) {
    super();
    this.algOrAlgNode = algOrAlgNode;
    this.classList.add(className);
  }
  queue = [];
  addString(str) {
    this.queue.push(document.createTextNode(str));
  }
  addElem(dataUp) {
    this.queue.push(dataUp.element);
    return dataUp.moveCount;
  }
  flushQueue(direction = 1 /* Forwards */) {
    for (const node of maybeReverseList(this.queue, direction)) {
      this.append(node);
    }
    this.queue = [];
  }
  pathToIndex(_index) {
    return [];
  }
};
customElementsShim.define("twisty-alg-wrapper-elem", TwistyAlgWrapperElem);
function oppositeDirection(direction) {
  return direction === 1 /* Forwards */ ? -1 /* Backwards */ : 1 /* Forwards */;
}
function updateDirectionByAmount(currentDirection, amount) {
  return amount < 0 ? oppositeDirection(currentDirection) : currentDirection;
}
function maybeReverseList(l, direction) {
  if (direction === 1 /* Forwards */) {
    return l;
  }
  const copy = Array.from(l);
  copy.reverse();
  return copy;
}
var AlgToDOMTree = class extends TraversalDownUp {
  traverseAlg(alg, dataDown) {
    let moveCount = 0;
    const element = new TwistyAlgWrapperElem("twisty-alg-alg", alg);
    let first = true;
    for (const algNode of direct(
      alg.childAlgNodes(),
      dataDown.direction
    )) {
      if (!first) {
        element.addString(" ");
      }
      first = false;
      if (algNode.as(Pause)?.experimentalNISSGrouping) {
        element.addString("^(");
      }
      if (!algNode.as(Grouping)?.experimentalNISSPlaceholder) {
        moveCount += element.addElem(
          this.traverseAlgNode(algNode, {
            earliestMoveIndex: dataDown.earliestMoveIndex + moveCount,
            twistyAlgViewer: dataDown.twistyAlgViewer,
            direction: dataDown.direction
          })
        );
      }
      if (algNode.as(Pause)?.experimentalNISSGrouping) {
        element.addString(")");
      }
    }
    element.flushQueue(dataDown.direction);
    return {
      moveCount,
      element
    };
  }
  traverseGrouping(grouping, dataDown) {
    const square1Tuple = grouping.experimentalAsSquare1Tuple();
    const direction = updateDirectionByAmount(
      dataDown.direction,
      grouping.amount
    );
    let moveCount = 0;
    const element = new TwistyAlgWrapperElem("twisty-alg-grouping", grouping);
    element.addString("(");
    if (square1Tuple) {
      moveCount += element.addElem({
        moveCount: 1,
        element: new TwistyAlgLeafElem(
          "twisty-alg-move",
          // TODO: Mark the tuple with a special class?
          square1Tuple[0].amount.toString(),
          dataDown,
          square1Tuple[0],
          true,
          true
        )
      });
      element.addString(", ");
      moveCount += element.addElem({
        moveCount: 1,
        element: new TwistyAlgLeafElem(
          "twisty-alg-move",
          // TODO: Mark the tuple with a special class?
          square1Tuple[1].amount.toString(),
          dataDown,
          square1Tuple[1],
          true,
          true
        )
      });
    } else {
      moveCount += element.addElem(
        this.traverseAlg(grouping.alg, {
          earliestMoveIndex: dataDown.earliestMoveIndex + moveCount,
          twistyAlgViewer: dataDown.twistyAlgViewer,
          direction
        })
      );
    }
    element.addString(`)${grouping.experimentalRepetitionSuffix}`);
    element.flushQueue();
    return {
      moveCount: moveCount * Math.abs(grouping.amount),
      element
    };
  }
  traverseMove(move, dataDown) {
    const element = new TwistyAlgLeafElem(
      "twisty-alg-move",
      move.toString(),
      dataDown,
      move,
      true,
      true
    );
    dataDown.twistyAlgViewer.highlighter.addMove(
      move[startCharIndexKey],
      element
    );
    return {
      moveCount: 1,
      element
    };
  }
  traverseCommutator(commutator, dataDown) {
    let moveCount = 0;
    const element = new TwistyAlgWrapperElem(
      "twisty-alg-commutator",
      commutator
    );
    element.addString("[");
    element.flushQueue();
    const [first, second] = maybeReverseList(
      [commutator.A, commutator.B],
      dataDown.direction
    );
    moveCount += element.addElem(
      this.traverseAlg(first, {
        earliestMoveIndex: dataDown.earliestMoveIndex + moveCount,
        twistyAlgViewer: dataDown.twistyAlgViewer,
        direction: dataDown.direction
      })
    );
    element.addString(", ");
    moveCount += element.addElem(
      this.traverseAlg(second, {
        earliestMoveIndex: dataDown.earliestMoveIndex + moveCount,
        twistyAlgViewer: dataDown.twistyAlgViewer,
        direction: dataDown.direction
      })
    );
    element.flushQueue(dataDown.direction);
    element.addString("]");
    element.flushQueue();
    return {
      moveCount: moveCount * 2,
      element
    };
  }
  traverseConjugate(conjugate, dataDown) {
    let moveCount = 0;
    const element = new TwistyAlgWrapperElem("twisty-alg-conjugate", conjugate);
    element.addString("[");
    const aLen = element.addElem(
      this.traverseAlg(conjugate.A, {
        earliestMoveIndex: dataDown.earliestMoveIndex + moveCount,
        twistyAlgViewer: dataDown.twistyAlgViewer,
        direction: dataDown.direction
      })
    );
    moveCount += aLen;
    element.addString(": ");
    moveCount += element.addElem(
      this.traverseAlg(conjugate.B, {
        earliestMoveIndex: dataDown.earliestMoveIndex + moveCount,
        twistyAlgViewer: dataDown.twistyAlgViewer,
        direction: dataDown.direction
      })
    );
    element.addString("]");
    element.flushQueue();
    return {
      moveCount: moveCount + aLen,
      element
    };
  }
  traversePause(pause, dataDown) {
    if (pause.experimentalNISSGrouping) {
      return this.traverseAlg(pause.experimentalNISSGrouping.alg, dataDown);
    }
    return {
      moveCount: 1,
      element: new TwistyAlgLeafElem(
        "twisty-alg-pause",
        ".",
        dataDown,
        pause,
        true,
        true
      )
    };
  }
  traverseNewline(newline, _dataDown) {
    const element = new TwistyAlgWrapperElem("twisty-alg-newline", newline);
    element.append(document.createElement("br"));
    return {
      moveCount: 0,
      element
    };
  }
  traverseLineComment(lineComment, dataDown) {
    return {
      moveCount: 0,
      element: new TwistyAlgLeafElem(
        "twisty-alg-line-comment",
        `//${lineComment.text}`,
        dataDown,
        lineComment,
        false,
        false
      )
    };
  }
};
var algToDOMTree = functionFromTraversal(AlgToDOMTree);
var MoveHighlighter = class {
  moveCharIndexMap = /* @__PURE__ */ new Map();
  currentElem = null;
  addMove(charIndex, elem) {
    this.moveCharIndexMap.set(charIndex, elem);
  }
  set(move) {
    const newElem = move ? this.moveCharIndexMap.get(move[startCharIndexKey]) ?? null : null;
    if (this.currentElem === newElem) {
      return;
    }
    this.currentElem?.classList.remove("twisty-alg-current-move");
    this.currentElem?.setCurrentMove(false);
    newElem?.classList.add("twisty-alg-current-move");
    newElem?.setCurrentMove(true);
    this.currentElem = newElem;
  }
};
var TwistyAlgViewer = class extends HTMLElementShim {
  highlighter = new MoveHighlighter();
  #domTree;
  #twistyPlayer = null;
  lastClickTimestamp = null;
  constructor(options) {
    super();
    if (options?.twistyPlayer) {
      this.twistyPlayer = options?.twistyPlayer;
    }
  }
  connectedCallback() {
  }
  setAlg(alg) {
    this.#domTree = algToDOMTree(alg, {
      earliestMoveIndex: 0,
      twistyAlgViewer: this,
      direction: 1 /* Forwards */
    }).element;
    this.textContent = "";
    this.appendChild(this.#domTree);
  }
  get twistyPlayer() {
    return this.#twistyPlayer;
  }
  set twistyPlayer(twistyPlayer) {
    void this.#setTwistyPlayer(twistyPlayer);
  }
  async #setTwistyPlayer(twistyPlayer) {
    if (this.#twistyPlayer) {
      console.warn("twisty-player reassignment is not supported");
      return;
    }
    if (twistyPlayer === null) {
      throw new Error("clearing twistyPlayer is not supported");
    }
    this.#twistyPlayer = twistyPlayer;
    this.#twistyPlayer.experimentalModel.alg.addFreshListener(
      (algWithIssues) => {
        this.setAlg(algWithIssues.alg);
      }
    );
    const sourceAlg = (await this.#twistyPlayer.experimentalModel.alg.get()).alg;
    const parsedAlg = startCharIndexKey in sourceAlg ? sourceAlg : Alg.fromString(sourceAlg.toString());
    this.setAlg(parsedAlg);
    twistyPlayer.experimentalModel.currentMoveInfo.addFreshListener(
      (currentMoveInfo) => {
        let moveInfo = currentMoveInfo.currentMoves[0];
        moveInfo ??= currentMoveInfo.movesStarting[0];
        moveInfo ??= currentMoveInfo.movesFinishing[0];
        if (!moveInfo) {
          this.highlighter.set(null);
        } else {
          const mainCurrentMove = moveInfo.move;
          this.highlighter.set(mainCurrentMove);
        }
      }
    );
    twistyPlayer.experimentalModel.detailedTimelineInfo.addFreshListener(
      (detailedTimelineInfo) => {
        if (detailedTimelineInfo.timestamp !== this.lastClickTimestamp) {
          this.lastClickTimestamp = null;
        }
      }
    );
  }
  async jumpToIndex(index, offsetIntoMove) {
    const twistyPlayer = this.#twistyPlayer;
    if (twistyPlayer) {
      twistyPlayer.pause();
      const timestampPromise = (async () => {
        const indexer = await twistyPlayer.experimentalModel.indexer.get();
        const offset = offsetIntoMove ? indexer.moveDuration(index) * DEFAULT_OFFSET_FRACTION : 0;
        return indexer.indexToMoveStartTimestamp(index) + indexer.moveDuration(index) - offset;
      })();
      twistyPlayer.experimentalModel.timestampRequest.set(
        await timestampPromise
        // TODO
      );
      if (this.lastClickTimestamp === await timestampPromise) {
        twistyPlayer.play();
        this.lastClickTimestamp = null;
      } else {
        this.lastClickTimestamp = await timestampPromise;
      }
    }
  }
  async attributeChangedCallback(attributeName, _oldValue, newValue) {
    if (attributeName === "for") {
      let elem = document.getElementById(newValue);
      if (!elem) {
        console.info("for= elem does not exist, waiting for one");
      }
      await customElements.whenDefined("twisty-player");
      elem = await firstElementWithId(newValue);
      if (!(elem instanceof TwistyPlayer)) {
        console.warn("for= elem is not a twisty-player");
        return;
      }
      this.twistyPlayer = elem;
    }
  }
  static get observedAttributes() {
    return ["for"];
  }
};
customElementsShim.define("twisty-alg-viewer", TwistyAlgViewer);

// src/cubing/twisty/views/twizzle/TwizzleLink.css.ts
var twizzleLinkCSS = new cssStyleSheetShim();
twizzleLinkCSS.replaceSync(
  `
.wrapper {
  background: rgb(255, 245, 235);
  border: 1px solid rgba(0, 0, 0, 0.25);

  /* Workaround from https://stackoverflow.com/questions/40010597/how-do-i-apply-opacity-to-a-css-color-variable */
  --text-color: 0, 0, 0;
  --heading-background: 255, 230, 210;

  color: rgb(var(--text-color));
}

.setup-alg, twisty-alg-viewer {
  padding: 0.5em 1em;
}

.heading {
  background: rgba(var(--heading-background), 1);
  color: rgba(var(--text-color), 1);
  font-weight: bold;
  padding: 0.25em 0.5em;
  display: grid;
  grid-template-columns: auto 1fr;

  /* For the move count hover elems. */
  position: sticky;
}

.heading.title {
  background: rgb(255, 245, 235);
  font-size: 150%;
  white-space: pre-wrap;
}

.heading .move-count {
  font-weight: initial;
  text-align: right;
  color: rgba(var(--text-color), 0.4);
}

.wrapper.dark-mode .heading .move-count {
  color: rgba(var(--text-color), 0.7);
}

.heading a {
  text-decoration: none;
  color: inherit;
}

twisty-player {
  width: 100%;
  min-height: 128px;
  height: 288px;
  resize: vertical;
  overflow-y: hidden;
}

twisty-player + .heading {
  padding-top: 0.5em;
}

twisty-alg-viewer {
  display: inline-block;
}

.wrapper {
  container-type: inline-size;
}

.scrollable-region {
  border-top: 1px solid rgba(0, 0, 0, 0.25);
}

.scrollable-region {
  max-height: 18em;
  overflow-y: auto;
}

@container (min-width: 512px) {
  .responsive-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  twisty-player {
    height: 320px
  }
  .scrollable-region {
    border-top: none;
    border-left: 1px solid rgba(0, 0, 0, 0.25);
    contain: strict;
    max-height: 100cqh;
  }
}

.wrapper:fullscreen,
.wrapper:fullscreen .responsive-wrapper {
  width: 100%;
  height: 100%;
}

.wrapper:fullscreen twisty-player,
.wrapper:fullscreen .scrollable-region {
  height: 50%;
}

@container (min-width: 512px) {
  .wrapper:fullscreen twisty-player,
  .wrapper:fullscreen .scrollable-region {
    height: 100%;
  }
}

/* TODO: dedup with Twizzle Editor */
.move-count > span:hover:before {
  background-color: rgba(var(--heading-background), 1);
  color: rgba(var(--text-color), 1);
  backdrop-filter: blur(4px);
  z-index: 100;
  position: absolute;
  padding: 0.5em;
  top: 1.5em;
  right: 0;
  content: attr(data-before);
  white-space: pre-wrap;
  text-align: left;
}

.move-count > span:hover {
  color: rgba(var(--text-color), 1);
  cursor: help;
}
`
);
var twizzleLinkForumTweaksCSS = new cssStyleSheetShim();
twizzleLinkForumTweaksCSS.replaceSync(`
.wrapper {
  background: white;
  --heading-background: 232, 239, 253
}

.wrapper.dark-mode {
  --text-color: 236, 236, 236;
  --heading-background: 29, 29, 29;
}

.scrollable-region {
  overflow-y: auto;
}

.wrapper.dark-mode {
  background: #262626;
  --text-color: 142, 142, 142;
  border-color: #FFFFFF44;
  color-scheme: dark;
}

.wrapper.dark-mode .heading:not(.title) {
  background: #1d1d1d;
}

.heading.title {
  background: none;
}
`);

// src/cubing/twisty/views/twizzle/url-params.ts
function getConfigFromURL(prefix = "", url = location.href) {
  const paramMapping = {
    alg: "alg",
    "setup-alg": "experimental-setup-alg",
    "setup-anchor": "experimental-setup-anchor",
    puzzle: "puzzle",
    stickering: "experimental-stickering",
    "puzzle-description": "experimental-puzzle-description",
    title: "experimental-title",
    "video-url": "experimental-video-url",
    competition: "experimental-competition-id"
  };
  const params = new URL(url).searchParams;
  const config = {};
  for (const [ourParam, twistyPlayerParam] of Object.entries(paramMapping)) {
    const paramValue = params.get(prefix + ourParam);
    if (paramValue !== null) {
      const configKey = twistyPlayerAttributeMap[twistyPlayerParam];
      config[configKey] = paramValue;
    }
  }
  return config;
}

// src/cubing/twisty/views/twizzle/TwizzleLink.ts
var OUTER_BLOCK_MOVES_EXPLANATION = "outer block moves (e.g. R, Rw, or 4r)";
var INNER_BLOCK_MOVES_EXPLANATION = "inner block moves (e.g. M or 2-5r)";
var METRIC_EXPLANATIONS = {
  ["OBTM" /* OuterBlockTurnMetric */]: `HTM = OBTM ("Outer Block Turn Metric"):
\u2022 ${INNER_BLOCK_MOVES_EXPLANATION} count as 2 turns
\u2022 ${OUTER_BLOCK_MOVES_EXPLANATION} count as 1 turn
\u2022 rotations (e.g. x) count as 0 turns`,
  ["OBQTM" /* OuterBlockQuantumTurnMetric */]: `QTM = OBQTM ("Outer Block Quantum Turn Metric"):
\u2022 ${INNER_BLOCK_MOVES_EXPLANATION} count as 2 turns per quantum (e.g. M2 counts as 4)
\u2022 ${OUTER_BLOCK_MOVES_EXPLANATION} count as 1 turn per quantum (e.g. R2 counts as 2)
\u2022 rotations (e.g. x) count as 0 turns`,
  ["RBTM" /* RangeBlockTurnMetric */]: `STM = RBTM ("Range Block Turn Metric"):
\u2022 ${INNER_BLOCK_MOVES_EXPLANATION} count as 1 turn
\u2022 ${OUTER_BLOCK_MOVES_EXPLANATION} count as 1 turn
\u2022 rotations (e.g. x) count as 0 turns`,
  ["RBQTM" /* RangeBlockQuantumTurnMetric */]: `SQTM = RBQTM ("Range Block Quantum Turn Metric"):
\u2022 ${INNER_BLOCK_MOVES_EXPLANATION} count as 1 turn per quantum (e.g. M2 counts as 2)
\u2022 ${OUTER_BLOCK_MOVES_EXPLANATION} count as 1 turn per quantum (e.g. R2 counts as 2)
\u2022 rotations (e.g. x) count as 0 turns`,
  ["ETM" /* ExecutionTurnMetric */]: `ETM ("Execution Turn Metric"):
\u2022 all moves (including rotations) count as 1 turn`
};
var CONSISTENT_METRIC_ABBREVIATIONS = {
  ["OBTM" /* OuterBlockTurnMetric */]: "OB",
  ["OBQTM" /* OuterBlockQuantumTurnMetric */]: "OBQ",
  ["RBTM" /* RangeBlockTurnMetric */]: "RB",
  ["RBQTM" /* RangeBlockQuantumTurnMetric */]: "RBQ",
  ["ETM" /* ExecutionTurnMetric */]: "E"
};
var TwizzleLink = class extends ManagedCustomElement {
  constructor(options) {
    super({ mode: "open" });
    this.options = options;
  }
  twistyPlayer = null;
  a = null;
  #fallback() {
    this.contentWrapper.textContent = "";
    if (this.a) {
      const span = this.contentWrapper.appendChild(
        document.createElement("span")
      );
      span.textContent = "\u2757\uFE0F";
      span.title = "Could not show a player for link";
      this.addElement(this.a);
    }
    this.removeCSS(twizzleLinkCSS);
    const cssIndex = this.shadow.adoptedStyleSheets.indexOf(twizzleLinkCSS);
    if (typeof cssIndex !== "undefined") {
      this.shadow.adoptedStyleSheets.splice(cssIndex, cssIndex + 1);
    }
    this.#cssCDNForumTweaksElem?.remove();
  }
  #cssCDNForumTweaksElem;
  #scrollableRegion;
  #responsiveWrapper;
  #moveCountElem;
  async connectedCallback() {
    this.#responsiveWrapper = this.addElement(document.createElement("div"));
    this.#responsiveWrapper.classList.add("responsive-wrapper");
    if (this.options?.colorScheme === "dark") {
      this.contentWrapper.classList.add("dark-mode");
    }
    this.addCSS(twizzleLinkCSS);
    if (this.options?.cdnForumTweaks) {
      this.addCSS(twizzleLinkForumTweaksCSS);
    }
    this.a = this.querySelector("a");
    if (!this.a) {
      return;
    }
    const config = getConfigFromURL("", this.a.href);
    const href = this.a?.href;
    const { hostname, pathname } = new URL(href);
    if (hostname !== "alpha.twizzle.net") {
      this.#fallback();
      return;
    }
    if (["/edit/", "/explore/"].includes(pathname)) {
      const isExplorer = pathname === "/explore/";
      if (config.puzzle && !(config.puzzle in puzzles)) {
        const puzzleDescription = (await import("../puzzle-geometry/index.js")).getPuzzleDescriptionString(config.puzzle);
        delete config.puzzle;
        config.experimentalPuzzleDescription = puzzleDescription;
      }
      this.twistyPlayer = this.#responsiveWrapper.appendChild(
        new TwistyPlayer({
          background: this.options?.cdnForumTweaks ? "checkered-transparent" : "checkered",
          colorScheme: this.options?.colorScheme === "dark" ? "dark" : "light",
          ...config,
          viewerLink: isExplorer ? "experimental-twizzle-explorer" : "auto"
        })
      );
      this.twistyPlayer.fullscreenElement = this.contentWrapper;
      if (config.experimentalTitle) {
        this.twistyPlayer.experimentalTitle = config.experimentalTitle;
      }
      this.#scrollableRegion = this.#responsiveWrapper.appendChild(
        document.createElement("div")
      );
      this.#scrollableRegion.classList.add("scrollable-region");
      if (config.experimentalTitle) {
        this.#addHeading(config.experimentalTitle).classList.add("title");
      }
      if (config.experimentalSetupAlg) {
        this.#addHeading(
          "Setup",
          async () => (await this.twistyPlayer?.experimentalModel.setupAlg.get())?.alg.toString() ?? null
        );
        const setupAlgDiv = this.#scrollableRegion.appendChild(
          document.createElement("div")
        );
        setupAlgDiv.classList.add("setup-alg");
        setupAlgDiv.textContent = new Alg(
          config.experimentalSetupAlg
        ).toString();
      }
      const movesHeading = this.#addHeading(
        "Moves",
        async () => (await this.twistyPlayer?.experimentalModel.alg.get())?.alg.toString() ?? null
      );
      this.#moveCountElem = movesHeading.appendChild(
        constructMoveCountDisplay(this.twistyPlayer.experimentalModel)
      );
      this.#moveCountElem.classList.add("move-count");
      const twistyAlgViewer = this.#scrollableRegion.appendChild(
        new TwistyAlgViewer({ twistyPlayer: this.twistyPlayer })
      );
      twistyAlgViewer.part.add("twisty-alg-viewer");
    } else {
      this.#fallback();
    }
  }
  #addHeading(text, getTextToCopy) {
    const headingDiv = this.#scrollableRegion.appendChild(
      document.createElement("div")
    );
    headingDiv.classList.add("heading");
    const wrapperSpan = headingDiv.appendChild(document.createElement("span"));
    wrapperSpan.textContent = text;
    if (getTextToCopy) {
      wrapperSpan.textContent += " ";
      const a = wrapperSpan.appendChild(document.createElement("a"));
      a.textContent = "\u{1F4CB}";
      a.href = "#";
      a.title = "Copy to clipboard";
      async function setAndClear(text2) {
        a.textContent = text2;
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        if (a.textContent === text2) {
          a.textContent = "\u{1F4CB}";
        }
      }
      a.addEventListener("click", async (e) => {
        e.preventDefault();
        a.textContent = "\u{1F4CB}\u2026";
        const textToCopy = await getTextToCopy();
        if (textToCopy) {
          try {
            await navigator.clipboard.writeText(textToCopy);
            void setAndClear("\u{1F4CB}\u2705");
          } catch (e2) {
            void setAndClear("\u{1F4CB}\u274C");
            throw e2;
          }
        } else {
          void setAndClear("\u{1F4CB}\u274C");
        }
      });
    }
    return headingDiv;
  }
};
customElementsShim.define("twizzle-link", TwizzleLink);
function constructMoveCountDisplay(model, elem = document.createElement("span")) {
  async function update() {
    const [algWithIssues, puzzleLoader] = await Promise.all([
      model.puzzleAlg.get(),
      model.puzzleLoader.get()
    ]);
    if (algWithIssues.issues.errors.length !== 0) {
      elem.textContent = "";
      return;
    }
    let isFirstMetric = true;
    function addMetric(metric) {
      if (isFirstMetric) {
        isFirstMetric = false;
      } else {
        elem.append(")(");
      }
      const span = elem.appendChild(document.createElement("span"));
      const moveCount = countMetricMoves(
        puzzleLoader,
        metric,
        algWithIssues.alg
      );
      span.append(`${CONSISTENT_METRIC_ABBREVIATIONS[metric]}: `);
      const moveNumber = span.appendChild(document.createElement("span"));
      moveNumber.textContent = moveCount.toString();
      moveNumber.classList.add("move-number");
      span.setAttribute("data-before", METRIC_EXPLANATIONS[metric] ?? "");
      span.setAttribute("title", METRIC_EXPLANATIONS[metric] ?? "");
    }
    elem.textContent = "(";
    if (puzzleLoader.id === "3x3x3") {
      addMetric("OBTM" /* OuterBlockTurnMetric */);
      addMetric("OBQTM" /* OuterBlockQuantumTurnMetric */);
      addMetric("RBTM" /* RangeBlockTurnMetric */);
    } else if (puzzleLoader.pg) {
      addMetric("RBTM" /* RangeBlockTurnMetric */);
      addMetric("RBQTM" /* RangeBlockQuantumTurnMetric */);
    }
    addMetric("ETM" /* ExecutionTurnMetric */);
    elem.append(")");
  }
  model.puzzleAlg.addFreshListener(update);
  model.puzzleID.addFreshListener(update);
  return elem;
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
  return new LazyPromise(async () => {
    const kpuzzle = await kpuzzlePromiseFn();
    return {
      quantumMoveOrder: (m) => {
        return kpuzzle.moveToTransformation(new Move(m)).repetitionOrder();
      }
    };
  });
}

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
    let r2 = 0;
    for (const algNode of alg.childAlgNodes()) {
      r2 += this.traverseAlgNode(algNode);
    }
    return r2;
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
    let r2 = 0;
    for (const algNode of alg.childAlgNodes()) {
      r2 += this.traverseAlgNode(algNode);
    }
    return r2;
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
  wcaEvents,
  wcaEventInfo,
  twizzleEvents,
  eventInfo,
  LazyPromise,
  puzzleOrientation3x3x3Idx,
  puzzleOrientation3x3x3Cache,
  normalize3x3x3Orientation,
  getFaceletStickeringMask,
  experimental3x3x3KPuzzle,
  NO_VALUE,
  countAnimatedLeaves,
  CommonMetric,
  CommonMetricAlias,
  countMoves,
  countMovesETM,
  countMetricMoves,
  SimpleAlgIndexer,
  TreeAlgIndexer,
  setTwistyDebug,
  backViewLayouts,
  TwistyAnimatedSVG,
  hintFaceletStyles,
  TAU,
  haveStartedSharingRenderers,
  bulk3DCode,
  TwistyPlayer,
  TwistyAlgEditor,
  TwistyAlgViewer,
  TwizzleLink,
  cube3x3x3,
  cube2x2x2,
  puzzles
};
//# sourceMappingURL=chunk-VSMFYTG6.js.map

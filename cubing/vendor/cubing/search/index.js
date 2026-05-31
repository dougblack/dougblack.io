import {
  experimentalSolve2x2x2,
  experimentalSolve3x3x3IgnoringCenters,
  setSearchDebug,
  solveMegaminx,
  solvePyraminx,
  solveSkewb,
  solveTwips
} from "../chunks/chunk-M7YKTETT.js";
import {
  random333Pattern
} from "../chunks/chunk-V27EM5TJ.js";
import "../chunks/chunk-7GUL3OBQ.js";
import "../chunks/chunk-FLK6AZKB.js";
import "../chunks/chunk-FUHYAW74.js";
import "../chunks/chunk-RINY3U6G.js";
import "../chunks/chunk-O6HEZXGY.js";

// src/cubing/search/index.ts
var experimentalSolveTwsearch = (...args) => {
  console.error(
    "`experimentalSolveTwsearch(\u2026)` is deprecated. Please call `experimentalSolveTwips(\u2026)` instead."
  );
  return solveTwips(...args);
};
export {
  experimentalSolve2x2x2,
  experimentalSolve3x3x3IgnoringCenters,
  solveTwips as experimentalSolveTwips,
  experimentalSolveTwsearch,
  random333Pattern,
  setSearchDebug,
  solveMegaminx,
  solvePyraminx,
  solveSkewb
};
//# sourceMappingURL=index.js.map

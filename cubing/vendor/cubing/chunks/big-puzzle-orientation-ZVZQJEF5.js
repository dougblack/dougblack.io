import {
  Alg,
  Grouping
} from "./chunk-O6HEZXGY.js";

// src/cubing/puzzles/implementations/dynamic/big-cubes/big-puzzle-orientation.ts
function puzzleOrientationBigCubeIdx(pattern) {
  const idxUFR = pattern.patternData["CORNERS"].pieces[0];
  const oriUFR = pattern.patternData["CORNERS"].orientation[0];
  return [idxUFR, oriUFR];
}
var puzzleOrientationBigCubeCacheRaw = new Array(8).fill(0).map(() => {
  return new Array(3);
});
var puzzleOrientationBigCubeCacheInitialized = false;
function puzzleOrientationBigCubeCache(bigCubeKPuzzle) {
  if (!puzzleOrientationBigCubeCacheInitialized) {
    {
      const uAlgs = [
        "",
        "y",
        "y2",
        "y'",
        "x2",
        "x2 y",
        "x2 y2",
        "x2 y'"
      ].map((s) => Alg.fromString(s));
      const UFRAlg = new Alg("Rv Uv");
      for (const uAlg of uAlgs) {
        let transformation = bigCubeKPuzzle.algToTransformation(uAlg);
        for (let i = 0; i < 4; i++) {
          const [idxUFR, oriUFR] = puzzleOrientationBigCubeIdx(
            transformation.toKPattern()
          );
          puzzleOrientationBigCubeCacheRaw[idxUFR][oriUFR] = new Alg([
            ...uAlg.childAlgNodes(),
            new Grouping(UFRAlg, i)
            // TODO: make this more efficient
          ]).invert();
          if (i === 3) {
            break;
          }
          transformation = transformation.applyAlg(UFRAlg);
        }
      }
    }
  }
  return puzzleOrientationBigCubeCacheRaw;
}
function normalizeBigCubeOrientation(pattern) {
  const [idxUFR, oriUFR] = puzzleOrientationBigCubeIdx(pattern);
  const orientationAlg = puzzleOrientationBigCubeCache(pattern.kpuzzle)[idxUFR][oriUFR];
  return pattern.applyAlg(orientationAlg);
}
function experimentalIsBigCubeSolved(pattern, options) {
  if (options.ignorePuzzleOrientation) {
    pattern = normalizeBigCubeOrientation(pattern);
  }
  return pattern.isIdentical(pattern.kpuzzle.defaultPattern());
}
export {
  experimentalIsBigCubeSolved,
  normalizeBigCubeOrientation,
  puzzleOrientationBigCubeCache,
  puzzleOrientationBigCubeIdx
};
//# sourceMappingURL=big-puzzle-orientation-ZVZQJEF5.js.map

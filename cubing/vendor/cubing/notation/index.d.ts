import { r as Alg, L as LeafCount, s as PuzzleLoader } from '../PuzzleLoader-Bp8zngUn.js';
import 'type-fest';
import 'three/src/Three.js';

declare const countAnimatedLeaves: (alg: Alg) => LeafCount;

declare enum CommonMetric {
    OuterBlockTurnMetric = "OBTM",
    RangeBlockTurnMetric = "RBTM",
    SingleSliceTurnMetric = "SSTM",
    OuterBlockQuantumTurnMetric = "OBQTM",
    RangeBlockQuantumTurnMetric = "RBQTM",
    SingleSliceQuantumTurnMetric = "SSQTM",
    ExecutionTurnMetric = "ETM"
}
declare enum CommonMetricAlias {
    QuantumTurnMetric = "OBQTM",
    HandTurnMetric = "OBTM",
    SliceTurnMetric = "RBTM"
}

declare const countMoves: (alg: Alg) => number;
declare const countMovesETM: (alg: Alg) => number;
/**
 * Only implemented so far:
 *
 * - 3x3x3: OBTM, RBTM, ETM
 */
declare function countMetricMoves(puzzleLoader: PuzzleLoader, metric: CommonMetric, alg: Alg): number;

export { CommonMetric as ExperimentalCommonMetric, CommonMetricAlias as ExperimentalCommonMetricAlias, countAnimatedLeaves as experimentalCountAnimatedLeaves, countMetricMoves as experimentalCountMetricMoves, countMoves as experimentalCountMoves, countMovesETM as experimentalCountMovesETM };

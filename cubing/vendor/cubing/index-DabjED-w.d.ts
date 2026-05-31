import { r as Alg, K as KPattern, u as KPuzzle } from './PuzzleLoader-Bp8zngUn.js';

declare enum PrefetchLevel {
    Auto = "auto",
    None = "none",
    Immediate = "immediate"
}

declare function randomScrambleForEvent(eventID: string): Promise<Alg>;
declare function deriveScrambleForEvent(derivationSeedHex: string, derivationSaltHierarchy: string[], eventID: string): Promise<Alg>;
declare function experimentalSolve3x3x3IgnoringCenters(pattern: KPattern): Promise<Alg>;
declare function experimentalSolve2x2x2(pattern: KPattern): Promise<Alg>;
declare function solveSkewb(pattern: KPattern): Promise<Alg>;
declare function solvePyraminx(pattern: KPattern): Promise<Alg>;
declare function solveMegaminx(pattern: KPattern): Promise<Alg>;
interface SolveTwipsOptions {
    generatorMoves?: string[];
    targetPattern?: KPattern;
    minDepth?: number;
    maxDepth?: number;
}
declare function solveTwips(kpuzzle: KPuzzle, pattern: KPattern, options?: SolveTwipsOptions): Promise<Alg>;
interface SearchOutsideDebugGlobals {
    logPerf: boolean;
    scramblePrefetchLevel: `${PrefetchLevel}`;
    forceNewWorkerForEveryScramble: boolean;
    showWorkerInstantiationWarnings: boolean;
    prioritizeEsbuildWorkaroundForWorkerInstantiation: boolean;
    allowDerivedScrambles: boolean;
}
declare function setSearchDebug(options: Partial<SearchOutsideDebugGlobals>): void;

export { experimentalSolve3x3x3IgnoringCenters as a, setSearchDebug as b, solveMegaminx as c, solvePyraminx as d, experimentalSolve2x2x2 as e, solveSkewb as f, deriveScrambleForEvent as g, randomScrambleForEvent as r, solveTwips as s };

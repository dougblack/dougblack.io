import { y as AlgIndexer, u as KPuzzle, r as Alg, M as Move, z as MillisecondTimestamp, B as LeafIndex, K as KPattern, C as KTransformation, D as MillisecondDuration, L as LeafCount, v as StickeringMask } from '../PuzzleLoader-Bp8zngUn.js';
export { F as BackViewLayout, N as EXPERIMENTAL_PROP_NO_VALUE, E as ExperimentalStickering, t as PuzzleID, T as TwistyAlgEditor, G as TwistyAlgViewer, H as TwistyPlayer, I as TwistyPlayerConfig, J as TwizzleLink, V as VisualizationFormat, O as backViewLayouts } from '../PuzzleLoader-Bp8zngUn.js';
import 'type-fest';
import 'three/src/Three.js';

declare class SimpleAlgIndexer implements AlgIndexer {
    private kpuzzle;
    private moves;
    private durationFn;
    constructor(kpuzzle: KPuzzle, alg: Alg);
    getAnimLeaf(index: number): Move;
    indexToMoveStartTimestamp(index: number): MillisecondTimestamp;
    timestampToIndex(timestamp: MillisecondTimestamp): LeafIndex;
    patternAtIndex(index: number): KPattern;
    transformationAtIndex(index: number): KTransformation;
    algDuration(): MillisecondDuration;
    numAnimatedLeaves(): LeafCount;
    moveDuration(index: LeafIndex): MillisecondDuration;
}

declare class TreeAlgIndexer implements AlgIndexer {
    private kpuzzle;
    private decoration;
    private walker;
    constructor(kpuzzle: KPuzzle, alg: Alg);
    getAnimLeaf(index: LeafIndex): Move | null;
    indexToMoveStartTimestamp(index: LeafIndex): MillisecondTimestamp;
    indexToMovesInProgress(index: LeafIndex): MillisecondTimestamp;
    patternAtIndex(index: LeafIndex, startPattern?: KPattern): KPattern;
    transformationAtIndex(index: LeafIndex): KTransformation;
    numAnimatedLeaves(): LeafCount;
    timestampToIndex(timestamp: MillisecondTimestamp): LeafIndex;
    algDuration(): MillisecondDuration;
    moveDuration(index: LeafIndex): MillisecondDuration;
}

declare const twistyDebugGlobals: {
    shareAllNewRenderers: "auto" | "always" | "never";
    showRenderStats: boolean;
};
declare function setTwistyDebug(options: Partial<typeof twistyDebugGlobals>): void;

declare class TwistyAnimatedSVG {
    kpuzzle: KPuzzle;
    private showUnknownOrientations;
    wrapperElement: HTMLElement;
    svgElement: SVGElement;
    gradientDefs: SVGDefsElement;
    private originalColors;
    private gradients;
    private svgID;
    constructor(kpuzzle: KPuzzle, svgSource: string, experimentalStickeringMask?: StickeringMask, showUnknownOrientations?: boolean);
    drawPattern(pattern: KPattern, nextPattern?: KPattern, fraction?: number): void;
    draw(pattern: KPattern, nextPattern?: KPattern, fraction?: number): void;
    private newGradient;
    private elementID;
    private elementByID;
}

export { AlgIndexer, LeafCount as ExperimentalLeafCount, LeafIndex as ExperimentalLeafIndex, MillisecondDuration as ExperimentalMillisecondDuration, MillisecondTimestamp as ExperimentalMillisecondTimestamp, TwistyAnimatedSVG as ExperimentalSVGAnimator, SimpleAlgIndexer, TreeAlgIndexer, setTwistyDebug };

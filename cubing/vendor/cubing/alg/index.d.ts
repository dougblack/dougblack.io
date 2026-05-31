import { R as AlgNode, r as Alg, M as Move, U as AppendOptions, W as Grouping, X as LineComment, Y as Commutator, Z as Conjugate, _ as Newline, $ as Pause, a0 as KeyMapping, A as AlgLeaf } from '../PuzzleLoader-Bp8zngUn.js';
export { a1 as AlgBranch, a2 as AppendCancelOptions, a3 as ExperimentalNotationType, a4 as ExperimentalParsed, a5 as ExperimentalSerializationOptions, a6 as GroupingModifications, a7 as MoveModifications, w as PuzzleSpecificSimplifyOptions, a8 as QuantumMove, a9 as SimplifyOptions } from '../PuzzleLoader-Bp8zngUn.js';
import 'type-fest';
import 'three/src/Three.js';

/** @deprecated */
type Unit = AlgNode;

declare function experimentalAppendMove(alg: Alg, addedMove: Move, options?: AppendOptions): Alg;

/** @category Alg */
declare class AlgBuilder {
    #private;
    push(u: AlgNode): void;
    /** @deprecated */
    experimentalPushAlg(alg: Alg): void;
    experimentalNumAlgNodes(): number;
    toAlg(): Alg;
    reset(): void;
}

declare function setAlgDebug(options: {
    caretNISSNotationEnabled?: boolean;
}): void;

declare const Example: {
    Sune: Alg;
    AntiSune: Alg;
    SuneCommutator: Alg;
    Niklas: Alg;
    EPerm: Alg;
    FURURFCompact: Alg;
    APermCompact: Alg;
    FURURFMoves: Alg;
    TPerm: Alg;
    HeadlightSwaps: Alg;
    TriplePause: Alg;
};

declare function experimentalIs(v: any, c: typeof Alg | typeof Grouping | typeof LineComment | typeof Commutator | typeof Conjugate | typeof Move | typeof Newline | typeof Pause): boolean;

declare function keyToMove(keyMapping: KeyMapping | undefined, e: KeyboardEvent): AlgLeaf | null;

declare abstract class TraversalDownUp<DataDown, DataAlgUp, DataAlgNodeUp = DataAlgUp> {
    traverseAlgNode(algNode: AlgNode, dataDown: DataDown): DataAlgNodeUp;
    traverseIntoAlgNode(algNode: AlgNode, dataDown: DataDown): AlgNode;
    abstract traverseAlg(alg: Alg, dataDown: DataDown): DataAlgUp;
    abstract traverseGrouping(grouping: Grouping, dataDown: DataDown): DataAlgNodeUp;
    abstract traverseMove(move: Move, dataDown: DataDown): DataAlgNodeUp;
    abstract traverseCommutator(commutator: Commutator, dataDown: DataDown): DataAlgNodeUp;
    abstract traverseConjugate(conjugate: Conjugate, dataDown: DataDown): DataAlgNodeUp;
    abstract traversePause(pause: Pause, dataDown: DataDown): DataAlgNodeUp;
    abstract traverseNewline(newline: Newline, dataDown: DataDown): DataAlgNodeUp;
    abstract traverseLineComment(comment: LineComment, dataDown: DataDown): DataAlgNodeUp;
}
declare abstract class TraversalUp<DataAlgUp, DataAlgNodeUp = DataAlgUp> extends TraversalDownUp<undefined, DataAlgUp, DataAlgNodeUp> {
    traverseAlgNode(algNode: AlgNode): DataAlgNodeUp;
    traverseIntoAlgNode(algNode: AlgNode): AlgNode;
    abstract traverseAlg(alg: Alg): DataAlgUp;
    abstract traverseGrouping(grouping: Grouping): DataAlgNodeUp;
    abstract traverseMove(move: Move): DataAlgNodeUp;
    abstract traverseCommutator(commutator: Commutator): DataAlgNodeUp;
    abstract traverseConjugate(conjugate: Conjugate): DataAlgNodeUp;
    abstract traversePause(pause: Pause): DataAlgNodeUp;
    abstract traverseNewline(newline: Newline): DataAlgNodeUp;
    abstract traverseLineComment(comment: LineComment): DataAlgNodeUp;
}
declare function functionFromTraversal<DataDown, DataAlgUp, ConstructorArgs extends unknown[]>(traversalConstructor: {
    new (...args: ConstructorArgs): TraversalDownUp<DataDown, DataAlgUp, any>;
}, constructorArgs?: ConstructorArgs): undefined extends DataDown ? (alg: Alg) => DataAlgUp : (alg: Alg, v: DataDown) => DataAlgUp;

interface AlgCubingNetOptions {
    alg?: Alg;
    setup?: Alg;
    title?: string;
    puzzle?: "1x1x1" | "2x2x2" | "3x3x3" | "4x4x4" | "5x5x5" | "6x6x6" | "7x7x7" | "8x8x8" | "9x9x9" | "10x10x10" | "11x11x11" | "12x12x12" | "13x13x13" | "14x14x14" | "16x16x16" | "17x17x17";
    stage?: "full" | "cross" | "F2L" | "LL" | "OLL" | "PLL" | "CLS" | "ELS" | "L6E" | "CMLL" | "WV" | "ZBLL" | "void";
    view?: "editor" | "playback" | "fullscreen";
    type?: "moves" | "reconstruction" | "alg" | "reconstruction-end-with-setup";
}
/** @deprecated */
declare function experimentalAlgCubingNetLink(options: AlgCubingNetOptions): string;

export { Alg, AlgBuilder, type AlgCubingNetOptions, AlgLeaf, AlgNode, Commutator, Conjugate, Example, Grouping, LineComment, Move, Newline, Pause, TraversalDownUp, TraversalUp, type Unit, experimentalAlgCubingNetLink, experimentalAppendMove, experimentalIs, functionFromTraversal, keyToMove, setAlgDebug };

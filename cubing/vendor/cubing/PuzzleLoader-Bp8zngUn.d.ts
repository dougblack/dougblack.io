import { Tagged } from 'type-fest';
import { Texture, Object3D, Raycaster, PerspectiveCamera, Scene, WebGLRenderer } from 'three/src/Three.js';

declare enum IterationDirection {
    Forwards = 1,
    Backwards = -1
}

type ExperimentalNotationType = "auto" | "LGN";
interface ExperimentalSerializationOptions {
    notation?: ExperimentalNotationType;
}

declare abstract class Comparable {
    is(c: any): boolean;
    as<T>(c: new (...args: any) => T): T | null;
    abstract isIdentical(other: Comparable): boolean;
}
interface Repeatable extends Comparable {
    experimentalExpand(iterDir?: IterationDirection, depth?: number): Generator<AlgLeaf>;
}
declare abstract class AlgCommon<T extends Alg | AlgNode> extends Comparable implements Repeatable {
    constructor();
    get log(): (message?: any) => void;
    abstract toString(experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
    abstract invert(): T;
    abstract experimentalExpand(iterDir: IterationDirection): Generator<AlgLeaf>;
}

/** @category Alg Nodes */
declare class Commutator extends AlgCommon<Commutator> {
    #private;
    constructor(aSource: FlexibleAlgSource, bSource: FlexibleAlgSource);
    get A(): Alg;
    get B(): Alg;
    isIdentical(other: Comparable): boolean;
    invert(): Commutator;
    experimentalExpand(iterDir?: IterationDirection, depth?: number): Generator<AlgLeaf>;
    toString(experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
}

/** @category Alg Nodes */
declare class Conjugate extends AlgCommon<Conjugate> {
    #private;
    constructor(aSource: FlexibleAlgSource, bSource: FlexibleAlgSource);
    get A(): Alg;
    get B(): Alg;
    isIdentical(other: Comparable): boolean;
    invert(): Conjugate;
    experimentalExpand(iterDir: IterationDirection, depth?: number): Generator<AlgLeaf>;
    toString(experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
}

interface QuantumMoveModifications {
    outerLayer?: number;
    innerLayer?: number;
    family?: string;
}
declare class QuantumMove extends Comparable {
    #private;
    constructor(family: string, innerLayer?: number | null, outerLayer?: number | null);
    static fromString(s: string): QuantumMove;
    modified(modifications: QuantumMoveModifications): QuantumMove;
    isIdentical(other: QuantumMove): boolean;
    /** @deprecated */
    get family(): string;
    /** @deprecated */
    get outerLayer(): number | null;
    /** @deprecated */
    get innerLayer(): number | null;
    experimentalExpand(): Generator<AlgLeaf>;
    toString(_experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
}
interface MoveModifications {
    outerLayer?: number;
    innerLayer?: number;
    family?: string;
    amount?: number;
}
/** @category Alg Nodes */
declare class Move extends AlgCommon<Move> {
    #private;
    constructor(...args: [QuantumMove] | [QuantumMove, number] | [string] | [string, number]);
    isIdentical(other: Comparable): boolean;
    invert(): Move;
    experimentalExpand(iterDir?: IterationDirection): Generator<AlgLeaf>;
    get quantum(): QuantumMove;
    modified(modifications: MoveModifications): Move;
    static fromString(s: string): Move;
    get amount(): number;
    /** @deprecated */
    get type(): string;
    /** @deprecated */
    get family(): string;
    /** @deprecated */
    get outerLayer(): number | undefined;
    /** @deprecated */
    get innerLayer(): number | undefined;
    toString(experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
}

/** @category Alg Nodes */
declare class Pause extends AlgCommon<Pause> {
    experimentalNISSGrouping?: Grouping;
    toString(_experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
    isIdentical(other: Comparable): boolean;
    invert(): Pause;
    experimentalExpand(_iterDir?: IterationDirection, _depth?: number): Generator<AlgLeaf>;
}

interface GroupingModifications {
    alg?: Alg;
    amount?: number;
}
/** @category Alg Nodes */
declare class Grouping extends AlgCommon<Grouping> {
    #private;
    experimentalNISSPlaceholder?: Pause;
    constructor(algSource: FlexibleAlgSource, amount?: number);
    isIdentical(other: Comparable): boolean;
    get alg(): Alg;
    get amount(): number;
    modified(modifications: GroupingModifications): Grouping;
    /** @deprecated */
    get experimentalRepetitionSuffix(): string;
    invert(): Grouping;
    experimentalExpand(iterDir?: IterationDirection, depth?: number): Generator<AlgLeaf>;
    static fromString(): Grouping;
    toString(experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
    experimentalAsSquare1Tuple(): [moveU: Move, moveD: Move] | null;
}

/** @category Alg Nodes */
declare class LineComment extends AlgCommon<LineComment> {
    #private;
    constructor(commentText: string);
    get text(): string;
    isIdentical(other: Comparable): boolean;
    invert(): LineComment;
    experimentalExpand(_iterDir?: IterationDirection, _depth?: number): Generator<AlgLeaf>;
    toString(_experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
}

/** @category Alg Nodes */
declare class Newline extends AlgCommon<Newline> {
    toString(_experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
    isIdentical(other: Comparable): boolean;
    invert(): Newline;
    experimentalExpand(_iterDir?: IterationDirection, _depth?: number): Generator<AlgLeaf>;
}

/** @category Alg Nodes */
type AlgLeaf = Move | LineComment | Newline | Pause;
/** @category Alg Nodes */
type AlgBranch = Grouping | Conjugate | Commutator;
/** @category Alg Nodes */
type AlgNode = AlgLeaf | AlgBranch;

declare const DEFAULT_DIRECTIONAL = "any-direction";
type QuantumDirectionalCancellation = typeof DEFAULT_DIRECTIONAL | "same-direction" | "none";
type ModWrap = "none" | "gravity" | "canonical-centered" | "canonical-positive" | "preserve-sign";
interface AppendCancelOptions {
    directional?: QuantumDirectionalCancellation;
    puzzleSpecificModWrap?: ModWrap;
}
interface AppendOptions {
    cancel?: boolean | AppendCancelOptions;
    puzzleLoader?: {
        puzzleSpecificSimplifyOptions?: PuzzleSpecificSimplifyOptions;
    };
    puzzleSpecificSimplifyOptions?: PuzzleSpecificSimplifyOptions;
}
interface SimplifyOptions extends AppendOptions {
    depth?: number | null;
}
interface PuzzleSpecificAxisSimplifyInfo {
    areQuantumMovesSameAxis: (quantumMove1: QuantumMove, quantumMove2: QuantumMove) => boolean;
    simplifySameAxisMoves: (moves: Move[], quantumMod: boolean) => Move[];
}
interface PuzzleSpecificSimplifyOptions {
    quantumMoveOrder?: (quantumMove: QuantumMove) => number;
    axis?: PuzzleSpecificAxisSimplifyInfo;
}

type FlexibleAlgSource = string | Iterable<AlgNode> | Alg;
/**
 * `Alg` is a class that encapsulates a structured alg. To create an `Alg` from a string, use:
 *
 *     new Alg("R U R'"); // Convenient
 *     Alg.fromString(dynamicString); // Recommended when the string input is user-provided.
 *
 * Once you have an `Alg`, you can call methods to transform it:
 *
 *     new Alg("[[R: U], R U R2']").expand().experimentalSimplify({cancel: true}).invert().log()
 *
 * To convert an `Alg` to a string, use .toString():
 *
 *     new Alg("R U F").invert().toString();
 *
 * If you need to debug, you may also find it convenient to use .log():
 *
 *     if (alg.isIdentical(alg.invert())) {
 *       alg.log("A self-inverse!")
 *     }
 *
 * For more information, see: {@link https://js.cubing.net/cubing/alg/}
 *
 * @category Alg
 */
declare class Alg extends AlgCommon<Alg> {
    #private;
    constructor(alg?: FlexibleAlgSource);
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
    isIdentical(other: Comparable): boolean;
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
    invert(): Alg;
    /** @deprecated Use {@link Alg.expand} instead. */
    experimentalExpand(iterDir?: IterationDirection, depth?: number): Generator<AlgLeaf>;
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
    expand(options?: {
        depth?: number;
    }): Alg;
    /** @deprecated */
    experimentalLeafMoves(): Generator<Move>;
    concat(input: FlexibleAlgSource): Alg;
    /** @deprecated */
    experimentalIsEmpty(): boolean;
    static fromString(s: string): Alg;
    /** @deprecated */
    units(): Generator<AlgNode>;
    childAlgNodes(): Generator<AlgNode>;
    /** @deprecated */
    experimentalNumUnits(): number;
    experimentalNumChildAlgNodes(): number;
    /** @deprecated */
    get type(): string;
    /**
     * Converts the Alg to a string:
     *
     *     const alg = new Alg([new Move("R"), new Move("U2"), new Move("L")])
     *     // R U2 L
     *     console.log(alg.toString())
     */
    toString(experimentalSerializationOptions?: ExperimentalSerializationOptions): string;
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
    experimentalSimplify(options?: SimplifyOptions): Alg;
    /** @deprecated See {@link experimentalSimplify} */
    simplify(options?: SimplifyOptions): Alg;
}

interface NotationMapper {
    notationToInternal(move: Move): Move | null;
    notationToExternal(move: Move): Move | null;
}

type FaceName = string;
type OrientationDirection = [number, number, number];
type FaceBasedOrientationDescription = [
    [
        FaceName,
        OrientationDirection
    ],
    [
        FaceName,
        OrientationDirection
    ]
];
type BaseFaceCount = 4 | 6 | 8 | 12 | 20;
type FaceBasedOrientationDescriptionLookup = Record<BaseFaceCount, FaceBasedOrientationDescription>;
declare class PuzzleGeometryFullOptions {
    verbosity: number;
    allMoves: boolean;
    outerBlockMoves: boolean;
    vertexMoves: boolean;
    addRotations: boolean;
    moveList: (string | Move)[] | null;
    fixedOrientation: boolean;
    fixedPieceType: null | "e" | "v" | "f";
    orientCenters: boolean;
    includeCornerOrbits: boolean;
    includeCenterOrbits: boolean;
    includeEdgeOrbits: boolean;
    excludeOrbits: string[];
    optimizeOrbits: boolean;
    grayCorners: boolean;
    grayCenters: boolean;
    grayEdges: boolean;
    puzzleOrientation: FaceBasedOrientationDescription | null;
    puzzleOrientations: FaceBasedOrientationDescriptionLookup | null;
    scrambleAmount: number;
    constructor(options?: PuzzleGeometryOptions);
}
type PuzzleGeometryOptions = Partial<PuzzleGeometryFullOptions>;

declare class Perm {
    n: number;
    p: number[];
    constructor(a: number[]);
    toString(): string;
    mul(p2: Perm): Perm;
    rmul(p2: Perm): Perm;
    inv(): Perm;
    compareTo(p2: Perm): number;
    toGap(): string;
    toMathematica(): string;
    order(): number;
}

declare class PGOrbitDef {
    size: number;
    mod: number;
    constructor(size: number, mod: number);
    reassemblySize(): bigint;
}
declare class PGOrbitsDef {
    orbitnames: string[];
    private orbitdefs;
    solved: VisibleState;
    movenames: string[];
    moveops: PGTransform[];
    isRotation: boolean[];
    forcenames: boolean[];
    constructor(orbitnames: string[], orbitdefs: PGOrbitDef[], solved: VisibleState, movenames: string[], moveops: PGTransform[], isRotation: boolean[], forcenames: boolean[]);
    toKTransformationData(t: PGTransform): KTransformationData;
    toKPatternData(t: PGTransform): KPatternData;
    static transformToKTransformationData(orbitnames: string[], t: PGTransform): KTransformationData;
    private describeSet;
    toKsolve(name: string, mapper?: NotationMapper): string[];
    toKPuzzleDefinition(includemoves: boolean): KPuzzleDefinition;
    optimize(): PGOrbitsDef;
    scramble(n: number): void;
    getScrambleTransformation(n: number): PGTransform;
    reassemblySize(): bigint;
}
declare class PGOrbit {
    perm: number[];
    ori: number[];
    orimod: number;
    private static ktransformationCache;
    static e(n: number, mod: number): PGOrbit;
    constructor(perm: number[], ori: number[], orimod: number);
    mul(b: PGOrbit): PGOrbit;
    inv(): PGOrbit;
    equal(b: PGOrbit): boolean;
    killOri(): this;
    toPerm(): Perm;
    identicalPieces(): number[][];
    order(): number;
    isIdentity(): boolean;
    private zeroOris;
    remap(no: number[], on: number[], nv: number): PGOrbit;
    remapVS(no: number[], nv: number): PGOrbit;
    appendDefinition(result: string[], name: string, useVS: boolean, concise?: boolean): void;
    toKTransformationOrbitData(): KTransformationOrbitData;
    toKPatternOrbitData(): KPatternOrbitData;
}
declare class PGTransformBase {
    orbits: PGOrbit[];
    constructor(orbits: PGOrbit[]);
    internalMul(b: PGTransformBase): PGOrbit[];
    protected internalInv(): PGOrbit[];
    equal(b: PGTransformBase): boolean;
    protected killOri(): this;
    toPerm(): Perm;
    identicalPieces(): number[][];
    order(): number;
}
declare class PGTransform extends PGTransformBase {
    mul(b: PGTransform): PGTransform;
    mulScalar(n: number): PGTransform;
    inv(): PGTransform;
    e(): PGTransform;
}
declare class VisibleState extends PGTransformBase {
    mul(b: PGTransform): VisibleState;
}

type PuzzleDescriptionString = string;
declare const pgPuzzle: {
    [name: string]: PuzzleDescriptionString;
};
type PuzzleName = keyof typeof pgPuzzle;

declare class Quat {
    a: number;
    b: number;
    c: number;
    d: number;
    constructor(a: number, b: number, c: number, d: number);
    mul(q: Quat): Quat;
    toString(): string;
    dist(q: Quat): number;
    len(): number;
    cross(q: Quat): Quat;
    dot(q: Quat): number;
    normalize(): Quat;
    makenormal(): Quat;
    normalizeplane(): Quat;
    smul(m: number): Quat;
    sum(q: Quat): Quat;
    sub(q: Quat): Quat;
    angle(): number;
    invrot(): Quat;
    det3x3(a00: number, a01: number, a02: number, a10: number, a11: number, a12: number, a20: number, a21: number, a22: number): number;
    rotateplane(q: Quat): Quat;
    orthogonal(): Quat;
    pointrotation(b: Quat): Quat;
    unproject(b: Quat): Quat;
    rotatepoint(q: Quat): Quat;
    rotateface(face: Quat[]): Quat[];
    intersect3(p2: Quat, p3: Quat): Quat | false;
    side(x: number): number;
    /**
     * Cuts a face by this plane, or returns null if there
     * is no intersection.
     * @param face The face to cut.
     */
    cutface(face: Quat[]): Quat[][] | null;
    cutfaces(faces: Quat[][]): Quat[][];
    faceside(face: Quat[]): number;
    sameplane(p: Quat): boolean;
    makecut(r: number): Quat;
}

interface TextureMapper {
    getuv(fn: number, threed: number[]): number[];
}
interface StickerDatSticker {
    coords: number[];
    color: string;
    orbit: string;
    ord: number;
    ori: number;
    face: number;
    isDup?: boolean;
}
interface StickerDatFace {
    coords: number[];
    name: string;
}
type StickerDatAxis = {
    coordinates: number[];
    quantumMove: Move;
    order: number;
};
interface StickerDat {
    stickers: StickerDatSticker[];
    faces: StickerDatFace[];
    axis: StickerDatAxis[];
    unswizzle(mv: Move): Move | null;
    notationMapper: NotationMapper;
    textureMapper: TextureMapper;
}
declare function getPG3DNamedPuzzles(): {
    [s: string]: PuzzleDescriptionString;
};
declare function getPuzzleDescriptionString(puzzleName: PuzzleName): PuzzleDescriptionString;
declare const PUZZLE_BASE_SHAPES: readonly ["c", "t", "o", "d", "i"];
type PuzzleBaseShape = (typeof PUZZLE_BASE_SHAPES)[number];
declare const PUZZLE_CUT_TYPES: readonly ["f", "v", "e"];
type PuzzleCutType = (typeof PUZZLE_CUT_TYPES)[number];
type PuzzleCutDescription = {
    cutType: PuzzleCutType;
    distance: number;
};
type PuzzleDescription = {
    shape: PuzzleBaseShape;
    cuts: PuzzleCutDescription[];
};
declare function parsePuzzleDescription(s: PuzzleDescriptionString): PuzzleDescription | null;
declare function getPuzzleGeometryByDesc(desc: string, options?: PuzzleGeometryOptions): PuzzleGeometry;
declare function getPuzzleGeometryByName(puzzleName: PuzzleName, options?: PuzzleGeometryOptions): PuzzleGeometry;
type MoveSetGeo = [string, string, string, string, number];
/** @category PuzzleGeometry */
declare class PuzzleGeometry {
    puzzleDescription: PuzzleDescription;
    private rotations;
    basePlaneRotations: Quat[];
    private basePlanes;
    private faceNames;
    private facePlanes;
    private edgeNames;
    private vertexNames;
    private geometryNormals;
    private movePlanes;
    private movePlanesFiltered;
    movePlaneSets?: Quat[][];
    private movePlaneNormals?;
    movesetorders?: number[];
    movesetgeos?: MoveSetGeo[];
    private baseFaces;
    private faces;
    private faceCenterMass?;
    private baseFaceCount;
    stickersPerFace: number;
    shortestEdge: number;
    private markedFaceLookup;
    cubies: number[][];
    private vertexDistance;
    private edgeDistance;
    private faceToCubie?;
    private faceToCubieOrd?;
    private moveRotations?;
    private faceListHash?;
    private cubieSetNames?;
    private cubieOrbitSizes?;
    private cubieSetNums?;
    private cubieOrdNums?;
    private orbitOrientations?;
    private cubieValueMap?;
    private cubieSetCubies?;
    cmovesBySlice: number[][][];
    parsedMoveList?: [
        string | undefined,
        number,
        number,
        number,
        boolean,
        number
    ][];
    private duplicatedFaces;
    private duplicatedCubies;
    private fixedCubie;
    private net;
    private colors;
    private swizzler;
    notationMapper: NotationMapper;
    private addNotationMapper;
    private setReidOrSpeffzOrder;
    private options;
    constructor(puzzleDescription: PuzzleDescription, options: PuzzleGeometryOptions);
    private keyface;
    private keyface2;
    private keyface3;
    private findface;
    private project2d;
    private upperStringToBitSet;
    allstickers(): void;
    unswizzle(mv: Move): Move | null;
    private stringToBlockMove;
    parseMove(move: Move): [string | undefined, number, number, number, boolean, number];
    private parsemove;
    genperms(): void;
    private getboundarygeometry;
    private getmovesets;
    private graybyori;
    private skipbyori;
    private skipcubie;
    private header;
    writegap(): string;
    writemathematica(): string;
    writeksolve(name?: string): string;
    getKPuzzleDefinition(fortwisty?: boolean, includemoves?: boolean): KPuzzleDefinition;
    getMoveFromBits(moverange: number[], amount: number, inverted: boolean, axiscmoves: number[][], setmoves: number[] | undefined, movesetorder: number): PGTransform;
    private omitSet;
    private diffmvsets;
    getOrbitsDef(fortwisty: boolean, includemoves?: boolean): PGOrbitsDef;
    getScramble(n?: number): KTransformationData;
    getMovesAsPerms(): Perm[];
    showcanon(disp: (s: string) => void): void;
    getsolved(): Perm;
    private getOrientationRotation;
    private getInitial3DRotation;
    private generate2dmapping;
    generatesvg(w?: number, h?: number, trim?: number, threed?: boolean): string;
    get3d(options?: {
        stickerColors?: string[];
        darkIgnoredOrbits?: boolean;
    }): StickerDat;
    getGeoNormal(geoname: string): number[] | undefined;
    private getfaceindex;
    textForTwizzleExplorer(): string;
    writeSchreierSims(tw: (s: string) => void): void;
}
declare class PGNotation {
    private pg;
    private orbitNames;
    constructor(pg: PuzzleGeometry, od: PGOrbitsDef);
    lookupMove(move: Move): KTransformationData | null;
    remapKPuzzleDefinition(kpuzzleDefinition: KPuzzleDefinition): KPuzzleDefinition;
}

type KPatternData = {
    [orbitName: string]: KPatternOrbitData;
};
interface KPatternOrbitData {
    pieces: number[];
    orientation: number[];
    /** Each piece may have an "orientation mod" that means "the orientation of
     * this piece is known mod [value]".
     *
     * Suppose `.numOrientations` for this orbit has a value of N. This is
     * considered the default value for the orientation mod of each piece in the
     * orbit.
     *
     * - Each entry must be one of the following:
     *   - A proper divisor of N.
     *     - For example: if N is 12, then one of: 1, 2, 3, 6
     *   - The special value 0, indicating the default value (N).
     *     - This indicates that the orientation of a piece is fully known, i.e.
     *        that its "orientation mod" is the default value (N). However, such a
     *        value is recorded as 0 instead of N, in order to make it simpler to
     *        implement and debug pattern logic involving the default value.
     * - If `.orientationMod[i]` is a proper divisor of N (i.e. not 0), then
     *   `.orientation[i]` must be less than `.orientationMod[i]`. That is, the
     *   orientation values must be individually "normalized" for each piece.
     * - If the `orientationMod` field is not present, then every piece is
     *   considered to have the default value for its "orientation mod".
     *
     * For a "real-world" example of this concept, consider a traditional analog
     * 12-hour clock dial, like one that might hang on the wall in a school room.
     * Although there are 24 hours in a day, A.M. and P.M. times are not
     * distinguishable on such a clock. Since 3:00 (AM) and 15:00 are not
     * distinguishable, we would read either of those times as 3:00 with an
     * implicit "orientation mod" of 12.
     *
     * For most puzzles, however, we care about "visual" indistinguishability
     * rather than "temporal" indistinguishability. To adapt the previous example,
     * imagine a 24-hour clock with 24 hour marks around the dial, but where the
     * hour hand is symmetric and points equally at the current hour as well as
     * its diametic opposite (like a compass needle but painted all in one color).
     * This has the same set of "valid patterns" as a normal 12-hour clock. Such a
     * clock also has an "orientation mod" of 12, but where the multiples of the
     * modulus have been "unfolded" to show their full symmetry instead of being
     * implicit.
     *
     * For a non-trivial puzzle example, consider Eitan's FisherTwist, a shape mod
     * of the 3x3x3 cube:
     * https://www.hknowstore.com/locale/en-US/item.aspx?corpname=nowstore&itemid=97eb4e89-367e-4d02-b7f0-34e5e7f3cd12
     *
     * - The 4 equatorial centers have C₂ symmetry — it is possible to rotate any
     *   of these centers 180° without a visible change to the state. This means
     *   that the possible orientations "loop" after incrementing the orientation
     *   by 2 (two turns clockwise), and therefore the "orientation mod" of a
     *   given piece is only 2.
     *   - If we apply a counter-clockwise rotation to one of these centers, the
     *     transformation applies an orientation of 3. But the net orientation is
     *     recorded as a normalized value of 1 instead, because 3 (mod 2) ≡ 1 (mod
     *     2).
     * - The 2 polar centers (U and D) have no distinguishable rotations. This
     *   means that their orientation is "known mod 1" — any transformation of one
     *   of these centers is indistinguishable from another transformation of the
     *   same center, and all of them are mapped to a value of 0 (the only
     *   possible value that exists mod 1).
     *
     * For 3x3x3:
     *
     * - When solving a normal 3x3x3, center orientations are conventionally
     *   ignored. This is similar to the polar center case for Eitan's
     *   FisherTwist, and the "orientation mod" of each piece is 1. This is also
     *   the core motivating use case.
     * - For a supercube
     *   (https://experiments.cubing.net/cubing.js/twisty/supercube.html) or the
     *   general case of a "picture cube", all four center orientations are
     *   distinguishable for every center. This means all centers have the default
     *   orientation mod of 4. As documented above, this can be recorded with a
     *   `.orientationMod` of `[0, 0, 0, 0, 0, 0]`, or equivalently by omitting
     *   the `.orientationMod` field.
     * - When modeling a real 3x3x3 speedcube, it is common to have a logo on a
     *   single sticker. If you want to model the exact visually distinguishable
     *   states of such a puzzles, it is possible to use an `.orientationMod` such
     *   as `[0, 1, 1, 1, 1, 1]`. For example, this can make it easy to find an
     *   alg for a given case "while keeping the logo the same", without placing
     *   more restrictions on other centers (which could make the search slower or
     *   produce longer solutions).
     *
     * For those with a mathematical background, you may notice a relationship to
     * the concept of a coset (https://en.wikipedia.org/wiki/Coset). For example,
     * consider the group of patterns of a `KPuzzle` (without indistinguishable
     * pieces) generated by a set of transformations. We can assign each set of
     * piece orbits an orientation mod value (which must be identical for all
     * constituent pieces of the same orbit). Each such choice generates a set of
     * valid `KPattern`s that forms a subgroup, and each set of valid `.orientation`
     * values defines one coset of this set. However, note that the set of valid
     * `KPattern`s does *not* form a group when there are any pieces with different
     * `.orientationMod` values that share an orbit.
     *
     * --------
     *
     * Note that the concept of "orientation mod" exclusively applies to `KPattern`,
     * not `KTransformation`. If we tried to apply the orientation mod
     * calculations to the *transformations* of Eitan's FisherTwist, then `SWAP =
     * [U, M' E2 M]` would be indistinguishable from the identity. This would mean
     * that if we calculated `SWAP` and then used this calculation for `S SWAP
     * S'`, then we would conclude that it has no net effect. However, `S SWAP S'`
     * does *not* have the same effect as doing nothing — it visibly rotates the L
     * and R centers! (In mathematical terms: the set of `KTransformation`s would
     * not form a valid set of semigroup actions, due to broken associativity.)
     *
     * Although there are times that we could theoretically save some time/space
     * by ignoring some information when it's not needed for working with certain
     * `KTransformation`s (e.g. ignoring all center orientations for 3x3x3), it is
     * more practical for each `KTransformation` to always track the full range
     * for each piece's `.orientation`. For example:
     *
     * - This is simpler, both conceptually and in code.
     * - This allows changing the set of moves for a puzzle, without recalculating
     *   cached transformations or certain lookup tables (useful for alg
     *   searches).
     * - This allows swapping out a normal 3x3x3 in a `<twisty-player>` for a
     *   picture cube, without re-calculating the center orientations of the
     *   current alg.
     *
     * These use cases may not be strictly "necessary", but the opposite behaviour
     * might be surprising or frustrating if someone does not expect it. So we
     * implement it this way.
     *
     * Informally, the `KTransformation` has the full responsibility for tracking
     * "what really happens" — even if the effect is invisible in some cases,
     * while the `KPattern` tracks both what "is" and what "isn't" known.
     **/
    orientationMod?: number[];
}
type KTransformationData = {
    [orbitName: string]: KTransformationOrbitData;
};
interface KTransformationOrbitData {
    permutation: number[];
    orientationDelta: number[];
}
interface KPuzzleOrbitDefinition {
    orbitName: string;
    numPieces: number;
    numOrientations: number;
}
interface KPuzzleDefinitionJSON {
    name: string;
    orbits: KPuzzleOrbitDefinition[];
    defaultPattern: KPatternData;
    moves: {
        [orbitName: string]: KTransformationData;
    };
    derivedMoves?: {
        [derivedMove: string]: string;
    };
}

interface KPuzzleDefinition extends KPuzzleDefinitionJSON {
    experimentalIsPatternSolved?: (kpattern: KPattern, options: {
        ignorePuzzleOrientation: boolean;
        ignoreCenterOrientation: boolean;
    }) => boolean;
}

declare class KTransformation {
    #private;
    readonly kpuzzle: KPuzzle;
    readonly transformationData: KTransformationData;
    constructor(kpuzzle: KPuzzle, transformationData: KTransformationData);
    toJSON(): any;
    invert(): KTransformation;
    isIdentityTransformation(): boolean;
    /** @deprecated */
    static experimentalConstructIdentity(kpuzzle: KPuzzle): KTransformation;
    isIdentical(t2: KTransformation): boolean;
    /** @deprecated */
    apply(source: KTransformationSource): KTransformation;
    applyTransformation(t2: KTransformation): KTransformation;
    applyMove(move: Move | string): KTransformation;
    applyAlg(alg: Alg | string): KTransformation;
    toKPattern(): KPattern;
    repetitionOrder(): number;
    selfMultiply(amount: number): KTransformation;
}

type KTransformationSource = Alg | Move | string | KTransformation;
declare class KPuzzle {
    #private;
    readonly definition: KPuzzleDefinition;
    private experimentalPGNotation;
    constructor(definition: KPuzzleDefinition, options?: {
        experimentalPGNotation?: PGNotation;
    });
    lookupOrbitDefinition(orbitName: string): KPuzzleOrbitDefinition;
    name(): string;
    identityTransformation(): KTransformation;
    moveToTransformation(move: Move | string): KTransformation;
    algToTransformation(alg: Alg | string): KTransformation;
    /** @deprecated */
    toTransformation(source: KTransformationSource): KTransformation;
    defaultPattern(): KPattern;
    canConvertDefaultPatternToUniqueTransformation(): boolean;
}

declare class KPattern {
    readonly kpuzzle: KPuzzle;
    readonly patternData: KPatternData;
    constructor(kpuzzle: KPuzzle, patternData: KPatternData);
    toJSON(): any;
    static fromTransformation(transformation: KTransformation): KPattern;
    /** @deprecated */
    apply(source: KTransformationSource): KPattern;
    applyTransformation(transformation: KTransformation): KPattern;
    applyMove(move: Move | string): KPattern;
    applyAlg(alg: Alg | string): KPattern;
    isIdentical(other: KPattern): boolean;
    /** @deprecated */
    experimentalToTransformation(): KTransformation | null;
    experimentalIsSolved(options: {
        ignorePuzzleOrientation: boolean;
        ignoreCenterOrientation: boolean;
    }): boolean;
}

type MillisecondTimestamp = Tagged<DOMHighResTimeStamp, "MillisecondTimestamp">;
type MillisecondDuration = Tagged<number, "MillisecondDuration">;
declare enum Direction {
    Forwards = 1,
    Paused = 0,
    Backwards = -1
}
interface MoveInProgress {
    move: Move;
    direction: Direction;
    fraction: number;
}
type PuzzlePosition = {
    pattern: KPattern;
    movesInProgress: MoveInProgress[];
};
declare enum BoundaryType {
    Move = "move",
    EntireTimeline = "entire-timeline"
}
interface TimeRange {
    start: MillisecondTimestamp;
    end: MillisecondTimestamp;
}

interface UserVisibleError {
    errors: string[];
}
declare class UserVisibleErrorTracker extends SimpleTwistyPropSource<UserVisibleError> {
    getDefaultValue(): UserVisibleError;
    reset(): void;
    protected canReuseValue(_v1: UserVisibleError, _v2: UserVisibleError): boolean;
}

type InputRecord = Record<string, any>;
type InputProps<T extends InputRecord> = {
    [s in keyof T]: TwistyPropParent<T[s]>;
};
type Generation = Tagged<number, "Generation">;
interface SourceEventDetail<OutputType> {
    sourceProp: TwistyPropSource<OutputType, any>;
    value: Promise<OutputType>;
    generation: Generation;
}
type SourceEvent<T> = CustomEvent<SourceEventDetail<T>>;
type PromiseOrValue<T> = T | Promise<T>;
declare abstract class TwistyPropParent<T> {
    #private;
    abstract get(): Promise<T>;
    canReuse(v1: T, v2: T): boolean;
    protected canReuseValue(_v1: T, _v2: T): boolean;
    debugGetChildren(): TwistyPropDerived<any, any>[];
    protected addChild(child: TwistyPropDerived<any, any>): void;
    protected removeChild(child: TwistyPropDerived<any, any>): void;
    protected lastSourceGeneration: number;
    protected markStale(sourceEvent: SourceEvent<any>): void;
    /** @deprecated */
    addRawListener(listener: () => void, options?: {
        initial: boolean;
    }): void;
    /** @deprecated */
    removeRawListener(listener: () => void): void;
    addFreshListener(listener: (value: T) => void): void;
    removeFreshListener(listener: (value: T) => void): void;
}
declare abstract class TwistyPropSource<OutputType, InputType = OutputType> extends TwistyPropParent<OutputType> {
    #private;
    abstract getDefaultValue(): PromiseOrValue<OutputType>;
    constructor(initialValue?: PromiseOrValue<InputType>);
    set(input: PromiseOrValue<InputType>): void;
    get(): Promise<OutputType>;
    protected deriveFromPromiseOrValue(input: PromiseOrValue<InputType>, oldValuePromise: Promise<OutputType>): Promise<OutputType>;
    protected abstract derive(input: InputType, oldValuePromise: Promise<OutputType>): PromiseOrValue<OutputType>;
}
declare abstract class SimpleTwistyPropSource<SimpleType> extends TwistyPropSource<SimpleType> {
    protected derive(input: SimpleType): PromiseOrValue<SimpleType>;
}
declare const NO_VALUE: unique symbol;
type NoValueType = typeof NO_VALUE;
declare abstract class TwistyPropDerived<InputTypes extends InputRecord, OutputType> extends TwistyPropParent<OutputType> {
    #private;
    protected userVisibleErrorTracker?: UserVisibleErrorTracker | undefined;
    constructor(parents: InputProps<InputTypes>, userVisibleErrorTracker?: UserVisibleErrorTracker | undefined);
    get(): Promise<OutputType>;
    protected abstract derive(input: InputTypes): PromiseOrValue<OutputType>;
}

interface AnimationTimelineLeaf {
    animLeaf: AlgLeaf;
    start: MillisecondTimestamp;
    end: MillisecondTimestamp;
}
type AnimationTimelineLeaves = AnimationTimelineLeaf[];
declare class AnimationTimelineLeavesRequestProp extends SimpleTwistyPropSource<AnimationTimelineLeaf[] | null> {
    getDefaultValue(): AnimationTimelineLeaf[] | null;
}

type AnimatedLeafAlgNode = Move | Pause;

interface CurrentMove {
    move: Move;
    direction: Direction;
    fraction: number;
    startTimestamp: MillisecondTimestamp;
    endTimestamp: MillisecondTimestamp;
}
interface CurrentMoveInfo {
    patternIndex: number;
    currentMoves: CurrentMove[];
    movesFinishing: CurrentMove[];
    movesFinished: CurrentMove[];
    movesStarting: CurrentMove[];
    latestStart: number;
    earliestEnd: number;
}
type LeafIndex = Tagged<number, "LeafIndex">;
type LeafCount = Tagged<number, "LeafCount">;
interface AlgIndexer {
    getAnimLeaf(index: LeafIndex): AnimatedLeafAlgNode | null;
    indexToMoveStartTimestamp(index: LeafIndex): MillisecondTimestamp;
    patternAtIndex(index: LeafIndex, startPattern?: KPattern): KPattern;
    transformationAtIndex(index: LeafIndex): KTransformation;
    numAnimatedLeaves(): LeafCount;
    timestampToIndex(timestamp: MillisecondTimestamp): LeafIndex;
    algDuration(): MillisecondDuration;
    moveDuration(index: LeafIndex): MillisecondDuration;
    timestampToPosition?: (timestamp: MillisecondTimestamp, startPattern?: KPattern) => PuzzlePosition;
    currentMoveInfo?: (timestamp: MillisecondTimestamp) => CurrentMoveInfo;
}

type FaceletMeshStickeringMask = "regular" | "dim" | "oriented" | "experimentalOriented2" | "ignored" | "invisible" | "mystery";
type FaceletStickeringMask = {
    mask: FaceletMeshStickeringMask;
    hintMask?: FaceletMeshStickeringMask;
};
type PieceStickeringMask = {
    facelets: (FaceletMeshStickeringMask | FaceletStickeringMask | null)[];
};
type OrbitStickeringMask = {
    pieces: (PieceStickeringMask | null)[];
};
type StickeringMask = {
    specialBehaviour?: "picture";
    name?: string;
    orbits: Record<string, OrbitStickeringMask>;
};

declare const experimentalStickerings: Record<string, {
    groups?: Partial<Record<PuzzleID, string>>;
}>;

declare const puzzleIDs: {
    "3x3x3": boolean;
    custom: boolean;
    "2x2x2": boolean;
    "4x4x4": boolean;
    "5x5x5": boolean;
    "6x6x6": boolean;
    "7x7x7": boolean;
    "40x40x40": boolean;
    megaminx: boolean;
    pyraminx: boolean;
    square1: boolean;
    clock: boolean;
    skewb: boolean;
    fto: boolean;
    gigaminx: boolean;
    master_tetraminx: boolean;
    kilominx: boolean;
    redi_cube: boolean;
    baby_fto: boolean;
    melindas2x2x2x2: boolean;
    tri_quad: boolean;
    loopover: boolean;
};
type PuzzleID = keyof typeof puzzleIDs;
declare class PuzzleIDRequestProp extends SimpleTwistyPropSource<PuzzleID | NoValueType> {
    getDefaultValue(): PuzzleID | NoValueType;
}

type ExperimentalStickering = keyof typeof experimentalStickerings;
declare class StickeringRequestProp extends SimpleTwistyPropSource<ExperimentalStickering | null> {
    getDefaultValue(): ExperimentalStickering | null;
}

declare const backViewLayouts: {
    none: boolean;
    "side-by-side": boolean;
    "top-right": boolean;
};
type BackViewLayout = keyof typeof backViewLayouts;
type BackViewLayoutWithAuto = BackViewLayout | "auto";
declare class BackViewProp extends SimpleTwistyPropSource<BackViewLayoutWithAuto> {
    getDefaultValue(): BackViewLayoutWithAuto;
}

declare const visualizationFormats: {
    readonly "3D": true;
    readonly "2D": true;
    readonly "experimental-2D-LL": true;
    readonly "experimental-2D-LL-face": true;
    readonly PG3D: true;
};
type VisualizationFormat = keyof typeof visualizationFormats;
type VisualizationFormatWithAuto = VisualizationFormat | "auto";
declare class VisualizationFormatProp extends SimpleTwistyPropSource<VisualizationFormatWithAuto> {
    getDefaultValue(): VisualizationFormatWithAuto;
}

declare let HTMLElementShim: typeof HTMLElement;

declare class ManagedCustomElement extends HTMLElementShim {
    readonly shadow: ShadowRoot;
    readonly contentWrapper: HTMLDivElement;
    constructor(options?: {
        mode?: "open" | "closed";
    });
    protected addCSS(cssSource: CSSStyleSheet): void;
    protected removeCSS(cssSource: CSSStyleSheet): void;
    addElement<T extends Node>(element: T): T;
    prependElement<T extends Node>(element: T): void;
    removeElement<T extends Node>(element: T): T;
}

interface CatchUpMove {
    move: Move | null;
    amount: number;
}
declare class CatchUpMoveProp extends SimpleTwistyPropSource<CatchUpMove> {
    getDefaultValue(): CatchUpMove;
    protected canReuseValue(v1: CatchUpMove, v2: CatchUpMove): boolean;
}

type SimpleDirection = Direction.Forwards | Direction.Backwards;
interface PlayingInfo {
    playing: boolean;
    direction: SimpleDirection;
    untilBoundary: BoundaryType;
    loop: boolean;
}
declare class PlayingInfoProp extends TwistyPropSource<PlayingInfo, Partial<PlayingInfo>> {
    getDefaultValue(): Promise<PlayingInfo>;
    protected derive(newInfo: Partial<PlayingInfo>, oldValuePromise: Promise<PlayingInfo>): Promise<PlayingInfo>;
    protected canReuseValue(v1: PlayingInfo, v2: PlayingInfo): boolean;
}

declare class ArbitraryStringProp extends SimpleTwistyPropSource<string | null> {
    getDefaultValue(): string | null;
}

declare class URLProp extends TwistyPropSource<URL | null, URL | string | null> {
    getDefaultValue(): URL | null;
    derive(input: URL | string | null): URL | null;
}

declare class AlgIssues {
    readonly warnings: readonly string[];
    readonly errors: readonly string[];
    constructor(issues?: {
        warnings?: string[];
        errors?: string[];
    });
    add(issues?: {
        warnings?: string[];
        errors?: string[];
    }): AlgIssues;
    /** @deprecated */
    log(): void;
}
interface AlgWithIssues {
    alg: Alg;
    issues: AlgIssues;
}
declare class AlgProp extends TwistyPropSource<AlgWithIssues, Alg | string> {
    getDefaultValue(): AlgWithIssues;
    protected canReuseValue(v1: AlgWithIssues, v2: AlgWithIssues): boolean;
    protected derive(newAlg: Alg | string): Promise<AlgWithIssues>;
}

type AlgTransformationPropInputs = {
    setupAlg: AlgWithIssues;
    kpuzzle: KPuzzle;
};
declare class AlgTransformationProp extends TwistyPropDerived<AlgTransformationPropInputs, KTransformation> {
    derive(input: AlgTransformationPropInputs): KTransformation;
}

declare const setupToLocations: {
    start: boolean;
    end: boolean;
};
type SetupToLocation = keyof typeof setupToLocations;
declare class SetupAnchorProp extends SimpleTwistyPropSource<SetupToLocation> {
    getDefaultValue(): SetupToLocation;
}

interface AnchorTransformationPropInputs {
    setupTransformation: KTransformation | null;
    setupAnchor: SetupToLocation;
    setupAlgTransformation: KTransformation;
    indexer: AlgIndexer;
}
declare class AnchorTransformationProp extends TwistyPropDerived<AnchorTransformationPropInputs, KTransformation> {
    derive(inputs: AnchorTransformationPropInputs): KTransformation;
}

interface CurrentLeavesSimplifiedPropInputs {
    currentMoveInfo: CurrentMoveInfo;
}
interface CurrentLeavesSimplified {
    patternIndex: LeafIndex;
    movesFinishing: Move[];
    movesFinished: Move[];
}
declare class CurrentLeavesSimplifiedProp extends TwistyPropDerived<CurrentLeavesSimplifiedPropInputs, CurrentLeavesSimplified> {
    protected derive(inputs: CurrentLeavesSimplifiedPropInputs): CurrentLeavesSimplified;
    protected canReuseValue(v1: CurrentLeavesSimplified, v2: CurrentLeavesSimplified): boolean;
}

declare const smartTimestamps: {
    auto: boolean;
    start: boolean;
    end: boolean;
    anchor: boolean;
    "opposite-anchor": boolean;
};
type TimestampRequest = MillisecondTimestamp | keyof typeof smartTimestamps;
declare class TimestampRequestProp extends SimpleTwistyPropSource<TimestampRequest> {
    getDefaultValue(): TimestampRequest;
    set(v: PromiseOrValue<TimestampRequest>): void;
    protected validInput(v: TimestampRequest): boolean;
}

interface DetailedTimelineInfoInputs {
    timestampRequest: TimestampRequest;
    timeRange: TimeRange;
    setupAnchor: SetupToLocation;
    setupAlg: AlgWithIssues;
}
interface DetailedTimelineInfo {
    timestamp: MillisecondTimestamp;
    timeRange: TimeRange;
    atStart: boolean;
    atEnd: boolean;
}
declare class DetailedTimelineInfoProp extends TwistyPropDerived<DetailedTimelineInfoInputs, DetailedTimelineInfo> {
    #private;
    protected derive(inputs: DetailedTimelineInfoInputs): DetailedTimelineInfo;
    protected canReuseValue(v1: DetailedTimelineInfo, v2: DetailedTimelineInfo): boolean;
}

interface PositionPropInputs {
    indexer: AlgIndexer;
    detailedTimelineInfo: DetailedTimelineInfo;
    catchUpMove: CatchUpMove;
}
declare class CurrentMoveInfoProp extends TwistyPropDerived<PositionPropInputs, CurrentMoveInfo> {
    derive(inputs: PositionPropInputs): CurrentMoveInfo;
}

interface CurrentTransformationPropInputs {
    anchoredStart: KTransformation;
    currentLeavesSimplified: CurrentLeavesSimplified;
    indexer: AlgIndexer;
}
declare class CurrentPatternProp extends TwistyPropDerived<CurrentTransformationPropInputs, KPattern> {
    derive(inputs: CurrentTransformationPropInputs): KPattern;
}

type VisualizationStrategyPropInputs = {
    visualizationRequest: VisualizationFormatWithAuto;
    puzzleID: PuzzleID;
};
type VisualizationStrategy = "Cube3D" | "2D" | "experimental-2D-LL" | "experimental-2D-LL-face" | "PG3D";
declare class VisualizationStrategyProp extends TwistyPropDerived<VisualizationStrategyPropInputs, VisualizationStrategy> {
    derive(inputs: VisualizationStrategyPropInputs): VisualizationStrategy;
}

declare const indexerStrategyNames: {
    auto: boolean;
    simple: boolean;
    tree: boolean;
    simultaneous: boolean;
};
type IndexerStrategyName = keyof typeof indexerStrategyNames;
declare class IndexerConstructorRequestProp extends SimpleTwistyPropSource<IndexerStrategyName> {
    getDefaultValue(): IndexerStrategyName;
}

type IndexerConstructor = new (kpuzzle: KPuzzle, alg: Alg, options?: {
    animationTimelineLeaves?: AnimationTimelineLeaves | null;
}) => AlgIndexer;
interface IndexerConstructorPropInputs {
    puzzle: PuzzleID;
    alg: AlgWithIssues;
    visualizationStrategy: VisualizationStrategy;
    indexerConstructorRequest: IndexerStrategyName;
    animationTimelineLeaves: AnimationTimelineLeaves | null;
}
declare class IndexerConstructorProp extends TwistyPropDerived<IndexerConstructorPropInputs, IndexerConstructor> {
    derive(inputs: IndexerConstructorPropInputs): IndexerConstructor;
}

type IndexerPropInputs = {
    indexerConstructor: IndexerConstructor;
    algWithIssues: AlgWithIssues;
    kpuzzle: KPuzzle;
    animationTimelineLeaves: AnimationTimelineLeaves | null;
};
declare class IndexerProp extends TwistyPropDerived<IndexerPropInputs, AlgIndexer> {
    derive(input: IndexerPropInputs): AlgIndexer;
}

interface LegacyPositionPropInputs {
    currentMoveInfo: CurrentMoveInfo;
    currentPattern: KPattern;
}
declare class LegacyPositionProp extends TwistyPropDerived<LegacyPositionPropInputs, PuzzlePosition> {
    derive(inputs: LegacyPositionPropInputs): PuzzlePosition;
}

declare class PuzzleAlgProp extends TwistyPropDerived<{
    algWithIssues: AlgWithIssues;
    kpuzzle: KPuzzle;
}, AlgWithIssues> {
    derive(inputs: {
        algWithIssues: AlgWithIssues;
        kpuzzle: KPuzzle;
    }): Promise<AlgWithIssues>;
}

declare class SetupTransformationProp extends SimpleTwistyPropSource<KTransformation | null> {
    getDefaultValue(): KTransformation | null;
}

declare class KPuzzleProp extends TwistyPropDerived<{
    puzzleLoader: PuzzleLoader;
}, KPuzzle> {
    derive(inputs: {
        puzzleLoader: PuzzleLoader;
    }): Promise<KPuzzle>;
}

declare class PGPuzzleDescriptionStringProp extends SimpleTwistyPropSource<PuzzleDescriptionString | NoValueType> {
    getDefaultValue(): PuzzleDescriptionString | NoValueType;
}

declare class PuzzleIDProp extends TwistyPropDerived<{
    puzzleLoader: PuzzleLoader;
}, PuzzleID> {
    derive(inputs: {
        puzzleLoader: PuzzleLoader;
    }): Promise<PuzzleID>;
}

interface PuzzleLoaderPropInputs {
    puzzleIDRequest: PuzzleID | NoValueType;
    puzzleDescriptionRequest: PuzzleDescriptionString | NoValueType;
}
declare class PuzzleLoaderProp extends TwistyPropDerived<PuzzleLoaderPropInputs, PuzzleLoader> {
    derive(inputs: PuzzleLoaderPropInputs): PuzzleLoader;
}

declare class TwistyPlayerController {
    private model;
    animationController: TwistyAnimationController;
    constructor(model: TwistyPlayerModel, delegate: TwistyAnimationControllerDelegate);
    jumpToStart(options?: {
        flash: boolean;
    }): void;
    jumpToEnd(options?: {
        flash: boolean;
    }): void;
    togglePlay(play?: boolean): void;
    visitTwizzleLink(): Promise<void>;
}

declare const viewerLinkPages: {
    twizzle: boolean;
    "experimental-twizzle-explorer": boolean;
    none: boolean;
};
type ViewerLinkPage = keyof typeof viewerLinkPages;
type ViewerLinkPageWithAuto = ViewerLinkPage | "auto";
declare class ViewerLinkProp extends SimpleTwistyPropSource<ViewerLinkPageWithAuto> {
    getDefaultValue(): ViewerLinkPageWithAuto;
}

declare const buttonIcons: string[];
type ButtonIcon = (typeof buttonIcons)[number];
interface ButtonAppearance {
    enabled: boolean;
    icon: ButtonIcon;
    title: string;
    hidden?: boolean;
}
type ButtonAppearances = Record<ButtonCommand, ButtonAppearance>;
interface ButtonAppearancePropInputs {
    coarseTimelineInfo: CoarseTimelineInfo;
    viewerLink: ViewerLinkPageWithAuto;
}
declare class ButtonAppearanceProp extends TwistyPropDerived<ButtonAppearancePropInputs, ButtonAppearances> {
    derive(inputs: ButtonAppearancePropInputs): ButtonAppearances;
}

declare const colorSchemes: {
    light: boolean;
    dark: boolean;
};
type ColorScheme = keyof typeof colorSchemes;
type ColorSchemeWithAuto = ColorScheme | "auto";
declare class ColorSchemeRequestProp extends SimpleTwistyPropSource<ColorSchemeWithAuto> {
    getDefaultValue(): ColorSchemeWithAuto;
}

declare const buttonCommands: {
    fullscreen: boolean;
    "jump-to-start": boolean;
    "play-step-backwards": boolean;
    "play-pause": boolean;
    "play-step": boolean;
    "jump-to-end": boolean;
    "twizzle-link": boolean;
};
type ButtonCommand = keyof typeof buttonCommands;
declare class TwistyButtons extends ManagedCustomElement {
    #private;
    model?: TwistyPlayerModel | undefined;
    controller?: TwistyPlayerController | undefined;
    private defaultFullscreenElement?;
    buttons: Record<ButtonCommand, TwistyButton> | null;
    constructor(model?: TwistyPlayerModel | undefined, controller?: TwistyPlayerController | undefined, defaultFullscreenElement?: HTMLElement | undefined);
    connectedCallback(): void;
    onFullscreenButton(): Promise<void>;
    update(buttonAppearances: ButtonAppearances): Promise<void>;
    updateColorScheme(colorScheme: ColorScheme): void;
}
declare class TwistyButton extends ManagedCustomElement {
    #private;
    htmlButton: HTMLButtonElement;
    updateColorScheme(colorScheme: ColorScheme): void;
    connectedCallback(): void;
    setIcon(iconName: ButtonIcon): void;
}

interface CoarseTimelineInfoInputs {
    playingInfo: PlayingInfo;
    detailedTimelineInfo: DetailedTimelineInfo;
}
interface CoarseTimelineInfo {
    playing: boolean;
    atStart: boolean;
    atEnd: boolean;
}
declare class CoarseTimelineInfoProp extends TwistyPropDerived<CoarseTimelineInfoInputs, CoarseTimelineInfo> {
    protected derive(inputs: CoarseTimelineInfoInputs): CoarseTimelineInfo;
    protected canReuseValue(v1: CoarseTimelineInfo, v2: CoarseTimelineInfo): boolean;
}

declare class TempoScaleProp extends TwistyPropSource<number, number> {
    getDefaultValue(): number;
    derive(v: number): number;
}

declare const controlsLocations: {
    "bottom-row": boolean;
    none: boolean;
};
type ControlsLocation = keyof typeof controlsLocations;
type ControlPanelThemeWithAuto = ControlsLocation | "auto";
declare class ControlPanelProp extends SimpleTwistyPropSource<ControlPanelThemeWithAuto> {
    getDefaultValue(): ControlPanelThemeWithAuto;
}

declare class TimeRangeProp extends TwistyPropDerived<{
    indexer: AlgIndexer;
}, TimeRange> {
    derive(inputs: {
        indexer: AlgIndexer;
    }): TimeRange;
}

type FaceletScale = "auto" | number;
declare class FaceletScaleProp extends SimpleTwistyPropSource<FaceletScale> {
    getDefaultValue(): FaceletScale;
}

type FoundationDisplay = "auto" | "opaque" | "none";
declare class FoundationDisplayProp extends SimpleTwistyPropSource<FoundationDisplay> {
    getDefaultValue(): FoundationDisplay;
}

declare const hintFaceletStyles: {
    floating: boolean;
    none: boolean;
};
type HintFaceletStyle = keyof typeof hintFaceletStyles;
type HintFaceletStyleWithAuto = HintFaceletStyle | "auto";
declare class HintFaceletProp extends SimpleTwistyPropSource<HintFaceletStyleWithAuto> {
    getDefaultValue(): HintFaceletStyleWithAuto;
}

type HintFaceletsElevationRequest = "auto" | number;
declare class HintFaceletsElevationProp extends SimpleTwistyPropSource<"auto" | number> {
    getDefaultValue(): "auto" | number;
}

type InitialHintFaceletsAnimation = "auto" | "always" | "none";
declare class InitialHintFaceletsAnimationProp extends SimpleTwistyPropSource<InitialHintFaceletsAnimation> {
    getDefaultValue(): InitialHintFaceletsAnimation;
}

type SpritePropInputs = {
    spriteURL: URL | null;
};
declare class SpriteProp extends TwistyPropDerived<SpritePropInputs, Texture | null> {
    derive(inputs: SpritePropInputs): Promise<Texture | null>;
}

interface StickeringMaskPropInputs {
    stickeringMaskRequest: StickeringMask | null;
    stickeringRequest: ExperimentalStickering | null;
    puzzleLoader: PuzzleLoader;
}
declare class StickeringMaskProp extends TwistyPropDerived<StickeringMaskPropInputs, StickeringMask> {
    getDefaultValue(): StickeringMask;
    derive(inputs: StickeringMaskPropInputs): Promise<StickeringMask>;
}

declare class StickeringMaskRequestProp extends TwistyPropSource<StickeringMask | null, string | StickeringMask | null> {
    getDefaultValue(): StickeringMask | null;
    derive(input: string | StickeringMask | null): StickeringMask | null;
}

declare const dragInputModes: {
    auto: boolean;
    none: boolean;
};
type DragInputMode = keyof typeof dragInputModes;
declare class DragInputProp extends SimpleTwistyPropSource<DragInputMode> {
    getDefaultValue(): DragInputMode;
}

declare class MovePressCancelOptions extends SimpleTwistyPropSource<AppendCancelOptions> {
    getDefaultValue(): AppendCancelOptions;
}

declare const movePressInputNames: {
    auto: boolean;
    none: boolean;
    basic: boolean;
};
type MovePressInput = keyof typeof movePressInputNames;
declare class MovePressInputProp extends SimpleTwistyPropSource<MovePressInput> {
    getDefaultValue(): MovePressInput;
}

declare const backgroundThemes: {
    checkered: boolean;
    "checkered-transparent": boolean;
    none: boolean;
};
type BackgroundTheme = keyof typeof backgroundThemes;
type BackgroundThemeWithAuto = BackgroundTheme | "auto";
declare class BackgroundProp extends SimpleTwistyPropSource<BackgroundThemeWithAuto> {
    getDefaultValue(): BackgroundThemeWithAuto;
}

interface ColorSchemePropInputs {
    colorSchemeRequest: ColorSchemeWithAuto;
}
declare class ColorSchemeProp extends TwistyPropDerived<ColorSchemePropInputs, ColorScheme> {
    protected derive(inputs: ColorSchemePropInputs): ColorScheme;
}

declare class DOMElementReferenceProp extends SimpleTwistyPropSource<Element | null> {
    getDefaultValue(): Element | null;
}

type CoordinateDegrees = number;
interface OrbitCoordinates {
    latitude: CoordinateDegrees;
    longitude: CoordinateDegrees;
    distance: number;
}
type OrbitCoordinatesRequest = Partial<OrbitCoordinates> | "auto";
declare class OrbitCoordinatesRequestProp extends TwistyPropSource<OrbitCoordinatesRequest, Partial<OrbitCoordinates> | "auto"> {
    getDefaultValue(): OrbitCoordinatesRequest;
    protected canReuseValue(v1: OrbitCoordinates, v2: OrbitCoordinates): boolean;
    protected derive(newCoordinates: Partial<OrbitCoordinates> | "auto", oldValuePromise: Promise<OrbitCoordinatesRequest>): Promise<OrbitCoordinatesRequest>;
}

declare class LatitudeLimitProp extends SimpleTwistyPropSource<CoordinateDegrees> {
    getDefaultValue(): CoordinateDegrees;
}

interface OrbitCoordinatesPropInputs {
    orbitCoordinatesRequest: OrbitCoordinatesRequest;
    latitudeLimit: CoordinateDegrees;
    puzzleID: PuzzleID;
    strategy: VisualizationStrategy;
}
declare class OrbitCoordinatesProp extends TwistyPropDerived<OrbitCoordinatesPropInputs, OrbitCoordinates> {
    canReuseValue(v1: OrbitCoordinates, v2: OrbitCoordinates): boolean;
    derive(inputs: OrbitCoordinatesPropInputs): Promise<OrbitCoordinates>;
}

declare class TwistySceneModel {
    twistyPlayerModel: TwistyPlayerModel;
    background: BackgroundProp;
    colorSchemeRequest: ColorSchemeRequestProp;
    dragInput: DragInputProp;
    foundationDisplay: FoundationDisplayProp;
    foundationStickerSpriteURL: URLProp;
    fullscreenElement: DOMElementReferenceProp;
    hintFacelet: HintFaceletProp;
    hintStickerSpriteURL: URLProp;
    initialHintFaceletsAnimation: InitialHintFaceletsAnimationProp;
    hintFaceletsElevation: HintFaceletsElevationProp;
    latitudeLimit: LatitudeLimitProp;
    movePressInput: MovePressInputProp;
    movePressCancelOptions: MovePressCancelOptions;
    orbitCoordinatesRequest: OrbitCoordinatesRequestProp;
    stickeringMaskRequest: StickeringMaskRequestProp;
    stickeringRequest: StickeringRequestProp;
    faceletScale: FaceletScaleProp;
    colorScheme: ColorSchemeProp;
    foundationStickerSprite: SpriteProp;
    hintStickerSprite: SpriteProp;
    orbitCoordinates: OrbitCoordinatesProp;
    stickeringMask: StickeringMaskProp;
    constructor(twistyPlayerModel: TwistyPlayerModel);
}

type Without<T, K extends string[]> = Pick<T, Exclude<keyof T, K[number]>>;
declare class TwistyPlayerModel {
    userVisibleErrorTracker: UserVisibleErrorTracker;
    /******************************** Depth 0 ********************************/
    alg: AlgProp;
    backView: BackViewProp;
    controlPanel: ControlPanelProp;
    catchUpMove: CatchUpMoveProp;
    indexerConstructorRequest: IndexerConstructorRequestProp;
    playingInfo: PlayingInfoProp;
    puzzleDescriptionRequest: PGPuzzleDescriptionStringProp;
    puzzleIDRequest: PuzzleIDRequestProp;
    setupAnchor: SetupAnchorProp;
    setupAlg: AlgProp;
    setupTransformation: SetupTransformationProp;
    tempoScale: TempoScaleProp;
    timestampRequest: TimestampRequestProp;
    viewerLink: ViewerLinkProp;
    visualizationFormat: VisualizationFormatProp;
    title: ArbitraryStringProp;
    videoURL: URLProp;
    competitionID: ArbitraryStringProp;
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
    animationTimelineLeavesRequest: AnimationTimelineLeavesRequestProp;
    /******************************** Depth 1 ********************************/
    puzzleLoader: PuzzleLoaderProp;
    /******************************** Depth 2 ********************************/
    kpuzzle: KPuzzleProp;
    puzzleID: PuzzleIDProp;
    /******************************** Depth 3 ********************************/
    puzzleAlg: PuzzleAlgProp;
    puzzleSetupAlg: PuzzleAlgProp;
    visualizationStrategy: VisualizationStrategyProp;
    /******************************** Depth 4 ********************************/
    indexerConstructor: IndexerConstructorProp;
    setupAlgTransformation: AlgTransformationProp;
    /******************************** Depth 5 ********************************/
    indexer: IndexerProp;
    /******************************** Depth 6 ********************************/
    anchorTransformation: AnchorTransformationProp;
    timeRange: TimeRangeProp;
    /******************************** Depth 7 ********************************/
    detailedTimelineInfo: DetailedTimelineInfoProp;
    /******************************** Depth 8 ********************************/
    coarseTimelineInfo: CoarseTimelineInfoProp;
    currentMoveInfo: CurrentMoveInfoProp;
    /******************************** Depth 9 ********************************/
    buttonAppearance: ButtonAppearanceProp;
    currentLeavesSimplified: CurrentLeavesSimplifiedProp;
    /******************************** Depth 10 ********************************/
    currentPattern: CurrentPatternProp;
    /******************************** Depth 11 ********************************/
    legacyPosition: LegacyPositionProp;
    twistySceneModel: TwistySceneModel;
    twizzleLink(): Promise<string>;
    experimentalAddAlgLeaf(algLeaf: AlgLeaf, options?: AppendOptions): void;
    experimentalAddMove(flexibleMove: Move | string, options?: Without<AppendOptions, [
        "puzzleLoader",
        "puzzleSpecificSimplifyOptions"
    ]>): void;
    experimentalRemoveFinalChild(): void;
}

interface TwistyAnimationControllerDelegate {
    flash(): void;
}
declare class TwistyAnimationController {
    #private;
    private delegate;
    private playing;
    private direction;
    private catchUpHelper;
    private model;
    private lastDatestamp;
    private lastTimestampPromise;
    private scheduler;
    constructor(model: TwistyPlayerModel, delegate: TwistyAnimationControllerDelegate);
    onPlayingProp(playingInfo: PlayingInfo): Promise<void>;
    onCatchUpMoveProp(catchUpMove: CatchUpMove): Promise<void>;
    jumpToStart(options?: {
        flash: boolean;
    }): void;
    jumpToEnd(options?: {
        flash: boolean;
    }): void;
    playPause(): void;
    play(options?: {
        direction?: SimpleDirection;
        untilBoundary?: BoundaryType;
        autoSkipToOtherEndIfStartingAtBoundary?: boolean;
        loop?: boolean;
    }): void;
    pause(): void;
    animFrame(frameDatestamp: MillisecondTimestamp): Promise<void>;
}

/**
 * @author mrdoob / http://mrdoob.com/
 * ESM conversion by Lucas Garron, 2021-12-21
 */
declare class Stats {
    mode: number;
    dom: HTMLDivElement;
    constructor();
    addPanel(panel: StatsPanel): StatsPanel;
    showPanel(id: number): void;
    beginTime: number;
    prevTime: number;
    frames: number;
    fpsPanel: StatsPanel;
    msPanel: StatsPanel;
    memPanel: StatsPanel | null;
    REVISION: number;
    begin(): void;
    end(): number;
    update(): void;
}
declare class StatsPanel {
    private name;
    private fg;
    private bg;
    min: number;
    max: number;
    dom: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    constructor(name: string, fg: string, bg: string);
    update(value: number, maxValue: number): void;
}

interface Schedulable {
    scheduleRender(): void;
}

interface DragMovementInfo {
    attachedInfo: Record<any, any>;
    movementX: number;
    movementY: number;
    elapsedMs: number;
}
interface PressInfo {
    normalizedX: number;
    normalizedY: number;
    rightClick: boolean;
    keys: {
        altKey: boolean;
        ctrlOrMetaKey: boolean;
        shiftKey: boolean;
    };
}
declare class DragTracker extends EventTarget {
    #private;
    readonly target: HTMLElement;
    constructor(target: HTMLElement);
    start(): void;
    stop(): void;
    addTargetListener(eventType: string, listener: ((e: MouseEvent) => any) | ((e: PointerEvent) => any)): void;
    private onPointerDown;
    private onPointerMove;
    private onPointerUp;
}

interface Twisty3DPuzzle extends Object3D {
    onPositionChange(position: PuzzlePosition): void;
    setStickeringMask(stickeringMask: StickeringMask): void;
}

declare class Twisty3DPuzzleWrapper extends EventTarget implements Schedulable {
    #private;
    private model;
    schedulable: Schedulable;
    private puzzleLoader;
    private visualizationStrategy;
    constructor(model: TwistyPlayerModel, schedulable: Schedulable, puzzleLoader: PuzzleLoader, visualizationStrategy: VisualizationStrategy);
    disconnect(): void;
    scheduleRender(): void;
    twisty3DPuzzle(): Promise<Twisty3DPuzzle>;
    raycastMove(raycasterPromise: Promise<Raycaster>, transformations: {
        invert: boolean;
        depth?: "secondSlice" | "rotation" | "none";
    }): Promise<void>;
}

declare class Twisty3DSceneWrapper extends ManagedCustomElement implements Schedulable {
    #private;
    model?: TwistyPlayerModel | undefined;
    disconnect(): void;
    constructor(model?: TwistyPlayerModel | undefined);
    connectedCallback(): Promise<void>;
    setBackView(backView: BackViewLayout): void;
    onPress(e: CustomEvent<{
        pressInfo: PressInfo;
        cameraPromise: Promise<PerspectiveCamera>;
    }>): Promise<void>;
    scene(): Promise<Scene>;
    addVantage(vantage: Twisty3DVantage): void;
    removeVantage(vantage: Twisty3DVantage): void;
    experimentalVantages(): Iterable<Twisty3DVantage>;
    scheduleRender(): void;
    setCurrentTwisty3DPuzzleWrapper(scene: Scene, twisty3DPuzzleWrapper: Twisty3DPuzzleWrapper): Promise<void>;
    /** @deprecated */
    experimentalTwisty3DPuzzleWrapper(): Promise<Twisty3DPuzzleWrapper>;
    onPuzzle(inputs: [
        puzzleLoader: PuzzleLoader,
        visualizationStrategy: VisualizationStrategy
    ]): Promise<void>;
}

declare class TwistyOrbitControls {
    private model;
    private mirror;
    private canvas;
    private dragTracker;
    /** @deprecated */
    experimentalInertia: boolean;
    private onMovementBound;
    experimentalHasBeenMoved: boolean;
    constructor(model: TwistyPlayerModel, mirror: boolean, canvas: HTMLCanvasElement, dragTracker: DragTracker);
    temperMovement(f: number): number;
    onMove(e: CustomEvent<DragMovementInfo>): void;
    onMovement(movementX: number, movementY: number): {
        temperedX: number;
        temperedY: number;
    };
    onUp(e: CustomEvent<DragMovementInfo>): void;
}

declare class Twisty3DVantage extends ManagedCustomElement {
    #private;
    private model?;
    private options?;
    scene: Twisty3DSceneWrapper | null;
    stats: Stats | null;
    private rendererIsShared;
    loadingElement: HTMLDivElement | null;
    constructor(model?: TwistyPlayerModel | undefined, scene?: Twisty3DSceneWrapper, options?: {
        backView?: boolean;
    } | undefined);
    connectedCallback(): Promise<void>;
    clearCanvas(): Promise<void>;
    renderer(): Promise<WebGLRenderer>;
    canvasInfo(): Promise<{
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
    }>;
    camera(): Promise<PerspectiveCamera>;
    orbitControls(): Promise<TwistyOrbitControls>;
    addListener<T>(prop: TwistyPropParent<T>, listener: (value: T) => void): void;
    disconnect(): void;
    experimentalNextRenderFinishedCallback(callback: () => void): void;
    render(): Promise<void>;
    scheduleRender(): void;
}

declare abstract class TwistyPlayerSettable extends ManagedCustomElement {
    experimentalModel: TwistyPlayerModel;
    set alg(newAlg: Alg | string);
    get alg(): never;
    set experimentalSetupAlg(newSetup: Alg | string);
    get experimentalSetupAlg(): never;
    set experimentalSetupAnchor(anchor: SetupToLocation);
    get experimentalSetupAnchor(): never;
    set puzzle(puzzleID: PuzzleID);
    get puzzle(): never;
    set experimentalPuzzleDescription(puzzleDescription: PuzzleDescriptionString);
    get experimentalPuzzleDescription(): never;
    set timestamp(timestamp: TimestampRequest);
    get timestamp(): never;
    set hintFacelets(hintFaceletStyle: HintFaceletStyleWithAuto);
    get hintFacelets(): never;
    set experimentalStickering(stickering: ExperimentalStickering);
    get experimentalStickering(): never;
    set experimentalStickeringMaskOrbits(stickeringMask: string | StickeringMask);
    get experimentalStickeringMaskOrbits(): never;
    set experimentalFaceletScale(faceletScale: FaceletScale);
    get experimentalFaceletScale(): never;
    set backView(backView: BackViewLayoutWithAuto);
    get backView(): never;
    set background(backgroundTheme: BackgroundThemeWithAuto);
    get background(): never;
    set colorScheme(colorScheme: ColorSchemeWithAuto);
    get colorScheme(): never;
    set controlPanel(newControlPanel: ControlPanelThemeWithAuto);
    get controlPanel(): never;
    set visualization(visualizationFormat: VisualizationFormatWithAuto);
    get visualization(): never;
    set experimentalTitle(title: string | null);
    get experimentalTitle(): never;
    set experimentalVideoURL(videoURL: string | null);
    get experimentalVideoURL(): never;
    set experimentalCompetitionID(competitionID: string | null);
    get experimentalCompetitionID(): never;
    set viewerLink(viewerLinkPage: ViewerLinkPageWithAuto);
    get viewerLink(): never;
    set experimentalMovePressInput(movePressInput: MovePressInput);
    get experimentalMovePressInput(): never;
    set experimentalMovePressCancelOptions(movePressCancelOptions: AppendCancelOptions);
    get experimentalMovePressCancelOptions(): never;
    set cameraLatitude(latitude: number);
    get cameraLatitude(): never;
    set cameraLongitude(longitude: number);
    get cameraLongitude(): never;
    set cameraDistance(distance: number);
    get cameraDistance(): never;
    set cameraLatitudeLimit(latitudeLimit: number);
    get cameraLatitudeLimit(): never;
    set indexer(indexer: IndexerStrategyName);
    get indexer(): never;
    set tempoScale(newTempoScale: number);
    get tempoScale(): never;
    set experimentalSprite(url: string | URL);
    get experimentalSprite(): never;
    set experimentalHintSprite(url: string | URL);
    get experimentalHintSprite(): never;
    set fullscreenElement(element: Element | null);
    get fullscreenElement(): never;
    set experimentalInitialHintFaceletsAnimation(anim: InitialHintFaceletsAnimation);
    get experimentalInitialHintFaceletsAnimation(): never;
    set experimentalHintFaceletsElevation(elevation: "auto" | number);
    get experimentalHintFaceletsElevation(): never;
    set experimentalDragInput(dragInputMode: DragInputMode);
    get experimentalDragInput(): never;
    experimentalGet: ExperimentalGetters;
}
declare class ExperimentalGetters {
    private model;
    constructor(model: TwistyPlayerModel);
    alg(): Promise<Alg>;
    setupAlg(): Promise<Alg>;
    puzzleID(): Promise<PuzzleID>;
    timestamp(): Promise<MillisecondTimestamp>;
}

/**
 * The config argument passed to {@link TwistyPlayer} when calling the
 * constructor. This interface type be useful for avoiding bugs when you would
 * like to create a {@link TwistyPlayer} using a dynamic config, or by combining
 * configs.
 *
 * ```js
 * import { TwistyPlayer, type TwistyPlayerConfig } from "cubing/twisty";
 *
 * const MY_DEFAULT_CONFIG: TwistyPlayerConfig = {
 *   puzzle: "megaminx",
 *   alg: "R U R'"
 * };
 * export function createTwistyPlayer(overrideConfig: TwistyPlayerConfig) {
 *   const options = { ...MY_DEFAULT_CONFIG, ...overrideConfig };
 *   return new TwistyPlayer(options);
 * }
 *
 * // Example: if the current page is https://alpha.twizzle.net/edit/?alg=M2+E2+S2
 * // then this gives us the "alg" param value "M2 E2 S2".
 * const myOverrideConfig: TwistyPlayerConfig = {};
 * const algParam = new URL(location.href).searchParams.get("alg");
 * if (algParam) {
 *   myOverrideConfig.alg = algParam;
 * }
 * createTwistyPlayer(myOverrideConfig);
 * ```
 *
 * @category TwistyPlayer
 */
interface TwistyPlayerConfig {
    alg?: Alg | string;
    experimentalSetupAlg?: Alg | string;
    experimentalSetupAnchor?: SetupToLocation;
    puzzle?: PuzzleID;
    experimentalPuzzleDescription?: PuzzleDescriptionString;
    visualization?: VisualizationFormatWithAuto;
    hintFacelets?: HintFaceletStyleWithAuto;
    experimentalStickering?: ExperimentalStickering | null;
    experimentalStickeringMaskOrbits?: StickeringMask | string;
    background?: BackgroundThemeWithAuto;
    colorScheme?: ColorSchemeWithAuto;
    controlPanel?: ControlPanelThemeWithAuto;
    backView?: BackViewLayoutWithAuto;
    experimentalInitialHintFaceletsAnimation?: InitialHintFaceletsAnimation;
    experimentalFaceletScale?: FaceletScale;
    experimentalHintFaceletsElevation?: HintFaceletsElevationRequest;
    viewerLink?: ViewerLinkPageWithAuto;
    experimentalMovePressInput?: MovePressInput;
    experimentalDragInput?: DragInputMode;
    experimentalTitle?: string | null;
    experimentalVideoURL?: string;
    experimentalCompetitionID?: string;
    cameraLatitude?: number;
    cameraLongitude?: number;
    cameraDistance?: number;
    cameraLatitudeLimit?: number;
    tempoScale?: number;
    experimentalSprite?: string | null;
    experimentalHintSprite?: string | null;
    experimentalMovePressCancelOptions?: AppendCancelOptions;
}
declare const intersectedCallback: unique symbol;
/**
 * TwistyPlayer is the heart of `cubing.js`. It can be used to display a puzzle on a web page like this:
 *
 *     <script src="path/to/cubing/twisty" type="module"></script>
 *     <twisty-player alg="R U R'"></twisty-player>
 *
 * You can also construct it directly in JavaScript:
 *
 * ```js
 * import { TwistyPlayer } from "cubing/twisty";
 * const twistyPlayer = new TwistyPlayer({alg: "R U R'"});
 * // Once the page has loaded, you can do this:
 * document.body.appendChild(twistyPlayer);
 * ```
 *
 * See {@link https://js.cubing.net/cubing/} for more examples.
 *
 * @category TwistyPlayer
 */
declare class TwistyPlayer extends TwistyPlayerSettable implements TwistyAnimationControllerDelegate {
    #private;
    controller: TwistyPlayerController;
    buttons?: TwistyButtons;
    experimentalCanvasClickCallback: (...args: any) => void;
    constructor(config?: TwistyPlayerConfig);
    connectedCallback(): void;
    [intersectedCallback](): Promise<void>;
    /** @deprecated */
    experimentalSetFlashLevel(newLevel: "auto" | "none"): void;
    flash(): void;
    experimentalCurrentVantages(): Promise<Iterable<Twisty3DVantage>>;
    experimentalCurrentCanvases(): Promise<HTMLCanvasElement[]>;
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
    experimentalCurrentThreeJSPuzzleObject(puzzleRenderScheduledCallback?: () => void): Promise<Object3D>;
    jumpToStart(options?: {
        flash: boolean;
    }): void;
    jumpToEnd(options?: {
        flash: boolean;
    }): void;
    play(): void;
    pause(): void;
    togglePlay(play?: boolean): void;
    experimentalAddMove(flexibleMove: Move | string, options?: AppendOptions): void;
    experimentalAddAlgLeaf(algLeaf: AlgLeaf, options?: AppendOptions): void;
    static get observedAttributes(): string[];
    experimentalRemoveFinalChild(): void;
    attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string): void;
    experimentalScreenshot(options?: {
        width: number;
        height: number;
    }): Promise<string>;
    experimentalDownloadScreenshot(filename?: string): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        "twisty-player": TwistyPlayer;
    }
}

declare const startCharIndexKey: unique symbol;
declare const endCharIndexKey: unique symbol;
interface ParserIndexed {
    [startCharIndexKey]: number;
    [endCharIndexKey]: number;
}
type Parsed<T extends Alg | AlgNode> = T & ParserIndexed;

type AnimatedLeafAlgNodeInfo = {
    leaf: Parsed<AnimatedLeafAlgNode>;
    idx: LeafIndex;
};
type OrderedLeafTokens = AnimatedLeafAlgNodeInfo[];

declare class TwistyAlgEditorValueProp extends SimpleTwistyPropSource<string> {
    getDefaultValue(): string;
}
interface AlgEditorAlgWithIssuesPropInput {
    value: string;
}
declare class AlgEditorAlgWithIssuesProp extends TwistyPropDerived<AlgEditorAlgWithIssuesPropInput, AlgWithIssues> {
    derive(input: AlgEditorAlgWithIssuesPropInput): AlgWithIssues;
}
interface SelectionInfoPropInput {
    selectionStart: number;
    selectionEnd: number;
}
interface SelectionInfo extends SelectionInfoPropInput {
    endChangedMostRecently: boolean;
}
declare class TwistyAlgEditorSelectionProp extends TwistyPropSource<SelectionInfo, SelectionInfoPropInput> {
    getDefaultValue(): {
        selectionStart: number;
        selectionEnd: number;
        endChangedMostRecently: boolean;
    };
    derive(input: SelectionInfoPropInput, oldValue: Promise<SelectionInfo>): Promise<SelectionInfo>;
}
interface TargetCharPropInputs {
    selectionInfo: SelectionInfo;
}
declare class TargetCharProp extends TwistyPropDerived<TargetCharPropInputs, number> {
    derive(inputs: TargetCharPropInputs): number;
}
interface LeafTokensPropInputs {
    algWithIssues: AlgWithIssues;
}
declare class LeafTokensProp extends TwistyPropDerived<LeafTokensPropInputs, OrderedLeafTokens> {
    derive(inputs: LeafTokensPropInputs): OrderedLeafTokens;
}
interface LeafToHighlightPropInputs {
    targetChar: number;
    leafTokens: OrderedLeafTokens;
}
type HighlightWhere = "before" | "start" | "inside" | "end" | "after";
interface HighlightInfo {
    leafInfo: AnimatedLeafAlgNodeInfo;
    where: HighlightWhere;
}
declare class LeafToHighlightProp extends TwistyPropDerived<LeafToHighlightPropInputs, HighlightInfo | null> {
    derive(inputs: LeafToHighlightPropInputs): HighlightInfo | null;
}
declare class TwistyAlgEditorModel {
    valueProp: TwistyAlgEditorValueProp;
    selectionProp: TwistyAlgEditorSelectionProp;
    targetCharProp: TargetCharProp;
    algEditorAlgWithIssues: AlgEditorAlgWithIssuesProp;
    leafTokensProp: LeafTokensProp;
    leafToHighlight: LeafToHighlightProp;
}

/**
 * Warning: the current implementation of <twisty-alg-editor> is *not good*,
 * but it is *good enough*. The important parts is that:
 *
 * - The editor can be used in apps without much effort.
 * - The editor handles alg validation and move highlighting *okay* when not
 *   connected to a `<twisty-player>`.
 * - The editor stays in sync if it's connected to a `<twisty-player>`.
 *
 * The current implementation still has some race conditions and edge cases. A
 * proper rewrite with a better model would be very welcome.
 */

type TwistyPlayerAlgProp = "alg" | "setupAlg";
/** @category Other Custom Elements */
declare class TwistyAlgEditor extends ManagedCustomElement {
    #private;
    model: TwistyAlgEditorModel;
    debugNeverRequestTimestamp: boolean;
    constructor(options?: {
        twistyPlayer?: TwistyPlayer;
        twistyPlayerProp?: TwistyPlayerAlgProp;
    });
    connectedCallback(): void;
    set algString(s: string);
    get algString(): string;
    set placeholder(placeholderText: string);
    onInput(): void;
    onSelectionChange(): Promise<void>;
    onBlur(): Promise<void>;
    setAlgIssueClassForPuzzle(issues: "none" | "warning" | "error"): void;
    highlightLeaf(leaf: Parsed<Move | Pause> | null): void;
    get twistyPlayer(): TwistyPlayer | null;
    set twistyPlayer(twistyPlayer: TwistyPlayer | null);
    protected attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string): void;
    static get observedAttributes(): string[];
}
declare global {
    interface HTMLElementTagNameMap {
        "twisty-alg-editor": TwistyAlgEditor;
    }
}

interface DataDown {
    earliestMoveIndex: LeafIndex;
    twistyAlgViewer: TwistyAlgViewer;
    direction: IterationDirection;
}
interface DataUp {
    moveCount: number;
    element: TwistyAlgWrapperElem | TwistyAlgLeafElem;
}
declare class TwistyAlgLeafElem extends ManagedCustomElement {
    algOrAlgNode: Alg | AlgNode;
    constructor(className: string, text: string, dataDown: DataDown, algOrAlgNode: Alg | AlgNode, offsetIntoMove: boolean, clickable: boolean);
    pathToIndex(_index: number): (TwistyAlgWrapperElem | TwistyAlgLeafElem)[];
    setCurrentMove(current: boolean): void;
}
declare class TwistyAlgWrapperElem extends HTMLElementShim {
    algOrAlgNode: Alg | AlgNode;
    private queue;
    constructor(className: string, algOrAlgNode: Alg | AlgNode);
    addString(str: string): void;
    addElem(dataUp: DataUp): number;
    flushQueue(direction?: IterationDirection): void;
    pathToIndex(_index: number): (TwistyAlgWrapperElem | TwistyAlgLeafElem)[];
}
declare class MoveHighlighter {
    moveCharIndexMap: Map<number, TwistyAlgLeafElem>;
    currentElem: TwistyAlgLeafElem | null;
    addMove(charIndex: number, elem: TwistyAlgLeafElem): void;
    set(move: Parsed<Move> | null): void;
}
/** @category Other Custom Elements */
declare class TwistyAlgViewer extends HTMLElementShim {
    #private;
    highlighter: MoveHighlighter;
    lastClickTimestamp: number | null;
    constructor(options?: {
        twistyPlayer?: TwistyPlayer;
    });
    protected connectedCallback(): void;
    private setAlg;
    get twistyPlayer(): TwistyPlayer | null;
    set twistyPlayer(twistyPlayer: TwistyPlayer | null);
    jumpToIndex(index: LeafIndex, offsetIntoMove: boolean): Promise<void>;
    protected attributeChangedCallback(attributeName: string, _oldValue: string, newValue: string): Promise<void>;
    static get observedAttributes(): string[];
}
declare global {
    interface HTMLElementTagNameMap {
        "twisty-alg-viewer": TwistyAlgViewer;
    }
}

declare class TwizzleLink extends ManagedCustomElement {
    #private;
    private options?;
    twistyPlayer: TwistyPlayer | null;
    a: HTMLAnchorElement | null;
    constructor(options?: {
        cdnForumTweaks?: boolean;
        colorScheme?: ColorSchemeWithAuto;
    } | undefined);
    connectedCallback(): Promise<void>;
}
declare global {
    interface HTMLElementTagNameMap {
        "twizzle-link": TwizzleLink;
    }
}

type KeyMapping = {
    [keyCode: string]: AlgLeaf;
};
type AlgTransformData = Record<string, {
    replaceMovesByFamily: Record<string, string>;
    invertExceptByFamily?: Set<string>;
}>;
interface PuzzleLoader {
    id: string;
    fullName: string;
    inventedBy?: string[];
    inventionYear?: number;
    /** @deprecated */
    def?: never;
    kpuzzle: () => Promise<KPuzzle>;
    svg: () => Promise<string>;
    llSVG?: () => Promise<string>;
    llFaceSVG?: () => Promise<string>;
    pg?: () => Promise<PuzzleGeometry>;
    basePG?: () => Promise<PuzzleGeometry>;
    stickeringMask?: (stickering: ExperimentalStickering) => Promise<StickeringMask>;
    stickerings?: () => Promise<ExperimentalStickering[]>;
    puzzleSpecificSimplifyOptions?: PuzzleSpecificSimplifyOptions;
    puzzleSpecificSimplifyOptionsPromise?: Promise<PuzzleSpecificSimplifyOptions>;
    keyMapping?: () => Promise<KeyMapping>;
    algTransformData?: AlgTransformData;
}

export { Pause as $, type AlgLeaf as A, type LeafIndex as B, KTransformation as C, type MillisecondDuration as D, type ExperimentalStickering as E, type BackViewLayout as F, TwistyAlgViewer as G, TwistyPlayer as H, type TwistyPlayerConfig as I, TwizzleLink as J, KPattern as K, type LeafCount as L, Move as M, NO_VALUE as N, backViewLayouts as O, Perm as P, Quat as Q, type AlgNode as R, type StickerDat as S, TwistyAlgEditor as T, type AppendOptions as U, type VisualizationFormat as V, Grouping as W, LineComment as X, Commutator as Y, Conjugate as Z, Newline as _, PUZZLE_BASE_SHAPES as a, type KeyMapping as a0, type AlgBranch as a1, type AppendCancelOptions as a2, type ExperimentalNotationType as a3, type Parsed as a4, type ExperimentalSerializationOptions as a5, type GroupingModifications as a6, type MoveModifications as a7, QuantumMove as a8, type SimplifyOptions as a9, type KPatternData as aa, type KPatternOrbitData as ab, type KPuzzleDefinition as ac, type KPuzzleOrbitDefinition as ad, type KTransformationData as ae, type KTransformationOrbitData as af, PUZZLE_CUT_TYPES as b, PGNotation as c, type PuzzleBaseShape as d, type PuzzleCutDescription as e, type PuzzleCutType as f, type PuzzleDescription as g, type PuzzleGeometryOptions as h, PuzzleGeometry as i, type StickerDatAxis as j, type StickerDatFace as k, type StickerDatSticker as l, getPG3DNamedPuzzles as m, getPuzzleDescriptionString as n, getPuzzleGeometryByDesc as o, getPuzzleGeometryByName as p, parsePuzzleDescription as q, Alg as r, type PuzzleLoader as s, type PuzzleID as t, KPuzzle as u, type StickeringMask as v, type PuzzleSpecificSimplifyOptions as w, type AlgTransformData as x, type AlgIndexer as y, type MillisecondTimestamp as z };

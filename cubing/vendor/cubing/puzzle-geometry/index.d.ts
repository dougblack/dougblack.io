import { P as Perm } from '../PuzzleLoader-Bp8zngUn.js';
export { a as EXPERIMENTAL_PUZZLE_BASE_SHAPES, b as EXPERIMENTAL_PUZZLE_CUT_TYPES, c as ExperimentalPGNotation, d as ExperimentalPuzzleBaseShape, e as ExperimentalPuzzleCutDescription, f as ExperimentalPuzzleCutType, g as ExperimentalPuzzleDescription, h as ExperimentalPuzzleGeometryOptions, i as PuzzleGeometry, Q as Quat, S as StickerDat, j as StickerDatAxis, k as StickerDatFace, l as StickerDatSticker, m as getPG3DNamedPuzzles, n as getPuzzleDescriptionString, o as getPuzzleGeometryByDesc, p as getPuzzleGeometryByName, q as parsePuzzleDescription } from '../PuzzleLoader-Bp8zngUn.js';
import 'type-fest';
import 'three/src/Three.js';

declare function schreierSims(g: Perm[], disp: (s: string) => void): bigint;

export { schreierSims };

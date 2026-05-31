import { K as KPattern } from '../PuzzleLoader-Bp8zngUn.js';
import 'type-fest';
import 'three/src/Three.js';

type Binary3x3x3Pattern = Uint8Array;
interface Binary3x3x3Components {
    epLex: number;
    eoMask: number;
    cpLex: number;
    coMask: number;
    poIdxU: number;
    poIdxL: number;
    moSupport: number;
    moMask: number;
}
/** @category Binary 3x3x3 Format */
declare function reid3x3x3ToTwizzleBinary(pattern: KPattern): Binary3x3x3Pattern;
/** @category Binary 3x3x3 Format */
declare function twizzleBinaryToBinaryComponents(buffer: ArrayBuffer | Uint8Array): Binary3x3x3Components;
/** @category Binary 3x3x3 Format */
declare function binaryComponentsToReid3x3x3(components: Binary3x3x3Components): KPattern;
/** @category Binary 3x3x3 Format */
declare function twizzleBinaryToReid3x3x3(buffy: ArrayBuffer | Uint8Array): KPattern;

declare function bufferToSpacedHex(buffer: ArrayBuffer | Uint8Array): string;
declare function spacedHexToBuffer(hex: string): Uint8Array;

export { binaryComponentsToReid3x3x3 as experimentalBinaryComponentsToReid3x3x3, bufferToSpacedHex as experimentalBufferToSpacedHex, reid3x3x3ToTwizzleBinary as experimentalReid3x3x3ToTwizzleBinary, spacedHexToBuffer as experimentalSpacedHexToBuffer, twizzleBinaryToBinaryComponents as experimentalTwizzleBinaryToBinaryComponents, twizzleBinaryToReid3x3x3 as experimentalTwizzleBinaryToReid3x3x3 };

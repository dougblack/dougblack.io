import {
  TAU,
  bulk3DCode,
  haveStartedSharingRenderers,
  hintFaceletStyles
} from "./chunk-LWCBAAHO.js";
import "./chunk-FLK6AZKB.js";
import {
  cube3x3x3,
  getFaceletStickeringMask
} from "./chunk-FUHYAW74.js";
import "./chunk-RINY3U6G.js";
import {
  Move
} from "./chunk-O6HEZXGY.js";

// src/cubing/twisty/views/3D/puzzles/Cube3D.ts
import { BackSide, DoubleSide, FrontSide } from "three/src/constants.js";
import { BufferAttribute } from "three/src/core/BufferAttribute.js";
import { BufferGeometry } from "three/src/core/BufferGeometry.js";
import { Object3D } from "three/src/core/Object3D.js";
import { BoxGeometry } from "three/src/geometries/BoxGeometry.js";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { MeshBasicMaterial } from "three/src/materials/MeshBasicMaterial.js";
import { Color } from "three/src/math/Color.js";
import { Euler } from "three/src/math/Euler.js";
import { Matrix4 } from "three/src/math/Matrix4.js";
import { Quaternion } from "three/src/math/Quaternion.js";
import { Vector2 } from "three/src/math/Vector2.js";
import { Vector3 } from "three/src/math/Vector3.js";
import { Group } from "three/src/objects/Group.js";
import { Mesh } from "three/src/objects/Mesh.js";

// src/cubing/twisty/controllers/easing.ts
function smootherStep(x) {
  return x * x * x * (10 - x * (15 - 6 * x));
}

// src/cubing/twisty/views/3D/puzzles/Cube3D.ts
var svgLoader = new TextureLoader();
var ignoredMaterial = new MeshBasicMaterial({
  color: new Color(6710886).convertLinearToSRGB()
});
var ignoredMaterialHint = new MeshBasicMaterial({
  color: new Color(13421772).convertLinearToSRGB(),
  side: BackSide,
  transparent: true,
  opacity: 0.75
});
var invisibleMaterial = new MeshBasicMaterial({
  visible: false
});
var orientedMaterial = new MeshBasicMaterial({
  color: 4513228
});
var orientedMaterialHint = new MeshBasicMaterial({
  color: 4513228,
  side: BackSide,
  transparent: true,
  opacity: 0.5
});
var experimentalOriented2Material = new MeshBasicMaterial({
  color: 16776618
});
var experimentalOriented2MaterialHint = new MeshBasicMaterial({
  color: 16775545,
  side: BackSide,
  transparent: true,
  opacity: 0.5
});
var mysteryMaterial = new MeshBasicMaterial({
  color: 15911883
});
var mysterMaterialHint = new MeshBasicMaterial({
  color: 15911883,
  side: BackSide,
  transparent: true,
  opacity: 0.5
});
var AxisInfo = class {
  constructor(vector, fromZ, color, dimColor, hintOpacityScale, options) {
    this.vector = vector;
    this.fromZ = fromZ;
    this.color = color;
    this.dimColor = dimColor;
    this.hintOpacityScale = hintOpacityScale;
    const colorLinearSRGB = new Color(color).convertLinearToSRGB();
    const dimColorLinearSRGB = new Color(dimColor).convertLinearToSRGB();
    this.stickerMaterial = {
      regular: new MeshBasicMaterial({
        color: colorLinearSRGB,
        side: FrontSide
        // TODO: set to `DoubleSide` when hint facelets are disabled.
      }),
      dim: new MeshBasicMaterial({
        color: dimColorLinearSRGB,
        side: FrontSide
        // TODO: set to `DoubleSide` when hint facelets are disabled.
      }),
      oriented: orientedMaterial,
      experimentalOriented2: experimentalOriented2Material,
      ignored: ignoredMaterial,
      invisible: invisibleMaterial,
      mystery: mysteryMaterial
    };
    this.hintStickerMaterial = {
      regular: new MeshBasicMaterial({
        color: new Color(options?.hintColor ?? color).convertLinearToSRGB(),
        side: BackSide,
        transparent: true,
        opacity: 0.5 * hintOpacityScale
      }),
      dim: new MeshBasicMaterial({
        color: new Color(
          options?.hintDimColor ?? dimColor
        ).convertLinearToSRGB(),
        side: BackSide,
        transparent: true,
        opacity: 0.5 * hintOpacityScale
      }),
      oriented: orientedMaterialHint,
      experimentalOriented2: experimentalOriented2MaterialHint,
      ignored: ignoredMaterialHint,
      invisible: invisibleMaterial,
      mystery: mysterMaterialHint
    };
  }
  stickerMaterial;
  hintStickerMaterial;
};
var axesInfo = [
  new AxisInfo(
    new Vector3(0, 1, 0),
    new Euler(-TAU / 4, 0, 0),
    16777215,
    14540253,
    1.25
  ),
  new AxisInfo(
    new Vector3(-1, 0, 0),
    new Euler(0, -TAU / 4, 0),
    16750848,
    8934656,
    1,
    { hintDimColor: 8930304 }
  ),
  new AxisInfo(
    new Vector3(0, 0, 1),
    new Euler(0, 0, 0),
    65280,
    34816,
    1,
    { hintDimColor: 39168 }
  ),
  new AxisInfo(
    new Vector3(1, 0, 0),
    new Euler(0, TAU / 4, 0),
    16711680,
    6684672,
    1,
    { hintDimColor: 6684672 }
  ),
  new AxisInfo(
    new Vector3(0, 0, -1),
    new Euler(0, TAU / 2, 0),
    2254591,
    1127304,
    0.75,
    { hintDimColor: 6246 }
  ),
  new AxisInfo(
    new Vector3(0, -1, 0),
    new Euler(TAU / 4, 0, 0),
    16776960,
    8947712,
    1.25,
    { hintDimColor: 14540032 }
  )
];
var face = {
  U: 0,
  L: 1,
  F: 2,
  R: 3,
  B: 4,
  D: 5
};
var familyToAxis = {
  U: face["U"],
  u: face["U"],
  Uw: face["U"],
  Uv: face["U"],
  y: face["U"],
  L: face["L"],
  l: face["L"],
  Lw: face["L"],
  Lv: face["L"],
  M: face["L"],
  F: face["F"],
  f: face["F"],
  Fw: face["F"],
  Fv: face["F"],
  S: face["F"],
  z: face["F"],
  R: face["R"],
  r: face["R"],
  Rw: face["R"],
  Rv: face["R"],
  x: face["R"],
  B: face["B"],
  b: face["B"],
  Bw: face["B"],
  Bv: face["B"],
  D: face["D"],
  d: face["D"],
  Dw: face["D"],
  Dv: face["D"],
  E: face["D"]
};
var cubieDimensions = {
  // stickerWidth: 0.85, // Now `faceletScale` in options.
  stickerElevation: 0.503,
  foundationWidth: 1,
  hintStickerElevation: 1.45
};
var EXPERIMENTAL_PICTURE_CUBE_HINT_ELEVATION = 2;
var cube3DOptionsDefaults = {
  showMainStickers: true,
  hintFacelets: "floating",
  showFoundation: true,
  experimentalStickeringMask: void 0,
  foundationSprite: null,
  hintSprite: null,
  initialHintFaceletsAnimation: "auto",
  faceletScale: "auto"
};
var DEFAULT_STICKER_SCALE = 0.85;
function getFaceletScale(options) {
  if (typeof options.faceletScale === "undefined" || options.faceletScale === "auto") {
    return DEFAULT_STICKER_SCALE;
  }
  return options.faceletScale;
}
var blackMesh = new MeshBasicMaterial({
  color: 0,
  opacity: 1,
  transparent: true
});
var blackTranslucentMesh = new MeshBasicMaterial({
  color: 0,
  opacity: 0.3,
  transparent: true
});
var CubieDef = class {
  // stickerFaceNames can be e.g. ["U", "F", "R"], "UFR" if every face is a single letter.
  constructor(orbit, stickerFaceNames, q) {
    this.orbit = orbit;
    const individualStickerFaceNames = typeof stickerFaceNames === "string" ? stickerFaceNames.split("") : stickerFaceNames;
    this.stickerFaces = individualStickerFaceNames.map((s) => face[s]);
    this.matrix = new Matrix4();
    this.matrix.setPosition(firstPiecePosition[orbit]);
    this.matrix.premultiply(new Matrix4().makeRotationFromQuaternion(q));
  }
  matrix;
  stickerFaces;
};
function t(v, t4) {
  return new Quaternion().setFromAxisAngle(v, TAU * t4 / 4);
}
var r = {
  O: new Vector3(0, 0, 0),
  U: new Vector3(0, -1, 0),
  L: new Vector3(1, 0, 0),
  F: new Vector3(0, 0, -1),
  R: new Vector3(-1, 0, 0),
  B: new Vector3(0, 0, 1),
  D: new Vector3(0, 1, 0)
};
var firstPiecePosition = {
  EDGES: new Vector3(0, 1, 1),
  CORNERS: new Vector3(1, 1, 1),
  CENTERS: new Vector3(0, 1, 0)
};
var orientationRotation = {
  EDGES: [0, 1].map(
    (i) => new Matrix4().makeRotationAxis(
      firstPiecePosition["EDGES"].clone().normalize(),
      -i * TAU / 2
    )
  ),
  CORNERS: [0, 1, 2].map(
    (i) => new Matrix4().makeRotationAxis(
      firstPiecePosition["CORNERS"].clone().normalize(),
      -i * TAU / 3
    )
  ),
  CENTERS: [0, 1, 2, 3].map(
    (i) => new Matrix4().makeRotationAxis(
      firstPiecePosition["CENTERS"].clone().normalize(),
      -i * TAU / 4
    )
  )
};
var cubieStickerOrder = [face["U"], face["F"], face["R"]];
var pieceDefs = {
  EDGES: [
    new CubieDef("EDGES", "UF", t(r.O, 0)),
    new CubieDef("EDGES", "UR", t(r.U, 3)),
    new CubieDef("EDGES", "UB", t(r.U, 2)),
    new CubieDef("EDGES", "UL", t(r.U, 1)),
    new CubieDef("EDGES", "DF", t(r.F, 2)),
    new CubieDef("EDGES", "DR", t(r.F, 2).premultiply(t(r.D, 1))),
    new CubieDef("EDGES", "DB", t(r.F, 2).premultiply(t(r.D, 2))),
    new CubieDef("EDGES", "DL", t(r.F, 2).premultiply(t(r.D, 3))),
    new CubieDef("EDGES", "FR", t(r.U, 3).premultiply(t(r.R, 3))),
    new CubieDef("EDGES", "FL", t(r.U, 1).premultiply(t(r.R, 3))),
    new CubieDef("EDGES", "BR", t(r.U, 3).premultiply(t(r.R, 1))),
    new CubieDef("EDGES", "BL", t(r.U, 1).premultiply(t(r.R, 1)))
  ],
  CORNERS: [
    new CubieDef("CORNERS", "UFR", t(r.O, 0)),
    new CubieDef("CORNERS", "URB", t(r.U, 3)),
    new CubieDef("CORNERS", "UBL", t(r.U, 2)),
    new CubieDef("CORNERS", "ULF", t(r.U, 1)),
    new CubieDef("CORNERS", "DRF", t(r.F, 2).premultiply(t(r.D, 1))),
    new CubieDef("CORNERS", "DFL", t(r.F, 2).premultiply(t(r.D, 0))),
    new CubieDef("CORNERS", "DLB", t(r.F, 2).premultiply(t(r.D, 3))),
    new CubieDef("CORNERS", "DBR", t(r.F, 2).premultiply(t(r.D, 2)))
  ],
  CENTERS: [
    new CubieDef("CENTERS", "U", t(r.O, 0)),
    new CubieDef("CENTERS", "L", t(r.R, 3).premultiply(t(r.U, 1))),
    new CubieDef("CENTERS", "F", t(r.R, 3)),
    new CubieDef("CENTERS", "R", t(r.R, 3).premultiply(t(r.D, 1))),
    new CubieDef("CENTERS", "B", t(r.R, 3).premultiply(t(r.D, 2))),
    new CubieDef("CENTERS", "D", t(r.R, 2))
  ]
};
var CUBE_SCALE = 1 / 3;
var pictureStickerCoords = {
  EDGES: [
    [
      [0, 4, 6],
      [0, 4, 5]
    ],
    [
      [3, 5, 7],
      [0, 7, 5]
    ],
    [
      [2, 4, 8],
      [0, 10, 5]
    ],
    [
      [1, 3, 7],
      [0, 1, 5]
    ],
    [
      [2, 4, 2],
      [2, 4, 3]
    ],
    [
      [3, 5, 1],
      [2, 7, 3]
    ],
    [
      [0, 4, 0],
      [2, 10, 3]
    ],
    [
      [1, 3, 1],
      [2, 1, 3]
    ],
    [
      [3, 5, 4],
      [3, 6, 4]
    ],
    [
      [1, 3, 4],
      [1, 2, 4]
    ],
    [
      [1, 9, 4],
      [1, 8, 4]
    ],
    [
      [3, 11, 4],
      [3, 0, 4]
    ]
  ],
  CORNERS: [
    [
      [0, 5, 6],
      [0, 5, 5],
      [0, 6, 5]
    ],
    [
      [3, 5, 8],
      [0, 8, 5],
      [0, 9, 5]
    ],
    [
      [2, 3, 8],
      [0, 11, 5],
      [0, 0, 5]
    ],
    [
      [1, 3, 6],
      [0, 2, 5],
      [0, 3, 5]
    ],
    [
      [3, 5, 2],
      [2, 6, 3],
      [2, 5, 3]
    ],
    [
      [2, 3, 2],
      [2, 3, 3],
      [2, 2, 3]
    ],
    [
      [1, 3, 0],
      [2, 0, 3],
      [2, 11, 3]
    ],
    [
      [0, 5, 0],
      [2, 9, 3],
      [2, 8, 3]
    ]
  ],
  CENTERS: [
    [[0, 4, 7]],
    [[0, 1, 4]],
    [[0, 4, 4]],
    [[0, 7, 4]],
    [[0, 10, 4]],
    [[0, 4, 1]]
  ]
};
var sharedCubieFoundationGeometryCache = null;
function sharedCubieFoundationGeometry() {
  return sharedCubieFoundationGeometryCache ?? (sharedCubieFoundationGeometryCache = new BoxGeometry(
    cubieDimensions.foundationWidth,
    cubieDimensions.foundationWidth,
    cubieDimensions.foundationWidth
  ));
}
function newStickerGeometry() {
  const r2 = new BufferGeometry();
  const half = 0.5;
  r2.setAttribute(
    "position",
    new BufferAttribute(
      new Float32Array([
        half,
        half,
        0,
        -half,
        half,
        0,
        half,
        -half,
        0,
        -half,
        half,
        0,
        -half,
        -half,
        0,
        half,
        -half,
        0
      ]),
      3
    )
  );
  r2.setAttribute(
    "uv",
    new BufferAttribute(
      new Float32Array([
        1,
        1,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        0,
        0,
        1,
        1,
        0,
        0,
        1,
        0,
        1,
        1
      ]),
      2
    )
  );
  return r2;
}
var sharedStickerGeometryCache = null;
function sharedStickerGeometry() {
  return sharedStickerGeometryCache ?? (sharedStickerGeometryCache = newStickerGeometry());
}
var Cube3D = class extends Object3D {
  constructor(kpuzzle, scheduleRenderCallback, options = {}) {
    super();
    this.kpuzzle = kpuzzle;
    this.scheduleRenderCallback = scheduleRenderCallback;
    this.options = { ...cube3DOptionsDefaults };
    Object.assign(this.options, options);
    if (this.kpuzzle.name() !== "3x3x3") {
      throw new Error(
        `Invalid puzzle for this Cube3D implementation: ${this.kpuzzle.name()}`
      );
    }
    if (options.foundationSprite) {
      this.setSprite(options.foundationSprite);
    }
    if (options.hintSprite) {
      this.setHintSprite(options.hintSprite);
    }
    this.kpuzzleFaceletInfo = {};
    for (const orbit in pieceDefs) {
      const orbitFaceletInfo = [];
      this.kpuzzleFaceletInfo[orbit] = orbitFaceletInfo;
      this.pieces[orbit] = pieceDefs[orbit].map(
        this.createCubie.bind(this, orbit, orbitFaceletInfo)
      );
    }
    this.scale.set(CUBE_SCALE, CUBE_SCALE, CUBE_SCALE);
    if (this.options.experimentalStickeringMask) {
      this.setStickeringMask(this.options.experimentalStickeringMask);
    }
    this.#animateRaiseHintFacelets();
    if (this.options.faceletScale) {
      this.experimentalSetFaceletScale(this.options.faceletScale);
    }
  }
  kpuzzleFaceletInfo;
  pieces = {};
  options;
  // TODO: Keep track of option-based meshes better.
  experimentalHintStickerMeshes = [];
  experimentalFoundationMeshes = [];
  #setSpriteURL;
  sprite = new Promise((resolve) => {
    this.#setSpriteURL = (url) => {
      svgLoader.load(url, resolve);
    };
  });
  // TODO: Don't overwrite the static function.
  // TODO: This doesn't work dynamically yet.
  setSprite(texture) {
    this.sprite = texture;
  }
  #setHintSpriteURL;
  hintSprite = new Promise((resolve) => {
    this.#setHintSpriteURL = (url) => {
      svgLoader.load(url, resolve);
    };
  });
  // TODO: Don't overwrite the static function.
  // TODO: This doesn't work dynamically yet.
  setHintSprite(texture) {
    this.hintSprite = texture;
  }
  #sharedHintStickerGeometryCache = null;
  #sharedHintStickerGeometry() {
    return this.#sharedHintStickerGeometryCache ??= newStickerGeometry();
  }
  // TODO: Generalize this into an animation mechanism.
  #animateRaiseHintFacelets() {
    if (this.options.initialHintFaceletsAnimation === "none" || this.options.initialHintFaceletsAnimation !== "always" && haveStartedSharingRenderers()) {
      return;
    }
    const translationRange = cubieDimensions.hintStickerElevation - cubieDimensions.stickerElevation;
    this.#sharedHintStickerGeometry().translate(0, 0, -translationRange);
    setTimeout(() => {
      const hintStartTime = performance.now();
      let lastTranslation = 0;
      const translationDuration = 1e3;
      function ease(x) {
        return x * (2 - x);
      }
      const animateRaiseHintSticker = () => {
        const elapsed = performance.now() - hintStartTime;
        const newTranslation = ease(elapsed / translationDuration) * translationRange;
        this.#sharedHintStickerGeometry().translate(
          0,
          0,
          newTranslation - lastTranslation
        );
        lastTranslation = newTranslation;
        if (elapsed < translationDuration) {
          requestAnimationFrame(animateRaiseHintSticker);
          this.scheduleRenderCallback?.();
        }
      };
      animateRaiseHintSticker();
    }, 500);
  }
  // Can only be called once.
  /** @deprecated */
  experimentalSetStickerSpriteURL(stickerSpriteURL) {
    this.#setSpriteURL?.(stickerSpriteURL);
  }
  // Can only be called once.
  /** @deprecated */
  experimentalSetHintStickerSpriteURL(hintStickerSpriteURL) {
    this.#setHintSpriteURL?.(hintStickerSpriteURL);
  }
  setStickeringMask(stickeringMask) {
    if (stickeringMask.specialBehaviour === "picture") {
      for (const pieceInfos of Object.values(this.kpuzzleFaceletInfo)) {
        for (const faceletInfos of pieceInfos) {
          for (const faceletInfo of faceletInfos) {
            faceletInfo.facelet.material = invisibleMaterial;
            const { hintFacelet } = faceletInfo;
            if (hintFacelet) {
              hintFacelet.material = invisibleMaterial;
            }
          }
        }
      }
      return;
    }
    this.options.experimentalStickeringMask = stickeringMask;
    for (const [orbitName, orbitStickeringMask] of Object.entries(
      stickeringMask.orbits
    )) {
      for (let pieceIdx = 0; pieceIdx < orbitStickeringMask.pieces.length; pieceIdx++) {
        const pieceStickeringMask = orbitStickeringMask.pieces[pieceIdx];
        if (pieceStickeringMask) {
          const pieceInfo = this.kpuzzleFaceletInfo[orbitName][pieceIdx];
          for (let faceletIdx = 0; faceletIdx < pieceInfo.length; faceletIdx++) {
            const faceletStickeringMask = pieceStickeringMask.facelets[faceletIdx];
            if (faceletStickeringMask) {
              const faceletInfo = pieceInfo[faceletIdx];
              const stickeringMask2 = typeof faceletStickeringMask === "string" ? faceletStickeringMask : faceletStickeringMask?.mask;
              faceletInfo.facelet.material = axesInfo[faceletInfo.faceIdx].stickerMaterial[stickeringMask2];
              const hintStickeringMask = typeof faceletStickeringMask === "string" ? stickeringMask2 : faceletStickeringMask.hintMask ?? stickeringMask2;
              if (faceletInfo.hintFacelet) {
                faceletInfo.hintFacelet.material = axesInfo[faceletInfo.faceIdx].hintStickerMaterial[hintStickeringMask];
              }
            }
          }
        }
      }
    }
    if (this.scheduleRenderCallback) {
      this.scheduleRenderCallback();
    }
  }
  /** @deprecated */
  experimentalUpdateOptions(options) {
    if ("showMainStickers" in options) {
      throw new Error("Unimplemented");
    }
    const showFoundation = options.showFoundation;
    if (typeof showFoundation !== "undefined" && this.options.showFoundation !== showFoundation) {
      this.options.showFoundation = showFoundation;
      for (const foundation of this.experimentalFoundationMeshes) {
        foundation.visible = showFoundation;
      }
    }
    const hintFacelets = options.hintFacelets;
    if (typeof hintFacelets !== "undefined" && this.options.hintFacelets !== hintFacelets && hintFaceletStyles[hintFacelets]) {
      this.options.hintFacelets = hintFacelets;
      for (const hintSticker of this.experimentalHintStickerMeshes) {
        hintSticker.visible = hintFacelets === "floating";
      }
      this.scheduleRenderCallback();
    }
    const { experimentalStickeringMask } = options;
    if (typeof experimentalStickeringMask !== "undefined") {
      this.options.experimentalStickeringMask = experimentalStickeringMask;
      this.setStickeringMask(experimentalStickeringMask);
      this.scheduleRenderCallback();
    }
    const { faceletScale } = options;
    if (typeof faceletScale !== "undefined") {
      this.experimentalSetFaceletScale(faceletScale);
    }
  }
  onPositionChange(p) {
    const reid333 = p.pattern;
    for (const orbit in pieceDefs) {
      const pieces = pieceDefs[orbit];
      for (let i = 0; i < pieces.length; i++) {
        const j = reid333.patternData[orbit].pieces[i];
        this.pieces[orbit][j].matrix.copy(pieceDefs[orbit][i].matrix);
        this.pieces[orbit][j].matrix.multiply(
          orientationRotation[orbit][reid333.patternData[orbit].orientation[i]]
        );
      }
      for (const moveProgress of p.movesInProgress) {
        const move = moveProgress.move;
        const turnNormal = axesInfo[familyToAxis[move.family]].vector;
        const moveMatrix = new Matrix4().makeRotationAxis(
          turnNormal,
          -this.ease(moveProgress.fraction) * moveProgress.direction * move.amount * TAU / 4
        );
        for (let i = 0; i < pieces.length; i++) {
          const quantumTransformation = this.kpuzzle.moveToTransformation(
            move.modified({ amount: 1 })
          );
          const k = quantumTransformation.transformationData[orbit].permutation[i];
          if (i !== k || quantumTransformation.transformationData[orbit].orientationDelta[i] !== 0) {
            const j = reid333.patternData[orbit].pieces[i];
            this.pieces[orbit][j].matrix.premultiply(moveMatrix);
          }
        }
      }
    }
    this.scheduleRenderCallback();
  }
  // TODO: Always create (but sometimes hide parts) so we can show them later,
  // or (better) support creating puzzle parts on demand.
  createCubie(orbit, orbitFacelets, piece, orbitPieceIdx) {
    const cubieFaceletInfo = [];
    orbitFacelets.push(cubieFaceletInfo);
    const cubie = new Group();
    if (this.options.showFoundation) {
      const foundation = this.createCubieFoundation();
      cubie.add(foundation);
      this.experimentalFoundationMeshes.push(foundation);
    }
    for (let i = 0; i < piece.stickerFaces.length; i++) {
      const sticker = this.createSticker(
        axesInfo[cubieStickerOrder[i]],
        axesInfo[piece.stickerFaces[i]],
        false
      );
      const faceletInfo = {
        faceIdx: piece.stickerFaces[i],
        facelet: sticker
      };
      cubie.add(sticker);
      if (this.options.hintFacelets === "floating") {
        const hintSticker = this.createSticker(
          axesInfo[cubieStickerOrder[i]],
          axesInfo[piece.stickerFaces[i]],
          true
        );
        cubie.add(hintSticker);
        faceletInfo.hintFacelet = hintSticker;
        this.experimentalHintStickerMeshes.push(hintSticker);
      }
      if (this.options.experimentalStickeringMask?.specialBehaviour === "picture" && pictureStickerCoords[orbit] && pictureStickerCoords[orbit][orbitPieceIdx] && pictureStickerCoords[orbit][orbitPieceIdx][i]) {
        const [rotate, offsetX, offsetY] = pictureStickerCoords[orbit][orbitPieceIdx][i];
        void (async () => {
          const addImageSticker = async (hint) => {
            const texture = await (hint ? this.hintSprite : this.sprite);
            const mesh = this.createSticker(
              axesInfo[cubieStickerOrder[i]],
              axesInfo[piece.stickerFaces[i]],
              hint
            );
            mesh.material = new MeshBasicMaterial({
              map: texture,
              side: hint ? BackSide : DoubleSide,
              transparent: true
            });
            const x1 = offsetX / 12;
            const x2 = (offsetX + 1) / 12;
            const y1 = offsetY / 9;
            const y2 = (offsetY + 1) / 9;
            let v1 = new Vector2(x1, y1);
            let v2 = new Vector2(x1, y2);
            let v3 = new Vector2(x2, y2);
            let v4 = new Vector2(x2, y1);
            switch (rotate) {
              case 1: {
                [v1, v2, v3, v4] = [v2, v3, v4, v1];
                break;
              }
              case 2: {
                [v1, v2, v3, v4] = [v3, v4, v1, v2];
                break;
              }
              case 3: {
                [v1, v2, v3, v4] = [v4, v1, v2, v3];
                break;
              }
            }
            mesh.geometry.setAttribute(
              "uv",
              new BufferAttribute(
                new Float32Array([
                  v3.x,
                  v3.y,
                  v2.x,
                  v2.y,
                  v4.x,
                  v4.y,
                  v2.x,
                  v2.y,
                  v1.x,
                  v1.y,
                  v4.x,
                  v4.y
                ]),
                2
              )
            );
            cubie.add(mesh);
          };
          void addImageSticker(true);
          void addImageSticker(false);
        })();
      }
      cubieFaceletInfo.push(faceletInfo);
    }
    cubie.matrix.copy(piece.matrix);
    cubie.matrixAutoUpdate = false;
    this.add(cubie);
    return cubie;
  }
  // TODO: Support creating only the outward-facing parts?
  createCubieFoundation() {
    const box = sharedCubieFoundationGeometry();
    return new Mesh(
      box,
      this.options.experimentalStickeringMask?.specialBehaviour === "picture" ? blackMesh : blackTranslucentMesh
    );
  }
  createSticker(posAxisInfo, materialAxisInfo, isHint) {
    const geo = this.options.experimentalStickeringMask?.specialBehaviour === "picture" ? newStickerGeometry() : isHint ? this.#sharedHintStickerGeometry() : sharedStickerGeometry();
    const stickerMesh = new Mesh(
      geo,
      isHint ? materialAxisInfo.hintStickerMaterial.regular : materialAxisInfo.stickerMaterial.regular
    );
    stickerMesh.setRotationFromEuler(posAxisInfo.fromZ);
    stickerMesh.position.copy(posAxisInfo.vector);
    stickerMesh.position.multiplyScalar(
      isHint ? this.options.experimentalStickeringMask?.specialBehaviour === "picture" ? EXPERIMENTAL_PICTURE_CUBE_HINT_ELEVATION : cubieDimensions.hintStickerElevation : cubieDimensions.stickerElevation
    );
    stickerMesh.scale.setScalar(getFaceletScale(this.options));
    return stickerMesh;
  }
  /** @deprecated */
  experimentalSetFoundationOpacity(opacity) {
    this.experimentalFoundationMeshes[0].material.opacity = opacity;
  }
  /** @deprecated */
  experimentalSetFaceletScale(faceletScale) {
    this.options.faceletScale = faceletScale;
    for (const orbitInfo of Object.values(this.kpuzzleFaceletInfo)) {
      for (const pieceInfo of orbitInfo) {
        for (const faceletInfo of pieceInfo) {
          faceletInfo.facelet.scale.setScalar(getFaceletScale(this.options));
          faceletInfo.hintFacelet?.scale.setScalar(
            getFaceletScale(this.options)
          );
        }
      }
    }
  }
  // /** @deprecated */
  // experimentalSetCenterStickerWidth(width: number): void {
  //   for (const orbitInfo of [this.kpuzzleFaceletInfo["CENTERS"]]) {
  //     for (const pieceInfo of orbitInfo) {
  //       for (const faceletInfo of pieceInfo) {
  //         faceletInfo.facelet.scale.setScalar(
  //           width / getStickerScale(this.options),
  //         );
  //         // faceletInfo.facelet.setRotationFromAxisAngle(new Vector3(0, 1, 0), 0);
  //         // faceletInfo.facelet.rotateOnAxis(new Vector3(1, 0, 1), TAU / 6);
  //       }
  //     }
  //   }
  // }
  ease(fraction) {
    return smootherStep(fraction);
  }
};

// src/cubing/twisty/views/3D/puzzles/PG3D.ts
import { DoubleSide as DoubleSide2, FrontSide as FrontSide2 } from "three/src/constants.js";
import { BufferAttribute as BufferAttribute2 } from "three/src/core/BufferAttribute.js";
import { BufferGeometry as BufferGeometry2 } from "three/src/core/BufferGeometry.js";
import { Object3D as Object3D2 } from "three/src/core/Object3D.js";
import { MeshBasicMaterial as MeshBasicMaterial2 } from "three/src/materials/MeshBasicMaterial.js";
import { Color as Color2 } from "three/src/math/Color.js";
import { Euler as Euler2 } from "three/src/math/Euler.js";
import { Vector3 as Vector32 } from "three/src/math/Vector3.js";
import { Group as Group2 } from "three/src/objects/Group.js";
import { Mesh as Mesh2 } from "three/src/objects/Mesh.js";
var foundationMaterial = new MeshBasicMaterial2({
  side: DoubleSide2,
  color: 0
});
var invisMaterial = new MeshBasicMaterial2({
  visible: false
});
var basicStickerMaterial = new MeshBasicMaterial2({
  vertexColors: true
});
function dist(coords, a, b) {
  return Math.hypot(
    coords[3 * a] - coords[3 * b],
    coords[3 * a + 1] - coords[3 * b + 1],
    coords[3 * a + 2] - coords[3 * b + 2]
  );
}
function triarea(coords, a, b, c) {
  const ab = dist(coords, a, b);
  const bc = dist(coords, b, c);
  const ac = dist(coords, a, c);
  const p = (ab + bc + ac) / 2;
  return Math.sqrt(p * (p - ab) * (p - bc) * (p - ac));
}
function polyarea(coords) {
  let sum = 0;
  for (let i = 2; 3 * i < coords.length; i++) {
    sum += triarea(coords, 0, 1, i);
  }
  return sum;
}
function normalize(r2) {
  const m = Math.hypot(r2[0], r2[1], r2[2]);
  r2[0] /= m;
  r2[1] /= m;
  r2[2] /= m;
  return r2;
}
function cross(a, b) {
  const r2 = new Array(3);
  r2[0] = a[1] * b[2] - a[2] * b[1];
  r2[1] = a[2] * b[0] - a[0] * b[2];
  r2[2] = a[0] * b[1] - a[1] * b[0];
  return r2;
}
function normal(c) {
  const a = [c[3] - c[0], c[4] - c[1], c[5] - c[2]];
  const b = [c[6] - c[3], c[7] - c[4], c[8] - c[5]];
  const r2 = cross(a, b);
  return normalize(r2);
}
function trimEdges(face2, tr) {
  const r2 = [];
  const A = new Array(3);
  const B = new Array(3);
  for (let iter = 1; iter < 10; iter++) {
    for (let i = 0; i < face2.length; i += 3) {
      const pi = (i + face2.length - 3) % face2.length;
      const ni = (i + 3) % face2.length;
      for (let k = 0; k < 3; k++) {
        A[k] = face2[pi + k] - face2[i + k];
        B[k] = face2[ni + k] - face2[i + k];
      }
      const alen = Math.hypot(A[0], A[1], A[2]);
      const blen = Math.hypot(B[0], B[1], B[2]);
      for (let k = 0; k < 3; k++) {
        A[k] /= alen;
        B[k] /= blen;
      }
      const d = A[0] * B[0] + A[1] * B[1] + A[2] * B[2];
      const m = tr / Math.sqrt(1 - d * d);
      for (let k = 0; k < 3; k++) {
        r2[i + k] = face2[i + k] + (A[k] + B[k]) * m;
      }
    }
    let good = true;
    for (let i = 0; good && i < r2.length; i += 3) {
      const ni = (i + 3) % face2.length;
      let t2 = 0;
      for (let k = 0; k < 3; k++) {
        const a = face2[ni + k] - face2[i + k];
        const b = r2[ni + k] - r2[i + k];
        t2 += a * b;
      }
      if (t2 <= 0) {
        good = false;
      }
    }
    if (good) {
      return r2;
    }
    tr /= 2;
  }
  return face2;
}
var Filler = class {
  constructor(sz, tm) {
    this.sz = sz;
    this.tm = tm;
    this.vertices = new Float32Array(9 * sz);
    this.uvs = void 0;
    this.colors = new Uint8Array(18 * sz);
    this.ind = new Uint8Array(sz);
    this.pos = 0;
    this.ipos = 0;
  }
  pos;
  ipos;
  vertices;
  colors;
  uvs;
  ind;
  add(pt, i, c) {
    this.vertices[this.pos] = pt[3 * i + 0];
    this.vertices[this.pos + 1] = pt[3 * i + 1];
    this.vertices[this.pos + 2] = pt[3 * i + 2];
    this.colors[this.pos] = c >> 16;
    this.colors[this.pos + 1] = c >> 8 & 255;
    this.colors[this.pos + 2] = c & 255;
    this.pos += 3;
  }
  addUncolored(pt, i) {
    this.vertices[this.pos] = pt[3 * i + 0];
    this.vertices[this.pos + 1] = pt[3 * i + 1];
    this.vertices[this.pos + 2] = pt[3 * i + 2];
    this.pos += 3;
  }
  setind(i) {
    this.ind[this.ipos++] = i;
  }
  makePoly(coords, color, ind) {
    const ncoords = coords;
    for (let g = 1; 3 * (g + 1) < ncoords.length; g++) {
      this.add(ncoords, 0, color);
      this.add(ncoords, g, color);
      this.add(ncoords, g + 1, color);
      this.setind(ind);
    }
  }
  setAttributes(geo) {
    geo.setAttribute("position", new BufferAttribute2(this.vertices, 3));
    const sa2 = this.colors.subarray(0, 9 * this.sz);
    geo.setAttribute("color", new BufferAttribute2(sa2, 3, true));
  }
  makeGroups(geo) {
    geo.clearGroups();
    for (let i = 0; i < this.ipos; ) {
      const si = i++;
      const iv = this.ind[si];
      while (this.ind[i] === iv) {
        i++;
      }
      geo.addGroup(3 * si, 3 * (i - si), iv);
    }
  }
  saveOriginalColors() {
    this.colors.copyWithin(this.pos, 0, this.pos);
  }
};
var StickerDef = class {
  origColor;
  origColorStickeringMask;
  faceColor;
  texturePtr = void 0;
  twistVal = -1;
  stickerStart;
  stickerEnd;
  hintStart;
  hintEnd;
  foundationStart;
  foundationEnd;
  isDup;
  faceNum;
  constructor(filler, stickerDat, trim, options) {
    this.isDup = !!stickerDat.isDup;
    this.faceNum = stickerDat.face;
    this.stickerStart = filler.ipos;
    const sdColor = new Color2(stickerDat.color).getHex();
    this.origColor = sdColor;
    this.origColorStickeringMask = sdColor;
    if (options?.stickeringMask) {
      this.setStickeringMask(filler, options.stickeringMask);
    }
    this.faceColor = sdColor;
    const coords = this.stickerCoords(stickerDat.coords, trim);
    filler.makePoly(coords, this.faceColor, this.isDup ? 4 : 0);
    this.stickerEnd = filler.ipos;
  }
  stickerCoords(coords, trim) {
    return trimEdges(coords.slice(), trim);
  }
  hintCoords(coords, hintStickerHeightScale, trim, normal2) {
    coords = this.stickerCoords(coords, trim);
    normal2 = normal2.slice();
    for (let i = 0; i < 3; i++) {
      normal2[i] *= 0.5 * hintStickerHeightScale;
    }
    const hCoords = new Array(coords.length);
    for (let i = 0; 3 * i < coords.length; i++) {
      const j = coords.length / 3 - 1 - i;
      hCoords[3 * i] = coords[3 * j] + normal2[0];
      hCoords[3 * i + 1] = coords[3 * j + 1] + normal2[1];
      hCoords[3 * i + 2] = coords[3 * j + 2] + normal2[2];
    }
    return hCoords;
  }
  foundationCoords(coords) {
    const ncoords = coords.slice();
    for (let i = 0; i < coords.length; i++) {
      ncoords[i] = coords[i] * 0.999;
    }
    return ncoords;
  }
  addHint(filler, stickerDat, hintStickers, hintStickerHeightScale, trim, normal2) {
    this.hintStart = filler.ipos;
    const coords = this.hintCoords(
      stickerDat.coords,
      hintStickerHeightScale,
      trim,
      normal2
    );
    filler.makePoly(
      coords,
      this.faceColor,
      hintStickers && !this.isDup ? 2 : 4
    );
    this.hintEnd = filler.ipos;
  }
  addFoundation(filler, stickerDat, black) {
    this.foundationStart = filler.ipos;
    const coords = this.foundationCoords(stickerDat.coords);
    filler.makePoly(coords, black, this.isDup ? 4 : 6);
    this.foundationEnd = filler.ipos;
  }
  setHintStickers(filler, hintStickers) {
    const indv = this.isDup || !hintStickers ? 4 : 2;
    for (let i = this.hintStart; i < this.hintEnd; i++) {
      filler.ind[i] = indv | filler.ind[i] & 1;
    }
  }
  setStickeringMask(filler, faceletMeshStickeringMask) {
    let c = 0;
    switch (faceletMeshStickeringMask) {
      case "regular": {
        c = this.origColor;
        break;
      }
      case "dim": {
        if (this.origColor === 16777215) {
          c = 14540253;
        } else {
          c = new Color2(this.origColor).multiplyScalar(0.5).getHex();
        }
        break;
      }
      case "oriented": {
        c = 4513228;
        break;
      }
      case "experimentalOriented2": {
        c = 16776618;
        break;
      }
      case "ignored": {
        c = 4473924;
        break;
      }
      case "mystery": {
        c = 15911883;
        break;
      }
      case "invisible":
        c = this.origColor;
    }
    this.origColorStickeringMask = c;
    for (let i = 9 * this.stickerStart; i < 9 * this.stickerEnd; i += 3) {
      filler.colors[filler.pos + i] = c >> 16;
      filler.colors[filler.pos + i + 1] = c >> 8 & 255;
      filler.colors[filler.pos + i + 2] = c & 255;
    }
    for (let i = 9 * this.hintStart; i < 9 * this.hintEnd; i += 3) {
      filler.colors[filler.pos + i] = c >> 16;
      filler.colors[filler.pos + i + 1] = c >> 8 & 255;
      filler.colors[filler.pos + i + 2] = c & 255;
    }
    this.setHintStickers(
      filler,
      faceletMeshStickeringMask !== "invisible" && !this.isDup
    );
  }
  addUVs(filler) {
    const uvs = filler.uvs;
    const vert = filler.vertices;
    const coords = new Array(3);
    for (let i = 3 * this.stickerStart; i < 3 * this.stickerEnd; i++) {
      coords[0] = vert[3 * i];
      coords[1] = vert[3 * i + 1];
      coords[2] = vert[3 * i + 2];
      const uv = filler.tm.getuv(this.faceNum, coords);
      uvs[2 * i] = uv[0];
      uvs[2 * i + 1] = uv[1];
    }
    for (let i = 3 * this.hintStart; i < 3 * this.hintEnd; i++) {
      coords[0] = vert[3 * i];
      coords[1] = vert[3 * i + 1];
      coords[2] = vert[3 * i + 2];
      const uv = filler.tm.getuv(this.faceNum, coords);
      uvs[2 * i] = uv[0];
      uvs[2 * i + 1] = uv[1];
    }
  }
  setTexture(filler, sd) {
    if (this.texturePtr === sd) {
      return 0;
    }
    this.texturePtr = sd;
    const sz = 6 * filler.sz;
    filler.uvs.copyWithin(
      6 * this.stickerStart,
      6 * sd.stickerStart + sz,
      6 * sd.stickerEnd + sz
    );
    filler.uvs.copyWithin(
      6 * this.hintStart,
      // TODO: refactor to avoid non-null-assertion
      6 * sd.hintStart + sz,
      // TODO: refactor to avoid non-null-assertion
      6 * sd.hintEnd + sz
      // TODO: refactor to avoid non-null-assertion
    );
    return 1;
  }
  setColor(filler, sd) {
    const c = sd.origColorStickeringMask;
    if (this.faceColor !== c) {
      this.faceColor = c;
      const sz = filler.pos;
      filler.colors.copyWithin(
        9 * this.stickerStart,
        9 * sd.stickerStart + sz,
        9 * sd.stickerEnd + sz
      );
      filler.colors.copyWithin(
        9 * this.hintStart,
        // TODO: refactor to avoid non-null-assertion
        9 * sd.hintStart + sz,
        // TODO: refactor to avoid non-null-assertion
        9 * sd.hintEnd + sz
        // TODO: refactor to avoid non-null-assertion
      );
      return 1;
    } else {
      return 0;
    }
  }
};
var HitPlaneDef = class {
  cubie;
  geo;
  constructor(hitface, tm, stickerDat) {
    this.cubie = new Group2();
    const coords = hitface.coords;
    const filler = new Filler(coords.length / 3 - 2, tm);
    for (let g = 1; 3 * g + 3 < coords.length; g++) {
      filler.addUncolored(coords, 0);
      filler.addUncolored(coords, g);
      filler.addUncolored(coords, g + 1);
    }
    this.geo = new BufferGeometry2();
    filler.setAttributes(this.geo);
    const obj = new Mesh2(this.geo, invisMaterial);
    obj.userData["quantumMove"] = stickerDat.notationMapper.notationToExternal(
      new Move(hitface.name)
    );
    this.cubie.scale.setScalar(0.99);
    this.cubie.add(obj);
  }
};
var AxisInfo2 = class {
  axis;
  order;
  constructor(axisDat) {
    const vec = axisDat.coordinates;
    this.axis = new Vector32(vec[0], vec[1], vec[2]);
    this.order = axisDat.order;
  }
};
var DEFAULT_COLOR_FRACTION = 0.71;
var PG_SCALE = 0.5;
var PG3D = class extends Object3D2 {
  constructor(scheduleRenderCallback, kpuzzle, stickerDat, enableFoundationOpt = false, enableHintStickersOpt = false, hintStickerHeightScale = 1, faceletScale = 1, params = {}) {
    super();
    this.scheduleRenderCallback = scheduleRenderCallback;
    this.kpuzzle = kpuzzle;
    this.stickerDat = stickerDat;
    this.faceletScale = faceletScale;
    this.params = params;
    if (stickerDat.stickers.length === 0) {
      throw Error("Reuse of stickerdat from pg; please don't do that.");
    }
    this.hintMaterial = new MeshBasicMaterial2({
      vertexColors: true,
      transparent: true,
      opacity: 0.5
    });
    this.hintMaterialDisposable = true;
    this.stickerMaterial = basicStickerMaterial;
    this.stickerMaterialDisposable = false;
    this.axesInfo = {};
    const axesDef = this.stickerDat.axis;
    for (const axis of axesDef) {
      this.axesInfo[axis.quantumMove.family] = new AxisInfo2(axis);
    }
    const stickers = this.stickerDat.stickers;
    this.stickers = {};
    this.materialArray1 = new Array(8);
    this.materialArray2 = new Array(8);
    this.showFoundation(enableFoundationOpt);
    enableFoundationOpt = true;
    let triangleCount = 0;
    const multiplier = 3;
    for (const sticker of stickers) {
      const sides = sticker.coords.length / 3;
      triangleCount += multiplier * (sides - 2);
    }
    const filler = new Filler(triangleCount, stickerDat.textureMapper);
    const black = 0;
    const normals = [];
    let totArea = 0;
    for (const f of stickerDat.faces) {
      normals.push(normal(f.coords));
      totArea += polyarea(f.coords);
    }
    const colorfrac = faceletScale !== "auto" ? faceletScale * faceletScale : DEFAULT_COLOR_FRACTION;
    let nonDupStickers = 0;
    for (const sticker of stickers) {
      if (!sticker.isDup) {
        nonDupStickers++;
      }
    }
    const trim = Math.sqrt(totArea / nonDupStickers) * (1 - Math.sqrt(colorfrac)) / 2;
    for (const sticker of stickers) {
      const orbit = sticker.orbit;
      const ord = sticker.ord;
      const ori = sticker.ori;
      if (!this.stickers[orbit]) {
        this.stickers[orbit] = [];
      }
      if (!this.stickers[orbit][ori]) {
        this.stickers[orbit][ori] = [];
      }
      const options = {};
      if (params.stickeringMask) {
        options.stickeringMask = getFaceletStickeringMask(
          params.stickeringMask,
          orbit,
          ord,
          ori,
          false
        );
      }
      const stickerdef = new StickerDef(filler, sticker, trim, options);
      this.stickers[orbit][ori][ord] = stickerdef;
    }
    this.showHintStickers = enableHintStickersOpt;
    enableHintStickersOpt = true;
    for (const sticker of stickers) {
      const orbit = sticker.orbit;
      const ord = sticker.ord;
      const ori = sticker.ori;
      this.stickers[orbit][ori][ord].addHint(
        filler,
        sticker,
        enableHintStickersOpt,
        hintStickerHeightScale,
        trim,
        normals[sticker.face]
      );
    }
    this.foundationBound = filler.ipos;
    for (const sticker of stickers) {
      const orbit = sticker.orbit;
      const ord = sticker.ord;
      const ori = sticker.ori;
      if (enableFoundationOpt) {
        this.stickers[orbit][ori][ord].addFoundation(filler, sticker, black);
      }
    }
    const fixedGeo = new BufferGeometry2();
    filler.setAttributes(fixedGeo);
    filler.makeGroups(fixedGeo);
    const obj = new Mesh2(fixedGeo, this.materialArray1);
    obj.scale.set(PG_SCALE, PG_SCALE, PG_SCALE);
    this.add(obj);
    const obj2 = new Mesh2(fixedGeo, this.materialArray2);
    obj2.scale.set(PG_SCALE, PG_SCALE, PG_SCALE);
    this.add(obj2);
    const hitfaces = this.stickerDat.faces;
    this.movingObj = obj2;
    this.fixedGeo = fixedGeo;
    this.filler = filler;
    for (const hitface of hitfaces) {
      const facedef = new HitPlaneDef(
        hitface,
        stickerDat.textureMapper,
        this.stickerDat
      );
      facedef.cubie.scale.set(PG_SCALE, PG_SCALE, PG_SCALE);
      this.add(facedef.cubie);
      this.controlTargets.push(facedef.cubie.children[0]);
    }
    filler.saveOriginalColors();
    stickerDat.stickers = [];
    this.updateMaterialArrays();
  }
  stickers;
  axesInfo;
  stickerTargets = [];
  controlTargets = [];
  movingObj;
  filler;
  foundationBound;
  // before this: colored; after: black
  fixedGeo;
  lastPos;
  lastMoveTransformation;
  hintMaterial;
  stickerMaterial;
  materialArray1;
  materialArray2;
  textured = false;
  showHintStickers = false;
  showFoundations = false;
  hintMaterialDisposable;
  stickerMaterialDisposable;
  #pendingStickeringUpdate = false;
  dispose() {
    if (this.fixedGeo) {
      this.fixedGeo.dispose();
    }
    if (this.stickerMaterialDisposable) {
      this.stickerMaterial.dispose();
      this.stickerMaterial = basicStickerMaterial;
      this.stickerMaterialDisposable = false;
    }
    if (this.hintMaterialDisposable) {
      this.hintMaterial.dispose();
      this.hintMaterial = basicStickerMaterial;
      this.hintMaterialDisposable = false;
    }
  }
  experimentalGetStickerTargets() {
    return this.stickerTargets;
  }
  experimentalGetControlTargets() {
    return this.controlTargets;
  }
  #isValidMove(move) {
    try {
      this.kpuzzle.moveToTransformation(move);
      return true;
    } catch (_) {
      return false;
    }
  }
  getClosestMoveToAxis(point, transformations) {
    let closestMove = null;
    let closestMoveDotProduct = 0;
    let modify = (m) => m;
    switch (transformations.depth) {
      case "secondSlice": {
        modify = (m) => m.modified({ innerLayer: 2 });
        break;
      }
      case "rotation": {
        modify = (m) => m.modified({ family: `${m.family}v` });
        break;
      }
    }
    for (const axis of this.stickerDat.axis) {
      const product = point.dot(new Vector32(...axis.coordinates));
      if (product > closestMoveDotProduct) {
        const modified = this.stickerDat.notationMapper.notationToExternal(
          modify(axis.quantumMove)
        );
        if (!modified) {
          continue;
        }
        console.log(modified.family);
        if (modified.family === "T" && transformations.depth === "none") {
          continue;
        }
        if (this.#isValidMove(modified)) {
          closestMoveDotProduct = product;
          closestMove = modified;
        }
      }
    }
    if (!closestMove) {
      return null;
    }
    if (transformations.invert) {
      closestMove = closestMove.invert();
    }
    const order = this.kpuzzle.moveToTransformation(closestMove).repetitionOrder();
    return { move: closestMove, order };
  }
  setStickeringMask(stickeringMask) {
    this.params.stickeringMask = stickeringMask;
    if (stickeringMask.specialBehaviour !== "picture") {
      for (const orbitDefinition of this.kpuzzle.definition.orbits) {
        const { numPieces, numOrientations } = orbitDefinition;
        for (let pieceIdx = 0; pieceIdx < numPieces; pieceIdx++) {
          for (let faceletIdx = 0; faceletIdx < numOrientations; faceletIdx++) {
            const faceletStickeringMask = getFaceletStickeringMask(
              stickeringMask,
              orbitDefinition.orbitName,
              pieceIdx,
              faceletIdx,
              false
            );
            const stickerDef = this.stickers[orbitDefinition.orbitName][faceletIdx][pieceIdx];
            if (this.textured && this.hintMaterialDisposable && faceletStickeringMask === "invisible") {
            } else {
              stickerDef.setStickeringMask(this.filler, faceletStickeringMask);
            }
          }
        }
      }
    }
    this.#pendingStickeringUpdate = true;
    if (this.lastPos) {
      this.onPositionChange(this.lastPos);
    }
  }
  onPositionChange(p) {
    const { pattern } = p;
    const noRotation = new Euler2();
    this.movingObj.rotation.copy(noRotation);
    let colormods = 0;
    const filler = this.filler;
    const ind = filler.ind;
    if (!this.lastPos || this.#pendingStickeringUpdate || !this.lastPos.pattern.isIdentical(pattern)) {
      for (const orbit in this.stickers) {
        const pieces = this.stickers[orbit];
        const pos2 = pattern.patternData[orbit];
        const orin = pieces.length;
        if (orin === 1) {
          const pieces2 = pieces[0];
          for (let i = 0; i < pieces2.length; i++) {
            const ni = pos2.pieces[i];
            if (this.textured) {
              colormods += pieces2[i].setTexture(filler, pieces2[ni]);
            } else {
              colormods += pieces2[i].setColor(filler, pieces2[ni]);
            }
          }
        } else {
          for (let ori = 0; ori < orin; ori++) {
            const pieces2 = pieces[ori];
            for (let i = 0; i < pieces2.length; i++) {
              const nori = (ori + orin - pos2.orientation[i]) % orin;
              const ni = pos2.pieces[i];
              if (this.textured) {
                colormods += pieces2[i].setTexture(filler, pieces[nori][ni]);
              } else {
                colormods += pieces2[i].setColor(filler, pieces[nori][ni]);
              }
            }
          }
        }
      }
      this.lastPos = p;
    }
    let vismods = 0;
    for (const moveProgress of p.movesInProgress) {
      const externalMove = moveProgress.move;
      const unswizzled = this.stickerDat.unswizzle(externalMove);
      if (!unswizzled) {
        return;
      }
      const move = externalMove;
      let quantumTransformation;
      try {
        quantumTransformation = this.kpuzzle.moveToTransformation(
          move.modified({ amount: 1 })
        );
      } catch (e) {
        const move1 = this.stickerDat.notationMapper.notationToInternal(move);
        if (move1) {
          const move2 = this.stickerDat.notationMapper.notationToExternal(
            move1.modified({ amount: 1 })
          );
          if (move2) {
            quantumTransformation = this.kpuzzle.moveToTransformation(move2);
          }
        }
        if (!quantumTransformation) {
          console.log(e);
          throw e;
        }
      }
      const ax = this.axesInfo[unswizzled.family];
      const turnNormal = ax.axis;
      const angle = -this.ease(moveProgress.fraction) * moveProgress.direction * unswizzled.amount * TAU / ax.order;
      this.movingObj.rotateOnAxis(turnNormal, angle);
      if (this.lastMoveTransformation !== quantumTransformation) {
        for (const orbit in this.stickers) {
          const pieces = this.stickers[orbit];
          const orin = pieces.length;
          const bmv = quantumTransformation.transformationData[orbit];
          for (let ori = 0; ori < orin; ori++) {
            const pieces2 = pieces[ori];
            for (let i = 0; i < pieces2.length; i++) {
              const p2 = pieces2[i];
              const ni = bmv.permutation[i];
              let tv = 0;
              if (ni !== i || bmv.orientationDelta[i] !== 0) {
                tv = 1;
              }
              if (tv !== p2.twistVal) {
                if (tv) {
                  for (let j = p2.stickerStart; j < p2.stickerEnd; j++) {
                    ind[j] |= 1;
                  }
                  for (let j = p2.hintStart; j < p2.hintEnd; j++) {
                    ind[j] |= 1;
                  }
                  for (let j = p2.foundationStart; j < p2.foundationEnd; j++) {
                    ind[j] |= 1;
                  }
                } else {
                  for (let j = p2.stickerStart; j < p2.stickerEnd; j++) {
                    ind[j] &= ~1;
                  }
                  for (let j = p2.hintStart; j < p2.hintEnd; j++) {
                    ind[j] &= ~1;
                  }
                  for (let j = p2.foundationStart; j < p2.foundationEnd; j++) {
                    ind[j] &= ~1;
                  }
                }
                p2.twistVal = tv;
                vismods++;
              }
            }
          }
        }
        this.lastMoveTransformation = quantumTransformation;
      }
    }
    if (this.#pendingStickeringUpdate || vismods) {
      this.filler.makeGroups(this.fixedGeo);
    }
    if (this.#pendingStickeringUpdate || colormods) {
      if (this.textured) {
        this.fixedGeo.getAttribute("uv").addUpdateRange(
          0,
          6 * this.foundationBound
        );
        this.fixedGeo.getAttribute("uv").needsUpdate = true;
      }
      if (this.#pendingStickeringUpdate || !this.textured) {
        this.fixedGeo.getAttribute("color").addUpdateRange(
          0,
          9 * this.foundationBound
        );
        this.fixedGeo.getAttribute("color").needsUpdate = true;
      }
    }
    this.scheduleRenderCallback();
    this.#pendingStickeringUpdate = false;
  }
  ease(fraction) {
    return smootherStep(fraction);
  }
  showHintFacelets(v) {
    this.showHintStickers = v;
  }
  updateMaterialArrays() {
    for (let i = 0; i < 8; i++) {
      this.materialArray1[i] = invisMaterial;
      this.materialArray2[i] = invisMaterial;
    }
    this.materialArray1[0] = this.stickerMaterial;
    this.materialArray2[1] = this.stickerMaterial;
    if (this.showHintStickers) {
      this.materialArray1[2] = this.hintMaterial;
      this.materialArray2[3] = this.hintMaterial;
    } else {
      this.materialArray1[2] = invisMaterial;
      this.materialArray2[3] = invisMaterial;
    }
    if (this.showFoundations) {
      this.materialArray1[6] = foundationMaterial;
      this.materialArray2[7] = foundationMaterial;
    } else {
      this.materialArray1[6] = invisMaterial;
      this.materialArray2[7] = invisMaterial;
    }
  }
  showFoundation(v) {
    this.showFoundations = v;
  }
  setHintStickerOpacity(v) {
    if (this.hintMaterialDisposable) {
      this.hintMaterial.dispose();
      this.hintMaterialDisposable = false;
    }
    if (v === 0) {
      this.hintMaterial = invisMaterial;
    } else if (v === 1) {
      this.hintMaterial = this.stickerMaterial;
    } else {
      this.hintMaterial = new MeshBasicMaterial2({
        vertexColors: true,
        transparent: true,
        opacity: v
      });
      this.hintMaterialDisposable = true;
    }
  }
  experimentalUpdateOptions(options) {
    if (options.hintFacelets !== void 0) {
      this.showHintFacelets(options.hintFacelets !== "none");
    }
    if (options.showFoundation !== void 0) {
      this.showFoundation(options.showFoundation);
    }
    if (options.hintStickerOpacity !== void 0) {
      this.setHintStickerOpacity(options.hintStickerOpacity);
    }
    this.#pendingStickeringUpdate = true;
    if (this.lastPos) {
      this.onPositionChange(this.lastPos);
    }
    if (typeof options.faceletScale !== "undefined" && options.faceletScale !== this.faceletScale) {
      console.warn(
        "Dynamic facelet scale is not yet supported for PG3D. For now, re-create the TwistyPlayer to change the facelet scale."
      );
    }
    this.updateMaterialArrays();
    this.scheduleRenderCallback();
  }
  adduvs() {
    const filler = this.filler;
    if (filler.uvs) {
      return;
    }
    this.filler.uvs = new Float32Array(12 * filler.sz);
    for (const orbit in this.stickers) {
      const pieces = this.stickers[orbit];
      const orin = pieces.length;
      for (let ori = 0; ori < orin; ori++) {
        const pieces2 = pieces[ori];
        for (const piece2 of pieces2) {
          piece2.addUVs(this.filler);
        }
      }
    }
    filler.uvs.copyWithin(6 * filler.sz, 0, 6 * filler.sz);
    const sa1 = filler.uvs.subarray(0, 6 * filler.sz);
    this.fixedGeo.setAttribute("uv", new BufferAttribute2(sa1, 2, true));
  }
  experimentalUpdateTexture(enabled, stickerTexture, hintTexture) {
    if (!stickerTexture) {
      enabled = false;
    }
    if (enabled && !this.filler.uvs) {
      this.adduvs();
    }
    this.textured = enabled;
    if (this.stickerMaterialDisposable) {
      this.stickerMaterial.dispose();
      this.stickerMaterialDisposable = false;
    }
    if (enabled) {
      this.stickerMaterial = new MeshBasicMaterial2({
        map: stickerTexture,
        side: FrontSide2,
        transparent: false
      });
      this.stickerMaterialDisposable = true;
    } else {
      this.stickerMaterial = basicStickerMaterial;
    }
    if (this.hintMaterialDisposable) {
      this.hintMaterial.dispose();
      this.hintMaterialDisposable = false;
    }
    if (enabled) {
      this.hintMaterial = new MeshBasicMaterial2({
        map: hintTexture,
        side: FrontSide2,
        transparent: true
      });
      this.hintMaterialDisposable = true;
    } else {
      this.hintMaterial = basicStickerMaterial;
    }
    if (enabled) {
      this.showHintFacelets(hintTexture !== null);
    }
    this.updateMaterialArrays();
    this.#pendingStickeringUpdate = true;
    if (this.lastPos) {
      this.onPositionChange(this.lastPos);
    }
    this.scheduleRenderCallback();
  }
};

// src/cubing/twisty/heavy-code-imports/dynamic-entries/twisty-dynamic-3d.ts
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera.js";
import { Raycaster } from "three/src/core/Raycaster.js";
import { TextureLoader as TextureLoader2 } from "three/src/loaders/TextureLoader.js";
import { Spherical } from "three/src/math/Spherical.js";
import { Vector2 as Vector22 } from "three/src/math/Vector2.js";
import { Vector3 as Vector33 } from "three/src/math/Vector3.js";
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer.js";
import { Scene } from "three/src/scenes/Scene.js";

// src/cubing/twisty/views/3D/Twisty3DScene.ts
var Twisty3DScene = class {
  renderTargets = /* @__PURE__ */ new Set();
  twisty3Ds = /* @__PURE__ */ new Set();
  threeJSScene = (async () => new (await bulk3DCode()).ThreeScene())();
  addRenderTarget(renderTarget) {
    this.renderTargets.add(renderTarget);
  }
  scheduleRender() {
    for (const renderTarget of this.renderTargets) {
      renderTarget.scheduleRender();
    }
  }
  async addTwisty3DPuzzle(twisty3DPuzzle) {
    this.twisty3Ds.add(twisty3DPuzzle);
    (await this.threeJSScene).add(twisty3DPuzzle);
  }
  async removeTwisty3DPuzzle(twisty3DPuzzle) {
    this.twisty3Ds.delete(twisty3DPuzzle);
    (await this.threeJSScene).remove(twisty3DPuzzle);
  }
  async clearPuzzles() {
    for (const puz of this.twisty3Ds) {
      (await this.threeJSScene).remove(puz);
    }
    this.twisty3Ds.clear();
  }
};

// src/cubing/twisty/heavy-code-imports/dynamic-entries/twisty-dynamic-3d.ts
async function cube3DShim(renderCallback, options) {
  return new Cube3D(await cube3x3x3.kpuzzle(), renderCallback, options);
}
async function pg3dShim(renderCallback, puzzleLoader, hintFacelets, faceletScale, darkIgnoredOrbits) {
  return new PG3D(
    renderCallback,
    await puzzleLoader.kpuzzle(),
    (await puzzleLoader.pg()).get3d({ darkIgnoredOrbits }),
    true,
    hintFacelets === "floating",
    void 0,
    faceletScale
  );
}
export {
  Cube3D,
  PG3D,
  PerspectiveCamera as ThreePerspectiveCamera,
  Raycaster as ThreeRaycaster,
  Scene as ThreeScene,
  Spherical as ThreeSpherical,
  TextureLoader2 as ThreeTextureLoader,
  Vector22 as ThreeVector2,
  Vector33 as ThreeVector3,
  WebGLRenderer as ThreeWebGLRenderer,
  Twisty3DScene,
  cube3DShim,
  pg3dShim
};
//# sourceMappingURL=twisty-dynamic-3d-IKE4BUQG.js.map

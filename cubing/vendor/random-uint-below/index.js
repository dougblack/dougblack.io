// src/random-uint-below/randomUIntBelow.ts
var MAX_JS_PRECISE_INT = 2 ** 53;
var UPPER_HALF_MULTIPLIER = 2097152;
var LOWER_HALF_RIGHT_SHIFT_BITS = 11;
var arr = new Uint32Array(2);
function random53BitNumber() {
  globalThis.crypto.getRandomValues(arr);
  const upper = arr[0];
  const lower = arr[1];
  return Math.floor(upper * UPPER_HALF_MULTIPLIER) + (lower >> LOWER_HALF_RIGHT_SHIFT_BITS);
}
function validateMax(max) {
  if (typeof max !== "number" || max < 0 || Math.floor(max) !== max) {
    throw new Error(
      "randomUIntBelow() not called with a positive integer value."
    );
  }
  if (max > MAX_JS_PRECISE_INT) {
    throw new Error(
      `Called randomUIntBelow() with max === ${max}, which is larger than JavaScript can handle with integer precision.`
    );
  }
}
function randomUIntBelow(max) {
  validateMax(max);
  var val;
  var block;
  var blockMax;
  while (true) {
    val = random53BitNumber();
    block = Math.floor(val / max);
    blockMax = block * max;
    if (blockMax <= MAX_JS_PRECISE_INT - max) {
      return val - blockMax;
    }
  }
}

// src/random-uint-below/array-operations.ts
function randomChoice(arr2) {
  return arr2[randomUIntBelow(arr2.length)];
}
async function randomPermuteInPlace(arr2) {
  for (let i = 1; i < arr2.length; i++) {
    const j = randomUIntBelow(i);
    [arr2[i], arr2[j]] = [arr2[j], arr2[i]];
  }
}
export {
  randomChoice,
  randomPermuteInPlace,
  randomUIntBelow
};

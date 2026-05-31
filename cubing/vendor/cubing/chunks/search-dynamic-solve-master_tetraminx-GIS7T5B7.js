// src/cubing/vendor/mpl/xyzzy/master_tetraminx-solver.js
import { randomUIntBelow } from "../../random-uint-below/index.js";
function factorial(n) {
  if (n < 2) {
    return n;
  }
  let f = 1;
  for (let i = 2; i <= n; i++) {
    f *= i;
  }
  return f;
}
function identity_permutation(n) {
  let a = Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = i;
  }
  return a;
}
function permutation_to_index(perm) {
  perm = perm.slice();
  let n = perm.length;
  let f = factorial(n - 1);
  let ind = 0;
  while (n > 1) {
    n--;
    let e = perm[0];
    ind += e * f;
    for (let i = 0; i < n; i++) {
      let x = perm[i + 1];
      perm[i] = x - (x > e);
    }
    f /= n;
  }
  return ind;
}
function index_to_evenpermutation(ind, n) {
  let perm = [];
  let f = factorial(n - 1) / 2;
  let parity = 0;
  for (let i = 0; i < n - 1; i++) {
    perm[i] = ind / f | 0;
    ind %= f;
    f /= n - 1 - i;
  }
  perm[n - 1] = 0;
  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (perm[j] >= perm[i]) {
        perm[j]++;
      } else {
        parity ^= 1;
      }
    }
  }
  if (parity === 1) {
    [perm[n - 2], perm[n - 1]] = [perm[n - 1], perm[n - 2]];
  }
  return perm;
}
function evenpermutation_to_index(perm) {
  return permutation_to_index(perm) >> 1;
}
var [evenpermutation12_to_index, index_to_evenpermutation12] = (() => {
  let index_in_set_bits = new Int8Array(4096 * 12);
  let look_up_set_bits = new Int8Array(4096 * 12);
  for (let i = 0; i < 4096; i++) {
    for (let j = 0, counter = 0; j < 12; j++) {
      if ((i >>> j & 1) === 0) {
        continue;
      }
      index_in_set_bits[j << 12 | i] = counter;
      look_up_set_bits[counter << 12 | i] = j;
      counter++;
    }
  }
  function evenpermutation12_to_index2(perm) {
    let unused = 4095;
    let f = 19958400;
    let ind = 0;
    for (let i = 0; i < 10; i++) {
      let v = perm[i];
      ind += index_in_set_bits[unused | v << 12] * f;
      unused &= ~(1 << v);
      f /= 11 - i;
    }
    return ind;
  }
  function index_to_evenpermutation122(ind, perm) {
    let unused = 4095;
    let f = 19958400;
    let parity = 0;
    for (let i = 0; i < 10; i++) {
      let a = ind / f | 0;
      ind -= a * f;
      parity ^= a & 1;
      let v = look_up_set_bits[unused | a << 12];
      perm[i] = v;
      unused &= ~(1 << v);
      f /= 11 - i;
    }
    perm[10] = look_up_set_bits[unused | parity << 12];
    perm[11] = look_up_set_bits[unused | (parity ^ 1) << 12];
    return perm;
  }
  return [evenpermutation12_to_index2, index_to_evenpermutation122];
})();
function compose(A, B) {
  let C = [];
  for (let i = 0; i < B.length; i++) {
    C[i] = A[B[i]];
  }
  return C;
}
function invert(perm) {
  let inv = [];
  for (let i = 0; i < perm.length; i++) {
    inv[perm[i]] = i;
  }
  return inv;
}
function permutation_from_cycle(cycle, n) {
  let perm = [];
  for (let i = 0; i < n; i++) {
    perm[i] = i;
  }
  for (let i = 0; i < cycle.length; i++) {
    perm[cycle[i]] = cycle[(i + 1) % cycle.length];
  }
  return perm;
}
function permutation_from_cycles(cycles, n) {
  if (cycles.length === 0) {
    return identity_permutation(n);
  }
  return cycles.map((cycle) => permutation_from_cycle(cycle, n)).reduce(compose);
}
function compose_state(state1, state2) {
  let co = Array(4);
  for (let i = 0; i < 4; i++) {
    co[i] = (state1.co[i] + state2.co[i]) % 3;
  }
  let mp = compose(state1.mp, state2.mp);
  let wp = compose(state1.wp, state2.wp);
  let cp = compose(state1.cp, state2.cp);
  return { co, mp, wp, cp };
}
var solved = {
  co: [0, 0, 0, 0],
  mp: identity_permutation(12),
  wp: identity_permutation(12),
  cp: [0, 1, 2, 3]
};
var move_U = {
  co: [2, 0, 0, 0],
  mp: identity_permutation(12),
  wp: permutation_from_cycle([1, 9, 11], 12),
  cp: [0, 1, 2, 3]
};
var move_L = {
  co: [0, 2, 0, 0],
  mp: identity_permutation(12),
  wp: permutation_from_cycle([0, 7, 2], 12),
  cp: [0, 1, 2, 3]
};
var move_R = {
  co: [0, 0, 2, 0],
  mp: identity_permutation(12),
  wp: permutation_from_cycle([3, 6, 10], 12),
  cp: [0, 1, 2, 3]
};
var move_B = {
  co: [0, 0, 0, 2],
  mp: identity_permutation(12),
  wp: permutation_from_cycle([4, 8, 5], 12),
  cp: [0, 1, 2, 3]
};
var move_Uw = {
  co: [2, 0, 0, 0],
  mp: permutation_from_cycles(
    [
      [1, 9, 11],
      [7, 3, 5]
    ],
    12
  ),
  wp: permutation_from_cycles(
    [
      [1, 9, 11],
      [7, 3, 5]
    ],
    12
  ),
  cp: [0, 2, 3, 1]
};
var move_Lw = {
  co: [0, 2, 0, 0],
  mp: permutation_from_cycles(
    [
      [0, 7, 2],
      [6, 1, 8]
    ],
    12
  ),
  wp: permutation_from_cycles(
    [
      [0, 7, 2],
      [6, 1, 8]
    ],
    12
  ),
  cp: [3, 1, 0, 2]
};
var move_Rw = {
  co: [0, 0, 2, 0],
  mp: permutation_from_cycles(
    [
      [3, 6, 10],
      [9, 0, 4]
    ],
    12
  ),
  wp: permutation_from_cycles(
    [
      [3, 6, 10],
      [9, 0, 4]
    ],
    12
  ),
  cp: [1, 3, 2, 0]
};
var move_Bw = {
  co: [0, 0, 0, 2],
  mp: permutation_from_cycles(
    [
      [4, 8, 5],
      [10, 2, 11]
    ],
    12
  ),
  wp: permutation_from_cycles(
    [
      [4, 8, 5],
      [10, 2, 11]
    ],
    12
  ),
  cp: [2, 0, 1, 3]
};
var moves = [
  move_Uw,
  move_Lw,
  move_Rw,
  move_Bw,
  move_U,
  move_L,
  move_R,
  move_B
];
var move_names = ["u", "l", "r", "b", "U", "L", "R", "B"];
var N_MOVES = 8;
var N_MOVES_PHASE2 = 4;
function moves_commute(i, j) {
  if (i >= 4 && j >= 4) {
    return true;
  }
  if (i < 4 && j < 4) {
    return i === j;
  }
  return (i ^ j) === 4;
}
function stringify_move_sequence(move_sequence) {
  let suffixes = ["0", "", "'"];
  let s = move_sequence.map(([m, r]) => move_names[m] + suffixes[r]);
  return s.join(" ");
}
function generate_random_state() {
  let co = Array(4);
  for (let i = 0; i < 4; i++) {
    co[i] = randomUIntBelow(3);
  }
  let mp = index_to_evenpermutation(randomUIntBelow(factorial(6) / 2), 6);
  for (let i = 0, parity = 0; i < 6; i++) {
    let eo = i === 5 ? parity : randomUIntBelow(2);
    parity ^= eo;
    mp[i] += eo * 6;
    mp[i + 6] = (mp[i] + 6) % 12;
  }
  let wp = index_to_evenpermutation(randomUIntBelow(factorial(12) / 2), 12);
  let cp = index_to_evenpermutation(randomUIntBelow(factorial(4) / 2), 4);
  return { co, mp, wp, cp };
}
function generate_random_state_scramble() {
  return solve(generate_random_state(randomUIntBelow));
}
function generate_scramble_sequence(tips = true, obfuscate_tips = false) {
  let scramble_string = stringify_move_sequence(
    generate_random_state_scramble()
  );
  if (!tips) {
    return scramble_string;
  }
  let tip_names = ["u", "l", "r", "b"];
  let suffixes = ["0", "", "'"];
  if (!obfuscate_tips) {
    for (let i = 0; i < 4; i++) {
      let x = randomUIntBelow(3);
      if (x !== 0) {
        scramble_string += ` ${tip_names[i]}${suffixes[x]}`;
      }
    }
    return scramble_string.trim();
  }
  let amount = [];
  let amount_pre = [];
  let amount_post = [];
  for (let i = 0; i < 4; i++) {
    amount[i] = randomUIntBelow(3);
    amount_pre[i] = randomUIntBelow(3);
    amount_post[i] = (amount[i] - amount_pre[i] + 3) % 3;
  }
  let weight = (arr) => arr.filter((x) => x !== 0).length;
  while (!(weight(amount_pre) >= 1 && weight(amount_post) >= 1 && weight(amount_pre) + weight(amount_post) >= 4)) {
    for (let i = 0; i < 4; i++) {
      amount_pre[i] = randomUIntBelow(3);
      amount_post[i] = (amount[i] - amount_pre[i] + 3) % 3;
    }
  }
  let prepend = amount_pre.map((x, i) => x !== 0 ? `${tip_names[i]}${suffixes[x]} ` : "").join("");
  let append = amount_post.map((x, i) => x !== 0 ? ` ${tip_names[i]}${suffixes[x]}` : "").join("");
  return prepend + scramble_string + append;
}
function solve(state) {
  let phase1_indices = index_phase1(state);
  let phase2_mtables = [
    generate_phase2_permutation_mtable(),
    generate_phase2_orientation_mtable()
  ];
  let phase2_ptables = [
    generate_phase2_permutation_ptable(),
    generate_phase2_orientation_ptable()
  ];
  let phase1gen = phase1_ida_solve_gen(phase1_indices);
  let best = void 0;
  let intermediate_states = /* @__PURE__ */ new Set();
  let start_time = performance.now();
  for (let i = 0; i < 22; i++) {
    let { value: sol1, done } = phase1gen.next();
    let new_state = state;
    for (let [m, r] of sol1) {
      for (let i2 = 0; i2 < r; i2++) {
        new_state = compose_state(new_state, moves[m]);
      }
    }
    let stringified_state = JSON.stringify(new_state);
    if (intermediate_states.has(stringified_state)) {
      continue;
    } else {
      intermediate_states.add(stringified_state);
    }
    let phase2_indices = index_phase2(new_state);
    let moves_left = best ? best.length - sol1.length - 1 : 999999;
    let sol2 = ida_solve_gen(
      phase2_indices,
      phase2_mtables,
      phase2_ptables,
      moves_left
    ).next().value;
    if (sol2 === void 0) {
      continue;
    }
    if (best === void 0 || best.length > sol1.length + sol2.length) {
      best = sol1.concat(sol2);
    }
    if (performance.now() - start_time > 300) {
      break;
    }
  }
  return best;
}
function determine_V_coset(p) {
  return p[3 ^ p.indexOf(3)];
}
function index_phase1(state) {
  let w = compose(invert(state.mp), state.wp);
  let c = (state.co.reduce((x, y) => x + y) - determine_V_coset(state.cp) + 3) % 3;
  return [0, 1, 2, 3, 4, 5].map(
    (i) => i + 6 * w.indexOf(i) + 72 * w.indexOf(i + 6) + 864 * c
  );
}
var phase1_permtable_m = [];
var phase1_permtable_minv = [];
var phase1_permtable_w = [];
var phase1_permtable_winv = [];
for (let i = 0; i < N_MOVES; i++) {
  let move = moves[i];
  phase1_permtable_m[i] = move.mp;
  phase1_permtable_minv[i] = invert(move.mp);
  phase1_permtable_w[i] = move.wp;
  phase1_permtable_winv[i] = invert(move.wp);
}
var phase1_c_update = [0, 0, 0, 0, 2, 2, 2, 2];
var phase1_score_ptable = [
  //-12        -9  -8  -7 -6 -5 -4 -3 -2 -1  0  1  2  3  4  5  6  7  8  9         12
  [
    14,
    -1,
    -1,
    11,
    11,
    10,
    9,
    8,
    8,
    7,
    7,
    6,
    4,
    5,
    5,
    3,
    4,
    4,
    2,
    3,
    4,
    3,
    -1,
    -1,
    0
  ],
  [
    13,
    -1,
    -1,
    11,
    10,
    10,
    9,
    8,
    8,
    7,
    7,
    6,
    4,
    5,
    5,
    3,
    4,
    4,
    2,
    3,
    3,
    1,
    -1,
    -1,
    6
  ]
];
var phase1_score_ptable_condensed = new Int8Array(55);
for (let i = 0; i < 25; i++) {
  phase1_score_ptable_condensed[i] = phase1_score_ptable[0][i];
  phase1_score_ptable_condensed[i + 30] = phase1_score_ptable[1][i];
}
var phase1_coord_to_score = new Int8Array(6 * 12 * 12 * 3);
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 12; j++) {
    for (let k = 0; k < 12; k++) {
      let index = i + 6 * j + 72 * k;
      let score = 2;
      if (j === i) {
        score++;
      } else if (j === (i + 6) % 12) {
        score--;
      }
      if (k === (i + 6) % 12) {
        score++;
      } else if (k === i) {
        score--;
      }
      phase1_coord_to_score[index] = score;
      phase1_coord_to_score[index + 6 * 12 * 12] = phase1_coord_to_score[index + 2 * 6 * 12 * 12] = score + 5;
    }
  }
}
function* phase1_ida_solve_gen(coords) {
  let bound = 0;
  let mtable = generate_phase1_pairingc_mtable();
  let ptable = generate_phase1_pairing2c_ptable();
  while (true) {
    yield* phase1_ida_search_gen(...coords, mtable, ptable, bound, -1);
    bound++;
  }
}
function* phase1_ida_search_gen(a, b, c, d, e, f, mtable, ptable, bound, last) {
  let nmoves = N_MOVES;
  let score = phase1_coord_to_score[a] + phase1_coord_to_score[b] + phase1_coord_to_score[c] + phase1_coord_to_score[d] + phase1_coord_to_score[e] + phase1_coord_to_score[f];
  let heuristic = Math.max(
    ptable[a % 864 + b * 864],
    ptable[c % 864 + b * 864],
    ptable[e % 864 + b * 864],
    ptable[a % 864 + d * 864],
    ptable[c % 864 + d * 864],
    ptable[e % 864 + d * 864],
    ptable[a % 864 + f * 864],
    ptable[c % 864 + f * 864],
    ptable[e % 864 + f * 864],
    ptable[a % 864 + c * 864],
    ptable[a % 864 + e * 864],
    ptable[c % 864 + e * 864],
    ptable[b % 864 + d * 864],
    ptable[b % 864 + f * 864],
    ptable[d % 864 + f * 864],
    phase1_score_ptable_condensed[score]
  );
  if (heuristic > bound) {
    return;
  }
  if (bound === 0) {
    yield [];
    return;
  }
  if (heuristic === 0 && bound === 1) {
    return;
  }
  for (let m = 0; m < nmoves; m++) {
    if (m === last) {
      continue;
    }
    if (m < last && moves_commute(m, last)) {
      continue;
    }
    let A = a;
    let B = b;
    let C = c;
    let D = d;
    let E = e;
    let F = f;
    for (let r = 1; r <= 2; r++) {
      A = mtable[A][m];
      B = mtable[B][m];
      C = mtable[C][m];
      D = mtable[D][m];
      E = mtable[E][m];
      F = mtable[F][m];
      let subpath_gen = phase1_ida_search_gen(
        A,
        B,
        C,
        D,
        E,
        F,
        mtable,
        ptable,
        bound - 1,
        m
      );
      while (true) {
        let { value: subpath, done } = subpath_gen.next();
        if (done) {
          break;
        }
        yield [[m, r]].concat(subpath);
      }
    }
  }
}
function index_phase2(state) {
  let edges = state.mp;
  let ep = evenpermutation_to_index(edges.slice(0, 6).map((x) => x % 6));
  let eo = edges.slice(0, 5).map((x, i) => (x >= 6) * 2 ** i).reduce((x, y) => x + y);
  let co = state.co.map((x, i) => x * 3 ** i).reduce((x, y) => x + y);
  let cloc = state.cp.indexOf(0);
  return [ep + 360 * cloc, eo + 32 * co];
}
var tables = {};
function generate_phase1_pairing_mtable() {
  if (tables.phase1pm) {
    return tables.phase1pm;
  }
  let mtable = Array(6 * 12 * 12).fill().map(() => Array(N_MOVES).fill(-1));
  for (let midge = 0; midge < 6; midge++) {
    for (let wingl = 0; wingl < 12; wingl++) {
      for (let wingh = 0; wingh < 12; wingh++) {
        if (wingl === wingh) {
          continue;
        }
        let index = midge + 6 * wingl + 72 * wingh;
        for (let m = 0; m < N_MOVES; m++) {
          let new_midge = phase1_permtable_minv[m][midge];
          let new_wingl = phase1_permtable_winv[m][wingl];
          let new_wingh = phase1_permtable_winv[m][wingh];
          if (new_midge < 6) {
            mtable[index][m] = new_midge + 6 * new_wingl + 72 * new_wingh;
          } else {
            mtable[index][m] = new_midge - 6 + 6 * new_wingh + 72 * new_wingl;
          }
        }
      }
    }
  }
  return tables.phase1pm = mtable;
}
function generate_phase1_pairingc_mtable() {
  if (tables.phase1pcm) {
    return tables.phase1pcm;
  }
  let mtable_pairing = generate_phase1_pairing_mtable();
  let mtable = Array(mtable_pairing.length * 3).fill().map(() => Array(N_MOVES).fill(-1));
  for (let index = 0; index < mtable_pairing.length; index++) {
    for (let m = 0; m < N_MOVES; m++) {
      let new_index = mtable_pairing[index][m];
      mtable[index][m] = new_index + 6 * 12 * 12 * phase1_c_update[m];
      mtable[index + 6 * 12 * 12][m] = new_index + 6 * 12 * 12 * ((phase1_c_update[m] + 1) % 3);
      mtable[index + 2 * 6 * 12 * 12][m] = new_index + 6 * 12 * 12 * ((phase1_c_update[m] + 2) % 3);
    }
  }
  return tables.phase1pcm = mtable;
}
function generate_phase1_pairing2c_ptable() {
  if (tables.phase1p2cp) {
    return tables.phase1p2cp;
  }
  let mtable_noc = generate_phase1_pairing_mtable();
  let mtable = generate_phase1_pairingc_mtable();
  let ptable = new Int8Array((6 * 12 * 12) ** 2 * 3);
  ptable.fill(-1);
  let g = [0, 1, 2, 3, 4, 5].map((x) => x + 6 * x + 72 * (x + 6));
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      if (i === j) {
        continue;
      }
      ptable[g[i] + 864 * g[j]] = 0;
    }
  }
  let dist = 0;
  while (true) {
    let changed = false;
    for (let index = 0; index < ptable.length; index++) {
      if (ptable[index] !== dist) {
        continue;
      }
      let index0 = index % 864;
      let index1 = Math.floor(index / 864);
      for (let m = 0; m < N_MOVES; m++) {
        let new_index0 = index0;
        let new_index1 = index1;
        for (let r = 1; r <= 2; r++) {
          new_index0 = mtable_noc[new_index0][m];
          new_index1 = mtable[new_index1][m];
          let new_index = new_index0 + 864 * new_index1;
          if (ptable[new_index] === -1) {
            changed = true;
            ptable[new_index] = dist + 1;
          }
        }
      }
    }
    if (!changed) {
      break;
    }
    dist++;
  }
  return tables.phase1p2cp = ptable;
}
function generate_phase2_permutation_mtable() {
  if (tables.phase2pm) {
    return tables.phase2pm;
  }
  let mtable = Array(1440).fill().map(() => Array(N_MOVES_PHASE2));
  for (let ep = 0; ep < 360; ep++) {
    let perm = index_to_evenpermutation(ep, 6);
    for (let i = 0; i < 6; i++) {
      perm[i + 6] = perm[i] + 6;
    }
    for (let m = 0; m < N_MOVES_PHASE2; m++) {
      let new_perm = compose(perm, moves[m].mp);
      let new_ep = evenpermutation_to_index(
        new_perm.slice(0, 6).map((x) => x % 6)
      );
      for (let new_cloc = 0; new_cloc < 4; new_cloc++) {
        let cloc = moves[m].cp[new_cloc];
        mtable[ep + 360 * cloc][m] = new_ep + 360 * new_cloc;
      }
    }
  }
  return tables.phase2pm = mtable;
}
function generate_phase2_orientation_mtable() {
  if (tables.phase2om) {
    return tables.phase2om;
  }
  let mtable = Array(32 * 81).fill().map(() => Array(N_MOVES_PHASE2));
  for (let eo = 0; eo < 32; eo++) {
    let eo_array = [0, 1, 2, 3, 4].map((i) => eo >> i & 1);
    eo_array[5] = eo_array.reduce((x, y) => x ^ y);
    let perm = [];
    for (let i = 0; i < 6; i++) {
      perm[i] = i + 6 * eo_array[i];
      perm[i + 6] = i + 6 * (eo_array[i] ^ 1);
    }
    for (let co = 0; co < 81; co++) {
      let co_array = [0, 1, 2, 3].map((i) => Math.floor(co / 3 ** i) % 3);
      for (let m = 0; m < N_MOVES_PHASE2; m++) {
        let new_perm = compose(perm, moves[m].mp);
        let new_eo_array = new_perm.slice(0, 5).map((x) => +(x >= 6));
        let new_eo = 0;
        for (let i = 0; i < 5; i++) {
          new_eo += new_eo_array[i] << i;
        }
        let new_co_array = co_array.map((x, i) => (x + moves[m].co[i]) % 3);
        let new_co = 0;
        for (let i = 0; i < 4; i++) {
          new_co += new_co_array[i] * 3 ** i;
        }
        mtable[eo + 32 * co][m] = new_eo + 32 * new_co;
      }
    }
  }
  return tables.phase2om = mtable;
}
function generate_phase2_permutation_ptable() {
  if (tables.phase2pp) {
    return tables.phase2pp;
  }
  return tables.phase2pp = bfs(generate_phase2_permutation_mtable(), [0]);
}
function generate_phase2_orientation_ptable() {
  if (tables.phase2op) {
    return tables.phase2op;
  }
  return tables.phase2op = bfs(generate_phase2_orientation_mtable(), [0]);
}
function bfs(mtable, goal_states) {
  let N = mtable.length;
  let nmoves = mtable[0].length;
  let ptable = Array(N).fill(-1);
  let queue = goal_states.slice();
  let new_queue = [];
  let depth = 0;
  while (queue.length > 0) {
    new_queue.length = 0;
    for (let state of queue) {
      if (ptable[state] !== -1) {
        continue;
      }
      ptable[state] = depth;
      for (let move_index = 0; move_index < nmoves; move_index++) {
        let new_state = mtable[state][move_index];
        while (new_state !== state) {
          new_queue.push(new_state);
          new_state = mtable[new_state][move_index];
        }
      }
    }
    [queue, new_queue] = [new_queue, queue];
    depth += 1;
  }
  return ptable;
}
function* ida_solve_gen(indices, mtables, ptables, moves_left) {
  let ncoords = indices.length;
  let bound = 0;
  for (let i = 0; i < ncoords; i++) {
    bound = Math.max(bound, ptables[i][indices[i]]);
  }
  while (bound <= moves_left) {
    yield* ida_search_gen(indices, mtables, ptables, bound, -1);
    bound++;
  }
}
function* ida_search_gen(indices, mtables, ptables, bound, last) {
  let ncoords = indices.length;
  let nmoves = mtables[0][0].length;
  let heuristic = 0;
  for (let i = 0; i < ncoords; i++) {
    heuristic = Math.max(heuristic, ptables[i][indices[i]]);
  }
  if (heuristic > bound) {
    return;
  }
  if (bound === 0) {
    yield [];
    return;
  }
  if (heuristic === 0 && bound === 1) {
    return;
  }
  for (let m = 0; m < nmoves; m++) {
    if (m === last) {
      continue;
    }
    if (m < last && moves_commute(m, last)) {
      continue;
    }
    let new_indices = indices.slice();
    for (let c = 0; c < ncoords; c++) {
      new_indices[c] = mtables[c][indices[c]][m];
    }
    let r = 1;
    while (indices.some((_, i) => indices[i] !== new_indices[i])) {
      let subpath_gen = ida_search_gen(
        new_indices,
        mtables,
        ptables,
        bound - 1,
        m
      );
      while (true) {
        let { value: subpath, done } = subpath_gen.next();
        if (done) {
          break;
        }
        yield [[m, r]].concat(subpath);
      }
      for (let c = 0; c < ncoords; c++) {
        new_indices[c] = mtables[c][new_indices[c]][m];
      }
      r++;
    }
  }
}
async function randomMasterTetraminxScrambleString() {
  return generate_scramble_sequence(false);
}
export {
  randomMasterTetraminxScrambleString
};
//# sourceMappingURL=search-dynamic-solve-master_tetraminx-GIS7T5B7.js.map

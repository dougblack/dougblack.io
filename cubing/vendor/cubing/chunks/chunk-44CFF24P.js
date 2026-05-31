import {
  PortableWorker,
  wrap
} from "./chunk-FTE3QI5X.js";
import {
  exposeAPI
} from "./chunk-7GUL3OBQ.js";
import {
  Alg
} from "./chunk-O6HEZXGY.js";

// src/cubing/search/worker-workarounds/index.ts
function searchWorkerURLImportMetaResolve() {
  return import.meta.resolve("./search-worker-entry.js");
}
function searchWorkerURLNewURLImportMetaURL() {
  return new URL("./search-worker-entry.js", import.meta.url);
}
async function searchWorkerURLEsbuildWorkaround() {
  exposeAPI.expose = false;
  return (await import("./search-worker-entry.js")).WORKER_ENTRY_FILE_URL;
}

// src/cubing/search/instantiator.ts
function wrapAPI(worker) {
  return wrap(worker);
}
async function instantiateModuleWorker(workerEntryFileURL) {
  return new Promise(async (resolve, reject) => {
    try {
      const worker = new PortableWorker(workerEntryFileURL);
      const onFirstMessage = (messageData) => {
        if (messageData === "comlink-exposed") {
          resolve(wrapAPI(worker));
        } else {
          reject(
            new Error(`wrong module instantiation message ${messageData}`)
          );
        }
      };
      const onError = (e) => {
        reject(e);
      };
      if ("once" in worker) {
        worker.once("message", onFirstMessage);
      } else {
        worker.addEventListener("error", onError, {
          once: true
        });
        worker.addEventListener(
          "message",
          (e) => onFirstMessage(e.data),
          {
            once: true
          }
        );
      }
    } catch (e) {
      reject(e);
    }
  });
}
var allWorkerAPIPromises = [];
async function instantiateWorkerAPI() {
  const workerAPIPromise = instantiateWorkerImplementation();
  allWorkerAPIPromises.push(workerAPIPromise);
  const insideAPI = await workerAPIPromise;
  insideAPI.setDebugMeasurePerf(searchOutsideDebugGlobals.logPerf);
  insideAPI.setScramblePrefetchLevel(
    searchOutsideDebugGlobals.scramblePrefetchLevel
  );
  return workerAPIPromise;
}
async function instantiateWorkerImplementation() {
  if (globalThis.location?.protocol === "file:") {
    console.warn(
      "This current web page is loaded from the local filesystem (a URL that starts with `file://`). In this situation, `cubing.js` may be unable to generate scrambles or perform searches in some browsers. See: https://js.cubing.net/cubing/scramble/#file-server-required"
    );
  }
  function failed(methodDescription) {
    return `Module worker instantiation${methodDescription ? ` ${methodDescription}` : ""} failed`;
  }
  const importMetaResolveStrategy = [
    async () => instantiateModuleWorker(searchWorkerURLImportMetaResolve()),
    "using `import.meta.resolve(\u2026)",
    null
  ];
  const esbuildWorkaroundStrategy = [
    async () => instantiateModuleWorker(await searchWorkerURLEsbuildWorkaround()),
    "using the `esbuild` workaround",
    // TODO: we will hopefully discontinue the `esbuild` workaround at some
    // point, but `esbuild` has been stuck for 3 years on this issue. Because
    // `esbuild` and Vite (which uses `esbuild`) are now dominating the
    // ecosystem, this just causes a warning for a lot of devs/users that they
    // can't do anything about. As frustrating as the situation is, the
    // workaround is semantically fine (even if it's convoluted) and is
    // preserved by `esbuild`-based flows in practice. So we suppress the
    // warning in the medium-term but maintain long-term hope that we can
    // remove it (and the other fallbacks as well).
    null
  ];
  const newURLStrategy = [
    async () => instantiateModuleWorker(searchWorkerURLNewURLImportMetaURL()),
    "using `new URL(\u2026, import.meta.url)`",
    "will"
  ];
  const fallbackOrder = searchOutsideDebugGlobals.prioritizeEsbuildWorkaroundForWorkerInstantiation ? [esbuildWorkaroundStrategy, importMetaResolveStrategy, newURLStrategy] : [importMetaResolveStrategy, esbuildWorkaroundStrategy, newURLStrategy];
  for (const [fn, description, warnOnSuccess] of fallbackOrder) {
    try {
      const worker = await fn();
      if (warnOnSuccess) {
        if (searchOutsideDebugGlobals.showWorkerInstantiationWarnings) {
          console.warn(
            `Module worker instantiation required ${description}. \`cubing.js\` ${warnOnSuccess} not support this fallback in the future.`
          );
        }
      }
      return worker;
    } catch {
    }
  }
  throw new Error(`${failed()}. There are no more fallbacks available.`);
}

// src/cubing/search/outside.ts
var cachedWorkerInstance;
function getCachedWorkerInstance() {
  return cachedWorkerInstance ??= instantiateWorkerAPI();
}
async function mapToAllWorkers(f) {
  await Promise.all(
    allWorkerAPIPromises.map(async (worker) => {
      f(await worker);
    })
  );
}
async function randomScrambleForEvent(eventID) {
  const worker = searchOutsideDebugGlobals.forceNewWorkerForEveryScramble ? await instantiateWorkerAPI() : await getCachedWorkerInstance();
  const scrambleString = await worker.randomScrambleStringForEvent(eventID);
  return Alg.fromString(scrambleString);
}
async function deriveScrambleForEvent(derivationSeedHex, derivationSaltHierarchy, eventID) {
  if (!searchOutsideDebugGlobals.allowDerivedScrambles) {
    throw new Error("Derived scrambles are not allowed.");
  }
  const worker = searchOutsideDebugGlobals.forceNewWorkerForEveryScramble ? await instantiateWorkerAPI() : await getCachedWorkerInstance();
  const scrambleString = await worker.deriveScrambleStringForEvent(
    derivationSeedHex,
    derivationSaltHierarchy,
    eventID
  );
  return Alg.fromString(scrambleString);
}
async function experimentalSolve3x3x3IgnoringCenters(pattern) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(await cwi.solve333ToString(pattern.patternData));
}
async function experimentalSolve2x2x2(pattern) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(await cwi.solve222ToString(pattern.patternData));
}
async function solveSkewb(pattern) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(await cwi.solveSkewbToString(pattern.patternData));
}
async function solvePyraminx(pattern) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(await cwi.solvePyraminxToString(pattern.patternData));
}
async function solveMegaminx(pattern) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(await cwi.solveMegaminxToString(pattern.patternData));
}
async function solveTwips(kpuzzle, pattern, options) {
  const { targetPattern, ...otherOptions } = options ?? {};
  const apiOptions = otherOptions;
  if (targetPattern) {
    apiOptions.targetPattern = targetPattern.patternData;
  }
  const { ...def } = kpuzzle.definition;
  delete def.experimentalIsPatternSolved;
  const dedicatedWorker = await instantiateWorkerAPI();
  try {
    return Alg.fromString(
      // TODO: unnecessary because we terminate the worker?
      await dedicatedWorker.solveTwipsToString(
        def,
        pattern.patternData,
        apiOptions
      )
    );
  } finally {
    console.log("Search ended, terminating dedicated `twips` worker.");
  }
}
var searchOutsideDebugGlobals = {
  logPerf: true,
  scramblePrefetchLevel: "auto",
  forceNewWorkerForEveryScramble: false,
  showWorkerInstantiationWarnings: true,
  prioritizeEsbuildWorkaroundForWorkerInstantiation: false,
  allowDerivedScrambles: false
};
function setSearchDebug(options) {
  const { logPerf, scramblePrefetchLevel } = options;
  if (typeof logPerf !== "undefined") {
    searchOutsideDebugGlobals.logPerf = logPerf;
    void mapToAllWorkers((worker) => worker.setDebugMeasurePerf(logPerf));
  }
  if (typeof scramblePrefetchLevel !== "undefined") {
    searchOutsideDebugGlobals.scramblePrefetchLevel = scramblePrefetchLevel;
    void mapToAllWorkers(
      (worker) => worker.setScramblePrefetchLevel(scramblePrefetchLevel)
    );
  }
  for (const booleanField of [
    "forceNewWorkerForEveryScramble",
    "showWorkerInstantiationWarnings",
    "prioritizeEsbuildWorkaroundForWorkerInstantiation",
    "allowDerivedScrambles"
  ]) {
    if (booleanField in options) {
      searchOutsideDebugGlobals[booleanField] = options[booleanField] ?? searchOutsideDebugGlobals[booleanField];
    }
  }
}

export {
  randomScrambleForEvent,
  deriveScrambleForEvent,
  experimentalSolve3x3x3IgnoringCenters,
  experimentalSolve2x2x2,
  solveSkewb,
  solvePyraminx,
  solveMegaminx,
  solveTwips,
  setSearchDebug
};
//# sourceMappingURL=chunk-44CFF24P.js.map

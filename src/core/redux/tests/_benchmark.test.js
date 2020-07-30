"use strict";
describe("benchmark", () => {
    it("case 2", () => {
        const Stopwatch = require("node-stopwatch").Stopwatch;
        const stopwatch = Stopwatch.create();
        stopwatch.start();
        // do some stuff
        stopwatch.stop();
        console.log("Elapsed time(ms): " + stopwatch.elapsedMilliseconds);
    });
});
//# sourceMappingURL=_benchmark.test.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const Cytoscape = window.cytoscape; // Imported at index.html via CDN
const colors_1 = require("../react/colors/colors");
const OUTER_LEFT_PADDING = 50;
const OUTER_TOP_PADDING = 200;
const INNER_LEFT_PADDING = 50;
const TOP_PADDING = 100;
const DELAY_MS = 100;
class FindTimetableVisualizer {
    constructor() {
        this.nextPointOfTime = 0; // ms
        this.renderings = [];
        this.searchedPathCount = 0; // This is for keeping track of how many search path the algorithm has gone through
        this.fullSearchPathCount = 0;
        this.startTime = 0;
        this.previousTimerIds = [];
        this.clearPreviousAnimation = () => {
            // clear previous timers that are scheduled for the animation
            this.previousTimerIds.forEach((x) => clearTimeout(x));
            this.previousTimerIds = [];
        };
        this.renderings.push(() => {
            this.cy = Cytoscape({
                elements: [],
                boxSelectionEnabled: false,
                autounselectify: true,
                userZoomingEnabled: false,
                userPanningEnabled: false,
                panningEnabled: false,
                layout: {
                    name: "grid"
                },
                style: [
                    {
                        selector: "node",
                        style: {
                            "height": 20,
                            "width": 20,
                            "background-color": "data(color)",
                            "label": "data(label)"
                        }
                    }, {
                        selector: "edge",
                        style: {
                            "width": 0.5,
                            "opacity": 0.5,
                            "line-color": "black",
                        }
                    }, {
                        selector: "edge.bezier",
                        style: {
                            "curve-style": "bezier",
                            "control-point-step-size": 20
                        }
                    }, {
                        selector: "edge.haystack",
                        style: {
                            "curve-style": "haystack",
                            "haystack-radius": 0.5,
                        },
                    }, {
                        selector: ".top-center",
                        style: {
                            "text-valign": "top",
                            "text-halign": "center"
                        },
                    }
                ],
                container: document.getElementById("for-algo-visualization")
            });
        });
    }
    plotPartition(partition, partitionHeadings) {
        // calculate full search path count
        this.fullSearchPathCount = this.setPartitionCount(partition.map((x) => x.length));
        // initialize start time
        this.startTime = new Date().getTime();
        const X_WIDTH = (window.innerWidth - OUTER_LEFT_PADDING - INNER_LEFT_PADDING) / (partition.length - 1);
        const lastPartition = partition[partition.length - 1]; // because lastPartition has the most number of elements
        const Y_HEIGHT = (window.innerHeight - OUTER_TOP_PADDING) / (lastPartition.length);
        for (let i = 0; i < partitionHeadings.length; i++) {
            const h = partitionHeadings[i];
            this.renderings.push(() => {
                this.cy.add({
                    data: {
                        label: h,
                        color: colors_1.ChosenColors[i % colors_1.ChosenColors.length]
                    },
                    classes: "top-center",
                    position: {
                        x: X_WIDTH * i + INNER_LEFT_PADDING,
                        y: TOP_PADDING
                    }
                });
            });
        }
        for (let i = 0; i < partition.length; i++) {
            for (let j = 0; j < partition[i].length; j++) {
                this.renderings.push(() => {
                    this.cy.add({
                        data: {
                            id: partition[i][j].Uid.toString(),
                            color: colors_1.ChosenColors[i % colors_1.ChosenColors.length]
                        },
                        position: {
                            x: X_WIDTH * i + INNER_LEFT_PADDING,
                            y: Y_HEIGHT * j + TOP_PADDING
                        },
                    });
                });
            }
        }
    }
    connect(x, y) {
        this.renderings.push(() => {
            // setTimeout is used to delay the rendering
            // so that that the effect of animation can be seen
            this.previousTimerIds.push(setTimeout(() => {
                this.cy.add({
                    data: {
                        id: x.Uid + "->" + y.Uid + Math.random(),
                        source: x.Uid.toString(),
                        target: y.Uid.toString(),
                    },
                    classes: "bezier" // "haystack",
                });
            }, this.nextPointOfTime));
            this.nextPointOfTime += DELAY_MS; // ms
        });
    }
    increaseSearchedPathCount() {
        this.searchedPathCount++;
    }
    getSearchedPathCount() {
        return this.searchedPathCount;
    }
    getFullSearchPathCount() {
        return this.fullSearchPathCount;
    }
    getTimeTakenInMillisecond() {
        const now = new Date().getTime();
        return now - this.startTime;
    }
    animate() {
        const ANIMATION_START_DELAY = 50; // ms
        setTimeout(() => {
            for (let i = 0; i < this.renderings.length; i++) {
                this.renderings[i]();
            }
        }, ANIMATION_START_DELAY);
    }
    setPartitionCount(partitionsLength) {
        // this is to calculate what is the number of full search path
        let result = 1;
        for (let i = 0; i < partitionsLength.length; i++) {
            result *= partitionsLength[i];
        }
        return result;
    }
}
exports.FindTimetableVisualizer = FindTimetableVisualizer;
class NullFindTimetableVisualizer extends FindTimetableVisualizer {
    animate() {
        return;
    }
    connect(x, y) {
        return;
    }
    plotPartition(partition, partitionHeadings) {
        return;
    }
}
exports.NullFindTimetableVisualizer = NullFindTimetableVisualizer;
//# sourceMappingURL=findTimetableVisualizer.js.map
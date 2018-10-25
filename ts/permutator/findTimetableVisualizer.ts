// @ts-ignore
const Cytoscape = window.cytoscape; // Imported at index.html via CDN
import {Identifiable} from "../interfaces/identifiable";
import { ChosenColors } from "../react/colors/colors";
const OUTER_LEFT_PADDING = 50;
const OUTER_TOP_PADDING = 200;
const INNER_LEFT_PADDING = 50;
const TOP_PADDING = 70;
let DELAY_MS = 50;

export class FindTimetableVisualizer<T extends Identifiable> {
    private cy : any; // Cytoscape.Core;
    private nextPointOfTime = 0; // ms
    private renderings: Array<() => void> = [];
    private searchedPathCount = 0; // This is for keeping track of how many search path the algorithm has gone through
    private fullSearchPathCount = 0;
    private startTime = 0;

    public constructor() {
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
    public plotPartition (partition : T[][], partitionHeadings: string[]) : void {
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
                        color: ChosenColors[i % ChosenColors.length]
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
                            color: ChosenColors[i % ChosenColors.length]
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

    public connect(x: T, y: T): void {
        this.renderings.push(() => {
            // setTimeout is used to delay the rendering
            // so that that the effect of animation can be seen
            setTimeout(() => {
                this.cy.add({
                    data: {
                        id: x.Uid + "->" + y.Uid + Math.random(),
                        source: x.Uid.toString(),
                        target: y.Uid.toString(),
                    },
                    classes: "bezier" // "haystack",
                });
            }, this.nextPointOfTime);
            this.nextPointOfTime += DELAY_MS; // ms
            DELAY_MS -= 0.0001; // this is needed to create an accelerating animation
        });
    }

    public increaseSearchedPathCount() {
        this.searchedPathCount ++;
    }

    public getSearchedPathCount(): number {
        return this.searchedPathCount;
    }

    public getFullSearchPathCount(): number {
        return this.fullSearchPathCount;
    }

    public getTimeTakenInMillisecond(): number {
        const now = new Date().getTime();
        return now - this.startTime;
    }

    public animate(): void {
        const ANIMATION_START_DELAY = 50; // ms
        setTimeout(() => {
            for (let i = 0; i < this.renderings.length; i++) {
                this.renderings[i]();
            }
        }, ANIMATION_START_DELAY);
    }

    private setPartitionCount(partitionsLength: number[]) {
        // this is to calculate what is the number of full search path
        let result = 1;
        for (let i = 0; i < partitionsLength.length; i++) {
            result *= partitionsLength[i];
        }
        return result;
    }
}

export class NullFindTimetableVisualizer<T extends Identifiable> extends FindTimetableVisualizer<T> {
    public animate(): void {
        return;
    }

    public connect(x: T, y: T): void {
        return;
    }

    public plotPartition(partition : T[][], partitionHeadings: string[]): void {
        return;
    }
}

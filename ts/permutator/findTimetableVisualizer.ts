// @ts-ignore
const Cytoscape = window.cytoscape; // Imported at index.html via CDN
import {Identifiable} from "../interfaces/identifiable";
const OUTER_LEFT_PADDING = 500; // Refer index.css, #for-algo-visualization
const OUTER_TOP_PADDING = 100;
const INNER_LEFT_PADDING = 50;
const TOP_PADDING = 50;
let DELAY_MS = 100.00;

export class FindTimetableVisualizer<T extends Identifiable> {
    private cy : any; // Cytoscape.Core;
    private nextPointOfTime = 0; // ms
    private renderings: Array<() => void> = [];
    private connectCount = 0;

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
                            "height": 10,
                            "width": 10,
                            "background-color": "#18e018",
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
        const X_WIDTH = (window.innerWidth - OUTER_LEFT_PADDING - INNER_LEFT_PADDING) / (partition.length + 1);
        const lastPartition = partition[partition.length - 1]; // because lastPartition has the most number of elements
        const Y_WIDTH = (window.innerHeight - OUTER_TOP_PADDING) / (lastPartition.length);
        for (let i = 0; i < partitionHeadings.length; i++) {
            const h = partitionHeadings[i];
            this.renderings.push(() => {
                this.cy.add({
                    data: {
                        label: h
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
                        },
                        position: {
                            x: X_WIDTH * i + INNER_LEFT_PADDING,
                            y: Y_WIDTH * j + TOP_PADDING
                        },
                    });
                });
            }
        }
    }

    public connect(x: T, y: T): void {
        this.connectCount ++;
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
                    classes: "haystack",
                });
            }, this.nextPointOfTime);
            this.nextPointOfTime += DELAY_MS; // ms
            DELAY_MS -= 0.0001; // this is needed to create an accelerating animation
        });
    }

    public animate(): void {
        console.log(this.connectCount);
        for (let i = 0; i < this.renderings.length; i++) {
            this.renderings[i]();
        }
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

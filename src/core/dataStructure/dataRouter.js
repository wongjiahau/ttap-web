"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DataRouter {
    constructor() {
        this.dict = {};
        this.currentRoute = null;
    }
    AddData(route, data) {
        if (this.dict[route] !== undefined) {
            throw new Error(route + " is an existed key in this DataRouter instance.");
        }
        this.dict[route] = data;
    }
    SetRouteTo(newRoute) {
        if (this.dict[newRoute] === undefined) {
            throw new Error("No data existed at " + newRoute);
        }
        this.currentRoute = newRoute;
    }
    GetCurrentData() {
        if (this.currentRoute === null) {
            throw new Error("No route is set yet.");
        }
        return this.dict[this.currentRoute];
    }
    GetCurrentRoute() {
        return this.currentRoute;
    }
    GetDataFrom(route) {
        return this.dict[route];
    }
    Clone() {
        const clone = new DataRouter();
        clone.dict = this.dict;
        clone.currentRoute = this.currentRoute;
        return clone;
    }
}
exports.DataRouter = DataRouter;
//# sourceMappingURL=dataRouter.js.map
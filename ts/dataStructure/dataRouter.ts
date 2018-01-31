import { IStringDicionary } from "./../interfaces/dictionary";

export class DataRouter<T> {
    private dict: IStringDicionary<T>;
    private currentLabel: string;
    public constructor() {
        this.dict = {};
        this.currentLabel = null;
    }

    public AddData(label: string, data: T) {
        if (this.dict[label] !== undefined) {
            throw new Error(label + " is an existed key in this DataRouter instance.");
        }
        this.dict[label] = data;
    }

    public SetRouteTo(newLabel: string) {
        if (this.dict[newLabel] === undefined) {
            throw new Error("No data existed at " + newLabel);
        }
        this.currentLabel = newLabel;
    }

    public GetCurrentData() : T {
        if (this.currentLabel === null) {
            throw new Error("No route is set yet.");
        }
        return this.dict[this.currentLabel];
    }

    public GetDataFrom(label: string) {
        return this.dict[label];
    }
}

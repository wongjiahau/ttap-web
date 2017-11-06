import { BoundedInt } from "./boundedInt";
export function GenerateIndices < T > ( x : T[][]) : BoundedInt[] {
    const result = new Array<BoundedInt>();
    const bi = new BoundedInt(0, 0);
    bi.Value = 0;
    for (let i = 0; i < x.length; i++) {
        bi.UpperLimit = x[i].length - 1;
        result.push(bi.Duplicate());
    }
    return result;
}

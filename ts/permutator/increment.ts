import {
    BoundedInt
} from "./boundedInt";

export function Increment(indices: BoundedInt[]): BoundedInt[] {
    let pointer = indices.length - 1;
    const x = indices.slice();
    while (true) {
        x[pointer].Value++;
        if (x[pointer].Value > x[pointer].UpperLimit) {
            x[pointer].Value = 0;
            pointer--;
            if (pointer < 0) {
                return null;
            }
        } else {
            return x;
        }
    }
}

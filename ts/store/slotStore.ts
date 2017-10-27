import {find, max, min} from "lodash";
import {RawSlot} from "../model/rawSlot";
export default class SlotStore {
    private rawSlots: RawSlot[];
    constructor(rawSlots: RawSlot[]) {
        this.rawSlots = rawSlots;
    }

    /**
     * Get slot based on hash id (which is unique for each slot)
     * @param {number} hashId
     * @memberof SlotStore
     */
    public GetSlot(hashId: number) {
        return find(this.rawSlots, (s) => s.HashId === hashId);
    }

    /**
     * Get the available range of hashId that can be passed in to GetSlot()
     * @memberof SlotStore
     */
    public GetAvailableRange(): [number, number] {
        const hashIds = new Array < number > ();
        this
            .rawSlots
            .forEach((s) => {
                hashIds.push(s.HashId);
            });
        return [min(hashIds), max(hashIds)];
    }

    /**
     * Get the minimum valid hash id that can be passed in to GetSlot()
     * @returns {number} A hash id of a slot
     * @memberof SlotStore
     */
    public GetMinRange(): number {
        const hashIds = new Array < number > ();
        this.rawSlots.forEach((s) => {
            hashIds.push(s.HashId);
        });
        return min(hashIds);
    }

    /**
     * Get the maximum valid hash id that can be passed in to GetSlot()
     * @returns {number} A hash id of a slot
     * @memberof SlotStore
     */
    public GetMaxRange(): number {
        const hashIds = new Array < number > ();
        this.rawSlots.forEach((s) => {
            hashIds.push(s.HashId);
        });
        return max(hashIds);
    }
}

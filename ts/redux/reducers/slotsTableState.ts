export interface ISlotsTableState {
    IsOpen: boolean;
    SlotStates: boolean[]; // whether a slot is selected or not
}

export function NewSlotsTableState() : ISlotsTableState {
    return {
        IsOpen: false,
        SlotStates: []
    };
}

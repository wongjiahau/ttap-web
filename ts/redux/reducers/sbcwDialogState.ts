export interface ISBCWDialogState {
    IsOpen: boolean;
}

export function NewSbcwDialogstate(): ISBCWDialogState {
    return {
        IsOpen: false
    };
}

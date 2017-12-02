export interface ISnackbarState {
    IsOpen: boolean;
    Message: string;
}

export function NewSnackbarState() : ISnackbarState {
    return {
        IsOpen: false,
        Message: "",
    };
}

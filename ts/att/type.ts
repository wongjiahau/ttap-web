export function ParseType(group: string): number {
    switch (group.toLowerCase()) {
        case "L":
            return 0;
        case "T":
            return 1;
        case "P":
            return 2;
        default:
            throw new Error("Expected group to be L/T/P only, but received : " + group);
    }
}

export function ParseType(group: string): 0 | 1 | 2 {
  switch (group.toUpperCase()) {
    case "L":
      return 0;
    case "T":
      return 1;
    case "P":
      return 2;
    default:
      throw new Error(
        "Expected group to be L/T/P only, but received : " + group
      );
  }
}

export enum Type {
  LECTURE = 0,
  TUTORIAL = 1,
  PRACTICAL = 2,
}

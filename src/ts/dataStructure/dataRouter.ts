import { IStringDicionary } from "./../interfaces/dictionary";

export class DataRouter<T> {
  private dict: IStringDicionary<T>;
  private currentRoute: string | null;
  public constructor() {
    this.dict = {};
    this.currentRoute = null;
  }

  public AddData(route: string, data: T) {
    if (this.dict[route] !== undefined) {
      throw new Error(
        route + " is an existed key in this DataRouter instance."
      );
    }
    this.dict[route] = data;
  }

  public SetRouteTo(newRoute: string) {
    if (this.dict[newRoute] === undefined) {
      throw new Error("No data existed at " + newRoute);
    }
    this.currentRoute = newRoute;
  }

  public GetCurrentData(): T {
    if (this.currentRoute === null) {
      throw new Error("No route is set yet.");
    }
    return this.dict[this.currentRoute];
  }

  public GetCurrentRoute(): string | null {
    return this.currentRoute;
  }

  public GetDataFrom(route: string) {
    return this.dict[route];
  }

  public Clone(): DataRouter<T> {
    const clone = new DataRouter();
    clone.dict = this.dict;
    clone.currentRoute = this.currentRoute;
    return clone as DataRouter<T>;
  }
}

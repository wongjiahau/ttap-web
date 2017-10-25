export interface IAction < T > {
  type: string;
  generateNewState(state : T): T;
}

export abstract class ActionGenerator < T > {
  public Action() : IAction < T > {
    return {
      generateNewState: this.NewStateGenerator(),
      type: this.TypeName()
    };
  }

  protected abstract NewStateGenerator() : (state : T) => T;
  protected abstract TypeName() : string;
}

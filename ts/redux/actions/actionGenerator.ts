export interface IAction < T > {
  type: string;
  generateNewState(state : T): T;
}

export abstract class ActionGenerator < T > {
  public Action() : IAction < T > {
    const generateNewState = this.GenerateNewState.bind(this);
    return {
      generateNewState,
      type: this.TypeName()
    };
  }
  public abstract TypeName() : string;
  protected abstract GenerateNewState(state : T) : T;
}

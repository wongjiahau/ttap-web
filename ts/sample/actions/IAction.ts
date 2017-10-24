export interface IAction < T > {
  type: string;
  generateNewState(state : T): T;
}

export abstract class ActionGenerator < T > {
  private action : IAction < T >;
  private typeName : string;
  protected constructor(typeName : string) {
    this.typeName = typeName;
  }

  public Action() : IAction < T > {
    return this.action;
  }

  protected CreateAction(generateNewState : (state : T) => T) {
    this.action = {
      generateNewState,
      type: this.typeName
    };
  }
}

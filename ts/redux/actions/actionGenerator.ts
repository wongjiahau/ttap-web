export interface IAction < T > {
    stateName: string;
    type: string;
    generateNewState(state: T): T;
}

/**
 * This class is use to generate actions
 * @export
 * @abstract
 * @class ActionGenerator
 * @template T is the type of Redux State where the action will return
 */
export abstract class ActionGenerator < T > {
    public Action(): IAction < T > {
        return {
            generateNewState: this
                .GenerateNewState
                .bind(this),
            stateName: this.StateName(),
            type: this.TypeName().toUpperCase()
        };
    }
    public abstract TypeName(): string;
    public abstract StateName(): string;
    protected abstract GenerateNewState(state: T): T;
}

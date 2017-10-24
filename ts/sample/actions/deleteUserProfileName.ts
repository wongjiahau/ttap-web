import {IUserProfileState} from "./../reducers/userProfile";
import {ActionGenerator} from "./IAction";

export class DeleteUserProfileName extends ActionGenerator < IUserProfileState > {
  public constructor() {
    super("delete user profile name");
    this.CreateAction(
      (state : IUserProfileState) => {
        return {
          ...state,
          FirstName : ""
        };
      }
    );
  }
}

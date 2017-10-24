import {IUserProfileState} from "./../reducers/userProfile";
import {ActionGenerator} from "./IAction";

export class DeleteUserProfileName extends ActionGenerator < IUserProfileState > {
  public constructor() {
    super("DELETE_USERPROFILE_NAME");
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

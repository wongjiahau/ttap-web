import {IUserProfileState} from "./../reducers/userProfile";
import {ActionGenerator} from "./IAction";

export class UpdateUserProfileName extends ActionGenerator < IUserProfileState > {
  public constructor(newName : string) {
    super("UPDATE_USER_PROFILE_NAME");
    this.CreateAction((state : IUserProfileState) => {
      return {
        ...state,
        FirstName: newName,
      };
    });
  }
}

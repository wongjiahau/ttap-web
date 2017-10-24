import {IUserProfileState} from "./../reducers/userProfile";
import {ActionGenerator} from "./IAction";

export class UpdateUserProfileName extends ActionGenerator < IUserProfileState > {
  public constructor(newName : string) {
    super("update user profile name");
    this.CreateAction((state : IUserProfileState) => {
      return {
        ...state,
        FirstName: newName,
      };
    });
  }
}

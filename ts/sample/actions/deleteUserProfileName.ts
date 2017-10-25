import {IUserProfileState} from "./../reducers/userProfile";
import {ActionGenerator} from "./IAction";

export class DeleteUserProfileName extends ActionGenerator < IUserProfileState > {
  protected NewStateGenerator(): (state: IUserProfileState) => IUserProfileState {
    return (state : IUserProfileState) : IUserProfileState => {
      return {
        ...state,
        FirstName: ""
      };
    };
  }
  protected TypeName() : string {return "delete user profile name"; }
}

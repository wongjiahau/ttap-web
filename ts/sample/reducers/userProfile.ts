import {actionsEnums} from "./../common/actionEnums";
import {IUserProfileState} from "./userProfile";

export interface IUserProfileState {
  FirstName : string;
}

export class UserProfileState implements IUserProfileState {
  public FirstName : string;

  constructor(firstName = "Default name") {
    this.FirstName = firstName;
  }
}

export const userProfileReducer = (state : any = new UserProfileState(), action) : IUserProfileState => {
  try {
    const result = action.generateNewState(state);
    return result;
  } catch (e) {
    console.log(result);
    return state;
  }
};

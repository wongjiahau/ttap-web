import {IAction} from "./../actions/IAction";
import {actionsEnums} from "./../common/actionEnums";
import { IUserProfileState } from "./userProfile";

export interface IUserProfileState {
  FirstName : string;
}

export class UserProfileState implements IUserProfileState {
  public FirstName : string;

  constructor(firstName = "Default name") {
    this.FirstName = firstName;
  }
}

export const userProfileReducer = (state : UserProfileState = new UserProfileState(), action) : IUserProfileState => {
  switch (action.type) {
    case actionsEnums.UPDATE_USERPROFILE_NAME:
    case actionsEnums.DELETE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action);
    default:
      break;
  }
  return state;
};

const handleUserProfileAction = (state : UserProfileState, action : IAction < string >) : IUserProfileState => {
  return {
    ...state,
    FirstName: action.payload
  };
};

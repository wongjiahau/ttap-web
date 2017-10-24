import { IAction } from "./../actions/IAction";
import {actionsEnums} from "./../common/actionEnums";

class UserProfileState {
  private firstname : string;

  constructor() {
    this.firstname = "Default name";
  }
}

export const userProfileReducer = (state : UserProfileState = new UserProfileState(), action) => {
  switch (action.type) {
    case actionsEnums.UPDATE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action);
    case actionsEnums.DELETE_USERPROFILE_NAME:
      return handleUserProfileAction(state, action);
    default:
      break;
  }
  return state;
};

const handleUserProfileAction = (state : UserProfileState, action : IAction<string>) => {
  return {
    ...state,
    firstname: action.payload
  };
};

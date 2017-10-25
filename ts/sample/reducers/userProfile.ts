import {GenereteReducer} from "./GenerateReducer";

export interface IUserProfileState {
  FirstName : string;
}

export class UserProfileState implements IUserProfileState {
  public FirstName : string;

  constructor(firstName = "Default name") {
    this.FirstName = firstName;
  }
}

export const UserProfileReducer = GenereteReducer(new UserProfileState());

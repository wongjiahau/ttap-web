import {has} from "lodash";
import {ReducerGenerator} from "./ReducerGenerator";
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

export const UserProfileReducer = new ReducerGenerator<IUserProfileState>(new UserProfileState()).GetReducer();

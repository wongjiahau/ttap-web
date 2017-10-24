import {actionsEnums} from "../common/actionEnums";
import {IAction} from "./IAction";

export const updateUserProfileName = (newName : string) : IAction<string> => {
  const result : IAction<string> = {
      payload: newName,
      type: actionsEnums.UPDATE_USERPROFILE_NAME,
  };
  return result;
};

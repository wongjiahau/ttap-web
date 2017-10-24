import {actionsEnums} from "../common/actionEnums";
import {IAction} from "./IAction";

export const deleteUserProfileName = () : IAction<string> => {
  const result : IAction<string> = {
      payload: "",
      type: actionsEnums.DELETE_USERPROFILE_NAME,
  };
  return result;
};

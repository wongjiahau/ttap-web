import {expect} from "chai";
import {DeleteUserProfileName} from "./../actions/deleteUserProfileName";
import {IAction} from "./../actions/IAction";
import {actionsEnums} from "./../common/actionEnums";

describe("deleteUserProfileName", () => {
    it("should return an action where type is DELETE_USERPROFILE_NAME", () => {
        const action = DeleteUserProfileName();
        expect(action.type)
            .to
            .equal(actionsEnums.DELETE_USERPROFILE_NAME);
    });

    it("should return an action where payload is empty string", () => {
        const action = DeleteUserProfileName();
        expect(action.payload)
            .to
            .equal("");
    });

});

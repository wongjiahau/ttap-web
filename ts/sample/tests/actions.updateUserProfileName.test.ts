import {expect} from "chai";
import {IAction} from "./../actions/IAction";
import {UpdateUserProfileName} from "./../actions/updateUserProfileName";
import {actionsEnums} from "./../common/actionEnums";

describe("deleteUserProfileName", () => {
    it("should take a string argument which represent the new name", () => {
        UpdateUserProfileName("new name");
    });

    it("should return an action where type is UPDATE_USERPROFILE_NAME", () => {
        const action = UpdateUserProfileName("random stuff");
        expect(action.type)
            .to
            .equal(actionsEnums.UPDATE_USERPROFILE_NAME);
    });

    it("should return an action where payload is equal to the input", () => {
        const input = "spongebob";
        const action = UpdateUserProfileName(input);
        expect(action.payload)
            .to
            .equal(input);
    });

});

import {expect} from "chai";
import {IAction} from "./../actions/IAction";
import { updateUserProfileName } from "./../actions/updateUserProfileName";
import {actionsEnums} from "./../common/actionEnums";

describe("deleteUserProfileName", () => {
    it("should return an action where type is UPDATE_USERPROFILE_NAME", () => {
        const action = updateUserProfileName("random stuff");
        expect(action.type)
            .to
            .equal(actionsEnums.UPDATE_USERPROFILE_NAME);
    });

    it("should return an action where payload is equal to the input", () => {
        const input = "spongebob";
        const action = updateUserProfileName(input);
        expect(action.payload)
            .to
            .equal(input);
    });

});

import { expect } from "chai";
import { isEqual } from "lodash";
import { DeleteUserProfileName } from "../actions/deleteUserProfileName";
import { UpdateUserProfileName } from "./../actions/updateUserProfileName";
import { IUserProfileState, userProfileReducer, UserProfileState } from "./../reducers/userProfile";

describe("userProfile reducer", () => {

    it("should return a state which is the default userProfile state", () => {
        const initialState = new UserProfileState();
        const state = userProfileReducer(initialState, {});
        expect(state).to.equal(initialState);
    });

    it("should handle updateUserProfileName", () => {
        const initialState = new UserProfileState();
        const newState = userProfileReducer(initialState, new UpdateUserProfileName("new name").Action());
        const expectedState : IUserProfileState = {
            FirstName: "new name"
        };
        expect(isEqual(newState, expectedState)).to.eq(true);
    });

    it("should handle deleteUserProfileName", () => {
        const initialState = new UserProfileState();
        const newState = userProfileReducer(initialState, new DeleteUserProfileName().Action());
        const expectedState : IUserProfileState = {
            FirstName: ""
        };
        expect(isEqual(newState, expectedState)).to.eq(true);
    });

});

import {connect} from "react-redux";
import { IRawSlot } from "../../model/rawSlot";
import { ILoginDispatchProps, Login } from "./../../react/login";
import { NotifyDataLoaded } from "./../actions/notifyDataLoaded";

const mapStateToProps = (state): {} => {
    return {};
};

const mapDispatchToProps = (dispatch): ILoginDispatchProps => {
    return {
        handleLoadSlots: (rawSlots: IRawSlot[]) => {
            dispatch(new NotifyDataLoaded(rawSlots));
        }
    };
};

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

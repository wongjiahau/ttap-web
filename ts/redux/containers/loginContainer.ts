import {connect} from "react-redux";
import ParseHtmlToRawSlot from "../../parser/parseHtmlToRawSlot";
import { ILoginDispatchProps, Login } from "./../../react/login";
import { NotifyDataLoaded } from "./../actions/notifyDataLoaded";

const mapStateToProps = (state): {} => {
    return {};
};

const mapDispatchToProps = (dispatch): ILoginDispatchProps => {
    return {
        handleParseHtmlToSlot: (html: string) => {
            const rawSlots = ParseHtmlToRawSlot(html);
            dispatch(new NotifyDataLoaded(rawSlots));
        }
    };
};

export const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

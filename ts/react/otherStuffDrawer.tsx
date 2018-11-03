import BugIcon from "material-ui-icons/BugReport";
import LogoutIcon from "material-ui-icons/ExitToApp";
import FeedbackIcon from "material-ui-icons/Feedback";
import HelpIcon from "material-ui-icons/Help";
import HomeIcon from "material-ui-icons/Home";
import InfoIcon from "material-ui-icons/Info";
import SchoolIcon from "material-ui-icons/School";
import Button from "material-ui/Button";
import Drawer from "material-ui/Drawer";
import List, {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import * as React from "react";
import {Link} from "react-router-dom";
import { BugFormUrl, FeedbackFormUrl } from "../constants";

const linkStyle = {
    textDecoration: "none"
};

const MenuItemStyle = {
    fontSize: 15,
    fontWeight: "bold"
};

interface IOtherStuffDrawerProps {
    onItemClick : () => void;
    isOpen: boolean;
}

export const OtherStuffDrawer = (props : IOtherStuffDrawerProps) => {
    const routerLink = (icon: any, text: string, to: string) =>
            <Link style={linkStyle} to={to}>
                <ListItem button={true} onClick={props.onItemClick}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}/>

                </ListItem>
            </Link>;

    const newTabLink = (icon: any, text: string, url: string) => {
        return (
            <ListItem button={true} onClick={() => {window.open(url, "_blank"); props.onItemClick(); }}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}/>
            </ListItem>
        );
    };

    return (
        <Drawer open={props.isOpen} anchor="right" onClose={props.onItemClick}>
            <List>
                {routerLink( <HelpIcon/>, "Tutorial", "learn")}
                {newTabLink( <FeedbackIcon/>, "Feedback", FeedbackFormUrl)}
                {newTabLink( <BugIcon/>, "Report a bug", BugFormUrl)}
                {routerLink( <InfoIcon/>, "About TTAP", "about")}
                {routerLink( <SchoolIcon/>, "Terms of Service", "tospp")}
                {/* {routerLink( <LogoutIcon/>, "Logout", "login")}
                    Temporarily removed, because we have a Back button already
                */}
            </List>
        </Drawer >
    );
};

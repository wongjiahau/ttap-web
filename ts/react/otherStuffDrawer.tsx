import BugIcon from "material-ui-icons/BugReport";
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
    const routerLink = (icon, text, to) =>
            <Link style={linkStyle} to={to}>
                <ListItem button={true} onClick={props.onItemClick}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}/>

                </ListItem>
            </Link>;

    const newTabLink = (icon, text, url) => {
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
        <Drawer open={props.isOpen} anchor="right">
            <Button color="secondary" raised={true} onClick={props.onItemClick}>
                Hide drawer
            </Button>
            <List>
                {routerLink( <HelpIcon/>, "Help", "/")}
                {newTabLink( <FeedbackIcon/>, "Feedback", FeedbackFormUrl)}
                {newTabLink( <BugIcon/>, "Report a bug", BugFormUrl)}
                {routerLink( <InfoIcon/>, "About TTAP", "about")}
                {routerLink( <SchoolIcon/>, "Terms of Service", "tospp")}
            </List>
        </Drawer>
    );
};

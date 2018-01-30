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

const linkStyle = {
    textDecoration: "none"
};

const MenuItemStyle = {
    fontSize: 15,
    fontWeight: "bold"
};

const ReadMeUrl = "https://github.com/wongjiahau/TTAP-UTAR/blob/master/README.md";

interface IOtherStuffDrawerProps {
    onItemClick : () => void;
    isOpen: boolean;
}

export const OtherStuffDrawer = (props : IOtherStuffDrawerProps) => {
    const getLink = (icon, text, to) => {
        return (
            <Link style={linkStyle} to={to}>
                <ListItem button={true} onClick={props.onItemClick}>
                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={text}/>

                </ListItem>
            </Link>
        );
    };
    return (
        <Drawer open={props.isOpen} anchor="right">
            <Button color="secondary" raised={true} onClick={props.onItemClick}>
                Hide drawer
            </Button>
            <List>
                {getLink( <HelpIcon/>, "Help", "/")}
                {getLink( <FeedbackIcon/>, "Feedback", "feedbackForm")}
                {getLink( <BugIcon/>, "Report a bug", "reportBugForm")}
                {getLink( <InfoIcon/>, "About TTAP", "about")}
                {getLink( <SchoolIcon/>, "Terms of Service", "tospp")}
            </List>
        </Drawer>
    );
};

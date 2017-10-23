import BugIcon from 'material-ui-icons/BugReport';
import {Link} from 'react-router-dom';
import FeedbackIcon from 'material-ui-icons/Feedback';
import HelpIcon from 'material-ui-icons/Help';
import InfoIcon from 'material-ui-icons/Info';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';

const linkStyle = {
    textDecoration: 'none'
};

const MenuItemStyle = {
    fontSize: 15,
    fontWeight: 'bold'
};

const ReadMeUrl = "https://github.com/wongjiahau/TTAP-UTAR/blob/master/README.md";
export const DrawerContent = (props) => {
    return (
        <div>
            <Link style={linkStyle} to="404">
                <MenuItem
                    onClick={props.onItemClick}
                    style={MenuItemStyle}
                    rightIcon={< InfoIcon />}>Help</MenuItem>
            </Link>
            <Link style={linkStyle} to="feedbackForm">
                <MenuItem
                    onClick={props.onItemClick}
                    style={MenuItemStyle}
                    rightIcon={< FeedbackIcon />}>Feedback</MenuItem>
            </Link>
            <Link style={linkStyle} to="reportBugForm">
                <MenuItem
                    onClick={props.onItemClick}
                    style={MenuItemStyle}
                    rightIcon={< BugIcon />}>Report a bug</MenuItem>
            </Link>
            <Link style={linkStyle} to="404">
                <MenuItem
                    onClick={props.onItemClick}
                    style={MenuItemStyle}
                    rightIcon={< HelpIcon />}>About TTAP</MenuItem>
            </Link>
        </div>
    );
}
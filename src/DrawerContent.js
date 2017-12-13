import BugIcon from 'material-ui-icons/BugReport';
import FeedbackIcon from 'material-ui-icons/Feedback';
import HelpIcon from 'material-ui-icons/Help';
import HomeIcon from 'material-ui-icons/Home';
import InfoIcon from 'material-ui-icons/Info';
import SchoolIcon from 'material-ui-icons/School';
import MenuItem from 'material-ui/MenuItem';
import React from 'react';
import {Link} from 'react-router-dom';

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
            <Link style={linkStyle} to="/">
                <MenuItem
                    onClick={props.onItemClick}
                    style={MenuItemStyle}
                    rightIcon={< HelpIcon/>}>Help</MenuItem>
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
            <Link style={linkStyle} to="about">
                <MenuItem
                    onClick={props.onItemClick}
                    style={MenuItemStyle}
                    rightIcon={< InfoIcon />}>About TTAP</MenuItem>
            </Link>
            <Link style={linkStyle} to="tospp">
                <MenuItem
                    onClick={props.onItemClick}
                    style={MenuItemStyle}
                    rightIcon={< SchoolIcon/>}>Terms of Service</MenuItem>
            </Link>
        </div>
    );
}
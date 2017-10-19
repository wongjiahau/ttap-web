import React, {Component} from 'react';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class SubjectView extends React.Component {
  handleClick = () => {
    alert()
  }
  render() {
    return (<ListItem
      primaryText={this.props.subjectName}
      secondaryText={this.props.subjectCode}
      onClick={this.handleClick}/>);
  }
};

export default SubjectView;

//term of service and privacy policy
import $ from 'jquery';
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

const divStyle = {
    margin: "auto",
    textAlign: "center",
    width: 0.9 * $(window).width(),
    height: 0.825 * $(window).height()
}

const paperStyle = {
    textAlign : "left",
    padding: "20px",
    margin: "20px"
}

export class Tospp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markdownSource: "Loading ... "
        };
    }

    componentDidMount() {
        const setState = this.setState.bind(this);
        var http = require('http');
        var request = http.get("https://raw.githubusercontent.com/wongjiahau/ttap-web/master/TOSPP.md", function (response) {
            response
                .on('data', function (loadedData) {
                    setState({markdownSource: loadedData.toString()});
                });
        });
    }

    render() {
        const ReactMarkdown = require('react-markdown');
        return (
            <div style={divStyle}>
                <Paper style={paperStyle}>
                    <ReactMarkdown source={this.state.markdownSource}/>
                </Paper>
            </div>
        );
    }
}

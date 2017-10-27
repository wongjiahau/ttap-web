//term of service and privacy policy
import $ from 'jquery';
import './markdown.css';
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

class MarkdownPages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markdownSource: "Loading ... "
        };
        this.src = props.src;
    }

    componentDidMount() {
        const setState = this.setState.bind(this);
        var http = require('http');
        var request = http.get(this.src, function (response) {
            response
                .on('data', function (loadedData) {
                    setState({markdownSource: loadedData.toString()});
                });
        });
    }

    render() {
        const ReactMarkdown = require('react-markdown');
        return (
            <div style={divStyle} className="markdown-body">
                <Paper style={paperStyle}>
                    <ReactMarkdown source={this.state.markdownSource}/>
                </Paper>
            </div>
        );
    }
}

export const Tospp = () => {
    return <MarkdownPages src="https://raw.githubusercontent.com/wongjiahau/ttap-web/master/TOSPP.md"/>
}

export const About = () => {
    return <MarkdownPages src="https://raw.githubusercontent.com/wongjiahau/ttap-web/master/README.md"/>
}
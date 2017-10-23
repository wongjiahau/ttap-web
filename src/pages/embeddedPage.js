import React from 'react';
import $ from 'jquery';

const divStyle = {
    margin: "auto",
    textAlign: "center"
}

const EmbeddedPage = (props) => {
    return (
        <div style={divStyle}>
            <iframe
                src={props.src}
                width={0.9 * $(window).width()}
                height={0.825 * $(window).height()}
                frameborder="0"
                marginheight="0"
                marginwidth="0">Loading...</iframe>
        </div>
    );
}

export const FeedbackForm = () => {
    return (<EmbeddedPage
        src="https://docs.google.com/forms/d/e/1FAIpQLSfVvbGipUSiuwaKoFSH_Er4PTDqTnKv3w9wxEKyhFYDBlLMLw/viewform?embedded=true"/>);
}

export const ReportBugForm = () => {
    return (<EmbeddedPage
        src="https://docs.google.com/forms/d/e/1FAIpQLSfO9jhqH8tSfRswDI5sU5YAFrtTS-Xdk3Kysp3MtJ4yPuFToQ/viewform?embedded=true"/>);
}
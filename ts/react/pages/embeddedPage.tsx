import * as React from "react";

const divStyle = {
    margin: "auto",
    textAlign: "center"
};

const EmbeddedPage = (props) => {
    return (
        <div style={divStyle}>
            <iframe
                src={props.src}
                width={0.9 * window.innerWidth}
                height={0.825 * window.innerHeight}
                >Loading...</iframe>
        </div>
    );
};

export const FeedbackForm = () => {
    return (<EmbeddedPage
        src="https://docs.google.com/forms/d/e/1FAIpQLSeaHX6ckUye3r-MSNk0cSSyc8D2i-UHQdi4QasFgwH920olgg/viewform?embedded=true"/>);
};

export const ReportBugForm = () => {
    return (<EmbeddedPage
        src="https://docs.google.com/forms/d/e/1FAIpQLSfgVvjrplcc4pVc4tadmP0wadj9lX_vYL9KCpAQwrA_0KVJ3w/viewform?embedded=true"/>);
};

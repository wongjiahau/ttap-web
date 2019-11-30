import * as React from "react";
import { Backable } from "../backable";

const divStyle: React.CSSProperties = {
    margin: "auto",
    textAlign: "center"
};

const EmbeddedPage = (props: {src: string}) => {
    return (
        <Backable>
            <div style={divStyle}>
                <iframe
                    src={props.src}
                    width={0.9 * window.innerWidth}
                    height={0.80 * window.innerHeight}
                    >Loading...</iframe>
            </div>
        </Backable>
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

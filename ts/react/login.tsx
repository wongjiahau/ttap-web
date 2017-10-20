import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import * as React from "react";
import * as S from "string";
import parseHtmlToSlot from "../parser/parseHtmlToRawSlot";
import RawSlot from "../model/rawSlot";

const buttonStyle = {
    disabled: "true",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
    width: "250px"
};
const cardStyle = {
    color: "white",
    left: "50px",
    position: "absolute",
    textAlign: "center",
    top: "120px",
    verticalAlign: "center"
};
const coverStyle : React.CSSProperties = {
    backgroundImage: `url(https://raw.githubusercontent.com/wongjiahau/ttap-web/master/src/images/background.jpg)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    bckgroundAttachment: "fixed",
    marginTop: "-20px",
    minHeight: "600px"
};
const fieldStyle : React.CSSProperties = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "5px",
    marginLeft: "20px",
    marginRight: "20px"
};
const header1Style : React.CSSProperties = {
    fontSize: "72px"
};
const headerDivStyle : React.CSSProperties = {
    left: "400px",
    position: "absolute",
    top: "120px"
};
const iframeStyle : React.CSSProperties = {
    border: 0,
    height: 1,
    width: 1
};
const kapchaStyle : React.CSSProperties = {
    width: "250px"
};
const subHeaderDivStyle : React.CSSProperties = {
    marginTop: "-30px"
};

const urls = {
    CourseTimetablePreview: "https://unitreg.utar.edu.my/portal/courseRegStu/schedule/masterSchedule.jsp",
    End: "http://0.0.0.0/",
    InvalidCaptcha: "https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp?message=invalidSecurit" +
            "y",
    InvalidIdOrPassword: "https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp?message=loginError",
    Kaptcha: "https://unitreg.utar.edu.my/portal/Kaptcha.jpg",
    LoginPage: "https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp",
    TestServer: "http://localhost/ttap_testdata/"
};

let tryCount = 0;
// TODO: Add the link for TOS and PP

export interface ILoginProps {
    notifyDataLoaded : (loadedSlots : RawSlot[]) => void
}
export class Login extends React.Component < ILoginProps, {} > {
    public handleClick = () => {
        const iframeDoc = (document.getElementById("iframe")as HTMLIFrameElement).contentDocument;
        const studentIdField = iframeDoc.getElementsByName("reqFregkey")[0]as HTMLInputElement;
        const passwordField = iframeDoc.getElementsByName("reqPassword")[0]as HTMLInputElement;
        const kaptchaField = iframeDoc.getElementsByName("kaptchafield")[0]as HTMLInputElement;
        studentIdField.value = (document.getElementById("student-id-field")as HTMLInputElement).value;
        passwordField.value = (document.getElementById("password-field")as HTMLInputElement).value;
        kaptchaField.value = (document.getElementById("kapcha-field")as HTMLInputElement).value;
        iframeDoc
            .getElementsByName("_submit")[0]
            .click();
    }

    public ExtractData = () => {
        const html = (document.getElementById("iframe")as HTMLIFrameElement).contentWindow.document.body.innerHTML;
        console.log(html);
        const result = parseHtmlToSlot(html);
        console.log(result);
        this
            .props
            .notifyDataLoaded(result);

    }
    public handleIFrameOnLoad = () => {
        const currentUrl = (document.getElementById("iframe")as HTMLIFrameElement).contentWindow.location.href;
        if (currentUrl === urls.End) {
            return;
        }
        if (currentUrl === urls.TestServer) {
            this.ExtractData();
        } else if (currentUrl === urls.InvalidIdOrPassword) {
            DisplayLoginFailedMessage();
        } else if (currentUrl === urls.InvalidCaptcha) {
            DisplayLoginFailedMessage();
        } else if (currentUrl === urls.LoginPage) {
            AssertLoginPageIsLoadedProperly();
        } else if (currentUrl !== urls.CourseTimetablePreview) {
            NavigateToCourseTimeTablePreview();
        } else if (currentUrl === urls.CourseTimetablePreview) {
            this.ExtractData();
        }
        function DisplayLoginFailedMessage() {
            alert("Login failed. You have entered invalid id, password or kapcha");
        }
        function AssertLoginPageIsLoadedProperly() {
            const html = (document.getElementById("iframe")as HTMLIFrameElement).contentWindow.document.body.innerHTML;
            if (!S(html).contains("Course Registration System")) {
                refreshIframe();
            } else {
                loadKapchaImage();
            }

            function loadKapchaImage() {
                const img = document.getElementById("kapcha-img")as HTMLImageElement;
                img.src = "https://unitreg.utar.edu.my/portal/Kaptcha.jpg";
            }

            function refreshIframe() {
                const iframee = document.getElementById("iframe")as HTMLIFrameElement;
                iframee.src = iframee.contentWindow.location.href;
            }
        }
        function NavigateToCourseTimeTablePreview() {
            if (tryCount > 2) {
                alert("No record found!");
                navigateToLoginPage();
                tryCount = 0;
                return;
            }
            const iframee = (document.getElementById("iframe")as HTMLIFrameElement);
            iframee.src = urls.CourseTimetablePreview;
            tryCount++;
            function navigateToLoginPage() {
                const iframeee = (document.getElementById("iframe")as HTMLIFrameElement);
                iframeee.src = urls.LoginPage;
            }
        }
    }

    public handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.handleClick();
        }
    }

    public render() {
        return (
            <div id="parentDiv">
                <div style={coverStyle}/>
                <div style={headerDivStyle}>
                    <h1 style={header1Style}>Login to your
                        <br/>UTAR account</h1>
                    <div style={subHeaderDivStyle}>
                        By clicking "Login", you agree to our &nbsp;
                        <a href="https://www.google.com">Terms of Service and Privacy Policy</a>
                    </div>
                </div>
                <div className="login-div">
                    <Paper style={cardStyle} zDepth={4}>
                        <TextField
                            id="student-id-field"
                            className="login-student-id-field"
                            floatingLabelText="Student ID"
                            style={fieldStyle}
                            hintText="e.g. 1500181"/>
                        <br/>
                        <TextField
                            id="password-field"
                            className="login-password-field"
                            floatingLabelText="Password"
                            hintText="e.g. 960707-43-1234"
                            style={fieldStyle}
                            type="password"/>
                        <br/>
                        <TextField
                            id="kapcha-field"
                            hintText="e.g. QXtresZ"
                            onKeyPress={this.handleKeyPress}
                            style={fieldStyle}
                            floatingLabelText="Kaptcha"/>
                        <br/>
                        <img id="kapcha-img" alt="" style={kapchaStyle} className="login-kapcha-image"/>
                        <br/>
                        <RaisedButton
                            id="login-button"
                            label="Login"
                            primary={true}
                            disabled={false}
                            onClick={this.handleClick}
                            style={buttonStyle}/>
                        <iframe
                            id="iframe"
                            title="unitregwebsite"
                            onLoad={this.handleIFrameOnLoad}
                            style={iframeStyle}
                            src="https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp">
                            <p>Your browser does not support iframes.</p>
                        </iframe>
                    </Paper>
                </div>
            </div>
        );
    }
}

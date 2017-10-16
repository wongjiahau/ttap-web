import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import S from 'string';
import coverImage from '../images/background.jpg';
import parseHtmlToSlot from '../core/parser/parseHtmlToRawSlot';

const style = {
    cover: {
        bckgroundAttachment: 'fixed',
        backgroundImage: `url(${coverImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '-20px',
        minHeight: '600px',
        opacity: '0.75'
    },
    card: {
        position: 'absolute',
        top: '120px',
        left: '50px',
        textAlign: 'center',
        color: 'white',
        verticalAlign: 'center'
    },
    field: {
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '5px',
        fontSize: '20px',
        fontWeight: 'bold'
    },
    button: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '10px',
        width: '250px',
        disabled: 'true'
    },
    kapcha: {
        width: '250px'
    },
    headerDiv: {
        position: 'absolute',
        top: '120px',
        left: '400px'
    },
    subHeaderDiv: {
        marginTop: '-30px'
    },
    header1: {
        fontSize: '72px'
    },
    iframe: {
        width: 1,
        height: 1,
        border: 0
    }
}

const urls = {
    LoginPage: "https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp",
    CourseTimetablePreview: "https://unitreg.utar.edu.my/portal/courseRegStu/schedule/masterSchedule.jsp",
    Kaptcha: "https://unitreg.utar.edu.my/portal/Kaptcha.jpg",
    TestServer: "http://localhost/ttap_testdata/",
    End: "http://0.0.0.0/",
    InvalidIdOrPassword: "https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp?message=loginError",
    InvalidCaptcha: "https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp?message=invalidSecurit" +
            "y"
}

let tryCount = 0;
//TODO: Add the link for TOS and PP
export default class Login extends Component {
    handleClick = () => {
        var iframeDoc = document
            .getElementById('iframe')
            .contentDocument;
        iframeDoc.getElementsByName('reqFregkey')[0].value = document
            .getElementById('student-id-field')
            .value;
        iframeDoc.getElementsByName('reqPassword')[0].value = document
            .getElementById('password-field')
            .value;
        iframeDoc.getElementsByName('kaptchafield')[0].value = document
            .getElementById('kapcha-field')
            .value;
        document
            .getElementById('iframe')
            .contentDocument
            .getElementsByName('_submit')[0]
            .click();
    }

    handleIFrameOnLoad = () => {
        const currentUrl = document
            .getElementById('iframe')
            .contentWindow
            .location
            .href;
        if (currentUrl === currentUrl.EndUrl) 
            return;
        if (currentUrl === urls.TestServer) 
            ExtractData();
        else if (currentUrl === urls.InvalidIdOrPassword) 
            DisplayLoginFailedMessage();
        else if (currentUrl === urls.InvalidCaptcha) 
            DisplayLoginFailedMessage();
        else if (currentUrl === urls.LoginPage) 
            AssertLoginPageIsLoadedProperly();
        else if (currentUrl !== urls.CourseTimetablePreview) 
            NavigateToCourseTimeTablePreview();
        else if (currentUrl === urls.CourseTimetablePreview) 
            ExtractData();
        function ExtractData() {
            var html = document
                .getElementById('iframe')
                .contentWindow
                .document
                .body
                .innerHTML;
            console.log(html);
            const result = parseHtmlToSlot(html);
            console.log(result);

        }
        function DisplayLoginFailedMessage() {
            alert("Login failed. You have entered invalid id, password or kapcha");
        }
        function AssertLoginPageIsLoadedProperly() {
            var html = document
                .getElementById('iframe')
                .contentWindow
                .document
                .body
                .innerHTML;
            if (!S(html).contains("Course Registration System")) 
                refreshIframe();
            else 
                loadKapchaImage();
            
            function loadKapchaImage() {
                document
                    .getElementById('kapcha-img')
                    .src = 'https://unitreg.utar.edu.my/portal/Kaptcha.jpg';
            }

            function refreshIframe() {
                var iframe = document.getElementById('iframe');
                iframe.src = iframe.contentWindow.location.href;
            }
        }
        function NavigateToCourseTimeTablePreview() {
            if (tryCount > 2) {
                alert("No record found!");
                navigateToLoginPage();
                tryCount = 0;
                return;
            }
            var iframe = document.getElementById('iframe');
            iframe.src = urls.CourseTimetablePreview;
            tryCount++;
            function navigateToLoginPage(){
                var iframe = document.getElementById('iframe');
                iframe.src = urls.LoginPage;
            }
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleClick();
        }
    }

    render() {
        return (
            <div id='parentDiv'>
                <div style={style.cover}/>
                <div style={style.headerDiv}>
                    <h1 style={style.header1}>Login to your
                        <br/>UTAR account</h1>
                    <div style={style.subHeaderDiv}>
                        By clicking "Login", you agree to our &nbsp;
                        <a href='https://www.google.com'>Terms of Service and Privacy Policy</a>
                    </div>
                </div>
                <div className="login-div">
                    <Paper style={style.card} zDepth={4}>
                        <TextField
                            id='student-id-field'
                            className="login-student-id-field"
                            floatingLabelText="Student ID"
                            style={style.field}
                            hintText="e.g. 1500181"/>
                        <br/>
                        <TextField
                            id='password-field'
                            className="login-password-field"
                            floatingLabelText="Password"
                            hintText="e.g. 960707-43-1234"
                            style={style.field}
                            type="password"/>
                        <br/>
                        <TextField
                            id='kapcha-field'
                            hintText="e.g. QXtresZ"
                            onKeyPress={this.handleKeyPress}
                            style={style.field}
                            floatingLabelText="Kaptcha"/>
                        <br/>
                        <img
                            id='kapcha-img'
                            alt=""
                            style={style.kapcha}
                            className="login-kapcha-image"/>
                        <br/>
                        <RaisedButton
                            id="login-button"
                            label="Login"
                            primary={true}
                            disabled={false}
                            onClick={this.handleClick}
                            style={style.button}/>
                        <iframe
                            id='iframe'
                            title='unitregwebsite'
                            onLoad={this.handleIFrameOnLoad}
                            style={style.iframe}
                            src="https://unitreg.utar.edu.my/portal/courseRegStu/login.jsp">
                            <p>Your browser does not support iframes.</p>
                        </iframe>
                    </Paper>
                </div>
            </div>
        );
    }
}

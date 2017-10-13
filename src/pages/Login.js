import React, {Component} from 'react';
import Center from 'react-center';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import coverImage from '../images/background.jpg';

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
        width: '250px'
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
        iframeDoc
            .getElementsByName('_submit')[0]
            .click();
        alert(document.getElementById('iframe').contentWindow.location.href);
    }

    loadKapchaImage = () => {
        document
            .getElementById('kapcha-img')
            .src = 'https://unitreg.utar.edu.my/portal/Kaptcha.jpg';
        alert(document.getElementById('iframe').contentWindow.location.href);
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
                        <a href='https://www.google.com' target='_blank'>Terms of Service and Privacy Policy</a>
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
                            style={style.field}
                            floatingLabelText="Kaptcha"/>
                        <br/>
                        <img id='kapcha-img' style={style.kapcha} className="login-kapcha-image"/>
                        <br/>
                        <RaisedButton
                            className="login-button"
                            label="Login"
                            primary={true}
                            onClick={this.handleClick}
                            style={style.button}/>
                        <iframe
                            id='iframe'
                            onLoad={this.loadKapchaImage}
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

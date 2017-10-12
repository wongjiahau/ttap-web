import * as React from 'react';
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
    }

}
//TODO: Add the link for TOS and PP
export default function Login() {
    return (
        <div>
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
                <Paper style={style.card} zDepth={3}>
                    <TextField
                        className="login-student-id-field"
                        floatingLabelText="Student ID"
                        style={style.field}
                        hintText="e.g. 1500181"/>
                    <br/>
                    <TextField
                        className="login-password-field"
                        floatingLabelText="Password"
                        hintText="e.g. 960707-43-1234"
                        style={style.field}
                        type="password"/>
                    <br/>
                    <TextField
                        className="login-kapcha-field"
                        hintText="e.g. QXtresZ"
                        style={style.field}
                        floatingLabelText="Kaptcha"/>
                    <br/>
                    <img
                        style={style.kapcha}
                        className="login-kapcha-image"
                        src="https://unitreg.utar.edu.my/portal/Kaptcha.jpg"/>
                    <br/>
                    <RaisedButton
                        className="login-button"
                        label="Login"
                        primary={true}
                        style={style.button}/>
                </Paper>
            </div>
        </div>
    );
}

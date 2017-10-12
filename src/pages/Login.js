import * as React from 'react';
import Center from 'react-center';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import './Login.css'

export default function Login() {
    return (
        <Center>
            <div className="login-div">
                <Card className="login-card">
                    <TextField
                        className="login-student-id-field"
                        floatingLabelText="Student ID"
                        hintText="e.g. 1500181"/>
                    <br/>
                    <TextField
                        className="login-password-field"
                        hintText="e.g. 960707-43-1234"
                        floatingLabelText="Password"
                        type="password"/>
                    <br/>
                    <TextField
                        className="login-kapcha-field"
                        hintText="e.g. QXtresZ"
                        floatingLabelText="Kaptcha"/>
                    <br/>
                    <img
                        className="login-kapcha-image"
                        src="https://unitreg.utar.edu.my/portal/Kaptcha.jpg"/>
                    <br/>
                    <RaisedButton
                        className="login-button"
                        label="Login"
                        primary={true}
                        fullWidth={true}/>
                </Card>
            </div>
        </Center>
    );
}

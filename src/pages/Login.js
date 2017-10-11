import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';

export function Login() {  
    return (  
        <div className="hello">
            <Card className="card">
                <TextField floatingLabelText="Student ID (1500181)"/>
                <br/>
                <TextField
                    hintText="Password Field"
                    floatingLabelText="Password"
                    type="password"/>
                <br/>
                <img src="https://unitreg.utar.edu.my/portal/Kaptcha.jpg"/>
                <br/>
                <RaisedButton label="Login" primary={true}/>
                <br/>
                <RaisedButton label="Reset"/>
                <br/>
            </Card>
        </div>
    );
}

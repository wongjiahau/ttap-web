import * as React from 'react';
import Center from 'react-center';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';

const Style_Card = {
    padding: 15
}

const Style_Field = {
    margin: "0",
    fontSize: 20,
    fontWeight : "bold"
}

const Style_Button = {
    margin: "12,12,12,0",   
    fontSize: 20,
    fontWeight : "bold"
}

export function Login() {
    return (
        <Center>
            <div className="hello">
                <Card className="card" style={Style_Card}>
                    <TextField
                        floatingLabelText="Student ID"
                        hintText="e.g. 1500181"
                        style={Style_Field}/>
                    <br/>
                    <TextField
                        hintText="e.g. 960707-43-1234"
                        floatingLabelText="Password"
                        type="password"
                        style={Style_Field}
                        />
                    <br/>
                    <img src="https://unitreg.utar.edu.my/portal/Kaptcha.jpg"/>
                    <br/>
                    <RaisedButton label="Login" primary={true} style={Style_Button} fullWidth={true}/>
                </Card>
            </div>
        </Center>
    );
}

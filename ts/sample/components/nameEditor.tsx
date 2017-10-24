import * as React from "react";

export interface INameEditComponentProps {
    onDeleteClick: () => any;
    onUpdateClick : (name : string) => any;
}

export class NameEditComponent extends React.Component < INameEditComponentProps, {} > {
    public render() {
        return (
            <div>
                <label>Update Name:</label>
                <input id="name-editor-input" />
                <button
                    onClick={() => this.props.onUpdateClick((document.getElementById("name-editor-input")as HTMLInputElement).value)}>Update name</button>;
                <button onClick={this.props.onDeleteClick}>delete user profile name</button>
            </div>
        );
    }
}

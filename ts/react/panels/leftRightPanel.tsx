import * as React from "react";

export class LeftRightPanel extends React.Component {
    public render() {
        const childCount = React.Children.count(this.props.children);
        if (childCount !== 2) {
            throw new Error("LeftRightPanel expected only TWO children, but you gave it " + childCount);
        }
        return (
            <table style={{width: "100%"}}>
                <tbody>
                    <tr>
                        <td style={{textAlign: "left"}}>
                            {this.props.children[0]}
                        </td>
                        <td style={{textAlign: "right"}}>
                            {this.props.children[1]}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

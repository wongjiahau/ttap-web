import * as React from "react";

export class LeftRightPanel extends React.Component {
    public render() {
        const childCount = React.Children.count(this.props.children);
        if (childCount !== 2) {
            throw new Error("LeftRightPanel expected only TWO children, but you gave it " + childCount);
        }
        const children = this.props.children as any[];
        return (
            <table style={{width: "100%"}}>
                <tbody>
                    <tr>
                        <td style={{textAlign: "left"}}>
                            {children[0]}
                        </td>
                        <td style={{textAlign: "right"}}>
                            {children[1]}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

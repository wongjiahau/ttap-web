"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class FourOhFour extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = () => {
            window
                .history
                .go(-1);
        };
        this.state = {
            someKey: "someValue"
        };
    }
    render() {
        return React.createElement("div", null,
            React.createElement("h1", null, "Sorry, this page is still under construction . . ."),
            React.createElement("button", { onClick: this.handleClick }, "Click here to go back"));
    }
    componentDidMount() {
        this.setState({ someKey: "otherValue" });
    }
}
exports.FourOhFour = FourOhFour;
//# sourceMappingURL=fourOhFour.js.map
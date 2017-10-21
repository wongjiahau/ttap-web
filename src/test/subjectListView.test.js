//set the enzyme adaptor
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

//core framework
import React from 'react';
import {MuiThemeProvider} from 'material-ui';
import {expect} from 'chai';
import {mount} from 'enzyme';

//component to be tested
import {SubjectListView} from '../core/react/subjectListView';

//test data builder
import ParseHtmlToSlots from "../core/parser/parseHtmlToRawSlot";
import ParseSlotToSubject from "../core/parser/parseSlotToSubject";
import {heng_2017_sept} from "../core/tests/testData/heng_2017_sept";

const subjects = ParseSlotToSubject(ParseHtmlToSlots(heng_2017_sept()));
function getStub() {
    return mount(
        <MuiThemeProvider>
            <SubjectListView subjects={subjects}/>
        </MuiThemeProvider>
    );
}

describe('<SubjectListView/>', () => {
    it('should render 3 buttons', () => {
        const wrapper = getStub();
         //wrapper.setState({searchedText: "art"});
        console.log(wrapper.find('FlatButton').getElements())
        expect(wrapper.find('FlatButton').length)
            .to
            .equal(3);
    });

    it('should render a DONE button', () => {
        const wrapper = getStub();
        var buttons = wrapper.find('FlatButton').getElements();
        expect(buttons.some((b)=> b.props.label === 'Done')).to.equal(true);
    });

    it('should render a "Show selected subjects" button', () => {
        const wrapper = getStub();
        var buttons = wrapper.find('FlatButton').getElements();
        expect(buttons.some((b)=> b.props.label === 'Show selected subjects')).to.equal(true);
    });

});

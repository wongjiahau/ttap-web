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
import {ParseSlotToSubject} from "../core/parser/parseSlotToSubject";
import {heng_2017_sept} from "../core/tests/testData/heng_2017_sept";

const subjects = ParseSlotToSubject(ParseHtmlToSlots(heng_2017_sept()));
function getStub() {
    return mount(
        <MuiThemeProvider>
            <SubjectListView subjects={subjects}/>
        </MuiThemeProvider>
    );
}

describe.skip('<SubjectListView/>', () => {
    it('should render 2 buttons', () => {
        const wrapper = getStub();
        expect(wrapper.find('Button').length).to.equal(2);
    });

    it('should render a DONE button', () => {
        const wrapper = getStub();
        var buttons = wrapper.find('Button').getElements();
        expect(buttons.some((b)=> b.props.children === 'Done')).to.equal(true);
    });

    it('should render a "Show selected subjects" button', () => {
        const wrapper = getStub();
        var buttons = wrapper.find('Button').getElements();
        expect(buttons.some((b)=> b.props.children === 'Show selected subjects')).to.equal(true);
    });

    it('should render 18 elements in subject-list-container', () => {
        const wrapper = getStub();
        var container = wrapper.find("#subject-list-container").getElements()[0];
        expect(container.props.children.length).to.equal(18);
    });

});

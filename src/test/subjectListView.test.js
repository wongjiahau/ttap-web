//set the enzyme adaptor
import { GetTestSubjects1 } from "../core/tests/testDataGenerator";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

//core framework
import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {createShallow} from 'material-ui/test-utils';

//component to be tested
import {SubjectListView} from '../core/react/subjectListView';

let stub = null;
const getStub = () => {
    if(stub) {
       return stub;
    }
    let shallow = createShallow();
    const wrapper = shallow(<SubjectListView Subjects={GetTestSubjects1()}/>);
    stub = wrapper;
    return wrapper;
}
describe('<SubjectListView/>', () => {
    it('should render 17 SubjectViews when there are 17 subjects', () => {
        const wrapper = getStub();
        expect(GetTestSubjects1()).to.have.lengthOf(17);
        expect(wrapper.find('SubjectView')).to.have.lengthOf(17);
    });

    it('should render a toggle-view-button', () => {
        const wrapper = getStub();
        var buttons = wrapper.find("#toggle-view-button");
        expect(buttons).to.have.lengthOf(1);
    });

    it('should render a done-button', () => {
        const wrapper = getStub();
        var buttons = wrapper.find("#done-button");
        expect(buttons).to.have.lengthOf(1);
    });

    it('should render a search bar', () => {
        const wrapper = getStub();
        var buttons = wrapper.find("#searchbar");
        expect(buttons).to.have.lengthOf(1);
    });


});

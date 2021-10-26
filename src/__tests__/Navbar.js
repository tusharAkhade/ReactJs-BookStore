import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

import Navbar from '../components/Navbar/Navbar';

const shallowMountNavbar = (props = {}, state = null) => {
    const comp = shallow(<Navbar />)
    if (state)
        comp.setState(state)
    return comp
}

const navbarComp = shallowMountNavbar()

describe('Test if navbar loading correctly', () => {

    it("test if bookstore image and text container is loading", () => {
        expect(navbarComp.find('.logoImgAndText').exists()).toBe(true)
    });

    it("test if searchbar is loading", () => {
        expect(navbarComp.find('.searchBarInput').exists()).toBe(true)
    })

    it("test if cart image is loading", () => {
        expect(navbarComp.find('.cartImg').exists()).toBe(true)
    })
})









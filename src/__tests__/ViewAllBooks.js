import Enzyme, { shallow, mount } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16';
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() })
import ViewAllBooks from '../components/ViewAllBooks/ViewAllBooks';

let booksInfo = [{bookName: "Apple", author:"Steve Jobs", discountPrice: '100', price: "1000"}]

let viewAllBooksMountComp = mount(<ViewAllBooks booksInfo={booksInfo} /> )

describe("test if all books loading correctly", () => {
    it('test if single book card is mapped correctly', () => {
        expect(viewAllBooksMountComp.find('.singleBookCard').exists()).toBe(true)
    })

    it('test if book metadata container is loading', () => {
        expect(viewAllBooksMountComp.find('.bookMetadataContainer').exists()).toEqual(true)
    })

    it('test if book price container is loading', () => {
        expect(viewAllBooksMountComp.find('.bookPriceContainer').exists()).toBe(true)
    })

    it('test if book name is loading', () => {
        expect(viewAllBooksMountComp.find('.bookName').text()).toEqual("Apple")
    })

    it('test if book author name is loading', () => {
        expect(viewAllBooksMountComp.find('.bookAuthorName').text()).toEqual(" Steve Jobs ")
    })
    
})
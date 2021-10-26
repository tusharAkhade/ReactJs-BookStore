import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() })

import ViewSingleBookInfo from '../components/ViewAllBooks/ViewSingleBookInfo';

let singleBook = [{bookName: "aa", author:"aaaaaaa", discountPrice: '100', price: "1000"}]

// const singleBookComp = shallow( <ViewSingleBookInfo singleBook={singleBook} /> )

describe("test if all books loading correctly", () => {
    it('test if book image is loading', () => {
        // jest.spyOn(ViewAllBooks.prototype, '')
        // jest.spyOn(ViewSingleBookInfo.prototype, 'getAddedToCartBooks')
    })
})
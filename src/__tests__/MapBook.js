import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() })
 
import MapBooks from "../components/ViewAllBooks/MapBooks"

const book = {
    bookName: "Apple",
    author: "Abc"
}
const mapBooksShallowComp = shallow( <MapBooks book={book} /> )

describe("test if book info is loading", () => {
    it('test if book image is loading', () => {
        expect(mapBooksShallowComp.find('.bookImage').exists()).toBe(true)
    })

    it('test if book name and author name is loading', () => {
        expect(mapBooksShallowComp.find('.bookName').text()).toEqual('Apple')
        expect(mapBooksShallowComp.find('.bookAuthorName').text()).toEqual(' Abc ')
    })
})



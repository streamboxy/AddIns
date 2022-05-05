import { AddInHelper } from './add-in.helper';

describe('AddInHelper', () => {

    it('should be throw unparsable URL', () => {
        expect(() => {
            AddInHelper.parseOriginURLFromSearchParam('origin')
        }).toThrow('Cannot parse origin URL.');
    });

    it('should be parse URL', () => {
        window.history.pushState({}, 'Test Title', '?origin=https%3A%2F%2Fstage.streamboxy.com');
        const url = AddInHelper.parseOriginURLFromSearchParam('origin');

        expect(url.origin).toBe('https://stage.streamboxy.com');
    });
});
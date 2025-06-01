import '@testing-library/jest-dom'
import { getReadableTextColor } from '../color';


describe('getReadableTextColor', () => {
    it('It should render black text for light background(#ffffff)', () => {
      const textColor = getReadableTextColor('#ffffff')
      expect(textColor).toBe('#000000')
    })

    it('should render white text for dark background(#000000', () => {
        const textColor = getReadableTextColor('#000000')
            expect(textColor).toBe('#ffffff')
        
    })

    it('should render undefined for invalid hex', () => {
        const textColor = getReadableTextColor('')
        expect(textColor).toBeUndefined()

    })
} )
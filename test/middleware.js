const { expect } = require('chai')
const jwtValidator = require('../app/middlewares/jwtValidator')

describe('Middleware', () => {
	describe('JwtValidator', () => {
		it('should throw an error if no authorization header is provided', () => {
			const req = {
				get: function() {
					return undefined
				}
			}
			expect(jwtValidator.bind(this, req, {}, () => {})).to.throw(
				'Not Authenticated.'
			)
		})
	})
})

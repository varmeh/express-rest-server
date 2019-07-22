const { expect } = require('chai')
const sinon = require('sinon')
const jwt = require('jsonwebtoken')

const jwtValidator = require('../../app/middlewares/jwtValidator')

describe('Middleware', () => {
	describe('JwtValidator', () => {
		it('should throw an error if no authorization header is provided', () => {
			const req = {
				get: function(headerName) {
					return undefined
				}
			}
			expect(jwtValidator.bind(this, req, {}, () => {})).to.throw(
				'Not Authenticated.'
			)
		})

		it('should throw an error if authorization header has only 1 string', () => {
			const req = {
				get: function(headerName) {
					return 'bearer'
				}
			}
			expect(jwtValidator.bind(this, req, {}, () => {})).to.throw()
		})

		it('should throw an error if token cannot be verified', () => {
			const req = {
				get: function(headerName) {
					return 'bearer xyz'
				}
			}
			sinon.stub(jwt, 'verify')
			jwt.verify.returns({ userId: 'abc' })

			jwtValidator(req, {}, () => {})
			expect(jwt.verify.called).to.be.true
			expect(req).to.have.property('userId', 'abc')

			jwt.verify.restore()
		})
	})
})

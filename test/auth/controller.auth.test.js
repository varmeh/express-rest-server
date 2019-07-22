const { expect } = require('chai')
const sinon = require('sinon')

const { User } = require('../../app/models')
const { login } = require('../../app/auth/controller.auth')

describe('Auth Controller', () => {
	describe('Login', () => {
		it('should throw an error with code 500 if User db not accessible', async () => {
			sinon.stub(User, 'findOne')
			User.findOne.throws()

			const req = {
				body: {
					email: 'test@test.com',
					password: 'test123'
				}
			}

			await login(req, {}, () => {})

			expect(User.findOne.called).to.be.true

			User.findOne.restore()
		})
	})
})

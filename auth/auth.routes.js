const login = require('./auth.controller')

module.exports = ({ router }) => {
router.post('/auth', login)
}
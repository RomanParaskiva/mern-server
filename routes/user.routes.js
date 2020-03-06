const {Router} = require('express')
const User = require('../models/User')
const router = Router()
const auth = require('../middelware/auth.middleware')


// api/user/id

router.get(
    '/:id',
    auth,
    async (req,res) => {
        try {
            const user = await User.findById(req.params.id);
            return res.json(user)
        } catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    }
    )

module.exports = router;
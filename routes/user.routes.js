const {Router} = require('express')
const User = require('../models/User')
const Item = require('../models/Item')
const router = Router()
const auth = require('../middelware/auth.middleware')


// api/user/id

router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            return res.json(user)
        } catch (e) {
            res.status(500).json({error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    }
)

router.put(
    '/addLike',
    auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.body.userId);

            const likesArr = user.likesItem
            console.log(likesArr)

            likesArr.push(req.body.cardId)

            user.update({likesItem: likesArr})
            user.save()
            return res.json(user)

        } catch (e) {
            res.status(500).json({error: e.message, message: 'Лайк не добавлен'})
        }
    }
)

module.exports = router;
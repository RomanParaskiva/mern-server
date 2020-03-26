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

            const card = await Item.findById(req.body.cardId)
                card.likes = card.likes + 1
                card.update(card)
                card.save()

            const user = await User.findById(req.body.userId);
            const likesArr = user.likes || []
                likesArr.push(req.body.cardId)
                user.update({likes: likesArr})
                user.save()
            return res.json(req.body.cardId)

        } catch (e) {
            res.status(500).json({error: e.message, message: 'Лайк не добавлен'})
        }
    }
)


router.post(
    '/deleteLike',
    auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.body.userId);
            const card = await Item.findById(req.body.cardId)
                card.likes = card.likes - 1
                card.update(card)
                card.save()


            const likesArr = user.likes || []

            const index = likesArr.indexOf(req.body.cardId,0)
            console.log(index)
            if (index > -1) {
                likesArr.splice(index, 1)
            } else {
                return res.status(400).json({ message: 'ups'})
            }


            user.update({likes: likesArr})
            user.save()
            return res.json(req.body.cardId)

        } catch (e) {
            res.status(500).json({error: e.message, message: 'Лайк не добавлен'})
        }
    }
)


module.exports = router;
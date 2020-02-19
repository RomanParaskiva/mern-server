const {Router} = require ('express')
const Item = require('../models/Item')
const router = Router();

// api/item/add
router.post(
    '/add',

    async (req, res) => {
        try {

            const { title, description, price, tags, likes, imgs, pathToFile } = req.body

            const candidate = await Item.findOne({ title })

            if(candidate) {
                return res.status(400).json({ message: 'Такой файл уже загружен.' })
            }

            if (title && description && price ){

            const item = new Item({title, description, price, tags, likes})

            await item.save()

            res.status(201).json({ message: 'Товар добавлен'})
            }

        } catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    });

module.exports = router;
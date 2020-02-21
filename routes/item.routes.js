const {Router} = require ('express')
const Item = require('../models/Item')
const router = Router();
const auth = require('../middelware/auth.middleware');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');



router.use(fileUpload());
router.use(cors());

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

            const item = new Item({title, description, price, tags, likes, imgs, pathToFile})

            await item.save()

            res.status(201).json({ message: 'Товар добавлен'})
            }

        } catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    });

// api/item/upload

router.post('/upload', (req, res, next) => {

    let imageFile = req.files.file;

    try {
        imageFile.mv(`./client/src/components/images/${req.body.filename}`, function(err) {
            if (err) {
                return res.status(500).send(err);
            }

            res.json({file: `./images/${req.body.filename}`});
        });
    } catch (e) {
        res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
    }


})

// api/item/uploadArchive

router.post('/uploadArchive', (req, res, next) => {

    let archiveFile = req.files.file;

    try {
        archiveFile.mv(`./client/public/archive/${req.body.filename}`, function(err) {
            if (err) {
                return res.status(500).send(err);
            }

            res.json({file: `./client/public/archive/${req.body.filename}`});
        });
    } catch (e) {
        res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
    }


})

router.get(
    '/adminka/getCollection',
    auth,
    async (req, res) => {
    try {
        const allCard = await Item.find()
            return res.status(200).json(allCard)
    } catch (e) {
        res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
    }
})

module.exports = router;
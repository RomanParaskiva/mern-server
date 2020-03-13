const {Router} = require ('express')
const Item = require('../models/Item')
const CI = require('../models/CI')
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

// api/item/uploadCarousel
router.post('/uploadSlideImage', (req, res, next) => {

    let imageFile = req.files.file;

    try {
        imageFile.mv(`./client/src/components/images/carouselImage/${req.body.filename}`, function(err) {
            if (err) {
                return res.status(500).send(err);
            }

            res.json({file: `./images/carouselImage/${req.body.filename}`});
        });
    } catch (e) {
        res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
    }
})

router.post(
    '/createSlide',
    auth,
    async (req,res) => {
        try {
           const {src, title} = req.body;

           if (src && title) {
               const slide = new CI({title, src});

               await slide.save()

               res.status(201).json({ message: 'Товар добавлен'})

           }
        }
        catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    }
)

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

// adminka/getImages

router.get(
    '/adminka/getSlides',
    async (req, res) => {
        try {
            const carouselImages = await CI.find()
            return res.status(200).json(carouselImages)
        } catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    })

router.get(
    '/',
    async (req, res) => {
        try {
            const allCard = await Item.find()
            return res.status(200).json(allCard)
        } catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    })

// api/item/carousel
router.get(
    '/carousel',
    async (req, res) => {
        try {
            const carouselImages = await CI.find()
            return res.status(200).json(carouselImages)
        } catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    })


// /api/item/
router.get(
    '/:id',
    async (req, res) => {
        try {
            const card = await Item.findById(req.params.id)
            return res.json(card)
        } catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    }
)

router.post('/deleteSlide',
    async (req,res) => {
    console.log(req)
        try {
            const data = await CI.findByIdAndDelete({_id: req.body.id})
            return res.json(data)
        } catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    })

module.exports = router;
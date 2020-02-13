const {Router} = require ('express')
const Item = require('../models/Item')
const router = Router();

// api/item/add
router.post(
    '/add',

    async (req, res) => {
        try {

            const { title, description, price, tags } = req.body

            const candidate = await Item.findOne({ title })

            if(candidate) {
                return res.status(400).json({ message: 'Такой файл уже загружен.' })
            }
            const likes = 15

            const downloads = 13

            if (title && description && price ){

            const item = new Item({title, description, price, tags, likes, downloads})

            await item.save()

            res.status(201).json({ message: 'Товар добавлен'})
            }

        } catch (e) {
            res.status(500).json({ error: e.message, message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
    })

// api/auth/login
// router.post(
//     '/login',
//     [
//         check('email', 'Введите корректный емайл').normalizeEmail().isEmail(),
//         check('password', 'Введите пароль').exists()
//
//     ],
//     async (req, res) => {
//         try {
//             const errors = validationResult(req)
//
//             if (!errors.isEmpty()){
//                 return res.status(400).json({
//                     errors: errors,
//                     message: 'Некорректные данные при входе в систему'
//                 })
//             }
//
//             const { email, password } = req.body
//
//             const user = await User.findOne({ email})
//
//             if(!user) {
//                 return res.status(400).json({ message: 'Пользователь не найден'});
//             }
//
//             const isMatch = bcrypt.compare(password, user.password)
//
//             if (!isMatch) {
//                 return res.status(400).json({ message: 'Данные не совпадают, попробуйте еще раз'})
//             }
//
//             const token = jwt.sign(
//                 { userId: user.id},
//                 config.get('jwt_secret'),
//                 { expiresIn: '1h' }
//             )
//
//             res.json({token , userId: user.id});
//
//
//         } catch (e) {
//             res.status(500).json({ message: 'Что-то у вас пошло нет так, попробуйте снова'})
//         }
//     });

module.exports = router;
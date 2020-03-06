const {Router} = require ('express')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = Router();
const config = require('config');

// api/auth/register
router.post(
    '/register',
    [
        check('email', 'Некорректный емайл').isEmail(),
        check('password', 'Пароль менее 6 символов').isLength({ min: 6})
    ],
    async (req, res) => {
        try {
        
            const errors = validationResult(req)


            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors,
                    message: 'Некорректные данные при регистрации'
                })
            }

            const { email, password } = req.body

            const candidate = await User.findOne({ email })

            if(candidate) {
                return res.status(400).json({ message: 'Такой email уже зарегистрирован.' })
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({ email, password: hashedPassword})

            await user.save()

            res.status(201).json({ message: 'User created'})

        } catch (e) {
            res.status(500).json({ message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
})

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Введите корректный емайл').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()

    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
    
            if (!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors,
                    message: 'Некорректные данные при входе в систему'
                })
            }
    
            const { email, password } = req.body
            
            const user = await User.findOne({ email})

            if(!user) {
                return res.status(400).json({ message: 'Пользователь не найден'});
            }

            const isMatch = bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Данные не совпадают, попробуйте еще раз'})
            }

            const token = jwt.sign(
                { userId: user.id},
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
                // if(user.isAdmin){
                //     return res.json({token , userId: user.id, isAdmin: user.isAdmin});
                // }
            res.json({token , userId: user.id});


        } catch (e) {
            res.status(500).json({ message: 'Что-то у вас пошло нет так, попробуйте снова'})
        }
});

module.exports = router;
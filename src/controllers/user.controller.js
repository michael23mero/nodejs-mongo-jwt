const { UserModel } = require('../models')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { useremail, username, password } = req.body
    const existeUser = await UserModel.findOne({
        username : username
    })
    if(existeUser){
        return res.json({msg: `El username: ${username} ya se encuentra registrado`})
    }
    const user = new UserModel({useremail, username, password});
    user.password = await user.encryptPassword(password)
    const userCreate = await user.save();

    /*const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
        expiresIn: 60*60*24
    })*/
    res.status(200).json({msg: `El usuario fue creado satisfactoriamente`, auth: true, token})
    res.status(200).json({msg: `El usuario fue creado satisfactoriamente`})
}

const login = async (req, res) => {
    const { username, password } = req.body
    const existeUser = await UserModel.findOne({
        username : username
    })
    if(!existeUser){
        return res.status(404).json({msg: 'Usuario no encontrado'})
    }else{
        const comparacion = await existeUser.comparePassword(password)
        if(!comparacion){
            return res.status(401).json({msg: 'Contraseña incorrecta'})
        }else{
            const token = jwt.sign({id: existeUser._id}, process.env.JWT_SECRET, {
                expiresIn: 60*60*24
            })
            return res.status(200).json({msg: 'Bienvenid@', auth: true, accessToken : token})
        }
    }
}

const listUser = async (req, res) => {
    const user = await UserModel.findById(req.cualquierNombreDeVariable, {password: 0})
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    res.json(user)
}
module.exports = { register, login, listUser }
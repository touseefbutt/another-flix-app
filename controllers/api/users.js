const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const create = async (req, res)=>{
    try{
        const createUser = await User.create(req.body)
        res.status(200).json(createUser)
    }
    catch(e){
        res.status(400).json({message: e.message})
    }
}

// Login
const login = async (req, res) => {
    try {
        // Find user by email
        const user = await User.findOne({
            email: req.body.email
        })

        // Throw error if user is not found
        if(!user) throw new Error()

        // compare() takes the user's input from req.body, hashes it, and compares it to our db hashed pw
        // compare() incorporates the encoding process in the db hashed pw and uses the same encoding process with the user's input
        const match = await bcrypt.compare(req.body.password, user.password)

        // If the pws don't match throw error
        if(!match) throw new Error()

        res.status(200).json(createJWT(user))
    } catch(e) {
        res.status(401).json({
            msg: e.message,
            reason: 'Bad Credentials'
        })
    }
}

const show = async (req, res)=>{
    try{
        const showUser = await User.findById(req.params.id, req.body)
        res.status(200).json(showUser)
    }
    catch(e){
        res.status(400).json({message: e.message})
    }
}
const update = async (req, res)=>{
    try{
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updateUser)
    }
    catch(e){
        res.status(400).json({message: e.message})
    }
}

// Get user's favorites
const getFavorites = async (req, res) => {
    try {
        const favorites = await User.findById(req.params.id).populate('favorites').select('favorites')
        res.status(200).json(favorites)
    } catch(e) {
        res.status(400).json({msg: e.message})
    }
}

// Helper Function
// JWT is created with a secret key and that secret key is private to you which means you will never reveal that to the public or inject inside the JWT token.
const createJWT = user => {
    return jwt.sign(
        // payload
        {user},
        // secret
        process.env.SECRET,
        // options
        {expiresIn: '48h'}
    )
}

module.exports = {
    create,
    show, 
    update,
    getFavorites, 
    login
}
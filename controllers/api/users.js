const User = require('../../models/User')

const create = async (req, res)=>{
    try{
        const createUser = await User.create(req.body)
        res.status(200).json(createUser)
    }
    catch(e){
        res.status(400).json({message: e.message})
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
module.exports = {
    create,
    show, 
    update,
    getFavorites
}
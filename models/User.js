const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 255,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: Number,
    picture: String,
    active: Boolean,
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ]
}, {
    timestamps: true,
    toJSON: {
        // ret is the JSON'ed User Document
        transform: function(doc, ret) {
            // We don't want to return the password back to the client
            delete ret.password
            return ret
        }
    }
})

userSchema.pre('save', async function(next) {
    // Only run this function if password was modified
    // If the password is not modified, run the next middleware
    // this refers to the specific document
    // if(!this.isModified('password')) return next()
    // User updated password, code runs below
    this.password = await bcrypt.hash(this.password, saltRounds)
    return next()
})

module.exports = mongoose.model('User', userSchema)
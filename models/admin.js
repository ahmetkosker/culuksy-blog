const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const database = require('../models/dbConnect')

const adminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true,
        trim: true,
        uniqe: true,
        dropDups: true
    },
    adminPassword: {
        type: String,
        required: true
    }
})

adminSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.adminPassword = await bcrypt.hash(this.adminPassword, salt)
    next()
})

const admin = new mongoose.model('admin', adminSchema)


var ahmet = new admin({
    adminName: 'aho',
    adminPassword: '123'
})

ahmet.save(function (error) {
    if (!error) {
        console.log('admin kayıt edildi')
    }
    else {
        console.log('hata')
    }
})

adminSchema.static.login = function () {
    
}









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

const Admin = new mongoose.model('Admin', adminSchema)

// adminSchema.statics.login = async function (adminName, adminPassword) {
//     var admin = await this.findOne(adminName)
//     if (admin) {
//         var auth = await bcrypt.compare(adminPassword, admin.adminPassword)
//         if (auth) {
//             return admin
//         }
//         else {
//             throw Error('parola hatası')
//         }
//     }
//     else {
//         throw Error('admin bulunamadı')
//     }
// }

module.exports = Admin









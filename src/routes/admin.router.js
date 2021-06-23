const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const express = require('express');
const AdminBroMongoose = require('admin-bro-mongoose')

const mongoose = require('mongoose')
const User = require('../models/Users')


const adminBro = new AdminBro({
    databases: [],
    rootPath: '/admin',
})



const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router
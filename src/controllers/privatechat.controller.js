const User = require('../models/Users')

const chatCtrl = {};


chatCtrl.getchatPage = async (req,res) => {
    const user = req.user;
    const name = req.params;
    const userc = await User.findById(req.params.id)

    res.render('users/privatechat',{user,userc})
}

module.exports = chatCtrl;
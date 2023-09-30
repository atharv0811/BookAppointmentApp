const path = require("path");
const data = require("../model/dataModel");

exports.getIndex = (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
}

exports.postData = (req, res, next) => {
    const name = req.body.name;
    const pno = req.body.pno;
    const email = req.body.email;

    data.create(
        {
            name: name,
            phoneNo: pno,
            email: email
        }
    ).then(() => {
        res.redirect('/')
    }).catch(err => console.log(err))
};

exports.getData = (req, res, next) => {
    data.findAll().then(result => {
        // console.log(result)
        res.json(result)
    }).catch(err => console.log(err));
}

exports.deleteData = (req, res, next) => {
    let userid = req.body.userid;
    data.destroy({
        where: { id: userid }
    }).then(() => {
        res.redirect('/')
    }).catch(err => console.log(err))
}

exports.editData = (req, res, next) => {
    const id = req.body.info.id;
    const name = req.body.info.name;
    const pno = req.body.info.pno;
    const email = req.body.info.email;

    data.findByPk(id).then((user) => {
        user.name = name;
        user.phoneNo = pno;
        user.email = email;
        user.save();
    }).then(() => {
        res.redirect('/')
    }).catch(err => console.log(err))
}
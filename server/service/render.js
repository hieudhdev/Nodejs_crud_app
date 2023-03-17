const { default: axios } = require("axios");

exports.homeRoutes = (req, res) => {
    axios
        .get('http://localhost:3000/api/user/show')
        .then(function (response) {
            res.render('home', { users : response.data })
            // console.log(response.data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Have some error!" });
        })
}

exports.createUser = (req, res) => {
    res.render('include/create');
}

exports.updateUser = (req, res) => {
    axios
        .get('http://localhost:3000/api/user/show', {params: {id : req.query.id}})
        .then(function (response) {
            res.render('include/update', { user : response.data });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Have some error!" });
        })
}


const UserDB = require('../model/user');

// create a user and save
const create = (req, res, next) => {

    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }

    // new user 
    const user = new UserDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // save a user (document in mongoose npm)
    user  
        .save(user) // return a promise, i think
        .then(data => {
            // res.send(data);
            res.redirect('/create');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Have some error!"});
        })
}

// find an user or all user
const show = (req, res) => {

    if (req.query.id) {       // find by user id
        
        const id = req.query.id;
        UserDB
            .findById(id)
            .then(data =>{
                if (!data) {
                    res.status(404).send({ message : "Not found user with id "+ id });
                } else {
                    res.send(data);
                }
            })
            .catch(err =>{
                console.log(err);
                res.status(500).send({ message: "Have some error with id " + id });
            })

    } else {
        UserDB
            .find()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({ message : "Have some error!" });
            })
    }

}

// update an user info
const update = (req, res) => {

    if (!req.params.id) {
        res.status(400).send({ message: "ID user update can not be empty!"});
    }

    const id = req.params.id;
    UserDB
        .findByIdAndUpdate(id, req.body, { useFindAndModify: false })   // (id, update, options, callback)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: "Cannot update user with id " + id + ".Maybe user not found!" });
            } else {
                // res.send(data);
                res.redirect('/');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Have some error!" });
        })

}

// delete an user
const deleteUser = (req, res) => {

    if (!req.params.id) {
        res.status(400).send({ message: "ID user delete cannot be empty!"});
    }

    const id = req.params.id;
    UserDB
        .findByIdAndDelete(id)
        .then(data => {
            if(!data) {
                res.status(400).send({ message: "Cannot delete user with id " + id + ".Maybe user not found"});
            } else {
                // res.status(200).send({ message: "Delete user successfully!"})
                res.redirect('/');
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ message: "Have some error!"})
        })

}

module.exports = {
    create,
    show,
    update,
    deleteUser
}

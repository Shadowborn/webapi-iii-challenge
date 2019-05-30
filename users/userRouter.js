const express = 'express';
const router = require('express').Router();
// const router = express.Router();
const Users = require('./userDb.js'); // <<<<< updated path
router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {
    
});

router.get('/', async (req, res) => {
    try {
        console.log("get request")
        const users = await Users.get(req.query);
        res.status(200).json(users);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the users',
        });
      }
});

router.get('/:id', async (req, res) => {
    try {
        console.log("get by id request")
        const users = await Users.getById(req.params.id);
        if (users) {
            res.status(200).json(users);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving users by id'
        })
    }
});

router.get('/:id/posts', async (req, res) => {
    try{
        console.log('Get id posts')
        const userPosts = await Users.getUserPosts(req.params.id)
        if (userPosts) {
            res.status(200).json(userPosts)
        } else {
            res.status(500).json({
                message: 'Error retrieving user post id'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving user post id'
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = await Users.remove(req.params.id);
        res.status(200).json({
            url: `/users/${req.params.id}`,
            operation: `DELETE for hobbit with id ${req.params.id}`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error, cannot delete'
        })
    }
});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;

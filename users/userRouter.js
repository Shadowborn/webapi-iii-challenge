const express = 'express';
const router = require('express').Router();
// const router = express.Router();
const Users = require('./userDb.js'); // <<<<< updated path
const Posts = require('../posts/postDb');



function validateBody(req, res, next) {
    if(req.body) {
        next()
    } else {
        res.status(400).json({message: 'Please provide data'});
    }
}

router.post('/:id/posts', validateUserId, validateBody, validateUser, async (req, res) => {
    try {
        const posts = await Posts.insert(req.body);
        res.status(201).json(posts);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error adding the post',
        });
      }
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

router.get('/:id', validateUserId, async (req, res) => {
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

router.get('/:id/posts', validateUserId, validatePost, async (req, res) => {
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

router.delete('/:id', validateUserId, async (req, res) => {
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

router.put('/:id', validateUserId, async (req, res) => {
    const user = Users.find(h => h.id == req.params.id);
    
    if (!user) {
      res.status(404).json({ message: 'user does not exist' });
    } else {
      // modify the existing hobbit
      Object.assign(user, req.body);
  
      res.status(200).json(user);
    }
});

//custom middleware

async function validateUserId(req, res, next) {
    const user = await Users.getById(req.params.id)
    if (user) {
        req.user = user
        next()
    } else {
        res.status(400).json({ messsage: "invalid user id"})
    }
};

function validateUser(req, res, next) {
    if(!req.body) {
        res.status(400).json({
            message: "missing user data"
        })
    } else if (!req.body.name) {
        res.status(400).json({
            message: "missing required name field"
        })
    } else {
        next()
    }
};

function validatePost(req, res, next) {
    if(!req.body) {
          res.status(400).json({ message: 'missing post data' })
    } else if (!req.body.text) {
          res.status(400).json({ message: 'missing required text field'})
    } else {
          next()
    }
};

module.exports = router;

const express = 'express';


const router = require('express').Router();
// const router = express.Router();
const Posts = require('./postDb');

router.get('/', async (req, res) => {
    try {
        console.log("get request")
        const posts = await Posts.get(req.query);
        res.status(200).json(posts);
      } catch (error) {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error retrieving the posts',
        });
      }
});

router.get('/:id', async (req, res) => {
    try {
        console.log("get by id request")
        const posts = await Posts.getById(req.params.id);
        if (posts) {
            res.status(200).json(posts);
          } else {
            res.status(404).json({ message: 'User not found' });
          }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving posts by id'
        })
    }
});

// router.delete('/:id', async (req, res) => {
//     try {
//           const count = await Users.remove(req.params.id);
//           if (count > 0) {
//                 res.status(200).json({ message: 'This user no longer exists.'});
//           } else {
//                 res.status(404).json({ message: 'That user could not be found'});
//           }
//     } catch (err) {
//           console.log(err);
//           res.status(500).json({ message: 'Error removing user' });
//     }
// });

router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0) {
            res.status(200).json({message: 'this post no longer exists'});
        } else {
            res.status(404).json({message: 'That post could not be found'});
        } 
    }catch(error) {
        console.log(error);
        res.status(500).json({message: 'Error removing post'})
    }
});

router.put('/:id', async (req, res) => {
    try {
        const post = await Posts.update(req.params.id, req.body);
        if (post) {
              res.status(200).json(post);
        } else {
              res.status(404).json({ message: 'That post could not be found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating the post' });
  }
});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;
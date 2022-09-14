const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
// for post
const postschema = require('../models/postschema')
const Post = new mongoose.model('post',postschema)
// for Category
const categoryschema = require('../models/categoryschema')
const Category = new mongoose.model('category',categoryschema)




router.get('/',(req,res)=>{
    Category.find((err, data) => {
        if (!err) { 

            Post.find((err,post)=>{
                if(!err){

                    res.render('admin',{title:'Admin Page',category:data,posts:post})
                }else{
                    console.log('Failed to retrieve the Course List: ' + err);

                }
            })

        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });   
})

// for show all post
router.get('/allpost',(req,res)=>{
    Post.find((err,post)=>{
        if(!err){

            res.render('allpost',{title:'All Post',posts:post})
        }else{
            console.log('Failed to retrieve the Course List: ' + err);

        }
    })
})

// for show all category
router.get('/allcategory',(req,res)=>{
    Category.find((err,data)=>{
        if(!err){

            res.render('allcategory',{title:'All Category',category:data})
        }else{
            console.log('Failed to retrieve the Course List: ' + err);

        }
    })
})

module.exports = router
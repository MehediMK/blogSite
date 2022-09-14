const express = require('express')
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const postschema = require('../models/postschema')
const Post = new mongoose.model('post',postschema)

// for Category
const categoryschema = require('../models/categoryschema')
const Category = new mongoose.model('category',categoryschema)




// image upload modules
const path = require('path');
const multer = require('multer');
let imagename = ""
// let imagename = __dirname+"/public/image/"
const upload = multer.diskStorage({
                        destination: __dirname+'../../public/images', 
                        filename: (req, file, cb) => {
                            const getfilename = file.fieldname + '_' + Date.now() + path.extname(file.originalname)
                            cb(null, getfilename)
                            imagename=getfilename
                            console.log("file name"+imagename)
                        }
                    });
const imageUpload = multer({
                        storage: upload,
                        limits: {
                          fileSize: 1000000*2 // 1000000 Bytes = 2 MB
                        },
                        fileFilter(req, file, cb) {
                          if (!file.originalname.match(/\.(png|jpg)$/)) { 
                             // upload only png and jpg format
                             return cb(new Error('Please upload a Image'))
                           }
                         cb(undefined, true)
                      }
                  }) 

// for post 
router.get('/',(req,res)=>{

        Category.find((err, data) => {
            if (!err) {
                res.render('addpost',{title:'Home',category:data})

            } else {
                console.log('Failed to retrieve the Course List: ' + err);
            }
        });   

})

router.post('/', imageUpload.single('postimage'), async (req,res)=>{
    const newpost = new Post({title:req.body.title,category:req.body.category.toLowerCase(),description:req.body.description,image:"/images/"+imagename,slug:req.body.slug})
   await newpost.save((err)=>{
        if(err){
            res.status(500).json({
                error:'There was an error in database server'
            })
            console.log(err)
        }
        else{
            
            res.redirect('/admin')

            console.log('successfully data inserted')
            
        }
    })
})

// fetch all values
router.get('/data',(req,res)=>{
    Post.find((err,data)=>{
        if(err){
            res.status(500).json({
                error:'There was an error in database not updated'
            })
            console.log(err)
        }
        else{
            res.status(200).json({
                result:data,
                message:"All data"        
            })
        }
    })
})
// update by id
router.put('/:id',(req,res)=>{
    // we can pass multipale params
    Post.updateOne({_id:req.params.id},{
        $set:{
            title:'update psot', // or req.params.title
        }
    },(err)=>{
        if(err){
            res.status(500).json({
                error:'There was an error in database not updated'
            })
            console.log(err)
        }
        else{
            res.redirect('/post')
            console.log('successfully data updated')            
        }
    })
})

// add multiple values 
router.post('/many',(req,res)=>{
    Post.insertMany(req.body,(err)=>{
        if(err){
            res.status(500).json({
                error:'There was an error in database server'
            })
            console.log(err)
        }
        else{
            res.redirect('/post')
            console.log('successfully data inserted')            
        }
    })
})

// for delete post data
router.delete('/:id',(req,res)=>{
    Post.deleteOne({_id:req.params.id},
        (err)=>{
        if(err){
            res.status(500).json({
                error:'There was an error in database not delete'
            })
            console.log(err)
        }
        else{
            res.redirect('/post')
            console.log('successfully data deleted')            
        }
    })
})
module.exports = router
const Post=require('../models/posts');
const Tag=require('../models/tag');

module.exports={
    addPost:(req,res,next)=>{
        console.log(req.body);
        const savepost=req.body;
        const post=new Post(savepost);
        if(!savepost._id){
            post.save((err,newPost)=>{
                if(err)
                    res.send(err);
                else if(!newPost)
                    res.send(404);
                else
                    res.send(newPost);
                next();
            })
        }else{
             Post.findById(req.body._id, function(err,post){
                 if(err) return handleError(err);
                 post.set(savepost);
                 post.save((err,updatePost)=>{
                    if(err)
                        res.send(err);
                    else if(!updatePost)
                        res.send(404);
                    else
                        res.send(updatePost);
                    next();
                });
             });
        }
        
    },
    getPost:(req,res,next)=>{
        const postid=req.params.id;
        Post.findById(postid)
            .populate('author').populate({path:'comments.author',select:'name'})
            .exec((err,post)=>{
                if(err)
                res.send(err);
                else if(!post)
                    res.send(404);
                else
                    res.send(post);
                next();
            })
    },
    getAllPosts:(req,res,next)=>{
        Post.find()
            .populate('author')
            .exec((err,posts)=>{
                if(err)
                res.send(err);
                else if(!posts)
                    res.send(404);
                else
                    res.send(posts);
                next();
            })
    },
    savePostAndTag : (req, res, next) => {	// without using async, how complex	
		// first save tag
		const request = req.body
		const tags = request.tags.map(function(item, index){
			return { title : item };  // this is loop and prepare tags array to save,
		})
		
		Tag.insertMany(tags, {ordered:false}, function(err, savedtags){
			if(err){ 
				if(err.code=="11000"){  // 11000 is duplicate error code
					Tag.find({ "title": { "$in" : request.tags }}).then(function(data){
						const post = new Post(request);
						post.tags = data.map(function(item, index){
							return item._id
						})
						post.save((err, savedpost) => {
							if(err){
								res.send(err);
							}else{
								res.send({post: savedpost, tags:data});
							}
						})
					})
				}else{
					res.send(err);
				}
			}else{
				const post = new Post(request);
				post.tags = savedtags.map(function(item, index){
					return item._id
				})
				post.save((err, savedpost) => {
					if(err){
						res.send(err);
					}else{
						res.send({post: savedpost, tags:savedtags});
					}
				})
			}
		})		
    },
    savePostAndTagAsync : async (req, res, next) => { // to use async, need to add async in ()
		const request = req.body;
		let returnres;
		if(request._id){
			const post = await Post.findById(request._id)
			returnres = await post.savePostTags(request);		
		}else{
			const post = new Post();		
			returnres = await post.savePostTags(request);
		}		
		res.send(returnres);
	},

}
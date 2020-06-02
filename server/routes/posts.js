const postcontroller=require('../controllers/PostController');

module.exports=(router)=>{
    router.route('/post/:id')
        .get(postcontroller.getPost)
    
    router.route('/posts')
        .get(postcontroller.getAllPosts)
        .post(postcontroller.addPost)
    
    router.route('/posttag')
        .post(postcontroller.savePostAndTagAsync)
}
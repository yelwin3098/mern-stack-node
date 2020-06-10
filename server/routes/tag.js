const postcontroller=require('../controllers/PostController');

module.exports=(router)=>{
    router.route('/tags/')
        .get(postcontroller.getAlltags)
    
}
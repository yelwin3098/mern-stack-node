const usercontroller=require('../controllers/UserController');
const JwtAuthModdleware=require('../middlewres/jwtAuthMiddleware');

module.exports=(router)=>{
    router.route('/user/:id')
        .get(JwtAuthModdleware, usercontroller.getUser)
    
    router.route('/users')
        .get(JwtAuthModdleware, usercontroller.getAllUsers)
        .post(usercontroller.addUser)
}
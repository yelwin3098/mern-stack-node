const authController=require('../controllers/AuthController');

module.exports=(router)=>{
    router.route('/auth/login').post(authController.loginAttempt)

    router.route('/auth/user').get(authController.checkToken)
}
// token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZDFkZDk2Y2VhNTIxMGMyNGE4ZmQ5YSIsImlhdCI6MTU5MDg5OTYyNywiZXhwIjoxNTkwOTg2MDI3fQ.Ctn5zxlC2DxpWjshnnpv_BwmWFOF1CU_siFhjkeh0C8
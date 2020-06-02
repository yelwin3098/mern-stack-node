const user=require('./users');
const post=require('./posts');
const auth=require('./auth');

module.exports=(router)=>{
    user(router)
    post(router)
    auth(router)
}
const user=require('./users');
const post=require('./posts');
const auth=require('./auth');
const tag=require('./tag')

module.exports=(router)=>{
    user(router)
    post(router)
    auth(router)
    tag(router)
}
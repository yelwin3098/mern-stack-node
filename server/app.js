const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');

const routes=require('./routes/')

const app=express();
const router=express.Router();

//add this line because inted to accept only json param and return json
router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

const url=process.env.MONGOD_URI || "mongodb://localhost:27017/mernstack";

try{
    mongoose.connect(url,{
        //useMongoClient:true
        useNewUrlParser:true,
        useUnifiedTopology: true 
    })
}catch(error){
    console.log(error)
}

let port=5000 || process.env.PORT

routes(router)

app.use(cors());
app.use(bodyParser.json())

app.use('/api',router)

app.listen(port,()=>{
    console.log(`Server startted at port ${port}`);
});
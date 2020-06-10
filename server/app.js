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

//for MongoAlt url mongodb+srv://yelwin:yelwinppp3098@mern-stack-2kr6i.mongodb.net/mern-stack?retryWrites=true&w=majority

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



routes(router)

const corsOptions={
	origin:'http://localhost:3000',
	credentials:true
}

app.use(cors(corsOptions));
app.use(bodyParser.json())

app.use('/api',router)

/** start server */
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  	console.log('Node app is running on port', app.get('port'));
});

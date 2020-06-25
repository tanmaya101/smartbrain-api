const Clarifai=require('clarifai');
const app = new Clarifai.App({
 apiKey: 'b09f9bea77be4af9a849ff539a76404c'
});
const handleApi=(req,res)=>{
	app.models
.predict("c0c0ac362b03416da06ab3fa36fb58e3", req.body.input)
.then(data=>{res.json(data)})
.catch(err=>res.status(400).json('failed to fetch API'))
}


const handleImage=(req,res,db)=>{
	const {id}=req.body;
	db('users')
  .where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries=>
  	res.json(entries[0])
  	)
  .catch(err=>res.status(400).send('no user'))
}

module.exports={
	handleImage,
	handleApi
}
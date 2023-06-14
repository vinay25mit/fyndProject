const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const cors=require("cors")
const app = express();
app.use(cors({
	origin:"*"
}));
const uri = "mongodb://127.0.0.1:27017";
const client =  new mongoClient(uri);

app.get('/getdata/students', async (req, res) => {
	const {regNo, email}  = req.query;
	console.log(regNo, email)

	await client.connect();

	
	const db=client.db("StudentDb");
	const col=db.collection("details");
	const data= await col.find({regno : regNo,email: email });

	const sendData = [];
	for await (const d  of data){
		sendData.push(d)
	}

	return res.send(sendData)


	

	

	


});

app.listen(8000,()=>{
	console.log("listening on port",8000);
})
const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const cors=require("cors")
const path =require("path");
const app = express();

app.use(cors({
	origin:"*"
}));
// const __dirname = path.resolve();


const uri = "mongodb+srv://vinay25mit:sdpa78e1@cluster0.seeif.mongodb.net/?retryWrites=true&w=majority";
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

app.use(express.static(path.join(__dirname, '..' + '/frontend/student/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '..' +  '/frontend/student/build/index.html'))
);

app.listen(8000,()=>{
	console.log("listening on port",8000);
})
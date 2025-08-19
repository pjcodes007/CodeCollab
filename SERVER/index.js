import express from 'express';

const app = express();

app.get('/home',(req,res)=>{
    res.send('Hello World');
})

app.listen(4000,()=>{
    console.log(`Listening on https://localhost:4000`);
})
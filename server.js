const express=require('express');
const fs=require('fs');
var app=express();
app.use(express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    var date = Date().toString();
    console.log(`${date}: ${req.method} ${req.url}`);
    var log=`${date}: ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err)=>{
        console.log("Unable to handle request");
    });
    next(); 
 });
 

const hbs=require('hbs');
hbs.registerPartials(__dirname+'/views/partial');
app.set('view engine','hbs');


hbs.registerHelper('CurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('capitalaze',(text)=>{
    return text.toUpperCase();
})
app.get('/',(req,res)=>{
    //res.set('Content-Type', 'text/html');
    //res.send('<h1>hello</h1>');
    //res.set('Content-Type', 'application/json;charset=utf-8');
    // res.send({
    //     name:'cetan',
    //     likes:[
    //         'cricket',
    //         'reading'
    //     ]
    // })
    res.render('home.hbs',{
        title:'Home Page',
        
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle request'
    })
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'about page',
        
    });
})

app.listen(3000,()=>{
    console.log("server started on 3000 port");
});
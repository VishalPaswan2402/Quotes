const mysql = require('mysql2');
const express=require("express");
const { v4: uuidv4 } = require('uuid');
const app=express();
const path=require("path");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ideabook',
    password:"mysql#123",
  });

  app.listen("8080",()=>{
    console.log("Server is listening...");
});


// Home Page...
app.get("/home",(req,res)=>{
  let users=`select * from user`;
  try{
    connection.query(users,(err,result)=>{
      if(err) throw err;
      // console.log(result);
    })
  }
  catch(err){
    console.log(err);
  }
  res.render("home.ejs",{users});
});

// User View Page...
app.post("/home/user",(req,res)=>{
  // let {id}=req.params;
  // console.log(id);
  let {username,password}=req.body;
  let users=`select * from user where username='${username}'`;
  let posts=`select '${username}' from posts`;

  let c=`select count(username) as count from users where username='${username}'`;
  try{
    connection.query(users,(err,result)=>{
      if(err) throw err;
      let user=result[0];
    if(username=="" || password=="" ){
      res.send("Please Enter Both User Name And Password For Log In...")
    }
    else if((password!=user.password)){
      res.send("Incorrect Password Go Back And Try Again...");
  }
    else{
        connection.query(users,(err,users)=>{
            if(err) throw err;
            connection.query(posts,(err,users)=>{
              if(err) throw err;
          })
            res.render("userpage.ejs",{users},{posts});
        })

       
    }
    })
  }catch (err){
    console.log(err);
    res.send("Some error in database...");
  }
});


// Sign In for new users...
app.get("/home/signin",(req,res)=>{
  res.render("signin.ejs");
});

app.get("/home/congrats",(req,res)=>{
  res.render("congrats.ejs");
});

app.post("/home/signin",(req,res)=>{
    let{username,email,dob,country,mobile,password,pass}=req.body;
    let id=uuidv4();
    let user=`insert into user (id,username,email,password,dob,country,mobile) values ('${id}','${username}','${email}','${password}','${dob}','${country}','${mobile}')`;
    let post=`alter table posts add column ${username} varchar(500)`;
    try{
        if(pass!=password){
          // res.send("Password Not Matched")
        }
        else if(username=="" || email=="" || dob=="" || country=="" || mobile=="" || password=="" || pass==""){
          res.send("Go Back And Fill All The Required Data To Sign In")
        }
        else{
          connection.query(user,(err,result)=>{
            if(err) throw err;
            console.log(user);
            res.redirect("/home/congrats");

        });
        connection.query(post,(err,result)=>{
          if(err) throw err;
          console.log(post);  

        });
        }
      } catch(err){
      console.log(err);
      }
});


// Recover Password Page...
app.get("/home/recover",(req,res)=>{
  res.render("forget.ejs");
})

// Change Your Password...
app.patch("/home",(req,res)=>{
  let {username,email,newpassword}=req.body;
  let detail=`select * from user where username='${username}'`;
  try{
    connection.query(detail,(err,result)=>{
      if (err) throw err;
      let data=result[0];
      if(data.email!=email){
        res.send("Incorrect Email ID. Go Back And Try Again...");
      }
      else{
        let edit=`update user set password='${newpassword}' where email='${email}' and username='${username}'`;
        connection.query(edit,(err,result)=>{
          if (err) throw err;
          res.redirect("/home");
        })
      }
    })
  }
  catch (err){
    console.log(err);
  }
})

// New Idea...
app.get("/home/newidea",(req,res)=>{
  res.render("newidea.ejs");
})

app.post("/home/newidea",(req,res)=>{
  let {user,username}=req.body;
  let news=`insert into posts (${user}) values ('${username}')`;
  try{
    connection.query(news,(err,result)=>{
      if (err) throw err;
      console.log(result);
      // res.redirect("/home/user");
    })
  }
  catch (err){
    console.log(err);
  }
  res.send("You Have Posted Your Idea On Your Account... Go Back To Home Page To Sign In Again...");

})



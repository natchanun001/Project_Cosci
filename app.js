const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const session = require("express-session");
const app = express();
const userDataMockup = [
    {
      id: "1",
      username: "admin",
      password: "admin",
    },
    {
      id: "2",
      username: "commu",
      password: "commu",
    },
  ];



  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "/")));
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      cookie: {
        expires: 18000000,
      },
    })
  );
  
  //set path to html
  app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
  });
  
  app.get("/Academic", async (req, res) => {
    if (req.session.isLogin) {
      res.sendFile(path.join(__dirname + "/Academic.html"));
    } else {
      res.sendFile(path.join(__dirname + "/login.html"));
    }
  });
  
  app.get("/Gallery", async (req, res) => {
      if (req.session.isLogin) {
        res.sendFile(path.join(__dirname + "/Gallery.html"));
      } else {
        res.sendFile(path.join(__dirname + "/login.html"));
      }
    });
  
  
  app.get("/gallery", async (req, res) => {
    res.sendFile(path.join(__dirname + "/gallery.html"));
  });
  
  //api handle
  app.post("/login", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const keep = userDataMockup.find((item) => (item.username = username));
  
    if (keep.username == username && keep.password == password) {
      req.session.isLogin = true;
      req.session.username = username;
      res.status(200).redirect("/Academic");
    } else {
      res.status(200).redirect("/");
    }
  });
  
  app.post("/logout", async (req, res) => {
    req.session.destroy((err) => {
      res.redirect("/");
    });
  });
  
  app.use(async (req, res) => {
      res.status(404).sendFile(path.join(__dirname + "/404.html"));
  })
  
var server = app.listen(5500, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port);
  });
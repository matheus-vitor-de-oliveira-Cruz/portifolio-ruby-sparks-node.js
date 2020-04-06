const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views",{
    express: server,
    autoescape: false,
    noCache:true
})

server.get("/",function(req, res){

    const about = {
        avatar_url:"https://vignette.wikia.nocookie.net/doblaje/images/8/86/4034532312.png/revision/latest?cb=20170113150307&path-prefix=es",
        name: "Ruby Sparks",
        role:"Aluno(a) - Rocketseat",
        description:'Estudande da <a href="https://rocketseat.com.br" target="_blank">Rockteseat</a>',
        links:[
            {name:"Github", url:"https://github.com/maykbrito/"},
            {name:"Twitter", url:"https://twitter.com/maykbrito/"},
            {name:"Linkedin", url:"https://linkedin.com/in/maykbrito/"} 
        ]
    }

    return res.render("about", {about:about})
})

server.get("/portifolio",function(req, res){
    return res.render("portifolio",{ items: videos})
})

server.get("/video",function(req,res){
    
    const id = req.query.id
    const video = videos.find(function(video){
        if(video.id == id){
            return true
        }
    })

    if(!video){
        return res.send("Video not found")
    }

    return res.render("video", { item: video })

    res.send(id)

})



server.listen(5000, function(){
    console.log("server is running")
})
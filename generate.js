
const Handlebars = require("handlebars");
const fs = require("fs");

// Loading Files
let config = "data/landingpage.json";
config = JSON.parse(fs.readFileSync(config, 'utf-8'))

let template = "template/template.html";
template = fs.readFileSync(template, 'utf-8');

let exportFolder = "build/";

function saveLandingPage(html, filename){
    fs.writeFileSync(filename,html);
}

// Handlebars Generate
function Generator(template,source,filename){
    var t = Handlebars.compile(template);
    var html = t(source);
    saveLandingPage(html,filename);
}

// Run over each Keyword
config["keywords"].forEach(key => {
    config.location[key.location].forEach(loc =>{
        let path = key.path;
        if(loc.length){
            path += config.replace + loc;
            key.location = loc;
        }
        console.log(path);
        // generate HTML Files
        key.path = path;
        Generator(template,key,exportFolder + path + ".html");

    })
});



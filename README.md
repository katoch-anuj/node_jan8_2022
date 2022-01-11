# node_jan8_2022
https://stackoverflow.com/questions/18419144/npm-not-working-read-econnreset

weatherstack
mapbox


EXPRESS (https://expressjs.com/en/5x/api.html#app)
it is a framework for nodejs.
cont express = require ('express');
express is not a object  but a function

To server html via express we need to provide absolute path and not relative path.
For this we have __dirname(path of directory where the file resides) and __filename(path of the file)
and another is "path"

 <link rel='stylesheet' href='./css/styles.css'> relative path
 <link rel='stylesheet' href='/css/styles.css'> absolute path here '/' is the web-server root which is public
 / means the root of the current drive;

./ means the current directory;

app.use(express.static(publicPath)); here stattic refers that the page is static

HBS
to tell express js which template engine we installed and want to use
app.set('view engine','hbs')

For dynamic templates
res.render('index') this always check inside the "views" folder only and only for templates (in this case hbs)
for static template
app.use(express.static(publicPath));
Folder name 'views' is imp else error would be thrown
NOTE: if we have both static code
app.use(express.static(publicPath));
 and dynamic code for route
 app.get("",(req,res)=>{
    res.render('index');
})
present so sequencing matters and which returns true

working with partials in HBS
hbs.registerPartial(partialPath) path from where partials to be picked
to use partials {{>header}}
for nodemon to work
nodemon src/app.js -e js,hbs

404
app.get("*",
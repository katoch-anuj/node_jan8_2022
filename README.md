# node_jan8_2022
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

NOTE:
we cannot send 2 response from a route i.e
can't use res.send() twice. error:cannot set headers after they are sent to client.

HEROKU CLI

heroku login

Version control:
GIT
untracked: file newly added(doesn't exist)
unstaged: file already present with git
staged: file which is added
commit:

git init--> initiliazed empty git repository (local repo)

SSH ==>secure shell
 ls -s -l ~/.ssh --> if we have id_rsa and id_rsa.pub 
 Then this means we have ssh keys
 id_rsa.pub--> pubic key so we will share this with github and heroku

 to create ssh keys
 ssh-keygen -t rsa -b 4096 -C "katoch.anuj92@gmail.com,"(-t--> type, -b how many bits, -c comment)

 Once key is generated to check 
 eval "$(ssh-agent -s)" starts up the ssh-agent for future use as well
 above return
 Agent pid 80928
 Now to register the file
 ssh-add -K ~/.ssh/id_rsa


cat ~/.ssh/id_rsa.pub {this command just dispaly content}

ssh -T git@github.com {this test our ssh connection with github}

# Uploading to heroku
heroku keys:add {upoads ssh public key to heroku}
heroku create <project-name> {project name should be unique across all heroku project}
return 2 url 
1> live url
2> url where code should be pushed

In package.json
modify script to tell heroku which will be the entry point as we have "node app.js"
"scripts": {
    "start":"node src/app.js"
  },

Heroku will provide the dynamic port value to run.
so update app.js
const port = process.env.PORT || 4000;
and use this port.

Update the url
const url = `http://localhost:4000/weather?address=${address}`;
 
 not require
git push heroku master when our code is in master branch in git else if we are deploying from other branch then use
git push heroku <branch name>:master
# Application Link
https://akatoch-weather-app.herokuapp.com/
# what worked
checkout the branch
go inside the project
git init
create gitignore file 
git add .
git commit -m 
heroku create <app name>
git remote (to check remote)
git push heroku master:main

# To push changes to our repo
we dont have remote set as orgin
git remote add <remote name> <repo url>
eg: git remote add origin git@github.com:katoch-anuj/node_jan8_2022.git

git push -f  master:<remote branch>
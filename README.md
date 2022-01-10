# node_jan8_2022
npm i pkgname@version

node app.js anuj
console.log(process.argv); this will get the value anuj which is passed as param and 2 other value

yargs is used for argument parsing

node app.js add --title='hello'
{ _: [ 'add' ], title: 'hello', '$0': 'app.js' }

node app.js --version (return value if we have console.log(yargs.argv))
1.0.0 

yargs.version('1.1.0'); set version
 
Adding a command
whenever a new command is added it can be checked under node app.js --help

console.log(yargs.argv); is very imp as it initiates the parsing of all the commands that are binded with yargs alternative to it is yargs.parse();
if we dont use either of above then nothing will happen.


cont databuffer=fs.readFileSync('dummy.json') --> this will return some binary data and not the json
dataBuffer.toString();

using debugger
add debugger in code
node inspect app.js add 

got to chrome
chrome://inspect

'restart' in terminal re executes the program



// const fs= require('fs');
// fs.writeFileSync('notes.txt','this is created by node.js\n') ;
// fs.appendFileSync('notes.txt','this is appended 1\n');

const notes = require('./notes.js');
const yargs = require('yargs');
// const { string } = require('yargs');

// console.log(getNotes());
// console.log(process.argv);
yargs.version('1.1.0');

yargs.command({
    command:'add',
    describe:"Add the notes",
    builder:{
        title:{
            describe:'adding title',
            demandOption:true,// making it a required
            type:'string',// always string else node app.js add  --title will give true using this will give ''
        },
        body:{
            describe:'body here',
            demandOption:true,
            type:'string',
        }
    },
    handler:function(argv){
        // console.log('adding the notes');
        notes.addNote(argv.title,argv.body)
        // console.log('title: ',argv.title);
        // console.log('Body: ',argv.body);
    }
});

yargs.command({
    command:'remove',
    describe:'removing the notes',
    builder:{
        title:{
            describe:'title',
            demandOption:true,
            type:'string',
        }
    },
    handler: function(yargs){
        notes.removeNotes(yargs.title);
        // console.log("removing the notes")
    }
})
yargs.command({
    command:'listNotes',
    describe:'listing',
    handler(){
        notes.listingNotes();
    }
});
yargs.command({
    command:'read',
    describe:'read the title',
    builder:{
        title:{
            describe:'title to be read',
            demandOption:true,
            type:'string',
        },
    },
    handler(argv){
        notes.ReadNote(argv.title)
    }
})


// console.log(yargs.argv); very imp to trigger the yargs parsing but it will cause printing twice disabling it will cause the command not to run

yargs.parse();

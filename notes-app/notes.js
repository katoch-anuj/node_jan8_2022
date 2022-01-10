const fs = require("fs");
const getNotes = function () {
  return "your notes here";
};

const addNote = function (title, body) {
  const fileData = loadNotes();
  const titleExist = fileData.filter(function (item) {
    return item.title === title;
  });
  console.log(titleExist);
  if (titleExist.length === 0) {
    fileData.push({ title: title, body: body });
    console.log(fileData);
    saveNotes(fileData);
    console.log("new title added");
  } else {
    console.log("title exist");
  }
};
const saveNotes = function (fileData) {
  const dataString = JSON.stringify(fileData);
  fs.writeFileSync("notes.json", dataString);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const parsedData = JSON.parse(dataBuffer.toString());
    return parsedData;
  } catch (e) {
    return [];
  }
};
const removeNotes = function(title) {
    const notes=loadNotes();
    const removeNoteFlag=notes.filter(function(item){
        return item.title!==title;
    })
    console.log(removeNoteFlag)
    if(removeNoteFlag.length<notes.length){
        saveNotes(removeNoteFlag);
        console.log('node removed with title',title);
    }else{
        console.log('title doesnt exist');
    }
}
module.exports = {
  addNote: addNote,
  removeNotes:removeNotes,
};

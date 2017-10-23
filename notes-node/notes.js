
const fs = require('fs');

var fetchNotes= ()=>{
  try{
    var notesString= fs.readFileSync('notes-data.json');
    return notes = JSON.parse(notesString);
  }catch (e){
    return [];
  }
}

var saveNotes = (notes)=>{
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

//Add Note Function
var addNote = ( title,body )=>{
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
    var duplicateNotes = notes.filter((note) => note.title === title );
    if (duplicateNotes.length === 0){
      notes.push( note );
      saveNotes( notes );
      return note;
    }
    else{
      console.log('Title already taken');
    }

};

//Get Notes
var getAll = () => {
  return fetchNotes();
};

//Read Notes
 var readNote = ( title )=>{
   var notes = fetchNotes();
   var fileteredNotes = notes.filter((note)=> note.title === title);
   return fileteredNotes[0];
 };

//Remove Note
 var removeNote = ( title )=>{
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  debugger;
  console.log('----');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote,
  logNote
}

const fs = require('fs');
const _ = require('lodash')
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};

const bodyOptions = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

const argv = yargs
.command('add', 'Add a new note', {
  title: titleOptions,
  body: bodyOptions
})
.command('list', 'List all notes')
.command('read', 'Read a note', {
  title: titleOptions
})
.command('remove', 'Remove a note',{
  title:titleOptions
})
.help()
.argv;

var command = argv._[0];
switch (command){
  case 'add':
    var noteAdded = notes.addNote( argv.title, argv.body );

    if(noteAdded){
      notes.logNote(noteAdded);
    }
    else{
      console.log("Note title taken!")
    }
  break;

  case 'list':
    var allNotes = notes.getAll();
    console.log(`Printing: ${allNotes.length} notes(s)`);
    allNotes.forEach( (note) => notes.logNote(note) );
  break;

  case 'read':
    var note = notes.readNote(argv.title);
    if (note){
      notes.logNote(note);
    }
    else{
      console.log("No match!");
    }
  break;

  case 'remove':
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
  break;

  default:
    console.log('Command not recognized');
  break;
}

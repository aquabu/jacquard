// Jacquard, loom, brocade
outlets = 2;
var max_lattice = new TriadWeaver;

function msg_int(i) {
  max_lattice.direction = i;
}

function reset() {
  max_lattice.chord_type = "maj";
  max_lattice.chord = [60,64,67];
  max_lattice.inversion = [0,1,2];
  max_lattice.min_note = 36;
  max_lattice.octave_range = 5;
}

function bang() {
  max_lattice.move(max_lattice.direction); 
  max_lattice.shephard_notes();
  outlet(0, max_lattice.chord);
  outlet(1, max_lattice.chord_type);
}

function TriadWeaver() {
  this.direction = 0;
  this.chord_type = "maj";
  this.chord = [60,64,67];
  this.inversion = [0,1,2];
  this.min_note = 36;
  this.octave_range = 5;
}

//This adjusts the chord notes to be in the specified note range
TriadWeaver.prototype.shephard_notes = function() {
  var max = this.max_note();
  var min = this.min_note;

  for(i = 0; i < this.chord.length; i++) {
      if(this.chord[i] >= max){
        this.chord[i] = Number(this.chord[i] + min - max) + 0;
      }
      else if(this.chord[i] < min) {
        this.chord[i] = Number(this.chord[i] + max - min) + 0;
      }
  }
}

TriadWeaver.prototype.max_note = function() {
  return (this.min_note + (this.octave_range * 12));
}

TriadWeaver.prototype.move = function(direction) {
  switch(this.chord_type){
    case "maj" :
      var change = this.MAJ_MAP[direction];
      break;
    case "min" :
      var change = this.MIN_MAP[direction];
      break;
  }

  var note_change = change.slice(1,4); 
  var inversion_change = change.slice(4,7);
  this.chord_type = change[0];
  this.weave_chord_change(this.chord, this.inversion, note_change);
  this.weave_inversion_change(this.inversion,inversion_change);
}

TriadWeaver.prototype.weave_chord_change = function(chord, inversion, change) {
  for(i = 0; i < inversion.length; i++) {
    //get destination position based on inversion
    //update destination position with current index
    chord[i] += change[inversion[i]];
  }
  return chord;
}

TriadWeaver.prototype.weave_inversion_change = function(inversion, change) {
  for(i = 0; i < inversion.length; i++) {
    //get destination position based on inversion
    //update destination inversion with the inversion at the current index
    inversion[i] = change[inversion[i]];
  }
  return inversion;
}

/*
  Map the when starting on a major chord
  Values are:
  Destination chord type
  3 digits which will be added to the root, 3rd and fifth
  3 digits representing the new "inversion" of the root, third, and fifth
    as array indexes
*/

TriadWeaver.prototype.MAJ_MAP = [
  ["min", 0,  0,  2, 1, 2, 0],
  ["maj", 0,  1,  2, 2, 0, 1],
  ["min", 0,  1,  1, 2, 0, 1],
  ["maj", 0,  -1, 1, 1, 2, 0],
  ["min", 0,  -1, 0, 0, 1, 2],
  ["maj", -2, -1, 0, 2, 0, 1],
  ["min", -2, -2, 0, 1, 2, 0],
  ["maj", -1, -2, 0, 1, 2, 0],
  ["min", -1, 0,  0, 2, 0, 1],
  ["maj", -1, 0,  1, 2, 0, 1],
  ["min", 1,  0,  1, 0, 1, 2],
  ["maj", 1,  0,  2, 1, 2, 0]
  ];

TriadWeaver.prototype.MIN_MAP = [
  ["maj", 0,  0,  1,  1, 2, 0],
  ["min", -1, 0,  1,  1, 2, 0],
  ["maj", -1, 0,  -1, 0, 1, 2],
  ["min", -2, 0,  -1, 2, 0, 1],
  ["maj", -2, 0,  0,  2, 0, 1],
  ["min", -2, -1, 0,  1, 2, 0],
  ["maj", -1, -1, 0,  1, 2, 0],
  ["min", -1, 1,  0,  2, 0, 1],
  ["maj", 0,  1,  0,  0, 1, 2],
  ["min", 0,  1,  2,  1, 2, 0],
  ["maj", 0,  2,  2,  2, 0, 1],
  ["min", 0,  2,  1,  2, 0, 1]
  ];

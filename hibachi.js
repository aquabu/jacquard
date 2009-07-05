// Jacquard, loom, brocade
function TriadWeaver() {
  this.chord_type = "maj";
  this.chord = [60,64,67];
  this.inversion = [0,1,2];
}

function maj(i){
  outlet(0,MAJ_MAP[i]);
}

function min(i){
  outlet(0,MIN_MAP[i]);
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
  this.chord_type = change[0]
  this.chord = this.weave_chord_change(this.chord, this.inversion, note_change);
  this.inversion = this.weave_inversion_change(this.inversion,inversion_change);
}

TriadWeaver.prototype.weave_chord_change = function(destination, inversion, change) {
  for(i = 0; i < inversion.length; i++) {
    //get destination position based on inversion
    mapping = inversion[i]; 

    //update destination position with current index
    destination[mapping] += change[i];
  }
  return destination;
}

TriadWeaver.prototype.weave_inversion_change = function(inversion, change) {
  for(i = 0; i < inversion.length; i++) {
    //get destination position based on inversion
    mapping = inversion[i]; 

    //update destination inversion with the inversion at the current index
    inversion[mapping] = change[i];
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

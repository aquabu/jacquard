// Jacquard, loom, brocade
function TriadWeaver() {
  this.notes = [60,64,67]
  this.inversion = [1,3,5];
  this.chord_type = "maj";
}

function maj(i){
  outlet(0,MAJ_MAP[i]);
}

function min(i){
  outlet(0,MIN_MAP[i]);
}

TriadWeaver.prototype.move = function(direction) {
  this.notes = [60,64,69];
}
/*
  Map the when starting on a major chord
  Values are:
  Destination chord type
  3 digits which will be added to the root, 3rd and fifth
  3 digits representing the new positions of the root, third, and fifth
    this is a relative movement from root position 1,3,5
*/

TriadWeaver.prototype.MAJ_MAP = [
  ["min", 0,  0,  2, 3, 5, 1],
  ["maj", 0,  1,  2, 5, 1, 3],
  ["min", 0,  1,  1, 5, 1, 3],
  ["maj", 0,  -1, 1, 3, 5, 1],
  ["min", 0,  -1, 0, 1, 3, 5],
  ["maj", -2, -1, 0, 5, 1, 3],
  ["min", -2, -2, 0, 3, 5, 1],
  ["maj", -1, -2, 0, 3, 5, 1],
  ["min", -1, 0,  0, 5, 1, 3],
  ["maj", -1, 0,  1, 5, 1, 3],
  ["min", 1,  0,  1, 1, 3, 5],
  ["maj", 1,  0,  2, 3, 5, 1]
  ];

TriadWeaver.prototype.MIN_MAP = [
  ["maj", 0,  0,  1,  3, 5, 2],
  ["min", -1, 0,  1,  3, 5, 1],
  ["maj", -1, 0,  -1, 1, 3, 5],
  ["min", -2, 0,  -1, 5, 1, 3],
  ["maj", -2, 0,  0,  5, 1, 3],
  ["min", -2, -1, 0,  3, 5, 1],
  ["maj", -1, -1, 0,  3, 5, 1],
  ["min", -1, 1,  0,  5, 1, 3],
  ["maj", 0,  1,  0,  1, 3, 5],
  ["min", 0,  1,  2,  3, 5, 1],
  ["maj", 0,  2,  2,  5, 1, 3],
  ["min", 0,  2,  1,  5, 1, 3]
  ];

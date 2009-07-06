var note = 60;
function msg_int(i) {
  if(i != note) {
    outlet(0, [note, 0]); //turn off the old note
    note = i;
    outlet(0, [i, 90]); //turn on the new one
  }
}

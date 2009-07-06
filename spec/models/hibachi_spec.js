Screw.Unit(function() {
    before(function(){
        this.lattice = new TriadWeaver;
      });

    describe('TriadLattice', function () {
      it("describes movements of major chords", function() {
        expect(lattice.MAJ_MAP[0]).to(equal,["min", 0,  0,  2, 1, 2, 0]);
      });

      it("describes movements of minor chords", function() {
        expect(lattice.MIN_MAP[0]).to(equal,["maj", 0,  0,  1,  1, 2, 0]);
      });

      it("stores the current note value for each note inversion", function() {
        expect(lattice.chord).to(equal, [60,64,67]);
      });

      it("stores whether the current chord is major or minor", function() {
        expect(lattice.chord_type).to(equal, "maj");
      });

      it("stores the current chord inversion", function() {
        expect(lattice.inversion).to(equal, [0,1,2]);
      });

      it("has a minimum note", function() {
        expect(lattice.min_note).to(equal, 36);
      });

      it("has a max note", function() {
        expect(lattice.max_note()).to(equal, 96);
      });

      it("has an octave range to set max note", function() {
        expect(lattice.octave_range).to(equal, 5);
      });

      it("will shephard notes to within the specified note range", function() {
        lattice.chord = [35,60,96];
        lattice.shephard_notes();
        expect(lattice.chord).to(equal,[95,60,36]);
      });

      it("does note generate nan when using shepharding repeatedly", function() {
        for(j = 0; j < 150; j++) {
          lattice.move(7);
          lattice.shephard_notes();
        } 
        
        expect(lattice.chord[0]).to(equal, 45);
        expect(lattice.chord[1]).to(equal, 47);
        expect(lattice.chord[2]).to(equal, 69);
      });

      describe("movement", function() {
        before(function(){
          lattice.move(0);
        });

        it("lattice move updates chord", function() {
          expect(lattice.chord).to(equal, [60,64,69]);
        });

        it("updates whether the position is major or minor", function() {
          expect(lattice.chord_type).to(equal, "min");
        });

        it("can redirect changes to the chord based on inversion", function() {
          expect(lattice.weave_chord_change([60,64,69],[1,2,0],[3,2,1])).
            to(equal,[61,67,71]);
        });

        it("updates the inversion", function() {
          expect(lattice.inversion).to(equal, [1,2,0]);
        });

        it("selects mapping based on chord type", function() {
          expect(lattice.chord_type).to(equal, "min");
          lattice.move(0);
          expect(lattice.chord_type).to(equal, "maj");
          expect(lattice.chord).to(equal, [61,64,69]);
        });
      });
    });
});

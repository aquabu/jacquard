Screw.Unit(function() {
    before(function(){
        this.lattice = new TriadWeaver;
      });

    describe('TriadLattice', function () {
      it("describes movements of major chords", function() {
        expect(lattice.MAJ_MAP[0]).to(equal,["min", 0,  0,  2, 3, 5, 1]);
      });

      it("describes movements of minor chords", function() {
        expect(lattice.MIN_MAP[0]).to(equal,["maj", 0,  0,  1,  3, 5, 2]);
      });

      it("stores the current note value for each note inversion", function() {
        expect(lattice.chord).to(equal, ["maj",60,64,67]);
      });

      it("stores whether the current chord is major or minor", function() {
        expect(lattice.chord[0]).to(equal, "maj");
      });

      it("stores the current chord inversion", function() {
        expect(lattice.inversion).to(equal, [1,3,5]);
      });

      describe("movement", function() {
        before(function(){
          lattice.move(0);
        });

        it("lattice move updates chord", function() {
          expect(lattice.chord).to(equal, ["min",60,64,69]);
        });

        it("updates whether the position is major or minor", function() {
          expect(lattice.chord[0]).to(equal, "min")
        });
      });
    });
});

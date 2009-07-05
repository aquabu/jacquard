Screw.Unit(function() {
    describe('hibachi', function () {
      it("describes movements of major chords", function() {
        expect(MAJ_MAP[0]).to(equal,["min", 0,  0,  2, 3, 5, 1]);
      });
      it("describes movements of minor chords", function() {
        expect(MIN_MAP[0]).to(equal,["maj", 0,  0,  1,  3, 5, 2]);
      });
    });
});

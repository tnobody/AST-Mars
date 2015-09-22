var calc = require('../src/calculator')

describe("Blackbox Testing", function() {
    it("4:50-8:50 & 4:50-8:50 should be NESTED", function() {
        var r = calc.calculate(4,50,8,50,4,50,8,50)
        expect(r).toBe(calc.RESULTS.NESTED)
    });

    it("00:00-10:00 & 01:00-09:00 should be NESTED", function() {
        var r = calc.calculate(0,0,10,0,1,0,9,0)
        expect(r).toBe(calc.RESULTS.NESTED)
    });

    it("01:00-09:00 & 00:00-10:00 should be NESTED", function() {
        var r = calc.calculate(1,0,9,0,0,0,10,0)
        expect(r).toBe(calc.RESULTS.NESTED)
    });

    it("09:99-24:99 & 00:00-10:00 should be OVERLAP", function() {
        var r = calc.calculate(9,99,24,99,0,0,10,0)
        expect(r).toBe(calc.RESULTS.OVERLAP)
    });

    it("00:00-10:00 & 09:99-24:99 should be OVERLAP", function() {
        var r = calc.calculate(0,0,10,0,9,99,24,99)
        expect(r).toBe(calc.RESULTS.OVERLAP)
    });

    it("00:00-10:00 & 10:00-10:01 should be TOUCH", function() {
        var r = calc.calculate(0,0,10,0,10,0,10,1)
        expect(r).toBe(calc.RESULTS.TOUCH)
    });

    it("10:00-10:01 & 00:00-10:00 should be TOUCH", function() {
        var r = calc.calculate(10,0,10,1,0,0,10,0)
        expect(r).toBe(calc.RESULTS.TOUCH)
    });

    it("10:00-10:01 & 00:00-10:00 should be TOUCH", function() {
        var r = calc.calculate(10,0,10,1,0,0,10,0)
        expect(r).toBe(calc.RESULTS.TOUCH)
    });

});
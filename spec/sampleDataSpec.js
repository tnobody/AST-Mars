var calculator = require("../src/calculator");

var sampleData = [
    [14, 12, 17, 15, 16, 55, 24, 4, calculator.RESULTS.OVERLAP],
    [3, 55, 4, 0, 12, 20, 23, 10, calculator.RESULTS.DISJOINT],
    [24, 10, 24, 10, 13, 18, 18, 55, calculator.RESULTS.DISJOINT],
    [15, 12, 13, 18, 21, 0, 23, 0, calculator.RESULTS.ERROR],
    [0, 40, 24, 40, -3, 10, 2, 50, calculator.RESULTS.ERROR],
    [2, 40, 23, 0, 8, 20, 17, 1, calculator.RESULTS.NESTED],
    [0, 0, 24, 99, 23, 1, 24, 99, calculator.RESULTS.NESTED],
    [26, 2, 5, 34, 4, 16, 5, 9, calculator.RESULTS.ERROR],
    [14, 12, 15, 19, 8, 44, 14, 12, calculator.RESULTS.TOUCH],
    [23, 0, 25, 0, 2, 23, 5, 41, calculator.RESULTS.ERROR],
    ['a', 0, null, 0, undefined, 23, 5, 41, calculator.RESULTS.ERROR],
];

describe('Sample Data from script', function () {
    sampleData.forEach(function (d) {
        it(d[0] + ':' + d[1] + ' - ' + d[2] + ':' + d[3] + ' and ' + d[4] + ':' + d[5] + ' - ' + d[6] + ':' + d[7] + ' should be ' + d[8], function () {
            if (d[8] === calculator.RESULTS.ERROR) {
                expect(function () {
                    calculator.calculate(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7])
                })
                    .toThrow(calculator.RESULTS.ERROR);
            } else {
                var r = calculator.calculate(d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7]);
                expect(r).toBe(d[8]);
            }
        })
    })
});
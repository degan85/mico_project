var expect = require('chai').expect;
var expected, current;
/*
    반복되는 코드를 추출하여 beforeEach와 before 생성자로 활용할 수 있다.
 */
before(function () {
    expected = ['a','b','c'];
});

describe('String#split',function () {
    beforeEach(function () {
        current = 'a,b,c'.split(',');
    });
    it('should return an array', function () {
        expect(Array.isArray(current)).to.be.true;
    });

    it('should return the same array', function () {
        expect(expected.length).to.equal(current.length);
        for(var i=0; i<expected.length; i++) {
            expect(expected[i]).equal(current[i]);
        };
    });
});
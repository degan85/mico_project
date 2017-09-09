var assert = require('assert');
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
        assert(Array.isArray(current));
    });

    it('should return the same array', function () {
        assert.equal(expected.length, current.length, 'array have equal length');
        for(var i=0; i<expected.length; i++) {
            assert.equal(expected[i], current[i], i+'element is equal');
        };
    });
});
const chai = require('chai');
const assert = chai.assert;

suite('Unit Tests', function () {
  suite('Basic Assertions', function () {
    // #1
/** 1 - Use assert.isNull() or assert.isNotNull() to make the tests pass. **/
test('#isNull, #isNotNull', function() {
  assert.isNull(
    null,
    'this is an optional error description - e.g. null is null'
  );
  assert.isNotNull(1, '1 is not null');
});
    // #2
/** 2 - Use assert.isDefined() or assert.isUndefined() to make the tests pass. **/
test('#isDefined, #isUndefined', function() {
  assert.isDefined(null, 'null is not undefined');
  assert.isUndefined(undefined, 'undefined IS undefined');
  assert.isDefined('hello', 'a string is not undefined');
});
    // #3
/** 3 - Use assert.isOk() or assert.isNotOk() to make the tests pass. **/
// .isOk(truthy) and .isNotOk(falsey) will pass
test('#isOk, #isNotOk', function() {
  assert.isNotOk(null, 'null is falsey');
  assert.isOk("I'm truthy", 'a string is truthy');
  assert.isOk(true, 'true is truthy');
});
    // #4
/** 4 - Use assert.isTrue() or assert.isNotTrue() to make the tests pass. **/
// .isTrue(true) and .isNotTrue(everything else) will pass.
// .isFalse() and .isNotFalse() also exist.
test('#isTrue, #isNotTrue', function() {
  assert.isTrue(true, 'true is true');
  assert.isTrue(!!'double negation', 'double negation of a truthy is true');
  assert.isNotTrue(
    { value: 'truthy' },
    'A truthy object is NOT TRUE (neither is false...)'
  );
});
  });

  // -----------------------------------------------------------------------------

  suite('Equality', function () {
    // #5
/** 5 - .equal(), .notEqual() **/
// .equal() compares objects using '=='
test('#equal, #notEqual', function() {
  assert.equal(12, '12', 'numbers are coerced into strings with == ');
  assert.notEqual({ value: 1 }, { value: 1 }, '== compares object references');
  assert.equal(6 * '2', '12', 'no more hints...');
  assert.notEqual(6 + '2', '12', 'type your error message if you want');
});
    // #6
/** 6 - .strictEqual(), .notStrictEqual() **/
// .strictEqual() compares objects using '==='
test('#strictEqual, #notStrictEqual', function() {
  assert.notStrictEqual(6, '6');
  assert.strictEqual(6, 3 * 2);
  assert.strictEqual(6 * '2', 12);
  assert.notStrictEqual([1, 'a', {}], [1, 'a', {}]);
});
    // #7
/** 7 - .deepEqual(), .notDeepEqual() **/
// .deepEqual() asserts that two object are deep equal
test('#deepEqual, #notDeepEqual', function() {
  assert.deepEqual(
    { a: '1', b: 5 },
    { b: 5, a: '1' },
    "keys order doesn't matter"
  );
  assert.notDeepEqual(
    { a: [5, 6] },
    { a: [6, 5] },
    'array elements position does matter !!'
  );
});
  });

  // -----------------------------------------------------------------------------

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  suite('Comparisons', function () {
    // #8
    test('#isAbove, #isAtMost', function () {
      assert.fail('hello'.length, 5);
      assert.fail(1, 0);
      assert.fail(Math.PI, 3);
      assert.fail(1 - Math.random(), 1);
    });
    // #9
    test('#isBelow, #isAtLeast', function () {
      assert.fail('world'.length, 5);
      assert.fail(2 * Math.random(), 0);
      assert.fail(5 % 2, 2);
      assert.fail(2 / 3, 1);
    });
    // #10
    test('#approximately', function () {
      assert.fail(weirdNumbers(0.5), 1, 0);
      assert.fail(weirdNumbers(0.2), 1, 0);
    });
  });

  // -----------------------------------------------------------------------------

  const winterMonths = ['dec,', 'jan', 'feb', 'mar'];
  const backendLanguages = ['php', 'python', 'javascript', 'ruby', 'asp'];
  suite('Arrays', function () {
    // #11
    test('#isArray, #isNotArray', function () {
      assert.fail('isThisAnArray?'.split(''), 'String.prototype.split() returns an array');
      assert.fail([1, 2, 3].indexOf(2), 'indexOf returns a number');
    });
    // #12
    test('Array #include, #notInclude', function () {
      assert.fail(winterMonths, 'jul', "It's summer in july...");
      assert.fail(backendLanguages, 'javascript', 'JS is a backend language');
    });
  });

  // -----------------------------------------------------------------------------

  const formatPeople = function (name, age) {
    return '# name: ' + name + ', age: ' + age + '\n';
  };
  suite('Strings', function () {
    // #13
    test('#isString, #isNotString', function () {
      assert.fail(Math.sin(Math.PI / 4), 'A float is not a string');
      assert.fail(process.env.PATH, 'An env variable is a string (or undefined)');
      assert.fail(JSON.stringify({ type: 'object' }), 'JSON is a string');
    });
    // #14
    test('String #include, #notInclude', function () {
      assert.fail('Arrow', 'row', "'Arrow' contains 'row'");
      assert.fail('dart', 'queue', "But 'dart' doesn't contain 'queue'");
    });
    // #15
    test('#match, #notMatch', function () {
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.fail(formatPeople('John Doe', 35), regex);
      assert.fail(formatPeople('Paul Smith III', 'twenty-four'), regex);
    });
  });

  // -----------------------------------------------------------------------------

  const Car = function () {
    this.model = 'sedan';
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = '737';
    this.engines = ['left', 'right'];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  suite('Objects', function () {
    // #16
    test('#property, #notProperty', function () {
      assert.fail(myCar, 'wings', "Cars don't have wings");
      assert.fail(airlinePlane, 'engines', 'Planes have engines');
      assert.fail(myCar, 'wheels', 'Cars have wheels');
    });
    // #17
    test('#typeOf, #notTypeOf', function () {
      assert.fail(myCar, 'object');
      assert.fail(myCar.model, 'string');
      assert.fail(airlinePlane.wings, 'string');
      assert.fail(airlinePlane.engines, 'array');
      assert.fail(myCar.wheels, 'number');
    });
    // #18
    test('#instanceOf, #notInstanceOf', function () {
      assert.fail(myCar, Plane);
      assert.fail(airlinePlane, Plane);
      assert.fail(airlinePlane, Object);
      assert.fail(myCar.wheels, String);
    });
  });

  // -----------------------------------------------------------------------------
});

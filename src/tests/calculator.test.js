const test = require('node:test');
const assert = require('node:assert/strict');

const { calculate } = require('../calculator');

test('adds the example operands', () => {
  assert.equal(calculate(2, '+', 3), 5);
});

test('subtracts the example operands', () => {
  assert.equal(calculate(10, '-', 4), 6);
});

test('multiplies the example operands', () => {
  assert.equal(calculate(45, '*', 2), 90);
});

test('divides the example operands', () => {
  assert.equal(calculate(20, '/', 5), 4);
});

test('handles decimal addition', () => {
  assert.equal(calculate(0.1, '+', 0.2), 0.30000000000000004);
});

test('handles negative operands for subtraction', () => {
  assert.equal(calculate(-10, '-', -4), -6);
});

test('handles multiplication by zero', () => {
  assert.equal(calculate(45, '*', 0), 0);
});

test('handles division with a negative result', () => {
  assert.equal(calculate(-20, '/', 5), -4);
});

test('rejects division by zero', () => {
  assert.throws(
    () => calculate(20, '/', 0),
    {
      message: 'Division by zero is not allowed.',
    },
  );
});

test('rejects non-finite operands', () => {
  assert.throws(
    () => calculate(Number.NaN, '+', 1),
    {
      message: 'Both operands must be valid numbers.',
    },
  );
  assert.throws(
    () => calculate(1, '-', Number.POSITIVE_INFINITY),
    {
      message: 'Both operands must be valid numbers.',
    },
  );
});

test('rejects unsupported operations', () => {
  assert.throws(
    () => calculate(2, '%', 3),
    {
      message: 'Unsupported operation: %',
    },
  );
});

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  calculate,
  modulo,
  power,
  squareRoot,
} = require('../calculator');

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
    () => calculate(2, '@', 3),
    {
      message: 'Unsupported operation: @',
    },
  );
});

test('calculates the extended-operation modulo example', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(calculate(5, '%', 2), 1);
});

test('handles negative modulo operands', () => {
  assert.equal(modulo(-20, 6), -2);
});

test('handles a dividend smaller than the modulo divisor', () => {
  assert.equal(modulo(2, 5), 2);
});

test('rejects modulo by zero', () => {
  assert.throws(
    () => modulo(20, 0),
    {
      message: 'Modulo by zero is not allowed.',
    },
  );
});

test('calculates the extended-operation power example', () => {
  assert.equal(power(2, 3), 8);
  assert.equal(calculate(2, '^', 3), 8);
});

test('handles zero and negative exponents', () => {
  assert.equal(power(5, 0), 1);
  assert.equal(power(2, -2), 0.25);
});

test('calculates the extended-operation square-root example', () => {
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(0), 0);
});

test('handles a non-perfect square root', () => {
  assert.equal(squareRoot(2), Math.sqrt(2));
});

test('rejects square roots of negative numbers', () => {
  assert.throws(
    () => squareRoot(-1),
    {
      message: 'Square root of a negative number is not allowed.',
    },
  );
});

test('rejects non-finite square-root operands', () => {
  assert.throws(
    () => squareRoot(Number.NaN),
    {
      message: 'The operand must be a valid number.',
    },
  );
});

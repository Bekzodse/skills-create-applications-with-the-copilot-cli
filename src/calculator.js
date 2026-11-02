#!/usr/bin/env node

// Supported operations:
// + addition
// - subtraction
// * multiplication
// / division
// % modulo
// ^ exponentiation
// sqrt square root

function validateNumber(value) {
  if (!Number.isFinite(value)) {
    throw new Error('Both operands must be valid numbers.');
  }
}

function modulo(a, b) {
  validateNumber(a);
  validateNumber(b);
  if (b === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }
  return a % b;
}

function power(base, exponent) {
  validateNumber(base);
  validateNumber(exponent);
  return base ** exponent;
}

function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new Error('The operand must be a valid number.');
  }
  if (n < 0) {
    throw new Error('Square root of a negative number is not allowed.');
  }
  return Math.sqrt(n);
}

function calculate(left, operator, right) {
  validateNumber(left);
  validateNumber(right);

  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
    case '/':
      if (right === 0) {
        throw new Error('Division by zero is not allowed.');
      }
      return left / right;
    case '%':
      return modulo(left, right);
    case '^':
      return power(left, right);
    default:
      throw new Error(`Unsupported operation: ${operator}`);
  }
}

function main() {
  const [, , leftInput, operator, rightInput] = process.argv;

  if (operator === 'sqrt') {
    if (leftInput === undefined || rightInput !== undefined) {
      throw new Error('Usage: node src/calculator.js <number> sqrt');
    }
    console.log(squareRoot(Number(leftInput)));
    return;
  }

  if (leftInput === undefined || operator === undefined || rightInput === undefined) {
    throw new Error('Usage: node src/calculator.js <number> <+|-|*|/|%|^> <number>');
  }

  const result = calculate(Number(leftInput), operator, Number(rightInput));
  console.log(result);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, power, squareRoot };

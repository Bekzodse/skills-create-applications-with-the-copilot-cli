#!/usr/bin/env node

// Supported operations:
// + addition
// - subtraction
// * multiplication
// / division

function calculate(left, operator, right) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    throw new Error('Both operands must be valid numbers.');
  }

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
    default:
      throw new Error(`Unsupported operation: ${operator}`);
  }
}

function main() {
  const [, , leftInput, operator, rightInput] = process.argv;

  if (leftInput === undefined || operator === undefined || rightInput === undefined) {
    throw new Error('Usage: node src/calculator.js <number> <+|-|*> <number>');
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

module.exports = { calculate };

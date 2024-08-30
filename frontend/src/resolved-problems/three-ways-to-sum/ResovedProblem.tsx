// Implementation A: Iterative Approach
// This method uses a straightforward loop to iterate from 1 to n,
// adding each value to the sum. It's easy to understand and works
// well for any integer input.
let sum_to_n_a = function (n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Implementation B: Formula-Based Approach
// This method leverages the arithmetic series formula to calculate the sum
// in constant time. It's the most efficient solution in terms of performance,
// as it directly computes the result without looping or recursion.
let sum_to_n_b = function (n: number): number {
  return (n * (n + 1)) / 2;
};

// Implementation C: Recursive Approach
// This method uses recursion to sum the numbers from 1 to n.
// While recursion can be elegant, it's less efficient for very large n
// because of potential stack overflow issues. It works fine for smaller
// inputs and provides a different way of thinking about the problem.
let sum_to_n_c = function (n: number): number {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};

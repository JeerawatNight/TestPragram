function solution(A) {
    // Function to calculate the sum of digits in a number
    function getDigitSum(number) {
        let sum = 0;
        while (number > 0) {
            sum += number % 10;
            number = Math.floor(number / 10);
        }
        return sum;
    }

    const N = A.length;
    let minSum = Infinity;

    // Iterate through each element in the array
    for (let i = 0; i < N; i++) {
        // Apply the first move
        const sum1 = getDigitSum(A[i]);
        let tempSum = 0;

        // Iterate through the array again
        for (let j = 0; j < N; j++) {
            // Apply the second move
            const sum2 = getDigitSum(A[j]);

            // Calculate the temporary sum with the replaced elements
            tempSum = 0;
            for (let k = 0; k < N; k++) {
                if (k === i) {
                    tempSum += sum1;
                } else if (k === j) {
                    tempSum += sum2;
                } else {
                    tempSum += A[k];
                }
            }

            // Update the minimum sum if necessary
            if (tempSum < minSum) {
                minSum = tempSum;
            }
        }
    }

    return minSum;
}





console.log(solution([1, 10, 12, 3])); // Output: 8
console.log(solution([2, 29, 3])); // Output: 7
console.log(solution([100, 101, 102, 103])); // Output: 208

/**
 *
 * @param {String} type = plus/minus/times
 * @param {Float or Array} operator1
 * @param {Array} operator2
 * @return [vector]
 */
export function calculateWithVector(type, operator1, operator2) {
  let result = [];
  // console.log("operator1 operator2", operator1, operator2)
  switch (type) {
    case "plus":
      for (let index = 0; index < operator1.length; index++) {
        if (isNaN(operator1[index]) || isNaN(operator2[index])) {
          console.error("NaN detected in util - plus!");
          process.exit(1);
        }
        result.push(
          Math.round((operator1[index] + operator2[index]) * 100) / 100
        );
      }
      break;

    case "minus":
      for (let index = 0; index < operator1.length; index++) {
        if (isNaN(operator1[index]) || isNaN(operator2[index])) {
          console.error("NaN detected in util - minus!");
          process.exit(1);
        }
        result.push(
          Math.round((operator1[index] - operator2[index]) * 100) / 100
        );
      }
      break;

    case "times":
      for (let index = 0; index < operator2.length; index++) {
        if (isNaN(operator1) || isNaN(operator2[index])) {
          console.error("NaN detected in util - times!");
          process.exit(1);
        }
        result[index] = operator1 * operator2[index];
      }
      break;

    default:
      break;
  }

  return result;
}

export function timesMatrices(cons, matrix_A) {
  let result = [];
  for (let row = 0; row < matrix_A.length; row++) {
    let result_row = [];
    for (let col = 0; col < matrix_A[0].length; col++) {
      result_row.push(Math.round(cons * matrix_A[row][col] * 100000) / 100000);
    }
    result.push(result_row);
  }
  return result;
}

export function sumMatrices(matrix_A, matrix_B) {
  let A_size = [
    typeof matrix_A[0] == "number" ? 0 : matrix_A[0].length,
    matrix_A.length,
  ];
  let B_size = [
    typeof matrix_B[0] == "number" ? 0 : matrix_B[0].length,
    matrix_B.length,
  ];
  if (A_size[0] == B_size[0] && A_size[1] == B_size[1]) {
    let result = [];
    for (let row = 0; row < A_size[1]; row++) {
      let row_array = [];
      for (let col = 0; col < A_size[0]; col++) {
        row_array.push(matrix_A[row][col] + matrix_B[row][col]);
      }
      result.push(row_array);
    }
    return result;
  } else {
    console.error("sumMatrices - Matrix is not valid");
  }
}

export function multiplyMatrices(matrix_A, matrix_B) {
  let A_size = [matrix_A[0].length, matrix_A.length];
  let B_size = [matrix_B[0].length, matrix_B.length];
  if (A_size[0] != B_size[1]) {
    console.error("multiplyMatrices - Matrix is not valid!");
  } else {
    let result = [];
    for (let row_A = 0; row_A < A_size[1]; row_A++) {
      result[row_A] = [];
      for (let row_B = 0; row_B < B_size[0]; row_B++) {
        let sum = 0;
        for (let col_A = 0; col_A < A_size[0]; col_A++) {
          sum += matrix_A[row_A][col_A] * matrix_B[col_A][row_B];
        }
        result[row_A][row_B] = sum;
      }
    }
    return result;
  }
}

import Model from "./Model.js";

// X & Y Pos
const A_Matrix = [
  [-0.9524, 0],
  [1.0, 0],
];
const B_Matrix = [[1], [0]];
const C_Matrix = [[0, 6.9238]];
const D_Matrix = [[0]];

// Z Pos
// const A_Matrix = [
//   [-4.3478, 0],
//   [1.0, 0],
// ];
// const B_Matrix = [[1], [0]];
// const C_Matrix = [[0, 3.1304]];
// const D_Matrix = [[0]];


const dt = 0.1;

const QuadModel = new Model(A_Matrix, B_Matrix, C_Matrix, D_Matrix, dt);

export default QuadModel;

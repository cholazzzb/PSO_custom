// Just for SISO Model for now
import * as util from "./Util.js";
import DataRecorder from "./DataRecorder.js";

function Model(A, B, C, D, dt) {
  this.A_Matrix = A;
  this.B_Matrix = B;
  this.C_Matrix = C;
  this.D_Matrix = D;
  this.dt = dt;

  this.X_Matrix = [];
  this.X_Dot_Matrix = [];
  for (let row = 0; row < this.B_Matrix.length; row++) {
    this.X_Matrix.push([0]);
    this.X_Dot_Matrix.push([0]);
  }
  this.Y_Matrix = [[0]];
}

Model.prototype.setInitialState = function (initialState) {
  this.Y_Matrix = [[initialState]];
};

Model.prototype.resetState = function () {
  this.X_Matrix = [];
  this.X_Dot_Matrix = [];
  for (let row = 0; row < this.B_Matrix.length; row++) {
    this.X_Matrix.push([0]);
    this.X_Dot_Matrix.push([0]);
  }
  this.Y_Matrix = [[0]];
};

Model.prototype.calculateDynamics = function (input_u) {
  let Ax = util.multiplyMatrices(this.A_Matrix, this.X_Matrix);
  let Bu = util.multiplyMatrices(this.B_Matrix, input_u);
  this.X_Dot_Matrix = util.sumMatrices(Ax, Bu);
  let Cx = util.multiplyMatrices(this.C_Matrix, this.X_Matrix);
  let Du = util.multiplyMatrices(this.D_Matrix, input_u);
  this.Y_Matrix = util.sumMatrices(Cx, Du);

  let xdot_dt = util.timesMatrices(this.dt, this.X_Dot_Matrix);
  this.X_Matrix = util.sumMatrices(this.X_Matrix, xdot_dt);
};

Model.prototype.addController = function (Controller) {
  this.Controller = Controller;
};

/**
 * RUN SIMULATION WITH CONTROLLER
 * @param {Number} duration
 */
Model.prototype.simulate = function (duration) {
  let time = 0;
  const DR = new DataRecorder(["time", "data"]);
  while (time < duration) {
    time = time + this.dt;
    let input_u = [[this.Controller.controlInput(this.Y_Matrix[0][0])]];
    this.calculateDynamics(input_u);
    DR.addData({
      time: time,
      data: this.Y_Matrix[0][0],
    });
  }
  return DR.data.data;
};

export default Model;

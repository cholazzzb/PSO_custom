import QuadModel from "./Lib/QuadModel.js";
import PID from "./Lib/Controller/PID.js";
import DataRecorder from "./Lib/DataRecorder.js";

const DR = new DataRecorder(["time", "xPos"]);
const Controller = new PID([0.67,0,0.33], [-0.1, 0.1], QuadModel.dt);
Controller.changeSetPoint(1);

for (let iteration = 0; iteration < 100; iteration++) {
  console.log(`----- dt = ${iteration * QuadModel.dt}-----`);

  let input_u = [[Controller.controlInput(QuadModel.Y_Matrix[0][0])]];
  QuadModel.calculateDynamics(input_u);

  console.log("X , Y", QuadModel.X_Matrix, QuadModel.Y_Matrix);
  DR.addData({
    time: iteration * QuadModel.dt,
    xPos: QuadModel.Y_Matrix[0][0],
  });
}

DR.saveData("py", "./Data", "test");

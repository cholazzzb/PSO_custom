import PSO from "./Lib/PSO.js";
import QuadModel from "./Lib/QuadModel.js";

const setup = {
  total_particles: 3000,
  number_parameters: 3,
  epoch: 100,
  min_param_value: 0,
  max_param_value: 1,
  is_min: true,
  cost_function: "IAE",
  Model: QuadModel,
  simulation_time: 10, // seconds
};

const Optimization = new PSO(setup);
Optimization.run();

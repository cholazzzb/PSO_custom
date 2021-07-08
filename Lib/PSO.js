/**
 * Just for PID for now
 */

import PSOParticle from "./PSOParticle.js";
import PID from "./Controller/PID.js";
import * as util from "./Util.js";

function PSO(setup) {
  this.total_particles = setup.total_particles;
  this.number_parameters = setup.number_parameters;
  this.epoch = setup.epoch;
  this.min_param_value = setup.min_param_value;
  this.max_param_value = setup.max_param_value;
  this.is_min = setup.is_min;
  this.cost_function = setup.cost_function;
  this.Model = setup.Model;
  this.simulation_time = setup.simulation_time;
}

PSO.prototype.calculateDynamics = function () {
  // change to this.Model.calculateDynamics
};

PSO.prototype.calculateCostValue = function (setpoint_array, simulation_array) {
  let cost_value = 0;
  switch (this.cost_function) {
    case "IAE":
      simulation_array.forEach((simulation_data, simulation_index) => {
        cost_value =
          cost_value +
          Math.abs(simulation_data - setpoint_array[simulation_index]);
      });

      break;

    case "ITAE":
      simulation_array.forEach((simulation_data, simulation_index) => {
        cost_value =
          cost_value +
          (simulation_index + 1) *
            this.Model.dt *
            Math.abs(simulation_data - setpoint_array[simulation_index]);
      });
      break;

    case "ISE":
      simulation_array.forEach((simulation_data, simulation_index) => {
        cost_value =
          cost_value +
          Math.pow(simulation_data - setpoint_array[simulation_index], 2);
      });
      break;

    case "ITSE":
      simulation_array.forEach((simulation_data, simulation_index) => {
        cost_value =
          cost_value +
          (simulation_index + 1) *
            this.Model.dt *
            Math.pow(simulation_data - setpoint_array[simulation_index], 2);
      });
      break;

    default:
      break;
  }
  return cost_value;
};

PSO.prototype.createInitialPosition = function () {
  let Particles = [];
  for (
    let particle_number = 0;
    particle_number < this.total_particles;
    particle_number++
  ) {
    let particle_position = [];
    for (
      let number_parameter = 0;
      number_parameter < this.number_parameters;
      number_parameter++
    ) {
      particle_position.push(
        Math.round(
          (this.min_param_value + Math.random() * this.max_param_value) * 100
        ) / 100
      );
    }
    let newParticle = new PSOParticle(particle_position, 3, this.is_min);
    Particles.push(newParticle);
  }

  return Particles;
};

PSO.prototype.run = function () {
  let w = 0.72984;
  let c1 = 0.72984 * 2.05;
  let c2 = 0.72984 * 2.05;

  let Particles = this.createInitialPosition();
  let global_best_pos = new Array(this.number_parameters);
  let best_cost_value;
  if (this.is_min) {
    best_cost_value = 99999;
  } else {
    best_cost_value = 0;
  }

  let current_epoch = 0;
  while (current_epoch < this.epoch) {
    current_epoch++;
    Particles.forEach((Particle) => {
      this.Model.resetState();
      const Controller = new PID(
        Particle.current_position,
        [-0.1, 0.1],
        this.Model.dt
      );
      Controller.changeSetPoint(1);
      this.Model.addController(Controller);
      let sim_result = this.Model.simulate(this.simulation_time);

      // Temporary set point array
      let set_point_array = [];
      for (
        let set_point_index = 0;
        set_point_index < sim_result.length;
        set_point_index++
      ) {
        set_point_array.push(1);
      }

      let cost_value = this.calculateCostValue(set_point_array, sim_result);

      if (cost_value < best_cost_value) {
        best_cost_value = cost_value;
        global_best_pos = Particle.current_position;
      }
      if (cost_value < Particle.personal_best_cost_value) {
        Particle.updateBestCostVal(cost_value);
        Particle.updateBestPos(Particle.current_position);
      }

      let vel_inertia = util.calculateWithVector(
        "times",
        w,
        Particle.current_velocity
      );

      let personal_attraction = util.calculateWithVector(
        "times",
        c1 * Math.random(),
        util.calculateWithVector(
          "minus",
          Particle.personal_best_pos,
          Particle.current_position
        )
      );
      let global_attraction = util.calculateWithVector(
        "times",
        c2 * Math.random(),
        util.calculateWithVector(
          "minus",
          global_best_pos,
          Particle.current_position
        )
      );

      Particle.current_velocity = util.calculateWithVector(
        "plus",
        vel_inertia,
        util.calculateWithVector("plus", personal_attraction, global_attraction)
      );
      Particle.calculateNewPos();
    });
    console.log(`----- EPOCH - ${current_epoch} -----`);
    console.log(`Global Best Cost Value: ${best_cost_value}`);
    console.log(`Global Best Parameters : ${global_best_pos}`);
  }
  console.log(`----- PSO FINISHED! With EPOCH ${current_epoch} -----`);
  console.log(`Best Cost Value -> ${best_cost_value}`);
  console.log(`Best Parameters -> ${global_best_pos}`);
};

export default PSO;

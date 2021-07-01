import * as util from "./Util.js";

function PSOParticle(initial_position, total_parameters, is_min) {
  this.current_position = initial_position;
  this.current_velocity = [];
  for (
    let parameter_index = 0;
    parameter_index < total_parameters;
    parameter_index++
  ) {
    this.current_velocity.push(0);
  }
  this.personal_best_pos = initial_position;
  if (is_min) {
    this.personal_best_cost_value = 99999;
  } else {
    this.personal_best_cost_value = 0;
  }
}

PSOParticle.prototype.calculateNewPos = function () {
  this.current_position = util.calculateWithVector(
    "plus",
    this.current_position,
    this.current_velocity
  );
};

PSOParticle.prototype.updateBestPos = function (newBestPos) {
  this.personal_best_pos = newBestPos;
};

PSOParticle.prototype.updateBestCostVal = function (newBestCostVal) {
  this.personal_best_cost_value = newBestCostVal;
};

export default PSOParticle;

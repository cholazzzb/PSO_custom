function PID([Kp, Ki, Kd], [min_input, max_input], dt) {
  this.Kp = Kp;
  this.Ki = Ki;
  this.Kd = Kd;
  this.set_point = 0;

  this.min_input = min_input;
  this.max_input = max_input;

  this.dt = dt;

  this.err = 0;
  this.err_sum = 0;
  this.err_before = 0;
}

PID.prototype.changeSetPoint = function (new_set_point) {
  this.set_point = new_set_point;
};

PID.prototype.clampInput = function (input) {
  let clampedInput = input;
  if (input > this.max_input) {
    clampedInput = this.max_input;
  }
  if (input < this.min_input) {
    clampedInput = this.min_input;
  }
  return clampedInput;
};

PID.prototype.controlInput = function (current_state) {
  let controlled_input;
  this.err = this.set_point - current_state;

  controlled_input = this.clampInput(
    this.Kp * this.err +
      this.Ki * this.err_sum +
      (this.Kd * (this.err - this.err_before)) / this.dt
  );

  this.err_sum = this.err_sum + this.err;
  this.err_before = this.err;
  return controlled_input;
};

export default PID;

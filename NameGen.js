/**
 * Created by fima on 29/11/16.
 */

var NameGen = function() {
  this.start_ = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  this.char_ = '_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-';
  this.sv_ = 0;
};

module.exports = NameGen;

NameGen.prototype = {
  getNext: function() {
    var r = [];
    r.push(this.start_[this.sv_ % this.start_.length]);
    var cvo = ~~(this.sv_ / this.start_.length);
    var razr = 0;
    var step  = this.char_.length;
    var maxV = 1;
    while (cvo >= maxV) {
      cvo -= maxV;
      maxV *= step;
      razr++;
    }
    var tail = '';
    while (cvo > 0) {
      tail = this.char_[cvo % this.char_.length] + tail;
      cvo = ~~(cvo / this.char_.length);
    }
    while (tail.length < razr) {
      tail = this.char_[0] + tail;
    }
    r.push(tail);
    this.sv_++;
    return r.join('');
  }
};

import PropTypes from "prop-types";

export default class Player {
  constructor(name, rep, id) {
    this.name = String(name);
    this.rep = Number(rep);
    this.id = Number(id);
  }
  getPlayerName() {
    return this.name;
  }
  getPlayerRep() {
    return this.rep;
  }

  getPlayerNum() {
    return this.id;
  }
}
/*
Player.prototype = {
  name: PropTypes.string,
  rep: PropTypes.number,
  id: PropTypes.number,
};*/

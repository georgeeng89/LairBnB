const { Spot } = require("./models");


async function list() {
  return await Spot.findAll();
}



module.exports = {

  list

};

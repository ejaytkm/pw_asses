// const bcrypt = require('bcrypt');
// const saltRounds = 10;
// const salt = bcrypt.genSaltSync(saltRounds);
// let defaultLaravelHash = true;

// function function_name(argument) {
// body...
// }

module.exports = {
  // setHashSys: (isLaravel = true) => {
  // 	defaultLaravelHash = isLaravel;
  // },
  // hash: (value) => {
  // 	let hashedPassword = bcrypt.hashSync(value, salt);
  // 	return hashedPassword.replace('$2b$', '$2y$');
  // },
  // compare: (value, hashVal) => {
  // 	if(defaultLaravelHash) {
  // 		hashVal = hashVal.replace('$2y$', '$2b$');
  // 	} else {
  // 		hashVal = hashVal.replace('$2b$', '$2y$');
  // 	}

  // 	return bcrypt.compareSync(value, hashVal);
  // }
}

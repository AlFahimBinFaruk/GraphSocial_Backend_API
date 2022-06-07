//validate register input
const validateRegisterInput = (username, email, profileURL, password) => {
  const errors = {};
  //validate username
  if (username.trim() === "") {
    errors.username = "username cannot be empty";
  }
  //validate profileurl
  if (profileURL === "") {
    errors.username = "provide a profile url";
  }
  //validate email
  if (email.trim() === "") {
    errors.email = "email cannot be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "email is not in valid format";
    }
  }
  //validate password
  if (password === "") {
    errors.password = "Password must not empty";
  }
  //retrun final error obj
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

//validate login input
const validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

//export
module.exports = {
  validateRegisterInput,
  validateLoginInput,
};

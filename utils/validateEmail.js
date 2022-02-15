const validEmail = (email) => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return regex.test(email);
  };
  
  module.exports = validEmail;
//Success response
const sendSuccess = (response, data = {}, code=200) => {
  const resp = {
    data,
    success: true,
    status:code
  };
  return response.status(code).json(resp);
};

//Fail response
const sendError = (response,  message = 'Invalid requests', code = 400) => {
  const resp = {
    success: false,
    message,
  };
  return response.status(code).json(resp);
};

module.exports = { sendSuccess, sendError };

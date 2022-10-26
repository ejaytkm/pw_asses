const util = { // util object
  ParseError: (errMsg) => {
    // [GENERAL]
    if (
      errMsg.response &&
      errMsg.response.data.error &&
      errMsg.response.data.error_description
    ) {
      return {
        status: errMsg.response.status,
        code: errMsg.code,
        message: errMsg.response.data.error_description,
      };
    }

    if (errMsg.message) {
      return {
        status: 405,
        code: "ERROR_CLIENT",
        message: errMsg.message,
      }
    }

    // [AUTHS]
    // [GRAPHQL]
    // [EXPRESS-API]

    return {
      status: 405,
      code: "UNEXPECTEDE_UNHANDLED_ERROR",
      message:
        "Sorry there seems to be an unexpected error, we're unable to process your request. Please try again later.",
    };
  },
};

export default util;

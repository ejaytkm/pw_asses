const util = { // util object
  ParseError: (error) => {
    console.log("@ParseError", error);

    return "Sorry there seems to be an unexpected error, we're unable to process your request. Please try again later.";
  },
};

export default util;

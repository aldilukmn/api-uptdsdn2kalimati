import ResponseType from "./type";

const createDefaultResponse = (
  code: number,
  response: 'success' | 'fail',
  message: string,
  result?: any
): ResponseType => {
  return {
    status: {
      code,
      response,
      message,
    },
    result
  }
};

export default createDefaultResponse;
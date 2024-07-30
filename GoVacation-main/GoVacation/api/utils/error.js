// this file is for error handling
// instead of writing error for each api call we created this file for error handling
// here we are creating the error in a new format 
// if any error comes while calling an api then the error is tranformed here and sent to the client


export const createError = (status, message) => {
    const error = new Error();
    error.status = status;
    error.message = message;
    return error;
}

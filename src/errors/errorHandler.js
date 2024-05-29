class errorHandler extends Error {
  constructor(message = "errorHandler") {
    super(message);
    this.name = "errorHandler";
    this.status = 400;
  }
}

export default errorHandler;

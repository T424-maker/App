class NotFoundError extends Error {
  constructor(recourceType, id) {
    super(`${recourceType} with id ${id} not found`);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

export default NotFoundError;

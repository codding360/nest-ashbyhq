export class InternalError extends Error {
  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.name = 'InternalError';
  }
} 
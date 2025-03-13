export class EmailNameError extends Error {
  constructor(message: string = 'Either email or name must be provided') {
    super(message);
    this.name = 'EmailNameError';
  }
} 
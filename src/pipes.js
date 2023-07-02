export const PIPE_INTERRUPTOR = Symbol("pipe_interruptor");

export class Pipe {
  constructor(value) {
    this.value = value;
  }

  value;

  to = (callBack) => {
    const result = callBack(this.value);

    if (result === PIPE_INTERRUPTOR) {
      return new InterruptedPipe(this.value);
    }

    return new Pipe(result);
  };

  eachTo = (callBack) => {
    const result = this.value.map(callBack);
    return new Pipe(result);
  };
}

export class InterruptedPipe {
  constructor(value) {
    this.value = value;
  }

  value;

  to = (_) => this;

  eachTo = (_) => this;
}

export const pipe = (value) => {
  return new Pipe(value);
};

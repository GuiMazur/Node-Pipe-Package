/**
 * @interface PipeInterruptor an object capable of interrupting a pipe.
 */
export declare interface PipeInterruptor extends Symbol {}

/**
 * @constant PIPE_INTERRUPTOR a value that can be returned from a *.to* callback to interrupt a pipe flux.
 */
export declare const PIPE_INTERRUPTOR: PipeInterruptor;

/**
 * @interface IPipe generic interface for different pipe types.
 */
export declare interface IPipe<T> {
  /**
   * @member {T} value The value contained at this point of the pipe flux.
   */
  value: T;

  /**
   * Adds a step to a pipe flux by passing the value in this pipe through a function.
   * @param {(prop: T) => E} callBack the function to pass the value through.
   * @returns {InterruptedPipe<T> | Pipe<E>} a new step in the flux with the value returned from the callback function.
   */
  to: <E>(callBack: (value: T) => E) => InterruptedPipe<T> | Pipe<E>;

  /**
   * Adds a step to a pipe flux by passing each item of *value* (given that *value* is an array) through a function.
   * @param {(prop: T) => E} callBack the function to pass the array entries through.
   * @returns {InterruptedPipe<T> | Pipe<E>} a new step in the flux with the transformed array.
   */
  eachTo: <U, E>(
    callback: (value: U) => E
  ) => T extends U[] ? InterruptedPipe<T> | Pipe<E[]> : never;
}

/**
 * @interface InterruptiblePipe intermediary interface for generalizing normal and interrupted pipes.
 */
export declare type InterruptiblePipe<E, T> = E extends PipeInterruptor
  ? InterruptedPipe<T>
  : Pipe<E>;

/**
 * @class Pipe<T> class that allows passing a value through multiple functions, like a factory line.
 */
export declare class Pipe<T> implements IPipe<T> {
  constructor(value: T);

  value: T;

  to: <E>(callBack: (value: T) => E) => InterruptiblePipe<E, T>;

  eachTo: <U, E>(
    callback: (value: U) => E
  ) => T extends U[] ? InterruptiblePipe<E[], T> : never;
}

/**
 * @class InterruptedPipe<T> a pipe that ignores *.to* calls called on it.
 * @hideconstructor
 */
export declare class InterruptedPipe<T> implements IPipe<T> {
  constructor(value: T);

  value: any;

  /**
   * Dummy method that will accept calls, but do nothing to this pipe's value.
   */
  to: (_: any) => this;

  /**
   * Dummy method that will accept calls, but do nothing to this pipe's value.
   */
  eachTo: <U, E>(callback: (_: any) => E) => T extends U[] ? this : never;
}

/**
 * Creates a new pipe flux.
 *
 * @param {T} value the parameter to pass through the pipe.
 * @returns {Pipe<T>} the newly created pipe, with <value> running through it.
 */
export declare const pipe: <T>(value: T) => Pipe<T>;

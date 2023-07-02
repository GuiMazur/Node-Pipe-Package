# pipeflux

An elegant and type-safe implementation of the pipe operator.

## Overview

This package implements an easy on the eyes implementation of the pipe operator pattern.

Imagine there's a certain value you want to 'pass through' multiple transformations.
Normally, you'd do something like this:

```ts
uppercase(stringify(double(2)));
```

In this case, the behaviour flows backwards... your eyes need to jump to the very right to find the deeply nested `2`, and then retrace the steps back.

Of course, if you're used to doing this, and with only three methods it looks not that big... but consider this:

```f#
2 |> double |> stringify |> uppercase;
```

Streamlined, LTR, just fantastic, right?

This library implements this using the `pipe` global function.

```ts
pipe(2).to(double).to(stringify).to(uppercase).value; //faucet, lol
```

This pipe implementation allows for the pipe flow to be interrupted midway, and has some handy methods for dealing with Arrays, too.

## Install

Depending on your package manager your install command may differ... but the package's name is `pipeflux`.

```bash
npm install pipeflux
yarn add pipeflux
```

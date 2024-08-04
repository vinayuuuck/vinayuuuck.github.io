---
title: "Stochastic Rounding"
date: "2024-07-31"
description: "A brief introduction to stochastic rounding and its applications."
---

### Introduction

In this article, I am going to discuss the implementation of stochastic rounding,
the effects of the same in the context of the harmonic series and how it compares
to standard rounding as well as the compensated summation algorithm in handling
the problem of stagnation.

Quoting from Croci et al. (2021):

> Stochastic rounding randomly maps a real number x to one of the nearest values in a finite precision number system.
> The probability of choosing either of these two numbers is 1 minus their relative distance to x.

Which means that:

$$
\mathrm{SR}(x) = \begin{cases}
    \lfloor x \rfloor & \text{with probability } 1 - ((x - \lfloor x \rfloor) / \text{distance between \lfloor x\rfloor and \lceil x\rceil}) \\
    \lceil x \rceil & \text{with probability } (x - \lfloor x \rfloor) / \text{distance between \lfloor x\rfloor and \lceil x\rceil}
\end{cases}
$$

### Implementation of binary32 stochastic rounding

The following function takes as input a double precision floating point number and returns a single precision floating point number after applying stochastic rounding:

```c
float SR_alternative(double x)
  get a random number between 0 and 1
  if random number < (x - floor(x)) / (ceil(x) - floor(x))
    return ceil(x) where ceil(x) is the smallest integer greater than or equal to x
  else
    return floor(x) where floor(x) is the largest integer less than or equal to x
```

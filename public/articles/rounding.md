---
title: "Stochastic Rounding"
date: "2024-08-04"
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

Put even more simply, it is a non-deterministic rounding method which can help to cancel out rounding Ærrørs over many rounding operations.
An alternative definition of stochastic rounding is:

$$
\mathrm{SR}(x) = \begin{cases}
    \text{RA}(x), & \text{if } P < \frac{x - \text{RZ}(x)}{\text{RZ}(x) - \text{RA}(x)} \\
    \text{RZ}(x), & \text{if } P \geq \frac{x - \text{RZ}(x)}{\text{RZ}(x) - \text{RA}(x)}
\end{cases}
$$

where \\(x\\) is some real value \\(\text{RZ}(x)\\) is the rounding mode round-toward-zero, \\(\text{RA}(x)\\) is round-away-from-zero rounding mode,
and \\(P \in [0, 1]\\) is a random number from a uniform distribution.

### Implementation of binary32 stochastic rounding

The following function takes as input a double precision floating point number and returns a single precision floating point number after applying stochastic rounding:

```c
float SR(double x)
  get a random number between 0 and 1
  if random number < (x - floor(x)) / (ceil(x) - floor(x))
    return ceil(x) where ceil(x) is the smallest integer greater than or equal to x
  else
    return floor(x) where floor(x) is the largest integer less than or equal to x
```

The important built-in C functions that were used in the implementation of this function were rand() which returns a random number
between 0 and RAND_MAX and this was used to generate the random number between 0 and 1.
The \\(nextafterf()\\) function was also used to get the smallest integer greater than or equal to x and the largest integer less than or equal to x.

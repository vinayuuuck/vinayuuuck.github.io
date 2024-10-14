---
title: "Stochastic Rounding"
date: "2024-08-04"
description: "A brief introduction to stochastic rounding and its applications."
---

### Introduction

If you are using a laptop or a desktop computer right now, do me a favor and open up a terminal and type in the following command:

```bash
python3 -c "print(1.0 + 1e-16)"
```

If you are surprised by the output, don't worry. In fact, your python interpreter is working exactly as it should,
as specified by the IEEE 754 standard for floating point arithmetic.
If you want to know why that is so and how a weird alternative rounding method called stochastic rounding can help,
read on.

In this article, I am going to discuss floating point arithmetic,
an alternative called stochastic rounding and its implementation,
the effects of the same in the context of the harmonic series and how it compares
to standard rounding as well as the compensated summation algorithm in handling
the problem of stagnation.

### Floating Point Arithmetic

So, what even is rounding? It is the transformation of a number from its actual value to
a value/number with fewer digits, in order to make it easier to work with.
Suffice to say, if the number is already sufficiently represented in same or fewer digits than required,
then rounding does not change the value of the number.

How does this relate to floating point arithmetic? In floating point arithmetic, numbers are represented in a binary format
with a fixed number of bits for the mantissa and the exponent. This means that not all real numbers can be represented exactly
in floating point arithmetic. This is where rounding comes in. When a real number is represented in floating point arithmetic,
it is rounded to the nearest representable number.

### Stochastic Rounding

Quoting from Croci et al. (2021)[1]:

> Stochastic rounding randomly maps a real number x to one of the nearest values in a finite precision number system.
> The probability of choosing either of these two numbers is 1 minus their relative distance to x.

Put more simply, it is a non-deterministic rounding method which can help to cancel out rounding Ærrørs over many rounding operations.
In a more formal and mathematical sense, stochastic rounding can be defined as follows:

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
float SR(double x){
  float closest = (float)x;
  float down, up;
  double p = (double)rand() / (double)RAND_MAX;
  if (closest > x) {
    down = nextafterf(closest, -INFINITY);
    up = closest;
  }
  else {
    down = closest;
    up = nextafterf(closest, INFINITY);
  }
  if (p < (x - down) / (up - down)) {
    return up;
  }
  else {
    return down;
  }
}
```

The important built-in C functions that were used in the implementation of this function were rand() which returns a random number
between 0 and RAND_MAX and this was used to generate the random number between 0 and 1.
The \\(nextafterf()\\) function was also used to get the smallest integer greater than or equal to x and the largest integer less than or equal to x.

### References

1. Croci, M., Fasi, M., Higham, N. J., Mary, T., & Mikaitis, M. (2022). Stochastic rounding: Implementation, error analysis and applications. Royal Society Open Science, 9(211631). [DOI](https://doi.org/10.1098/rsos.211631)

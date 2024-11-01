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
If you want to know why that is so and how an alternative rounding method called stochastic rounding can help,
read on.

In this article, I am going to discuss stochastic rounding and its implementation,
the effects of the same in the context of the harmonic series and how it compares
to standard rounding as well as the compensated summation algorithm in handling
the problem of stagnation.

### Stochastic Rounding

As a very high level overview - floating point arithmetic is a method of representing real numbers in a computer, since it is impossible to accurately
represent every single real number on the number line on a computer. A very useful primer on Floating Point Arithmetic can be found [here](https://nhigham.com/2020/05/04/what-is-floating-point-arithmetic/).

What it is important for us to realize is:

> In finite precision arithmetic the result of an elementary arithmetic operation does not generally lie in the underlying number system, F, so it must be mapped back into F by the process called rounding.

- Higham (2020)[1]

There are many _deterministic_ methods for rounding a real number, but we will be talking about something a little weirder-stochastic rounding.

Quoting from Croci et al. (2021)[2]:

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

Note that this particular flavour of stochastic rounding is a little different. The other form rounds the value up or down with equal probability(1/2),
but this form takes into account the distance between the value and its up or down representations.

### Implementation of binary32 stochastic rounding

The following function takes as input a double precision floating point number and returns a single precision floating point number after applying stochastic rounding:

```c
float stocrounding(double val){
  float closest = (float)val;
  double p = (double)rand()/ (double)RAND_MAX; // Get a random value between 0 and 1
  float down, up;

  if(closest>val){
    down = nextafterf(closest, -INFINITY);
    up = closest;
  }else {
    up = nextafterf(closest, INFINITY);
    down = closest;
  }

  if(p<((val-down)/(up-down))){
    return up;
  }else{
    return down;
  }
}
```

The important built-in C functions that were used in the implementation of this function were rand() which returns a random number
between 0 and RAND_MAX and this was used to generate the random number between 0 and 1.
The \\(nextafterf()\\) function was also used to get the smallest integer greater than or equal to x and the largest integer less than or equal to x.

### Usefulness

Stochastic Rounding forces the rounding errors to be random variables with **zero mean**.

The following proof is taken from Connolly et al.(2020) [3]

Recall the definition of SR:

$$
\mathrm{SR}(x) = \begin{cases}
    \text{RA}(x), & \text{if } P < \frac{x - \text{RZ}(x)}{\text{RZ}(x) - \text{RA}(x)} \\
    \text{RZ}(x), & \text{if } P \geq \frac{x - \text{RZ}(x)}{\text{RZ}(x) - \text{RA}(x)}
\end{cases}
$$

Since \\(P\\) is a random variable, \\(SR(x)\\) and \\(\delta = x - \text{SR}(x)\\) are also random variables, 
the expected value of \\(SR(x)\\) would be:

$$
\mathbb{E}[\text{SR}(x)] = P(RA(x)) + (1-P)(RZ(x)) = \frac{(x - RZ(x))RA(x) + (RA(x) - x)RZ(x)}{RA(x) - RZ(x)}
$$

Which results in:

$$
\mathbb{E}[\text{SR}(x)] = x
$$

And so:

$$
\mathbb{E}[\delta] = \mathbb{E}[x - \text{SR}(x)] = 0
$$

**The expected value of the rounding error is zero.**


The benefit of stochastic rounding is that it maintains some information that would otherwise be lost in deterministic rounding methods.
Verified in many studies, SR is shown to have a better error bound than its more popular alternate Round to Nearest(RN) while
computing the inner product of two vectors, multiplying matrices and vectors, as well as summation.

### Testing π
We will now test our implementation by rounding pi(as represented in double precision) using stochastic rounding to binary32 precision.

```c
int main(int argc, char** argv){
  double sample = M_PI;
  const long int tries = 5000000;

  double rounded_val = 0;
  float rounded = 0;
  for (int i=1; i<=tries; i++) {
    rounded = stocrounding(sample);
    rounded_val += rounded;
  }
  rounded_val = rounded_val/tries;

  printf("Value being rounded in binary64:                         %.60f \n", sample);
  printf("Represenation in binary32:                               %.60f \n", (float)sample);
  printf("Average of all rounded values using stochastic rounding: %.60f \n", rounded_val);
}
```

The output of the above code is as follows:

```bash
Value being rounded in binary64:                         3.141592653589793115997963468544185161590576171875000000000000 
Represenation in binary32:                               3.141592741012573242187500000000000000000000000000000000000000 
Average of all rounded values using stochastic rounding: 3.141592653529119427702198663610033690929412841796875000000000
```

### References

1. Higham, N. J. (2020). What is Stochastic Rounding? [Blog post](https://nhigham.com/2020/07/07/what-is-stochastic-rounding/)

2. Croci, M., Fasi, M., Higham, N. J., Mary, T., & Mikaitis, M. (2022). Stochastic rounding: Implementation, error analysis and applications. Royal Society Open Science, 9(211631). [DOI](https://doi.org/10.1098/rsos.211631)

3. Connolly, M. P., Higham, N. J., & Mary, T. (2020). Stochastic rounding and its probabilistic backward error analysis (MIMS EPrint: 2020.12).

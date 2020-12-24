---
title: 基于黎曼几何的多分类算法
categories:
  - 信号处理
tags:
  - 流形表示
  - 信号分类
mathjax: true
excerpt: 介绍两个基于黎曼几何的分类算法：基于黎曼均值的最小距离(MDRM)和基于切空间的线性判别分析(TSLDA)
urlname: MDRM-TSLDA
date: 2020-12-03 11:00:00
---

## 写在前面

17年暑假的时候入门了SPD流形，现在打算慢慢拾起来。介绍一个传统机器学习到流形上衍生的文章。

- MDRM算法可以看出流形版本的1-NN，不过距离和中心都需要用黎曼度量来计算
- TSLDA算法是将流形点映射到均值点切空间上，欧式的判别分析就可以直接使用

## SPD矩阵流形基础

### SPD矩阵

对称正定矩阵定义为
$$
\mathcal S_n^{++} = \{P\in\mathbb R^{n\times n}| \boldsymbol{u}^TP \boldsymbol u \succ 0, \forall \boldsymbol u \in \mathbb R^n\}
$$
对矩阵$P\in \mathcal S_n^{++}$进行特征分解
$$
P=U \text{diag}(\sigma_1,\ldots,\sigma_n)U^T
$$
则矩阵指数算子和对数算子定义如下
$$
\begin{aligned}
\exp(P) &= U \text{diag}(\exp(\sigma_1),\ldots,\exp(\sigma_n))U^T\\
\log(P) &= U \text{diag}(\log(\sigma_1),\ldots,\log(\sigma_n))U^T
\end{aligned}
$$

### 黎曼度量

$\mathcal S_n^{++}$是一个可微的黎曼流形，任意点$P\in \mathcal S_n^{++}$的导数构成的切空间$T_P$是一个对称矩阵空间。

在切空间任取两点$S_1,S_2\in T_p$，可选择局部内积来定义SPD流形$\mathcal S_n^{++}$上的度量(natural metric)
$$
\left\langle S_1, S_2\right\rangle_P = \text{tr}(S_1P^{-1}S_2P^{-1})
$$
该内积自然诱导出切空间的范数
$$
\|S\|_P^2 = \left\langle S, S\right\rangle_P = \text{tr}(SP^{-1}SP^{-1})
$$
当$P=I$时，该范数等价于Frobenius范数，即$\|S\|_F^2 = \left\langle S, S\right\rangle_I$。

### 黎曼距离

设流形上曲线$\Gamma(t):[0,1]\to\mathcal S_n^{++}$的起点$\Gamma(0)=P_1$和终点$\Gamma(1)=P_2$，则曲线的长度可表示为积分形式
$$
L(\Gamma(t))=\int_0^1\|\dot\Gamma(t)\|_{\Gamma(t)} dt
$$
其中$\dot\Gamma(t)\in T_{\Gamma(t)}$为切向量，$\|\cdot\|_{\cdot}$为切空间的范数。流形上连接$P_1$和$P_2$的最短长度曲线称为测地线。上述内积和范数可诱导出流形$\mathcal S_n^{++}$上的测地线距离，即黎曼距离。
$$
\delta_R^2 (P_1,P_2) = \|\log (P_1^{-1}P_2)\|_F^2 = \sum_{i=1}^n \log^2 \lambda_i
$$
其中$\lambda_i$是$P_1^{-1}P_2$的第$i$个实特征值。该距离具有如下特性：

- $$
  \delta_R (P_1,P_2) = \delta_R (P_2,P_1)
  $$

- $$
  \delta_R (P_1,P_2) = \delta_R (P_1^{-1},P_2^{-1})
  $$

- $$
  \delta_R (P_1,P_2) = \delta_R (W^TP_1W,W^TP_2W),\forall W\in \text{Gl(n)}
  $$

最后一个性质验证了仿射不变性(affine invariance)，因此该黎曼度量也称为仿射不变黎曼度量(Affine Invariant Riemannian Metric, AIRM)。

### 投影映射



任取一点$P\in\mathcal S_n^{++}$，切空间$T_P$由点$P$处的切向量$S_i$与$S_i$投影至流形点$P_i=\text{Exp}_P(S_i)$之间的关系如下：
$$
\begin{aligned}
&\text{Exp}_P(S_i)=P_i=P^{1/2}\exp\left(P^{-1/2} S_i P^{-1/2}\right)P^{1/2}\\
&\text{Log}_P(P_i)=S_i=P^{1/2}\log\left(P^{-1/2} P_i P^{-1/2}\right)P^{1/2}
\end{aligned}
$$
切空间是具有欧式度量的，因此到点$P$的黎曼距离可用点$P$处切空间上的欧式距离来计算
$$
\begin{aligned}
\delta_R (P,P_i) &= \|\text{Log}_P(P_i)\|_P = \|S_i\|_P \\
&=\|\text{upper}(P^{-1/2}\text{Log}_P(P_i)P^{-1/2})\|_2
\end{aligned}
$$
其中$\text{upper}(\cdot)$是一个矩阵化向量的算子，保留对称矩阵的上三角并向量化，且对角元赋权值$1$而非对角元赋权值$\sqrt{2}$。

### 均值

- 欧式均值(算术均值)


$$
\mathfrak{A}(P_1,\ldots,P_I)=\arg\min_{P\in\mathcal S_n^{++}}\sum_{i=1}^I \delta_E^2 (P,P_i) = \frac{1}{I}\sum_{i=1}^I P_i
$$


- 黎曼均值(几何均值)

$$
\mathfrak{G}(P_1,\ldots,P_I)=\arg\min_{P\in\mathcal S_n^{++}}\sum_{i=1}^I \delta_R^2 (P,P_i)
$$

尽管该问题理论上局部最小值存在且唯一，但没有闭解，因此需要使用迭代算法求解该最小化问题。

## 基于黎曼均值的最小距离

- 计算每个类信号协方差矩阵的几何均值点$P_\mathfrak{G}^{(k)}$

- 计算新样本点的协方差矩阵$P$与均值点最小距离从而判断类别信息

本质上就是SPD流形上的1-NN算法。算法流程如下：

![](MDRM-TSLDA/Alg-MDRM.png)

## 基于切空间的线性判别分析

首先将数据协方差矩阵投影至切空间上，那么选哪个点更合适？文章给出用全体协方差矩阵的黎曼均值点$P_\mathfrak{G}=\mathfrak{G}(P_i)$来构造切空间，投影点为
$$
s_i = \text{upper}(P_\mathfrak{G}^{-1/2}\text{Log}_{P_\mathfrak{G}}(P_i)P_\mathfrak{G}^{-1/2})
$$
这就完成了流形点到切空间的映射，映射具有保距性，流形的几何关系在切空间都得以保留。此外，流形上度量的计算需要复杂的矩阵分解，而欧式空间距离相对而言简单得多。因此用切空间近似黎曼几何具有非常大的潜力。下面是切空间映射算法流程：

![](MDRM-TSLDA/Alg-TSLDA.png)

投影至切空间后，传统的欧式分类算法可直接使用，文章使用经典的线性判别分析(LDA)来完成投影点的分类。

## 小结

上面介绍了流形上的分类算法，其中很大篇幅都是介绍流形上的操作，因此掌握了这些基础后可以尝试进行新的改进。不过鉴于文章是2012年发表的，后面已经有很多改进算法，能想到的和不能想到的估计都已经做遍了，所以简单的小改进是没多大意义的。这也反过来说明优秀的文章不仅仅需要找到合适的切入点，还需要符合时代的潮流。

## References

[^1]:A. Barachant, S. Bonnet, M. Congedo and C. Jutten, Multiclass Brain–Computer Interface Classification by Riemannian Geometry, in *IEEE Transactions on Biomedical Engineering*, vol. 59, no. 4, pp. 920-928, April 2012, doi: 10.1109/TBME.2011.2172210.


---
title: 基于Frechet均值的Grassmann判别分析
categories:
  - 信号处理
tags:
  - 流形表示
  - 判别分析
mathjax: true
excerpt: 利用流形降维、投影度量、Frechet均值提出判别分析从欧式空间到Grassmann判别的推广。
urlname: Frechet-mean-Grassmann-discriminant-analysis
date: 2020-12-31 18:30:00
---

## 写在前面

前面介绍了一篇Grassmann流形上的投影度量学习[^1]，下面介绍一个关于判别分析的Grassmann流形推广工作[^2]。

## 线性判别分析

判别准则为
$$
\arg\min_{a}\frac{a^TS_ba}{a^TS_wa}
$$
其中类间散度$S_b$和类内散度$S_w$分别为
$$
\begin{aligned}
S_b&=\sum_{k=1}^c n_k(\mu^{(k)}-\mu)(\mu^{(k)}-\mu)^T\\
S_w&=\sum_{k=1}^c \sum_{i=1}^{n_k} n_k(x_i^{(k)}-\mu^{(k)})(x_i^{(k)}-\mu^{(k)})^T
\end{aligned}
$$
通过简单的变形，分子分母可换为
$$
\begin{aligned}
a^TS_ba&=\sum_{k=1}^c n_ka^T(\mu^{(k)}-\mu)(\mu^{(k)}-\mu)^Ta\\
&=\sum_{k=1}^c n_k\|a^T\mu^{(k)}-a^T\mu\|_2^2\\
&=\sum_{k=1}^c n_k\delta_E(a^T\mu^{(k)},a^T\mu)\\
a^TS_wa&=\sum_{k=1}^c \sum_{i=1}^{n_k} n_k(x_i^{(k)}-\mu^{(k)})(x_i^{(k)}-\mu^{(k)})^T\\
&=\sum_{k=1}^c \sum_{i=1}^{n_k} n_k\|a^Tx_i^{(k)}-a^T\mu^{(k)}\|_2^2\\
&=\sum_{k=1}^c \sum_{i=1}^{n_k} n_k\delta_E(a^Tx_i^{(k)},a^T\mu^{(k)})\\
\end{aligned}
$$

## Grassmann流形投影

类似于PML一样，对流形点$X\in\mathcal G(p,D)$，使用投影映射$f(X,A)=A^TX$实现降维$\mathcal G(p,D)\to\mathcal G(p,d)$，然而需要注意$A^TX\notin\mathcal G(p,d)$，需要取$A^TX$的正交基矩阵$\text{orth}(A^TX)$作为投影矩阵，记为$(A^TX^\prime)$。

Grassmann流形可嵌入到由对称正半定矩阵组成的空间中。对于点$X\in\mathcal G(p,D)$，其投影嵌入$\Pi(X)=XX^T\in\mathcal S_+^D$，而对称正半定矩阵空间$\mathcal S_+^D$可以Frobenius范式度量距离，所以Grassmann流形的投影度量为
$$
\begin{aligned}
\delta_P(X_1,X_2)&=\frac{1}{\sqrt 2} \|\Pi(X_1)-\Pi(X_2)\|_F^2\\
&=\frac{1}{\sqrt 2} \|X_1X_1^T-X_2X_2^T\|_F^2
\end{aligned}
$$
有了距离后可计算$n$个样本在Grassmann流形上的Frechet均值点
$$
M^\star = \arg\min_M \sum_{i=1}^n \delta_P(X_i,M)
$$
该问题具有解析解：$\sum_{i=1}^nX_iX)i^T$的$p$个最大的特征向量。

## 基于Frechet均值的Grassmann判别分析

类似于欧式空间的线性判别分析，下面给出Grassmann流形上的判别分析。判别准则需同时满足以下两个条件：

- 最大化类间距离

- 最小化类内距离

对应改变线性判别分析目标函数

- 使用Frechet均值$M$代替欧式空间的几何均值$\mu$

- 使用投影距离$\delta_P$代替欧式空间的直线距离$\delta_E$
- 使用流形间的投影$f(X,A)$代替欧式降维$a^Tx$

$$
\begin{aligned}
d_b&=\sum_{k=1}^c n_k\delta_P(f(M^{(k)},A),f(M,A))\\
&=\sum_{k=1}^c n_k\|A^TM^{\prime(k)}M^{\prime(k)T}A-A^TM^{\prime}M^{\prime T}A\|_F^2\\
d_w&=\sum_{k=1}^c \sum_{i=1}^{n_k} n_k\delta_P(f(X_i^{(k)},A),f(M^{(k)},A))\\
&=\sum_{k=1}^c n_k\|A^TX_i^{\prime(k)}X_i^{\prime(k)T}A-A^TM^{\prime(k)}M^{\prime(k)T}A\|_F^2\\
\end{aligned}
$$

对应的判别模型为
$$
\max_A \frac{d_b}{d_w}
$$

## 迭代优化

使用QR分解的正交矩阵部分作为投影点的正交部分。下面以$A^TX_{i}^{\prime (k)}$为例
$$
A^TX_i^{(k)}=Q_{x_i}R_{x_i}
$$
显然有$Q_{x_i}=A^TX_i^{\prime (k)}$，其中$X_i^{\prime (k)}=X_i^{(k)}R_{x_i}^{-1}$。此外，$Q_{x_i}$与$A^TX_i^{(k)}$具有相同的正交子空间。

记
$$
\begin{aligned}
B^{(k)}&=M^{\prime (k)}{M^{\prime (k)T}}-M^{\prime } M^{\prime T}\\
Q_{ik}&=X_i^{\prime (k)}{X_{i}^{\prime (k)T}}-M^{\prime (k)}{M^{\prime (k)T}}\\
\end{aligned}
$$
有
$$
\begin{aligned} 
 d_b&=\sum_{k=1}^K n_k\| A^TM^{\prime (k)}M^{\prime (k)T}A-A^TM^{\prime} M^{\prime T}A\| _F^2\\ 
 &=\sum_{k=1}^K n_k\| A^T B^{(k)}A\|_F^2\\ 
 &=\sum_{k=1}^K n_k\text{tr}(A^TB^{(k)}AA^TB^{(k)}A) \\
d_w &=\| A^T X_i^{\prime (k)} X_{i}^{\prime (k)T}A-A^TM^{\prime (k)}M^{\prime (k)T}A\| _F^2\\ 
&=\sum_{k=1}^K \sum_{i=1}^{n_k}n_k\| A^TQ_{ik}A\| _F^2\\ 
&=\sum_{k=1}^K \sum_{i=1}^{n_k}n_k \text{tr} (A^TQ_{ik}AA^TQ_{ik}A) 
\end{aligned}
$$
因此可以考虑固定内部$A^{(t-1)}A^{(t-1)T}$作为已知，迭代外部的$A$，直至收敛可解决判别模型。记
$$
\begin{aligned} 
{\widetilde{B}}^{(t-1)}= & {} \sum _{k=1}^{K}n_k{B^{(k)}}A^{(t-1)}{A^{(t-1)T}}B^{(k)} \\ 
{\widetilde{Q}}^{(t-1)}= & {} \sum _{k=1}^{K}\sum \limits _{i=1}^{n_k}n_k Q_{ik}A^{(t-1)}{A^{(t-1)T}}Q_{ik} 
\end{aligned}
$$
在第$t$次迭代使用第$t-1$次迭代的结果$A^{(t-1)}$来求解如下最大化问题
$$
\max_A\frac{\text{tr}(A^T{\widetilde{B}}^{(t-1)}A)}{\text{tr}(A^T{\widetilde{Q}}^{(t-1)}A)}
$$
该问题为一个迹比率优化问题，采用文章[^3]的方法可高效求解判别模型。整体算法流程图如下：

![](Frechet-mean-Grassmann-discriminant-analysis/alg-FMGDA.png)

## 小结

最近有在关注流形方面的文章，找了几个感兴趣的，后面会陆续整理出来。这篇文章[^2]是拿着投影度量工具改造线性判别分析。不过始终觉得投影点取正交子空间这个操作有些gap，有没有一些映射直接保证流形结构？其次，文章改完之后对算法描述较少，这个里面有上升空间。

## References

[^1]: [Grassmann流形上的投影度量学习](https://pxxyyz.com/posts/Projection-Metric-Learning-Grassmann-Manifold/)
[^2]: Yu H , Xia K , Jiang Y , et al. Fréchet mean-based Grassmann discriminant analysis[J]. Multimedia Systems, 2020, 26(1):63-73.
[^3]: Ngo T T , Bellalij M , Saad Y . The Trace Ratio Optimization Problem for Dimensionality Reduction[J]. Siam Journal on Matrix Analysis & Applications, 2015, 31(5):2950-2971.


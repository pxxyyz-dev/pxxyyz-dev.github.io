---
title: 异方差主成分分析
categories:
  - 信号处理
tags:
  - 优化
mathjax: true
excerpt: 介绍异方差PCA算法(Heteroskedastic PCA)
urlname: Heteroskedastic-PCA
date: 2020-08-01 18:00:00
---

## 写在前面

张安如老师[^1]到我们学校做过一次报告，记录下感兴趣的异方差主成分分析(Heteroskedastic PCA)算法[^2]。

## 异方差主成分分析

### 主成分分析

PCA的核心思想是从含噪数据中恢复出低秩成分，那么这个噪声通常是同方差的，其观察信号满足如下正态分布
$$
Y_1,\ldots, Y_n \overset{iid}{\sim}N\left(\mu, \Sigma_0 + \sigma^2 I_p\right)
$$
其中协方差$\Sigma_0 = U\Lambda U^\top$是一个对称的低秩矩阵，尖峰协方差模型也可写成和的形式
$$
Y_k = X_k + \varepsilon_k,\quad 
\begin{cases}
& X_k\overset{iid}{\sim} N(\mu, \Sigma_0) \\
& \varepsilon_k\overset{iid}{\sim} N(0, \sigma^2 I_p)
\end{cases}
$$
这里的一个关键假设是误差是同方差的(homoskedastic)，即每个$\varepsilon_k$服从球对称的高斯分布($\sigma^2 I_p$)。然而实际应用中噪声通常是异方差的(heteroskedastic)，即噪声扰动大小在数据矩阵中的各个元素之间变化很大。因此下面考虑适用范围的推广。

### 对角删除的奇异值分解

假设受到高斯噪声的方差不一致，从而考虑广义的尖峰协方差模型
$$
\begin{aligned}
& Y = X + \varepsilon,\quad \mathbb{E} X = \mu, \quad \mathbb{E}\varepsilon = 0,\\
& \text{Cov}(X) = \Sigma_0, \quad \text{Cov}(\varepsilon) = \text{diag}(\sigma_1^2,\ldots, \sigma_p^2)
\end{aligned}
$$
其中低秩部分$X$与噪声$\varepsilon = ((\varepsilon)_1,\ldots, (\varepsilon)_p)^\top$相互独立。

如果采取传统的主成分分析，首先计算中心化的样本协方差矩阵
$$
\hat{\Sigma} = \frac{1}{n-1}\sum_{k=1}^n (Y_k-\bar{Y})(Y_k-\bar{Y})^\top.
$$
注意到
$$
\mathbb{E}\hat{\Sigma} = \Sigma_0 + \text{diag}(\sigma_1^2,\ldots, \sigma_p^2)
$$

- $\sigma_1^2,\ldots, \sigma_p^2$相等时，$\mathbb{E}\hat{\Sigma}$与$\Sigma_0$的特征向量相同
- $\sigma_1^2,\ldots, \sigma_p^2$不等时，$\mathbb{E}\hat{\Sigma}$与$\Sigma_0$的主成分(特征向量)不等

这说明异方差的噪声虽然仅影响了协方差的对角元素，但奇异值分解得到的奇异向量存在很大的差异性，因此传统的奇异值分解无法满足异方差噪声的情况。

既然噪声仅影响矩阵的对角线元素，那么能不能想办法去无视或者修正这一影响来进行正确的分解？为此，对角删除的奇异值分解(**diagonal-deletion SVD**)算法将Gram矩阵的对角线设置为零，然后执行奇异值分解。

对任意方阵$A$，记$\Delta(A)$为$A$对角线元素均为$0$的矩阵，$D(A)$为$A$非对角线元素均为$0$的矩阵，则$A = \Delta(A) + D(A)$。那么传统的SVD分解可表示为
$$
\tilde{U}=\text{SVD}_r(\hat{\Sigma})
$$
而对角删除的SVD则表示为
$$
\tilde{U}=\text{SVD}_r(\Delta(\hat{\Sigma}))
$$
不过用零替代对角元的做法可能会带来更大的扰动，另一方面无法保证有效性。

### 异方差主成分分析

**异方差主成分分析**则考虑使用非对角线元素的奇异值分解来重构对角线元素，考虑如下非凸的优化问题：
$$
\hat{U}=\text{SVD}_r(\hat{M}), \quad \text{where}\quad  \hat{M} = \arg\min_{\hat{M}: \text{rank}(\hat{M}) \leq r} \left\|\Delta(\hat{M} - \hat{\Sigma})\right\|.
$$
使用如下迭代方法求解

- 初始化$N^{(0)} = \Delta(\hat{\Sigma})$

- 循环直至收敛或达到最大迭代数
  - 对$N^{(t)}$进行SVD分解

  $$
  N^{(t)} = U^{(t)}\Sigma^{(t)}(V^{(t)})^\top = \sum_{i} \lambda_i^{(t)} u_i^{(t)} (v_i^{(t)})^\top
  $$

  - 设置秩$r$的近似
    $$
    \tilde{N}^{(t)} = \sum_{i=1}^r \lambda_i^{(t)} u^{(t)}_i (v^{(t)}_i)^\top
    $$

  - 用$\tilde{N}^{(t)}$的对角元替换到$N^{(t)}$，更新$N^{(t+1)} = D(\tilde{N}^{(t)}) + \Delta(N^{(t)})$
    $$
    N^{(t+1)}_{ij} = \left\{\begin{array}{ll}
      	N^{(t)}_{ij} = \hat{\Sigma}_{ij}, & i\neq j;\\
      	\tilde{N}^{(t)}_{ij}, & i = j.
      	\end{array}\right.
    $$
    
  - 更新$t = t +1$

### 算法流程

![](heteroskedastic-PCA/HeteroPCA.png)

## 小结

本文的想法很新颖，根据非对角线迭代更新对角线元素，这种做法表现出信息之间存在某种联系，那么除对角线以外是否还能恢复其他结构的元素？这个有待思考。

## 参考文献

[^1]:http://pages.stat.wisc.edu/~anruzhang/index.html
[^2]: Zhang A, Cai T T, Wu Y, et al. Heteroskedastic PCA: Algorithm, Optimality, and Applications[J]. arXiv: Statistics Theory, 2018.


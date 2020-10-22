---
title: 奇异谱分析的特殊性与共性
categories:
  - 信号处理
tags:
  - 奇异谱分析
  - 综述
mathjax: true
excerpt: 介绍最近大牛Nina Golyandina写的关于SSA的综述
urlname: Particularities-commonalities-SSA
date: 2020-10-10 11:00:00
---

## 写在前面

最近对SSA的了解越来越深入，之前只是将其当作一种简单的信号分解算法，分解加重构。但是历史上这个方向的研究很久远了，很多领域都可以看到SSA的身影，我选择了几个感兴趣的问题记录一下，如果想深入了解，可以看Nina Golyandina的书。本文源于综述[^1]。

## 平稳时间序列

对于平稳的随机序列$\xi_t$，设$\mu=\mathbb E \xi_t$，则自协方差矩阵
$$
C(|s-t|) = K(s,t) = \mathbb E (\xi_s-\mu)(\xi_t-\mu)
$$
仅依赖于一元变量$|t-s|$。离散情况下，自协方差矩阵具有Toeplitz结构。在SSA中，协方差矩阵大小由嵌入长度$L$(远小于$K=N-L+1$)来确定。

对于平稳时间序列，时滞协方差矩阵$\mathbf C = \mathbf X\mathbf X^\mathrm T/K$接近于Toeplitz矩阵，但不是精确的Toeplitz矩阵。因此可以采用对角平均的形式构造出一个精确的Toeplitz矩阵$\widetilde{C}=\{\widetilde{c}_{ij}\}_{i,j = 1}^{L}$，其中
$$
\widetilde{c}_{ij} = \frac{1}{N-|j-i|} \sum\limits_{k=1}^{N-|j-i|} x_k x_{k+|j-i|}
$$
对于不同的自协方差矩阵，分解步骤均可表示成$\mathbf X=\sum_m P_m(\mathbf X^\mathrm T P_m)^\mathrm T$，区别在于特征向量$P_m$的选取

- Basic SSA: $P_m$是$\mathbf C$的特征向量

- Toeplitz SSA: $P_m$是$\widetilde{C}$的特征向量

Toeplitz SSA仅在平稳时间序列分析下有效，大多应用于气候学中的数据分析。值得一提的是，Toeplitz SSA与光谱估计有关。

## 结构化低秩近似

 考虑一类噪声模型${\mathsf X}={\mathsf S}+{\mathsf N}$，其中${\mathsf X}=(x_1, \ldots, x_{N})$是秩为$r$的信号矩阵，${\mathsf N}$是噪声。在F范数下引入两个投影：$\Pi_r: \mathbb R^{L\times K} \mapsto \mathcal M_r$和$\Pi_\mathcal H: \mathbb R^{L\times K} \mapsto \mathcal H$，其中$\mathcal M_r$是秩不超过$r$的矩阵，$\mathcal H$是Hankel矩阵。

SSA的信号提取流程如下：
$$
\begin{aligned}
{\mathsf X} \xrightarrow[\fbox{L}]{\mathcal T}
{\bf X} = \begin{pmatrix}
x_1 & x_2 & \ldots & x_{K}\\
x_2 & x_3 & \ldots & x_{K+1}\\
\vdots & \vdots & \ddots & \vdots\\
x_{L} & x_{L+1} & \ldots & x_{N}
\end{pmatrix} 
\xrightarrow[\fbox{r}]{\mathrm{SVD}: (\sqrt{\lambda_m}, U_m, V_m),\ {\Pi_r}}
\end{aligned}
$$

$$
\begin{aligned}
\begin{cases}
{\mathcal L}_r = \text{span}(U_1,\ldots, U_r)\\
\quad\text{ is signal space}\\
\Pi_r\ \text{is the projector on}\ {\mathcal L}_r\\
\widehat{\mathbf S} = \sum_{i=1}^{r} U_i ({\mathbf X}^{\mathrm T} \, U_i)^{\mathrm T}=\Pi_r {\mathbf X}
\end{cases}
\xrightarrow{\Pi_{\mathcal H}} \widetilde{\mathbf S} = \left( \begin{smallmatrix}
\widetilde{s}_1 & \widetilde{s}_2 & \ldots & \widetilde{s}_{K}\\
\widetilde{s}_2 & \widetilde{s}_3 & \ldots & \widetilde{s}_{K+1}\\
\vdots & \vdots & \ddots & \vdots\\
\widetilde{s}_{L} & \widetilde{s}_{L+1} & \ldots & \widetilde{s}_{N}
\end{smallmatrix} \right)
\xrightarrow{\mathcal T}^{-1}
\widetilde{\mathsf S}.
\end{aligned}
$$

这些流程可以通过多个算子简明地表示
$$
\widetilde{\mathsf S}=\mathcal{T}^{-1}\Pi_\mathcal{H}\Pi_r\mathcal{T} \mathsf X
$$
$\widetilde{\mathsf S}$实际上通常不是有限秩(finite rank)，SLRA方法是一类计算秩$r$的估计$\widetilde{\mathsf S}$。

- 通过低秩Hankel矩阵求解近似问题

$$
\min_{\mathbf S \in \mathcal M_r\cap \mathcal H}\|\mathbf X - \mathbf S\|_\mathrm F
$$

最有名的方法称为Cadzow迭代，结果为$\mathsf S^{(m)}=\mathcal{T}^{-1}(\Pi_\mathcal{H}\Pi_r)^{m}\mathcal{T} \mathsf X$。

- 使用秩不大于$r$的时间序列的一个参数化的集合$\mathcal D_r$

$$
\min\limits_{\mathsf S\in
\mathcal D_r} \|\mathsf X-\mathsf S\|_w
$$

该问题可通过加权最小二乘法求解。如果噪声是高斯的，加权最小二乘与极大似然估计一致。

对比SSA与SLRA发现：

- SSA速度快，SLRA耗时长
- SLRA可以提供比SSA更精确的参数估计
- 对于仅近似（或局部）满足模型的信号，SLRA不起作用而SSA有效
- SLRA的结果可简化参数估计和预测的过程

## 滤波器

线性FIR滤波器定义为
$$
f_n (\mathsf X_{\infty}) = \sum_{i=-m_1}^{m_2} b_i x_{n-i}
$$
如果输入序列$\mathsf X_{\infty}=(\ldots,x_{-1},x_0,x_1,\ldots)$具有形式$x_n=\cos(2\pi\omega n)$，则
$$
f_n(\mathsf X) = A(\omega) \cos(2\pi\omega n + \phi(\omega))
$$
其中幅频响应$A(\omega)$是FIR滤波器的主要特征。

设SSA的嵌入长度$L\leq(N+1)/2$，令$U=U_i$是轨道矩阵$\mathbf X$的特征向量，则第$m$个元重构序列在区间$[L, N-L+1]$上具有如下形式
$$
\tilde{x}_n^{(m)}=\sum_{j=-(L-1)}^{L-1}\left(\sum_{k=1}^{L-|j|} u_k u_{k+|j|} / L\right) x_{n-j}, \;\; L\le n\le N-L+1.
$$
这个滤波器称为中间点滤波器(middle-point filter)。上式的幅频响应$A(\omega)$由$U$的周期谱图决定，这也解释了为什么可以根据特征向量$U_i$的频率特性进行分组。此外，当$L$(连同$N$)趋向于无穷大时，滤波器的带宽就会变窄。这意味着增加$L$可以得到更精细的分解。

末端点滤波器(last-point filter)用来序列最后一点的重构，因此与预测相关联。其本质并不是一个滤波器，仅仅用来重构一个点的信息
$$
\tilde{x}_N^{(m)}=u_L \sum_{i=0}^{L-1} u_{i+1} x_{N-m}.
$$
然而，它是唯一的重建滤波器，是因果关系(causal)。

## 对异常值的鲁棒性

上面提到SSA的信号提取过程可以用两个投影算子表示
$$
\widetilde{\mathsf S}=\mathcal{T}^{-1}\Pi_\mathcal{H}\Pi_r\mathcal{T} \mathsf X
$$
这两个投影算子都是在F范数意义下的，因此SSA对异常值的处理可以通过使用其他范数下的投影算子来改进。

- 加权投影

对不同的采样点赋予不同的权重，降低疑似异常值的点权值。在加权F范数下进行投影可提高鲁棒性。迭代过程中权值的选择可使用LOWESS非参数光滑法或基于残差的迭代重加权最小二乘法(IRLS)。

具有权值的SSA需要将传统的SVD改进为斜SSA(oblique SSA)，包括两层循环：内循环计算加权SVD和外循环根据残差重新计算权值。因此算法通常很耗时。特殊的矩阵结构也可以考虑进去。

- $\ell_1$投影

在$\ell_1$范数下构造投影近似问题。对应的$\ell_1$-SVD不存在闭解，除了使用耗时的迭代算法求解最优解，还可以考虑次优解来降低计算量。

使用对角中值(medians)来代替对角均值(averages)可得到Hankel矩阵的$\ell_1$投影，然而计算复杂度仍不理想。

对异常值鲁棒相关的问题是异常值检测(outlier detection)，通常使用变化点检测方法(change-point detection)。剔除异常点后可使用标准的SSA来分析和分解信号。

## 先验 or 后验

增加假设或先验是模型改进的常见手段，但在SSA中，如果显然谢谢用得不对，那么产生的结果完全出错。最频繁使用的先验假设是时间序列的平稳性，对应的框架是Toeplitz SSA。另一个可能使用的先验是趋势项可用多项式表示。特别是线性趋势，理论和实验表明用投影算子的SSA能改善趋势项的提取质量。

后验，又称为自举法(bootstrap)，为任何由SSA估计的特征(例如信号本身或信号的参数)构建引导置信区间。此类方法包括基于SSA分解的信号和噪声参数的估计，然后模拟由估计信号加上模拟噪声组成的样本，可以构建置信度和预测区间。

## References

[^1]: Golyandina N. Particularities and commonalities of singular spectrum analysis as a method of time series analysis and signal processing[J]. Wiley Interdisciplinary Reviews: Computational Statistics, 2020, 12(4): e1487.


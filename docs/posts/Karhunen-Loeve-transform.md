---
title: Karhunen-Loeve变换
categories:
  - 信号处理
tags:
  - 奇异谱分析
  - Karhunen-Loeve变换
mathjax: true
excerpt: 介绍Karhunen-Loeve transform
urlname: Karhunen-Loeve-transform
date: 2020-10-13 16:00:00
---

## 写在前面

在奇异谱分析的综述里看到有专门一块介绍Karhunen-Loeve变换，所以就仔细看了下相关的介绍，发下张贤达老师的矩阵书[^1]里有一小节介绍了离散版本的Karhunen-Loeve变换，比wiki[^2]上用函数的角度解释的清楚，比国外教材[^3]也详细，搬运了一下，其实本质上与主成分分析一致，熟悉特征分解的都能看懂。

## 正交基的选取

信号可使用新的正交基函数表示，并期望具有一些优良性质：

- 编码
  - 系数的稀疏性
  - 系数集中了原信号的功率
- 滤波
  - 变换后统计不相关
  - 降低滤波器的复杂度
  - 提高信噪比
- 最小均方误差

## 最小均方误差

对信号$\boldsymbol x=[x_1,\ldots,x_M]^T$使用酉变换$\boldsymbol w=Q^H \boldsymbol x$，其中$Q^{-1}=Q^H$。记为$Q\in\mathcal U_M$，其中$\mathcal U_M$表示为$M$阶酉矩阵。则$\boldsymbol x$可表示称系数$\boldsymbol w$的线性组合
$$
\boldsymbol x=Q\boldsymbol w=\sum_{i=1}^M w_i \boldsymbol q_i
$$
下面使用前$m$个系数$w_1,\ldots,w_m$来逼近信号$\boldsymbol x$
$$
\hat {\boldsymbol x}=\sum_{i=1}^m w_i \boldsymbol q_i
$$
对应的误差
$$
\boldsymbol e_m = \boldsymbol x - \hat {\boldsymbol x} = \sum_{i=m+1}^M w_i \boldsymbol q_i
$$
对正交基单位化约束，即$\boldsymbol q_i^H \boldsymbol q_i=1$。记自相关矩阵$R_x=E\{\boldsymbol x \boldsymbol x^H\}$。均方误差
$$
\begin{aligned}
E_m & = E\{\boldsymbol e_m^H \boldsymbol e_m\}\\
& = \sum_{i=m+1}^M \boldsymbol q_i^H E\{|w_i|^2\} \boldsymbol q_i\\
& = \sum_{i=m+1}^M E\{|w_i|^2\} \boldsymbol q_i^H \boldsymbol q_i\\
& = \sum_{i=m+1}^M E\{|w_i|^2\}\\
& = \sum_{i=m+1}^M \boldsymbol q_i^H R_x \boldsymbol q_i
\end{aligned}
$$
其中最后一个等式是利用$w_i = \boldsymbol q_i^H \boldsymbol x$得到。因此最小化均方误差对应于如下优化问题
$$
\min_{Q\in\mathcal U_M} \sum_{i=m+1}^M \boldsymbol q_i^H R_x \boldsymbol q_i\quad \text{s.t.}\quad \boldsymbol q_i^H \boldsymbol q_i=1,\forall i
$$

### Karhunen-Loeve变换

构造拉格朗日函数
$$
\mathcal L(\boldsymbol q_i,\lambda_i)=\sum_{i=m+1}^M \boldsymbol q_i^H R_x \boldsymbol q_i + \sum_{i=m+1}^M \lambda_i(1-\boldsymbol q_i^H \boldsymbol q_i)
$$
分别对变量$\boldsymbol q_i$求偏导并设为$0$，即$\frac{\partial \mathcal L}{\partial \boldsymbol q_i^*}=0$，可得
$$
R_x \boldsymbol q_i = \lambda_i \boldsymbol q_i, i=m+1,\ldots,M
$$
该变换就是Karhunen-Loeve变换。这个特征方程表示取前$m$个单位正交基近似原信号时，最小的方差对应的乘子与正交基分别是信号自相关矩阵$R_x$的后$M-m$个特征值与特征向量，那么前$m$个正交基应该是$R_x$的前$m$个特征向量。

### 离散Karhunen-Loeve变换

对自相关矩阵$R_x$进行特征值分解
$$
R_x=\sum_{i=1}^M \lambda_i \boldsymbol u_i \boldsymbol u_i^H
$$
由于特征值或奇异值的能量分布通常会集中于少数几个，因此可选择$K$个大特征值，从而忽略其他$M-K$个较小的特征值。对应的$k$阶离散Karhunen-Loeve展开，即信号的近似表示
$$
\hat {\boldsymbol x}=\sum_{i=1}^K w_i \boldsymbol u_i
$$
记$\mathbf U=[\boldsymbol u_1,\ldots,\boldsymbol u_K]$由$K$个特征值对应的特征向量组成，有$\boldsymbol w=\mathbf U^H \boldsymbol x$。均方误差可用特征值表示
$$
E_K = \sum_{i=K+1}^M \boldsymbol u_i^H R_x \boldsymbol u_i = \sum_{i=K+1}^M \boldsymbol u_i^H \left(\sum_{i=1}^M \lambda_i \boldsymbol u_i \boldsymbol u_i^H\right) \boldsymbol u_i = \sum_{i=K+1}^M \lambda_i
$$
这些较小的特征值保证均方误差$E_K$很小。

### 离散Karhunen-Loeve反变换

一旦获得了正交基$\boldsymbol u_1,\ldots,\boldsymbol u_K$与对应的系数$w_1,\ldots,w_K$，可重构出信号$\hat {\boldsymbol x}=\sum_{i=1}^K w_i \boldsymbol u_i$。该方式可应用至信号的编码与解码。如果发射方与接收方提前都具有特征向量的信息，只需传输$K$个编码系数即可，这样不仅保证数据的安全，也降低发射数据的长度。

## 与主成分分析的异同

来自wiki对Karhunen-Loeve变换的解释

> "The above expansion into uncorrelated random variables is also known as the Karhunen–Loève expansion or Karhunen–Loève decomposition. The empirical version (i.e., with the coefficients computed from a sample) is known as the Karhunen–Loève transform (KLT), principal component analysis, proper orthogonal decomposition (POD), Empirical orthogonal functions (a term used in meteorology and geophysics), or the Hotelling transform."

说明Karhunen-Loeve变换与主成分分析联系密切，区别只在于处理的矩阵：

- PCA分析协方差矩阵

- KLT分析相关矩阵

因为样本均值为$0$时，协方差阵等于自相关矩阵，两个方法本质上等价。但是样本均值不为$0$时，协方差矩阵等于去均值后信号的自相关矩阵。如同下面的解释：

> PCA depend on the scaling of the variables and applicability of PCA is limited by certain assumptions made in its derivation. The claim that the PCA used for dimensionality reduction preserves most of the information of the data is misleading. Indeed, without any assumption on the signal model, PCA cannot help to reduce the amount of information lost during dimensionality reduction, where information was measured using Shannon entropy.
>
> The coefficients in the KLT are random variables and the expansion basis depends on the process. In fact, the orthogonal basis functions used in this representation are determined by the covariance function of the process. KLT adapts to the process in order to produce the best possible basis for its expansion.it reduces the total mean-square error resulting of its truncation. Because of this property, it is often said that the KL transform optimally compacts the energy. The main implication and difficulty of the KL transformation is computing the eigenvectors of the linear operator associated to the covariance function, which are given by the solutions to the integral equation.
>
> The integral equation thus reduces to a simple matrix eigenvalue problem, which explains why the PCA has such a broad domain of applications.

借用博客[^4]的观点：

- KLT是一种对于连续或离散的随机过程都可进行的变换

- PCA则是KLT处理离散情况的算法

- 定义上KLT比PCA广泛

- 而实际上PCA比KLT实用

## Karhunen-Loeve定理

令$X_t$为概率空间$(\Omega,F,\mathbf P)$上的零均值且平方可积的随机过程，在闭的有界区间$[a,b]$内，具有连续的协方差函数$K_X(s,t)$，令$\boldsymbol e_k$是平方可积空间$L^2([a,b])$上由线性算子$T_{K_X}$的特征函数构成的正交基，对应的特征值记为$\lambda_k$，则

- $K_X(s,t)$是一个Mercer核函数：$K_X(s,t)=\sum_{k=1}^\infty \lambda_k \boldsymbol e_k(s) \boldsymbol e_k(t)$
- $X_t$可由特征函数$\boldsymbol e_k(t)$展开表示$X_t=\sum_{k=1}^\infty Z_k \boldsymbol e_k(t)$
- 无穷级数关于$t$在$L^2$收敛$S_N=\sum_{k=1}^N Z_k \boldsymbol e_k(t) \to 0,t\to0$
- 变量则可表示为$X_t$在$\boldsymbol e_k(t)$上的投影$Z_k=\int_a^b X_t\boldsymbol e_k(t) dt$
- 零均值性$E(Z_k)=0,\forall k\in \mathbb N$
- 不相关性$E(Z_i Z_j)=\delta_{ij}\lambda_j,\forall i,j\in \mathbb N$

## 小结

- Karhunen-Loeve变换与小波变换、傅里叶变换不一样的地方在于自适应的正交基函数。
- 信号处理领域对应Karhunen-Loeve变换，机器学习领域对应主成分分析。
- 线性Karhunen-Loeve变换可以看作离散Karhunen-Loeve变换的连续版本，但是非线性Karhunen-Loeve变换就看不太懂了。
- wiki上的东西非常赞，推荐有数学功底的人看，后面的例子与应用都具有工科特色，后续还会继续更新。

## References

[^1]:张贤达. 矩阵分析与应用(第二版)[M]. 清华大学出版社, 2013.
[^2]: [wiki: Karhunen–Loève theorem]([https://en.wikipedia.org/wiki/Karhunen%E2%80%93Lo%C3%A8ve_theorem](https://en.wikipedia.org/wiki/Karhunen–Loève_theorem))
[^3]: Kamisetty Ramamohan Rao and Pat Yip. 2000. The Transform and Data Compression Handbook. CRC Press, Inc., USA.
[^4]:[【学习笔记】K-L变换和PCA的区别](https://blog.csdn.net/oldmonkeyyu_s/article/details/45766543)




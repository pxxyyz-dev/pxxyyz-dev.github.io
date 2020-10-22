---
title: Cadzow迭代法
categories:
  - 信号处理
tags:
  - 奇异谱分析
mathjax: true
excerpt: 介绍SSA中的Cadzow迭代法
urlname: Cadzow-iterative-method
date: 2020-10-13 16:00:00
---

## 写在前面

前面综述里遇到了一个Cadzow迭代法，是用来解决低秩Hankel矩阵近似问题的著名算法，原文是1988年的[^1]，现在衍生出了一些变体。下面借助文献[^2]介绍Cadzow迭代，当然还是在奇异谱分析领域下的。

## 线性递推关系

源信号$\mathbb S~=~(s_1, \ldots, s_N)$由线性递推关系(linear recurrence relation, LRR)产生
$$
s_n = \sum_{i = 1}^{r} a_i s_{n-i}, \quad n = r + 1, \ldots, N;\  a_r\neq 0.
$$
上式也可表示成参数形式
$$
s_n = \sum_i P_i(n) \exp(\alpha_i n) \cos(2 \pi \omega_i n + \psi_i),
$$
其中$P_i(n)$是$n$阶多项式。

去噪问题，即从观察信号$\mathbb X = \mathbb S + \mathbb N$恢复出源信号$\mathbb S$，可使用基于子空间的方法解决。设定嵌入长度$L$，可得到轨迹矩阵
$$
\mathbf S = \begin{pmatrix}
s_1 & s_2 & \ldots & s_K \\
s_2 & s_3 & \ldots & s_{K + 1} \\
\vdots & \vdots & \vdots & \vdots \\
s_L & s_{L + 1} & \ldots & s_N
\end{pmatrix}\in \mathcal H
$$
若信号$\mathbb S$由$r$阶LRR产生，则$\text{rank} (\mathbf S) = r$。根据ESPRIT方法，$\mathbf S$的列空间，即信号的子空间，可提供参数$\alpha_i$和$\omega_i$的估计。

## 近似问题

令$\mathbf X$为$\mathbb X$的轨道矩阵，则去噪问题可转化为如下秩不超过$r$的Hankel矩阵近似问题
$$
\min_{\substack{\text{rank}（\mathbf Y） \le r \\ \mathbf Y \in \mathcal H}}\|\mathbf X - \mathbf Y\|^2_\mathrm F
$$
该问题是一类结构化低秩近似问题。Cadzow迭代法由Hankel矩阵空间和秩不大于$r$的矩阵空间交替投影组成。此类问题的目标函数并不是单模态的(unimodal)，而且向全局最小值的收敛性也不能保证，但是具有很广泛的研究背景。更进一步，上述近似问题可等价转化为如下加权近似问题。
$$
\min_{\substack{\mathbb Y: \text{rank}(\mathbf Y) \le r \\ \mathbf Y \in \mathcal H}}\sum_{i = 1}^N w_i(x_i - y_i)^2
$$
其中$\mathbf Y$是序列$\mathbb Y$的轨道矩阵，加权系数表示如下
$$
w_i = \begin{cases}
i & \text{for $i = 1, \ldots, L-1,$}\\
L & \text{for $i = L, \ldots, K,$}\\
N - i + 1 & \text{for $i = K + 1, \ldots, N$}
\end{cases},
$$

## 迭代的常规步骤

Hilbert空间$\mathsf X$具有内积$\langle \cdot, \cdot \rangle$，矩阵空间$\mathcal H$是$\mathsf X$的线性子空间，子集$\mathcal M$关于数乘是闭的(即$\forall\alpha,\exists\mathbf z \in \mathcal M\Rightarrow\alpha \mathbf z\in \mathcal M$)。注意$\mathcal M$不一定是线性空间或凸集。点$\mathbf x$到集合$\mathcal H~ \cap~\mathcal M$的投影问题表示如下
$$
\min_{\mathbf y \in \mathcal H \cap \mathcal M}\|\mathbf x - \mathbf y\|
$$
设到$\mathcal H$和到$\mathcal M$的投影分别是$\Pi_{\mathcal H}$和$\Pi_{\mathcal M}$。注意$\Pi_{\mathcal M}$不是唯一定义的(not uniquely defined)，在这种模棱两可的情况下，选择任何最接近的点作为投影点。这两个投影显然都是正交的，对于后者，Pythagorean等式成立，即$\forall\mathbf x \in \mathsf X$，有$\|\mathbf x\|^2~=~\|\mathbf x~-~\Pi_\mathcal M \mathbf x\|^2~+~\|\Pi_\mathcal M \mathbf x\|^2$。

下面回到用于求解投影问题的交替投影迭代法
$$
\mathbf y_{k+1}=\Pi_\mathcal H \Pi_{\mathcal M} \mathbf y_{k}, \quad\text{where}\quad \mathbf y_{0}=\mathbf x.
$$
收敛结论

- 当$k \to +\infty$，$\|\mathbf y_k - \Pi_{\mathcal M}\mathbf y_k\| \to 0, \|\Pi_{\mathcal M}\mathbf y_k - \mathbf y_{k+1}\| \to 0$

- 记闭球$B_1=\{\mathbf z: \|\mathbf z\|~\le~1\}$，若$\mathcal M \cap B_1$是紧集，则存在收敛的子序列$\mathbf y_{i_1}, \mathbf y_{i_2}, \ldots$，使得其极限$\mathbf y^*\in\mathcal M \cap \mathcal H$。

- $$
  \|\mathbf y_k - \Pi_{\mathcal M} \mathbf y_k\| \ge \|\Pi_{\mathcal M} \mathbf y_k - \mathbf y_{k + 1}\|\ge \|\mathbf y_{k+1} - \Pi_{\mathcal M} \mathbf y_{k + 1}\|.
  $$

下面用这一步骤应用至降秩Hankel矩阵的近似问题。令$\mathsf X = \mathbb R^{L\times K}$，Hankel矩阵空间$\mathcal H \subset \mathbb R^{L\times K}$，秩不超过$r$的集合$\mathcal M = \mathcal M_r\subset \mathbb R^{L\times K}$，则交替投影的迭代如下
$$
\mathbf Y_{k+1}=\Pi_\mathcal H \Pi_{\mathcal M_r} \mathbf Y_{k},\quad\text{where}\quad\mathbf Y_{0}=\mathbf X \in \mathbb R^{L\times K}.
$$

## 投影的表达形式

首先引入加权范数，用非负权矩阵定义加权F范数
$$
\langle\mathbf Y, \mathbf Z\rangle_\mathbf M = \sum_{l = 1}^L \sum_{k = 1}^K m_{l, k} y_{l, k} z_{l, k}.
$$
加权范数记为$\|\mathbf X\|^2 = \|\mathbf X\|^2_\mathbf M = \sum_{l = 1}^L \sum_{k = 1}^K m_{l, k} x^2_{l, k}$。

- 投影$\Pi_\mathcal H$

Hankel矩阵可通过加权对角平均求得。令$\widehat{\mathbf Y}=\Pi_\mathcal H \mathbf Y$，则
$$
	\hat{y}_{ij} = \frac{\sum_{l,k:\, l+k=i+j} m_{l,k} y_{l,k}}{\sum_{l,k:\, l+k=i+j} m_{l,k}}.
$$

- 投影$\Pi_{\mathcal M_r}$

从简单的等权值($m_{ij}=1$)情况出发，令$\Pi_r=\Pi_{\mathcal M_r}$，则投影$\Pi_{r} \mathbf Y$通过SVD来计算。设$\mathbf Y = \mathbf U \mathbf{\Sigma} \mathbf V^\mathrm T$，对奇异值矩阵进行截断$\mathbf{\Sigma}_r = (\sigma^r_{l k})$，当$i = j, i \le r$时$\sigma^r_{i j}=\sigma_i$，否则$\sigma^r_{i j}=0$。投影可表示为$\Pi_{r} \mathbf Y  = \mathbf U \mathbf{\Sigma}_r \mathbf V^\mathrm T$。

下面考虑一般的权重矩阵$\mathbf M$。固定$\mathbf M$后
$$
\forall \mathbf Z\in \mathbb R^{L\times K},\exists \mathbf C\in\mathcal S^{K\times K}_+,\text{s.t.}\|\mathbf Z\|_\mathbf M^2 = \text{tr}(\mathbf Z \mathbf C \mathbf Z^\mathrm T)
$$
注意，此处仅说明了矩阵$\mathbf C$的存在性，并未说明其怎么构造。假设矩阵$\mathbf C$的列空间包含矩阵的$\mathbf Y$列空间，则
$$
\Pi_{\mathcal M_r} \mathbf Y = (\Pi_r \mathbf B) (\mathbf O_\mathbf C^{\mathrm T})^\dagger,
$$
其中$\mathbf C = \mathbf O_\mathbf C^{\mathrm T}\mathbf O_\mathbf C, \mathbf B = \mathbf Y \mathbf O_\mathbf C^{\mathrm T}$。实际上满足条件$\|\mathbf Z\|_\mathbf M^2 = \text{tr}(\mathbf Z \mathbf C \mathbf Z^\mathrm T)$的矩阵$\mathbf C$和矩阵$\mathbf M$具有特殊的结构形式。下面用一种迭代的方式构造矩阵序列$\mathbf Y _k$来逼近$\Pi_{\mathcal M_r} \mathbf Y$。
$$
\mathbf Y_{k+1} = \Pi_r(\mathbf Y \odot \mathbf M + \mathbf Y_{k} \odot (\mathbf Q -  \mathbf M))
$$
其中$\mathbf Q \in \mathsf R^{L \times K}$是元素全为$1$的矩阵，初始化矩阵$\mathbf Y_0 = \mathbf Y$。当权值$\mathbf M$的元素为二值矩阵时，即$m_{ij}$等于0或1，该迭代本质上是EM算法。从形式上看，在权重为零的位置上，$\mathbf Y$中的数值并不重要。但是，这些值会影响算法的收敛速度和极限值。

## 向量内积与矩阵内积

向量形式的加权最小二乘目标为
$$
\min _{\mathbb Y \in \mathsf X_N^r}f_q(\mathbb Y) = \sum \limits_{i=1}^N q_i(x_i - y_i)^2
$$
序列$\mathbb X = (x_1, \ldots, x_N) \in \mathsf X_N$与轨道矩阵$\mathbf X = (\hat x_{l,k}) \in \mathcal H$之间存在一一映射关系$\mathcal T(\mathbb X) = \mathbf X$，其中$\hat x_{l, k} = x_{l + k - 1}$。首先引入一种向量的半内积$\langle\mathbb Y,\mathbb Z\rangle_q = \sum_{i = 1}^N q_i y_i z_i$，对应向量形式的半范数版本最小二乘为
$$
\min _{\mathbb Y \in \mathsf X_N^r}f_q(\mathbb Y) = \|\mathbb Y-\mathbb X\|_q^2
$$
下面将向量形式的加权最小二乘问题向矩阵形式推广。同样给出两个矩阵形式的半内积
$$
\begin{aligned}
\langle\mathbf Y,\mathbf Z\rangle_{1,\mathbf M} &= \langle\mathbf Y,\mathbf Z\rangle_{\mathbf M} = \sum_{l = 1}^L \sum_{k=1}^K m_{l,k} y_{l,k} z_{l,k}\\
\langle\mathbf Y,\mathbf Z\rangle_{2,\mathbf C} &= \text{tr}(\mathbf Y \mathbf C \mathbf Z^\mathrm T)
\end{aligned}
$$
注意，当矩阵$\mathbf M$为全$1$阵，矩阵$\mathbf C$为单位阵时，这两个半内积退化到标准矩阵内积。下面给出半内积的性质。

- 令$\mathbf Y = \mathcal T(\mathbb Y),\mathbf Z = \mathcal T(\mathbb Z)$，则$\langle\mathbb Y,\mathbb Z\rangle_q= \langle \mathbf Y,\mathbf Z \rangle_{1,\mathbf M}$的充要条件是
  $$
  q_i = \sum_{\substack{1 \le l \le L \\ 1 \le k \le K \\ l+k-1=i}} m_{l,k}.
  $$

- $\langle\mathbf Y,\mathbf Z\rangle_{1,\mathbf M}= \langle\mathbf Y,\mathbf Z\rangle_{2,\mathbf C}$的充要条件是$\mathbf C=\text{diag}(c_1,\ldots,c_K)$为对角阵，且$m_{l,k}=c_k$。

有了这些性质，矩阵形式的加权最小二乘问题表示如下
$$
\min_{\mathbf Y \in \mathcal M_r \cap \mathcal H}f_\mathbf M(\mathbf Y) = \|\mathbf X-\mathbf Y\|^2_{1,\mathbf M} = \sum_{l = 1}^L \sum_{k=1}^K m_{l,k} (x_{l,k} - y_{l,k})^2
$$

## Cadzow迭代

前面已经提过投影$\Pi_{\mathcal M_r}$的表达式，对于等权情况可用截断SVD来求解，而对于更一般的情况需要如下迭代式来逼近。

![](Cadzow-iterative-method/Alg-Projector.png)

### 原始的Cadzow迭代

最初的Cadzow迭代是针对等权重矩阵的最小二乘问题设计的，即$m_{ij}=1$，或者向量形式权值$w_i$为分段线性函数。因此两个投影$\Pi_\mathcal H$和$\Pi_{\mathcal M_r}=\Pi_{\mathcal r}$都可显式表达。

![](Cadzow-iterative-method/Alg-Cadzow.png)

### 加权的Cadzow迭代

令向量权重$q_{i}=1,\forall i$，根据$q_i = \sum_{\substack{1 \le l \le L \\ 1 \le k \le K \\ l+k-1=i}} m_{l,k}$，则矩阵权重$m_{l, k} = w_{l + k - 1}^{-1}$。

![](Cadzow-iterative-method/Alg-Weighted-Cadzow.png)

### 扩展的Cadzow迭代

将长度为$N$的信号$\mathbb X$进行扩展，在两侧同时添加$L-1$个采样点，得到的修改信号$\widetilde{\mathbb X}$长度为$N+2L-2$，轨道矩阵从$\mathbf X\in\mathbb R^{L\times (N-L+1)}$变成$\widetilde{\mathbf X}\in\mathbb R^{L\times (N+L-1)}$。原始部分权值为1，拓展部分权值为0，即
$$
m_{i,j} = \begin{cases}
1, & \text{if}\ 1 \le i+j-L \le N, \\
0, & \text{otherwise.}
\end{cases}
$$
![](Cadzow-iterative-method/Alg-Extended-Cadzow.png)

### 斜Cadzow迭代

由于两种范数的等式关系$\|\mathbf Z\|_\mathbf M^2 = \text{tr}(\mathbf Z \mathbf C \mathbf Z^\mathrm T)$，可以考虑用矩阵$\mathbf C$来刻画的加权最小二乘问题。

![](Cadzow-iterative-method/Alg-Oblique-Cadzow.png)

这需要选择合适的权值，主要包括以下三种。当然这个需要深入的推敲，就不在此展开了。

- Cadzow($\alpha$) iterations
- Cadzow-$\widehat{\mathbf C}$ iterations
- Weights $q_i$ produced by the algorithms

## References

[^1]: Cadzow J A . Signal enhancement-a composite property mapping algorithm[J]. Acoustics Speech & Signal Processing IEEE Transactions on, 1988, 36(1):49-62.
[^2]: Zvonarev N , Golyandina N . Iterative algorithms for weighted and unweighted finite-rank time-series approximations[J]. Stats and its interface, 2016, 10(1):5-18.


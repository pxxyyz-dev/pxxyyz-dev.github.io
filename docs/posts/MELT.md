---
title: 低秩Toeplitz协方差矩阵的极大似然估计
categories:
  - 信号处理
tags:
  - 低秩矩阵
  - Toeplitz矩阵
  - 优化
mathjax: true
excerpt: 介绍一个基于majorization–minimization算法的低秩Toeplitz协方差矩阵的极大似然估计。
urlname: MELT
date: 2020-11-16 23:20:00
---

## 写在前面

最近需要讲论文，所以找了个简短的letter[^1]。还是结构化矩阵低秩表示方向的，不过是从极大似然估计角度给出的优化建模。

## 优化模型的构建

### 极大似然估计

对于服从高斯分布的样本$\{y_k\}_{k=1}^N$，其联合概率密度函数为
$$
p(y_1,\ldots,y_N)=\pi^{MN}|R^{-1}|^N\exp\{-\text{Tr}(R^{-1}XX^H)\}
$$
取对数可得$\text{Tr}(R^{-1}XX^H)-N\log\det R^{-1}$。记样本协方差矩阵为$\hat R = \frac{1}{N}\sum_{k=1}^Ny_ky_k^H$，取似然函数
$$
\min_R f(R) = \text{Tr}(\hat R R^{-1})+\log\det R
$$
该极大似然估计(MLE)具有唯一解$R_{\text{ML}}=\hat R$。

### 低秩Toeplitz矩阵约束的优化问题

当考虑到平稳时间序列的协方差阵是Hermitian Toeplitz矩阵，该结构化优化问题的解则不再显式表示。更进一步，秩约束条件则需要处理矩阵特征值，例如收缩阈值。对于这一类结构化保持低秩矩阵的极大似然估计问题，要么忽略Toeplitz矩阵结构，要么引入中间辅助变量。该文章则直接求解这一个极大似然估计问题。

对于的低秩Toeplitz矩阵求解问题如下：
$$
\begin{aligned}
&\min_R f(R) = \text{Tr}(\hat R R^{-1})+\log\det R\\
&\text{s.t.} R=T+\sigma I, \text{rank}(T)\leq \rho, T\in \mathcal T
\end{aligned}
$$
下面利用Toeplitz矩阵的参数化表示，将上述问题转化为向量形式的优化问题

### 循环嵌入

Hermitian半正定Toeplitz协方差矩阵$T\in \mathcal T$可在离散Fourier变换矩阵上表示
$$
T=\tilde F P \tilde F\in \mathbb R^{M\times M}
$$
其中$P\in \mathbb R^{L\times L}$为对角阵，对角线记为$\boldsymbol p=(p_1,\ldots,p_L)^T$，$\tilde F=[I \quad O]F\in \mathbb R^{M\times L}$，$F\in \mathbb R^{L\times L}$为离散Fourier变换矩阵。Toeplitz矩阵除主对角线$r_0$外共轭对称，因此可以使用$2M-1$个元素来表示，记为$\boldsymbol r=(r_0,\ldots,r_{M-1},r_{M-1}^*,r_{M-2}^*,\ldots,r_{1}^*)^T$，则$\boldsymbol p=F\boldsymbol r$。

这种嵌入具有一种缺点，即频率有可能不在Fourier网格(grid)上。对于秩为$r$的半正定Toeplitz矩阵$T$，下面给出一种相似的Caratheodory参数化分解形式。
$$
T=APA^H
$$
其中$P$为对角阵，对角元素为$(\alpha_1^2,\ldots,\alpha_r^2)$，矩阵$A$具有Vandermonde结构
$$
A=\begin{pmatrix}
1&1&\ldots&1\\
e^{jw_1}&e^{jw_2}&\cdots&e^{jw_r}&\\
e^{j2w_1}&e^{j2w_2}&\cdots&e^{j2w_r}&\\
\cdots&\cdots&\cdots&\cdots&\\
e^{j(M-1)w_1}&e^{j(M-1)w_2}&\cdots&e^{j(M-1)w_r}&
\end{pmatrix}
$$
则序列$\{w_k\}$和序列$\{\alpha_k\}$表示频率和振幅。从Caratheodory参数化分解形式可以看出频率$\{w_k\}$不受约束位于Fourier网格上，而基于离散Fourier变换矩阵的参数化需要严格要求频率位于Fourier网格上，可视为Toeplitz矩阵的近似表示。为提高参数化的准确性，可增加维度$L$。

### 向量形式的优化问题

下面用$F$来代替$\tilde F$，因此对应的向量形式的等价优化问题如下。
$$
\begin{aligned}
&\min_{\boldsymbol p} f(\boldsymbol p) = \text{Tr}(\hat R R^{-1})+\log\det R\\
&\text{s.t.} R=F(P+\sigma I)F^H, P=\text{diag}(\boldsymbol p),\|\boldsymbol p\|_0\leq\rho
\end{aligned}
$$

## 基于MM的模型求解算法

MM框架最核心的步骤是构造一个代理函数(surrogate)来控制目标函数的上界。下面首先给出一些目标函数的上界估计。

### 上界放缩

在第$t$次迭代中，记$R$的估计为$R_t$，$P$的估计为$P_t$。此时有$R_t=AP_tA^H$。
$$
\begin{aligned}
\log\det R_t + \text{Tr}(R_t^{-1}(R-R_t)) & \geq \log\det R\\
R_t^{-1}AP_tP^{-1}P_tA^HR_t^{-1} & \succeq (APA^H)^{-1}
\end{aligned}
$$

- 第一个式子可以利用函数$\log\det(\cdot)$为凹函数(concave)，也可从特征值角度结合一个基本不等式得到。
- 第二个式子是其他文献里证明的一个性质，这里的$A$可替换成$F$，$P$可替换成$P+\sigma I$，$P_t$可替换成$P_t+\sigma I$。

### 代理函数及最优化

有了这两个放缩，可构造一个放缩函数$g(\boldsymbol p|\boldsymbol p_t)$来控制$f(\boldsymbol p)$。
$$
\begin{aligned}
f(\boldsymbol p) =& \text{Tr}(\hat R R^{-1})+\log\det R\\
\leq& \text{Tr}(\hat R R^{-1})+\log\det R_t + \text{Tr}(R_t^{-1}R) +c\\
\leq& \text{Tr}(\hat R R_t^{-1}F(P_t+\sigma I)(P+\sigma I)^{-1}(P_t+\sigma I)F^HR_t^{-1})\\
&+\log\det R_t + \text{Tr}(R_t^{-1}(FPF^H+\sigma I)) +c\\
=&\text{Tr}((P+\sigma I)^{-1}(P_t+\sigma I)F^HR_t^{-1}\hat R R_t^{-1}F(P_t+\sigma I))\\
&+\text{Tr}(F^HR_t^{-1}FP)+c\\
=&\boldsymbol w_t^H\boldsymbol p +\boldsymbol d_t^H(\boldsymbol p+\sigma \boldsymbol1)^{-1}+c = g(\boldsymbol p|\boldsymbol p_t)
\end{aligned}
$$
其中
$$
\begin{aligned}
\boldsymbol w_t &= \text{diag}(F^HR_t^{-1}F)\\
\boldsymbol d_t &= \text{diag}((P_t+\sigma I)F^HR_t^{-1}\hat R R_t^{-1}F(P_t+\sigma I))
\end{aligned}
$$
因此仅需要对$g(\boldsymbol p|\boldsymbol p_t)$求解极小化问题即可。
$$
\begin{aligned}
&\min_{p_k} g(\boldsymbol p|\boldsymbol p_t) = \boldsymbol w_t^H\boldsymbol p +\boldsymbol d_t^H(\boldsymbol p+\sigma \boldsymbol1)^{-1}\\
&\text{s.t.} p_k \geq 0,\|\boldsymbol p\|_0\leq\rho
\end{aligned}
$$
该问题显然是可分离变量的，对单个变量$p_j$有
$$
g(p_j|\boldsymbol p_t)=w_jp_j + \frac{d_j}{p_j+\sigma}
$$
对应的最优解为
$$
g^\star(p_j|\boldsymbol p_t)=\begin{cases}
\frac{d_j}{\sigma}&(p_j^\star=0)&d_j\leq\sigma w_j\\
2\sqrt{d_jw_j}-\sigma w_j&(p_j^\star=\sqrt{\frac{d_j}{w_j}}-\sigma)&d_j>\sigma w_j\\
\end{cases}
$$
为满足$\|\boldsymbol p\|_0\leq\rho$，仅需要计算所有分量最优解的差异
$$
e_j=\frac{d_j}{\sigma}-(2\sqrt{d_jw_j}-\sigma w_j)
$$
取前$\rho$个最大的$e_j$，令对应的分量$p_j$非零，其余分量设为零，可得满足所有约束的最优解。

### 算法流程图

![](MELT/alg.png)

### 注记

- 算法对初始值敏感
- 由$g(\boldsymbol p|\boldsymbol p_t)$生成的序列$\{\boldsymbol p_t\}$能保证$f(\boldsymbol p)$单调递减
- 计算复杂度低
- 频率在Fourier网格仍是一个问题
- 没有计算Cramer-Rao界
- 噪声水平$\sigma$与矩阵秩$\rho$的估计

## 小结

前面写的基于Toeplitz结构的协方差估计都是使用截断奇异值分解+平均算子，本文则通过Toeplitz矩阵的参数化表示转化为向量形式的优化问题，利用MM算法求解极大似然估计问题。

## References

[^1]: Babu P . MELT—Maximum-Likelihood Estimation of Low-Rank Toeplitz Covariance Matrix[J]. IEEE Signal Processing Letters, 2016, 23(11):1587-1591.




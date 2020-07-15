---
title: 基于L1范数的奇异谱分析
categories:
  - 信号处理
tags:
  - 奇异谱分析
  - l1范数
mathjax: true
excerpt: '介绍最近看的两篇基于L1范数奇异谱分析(Singular Spectrum Analysis, SSA)的文章。'
urlname: SSA-L1
date: 2020-06-01 22:00:00
updated: 2020-06-01 22:00:00

---

## 写在前面
介绍最近看的两篇基于$\ell_1$范数奇异谱分析(Singular Spectrum Analysis, SSA)的文章[^1]$^,$[^2]

## 基于$\ell_1$范数的奇异谱分析

**奇异谱分析**：SSA将时间序列分解为趋势，周期性和噪声这些可解释的成分。其优势在于数据驱动，仅含有一个参数——嵌入维度。

## 分解

### 嵌入

给定信号$S_N=(s_1,s_2,\cdots,s_N)$，设定嵌入维度（窗口长度）为$L$，得到的邻接矩阵（Hankel矩阵）如下：

$$
X_{L\times K}=\left(\begin{array}{cccc}
s_{1} & s_{2} & \cdots & s_{K} \\
s_{2} & s_{3} & \cdots & s_{K+1} \\
\vdots & \vdots & \vdots & \vdots \\
s_{L} & s_{L+1} & \cdots & s_{N}
\end{array}\right) \in \mathbb{R}_H^{L \times K}
$$


### 奇异值分解

$X=U \Sigma V^T$，其中$U,V$分别左、右奇异矩阵，对角矩阵$\Sigma$奇异值按降序排列。设$\text{rank}(X)=d$，则按照特征值可邻接矩阵分解为$d$个秩1矩阵之和，即

$$
X = \sum\limits_{i=1}^d X_i,X_i = \sigma_i U_i V_i^T
$$

奇异值分解显然给出关于矩阵$X$的最优$r(<d)$秩逼近的结果，即

$$
\min\limits_{X^r}\|X-X_r\|_F^2 \quad \text{s.t.} \text{rank}(X_r) = r
$$

优化问题的最优解为

$$
X_r=\sum_{i=1}^r X_i
$$

显然，以上解释是在Frobenius范数(简称F范数)意义下成立的。对于$\ell_1$范数，SVD有如下推广。

### 基于$\ell_1$的奇异值分解

假设轨道矩阵$X$是秩亏的(rank deficient)，即$\text{rank}(X)=r<L<K$，记对角矩阵

$$W=diag(w_1,w_2,\cdots,w_r,0,0,\cdots,0)\in {\mathbb{R}}^{L \times L}$$

可写成分块矩阵

$$
W_{L \times L} = \left(\begin{array}{cc} W_r & 0\\0 & 0 \end{array}\right), W_r = diag(w_1,w_2,\cdots,w_r)\in \mathbb{R}^{r \times r}
$$

信号的$\ell_1$范数逼近可通过寻找对角矩阵$W_{L \times L}$实现
$$
\min\limits_{W} \|X - U W \Sigma V^T\|_1 \quad \text{s.t.} X=U \Sigma V^T
$$

根据矩阵分块的性质，基于$\ell_1$的奇异值分解可转化为求解以下优化问题：
$$
\min\limits_{W} \|X - U W \Sigma V^T\|_1 = \min\limits_{W_r} \|X - U_1 W_r \Sigma_1 V_1^T\|_1
$$

设$A_r = U_1 W_r,B_1 =\Sigma_1 V_1^T$，由于矩阵$U,\Sigma_1,V$由奇异值分解可得，因此$U_1$和$B_1$是已知的，该问题可按列展开为$\ell_1$回归问题：

$$
\min\limits_{A_r} \|X - A_r B_1\|_1 = \min\limits_{A_r} \|X^T - B_1^T A_r^T \|_1 = \min\limits_{A_j} \sum\limits_{j=1}^L\|X_j^T - B_1^T A_j^T \|_1
$$

对比优化问题$\text{eq:fSVD}$和$\text{eq:l1SVD}$，不难发现公式$\text{eq:l1SVD}$是公式的加权$\text{eq:fSVD}$版本。问题回来了，明明都有了奇异值分解$X=U \Sigma V^T$，求一个加权系数矩阵有何意义呢？

酉矩阵的F范数不变性得到，即对任意的酉矩阵$U,V$满足$UU^T = I = U^TU,VV^T = I = V^TV$，有

$$
\lVert Z\rVert_F = \lVert UZV^T\rVert_F
$$

从而有可以得到以下恒等变形

$$
\| X - Y \|_{F}^{2} = \| \Sigma - U^{T} Y V  \|_{F}^{2}
$$

公式$\text{eq:fSVD}$则可变成

$$
\|X-X_r\|_F^2 = \| \Sigma - U^{T} U_r \Sigma_r V_r^T V  \|_{F}^{2} = \| \Sigma - \Sigma_r  \|_{F}^{2}
$$

但将公式$\text{eq:l1SVD}$的$\ell_1$换成F范数，分析如下

$$
\|X-UW\Sigma V^T\|_F^2 = \| (I - W) \Sigma  \|_{F}^{2}
$$

显然$W_r$为单位阵达到最优解，现在考虑$\ell_1$意义下的对应的问题，将$X$的分解带入，由于酉变换不具有$\ell_1$范数不变性，因此

$$
\min\limits_{W} \|U \Sigma V^T - U W \Sigma V^T\|_1
$$

因为基于F范数的奇异谱分析得到的奇异三元组可以视为含有时间序列结构的，右奇异向量可以由奇异值和左奇异向量表示

$$
X=\sum\limits_{i=1}^rX_{i}=\sum\limits_{i=1}^r\sigma_{i} U_{i} V_{i}^{T}= \sum\limits_{i=1}^rU_{i} U_{i}^{T}X
$$

所以分解的奇异值$\sigma_i$表示幅值，而左奇异向量$U_i$可去Hankel化得到时间序列。

$$
U W \Sigma V^T=\sum\limits_{i=1}^rw_i\sigma_{i} U_{i} V_{i}^{T}= \sum\limits_{i=1}^rw_iU_{i} U_{i}^{T}X
$$

从这个角度分析，加权系数是对奇异值进行数乘$w_i \sigma_i$，从而在$\ell_1$意义下调整各个奇异向量得到时间序列的振幅，即

$$
\min\limits_{W} \|\sum\limits_{i=1}^r(1- w_i) U_{i} U_{i}^{T}X\|_1
$$

我仍然有一处疑问，如果设定$\text{rank}(X)=r$，那么显然零所有的权值$w_i=1$使得上式等于0，即最优解，这个也不符合去噪或异常值的含义。因此，设$r<\text{rank}(X)=d<L<K$，在高秩甚至是满秩的矩阵中，通过加权前$r$个奇异三元组来近似原始轨道矩阵，当然这个是在$\ell_1$范数意义下是可以解释的。

$$
\min\limits_{W} \|\sum\limits_{i=1}^d\sigma_{i} U_{i} V_{i}^{T} - \sum\limits_{i=1}^rw_i\sigma_{i} U_{i} V_{i}^{T}\|_1
$$

反之，在F范数下这个解显然就是前$r$个奇异三元组乘积之和。



## 重构

### 分组

根据特征三元组性质，将对应矩阵$X_i$进行分组，对应的索引$\{1,2,\cdots,L\}$划分为$m$个不相干子集$I_1,I_2,\cdots,I_m$。对于第$k$组，分组结果

$$
X_{I_k} = \sum\limits_{i\in I_k} X_i
$$

### 反对角平均

因为矩阵$X_{I_k}$不是一个Hankel矩阵，因此需要求得一个最佳Hankel矩阵来近似矩阵$X_{I_k}$，并将Hankel矩阵化为分解的信号序列。这一过程蕴含如下优化问题：

$$
\min\limits_a \|A - {\mathcal H}a\|
$$

其中，序列$a$的Hankel矩阵${\mathcal H}a$需要在某种意义下近似已知矩阵$A$。通常，基于Frobenius范数的去Hankel化本质上是一个最小二乘问题，对应的结果可通过反对角平均实现。而对于$\ell_1$意义下的去Hankel化则不能用反对角线的平均值来代替。

$$
\|A - {\mathcal H}a\|_1 = \sum\limits_{i=1}^{L} \sum\limits_{j=1}^{K} |A_{ij}-{\mathcal H}a_{ij}| = \sum\limits_{s=2}^{L+K} \sum\limits_{i+j=s} |A_{ij}-a_{s}|
$$

显然，$a_s$的最优值为$A_s$的中位数，即

$$
a_s = \text{median}_{l+k=s} A_{lk}
$$

$\ell_1$范数的去Hankel化也可以视为反对角取中值。

## 小结

这个方法是改了传统SSA的范数，即F范数变为$\ell_1$范数，仍使用分解+重构的步骤按照奇异三元组进行信号分解。该方法的改进的结果在于对异常值鲁棒。

## 参考文献

[^1]: Kalantari M, Yarmohammadi M, Hassani H, et al. Singular Spectrum Analysis Based on L1-Norm[J]. Fluctuation and Noise Letters, 2016, 15(01).



[^2]: Kalantari, Mahdi, Yarmohammadi, et al.  Time Series Imputation via L-1 Norm-Based Singular Spectrum Analysis[J]. Fluctuation & Noise Letters Fnl An Interdisciplinary Scientific Journal on Random Processes in Physical Biological & Technological Systems, 2018.


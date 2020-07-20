---
title: 函数型奇异谱分析
categories:
  - 信号处理
tags:
  - 奇异谱分析
mathjax: true
excerpt: 介绍函数型奇异谱分析算法(Functional Singular Spectrum Analysis)
urlname: functional-ssa
date: 2020-07-18 15:00:00
---

## 写在前面

介绍函数型奇异谱分析(Functional Singular Spectrum Analysis)[^1]

## 理论基础

对于函数型时间序列$\boldsymbol y_N = (y_1,y_2,\ldots,y_N)^\top$，其中每个函数分量$y_i : [0,1] \to \mathbb R$属于实的平方可积函数空间，该Hilbert空间$\mathbb H$具备标准内积形式$\left\langle x,y\right\rangle=\int_0^1 x(s)y(s)ds$。张量外积$x\otimes y: \mathbb{H}_1\rightarrow \mathbb{H}_2$定义为$(x\otimes y)h:=\langle x, h \rangle y$，其中$h\in \mathbb{H}_1$。对$\boldsymbol{a}=(a_1,\ldots, a_K)\in\mathbb{R}^K$，由算子$\mathcal{Z}: \mathbb{R}^K \rightarrow \mathbb{H}^L$张成的线性空间记为$\mathbb{H}^{L\times K}$
$$
\mathcal{Z}\boldsymbol{a}=
\begin{pmatrix}	\sum_{j=1}^K a_j{z}_{1,j}\\ \vdots\\ \sum_{j=1}^K a_j{z}_{L,j} \end{pmatrix},
\ {z}_{i,j}\in\mathbb{H}
$$
算子$\hat{\mathcal Z}=[\hat{z}_{i,j}]\in\mathbb{H}^{L\times K}$满足
$$
\Vert\hat z_{i,j}-g_s\Vert=0,\exists g_s\in\mathbb{H},s=i+j
$$
则称为Hankel算子，记为$\mathbb{H}_H^{L\times K}$。两个算子的Frobenius内积定义如下
$$
\langle\mathcal{Z}_1,\mathcal{Z}_2\rangle_\mathcal{F}:=\sum_{i=1}^L\sum_{j=1}^K \langle{z}_{i,j}^{(1)},{z}_{i,j}^{(2)}\rangle.
$$
给定Hilbert空间中的元素$x_i,\ i=1,\ldots, N$,均值点$\bar{x}=\frac{1}{N}\sum_{i=1}^N x_i$满足
$$
\sum_{i=1}^N\Vert x_i-\bar{x}\Vert^2 \leq \sum_{i=1}^N\Vert x_i-y \Vert^2, \quad\forall y\in \mathbb{H}
$$

## 函数型SSA算法

多元函数型向量基合记为
$$
{\boldsymbol x}_j(s):= \begin{pmatrix} y_j(s), y_{j+1}(s), \ldots, y_{j+L-1}(s)\end{pmatrix}^\top \forall j
$$
显然，嵌入维度为$L$。与传统的SSA算法一样，FSSA算法分为如下四步：

### 嵌入Embedding

对于${\boldsymbol a}=\left(a_1,\ldots, a_K\right)^\top \in\mathbb{R}^K$，定义算子$\mathcal{X}:\mathbb{R}^K \rightarrow \mathbb{H}^L$
$$
\mathcal{X}{\boldsymbol a}:=\sum_{j=1}^K a_j{\boldsymbol x}_j=
\begin{pmatrix} \sum_{j=1}^K a_jy_j\\ \sum_{j=1}^K a_j y_{j+1}\\ \vdots\\ \sum_{j=1}^K a_j y_{j+L-1} \end{pmatrix}
$$
称邻接算子$\mathcal{X}=\mathcal{T}\textbf{y}_N$，即等价于序列的Hankel化。此外$\mathcal{X} \boldsymbol{a}$等于${\bf X}(s)\boldsymbol{a}$，其中Hankel 矩阵${\bf X}(s)=\begin{bmatrix} {\boldsymbol x}_1(s), \ldots, {\boldsymbol x}_K(s) \end{bmatrix}$

对${\boldsymbol z}=\left(z_1,\ldots, z_L\right)^\top\in\mathbb{H}^L$，若线性算子 $\mathcal{X}$ 有界，则算子$\mathcal{X}^*$
$$
\mathcal{X}^*{\boldsymbol z}=
\begin{pmatrix} \sum_{i=1}^L \langle y_i, z_i\rangle\\ \sum_{i=1}^L \langle y_{i+1}, z_i\rangle\\ \vdots\\ \sum_{i=1}^L \langle y_{i+K-1}, z_i\rangle \end{pmatrix}
$$
是算子 $\mathcal{X}$ 的伴随算子。

### 分解Decomposition

定义算子$\mathcal S:=\mathcal{X}\mathcal{X}^*: \mathbb{H}^L\rightarrow \mathbb{H}^L$，则对给定的${\boldsymbol z}\in \mathbb{H}^{L}$
$$
\begin{aligned}
\mathcal{S}{\boldsymbol z}
&=\sum_{j=1}^K\sum_{i=1}^L \langle y_{i+j-1} , z_i \rangle {\boldsymbol x}_j\\
&=\sum_{j=1}^K \langle {\boldsymbol x}_j , {\boldsymbol z} \rangle_{\mathbb{H}^L} {\boldsymbol x}_j\\
&=\sum_{j=1}^K ({\boldsymbol x}_j \otimes {\boldsymbol x}_j) {\boldsymbol z}
\end{aligned}
$$
从矩阵角度考虑，$\boldsymbol{\mathcal{S}}$可分解为作用在元素的运算
$$
\mathcal{S}_{i,j}=\sum_{l=1}^K y_{i+l-1}\otimes y_{j+l-1}:\mathbb{H}\rightarrow \mathbb{H}
$$
外积可用积分表示。$\forall s,u\in[0,1]$，对应的核分量为
$$
{c}_{i,j}(s,u):=\sum_{k=1}^K y_{i+k-1}(s)y_{j+k-1}(u)
$$
由分量组成的核矩阵${\bf C}(s,u)={\bf X}(s){\bf X}(u)^\top$可整体刻画算子$\mathcal{S}$
$$
\begin{aligned}
\mathcal S \boldsymbol {z}(u)&= \int_0^1 {\bf C}(s,u) \boldsymbol {z}(s)ds \\
&=\left(\begin{matrix} \sum_{i=1}^L\int_0^1 c_{i,1}(s,u) z_i(s) ds\\ \vdots \\ \sum_{i=1}^L\int_0^1 c_{i,L}(s,u) z_i(s) ds \end{matrix}\right)
\end{aligned}
$$
这个算子具有非常好的性质：

- 线性性
- 自伴性
- 正定性
- 有界性
- 连续性
- 紧性

因此可做类似特征值分解的正交基表示，即存在$\left\lbrace \boldsymbol{\psi}_i, \ i\in \mathbb{N}\right\rbrace$ 满足
$$
\mathcal{S} \boldsymbol{\psi}_i=\lambda_i \boldsymbol{\psi}_i
$$
当$i \longrightarrow \infty$时，$\lambda_i \longrightarrow 0$。根据谱定理，有
$$
\mathcal{S} =\sum_{i=1}^\infty \lambda_i \boldsymbol{\psi}_i\otimes \boldsymbol{\psi}_i
$$
由于核的连续性，$\textbf{C}(s,u)$具有类似奇异值分解的展开表达式
$$
\textbf{C}(s,u)=\sum_{i=1}^{\infty} \lambda_i \boldsymbol{\psi}_i (s)\boldsymbol{\psi}_i^\top (u).
$$
对任意正数$i$，定义元算子
$$
\mathcal{X}_i \boldsymbol{a}:=\sum_{j=1}^K a_j (\boldsymbol{\psi}_i\otimes \boldsymbol{\psi}_i){\boldsymbol x}_j= (\boldsymbol{\psi}_i\otimes \boldsymbol{\psi}_i)\sum_{j=1}^K a_j{\boldsymbol x}_j
$$
上式的矩阵形式为${\bf X}_i(s)\boldsymbol{a}$，其中${\bf X}_i(s)$可视为矩阵${\bf X}(s)$在$\boldsymbol{\psi_i}(s)$张成空间的表示。
$$
\begin{aligned}
{\bf X}_i(s)&:=
\begin{bmatrix} \langle\boldsymbol{\psi}_i, {\boldsymbol x}_1\rangle_{\mathbb{H}^L} \boldsymbol{\psi}_i(s), \ldots, \langle\boldsymbol{\psi}_i, {\boldsymbol x}_K\rangle_{\mathbb{H}^L} \boldsymbol{\psi}_i(s) \end{bmatrix}\\
&=\begin{bmatrix} (\boldsymbol{\psi}_i\otimes \boldsymbol{\psi}_i){\boldsymbol x}_1(s), \ldots, (\boldsymbol{\psi}_i\otimes \boldsymbol{\psi}_i){\boldsymbol x}_K(s) \end{bmatrix}
\end{aligned}
$$
回到元运算$\mathcal{X}_i$，具备以下性质：

- 秩为$1$的有界算子

- $$
  \mathcal{X}=\sum_{i=1}^\infty \mathcal{X}_i
  $$

计算
$$
\begin{aligned}
&\boldsymbol{\mathcal{S}}^{\dagger}:=\mathcal{X}^*\mathcal{X}\\
&=\left[\begin{matrix}
\sum_{i}\langle y_i, y_{i}\rangle & \cdots & \sum_{i}\langle y_i, y_{i+K-1}\rangle \\
\vdots & \ddots &\vdots \\
\sum_{i}\langle y_{i+K-1}, y_{i}\rangle & \cdots & \sum_{i}\langle y_{i+K-1}, y_{i+K-1}\rangle\\
\end{matrix}\right]
\end{aligned}
$$

则邻接算子$\mathcal{X}$的SVD分解
$$
\mathcal{X} = \sum_{i=1}^\infty \sqrt{\lambda_i}\textbf{v}_i\otimes \boldsymbol{\psi}_i  ,
$$
其中右奇异向量为$\textbf{v}_i=\begin{pmatrix} \frac{\langle\boldsymbol{\psi}_i, {\boldsymbol x}_1\rangle_{\mathbb{H}^L}}{\sqrt{\lambda_i}} , \ldots,\frac{ \langle\boldsymbol{\psi}_i, {\boldsymbol x}_K\rangle_{\mathbb{H}^L}}{\sqrt{\lambda_i}} \end{pmatrix}^\top$。对任意的$\boldsymbol{a}\in\mathbb{R}^K$，有
$$
\mathcal{X}\boldsymbol{a} = \sum_{i=1}^\infty \sqrt{\lambda_i} \langle \textbf{v}_i, \boldsymbol{a}\rangle_{\mathbb{R}^K}  \boldsymbol{\psi}_i
$$

- $\boldsymbol{\mathcal{S}}^\dagger$的特征值$\{\lambda_i\}_{i=1}^\infty$降序排列
- $\mathcal{X}\boldsymbol{v}_i = \sqrt{\lambda_i} \boldsymbol{\psi}_i$

- 奇异值、左右奇异函数$(\sqrt{\lambda_i},\boldsymbol{\psi}_i,\boldsymbol{v}_i)$构成奇异三元组

### 分组Grouping

与传统奇异谱分析一致，将元运算$\mathcal{X}_i$划分若干个集合，得到
$$
\mathcal{X}=\mathcal{X}_{I_1}+\mathcal{X}_{I_2}+\cdots+\mathcal{X}_{I_m}.
$$

### 重构Reconstruction

通过去Hankel算子$\mathcal{T}^{-1}:\mathbb{H}_H^{L\times K} \rightarrow \mathbb{H}^N$将元运算$\mathcal{X}_{I_q}$化为$\hat{\bf y}_N^q$，从而构造函数型分解。通过投影定理，存在唯一的$\mathcal{\hat{X}}_{I_q}\in\mathbb{H}_H^{L\times K}$使得
$$
\Vert \mathcal{X}_{I_q}-\mathcal{\hat{X}}_{I_q} \Vert_\mathcal{F}^2 \leq \Vert \mathcal{X}_{I_q}-\hat{\mathcal{Z}} \Vert_\mathcal{F}^2,\forall\hat{\mathcal{Z}}\in\mathbb{H}_H^{L\times K}
$$
因此，利用反对角平均很容易得到各个分量的估计值
$$
\hat{x}_{i,j}^{q}=\dfrac{1}{n_{s}}\sum_{(l,k): l+k =s}{x}_{l,k}^q,
$$
用投影算子$\Pi_\mathbb{H}:\mathbb{H}^{L\times K}\rightarrow \mathbb{H}^{L\times K}_H$定义这一操作，则下述步骤即可获得函数型时间序列
$$
\hat{\bf y}_N^q=\mathcal{T}^{-1}\hat{\mathcal{X}}_{I_q}=\mathcal{T}^{-1}\Pi_\mathbb{H} \mathcal{X}_{I_q}
$$

## 小结

本文是经典的奇异谱分析到函数型数据分析的推广，大体步骤与传统一致，只是研究对象从数延伸到函数，所以定义了一系列算子来代替传统的矩阵运算，但是万变不离其宗，方法都是对协方差类型的表示进行奇异值分解。

这篇文章理论证明和算法细节都很详细，还给了一个演示网址<https://fssa.shinyapps.io/fssa/>，相信后续还会有一系列进展。

文章公式直接从arxiv的tex文档导出来的，略有修改，不过会出现符号重复两遍的bug，应该是`\boldsymbol`有些许问题，不过不影响阅读。

## 参考文献

[^1]: Hossein Haghbin, Seyed Morteza Najibi, Rahim Mahmoudvand, Jordan Trinka, Mehdi Maadooliat. Functional Singular Spectrum Analysis [arXiv:1906.05232](https://arxiv.org/abs/1906.05232)
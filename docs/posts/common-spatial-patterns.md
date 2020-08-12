---
title: 共空间模式
categories:
  - 信号处理
tags:
  - 模式识别
  - 优化
mathjax: true
excerpt: 介绍经典的共空间模式算法(common-spatial-patterns)
urlname: common-spatial-patterns
date: 2020-08-09 10:00:00
---

## 写在前面

介绍共空间模式算法(Common Spatial Patterns)，本文主要参考了slide[^4]	



## 脑机接口

使用仪器收集脑电信号并进行信号分类，里面包含一系列信号处理技术，这里只介绍信号分类的关键步骤。

![](common-spatial-patterns/BCI.png)

## EEG信号采样

多通道、非平稳的EEG信号数学表示为
$$
\{E_n\}_{n=1}^{N} \in \mathbb{R}^{ch\times time}
$$
信号本身核采集过程中包含大量噪声以及无意义的信息，因此下一步就是提取出有甄别信息的特征。

![](common-spatial-patterns/EEG.png)

p.s. 通道数与传感器个数有关，早期脑机接口是侵入式的，给瘫痪病人用的，现在是头戴式，不过受试者收集信号都说累（需要注意力高度集中），以后应该就是多维度（EEG、眼动式、语音等信息融合）（？大胆猜测）

## 特征提取

下面就要完成信号到特征的转化
$$
\{E_n\}_{n=1}^{N} \in \mathbb{R}^{ch\times time} \to x_n \in \mathbb{R}^d
$$
![](common-spatial-patterns/feature-extraction.png)

- 带宽滤波器：选择合适的带宽（如7-30Hz或10-40Hz）来降噪并提取有利于分类的最佳频率，这一步是通过长期经验来确定的。
- 空间滤波器：选择重要的通道信号来完成分类，共空间模式算法是一种典型的空间滤波器。

## 线性判别分析

上一步从训练集得到的特征通过监督(或半监督)算法训练分类器(分类参数)，训练完成后可直接用于测试集。

![](common-spatial-patterns/classification.png)

下面介绍一种经典的监督分类算法——**线性判别分析**，它是基于各模式的类间散度和类内散度所构成广义瑞利商的最大化来求得最优超平面。我们知道，空间样本点在不同的投影下的投影点具有不同的离散程度

![](common-spatial-patterns/projection.png)

为了让投影点更好的区分开来，我们期望

- 同类投影点尽可能接近
- 异类投影点尽可能远离

那么两者需要量化。

![](common-spatial-patterns/criterion.png)

- 同类投影点尽可能接近：投影范围内的最大距离$s$尽可能小
- 异类投影点尽可能远离：两类投影有明显的间隔，则均值点间的距离$\Delta m$尽可能大

一小一大，自然联想到构造瑞利商形式的目标函数
$$
\max_w J(w) = \frac{(m_1 -m_2)^2}{s_1+s_2}
$$

$$
\begin{aligned}
\left(m_{1}-m_{2}\right)^{2}=&\left(\boldsymbol{w}^{T} \boldsymbol{\mu}_{1}-\boldsymbol{w}^{T} \boldsymbol{\mu}_{2}\right)\left(\boldsymbol{w}^{T} \boldsymbol{\mu}_{1}-\boldsymbol{w}^{T} \boldsymbol{\mu}_{2}\right)^{T} \\
=& \boldsymbol{w}^{T}\left(\boldsymbol{\mu}_{1}-\boldsymbol{\mu}_{2}\right)\left(\boldsymbol{\mu}_{1}-\boldsymbol{\mu}_{2}\right)^{T} \boldsymbol{w}=\boldsymbol{w}^{T} \boldsymbol{S}_{B} \boldsymbol{w} \\
s_{1}+s_{2} &=\boldsymbol{w}^{T} \boldsymbol{\Sigma}_{1} \boldsymbol{w}+\boldsymbol{w}^{T} \boldsymbol{\Sigma}_{2} \boldsymbol{w} \\
&=\boldsymbol{w}^{T}\left(\boldsymbol{\Sigma}_{1}+\boldsymbol{\Sigma}_{2}\right) \boldsymbol{w}=\boldsymbol{w}^{T} \boldsymbol{S}_{W} \boldsymbol{w}
\end{aligned}
$$

目标函数等价为
$$
\max_w J^\prime(w) =\frac{w^T \boldsymbol S_B w}{w^T \boldsymbol S_W w}
$$
分子分母均为$w$的二项式，$\hat w$与长度无关，仅与方向有关，即$J(w) = J(kw)\quad\forall k$，因此设$w^T \boldsymbol S_W w= 1$，则
$$
\min_w - w^T \boldsymbol S_B w \quad\text{s.t.} \quad w^T \boldsymbol S_W w = 1
$$
构造拉格朗日函数
$$
L(w,\lambda) = - w^T \boldsymbol S_B w + \lambda(w^T \boldsymbol S_W w - 1)
$$
函数对$w$求偏导并设为$0$可得到最优解条件
$$
\boldsymbol S_B w = \lambda \boldsymbol S_W w
$$
其中$\boldsymbol S_W w$与$\mu_1 - \mu_2$平行，因此最优解为
$$
\hat w \propto\boldsymbol S_W^{-1}(\mu_1 - \mu_2)
$$
对任意样本点$x$(包括测试集和训练集)，我们只需对投影点设置一个合适的阈值予以区分，例如取两中心的平均值$z_0 = \frac{m_1 + m_2}{2}$，靠近哪个中心的划为哪类。

## 共空间模式算法

共空间模式算作为一种空间滤波器，其目的与线性判别分析类似，即期望通过投影将不同类别的分布尽可能区分开来，其解释如下[^1]：

> CSP FILTERS MAXIMIZE THE VARIANCE OF THE SPATIALLY FILTERED SIGNAL UNDER ONE CONDITION WHILE MINIMIZING IT FOR THE OTHER CONDITION.

![](common-spatial-patterns/CSP-result.png)

对收集到的信号$E$，通过投影得到$S = w^TE$，则CSP的目标函数为
$$
\max_w J(w) =\frac{w^T (\Sigma_1 - \Sigma_2) w}{w^T (\Sigma_1 + \Sigma_2) w}
$$

- $\Sigma_1 - \Sigma_2$：**discriminative activity** 有利于分类的特征
- $\Sigma_1 + \Sigma_2$：**common activity** 属于不感兴趣的信息

从瑞利商角度，该目标存在如下等价形式
$$
\max_w J^\prime(w) =\frac{w^T \Sigma_1 w}{w^T \Sigma_2 w}
$$
该问题与线性判别分析的求解步骤一致，可转化为一个特征值问题
$$
\Sigma_2^{-1}\Sigma_1 w=\lambda w
$$
CSP问题也可等价为矩阵形式
$$
\max_W \text{tr}(W^T \Sigma_1 W)\quad \text{s.t.} \quad W^T(\Sigma_1 + \Sigma_2)W = \boldsymbol{I}
$$
该问题类似于矩阵的**联合对角化**问题(可参见白化变换*Whitening*)，通过特征值分解可得
$$
\begin{aligned}
\Sigma_1 + \Sigma_2 &= UDU^T\\
P &= D^{-\frac{1}{2}}\\
\hat\Sigma_1 &= P\Sigma_1P^T\\
\hat\Sigma_2 &= P\Sigma_2P^T
\end{aligned}
$$
显然$\hat\Sigma_1 + \hat\Sigma_2 = \boldsymbol{I}$，因此任意正交阵$V$都可以保证$V^T (\hat\Sigma_1 + \hat\Sigma_2) V = \boldsymbol{I}$，因此可将$V$设为$\hat\Sigma_1$的特征向量构成的酉阵
$$
\hat\Sigma_1 = V \boldsymbol{\Lambda} V^T
$$
其中对角矩阵$\boldsymbol{\Lambda}$由降序排列的特征值构成。CSP滤波器的投影矩阵为
$$
W = P^T V
$$
两协方差投影后得到对角阵
$$
\begin{array}{l}
W^{T} {\Sigma}_{1} W=\boldsymbol{\Lambda}=\left(\begin{array}{ccc}
\lambda_{1}&& \\
& \ddots & \\
& &\lambda_{ch}
\end{array}\right) \\
W^{T} {\Sigma}_{2} W=\boldsymbol{I}-\boldsymbol{\Lambda}=\left(\begin{array}{cc}
1-\lambda_{1}&& \\
& \ddots & \\
& &1-\lambda_{ch}
\end{array}\right)
\end{array}
$$
这表明投影$W$提供了第一类协方差矩阵的最大方差$\lambda_1,\ldots,\lambda_{ch}$(降序排列)和第二类协方差矩阵的最小方差$1-\lambda_1,\ldots,1-\lambda_{ch}$(升序排列)。

## 正则化共空间模式

正则化，顾名思义，就是添加一些由先验信息或假设而产生的正则项，来改进或约束目标函数。[^2]

- 协方差矩阵的正则化

由于噪声和小样本集的缘故，协方差矩阵的估计存在明显的误差，因此修正协方差矩阵非常有必要。
$$
\tilde{C_c} = (1-\gamma)\left[(1-\beta)s_cC_c+\beta G_C \right]+\gamma I
$$
其中$C_c$是协方差矩阵，$I$表示单位阵，$G_c$表示通常的协方差，这让我想起团长里面的话

> 我想让事情是它该有的样子

- 目标函数的正则化

对目标函数增加正则项可以惩罚不满足先验信息的空间滤波器
$$
\max_w J_{P_1}(w) =\frac{w^T \Sigma_1 w}{w^T \Sigma_2 w + \alpha P(w)}
$$
一些简单的先验信息都可以通过二次惩罚项表示，即设置$P(w) = \|w\|_K^2 = w^TKw$。需要注意的是，CSP算法可同时满足：

- 最大化$\Sigma_1$而最小化$\Sigma_2$
- 最大化$\Sigma_2$而最小化$\Sigma_1$

为此还需考虑对立问题
$$
\max_w J_{P_2}(w) =\frac{w^T \Sigma_2 w}{w^T \Sigma_1 w + \alpha P(w)}
$$
因此滤波器由$(\Sigma_2 + \alpha K)^{-1}\Sigma_1$和$(\Sigma_1 + \alpha K)^{-1}\Sigma_2$的若干个最大特征值对应的特征向量组成。

## 黎曼流形的几何解释

首先给出CSP的联合对角化的求解算法流程($\Sigma_2,\Sigma_1$用$P_1,P_2$代替)[^3]

![](common-spatial-patterns/CSP-Algorithm.png)

通常选取$J(<N)$个特征向量作为投影矩阵，滤波后信号的对数方差(*log variance*)作为特征的一种选择
$$
\begin{array}{l}
F_X=\left(\begin{array}{c}
\log(\text{var}(w_1^T X)) \\
 \vdots  \\
\log(\text{var}(w_J^T X))
\end{array}\right)
\end{array}
$$
引入一些常见的微分几何的概念(主要服务于计算距离和几何均值)，利用酉变换不变性的性质给空间滤波器赋予几何解释。回到CSP算法最后求解的特征分解问题
$$
(\Sigma_1 + \Sigma_2)^{-1}\Sigma_1 w_j= \lambda_j w_j
$$
联合对角化的结果表明
$$
W^{T} {\Sigma}_{1} W=\boldsymbol{\Lambda},
W^{T} {\Sigma}_{2} W=\boldsymbol{I}-\boldsymbol{\Lambda}
$$
而两协方差$\Sigma_1,\Sigma_2$间的黎曼距离与CSP的投影特征值产生关联
$$
\begin{aligned}
\delta_R (\Sigma_1, \Sigma_2) &= \delta_R (W^T\Sigma_1 W, W^T \Sigma_2 W) \\
&= \delta_R (\boldsymbol{\Lambda}, \boldsymbol{I}-\boldsymbol{\Lambda}) \\
&= \sqrt{\sum_j\log^2(\frac{\lambda_j}{1-\lambda_j})}\\
&= \|d_R\|_2
\end{aligned}
$$
其中记$(d_R)_j = |\log(\frac{\lambda_j}{1-\lambda_j})|$。

对于特征提取的几何解释，使用测试样本协方差$P_X$，通过$W$可近似对角化$P_Z$，其对角线元素近似$D_Z = \text{diag}(\text{diag}(P_Z))$代替可得到黎曼距离的近似
$$
\begin{aligned}
\delta_R (\Sigma_1, \Sigma_X) &= \delta_R (W^T\Sigma_1 W, W^T \Sigma_X W) \\
&= \delta_R (\boldsymbol{\Lambda}, P_Z) \\
&\simeq \delta_R (\boldsymbol{\Lambda}, D_Z) \\
\end{aligned}
$$
对投影向量的方差取对数得到的特征向量$F_X$与黎曼距离存在近似联系
$$
\delta_R (\Sigma_1, \Sigma_X) \simeq \|F_X - F_1\|_2
$$
![](common-spatial-patterns/Riemannian.png)

CSP的黎曼距离代表欧式特征空间中欧式距离的近似。 因此，基于黎曼距离的空间滤波器选择可隐式确保特征空间中类的最大可分离性。

## 参考文献

[^1]: Blankertz B, Tomioka R, Lemm S, et al. Optimizing Spatial filters for Robust EEG Single-Trial Analysis[J]. IEEE Signal Processing Magazine, 2008, 25(1): 41-56.
[^2]: Lotte F, Guan C. Regularizing Common Spatial Patterns to Improve BCI Designs: Unified Theory and New Algorithms[J]. IEEE Transactions on Biomedical Engineering, 2011, 58(2): 355-362.

[^3]: A. Barachant, S. Bonnet, M. Congedo and C. Jutten, "Common Spatial Pattern revisited by Riemannian geometry," 2010 IEEE International Workshop on Multimedia Signal Processing, Saint Malo, 2010, pp. 472-476, doi: 10.1109/MMSP.2010.5662067.

[^4]: [Introduction to Common Spatial Pattern Filters for EEG Motor Imagery Classification](https://www.slideshare.net/yokotatsuya/introduction-to-common-spatial-pattern-filters-for-eeg-motor-imagery-classification?from_action=save)
---
title: Grassmann流形上的投影度量学习
categories:
  - 信号处理
tags:
  - 流形表示
  - 度量学习
  - 判别分析
mathjax: true
password: password
excerpt: 介绍2015年CVPR的文章——Grassmann流形上的投影度量学习
urlname: Projection-Metric-Learning-Grassmann-Manifold
date: 2020-11-28 12:00:00
---

## 写在前面

最近又开始捡起以前的老本行了，打算写写材料先储备着。介绍Zhiwu Huang[^1]前几年的投影度量学习[^2]。

## 投影度量学习

### 中心思想

用线性子空间来表示信号或图像在近些年来获得了较大的成功，而线性子空间是一种典型的非欧空间，其本质是Grassmann流形。该流形上特征学习的传统手段是是利用核方法将Grassmann流形嵌入到高维Hilbert空间，这里面用到了投影度量，可很好地近似Grassmann流形上的Riemannian几何。然而这种方法的通病在于：

- 非显式映射，不适用新样本的特征提取与分类
- 高额的计算成本，高维流形上的算子需要计算奇异值，不利于大规模问题

为此，投影度量学习被提出来实现几何角度的流形降维，得到一个低维且更具有判别力的Grassmann流形，降低运算量，提高特征的分辨能力。

![](Projection-Metric-Learning-Grassmann-Manifold/alg-PML.png)

该图对比了核化升维和流形间降维：

- (a)-(b)-(d)-(e)需要将流形$\mathcal G(q,D)$上的点嵌入到高维的Hilbert空间$\mathcal H$，再通过判别机制映射至低维的空间$\mathbb R^d$中。
- (a)-(b)-(c)则利用投影度量和映射直接完成原始的Grassmann流形$\mathcal G(q,D)$到低维Grassmann流形$\mathcal G(q,d)$的判别学习。

### 投影度量

Grassmann流形$\mathcal G(q,D)$是$\mathbb R^D$的$q$维线性子空间，且是$q(D-q)$维的紧致Riemannian流形。

对任意$Y\in \mathcal G(q,D)$，即满足$Y^T Y=I_q$，给出投影映射$\Phi(Y)=YY^T$，投影得到$D\times D$的的对称矩阵，因此使用如下内积
$$
\left\langle Y_1,Y_2\right\rangle_{\Phi}=\text{tr}(\Phi(Y_1)^T\Phi(Y_2))
$$
该内积对于子空间的具体实现(specific realization)具有不变性，诱导出如下距离
$$
d_p(Y_1 Y_1^T,Y_2 Y_2^T) = 2^{-1/2}\|Y_1 Y_1^T-Y_2 Y_2^T\|_F
$$
该距离与Grassmannian流形上的真实测地线距离近差常数倍($\sqrt{2}$)。

### 降维映射

由于投影矩阵的对称性，使用双线性映射可实现流形间$\mathcal G(q,D)\to\mathcal G(q,d)$的降维。
$$
f(Y_iY_i^T)=W^TY_iY_i^TW=(W^TY_i)(W^TY_i)^T
$$
其中变换矩阵$W\in\mathbb R^{D\times d}$是列满秩的。除非$W$是正交矩阵，$W^TY_i$不是正交基矩阵。下面用$W^TY_i$的正交部分$W^TY_i^{'}$作为投影后的点。

**注意：双线性映射$f$并不是直接对流形上的点$Y_i\in\mathcal G(q,D)$进行降维，而是对投影点$Y_iY_i^T$操作，得到$W^TY_i^{'}\in\mathcal G(q,d)$的投影点$(W^TY_i^{'})(W^TY_i^{'})^T$，再考虑投影点间的几何关系。**

### 学习投影度量

降维后的一对点$(W^TY_i^{'},W^TY_j^{'})$在投影$\Phi$意义下为$(W^T Y_i^{'}Y_i^{'T} W,W^T Y_j^{'}Y_j^{'T} W)$，因此距离度量
$$
\begin{aligned}
&d_p^2(W^T Y_i^{'}Y_i^{'T} W,W^T Y_j^{'}Y_j^{'T} W)\\
&=2^{-1/2}\|W^T Y_i^{'}Y_i^{'T} W-W^T Y_j^{'}Y_j^{'T} W\|_F^2\\
&=2^{-1/2}\text{tr}(PA_{ij}A_{ij}^TP)
\end{aligned}
$$
其中$A_{ij}=Y_i^{'}Y_i^{'T} - Y_j^{'}Y_j^{'T}$，$P=WW^T$。由于$W$仅假设列满秩的，因此$P$是一个$D\times D$的且秩为$d$的对称半正定矩阵。

### 判别函数

下面分别给出类间散度$J_b(P)$(between-class)和类内散度$J_w(P)$(within-class)的定义
$$
\begin{aligned}
J_w(P)&=\frac{1}{N_w}\sum_{i=1}^m\sum_{j:C_i=C_j}2^{-1/2}\text{tr}(PA_{ij}A_{ij}^TP)\\
J_b(P)&=\frac{1}{N_b}\sum_{i=1}^m\sum_{j:C_i\neq C_j}2^{-1/2}\text{tr}(PA_{ij}A_{ij}^TP)
\end{aligned}
$$
判别分析的一类传统设定是最大化投影点类间距离而最小化投影点类内距离，即目标函数为
$$
\arg\min_P J(P) = J_w(P) - \alpha J_b(P)
$$
其中参数$\alpha$为两个惩罚性的权衡系数。

### 标准化$Y$

前面提过，$W$仅假设列满秩的，因此$W^TY_i$的列不是正交的，因此为满足低维的Grassmann流形的表示，对$Y_i\in\mathcal G(q,D)$进行标准化得到$Y_i^{'}$，以保证$W^TY_i^{'}\in\mathcal G(q,d)$。

对$W^TY_i$进行QR分解$W^TY_i=Q_i R_i$，其中$Q_i$的列是正交的(半酉阵)，而$R_i$是可逆的上三角阵。通过变换
$$
Q_i = W^T(Y_i R_i^{-1}) = W^T Y_i^{'}
$$
因此对$Y_i$进行标准化得到$Y_i^{'}=Y_i R_i^{-1}$，则$W^TY_i^{'}\in\mathcal G(q,d)$。

### 计算$P$

由于$P$是一个大小$D\times D$且秩$d$的对称半正定矩阵，目标函数关于$P$的梯度需要在秩固定的流形上，因此需要使用非线性黎曼共轭梯度下降法(RCG)。

为简化判别目标函数，记
$$
\begin{aligned}
S_w&=\frac{1}{N_w}\sum_{i=1}^m\sum_{j:C_i=C_j}2^{-1/2}\text{tr}(A_{ij}A_{ij}^T)\\
S_b&=\frac{1}{N_b}\sum_{i=1}^m\sum_{j:C_i\neq C_j}2^{-1/2}\text{tr}(A_{ij}A_{ij}^T)
\end{aligned}
$$
则两个散度可简化成矩阵的表示
$$
J_w(P) = PS_wP,J_b(P) = PS_bP
$$
目标函数为
$$
\arg\min_P J(P) = \text{tr}(PS_wP)-\alpha\text{tr}(PS_bP)
$$
在第$k$次迭代上，该函数的欧式梯度为
$$
D_PJ(P_k)=2(S_w-\alpha S_b)P_k
$$
对应的黎曼梯度可从欧式梯度$D_PJ(P_k)$进行
$$
\nabla_PJ(P_k) = D_PJ(P_k) - P_kP_k^T D_PJ(P_k)
$$
通过组合新的黎曼梯度和旧的搜索方向$H_{k-1}$可得到新的搜索方向
$$
H_k \leftarrow -\nabla_PJ(P_k) + \eta \tau(H_{k-1},P_{k-1},P_k)
$$


### 算法流程图

![](Projection-Metric-Learning-Grassmann-Manifold/alg-1.png)

![](Projection-Metric-Learning-Grassmann-Manifold/alg-2.png)

## 小结

这篇文章虽然是15年的CVPR，但是现在看来文章的想法依然很先进，目前基于流形的判别学习都大致是这类套路，首先将数据信息刻划到流形上，再从流形的几何性质出发，最后构造合适的目标函数并求解。至于用什么性质，构造出什么样的模型，就看功底了。本质上来说，这类文章属于机器学习利用了几何的工具衍生出的一个分支。

## References

[^1]:[Zhiwu Huang, Computer Vision Lab](https://zhiwu-huang.github.io/)

[^2]: Z. Huang, R. Wang, S. Shan and X. Chen, "Projection Metric Learning on Grassmann Manifold with Application to Video based Face Recognition," *2015 IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*, Boston, MA, 2015, pp. 140-149, doi: 10.1109/CVPR.2015.7298609.




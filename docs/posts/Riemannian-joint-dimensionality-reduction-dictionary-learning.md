---
title: 联合降维和字典学习
categories:
  - 信号处理
tags:
  - 流形表示
  - 降维
  - 字典学习
mathjax: true
password: password
excerpt: 介绍一篇基于黎曼几何的联合降维和字典学习会议论文
urlname: Riemannian-joint-dimensionality-reduction-dictionary-learning
date: 2021-01-23 17:20:00
---

## 写在前面

以前的机器学习文章大多关注部分步骤的优化，而非采用整体而统一的框架来实现端到端的学习。Hiroyuki Kasai的短文[^1]介绍降维+字典学习联合框架实现对称正定矩阵流形的分类。另外，这个作者[^2]写了几个流形优化的开源库，挺好用的。

## 基础知识

### 字典学习

传统的字典学习通常是作用在向量型数据上的，即字典的基函数是向量。即使对于二维乃至高维的数据，字典学习也是将块数据拉成向量处理。最开始的字典学习如KSVD、MOD、SimCo等等都是用来重构、去噪等无监督任务上的，后来添加标签信息产生的监督字典学习算法、如D-KSVD、LC-KSVD等。然而这些以KSVD为核心的字典学习算法都无法避免奇异值分解步骤，这不适于高维情形。降维不仅可减少计算成本，而且可突出数据的低维判别特征。

当前的研究从向量到矩阵再到张量进行拓展，感兴趣的特征也从线性到非线性。流形成为特征几何表示的一个重要工具。与欧式空间相比，流形的优势在于矩阵表示保留了向量所舍弃的潜在几何关系。

给定数据样本集$\mathcal{X}=\{\mathbf{X}_1, \ldots, \mathbf{X}_N \} \in \mathbb{R}^{d\times d \times N}$，字典$\mathcal{D} = \{ \mathbf{D}_1, \ldots, \mathbf{D}_H\} \in \prod^H \mathcal{S}^d_{++}$的基$\mathbf{D}_h \in \mathcal{S}^{d}_{++}$不再是向量，而是对称正定矩阵。其中$\mathcal{X}$和$\mathcal{D}$都是三阶张量。通过稀疏编码得到稀疏系数向量为$\boldsymbol{a}_n \in \mathbb{R}^H_+$，系数矩阵记为$\mathbf{A}=[\boldsymbol{a}_1,\ldots, \boldsymbol{a}_N] \in \mathbb{R}^{H \times N}_+$。

为保证样本的重构正定，即稀疏锥组合为$\mathcal{D}\otimes\boldsymbol{a}_n=\sum_{h=1}^H \boldsymbol{a}_{n,h} \mathbf{D}_h$，通常假设系数向量为$\boldsymbol{a}_n$非负。

下面是基于对称正定矩阵流形的字典学习优化问题：

$$
\min_{\scriptsize \mathcal{D} \in \prod^H \mathcal{S}^d_{++}, \mathbf{A} \in \mathbb{R}^{H \times N}_+} \frac{1}{2} \sum_{n=1}^N  d^2(\mathbf{X}_n, \mathcal{D}\otimes\boldsymbol{a}_n) + R_a(\boldsymbol{a}_n) + R_D(\mathcal{D})
$$

其中$R_a(\boldsymbol{a}_n)$为稀疏正则项，$R_D(\mathcal{D})$为字典基的正则项。该问题对两个变量非凸，但对单个变量是凸的，因此通常采用交替迭代分别求解字典学习子问题和稀疏编码子问题。

## R-JDRDL模型

该模型使用双线性映射实现流形降维。具体来说，给定矩阵$\mathbf{X}_{k,n} \in \mathcal{S}_{++}^m$，利用半酉阵$\mathbf{U} \in {\rm St}(d, m)\doteq\{ \mathbf{U} \in \mathbb{R}^{m \times d}: \mathbf{U}^T \mathbf{U} = \mathbf{I} \}$，投影结果为$\mathbf{U}^T\mathbf{X}_{k,n} \mathbf{U} \in \mathcal{S}_{++}^d$。

优化变量说明：投影矩阵和字典在乘积流形上$(\mathbf U, \mathcal D) \in \mathcal N\doteq\{\mathrm{St}{(d,m)} \times \prod^H \mathcal{S}^d_{++}\}$，稀疏系数矩阵$\mathbf{A} \in \mathbb{R}^{H \times N}_+$。

$$
\begin{aligned}
\{ \hat{\mathbf{U}}, \hat{\mathcal{D}}, \hat{\mathbf{A}} \}  =
\operatorname*{argmin}_{(\scriptsize \mathbf{U}, \mathcal{D}) \in \mathcal{N}, \mathbf{A} \in \mathbb{R}^{H\times N}_+} 
&J_d(\mathbf{U}, \mathcal{D}, \mathbf{A}) 
+ \lambda_a J_a(\mathbf{A}) + \lambda_u J_u(\mathbf{U})\\ 
&+ \lambda_1 R_s(\mathbf{A}) + \lambda_2 R_r(\mathbf{A})+ \lambda_d R_d(\mathcal{D})
\end{aligned}
$$

### 判别重构项

$$
\begin{aligned}
J_d(\mathbf{U}, \mathcal{D}, \mathbf{A}) 
=& \frac{1}{2}\sum_{k=1}^K  \sum_{n=1}^{N_k} (d^2(\mathbf{U}^T\mathbf{X}_{k,n} \mathbf{U}, \mathcal{D}\otimes\boldsymbol{a}_{k,n})\\
&+ d^2(\mathbf{U}^T\mathbf{X}_{k,n} \mathbf{U}, \mathcal{D}_k\otimes\boldsymbol{a}^k_{k,n}) ) \\
&+ \lambda_d \sum_{j=1, j \neq k}^K \sum_{n=1}^{N_k} \| \mathcal{D}_j\otimes\boldsymbol{a}^j_{k,n} \|_2^2
\end{aligned}
$$

- 第一项约束整体字典锥组合与降维数据后的重构性
- 第二项保证子字典的判别性
- 第三项保证字典之间的互异性

### 基于图的相似项

$$
J_a(\mathbf{A}) = \sum_{p=1}^N \sum_{q=1}^N\frac{1}{2} \| \boldsymbol{a}_{p} - \boldsymbol{a}_{q}\|_2^2\ {\mathbf G}_{bin}(p,q)
$$

其中系数${\mathbf G}_{bin}(p,q)$的构造采用Harandi等人标签信息编码几何关系的仿射矩阵（参见[^3]）
$$
{\mathbf G}_{bin}(p,q) = {\mathbf G}_{bin}^w(p,q) - {\mathbf G}_{bin}^b(p,q)
$$
其中类内相似度${\mathbf G}_{bin}^w(p,q)$和类间相似度${\mathbf G}_{bin}^b(p,q)$分别为
$$
\begin{aligned}
	&{\mathbf G}_{bin}^w(p,q) = \left\{
	\begin{array}{ll}
		1 &\ {\rm if}\ \mathbf{X}_p \in N_w(\mathbf{X}_q) \ {\rm or\ } \mathbf{X}_p \in N_w(\mathbf{X}_q) \\
		0 &\ {\rm otherwise},
	\end{array}	
	\right.\\
	&{\mathbf G}_{bin}^b(p,q) = \left\{
	\begin{array}{ll}
		1 &\ {\rm if}\ \mathbf{X}_p \in N_b(\mathbf{X}_q) \ {\rm or\ } \mathbf{X}_p \in N_b(\mathbf{X}_q) \\
		0 &\ {\rm otherwise},
	\end{array}	
	\right.	
\end{aligned}
$$

注意，此处优化变量为$\mathbf{A}$，意味着稀疏系数具有特征。

### 基于图的投影项


$$
J_u(\mathbf{U}) =  \sum_{p=1}^N \sum_{q=1}^N\frac{1}{2}  d^2(\mathbf{U}^T\mathbf{X}_{p} \mathbf{U}, \mathbf{U}^T\mathbf{X}_{q} \mathbf{U})\ {\mathbf G}_{rd}(p,q)
$$
其中仿射矩阵用不同点之间的黎曼距离赋权值，保证降维前后几何关系的相似性。

### 新样本的分类策略

由于基于图的投影项保留了高维样本流形到低维判别流形的几何结构，因此投影矩阵对新的样本同样适用。首先需要获得流形字典学习的稀疏编码向量

$$
\hat{\boldsymbol{a}} = {\rm arg\ min}_{\scriptsize \boldsymbol{a} \in \mathbb{R}_+^{n}} \frac{1}{2}  d^2(\mathbf{U}^T\mathbf{X}_{test}\mathbf{U}\, \mathcal{D}\otimes\boldsymbol{a}) + \lambda_1 \| \boldsymbol{a}\|_1
$$

然后划分子字典对应的子向量$\hat{\boldsymbol{a}}=[\hat{\boldsymbol{a}}^1, \ldots, \hat{\boldsymbol{a}}^k, \ldots, \hat{\boldsymbol{a}}^K]^T$，利用残差判断标签
$$
e_k=d^2(\mathbf{U}^T\mathbf{X}_{test}\mathbf{U}\, \mathcal{D}_k \otimes\hat{\boldsymbol{a}}^k) + \sigma \| \hat{\boldsymbol{a}} - \boldsymbol{m}_k\|^2_2
$$
这一原理与稀疏编码做人脸识别相似，字典相似度高的样本对应的稀疏编码分量会集中在某一字典上。因此利用残差较小的类字典可改善分类结果。

### 模型说明

之前有些文章的投影矩阵要么是利用基于图的投影正则项，要么是利用基于图的相似正则项。即使是联合框架，也是先降维，再低维流形字典学习加判别分析，降维投影过程中鉴别能力没有体现出来，这种分步完成的算法会损失有效特征信息。本文是采用

- 投影矩阵基于图的投影正则项
- 字典学习稀疏矩阵基于图的相似正则项

本文思路是构造通过字典学习找到低维特征，再通过降维将该特征反映出来，因此低维流形的字典分类能力会显著提高。此外，基于图的投影项中的赋权矩阵可选择更好的策略。

## 交替优化求解算法

该模型涉及三个优化变量，而且每个变量都具有特殊的矩阵约束，因此在交替迭代基础上还需要黎曼优化框架来确保乘积流形$\mathcal{N}$。

### 优化子问题：字典学习


$$
\begin{aligned}
\min_{\scriptsize (\mathbf{U}, \mathcal{D}) \in \mathcal{N} } f(\mathbf{U}, \mathcal{D}) &=
J_d(\mathbf{U}, \mathcal{D}, \hat{\mathbf{A}})  + \lambda_u J_u(\mathbf{U}) + \lambda_d R_d(\mathcal{D}) \\
& =\frac{1}{2}\sum_{k=1}^K \sum_{n=1}^{N_k} ( d^2(\mathbf{U}^T\mathbf{X}_{k,n} \mathbf{U},\mathcal{D}\otimes\hat{\boldsymbol{a}}_{k,n}) \\ 
&+ d^2(\mathbf{U}^T\mathbf{X}_{k,n} \mathbf{U},\mathcal{D}_k\!\otimes\!\hat{\boldsymbol{a}}^k_{k,n}) ) \\
& + \lambda_{da}\sum_{j=1, j \neq k}^K \sum_{n=1}^{N_k} \| \mathcal{D}_j\!\otimes\!\hat{\boldsymbol{a}}^j_{k,n} \|_2^2 \\
& +\lambda_u \sum_{p=1}^N \sum_{q=1}^N\frac{1}{2}d^2(\mathbf{U}^T\mathbf{X}_{p} \mathbf{U}, \mathbf{U}^T\mathbf{X}_{q} \mathbf{U}) {\mathbf G}_{dr}(p,q)\\
&+ \lambda_d R_d(\mathcal{D})	
\end{aligned}
$$

利用乘积流形的黎曼优化框架中的黎曼共轭梯度下降算法求解该子问题。

### 优化子问题：稀疏编码


$$
\begin{aligned}
\min_{\scriptsize \mathbf{A} \in \mathbb{R}_+^{H \times N} } \Psi(\mathbf{A})  
&= J_d (\hat{\mathbf{U}}, \hat{\mathcal{D}}, \mathbf{A})  + \lambda_a J_a(\mathbf{A}) +  \lambda_1 R_s(\mathbf{A}) + \lambda_2 R_r(\mathbf{A}) \\
&=\frac{1}{2} \sum_{k=1}^K (\sum_{n=1}^{N_k}
d^2(\hat{\mathbf{U}}^T\mathbf{X}_{k,n} \hat{\mathbf{U}},\hat{\mathcal{D}}\otimes\boldsymbol{a}_{k,n})\\
&+ d^2(\hat{\mathbf{U}}^T\mathbf{X}_{k,n} \hat{\mathbf{U}}, \hat{\mathcal{D}}_k\!\otimes\!\boldsymbol{a}^k_{k,n}))\\
&  + \lambda_d  \sum_{j=1, j \neq k}^K \sum_{n=1}^{N_k} \| \hat{\mathcal{D}}_j\otimes\boldsymbol{a}^j_{k,n} \|_2^2 \\
& + \sum_{p=1}^N \sum_{q=1}^N\frac{1}{2} \| \boldsymbol{a}_{p} - \boldsymbol{a}_{q}\|_2^2\ {\mathbf G}_{bin}(p,q)\\
&  +  \lambda_1 R_s(\mathbf{A}) + \lambda_2 R_r(\mathbf{A})
\end{aligned}
$$

该问题是一个矩阵形式的凸优化问题，梯度投影算法或频谱投影梯度（SPG）求解器可解决该子问题。

## 小结

本文虽然看着非常的庞大，各种各样的正则项，但是具体看每一项都是熟悉的，组合模型这种模式确实是当前写论文的一个可行解。（虽然更喜欢短小精悍的模型）

## References

[^1]: H. Kasai and B. Mishra, Riemannian joint dimensionality reduction and dictionary learning on symmetric positive definite manifolds, *2018 26th European Signal Processing Conference (EUSIPCO)*, Rome, Italy, 2018, pp. 2010-2014, doi: 10.23919/EUSIPCO.2018.8553200.
[^2]: hiroyuki-kasai: [Github](https://github.com/hiroyuki-kasai), [Homepage](http://kasai.comm.waseda.ac.jp/kasai/)
[^3]: [SPD流形的降维](https://pxxyyz.com/posts/Dimensionality-Reduction-SPD-Manifolds/)




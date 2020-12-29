---
title: SPD流形的降维
categories:
  - 信号处理
tags:
  - 流形表示
  - 降维
mathjax: true
excerpt: 介绍一篇基于几何的SPD流形的降维
urlname: Dimensionality-Reduction-SPD-Manifolds
date: 2020-12-03 11:00:00
---

## 写在前面

本文介绍一篇流形降维领域非常经典的文章[^1]，利用SPD流形的几何关系分别构建监督和无监督两种范式的降维学习。

## 基础知识

### 仿射不变黎曼度量

SPD流形$\mathcal S_{++}^n$研究最多的度量还是仿射不变黎曼度量。对于点$\boldsymbol{P} \in \mathcal S_{++}^n$和切向量$\boldsymbol{v},\boldsymbol{w} \in T_{\boldsymbol{P}}{\mathcal S_{++}^n}$，
$$
\begin{aligned}
	\langle \boldsymbol{v}, \boldsymbol{w} \rangle_\boldsymbol{P} &\triangleq  \langle \boldsymbol{P}^{-1/2}\boldsymbol{v}\boldsymbol{P}^{-1/2}, \boldsymbol{P}^{-1/2}\boldsymbol{w}\boldsymbol{P}^{-1/2} \rangle \\
	&= \text{tr} \left( \boldsymbol{P}^{-1} \boldsymbol{v} \boldsymbol{P}^{-1} \boldsymbol{w}\right)
\end{aligned}
$$
该度量诱导出测地线距离$\delta_R(\boldsymbol{X},\boldsymbol{Y}) = \|\log(\boldsymbol{X}^{-1/2}\boldsymbol{Y}\boldsymbol{X}^{-1/2})\|_F$具有仿射变换不变性，即$\delta_R(\boldsymbol{X},\boldsymbol{Y}) = \delta_R(\boldsymbol{A}\boldsymbol{X}\boldsymbol{A}^T,\boldsymbol{A}\boldsymbol{Y}\boldsymbol{A}^T)$。

### Bregman散度

记$\zeta : \mathcal{S}_{++}^{n} \rightarrow \mathbb{R}$为严格凸且可微的函数，则Bregman矩阵散度为
$$
d_\zeta(\boldsymbol{X},\boldsymbol{Y}) = \zeta(\boldsymbol{X}) - \zeta(\boldsymbol{Y}) - \langle \nabla_{\zeta} (\boldsymbol{Y}) , \boldsymbol{X} - \boldsymbol{Y} \rangle \; ,
$$
Bregman散度具有非对称、非负和正定性质。下面将Bregman散度对称化。

- Stein散度

选择$\zeta(\boldsymbol{X}) = - \log \det(\boldsymbol{X})$，通过Jensen-Shannon 对称化得到Stein散度
$$
\begin{aligned}
	\delta_S^2(\boldsymbol{X},\boldsymbol{Y}) &\triangleq \frac{1}{2}	
   	d_{\zeta}\left( \boldsymbol{X},\frac{\boldsymbol{X}+\boldsymbol{Y}}{2} \right) +
	\frac{1}{2} d_{\zeta}\left( \boldsymbol{Y},\frac{\boldsymbol{X}+\boldsymbol{Y}}{2} \right) \\
    &= \log \det\bigg( \frac{\boldsymbol{X}+\boldsymbol{Y}}{2} \bigg)
    - \frac{1}{2}  \log \det ( \boldsymbol{X}\boldsymbol{Y})
\end{aligned}
$$

- Jeffrey散度

选择$\zeta(\boldsymbol{X}) = -\ln \det(\boldsymbol{X})$，通过平均得到Jeffrey散度
$$
\begin{aligned}
	\delta_J^2(\boldsymbol{X},\boldsymbol{Y}) &\triangleq \frac{1}{2} d_\zeta(\boldsymbol{X},\boldsymbol{Y}) + \frac{1}{2}d_\zeta(\boldsymbol{Y},\boldsymbol{X}) \\
	&= \frac{1}{2}\text{tr} (\boldsymbol{X}^{-1}\boldsymbol{Y}) - \frac{1}{2}\log \det(\boldsymbol{X}^{-1}\boldsymbol{Y}) \\
	&+   \frac{1}{2}\text{tr} (\boldsymbol{Y}^{-1}\boldsymbol{X}) - \frac{1}{2}\log \det(\boldsymbol{Y}^{-1}\boldsymbol{X}) -n \\			  
	&= \frac{1}{2}\text{tr} (\boldsymbol{X}^{-1}\boldsymbol{Y}) + \frac{1}{2}\text{tr} (\boldsymbol{Y}^{-1}\boldsymbol{X}) -n
\end{aligned}
$$

Stein散度和Jeffrey散度同样具有仿射变换不变性
$$
\begin{aligned}
	\delta_S^2(\boldsymbol{X},\boldsymbol{Y}) & = \delta_S^2(\boldsymbol{A}\boldsymbol{X}\boldsymbol{A}^T,\boldsymbol{A}\boldsymbol{Y}\boldsymbol{A}^T). \\
	\delta_J^2(\boldsymbol{X},\boldsymbol{Y}) & = \delta_J^2(\boldsymbol{A}\boldsymbol{X}\boldsymbol{A}^T,\boldsymbol{A}\boldsymbol{Y}\boldsymbol{A}^T).
\end{aligned}
$$
此外，Stein散度、Jeffrey散度和AIRM度量得到的测地线距离具有倍数关系。

## 优化框架

一般都是提出优化问题后再设计求解算法，不过本文集成了监督学习和无监督学习，但都是使用梯度下降法，所以把优化前置了，后面在模型里直接放结果。该框架可表示为如下优化框架：
$$
\min_{\boldsymbol{W}\in \mathbb{R}^{n \times m}}~f(\boldsymbol{W}) \quad {\rm s.t.}\quad\boldsymbol{W}^T\boldsymbol{W} = \mathbf{I}_m
$$
在仿射变换不变性质下，$f(\boldsymbol{W})$与由$\boldsymbol{W}$张成的基选择无关，即对正交矩阵$\boldsymbol{R} \in \mathcal{O}(m)$，有$f(\boldsymbol{W}) = f(\boldsymbol{W}\boldsymbol{R})$，则该问题落在了Grassmann流形$\mathcal G(m,n)$上，下面使用Grassmann优化技术中的黎曼共轭梯度法完成优化。

### 黎曼共轭梯度法

记$\nabla_\boldsymbol{W}(f)$为${f}(\boldsymbol{W})$关于$\boldsymbol{W}$的雅可比矩阵，$\mathcal G(m,n)$上的梯度表示为
$$
\operatorname{grad}f(\boldsymbol{W}) = (\mathbf{I}_n - \boldsymbol{W}\boldsymbol{W}^T)\nabla_\boldsymbol{W}(f)
$$
黎曼共轭梯度法包含以下三个步骤：

1. 计算当前的梯度$\operatorname{grad}f(\boldsymbol{W})$
2. 通过平行传输先前的搜索方向并将其与$\operatorname{grad}f(\boldsymbol{W})$组合来确定搜索方向$H$。
3. 在方向$H$上沿$W$的测地线进行直线搜索。

在停止前反复迭代这三步可得到局部极小点。

### 平行传输

上面有一步$\tau(\boldsymbol{H},\boldsymbol{W},\boldsymbol{V})$表示从$\boldsymbol{W}$到$\boldsymbol{V}$的切向量的的并$\Delta$行传输。

与欧式空间不同，在流形上不能通过简单的平移将切向量$\Delta$从一点传递到另一点。在流形$\mathcal M$上将$\Delta$从$\boldsymbol{W}$运输到$\boldsymbol{V}$需要减去法向分量$\Delta_{\perp}$到的矢量为切向量。这种切向量的转移称为平行传输(parallel transporting)。

![](Dimensionality-Reduction-SPD-Manifolds/fig-Parallel-transport.png)

## 流形$\mathcal S_{++}^n$降维

通过双线性映射实现高维流形$\mathcal S_{++}^n$到低维流形$\mathcal S_{++}^m$的嵌入，即对$\boldsymbol{X}\in\mathcal S_{++}^n$
$$
f_\boldsymbol{W}(\boldsymbol{X}) = \boldsymbol{W}^T\boldsymbol{X}\boldsymbol{W}\in \mathcal S_{++}^m
$$

### 监督降维

首先需要将标签信息编码至流形点的几何关系中，下面使用类内距离和类间距离定义一个仿射关系，利用双线性映射同时最小化类间距离且最大化类内距离，完成判别分析。

- 类内相似度$g_w: \mathcal S_{++}^n \times \mathcal S_{++}^n \to \mathbb{R}_+$
  $$
  g_w(\boldsymbol{X}_i,\boldsymbol{X}_j) =
     	\left\{
   		\begin{matrix}
         	1, & \text{if} \; \boldsymbol{X}_i \in N_w(\boldsymbol{X}_j ) \; \text{or} \; \boldsymbol{X}_j \in N_w(\boldsymbol{X}_i ) \\
     		0, & \text{otherwise}
     		\end{matrix}
     	\right.
  $$
  $N_w(\boldsymbol{X}_i)$是$\boldsymbol{X}_i$与共享$y_i$相同标签的$\nu_w$个最近邻居的集合。

- 类间相似度$g_b: \mathcal S_{++}^n \times \mathcal S_{++}^n \to \mathbb{R}_+$
  $$
  g_b(\boldsymbol{X}_i,\boldsymbol{X}_j) =
     	\left\{
     	\begin{matrix}
         	1, & \text{if} \; \boldsymbol{X}_i \in N_b(\boldsymbol{X}_j ) \; \text{or} \; \boldsymbol{X}_j \in N_b(\boldsymbol{X}_i ) \\
         	0, & \text{otherwise}
     	\end{matrix}
     	\right.
  $$
  $N_b(\boldsymbol{X}_i)$是$\nu_b$个包含$\boldsymbol{X}_i$的最近邻居，并带有不同的标签。

- 仿射函数$a(\cdot,\cdot)$类似于最大间隔准则(Maximum Margin Criterion)
  $$
  a(\boldsymbol{X}_i,\boldsymbol{X}_j) = g_w(\boldsymbol{X}_i,\boldsymbol{X}_j) - g_b(\boldsymbol{X}_i,\boldsymbol{X}_j)
  $$

- 目标函数
  $$
  L(\boldsymbol{W}) = \sum_{\substack{i,j=1 \\ j \neq i}}^p a(\boldsymbol{X}_i,\boldsymbol{X}_j) \delta^2 \left(\boldsymbol{W}^T\boldsymbol{X}_i\boldsymbol{W},\boldsymbol{W}^T\boldsymbol{X}_j\boldsymbol{W}\right)
  $$
  其中$\delta$可以选择$\delta_R$、$\delta_S$或$\delta_J$。

- 梯度计算

  ![](Dimensionality-Reduction-SPD-Manifolds/fig-Jacobian.png)

算法流程

![](Dimensionality-Reduction-SPD-Manifolds/alg-1.png)

### 无监督降维

无监督场景无法利用标签信息对样本的进行区分。下面使用最大化方差的准则来完成流形无监督降维，即

记所有样本点$\{\boldsymbol{X}_i\}_{i = 1}^{p}$关于度量$\delta$的几何均值为$\boldsymbol{M}$，通常选择Frechet 形式来计算
$$
\boldsymbol{M}^\ast \triangleq \arg\min_{\boldsymbol{M} \in \mathcal S_{++}^n}\sum_{i=1}^p \delta^2 (\boldsymbol{X}_i, \boldsymbol{M})
$$

- AIRM度量，利用指数算子和对数算子计算黎曼(Karcher)均值
- Stein散度，通过迭代凸凹步骤(CCCP)计算均值
- Jeffrey散度，均值具有显式表达

最大化方差意味着所有投影点与均值投影点的距离最大化，即
$$
L(\boldsymbol{W}) = \sum_{i = 1}^p \delta^2\left( \boldsymbol{W}^T\boldsymbol{X}_i\boldsymbol{W}, \boldsymbol{W}^T\boldsymbol{M}\boldsymbol{W} \right)
$$
注意：$\boldsymbol{W}^T \boldsymbol{M} \boldsymbol{W}$并不是投影后的几何均值点，即
$$
\boldsymbol{W}^T\left(\arg\min_{\boldsymbol{M} \in \mathcal S_{++}^n}\sum_{i=1}^p \delta^2 (\boldsymbol{X}_i, \boldsymbol{M}) \right)\boldsymbol{W}\neq \arg\min_{\boldsymbol{F} \in \mathcal S_{++}^m}\sum_{i=1}^p \delta^2(\boldsymbol{W}^T\boldsymbol{X}_i\boldsymbol{W},\boldsymbol{F})
$$

### Log-Euclidean度量与监督降维

除了AIRM和两个Bregman散度，Log-Euclidean度量也是流形$\mathcal S_{++}^n$上常用的度量
$$
\delta_{lE}(\boldsymbol{X},\boldsymbol{Y}) = \|\log(\boldsymbol{X}) - \log(\boldsymbol{Y})\|_F
$$
监督降维的度量$\delta$改为Log-Euclidean度量，得到如下优化目标
$$
L(\boldsymbol{W}) = \sum_{i,j=1}^p
a(\boldsymbol{X}_i,\boldsymbol{X}_j) \Big \| \log(\boldsymbol{W}^T\boldsymbol{X}_i \boldsymbol{W}) 
-\log(\boldsymbol{W}^T \boldsymbol{X}_j \boldsymbol{W}) \Big \|_F^2
$$
通过将$\log(\boldsymbol{W}^T \boldsymbol{X} \boldsymbol{W})$近似为$\boldsymbol{W}^T \log(\boldsymbol{X}) \boldsymbol{W}$，目标函数可改写为
$$
\begin{aligned}
L(\boldsymbol{W}) &= \sum_{i,j=1}^p a(\boldsymbol{X}_i,\boldsymbol{X}_j) \Big \| \boldsymbol{W}^T \log(\boldsymbol{X}_i)\boldsymbol{W} 
	- 	\boldsymbol{W}^T \log(\boldsymbol{X}_j)\boldsymbol{W} \Big \|_F^2\\ 
	&= \text{tr}{ \Big( \boldsymbol{W}^T \boldsymbol{F}(\boldsymbol{W}) \boldsymbol{W} \Big)}
\end{aligned}
$$
其中
$$
\boldsymbol{F}(\boldsymbol{W}) = \sum_{i,j=1}^p a(\boldsymbol{X}_i,\boldsymbol{X}_j) \Big( \log(\boldsymbol{X}_i) - \log(\boldsymbol{X}_j) \Big) \boldsymbol{W}\boldsymbol{W}^T \times \Big(\log(\boldsymbol{X}_i) - \log(\boldsymbol{X}_j) \Big)
$$
则优化问题可改写为特征分解问题
$$
\min_{\boldsymbol{W}} \text{tr}{\Big( \boldsymbol{W}^T \boldsymbol{F}(\boldsymbol{W}) \boldsymbol{W} \Big)} ~\text{s.t.}~ \boldsymbol{W}^T\boldsymbol{W} = \mathbf{I}_m\;.
$$
采样二阶段迭代方式更新$\boldsymbol{W}$和$\boldsymbol{F}(\boldsymbol{W})$，算法步骤如下：

![](Dimensionality-Reduction-SPD-Manifolds/alg-2.png)

- Log-Euclidean度量的监督模型求解算法对比发现，特征分解法比黎曼共轭梯度法**快10倍**。

- 把Bregman散度的函数选为$\zeta(\boldsymbol{X}) = \|\boldsymbol{X}\|_F^2$，即使用$\|\cdot\|_F^2$作为相似性度量，可以得到类似的特征分解问题。

## 小结

后面还有一些东西就不细说了。作者M. Harandi[^2]、M. Salzmann[^3]和R. Hartley[^4]做了很多机器学习与几何的结合。

## References

[^1]:M. Harandi, M. Salzmann and R. Hartley, Dimensionality Reduction on SPD Manifolds: The Emergence of Geometry-Aware Methods, in *IEEE Transactions on Pattern Analysis and Machine Intelligence*, vol. 40, no. 1, pp. 48-62, 1 Jan. 2018, doi: 10.1109/TPAMI.2017.2655048.
[^2]:Mehrtash Harandi homepage: <https://sites.google.com/site/mehrtashharandi/>
[^3]: Mathieu Salzmann homepage: <https://people.epfl.ch/mathieu.salzmann>
[^4]: Richard Hartley google scholar: <https://scholar.google.com/citations?hl=zh-CN&user=cHia5p0AAAAJ&view_op=list_works&sortby=pubdate>


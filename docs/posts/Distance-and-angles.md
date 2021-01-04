---
title: 子空间度量与扰动分析
categories:
  - 信号处理
tags:
  - 谱分析
  - 子空间
  - 扰动分析
mathjax: true
excerpt: 量化两个子空间的接近程度，子空间的扰动分析。
urlname: Distance-and-angles
date: 2021-01-04 13:35:00
---

## 写在前面

在大牛Yuejie Chi的主页[^1]上找到一个讲谱方法的小册子[^2]，准备系统地学习下。

## 子空间度量

### 旋转模糊

记子空间 $\mathcal{U}$ 和 ${\mathcal{U}}^{\star}$ 的正交基分别为 $\boldsymbol{U}$ 和 $\boldsymbol{U}^{\star}$ 。为了测量子空间 $\mathcal{U}$ 和 ${\mathcal{U}}^{\star}$ 的距离，一个自然的想法是构造出一个度量$\vert\vert\vert{\boldsymbol{U}-{\boldsymbol{U}}^{\star}}\vert\vert\vert$，其中$\vert\vert\vert{\cdot}\vert\vert\vert$是感兴趣的一种范式，例如谱范数或Frobenius范数。然而这样的度量通常没有考虑全局的旋转模糊，即对任意旋转矩阵$\boldsymbol{R}\in\mathcal{O}^{r\times r}$，矩阵$\boldsymbol{U}\boldsymbol{R}$的列也是子空间$\mathcal{U}$的有效正交基。这意味着下面情况可能出现：当子空间 $\mathcal{U}$ 和 ${\mathcal{U}}^{\star}$ 相同时，其距离度量不为零，即
$$
\vert\vert\vert{\boldsymbol{U}-{\boldsymbol{U}^{\star}}}\vert\vert\vert \neq 0
$$
这表明，测量两个子空间的接近程度的任何有意义的度量，都应适当考虑旋转模糊。

### 距离度量

- 最佳旋转距离

计算距离之前找到最佳旋转矩阵$\boldsymbol R$，在最佳旋转时测量距离
$$
\mathsf{dist}_{\vert\vert\vert{\cdot}\vert\vert\vert}\big(\boldsymbol{U},{\boldsymbol{U}}^{\star}\big) \doteq \min _{\boldsymbol{R}\in \mathcal{O}^{r\times r}} \vert\vert\vert\boldsymbol{U} \boldsymbol{R} - \boldsymbol{U}^{\star}\vert\vert\vert
$$

- 投影矩阵之间的距离

由于子空间$\mathcal{U}$的投影矩阵$\boldsymbol{U}\boldsymbol{U}^{\top}$是唯一的，且不受旋转的影响，即
$$
\boldsymbol{U}\boldsymbol{U}^{\top}=\boldsymbol{U}\boldsymbol{R}\boldsymbol{R}^{\top}\boldsymbol{U}^{\top}, \forall \boldsymbol{R}\in \mathcal{O}^{r\times r}
$$
这种旋转不变性可用来定义子空间 $\mathcal{U}$ 和 ${\mathcal{U}}^{\star}$ 之间的距离
$$
\mathsf{dist}_{\mathsf{p},\vert\vert\vert{\cdot}\vert\vert\vert}\big(\boldsymbol{U},{\boldsymbol{U}}^{\star}\big) \doteq \vert\vert\vert\boldsymbol{U} \boldsymbol{U}^{\top}- {\boldsymbol{U}}^{\star} {\boldsymbol{U}}^{\star\top}\vert\vert\vert
$$

- 通过主角进行几何构造

设矩阵$\boldsymbol{U}^{\top}{\boldsymbol{U}}^{\star}$的奇异值为$\sigma_{1}\geq \sigma_{2}\geq \cdots\geq \sigma_{r} \geq 0$，由于
$$
\| \boldsymbol{U}^{\top}{\boldsymbol{U}}^{\star} \| \leq \| \boldsymbol{U} \| \, \| {\boldsymbol{U}}^{\star} \|=1
$$
所有的奇异值$\{\sigma_{i}\}_{i=1}^r$在区间$[0,1]$内。因此我们可以定义两个子空间之间的主角（或规范角）
$$
\theta_{i} \doteq \arccos \left(\sigma_{i}\right)\qquad\text{for all }1\leq i\leq r,
$$
这些角度满足
$$
0\leq\theta_{1}\leq \cdots\leq\theta_{r}\leq\pi/2.
$$
有了这些角度，就可以测量子空间之间的距离
$$
\mathsf{dist}_{\mathsf{sin},\vert\vert\vert{\cdot}\vert\vert\vert}\big(\boldsymbol{U},{\boldsymbol{U}}^{\star}\big) \doteq \vert\vert\vert\sin\boldsymbol{\Theta}\vert\vert\vert
$$
其中$\boldsymbol{\Theta}=\text{diag}(\theta_{1},\theta_{2},\ldots,\theta_{r}),\sin\boldsymbol{\Theta}=\text{diag}(\sin\theta_{1},\sin\theta_{2},\ldots,\sin\theta_{r})$。

### 度量之间的关系

- 当$2r\leq n$时，矩阵$\boldsymbol{U}\boldsymbol{U}^{\top}-{\boldsymbol{U}}^{\star}{\boldsymbol{U}}^{\star\top}$的奇异值为

$$
\underbrace{\sin\theta_{r},\, \sin\theta_{r},\, \sin\theta_{r-1},\, \sin\theta_{r-1},\,\cdots,\,\sin\theta_{1},\,\sin\theta_{1}}_{2r},\;\underbrace{0,\,0,\,\cdots,\,0}_{n-2r}.
$$

这意味着投影矩阵的差和子空间之间的主角具有明确的联系。

- 当$1\le r \le n$时，度量$\mathsf{dist}_{\mathsf{p},\vert\vert\vert{\cdot}\vert\vert\vert}\big(\cdot,\cdot\big)$和$\mathsf{dist}_{\mathsf{sin},\vert\vert\vert{\cdot}\vert\vert\vert}\big(\cdot,\cdot\big)$具有如下等式关系

$$
\begin{aligned}
	\big\Vert \boldsymbol{U}\boldsymbol{U}^{\top}-{\boldsymbol{U}}^{\star}{\boldsymbol{U}}^{\star\top}\big\Vert
	& =\left\Vert \sin\boldsymbol{\Theta}\right\Vert  = \big\Vert \boldsymbol{U}_{\perp}^{\top}\boldsymbol{U}^{\star}\big\Vert = \big\Vert \boldsymbol{U}^{\top}\boldsymbol{U}_{\perp}^{\star}\big\Vert\\
	\tfrac{1}{\sqrt{2}} \big\Vert \boldsymbol{U}\boldsymbol{U}^{\top}-{\boldsymbol{U}}^{\star}{\boldsymbol{U}}^{\star\top}\big\Vert _{\mathrm{F}}
	& =\left\Vert \sin\boldsymbol{\Theta}\right\Vert _{\mathrm{F}}
	=  \big\Vert \boldsymbol{U}_{\perp}^{\top}\boldsymbol{U}^{\star}\big\Vert_{\mathrm{F}} =   \big\Vert \boldsymbol{U}^{\top}\boldsymbol{U}_{\perp}^{\star} \big\Vert_{\mathrm{F}}
\end{aligned}
$$

- 当$1\le r \le n$时，度量$\mathsf{dist}_{\vert\vert\vert{\cdot}\vert\vert\vert}\big(\cdot,\cdot\big)$和$\mathsf{dist}_{\mathsf{p},\vert\vert\vert{\cdot}\vert\vert\vert}\big(\cdot,\cdot\big)$具有如下不等式关系

$$
\begin{aligned}
	\|\boldsymbol{U}\boldsymbol{U}^{\top} - \boldsymbol{U}^{\star}\boldsymbol{U}^{\star\top} \|
	&\leq
	\min_{\boldsymbol{R}\in \mathcal{O}^{r\times r}}\big\|\boldsymbol{U}\boldsymbol{R}-\boldsymbol{U}^{\star}\big\|
	\leq \sqrt{2} \|\boldsymbol{U}\boldsymbol{U}^{\top} - \boldsymbol{U}^{\star}\boldsymbol{U}^{\star\top} \| \\
	\tfrac{1}{\sqrt{2}} \|\boldsymbol{U}\boldsymbol{U}^{\top} - \boldsymbol{U}^{\star}\boldsymbol{U}^{\star\top} \|_{\mathrm{F}}
	&\leq
	\min_{\boldsymbol{R}\in\mathcal{O}^{r\times r}}\left\Vert \boldsymbol{U}\boldsymbol{R}-\boldsymbol{U}^{\star}\right\Vert _{\mathrm{F}}
	\leq \|\boldsymbol{U}\boldsymbol{U}^{\top} - \boldsymbol{U}^{\star}\boldsymbol{U}^{\star\top} \|_{\mathrm{F}}
\end{aligned}
$$

## 特征子空间的扰动分析

设$n\times n$的实对称矩阵$\boldsymbol{M}^{\star}$ 和$\boldsymbol{M}=\boldsymbol{M}^{\star}+\boldsymbol{E}$ ，对其进行特征分解
$$
\begin{aligned}
\boldsymbol{M}^{\star} 
&=\sum_{i=1}^{n}\lambda_{i}^{\star}\boldsymbol{u}_{i}^{\star}\boldsymbol{u}_{i}^{\star\top} 
=\left[\begin{array}{cc}
\boldsymbol{U}^{\star} & \boldsymbol{U}_{\perp}^{\star}\end{array}\right]\left[\begin{array}{cc}
\boldsymbol{\Lambda}^{\star} & \boldsymbol{0}\\
\boldsymbol{0} & \boldsymbol{\Lambda}_{\perp}^{\star}
\end{array}\right]\left[\begin{array}{c}
\boldsymbol{U}^{\star\top}\\
\boldsymbol{U}_{\perp}^{\star\top}
\end{array}\right]\\
\boldsymbol{M} 
&=\sum_{i=1}^{n}\lambda_{i}\boldsymbol{u}_{i}\boldsymbol{u}_{i}^{\top}
=\left[\begin{array}{cc}
\boldsymbol{U} & \boldsymbol{U}_{\perp}\end{array}\right]\left[\begin{array}{cc}
\boldsymbol{\Lambda} & \boldsymbol{0}\\
\boldsymbol{0} & \boldsymbol{\Lambda}_{\perp}
\end{array}\right]\left[\begin{array}{c}
\boldsymbol{U}^{\top}\\
\boldsymbol{U}_{\perp}^{\top}
\end{array}\right]
\end{aligned}
$$
其中分块矩阵按秩$r$来选择。
$$
\begin{aligned}
\boldsymbol{U} &=[\boldsymbol{u}_{1},\cdots,\boldsymbol{u}_{r}]\in\mathbb{R}^{n\times r}, \\
\boldsymbol{U}_{\perp} &=[\boldsymbol{u}_{r+1},\cdots,\boldsymbol{u}_{n}]\in\mathbb{R}^{n\times (n-r)},\\
\boldsymbol{\Lambda}&=\text{diag}\big([\lambda_{1},\cdots,\lambda_{r}]\big),\\
\boldsymbol{\Lambda}_{\perp} &=\text{diag}\big([\lambda_{r+1},\cdots,\lambda_{n}]\big).
\end{aligned}
$$
矩阵 $\boldsymbol{U}^{\star}, \boldsymbol{U}_{\perp}^{\star}, \boldsymbol{\Lambda}^{\star}, \boldsymbol{\Lambda}_{\perp}^{\star}$ 的定义类似。

### Davis-Kahan $\sin\Theta$定理

对常数$\alpha,\beta\in \mathbb{R}$，eigengap$\Delta>0$，假设下面条件成立
$$
\begin{aligned}
	\mathsf{eigenvalues}(\boldsymbol{\Lambda}^{\star}) &\subseteq [\alpha,\beta] ,\\
	\mathsf{eigenvalues}(\boldsymbol{\Lambda}_{\perp}) &\subseteq (-\infty, \alpha-\Delta] \cup [\beta+\Delta, \infty)
\end{aligned}
$$
则
$$
\begin{aligned}
\mathsf{dist}\big(\boldsymbol{U},\boldsymbol{U}^{\star}\big) & \leq\sqrt{2}\|\sin\boldsymbol{\Theta}\|\leq\frac{\sqrt{2}\big\|\boldsymbol{E}\boldsymbol{U}^{\star}\big\|}{\Delta}\leq\frac{\sqrt{2}\|\boldsymbol{E}\|}{\Delta};\\
\mathsf{dist}_{\mathrm{F}}\big(\boldsymbol{U},\boldsymbol{U}^{\star}\big) & \leq\sqrt{2}\|\sin\boldsymbol{\Theta}\|_{\mathrm{F}}\leq\frac{\sqrt{2}\big\|\boldsymbol{E}\boldsymbol{U}^{\star}\big\|_{\mathrm{F}}}{\Delta}\leq\frac{\sqrt{2r}\|\boldsymbol{E}\|}{\Delta}.
\end{aligned}
$$
当条件替换如下时，定理仍然成立
$$
\begin{aligned}
\mathsf{eigenvalues}(\boldsymbol{\Lambda}^{\star}) &\subseteq (-\infty, \alpha-\Delta] \cup [\beta+\Delta, \infty) ; \\
\mathsf{eigenvalues}(\boldsymbol{\Lambda}_{\perp}) &\subseteq [\alpha,\beta].
\end{aligned}
$$

在如下意义下，该定理可被推广至酉不变范数$\vert\vert\vert{\cdot}\vert\vert\vert$
$$
\vert\vert\vert\sin\boldsymbol{\Theta}\vert\vert\vert
\leq\frac{\vert\vert\vert\boldsymbol{E}\boldsymbol{U}^\star\vert\vert\vert}{\Delta}
$$
如果$\|\boldsymbol{E}\|< (1-1/\sqrt{2}) (|\lambda_{r}^{\star}|-|\lambda_{r+1}^{\star}|)$，有
$$
\begin{aligned}
\mathsf{dist}\big(\boldsymbol{U},\boldsymbol{U}^{\star}\big) & \leq\sqrt{2}\|\sin\boldsymbol{\Theta}\|\leq\frac{2 \big\|\boldsymbol{E}\boldsymbol{U}^{\star}\big\|}{|\lambda_{r}^{\star}|-|\lambda_{r+1}^{\star}|}\leq\frac{2\|\boldsymbol{E}\|}{|\lambda_{r}^{\star}|-|\lambda_{r+1}^{\star}|};\\
	\mathsf{dist}_{\mathrm{F}}\big(\boldsymbol{U},\boldsymbol{U}^{\star}\big) & \leq\sqrt{2}\|\sin\boldsymbol{\Theta}\|_{\mathrm{F}}\leq\frac{2 \big\|\boldsymbol{E}\boldsymbol{U}^{\star}\big\|_{\mathrm{F}}}{|\lambda_{r}^{\star}|-|\lambda_{r+1}^{\star}|}\leq\frac{2\sqrt{r}\|\boldsymbol{E}\|}{|\lambda_{r}^{\star}|-|\lambda_{r+1}^{\star}|}.
\end{aligned}
$$


## 奇异子空间的扰动分析

现在不再限制矩阵的对称性和方阵结构，考虑一般的矩阵$\boldsymbol{M}=\boldsymbol{M}^{\star}+\boldsymbol{E}\in\mathbb{R}^{n_1 \times n_2}$，不妨设$n_1\leq n_2$，对矩阵进行奇异值分解
$$
\begin{aligned}
\boldsymbol{M}^{\star} & =\sum_{i=1}^{n_1}\sigma_{i}^{\star}\boldsymbol{u}_{i}^{\star}\boldsymbol{v}_{i}^{\star\top}  =\left[\begin{array}{cc}
\boldsymbol{U}^{\star} & \boldsymbol{U}_{\perp}^{\star}\end{array}\right]\left[\begin{array}{ccc}
\boldsymbol{\Sigma}^{\star} & \boldsymbol{0} & \boldsymbol{0}\\
\boldsymbol{0} & \boldsymbol{\Sigma}_{\perp}^{\star} & \boldsymbol{0}
\end{array}\right]\left[\begin{array}{c}
\boldsymbol{V}^{\star\top}\\
\boldsymbol{V}_{\perp}^{\star\top}
\end{array}\right]\\
\boldsymbol{M} & =\sum_{i=1}^{n_1}\sigma_{i}\boldsymbol{u}_{i}\boldsymbol{v}_{i}^{\top} =\left[\begin{array}{cc}
\boldsymbol{U} & \boldsymbol{U}_{\perp}\end{array}\right]\left[\begin{array}{ccc}
\boldsymbol{\Sigma} & \boldsymbol{0} & \boldsymbol{0}\\
\boldsymbol{0} & \boldsymbol{\Sigma}_{\perp} & \boldsymbol{0}
\end{array}\right]\left[\begin{array}{c}
\boldsymbol{V}^{\top}\\
\boldsymbol{V}_{\perp}^{\top}
\end{array}\right]
\end{aligned}
$$
其中分块矩阵按秩$r$来选择。
$$
\begin{aligned}
\boldsymbol{\Sigma}  &=\mathsf{diag}\big([\sigma_{1},\cdots,\sigma_{r}]\big),\\
\boldsymbol{\Sigma}_{\perp} &=\mathsf{diag}\big([\sigma_{r+1},\cdots,\sigma_{n_1}]\big),\\
\boldsymbol{U}  &=[\boldsymbol{u}_{1},\cdots,\boldsymbol{u}_{r}]\in \mathbb{R}^{n_1\times r},\\
\boldsymbol{U}_{\perp} &=[\boldsymbol{u}_{r+1},\cdots,\boldsymbol{u}_{n_1}]\in \mathbb{R}^{n_1\times (n_1-r)},\\
\boldsymbol{V}  &=[\boldsymbol{v}_{1},\cdots,\boldsymbol{v}_{r}]\in \mathbb{R}^{n_2\times r},\\
\boldsymbol{V}_{\perp} &=[\boldsymbol{v}_{r+1},\cdots,\boldsymbol{v}_{n_2}] \in \mathbb{R}^{n_2\times (n_2-r)}.
\end{aligned}
$$
矩阵$\boldsymbol{\Sigma}^{\star},\boldsymbol{\Sigma}_{\perp}^{\star},\boldsymbol{U}^{\star},\boldsymbol{U}_{\perp}^{\star},\boldsymbol{V}^{\star},\boldsymbol{V}_{\perp}^{\star}$的定义类似。

### Wedin's $\sin\Theta$定理

如果$\|\boldsymbol{E}\|<\sigma_{r}^{\star}-\sigma_{r+1}^{\star}$，则
$$
\begin{aligned}
\max\left\{ \mathsf{dist}\big(\boldsymbol{U},\boldsymbol{U}^{\star}\big),\mathsf{dist}\big(\boldsymbol{V},\boldsymbol{V}^{\star}\big)\right\}
	& \leq\frac{ \sqrt{2} \max\big\{ \|\boldsymbol{E}^{\top}\boldsymbol{U}^{\star}\|,\|\boldsymbol{E}\boldsymbol{V}^{\star}\|\big\} }{\sigma_{r}^{\star}-\sigma_{r+1}^{\star}-\|\boldsymbol{E}\|};\\
\max\left\{ \mathsf{dist}_{\mathrm{F}}\big(\boldsymbol{U},\boldsymbol{U}^{\star}\big),\mathsf{dist}_{\mathrm{F}}\big(\boldsymbol{V},\boldsymbol{V}^{\star}\big)\right\}
	& \leq\frac{\sqrt{2}\max\big\{ \|\boldsymbol{E}^{\top}\boldsymbol{U}^{\star}\|_{\mathrm{F}},\|\boldsymbol{E}\boldsymbol{V}^{\star}\|_{\mathrm{F}}\big\} }{\sigma_{r}^{\star}-\sigma_{r+1}^{\star}-\|\boldsymbol{E}\|}.
\end{aligned}
$$

进一步，如果$\|\boldsymbol{E}\|< (1-1/\sqrt{2})(\sigma_{r}^{\star}-\sigma_{r+1}^{\star})$，有
$$
\begin{aligned}
\max\left\{ \mathsf{dist}\big(\boldsymbol{U},\boldsymbol{U}^{\star}\big),\mathsf{dist}\big(\boldsymbol{V},\boldsymbol{V}^{\star}\big)\right\}
	& \leq\frac{ 2 \|\boldsymbol{E}\| }{\sigma_{r}^{\star}-\sigma_{r+1}^{\star}}, \\
\max\left\{ \mathsf{dist}_{\mathrm{F}}\big(\boldsymbol{U},\boldsymbol{U}^{\star}\big),\mathsf{dist}_{\mathrm{F}}\big(\boldsymbol{V},\boldsymbol{V}^{\star}\big)\right\}
	& \leq \frac{ 2\sqrt{r}\|\boldsymbol{E}\| }{\sigma_{r}^{\star}-\sigma_{r+1}^{\star}},
\end{aligned}
$$


## 小结

后面还有一系列扰动理论及其应用，有时间再看，先接触下。

## References

[^1]: Yuejie Chi homepage: <http://users.ece.cmu.edu/~yuejiec/index.html>

[^2]: Y. Chen, Y. Chi, J. Fan, and C. Ma. [Spectral Methods for Data Science: A Statistical Perspective](http://users.ece.cmu.edu/~yuejiec/papers/SpectralMethods.pdf). *Foundation and Trends in Machine Learning*, [arXiv:2012.08496v1](https://arxiv.org/abs/2012.08496v1), 2020.


---
title: L1/L2最小化的加速算法
categories:
  - 信号处理
tags:
  - 优化
mathjax: true
excerpt: 介绍L1/L2最小化的加速算法(Accelerated Schemes for the L1/L2 Minimization)
urlname: minimization-l1-l2
date: 2020-08-25 12:00:00
---

## 写在前面
介绍$L_1/L_2$最小化的加速算法 [^1]，我在本科的时候就开始跟着我的导师看娄易非老师的文章($\ell_1-\ell_2$)，现在虽然方向不一致，但是看文献总能学到新的技巧，我想以后会一直留意娄老师的最新文献的。附上娄老师主页[^2]。

## 优化模型

### $L_0$最小化

$$
\min_{\mathbf x \in \mathbb R^n} \|\mathbf x\|_0 \quad \text{s.t.} \quad A \mathbf x = \mathbf b
$$

NP 难问题

- 贪婪算法(**当$n$很大时，缺乏求解精度**)
  - 正交匹配追踪(OMP)
  - 正交最小二乘(OLS)
  - 采样匹配追踪(CoSaMp)
- 近似算法()
  - 凸松弛：$L_1$替换$L_0$的基追踪(BP)
  - 非凸松弛：多种改进

### 比率优化问题$\frac{L_1}{L_2}$

$$
\min_{\mathbf x \in \mathbb R^n} \frac{\|\mathbf x\|_1}{\|\mathbf x\|_2} \quad \text{s.t.} \quad A \mathbf x = \mathbf b
$$

- 尺度不变性
- 不含参数
- 非凸的稀疏度度量
- 使用ADMM算法求解

引入两个辅助变量，构造增广的拉格朗日函数
$$
\begin{aligned}
L(x,y,z,v,w) =& \frac{\|z\|_1}{\|y\|_2} + I(Ax-b) \\
&+ \frac{\rho_1}{2}\|x-y +\frac{1}{\rho_1}v\|_2^2 \\
&+ \frac{\rho_2}{2}\|x-z+\frac{1}{\rho_2}w\|_2^2
\end{aligned}
$$
其中$I(\cdot)$为示性函数
$$
I(t) = \begin{cases}
0,  & t = 0 \\
+\infty, & \text{otherwise}
\end{cases}
$$

### 混合优化问题$L_1 - \alpha L_2$

$$
\min_{\mathbf x \in \mathbb R^n} \|\mathbf x\|_1 - \alpha \|\mathbf x\|_2 \quad \text{s.t.} \quad A \mathbf x = \mathbf b
$$

娄老师在这一问题上有很多成果，可以参考主页[^2]。

### 联系

下面的性质给出比率模型$\frac{L_1}{L_2}$与混合模型$L_1 - \alpha L_2$之间的关系：
$$
\begin{aligned}
\alpha^* &= \inf_{\mathbf x} \left\{\frac{\|\mathbf x\|_1}{\|\mathbf x\|_2} \quad \text{s.t.} \quad A \mathbf x = \mathbf b \right\}\\
T(\alpha) &= \inf_{\mathbf x} \left\{\|\mathbf x\|_1 - \alpha \|\mathbf x\|_2 \quad \text{s.t.} \quad A \mathbf x = \mathbf b \right\}
\end{aligned}
$$
则

- 若$T(\alpha) < 0$，则$\alpha > \alpha^*$。
- 若$T(\alpha) \geq 0$，则$\alpha \leq \alpha^*$。
- 若$T(\alpha) = 0$，则$\alpha = \alpha^*$。

这表明比率模型的最优值是$T(\alpha)$的根，因此可通过分半搜索(bisection search)来求得。

由向量范数的等价关系
$$
\|\mathbf x\|_2 \leq \|\mathbf x\|_1 \leq \sqrt{n}\|\mathbf x\|_2,\quad\forall \mathbf x \in \mathbb R^n
$$
可以设置初始参数$\alpha^{(0)} \in [1,\sqrt n]$，并根据$T(\alpha^{(0)})$进行分半搜索

- 若$T(\alpha) = 0$，则混合模型的最优值是比率模型的最优值。

- 若$T(\alpha) < 0$，则更新$\alpha$的范围$[\alpha^{(0)},\sqrt n]$。
- 若$T(\alpha) \geq 0$，则更新$\alpha$的范围$[1,\alpha^{(0)}]$。因为在下一次迭代时，混合模型$L_1 - \frac{\|x^{(k+1)}\|_1}{\|x^{(k+1)}\|_2}L_2$的目标函数不超过$0$，可进一步考虑区间$[1,\frac{\|x^{(k+1)}\|_1}{\|x^{(k+1)}\|_2}]$。
- 更新范围后，选择区间断点的均值作为参数$\alpha^{(1)}$，并迭代下去。

### 凸函数之差算法

对于非凸函数$f(x)$，若存在两个凸函数$g(x),h(x)$满足$f(x) = g(x) - h(x)$，那么如下优化问题
$$
\min_x f(x)
$$
可通过对$h(x)$线性化，得到迭代DCA序列
$$
x^{(k+1)} = \arg\min_x g(x) - \left \langle x, \nabla h(x^{(k)} \right \rangle
$$

### 求解算法

由于$L_1 - \alpha L_2$模型的目标函数可化成两个凸函数之差
$$
g(x) = \|x\|_1 + I(Ax-b), h(x) = \alpha\|x\|_2
$$
因此可通过如下DCA迭代序列求解$L_1 - \alpha L_2$模型
$$
x^{(k+1)} = \arg\min_x g(x) - \left \langle x, \frac{\alpha x^{(k)}}{\|x^{(k)}\|_2} \right \rangle
$$

### 分半搜索算法流程

![](minimization-l1-l2/alg-1.png)

解释：

- line 2:$lb,ub$为参数$\alpha$的区间范围
- line 4:通过DCA序列求解混合模型
- line 11:通过区间的均值作为参数$\alpha$的更新
- 整个算法是基于比率模型和混合模型的解关系来设计的分半搜索

### 参数自适应迭代

用当前解的比率作为参数$\alpha$的更新，得到如下模型$(A1)$

$$
\left\{\begin{array}{l}
\mathbf{x}^{(k+1)}=\arg \min _{\mathbf{x}}\left\{g(\mathbf{x})-\left\langle\mathbf{x}, \frac{\alpha^{(k)} \mathbf{x}^{(k)}}{\left\|\mathbf{x}^{(k)}\right\|_{2}}\right\rangle\right\} \\
\alpha^{(k+1)}=\left\|\mathbf{x}^{(k+1)}\right\|_{1} /\left\|\mathbf{x}^{(k+1)}\right\|_{2}
\end{array}\right.
$$

求解$\mathbf{x}$的子问题是一个线性规划问题，但由于问题的无界性，不能保证最优解存在。下面整合一个二次项来增加模型的鲁棒性$(A2)$

$$
\left\{\begin{array}{l}
\mathbf{x}^{(k+1)}=\arg \min _{\mathbf{x}}\left\{g(\mathbf{x})-\left\langle\mathbf{x}, \frac{\alpha^{(k)} \mathbf{x}^{(k)}}{\left\|\mathbf{x}^{(k)}\right\|_{2}}\right\rangle+\frac{\beta}{2}\left\|\mathbf{x}-\mathbf{x}^{(k)}\right\|_{2}^{2}\right\} \\
\alpha^{(k+1)}=\left\|\mathbf{x}^{(k+1)}\right\|_{1} /\left\|\mathbf{x}^{(k+1)}\right\|_{2}
\end{array}\right.
$$
- 模型$(A1)$

$$
\arg \min _{\mathbf{x}} \|\mathbf{x}\|_1 + I(A\mathbf{x}-b)-\left\langle\mathbf{x}, \frac{\alpha^{(k)} \mathbf{x}^{(k)}}{\left\|\mathbf{x}^{(k)}\right\|_{2}}\right\rangle
$$

任意实数(向量)可表示为两正数(向量)之差，可假设$\mathbf{x} = \mathbf{x}^+ - \mathbf{x}^-$，其中$\mathbf{x}^+,\mathbf{x}^- >0$，记$\bar{\mathbf{x}} = [\mathbf{x}^+ ;\mathbf{x}^-]^T,\bar A = [A \quad -A]$，则模型$(A1)$转化为
$$
\min_{\bar{\mathbf{x}} \geq 0} \left[1+\frac{\alpha^{(k)} \mathbf{x}^{(k)}}{\left\|\mathbf{x}^{(k)}\right\|_{2}};1-\frac{\alpha^{(k)} \mathbf{x}^{(k)}}{\left\|\mathbf{x}^{(k)}\right\|_{2}}\right]^T \bar{\mathbf{x}} \quad \text{s.t.} \quad \bar A \bar{\mathbf{x}} = \mathbf{b}
$$
该线性规划问题可通过Gurobi求解器解决。

- 模型$(A2)$

$$
\arg \min _{\mathbf{x}}\|\mathbf{x}\|_1 + I(A\mathbf{x}-b)-\left\langle\mathbf{x}, \frac{\alpha^{(k)} \mathbf{x}^{(k)}}{\left\|\mathbf{x}^{(k)}\right\|_{2}}\right\rangle+\frac{\beta}{2}\left\|\mathbf{x}-\mathbf{x}^{(k)}\right\|_{2}^{2}
$$

引入二次项后，模型是一个二次规划问题，可通过ADMM算法求解。引入辅助变量并构造拉格朗日函数
$$
\begin{aligned}
L_\rho (\mathbf x, \mathbf y, \mathbf u) =& \|\mathbf{y}\|_1 + I(A\mathbf{x}-b)-\left\langle\mathbf{x}, \frac{\alpha^{(k)} \mathbf{x}^{(k)}}{\left\|\mathbf{x}^{(k)}\right\|_{2}}\right\rangle\\
&+\frac{\beta}{2}\left\|\mathbf{x}-\mathbf{x}^{(k)}\right\|_{2}^{2} + \mathbf u^T(\mathbf x-\mathbf y) + \frac{\rho}{2}\left\|\mathbf{x}-\mathbf{y}\right\|_{2}^{2} 
\end{aligned}
$$
对$\mathbf x$的子问题可视为$Ax=b$约束下的最小二乘问题，通过投影算子写成显式解；对$\mathbf y$的子问题是一类经典的$\ell_1$范数的优化问题，可通过软阈值算子写成其显式解。这里就不一一细说了。

### 参数自适应迭代的算法流程

![](minimization-l1-l2/alg-2.png)

## 与其他工作的关联

文章算法与参数选择、广义逆幂和基于梯度的方法均产生关联，下面介绍后两种的联系

### 广义逆幂

逆幂方法是一种求解半正定对称矩阵的最小特征值方法，其通过迭代求解下面线性方程
$$
B\mathbf x^{(k+1)} = \mathbf x^{(k)}
$$
记迭代收敛结果(即最小特征值对应的特征向量)为$\mathbf x^*$，则最小特征值估计为$\lambda = q(\mathbf x^*)$，其中$q(\cdot)$为瑞利商
$$
q(\mathbf x) = \frac{\left\langle\mathbf x,B\mathbf x\right\rangle}{\|\mathbf x\|_2^2}
$$
迭代求解线性方程等价为如下优化问题
$$
\mathbf x^{(k+1)} = \arg\min_{\mathbf x}\frac{1}{2}\left\langle\mathbf x,B\mathbf x\right\rangle-\left\langle\mathbf x^{(k)},\mathbf x\right\rangle
$$
以上思路可以推广至非线性情形，得到广义逆幂方法。对任意函数$r(\cdot), s(\cdot)$，考虑一个广义的商函数
$$
q(\mathbf x) = \frac{r(\mathbf x)}{s(\mathbf x)}
$$
以及对应优化问题和特征值的更新
$$
\left\{\begin{array}{l}
\mathbf{x}^{(k+1)}=\arg\min_{\mathbf x}r(\mathbf x)- \lambda^{(k)}\left\langle \nabla s(\mathbf x^{(k)}),\mathbf x\right\rangle \\
\lambda^{(k+1)}=r(\mathbf{x}^{(k+1)})/s(\mathbf{x}^{(k+1)})
\end{array}\right.
$$
显然，当$r(\mathbf{x}) = g(\mathbf{x}),s(\mathbf{x}) = \|\mathbf{x}\|_2,\lambda = \alpha$时，以上广义逆幂与模型$(A1)$一致。通过最速下降流(steepest descent flow)整合二次项则得到模型$(A2)$。

### 梯度方法

回到比率优化问题$\frac{L_1}{L_2}$
$$
\min_{\mathbf x \in \mathbb R^n} \frac{\|\mathbf x\|_1}{\|\mathbf x\|_2} \quad \text{s.t.} \quad A \mathbf x = \mathbf b
$$

根据KKT条件，$\mathbf x^*\neq \mathbf 0$是优化问题的临界点当且仅当存在向量$\mathbf s$满足
$$
\left\{\begin{array}{l}
0 \in \frac{\partial\left\|\mathbf{x}^{*}\right\|_{1}}{\left\|\mathbf{x}^{*}\right\|_{2}}-\frac{\left\|\mathbf{x}^{*}\right\|_{1}}{\left\|\mathbf{x}^{*}\right\|_{2}^{2}} \frac{\mathbf{x}^{*}}{\left\|\mathbf{x}^{*}\right\|_{2}}+A^{T} \mathbf{s} \\
0=A \mathbf{x}^{*}-\mathbf{b}
\end{array}\right.
$$
对向量缩放$\hat{\mathbf s} = \|\mathbf{x}^{*}\|_2 \mathbf s$，第一个次梯度条件为
$$
0 \in \partial\left\|\mathbf{x}^{*}\right\|_{1}-\frac{\left\|\mathbf{x}^{*}\right\|_{1}}{\left\|\mathbf{x}^{*}\right\|_{2}} \frac{\mathbf{x}^{*}}{\left\|\mathbf{x}^{*}\right\|_{2}}+A^{T} \hat{\mathbf{s}}
$$
该最优性条件往往也对应符合此梯度相同的其他优化问题
$$
\min_{\mathbf x} g(\mathbf x) + w(\mathbf x)
$$
其中$w(\cdot)$的形式无法明确确定，但仅需要其梯度信息
$$
\begin{aligned}
g(\mathbf{x}) &= \|\mathbf{x}\|_1 + I(A\mathbf{x}-\mathbf{b})\\
\nabla w(\mathbf{x}) &= -\frac{\left\|\mathbf{x}\right\|_{1}}{\left\|\mathbf{x}\right\|_{2}} \frac{\mathbf{x}}{\left\|\mathbf{x}\right\|_{2}}
\end{aligned}
$$
对于该优化问题，采用近邻梯度法(proximal gradient)得到迭代
$$
\mathbf x^{(k+1)} = \textbf{prox}_{\frac{g}{\beta}} (\mathbf x^{(k)} - \frac{1}{\beta}\nabla w(\mathbf x^{(k)}))
$$
其中近邻算子为
$$
\textbf{prox}_g (\mathbf y) = \arg\min_{\mathbf z} g(\mathbf z) + \frac{1}{2}\|\mathbf z-\mathbf y\|_2^2
$$
这与模型$(A2)$相同，因此模型$(A2)$可以被理解为一种梯度下降方法。

这些一致性为算法的收敛性提供了良好的性质，至于收敛性就不细说了。

## 参考文献

[^1]: C. Wang, M. Yan, Y. Rahimi and Y. Lou. Accelerated Schemes for the L1/L2 Minimization, IEEE Transactions on Signal Processing, vol. 68, pp. 2660-2669, 2020.
[^2]: 娄易非老师主页: <https://sites.google.com/site/louyifei>


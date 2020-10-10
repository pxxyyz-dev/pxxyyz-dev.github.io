---
title: 秩1矩阵追踪矩阵补全
categories:
  - 信号处理
tags:
  - 秩1分解
  - 矩阵追踪
  - 矩阵补全
mathjax: true
excerpt: 秩1矩阵追踪矩阵补全
urlname: Rank-One-Matrix-Pursuit-Matrix-Completion
date: 2020-10-07 16:00:00
---

## 写在前面

前一个博客涉及到矩阵追踪的算法，因此补了一下相关文献[^1]$^,$[^2]。第一个文献发在了机器学习的顶会上，先占坑。第二篇同年发在了SIAM上，相当于第一篇的加强版。不过两篇应该是同期出来的。这两篇文章的主要贡献如下：

- 将正交匹配追踪算法从向量推广至矩阵版本
- 标准算法具有线性收敛速度
- 简化版算法降低了计算量并维持收敛速度
- 无需调参，理论上证明收敛性
- 将算法推广至更一般的矩阵感知问题

第一篇文章标题是矩阵补全的秩1矩阵追踪，第二篇标题为低秩矩阵补全的正交秩1矩阵追踪，两篇虽然字面意思相差在正交性上，但是基矩阵都是默认互正交的，所以应该是区分一下两个文章的，后者没有实际意义上的改进。

## 秩1矩阵追踪

众所周知，任意实矩阵可表示为若干个秩1矩阵的线性组合
$$
X=M(\boldsymbol\theta)=\sum_{i\in\mathcal I}\theta_i M_i
$$
其中$\{M_i\}$是秩1矩阵且具有单位长度的F范数，即$\text{rank}(M_i)=1，\|M_i\|_F=1$。这样的表示可以通过奇异值分解(SVD)来获得。

低秩矩阵近似问题常数找到$\theta$的$\ell_0$范数来满足约束：
$$
\min_\boldsymbol\theta \|\boldsymbol\theta\|_0 \quad\text{s.t.}\quad \mathcal P_\Omega(M(\boldsymbol\theta))=\mathcal P_\Omega(Y)
$$
该问题也等价于稀疏约束下的优化问题：
$$
\min_\boldsymbol\theta \|\mathcal P_\Omega(M(\boldsymbol\theta))-\mathcal P_\Omega(Y)\|_F^2 \quad\text{s.t.}\quad \|\boldsymbol\theta\|_0\leq r
$$
该问题可通过正交匹配追踪类型的贪婪算法来求解，其基(原子)$M_i$可设置为秩1矩阵。

如果字典$\{M_i:i\in\mathcal I\}$是已知且有限的，那么上述问题等价于压缩感知问题。然而，字典基的个数通常是无限且未知的，需要用基追踪算法来求解。通常情况下，我们可使用若干个秩1矩阵作为过完备字典的原子，再学习对应的稀疏系数。因此此类型的贪婪算法交替迭代以下两个步骤：

- 构造过完备字典的基
- 学习基对应的权系数

假设第$k-1$次迭代得到了秩1的基矩阵$M_1,\ldots,M_{k-1}$以及对应的系数$\boldsymbol \theta^{(k-1)}=(\theta_{1},\ldots,\theta_{k-1})$，在第$k$次迭代中我们需要寻找一个新的秩1基矩阵$M_k$和对应的系数$\theta_k$。

### 基的追踪

令当前的残差$R^{(k)}=\mathcal P_\Omega(Y)-X^{(k-1)}$，其中
$$
X^{(k-1)}=(M(\boldsymbol\theta^{(k-1)}))_\Omega=\sum_{i=1}^{k-1}\theta_i^{(k-1)} (M_i)_\Omega
$$
这个基$M_k\in\mathbb R^{m\times n}$需要与当前残差$R^{(k)}$尽可能的相关，即
$$
\max_M \left\langle M,R_k\right\rangle\quad\text{s.t.}\quad\text{rank}(M)=1,\|M\|_F=1
$$
注意到具有单位F范数的秩1矩阵可用两个单位向量的乘积表示，即$M=\boldsymbol u\boldsymbol v^T$，其中向量$\boldsymbol u\in\mathbb R^m,\boldsymbol v\in\mathbb R^n$满足$\|\boldsymbol u\|=\|\boldsymbol v\|=1$。因此上面矩阵形式的优化问题可等价表示为向量形式
$$
\max_{\boldsymbol u,\boldsymbol v} \boldsymbol u^TR_k\boldsymbol v\quad\text{s.t.}\quad\|\boldsymbol u\|=\|\boldsymbol v\|=1
$$
显然，最优解$(\boldsymbol u_*,\boldsymbol v_*)$是矩阵$R_k$的最大奇异值对应的左右奇异向量对，因此新的秩1矩阵可以很容易得到：$M_k = \boldsymbol u_*\boldsymbol v_*^T$。

### 系数的更新

得到当前所有的基$M_1,\ldots,M_{k-1},M_{k}$后，所有的权系数$\boldsymbol \theta^{(k)}=(\theta_{1},\ldots,\theta_{k-1},\theta_{k})\in\mathbb R^{k}$可通过如下最小二乘回归问题得到
$$
\min_{\boldsymbol \theta}\|\sum_{i=1}^k\theta_iM_i-Y\|_\Omega^2
$$
将矩阵$(Y)_\Omega$和$(M_i)_\Omega$拉成向量$\dot y$和$\dot m_i$，记向量组成的矩阵$\bar M_k=[\dot m_1,\ldots,\dot m_k]$，则上述最小二乘解可显示表示为
$$
\boldsymbol \theta^{(k)}=(\bar M_k^T\bar M_k)^{-1}\bar M_k^T\dot y
$$

### R1MP算法

![](Rank-One-Matrix-Pursuit-Matrix-Completion/Alg-R1MP.png)

### 收敛性结论

- 残差与基的垂直关系

$$
\left\langle R^{(k+1)},M_i\right\rangle=0,\quad\forall i=1,\ldots,k
$$

- 对应某些$k>1$有$R^{(k)}\neq0$，则对所有的$i\leq k$，$\bar M_i$列满秩。

- 残差递减关系

$$
\|R^{(k+1)}\|\leq\|R^{(k)}\|,\quad\forall k\geq 1
$$

引入辅助变量$\boldsymbol \theta^{(k)}=\boldsymbol \theta^{(k-1)}+\boldsymbol \eta^{(k)}$，不难得到
$$
\boldsymbol \eta^{(k)}=\arg\min_\boldsymbol\eta\|\sum_{i=1}^k \eta_iM_i-R_k\|_\Omega^2
$$
记$L^{(k)}=\sum_{i=1}^k \eta_i^{(k)}(M_i)_\Omega$，则
$$
\begin{aligned}
X^{(k+1)}&=X^{(k-1)}+L^{(k)},\\
R^{(k+1)}&=R^{(k+1)}-L^{(k)},\\
\|R^{(k+1)}\|^2&=\|R^{(k)}\|^2-\|L^{(k)}\|^2,\\
\|L^{(k)}\|^2&\geq\left\langle R^{(k)},M_k\right\rangle.
\end{aligned}
$$

- 秩1矩阵追踪算法的结果满足

$$
\|R_k\|\leq\left(\sqrt{1-\frac{1}{\min(m,n)}}\right)^{k-1}\|Y\|_\Omega,\quad\forall k\geq 1
$$

实际上，上界可以更小
$$
\|R_k\|\leq\|Y\|_\Omega\prod_{i=1}^{k-1}\sqrt{1-\frac{\sigma_{\max}^2(R_i)}{\|R_i\|^2}}
$$
因为$\frac{\|R_i\|^2}{\sigma_{\max}^2(R_i)}$实际上往往比$\min(m,n)$更小。

### 注记

- 当$\Omega$是整个矩阵时，OR1MP等价于SVD
- 低秩表示可以用来去除(高斯)噪声
- OMP是次线性收敛的，而OR1MP是线性收敛的

## 经济的秩1分解算法

R1MP算法需要同时处理所有的基和系数，耗时又耗复杂度的缺点不利于大规模的矩阵问题。

### 系数的更新

回到原来的系数更新问题
$$
\min_{\boldsymbol \theta}\|\sum_{i=1}^k\theta_iM_i-Y\|_\Omega^2
$$
在第$k-1$次迭代有一个现成的近似组合
$$
X^{(k-1)}=(M(\boldsymbol\theta^{(k-1)}))_\Omega=\sum_{i=1}^{k-1}\theta_i^{(k-1)} (M_i)_\Omega
$$
如果我们将求和项分为两项$aX^{(k-1)}+bM_k$，就不需要每次都逐个更新前$k-1$个基的系数$\boldsymbol\theta^{(k-1)}$，只需要在$X^{(k-1)}$的整体上$\{M_i:i=1,\ldots,k-1\}$进行适当得与$M_k$组合。这只需要将第$k-1$次迭代的系数$\boldsymbol\theta^{(k-1)}$进行缩放，再加上第$k$个系数$\theta_k^k$，便可得到第$k$次迭代的系数$\boldsymbol\theta^{(k)}$。因此可以考虑一个简单化的问题
$$
\boldsymbol\alpha^{(k)}=\arg\min_{\boldsymbol\alpha=\{\alpha_1,\alpha_2\}}\|\alpha_1X^{(k-1)}+\alpha_2M^{(k)}-Y\|_\Omega^2,
$$
其中$\boldsymbol\alpha\in\mathbb R^{2}$。得到结果后，系数变化为
$$
\theta_k^{(k)}=\alpha_2^{(k)},\quad\theta_i^{(k)}=\theta_i^{(k-1)}\alpha_1^{(k)},\forall i<k.
$$
对应的近似为
$$
X^{(k)}=\sum_{i=1}^{k}\theta_i^{(k)} (M_i)_\Omega=\alpha_1^{(k)}X^{(k-1)}+\alpha_2^{(k)}(M_k)_\Omega.
$$

### ER1MP算法

![](Rank-One-Matrix-Pursuit-Matrix-Completion/Alg-ER1MP.png)

### 收敛性结论

- 残差与组合的两项具有垂直关系

$$
\left\langle R^{(k+1)},X^{(k-1)}\right\rangle=0,\left\langle R^{(k+1)},M_k\right\rangle=0
$$

- 残差与组合的长度关系

$$
\|R^{(k+1)}\|^2=\|Y_\Omega\|^2-\|X^{(k)}\|^2,\quad\forall k\geq 1
$$

- 残差非减

$$
\|R^{(k+1)}\|\leq\|R^{(k)}\|,\quad\forall k\geq 1
$$

- 上式残差取等关系

如果$X^{(k-1)}$与$(M_k)_\Omega$线性相关，即存在非零常数$\beta\neq0$，有$X^{(k-1)}=\beta(M_k)_\Omega$，则$\|R^{(k+1)}\|=\|R^{(k)}\|$。

- 奇异值刻画不等式

$$
\left\langle R^{(k)},M_k\right\rangle=\sigma_{\max}(R_k)\geq\frac{\|R_k\|}{\sqrt{\min(m,n)}}
$$

- 线性无关的必要条件

设$R_k\neq0$，则对所有的非零常数$\beta\neq0$，有$X^{(k-1)}\neq\beta(M_k)_\Omega$

- 迭代过程中的残差界限

$$
\|R^{(k+1)}\|\leq\|R^{(k)}\|-\frac{\sigma_{\max}^2(R_k)}{\left\langle M_k,M_k\right\rangle}_\Omega
$$

- 经济的秩1矩阵追踪算法的结果满足

$$
\|R_k\|\leq\left(\sqrt{1-\frac{1}{\min(m,n)}}\right)^{k-1}\|Y\|_\Omega,\quad\forall k\geq 1
$$

### 注记

- OP1MP与EOP1MP都是线性收敛的，收敛结论一致
- EOP1MP仅处理重构$X^{(k-1)}$和基$M_k$，因此计算量和存储成本大大减少
- 两个算法收敛性的证明过程一致，只是OP1MP是对所有的基和组合，而EOP1MP的结论针对当前的基和前一代的重构成立

## 矩阵感知问题

考虑一个更一般的优化问题
$$
\min_{ {\mathbf X}\in  \mathbb R^{n \times m}} \text{rank}({\mathbf X}):  {\mathcal A}({\mathbf X}) ={\mathcal A}({\mathbf Y})
$$
其中${\mathbf Y}$是目标低秩矩阵，${\mathcal A}$是具有如下表示的线性算子
$$
\mathcal{A}(\mathbf{X})=\left[\begin{array}{c}
\operatorname{vec}\left(\mathbf{A}_{1}\right)^{T} \\
\vdots \\
\operatorname{vec}\left(\mathbf{A}_{d}\right)^{T}
\end{array}\right] \operatorname{vec}(\mathbf{X})
$$
使用矩阵与向量的转化
$$
X_{n\times m}\overset{\text{vec}}{\underset{\text{mat}}{\Longleftrightarrow}}\text{vec}(X)_{mn\times 1}
$$
则线性算子${\mathcal A}$及其逆${\mathcal A}^{-1}$可表示成
$$
\begin{aligned}
\mathcal{A}&=\mathbf A\text{vec}:\mathbb R^{n\times m}\to\mathbb R^{d\times 1}\\
\mathcal{A}^{-1}&=\text{mat}\circ A^{\dagger}:\mathbb R^{d\times 1}\to\mathbb R^{n\times m}
\end{aligned}
$$
令$\mathbf b={\mathcal A}({\mathbf Y})=\mathbf A\text{vec}(\mathbf Y),R_0=\mathcal{A}^{-1}(\mathbf b)$，则广义的矩阵感知问题便化为前面着重解决的低秩矩阵近似问题，可用秩1矩阵追踪算法求解。

![](Rank-One-Matrix-Pursuit-Matrix-Completion/Alg-matrix-sensing.png)

## 计算矩阵逆的技巧

OR1MP算法的第2步需要计算$({\mathbf {\bar M}_k}{\mathbf {\bar M}_k} )^{-1}$。在大规模问题里不方便直接算矩阵的逆，所以可以采取增量的方式降低计算量。因为矩阵乘积可分块表示
$$
{\mathbf {\bar M}_k}^T{\mathbf {\bar M}_k}  = [{\mathbf {\bar M}_{k-1}}, \dot{\mathbf m}_k]^T[{\mathbf {\bar M}_{k-1}}, \dot{\mathbf m}_k],
$$
其逆矩阵也可分块
$$
({\mathbf {\bar M}_k}^T{\mathbf {\bar M}_k} )^{-1} = \begin{bmatrix} {\mathbf {\bar M}_{k-1}}^T{\mathbf {\bar M}_{k-1}}  & {\mathbf {\bar M}_{k-1}}^T \dot{\mathbf m}_k \\  \dot{\mathbf m}^T_k{\mathbf {\bar M}_{k-1}}^T & \dot{\mathbf m}^T_k\dot{\mathbf m}_k \end{bmatrix}^{-1}
$$
采用块反演的方法计算(blockwise inversion)
$$
\begin{array}{lc}
\begin{bmatrix} {\mathbf A}+  d{\mathbf A} {\mathbf b} {\mathbf b}^T{\mathbf A}
& - d{\mathbf A} {\mathbf b} \\
- d {\mathbf b}^T{\mathbf A}
& {d}
\end{bmatrix}
\end{array}
$$
其中
$$
\begin{aligned}
{\mathbf A} &= ({\mathbf  {\bar M}_{k-1}}^T{\mathbf  {\bar M}_{k-1}})^{-1}\\
{\mathbf b} &=  {\mathbf  {\bar M}_{k-1}}^T \dot{\mathbf  m}_k\\
d &= (  {\mathbf b}^T {\mathbf b} - {\mathbf  b}^T{\mathbf  A}{\mathbf b} )^{-1}
\end{aligned}
$$
增量式计算体现在以下两点

- $({\mathbf  {\bar M}_{k-1}}^T{\mathbf  {\bar M}_{k-1}})^{-1}$是上一步得到的逆矩阵

- 除了逆矩阵以外，还需计算${\mathbf {\bar M}_k}^{T} {\dot{\mathbf y}}=[{\mathbf {\bar M}_{k-1}}^{T} {\dot{\mathbf y}}, \dot{\mathbf m}^T_k{\dot{\mathbf y}}]$

## References

[^1]: Wang Z, Lai M J, Lu Z, et al. Rank-one matrix pursuit for matrix completion[C]//International Conference on Machine Learning. 2014: 91-99.

[^2]: Wang Z, Lai M J, Lu Z, et al. Orthogonal rank-one matrix pursuit for low rank matrix completion[J]. SIAM Journal on Scientific Computing, 2015, 37(1): A488-A514.

---
title: Toeplitz矩阵补齐问题
categories:
  - 信号处理
tags:
  - Toeplitz矩阵
  - 低秩表示
mathjax: true
excerpt: Toeplitz矩阵补齐问题
urlname: Toeplitz-matrix-completion
date: 2020-10-07 15:40:00
---

## 写在前面

最近迷上了Toeplitz矩阵，对低秩表示也有一些基础，也找了结构化低秩表示的论文，不过这些都是基于高斯噪声的，没有用到鲁棒主成分分析的理论和算法，因此找了一系列关于Toeplitz矩阵的低秩恢复和补全的文献[^1]$^,$[^2]$^,$[^3]$^,$[^4]$^,$[^5]$^,$[^6]$^,$[^7]。

## 前置知识

### 奇异值阈值算子

矩阵$X\in\mathbb R^{m\times n}$的秩$\text{rank}(X) = r$，则奇异值分解
$$
X=U\Sigma_r V^T
$$
其中奇异矩阵对$U\in\mathbb R^{m\times r},V\in\mathbb R^{r\times n}$为正交阵，奇异值矩阵$\Sigma_r=\text{diag}(\sigma_1,\ldots,\sigma_r)$为对角矩阵，其对角线元素$\sigma_1\ge\sigma_2\ge\cdots\ge\sigma_r>0$。

设阈值参数$\tau>0$，软阈值算子定义为
$$
\mathcal S_{\tau}(x) = \text{sgn}(x)\cdot\max(|x|-\tau,0)=
\begin{cases}
x-\tau,&x>\tau\\
x+\tau,&x<-\tau\\
0,&|x|<\tau
\end{cases}
$$
则软阈值算子可表示为如下凸优化问题的显式解
$$
\mathcal S_{\tau}(X)=\arg\min_X \tau\|X\|_1 + \frac{1}{2}\|X-Y\|_F^2
$$
设阈值参数$\tau>0$，奇异值阈值算子定义如下：
$$
\mathcal D_\tau (X) = U\mathcal S_\tau (\Sigma_r)V^T
$$
则奇异值阈值算子可表示为如下凸优化问题的显式解
$$
\mathcal D_{\tau}(X)=\arg\min_X \tau\|X\|_* + \frac{1}{2}\|X-Y\|_F^2
$$

### 低秩矩阵恢复

低秩矩阵的研究由来已久了，早期的主成分分析的成功和仅十年的压缩感知的发展奠定了低秩表示的理论体系。

- 低秩矩阵恢复
  $$
  \min_{A,E} \|A\|_* + \lambda \|E\|_1 \quad \text{s.t.} \quad M=A+E
  $$
  该模型是主成分分析的鲁棒推广版本，从高斯噪声推广至稀疏噪声情况。

- 低秩矩阵补齐
  $$
  \min_A \|A\|_* \quad \text{s.t.} \quad \mathcal P_\Omega (M)=\mathcal P_\Omega (A)
  $$
  该模型是利用观测元素来恢复未观察到的元素，未观察到的元素可视为稀疏的噪声，只不过用$0$来代替，与低秩矩阵恢复有异曲同工之处。

### 常见优化算法

下面针对补齐问题给出常见的算法。

- 奇异值阈值算法(Singular Value Thresholding, SVT)

奇异值阈值算子可以直接求解如下凸优化问题
$$
\min_{A} \tau\|A\|_*+\frac{1}{2}\|A\|_F^2\quad \text{s.t.} \quad \mathcal P_\Omega (M)=\mathcal P_\Omega (A)
$$
当$\tau \to \infty$时，该问题的解收敛于低秩矩阵问题的解。求解步骤如下：

![](Toeplitz-matrix-completion/Alg-SVT.png)

- 加速近端梯度算法(Accelerated Proximal Gradient, APG)

低秩矩阵问题可化为如下无约束的凸优化问题
$$
\min_A \mu\|A\|_* + \frac{1}{2}\|\mathcal P_\Omega (M-A)\|_F^2
$$
该目标函数可分为两个函数之和
$$
f(A)=\mu\|A\|_*, g(A)=\frac{1}{2}\|\mathcal P_\Omega (M-A)\|_F^2
$$
其中$f$与$g$都是凸的，且$f$是Lipschitz连续且可局部近似为二次函数，则可通过下面二次近似的方式迭代更新变量
$$
A_{k+1}=\arg\min_A f(Y_k)+\left\langle\nabla f(Y_k),A-Y_k\right\rangle +\frac{L_f}{2}\|A-Y_k\|_F^2+g(A)
$$
迭代的收敛性强烈依赖点$Y_k$的选取，因此使用Nesterov的设置可达到二次收敛速度$\mathcal O(k^{-2})$。该算法步骤如下：

![](Toeplitz-matrix-completion/Alg-APG.png)

- 增广的拉格朗日乘子法(Augmented Lagrange Multiplier, ALM)

低秩矩阵问题可重新表示为低秩恢复问题
$$
\min_{A} \|A\|_* \quad \text{s.t.} \quad D=A+E,\mathcal P_\Omega (E)=0
$$
对应的局部(partial)增广拉格朗日函数为
$$
\mathcal L(A,E,Y,\mu)=\|A\|_*+\left\langle Y,D-A-E\right\rangle
+\frac{\mu}{2}\|D-A-E\|_F^2
$$
该算法步骤如下：

![](Toeplitz-matrix-completion/Alg-ALM.png)

## Toeplitz矩阵性质

Toeplitz矩阵的各个对角线具有相同的元素，即对任意矩阵$T\in\mathbb T^{n\times n}$可表示为
$$
T=\left(\begin{array}{ccccc}
t_{0} & t_{1} & \cdots & t_{n-2} & t_{n-1} \\
t_{-1} & t_{0} & \cdots & t_{n-3} & t_{n-2} \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
t_{-n+2} & t_{-n+3} & \cdots & t_{0} & t_{1} \\
t_{-n+1} & t_{-n+2} & \cdots & t_{-1} & t_{0}
\end{array}\right)
$$
$T$可用第一行和第一列(共$2n-1$个元素)来决定。下文中所有的对角线$\{-n+1,\ldots,n-1\}$记为集合$\Omega$。Toeplitz矩阵的基矩阵可表示为
$$
R_l = (r_{ij})_{n\times n} =
\begin{cases}
1,&i-j=l\\
0,&i-j \neq l
\end{cases},l\in\Omega.
$$
这组基矩阵不是正交基。有些地方记为$T_l$。显然，矩阵$T$可表示为向量与基矩阵的线性表示
$$
T=\sum_{l=-n+1}^{n-1} t_l R_l
$$

此外基矩阵还可表示为位移形式。记单位阵$I_n=(e_1,e_2,\ldots,e_n)\in\mathbb R^{n \times n}$，位移矩阵$Z_n=(e_2,e_3,\ldots,e_n,0)$(部分位置记为$S_n^l$)。显然
$$
Z_{n}^{r}=\left\{\begin{array}{ll}
\left(\begin{array}{cc}
0 & 0 \\
I_{n-r} & 0
\end{array}\right), & 1<r<n \\
O, & r \geq n
\end{array}\right.
$$
因此，Toeplitz矩阵还可以表示为
$$
T=\sum_{l=1}^{n-1}t_{-l}Z_n^r + \sum_{l=0}^{n-1}t_l(Z_n^T)^l.
$$
定义对角线$\Omega$上的算子如下：
$$
\text{diag}(\mathcal P_\Omega (X),l)=
\begin{cases}
\text{diag}(X,l),&l\in\Omega\\
\boldsymbol 0,&l\notin\Omega
\end{cases}
$$

对任意矩阵$X=(x_{ij})\in\mathbb R^{n \times n}$，可通过均值和中值产生Toeplitz矩阵
$$
\begin{aligned}
M(X)&=\sum_{l\in\Omega}\text{mean}(\text{diag}(X,l))\cdot R_l,\\
\text{Mid}(X)&=\sum_{l\in\Omega}\text{median}(\text{diag}(X,l))\cdot R_l
\end{aligned}
$$
定义一个光滑化算子$\mathcal T(A)=\sum_{l\in\Omega}\tilde a_l T_l$，其中
$$
\tilde a_l=\frac{1}{2}(\min_{i,j\in\{1,2,\ldots,n\}}\{a_{ij}|i-j=l\}+\max_{i,j\in\{1,2,\ldots,n\}}\{a_{ij}|i-j=l\})
$$
即每个对角线的取值为该对角线的两个最值的平均值。

令平均值$\bar a_\alpha =\frac{\sum_{j-i=\alpha}a_{ij}}{n-|\alpha|},\alpha\in\Omega$，定义平均投影算子
$$
\mathcal M(A)=\sum_{l=1}^{n-1}\bar a_{-l}Z_n^l + \sum_{l=0}^{n-1}\bar a_{l}(Z_n^T)^l
$$
显然，算子$\mathcal T(\cdot)$和$\mathcal M(\cdot)$的结果都是Toeplitz矩阵。

若$Y$是一个Toeplitz矩阵，则$\left\langle X-M(X),Y\right\rangle=0$且$\left\langle X-\mathcal T(X),Y\right\rangle=0$。

## Toeplitz矩阵恢复问题

考虑如下凸优化问题(参考文献[^1] $^,$ [^3])
$$
\min_{A,E} \|A\|_* + \lambda \|E\|_1 \quad \text{s.t.} \quad D=A+E, A\in \mathbb T^{n \times n}
$$
其中矩阵$A$是Toeplitz矩阵。

该问题的最优解$(\hat A, \hat E)$的充要条件为存在次梯度满足如下条件
$$
M(V)=0, \quad V\in \frac{\partial f}{\partial \hat A}
$$
该优化问题与传统的RPCA模型相差一个Toeplitz矩阵结构约束。令矩阵的奇异值分解为$\hat A=U\Sigma_r V^T$，若
$$
M(UV^T-\lambda(D-\hat A)_+^+)=0
$$
其中
$$
(D-\hat A)_+^+=
\begin{cases}
1,&d_{ij}-a_{ij}>0\\
0,&d_{ij}-a_{ij}=0\\
-1,&d_{ij}-a_{ij}<0.
\end{cases}
$$
则$\hat A$是无Toeplitz矩阵结构约束的优化问题最优解。因此，在传统的RPCA模型上，用平均值来处理Toeplitz矩阵结构。

### 基于平均值的算法

![](Toeplitz-matrix-completion/Alg-MV.png)

序列的极限：算法产生的序列记为$(A_k,E_k)$，恢复问题的最优解记为$(\hat A,\hat E)$，则序列$(A_k,E_k)$的任意聚点为最优解$(\hat A,\hat E)$，即
$$
\lim_{k\to\infty}A_k=\hat A,\quad\lim_{k\to\infty}E_k=\hat E.
$$

### 基于增广拉格朗日函数的算法

![](Toeplitz-matrix-completion/Alg-MALM-Copy.png)

序列的极限：算法产生的序列记为$(A_k,E_k)$，恢复问题的最优解记为$(\hat A,\hat E)$。假设$\mu_k\to\infty,\sum_{k=1}^\infty\mu_k^{-1}=\infty$。令
$$
\begin{aligned}
\hat Y_{k+1}&=Y_k+\mu_k(D-A_{k+1}-E_k),\\
\bar Y_{k+1}&=M(Y_k)+\mu_k(M(D-E_k)-A_{k+1}).
\end{aligned}
$$
若
$$
\left\langle A_{k+1}-\hat A, \hat Y_{k+1}-\hat Y\right\rangle\geq\left\langle A_{k+1}-\hat A, \bar Y_{k+1}-\hat Y\right\rangle,
$$
则
$$
\lim_{k\to\infty}A_k=\hat A,\quad\lim_{k\to\infty}E_k=\hat E.
$$

### 双均值的增广拉格朗日乘子法

![](Toeplitz-matrix-completion/Alg-2M-ALM.png)

序列的极限：算法产生的序列记为$(A_k,E_k)$，恢复问题的最优解记为$(\hat A,\hat E)$。假设$\mu_k\to\infty,\sum_{k=1}^\infty\mu_k^{-1}=\infty$。则
$$
\lim_{k\to\infty}A_k=\hat A,\quad\lim_{k\to\infty}E_k=\hat E.
$$

### 中值的增广拉格朗日乘子法

![](Toeplitz-matrix-completion/Alg-Mid-ALM.png)

序列的极限：算法产生的序列记为$(A_k,E_k)$，恢复问题的最优解记为$(\hat A,\hat E)$。假设$\mu_k\to\infty,\sum_{k=1}^\infty\mu_k^{-1}=\infty$。令
$$
\begin{aligned}
\hat Y_{k+1}&=Y_k+\mu_k(D-A_{k+1}-E_k),\\
\tilde Y_{k+1}&=\text{Mid}(Y_k+\mu_k(D-E_k))-\mu_kA_{k+1}.
\end{aligned}
$$
若
$$
\left\langle A_{k+1}-\hat A, \hat Y_{k+1}-\hat Y\right\rangle\geq\left\langle A_{k+1}-\hat A, \tilde Y_{k+1}-\hat Y\right\rangle,
$$
则
$$
\lim_{k\to\infty}A_k=\hat A,\quad\lim_{k\to\infty}E_k=\hat E.
$$

### 双中值的增广拉格朗日乘子法

![](Toeplitz-matrix-completion/Alg-2Mid-ALM.png)

序列的极限：算法产生的序列记为$(A_k,E_k)$，恢复问题的最优解记为$(\hat A,\hat E)$。假设$\mu_k\to\infty,\sum_{k=1}^\infty\mu_k^{-1}=\infty$。令
$$
\begin{aligned}
\hat Y_{k+1}&=Y_k+\mu_k(D-A_{k+1}-E_k),\\
\check Y_{k+1}&=\text{Mid}(Y_k+\mu_k(D-E_k-A_{k+1})).
\end{aligned}
$$
若
$$
\left\langle A_{k+1}-\hat A, \hat Y_{k+1}-\hat Y\right\rangle\geq\left\langle A_{k+1}-\hat A, \check Y_{k+1}-\hat Y\right\rangle,
$$
则
$$
\lim_{k\to\infty}A_k=\hat A,\quad\lim_{k\to\infty}E_k=\hat E.
$$

## Toeplitz矩阵补齐问题

考虑如下Toeplitz矩阵补齐问题(参考文献[^2])
$$
\min_{A} \|A\|_* \quad \text{s.t.} \quad \mathcal P_\Omega (M) = D=A+E,\mathcal P_\Omega (E)=0, A,D\in\mathbb T^{n \times n}
$$
其中$M$是实Toeplitz矩阵，$\Omega\subset\{-n+1,\ldots,n-1\}$。对应的部分增广拉格朗日函数为
$$
\mathcal L(A,E,Y,\mu)=\|A\|_*+\left\langle Y,D-A-E\right\rangle
+\frac{\mu}{2}\|D-A-E\|_F^2
$$
利用Toeplitz矩阵的结构和性质，使用对角均值来构造对角线$\{-n+1,\ldots,n-1\}$。

### 改进的增广拉格朗日乘子法

![](Toeplitz-matrix-completion/Alg-MALM.png)

- 有界性

该算法产生的序列$\{Y_k\}$是有界的。

- 收敛性

当$\mu_k\to\infty$且$\sum_{k=1}^{\infty}\mu_k^{-1}=+\infty$时，序列$\{A_k\}$收敛于补全问题的解。

- 误差控制

$A_k$是由矩阵$X_k$产生的一个Toeplitz矩阵，则满足如下不等式
$$
\|A_k-A^*\|_F^2 < \|X_k-A^*\|_F^2
$$

### 光滑的增广拉格朗日乘子法

参考文献[^5]

![](Toeplitz-matrix-completion/Alg-SALM.png)

- 有界性

该算法产生的序列$\{Y_k\}$是有界的。

- 收敛性

若$\left\langle A_{k+1}-A_k,D-A_{k+1}-E_k\right\rangle\geq0$，当$\mu_k\to\infty$且$\sum_{k=1}^{\infty}\mu_k^{-1}=+\infty$时，序列$\{A_k\}$收敛于恢复问题的解。

- 误差控制

$A_k$是由矩阵$X_k$产生的一个Toeplitz矩阵，$\ddot A$是恢复问题的解，则满足如下不等式
$$
\|A_k-\ddot A\|_F^2 < \|X_k-\ddot A\|_F^2
$$

### 半光滑的增广拉格朗日乘子法

参考文献[^6]

![](Toeplitz-matrix-completion/Alg-SSALM.png)

SSALM算法是SALM算法的加速推广，当$l=1$时，SSALM算法就蜕化到SALM算法了。

- 有界性

该算法产生的序列$\{Y_{k,q}\}$是有界的。

- 收敛性

若$\left\langle A_{k+1,q+1}-A_{k,q},D-A_{k+1,q+1}-E_{k,q}\right\rangle\geq0$，当$\mu_{k,q}\to\infty$且$\sum_{k=1}^{\infty}\mu_{k,q}^{-1}=+\infty$时，序列$\{A_{k,q}\}$收敛于恢复问题的解。

- 误差控制

$A_{k,q}$是由矩阵$X_k$产生的一个Toeplitz矩阵，$\ddot A$是恢复问题的解，则满足如下不等式
$$
\|A_{k,q}-\ddot A\|_F^2 < \|X_{k,q}-\ddot A\|_F^2
$$

## 矩阵追踪算法

矩阵的秩1分解可通过基追踪和系数学习交替迭代获得，这可以大大降低运算量。

（参考文献[^4]$^,$[^7]$^,$ [^8]）

### 正交秩1矩阵追踪算法

![](Toeplitz-matrix-completion/Alg-OR1MP.png)

### 廉价的正交秩1矩阵追踪算法

![](Toeplitz-matrix-completion/Alg-EOR1MP.png)

### 改进的正交秩1矩阵追踪算法

![](Toeplitz-matrix-completion/Alg-MOR1MP.png)

### 改进的廉价正交秩1矩阵追踪算法

![](Toeplitz-matrix-completion/Alg-MEOR1MP.png)

### 最优低秩矩阵近似

该算法并没有涉及到Toeplitz矩阵结构，单纯地解决低秩矩阵地补全模型。

![](Toeplitz-matrix-completion/Alg-OLRMA.png)

### 改进的低秩矩阵近似

利用平均投影算子来确保Toeplitz矩阵结构。

![](Toeplitz-matrix-completion/Alg-MOLRMA.png)

## 收敛性证明的一般步骤

To do

## 小结

感觉整理完后涉及的算法有点多，这个团队每年都在发展新的算法，每个文章都有详细的证明，后面我还会更新这些算法收敛性的证明套路。有用的东西先码着。

## 参考文献

[^1]: Wang C, Li C. A Mean Value Algorithm for Toeplitz Matrix Completion[J]. Applied Mathematics Letters, 2015, 41(41): 35-40.

[^2]: Wang C, Li C, Wang J, et al. A modified augmented lagrange multiplier algorithm for toeplitz matrix completion[J]. Advances in Computational Mathematics, 2016, 42(5): 1209-1224.

[^3]: Wang C, Li C, Wang J, et al. Comparisons of several algorithms for Toeplitz matrix recovery[J]. Computers & Mathematics With Applications, 2016, 71(1): 133-146.

[^4]: Fu Y, Wang C. A MODIFIED ORTHOGONAL RANK-ONE MATRIX PURSUIT FOR TOEPLITZ MATRIX COMPLETION[J]. Far east journal of applied mathematics, 2017, 95(6): 411-428.

[^5]: Wen R, Li S, Zhou F, et al. Toeplitz matrix completion via smoothing augmented Lagrange multiplier algorithm[J]. Applied Mathematics and Computation, 2019: 299-310.

[^6]: Wen R, Li S, Duan Y, et al. A semi-smoothing augmented Lagrange multiplier algorithm for low-rank Toeplitz matrix completion[J]. Journal of Inequalities and Applications, 2019, 2019(1): 1-16.

[^7]: Wen R, Fu Y. Toeplitz matrix completion via a low-rank approximation algorithm[J]. Journal of Inequalities and Applications, 2020, 2020(1).

[^8]:Wang Z , Lai M J , Lu Z , et al. Orthogonal Rank-One Matrix Pursuit for Low Rank Matrix Completion[J]. Siam Journal on Scientific Computing, 2014, 37(1).

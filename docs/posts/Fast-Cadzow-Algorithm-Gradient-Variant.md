---
title: 快速Cadzow算法及梯度变体
categories:
  - 信号处理
tags:
  - 奇异谱分析
mathjax: true
excerpt: 通过引入投影子空间改进奇异值分解的复杂度。
urlname: Fast-Cadzow-Algorithm-Gradient-Variant
date: 2020-12-21 17:00:00
---

## 写在前面

最近又看了大牛Jian-Feng Cai[^1]的系列文章，先占一个坑[^2]，这个与以前的Cadzow算法有关系，以后慢慢补充大牛的其他文章。

## 符号介绍

考虑下面一维信号含噪模型
$$
\boldsymbol y = \boldsymbol s +\boldsymbol e
$$
Cadzow去噪法基于干净信号$\boldsymbol s$的Hankel矩阵低秩性质进行截断奇异值分解。首先对复信号$\boldsymbol z$进行Hankel化（Hankelization）
$$
\mathcal H \boldsymbol z = \begin{bmatrix}
z_0 & z_1 & z_2 & \cdots & z_{K-1}\\
z_1 & z_2 & z_3 & \cdots & z_{K}\\
z_2 & z_3 & z_4 & \cdots & z_{K+1}\\
\vdots & \vdots & \vdots & \vdots & \vdots\\
z_{L-1} & z_{L} & z_{L+1} & \cdots & z_{N-1}
\end{bmatrix}
$$
其逆过程记为$\mathcal H^\dagger$，对给定矩阵$Z\in\mathbb C^{L\times K}$进行反对角平均。记第$a$个反对角线上元素个数为
$$
w_a = \#\left\{ (i,j)~|~ i+j=a,~ 0\leq i\leq L-1,~0\leq j\leq K-1\right\}
$$
去Hanekl化得到的向量$\mathcal H^\dagger Z$的第$a$个元素为
$$
[\mathcal H^\dagger Z]_a=\frac{1}{w_a} \sum_{i+j=a}[Z]_{ij}
$$
注意： $\mathcal H^\dagger\mathcal H=\mathcal I$为恒等映射，而$\mathcal P_{\mathcal M_{\mathcal H}} = \mathcal H\mathcal H^\dagger$为矩阵到Hankel矩阵空间$\mathcal M_{\mathcal H}$的投影。

## Cadzow算法

前面提到Cadzow去噪的核心思想，假设$\text{rank}(\mathcal H\boldsymbol x)=r \ll\min{(L,K)}$，而$\text{rank}(\mathcal H\boldsymbol y)=\min{(L,K)}$。因此从$\boldsymbol y$到$\boldsymbol x$需要进行降秩。令$\boldsymbol z_0 = \boldsymbol y$，通过如下迭代
$$
\boldsymbol z_{k+1} = \mathcal H^\dagger\mathcal T_r\mathcal H\boldsymbol z_k,~k=0,\cdots
$$
其中$\mathcal T_r$为奇异值分解$Z=\sum_{j=1}^{\min(L,K)}\sigma_j\boldsymbol{u}_j\boldsymbol{v}_j^*$的截断形式，记秩$r$矩阵集合为$\mathcal M_r$
$$
\mathcal{T}_r(Z)=\sum_{j=1}^r\sigma_j\boldsymbol{u}_j\boldsymbol{v}_j^*\in\mathcal M_r
$$
截断奇异值分解过程可视为矩阵到$\mathcal M_r$的投影，记为$\mathcal P_{\mathcal M_r}$。

值得注意的是，Cadzow算法是多通道奇异谱分析，且Cadzow算法的第一次迭代与奇异谱分析完全一致。此外，Cadzow算法与交替投影相关。令$Z_k = \mathcal H\boldsymbol z_k$，Cadzow算法的矩阵表示形式如下
$$
Z_{k+1} = \mathcal P_{\mathcal M_H}\mathcal P_{\mathcal M_r}Z_k,~k=0,\cdots
$$
当观测信号存在缺省值时，能否通过部分信号恢复完整信号？Cadzow算法的一种变体可很好地进行信号恢复。令$\boldsymbol z_0=\mathcal P_\Omega(\boldsymbol x)$迭代如下过程
$$
\boldsymbol z_{k+1} = \mathcal P_\Omega(\boldsymbol x)+(\mathcal I-\mathcal P_\Omega)\mathcal H^\dagger\mathcal T_r\mathcal H\boldsymbol z_k,~k=0,\cdots
$$
其中第二项$\mathcal H^\dagger\mathcal T_r\mathcal H\boldsymbol z_k$用来更新$\Omega^c$的未知分量。如果观测信号被高斯噪声扰动，则可以把第一项改为$\mathcal P_\Omega(\mathcal H^\dagger\mathcal T_r\mathcal H\boldsymbol z_k)$来消除噪声的影响。

## 快速Cadzow算法

### Cadzow算法图解

$$
\boldsymbol z_{k+1} = \mathcal H^\dagger\mathcal T_r\mathcal H\boldsymbol z_k,~k=0,\cdots
$$

该算法里的Hankel化$\mathcal H$和逆Hankel化$\mathcal H^\dagger$是向量与矩阵间的转化，而奇异值分解则是对Hankel矩阵进行操作。从图中可以看见，投影是在对应集合中找到距离最近的点，对应点是投影点。

![](Fast-Cadzow-Algorithm-Gradient-Variant/cadzow.png)

对于信号$\boldsymbol z\in\mathbb C^{n}$，矩阵$\mathcal H\boldsymbol z\in\mathbb C^{L\times K}$的奇异值分解计算复杂度在$\mathcal O(N^3)$。为了加快收敛速度，可以在$\mathcal H\boldsymbol z_k$做一些改动，使得进行投影$\mathcal P_{\mathcal M_r}$时效率更高。那么最直接的方法就是改变矩阵的结构，在特定的子空间进行奇异值分解，利用代数的方法来降低整体迭代的计算复杂度。

### 快速Cadzow算法图解

$$
\boldsymbol z_{k+1}=\mathcal H^\dagger\mathcal T_r\mathcal P_{T_k}\mathcal H\boldsymbol z_k
$$

与Cadzow算法相比，快速在于多加了到子空间$T_k\in\mathbb C^{L\times K}$一个投影$\mathcal P_{T_k}$，选择合适的子空间可以赋予$\mathcal P_{T_k}\mathcal H\boldsymbol z_k$利于分解的矩阵结构。

![](Fast-Cadzow-Algorithm-Gradient-Variant/fastcad.png)

### $T_k$的选择

前一个迭代点$\boldsymbol z_{k}=\mathcal H^\dagger\mathcal T_r\mathcal P_{T_{k-1}}\mathcal H\boldsymbol z_{k-1}$的秩$r$部分记为$L_k = \mathcal T_r\mathcal P_{T_{k-1}}\mathcal H\boldsymbol z_{k-1}$，则$L_k$的简化奇异值分解为$L_k=U_k\Sigma V_k^*$，则$T_k$可通过$L_k$的行、列子空间的直和来构造
$$
T_k = \{U_kB^*+CV_k^*~|~B\in\mathbb C^{K\times r},~C\in\mathbb C^{L\times r}\}
$$
秩$r$矩阵形成一个光滑流形，而$T_k$是流形上点$L_k$处的切空间。有了子空间$T_k$后，任意点$Z\in\mathbb C^{L\times K}$到$T_k$的投影为
$$
\mathcal P_{T_k}(Z) = U_kU_k^*Z+ZV_kV_k^*-U_kU_k^*ZV_kV_k^*.
$$

- 第一次迭代设置$T_0\in\mathbb C^{L\times K}$，也就是说快速Cadzow算法与Cadzow算法第一步是一致的。
- 第$k+1$次迭代点的投影子空间$T_k$都是依赖第$k$次迭代点由奇异值分解得到正交子空间直和，这也解释了快速Cadzow算法图上的$T_k$为$L_k$的切空间。
- 当$L_k$具有近似Hankel矩阵结构时，$\mathcal H\mathcal H^\dagger L_k\approx L_k$且$L_k\in T_k$，有$\mathcal P_{T_k}\mathcal H\boldsymbol z_k\approx \mathcal H\boldsymbol z_k$，由此$\mathcal H\boldsymbol z_k$到$T_k$的投影能捕获其最大的能量。

### 算法复杂度

与矩阵$\mathcal T_r\mathcal H\boldsymbol z_k\in\mathbb C^{L\times K}$的奇异值分解相比，通过到$T_k$的投影，矩阵$\mathcal T_r\mathcal P_{T_{k-1}}\mathcal H\boldsymbol z_{k-1}$可化成$2r\times 2r$的奇异值分解。将快速Cadzow算法分解为三步：
$$
\begin{cases}
W_k = \mathcal P_{T_k}\mathcal H\boldsymbol z_k\\
L_{k+1} = \mathcal T_r W_k\\
\boldsymbol z_{k+1} =\mathcal H^\dagger L_{k+1}.
\end{cases}
$$
令$H_k=\mathcal H\boldsymbol z_k$，得到到$T_k$的投影点
$$
\begin{aligned}
W_k&=U_kU_k^*H_k+H_kV_kV_k^*-U_kU_k^*H_kV_kV_k^*\\
&=U_kU_k^*H_kV_kV_k^*+U_kU_k^*H_k(I-V_kV_k^*)+(I-U_kU_k^*)H_kV_kV_k^*\\
&=U_kGV_k^* + U_kB^*+CV_k^*
\end{aligned}
$$
其中
$$
\begin{aligned}
G&=U_k^*H_kV_k\\
B&=(I-V_kV_k^*)H_k^*U_k\\
C&=(I-U_kU_k^*)H_kV_k
\end{aligned}
$$
对$B$和$C$进行QR分解
$$
\begin{aligned}
B&=(I-V_kV_k^*)H_k^*U_k=Q_1R_1\\
C&=(I-U_kU_k^*)H_kV_k=Q_2R_2
\end{aligned}
$$
则$Q_1\perp V_k,\quad Q_2\perp U_k$，且
$$
\begin{aligned}
W_k& = U_kGV_k^* + U_kR_1^*Q_1^*+Q_2R_2V_k^*\\
&=\begin{bmatrix}U_k & Q_2\end{bmatrix}
\begin{bmatrix}
G& R_1^*\\
R_2 & \boldsymbol {0}
\end{bmatrix}
\begin{bmatrix}
V_k&Q_1
\end{bmatrix}^*\\
&=\left(\begin{bmatrix}U_k & Q_2\end{bmatrix}U_G\right)\Sigma_G\left(\begin{bmatrix}
V_k&Q_1
\end{bmatrix}V_G\right)^*
\end{aligned}
$$
其中涉及一个$2r\times 2r$矩阵的奇异值分解
$$
\begin{bmatrix}
G& R_1^*\\
R_2 & \boldsymbol {0}
\end{bmatrix} = {U}_G\Sigma_G{V}_G^*.
$$
因此总的计算复杂度为$\mathcal O(Nr^2+Nr\log N+r^3)$，空间复杂度为$\mathcal O(Nr)$。

### 算法流程图


![](Fast-Cadzow-Algorithm-Gradient-Variant/Alg-Fast-Cadzow.png)

## 梯度方向

将Cadzow算法重新表示为
$$
\begin{aligned}
Z_{k+1} &= \mathcal P_{\mathcal M_H}\mathcal P_{\mathcal M_r}Z_k\\
&=\mathcal P_{\mathcal M_H}\mathcal P_{\mathcal M_r}(Z_k+t(Y-Z_k)),\quad t=0,
\end{aligned}
$$
其中$Z_k=\mathcal H\boldsymbol z_k$和$Y = \mathcal H\boldsymbol y=\mathcal H(\boldsymbol x+\boldsymbol e)$，则Cadzow算法可表示为一类投影梯度方法，其对应的优化问题为
$$
\min\frac{1}{2}\|Z-Y\|_F^2 ~\text{s.t}~ \text{rank}(Z)\leq r \text{ and }Z\text{ is Hankel}
$$
由于Hankel矩阵端点效应，考虑如下重加权优化问题
$$
\min\frac{1}{2}\|\sqrt{W}\odot(Z-Y)\|_F^2 ~\text{s.t}~ \text{rank}(Z)\leq r \text{ and }Z\text{ is Hankel}
$$
其中权值矩阵$W$为
$$
\begin{aligned}
\sqrt{W}&=\mathcal H(\sqrt{w_0},\cdots,\sqrt{w_{N-1}})\\
&= \begin{bmatrix}
1 & \frac{1}{\sqrt{2}} & \frac{1}{\sqrt{3}} & \vdots & \vdots\\
\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{3}}& \vdots & \vdots & \vdots\\
\frac{1}{\sqrt{3}} & \vdots & \vdots & \vdots &\frac{1}{\sqrt{3}}\\
\vdots & \vdots & \vdots & \frac{1}{\sqrt{3}} & \frac{1}{\sqrt{2}}\\
\vdots & \vdots & \frac{1}{\sqrt{3}} &\frac{1}{\sqrt{2}}& 1
\end{bmatrix}.
\end{aligned}
$$
令步长为1，则投影梯度法表示为
$$
Z_{k+1} = \mathcal P_{\mathcal M_H}\mathcal P_{\mathcal M_r}(Z_k+W\odot(Y-Z_k)).
$$
记$1/D = [1/w_0,\cdots,1/w_{N-1}]^\top$，Cadzow算法对应的梯度算法如下

![](Fast-Cadzow-Algorithm-Gradient-Variant/Alg-Gradient.png)

若引入投影子空间，则可得到快速Cadzow算法对应的快速梯度算法。

![](Fast-Cadzow-Algorithm-Gradient-Variant/Alg-Fast-Gradient.png)

## 小结

下面会继续看一些低秩Hankel矩阵相关的文章。

## References

[^1]: Jian-Feng Cai Homepage: <http://www.math.ust.hk/~jfcai/>
[^2]: H. Wang, **J.-F. Cai**, T. Wang, and K. Wei, Fast Cadzow's Algorithm and a Gradient Variant, arxiv preprint: 1906.03572.
---
title: 循环奇异谱分析
categories:
  - 信号处理
tags:
  - 奇异谱分析
mathjax: true
excerpt: 介绍循环奇异谱分析算法(Circulant Singular Spectrum Analysis)
urlname: circulant-ssa
date: 2020-07-23 13:00:00
---

## 写在前面

介绍循环奇异谱分析(Circulant Singular Spectrum Analysis)[^1]。

## 循环奇异谱分析

对于无限零均值平稳时间序列$\{x_{t}\}$，其自协方差记为$\gamma_{m}=E(x_{t}x_{t-m})$，实连续且周期为$2\pi$的光谱密度函数记为$f$。当考虑轨迹矩阵的总体二阶矩时，会出现对称Toeplitz矩阵。
$$
\mathbf{\Gamma }_{L}(f)=\left( 
\begin{array}{ccccc}
\gamma _{0} & \gamma _{1} & \gamma _{2} & ... & \gamma _{L-1} \\ 
\gamma _{1} & \gamma _{0} & \gamma _{1} & ... & \gamma _{L-2} \\ 
\vdots & \vdots & \vdots & \vdots & \vdots \\ 
\gamma _{L-1} & \gamma _{L-2} & \gamma _{L-3} & ... & \gamma _{0}%
\end{array}%
\right)
$$
矩阵$\mathbf{\Gamma }_{L}(f)$取决于光谱密度$f$，因为协变量$\gamma _{m}=\int_{0}^{1}f(w)\exp (i2\pi mw)dw$，其中 $w \in \left[ 0,\ 1 \right]$是单位周期内的频率。下面考虑一类特殊的Toeplitz矩阵，循环矩阵的每一行都是上述行的右循环移位
$$
\mathbf{C}_{L}(f)=\left( 
\begin{array}{ccccc}
c_{0} & c_{1} & c_{2} & ... & c_{L-1} \\ 
c_{L-1} & c_{0} & c_{1} & ... & c_{L-2} \\ 
\vdots & \vdots & \vdots & \vdots & \vdots \\ 
c_{1} & c_{2} & c_{3} & ... & c_{0}%
\end{array}%
\right)
$$
循环矩阵的特征值和特征向量存在闭解(closed form)

- $\mathbf{C}_{L}(f)$的第$k$个特征值

$$
\lambda _{L,k}=\sum_{m=0}^{L-1}c_{m}\exp \left( i2\pi m\frac{k-1}{L}\right)
$$

- $\mathbf{C}_{L}(f)$的第$k$个特征向量

$$
\mathbf{u}_{k}=L^{-1/2}(u_{k,1,}...,u_{k,L})^{\prime }
$$

其中
$$
u_{k,j}=\exp \left( -i2\pi (j-1)\frac{k-1}{L}\right) 
$$
特别的，如果循环矩阵$\mathbf{C}_{L}(f)$的元素$c_{m}$满足如下形式
$$
c_{m}=\frac{1}{L}\sum_{j=0}^{L-1}f\left( \frac{j}{L}\right) \exp \left(i2\pi m\frac{j}{L}\right) 
$$
那么特征值与$w_k=\frac{k-1}{L}$处的谱密度相等，即

$$
\lambda _{L,k}=f\left( \frac{k-1}{L}\right)
$$

此外，当$L\rightarrow \infty$，$\mathbf{\Gamma }_{L}(f)$与$\mathbf{C}_{L}(f)$渐近等价，记为$\mathbf{\Gamma }_{L}(f)\sim \mathbf{C}_{L}(f)$，满足

$$
\underset{L\rightarrow \infty }{\lim }\frac{\left\Vert \mathbf{\Gamma }_{L}(f)-\mathbf{C}_{L}(f)\right\Vert _{F}}{\sqrt{L}}=0
$$
由于$\mathbf{C}_{L}(f)$计算复杂，下面考虑近似的循环矩阵${\mathbf{C}}_{L}(\widetilde{f})$，其组成元素为
$$
\widetilde{c}_{m}=\frac{L-m}{L}\gamma _{m}+\frac{m}{L}\gamma _{L-m}
$$
对于生成的$\widetilde{f}$是谱密度函数的近似表示，且具有等价关系
$$
\mathbf{\Gamma }_{L}(f)\sim{\mathbf{C}}_{L}(\widetilde{f})\sim\mathbf{C}_{L}(f)
$$
因此，通过求解循环矩阵${\mathbf{C}}_{L}(\widetilde{f})$的特征值与特征向量，可以得到$w_k=\frac{k-1}{L}$处的谱密度。

另一方面，用样本统计量代替总体统计量
$$
\widehat{\gamma }_{m}=\frac{1}{T-m}\sum_{t=1}^{T-m}x_{t}x_{t+m}
$$
对应的样本自协方差矩阵$\mathbf{S}_{C}$的元素为

$$
\widehat{c}_{m}=\frac{L-m}{L}\widehat{\gamma }_{m}+\frac{m}{L}\widehat{\gamma }_{L-m}
$$
以上流程完成奇异谱分析的嵌入和分解步骤。因为谱密度的对称性，即$\widehat{\lambda }_{k} = \widehat{\lambda }_{L+2-k}$，存在一对共轭的特征向量$\mathbf{u}_{k}=\overline{\mathbf{u}}_{L+2-k}$，因此对应特征值的成分矩阵有一对，对应下标为$B_{k}=\{k,L+2-k\}$和$B_{1}=\{1\}$，当$L$ 为偶数时，$B_{\frac{L}{2}+1}=\left\{ \frac{L}{2}+1\right\}$。对第$k$个特征值($\widehat{\lambda }_{k}$ 和$\widehat{\lambda }_{L+2-k}$)的矩阵成分$\mathbf{X}_{B_{k}}$为$\mathbf{X}_{k}$与$\mathbf{X}_{L+2-k}$对应频率$w_k=\frac{k-1}{L}$之和
$$
\begin{aligned}
\mathbf{X}_{B_{k}} &=\mathbf{X}_{k}+\mathbf{X}_{L+2-k} \\
&=\mathbf{u}_{k}\overline{\mathbf{u}}_{k}^{\prime }\mathbf{X+u}_{L+2-k}\overline{\mathbf{u}}_{L+2-k}^{\prime }\mathbf{X} \\
&=(\mathbf{u}_{k}\overline{\mathbf{u}}_{k}^{\prime }+\overline{\mathbf{u}}_{k}\mathbf{u}_{k}^{\prime })\mathbf{X} \\
&=2[\Re(\mathbf{u}_{k})\Re(\mathbf{u}_{k}^{\prime })+\Im(\mathbf{u}_{k})\Im(\mathbf{u}_{k}^{\prime })]\mathbf{X}
\end{aligned}
$$
因此，$\mathbf{X}_{B_{k}}$是实的。重构步骤与传统奇异谱分析一致，不详细说明了。

- 文章还证明：当嵌入维数（窗长度）足够长时，传统SSA、Toeplitz SSA和循环SSA渐进等价。

- 以上是平稳信号情况，对于非平稳情况，文章也给出性质的证明（其实是看不懂了）。

## 多维推广

不久，原班人马给出了循环奇异谱分析的多维推广[^2]，是将循环的机制变成块循环的方式。

给定时间序列$\mathbf{x}_t=\left(x_t^{\left(1\right)},\cdots,x_t^{\left(M\right)}\right)'$，由时间序列组成的轨迹矩阵如下：（嵌入）
$$
\begin{aligned}
\mathbf{X}&=\left(\begin{matrix}\mathbf{x}_1&\mathbf{x}_2&\cdots&\mathbf{x}_N\\\mathbf{x}_2&\mathbf{x}_3&\cdots&\mathbf{x}_{N+1}\\\vdots&\vdots&\vdots&\vdots\\\mathbf{x}_L&\mathbf{x}_{L+1}&\cdots&\mathbf{x}_T\\\end{matrix}\right)\\
&=\left(\begin{matrix}x_1^{\left(1\right)}&x_2^{\left(1\right)}&\cdots&x_N^{\left(1\right)}\\\vdots&\vdots&\vdots&\vdots\\x_1^{\left(M\right)}&x_2^{\left(M\right)}&\cdots&x_N^{\left(M\right)}\\x_2^{\left(1\right)}&x_3^{\left(1\right)}&\cdots&x_{N+1}^{\left(1\right)}\\\vdots&\vdots&\vdots&\vdots\\x_2^{\left(M\right)}&x_3^{\left(M\right)}&\cdots&x_{N+1}^{\left(M\right)}\\\vdots&\vdots&\vdots&\vdots\\x_L^{\left(1\right)}&x_{L+1}^{\left(1\right)}&\cdots&x_T^{\left(1\right)}\\\vdots&\vdots&\vdots&\vdots\\x_L^{\left(M\right)}&x_{L+1}^{\left(M\right)}&\cdots&x_T^{\left(M\right)}.\\\end{matrix}\right)
\end{aligned}
$$
二阶统计量记为$\mathbf{\Gamma}_k= E[\mathbf{x}_{t+k}\mathbf{x}_t^{\prime}]$，$L\times L$块矩阵构成的$M\times M$块Toeplitz矩阵$\mathbf{T}_L=\left[\mathbf{\Gamma}_{ij}=\mathbf{\Gamma}_{i-j};i,j=1,\cdots,L\right]$是一个$LM\times LM$ Hermitian矩阵，其子矩阵性质如下：
$$
\mathbf{\Gamma}_k=\int_{0}^{1}\mathbf{F}\left(\omega\right)\exp{\left(-i2\pi k\omega\right)}d\omega,\;\forall k\in\mathbb{Z}
$$
其中$\omega\in\left[0,1\right]$是周期内的频率，$\mathbf{F}\left(\omega\right)$为序列的谱密度矩阵，可通过Fourier展开的系数得到
$$
\mathbf{F}\left(\omega\right)=\sum_{k=-\infty}^{\infty}{\mathbf{\Gamma}_k\exp{\left(i2\pi k\omega\right)}},\; \omega\in\left[0,1\right]
$$
Toeplitz矩阵$\mathbf{T}_L$的特征值与特征向量不容易得到，下面通过构造**块循环矩阵**来近似求解，其好处在于块循环矩阵可块对角化，乃至对角化，这利于求解特征值。但Toeplitz矩阵无法达到这点。
$$
\mathbf{C}_L=\left(\begin{matrix}\mathbf{\Omega}_0&\mathbf{\Omega}_1&\mathbf{\Omega}_2&\cdots&\mathbf{\Omega}_{L-1}\\\mathbf{\Omega}_{L-1}&\mathbf{\Omega}_0&\mathbf{\Omega}_1&\ddots&\vdots\\\mathbf{\Omega}_{L-2}&\mathbf{\Omega}_{L-1}&\mathbf{\Omega}_0&\ddots&\mathbf{\Omega}_2\\\vdots&\ddots&\ddots&\ddots&\mathbf{\Omega}_1\\\mathbf{\Omega}_1&\cdots&\mathbf{\Omega}_{L-2}&\mathbf{\Omega}_{L-1}&\mathbf{\Omega}_0\\\end{matrix}\right)
$$
对于$k=0,\cdots,L-1$，每个块矩阵形式如下：
$$
\mathbf{\Omega}_k=\frac{1}{L}\sum_{j=0}^{L-1}{\mathbf{F}\left(\frac{j}{L}\right)\exp{\left(\frac{i2\pi jk}{L}\right)}}
$$
类似一维，多维推广的Toeplitz矩阵与循环矩阵也具有渐进等价性质：当$L\rightarrow \infty$时，$\mathbf{T}_{L}(\mathbf{F}) \sim  \mathbf{C}_{L}(\mathbf{F})$。然而，实际操作时，矩阵函数$\mathbf{F}$与无穷序列$\left\{\mathbf{\Gamma}_k\right\}_{k\in\mathbb{Z}}$均是未知的，因此，我们可以通过有限的二阶矩$\mathbf{\Gamma}_k$来构造块矩阵
$$
{\widetilde{\mathbf{\Omega}}}_k=\frac{k}{L}\mathbf{\Gamma}_{L-k}+\frac{L-k}{L}\mathbf{\Gamma}_{-k}
$$
对应的矩阵函数${\widetilde{\mathbf{F}}}$连续且周期为 $2\pi$
$$
{\widetilde{\mathbf{F}}}\left(\omega\right)=\frac{1}{L}\sum_{m=1}^{L}\sum_{l=1}^{L}{\mathbf{\Gamma}_{l-m}\exp{\left(i2\pi\left(l-m\right)\omega\right)}}
$$
同样，理论保证了渐进性：$\mathbf{T}_{L}(\mathbf{F})\sim \mathbf{C}_{L}(\widetilde{\mathbf{F}})$。下面回到循环块矩阵的块对角化。
$$
\mathbf{C}_L\left(\mathbf{F}\right)=\left(\mathbf{U}_L\otimes\mathbf{I}_M\right)\operatorname{diag}{\left(\mathbf{F}_1,\cdots,\mathbf{F}_L\right)}\left(\mathbf{U}_L\otimes\mathbf{I}_M\right)^*
$$
其中$\mathbf{U}_L$为Fourier酉阵
$$
\mathbf{U}_L=L^\frac{1}{2}\left[\exp{\left(\frac{-i2\pi\left(j-1\right)\left(k-1\right)}{L}\right)}\right]
$$
每个块矩阵$\mathbf{F}_k=\mathbf{F}\left(\frac{k-1}{L}\right)$表示多元随机变量$\mathbf{x}_t$在频率$\omega_k=\frac{k-1}{L}, k=1,\cdots,L$处的交叉谱密度矩阵，可利用酉矩阵进行对角化$\mathbf{F}_k=\mathbf{E}_k\mathbf{D}_k\mathbf{E}_k^*$，其中$\mathbf{E}_k=\left[\mathbf{e}_{k,1}|\cdots|\mathbf{e}_{k,M}\right]$为特征向量矩阵，对角矩阵$\mathbf{D}_k$的对角线为降序的特征值。因此，对整个循环Hermitian矩阵的酉对角化结果如下：
$$
\mathbf{C}_L\left(\mathbf{F}\right)=\mathbf{VD}\mathbf{V}^*
$$

- 特征向量

$$
\mathbf{V}=\left(\mathbf{U}_L\otimes\mathbf{I}_M\right)\operatorname{diag}{\left(\mathbf{E}_1,\cdots,\mathbf{E}_L\right)}\in\mathbb{C}^{LM\times L M}
$$

- 特征值

$$
\mathbf{D}=\operatorname{diag}{\left(\mathbf{D}_1,\cdots,\mathbf{D}_L\right)}
$$

由于谱的对称性，$\mathbf{F}_k=\mathbf{F}_{L+2-k}^T;\; k=2,\cdots,\left\lfloor\frac{L+1}{2}\right\rfloor$，因此存在相同的特征值$\mathbf{D}_k=\mathbf{D}_{L+2-k}$与共轭的特征向量$\mathbf{E}_k=\overline{\mathbf{E}}_{L+2-k}$。

前面给了一些必要的基础知识，下面开始介绍**多元循环奇异谱分析**。嵌入阶段构造一个大的轨道矩阵，前面已经叙述过，下面着重介绍分解与分组步骤。

利用有限的二阶统计量构造块循环矩阵来近似Toeplitz矩阵：
$$
\begin{aligned}
\mathbf{S}_\mathbf{C}&=\left(\begin{matrix}{\hat{\mathbf{\Omega}}}_0&{\hat{\mathbf{\Omega}}}_1&\cdots&{\hat{\mathbf{\Omega}}}_{L-1}\\{\hat{\mathbf{\Omega}}}_{L-1}&{\hat{\mathbf{\Omega}}}_0&\ddots&\vdots\\\vdots&\ddots&\ddots&{\hat{\mathbf{\Omega}}}_1\\{\hat{\mathbf{\Omega}}}_1&\cdots&{\hat{\mathbf{\Omega}}}_{L-1}&{\hat{\mathbf{\Omega}}}_0\\\end{matrix}\right)\\
&=\left(\mathbf{U}_L\otimes\mathbf{I}_M\right)\hat{\mathbf{E}}\hat{\mathbf{D}}{\hat{\mathbf{E}}}^*\left(\mathbf{U}_L\otimes\mathbf{I}_M\right)^*=\hat{\mathbf{V}}\hat{\mathbf{D}}{\hat{\mathbf{V}}}^*
\end{aligned}
$$
由特征三元组得到对应于频率$\omega_k=\frac{k-1}{L},\;k=1, \cdots,L$的第$k$个基本矩阵为
$$
\mathbf{X}_{k,m}={\widetilde{\mathbf{v}}}_{k,m}\mathbf{w}_{k,m}'={\widetilde{\mathbf{v}}}_{k,m}{\widetilde{\mathbf{v}}}_{k,m}'\mathbf{X}\in\mathbb{R}^{LM\times N}
$$
特征向量${\widetilde{\mathbf{v}}}_{k,m}$对应第$i$个时间序列的分量$\widetilde{\mathbf{v}}_{k,m}^{\left(i\right)}$
$$
\widetilde{\mathbf{v}}_{k,m}^{\left(i\right)}=\left(\mathbf{I}_L\otimes\mathbf{1}_{M,i}'\right){\widetilde{\mathbf{v}}}_{k,m}
$$
第$k$个基本矩阵的第$i$个时间序列对应于频率$\omega_k$的矩阵为
$$
\mathbf{X}_{k,m}^{\left(i\right)}={\widetilde{\mathbf{v}}}_{k,m}^{\left(i\right)}\mathbf{w}_{k,m}'={\widetilde{\mathbf{v}}}_{k,m}^{\left(i\right)}{\widetilde{\mathbf{v}}}_{k,m}'\mathbf{X}\in\mathbb{R}^{L\times N}
$$
因此，轨道矩阵可按照频率、特征值、序列进行分解
$$
\mathbf{X}=\sum_{k,m}\mathbf{X}_{k,m}=\sum_{k,m}\mathbf{P}\left(\begin{matrix}\mathbf{X}_{k,m}^{\left(1\right)}\\\vdots\\\mathbf{X}_{k,m}^{\left(M\right)}\\\end{matrix}\right)
$$
其中$\mathbf{P}$为一个置换矩阵。

分组步骤仍然由于成对出现特征值与特征向量的缘故，子成分需要叠加两个对应的基本矩阵，大体步骤与上面循环奇异谱分析一致，就不细说了。
$$
\mathbf{X}_{B_{k,m}}=\mathbf{X}_{k,m}+\mathbf{X}_{L+2-k,m}.
$$
重构步骤涉及去hankel化，仅需注意对分组的矩阵进行反对角平均。

## 参考文献

[^1]: Juan Bógalo, Pilar Poncela, Eva Senra. Circulant Singular Spectrum Analysis: A new automated procedure for signal extraction. [arXiv:2003.12859](https://arxiv.org/abs/2003.12859)

[^2]: Juan Bógalo, Pilar Poncela, Eva Senra. Multivariate Circulant Singular Spectrum Analysis. [arXiv:2007.07561](https://arxiv.org/abs/2007.07561)

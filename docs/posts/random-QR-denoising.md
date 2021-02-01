---
title: 基于随机投影的QR去噪算法
categories:
  - 信号处理
tags:
  - 随机投影
  - 去噪
  - 降维
mathjax: true
excerpt: 介绍一篇基于基于随机投影的QR去噪算法
urlname: random-QR-denoising
date: 2021-02-01 10:00:00
---

## 写在前面

近期讨论的时候涉及到这篇文章[^1]，记录下创新点。

## 平稳信号去噪相关研究

- 线性滤波器：需要计算信号和噪声的自相关和互相关矩阵，需修改线宽
- 多分辨率分析：比传统的正交方法更有效
- 基于统计的方法：需要预先知道频率的个数，用奇异值分解计算复杂度高
- 随机投影和概率算法：可避免数据的显式计算

## 随机QR算法

本文所提出的随机算法是对数据矩阵进行下采样，投影后的数据保留了原始数据的大致特征，因此实现概率意义下的降维。下面是算法具体步骤：

1. 将由$P$个阻尼正弦信号组成的谐波$X$Hankel化
   $$
   H_{i,j}\leftarrow X_{i+j-1}
   $$

   - 在无噪声情况下，矩阵$H$的秩为$P$
   - 在含噪声情况下，矩阵$H$是满秩的

2. 生成随机矩阵$\Omega$，其中元素$\Omega_{ij}\sim\mathcal N(0,1)$。计算投影矩阵
   $$
   \underset{(M \times K)}{Y}\leftarrow\underset{(M \times N)}{H}\times\underset{(N \times K)}{\Omega}
   $$
   矩阵$Y$的尺寸比矩阵$H$的要小$K\leq M$，因此在保留原始信息的同时降低维度，为后续的分解降低计算复杂度。

3. 对$Y$进行QR分解
   $$
   (Q,R)\leftarrow\text{QR}(Y)
   $$
   正交阵$Q$可以作为矩阵$H$的降秩正交基，可得到矩阵$H$的秩$K$正交投影
   $$
   \tilde{H}\leftarrow QQ^* H
   $$
   令$p=K-P$，此近似值在谱范数意义下的界如下
   $$
   \|H-\tilde{H}\|\leq[1+9\sqrt{KM}]_{\sigma_{P+1}}
   $$
   其中$\sigma_{P+1}$是矩阵$H$的第$P+1$个奇异值。该上界存在的概率大于$1-3p^{-p}$。

4. 反对角平均得到去噪后的信号$\tilde{X}$
   $$
   \tilde{X}_l\leftarrow \operatorname*{mean}_{i+k=l+1}(\tilde{H}_{ij})
   $$

### rQRd算法流程

![](random-QR-denoising\Alg-rQRd.png)

## 快速Hankel矩阵乘积

利用快速Fourier变换，Hankel矩阵的矩阵-向量乘积可得到快速的实现。

- Hankel矩阵与向量乘积：将矩阵和向量做FFT变换，对应位置乘积后做逆FFT变换得到结果，见FHV。
- Hankel矩阵与矩阵乘积：将乘数矩阵按列展开，利用Hankel矩阵与向量乘积得到矩阵乘积结果，见FHM。

具体流程如下：

![](random-QR-denoising\Alg-Fhv.png)

回顾到随机QR去噪算法的投影和对角平均过程：
$$
\tilde{H}= QQ^* H, \tilde{X}_l= \operatorname*{mean}_{i+k=l+1}(\tilde{H}_{ij})
$$
利用Hankel矩阵与矩阵乘积，令$U=Q^*H$，则
$$
\tilde{H}_{i,j}= \sum_{k=1}^K Q_{i,k}U_{k,j}
$$
对角平均则可化为
$$
\begin{aligned}
\sum_{j=j_1}^{j_m} \tilde{H}_{i-j+1,j}
&=\sum_{k=1}^K\sum_{j=j_1}^{j_m}Q_{i-j+1,k}U_{k,j}\\
&=\sum_{k=1}^K\sum_{j=j_1}^{j_m}Q_{i,j}^{(k)}U_{j}^{(k)}\\
&=\sum_{k=1}^K \big(Q^{(k)}\cdot U^{(k)}\big)_i\\
\end{aligned}
$$
其中$j_1=\max(i-M+1,1),j_m=\min(i,N)$，$Q^{(k)}$是一个Toeplitz矩阵，向量$U^{(k)}$满足$U_j^{(k)}=U_{k,j}$。$\big(Q^{(k)}\cdot U^{(k)}\big)$可使用快速算法计算矩阵乘积。

### urQRd算法流程

![](random-QR-denoising\Alg-urQRd.png)

## 小结

文章的核心是利用随机矩阵来做数据的降维，随机采样的原理可能需要看综述[^2]才能进一步了解，先mark下。另外，文章文献包含的文章[^3]和文章[^4]也是同类基于随机投影的矩阵近似算法。

## References

[^1]: Chiron L , Van Agthoven M A , Kieffer B , et al. Efficient denoising algorithms for large experimental datasets and their applications in Fourier transform ion cyclotron resonance mass spectrometry.[J]. Proceedings of the National Academy of Sciences of the United States of America, 2014, 111(4):1385-90.
[^2]: Halko N , Martinsson P G , Tropp J A . Finding Structure with Randomness: Probabilistic Algorithms for Constructing Approximate Matrix Decompositions[J]. Siam Review, 2010, 53(2):217-288.
[^3]: Woolfe F , Liberty E , Rokhlin V , et al. A fast randomized algorithm for the approximation of matrices[J]. Applied & Computational Harmonic Analysis, 2008, 25(3):335-366.
[^4]: Liberty E , Woolfe F , Martinsson P G , et al. Randomized algorithms for the low-rank approximation of matrices[J]. Proceedings of the National Academy of Sciences, 2008, 104(51):20167-20172.


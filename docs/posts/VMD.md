---
title: 变分模态分解
categories:
  - 信号处理
tags:
  - 优化
mathjax: true
excerpt: 介绍变分模态分解算法(Variational Mode Decomposition)
urlname: Variational-Mode-Decomposition
date: 2020-06-27 22:00:00
---

## 写在前面

介绍变分模态分解(Variational Mode Decomposition, VMD)[^1]。

前几年大家都在做经验模态分解(EMD)的时候，我找到一个极度符合我胃口的变分模型，当时看得一知半解（功力不够），反复看了几遍都有新的认识，这次做个记录，后面会持续跟进。

## 变分模态分解

基于以下假设构造变分模型

- 通过Hilbert变换得到每个模态的解析信号，从而得到单边频谱
- 通过与调谐到各自估计的中心频率的指数混合，将模态的频谱移至基带
- 通过解调信号的$H^1$高斯光滑性，即梯度的$L^2$范数的平方，来估计带宽

$$
\min _{u_k,\omega_k}\sum_{k}\left\|\partial_t\left[\left(\delta(t)+\frac{j}{\pi t}\right) * u_{k}(t)\right] e^{-j \omega_{k} t}\right\|_{2}^{2} \text { s.t. } \sum_{k} u_{k}=f
$$

下面将剖解这一模型

### 固有模态

调频调幅信号(AM-FM)
$$
u_k (t) = A_k (t) \cos (\phi_k (t))
$$

### Hilbert变换

其本质是具有平移不变性的线性算子$\mathcal H$，将余弦函数映射至正弦函数。从信号角度看，Hilbert变换是一种全通滤波器(all-pass filter)，可由转递函数刻画：
$$
\hat h (w) = -j \text{sgn} (w) = -j\frac{w}{w}
$$
对应的脉冲相应为
$$
h(t) = \frac{1}{\pi t}
$$
与$h(w)$做卷积是不可积的，信号$f(t)$的Hilbert变换$\mathcal H f(t)$ 通过卷积积分的柯西主值(Cauchy principal value )得到
$$
{\mathcal H} f(t) = \frac{1}{\pi} \text{p.v.} \int_{\mathbb R} \frac{f(v)}{t-v} dv
$$
Hilbert变换的主要用途是将实信号转化为解析信号。设$f(t)$是一个纯实信号，复值解析信号定义如下：
$$
f_A(t) = f(t) +j {\mathcal H} f(t) = A(t) e^{j \phi(t)}
$$
其中$e^{j \phi(t)}$描述复信号在时间上旋转的相量，$\phi(t)$表示相位，振幅$A(t)$描述了实包络。

- 解析信号直接继承相同的振幅信号

$$
u_{k,A} = A_k(t)(\cos (\phi(t)) + (j \sin(\phi(t)))) = A_k(t) e^{j \phi(t)}
$$

- 解析信号的单边频谱由非负频率构成

$$
f(t) = \Re \{f_A(t)\}
$$

- 解析信号得Fourier变换

$$
\hat u_A (w) = \int_{-\infty}^{\infty} u_A(t) e^{-jwt}dt = (1+\text{sgn}(w))\hat u(w)
$$

### 混频和外差解调

混合两个实信号会产生两组混合频率
$$
2\cos(w_1t)\cos(w_2t) = \cos((w_1+w_2)t)+\cos((w_1-w_2)t)
$$
混合两个解析信号后频率仅由单个频率组成
$$
e^{j w_1 t} e^{j w_2 t} = e^{j (w_1 + w_2) t}
$$
运用Fourier变换
$$
f_{A}(t) e^{-j \omega_{0} t} \stackrel{\mathcal{F}}{\longleftrightarrow} \hat{f}_{A}(\omega) * \delta\left(\omega+\omega_{0}\right)=\hat{f}_{A}\left(\omega+\omega_{0}\right)
$$
因此，将解析信号与纯指数相乘会导致简单的频移。

### Wiener滤波

原始信号$f(t)$受加性零均值高斯噪声的观察信号$f_0(t)$，即
$$
f_0 = f + \eta
$$
信号的去噪是一个典型病态的可逆问题，通常用Tikhonov正则化来处理
$$
\min_f \|f - f_0\|_2^2 + \alpha \|\partial_t f\|_2^2
$$
求解其Euler-Lagrange方程可得到最优解，在Fourier域上
$$
\hat f(w) = \frac{\hat {f_0}}{1+\alpha w^2}
$$
其中$\hat f$是信号$f$做Fourier变换所得。通常恢复的信号是观察信号在频率$w=0$附近的低通窄带选择，即Wiener滤波可视为低通滤波器，$\alpha$表示白噪声的方差，信号具有低通$w^{-2}$频谱先验。

## 模型求解

VMD模型包含线性约束条件，通常做法是转化为无约束优化问题。

- 构造增广拉格朗日函数

$$
\begin{aligned}
\mathcal{L} ( u_k, \omega_{k}, \lambda ) &= \alpha \sum_{k}\left\|\partial_t((\delta(t)+\frac{j}{\pi t}) * u_{k}(t)) e^{-j \omega_{k} t}\right\|_{2}^{2}\\
&+\Bigg\Vert f(t)-\sum_{k}u_k(t)\Bigg\Vert_2^2+ \Bigg\langle\lambda(t),f(t)-\sum_{k}u_k(t)\Bigg\rangle
\end{aligned}
$$

下面使用ADMM算法来寻找增广拉格朗日函数的鞍点。

- 更新$u_k$

固定$w_k,\lambda $后，对应子问题为
$$
\min_ {u_k}\alpha \sum_{k}\left\|\partial_{t}\left[\left(\delta(t)+\frac{j}{\pi t}\right) * u_{k}(t)\right] e^{-j \omega_{k} t}\right\|_{2}^{2}+\Bigg\Vert f(t)-\sum_{i}u_i(t) + \frac{\lambda(t)}{2}\Bigg\Vert_2^2
$$
利用$L^2$范数意义下的Fourier等距性，该子问题可在谱域求解
$$
\min_ {\hat u_k u_k}\alpha \left\|jw[(1+\text{sgn}(w+w_k))\hat u_k (w+w_k)]\right\|_{2}^{2}+\Bigg\Vert \hat f(t)-\sum_{i}\hat u_i(t) + \frac{\hat\lambda(t)}{2}\Bigg\Vert_2^2
$$
令$w \leftarrow w-w_k$
$$
\min_ {\hat u_k u_k}\alpha \left\|j(w-w_k))[(1+\text{sgn}(w))\hat u_k (w)]\right\|_{2}^{2}+\Bigg\Vert \hat f(t)-\sum_{i}\hat u_i(t) + \frac{\hat\lambda(t)}{2}\Bigg\Vert_2^2
$$
重构保真项利用实信号的Hermitian对称性，可将两项写为非负频率上的半空间积分：
$$
\min_ {\hat u_k u_k} \int_0^{\infty} 4\alpha (w-w_k)^2|\hat u_k (w)|^{2}+ 2\left|\hat f(t)-\sum_{i}\hat u_i(t) + \frac{\hat\lambda(t)}{2}\right|^2 dw
$$
对于该二次优化问题，在正频率积分下，令一阶导数为零，得到
$$
\begin{aligned}
\hat{u}_k^{n+1}(\omega) = \frac{\hat{x}(\omega)-\sum_{i\neq k}\hat{u}_i(\omega)+\frac{\hat{\lambda}(\omega)}{2}}{1+2\alpha(\omega-\omega_k)^2}.
\end{aligned}
$$
该式是当前残差对应先验$(w-w_k)^{-2}$的Wiener滤波形式。对$\hat u_k$进行Fourier逆变换可得到解析信号的实部分$u_k$。

- 更新$w_k$

中心频率仅出现在带宽先验项，因此固定$u_k,\lambda$后子问题如下
$$
\min_ {w_k} \left\|\partial_{t}\left[\left(\delta(t)+\frac{j}{\pi t}\right) * u_{k}(t)\right] e^{-j \omega_{k} t}\right\|_{2}^{2}
$$
同样转换到Fourier域
$$
\min_ {\hat w_k} \int_0^{\infty}  (w-w_k)^2|\hat u_k (w)|^{2} dw
$$
对于该二次优化问题，同样令一阶导数为零可得最优解
$$
\omega_k^{n+1}=\frac{\int^{\infty}_0 \omega|\hat{u}_k(\omega)|^2 d\omega}{\int^{\infty}_0 |\hat{u}_k(\omega)|^2 d\omega},
$$
该平均载频是模态所观察到的瞬时相位的最小二乘线性回归的频率。

- 更新$\lambda$

拉格朗日乘子的更新通过对偶上升实现
$$
\hat\lambda ^{n+1} (w) = \hat\lambda ^{n} (w) + \tau (\hat f(w)-\sum_{k}\hat u_k^{n+1}(w))
$$
其中参数$\tau$权衡了正则项和保真项，若需要精确恢复信号，即不存在高斯噪声情况下，设置$\tau = 0$。

### 算法流程

![](变分模态分解/VMD-ADMM.png)

## 多元变分模态分析

下面介绍多元模型[^2]。对于多元振荡，考虑$C$个实值AM-FM信号$\{u_i(t)\}_{i=1}^C$，用向量形式表示
$$
\mathbf{u}(t)=\left[\begin{array}{c}
u_{1}(t) \\
u_{2}(t) \\
\vdots \\
u_{C}(t)
\end{array}\right]=\left[\begin{array}{c}
a_{1}(t) \cos \left(\phi_{1}(t)\right) \\
a_{2}(t) \cos \left(\phi_{2}(t)\right) \\
\vdots \\
a_{C}(t) \cos \left(\phi_{C}(t)\right)
\end{array}\right]
$$
对该向量信号$\mathbf{u}(t)$进行Hilbert变换，即对各个分量进行Hilbert变换，产生解析信号向量
$$
\mathbf{u}_A(t)= \mathbf{u}(t) + j{\mathcal H} \mathbf{u}(t)  =\left[\begin{array}{c}
u_{1,A}(t) \\
u_{2,A}(t) \\
\vdots \\
u_{C,A}(t)
\end{array}\right]=\left[\begin{array}{c}
a_{1}(t) e^{\phi_{1}(t)} \\
a_{2}(t) e^{\phi_{2}(t)} \\
\vdots \\
a_{C}(t) e^{\phi_{C}(t)}
\end{array}\right]
$$
反之，取解析信号向量的实部即可恢复原信号
$$
\mathbf{u}(t) = \Re \{\mathbf{u}_A(t)\}
$$

### 模型构建

- 目的：从输入信号$\mathbf{x}(t) = [x_1(t),x_2(t),\dots,x_C(t)]$提取$K$个多元模态$\mathbf {u}_k (t) = [u_1(t),u_2(t),\dots,u_C(t)]$
- 先验假设：
  - 提取模态的带宽之和最小
  - 提取模态之和能精确恢复原信号
- 通过采用谐波位移的梯度函数的L2范数来估算模态带宽，对应的目标函数为

$$
\sum_{k}\left\|\partial_{t}\left[   \mathbf{u}_{k,A}(t) e^{-j \omega_{k} t}\right] \right\|_{2}^{2}
$$

上式在整个信号向量$\mathbf{u}_{k,A}(t)$的谐波混合中使用单个频率成分$w_k$，多元实信号$\mathbf{u}_{k}(t)$的所有通道均具有频率$w_k$。因此，通过将$\mathbf{u}_{k,A}(t)$所有通道的单边频谱偏移$w_k$并利用Frobenius范数来估算调制多元振荡的带宽。其目标函数按分量表示为
$$
\sum_{k}\sum_{c}\left\|\partial_t\left[ u_{k,c,A}(t) e^{-j \omega_{k} t}\right] \right\|_{2}^{2}
$$
其中$u_{k,c,A}(t)$表示通道$c$模态$k$的解析信号。

### 多元变分模态模型

$$
\min_{ u_{k,c}, w_k } \sum_{k}\sum_{c}\left\|\partial_{t}\left[ u_{k,c,A}(t) e^{-j \omega_{k} t}\right] \right\|_{2}^{2}  \text { s.t. } \sum_k u_{k,c}(t) = x_c, \forall c
$$

###  模型求解

与VMD模型一样，首先转化约束优化问题至无约束优化问题，再使用ADMM算法求解

- 增广的拉格朗日函数

$$
\begin{aligned}
\mathcal{L}({u_{k,c},\omega_{k},\lambda_c}) &= \alpha\ {\sum_k\sum_c}\Bigg\Vert\partial_t\Big[u_{k,c,A}(t) e^{-j\omega_kt}\Big]\Bigg\Vert^2_2\\
&+{\sum_c}\Bigg\Vert x_c(t)-\sum_{k}u_{k,c}(t)\Bigg\Vert_2^2+ {\sum_c}\Bigg\langle\lambda_c(t),x_c(t)-\sum_{k}u_{k,c}(t)\Bigg\rangle
\end{aligned}
$$

- 更新模态

固定$\{\omega_{k}\},\lambda_c$，可得如下子问题
$$
\min_{u_{k,c}} \alpha\Bigg\Vert\partial_t\Big[u_{k,c,A}(t) e^{-j\omega_kt}\Big]\Bigg\Vert^2_2+	\Bigg\Vert x_c(t)-{\sum_i} u_{i,c}(t)+\frac{\lambda_c(t)}{2}\Bigg\Vert^2_2
$$
其显示解为
$$
\hat{u}_{k,c}^{n+1}(\omega) = \frac{\hat{x}_c(\omega)-\sum_{i\neq k}\hat{u}_{i,c}(\omega)+\frac{\hat{\lambda}_c(\omega)}{2}}{1+2\alpha(\omega-\omega_k)^2}
$$

- 更新中心频率

固定$\{u_{k,c}\},\lambda_c$，可得如下子问题
$$
\min_{\omega_k}{\sum_c}\Bigg\Vert\partial_t\Big[u_{k,c,A}(t) e^{-j\omega_kt}\Big]\Bigg\Vert^2_2
$$
利用Fourier变换转为频域上的优化问题为
$$
\min_{\omega_k}{\sum_c}\int_{0}^{\infty}(\omega-\omega_k)^2\Big| \hat{u}_{k,c}(\omega)\Big|^2d\omega
$$
其显示解为
$$
\omega_k^{n+1}=\frac{\sum_c\int^\infty_0 \omega|\hat{u}_{k,c}(\omega)|^2 d\omega}{\sum_c\int^\infty_0 |\hat{u}_{k,c}(\omega)|^2 d\omega}
$$

### 算法流程

![](变分模态分解/MVMD-ADMM.png)

## 参考文献

[^1]: Dragomiretskiy K , Zosso D . Variational Mode Decomposition[J]. IEEE Transactions on Signal Processing, 2014, 62(3):531-544.
[^2]: Rehman N U, Aftab H. Multivariate Variational Mode Decomposition[J]. IEEE Transactions on Signal Processing, 2019, 67(23): 6039-6052.
---
title: Fock-Bargmann-Hartogs域
categories:
  - 多复变
tags:
  - Fock-Bargmann-Hartogs域
  - Bergman算子
  - Toeplitz算子
mathjax: true
urlname: Fock-Bargmann-Hartogs
date: 2020-05-03 21:32:45
updated: 2020-05-03 21:32:45
excerpt: 本篇报告Fock-Bargmann-Hartogs域的近期研究进展。
---

## 研究方向

针对Fock-Bargmann-Hartogs域及其广义域，研究方向主要集中以下三点:

1. 借助度量推导边界Schwarz Lemma;
2. 利用Bergman核的精确形式来推导逆紧映射的刚度性质;
3. 判断Bergman算子和Toeplitz算子的有界性;

## 研究背景

### 介绍域

Fock-Bargmann-Hartogs域(**无界非双曲强拟凸+具有光滑实解析边界**)

$$D_{n, m}(\mu) = \left\{ (z, w) \in \mathbb{C}^{n} \times \mathbb{C}^{m}: \|w\|^{2} < e^{-\mu\|z\|^{2}} \right\}$$

- 有界域的几何和解析性质不能直接推广至无界域甚至非双曲强拟凸域
- 与Fock-Bargmann域密切相关,利用加权Hilbert空间的高斯核计算其Bergman核

广义复椭球(**非强拟凸域+边界非光滑**)

$$\Sigma({n} ; {p})=\left\{\left(\zeta_{1}, \ldots, \zeta_{r}\right) \in \mathbb{C}^{n_{1}} \times \cdots \times \mathbb{C}^{n_{r}}: \sum_{k=1}^{r}\left\|{\zeta}_{k}\right\|^{2 p_{k}}<1\right\}$$

广义Fock-Bargmann-Hartogs域$D_{n_{0}}^{n, p}(\mu)$定义如下

$$D_{n_{0}}^{n, p}(\mu)=\left\{\left(z, w_{(1)}, \ldots, w_{(\ell)}\right) \in \mathbb{C}^{n_{0}} \times \mathbb{C}^{n_{1}} \times \cdots \times \mathbb{C}^{n_{\ell}}: \right.\left.\sum_{j=1}^{\ell}\left\|w_{(j)}\right\|^{2 p_{j}} < e^{-\mu\|z\|^{2}}\right\}$$

- 无界非双曲域

- **非强拟凸域+边界非光滑**

  $$b D_{n_{0}}^{n, p}(\mu)=b_{0} D_{n_{0}}^{n, p}(\mu) \cup b_{1} D_{n_{0}}^{n, p}(\mu) \cup b_{2} D_{n_{0}}^{n, p}(\mu)$$

  - $b_{0} D_{n_{0}}^{n, p}(\mu)$ 实解析+强拟凸
  - $b_{1} D_{n_{0}}^{n, p}(\mu)$ 弱拟凸但非强拟凸
  - $b_{2} D_{n_{0}}^{n, p}(\mu)$ 非光滑

### 边界Schwarz Lemma

研究热点-在各种域及各种函数的性质上推广传统的Schwarz lemma

- 域的性质: 有(无)界域、凸性、度量、广义域
- 边界性质: 等维度、光滑性、不动点
- 函数性质: 全纯(调和)、(高阶)导、特征值

文献[1]研究了Fock-Bargmann-Hartogs域的Kobayashi 伪度量$\mathcal{K}_{D_{1,1}}$的具体形式;据此给出非等维度的Fock-Bargmann-Hartogs域间全纯函数的边界Schwarz lemma.

> Let $F = ( f , h) : D_{1,1} \to  D_{n,m}$ be a holomorphic mapping and holomorphic at $p \in \partial D_{1,1}$ with $F(p) = q \in \partial D_{n,m}$. Then we have the result as follows:
>
> - There exists $\lambda \in \mathbb{R}$ such that $\overline{J_{F}(p)}^{T} q^{T}=\lambda p^{T}$ with $\lambda \geq|1-\overline{h_{1}(0)}|^{2} /\left(1-\left|h_{1}(0)\right|^{2}\right)>0$. Notice that $p^T$ and $q^T$ are the normal vectors to the boundary of $D_{1,1}$ at $p$ and $D_{n,m}$ at $q$, respectively.
>
> - $J_F(p)$ can be regarded as a linear operator from $T_{p}^{1,0}\left(\partial D_{1,1}\right)$ to $T_{F(p)}^{1,0}\left(\partial D_{n,m}\right)$. Moreover, we have $\left\|J_{F}(p)\right\|_{o p} \leq \sqrt{\lambda}$ *where $\left\|\cdot\right\|_{o p}$ means the usual operator norm.

**总结**:光滑性边界点的雅可比阵之特征值来建立边界点间的关系.

### 刚度性质

研究热点-在无界弱拟凸域逆紧全纯映射与双全纯映射的联系.

- 域的Bergman核精确形式
- 域的自同构群
- 边界点的属性

文献[3]给出等维Fock-Bargmann-Hartogs域的刚度结论.

> If $D_{n,m}(\mu)$ and $D_{n^{\prime}, m^{\prime}}\left(\mu^{\prime}\right)$ are two equidimensional Fock-Bargmann-Hartogs domains with $m \geq 2$ and $f$ is a proper holomorphic mapping of $D_{n,m}(\mu)$ into $D_{n^{\prime}, m^{\prime}}\left(\mu^{\prime}\right)$, then $f$ is a biholomorphism between $D_{n,m}(\mu)$ and $D_{n^{\prime}, m^{\prime}}\left(\mu^{\prime}\right)$.

文献[2]用$Aut(\Sigma({n} ; {p}))$和$Aut(D_{n, m}(\mu))$推导$Aut(D_{n_{0}}^{n, p}(\mu))$;用$D_{n, m}(\mu)$Bergman的核精确形式[4],通过正交基表示形式给出$D_{n_{0}}^{n, p}(\mu)$的Bergman核表达式;进一步给出$D_{n_{0}}^{n, p}(\mu)$的边界性质

> Suppose $D_{n_{0}}^{n, p}(\mu)$ and $D_{m_{0}}^{m, q}(\nu)$ are two equidimensional generalized Fock-Bargmann-Hartogs domains with
>
> $$\min \left\{n_{1+\epsilon}, n_{2}, \ldots, n_{\ell}, n_{1}+\cdots+n_{\ell}\right\} \geq 2$$
> 
> $$\min \left\{m_{1+\delta}, m_{2}, \cdots, m_{\ell}, m_{1}+\dots+m_{\ell}\right\} \geq 2$$
>
> Then any proper holomorphic mapping between $D_{n_{0}}^{n, p}(\mu)$ and $D_{m_{0}}^{m, q}(\nu)$ must be a biholomorphism; any proper holomorphic self-mapping of $D_{n_{0}}^{n, p}(\mu)$ must be an automorphism.
> 

**总结**:给出一种原始域到广义域的性质推广的模版.

### 算子有界性

- Hartogs三角域:$\mathbb{H}=\left\{\left(z_{1}, z_{2}\right) \in \mathbb{C}^{2} :|z_{1}|<| z_{2} |<1\right\}$

- 广义Hartogs三角域$\mathbb{H}_{\left\{k_{j}, \phi_{j}\right\}}^{n}=\left\{z \in \mathbb{C}^{n}:\max _{1 \leq j \leq l}| \phi_{j}\left(\tilde{z}_{j}\right)|<| z_{k+1}|<\cdots<| z_{n} |<1\right\}$


文献[6]给出$\mathbb{H}_{\left\{k_{j}, \phi_{j}\right\}}^{n}$上Bergman算子的有界性.

> For $1 \leq p < \infty$ and $1 \leq k < n$, the Bergman projection $P_{\mathbb{H}_{\left\{k_{j}, \phi_{j}\right\}}^{n}}$ for $\mathbb{H}_{\left\{k_{j}, \phi_{j}\right\}}^{n}$ is bounded on $L^{p}\left(\mathbb{H}_{\left\{k_{j}, \phi_{j}\right\}}^{n}\right)$ if and only if $p$ is in the range $\left(\frac{2 n}{n+1}, \frac{2 n}{n-1}\right)$.

- Hartogs三角域:$\mathbb{H}=\left\{\left(z_{1}, z_{2}\right) \in \mathbb{C}^{2} :|z_{1}|<| z_{2} |<1\right\}$

- 广义Hartogs三角域$\mathbb{H}_{\left\{k_{j}, \phi_{j}\right\}}^{n}=\left\{z \in \mathbb{C}^{n}:\max _{1 \leq j \leq l}| \phi_{j}\left(\tilde{z}_{j}\right)|<| z_{k+1}|<\cdots<| z_{n} |<1\right\}$

- 广义Hartogs三角域$\mathcal{H}_{k}^{n+1}:=\left\{(z, w) \in \mathbb{C}^{n} \times \mathbb{C}:\|z\|<|w|^{k}<1\right\}$

- 广义Hartogs三角域$\mathcal{H}_{\left\{k_{j}, \phi_{j}, b\right\}}^{n}=\left\{z \in \mathbb{C}^{n}: \max _{1 \leq j \leq l}\left\|\phi_{j}\left(\widetilde{z}_{j}\right)\right\|<\left|z_{k+1}\right|^{b}<\cdots<\left|z_{n}\right|^{b}<1\right\}$


文献[5]给出$\mathcal{H}_{\left\{k_{j}, \phi_{j}, b\right\}}^{n}$上Toeplitz算子的有界性.

> Let $T_{K^{-t}}$ be the Toeplitz operator with the symbol $K^{-t}(z, z), t \geq 0$. Let $1 < p \leq q < \infty$ and $C_{b, k}=k(b-1)$.
>
> (1) If $q \in\left[\frac{2 n+2 C_{b, k}}{n-1+C_{b, k}}, \infty\right),$ then the Toeplitz operator $T_{K^{-t}}$ does not map $L^{p}\left(\mathcal{H}_{\left\{k_{j}, \phi_{j}, b\right\}}^{n}\right)$ into $L^{q}\left(\mathcal{H}_{\left\{k_{j}, \phi_{j}, b\right\}}^{n}\right)$ for any $t \geq 0$\
> (2) If $q \in\left(\frac{2(n-1)+2 C_{b, k}}{n+1+C_{b, k}-2 / p}, \frac{2 n+2 C_{b, k}}{n-1+C_{b, k}}\right),$ then the Toeplitz operator $T_{K^{-t}}$ continuously maps $L^{p}\left(\mathcal{H}_{\left\{k_{j}, \phi_{j}, b\right\}}^{n}\right)$ into $L^{q}\left(\mathcal{H}_{\left\{k_{j}, \phi_{j}, b\right\}}^{n}\right)$ if and only if $t \geq \frac{1}{p}-\frac{1}{q}$\
> (3) If $q \in\left[p, \frac{2(n-1)+2 C_{b, k}}{n+1+C_{b, k}-2 / p}\right],$ then the Toeplitz operator $T_{K^{-t}}$ continuously $\operatorname{maps} L^{p}\left(\mathcal{H}_{\left\{k_{j}, \phi_{j}, b\right\}}^{n}\right)$ into $L^{q}\left(\mathcal{H}_{\left\{k_{j}, \phi_{j}, b\right\}}^{n}\right)$ if and only if $t>\frac{1}{2 p}+\frac{(1-p)}{2 p} \frac{n+1+C_{b, k}}{n-1+C_{b, k}}$

**总结**:原始域Bergman算子正则性$\to$广义域Toeplitz算子有界性.

## 文献列举

(包括：已读文献和计划研读的文献。需要列出文献来源杂志。注意不能少于10篇。)

- 已读文献7篇，其中重要文献3篇：
  1. (<font face="黑体" color=red>重要文献</font>) Bi, E., Su, G. & Tu, Z. The Kobayashi Pseudometric for the Fock-Bargmann-Hartogs Domain and Its Application. J Geom Anal 30, 86–106 (2020).
  2. (<font face="黑体" color=red>重要文献</font>) Bi E , Tu Z . Rigidity of proper holomorphic mappings between generalized Fock–Bargmann–Hartogs domains[J]. Pacific Journal of Mathematics, 2018, 297(2):277-297.
  3. Tu Z , Wang L . Rigidity of proper holomorphic mappings between certain unbounded non-hyperbolic domains[J]. Journal of Mathematical Analysis and Applications, 2014, 419(2):703-714.
  4. Yamamori A . The Bergman kernel of the Fock–Bargmann–Hartogs domain and the polylogarithm function[J]. Complex Variables, Theory and Application: An International Journal, 2013, 58(6):783-793.
  5. (<font face="黑体" color=red>重要文献</font>) Tang, Y., Tu, Z. Special Toeplitz operators on a class of bounded Hartogs domains. Arch. Math. (2019).
  6. Chen, Liwei. The Lp boundedness of the Bergman projection for a class of bounded Hartogs domains[J]. Journal of Mathematical Analysis and Applications, 2017, 448(1):598-610.
  7. Vu K T , Jiakun L , Trong T P . Bergman–Toeplitz operators on weakly pseudoconvex domains[J]. Mathematische Zeitschrift, 2018.
- 计划研读文献4篇：
  - [ ] He L , Tang Y , Tu Z . $L^p$ regularity of weighted Bergman projection on Fock-Bargmann-Hartogs domain[J]. 2019.
  - [ ] Tu Z , Wang L . Rigidity of proper holomorphic mappings between equidimensional Hua domains[J]. Mathematische Annalen, 2015, 363(1-2):1-34.
  - [ ] Blocki Z . The Bergman Metric and the Pluricomplex Green Function[J]. Transactions of the American Mathematical Society, 2005, 357(7):2613-2625.
  - [ ] Khanh T V , Liu J , Thuc P T . Bergman–Toeplitz operators on fat Hartogs triangles[J]. Proceedings of the American Mathematical Society, 2019, 147.

## 研究展望

(列出两个自己的创新点并概括的做描述性证明.每个创新点后面需要写出创新点来源.)

### $D_{n_{0}}^{n, p}(\mu)$的边界Schwarz Lemma

$$D_{n, m}(\mu)=\left\{(z, w) \in \mathbb{C}^{n} \times \mathbb{C}^{m}:\|w\|^{2} < e^{-\mu\|z\|^{2}}\right\}$$

$$D_{n_{0}}^{n, p}(\mu)=\left\{\left(z, w_{(1)}, \ldots, w_{(\ell)}\right) \in \mathbb{C}^{n_{0}} \times \mathbb{C}^{n_{1}} \times \cdots \times \mathbb{C}^{n_{\ell}}:\right.\left.\sum_{j=1}^{\ell}\left\|w_{(j)}\right\|^{2 p_{j}} < e^{-\mu\|z\|^{2}}\right\}$$

> ==猜想==
>
> > Let $F = ( f , h) : D_{1}^{1,1} \to D_{n_{0}}^{n, p}$ be a holomorphic mapping and holomorphic at $p \in \partial D_{1}^{1,1}$ with $F(p) = q \in \partial D_{n_{0}}^{n, p}$. There exists $\lambda \in \mathbb{R}$ such that  $\overline{J_{F}(p)}^{T} q^{T}=\lambda p^{T}$ with $\lambda \geq|1-\overline{h_{1}(0)}|^{2} /\left(1-\left|h_{1}(0)\right|^{2}\right)>0$.
>
> ==技术路线==
>
> > 研究了$D_{n_{0}}^{n, p}(\mu)$的Kobayashi伪度量的具体形式;据此给出非等维度的$D_{n_{0}}^{n, p}(\mu)$间全纯函数的边界Schwarz lemma.
>
> 来源于文献[1]定理1.9,和文献[2]定理1.6、性质3.1.

### $D_{n_{0}}^{n, p}(\mu)$的 Bergman-Toeplitz operators有界性

> ==猜想==
>
> > Let $T_{K^{-t}}$ be the Toeplitz operator with the symbol $K^{-t}(z, z), t \geq 0$. Let $1 < p \leq q < \infty$. If $q \in\left[?, \infty\right),$ then the Toeplitz operator $T_{K^{-t}}$ continuously.
>
> ==技术路线==
>
> > 给出$D_{n_{0}}^{n, p}(\mu)$的完备正交基，利用广义的Schur检验和一些基本积分不等式，分情况研究Toeplitz算子的$L^p - L^q$估计.
>
> 来源于文献[7]定理5.1,和$D_{n_{0}}^{n, p}(\mu)$的$L^p$正则性.
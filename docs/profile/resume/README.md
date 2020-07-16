---
pageClass: home-page
# some data for the components

name: Albert Einstein
profile: /profile/profile.png

socials:
  - title: github
    icon: "/icons/github.svg"
    link: https://github.com/pxxyyz-dev
  - title: linkedin
    icon: "/icons/linkedin-mono.svg"
    link: https://www.linkedin.com
  - title: instagram
    icon: "/icons/instagram-mono.svg"
    link: https://www.instagram.com

cv: https://en.wikipedia.org/wiki/Albert_Einstein
bio: Father of modern physics
email: a(dot)einstein(at)ias(dot)edu
---

<ProfileSection :frontmatter="$page.frontmatter" />

## About

**Albert Einstein** (14 March 1879 – 18 April 1955) was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics (alongside quantum mechanics). His work is also known for its influence on the philosophy of science. He is best known to the general public for his mass–energy equivalence formula $E = mc^2$, which has been dubbed "the world's most famous equation". He received the 1921 Nobel Prize in Physics "for his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect", a pivotal step in the development of quantum theory.

## Current position

*Emeritus Professor*, Institute for Advanced Study, Princeton

## Related Experience& Achievements

- Institute for Advanced Study, Princeton, NJ • 1933 – 1955

  **Professor of Theoretical Physics**

- California Institute of Technology, Pasadena, CA • 1933

  **Visiting Professor**

- Kaiser Wilhelm Institute for Physics, Berlin, Germany • 1917 – 1933

  **Director**

- Karl-Ferdinand University, Prague, Czechoslovakia • 1911 – 1917

  **Professor of Theoretical Physics**

- Zurich University, Zurich, Switzerland • 1909 – 1911

  **Associate Professor of Theoretical Physics**

- University of Bern, Bern, Switzerland • 1908 – 1909

  **Associate Professor**

- Federal Office for Intellectual Property, Bern, Switzerland • 1902 – 1909

  **Assistant Examiner**

## Education

- PhD in Physics, ETH Zürich
- MSc in Physics, ETH Zürich

## LECTURES & HONORS

- Key member of the National Academy of Science delegation that visited the White House
- Guest Lecturer at King’s College in London
- Key participant in a 6-month excursion and speaking tour to Singapore, Ceylon, Japan, and Palestine

## Work

### Annus mirabilis papers

<ProjectCard>

- Einstein, Albert (1905), “**On a Heuristic Viewpoint Concerning the Production and Transformation of Light**", Annalen der Physik 17: 132–148.

  *Resolved an unsolved puzzle by suggesting that energy is exchanged only in discrete amounts (quanta). This idea was pivotal to the early development of quantum theory.*

- Einstein, Albert (1905), “**On theMotion—Required by theMolecularKinetic Theory ofHeat—of Small Particles Suspended in a Stationary Liquid**", Annalen der Physik 17: 549–560.

  *Explained empirical evidence for the atomic theory, supporting the application of statistical physics.*

- Einstein, Albert (1905), “**On the Electrodynamics of Moving Bodies**", Annalen der Physik 17: 891–921.

  *Reconciled Maxwell's equations for electricity and magnetism with the laws of mechanics by introducing changes to mechanics, resulting from analysis based on empirical evidence that the speed of light is independent of the motion of the observer. Discredited the concept of a "luminiferous ether".*

- Einstein, Albert (1905), “**Does the Inertia of a Body Depend Upon Its Energy Content?**",Annalen der Physik 18: 639–641.

  *Equivalence of matter and energy, $E = mc^2$ (and by implication, the ability of gravity to "bend" light), the existence of "rest energy", and the basis of nuclear energy.*

</ProjectCard>

<a-Button type="link" onclick="window.location.href='/profile/projects/';" block><div style="font-size:24px">Full list <a-icon type="pushpin" theme="outlined" /></div></a-Button> 

## Awards & Honors

- Nobel Prize in Physics
- Matteucci Medal
- Barnad Medal
- ForMemRS
- Copley Medal
- Gold Medal of the Royal Astronomical Society
- Max Planck Medal
- Time - Person of the Century


<!-- Custom style for this page -->

<style lang="stylus">
.profile
  display inline-flex !important
  align-items center !important
.profile .info
  padding-left 0.5rem !important
.theme-container.home-page .page
  font-size 14px
  font-family "lucida grande", "lucida sans unicode", lucida, "Helvetica Neue", Helvetica, Arial, sans-serif;
  p
    margin 0 0 0.5rem
  p, ul, ol
    line-height normal
  a
    font-weight normal
  .theme-default-content:not(.custom) > h2
    margin-bottom 0.5rem
  .theme-default-content:not(.custom) > h2:first-child + p
    margin-top 0.5rem
  .theme-default-content:not(.custom) > h3
    padding-top 4rem
  /* Override */
  .md-card
    margin-top 0.5em
    .card-image
      padding 0.2rem
      img
        max-width 120px
        max-height 120px
    .card-content p
      -webkit-margin-after 0.2em
@media (max-width: 419px)
  .theme-container.home-page .page
    p, ul, ol
      line-height 1.5
.md-card
  .card-image
    img 
      width 100%
      max-width 400px
</style>

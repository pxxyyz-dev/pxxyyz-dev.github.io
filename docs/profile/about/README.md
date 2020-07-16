---
pageClass: about-page
editLink: false
description: 'The biography and information about me.'
avatar: /profile/Einstein_tongue.jpg
head: 'Albert Einstein'
info: 'Father of modern physics'
interests: 'Interests: philosophy and music'
socials:
- title: github
  link: https://github.com/pxxyyz
- title: zhihu-square
  link: https://www.zhihu.com/people/pxxyyz
- title: bilibili
  link: https://space.bilibili.com/2981026
- title: email
  link: 'mailto:a(dot)einstein(at)ias(dot)edu'
actions:
- text: Projects
  link: /profile/projects/
- text: Blog
  link: https://pxxyyz.com
- text: CV
  link: https://en.wikipedia.org/wiki/Albert_Einstein
footer: Powered by VuePress
---

<AboutCard :frontmatter="$page.frontmatter" >

**Albert Einstein** (14 March 1879 – 18 April 1955) was a German-born theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics (alongside quantum mechanics). His work is also known for its influence on the philosophy of science. He is best known to the general public for his mass–energy equivalence formula $E = mc^2$, which has been dubbed "the world's most famous equation". He received the 1921 Nobel Prize in Physics "for his services to theoretical physics, and especially for his discovery of the law of the photoelectric effect", a pivotal step in the development of quantum theory.

</AboutCard>

<style lang="stylus">
.theme-container.about-page .page
  background-color #e6ecf0
  min-height calc(100vh)
  .last-updated
    display none
</style>
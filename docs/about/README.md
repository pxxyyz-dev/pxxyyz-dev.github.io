---
pageClass: about-page
editLink: false
description: 'The biography and information about me.'
avatar: /profile.jpg
head: 'Harry Potter'
info: 'Student at Hogwarts School'
interests: 'Interests: Quidditch and Wizard chess.'
socials:
- title: github
  link: https://github.com/pxxyyz
- title: zhihu-square
  link: https://www.zhihu.com/people/pxxyyz
- title: bilibili
  link: https://space.bilibili.com/2981026
- title: email
  link: 'mailto:harry[at]gmail.com'
actions:
- text: Projects
  link: /projects/
- text: Blog
  link: https://pxxyyz.com
- text: CV
  link: /article/
footer: Made with ♥ by Fing. Powered by VuePress
---

<AboutCard :frontmatter="$page.frontmatter" >

I attended [Hogwarts School of Witchcraft and Wizardry](https://en.wikipedia.org/wiki/Hogwarts) to study witchcraft, supervised by **Dumbledore** and other professors. I'm trying my best to battle with Lord Voldemort, the evil Wizard that we all fear. My research area includes Defence Against the Dark Arts and other magic. :dizzy:

</AboutCard>

<style lang="stylus">
.theme-container.about-page .page
  background-color #e6ecf0
  min-height calc(100vh)
  .last-updated
    display none
</style>
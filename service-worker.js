/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "dc408fcce61ad971b0a6cc5ec41d082a"
  },
  {
    "url": "assets/css/0.styles.db445d7e.css",
    "revision": "9e48c4003b90be566fb32610afc3b19c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/search.867d45d8.svg",
    "revision": "867d45d8f9c0da0e3e733dd5e7a8d263"
  },
  {
    "url": "assets/js/10.3c9a403d.js",
    "revision": "5eb55549028acc4d3b03469e7ced216b"
  },
  {
    "url": "assets/js/11.596978ac.js",
    "revision": "2531eb1b1c5902868f3f6e63e0b101a9"
  },
  {
    "url": "assets/js/12.b20e084a.js",
    "revision": "08f708d20b751caf45c263d93bb44458"
  },
  {
    "url": "assets/js/13.cad3c1a1.js",
    "revision": "dca4731d6b67e3afd39e0cc978c19f22"
  },
  {
    "url": "assets/js/14.7c324930.js",
    "revision": "3e69af9cf15b7d1ad7dd4f2f8de15acb"
  },
  {
    "url": "assets/js/15.35c7cf81.js",
    "revision": "1ab5ec1a983aee389bf10320863b1d0a"
  },
  {
    "url": "assets/js/16.7a2085e0.js",
    "revision": "e32b66b3c64e436bb73aa6f876a3e816"
  },
  {
    "url": "assets/js/17.3a6ba363.js",
    "revision": "93218bdc6a03e273da73a49e8261c910"
  },
  {
    "url": "assets/js/18.efb668e0.js",
    "revision": "2be422f09048856a296d99a75fefae32"
  },
  {
    "url": "assets/js/19.581da94b.js",
    "revision": "af8cca6e24d5d2d879bef47ce2a9ed26"
  },
  {
    "url": "assets/js/2.c3376f89.js",
    "revision": "82f879c9a55c64dbd4a851734390b6ec"
  },
  {
    "url": "assets/js/20.17153766.js",
    "revision": "b4bb2cc6c338fe218728e3b8ef526ea3"
  },
  {
    "url": "assets/js/21.de638e65.js",
    "revision": "ba47d6918cc840f8778f83d63a15b424"
  },
  {
    "url": "assets/js/22.75aeaf80.js",
    "revision": "ff5427a729691d0b67e5ecc7d9bf463c"
  },
  {
    "url": "assets/js/23.7935cfd1.js",
    "revision": "39b2a27e5c41723e153caa7c87731ecb"
  },
  {
    "url": "assets/js/24.2cb99636.js",
    "revision": "e33630bb97cade5c8a6d0445db5c9aba"
  },
  {
    "url": "assets/js/25.bafbf310.js",
    "revision": "6921324f64cda1ae7b2269a14dffa27e"
  },
  {
    "url": "assets/js/26.bccf2360.js",
    "revision": "9cb711836f0196c301937059eb52b046"
  },
  {
    "url": "assets/js/27.331f2992.js",
    "revision": "3231bac02fb7d5f7814445d2dedff5b6"
  },
  {
    "url": "assets/js/28.3164da76.js",
    "revision": "b66761f27679134d687cc64703590f05"
  },
  {
    "url": "assets/js/29.605e5461.js",
    "revision": "1a5eeaa8ba8a0387cf3259ad3e06a671"
  },
  {
    "url": "assets/js/3.791ea879.js",
    "revision": "f13f03aacf2e26217267f54cee3f171f"
  },
  {
    "url": "assets/js/30.012ddb68.js",
    "revision": "fca194d7c61d90119f6b7e438e7b17fa"
  },
  {
    "url": "assets/js/31.6b1255fd.js",
    "revision": "d1ce9d26d99ac3bb27cbe13230555a61"
  },
  {
    "url": "assets/js/32.1159c3f5.js",
    "revision": "54e731c477d7ac9d09d23e83b9323e1d"
  },
  {
    "url": "assets/js/33.65c8c049.js",
    "revision": "7856ca594e8f83a8f1f1163697050f5c"
  },
  {
    "url": "assets/js/34.bea0fce6.js",
    "revision": "b5dc405934507038f70e25c3f114a260"
  },
  {
    "url": "assets/js/35.14e422d5.js",
    "revision": "7cbead479004485a3bd4ce0ee32527dd"
  },
  {
    "url": "assets/js/36.fe5e00cb.js",
    "revision": "986d1ac7c3b7a679c1aa961f70efc078"
  },
  {
    "url": "assets/js/37.3aa3b762.js",
    "revision": "e2dbd547e2af344ef1234f72a334817b"
  },
  {
    "url": "assets/js/38.0541ea52.js",
    "revision": "874fe1a6491d1e563bc8854893dd4b12"
  },
  {
    "url": "assets/js/39.b12b8d0b.js",
    "revision": "4452db7ef3e768ebc5c3be3eff0e4915"
  },
  {
    "url": "assets/js/4.6f3f9142.js",
    "revision": "9075da4649e5d1d83dd8856cb5ff7d2f"
  },
  {
    "url": "assets/js/40.56991cc6.js",
    "revision": "1de186893f070de26f246cd0fed9c8cc"
  },
  {
    "url": "assets/js/41.661ab053.js",
    "revision": "3c0e098f96bfe2ba2dad395284e50c7b"
  },
  {
    "url": "assets/js/42.e72553c4.js",
    "revision": "4a14fc1b28fbf8b9b08a068265b5f8f2"
  },
  {
    "url": "assets/js/43.525c02d7.js",
    "revision": "cd8af78ca0c63bea9ae72fa1cd1c259c"
  },
  {
    "url": "assets/js/44.3f8667f3.js",
    "revision": "a38e110edd85e79f3cf6869934df9ab5"
  },
  {
    "url": "assets/js/45.25e97ab9.js",
    "revision": "fbe1223cee59b361f20414596d516a2c"
  },
  {
    "url": "assets/js/46.cadcd010.js",
    "revision": "a12c796f724ebe2398616bb77692620b"
  },
  {
    "url": "assets/js/47.02155258.js",
    "revision": "8f85e736ca34fc3c662ec571c794569a"
  },
  {
    "url": "assets/js/48.da61efb0.js",
    "revision": "ecf2e334a79173aecc4ee5b9bab5b866"
  },
  {
    "url": "assets/js/49.9a92fc2e.js",
    "revision": "a3f33565ce65b860abce6a828d3cfa80"
  },
  {
    "url": "assets/js/5.f3c36647.js",
    "revision": "c92566423b7a2d058b97e0330bc6ab88"
  },
  {
    "url": "assets/js/50.e63debea.js",
    "revision": "dcced831bc90b1d5400cf7de9d0b52bd"
  },
  {
    "url": "assets/js/51.ae609c7f.js",
    "revision": "2e2c8efeb65503c5fdc9492477224a48"
  },
  {
    "url": "assets/js/52.d4470f55.js",
    "revision": "1e3534f675de44e78a3aed1d2e76dc1e"
  },
  {
    "url": "assets/js/53.f22ee712.js",
    "revision": "1887b8c376b3723d9f179250b94fb7ed"
  },
  {
    "url": "assets/js/54.55f6b6b3.js",
    "revision": "d07c30baca03d319de11bd5833ad84c8"
  },
  {
    "url": "assets/js/55.e4457d42.js",
    "revision": "98a0f9bfe4e25b6a4dfa4bdccea50302"
  },
  {
    "url": "assets/js/56.a76ae1de.js",
    "revision": "5441a5855d8098f08532a738b032da78"
  },
  {
    "url": "assets/js/57.a0f41126.js",
    "revision": "7f3e5717a03bf86f9edd92a995399611"
  },
  {
    "url": "assets/js/58.1817e8e5.js",
    "revision": "08256753a82fd9f551bf8dd7185d3045"
  },
  {
    "url": "assets/js/59.711ac214.js",
    "revision": "d1b05e086fca04ae831c37ebd2f7119d"
  },
  {
    "url": "assets/js/6.635d1e71.js",
    "revision": "a5da7df7202a05907c02580b91dda08f"
  },
  {
    "url": "assets/js/60.b246fd57.js",
    "revision": "8fb9165fd75500320aea507006e263f4"
  },
  {
    "url": "assets/js/61.d1763262.js",
    "revision": "c348bdd557549c4b06c2f1c9f06adc87"
  },
  {
    "url": "assets/js/62.fe295691.js",
    "revision": "5cf22713219b268165120da5ffe26d60"
  },
  {
    "url": "assets/js/63.6e821330.js",
    "revision": "2bc721daf7ecfd6f7e82744fdf4e0edb"
  },
  {
    "url": "assets/js/64.b9b0ae09.js",
    "revision": "791b43d5260252193ec7d270d8cf80b7"
  },
  {
    "url": "assets/js/65.5cfb51ed.js",
    "revision": "c61478e3ba4712b4f022aa368411be67"
  },
  {
    "url": "assets/js/66.a548f31a.js",
    "revision": "5fb36b20368d3af470ca9f2f4e500d77"
  },
  {
    "url": "assets/js/67.a221c333.js",
    "revision": "32c23cad9d8dc8f05c893f33811f5ab3"
  },
  {
    "url": "assets/js/68.441e2973.js",
    "revision": "2aeb780168b3bcef018e3c9f69acf850"
  },
  {
    "url": "assets/js/69.f43880a6.js",
    "revision": "507e8b634b4b34df7581cba61b76aa01"
  },
  {
    "url": "assets/js/7.8acbbd2c.js",
    "revision": "94a3331713d4144366e3e63041480347"
  },
  {
    "url": "assets/js/70.68e0056a.js",
    "revision": "cc38345cfa4196b34bae753208edfecf"
  },
  {
    "url": "assets/js/71.08a0bd52.js",
    "revision": "b71ed8e943ef39979f5ad92c9d7442a0"
  },
  {
    "url": "assets/js/72.ecc26245.js",
    "revision": "37fe982d5f709a6a3339fb229ebe3605"
  },
  {
    "url": "assets/js/73.2961dd35.js",
    "revision": "bd82075935f4c3271c8f950a72f304bf"
  },
  {
    "url": "assets/js/74.7396416f.js",
    "revision": "1e2e011bf446944d18b42d85c76b1f2c"
  },
  {
    "url": "assets/js/75.98c8810e.js",
    "revision": "90dccb4cdcc04c497cc0f9b9d21f0782"
  },
  {
    "url": "assets/js/76.a0839647.js",
    "revision": "f65b1fd56f3afbd30f282e677b7958a7"
  },
  {
    "url": "assets/js/77.33ee0c3e.js",
    "revision": "2489f349b172c63d57de82c3f5276702"
  },
  {
    "url": "assets/js/78.d29c9fad.js",
    "revision": "aaff2e342a6f3b1a5d4e5b01e03c79c8"
  },
  {
    "url": "assets/js/79.b2b7f035.js",
    "revision": "c65c42021502de183ddd9a5aeba8aac5"
  },
  {
    "url": "assets/js/8.2e2d7cb2.js",
    "revision": "ff28a8cbc6f2ef40da6d4be456ddbe4b"
  },
  {
    "url": "assets/js/80.b23fde97.js",
    "revision": "cb71c2620d2156ddb104a542ebe05282"
  },
  {
    "url": "assets/js/81.8f9bb63d.js",
    "revision": "006c1ae676002caf879eb76cc449ccb6"
  },
  {
    "url": "assets/js/82.b513f2f5.js",
    "revision": "9cdfd1813bdbf1f553541384fe9931b5"
  },
  {
    "url": "assets/js/83.51781148.js",
    "revision": "0f37e5f8b17699687eac375dede1c1b2"
  },
  {
    "url": "assets/js/84.71cef8e7.js",
    "revision": "680b2d84fa0fe22dd42edbea1dbb5655"
  },
  {
    "url": "assets/js/85.b19da582.js",
    "revision": "3134af96abc71e16d57b83e9246d3a54"
  },
  {
    "url": "assets/js/86.3ec26fbf.js",
    "revision": "4bedd17eda29ca358c19743bbbc9ef8d"
  },
  {
    "url": "assets/js/87.e3695d5c.js",
    "revision": "01ec0359b8d7a99a2e926d9c7c0a7bef"
  },
  {
    "url": "assets/js/88.48bc8385.js",
    "revision": "9dcb2bc1f1ae26209783b775f0cba8d5"
  },
  {
    "url": "assets/js/89.3b043492.js",
    "revision": "049e138db71296630b85a29bb4ae224e"
  },
  {
    "url": "assets/js/9.4b4464f9.js",
    "revision": "105329a253e8d41ebdb14af0880d5b07"
  },
  {
    "url": "assets/js/90.4cf19577.js",
    "revision": "ef07e07acb1a73438a148e8794c43154"
  },
  {
    "url": "assets/js/91.287ee3ea.js",
    "revision": "bc474809653478b30bd980910b8f75dc"
  },
  {
    "url": "assets/js/92.cb012876.js",
    "revision": "71aeda60993fbc4eddb0243f8635bbda"
  },
  {
    "url": "assets/js/93.0988c263.js",
    "revision": "cbb7485b584125987e27dad53c0628a7"
  },
  {
    "url": "assets/js/app.9077a4ea.js",
    "revision": "361c10b12a7186e7f28a09c8423ca4f7"
  },
  {
    "url": "default.png",
    "revision": "cbecf637ecf1059c2ff594cc419a04f9"
  },
  {
    "url": "guide/advanced/frontmatter.html",
    "revision": "f7a6b4617bee016c58c868d0169f0401"
  },
  {
    "url": "guide/advanced/global-computed.html",
    "revision": "746aa7d4756906ed0bf9a3e21d44c385"
  },
  {
    "url": "guide/advanced/markdown-slot.html",
    "revision": "cfde39e0728406e544f99a56b157372e"
  },
  {
    "url": "guide/advanced/permalinks.html",
    "revision": "d457f96675f8008b1bc38201c4be4959"
  },
  {
    "url": "guide/demo/advanced.html",
    "revision": "0d845677096a3eef0b5f2fef9894cdac"
  },
  {
    "url": "guide/demo/ant-design-components.html",
    "revision": "dc21c4b74a36d86452c31adc1017a69c"
  },
  {
    "url": "guide/demo/customize.html",
    "revision": "12d04ac64e48632966ebb95e4ad07c17"
  },
  {
    "url": "guide/demo/index.html",
    "revision": "f3805728bcebf440a6d6f45084f82eb3"
  },
  {
    "url": "guide/demo/markdown-demo.html",
    "revision": "9746443a279d21ba71ab0f936ee3360f"
  },
  {
    "url": "guide/guide/assets.html",
    "revision": "42b9f5f79f1c84df4bf9da196fb3f5c9"
  },
  {
    "url": "guide/guide/basic-config.html",
    "revision": "f2ed06a683631759e945593adb202720"
  },
  {
    "url": "guide/guide/deploy.html",
    "revision": "1fadb984e529730fce98f8f95fa8e9a0"
  },
  {
    "url": "guide/guide/directory-structure.html",
    "revision": "f3a56d54185a8134608f359aa124fea7"
  },
  {
    "url": "guide/guide/getting-started.html",
    "revision": "aa8bd060afaacd1efcfc3fb09d1f5fc1"
  },
  {
    "url": "guide/guide/i18n.html",
    "revision": "5e506e9a4574b689436d6dbf4033ee16"
  },
  {
    "url": "guide/guide/index.html",
    "revision": "2a6d5ef0a0dcf3072f262342008b5b45"
  },
  {
    "url": "guide/guide/markdown.html",
    "revision": "1a2ae762144407841d0ea1017429f52d"
  },
  {
    "url": "guide/guide/using-vue.html",
    "revision": "491cd4436d481c17f98eb258903f9e8a"
  },
  {
    "url": "guide/index.html",
    "revision": "2392749f6f8df1ff96882bbb2cd0e1c6"
  },
  {
    "url": "guide/line-numbers-desktop.png",
    "revision": "7c8ccab7c4953ac2fb9e4bc93ecd25ac"
  },
  {
    "url": "guide/line-numbers-mobile.gif",
    "revision": "580b860f45436c9a15a9f3bd036edd97"
  },
  {
    "url": "guide/vuepress-plugins/mathjax.html",
    "revision": "c590412c83143c095b27105e57efaa86"
  },
  {
    "url": "guide/vuepress-plugins/medium-zoom.html",
    "revision": "f728fe690d6ed440aebe5db190095cc1"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "b07233ffd6031d0288390ab99a182ac0"
  },
  {
    "url": "icons/bilibili.svg",
    "revision": "01cb9ff91dd54d4aae0eb217f0872e44"
  },
  {
    "url": "icons/email.svg",
    "revision": "87a18b571b3a2afb6b48714475879a06"
  },
  {
    "url": "icons/extension.svg",
    "revision": "e8e6a3221e82f60cef1bb1843d35ef23"
  },
  {
    "url": "icons/facebook.svg",
    "revision": "a937dc2aa703eb4ab7ef54c334a0521d"
  },
  {
    "url": "icons/github.svg",
    "revision": "dd4f874b1f4f236a39f450b4c92471f0"
  },
  {
    "url": "icons/icon_pxxyyz_144.png",
    "revision": "407cbc96975b02ecae0f3ae9e4e63228"
  },
  {
    "url": "icons/icon_pxxyyz_152.png",
    "revision": "d359dd5dbdb5a829626be3f26668f996"
  },
  {
    "url": "icons/icon_pxxyyz_192.png",
    "revision": "f8c2f9e7768d9fb6ef31fb372c610ed5"
  },
  {
    "url": "icons/icon_pxxyyz_256.png",
    "revision": "86de85b915484375bc277c3deeaab882"
  },
  {
    "url": "icons/icon_pxxyyz_512.png",
    "revision": "911fc79ca0f207b6849f40950fdab8c1"
  },
  {
    "url": "icons/icon_pxxyyz_72.png",
    "revision": "f2d298d4e106a86acd7899877e0530e0"
  },
  {
    "url": "icons/icon_pxxyyz.svg",
    "revision": "b37f309e08e635152b24a483819a3a60"
  },
  {
    "url": "icons/instagram-mono.svg",
    "revision": "3388b1a17a38b9833ed762278f327330"
  },
  {
    "url": "icons/instagram.svg",
    "revision": "622e2947df6ed5a12b06a6ea7cb70777"
  },
  {
    "url": "icons/linkedin-mono.svg",
    "revision": "d52422fb357b28b8a8be88ad02d19397"
  },
  {
    "url": "icons/linkedin.svg",
    "revision": "c1eb27404bbc0d6052620ac79194ae19"
  },
  {
    "url": "icons/twitter.svg",
    "revision": "7a4d9f0fe157437d3258bbc3b785066d"
  },
  {
    "url": "icons/youtube.svg",
    "revision": "f4d46a74f2230eb4b0a079b6c764bac6"
  },
  {
    "url": "icons/zhihu-circle.svg",
    "revision": "90391b7b2e741a1a8f4658f2ea478ec4"
  },
  {
    "url": "icons/zhihu-square.svg",
    "revision": "96e9a6cf99970a6c050254b2be0d21a2"
  },
  {
    "url": "images/icons/icon-128x128.png",
    "revision": "933462fe0f6ec6b9932009af568d5ac4"
  },
  {
    "url": "images/icons/icon-144x144.png",
    "revision": "f04fd31fd3323f135369ad12a38a9b81"
  },
  {
    "url": "images/icons/icon-152x152.png",
    "revision": "92fa0fec43265852d85a2a38589fee45"
  },
  {
    "url": "images/icons/icon-192x192.png",
    "revision": "d957bd64b7a5b95ee23206f3404897d8"
  },
  {
    "url": "images/icons/icon-384x384.png",
    "revision": "94100dea7a29626ee0086092dd19adfb"
  },
  {
    "url": "images/icons/icon-512x512.png",
    "revision": "14c2dfeceda73b5afc5722289bc1779c"
  },
  {
    "url": "images/icons/icon-72x72.png",
    "revision": "0b919072cfa5bf780009b45a5b98ccba"
  },
  {
    "url": "images/icons/icon-96x96.png",
    "revision": "4afdad4c908913dadb7613fa44b26233"
  },
  {
    "url": "index.html",
    "revision": "b7c29fb480abee7bb50d51b1a52ce252"
  },
  {
    "url": "logo.png",
    "revision": "aa20f311f210661aca9b831b1b26f40f"
  },
  {
    "url": "logo.svg",
    "revision": "b37f309e08e635152b24a483819a3a60"
  },
  {
    "url": "posts/Cadzow-iterative-method.html",
    "revision": "666fa82233aff8e172a209fa929baebb"
  },
  {
    "url": "posts/Cadzow-iterative-method/Alg-Cadzow.png",
    "revision": "9264fad39be754c2169c0f006a338acc"
  },
  {
    "url": "posts/Cadzow-iterative-method/Alg-Extended-Cadzow.png",
    "revision": "4d466be73715a1a51935787532700568"
  },
  {
    "url": "posts/Cadzow-iterative-method/Alg-Oblique-Cadzow.png",
    "revision": "304bd6af6fcb7b24e999d32f6798f3bc"
  },
  {
    "url": "posts/Cadzow-iterative-method/Alg-Projector.png",
    "revision": "0bd1940844a3ca2f8386e4f2a3f15194"
  },
  {
    "url": "posts/Cadzow-iterative-method/Alg-Weighted-Cadzow.png",
    "revision": "56af335d661dfe075840905ac5625d1a"
  },
  {
    "url": "posts/circulant-ssa.html",
    "revision": "a08802c701f227ac83e1eb32be251239"
  },
  {
    "url": "posts/common-spatial-patterns.html",
    "revision": "44695b8e4db184747e6e641e52384aa8"
  },
  {
    "url": "posts/common-spatial-patterns/BCI.png",
    "revision": "a075a9f8055d8ec2be4ec34ba7ad15cc"
  },
  {
    "url": "posts/common-spatial-patterns/classification.png",
    "revision": "29a865aa9bddd7b8e42e31920d35a899"
  },
  {
    "url": "posts/common-spatial-patterns/criterion.png",
    "revision": "f2067330a4aa28bba114a0bf21c578eb"
  },
  {
    "url": "posts/common-spatial-patterns/CSP-Algorithm.png",
    "revision": "02519e63e602abb2c125f853834995a6"
  },
  {
    "url": "posts/common-spatial-patterns/CSP-result.png",
    "revision": "f2ede96bedaa5967ef0bc30aaa078da8"
  },
  {
    "url": "posts/common-spatial-patterns/EEG.png",
    "revision": "cdcff59ab3c302b0f2203020838ac465"
  },
  {
    "url": "posts/common-spatial-patterns/feature-extraction.png",
    "revision": "498ba1235cf16bae52f132dce9439192"
  },
  {
    "url": "posts/common-spatial-patterns/projection.png",
    "revision": "e15a29e2e45feb4b95346eb2a4a01e0a"
  },
  {
    "url": "posts/common-spatial-patterns/Riemannian.png",
    "revision": "558526e69150f3a1c36559c0c6d9da89"
  },
  {
    "url": "posts/Dimensionality-Reduction-SPD-Manifolds.html",
    "revision": "9750eda8305f33f7a71ec6faf54567b1"
  },
  {
    "url": "posts/Dimensionality-Reduction-SPD-Manifolds/alg-1.png",
    "revision": "742aa8661bac1a4fe1bc325c3785ba8e"
  },
  {
    "url": "posts/Dimensionality-Reduction-SPD-Manifolds/alg-2.png",
    "revision": "ccf68689695f168440633d7618b9217b"
  },
  {
    "url": "posts/Dimensionality-Reduction-SPD-Manifolds/fig-Jacobian.png",
    "revision": "b6098ceb0dfabb11bbeaff3e89418aca"
  },
  {
    "url": "posts/Dimensionality-Reduction-SPD-Manifolds/fig-Parallel-transport.png",
    "revision": "baa83a302969d0799b151f01d9144687"
  },
  {
    "url": "posts/Distance-and-angles.html",
    "revision": "569441067faa5c77548d9c06d4f8f2e3"
  },
  {
    "url": "posts/Fast-Cadzow-Algorithm-Gradient-Variant.html",
    "revision": "f279d1df06e030da0709794c8b5d1853"
  },
  {
    "url": "posts/Fast-Cadzow-Algorithm-Gradient-Variant/Alg-Fast-Cadzow.png",
    "revision": "a83a3256792ed909b18d19cb6f1c9364"
  },
  {
    "url": "posts/Fast-Cadzow-Algorithm-Gradient-Variant/Alg-Fast-Gradient.png",
    "revision": "daf838143176478cb113e5e4a4a4ba5f"
  },
  {
    "url": "posts/Fast-Cadzow-Algorithm-Gradient-Variant/Alg-Gradient.png",
    "revision": "dbc92e97c67f1d305c330bc3412cfa3a"
  },
  {
    "url": "posts/Fast-Cadzow-Algorithm-Gradient-Variant/cadzow.png",
    "revision": "8f5b9f19f2c53255c682a6770b759858"
  },
  {
    "url": "posts/Fast-Cadzow-Algorithm-Gradient-Variant/fastcad.png",
    "revision": "6e032cd74815f076e2d650b6d4e044a8"
  },
  {
    "url": "posts/Filter-SSA.html",
    "revision": "a388e033d75d1bd2da069230a45a435d"
  },
  {
    "url": "posts/Filter-SSA/FIR-TQSVD.png",
    "revision": "9c874ea0559e889ef9cacb72fc5b69d4"
  },
  {
    "url": "posts/Filter-SSA/FIR-TSVD.png",
    "revision": "5af7308b63dc005eac938bc856691058"
  },
  {
    "url": "posts/Fock-Bargmann-Hartogs.html",
    "revision": "511ecf7dafc9f67977882f15c5fed3bc"
  },
  {
    "url": "posts/Frechet-mean-Grassmann-discriminant-analysis.html",
    "revision": "dd63d09f820893b9feb0fe58fb5bf584"
  },
  {
    "url": "posts/Frechet-mean-Grassmann-discriminant-analysis/alg-FMGDA.png",
    "revision": "87439f6eb0c9737b2a11bac5d709d91d"
  },
  {
    "url": "posts/functional-ssa.html",
    "revision": "7bca25b947b4e179cbd451153e2a3c1d"
  },
  {
    "url": "posts/heteroskedastic-PCA.html",
    "revision": "c0b06becfb056b5b9962d6d33483caaf"
  },
  {
    "url": "posts/heteroskedastic-PCA/HeteroPCA.png",
    "revision": "1574c6366bfe0c0ef11cb952e22d5036"
  },
  {
    "url": "posts/index.html",
    "revision": "6053d35bb86d039026db904f87c82928"
  },
  {
    "url": "posts/Karhunen-Loeve-transform.html",
    "revision": "da1152d4e6c30a877311cf9cad5a425b"
  },
  {
    "url": "posts/Kernel-PCA.html",
    "revision": "3a7afdb260d7e0950458d9f51b6c1fe7"
  },
  {
    "url": "posts/Kernel-PCA/kernel-PCA.png",
    "revision": "22e00adfe67787040c4c71da6e8d17f3"
  },
  {
    "url": "posts/majorization-minimization.html",
    "revision": "b97fa65c06d23add778a449645d36ea6"
  },
  {
    "url": "posts/majorization-minimization/construction.png",
    "revision": "acd87db9cfec3bdd41cbcee6a5b552a7"
  },
  {
    "url": "posts/majorization-minimization/majorizing.png",
    "revision": "0b662b136a131ac333107c3b0caf8337"
  },
  {
    "url": "posts/majorization-minimization/vis.gif",
    "revision": "292d61803cb079539fb5a9267dcf48b7"
  },
  {
    "url": "posts/manifold-graph.html",
    "revision": "6ead261473ce9e3463af028bea7cb14a"
  },
  {
    "url": "posts/manifold-graph/1.png",
    "revision": "7a4f0194750f271e2d18887117a83b9e"
  },
  {
    "url": "posts/manifold-graph/10.png",
    "revision": "a440ed43f0e8c4892d083ced2babe7a4"
  },
  {
    "url": "posts/manifold-graph/11.jpg",
    "revision": "3df73598f0a68db79f0ce48116659142"
  },
  {
    "url": "posts/manifold-graph/12.png",
    "revision": "62f74ea8a74cefed20144bbe9a177253"
  },
  {
    "url": "posts/manifold-graph/13.png",
    "revision": "417607bd735fb18687b9f7a8ec4c7c5b"
  },
  {
    "url": "posts/manifold-graph/2.jpg",
    "revision": "99a17dc4c15d8d6abf26ff14f5cf7ea8"
  },
  {
    "url": "posts/manifold-graph/3.png",
    "revision": "154a579addf2d5e7559609154b9d92d4"
  },
  {
    "url": "posts/manifold-graph/4.png",
    "revision": "03458b91815be1efed1974f038db9b82"
  },
  {
    "url": "posts/manifold-graph/5.png",
    "revision": "c477fceb0bfe7f9d53a4b560a3a293a4"
  },
  {
    "url": "posts/manifold-graph/6.png",
    "revision": "e92730fb4f2216ff0ed7508028104351"
  },
  {
    "url": "posts/manifold-graph/7.png",
    "revision": "b2f9ddd186ba83b000c84154af1c8d64"
  },
  {
    "url": "posts/manifold-graph/8.png",
    "revision": "745804b1c271030318e3975c09edcf28"
  },
  {
    "url": "posts/manifold-graph/9.png",
    "revision": "4a0651df191cadcf8ce4f0f824c0179f"
  },
  {
    "url": "posts/manifold-learning.html",
    "revision": "2afd550cf437c45b786f2c7af1f85bcc"
  },
  {
    "url": "posts/MDRM-TSLDA.html",
    "revision": "491e79085c733d5f0b6355d25af0ce5e"
  },
  {
    "url": "posts/MDRM-TSLDA/Alg-MDRM.png",
    "revision": "611d97c77b019a5f3c71085966eb8220"
  },
  {
    "url": "posts/MDRM-TSLDA/Alg-TSLDA.png",
    "revision": "cfe0e42ae266526dd729829f5073c294"
  },
  {
    "url": "posts/MELT.html",
    "revision": "9a8a831424beb7268a5814980f9eed00"
  },
  {
    "url": "posts/MELT/alg.png",
    "revision": "be70b00583704fea76909686e2d8d0c4"
  },
  {
    "url": "posts/minimization-l1-l2.html",
    "revision": "f8a6609c19638b462db701a42e4ee084"
  },
  {
    "url": "posts/minimization-l1-l2/alg-1.png",
    "revision": "a353a73180629486f86dd841d85c5df7"
  },
  {
    "url": "posts/minimization-l1-l2/alg-2.png",
    "revision": "9d52491c15c7ca6508483d855cbe5563"
  },
  {
    "url": "posts/nonlinear-projection-trick.html",
    "revision": "60b569ceda026344e2bf0ff278b732d8"
  },
  {
    "url": "posts/nonlinear-projection-trick/Kernel-method.png",
    "revision": "2d7e666c2cb5611b7e5e7bda444d4674"
  },
  {
    "url": "posts/nonlinear-projection-trick/Projections-feature.png",
    "revision": "1496169792d0800446d2dad320e52df5"
  },
  {
    "url": "posts/Particularities-commonalities-SSA.html",
    "revision": "fa0ba43f3df7a11edf9461af3f50be87"
  },
  {
    "url": "posts/PCA-L1.html",
    "revision": "05a84f9f92a74dd3a5061ae7b9a800d1"
  },
  {
    "url": "posts/PCA-Lp.html",
    "revision": "14cceb72de01d6cc2e4fe582a207cb8e"
  },
  {
    "url": "posts/PCA的L1和L2/alg-1.png",
    "revision": "304e0e1724f8a2809c0ff98a65573413"
  },
  {
    "url": "posts/PCA的L1和L2/alg-2.png",
    "revision": "548a612ee1f94334b8a377ff09e0b798"
  },
  {
    "url": "posts/PCA的L1和L2/alg-3.png",
    "revision": "9b7a4c0c3461797ad412c902ccc3af5a"
  },
  {
    "url": "posts/PCA的L1和L2/alg-4.png",
    "revision": "20f56270571da00149e396f9bc619863"
  },
  {
    "url": "posts/PCA的L1和L2/alg-5.png",
    "revision": "eb3f2f9494bb39b8f23fd474317434c1"
  },
  {
    "url": "posts/PCA的L1和L2/L1-PCA.png",
    "revision": "abc025e73a33ef7a8e8ad74a0922b20c"
  },
  {
    "url": "posts/PCA的Lp/alg-1.png",
    "revision": "ec443c77a3330eda69aeb293cc001717"
  },
  {
    "url": "posts/PCA的Lp/alg-2.png",
    "revision": "c79b21c56bbb323856c5e14d666d10b2"
  },
  {
    "url": "posts/PCA的Lp/alg-3.png",
    "revision": "193489bcfbba4f5d52a2bde1b038f1d9"
  },
  {
    "url": "posts/PCA的Lp/alg-4.png",
    "revision": "279798e9d0bda705fb66c5896b9feef6"
  },
  {
    "url": "posts/PCA的Lp/fig-1.png",
    "revision": "a0e288395a930f9babdd7b1c05059a7a"
  },
  {
    "url": "posts/Projection-Metric-Learning-Grassmann-Manifold.html",
    "revision": "48de0e3a5000a40e6ff6aec1f0916fea"
  },
  {
    "url": "posts/Projection-Metric-Learning-Grassmann-Manifold/alg-1.png",
    "revision": "74235bba7e32a6ac224e78a4056fce39"
  },
  {
    "url": "posts/Projection-Metric-Learning-Grassmann-Manifold/alg-2.png",
    "revision": "855ebff4e4e6823f78d3883304d33373"
  },
  {
    "url": "posts/Projection-Metric-Learning-Grassmann-Manifold/alg-PML.png",
    "revision": "2bef0bc248e743f62837935a8cefb2bd"
  },
  {
    "url": "posts/random-QR-denoising.html",
    "revision": "9ea779ac895ecbabeb58d1a4884afcd0"
  },
  {
    "url": "posts/random-QR-denoising/Alg-Fhv.png",
    "revision": "184bc56d177982fb65c46797818aa664"
  },
  {
    "url": "posts/random-QR-denoising/Alg-rQRd.png",
    "revision": "d1af8c1507ba044cb25cd966950e4c14"
  },
  {
    "url": "posts/random-QR-denoising/Alg-urQRd.png",
    "revision": "23799a1c3bd1e7e630a52c23ae270332"
  },
  {
    "url": "posts/Rank-One-Matrix-Pursuit-Matrix-Completion.html",
    "revision": "30de7df28a4284e280ede3f1ffe309ef"
  },
  {
    "url": "posts/Rank-One-Matrix-Pursuit-Matrix-Completion/Alg-ER1MP.png",
    "revision": "2daea7016ce5e2a310f5d6a4d6e67d3f"
  },
  {
    "url": "posts/Rank-One-Matrix-Pursuit-Matrix-Completion/Alg-FR1MP.png",
    "revision": "8ce024de666bf0dbbbb0bb60fb988c6d"
  },
  {
    "url": "posts/Rank-One-Matrix-Pursuit-Matrix-Completion/Alg-matrix-sensing.png",
    "revision": "5f92df6b77251b25730124f0a2dea544"
  },
  {
    "url": "posts/Rank-One-Matrix-Pursuit-Matrix-Completion/Alg-R1MP.png",
    "revision": "7c41334dedf13ebe8559985d6a19a66c"
  },
  {
    "url": "posts/Riemannian-joint-dimensionality-reduction-dictionary-learning.html",
    "revision": "228a86b16330a6d41bfd5f2b816cafd5"
  },
  {
    "url": "posts/Sparse-PCA.html",
    "revision": "4e8c6789649915db48b715dc19389299"
  },
  {
    "url": "posts/Sparse-PCA/elastic-net.png",
    "revision": "20314b9d453f2c3aabd97f49e6c89bcc"
  },
  {
    "url": "posts/Sparse-PCA/SPCA.png",
    "revision": "654bff11ebbccb95cf1d402c9c197d27"
  },
  {
    "url": "posts/SSA-L1.html",
    "revision": "cfca564fdfb686b555270243d2ea1904"
  },
  {
    "url": "posts/Structured-low-rank-approximation.html",
    "revision": "8958850a4b314d688074fb3f0b636a71"
  },
  {
    "url": "posts/Structured-low-rank-approximation/Lift-and-project.png",
    "revision": "abe9deeaba47c3d326aa3a9a90848999"
  },
  {
    "url": "posts/Structured-Matrix-Completion.html",
    "revision": "80f2283956d3356f6446085d4b3cd827"
  },
  {
    "url": "posts/Structured-Matrix-Completion/A_block_edit.png",
    "revision": "37701b4fb3cfa54a27a8de233019bda9"
  },
  {
    "url": "posts/Structured-Matrix-Completion/Alg-1.png",
    "revision": "b25b4edd553b8ab424afb0f6c962da80"
  },
  {
    "url": "posts/Structured-Matrix-Completion/Alg-2.png",
    "revision": "685a2d61592ba367b4454c15ef74a131"
  },
  {
    "url": "posts/Structured-Matrix-Completion/Z_block_edit.png",
    "revision": "c25b57969c38e3e3003100d0b23d0ccc"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning.html",
    "revision": "35e2c4b233c816cb94c0e2672e7540c3"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning/Alg.png",
    "revision": "98381eed33afce9cf283b7592776f9fc"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning/fig-1.png",
    "revision": "da2c6e4097d8c28a3a8a82549eee7b59"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning/fig-2.png",
    "revision": "6a1b89dd729f0eefec4fe76dabd4dac7"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning/fig-3.png",
    "revision": "c586807ad0483de2ec9e2268b7aedea6"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning/fig-4.png",
    "revision": "172fd15d6c904c8650adc9c65248943e"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning/fig-5.png",
    "revision": "dcf89478bf848fb2a6ed2a581f0434f6"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning/fig-6.png",
    "revision": "b4694bbb98988c23b538358cdb26636c"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning/fig-7.png",
    "revision": "bc94ad06f92a9e6ec7dc99dc3b894d58"
  },
  {
    "url": "posts/Task-Driven-Dictionary-Learning/fig-8.png",
    "revision": "42d8b03083029df32530791169150e50"
  },
  {
    "url": "posts/Toeplitz-matrix-completion.html",
    "revision": "c291b3b31621f8d29951d1f547e2dcfb"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-2M-ALM.png",
    "revision": "0f2bc75af24d9a0316344fc45f225ff7"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-2Mid-ALM.png",
    "revision": "ecb816c5a64c725a1f91b78df00acaea"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-ALM.png",
    "revision": "fc4a92d7378a245865124c212944dd87"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-APG.png",
    "revision": "d1ebe3b7fc99e05f63951da928955bd8"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-EOR1MP.png",
    "revision": "987923cbec71d9de579e1a7b76d250d0"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-MALM-Copy.png",
    "revision": "0c0f06b317afd4cab9d03f23dd12652f"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-MALM.png",
    "revision": "59b14970fe139e19a0dfd32f65b6cf0f"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-MEOR1MP.png",
    "revision": "bb0559a4d9dac392ececd9e3208320bb"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-Mid-ALM.png",
    "revision": "b33aed320afe9c43b9a38ea439625b02"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-MOLRMA.png",
    "revision": "8cb036cf92d3e27a9c598bfdb89f7875"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-MOR1MP.png",
    "revision": "1d9688b1992a28630f5dafb5da9db21c"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-MV.png",
    "revision": "1bc92dfb5ab68ff3f97d16213a0eb153"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-OLRMA.png",
    "revision": "dd01adc54d9f982c486c0bcba7f62d76"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-OR1MP.png",
    "revision": "0013cbf545cccc66e0a0ec2ed1260d2e"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-SALM.png",
    "revision": "6a02e42ed6043709a5788fbb7fbecada"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-SSALM.png",
    "revision": "84397f58bd52b4a3e07ef67521f69cd9"
  },
  {
    "url": "posts/Toeplitz-matrix-completion/Alg-SVT.png",
    "revision": "f9e4be0623bf2b332cf9374c835579f8"
  },
  {
    "url": "posts/VMD.html",
    "revision": "f1446d1ae4716b191e44fa6c0e031e44"
  },
  {
    "url": "posts/VNCMD.html",
    "revision": "7f836636f005af0b835c66dd2296ef89"
  },
  {
    "url": "posts/变分模态分解/MVMD-ADMM.png",
    "revision": "495dee73547bad3eef43090b78091277"
  },
  {
    "url": "posts/变分模态分解/VMD-ADMM.png",
    "revision": "aea330fd6e39492b585ea5d6129107f1"
  },
  {
    "url": "posts/变分非线性线性调频模态分解/ACMP.png",
    "revision": "67955d6aa74acc9615b50ead58db04a5"
  },
  {
    "url": "posts/变分非线性线性调频模态分解/ACMP2.png",
    "revision": "c82bcc7854727a991fa2708ebb57f2dd"
  },
  {
    "url": "posts/变分非线性线性调频模态分解/demodulation.png",
    "revision": "2fc5ca656c399406166cb8f7deff75ba"
  },
  {
    "url": "posts/变分非线性线性调频模态分解/MNCMD.png",
    "revision": "4b67d1b8845bf39e12b5bfb7e88ccd70"
  },
  {
    "url": "posts/变分非线性线性调频模态分解/VNCMD.png",
    "revision": "1dff6af4a5e6c47896ee483f143b6b26"
  },
  {
    "url": "profile/about/index.html",
    "revision": "c5c4582d802c2ebdf880897d34576c96"
  },
  {
    "url": "profile/Black_Hole_Milkyway.jpg",
    "revision": "88aa7ff4fee078cbd23fe3bbd4855397"
  },
  {
    "url": "profile/DebyeVSEinstein.jpg",
    "revision": "a5eed4215945bb074dbbb85e757363d3"
  },
  {
    "url": "profile/Dualite.jpg",
    "revision": "0a81e37c2a4cf5abd7df8522dd33d6d5"
  },
  {
    "url": "profile/Einstein_tongue.jpg",
    "revision": "16604dd59f8bfd8877d586f671b6f7e0"
  },
  {
    "url": "profile/Photoelectric_effect.svg",
    "revision": "47bba599a4439742d48bb70236b6e38a"
  },
  {
    "url": "profile/profile.png",
    "revision": "9a8ba53eec76b8fc1f5ed175bb5cb837"
  },
  {
    "url": "profile/projects/index.html",
    "revision": "fb02775a56bac576e542eda18e6b2382"
  },
  {
    "url": "profile/QuantumPhaseTransition.svg",
    "revision": "2bdd64f66242ff576a10c8211503a0f5"
  },
  {
    "url": "profile/resume/index.html",
    "revision": "f7de9107db81b1b56d3c261b285de529"
  },
  {
    "url": "profile/Solvay_conference_1927.jpg",
    "revision": "8c4040964e6d92baf797411dd1cea714"
  },
  {
    "url": "profile/World_line.svg",
    "revision": "30e6bc7bd3a31b1a250ec7145f33dbae"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})

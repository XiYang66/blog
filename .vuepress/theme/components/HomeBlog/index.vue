<template>
  <div class="home-blog">
    <div class="hero">
      <div>
        <ModuleTransition>
          <img class="hero-img" v-if="recoShowModule && $frontmatter.heroImage" :style="heroImageStyle || {}" :src="$withBase($frontmatter.heroImage)" alt="hero" />
        </ModuleTransition>

        <ModuleTransition delay="0.04">
          <h1 v-if="recoShowModule && $frontmatter.heroText !== null">
            {{ $frontmatter.heroText || $title || 'vuePress-theme-reco' }}
          </h1>
        </ModuleTransition>

        <ModuleTransition delay="0.08">
          <p 
          :style="'animation:borders 0.7s ,widths 7s steps('+textLength+') infinite forwards'"
          v-if="recoShowModule && $frontmatter.tagline.length>0&& $frontmatter.tagline!== null" class="description">
            <!-- {{ $frontmatter.tagline || $description || 'Welcome to your vuePress-theme-reco site' }} -->
            {{tagline}}
          </p>
        </ModuleTransition>
      </div>
    </div>
    <!-- 背景图 -->
    <div class="background" :style="{ ...bgImageStyle }"></div>
    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract :data="$recoPosts" @paginationChange="paginationChange" />
        </div>
        <div class="info-wrapper">
          <PersonalInfo />
          <h4><reco-icon icon="reco-category" /> {{ $recoLocales.category }}</h4>
          <ul class="category-wrapper">
            <li class="category-item" v-for="(item, index) in this.$categories.list" :key="index">
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span class="post-num" :style="{ backgroundColor: getOneColor() }">{{ item.pages.length }}</span>
              </router-link>
            </li>
          </ul>
          <hr />
          <h4 v-if="$tags.list.length !== 0"><reco-icon icon="reco-tag" /> {{ $recoLocales.tag }}</h4>
          <TagList @getCurrentTag="getPagesByTags" />
          <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0"><reco-icon icon="reco-friend" /> {{ $recoLocales.friendLink }}</h4>
          <FriendLink />
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom />
    </ModuleTransition>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue-demi'
import TagList from '@theme/components/TagList'
import FriendLink from '@theme/components/FriendLink'
import NoteAbstract from '@theme/components/NoteAbstract'
import { ModuleTransition, RecoIcon } from '@vuepress-reco/core/lib/components'
import PersonalInfo from '@theme/components/PersonalInfo'
import { getOneColor } from '@theme/helpers/other'
import { useInstance } from '@theme/helpers/composable'
export default defineComponent({
  components: { NoteAbstract, TagList, FriendLink, ModuleTransition, PersonalInfo, RecoIcon },
  data(){
    return{
      textLength:0,
      tagline:'',
    }
  },
  setup(props, ctx) {
    const instance = useInstance()

    const state = reactive({
      recoShow: false,
      heroHeight: 0,
    })

    const recoShowModule = computed(() => instance && instance.$parent.recoShowModule)

    const heroImageStyle = computed(() => instance.$frontmatter.heroImageStyle || {})

    const bgImageStyle = computed(() => {
      // const url = instance.$frontmatter.bgImage ? instance.$withBase(instance.$frontmatter.bgImage) : require('../../images/bg.svg')
      // instance.$themeConfig.covers
      // console.log("🚀 ~ file: index.vue ~ line 85 ~ bgImageStyle ~ instance.$themeConfig.covers", instance.$themeConfig.covers)
      const random = Math.floor(Math.random() * instance.$themeConfig.covers.length)
      const url = instance.$themeConfig.covers ? instance.$withBase(instance.$themeConfig.covers[random]) : require('../../images/bg.svg')
      const initBgImageStyle = {
        textAlign: 'center',
        overflow: 'hidden',
        background: `url(${url}) center/cover no-repeat`,
      }

      const { bgImageStyle } = instance.$frontmatter

      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
    })

    onMounted(() => {
      state.heroHeight = document.querySelector('.hero').clientHeight
      state.recoShow = true
    })

   
    return { recoShowModule, heroImageStyle, bgImageStyle, ...toRefs(state), getOneColor }
  },
  computed: {
    // 背景图
    backgroundImg() {
      const url = instance.$frontmatter.bgImage ? instance.$withBase(instance.$frontmatter.bgImage) : require('../../images/bg.svg')
      const initBgImageStyle = {
        textAlign: 'center',
        overflow: 'hidden',
        background: `url(${url}) center/cover no-repeat`,
      }

      const { bgImageStyle } = instance.$frontmatter

      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
    },
    // 描述字体
    // tagline(){
    //   // this.$frontmatter.tagline.forEach(item)

    //   return this.$frontmatter.tagline[0]
    // }
  },
  mounted() { 
      //监听页面滚动事件
      window.addEventListener('scroll', this.scrollEvent)
      // $frontmatter.tagline
     
      this.textLength=15;

      var curIndex1 = 0;  
      var timeInterval1 = 7000;
      
      this.tagline=this.$frontmatter.tagline[curIndex1]
      this.textLength=this.$frontmatter.tagline[curIndex1].length

      setInterval(()=>{
        if (curIndex1 === this.$frontmatter.tagline.length - 1) {//相片索引值等于数组长度-1时，（4=5-1）相片就会从第一张开始显示
          curIndex1 = 0;
          this.tagline=this.$frontmatter.tagline[curIndex1]
          this.textLength=this.$frontmatter.tagline[curIndex1].length
        } else {
          curIndex1 += 1;
          this.tagline=this.$frontmatter.tagline[curIndex1]
          this.textLength=this.$frontmatter.tagline[curIndex1].length
        }
      }, timeInterval1);
  },
  methods: {
    paginationChange(page) {
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight)
      }, 100)
    },
    getPagesByTags(tagInfo) {
      this.$router.push({ path: tagInfo.path })
    },
    // 滚动页面变模糊
    scrollEvent() {
      var zoom = document.querySelector('.background')
      var sTop=document.documentElement.scrollTop
      var iTop=window.innerHeight
      var blurNum=Math.floor(sTop/iTop * 10 / 2)
      if(blurNum==5){
        zoom.style.filter='blur(5px)'
      }else{
        zoom.style.filter=`blur(${blurNum}px)`
      }
    }
  },
})
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;

  .hero {
    // margin $navbarHeight auto 0
    position: relative;
    box-sizing: border-box;
    padding: 0 20px;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .hero-img {
      max-width: 300px;
      margin: 0 auto 1.5rem;
    }

    h1 {
      display: block;
      margin: 0 auto 1.8rem;
      font-size: 2.5rem;
      text-align: center;
    }
    .description {
      margin: 1.8rem auto;
      // font-size: 1.6rem;
      font-size: 200%; /* 字体大小 */
      font-family: Consolas, Monaco, monospace;
      line-height: 1.3;
      transform: translateY(0px) !important;
      opacity: 1 !important;
      white-space: nowrap;
      overflow: hidden;
      border-right: 2px solid #008C8C;
      user-select: none;
      // animation: borders 0.7s ,widths 7s steps(15) infinite forwards;
      /* 边框闪烁动画 模拟指针闪烁 */	
      @keyframes broders {
        0% {border-right-color: #000;}
        70% {border-right-color: #fff;}
        100% {border-right-color: #000;}
      }
      /* 容器宽的改变动画 */
      @keyframes widths {
          0% {width: 0%;}
          70% {width: 100%;}
          100% {width: 0%;} /* 也可以是固定宽 */
      }
  }
 


  }
  .background {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    transition: all 1s auto;
    // filter: blur(15px);
  }

  .home-blog-wrapper {
    display: flex;
    align-items: flex-start;
    margin: 20px auto 0;
    padding: 0 20px;
    max-width: $homePageWidth;

    .blog-list {
      flex: auto;
      width: 0;

      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }

    .info-wrapper {
      position: -webkit-sticky;
      position: sticky;
      top: 70px;
      overflow: hidden;
      transition: all 0.3s;
      margin-left: 15px;
      flex: 0 0 300px;
      height: auto;
      box-shadow: var(--box-shadow);
      border-radius: $borderRadius;
      box-sizing: border-box;
      padding: 0 15px;
      background: var(--background-color);

      &:hover {
        box-shadow: var(--box-shadow-hover);
      }

      h4 {
        color: var(--text-color);
      }

      .category-wrapper {
        list-style: none;
        padding-left: 0;

        .category-item {
          margin-bottom: 0.4rem;
          padding: 0.4rem 0.8rem;
          transition: all 0.5s;
          border-radius: $borderRadius;
          box-shadow: var(--box-shadow);
          background-color: var(--background-color);

          &:hover {
            transform: scale(1.04);

            a {
              color: $accentColor;
            }
          }

          a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-color);

            .post-num {
              width: 1.6rem;
              height: 1.6rem;
              text-align: center;
              line-height: 1.6rem;
              border-radius: $borderRadius;
              background: #eee;
              font-size: 13px;
              color: #fff;
            }
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      height: 450px;

      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem;
        font-size: 2rem;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display: block !important;

      .blog-list {
        width: auto;
      }

      .info-wrapper {
        // display none!important
        margin-left: 0;

        .personal-info-wrapper {
          display: none;
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      height: 450px;

      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display: block !important;

      .blog-list {
        width: auto;
      }

      .info-wrapper {
        // display none!important
        margin-left: 0;

        .personal-info-wrapper {
          display: none;
        }
      }
    }
  }
}
</style>

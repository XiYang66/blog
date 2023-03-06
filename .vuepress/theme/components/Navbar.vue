<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <router-link :to="$localePath" class="home-link">
      <img class="logo" v-if="$themeConfig.logo" :src="$withBase($themeConfig.logo)" :alt="$siteTitle" />
      <span ref="siteName" class="site-name" v-if="$siteTitle">{{ $siteTitle }}</span>
    </router-link>

    <div
      class="links"
      :style="
        linksWrapMaxWidth
          ? {
              'max-width': linksWrapMaxWidth + 'px',
            }
          : {}
      "
    >
      <Mode />
      <AlgoliaSearchBox v-if="isAlgoliaSearch" :options="algolia" />
      <SearchBox v-else-if="$themeConfig.search !== false && $frontmatter.search !== false" />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue-demi'
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton'
import NavLinks from '@theme/components/NavLinks'
import Mode from '@theme/components/Mode'
import { useInstance } from '@theme/helpers/composable'

export default defineComponent({
  components: { SidebarButton, NavLinks, SearchBox, AlgoliaSearchBox, Mode },

  setup(props, ctx) {
    const instance = useInstance()
    const linksWrapMaxWidth = ref(null)

    const algolia = computed(() => {
      return instance.$themeLocaleConfig.algolia || instance.$themeConfig.algolia || {}
    })

    const isAlgoliaSearch = computed(() => {
      algolia.value && algolia.value.apiKey && algolia.value.indexName
    })

    function css(el, property) {
      // NOTE: Known bug, will return 'auto' if style value is 'auto'
      const win = el.ownerDocument.defaultView
      // null means not to return pseudo styles
      return win.getComputedStyle(el, null)[property]
    }

    onMounted(() => {
      const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
      const NAVBAR_VERTICAL_PADDING = parseInt(css(instance.$el, 'paddingLeft')) + parseInt(css(instance.$el, 'paddingRight'))

      const handleLinksWrapWidth = () => {
        if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
          linksWrapMaxWidth.value = null
        } else {
          linksWrapMaxWidth.value = instance.$el.offsetWidth - NAVBAR_VERTICAL_PADDING - ((instance.$refs.siteName && instance.$refs.siteName.offsetWidth) || 0)
        }
      }

      handleLinksWrapWidth()
      window.addEventListener('resize', handleLinksWrapWidth, false)
    })
    return { linksWrapMaxWidth, algolia, isAlgoliaSearch, css }
  },
  data () {
    return {
      scrollAction :{ x: 'undefined', y: 'undefined' },
      scrollDirection:null
    }
  },
  mounted () {
    // 监听滚动条位置
    document.addEventListener('scroll', this.scrollEvent)
  },
  methods: {
      //监听页面滚动事件
    scrollEvent() {
      var navbar = document.querySelector('.navbar')
      var sTop = document.documentElement.scrollTop
      document.onscroll =  (e) =>{
        this.scrollFunc()
        if (this.scrollDirection == 'down') {
          //页面向下滚动要做的事情
          navbar.style.opacity = '0'
        } else if (this.scrollDirection == 'up') {
          //页面向上滚动要做的事情
          navbar.style.opacity = '1'
          // navbar.style.background = '#fff';
        }
      }
    },
    scrollFunc() {
      if (typeof this.scrollAction.x == 'undefined') {
        this.scrollAction.x = window.pageXOffset
        this.scrollAction.y = window.pageYOffset
      }
      var diffX = this.scrollAction.x - window.pageXOffset
      var diffY = this.scrollAction.y - window.pageYOffset
      if (diffX < 0) {
        // Scroll right
        this.scrollDirection = 'right'
      } else if (diffX > 0) {
        // Scroll left
        this.scrollDirection = 'left'
      } else if (diffY < 0) {
        // Scroll down
        this.scrollDirection = 'down'
      } else if (diffY > 0) {
        // Scroll up
        this.scrollDirection = 'up'
      } else {
        // First scroll event
      }
      this.scrollAction.x = window.pageXOffset
      this.scrollAction.y = window.pageYOffset
    }
  }
})
</script>

<style lang="stylus">
$navbar-vertical-padding = 0.7rem;
$navbar-horizontal-padding = 1.5rem;

.navbar {
  position: relative;
  padding: $navbar-vertical-padding $navbar-horizontal-padding;
  line-height: $navbarHeight - 1.4rem;
  box-shadow: var(--box-shadow);
  background: var(--background-color);
  background: #fff;
  // background: linear-gradient(to bottom,#fff , transparent);
  transition: all 0.5s linear;

  a, span, img {
    display: inline-block;
  }

  .logo {
    height: $navbarHeight - 1.4rem;
    min-width: $navbarHeight - 1.4rem;
    margin-right: 0.8rem;
    vertical-align: top;
    border-radius: 50%;
  }

  .site-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-color);
    position: relative;
  }

  .links {
    padding-left: 1.5rem;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.9rem;
    position: absolute;
    right: $navbar-horizontal-padding;
    top: $navbar-vertical-padding;
    display: flex;
    background-color: var(--background-color);
    background: transparent;

    .search-box {
      flex: 0 0 auto;
      vertical-align: top;
    }
  }
}

@media (max-width: $MQMobile) {
  .navbar {
    padding-left: 4rem;

    .can-hide {
      display: none;
    }

    .links {
      padding-left: 0.2rem;
    }
  }
}
</style>

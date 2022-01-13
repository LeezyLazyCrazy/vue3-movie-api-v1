<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div v-for="nav in navigations"
      :key="nav.name"
       class="nav-item">
        <RouterLink
          v-bind:to="nav.href" 
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div 
      @click="toAbout"
      class="user">
      <img 
        :src="image" 
        :alt="name">
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
import Logo from '~/components/Logo'
export default {
  components: {
    Logo
  },
  data() {
    return{
      navigations:[
        {
          name:'Search',
          href:'/'
        },
        {
          name:'Movie',
          href:'/movie/tt4520988',
          path: /^\/movie/  // '/movie' 일치하는경우를 찾겠다는 의미
        },
        {
          name:'About',
          href:'/about'
        },
      ]
    }
  },
  computed:{
    ...mapState('about',[
      'image',
      'name'
    ]),
  },
  methods:{
    isMatch(path){
      if(!path) return false
      console.log(this.$route)
      return path.test(this.$route.fullPath)
    },
    toAbout(){
      this.$router.push('/about') //routerlink 로 연결할수있고 이방법을 통해 연결할수있음.
    }
  }

}
</script>

<style lang="scss" scoped>

header{
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo{
    margin-right: 40px;
  }
  .user{
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover{
      background-color: darken($gray-200, 10%);
    }
    img{
      _width: 100%;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
  @include media-breakpoint-down(sm){
    .nav{
      display: none;
    }
  }
}

</style>
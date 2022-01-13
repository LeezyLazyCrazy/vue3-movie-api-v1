<template>
 <div class="about">
   <div class="photo">
     <Loader 
      v-if="imageLoading"
      absolute />
     <img 
      :src="image" 
      alt="name">
   </div>
   <div class="name">
     {{name}}
   </div>
   <div>
     {{email}}
    </div>
   <div>
     {{blog}}
    </div>
   <div>
     {{phone}}
    </div>
 </div>
</template>

<script>
import {mapState} from 'vuex'
import Loader from "~/components/Loader"

export default {
  components:{
    Loader
  },
  data(){
    return{
      imageLoading: true
    }
  },
  //계산된 데이터
  computed:{
    //첫번째로 모듈이름 두번째로 상태데이터의 이름을 작성해주기.
    //전계연산자를 사용하는이유는 해당하는부분만 적용되는게아니기에..
    ...mapState('about', [
      'image',
      'name',
      'email',
      'blog',
      'phone'
      ])
    },
    mounted(){
      this.init()
    },
    methods:{
      async init(){
        await this.$loadImage(this.image)
        this.imageLoading = false
      }
    }
  }
</script>

<style lang="scss" scoped>


.about{
  text-align: center;
  .photo{
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 15px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img{
      _width: 100%;
      width: 200px;
      height: 200px;
      border-radius: 50%;

    }
  }
  .name{
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
</style>
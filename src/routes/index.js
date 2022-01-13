import { createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home'
import Movie from './Movie'
import About from './About'
import NotFound from './NotFound'


export default createRouter({
  //Hash, 
  //History mode https://google.com/#/search
  history:createWebHashHistory(),
  scrollBehavior(){
    return {top: 0}
  },
  //pages
  //https:google.com/ 슬래쉬는 메인페이지로 이동한다는 의미를가짐.
  routes: [
    {
      path:'/',
      component: Home
    },
    {
      path:'/movie/:id',
      component: Movie
    },
    {
      path:'/about',
      component: About
    },
    {
      path:'/:notFound(.*)', //파라미터 이름 중요하지않음 직관적으로 보이게 정하면됨
      component: NotFound
    }
    
  ]
})
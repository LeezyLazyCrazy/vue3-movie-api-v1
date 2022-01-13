import axios from "axios"
import _uniqBy from "lodash/uniqBy"

const _defaultMessage= 'Search for the movie title!'

export default{
  //module!
  namespaced: true,
  //data!(상태)
  state: () => ({
     movies: [],
     message: _defaultMessage,
     loading: false,
     theMovie: {}
    
  }),
  //computed!(계산된상태)
  getters: {},
    // movieIds(state){
    //   return state.movies.map(m => m.imdbID)
    // }

  //methods!(함수)
  //변이
  mutations: {
    updateState(state, payload){
      //['movies','message','loading']
        Object.keys(payload).forEach(key => {
          state[key] = payload[key]
    
        })
    },
    resetMovies(state){
      state.movis = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  //비동기로 처리됨
  actions: {
    async searchMovies({ state, commit }, payload){
      if(state.loading){
        return 
      }
      commit('updateState', {
        message: '',
        loading: true
      })

      try{
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults) //300 => 30
        //console.log(typeof totalResults) // string
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10)
        //ceil 은 올림처리 mathods
  
        //추가요청 전송
        if(pageLength > 1) {
          for(let page = 2; page <= pageLength; page += 1){
            if(page > (payload.number) / 10) break 
            const res = await _fetchMovie({
              ...payload,
              page // :1 이라고 표시되어있어서 첫화면만 중복되서 출력됨
            })
            const {Search} = res.data
            commit('updateState',{
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }

      }catch({message}) {
        commit('updateState',{
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload){
      if (state.loading) return

      commit('updateState', {
        theMovie:{},
        loading: true,
      })

      try{
        const res = await _fetchMovie(payload)
        //console.log(res.data)
        commit('updateState',{
          theMovie: res.data
        })
      } catch(error){
        commit('updateState',{
          theMovie: {}
        })
      } finally{
        commit('updateState',{
          loading: false
        })
      }
    }
  }
}
async function _fetchMovie(payload){
  return await axios.post('/.netlify/functions/movie', payload)
}
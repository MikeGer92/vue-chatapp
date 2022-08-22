import axios from "axios"
export const authModule = {
  state: () => ({
    token: '$2y$10$v4Yy3iL5inCg6OYt/UhrC.kx2RTRxhqLDQdu20An3bB0fX0G6/1Ey'
    // token1: '$2y$10$6cVvn1KcaJQK730t4BYrJuYD46Iy1JK81lVlkBlpEmCilI1NS910i'
  }),
  getters: {
    token: state => state.token

  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
  },
  actions: {
    async getToken({state, commit}) {
      if (!state.token) {
        const data = {
          email: 'mr.mikeger@mail.ru',
          password: 'a6bc29803e0af40545449e24330325de',
          appId: 'app_10126_1'
        }
        const response = await axios.post('https://api.chatapp.online/v1/tokens', data )
        commit('setToken', response.data.data.accessToken)
        const chats = await this.axios.get('https://api.chatapp.online/v1/licenses/21481/messengers/{telegram}/chats')
        console.log(chats.data)
      }
    }
  },
  namespaced: true 
}
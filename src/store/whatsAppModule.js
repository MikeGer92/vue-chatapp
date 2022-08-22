import Pusher from 'pusher-js';
export const whatsAppModule = {
  state: () => ({
    chatsW: [],
    chat: {},
    chatsListW: []
  }),
  getters: {
   chat: state => state.chat,
   chatsW: state => state.chatsW,
   chatsListW: state => state.chatsListW
  },
  mutations: {
    setChatsW(state, chatsW) {
      state.chatsW = chatsW
    },
    setChat(state, chat) {
      state.chat = chat
    },
    setChatsListW(state, chatsListW) {
      state.chatsListW = chatsListW
    },
    clearChat(state) {
      state.chat = {}
    }
  },
  actions: {
    checkStorage({state, commit}) {
      if (localStorage.chatsW) {
        state.chatsListW = JSON.parse(localStorage.getItem('chatsW'))
        commit('setChatsListW', state.chatsListW )
      } else {
        this.dispatch('saveChats')
      }
    },
    async getWhatsApp({state, commit}) {

    let pusher = new Pusher('ChatsAppApiProdKey', {
      wsHost: 'socket.chatapp.online',
      wssPort: 6001,
      disableStats: true,
      authEndpoint: 'https://api.chatapp.online/broadcasting/auth',
      auth: {
          headers: {
              'Authorization': '$2y$10$v4Yy3iL5inCg6OYt/UhrC.kx2RTRxhqLDQdu20An3bB0fX0G6/1Ey'
          }
      },
        enabledTransports: ['ws'],
        forceTLS: true
        
      });
  
      let channelW = pusher.subscribe('private-v1.licenses.21481.messengers.grWhatsApp');
  
      channelW.bind('message', (data) => {
        console.log(data.payload.data[0].message.text);
        let chat = {
          id: data.payload.data[0].chat.id,
          name: data.payload.data[0].chat.name,
          icon: data.payload.data[0].chat.image,
          message: [{
            text: data.payload.data[0].message.text,
            time: data.payload.data[0].time,
            side: data.payload.data[0].side,
            type: data.payload.data[0].type
          }]
        }
        commit('setChat', chat)
        if (state.chatsW.length == 0 && state.chatsListW.length == 0) {
          state.chatsW.push(state.chat)
          commit('setChatsW', state.chatsW)
          this.dispatch('saveChats')
        } else {
          state.chatsW = state.chatsListW
          if (state.chatsW.find(chat => chat.id === state.chat.id)) {
            state.chatsW.find(chat => chat.id === state.chat.id).name = state.chat.name
            state.chatsW.find(chat => chat.id === state.chat.id).icon = state.chat.icon
            state.chatsW.find(chat => chat.id === state.chat.id).message ? state.chatsW.find(chat => chat.id === state.chat.id).message.push(state.chat.message[0]): state.chatsW.find(chat => chat.id === state.chat.id).message = state.chat.message
            commit('clearChat')
            this.saveChats()
          } else {
            state.chatsW.push(state.chat)
            this.dispatch('saveChats')
          }
        } 
      })
  
      channelW.bind('messageStatus', (data) => {
          console.log(data.payload.data[0].type);
      });
  
      channelW.bind('chatTag', () => {
          // console.log(data);
      });
    },
    saveChats({state}) {
      const parsed = JSON.stringify(state.chatsW);
      localStorage.setItem('chatsW', parsed);
    }
  },
  namespaced: true 
}
<template>
  <div class="wchats">
    <h1 class="wchats__title">"Все Ваши активные чаты WhatsApp"</h1>
    <div 
      class="wchats__block"
      v-for="chat in this.chatsListW"
      :key="chat.chatId"
    >
      <ChatItem :chatData="chat" />
    </div>

  </div>
</template>

<script>
// import Pusher from 'pusher-js' 
import { mapGetters,  mapActions } from 'vuex'
import ChatItem from '@/components/ChatItem.vue'
export default {
  name: 'MainPage',
  components: { ChatItem },
  data() {
    return {
      // chatsListW: this.state.chatsListW
      // chat: null,
      // chatsW: [],
      // chatsListW: []
    }
  },
  created() {
    this.getWhatsApp()
    // let pusher = new Pusher('ChatsAppApiProdKey', {
    // wsHost: 'socket.chatapp.online',
    // wssPort: 6001,
    // disableStats: true,
    // authEndpoint: 'https://api.chatapp.online/broadcasting/auth',
    // auth: {
    //     headers: {
    //         'Authorization': `${this.token}`
    //     }
    // },
    //   enabledTransports: ['ws'],
    //   forceTLS: true
      
    // });
    // // this.getChats()

    // let channelW = pusher.subscribe('private-v1.licenses.21481.messengers.grWhatsApp');
    // // const newChats = new Set
    

    // channelW.bind('message', (data) => {
    //   console.log(data);
    //   console.log(data.payload.data[0].message.text);
    //   this.chat = {
    //     id: data.payload.data[0].chat.id,
    //     name: data.payload.data[0].chat.name,
    //     icon: data.payload.data[0].chat.image,
    //     message: [{
    //       text: data.payload.data[0].message.text,
    //       time: data.payload.data[0].time,
    //       side: data.payload.data[0].side,
    //       type: data.payload.data[0].type
    //     }]
    //   }
    //   if (this.chatsW.length == 0 && this.chatsListW.length == 0) {
    //     this.chatsW.push(this.chat)
    //     this.saveChats()
    //   } else {
    //     this.chatsW = this.chatsListW
    //     if (this.chatsW.find(chat => chat.id === this.chat.id)) {
    //       this.chatsW.find(chat => chat.id === this.chat.id).name = this.chat.name
    //       this.chatsW.find(chat => chat.id === this.chat.id).icon = this.chat.icon
    //       this.chatsW.find(chat => chat.id === this.chat.id).message ? this.chatsW.find(chat => chat.id === this.chat.id).message.push(this.chat.message[0]): this.chatsW.find(chat => chat.id === this.chat.id).message = this.chat.message
    //       this.chat = [] 
    //       this.saveChats()
    //     } else {
    //       this.chatsW.push(this.chat)
    //       this.saveChats()
    //     }
    //   } 
    // })

    // channelW.bind('messageStatus', (data) => {
    //     console.log(data.payload.data[0].type);
    // });

    // channelW.bind('chatTag', () => {
    //     // console.log(data);
    // });
  },
  beforeMount() {
    this.checkStorage()
    // if (localStorage.chatsW) {
    //   this.chatsListW = JSON.parse(localStorage.getItem('chatsW'))
    // } else {
    //   this.saveChats()
    // }
  },
  mounted() {
    // this.getToken()
    // this.getChats()

  },
  methods: {
    ...mapActions({
      getToken: 'auth/getToken',
      checkStorage: 'whats/checkStorage',
      getWhatsApp: 'whats/getWhatsApp',
      // saveChats: 'whats/checkStorage' 
    }),
    saveChats() {
      const parsed = JSON.stringify(this.chatsW);
      localStorage.setItem('chatsW', parsed);
    }

  },
  computed: {
    ...mapGetters({
      token: 'auth/token',
      chat: 'whats/chat',
      chatsW: 'whats/chatsW',
      chatsListW: 'whats/chatsListW'
      
    }),
  }

}
</script>

<style lang="scss">
.wchats {
display: flex;
flex-direction: column;
align-items: center;
&__title {
  color: rgb(19, 235, 55);
  border-bottom: 1px solid grey;
}
  &__block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
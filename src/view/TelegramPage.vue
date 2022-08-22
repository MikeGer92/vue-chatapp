<template>
  <div class="tchats">
    <h1 class="tchats__title">"Все Ваши активные чаты Telegram"</h1>
    <div 
      class="tchats__block"
      v-for="chat in this.chatsList"
      :key="chat.chatId"
    >
      <ChatItem :chatData="chat" />
    </div>

  </div>
</template>

<script>
import Pusher from 'pusher-js' 
import { mapGetters,  mapActions } from 'vuex'
import ChatItem from '@/components/ChatItem.vue'
export default {
  name: 'MainPage',
  components: { ChatItem },
  data() {
    return {
      messages: [],
      chat: null,
      chats: [],
      users: [],
      chatsList: []
      
    }
  },
  created() {
    let pusher = new Pusher('ChatsAppApiProdKey', {
    wsHost: 'socket.chatapp.online',
    wssPort: 6001,
    disableStats: true,
    authEndpoint: 'https://api.chatapp.online/broadcasting/auth',
    auth: {
        headers: {
            'Authorization': `${this.token}`
        }
    },
      enabledTransports: ['ws'],
      forceTLS: true
      
    });
    // this.getChats()

    let channelT = pusher.subscribe('private-v1.licenses.21481.messengers.telegram');
    // const newChats = new Set
    

    channelT.bind('message', (data) => {
      console.log(data);
      console.log(data.payload.data[0].message.text);
      console.log(data.payload.data[0].side);
      this.chat = {
        id: data.payload.data[0].chat.id,
        name: data.payload.data[0].chat.name,
        icon: data.payload.data[0].chat.image,
        message: [{
          text: data.payload.data[0].message.text,
          time: data.payload.data[0].time,
          side: data.payload.data[0].side
        }]
      }
      if (this.chats.length == 0 && this.chatsList.length == 0) {
        this.chats.push(this.chat)
        this.saveChats()
      } else {
        this.chats = this.chatsList
        if (this.chats.find(chat => chat.id === this.chat.id)) {
          this.chats.find(chat => chat.id === this.chat.id).name = this.chat.name
          this.chats.find(chat => chat.id === this.chat.id).icon = this.chat.icon
          this.chats.find(chat => chat.id === this.chat.id).message.push(this.chat.message[0])
          this.chat = [] 
          this.saveChats()
        } else {
          this.chats.push(this.chat)
          this.saveChats()
        }
      } 
    })

    channelT.bind('messageStatus', (data) => {
        console.log(data.payload.data[0].type);
    });

    channelT.bind('chatTag', () => {
        // console.log(data);
    });
  },
  beforeMount() {
    if (localStorage.chats) {
      this.chatsList = JSON.parse(localStorage.getItem('chats'))
    } else {
      this.saveChats()
    }
  },
  mounted() {
    // this.getToken()
    // this.getChats()
    console.log(this.chats)

  },
  methods: {
    ...mapActions({
      getToken: 'auth/getToken',
    }),
    saveChats() {
      const parsed = JSON.stringify(this.chats);
      localStorage.setItem('chats', parsed);
    }

  },
  computed: {
    ...mapGetters({
      token: 'auth/token'
    }),
  }

}
</script>

<style lang="scss">
.tchats {
display: flex;
flex-direction: column;
align-items: center;
&__title {
  color: rgb(21, 108, 239);
  border-bottom: 1px solid grey;
}
  &__block {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
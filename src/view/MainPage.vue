<template>
  <div class="main-page">
    <h1 class="main-page__title">Это главная страница со списком мессенджеров</h1>
    <div 
      class="main-page__messengers"
      v-for="messenger in channels" :key="messenger.id"
    >
      <MessengerItem :messenger="messenger" />
    </div>
    <!-- <div 
      class="chats__block"
      v-for="chat in this.chats"
      :key="chat.chatId"
    >
      <ChatItem :chatData="chat" />
    </div> -->

  </div>
</template>

<script>
import Pusher from 'pusher-js' 
import { mapGetters,  mapActions } from 'vuex'
import MessengerItem from '@/components/MessengerItem.vue'
// import ChatItem from '@/components/ChatItem.vue'
export default {
  name: 'MainPage',
  components: { MessengerItem },
  data() {
    return {
      channels: [
        {
          id: 1,
          name: 'WhatsApp',
          icon: require('/src/assets/icons/whatsapp.png')
        },
                {
          id: 2,
          name: 'Telegram',
          icon: require('/src/assets/icons/telegram.png')        }

      ],
      messages: [],
      chat: null,
      chats: [],
      chatsList: [],
      chatsW: [],
      chatsListW: [],
      users: []
    }
  },
  watch: {

   
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
    let channelW = pusher.subscribe('private-v1.licenses.21481.messengers.grWhatsApp');

    channelW.bind('message', (data) => {
      console.log(data);
      console.log(data.payload.data[0].message.text);
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
      if (this.chatsW.length == 0 && this.chatsListW.length == 0) {
        this.chatsW.push(this.chat)
        this.saveChatsW()
      } else {
        this.chatsW = this.chatsListW
        if (this.chatsW.find(chat => chat.id === this.chat.id)) {
          this.chatsW.find(chat => chat.id === this.chat.id).name = this.chat.name
          this.chatsW.find(chat => chat.id === this.chat.id).icon = this.chat.icon
          this.chatsW.find(chat => chat.id === this.chat.id).message.push(this.chat.message[0])
          this.chat = [] 
          this.saveChatsW()
        } else {
          this.chatsW.push(this.chat)
          this.saveChatsW()
        }
      } 
    })

    channelW.bind('messageStatus', (data) => {
        console.log(data.payload.data[0].type);
    });

    channelW.bind('chatTag', () => {
        // console.log(data);
    });


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
  mounted() {
    this.getToken()
  },
  methods: {
    ...mapActions({
      getToken: 'auth/getToken'
    }),
    saveChats() {
      const parsed = JSON.stringify(this.chats);
      localStorage.setItem('chats', parsed);
    },
    saveChatsW() {
      const parsed = JSON.stringify(this.chatsW);
      localStorage.setItem('chats', parsed);
    }

  },
  computed: {
    ...mapGetters({
      token: 'auth/token'
    })
    // getChats() {
    //   return this.chats
    //  }
  }

}
</script>

<style lang="scss">
.main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    color: teal;
    border-bottom: 1px solid grey;
  }
}
.chats__block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>
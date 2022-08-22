<template>
  <div class="chat-field">
  <h1>Ghbdtn</h1>
    <div class="chat-field__header">
      <div class="chat-field__header_img">
        <div class="chat-field__header_img-noFoto" v-if="!userChat.icon">NoFoto</div>
        <img v-else :src="userChat.icon">
      </div>
      <div class="chat-field__header_name">{{ userChat.name }}</div>
    </div>
    <div class="chat-field__messages" v-for="mess in userChat.message" :key="mess">
      <MessageItem :messData="mess" />
  </div>
  </div>
</template>

<script>
import MessageItem from './MessageItem.vue';
  export default {
    name: "ChatsField",
    components: { MessageItem },
    props: {
      usChat: {
        type: Object,
        default: () => {}
      }
    },
    data() {
        return {
            fullChat: null,
            userChat: null,
            acsChat: null


        };
    },
    beforeMount() {
        this.getFullChat();
    },
    mounted() {
      console.log(this.userChat.message);
    },
    methods: {
      getFullChat() {
        this.fullChat = JSON.parse(localStorage.getItem("chatsW"));
        this.userChat = this.fullChat.find(chat => chat.id === this.$route.params.id);
      },
    },
}
</script>

<style lang="scss">
.chat-field {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__header {
    width: 800px;
    display: flex;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 15px 0;
    padding: 10px;
    border: 1px solid rgb(19, 235, 55);
    &_img {
      display: flex;
      & img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: contain;
      }
    }
    &_name {
      margin-left: 15px;
      font-weight: bold;
    }
  }
}

</style>
<template>
  <div>
    <h1>Это страница чата</h1>
    <ChatsField :usChat="endChat"/>
  </div>
</template>

<script>
  import ChatsField from '@/components/ChatsField.vue';
export default {
  name: 'ChatIdPage',
  components: { ChatsField },
  data() {
    return {
      allChats: [],
      endChat: null

    }
  },
  beforeMount() {
    if (localStorage.chats) {
      this.allChats = JSON.parse(localStorage.getItem('chatsW'))
      this.setData()
    } else {
      console.log('Нет активных чатов')
    }
  },
  mounted() {
  // this.getToken()
  // this.getChats()
 

  },
  methods: {
    setData() {
      this.endChat = this.allChats.find(chat => chat.id ===  this.$route.params.id )
      console.log(this.endChat.icon)
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
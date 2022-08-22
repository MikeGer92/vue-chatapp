<template>
  <div class="chat">
    <h2>Страница чата</h2>
    <router-link :to="`${this.$route.path}/${this.chatData.id}`" class="chat__link">
      <div class="chat__wrapper" @click="clickChat(chatData)">
        <div class="chat__header">
          <div class="chat__header_img">
            <div class="chat__header_img-noFoto" v-if="!chatData.icon">NoFoto</div>
            <img v-else :src="chatData.icon">
          </div>
          <div class="chat__header_name">{{ chatData.name }}</div>
        </div>
        <div class="chat__field">На этой странице Ваша переписка с {{ chatData.name }}</div>
    </div>
   </router-link>
  </div>
</template>

<script>
  export default {
    name: 'ChatItem',
    props: {
      chatData: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      clickChat(data) {
        console.log(data)
        this.$emit('getChat', data)


      }
    }
    
  }
</script>

<style lang="scss">
.chat {
  display: flex;
  width: 800px;
  margin-top: 15px;
  flex-direction: column;
  align-items: flex-start;
  &__header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 15px 0;
    padding: 10px;
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
  &__link {
    text-decoration: none;
    color: inherit;
  }
}

</style>
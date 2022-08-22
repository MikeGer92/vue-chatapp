<template>
  <div class="messenger">
    <router-link :to="`/${messenger.name.toLowerCase()}`">
      <div class="messenger__wrapper">
        <div class="messenger__icon"><img :src="messenger.icon"></div>
        <div class="messenger__title">{{ messenger.name}}</div>
        <!-- <div class="messenger__subtitle">{{ messenger.slog}}</div> -->
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: 'MessengerItem',
    props: {
      messenger: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>

<style lang="scss">
.messenger {
  display: flex;
  &__wrapper {
    width: 800px;
    display: flex;
    align-items: center;
    border: 2px solid teal;
    margin: 15px 0;
    padding: 10px;
  }
  &__icon {
    display: flex;
    & img {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
  &__title {
    font-size: 46px;
    text-align: center;
    font-weight: bold;
    margin-left: 50px;
  }


}

</style>
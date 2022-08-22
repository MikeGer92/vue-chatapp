<template>
  <div class="message">
    <div class="messge__text">{{ messData.text}}</div>
    <div class="messge__obj" v-if="messData.type!=='text'">Получено: {{ messData.type}}</div>
    <div class="messge__text">{{ messData.text}}</div>
    <div class="messge__time">{{ getTime(messData.time)}}</div>
  </div>
</template>

<script>
import dateFilter from '@/utils/date.filter'
  export default {
    name: 'MessageItem',
    props: {
      messData: {
        type: Object,
        default: () => {}
      }
    },
    mounted() {
      console.log(this.messData)
    },
    methods: {
      getTime (time) {
        const date = new Date(time * 1000)
        return dateFilter(date, 'datetime')
        // return date.getDate() + '.' + ((date.getMonth() + 1)>9 ? (date.getMonth() + 1): (`0${(date.getMonth() + 1)}`)) + '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes()
      }
    }
  }
</script>

<style lang="scss">

</style>
<template>
  <flight-grid>{{msg}}</flight-grid>
</template>

<script>
  import FlightGrid from '@/components/Flight/FlightGrid'
  export default{
    data: {
      msg: 'Welcome to Your Vue.js App'
    },
    components: {
      'flight-grid': FlightGrid
    }
  }
</script>

<style scoped>

</style>

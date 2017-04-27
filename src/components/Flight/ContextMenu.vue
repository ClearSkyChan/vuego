<template>
  <div class="tb-context-menu" v-if="show">
    <ul>
      <li v-for="item in items">
          {{item.Name}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    props: ['items']
  }
</script>
<style>

</style>

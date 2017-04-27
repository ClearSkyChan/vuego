<template>
  <div class="context-menu"
       v-if="visible"
       v-bind:style="{top:position.top+'px',left:position.left+'px'}">
    <ul>
      <li v-for="item in items"
          v-on:click="onClick(item)">
          {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
  export default{
    props: ['items'],
    data: function () {
      return {
        visible: false,
        position: {
          top: 0,
          left: 0
        },
        model: null
      }
    },
    methods: {
      onClick: function (item) {
        item.handler.call(this, this.model)
      },
      show: function (left, top, model) {
        this.visible = true
        this.position.left = left
        this.position.top = top
        this.model = model
      }
    },
    mounted: function () {
      var that = this
      window.addEventListener('click', function () {
        that.visible = false
      })
    }
  }
</script>
<style>
  .context-menu{
    position: absolute;
    border:1px solid #aaaaaa;
    background-color: #ffffff;
    cursor:default;
  }
  .context-menu ul{
    list-style: none;
    padding:0;
    margin:0;
  }
  .context-menu li{
    border-top: 1px solid #aaaaaa;
    padding:5px 10px;
    width:100px;
  }
  .context-menu li:hover{
    background-color:#EAF2F5;
  }
  .context-menu li:first-child{
    border:none;
  }
</style>

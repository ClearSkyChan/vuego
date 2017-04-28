<template>
  <div class="context-menu"
       v-if="visible"
       v-bind:style="{top:position.top+'px',left:position.left+'px'}">
    <div>
      <ul>
        <li v-for="item in items"
            v-on:click="onClick(item)">
          {{item.name}}
          <div style="float:right"><span v-if="item.items&&item.items.length>0" class="up-arrow"></span></div>
        </li>
      </ul>
    </div>
    <context-menu></context-menu>
  </div>
</template>
<script>
  var ContextMenu = {
    name: 'context-menu',
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
        var elHeight = this.$el.clientHeight
        var winHeight = window.innerHeight
        if (top > winHeight - elHeight) {
          top = top - elHeight
        }
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
    },
    component: {
      'context-menu': ContextMenu
    }
  }
  export default ContextMenu
</script>
<style scoped>
  .up-arrow{
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid #000;
  }
  .context-menu{
    position: absolute;
    border:1px solid #aaaaaa;
    background-color: #ffffff;
    cursor:default;
    box-shadow:3px 3px 3px #cccccc;
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

<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <tr v-bind:class=cssClass>
    <td>{{index}}</td>
    <td v-for="c in columns" v-if="!c.hidden"
        v-on:click="eventHandler('click',$event,c.field)"
        v-on:dblclick="eventHandler('dblclick',$event,c.field)"
        v-on:contextmenu="eventHandler('contextmenu',$event,c.field)"
        v-bind:data-col="c.field"
        v-bind:style="c.style||''">{{item[c.field]}}
    </td>
  </tr>
</template>
<script>
  export default {
    props: ['columns', 'index', 'item', 'select', 'alt'],
    computed: {
      cssClass: function () {
        var style = ' '
        if (this.alt) {
          style += 'alt'
        }
        if (this.select) {
          style += ' select'
        }
        return style
      }
    },
    methods: {
      eventHandler: function (event, e, col) {
        // console.log('you just trigger event: ' + event + this.item.FlightNo + ',col: ' + col || 'unknown', e)
        this.$emit(event, [col, e])
        if (event === 'contextmenu') {
          e.preventDefault()
        }
      }
    }
  }
</script>
<style scoped>
  .alt {
    background-color: #efefef
  }

  .dark .alt {
    bacground-color: #223322
  }

  .select {
    background-color: #bdd3f5 !important;
  }

  tr:hover {
    background-color: #EAF2F5;
  }

  td {
    padding: 2px;
    text-align: center;
    overflow: hidden;
    box-sizing: content-box;
    border-right: 1px solid #aaaaaa;
    border-bottom: 1px solid #aaaaaa;
    white-space: nowrap;
  }

  td:last-child {
    border-right: none;
  }
  tr:last-child > td{
    border-bottom: none;
  }
</style>

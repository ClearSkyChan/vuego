<template>
  <tr v-bind:class="cssClass">
    <td>{{index}}</td>
    <td v-for="(c,i) in cells"
        v-on:click="cellEventHandler('click',$event)"
        v-on:dblclick="cellEventHandler('dblclick',$event)"
        v-bind:data-row-index="index"
        v-bind:data-col-index="i"
        v-bind:data-col="c.col.field"
        v-bind:style="c.col.style||''">{{c.content}}
    </td>
  </tr>
</template>
<script>
  export default {
    props: ['columns', 'item', 'index', 'select'],
    computed: {
      cells: function () {
        var item = this.item
        var results = []
        this.columns.forEach((col) => {
          if (col.hidden !== true) {
            results.push({
              col,
              content: item[col.field]
            })
          }
        })
        return results
      },
      cssClass: function () {
        var style = ''
        if (this.index % 2 !== 0) {
          style += 'alt'
        }
        if (this.select === this.index) {
          style += ' select'
        }
        return style
      }
    },
    methods: {
      cellEventHandler: function (event, e) {
        var t = e.target
        var col = t.attributes['data-col'].value
        console.log('you just trigger event: ' + event + this.item.FlightNo + ',col: ' + col)
        this.$emit('cell' + event, {index: this.index, item: this.item, col: col})
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
    border-right: none
  }

</style>

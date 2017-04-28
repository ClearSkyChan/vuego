<template>
  <div class="tb-wrapper" v-bind:style="{ width: size.width+16+'px',height: size.height+'px'}">
    <div class="tb-header-wrapper">
      <div class="tb-header" v-bind:style="{ width: size.width+'px'}">
        <table v-bind:style="{width:width}">
          <colgroup>
            <col width="50px">
            <col v-for="col in columns" :width="col.width+'px'">
          </colgroup>
          <thead>
          <tr>
            <th>#</th>
            <th v-for="col in columns" v-bind:data-col="col.field" v-on:click="onHeaderClick">{{col.text}}
              <span v-if="col.field === sort.field && sort.seq === 1" class="down-arrow"></span>
              <span v-if="col.field === sort.field && sort.seq === -1" class="up-arrow"></span>
            </th>
          </tr>
          </thead>
        </table>
      </div>
    </div>
    <div class="tb-content" v-bind:style="{ width: size.width+16+'px'}">
      <table v-bind:style="{width:width}">
        <colgroup>
          <col width="50px">
          <col v-for="col in columns" :width="col.width+'px'">
        </colgroup>
        <tbody>
        <row v-for="(item,index) in items"
             v-on:click="rowEventHandler('click',item,index,$event)"
             v-on:dblclick="rowEventHandler('dblclick',item,index,$event)"
             v-on:contextmenu="rowEventHandler('contextmenu',item,index,$event)"
             v-bind:columns=columns
             v-bind:item=item
             v-bind:index=index
             v-bind:alt="index%2===0"
             v-bind:select="select===index"
             v-bind:key=index>
        </row>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Row from '@/components/Flight/Row'
  var COL_DEFAULT_SIZE = 60
  var IDX_ROW_SIZE = 50
  export default{
    props: ['columns', 'items', 'size'],
    data () {
      return {
        alt: true,
        select: null,
        sort: {
          field: null,
          seq: 1
        }
      }
    },
    computed: {
      width: function () {
        var result = 0
        this.columns.forEach((col) => {
          result += col.width || COL_DEFAULT_SIZE
        })
        return result + IDX_ROW_SIZE + 'px'
      },
      contentWidth: function () {

      }
    },
    methods: {
      rowEventHandler: function (event, item, index, e) {
        this.select = index
        this.$emit('select', item)
        this.$emit(event, [item, e[0], e[1]])
      },
      onHeaderClick: function (e) {
        var field = e.target.getAttribute('data-col')
        this.sortBy(field)
      },
      sortBy: function (field) {
        var that = this
        var col = this.columns.filter(function (c) {
          return c.field === field
        })
        if (col.length > 0) {
          var sortable = col[0].sortable
          if (!sortable) return
          if (typeof sortable === 'function') {
            this.items = this.items.sort(function (a, b) {
              return sortable.call(this, a, b) * that.sort.seq
            })
          } else {
            this.items = this.items.sort(function (a, b) {
              return that.sort.seq * (a[field] > b[field] ? 1 : -1)
            })
          }
          this.sort.field = field
          this.sort.seq = -this.sort.seq
        }
      }
    },
    components: {
      'row': Row
    },
    mounted: function () {
      var content = this.$el.getElementsByClassName('tb-content')[0]
      var header = this.$el.getElementsByClassName('tb-header')[0]
      content.addEventListener('scroll', function (e) {
        var scrollLeft = e.target.scrollLeft
        header.scrollLeft = scrollLeft
      })
    }
  }
</script>

<style scoped>
  table {
    border-spacing: 0;
    border-collapse: collapse;
    table-layout:fixed;
  }

  .tb-wrapper {
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
  }

  .tb-header-wrapper {
    border: 1px solid #aaaaaa;
    box-sizing: border-box;
    background-color: #d3d3d4;
  }

  .tb-header {
    border-right: 1px solid #aaaaaa;
    overflow: hidden;
    box-sizing: border-box;
  }

  .tb-content-wrapper {

  }

  .tb-content {
    overflow: auto;
    height: calc(100% - 32px);
    box-sizing: border-box;
    border: 1px solid #aaaaaa;
    border-top: none;
    cursor:default;
    user-select: none;
  }
  .tb-content::-webkit-scrollbar {
    width:14px;
    height:14px;
  }
  .tb-content::-webkit-scrollbar-track     {
    background-color: #E5E5E5;
    border-left: 2px solid transparent;
  }
  .tb-content::-webkit-scrollbar-thumb{
    background-color: #A6A6A6;
     border-left: 2px solid transparent;
  }
  .tb-content::-webkit-scrollbar-corner {
    background:#d3d3d4;
  }


  .up-arrow{
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
    border-bottom: 4px solid #000;
  }
  .down-arrow {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px solid;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }

  th {
    padding: 4px;
    overflow: hidden;
    text-align: center;
    box-sizing: content-box;
    border-right: 1px solid #aaaaaa;
  }

  th:last-child {
    border-right: none;
  }

  .tb-context-menu{
    /*float:left;*/
    position:absolute;
    top:0;
    left:0;
    border:1px solid #aaaaaa;
    width:300px;
  }
</style>

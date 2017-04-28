<template>
  <div class="flight-wrapper">
    <div class="flight-toolbar">
      <input type="date"/>
      <button v-on:click="getFlights">查询</button>
      <select >
        <option value=”1”>MF</option>
        <option value=”2”>CZ</option>
        <option value=”3”>RY</option>
      </select>
    </div>
    <flight-grid ref="flightGrid"
                 v-bind:columns=columns
                 v-bind:items=flights
                 v-bind:size=size
                 v-on:select="onSelect"
                 v-on:contextmenu="onContextMenu">

    </flight-grid>
    <context-menu ref="contextMenu"
                  v-if="ctxMenus&&ctxMenus.length>0"
                  v-bind:items=ctxMenus></context-menu>
  </div>
</template>

<script>
  import Grid from '@/components/Flight/Grid'
  import ContextMenu from '@/components/Flight/ContextMenu'
  import plug1 from '@/components/Flight/Plugins/dblclickPlug'
  import plug2 from '@/components/Flight/Plugins/contextMenuPlug'

  export default{
    data () {
      return {
        size: {
          width: 0,
          height: 0
        },
        columns: [
          {field: 'AcReg', text: '机号', width: 80},
          {field: 'CaptainName', text: '机长', width: 80},
          {field: 'Release', text: '放行', width: 80},
          {field: 'FlightNo', text: '航班号', width: 80, style: {'font-weight': 'bolder'}, sortable: true},
          {field: 'FlightDate', text: '航班日期', width: 90},
          {field: 'Departure', text: '起飞', width: 90, style: {'color': '#3f3f99'}},
          {field: 'Arrival', text: '落地', width: 100, style: {'color': '#0000cc'}},
          {field: 'Std', text: '起飞时', width: 100, style: {'color': '#ee0000'}},
          {field: 'Etd', text: '预飞', width: 100, sortable: function (a, b) { return a.Etd > b.Etd ? 1 : -1 }},
          {field: 'Atd', text: '实飞', width: 100},
          {field: 'Sta', text: '计达', width: 100},
          {field: 'Eta', text: '预达', width: 100},
          {field: 'Ata', text: '实达', width: 100},
          {field: 'Tobt', text: 'TOBT', width: 100},
          {field: 'Cobt', text: 'COBT', width: 100}
        ],
        ctxMenus: [{
          name: '右键菜单1',
          handler: function (model) {
            console.log('you clicked menu 1', model)
            model.FlightNo = 'xxxx'
          }
        }, {
          name: '右键菜单2', handler: function () { console.log('you clicked menu 2') }
        }],
        flights: []
      }
    },
    methods: {
      getFlights: function () {
        var flights = []
        for (var i = 0; i < 700; i++) {
          flights.push({
            FlightId: '1',
            FlightNo: i,
            CaptainName: '赵三xxxxxxxxxxsdfs',
            Release: 'Y',
            AcReg: 'B-2867',
            FlightDate: '2011-1-1',
            Departure: 'ZSAM',
            Arrival: 'ZBAA',
            Std: '15:00',
            Etd: i + Math.round(Math.random() * 1000, 1),
            Atd: '15:00',
            Sta: '15:00',
            Eta: '15:00',
            Ata: '15:00',
            Cobt: '15:00',
            Tobt: '14:00'
          })
        }
        this.flights = flights
      },
      onSelect: function (e) {
        this.$emit('select', e)
      },
      onContextMenu: function (e) {
        var x = e[2].clientX
        var y = e[2].clientY
        this.$refs.contextMenu.show(x, y, e[0])
      },
      // 适配FOC
      on: function (event, handler) {
        var eventMe = ''
        switch (event) {
          case 'celldblclick':
            eventMe = 'dblclick'
            break
          default:
            throw new Error('bad event')
        }
        console.log(eventMe)
        this.$refs.flightGrid.$on(eventMe, function (e) {
          handler.call(this, e[1], e[0])
        })
      },
      addContextMenuItem: function (name, handler) {
        console.log('----------')
        this.ctxMenus.push({
          name: name,
          handler: function (item) {
            handler.call(this, {data: item})
          },
          items: [0]
        })
      }
    },
    components: {
      'flight-grid': Grid,
      'context-menu': ContextMenu
    },
    beforeMount: function () {
      var that = this
      var resize = function () {
        that.size.height = window.innerHeight - 55
        that.size.width = window.innerWidth - 38
      }
      resize()
      window.addEventListener('resize', resize)
    },
    mounted: function () {
      plug1.create(this)
      plug2.create(this)
    }
  }

</script>

<style scoped>
  .flight-wrapper{
    font-size:14px;
  }
  .flight-toolbar{
    background-color: #d3d3d4;
    margin:4px 0px;
    padding:4px;
    border:1px solid #aaaaaa
  }
</style>

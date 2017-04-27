<template>
  <div class="flight-wrapper">
    <input type="date"/>
    <button v-on:click="getFlights">查询</button>
    <flight-grid v-bind:columns=columns
                 v-bind:items=flights
                 v-bind:size=size
                 v-on:select="onSelect">

    </flight-grid>
    <context-menu v-if="ctxMenus&&ctxMenus.length>0"
                  v-bind:items=ctxMenus></context-menu>
  </div>
</template>

<script>
  import Grid from '@/components/Flight/Grid'
  import ContextMenu from '@/components/Flight/ContextMenu'
  import plug1 from '@/components/Flight/Plugins/plug1.js'

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
          name: '右键菜单1', handler: function () { console.log() }
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
      }
    },
    components: {
      'flight-grid': Grid,
      'context-menu': ContextMenu
    },
    created: function () {
      plug1.start(this)
    },
    beforeMount: function () {
      var that = this
      var resize = function () {
        that.size.height = window.innerHeight - 45
        that.size.width = window.innerWidth - 35
      }
      resize()
      window.addEventListener('resize', resize)
    },
    mounted: function () {
      // this.getFlights()
    },
    destroyed: function () {
      plug1.destory(this)
    }
  }

</script>

<style scoped>
  .flight-wrapper{
    font-size:12px;
  }
</style>

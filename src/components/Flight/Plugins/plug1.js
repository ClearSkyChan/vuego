export default {
  start: function (fv) {
    fv.$on('click', function (e) {
      // alert('you just clicked' + e.flight.FlightNo + ',' + e.col)
    })
  },
  destroy: function (fv) {
    fv.$off('click')
  }
}

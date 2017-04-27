export default {
  create: function (fm) {
    fm.on('celldblclick', function (col, entity) {
      console.log('plug1:you just dblclicked:', col, entity)
    })
  }
}

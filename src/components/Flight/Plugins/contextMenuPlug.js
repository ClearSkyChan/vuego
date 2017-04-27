export default {
  create: function (fm) {
    fm.addContextMenuItem('配餐信息查询', function (e) {
      var dataItem = e.data
      console.log('you clicked a menu', dataItem)
    })
  }
}

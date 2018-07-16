import vue from "vue"

vue.filter('timeYearFilter', function (value) {
  value = parseInt(value)
  // var d = new Date(Date.UTC(2017, 12, 10, 0, 0, 0, 0));  // time
  var d = new Date(Date.UTC(1970, 0, 1, 0, 0, 0, 0));  // time
  // console.log(d)

  var t = parseInt(d.getTime() / 1000);

  var d = new Date((value + t) * 1000);
  var month = d.getMonth() + 1;

  if (month < 10) {
    month = "0" + month;
  }

  var day = d.getDate();

  if (day < 10) {
    day = "0" + day;
  }
  return d.getFullYear() + "年" + month + "月" + day + "日";

})

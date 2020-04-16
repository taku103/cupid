$(document).on("click", ".make_a_call", function(){
  let url = "/mypage/create_skyway"
  let c_user_id = $(document).find(".c_user_id").text()
  c_user_id = parseInt(10, c_user_id)
  let skyway_code = $(document).find("#my-id").text()
  let data = { c_user_id: c_user_id, skyway_code: skyway_code }
  console.log(data)
  $.ajax({
    url: url,
    data: data,
    dataType: "json",
    type: "GET",
    // processData: false,
    // contentType: false
  })
  .done(function(data){
    console.log(data)
    console.log("電話チェック成功")
  })
  .fail(function(){
    console.log("電話チェック失敗")
  })
})

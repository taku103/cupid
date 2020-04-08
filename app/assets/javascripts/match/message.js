$(function(){
    // メッセージ送信
  $(document).on("click", ".message_submitBtn", function(e){
    e.preventDefault()
    alert("メッセージ送信")
    url = "/mypage/create_message"
    data = $(this).parent().parent().parent()[0]
    formData = new FormData(data)
    $.ajax({
      url: url,
      data: formData,
      datatype: "json",
      type: "POST",
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log("成功")
      console.log(data)
      if (data.message.content !== ''){
        data.message.content = data.message.content.replace(/\n/g,'<br>')
      }
      my_message = ShowMyMessageHTML(data.message)
      $(".top_messages").append(my_message)
      $(".match_textarea").val('')
      scroll_height = $(".top_messages").get(0).scrollHeight
      console.log(scroll_height)
      $(".top_messages").scrollTop(scroll_height)

    })
    .fail(function(){
      console.log("失敗")
    })
  })
    // 改行
  $(document).on("keyup", ".match_textarea", function(){
    if ($(this).outerHeight() > this.scrollHeight){
      $(this).height(36)
    }
    while ($(this).outerHeight() < this.scrollHeight && $(this).outerHeight() < 200){
      $(this).height($(this).height() + 1)
    }
  })

  // 前提関数
  function ShowMyMessageHTML(message){
    // safe_joinを使う。
    HTML = 
    `
    <div class="my_messageBox" id="${message.id}">
      <div class="text">
        ${message.content}
      </div>
    </div>
    `
    return HTML
  }

  // 前提定数

})
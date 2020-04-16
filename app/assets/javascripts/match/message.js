$(function(){
    // メッセージ送信
  $(document).on("click", ".message_submitBtn", function(e){
    e.preventDefault()
    url = $(this).parent().parent().parent().attr('action')
    // url = "/mypage/create_message"
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
  $(document).on("click", ".c_message_submitBtn", function(e){
    e.preventDefault()
    console.log("message送信")
    form_message = $(this).parent().parent().parent()
    url = form_message.attr('action')
    data = form_message[0]
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
      console.log("通信成功")
      HTML = ``
      data.message.content = data.message.content.replace(/\n/g, '<br>')
      HTML = HTML + ShowMyMessageHTML(data.message)
      scroll_height = $(document).find(".top_messages").get(0).scrollHeight
      $(document).find(".match_textarea").val('')
      $(document).find(".top_messages").append(HTML)
      $(document).find(".top_messages").scrollTop(scroll_height)
    })
    .fail(function(){
      alert("通信失敗")
    })
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
  function ShowOtherMessageHTML(message, user){
    HTML = 
    `
    <div class="partsBox" id="${message.id}">
      <div class="imageBox">
        <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="image">
      </div>
      <div class="name_messageBox">
        <div class="nameBox">
          ${user.nickname}
        </div>
        <div class="messageBox">
          <div class="text">
            ${message.content}
          </div>
        </div>
      </div>
    </div>
    `
    return HTML
  }
    
    // mypage/matchのboolを分ける
  function confirmBool(){
    if($(document).find(".message_bool").val() == 1){
      reloadMessages_1()
    }
    else if ($(document).find(".message_bool").val() == 0){
      reloadMessages_2()
    }
  }
    

  // 前提定数

  // 繰り返しリロードクロージャ関数
  var reloadMessages_1 = function(){
    console.log("index_1")
    url = "/api/messages/index_1"
    last_message_id = $(".top_messages").children().last().attr("id")
    match_id = $(document).find(".message_match_c_user_id").val()
    data = { 
      last_id: last_message_id,
      match_id: match_id
    }
    
    $.ajax({
      url: url,
      data: data,
      dataType: "json",
      type: "GET"
    })
    .done(function(data){
      console.log(data)
      if (data.messages.length != 0){
        HTML = ``
        data.messages.forEach(function(message){
          message.content = message.content.replace(/\n/g, '<br>')
          HTML = HTML + ShowOtherMessageHTML(message, data.user)
        })
        $(document).find(".top_messages").append(HTML)
        scroll_height = $(document).find(".top_messages").get(0).scrollHeight
        $(document).find(".top_messages").scrollTop(scroll_height)
      }
    })
    .fail(function(){
      console.log("api通信失敗")
    })
  }
  var  reloadMessages_2 = function(){
    console.log("index_2")
    url = "/api/messages/index_2"
    last_message_id = $(document).find(".top_messages").children().last().attr("id")
    c_user_id = $(document).find(".message_match_c_user_id").val()
    if (c_user_id == 0){
      console.log("c-0")
      return 0
    }
    data = { 
      last_id: last_message_id,
      c_user_id: c_user_id
    }
    $.ajax({
      url: url,
      data: data,
      dataType: "json",
      type: "GET"
    })
    .done(function(data){
      if (data.messages.length != 0){
        HTML = ``
        data.messages.forEach(function(message){
          console.log(message.content)
          message.content = message.content.replace(/\n/g, '<br>')
          HTML = HTML + ShowOtherMessageHTML(message, data.c_user)
        })
        $(document).find(".top_messages").append(HTML)
        scroll_height = $(document).find(".top_messages").get(0).scrollHeight
        $(document).find(".top_messages").scrollTop(scroll_height)
      }
    })
    .fail(function(){
      console.log("通信失敗")
    })
  }
  var c_reloadMessages = function(){
    console.log("index_c")
    url = "/api/messages/index_c"
    user_id = $(document).find(".new_message_user_id").val()
    if (user_id == 0){
      return 0
    }
    last_id = $(document).find(".top_messages").children().last().attr("id")
    console.log(last_id)
    data = { 
      user_id: user_id,
      last_id: last_id
    }
    console.log(data)
    $.ajax({
      url: url,
      data: data,
      dataType: "json",
      type: "GET"
    })
    .done(function(data){
      console.log("c_api")
      console.log(data)
      if(data.messages.length !== 0){
        HTML = ``
        data.messages.forEach(function(message){
          message.content = message.content.replace(/\n/g, '<br>')
          HTML = HTML + ShowOtherMessageHTML(message, data.user)
        })
        $(document).find(".top_messages").append(HTML)
        scroll_height = $(document).find(".top_messages").get(0).scrollHeight
        $(document).find(".top_messages").scrollTop(scroll_height)
      }
    })
    .fail(function(){
      console.log("通信失敗")
    })
  }
  //繰り返し処理
    // \/はエスケープ処理をしたスラッシュ関数
  function reload(){
      // userの繰り返し関数
    if (document.location.href.match(/\/cmypage\/match_approvement/)){
      
    }
    else if (document.location.href.match(/\/mypage\/match/)){
      confirmBool()
    }
      // c_userの繰り返し関数
    else if (document.location.href.match(/\/cmypage\/match/)){
      c_reloadMessages()
    }
  }
  //繰り返し処理を繰り返す(ページ遷移したときに読み込まれるようにするため)
  setInterval(reload, 7000)
})
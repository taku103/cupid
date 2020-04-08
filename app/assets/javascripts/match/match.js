$(function(){
  $(document).on("click", ".image_link_create", function(){
    create_str = $(this).attr('id')
    create_id = create_str.replace(/[^0-9^\.]/g,"")
    console.log(create_id)
    url = "/cmypage/show_user"
    
    $.ajax({
      url: url,
      data: {create_id: create_id},
      type: "GET",
      dataType: "json",
      // data: {id: user_ids}

    })
    .done(function(data){
      console.log(data)
      console.log(data.users)
      let create_id = data.create_id
      let document_height = $(document).height()
      // 7行めに<img class="image" src="${data.users[0].image}">
      
      let backHTML = `<div class="select_container_background">`
      let selectHTML =`<ul class="select_container">`
      let ulHTML = `</ul>`
      let divHTML = `</div>`
      let HTML = backHTML
      if(data.users.length !== 0){
        HTML = HTML + selectHTML
        data.users.forEach(function(user, index){
          
          forUserHTML = buildForUserHTML(user, create_id)
          HTML = HTML + forUserHTML
          
          if(index == 3){
            HTML = HTML + ulHTML
            HTML = HTML + selectHTML
          }
          if(index == 7){
            HTML = HTML + ulHTML
            HTML = HTML + selectHTML
          }
          if(index == 11){
            HTML = HTML + ulHTML
            HTML = HTML + selectHTML
          }
        })
        HTML = HTML + ulHTML
      }
      
      HTML = HTML + divHTML
      ShowUserSelects(HTML)
      $(document).find(".select_container_background").height(document_height)
      // widthはやらないほうが良い
    })
  })
  $(document).on("click", "#imageBox_create_2", function(){
    console.log("イメージボックス２発火")
  })

  // ユーザーを選択

  $(document).on("click", ".selectBox", function(){
    // console.log(this)
    // console.log($(this).attr('id'))
    select_id = $(this).children(".selectBtn").attr('id')
    console.log(select_id)
    user_id = $(this).attr('id')
    url = "/cmypage/get_user_id"
    $.ajax({
      url: url,
      type: "GET",
      data: {user_id: user_id, select_id: select_id},
      dataType: "json"
    })
    .done(function(data){
      console.log(data)
      $(document).find(`.name#${data.select_id}`).text(data.user.nickname)
      $(document).find(`.number_id_${data.select_id}`).text(`会員id: ${data.user.id}`)
    })
    .fail(function(){
      alert("選択失敗")
    })
  })

  $(document).on("click", ".select_container_background", function(){
    $(this).remove()
  })

  // マッチング作成
  $(document).on("click", ".submitBtn#create_matchBtn", function(){
    console.log("マッチング作成イベント発生")
    url = "/cmypage/create_match"
    str_id_1 = $(document).find(".number_id_1").text()
    str_id_2 = $(document).find(".number_id_2").text()
    sn_id_1 = str_id_1.replace(/[^0-9^\.]/g,"")
    sn_id_2 = str_id_2.replace(/[^0-9^\.]/g,"")
    user_id_1 = parseInt(sn_id_1, 10)
    user_id_2 = parseInt(sn_id_2, 10)
    console.log(user_id_1)
    console.log(str_id_1)
    console.log(sn_id_1)
    match_form = $(this).parent().parent().parent()[0]
    // data_plus = {user_id_1: user_id_1, user_id_2: user_id_2}
    formData = new FormData(match_form)
    formData.append("user_id_1", user_id_1)
    formData.append("user_id_2", user_id_2)
    // console.log(match_form)
    // let data = $.extend({}, data_plus, formData)
    // console.log(data)
    $.ajax({
      url: url,
      data: formData,
      dataType: "json",
      type: "POST",
      processData: false,
      contentType: false
    })
  })

  $(document).on("click", ".match_c_user_imageBtn", function(e){
    e.preventDefault()
    url = "/mypage/show_message"
    c_user_id = $(this).attr("id")
    data = {c_user_id: c_user_id}

    // 通信前にc_userのhiddenfieldの情報に書き換えていく
    $(document).find(".bottom_message").find(".message_bool").val(0)
    $(document).find(".bottom_message").find(".message_match_c_user_id").val(c_user_id)

    $.ajax({
      url: url,
      data: data,
      dataType: "json",
      type: "GET"
    })
    .done(function(data){
      console.log("メッセージとユーザーの表示成功")
      console.log(data)
      MessageHTML = ``
      UserHTML = ``
      
      data.users.forEach(function(user){
        UserHTML = UserHTML + ShowUserImageHTML(user)
      })
      $(document).find(".user_list").remove()
      $(document).find(".user_listsBox").prepend(UserHTML)
      data.messages.forEach(function(message){
        if (message.content !== ''){
          message.content = message.content.replace(/\n/g,'<br>')
        }
        if (message.bool == 0){
          MessageHTML = MessageHTML + ShowMessage0HTML(message)
        }
        else if (message.bool == 2){
          MessageHTML = MessageHTML + ShowMessage2HTML(message, data.c_user)
        }
      })
      $(document).find(".top_messages").empty()
      $(".top_messages").prepend(MessageHTML)
    })
    .fail(function(){
      console.log("表示失敗")
    })
  })
  $(document).on("click", ".match_user_imageBox", function(){
    url = "/mypage/show_user_message"
    user_id = $(this).attr("id")
    data = { user_id: user_id }

    $.ajax({
      url: url,
      data: data,
      dataType: "json",
      type: "GET"
    })
    .done(function(data){
      console.log("ユーザーメッセージ取得成功")
      console.log(data)
      // ユーザーアイコンクリックの時の処理
      $(document).find(".bottom_message").find(".message_bool").val(1)
      $(document).find(".bottom_message").find(".message_match_c_user_id").val(data.match_id)

      HTML = ``
      console.log(data.messages)
      $(document).find(".top_messages").empty()
      data.messages.forEach(function(message){
        message.content = message.content.replace(/\n/, '<br>')
        if (message.user_id == data.user.id){
          HTML = HTML + ShowOtherMessage1HTML(message, data.user)
        }
        else if(message.user_id != data.user_id){
          HTML = HTML + ShowMyMessage1HTML(message)
        } 
      })

      $(document).find(".top_messages").append(HTML)
    })
    .fail(function(){
      alert("ユーザーメッセージ取得失敗")
    })
  })

  // c_userのmatch表示機能

  $(document).on("click", ".match_user_imageBtn_up", function(){
    url = "/cmypage/show_message"
    user_id = $(this).attr("id")
    data = {user_id: user_id}
    $.ajax({
      url: url,
      data: data,
      dataType: "json",
      type: "GET"
    })
    .done(function(data){
      UserImageHTML = ``
      data.users.forEach(function(u){
        UserImageHTML = UserImageHTML + ShowUserImageHTML(u)
      })
      $(document).find(".middle_user_container").children(".user_listsBox").empty()
      $(document).find(".middle_user_container").children(".user_listsBox").append(UserImageHTML)
      MessageHTML = ``
      data.messages.forEach(function(message){
        message.content = message.content.replace(/\n/g, '<br>')
        if (message.bool == 0){
          MessageHTML = MessageHTML + ShowGetMessageHTML(message, data.user)
        }
        else if (message.bool == 2){
          MessageHTML = MessageHTML + ShowSendMessageHTML(message)
        }
      })
      $(document).find(".top_messages").empty()
      $(document).find(".top_messages").append(MessageHTML)
    })
    .fail(function(){
      alert("マッチングユーザーゲット失敗")
    })
  })
  $(document).on("click", ".match_user_imageBtn_down", function(){
    url = "/cmypage/show_user_message"
    user_id = $(this).attr("id")
    data = { user_id: user_id }
    $.ajax({
      url: url,
      data: data,
      dataType: "json",
      type: "GET"
    })
    .done(function(data){
      $(document).find(".top_messages").empty()
      MessageHTML = ``
      data.messages.forEach(function(message){
        message.content = message.content.replace(/\n/g, '<br>')
        if (message.bool == 0){
          MessageHTML = MessageHTML + ShowGetMessageHTML(message, data.user)
        }
        else if (message.bool == 2){
          MessageHTML = MessageHTML + ShowSendMessageHTML(message)
        }
      })
      $(document).find(".top_messages").append(MessageHTML)
    })
    .fail(function(){
      alert("下段ユーザのメッセージ取得失敗")
    })
  })

  

  // 前提関数
  function ShowUserSelects(html){
    $(document).find(".show_select_containerBox").append(html)
  }
  function buildForUserHTML(user, create_id){
    forUserHTML =
    `
    <li class="listBox">
      <div class="imageBox">
        <div class="image_link">

        </div>
      </div>
      <div class="bottomBox">
        <div class="nameBox">
          ${user.nickname}
        </div>
        <div class="love_sustainableBox">
          <i class="fas fa-heart">
          </i>
          80.0%
        </div>
        <div class="followerBox">
          <i class="fas fa-user-graduate">
          </i>
          137人
        </div>
        <div class="specialtyBox">
          <div class="text">
            <i class="fas fa-star">
            </i>
            得意分野
            <i class="fas fa-star">
            </i>
          </div>
          愛知県長久手町でのデートプラン
        </div>
        <div class="selectBox" id="${user.id}">
          <div class="selectBtn" id="${create_id}">
            選択
          </div>
        </div>
      </div>
    </li>
    `
    return forUserHTML
  }

    // show_messageのuser_image表示関数
  function ShowUserImageHTML(user){
    HTML = 
    `
    <li class="user_list">
      <div class="match_user_imageBox" id=${user.id}>
        <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="match_user_imageBtn" id=${user.id}>
      </div>
    </li>
    `

    return HTML
  }
    // メッセージ関数
  function ShowMessage0HTML(message){
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
  function ShowMessage2HTML(message, c_user){
    HTML = `
    <div class="partsBox" id="${message.id}">
      <div class="imageBox">
        <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="image">
      </div>
      <div class="name_messageBox">
        <div class="nameBox">
          ${c_user.nickname}
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
  function ShowMyMessage1HTML(message){
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
  function ShowOtherMessage1HTML(message, user){
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
  function ShowUserImageHTML(user){
    HTML = 
    `
    <li class="user_list">
      <div class="imageBox">
        <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="match_user_imageBtn_down" id="${user.id}">
      </div>
    </li>
    `
    return HTML
  }
  function ShowGetMessageHTML(message, user){
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
  function ShowSendMessageHTML(message){
    HTML = 
    `
    <div class="my_messageBox">
      <div class="text">
        ${message.content}
      </div>
    </div>
    `
    return HTML
  }

  // 前提定数
  
})
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
  // 前提定数
  
})
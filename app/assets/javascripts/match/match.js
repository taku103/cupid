$(function(){
  $(document).on("click", ".image_link_create", function(){
    console.log("イメージボックス発火")
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
      // processData: false,
      // contentType: false
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
      
      /*
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
          <div class="selectBox" id="${data.users[0].id}">
            <div class="selectBtn">
              選択
            </div>
          </div>
        </div>
      </li>
      `
      */

      
      let HTML = backHTML
      let i = 0
      if(data.users.length !== 0){
        HTML = HTML + selectHTML
        data.users.forEach(function(user){
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
          HTML = HTML + forUserHTML
        })
          
        
        HTML = HTML + ulHTML
        i = i + 1
      }
      if(data.users.length > 4){
        HTML = HTML + selectHTML
        for(var k=0; k<4; k++){
          HTML = HTML + forUserHTML
        }
        HTML = HTML + ulHTML
        i = i + 1
      }
      if(data.users.length > 8){
        HTML = HTML + selectHTML
        for(var k=0; k<4; k++){
          HTML = HTML + forUserHTML
        }
        HTML = HTML + ulHTML
        i = i + 1
      }
      if(data.users.length > 12){
        HTML = HTML + selectHTML
        for(var k=0; k<4; k++){
          HTML = HTML + forUserHTML
        }
        HTML = HTML + ulHTML
        i = i + 1
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
      
    })
    .fail(function(){
      alert("選択失敗")
    })
  })

  $(document).on("click", ".select_container_background", function(){
    $(this).remove()
  })
  // 前提関数
  function ShowUserSelects(html){
    $(document).find(".show_select_containerBox").append(html)
  }
  // 前提定数
  // showMatchCreateOneHTML =
  // `
  
  // `
  // showMatchCreateTwoHTML =
  // `
  
  // `
})
$(function(){
  $(document).on("click", ".followBtn", function(e){
    e.preventDefault()
    //[0]を付け足すことでjQueryオブジェクトからHTMLFormElementに変換している。ちなみにfollowBtnはHTMLFormElement。普通のHTMLFormの要素が入れられており、この要素に変換しないと、FormDataが送れない。
    follow_form = $(this).parent()[0]
    console.log(this)
    console.log(follow_form)
    // follow_form = $(this).parent()
    // console.log(follow_form)
    url = $(follow_form).attr("action")
    // url = $(document).find(this)
    // url = "mypage/search"
    console.log(url)
    formData = new FormData(follow_form)
    console.log(formData)
    // formData.append("user_id", $(this).children("follow_hidden").val())
    
    console.log(formData)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      alert("フォロー成功")
      console.log(data.c_user_id)
      // followedBox = $(document).find(`.followBox#${data.c_user_id}`)
      // followedBox.className = "followedBox"
      // followedBtn = followedBox.children(".followBtn")
      // followedBtn.className =  "followedBtn" 
      $(document).find(`.followBox#${data.c_user_id}`).attr("class", "followedBox")
      $(document).find(`.followedBox#${data.c_user_id}`).find(".followBtn").attr("class", "followedBtn")
      if(data.bool == 0){
        $(document).find(`.followedBox#${data.c_user_id}`).find(".followedBtn").attr("value", "＋フォロー")
      }else if(data.bool == 1){
        $(document).find(`.followedBox#${data.c_user_id}`).find(".followedBtn").attr("value", "フォロバ")
      }
      $(document).find(`.followedBox#${data.c_user_id}`).children(".follow_form").attr("action", "/mypage/destroy_follow")
      
      buildHTML = 
      `
      
      `
    })
    .fail(function(){
      alert("フォロー失敗")
    })
  })
  $(document).on("click", ".followedBtn", function(){
    let followed_form = $(this).parent()[0]
    console.log(followed_form)
    url = $(followed_form).attr("action")
    console.log(url)
    formData = new FormData(followed_form)
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      alert("フォロー解除成功")
      if(data.bool == 0){
        $(document).find(`.followedBox#${data.c_user_id}`).find(".followedBtn").attr("value", "＋フォロー")
        // alert("＋フォロー")
      }else if(data.bool == 1){
        $(document).find(`.followedBox#${data.c_user_id}`).find(".followedBtn").removeAttr("value")
        $(document).find(`.followedBox#${data.c_user_id}`).find(".followedBtn").attr("value", "フォロバ")
        // alert("フォロバ＋")
      }
      $(document).find(`.followedBox#${data.c_user_id}`).attr("class", "followBox")
      $(document).find(`.followBox#${data.c_user_id}`).find(".followedBtn").attr("class", "followBtn")
      
      $(document).find(`.followBox#${data.c_user_id}`).children(".follow_form").attr("action", "/mypage/create_follow")
    })
    .fail(function(){
      alert("フォロー解除失敗")
    })
  })
  $(document).on({
    'mouseenter': function(){
      showFollowListHTML(buildFollowListHTML)
    },
    'mouseleave': function(){
      deleteFollowListHTML()
    }
  },
    '#user_nav_link_3'
  )


  // 予め定義する関数

  function showFollowListHTML(html){
    $(document).find("#user_nav_link_3").append(html)
  }
  function deleteFollowListHTML(){
    $(document).find("#user_nav_link_3").children(".follow_ancynchronous_container").remove()
  }


  // 予め定義する定数

  buildFollowListHTML =
  `
  <div class="follow_ancynchronous_container">
    <a href="/mypage/follow" class="follow_listBox">
      フォローリスト
    </a>
    <a href="/mypage/follower" class="followed_listBox">
      フォロワーリスト
    </div>
  </div>
  `

})
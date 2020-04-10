$(function(){
  $(document).on("click", ".followBtn", function(e){
    e.preventDefault()
    //[0]を付け足すことでjQueryオブジェクトからHTMLFormElementに変換している。ちなみにfollowBtnはHTMLFormElement。普通のHTMLFormの要素が入れられており、この要素に変換しないと、FormDataが送れない。
    follow_form = $(this).parent()[0]
    console.log(this)
    console.log(follow_form)
    url = $(follow_form).attr("action")
    formData = new FormData(follow_form)
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
      $(document).find(`.followBox#${data.c_user_id}`).attr("class", "followedBox")
      $(document).find(`.followedBox#${data.c_user_id}`).find(".followBtn").attr("class", "followedBtn")
      if(data.bool == 0){
        $(document).find(`.followedBox#${data.c_user_id}`).find(".followedBtn").attr("value", "＋フォロー")
      }else if(data.bool == 1){
        $(document).find(`.followedBox#${data.c_user_id}`).find(".followedBtn").attr("value", "フォロバ")
      }
      $(document).find(`.followedBox#${data.c_user_id}`).children(".follow_form").attr("action", "/mypage/destroy_follow")
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
      }else if(data.bool == 1){
        $(document).find(`.followedBox#${data.c_user_id}`).find(".followedBtn").removeAttr("value")
        $(document).find(`.followedBox#${data.c_user_id}`).find(".followedBtn").attr("value", "フォロバ")
      }
      $(document).find(`.followedBox#${data.c_user_id}`).attr("class", "followBox")
      $(document).find(`.followBox#${data.c_user_id}`).find(".followedBtn").attr("class", "followBtn")
      
      $(document).find(`.followBox#${data.c_user_id}`).children(".follow_form").attr("action", "/mypage/create_follow")
    })
    .fail(function(){
      alert("フォロー解除失敗")
    })
  })
  $(document).on("click", ".c_followBtn", function(){
    follow_form = $(this).parent()[0]
    url = $(follow_form).attr("action")
    formData = new FormData(follow_form)
    $.ajax({
      url: url,
      data: formData,
      dataType: "json",
      type: "POST",
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log("フォロー成功")
      $(document).find(`.followBox#${data.user_id}`).attr("class", "followedBox")
      $(document).find(`.followedBox#${data.user_id}`).find(".c_followBtn").attr("class", "c_followedBtn")
      if(data.bool == 2){
        $(document).find(`.followedBox#${data.user_id}`).find(".c_followedBtn").attr("value", "＋フォロー")
      }else if(data.bool == 1){
        $(document).find(`.followedBox#${data.user_id}`).find(".c_followedBtn").attr("value", "フォロバ")
      }
      $(document).find(`.followedBox#${data.user_id}`).children(".c_follow_form").attr("action", "/cmypage/destroy_follow")
    })
    .fail(function(){
      console.log("フォロー失敗")
    })
  })
  $(document).on("click", ".c_followedBtn", function(){
    let followed_form = $(this).parent()[0]
    url = $(followed_form).attr("action")
    formData = new FormData(followed_form)
    $.ajax({
      url: url,
      data: formData,
      dataType: "json",
      type: "POST",
      processData: false,
      contentType: false
    })
    .done(function(data){
      alert("削除成功")
      if(data.bool == 2){
        $(document).find(`.followedBox#${data.user_id}`).find(".c_followedBtn").attr("value", "＋フォロー")
      }else if(data.bool == 1){
        $(document).find(`.followedBox#${data.user_id}`).find(".c_followedBtn").removeAttr("value")
        $(document).find(`.followedBox#${data.user_id}`).find(".c_followedBtn").attr("value", "フォロバ")
      }
      $(document).find(`.followedBox#${data.user_id}`).attr("class", "followBox")
      $(document).find(`.followBox#${data.user_id}`).find(".c_followedBtn").attr("class", "c_followBtn")
      
      $(document).find(`.followBox#${data.user_id}`).children(".c_follow_form").attr("action", "/cmypage/create_follow")
    })
    .fail(function(){
      alert("削除失敗")
    })
  })
})
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
      // alert("フォロー成功")
      console.log($(document).find(`#${data.c_user_id}.followBox`))
      $(document).find(`#${data.c_user_id}.followBox`).attr("class", "followedBox")
      $(document).find(`#${data.c_user_id}.followedBox`).find(".followBtn").attr("class", "followedBtn")
      if(data.bool == 0){
        $(document).find(`#${data.c_user_id}.followedBox`).find(".followedBtn").attr("value", "＋フォロー")
      }else if(data.bool == 1){
        $(document).find(`#${data.c_user_id}.followedBox`).find(".followedBtn").attr("value", "フォロバ")
      }
      $(document).find(`#${data.c_user_id}.followedBox`).children(".follow_form").attr("action", "/mypage/destroy_follow")
    })
    .fail(function(){
      alert("フォロー失敗")
    })
  })
  $(document).on("click", ".followedBtn", function(e){
    e.preventDefault()
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
        $(document).find(`#${data.c_user_id}.followedBox`).find(".followedBtn").attr("value", "＋フォロー")
      }else if(data.bool == 1){
        $(document).find(`#${data.c_user_id}.followedBox`).find(".followedBtn").removeAttr("value")
        $(document).find(`#${data.c_user_id}.followedBox`).find(".followedBtn").attr("value", "フォロバ")
      }
      $(document).find(`#${data.c_user_id}.followedBox`).attr("class", "followBox")
      $(document).find(`#${data.c_user_id}.followBox`).find(".followedBtn").attr("class", "followBtn")
      
      $(document).find(`#${data.c_user_id}.followBox`).children(".follow_form").attr("action", "/mypage/create_follow")
    })
    .fail(function(){
      alert("フォロー解除失敗")
    })
  })
  $(document).on("click", ".c_followBtn", function(e){
    e.preventDefault()
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
      $(document).find(`#${data.user_id}.followBox`).attr("class", "followedBox")
      $(document).find(`#${data.user_id}.followedBox`).find(".c_followBtn").attr("class", "c_followedBtn")
      if(data.bool == 2){
        $(document).find(`#${data.user_id}.followedBox`).find(".c_followedBtn").attr("value", "＋フォロー")
      }else if(data.bool == 1){
        $(document).find(`#${data.user_id}.followedBox`).find(".c_followedBtn").attr("value", "フォロバ")
      }
      $(document).find(`#${data.user_id}.followedBox`).children(".c_follow_form").attr("action", "/cmypage/destroy_follow")
    })
    .fail(function(){
      console.log("フォロー失敗")
    })
  })
  $(document).on("click", ".c_followedBtn", function(e){
    e.preventDefault()
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
        $(document).find(`#${data.user_id}.followedBox`).find(".c_followedBtn").attr("value", "＋フォロー")
      }else if(data.bool == 1){
        $(document).find(`#${data.user_id}.followedBox`).find(".c_followedBtn").removeAttr("value")
        $(document).find(`#${data.user_id}.followedBox`).find(".c_followedBtn").attr("value", "フォロバ")
      }
      $(document).find(`#${data.user_id}.followedBox`).attr("class", "followBox")
      $(document).find(`#${data.user_id}.followBox`).find(".c_followedBtn").attr("class", "c_followBtn")
      
      $(document).find(`#${data.user_id}.followBox`).children(".c_follow_form").attr("action", "/cmypage/create_follow")
    })
    .fail(function(){
      alert("削除失敗")
    })
  })
})
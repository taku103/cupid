$(function(){
  $(document).on('click', '.add_main_imageBtn', function(){
    let CSRFValue = $(document).find(".update_profile_form").children('input[name="authenticity_token"]').val()
    let mainImageHTML = MainImageHTML(CSRFValue)
    $(document).find(".add_container").append(mainImageHTML)
    window_height = $(document).height()
    $(document).find(".background_container").height(window_height)
    $(document).find(".upload_file").css("display", "none")
  })
  $(document).on('change', '.upload_file', function(){
    console.log($('input[type="file"]'))
    let fileReader = new FileReader();
    let files = $(this).first().prop('files')[0]
    fileReader.readAsDataURL(files)
    fileReader.onloadend = function(){
      console.log("fileReaderのロードが完了しました")
      let src = fileReader.result
      console.log(src)
      $(document).find(".added_image").attr("src", src)
    }
  })
  $(document).on('click', '.background_container', function(){
    $(this).remove()
    $(document).find(".add_image_container").remove()
  })
  //サブイメージの投稿

  $(document).on("click", ".add_sub_imageBtn", function(){
    let CSRFValue = $(document).find(".update_profile_form").children('input[name="authenticity_token"]').val()
    let subImageHTML = SubImageHTML(CSRFValue)
    $(document).find(".add_container").append(subImageHTML)
    window_height = $(document).height()
    $(document).find(".background_container").height(window_height)
    $(document).find(".upload_sub_file").css("display", "none")
  })

  $(document).on("change", ".upload_sub_file", function(){
    let fileReader = new FileReader();
    let files = $(this).first().prop('files')[0]
    let num = $(this).attr("id")
    console.log(`idは${num}です`)
    fileReader.readAsDataURL(files)
    fileReader.onloadend = function(){
      console.log("fileReaderのロードが完了しました")
      let src = fileReader.result
      // console.log(src)
      // $(document).find(".added_image").attr("src", src)
      $(document).find(`#${num}.upload_sub_file`).parent().find(".added_image").attr("src", src)
    }
  })

  // トプ画表示機能
  $(document).on('click', '.slide_image', function(){
    image_id = $(this).attr('id')
    if (image_id == "image0"){ return }
    src = $(this).attr('src')
    $(document).find('.top_image').attr('src', src)
    $(document).find('.top_image').attr('id', image_id)
  })
  $(document).on('click', '.add_main_imageBtn', function(){
    image_id = $(this).children(".slide_image").attr("id")
    if (image_id == "image0"){ return }
    src = $(this).children(".slide_image").attr("src")
    $(document).find('.top_image').attr('src', src)
    $(document).find('.top_image').attr('id', image_id)
  })
  // 特定imageの削除
  $(document).on('click', '.image_deleteBtn', function(){
    let image_id = $(document).find(".top_image").attr("id")
    let num = image_id.replace(/[^0-9]/g, '')
    if (num == "0"){ return }
    let url = '/mypage/delete_image'
    let data = { id: num }
    $.ajax({
      url: url,
      type: "GET",
      data: data,
      dataType: "json"
    })
    .done(function(data){
      if (data.bool == 0){
        let src = "/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png"
        $(document).find(".top_image").attr('src', src)
        $(document).find(".top_image").attr('id', "image0")
        $(document).find(`#image${data.image_id}.slide_image`).remove()
        noSlideImageHTML = NoSlideImageHTML()
        $(document).find(".image_container").prepend(noSlideImageHTML)
      }else if (data.bool == 1){
        $(document).find(`#image${data.image_id}.slide_image`).remove()
        let src = "/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png"
        let id = "image0"
        if ($(document).find(".image_container").children().first().attr("class") == "add_main_imageBtn"){
          src = $(document).find(".image_container").children().eq(1).attr("src")
          id = $(document).find(".image_container").children().eq(1).attr("id")
          // $(document).find(".top_image").attr("src", src)
          // $(document).find(".top_image").attr("id", id)
        }
        else{
          let image_id = $(document).find(".slide_image").first().attr("id")
          console.log(image_id)
          id = image_id.replace(/[^0-9]/g, '')
          src = $(document).find(".slide_image").first().attr("src")
        }
        $(document).find(".top_image").attr('src', src)
        $(document).find(".top_image").attr('id', id)
      }
      image_container = $(document).find(".image_container")
      console.log(image_container.children().length)
      console.log(image_container.children('.add_main_imageBtn').length)
      if (image_container.children().length == 2 && image_container.children('.add_main_imageBtn').length != 0){
        let src = "/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png"
        $(document).find(".top_image").attr('src', src)
        $(document).find(".top_image").attr('id', "image0")
      }
    })
    .fail(function(){
      alert('写真削除失敗')
    })
  })

  // 前提関数

  function NoSlideImageHTML(){
    html = 
    `
    <div class="add_main_imageBtn">
      <img class="slide_image" src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png">
      <div class="text">
        ＋メイン写真
      </div>
    </div>
    `
    return html
  }

  function SubImageHTML(CSRFValue){
    html = 
    `
    <div class="background_container">
    </div>
    <div class="add_image_container">
      <div class="imageBtn">
        <form method="POST" accept-charset="UTF-8" class="upload_image_form" action="/mypage/add_sub_image" enctype="multipart/form-data">
          <input type="hidden" name="authenticity_token" value="${CSRFValue}">
          <label class="image_label">
            <div class="added_imageBox">
              <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="added_image">
              <div class="text">＋写真をアップロード</div>
            </div>
            <input type="file" name="image[image][]" class="upload_sub_file" id="one">
          </label>
          <label class="image_label">
            <div class="added_imageBox">
              <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="added_image">
              <div class="text">＋写真をアップロード</div>
            </div>
            <input type="file" name="image[image][]" class="upload_sub_file" id="two">
          </label>
          <label class="image_label">
            <div class="added_imageBox">
              <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="added_image">
              <div class="text">＋写真をアップロード</div>
            </div>
            <input type="file" name="image[image][]" class="upload_sub_file" id="three">
          </label>
          <input type="submit" class="submit_main_image">
        </form>
      </div>
    </div>
    `
    return html
  }
  function MainImageHTML(CSRFValue){
    html = 
    `
    <div class="background_container">
    </div>
    <div class="add_image_container">
      <div class="imageBtn">
        <form method="POST" accept-charset="UTF-8" class="upload_image_form" action="/mypage/add_main_image" enctype="multipart/form-data">
          <input type="hidden" name="authenticity_token" value="${CSRFValue}">
          <label class="image_label">
            <div class="added_imageBox">
              <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="added_image">
              <div class="text">＋写真をアップロード</div>
            </div>
            <input type="file" name="image[image]" class="upload_file" id="image_image">
          </label>
          <input type="submit" class="submit_main_image">
        </form>
      </div>
    </div>
    `
    return html
  }

  // 前提定数
})
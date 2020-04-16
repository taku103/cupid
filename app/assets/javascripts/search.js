$(function(){
  //
  //
  //
  //クリックで詳細を表示
  /*$(document).on("click", ".image_link", function(){
    // imageのところにgifも入れられるようにしたい

    //以下の2行はdocument.heightで取得可能（３行とも意味ない）
    // side_bar_height = $(document).find(".nav_side").height()
    // window_height = side_bar_height + 75
    // c_user_detail_height = $(document).find(".c_user_detail").height()

    scroll_height = $(window).scrollTop()
    scroll_left = $(window).scrollLeft()
    document_height = $(document).height()
    document_width = $(document).width()
    console.log(document_height)
    
    //HTML生成
    html = 
    `
    <div class="c_user_detail">
      <div class="c_user_detail_container">
        <div class="detailBox">
          <div class="top_contents">
            <div class="top_side_bar">
              <div class="tellBox">
              </div>
              <div class="messageBox">
              </div>
            </div>
            <div class="main_image">
            </div>
            <div class="bottom_slide_image">
            </div>
          </div>
          <div class="main_detail">
            <div class="bottom_side_bar">
            // </div>
              <div class="profile_container">
                <div class="name">
                  <div class="text">
                    名前：
                  </div>
                  たくみ
                </div>
                <div class="age">
                  <div class="text">
                    年齢：
                  </div>
                  22歳
                </div>
                <div class="sex">
                  <div class="text">
                    性別：
                  </div>
                  男
                </div>
                <div class="student_numberBox">
                  <div class="text">
                    生徒数：
                  </div>
                    22人
                </div>
                <div class="follower">
                  <div class="text">
                    フォロワー
                  </div>
                  59人
                </div>
                <div class="speciality">
                  <div class="text">
                    得意分野
                  </div>
                  クラッシックの音楽デートプラン
                </div>
                <div class="love_sutainable">
                  <div class="text">
                    恋愛持続率
                  </div>
                  80.0%
                </div>
                <div class="educational_background">
                  <div class="text">
                    学歴
                  </div>
                  高卒
                </div>
                <div class="work_experience">
                  <div class="text">
                    職歴
                  </div>
                  ナッシング
                </div>
              </div>
              <div class="profile">
                <div class="text">
                  プロフィール
                </div>
                <div class="profile_text">
                  どうも、職業天使を専業でやっているたくみと申します。
                  あなたの理想に近い素敵な人と巡り合わせるのが私の使命。
                  なんなりとお申し付けください。
                  また、巡り合わせた後のフォローバックも欠かしません。
                  あなたの幸せを最大限長続きさせるよう尽力することをお約束いたします。
                  愛知県のクラッシック音楽デートプラン、30代の恋活、婚活サポートを得意としております
                  興味を持たれた方は一度メッセージでライブチャット面談の日程を決めたく存じます。
                  よろしくお願いいたします。
                </div>
              </div>
              <div class="make_a_callBox">
                <button class="make_a_call">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    $(".c_user_information").append(html)
    //HTML生成完了

    //薄白い背景のの高さ、幅指定
    $(document).find(".c_user_detail").height(document_height)
    $(document).find(".c_user_detail").width(document_width)

    //要素の高さ指定
    $(document).find(".c_user_detail_container").offset({top: scroll_height, left: scroll_left})
  })
  */
  //
  //
  //
  //クリックで詳細を削除
  $(document).on("click", ".c_user_detail", function(){
    $(".c_user_detail").remove()
  })
  $(document).on("click", ".c_image_link",function(){
    c_user_id = $(this).attr("id")
    // console.log(c_user_id)
    url = "/mypage/show_c_detail"
    data = {c_user_id: c_user_id}
    $.ajax({
      url: url,
      data: data,
      type: "GET",
      dataType: "json"
    })
    .done(function(data){
      console.log("詳細データ取得成功")
      console.log(data.c_user.id)
      scroll_height = $(window).scrollTop()
      scroll_left = $(window).scrollLeft()
      document_height = $(document).height()
      document_width = $(document).width()
      HTML = buildCUserHTML(data.c_user)
      $(".c_user_information").append(HTML)
      //薄白い背景のの高さ、幅指定
      $(document).find(".c_user_detail").height(document_height)
      $(document).find(".c_user_detail").width(document_width)
      //要素の高さ指定
      $(document).find(".c_user_detail_container").offset({top: scroll_height, left: scroll_left})
    })
    .fail(function(){
      console.log("詳細データ取得失敗")
    })
  })
  $(document).on("click", ".image_link", function(){
    user_id = $(this).attr("id")
    url = "/cmypage/show_detail"
    data = { user_id: user_id }
    $.ajax({
      url: url,
      data: data,
      type: "GET",
      dataType: "json"
    })
    .done(function(data){
      console.log("ユーザーskyway取得成功")
      console.log(data)
      HTML = buildUserHTML(data.user)
      $(document).find(".user_information").append(HTML)
      
    })
    .fail(function(){
      console.log("ユーザーskyway失敗")
    })
  })
  $(document).on("click", ".user_detail", function(){
    $(document).find(".user_detail").remove()
  })

  // 前提関数
  function buildCUserHTML(c_user){
    html = 
    `
    <div class="c_user_detail">
      <div class="c_user_detail_container">
        <div class="detailBox">
          <div class="top_contents">
            <div class="top_side_bar">
              <div class="tellBox">
              </div>
              <div class="messageBox">
              </div>
            </div>
            <div class="main_image">
            </div>
            <div class="bottom_slide_image">
            </div>
          </div>
          <div class="main_detail">
            <div class="bottom_side_bar">
            </div>
              <div class="profile_container">
                <div class="c_user_id" id="show_details">
                  ${c_user.id}
                </div>
                <div class="name">
                  <div class="text">
                    名前：
                  </div>
                  ${c_user.nickname}
                </div>
                <div class="age">
                  <div class="text">
                    年齢：
                  </div>
                  22歳
                </div>
                <div class="sex">
                  <div class="text">
                    性別：
                  </div>
                  男
                </div>
                <div class="student_numberBox">
                  <div class="text">
                    生徒数：
                  </div>
                    22人
                </div>
                <div class="follower">
                  <div class="text">
                    フォロワー
                  </div>
                  59人
                </div>
                <div class="speciality">
                  <div class="text">
                    得意分野
                  </div>
                  クラッシックの音楽デートプラン
                </div>
                <div class="love_sutainable">
                  <div class="text">
                    恋愛持続率
                  </div>
                  80.0%
                </div>
                <div class="educational_background">
                  <div class="text">
                    学歴
                  </div>
                  高卒
                </div>
                <div class="work_experience">
                  <div class="text">
                    職歴
                  </div>
                  ナッシング
                </div>
              </div>
              <div class="profile">
                <div class="text">
                  プロフィール
                </div>
                <div class="profile_text">
                  どうも、職業天使を専業でやっているたくみと申します。
                  あなたの理想に近い素敵な人と巡り合わせるのが私の使命。
                  なんなりとお申し付けください。
                  また、巡り合わせた後のフォローバックも欠かしません。
                  あなたの幸せを最大限長続きさせるよう尽力することをお約束いたします。
                  愛知県のクラッシック音楽デートプラン、30代の恋活、婚活サポートを得意としております
                  興味を持たれた方は一度メッセージでライブチャット面談の日程を決めたく存じます。
                  よろしくお願いいたします。
                </div>
              </div>
              <div class="make_a_callBox" id="0">
                <a href="/mypage/skyway?c_user_id=${c_user.id}">リアルタイム通話する</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    return html
  }
  function buildUserHTML(user){
    html = 
    `
    <div class="user_detail">
      <div class="user_detail_container">
        <div class="detailBox">
          <div class="top_contents">
            <div class="top_side_bar">
              <div class="tellBox">
              </div>
              <div class="messageBox">
              </div>
            </div>
            <div class="main_image">
            </div>
            <div class="bottom_slide_image">
            </div>
          </div>
          <div class="main_detail">
            <div class="bottom_side_bar">
            </div>
              <div class="profile_container">
                <div class="user_id" id="show_details">
                  ${user.id}
                </div>
                <div class="name">
                  <div class="text">
                    名前：
                  </div>
                  ${user.nickname}
                </div>
                <div class="age">
                  <div class="text">
                    年齢：
                  </div>
                  22歳
                </div>
                <div class="sex">
                  <div class="text">
                    性別：
                  </div>
                  男
                </div>
                <div class="student_numberBox">
                  <div class="text">
                    生徒数：
                  </div>
                    22人
                </div>
                <div class="follower">
                  <div class="text">
                    フォロワー
                  </div>
                  59人
                </div>
                <div class="speciality">
                  <div class="text">
                    得意分野
                  </div>
                  クラッシックの音楽デートプラン
                </div>
                <div class="love_sutainable">
                  <div class="text">
                    恋愛持続率
                  </div>
                  80.0%
                </div>
                <div class="educational_background">
                  <div class="text">
                    学歴
                  </div>
                  高卒
                </div>
                <div class="work_experience">
                  <div class="text">
                    職歴
                  </div>
                  ナッシング
                </div>
              </div>
              <div class="profile">
                <div class="text">
                  プロフィール
                </div>
                <div class="profile_text">
                  どうも、職業天使を専業でやっているたくみと申します。
                  あなたの理想に近い素敵な人と巡り合わせるのが私の使命。
                  なんなりとお申し付けください。
                  また、巡り合わせた後のフォローバックも欠かしません。
                  あなたの幸せを最大限長続きさせるよう尽力することをお約束いたします。
                  愛知県のクラッシック音楽デートプラン、30代の恋活、婚活サポートを得意としております
                  興味を持たれた方は一度メッセージでライブチャット面談の日程を決めたく存じます。
                  よろしくお願いいたします。
                </div>
              </div>
              <div class="make_a_callBox" id="1">
                <a href="/cmypage/skyway?user_id=${user.id}">リアルタイム通話する</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    return html
  }
})


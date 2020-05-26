$(function(){

  //クリックで詳細を削除
  $(document).on("click", ".c_user_detail", function(){
    $(document).find(".c_user_detail").remove()
    $(document).find(".c_user_detail_container").remove()
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
      HTML = buildCUserHTML(data.c_user, data.image, data.follower_length, data.student_length, data.sub_images)
      $(".c_user_information").append(HTML)
      //薄白い背景の高さ、幅指定
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
      scroll_height = $(window).scrollTop()
      scroll_left = $(window).scrollLeft()
      document_height = $(document).height()
      document_width = $(document).width()
      HTML = buildUserHTML(data.user, data.image, data.follower_length, data.student_length, data.sub_images)
      $(document).find(".user_information").append(HTML)
      $(document).find(".user_detail").height(document_height)
      $(document).find(".user_detail").width(document_width)
      //要素の高さ指定
      $(document).find(".user_detail_container").offset({top: scroll_height, left: scroll_left})
    })
    .fail(function(){
      console.log("ユーザーskyway失敗")
    })
  })
  $(document).on("click", ".user_detail", function(){
    $(document).find(".user_detail").remove()
    $(document).find(".user_detail_container").remove()
  })
  $(document).on("click", ".icon", function(){
    src = $(this).attr("src")
    $(document).find(".main_image").attr("src", src)
  })

  $(document).on('click', '.searchBtn', function(){
    CSRFValue = $(document).find(".authenticity_token_form").children('input[name="authenticity_token"]').val()
    u_or_c = $(this).attr("id")
    HTML = buildQualificationHTML(CSRFValue, u_or_c)

    $(document).find(".search_qualification").append(HTML)
    document_width = $(document).width()
    document_height = $(document).height()
    $(document).find(".background").width(document_width)
    $(document).find(".background").height(document_height)
    // $(document).find(".qualification_container").offset({top: scroll_height, left: scroll_left})
  })
  $(document).on('click', '.background', function(){
    $(document).find('.qualification_container').remove()
    $(this).remove()
  })

  // 前提関数
  function buildQualificationHTML(CSRFValue, u_or_c){
    html = 
    `
    <div class="background">
    </div>
    <div class="qualification_container">
      <h2 class="text">条件検索</h2>`
    if(u_or_c == "u"){
      html = html + `<form class="qualificaiton_form" action="/mypage/qualification" accept-charset="UTF-8" method="get">`
    }
    else {
      html = html + `<form class="qualificaiton_form" action="/cmypage/qualification" accept-charset="UTF-8" method="get">`
    }
    html = html + `
        <input type="hidden" name="authnticity_token" value="${CSRFValue}">
        <div class="ageBox">
          <div class="downBox">
            <div class="text">下限年齢</div>
            <select name="downage">`
    html = html + buildSelectAgeHTML()
           
    html = html + `
            </select>
          </div>
          <div class="wave">
          〜
          </div>
          <div class="upBox">
            <div class="text">上限年齢</div>
            <select name="upage">
          `
    html = html + buildSelectAgeHTML()
            
    html = html + `
            </select>
          </div>
        </div>
        <div class="sexBox">
          <div class="text">性別</div>
          <select name="sex">
            <option value>こだわらない</option>
            <option value="0">男</option>
            <option value="1">女</option>
          </select>
        </div>
        <input type="submit" name="commit" class="submit_qualification" value="探す">
      </form>
    </div>
    `
    return html
  }
  function buildCUserHTML(c_user, image, follower_length, student_length, sub_images){
    html = 
    `
    <div class="c_user_detail">
    </div>
    <div class="c_user_detail_container">
      <div class="detailBox">
        <div class="top_contents">
          <div class="top_side_bar">
            <div class="messageBox">
            </div>
          </div>
          <div class="main_image">
            <div class="main_topBox">`
            if (image != null && image.image != null){
              html = html + `<img src="${image.image.url}" class="main_image">`
            }else{
              html = html + `
              <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="main_image">
              `
            }
            html = html + `
            </div>
          </div>
          <div class="bottom_slide_image">`
            if (image != null && image.image != null){
              html = html + `<img src="${image.image.url}" class="icon">`
            }else{
              html = html + `
              <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="icon">
              `
            }
          
          if(sub_images != null){  
            sub_images.forEach(function(image){
              html = html + SubSlideImageHTML(image)
            }) 
          }

        html = html +
          `
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
                ${c_user.age}歳
              </div>
              <div class="sex">
                <div class="text">
                  性別：
                </div>`
                if (c_user.sex == 0){
                  html = html + `男`
                }
                else if (c_user.sex == 1){
                  html = html + `女`
                }
              html = html + `
              </div>
              <div class="student_numberBox">
                <div class="text">
                  生徒数：
                </div>
                ${student_length}人
              </div>
              <div class="follower">
                <div class="text">
                  フォロワー
                </div>
                ${follower_length}人
              </div>
              <div class="speciality">
                <div class="text">
                  得意分野
                </div>
                ${c_user.speciality}
              </div>
            </div>
            <div class="profile">
              <div class="text">
                プロフィール
              </div>
              <div class="profile_text">
                ${c_user.profile}
              </div>
            </div>
            <div class="make_a_callBox" id="0">
              <a href="/mypage/skyway?c_user_id=${c_user.id}">リアルタイム通話する</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    return html
  }
  function buildUserHTML(user, image, follower_length, student_length, sub_images){
    html = `
    <div class="user_detail">
    </div>
    <div class="user_detail_container">
      <div class="detailBox">
        <div class="top_contents">
          <div class="main_image">`
          if (image != null && image.image != null){
            html = html + `<img src="${image.image.url}" class="main_image">`
          }else{
            html = html + `
            <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="main_image">
            `
          }
    html = html + `
          </div>
          <div class="bottom_slide_image">`

          if (image != null && image.image != null){
            html = html + `<img src="${image.image.url}" class="icon">`
          }else{
            html = html + `
            <img src="/assets/member_photo_noimage_thumb-3f5db95de8bc1582908f994329d16ed91cf4398c2e3e0cc7387e0f2f8f0c88a9.png" class="icon">
            `
          }
            
            if(sub_images != null){
              sub_images.forEach(function(image){
                html = html + 
                `
                <img src="${image.image.url}" class="icon">
                `
              })
            }
            html = html + `
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
                ${user.age}
              </div>
              <div class="sex">
                <div class="text">
                  性別：
                </div>
                `
                if (user.sex == 0){
                  html = html + `男`
                }
                else if (user.sex == 1){
                  html = html + `女`
                }
              html = html +
              `
              </div>
              <div class="student_numberBox">
                <div class="text">
                  キューピット数：
                </div>
                  ${student_length}人
              </div>
              <div class="follower">
                <div class="text">
                  フォロワー
                </div>
                ${follower_length}人
              </div>
              <div class="speciality">
                <div class="text">
                  ひとこと
                </div>
                ${user.comment}
              </div>
            </div>
            <div class="profile">
              <div class="text">
                プロフィール
              </div>
              <div class="profile_text">
                ${user.profile}
              </div>
            </div>
            <div class="make_a_callBox" id="1">
              <a href="/cmypage/skyway?user_id=${user.id}">リアルタイム通話する</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
    return html
  }
  function SubSlideImageHTML(image){
    html = 
    `
    <img src="${image.image.url}" class="icon">
    `
    return html
  }
  function buildSelectAgeHTML(){
    html = `
      <option value>こだわらない</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
      <option value="32">32</option>
      <option value="33">33</option>
      <option value="34">34</option>
      <option value="35">35</option>
      <option value="36">36</option>
      <option value="37">37</option>
      <option value="38">38</option>
      <option value="39">39</option>
      <option value="40">40</option>
      <option value="41">41</option>
      <option value="42">42</option>
      <option value="43">43</option>
      <option value="44">44</option>
      <option value="45">45</option>
      <option value="46">46</option>
      <option value="47">47</option>
      <option value="48">48</option>
      <option value="49">49</option>
      <option value="50">50</option>
      <option value="51">51</option>
      <option value="52">52</option>
      <option value="53">53</option>
      <option value="54">54</option>
      <option value="55">55</option>
      <option value="56">56</option>
      <option value="57">57</option>
      <option value="58">58</option>
      <option value="59">59</option>
      <option value="60">60</option>
      <option value="61">61</option>
      <option value="62">62</option>
      <option value="63">63</option>
      <option value="64">64</option>
      <option value="65">65</option>
      <option value="66">66</option>
      <option value="67">67</option>
      <option value="68">68</option>
      <option value="69">69</option>
      <option value="70">70</option>
      <option value="71">71</option>
      <option value="72">72</option>
      <option value="73">73</option>
      <option value="74">74</option>
      <option value="75">75</option>
      <option value="76">76</option>
      <option value="77">77</option>
      <option value="78">78</option>
      <option value="79">79</option>
      <option value="80">80</option>
      <option value="81">81</option>
      <option value="82">82</option>
      <option value="83">83</option>
      <option value="84">84</option>
      <option value="85">85</option>
      <option value="86">86</option>
      <option value="87">87</option>
      <option value="88">88</option>
      <option value="89">89</option>
      <option value="90">90</option>
      <option value="91">91</option>
      <option value="92">92</option>
      <option value="93">93</option>
      <option value="94">94</option>
      <option value="95">95</option>
      <option value="96">96</option>
      <option value="97">97</option>
      <option value="98">98</option>
      <option value="99">99</option>
      <option value="100">100</option>
      `
    return html
  }
})


$(function(){
  // userページの処理
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
  $(document).on({
    'mouseenter': function(){
      showMatchListHTML(buildMatchListHTML)
    },
    'mouseleave': function(){
      deleteMatchListHTML()
    }
  },
    '#user_nav_link_2'
  )
  //c_userページの処理
  $(document).on({
    'mouseenter': function(){
      showCMatchListHTML(buildCMatchListHTML)
    },
    'mouseleave': function(){
      deleteCMatchListHTML()
    }
  },
  '#c_user_nav_link_2'
  )
  $(document).on({
    'mouseenter': function(){
      showCFollowListHTML(buildCFollowListHTML)
    },
    'mouseleave': function(){
      deleteCFollowListHTML()
    }
  },
  '#c_user_nav_link_3'
  )


  // 予め定義する関数

  function showFollowListHTML(html){
    $(document).find("#user_nav_link_3").append(html)
  }
  function deleteFollowListHTML(){
    $(document).find("#user_nav_link_3").children(".follow_ancynchronous_container").remove()
  }
  function showMatchListHTML(html){
    $(document).find("#user_nav_link_2").append(html)
  }
  function deleteMatchListHTML(){
    $(document).find("#user_nav_link_2").children(".match_ancynchronous_container").remove()
  }
  function showCFollowListHTML(html){
    $(document).find("#c_user_nav_link_3").append(html)
  }
  function deleteCFollowListHTML(){
    $(document).find("#c_user_nav_link_3").children(".follow_ancynchronous_container").remove()
  }
  function showCMatchListHTML(html){
    $(document).find("#c_user_nav_link_2").append(html)
  }
  function deleteCMatchListHTML(){
    $(document).find("#c_user_nav_link_2").children(".match_ancynchronous_container").remove()
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
    </a>
  </div>
  `
  buildMatchListHTML = 
  `
  <div class="match_ancynchronous_container">
    <a href="/mypage/match" class="match_listBox">
      マッチングリスト
    </a>
    <a href="/mypage/match_approval" class="match_approval_listBox">
      マッチング申請リスト
    </a>
  </div>
  `
  buildCFollowListHTML = 
  `
  <div class="follow_ancynchronous_container">
    <a href="/cmypage/follow" class="follow_listBox">
      フォローリスト
    </a>
    <a href="/cmypage/follower" class="followed_listBox">
      フォロワーリスト
    </a>
  </div>
  `
  buildCMatchListHTML = 
  `
  <div class="match_ancynchronous_container">
    <a href="/cmypage/match" class="match_listBox">
      マッチング一覧
    </a>
    <a href="/cmypage/match_approvement" class="match_approval_listBox">
      マッチング申請リスト
    </a>
    <a href="/cmypage/select_match" class="match_listBox">
      マッチング申請
    </a>
  </div>
  `

})
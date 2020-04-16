// 'use strict';

let localStream = null
let peer = null
let existingCall = null

navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then(function(stream){
    // Success
    $("#my-video").get(0).srcObject = stream
    localStream = stream
  }).catch(function(error){
    // Error
    console.error('mediaDevise.getUserMedia() error:', error)
    return
  })
// peer = (window.peer = new Peer({
//   key: '86a4a19f-d709-44a8-a1a5-acf069f53910',
//   debug: 3,
// }));
peer = new Peer({
  key: '86a4a19f-d709-44a8-a1a5-acf069f53910', 
  debug: 3
})
peer.on('open', function(){
  $('#my-id').text(peer.id);
});
peer.on('error', function(err){
  alert(err.message);
});
peer.on('close', function(){
});
peer.on('disconnected', function(){
});


function setupCallEventHandlers(call){
  if (existingCall) {
      existingCall.close();
  };

  existingCall = call;
  call.on('stream', function(stream){
    addVideo(call, stream);
    setupEndCallUI();
    $('#their-id').text(call.remoteId);
  });
  call.on('close', function(){
    removeVideo(call.remoteId);
    setupMakeCallUI();
  });
}
function addVideo(call, stream){
  $('#their-video').get(0).srcObject = stream;
}
function removeVideo(peerId){
  $('#their-video').get(0).srcObject = undefined;
}
function setupMakeCallUI(){
  $('#make-call').show();
  $('#end-call').hide();
} 
function setupEndCallUI() {
  $('#make-call').hide();
  $('#end-call').show();
}
// userのmake-call
$(document).on('click', '#make-call', function(e){
  e.preventDefault();
  // const call = peer.call($('#callto-id').val(), localStream);
  let url = "/mypage/create_skyway"
  let c_user_id = $(document).find(".c_user_id").text()
  console.log(c_user_id)
  c_user_id = parseInt(10, c_user_id);
  console.log(c_user_id)
  let skyway_code = $(document).find("#my-id").text()
  let data = { c_user_id: c_user_id, skyway_code: skyway_code }
  console.log(data)
  $.ajax({
    url: url,
    data: data,
    dataType: "json",
    type: "GET",
  })
  .done(function(data){
    console.log("create_skyway成功")
    if (data.bool == 1){
      const call = peer.call(data.skyway.code, localStream)
      setupCallEventHandlers(call);
    }
    else if(data.bool == 0){
      console.log("データベースにskywayをcreateしました")
    }
  })
  .fail(function(){
    console.log("create_skyway失敗")
  })
})
// c_userのmakecall
$(document).on('click', '#c_make-call', function(e){
  e.preventDefault();
  // const call = peer.call($('#callto-id').val(), localStream);
  let url = "/cmypage/create_skyway"
  let user_id = $(document).find(".user_id").text()
  console.log(user_id)
  user_id = parseInt(user_id)
  console.log(user_id)
  let skyway_code = $(document).find("#my-id").text()
  let data = { user_id: user_id, skyway_code: skyway_code }
  console.log(data)
  $.ajax({
    url: url,
    data: data,
    dataType: "json",
    type: "GET"
  })
  .done(function(data){
    console.log("c_userがcreate_skyway成功")
    if (data.bool == 1){
      const call = peer.call(data.skyway.code, localStream)
      setupCallEventHandlers(call);
    }
    else if(data.bool == 0){
      console.log("c_userがデータベースにskywayをcreateしました")
    }
  })
  .fail(function(){
    console.log("create_skyway失敗")
  })
})

// $('#make-call').submit(function(e){
//   e.preventDefault();
//   const call = peer.call($('#callto-id').val(), localStream);
//   setupCallEventHandlers(call);
// });
$('#end-call').click(function(e){
  e.preventDefault()
  $.ajax({
    url: "mypage/end_call",
    type: "POST",
    dataType: "json",
    processData: false,
    contentType: false
  })
  // existingCall.close();
});
$('#c_end-call').click(function(){
  e.preventDefault()
  $.ajax({
    url: "cmypage/end_call",
    type: "POST",
    dataType: "json",
    processData: false,
    contentType: false
  })
  // existingCall.close();
});
peer.on('call', function(call){
  call.answer(localStream);
  setupCallEventHandlers(call);
});






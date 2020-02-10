var userId = 'ce32af7f2a97'
fetchUserLastestInfo(userId)

function fetchUserLastestInfo(userId) {
  $.ajax({ url: 'http://www.jianshu.com/users/${userId}/timeline' }).done(function(data) {
    var infos = $(data).find('.note-list li')

  })
}
$('.note-list li:last-child').attr('id').split('-')[1] - 1

function(argument) {
  // body...
}



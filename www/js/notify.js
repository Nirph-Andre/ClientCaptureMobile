
var Notify = {
    
    // State data
    staticNotificationVisible: false,
    
    
    // Friendly non-static user notification
    alert: function(title, message, button, callback) {
      navigator.notification.alert(
          message,
          callback,
          title,
          button ? button : 'OK'
      );
    },


    // Pretty static user notification
    notifyStatic: function(note, blink) {
      note = note ? note : 'LOADING';
      $('#modalStaticNotifyContent').removeClass('blink');
      if (blink || 'LOADING' == note) {
        $('#modalStaticNotifyContent').addClass('blink');
      }
      $('#modalStaticNotifyContent').html(note);
      if (!Notify.staticNotificationVisible) {
        $('#modalStaticNotify').modal('toggle');
        Notify.staticNotificationVisible = true;
      }
    },
    
    
    // Disable static notification
    hideStatic: function() {
      if (Notify.staticNotificationVisible) {
        $('#modalStaticNotify').modal('toggle');
        Notify.staticNotificationVisible = false;
      }
    }
};

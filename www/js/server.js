
var Server = {

    // Load html, css and js from server directly into view
    loadContent: function(target, page) {
      Server.post(page, {}, function(jsonResult) {
        if (jsonResult.html) {
          $('#' + target).html(jsonResult.html);
        }
        if (jsonResult.js) {
          eval(jsonResult.js);
        }
      }, function(jqXHR, textStatus, errorThrown) {
        Notify.alert('Oops', 'Could not load requested content from server.');
      });
    },


    // Ajax post helper
    post: function(action, data, callback, errorCallback) {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: Config.serviveNode + action,
        data: data
      })
      .done(callback)
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert('post failure');
        alert(JSON.stringify(data));
        alert(errorThrown);
        alert(jqXHR.responseText);
        if (errorCallback !== 'undefined')  {
          errorCallback(jqXHR, textStatus, errorThrown);
        } else {
          Notify.alert('Oops', 'Could not talk to server: ' + errorThrown);
        }
      });
    },


    // Ajax get helper
    get: function(action, data, callback, errorCallback) {
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: Config.serviveNode + action,
        data: data
      })
      .done(callback)
      .fail(function(jqXHR, textStatus, errorThrown) {
        if (errorCallback !== 'undefined')  {
          errorCallback(jqXHR, textStatus, errorThrown);
        } else {
          Notify.alert('Oops', 'Could not talk to server: ' + textStatus);
        }
      });
    },


    // Ajax post helper
    postUri: function(uri, data, callback, errorCallback) {
      $.ajax({
        type: 'POST',
        dataType: 'json',
        url: uri,
        data: data
      })
      .done(callback)
      .fail(function(jqXHR, textStatus, errorThrown) {
        if (errorCallback !== 'undefined')  {
          errorCallback(jqXHR, textStatus, errorThrown);
        } else {
          Notify.alert('Oops', 'Could not talk to server: ' + textStatus);
        }
      });
    },


    // Ajax get helper
    getUri: function(uri, data, callback, errorCallback) {
      $.ajax({
        type: 'GET',
        dataType: 'json',
        url: uri,
        data: data
      })
      .done(callback)
      .fail(function(jqXHR, textStatus, errorThrown) {
        if (errorCallback !== 'undefined')  {
          errorCallback(jqXHR, textStatus, errorThrown);
        } else {
          Notify.alert('Oops', 'Could not talk to server: ' + textStatus);
        }
      });
    }

};

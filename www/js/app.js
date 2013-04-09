
var Session = {};

var App = {

    // Status data
    authData: {},
    location: 'Device',
    state: 'Initializing',
    stateDescription: 'Initializing',
    connectionStact: {},
    online: true,
    firstRun: false,
    authenticated: false,
    awaitGps: [],


    // Application Constructor
    initialize: function() {
      $('.page').hide();
      $('#pageLogin').show();
      App.bindEvents();
      this.setState('Processing', 'Initializing Application');
      Data.initialize();
    },


    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      App.online = (navigator.connection.type == Connection.NONE) ? false : true;
      $(document).bind('offline', App.nowOffline);
      $(document).bind('online', App.nowOnline);
      $(document).bind('backbutton', Interface.back);
    },


    // Connectivity handling
    nowOffline: function() {
      App.online = false;
    },
    nowOnline: function() {
      App.online = true;
      for (var id in App.connectionStact) {
        App.connectionStact[id]();
      }
      App.connectionStact = {};
    },


    // Application status
    setState: function(state, description, evtClass) {
      App.state = state ? state : 'Ready';
      App.stateDescription = description ? description : 'Ready';
      var evtClass = 'processing';
      switch (App.state) {
        case 'Ready': evtClass = 'ready'; break;
        case 'Error': evtClass = 'problem'; break;
      }
      Util.setEventInfo('initEvent', App.state, evtClass);
    },


    // Status handling
    newDevice: function() {
      App.firstRun = true;
    },
    dbReady: function() {
      Notify.hideStatic();
      App.setState();
    },
    dbFail: function(message) {
      Notify.notifyStatic('Fatal database error, application cannot proceed.');
      App.setState('Database Error', message, 'problem');
      if (message) {
        Notify.alert('Database Error', message);
      }
      return true;
    },
    configReady: function() {
      if (Config.data.location) {
        $('.location').html(Config.data.location);
      }
    },
    configFail: function() {
      Notify.notifyStatic('Could not load configuration data, application cannot proceed.');
      App.setState('Configuration Error', 'Could not load configuration data.', 'problem');
      return true;
    },
    synchComplete: function() {
      Notify.hideStatic();
      App.setState();
      Data.list(Table.Location, {}, function(data) {
        Util.populateSelect('locationSelect', 'Select Location', data, Config.data.location);
      });
      if (App.firstRun) {
        Interface.loadPage('Home');
        App.firstRun = false;
      }
    },
    synchFail: function(message) {
      if (typeof message == 'undefined') {
        App.connectionRequired('synch', Data.refreshAppMeta);
      } else {
        Notify.notifyStatic('Synchronization Error', message);
        App.setState('Synchronization Error', message, 'problem');
      }
      return true;
    },
    connectionRequired: function(id, callback) {
      App.connectionStact[id] = callback;
      Notify.notifyStatic('Connection required for application to proceed.');
      Notify.alert('Connection Error', 'Please connect to internet to proceed.');
      App.setState('Connection Required', 'Please connect to internet to proceed', 'processing');
      return true;
    },


    // ****************************** AUTHENTICATION ********************************* //
    // Authentication
    login: function (username, password) {
      App.authData = {"username": username, "password": password};
      Server.post('authentication/login', App.authData, function (jsonResult) {
        if ('Error' == jsonResult.Status) {
          Notify.alert('Oops', jsonResult.Message);
        } else if ('Success' == jsonResult.Status) {
          App.authenticated = true;
          Interface.loadPage('Home');
          if (App.firstRun) {
            Data.refreshAppMeta();
          }
        }
      }, function(jqXHR, textStatus, errorThrown) {
        Notify.alert('Oops', 'Could not reach the server. Please ensure you are connected to the internet and try again.');
      });
    },


    // ****************************** GLOBAL ********************************* //
    // Primary app logic
    pageLoaded: function(page) {
      // nothing to do here
    },
    pageClosed: function(page) {
      // nothing to do here
    },


    // ****************************** CAPTURE CLIENT ********************************* //
    startCapture: function() {
      Interface.loadPage('CaptureMain');
    },
    resetCustomer: function() {
      Session = {};
      Session.item_id = 0;
      $('#actItem').html('Select Item');
      $('#inpName').val('');
      $('#inpSurname').val('');
      $('#inpEmail').val('');
      $('#inpCell').val('');
    },
    evalCustomer: function() {
      if (0 == Session.item_id
          || '' == $('#inpName').val()
          || '' == $('#inpEmail').val()
          ) {
        $('#actSave').prop('disabled', true);
      } else {
        $('#actSave').prop('disabled', false);
      }
    },
    setItem: function(id, name) {
      Session.item_id = id;
      $('#actItem').html(name);
      App.evalCustomer();
    },
    saveClient: function() {
      // Data
      Session.name    = $('#inpName').val();
      Session.surname = $('#inpSurname').val();
      Session.email   = $('#inpEmail').val();
      Session.cell    = $('#inpCell').val();
      // Save entry
      Data.save(Table.Customer, Session.id, Session, function(data) {
        Notify.alert('Done', 'Customer successfully saved.');
        App.resetCustomer();
      }, function(err) {
        Notify.alert('Oops', 'Could not save customer due to error: ' + err.message);
      });
    }

};





































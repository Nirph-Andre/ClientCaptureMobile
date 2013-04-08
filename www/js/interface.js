
var Interface = {

    currentLayout: '',
    currentPage: 'Login',
    currentContent: '',
    pageStack: [],
    listCallback: null,
    listTable: false,
    allowNew: false,
    labelField: false,

    // Cater for phone back button
    back: function(e) {
      if ('Login' == Interface.currentPage || 'Home' == Interface.currentPage) {
        navigator.app.exitApp();
      } else {
        $('#page' + Interface.pageStack.pop()).hide();
        Interface.currentPage = Interface.pageStack.pop();
        Interface.pageStack.push(Interface.currentPage);
        $('#page' + Interface.currentPage).show();
        if ('Location' == Interface.currentPage) {
          $('#contextNav').hide();
        }
      }
      if (typeof e != 'undefined') {
        e.preventDefault();
      }
    },

    // Interface Content
    loadPage: function(name) {
      if ('Home' == name) {
        Interface.pageStack = ['Home'];
      } else {
        Interface.pageStack.push(name);
      }
      $('#page' + Interface.currentPage).hide();
      $('#page' + name).show();
      App.pageClosed(Interface.currentPage);
      Interface.currentPage = name;
      App.pageLoaded(name);
    },

    // Select from list
    listFromTable: function(table, filter, labelField, callback, allowNew, instruction) {
      Interface.listTable = table;
      Interface.labelField = labelField;
      Interface.contextData = filter;
      Interface.allowNew = allowNew ? true : false;
      Data.list(table, filter, function(data) {
        var listData = [];
        for (var i in data) {
          listData.push({"value": data[i].id, "label": data[i][labelField]});
        }
        Interface.listFromData(listData, callback, instruction);
      });
    },
    listFromData: function(data, callback, instruction) {
      instruction = typeof instruction != 'undefined'
        ? instruction.toUpperCase()
        : 'SELECT ITEM';
      Interface.listCallback = callback;
      Interface.loadPage('ListSelect');
      $('#listDataContent').html('');
      $('#listDataContent').append('<div><label>' + instruction + '</label></div>');
      for (var i in data) {
        $('#listDataContent').append('<div><button class="btn btn-mobile-list span12" onClick="Interface.listSelect('
                                     + data[i].value + ', \'' + Util.addSlashes(data[i].label) + '\');">'
                                     + data[i].label + '</button></div>');
      }
      if (Interface.allowNew) {
        $('#listDataContent').append(
            '<div><input type="text" id="listAddItem" class="span8 pull-left">'
            + '<button class="btn btn-mobile-inline span4 pull-right" onClick="Interface.listAdd();">ADD</button></div>'
            );
      }
    },
    listSelect: function(value, label) {
      Interface.back();
      Interface.listCallback(value, label);
    },
    listAdd: function() {
      var label = $('#listAddItem').val();
      if ('' == label) {
        return;
      }
      label = label.toUpperCase();
      Interface.contextData[Interface.labelField] = label;
      Data.view(Interface.listTable, null, Interface.contextData, function(xdata) {
        if (!xdata.id) {
          Data.save(Interface.listTable, null, Interface.contextData, function(data) {
            Interface.back();
            Interface.listCallback(data.id, label);
          });
        } else {
          Interface.back();
          Interface.listCallback(xdata.id, xdata.name);
        }
      });
    }

};
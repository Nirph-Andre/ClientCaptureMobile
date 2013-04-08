
var Util = {

    // Event status convenience
    setEventInfo: function(id, status, evtClass) {
      $('#' + id).removeClass('processing');
      $('#' + id).removeClass('ready');
      $('#' + id).removeClass('problem');
      $('#' + id).addClass(evtClass);
      $('#' + id).html(status);
    },


    // Current date-time convenience
    getCurrentDateTime: function() {
      var currentdate = new Date();
      return currentdate.getFullYear() + "-"
              + (currentdate.getMonth()+1)  + "-"
              + currentdate.getDate() + " "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes() + ":"
              + currentdate.getSeconds();
    },


    // Escape a string
    addSlashes: function(input) {
      if (typeof(input) != 'string') {
        return input;
      }
      input = input
        .replace(/'/g, "\'")
        .replace(/"/g, '\"');
      return input;
    },


    // Unescape a string
    stripSlashes: function(input) {
      if (typeof(input) != 'string') {
        return input;
      }
      input = input
        .replace(/\'/g, "'")
        .replace(/\"/g,'"');
      return input;
    },


    // Sort array according to name value
    sortByLabel: function(a, b) {
      var aName = a.label.toLowerCase();
      var bName = b.label.toLowerCase();
      return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
    },


    // Convert string to upper case
    strtoupper: function(input) {
      if (typeof(input) != 'string') {
        return input;
      }
      return (input).toUpperCase();
    },


    // Populate a select item, prob not going to be used yet cause we have the list screen
    populateSelect: function(target, instruction, data, selected) {
      var opts = instruction
        ? '<option value="">-- ' + instruction + ' --</option>'
        : '';
      for (var i in data) {
        var chosen = (selected == i) ? ' selected' : '';
        opts += '<option value="' + i + '"' + chosen + '>' + data[i] + '</option>';
      }
      $('#' + target).html(opts);
    }

};

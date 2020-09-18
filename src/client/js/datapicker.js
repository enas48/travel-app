//To load To load only particular widgets jquery-ui :
//require('jquery');
require('jquery-ui');
require('jquery-ui-css');

/* for cross Browser Compatibility Issues With Form Input Type Date*/
module.exports = (function() {
  var elem = document.getElementsByClassName('date');

  if (elem.type === 'text') {
    $('input[type="date"]').datepicker({ dateFormat: 'yy-mm-dd' });
  }
})();

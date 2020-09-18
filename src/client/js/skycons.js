const Skycons = require('skycons')(window);
function setIcons() {
  var i,
    icons = new Skycons({
      color: '#fff',
      resizeClear: true // nasty android hack
    }),
    list = [
      // listing of all possible icons
      'clear-day',
      'clear-night',
      'partly-cloudy-day',
      'partly-cloudy-night',
      'cloudy',
      'rain',
      'sleet',
      'snow',
      'wind',
      'fog'
    ];

  // loop icon list array
  for (i = list.length; i--; ) {
    var weatherType = list[i],
      elements = document.getElementsByClassName(weatherType);

    // loop the elements now and set them up
    for (let e = elements.length; e--; ) {
      icons.set(elements[e], weatherType);
    }
  }

  // animate the icons
  icons.play();
}
export { setIcons };

function formValidate() {
  let today = new Date();
  let departDate = document.getElementById('depart-date').value;
  let returnDate = document.getElementById('return-date').value;
  let lengthOfTrip = Client.diffDays(departDate, returnDate);
  let dayOfTrip = Client.diffDays(today, departDate);
  let inputTxt = document.getElementById('location').value;
  let error = document.getElementById('error');
  var numberExpresion = /^[0-9]*$/;
  var numRegex = new RegExp(numberExpresion);

  if (inputTxt.match(numRegex)) {
    error.style.display = 'block';
    error.innerHTML = 'please input location name in string not a number';
    setTimeout(function() {
      error.style.display = 'none';
    }, 3000);
    return false;
  } else if (lengthOfTrip < 0) {
    error.style.display = 'block';
    error.innerHTML =
      "day of your return can't be small then day of your depart";
    setTimeout(function() {
      error.style.display = 'none';
    }, 3000);

    return false;
  } else if (dayOfTrip < 0) {
    error.style.display = 'block';
    error.innerHTML = "your trip can't be day before today";
    setTimeout(function() {
      error.style.display = 'none';
    }, 3000);
    return false;
  } else {
    return true;
  }
}
export { formValidate };

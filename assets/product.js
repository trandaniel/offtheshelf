function getInput() {
  alert('getting input');
  var inputs = document.getElementsByClassName('textInput');

  var output = ""

//  alert(inputs);
  for (var x = 0 ; x < inputs.length ; x++) {
    alert(inputs[x].value);
  }
}

let factContainer = document.querySelector('#factContainer');
let factInfo = document.querySelector('#factInfo');
let errMsg = document.querySelector('#alert');

let numInput = document.querySelector('#numInput');
numInput.addEventListener('input', getNumberFact);

function getNumberFact() {
  if (numInput.validity.valid) { // empty or whole number
    errMsg.style.display = 'none';
    if (numInput.value != '') {
      // getViaAjax(numInput.value);
      getViaFetchApi(numInput.value);
    }
  }
  else {
    errMsg.style.display = 'block';
    factContainer.style.display = 'none';
  }
}

function getViaAjax(number) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://numbersapi.com/'+number);
  xhr.onload = function() {
    if (this.status == 200) {
      factContainer.style.display = 'block';
      factInfo.innerHTML = this.responseText;
    }
  }
  xhr.send();
  /** 
   * xhr.send() - this will trigger xhr.open request
   * xhr.onload - will process the data received
   * status of 200 is ok
  */
}

function getViaFetchApi(number) {
  fetch('http://numbersapi.com/'+number)
    .then(response => response.text())
    .then(data => {
      factContainer.style.display = 'block';
      factInfo.innerHTML = data;
    })
    .catch(err => console.log(err));
  /** 
   * fetch returns a promise and then get the
   * response.text and insert it into the html
  */
}
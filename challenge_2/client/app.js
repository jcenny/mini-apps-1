var app = document.getElementById('app');
//header 
var header = document.createElement('h1');
header.innerHTML = 'CSV Report Generator';
app.append(header);
//form 
var form = document.createElement('form');
var textArea = document.createElement('textarea');
textArea.setAttribute('type', 'text');
textArea.setAttribute('class', 'textarea');
textArea.setAttribute('placeholder', 'JSON data');
var inputBtn = document.createElement('input');
inputBtn.setAttribute('type', 'submit');
inputBtn.setAttribute('class', 'btn')
form.append(textArea);
form.append(inputBtn);
app.append(form);

// form state
var state = '';
textArea.setAttribute('value', state);
// on change, reset state with data
textArea.addEventListener('change', (event) => {
  event.preventDefault();
  state = event.target.value;
  textArea.setAttribute('value', state);
})


// POST request
textArea.setAttribute('name', 'data');
form.setAttribute('method', 'POST');
form.setAttribute('action', '/upload_JSON');
console.log(form);


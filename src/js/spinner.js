const spinner = document.createElement('div');
spinner.classList.add('spinner');

// add spinner to the document
document.body.appendChild(spinner);

// hide the spinner by default
spinner.style.display = 'none';

function showSpinner() {
  spinner.style.display = 'block';
}

function hideSpinner() {
  spinner.style.display = 'none';
}

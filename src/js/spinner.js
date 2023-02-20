export function showSpinner() {
  body.classList.add('loading');
}

export function hideSpinner() {
  setTimeout(function () {
    body.classList.remove('loading');
    body.classList.add('loaded');
  }, 1000);
}

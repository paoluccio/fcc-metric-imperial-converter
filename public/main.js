window.onload = () => {

  const form = document.forms[0];
  const inputField = form.input;
  const outputField = document.querySelector('.output-field')

  function renderData(response) {
    const units = response.string.split(' ').slice(-1);
    if (outputField.classList.contains('slide-in')) {
      outputField.textContent = '';
      outputField.classList.remove('slide-in');
      setTimeout(() => {
        outputField.textContent = `${response.returnNumber} ${units}`;
        outputField.classList.add('slide-in');
      }, 100)
    } else {
      outputField.textContent = `${response.returnNumber} ${units}`;
      outputField.classList.add('slide-in');
    }
  }

  function convert(e) {
    e.preventDefault();
    const data = inputField.value;
    if (!data) return;
    fetch(`/api/convert?input=${data}`)
      .then(response => response.json())
      .then(result => {
        if (result.error) {
          inputField.classList.add('highlight-error');
          setTimeout(() => inputField.classList.remove('highlight-error'), 400);
          return;
        }
        renderData(result);
      })
      .catch(err => console.log(err));
  }

  form.addEventListener('submit', convert);
}
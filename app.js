const app = {}

app.openButtons = () => {
  // grab each button on the page and it's value
  const buttons = document.querySelectorAll('.linkButton');
  // add an eventListener to each button
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      app.openModal(button.value)
    })
  });
}

// on button click
app.openModal = (modal) => {
  // show the related modal, by value
  const thisModal = document.querySelector(`.${modal}`)
  thisModal.classList.remove('hidden');
  // accessibility switch
  thisModal.setAttribute('aria-hidden', 'false');
  document.querySelector('main').setAttribute('aria-hidden', 'true');
  

  // add an eventListener to close button
  // create a deferred function too allow argument
  app.handleCloseButton = () => app.closeModal(modal);
  const closeButton = document.querySelector(`.${modal}Close`);
  closeButton.addEventListener('click', app.handleCloseButton);
  // bring focus to close button for accessibility
    // -- does this cause screen readers to skip text?
  thisModal.focus(); 

  // add an eventListener to the greyed main area
  app.handleClickAway = (e) => {
      if (e.target.nodeName === "SECTION") {
        app.closeModal(modal);
      }
  }
  thisModal.addEventListener('click', app.handleClickAway)

  // add an eventListener to 'esc' keypress
  app.handleEscModal = (e) => {
    if (e.key === "Escape") {
      app.closeModal(modal);
    }
  }
  document.addEventListener('keydown', app.handleEscModal)
}

// on close/greyed/esc click
app.closeModal = (modal) => {
  const thisModal = document.querySelector(`.${modal}`);
  // remove event listeners
  document.querySelector(`.${modal}Close`).removeEventListener('click', app.handleCloseButton)
  thisModal.removeEventListener('click', app.handleClickAway)

  // unclear if this is removing or not... how to tell??
  document.removeEventListener('keydown', app.handleEscModal)

  // grab the modal in question by value
  // close the modal
  document.querySelector(`.${modal}`).classList.add('hidden');

  // accessibility switch
  thisModal.setAttribute('aria-hidden', 'true');
  document.querySelector('main').setAttribute('aria-hidden', 'false');
} 

// initialize the app

app.init = () => {
  // console.log('app is running');
  app.openButtons();
}
app.init();


/*

mailto alternative
<script>
// Open mailto links in a new tab
function mailto(email, subject, body) {
  var url;
  url = 'mailto:' + email;
  url += '?subject=' + subject;
  url += '&body=' + body;
  window.open(url);
}
</script>

<a href="#" onclick="mailto('test@gmail.com', 'Subject', 'Body');event.preventDefault()">test@gmail.com</a>

*/
// small screen navigation bar
let links = document.getElementById("links");
let NavIcon = document.getElementById("nav-icon");
NavIcon.onclick = () => {
  links.classList.toggle("display");
};

// opening tabs of about section
let tabLinks = document.getElementsByClassName("tab-links");
let tabContents = document.getElementsByClassName("tab-content");

function openTab(tabName) {
  for (let tabLink of tabLinks) {
    tabLink.classList.remove("active-link");
  }
  for (let tabContent of tabContents) {
    tabContent.classList.remove("active-tab");
  }

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

// typing animation
let typing = new Typed(".auto-typing", {
  strings: [
    "Web Developer",
    "UI/UX Designer",
    "Graphic Designer",
    "Web Designer",
  ],
  typeSpeed: 150,
  backSpeed: 150,
  loop: true,
});

// scrolling to top
function scrollFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// smooth scrolling
$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});

// form validation

let nameError = document.getElementById("name-error");
let phoneError = document.getElementById("phone-error");
let emailError = document.getElementById("email-error");
let msgError = document.getElementById("msg-error");

let name = document.getElementById("name-input");
let phone = document.getElementById("phone-input");
let email = document.getElementById("email-input");
let message = document.getElementById("msg-input");
let check = 0;

function formValidation() {
  // name error validation

  if (name.value.length == 0) {
    nameError.innerHTML =
      '<i class="fa-solid fa-circle-info"></i> *name required';
    name.style.border = "1.5px solid red";
    check = 0;
  } else if (name.value.length < 3) {
    nameError.innerHTML =
      "<i class='fa-solid fa-circle-info'></i> *min 3 char required";
    name.style.border = "1.5px solid red";
    check = 0;
  } else if (name.value.length > 20) {
    nameError.innerHTML =
      '<i class="fa-solid fa-circle-info"></i> *max 20 char required';
    name.style.border = "1.5px solid red";
    check = 0;
  } else {
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    name.style.border = "2px solid seagreen";
    check = 1;
  }

  // phone error validation

  if (phone.value.length == 0) {
    phoneError.innerHTML =
      '<i class="fa-solid fa-circle-info"></i> *phone required';
    phone.style.border = "1.5px solid red";
    check = 0;
  } else if (!phone.value.match(/^[0-9]+$/)) {
    phoneError.innerHTML =
      '<i class="fa-solid fa-circle-info"></i> *only digits required';
    phone.style.border = "1.5px solid red";
    check = 0;
  } else if (phone.value.length != 11) {
    phoneError.innerHTML =
      "<i class='fa-solid fa-circle-info'></i> *11 digits required";
    phone.style.border = "1.5px solid red";
    check = 0;
  } else {
    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    phone.style.border = "2px solid seagreen";
    check = 1;
  }

  // email error validation

  if (email.value.length == 0) {
    emailError.innerHTML =
      '<i class="fa-solid fa-circle-info"></i> *email required';
    email.style.border = "1.5px solid red";
    check = 0;
  } else if (email.value[0] == "@") {
    emailError.innerHTML =
      '<i class="fa-solid fa-circle-info"></i> *@ position is wrong';
    email.style.border = "1.5px solid red";
    check = 0;
  } else if (email.value[0] == ".") {
    emailError.innerHTML =
      '<i class="fa-solid fa-circle-info"></i> *. position is wrong';
    email.style.border = "1.5px solid red";
    check = 0;
  } else {
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    email.style.border = "2px solid seagreen";
    check = 1;
  }

  // message error validation

  if (message.value.length == 0) {
    msgError.innerHTML =
      '<i class="fa-solid fa-circle-info"></i> *message required';
    message.style.border = "1.5px solid red";
    check = 0;
  } else if (message.value.length < 25) {
    msgError.innerHTML =
      '<i class="fa-solid fa-circle-info"></i> *message required';
    message.style.border = "1.5px solid red";
    check = 0;
  } else {
    msgError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    message.style.border = "2px solid seagreen";
    check = 1;
  }

  // for counting message chars

  let charCounter = document.getElementById("char-counter");
  message.onkeyup = () => {
    if (message.value.length < 25) {
      charCounter.innerHTML = 25 - message.value.length + " char required";
      message.style.border = "1.5px solid red";
      check = 0;
    } else {
      charCounter.innerHTML = "";
      msgError.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
      message.style.border = "2px solid seagreen";
      check = 1;
    }
  };

  // for checking all errors
  const form = document.forms["submit-to-google-sheet"];
  if (check) {
    submitMsg.innerHTML = "Message sent successfully";
    setTimeout(() => {
      submitMsg.innerHTML = "";
    }, 4000);
    setTimeout(() => {
      nameError.innerHTML = "";
      name.style.border = "";
      phoneError.innerHTML = "";
      phone.style.border = "";
      emailError.innerHTML = "";
      email.style.border = "";
      msgError.innerHTML = "";
      message.style.border = "";
    }, 1000);
    return true;
  } else {
    return false;
  }
}

// sending message to google sheets
let submitMsg = document.getElementById("submit-msg");
const scriptURL =
  "https://script.google.com/macros/s/AKfycbz6973aKMEpdh38w53X56W1m2dkVlSnoTwbAx1cg632HW3w5twZLy1JkT-ewKAenSHR/exec";
const form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {})
    .catch((error) => console.error("Error!", error.message));

  // for resetting the form
  if (check) {
    form.reset();
    return true;
  } else {
    return false;
  }
});

// sticky navigation bar on scroll
let navBar = document.getElementById("nav-bar");
let scrollIcon = document.getElementById('scroll');

window.onscroll = () => {
  if (window.pageYOffset >= 660) {
    navBar.classList.add("sticky");
    scrollIcon.style.display = 'block';
  } else {
    navBar.classList.remove("sticky");
    scrollIcon.style.display = 'none';
  }
};

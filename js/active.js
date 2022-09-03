navbar = document.querySelector('.navbar-nav').querySelectorAll('a');
navbar.forEach(element => {
   element.addEventListener('click', function () {
      navbar.forEach(nav => nav.classList.remove('socol'))
      this.classList.add('socol');
      console.log(this);
   })
});
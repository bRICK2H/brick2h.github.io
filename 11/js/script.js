window.onload = function () {
  (function addSerialNumberForLink() {
    var containerLinkTab = document.querySelectorAll('#container__link_tab .link');

    for (var i = 0; i < containerLinkTab.length; i++) {
      containerLinkTab[i].setAttribute('data-serial', i);

      containerLinkTab[i].addEventListener('click', activeLinkAndBindingTabs);
    }
  })();

  function activeLinkAndBindingTabs() {
    var link = document.querySelectorAll('.link');
    var tabInfo = document.querySelectorAll('.tab__info');

    for (var j = 0; j < link.length; j++) {
      link[j].classList.remove('active__link');
      tabInfo[j].classList.remove('active__tab_info');
    }

    this.classList.add('active__link');
    tabInfo[this.getAttribute('data-serial')].classList.add('active__tab_info');
  }
};

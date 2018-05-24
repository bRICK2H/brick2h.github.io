
window.onload = function () {
  // Функция слайдера
  ;(function slider() {
    var slider = document.querySelectorAll('img');
    var previous = document.querySelector('.active__previous');
    var next = document.querySelector('.active__next');

    ;(function () {
      var counter = 0;

      // Клик назад
      previous.onclick = function () {
        counter--;
        if (counter < 0) {
          counter = slider.length - 1;
        }

        // Удаляем класс предыдущей фотографии
        displaySlidersNone();
        slider[counter].classList.add('active__img');
      };

      // Клик вперед
      next.onclick = function () {
        counter++;
        if (counter == slider.length) {
          counter = 0;
        }

        // Удаляем класс предыдущей фотографии
        displaySlidersNone();
        slider[counter].classList.add('active__img');
      };
    })();

    /**
     * Функция удаляет класс всему контексту фотографий
     **/
    function displaySlidersNone() {
      for (var i = 0; i < slider.length; i++) {
        slider[i].classList.remove('active__img');
      }
    }
  })();
};

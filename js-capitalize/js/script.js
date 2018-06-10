window.onload = function () {
  var view = {

    displayAmountBefore: function (number) {
      var amountBefore = document.querySelector('.before__amount');
      amountBefore.innerHTML = number;
    },

    displayAmountAfter: function (number) {
      var amountAfter = document.querySelector('.after__amount');
      amountAfter.innerHTML = number;
    },

    displayAfterDiagram: function (heigth) {
      var afterDiagram = document.querySelector('.after__diagram');
      afterDiagram.style.height = 50 + heigth + 'px';
    },
  };

  (function () {
    var amount = document.getElementById('amount');
    var period = document.getElementById('period');
    var capitalize = document.getElementById('capitalize');
    amount.addEventListener('input', chooseAmount);
    period.addEventListener('change', choosePeriod);
    capitalize.addEventListener('click', chooseCapitalize);

    function chooseAmount() {
      var beforeMoney = +this.value;
      var month = +period.value;

      displayMoney(beforeMoney, month);
    }

    function choosePeriod() {
      var beforeMoney = +amount.value;
      var month = +this.value;

      displayMoney(beforeMoney, month);
    }

    function chooseCapitalize() {
      var beforeMoney = amount.value;
      var month = period.value;

      displayMoney(beforeMoney, month);
    }

    function displayMoney(beforeMoney, month) {
      var simple = getSimpleProcent(beforeMoney, month);
      var complex = getCoplexProcent(beforeMoney, month);
      var px = getInComeMoney(beforeMoney, simple);

      view.displayAmountBefore(beforeMoney);
      view.displayAfterDiagram(px);

      if (!capitalize.checked) {
        view.displayAmountAfter(simple);
      } else {
        view.displayAmountAfter(complex);
      }
    }

    function getSimpleProcent(amount, month) {
      var simple = amount * (1 + 0.12 * (month / 12));
      return Math.round(simple);
    }

    function getCoplexProcent(amount, month) {
      var complex = amount * Math.pow(1 + (12 / 100 / 12), month);
      return Math.round(complex);
    }

    function getInComeMoney(beforeMoney, simple) {
      var inCome = simple - beforeMoney;
      var px = ((inCome / beforeMoney) * 100) * 7;
      return px;
    }

  })();
};

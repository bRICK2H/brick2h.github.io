!function(t){var e={};function n(i){if(e[i])return e[i].exports;var a=e[i]={i:i,l:!1,exports:{}};return t[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(i,a,function(e){return t[e]}.bind(null,a));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(0);function i(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,a=!1,s=void 0;try{for(var o,r=t[Symbol.iterator]();!(i=(o=r.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){a=!0,s=t}finally{try{i||null==r.return||r.return()}finally{if(a)throw s}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function a(t,e,n){var i=parseInt(getComputedStyle(t).opacity);t.classList.add(e);var a=setInterval(function(){t.style.opacity=i+=.1,i>=.9&&(clearInterval(a),t.style.opacity=1)},n)}function s(t,e,n){var i=arguments.length>3&&void 0!==arguments[3]&&arguments[3],a=arguments.length>4?arguments[4]:void 0;t=t instanceof Array?t:[t],e=e instanceof Array?e:[e];var s=t.length;t.forEach(function(t,o){var r=parseInt(getComputedStyle(t).opacity),c=setInterval(function(){t.style.opacity=r-=.1,r<=0&&(t.classList.remove(e[o]),t.style.opacity=0,clearInterval(c),i&&t.remove(),o+1>=s&&"function"==typeof a&&a())},n)})}function o(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var r=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.container=document.querySelector("".concat(e.container)),this.x=e.x,this.y=e.y,this.maxCells=e.maxCells,this.min=e.min,this.widthField=25*this.x,this.createField(),this.setLabelsToCell(),this.setFirstActiveCells(),this.createNavMenu(),this.navOptions=document.querySelector(".nav__options"),this.navOptions.addEventListener("click",this.changeOptionsField.bind(this))}var e,n,i;return e=t,(n=[{key:"createNavMenu",value:function(){var t=document.createElement("div"),e=document.createElement("a"),n=document.createElement("span");t.classList.add("nav"),t.classList.add("nav--active"),e.classList.add("nav__options"),n.classList.add("nav__count"),t.style.width="".concat(this.widthField,"px"),e.textContent="Изменить поле",n.textContent=0,this.container.insertAdjacentElement("afterBegin",t),t.appendChild(e),t.appendChild(n)}},{key:"createField",value:function(){var t=document.createElement("div");t.style.width="".concat(this.widthField,"px"),t.classList.add("field"),t.classList.add("field--active"),this.container.appendChild(t);for(var e=1;e<=this.y;e++)for(var n=1;n<=this.x;n++){var i=document.createElement("div");i.classList.add("field__cell"),t.appendChild(i)}}},{key:"changeOptionsField",value:function(){var t=document.querySelector(".startMenu");s([document.querySelector(".nav"),document.querySelector(".field")],["nav--active","field--active"],10,!0,function(){a(t,"startMenu--active",20)})}},{key:"setLabelsToCell",value:function(){document.querySelectorAll(".field__cell").forEach(function(t,e){t.dataset.id=e+1})}},{key:"setFirstActiveCells",value:function(){var t=document.querySelectorAll(".field__cell"),e=this.getFirstActiveCells();t.forEach(function(t){if(-1!==e.indexOf(+t.dataset.id)){var n=document.createElement("div");n.classList.add("field__cell--active"),t.appendChild(n)}})}},{key:"getFirstActiveCells",value:function(){for(var t=[];3!==t.length;){var e=Math.floor(Math.random()*(this.maxCells-2+1))+2;t.length||t.push(e),-1===t.indexOf(e)&&t.push(e)}return t}}])&&o(e.prototype,n),i&&o(e,i),t}();function c(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var l=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.container=document.querySelector(".container"),this.nav=e.nav,this.field=e.field,this.startMenu=e.startMenu,this.result=e.result,this.popub=this.createPopupContainer(),this.createPopupContent(),this.addPopub(),this.changeNewField(),this.refresh()}var e,n,i;return e=t,(n=[{key:"createPopupContainer",value:function(){return document.body.insertAdjacentHTML("beforeEnd",'<div class="main-modal">\n\t\t\t\t<div class="container-modal">\n\t\t\t\t\t<div class="content-modal"></div> \n\t\t\t\t\t<div class="next-event">\n\t\t\t\t\t\t<a class="next-event__btn next-event__btn--main-menu" href="#">Главное меню</a>\n\t\t\t\t\t\t<a class="next-event__btn next-event__btn--refresh" href="#">Заново</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>'),document.querySelector(".main-modal")}},{key:"createPopupContent",value:function(){document.querySelector(".content-modal").textContent="Вы проиграли с результатом: ".concat(this.result)}},{key:"addPopub",value:function(){var t=this;setTimeout(function(){a(t.popub,"main-modal--active",20)},300)}},{key:"changeNewField",value:function(){var t=this;document.querySelector(".next-event__btn--main-menu").addEventListener("click",function(){s([t.popub,t.nav,t.field],["main-modal--active","nav--active","field--active"],0,!0,function(){a(t.startMenu,"startMenu--active",20)})})}},{key:"refresh",value:function(){var t=this;document.querySelector(".next-event__btn--refresh").addEventListener("click",function(){s([t.popub,t.nav,t.field],["main-modal--active","nav--active","field--active"],0,!0,function(){new m(JSON.parse(localStorage.getItem("settings")))})})}}])&&c(e.prototype,n),i&&c(e,i),t}();function u(t){return f(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||h()}function d(t,e){return f(t)||function(t,e){var n=[],i=!0,a=!1,s=void 0;try{for(var o,r=t[Symbol.iterator]();!(i=(o=r.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){a=!0,s=t}finally{try{i||null==r.return||r.return()}finally{if(a)throw s}}return n}(t,e)||h()}function h(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function f(t){if(Array.isArray(t))return t}function v(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}var y=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.cells=document.querySelectorAll(".field__cell"),this.activeCells=document.querySelectorAll(".field__cell--active"),this.navCount=document.querySelector(".nav__count"),this.x=e.x,this.y=e.y,this.min=e.min,this.maxCells=e.maxCells,this.intervalId=null,this.idActiveCells=this.getIdActiveCells(),this.snakePosition=1,this.snakePositions=[this.snakePosition],this.loadDefaultSnake(),this.tailSnakePosition=1,this.enlargeSnake=-1,this.rgbSnake=[[240,240,240]],this.stringRgbSnake=[],this.endGame=!1,this.catchCount=0,this.leftBorder=0,this.rightBorder=this.x+1,this.upBorder=0,this.downBorder=this.maxCells+1,this.leftPositions=[this.leftBorder],this.upPositions=[this.upBorder],this.rightPositions=[this.rightBorder],this.downPositions=[this.downBorder],this.createMovePositions(),this.arrayKeys=[],this.continue=!0,this.eventSnakeDirection=this.snakeDirection.bind(this),document.addEventListener("keydown",this.eventSnakeDirection)}var e,n,i;return e=t,(n=[{key:"loadDefaultSnake",value:function(){var t=this;this.cells.forEach(function(e){+e.dataset.id===t.snakePosition&&t.createSnake(e)})}},{key:"snakeDirection",value:function(t){var e=t.keyCode;this.continue=!0,this.arrayKeys.push(e);var n=d(this.arrayKeys,2),i=n[0],a=n[1];2===this.arrayKeys.length&&(37!==e&&39!==e||i%2!=0&&(this.continue=!1),38!==e&&40!==e||i%2==0&&(this.continue=!1),i===a?(this.arrayKeys.splice(-1),this.continue=!1):this.arrayKeys.splice(0,1)),this.continue&&this.autoDirection(e)}},{key:"autoDirection",value:function(t){switch(t){case 37:this.currentDirection(this.stepLeft);break;case 38:this.currentDirection(this.stepUp);break;case 39:this.currentDirection(this.stepRight);break;case 40:this.currentDirection(this.stepDown)}}},{key:"currentDirection",value:function(t){var e=this;clearInterval(this.intervalId);var n=setInterval(function(){t.call(e,n)},100);t.call(this,n),this.intervalId=n}},{key:"stepLeft",value:function(t){this.snakePosition--,-1!==this.leftPositions.indexOf(this.snakePosition)&&(this.snakePosition+=this.x),this.currentActionGame(t,["left",90],["left",25,90])}},{key:"stepUp",value:function(t){this.snakePosition-=this.x,-1!==this.upPositions.indexOf(this.snakePosition)&&(this.snakePosition=this.maxCells-Math.abs(this.snakePosition)),this.currentActionGame(t,["top",180],["top",25,180])}},{key:"stepRight",value:function(t){this.snakePosition++,-1!==this.rightPositions.indexOf(this.snakePosition)&&(this.snakePosition-=this.x),this.currentActionGame(t,["right",270],["left",-25,270])}},{key:"stepDown",value:function(t){this.snakePosition+=this.x,-1!==this.downPositions.indexOf(this.snakePosition)&&(this.snakePosition-=this.maxCells),this.currentActionGame(t,["bottom",0],["top",-25,0])}},{key:"currentActionGame",value:function(t,e,n){var i=d(e,2),a=i[0],s=i[1],o=d(n,3),r=o[0],c=o[1],l=o[2];if(!this.crashSnake())return this.drowActiveSnake(this.snakePosition),this.refreshActiveElement(this.snakePosition),this.turnHeadSnake(a,s),this.snakePositions.length>=2?(this.getOffestForTurnTailSnake(),!1):(this.turnTailSnake(r,c,l),!1);this.stopGame(t)}},{key:"drowActiveSnake",value:function(t){var e=this;this.snakePositions.push(t);var n=this.snakePositions.slice(0,this.enlargeSnake).length,i=this.snakePositions.slice(0,-1),a=i[i.length-1],s=i[0];this.snakePositions.splice(0,n);var o=this.snakePositions;this.cells.forEach(function(t){-1!==i.indexOf(+t.dataset.id)&&t.removeChild(t.querySelector(".field__cell--snake")),+t.dataset.id===a&&t.removeChild(t.querySelector(".field__cell--head")),+t.dataset.id===s&&t.removeChild(t.querySelector(".field__cell--tail")),-1!==o.indexOf(+t.dataset.id)&&e.createSnake(t);for(var n=function(n){+t.dataset.id===e.snakePositions[n]&&t.childNodes.length&&t.childNodes.forEach(function(t){t.classList.contains("field__cell--snake")&&(e.endGame||(t.style.background=e.stringRgbSnake[n]))})},r=e.snakePositions.length-2;r>=0;r--)n(r)})}},{key:"refreshActiveElement",value:function(t){-1!==this.idActiveCells.indexOf(t)&&(this.catchedActiveCells(),this.deleteActiveCells(t),this.addActiveElement(t),this.makeColorRgb())}},{key:"turnHeadSnake",value:function(t,e){var n=document.querySelector(".field__cell--head");n&&(n.style.cssText="bottom:auto;".concat(t,": -50%;transform:rotate(").concat(e,"deg)"))}},{key:"turnTailSnake",value:function(t,e,n){var i=document.querySelector(".field__cell--tail");if(i){var a=this.stringRgbSnake.length?this.stringRgbSnake[0]:"rgb(240,240,240)";i.style.cssText="top: auto;".concat(t,": ").concat(e,"px;\n\t\t\t\ttransform: rotate(").concat(n,"deg);\n\t\t\t\tbackground: ").concat(a,";")}}},{key:"getOffestForTurnTailSnake",value:function(){var t=Math.abs(this.upPositions[this.upPositions.length-1]),e=this.upPositions[this.upPositions.length-1],n=this.leftPositions[this.leftPositions.length-1],i=Math.abs(this.leftPositions[this.leftPositions.length-1]),a=d(this.snakePositions,2),s=a[0];switch(a[1]-s){case-this.x:case n:this.turnTailSnake("top",25,180);break;case-1:case t:this.turnTailSnake("left",25,90);break;case 1:case e:this.turnTailSnake("left",-25,270);break;case this.x:case i:this.turnTailSnake("top",-25,0)}}},{key:"stopGame",value:function(t){clearInterval(t),document.removeEventListener("keydown",this.eventSnakeDirection);var e=u(this.snakePositions.reverse()),n=e[0],i=e.slice(1);console.log(i),this.cells.forEach(function(t){+t.dataset.id===n&&t.lastChild.classList.add("field__cell--head-end");for(var e=0;e<i.length;e++)+t.dataset.id===i[e]&&t.childNodes.length&&t.childNodes.forEach(function(t){t.classList.add("field__cell--end")})}),new l({nav:document.querySelector(".nav"),field:document.querySelector(".field"),startMenu:document.querySelector(".startMenu"),result:this.catchCount})}},{key:"createSnake",value:function(t){var e=+t.dataset.id,n=document.createElement("div");if(n.classList.add("field__cell--snake"),t.appendChild(n),e===this.snakePosition){var i=document.createElement("div"),a=document.createElement("div"),s=document.createElement("span"),o=document.createElement("span");i.classList.add("field__cell--head"),a.classList.add("box-eye"),s.classList.add("box-eye__left-eye"),o.classList.add("box-eye__right-eye"),a.appendChild(s),a.appendChild(o),i.appendChild(a),t.appendChild(i)}if(e===this.snakePositions[0]){var r=document.createElement("div");r.classList.add("field__cell--tail"),t.appendChild(r)}}},{key:"createMovePositions",value:function(){for(var t=this.min;t<this.x;t++)this.upPositions.push(parseInt("-"+t)),this.downPositions.push(this.downBorder+t);for(var e=this.min;e<this.y;e++)this.leftPositions.push(this.leftBorder+=this.x),this.rightPositions.push(this.rightBorder+=this.x)}},{key:"getIdActiveCells",value:function(){var t=[];return this.activeCells.forEach(function(e){t.push(+e.parentNode.dataset.id)}),t}},{key:"deleteActiveCells",value:function(t){this.cells.forEach(function(e){+e.dataset.id===t&&e.childNodes.forEach(function(t){t.classList.contains("field__cell--active")&&(t.classList.add("field__cell--aim"),setTimeout(function(){t.remove()},600))})})}},{key:"catchedActiveCells",value:function(){var t=this;this.navCount.textContent=++this.catchCount,this.navCount.classList.add("nav__count--active"),setTimeout(function(){t.navCount.classList.remove("nav__count--active")},400)}},{key:"addActiveElement",value:function(t){var e=this,n=this.idActiveCells;n.forEach(function(e,i){t===e&&n.splice(i,1)});for(var i=function(){var t=Math.floor(Math.random()*(e.maxCells-e.min))+e.min;-1===n.indexOf(t)&&(n.push(t),e.cells.forEach(function(n){if(+n.dataset.id===t){var i=document.createElement("div");i.classList.add("field__cell--active"),e.enlargeSnake-=1,n.appendChild(i)}}))};3!==n.length;)i()}},{key:"makeColorRgb",value:function(){var t=this,e=d(this.rgbSnake,1)[0][0]-2;this.rgbSnake.unshift([e,e,e]),this.stringRgbSnake=[],this.rgbSnake.forEach(function(e){var n=d(e,3),i=n[0],a=n[1],s=n[2];t.stringRgbSnake.push("rgb(".concat(i,",").concat(a,",").concat(s,")"))})}},{key:"crashSnake",value:function(){var t=this,e=!1;return this.cells.forEach(function(n){n.childNodes.length&&n.childNodes.forEach(function(n){n.classList.contains("field__cell--snake")&&+n.parentNode.dataset.id===t.snakePosition&&(e=!0,t.endGame=!0)})}),!!e}}])&&v(e.prototype,n),i&&v(e,i),t}();function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var m=function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.settings=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),i.forEach(function(e){p(t,e,n[e])})}return t}({},e,{maxCells:e.x*e.y,min:1}),this.field=new r(this.settings),this.snake=new y(this.settings)};function k(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],i=!0,a=!1,s=void 0;try{for(var o,r=t[Symbol.iterator]();!(i=(o=r.next()).done)&&(n.push(o.value),!e||n.length!==e);i=!0);}catch(t){a=!0,s=t}finally{try{i||null==r.return||r.return()}finally{if(a)throw s}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}document.addEventListener("DOMContentLoaded",function(){var t=document.querySelector(".start-game__button"),e=document.querySelector(".choose-field__size"),n=document.querySelector(".startMenu"),o=document.querySelector(".tooltip"),r=document.querySelector(".tooltip__msg");t.addEventListener("click",function(){var t=Math.floor(document.body.clientWidth/30),c=Math.floor(document.body.clientHeight/36),l=function(t,e){var n=i(String(t),2),a=n[0],s=n[1],o=i(String(e),2),r=o[0],c=o[1],l="^(9|";if(a>1){for(var u=[],d=1;d<a;d++)u.push(d);l+="[".concat(u.join(","),"][\\d]|")}if(l+="[".concat(a,"][0-").concat(s,"])[x|х]("),r>1){for(var h=[],f=1;f<r;f++)h.push(f);l+="9|[".concat(h.join(","),"][\\d]|")}return l+="[".concat(r,"][0-").concat(c,"])$"),new RegExp(l)}(t,c),u=k(e.value.split(/[x|х]/),2),d=u[0],h=u[1],f=l.test(e.value),v={container:".container",x:Number(d),y:Number(h)};if(!f){var y=d<9||h<9?"Минимальный резмер 9x9":"Максимальный размер для текущего экрана - ".concat(t,"x").concat(c);return a(o,"tooltip--active",50),r.textContent=y,!1}s(n,"startMenu--active",20,!1,function(){console.log("start"),new m(v)}),function(t){localStorage.setItem("settings",JSON.stringify(t))}(v)}),e.addEventListener("focus",function(){o.classList.contains("tooltip--active")&&s(o,"tooltip--active",10)}),document.addEventListener("keydown",function(e){13===e.keyCode&&n.classList.contains("startMenu--active")&&t.click()})})}]);
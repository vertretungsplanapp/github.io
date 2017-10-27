if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'VertretungsplanApp3'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'VertretungsplanApp3'.");
}
var VertretungsplanApp3 = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var removeClass = Kotlin.kotlin.dom.removeClass_hhb33f$;
  function main(args) {
    var tmp$, tmp$_0, tmp$_1, tmp$_2;
    console.log('test');
    var vcardsContent = ((tmp$_0 = (tmp$ = document.getElementsByClassName('ly-page-vplan')[0]) != null ? tmp$.getElementsByClassName('ly-template-vcard') : null) != null ? tmp$_0 : Kotlin.throwNPE())[0];
    var mainContainer = ((tmp$_2 = (tmp$_1 = document.getElementsByClassName('ly-page-vplan')[0]) != null ? tmp$_1.getElementsByClassName('vp-main-container') : null) != null ? tmp$_2 : Kotlin.throwNPE())[0];
    if (Kotlin.isType(mainContainer, Element)) {
      for (var i = 0; i < 10; i++) {
        println('round: ' + i);
        var newCard = vcardsContent != null ? vcardsContent.cloneNode(true) : null;
        if (Kotlin.isType(newCard, Element)) {
          println('is element');
          newCard.removeAttribute('hidden');
          removeClass(newCard, ['ly-template-vcard']);
          var txClass = newCard.getElementsByClassName('vp-class')[0];
          txClass != null ? (txClass.innerHTML = 'Klasse' + i) : null;
          var txHours = newCard.getElementsByClassName('vp-hours')[0];
          txHours != null ? (txHours.innerHTML = i.toString()) : null;
          mainContainer.appendChild(newCard);
        }
      }
    }
  }
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('VertretungsplanApp3', _);
  return _;
}(typeof VertretungsplanApp3 === 'undefined' ? {} : VertretungsplanApp3, kotlin);

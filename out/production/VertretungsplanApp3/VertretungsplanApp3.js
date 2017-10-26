if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'VertretungsplanApp3'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'VertretungsplanApp3'.");
}
var VertretungsplanApp3 = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function main(args) {
    var tmp$, tmp$_0;
    console.log('test');
    var vcardsContent = ((tmp$_0 = (tmp$ = document.getElementsByClassName('ly-page-vplan')[0]) != null ? tmp$.getElementsByClassName('ly-template-vcard') : null) != null ? tmp$_0 : Kotlin.throwNPE())[0];
    println(vcardsContent);
  }
  _.main_kand9s$ = main;
  main([]);
  Kotlin.defineModule('VertretungsplanApp3', _);
  return _;
}(typeof VertretungsplanApp3 === 'undefined' ? {} : VertretungsplanApp3, kotlin);

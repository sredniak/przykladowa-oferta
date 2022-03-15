

$(document).ready(function() {



  $('.hamburger').on("click", function() {
    $('.menu').toggleClass('menu-otwarte');
    $(this).toggleClass('krzyzyk');
    
  });

});






//                                                    ###
//    ###   ## ##   ###                                ##
//   ## ##  ## ##  ## ##                               ##
//   ##     ## ##  ##            # ###   ###   ####    ##     ####   ####   ###
//    ###   ## ##  #####         ###    ## ##  ## ##   ##    ## ##  ##     ## ##
//      ##  ## ##  ## ##         ##     #####  ## ##   ##    ## ##  ##     #####
//   ## ##   ###   ## ##         ##     ##     ## ##   ##    ## ##  ##     ##
//    ###     #     ####         ##      ###   ####   ####    ## #   ####   ###
//                                             ##
//                                             ##
jQuery('img.svg').each(function() {
  var $img = jQuery(this);
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');
  jQuery.get(imgURL, function(data) {
    // Get the SVG tag, ignore the rest
    var $svg = jQuery(data).find('svg');
    // Add replaced image's ID to the new SVG
    if (typeof imgID !== 'undefined') {
      $svg = $svg.attr('id', imgID);
    }
    // Add replaced image's classes to the new SVG
    if (typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass + ' replaced-svg');
    }
    // Remove any invalid XML tags as per http://validator.w3.org
    $svg = $svg.removeAttr('xmlns:a');
    // Replace image with new SVG
    $img.replaceWith($svg);
  }, 'xml');
});


//
//     ###    ###    ###   ## ##  ####   #####
//    ## ##  ## ##  ## ##  ## ##   ##    ##
//    ##     ## ##  ## ##  ####    ##    ##
//    ##     ## ##  ## ##  ###     ##    ####
//    ##     ## ##  ## ##  ####    ##    ##
//    ## ##  ## ##  ## ##  ## ##   ##    ##
//     ###    ###    ###   ## ##  ####   #####
//
//

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}


//
//   ## ##  #####  ##     ####   #####  ####    ###
//   ## ##  ##     ##     ## ##  ##     ## ##  ## ##
//   ## ##  ##     ##     ## ##  ##     ## ##  ##
//   #####  ####   ##     ####   ####   ####    ###
//   ## ##  ##     ##     ##     ##     ###       ##
//   ## ##  ##     ##     ##     ##     ####   ## ##
//   ## ##  #####  #####  ##     #####  ## ##   ###
//
//
jQuery(document).ready(function($) {
  //obrysowuje wszystkie elementu html
  var DEBUG = false;
  // szuka pozycji elementu
  function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }

  if (DEBUG) {
    var p = '<div id="czujnik" style="position:fixed; left:0; bottom:0; font-size:10px; background:white;"><input id="colors" type="checkbox"/> <span id="debug-width" ></span>x<span id="debug-height" ></span><br></div>';
    $('body').append(p);
    //wyświetla szerokość i wysokość okna
    $(window).resize(function() {
      $('#debug-height').html($(window).height());
      $('#debug-width').html($(window).width());
    }).resize();

    var ciacho = getCookie('obrysuj');
    if (ciacho == "tak") {
      $('input#colors').prop('checked', true);
    }

    var obrysuj = function() {
      if ($('input#colors').is(':checked')) {
        $('body *').each(function(index) {
          var colors = ['red', 'blue', 'black', 'green', 'pink', 'orange', 'brown'];
          var random_color = colors[Math.floor(Math.random() * colors.length)];
          var box_shadow = '0 0 0 1px ' + random_color + ' ';
          var tag_name = $(this).prop("tagName");
          var class_name = $(this).attr("class");
          var el_position = getOffset(this);

          if ($(this).css('-webkit-box-shadow') == 'none') {
            $(this).css('-webkit-box-shadow', box_shadow);
            console.log("pozycja");
            console.log(el_position);
            console.log(el_position.top);
            // to z pozycją ale jakos nie działa $(this).append('<div id="helper_tag_name" style="display: none; background:'+random_color+'; content:\''+ tag_name +'\'; position: absolute; top:'+el_position.top+'px; left:'+el_position.left+'px; color:white; font-size:9px; font-family: monospace; z-index:2222;">'+tag_name+'.'+class_name+'</div>');
            $(this).append('<div id="helper_tag_name" style="display: none; background:' + random_color + '; content:\'' + tag_name + '\'; position: absolute; color:white; font-size:9px; font-family: monospace; z-index:2222;">' + tag_name + '.' + class_name + '</div>');
            $(this).hover(function() {

              $(this).children('#helper_tag_name').css("display", "block");

            }, function() {
              $(this).children('#helper_tag_name').css("display", "none");
            });
          }
        });
      } else {
        $('body *').each(function() {
          $(this).remove('#helper_tag_name');
          if ($(this).css('-webkit-box-shadow') !== 'none') {
            $(this).css('-webkit-box-shadow', '');
          }
        });
      }
    };
    obrysuj();

    //    dodanie nazw klas
    // div{
    //   position:relative;
    // }
    // div::after {
    //     position: absolute;
    //     background: black;
    //     color: #fff;
    //     top: 0;
    //     left: 0;
    //     content: 'cos';
    // }

    //orbysowuje randomowym kolorem i trzyma w ciastku
    $('input#colors').change(function() {
      obrysuj();
      if ($('input#colors').is(':checked')) {

        setCookie('obrysuj', 'tak', 365);
      } else {
        setCookie('obrysuj', 'nie', 365);

      }

    });

  }
  // adds ios class to html tag
  
}); //end ready


//
//        #     ###    ###           ###   ## ##  ####    ###   ##     ##     ####
//       ###   ## ##  ## ##         ## ##  ## ##  ## ##  ## ##  ##     ##     ## ##
//      ## ##  ## ##  ##            ##     ####   ## ##  ## ##  ##     ##     ## ##
//      ## ##  ## ##   ###           ###   ###    ####   ## ##  ##     ##     ####
//      #####  ## ##     ##            ##  ####   ###    ## ##  ##     ##     ###
//      ## ##  ## ##  ## ##         ## ##  ## ##  ####   ## ##  ##     ##     ####
//      ## ##   ###    ###           ###   ## ##  ## ##   ###   #####  #####  ## ##
//
//
AOS.init();

skrollr.init({
  mobileCheck: function() {
    //hack - forces mobile version to be off
    return false;
  }
});

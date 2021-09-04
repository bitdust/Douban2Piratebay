// ==UserScript==
// @name         Douban2Piratebay
// @namespace    https://github.com/bitdust/Douban2Piratebay/
// @version      0.7
// @description  And direct link to piratebay from douban movie page.
// @author       bitdust
// @match        https://movie.douban.com/subject/*
// @updateURL    https://raw.githubusercontent.com/bitdust/Douban2Piratebay/master/Douban2Piratebay.meta.js
// @downloadURL  https://raw.githubusercontent.com/bitdust/Douban2Piratebay/master/Douban2Piratebay.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function insertAfter(newNode, referenceNode) {
        $(newNode).appendTo(referenceNode);
    }
    
    function addLink(fragment, text, href){
        let a = document.createElement("a")
        a.textContent = text;
        a.href = href;
        fragment.appendChild(a);
    }

    var links =  document.querySelectorAll (
        "#info"
    );
    var imdbLink = null;
    var imdbindex = null;
    var imdbRe=new RegExp(".*?(tt[0-9]{4,})");
    for (var i=0; i<links.length; i++) {
        if(imdbRe.test(links[i].textContent)) {
            imdbLink = links[i];
            imdbindex = imdbRe.exec(links[i].textContent)[1];
            break;
        }
    }

    if (imdbindex !== null) {
       var fragment = document.createDocumentFragment();
       var br = document.createElement("br");
       var span = document.createElement("span")
       span.class="pl"
       span.textContent = "资源: ";
       fragment.appendChild(span);
       addLink(fragment, "TPB ", 'https://thepiratebay.org/search/' + imdbindex);
       addLink(fragment, "RARGB ", 'https://rarbgmirror.com/torrents.php?search=' + imdbindex);
       fragment.appendChild(br);
       insertAfter(fragment, imdbLink);
    }
})();

// ==UserScript==
// @name         Douban2Piratebay
// @namespace    https://github.com/bitdust/Douban2Piratebay/
// @version      0.6
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
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    
    function addLink(fragment, text, href){
        let a = imdblink.cloneNode(true);
        a.textContent = text;
        a.href = href;
        fragment.appendChild(a);
    }

    var links =  document.querySelectorAll (
        "#info > a"
    );
    var imdblink = null;
    var imdbRe = new RegExp("tt[0-9]{4,}");
    for (var i=0; i<links.length; i++) {
        if(imdbRe.test(links[i].textContent)) {
            imdblink = links[i];
            break;
        }
    }

    if (imdblink !== null) {
       var imdbindex = imdblink.innerText;
       var fragment = document.createDocumentFragment();
       var br = document.createElement("br");
       var span = imdblink.previousElementSibling.cloneNode(false);
       span.textContent = "资源：";
       //资源提示阔以明显
       span.style = "color:red";
       fragment.appendChild(br);
       fragment.appendChild(span);
       addLink(fragment, "TPB ", 'https://thepiratebay.org/search/' + imdbindex);
       addLink(fragment, "RARGB ", 'https://rarbgmirror.com/torrents.php?imdb=' + imdbindex);
       addLink(fragment, "HD湾 ", 'http://www.hdwan.net/?s=' + imdbindex);
       addLink(fragment, "电影天堂 ", 'http://www.btrr.net/?s=' + imdbindex);
       insertAfter(fragment, imdblink);
    }
})();

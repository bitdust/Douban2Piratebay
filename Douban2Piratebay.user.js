// ==UserScript==
// @name         Douban2Piratebay
// @namespace    https://github.com/bitdust/Douban2Piratebay/
// @version      0.5
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

    function addLink(name, href){
        let imdbindex = imdblink.innerText;
        let fragment = document.createDocumentFragment();
        let br = document.createElement("br");
        let parent = imdblink.parentElement;
        let span = imdblink.previousElementSibling.cloneNode(false);
        span.textContent = name + "链接: ";
        let a = imdblink.cloneNode(true);
        a.textContent = "下载";
        a.href = href + imdbindex;
        fragment.appendChild(br);
        fragment.appendChild(span);
        fragment.appendChild(a);
        insertAfter(fragment, imdblink);
    }

    if (imdblink !== null) {
       addLink("电影天堂", 'http://www.btrr.net/tag/');
       addLink("HD湾", 'http://www.hdwan.net/?s=');
       addLink("RARGB", 'https://rarbgmirror.com/torrents.php?imdb=');
       addLink("海盗湾", 'https://thepiratebay.org/search/');
    }
})();

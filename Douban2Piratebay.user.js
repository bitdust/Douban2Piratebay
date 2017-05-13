// ==UserScript==
// @name         Douban2Piratebay
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  And direct link to piratebay from douban movie page.
// @author       bitdust
// @match        https://movie.douban.com/subject/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    var links =  document.querySelectorAll (
        "#info > a"
    );
    var imdblink = null;
    var imdbRe = new RegExp("tt[0-9]{4,}");
    for (var i=0;i<links.length;i++) {
        if(imdbRe.test(links[i].textContent)) {
            imdblink = links[i];
            break;
        }
    }
    if (imdblink !== null) {
        var imdbindex = imdblink.innerText;
        var fragment = document.createDocumentFragment();
        var br = document.createElement("br");
        var parent = imdblink.parentElement;
        var span = imdblink.previousElementSibling.cloneNode(false);
        span.textContent = "海盗湾链接: ";
        span.class = 'pl';
        var a = imdblink.cloneNode(true);
        a.href = 'https://thepiratebay.org/search/' + imdbindex;
        fragment.appendChild(br);
        fragment.appendChild(span);
        fragment.appendChild(a);
        insertAfter(fragment, imdblink);
    }
})();

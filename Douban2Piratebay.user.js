// ==UserScript==
// @name         Douban2PiratebayDebug+Fixed
// @namespace    https://github.com/ZaitianWang/Douban2Piratebay
// @version      1.0.0
// @description  And direct link to piratebay, rargb, and IMDb from douban movie page.
// @author       bitdust
// @author       anonee
// @match        https://movie.douban.com/subject/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
//    alert("start debugging");
    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    function addLink(fragment, text, href){
        let a = document.createElement("A");
        a.textContent = text;
        a.href = href;
        fragment.appendChild(a);
    }
//
//
//find the info div
    var myDiv = document.querySelector("#info");
//    alert(myDiv.tagName);
//find the last child (seems to be the empty one after "<br>"
//so, use two previousSibling to locate the real imdb
//(better if use a loop, but i don't want to)
    var theRealIMDb = myDiv.lastChild.previousSibling.previousSibling;
    var theRealIMDbID = theRealIMDb.textContent.trim();
//    alert(theRealIMDbID);

//    alert(myDiv.innerText);

    //        "#info > a"
//decrepted because douban remove the imdb link
//thus cannot find imdb id by locating links
//     var links = document.querySelectorAll (

//the whole part is also decrepted since current version use another method to locate imdb link
//         "#info > *"
//     );
//     var imdblink = null;
//     var imdbRe = new RegExp("tt[0-9]{4,}");
//     for (var i=0; i<links.length; i++) {
// //        if(imdbRe.test(links[i].textContent)) {
//         if(links[i].innerText == "IMDb:") {
//             alert(i+1 + " possible links" + links[i].innerText + links[i].tagName);
//             alert("find an IMDB");
//             imdblink = links[i];
// //            break;
//         }
//     }

//    alert(links.innerText);
//    imdblink = links.prop("lastChild").nodeValue;
//    alert(imdblink);

    if (theRealIMDb !== null) {
//       alert(theRealIMDbID);
//       var imdbindex = imdblink.innerText;
       var fragment = document.createDocumentFragment();
       var br = document.createElement("br");
       var span = theRealIMDb.previousElementSibling.cloneNode(false);
       span.textContent = "资源：";
       fragment.appendChild(br);
       fragment.appendChild(span);
       addLink(fragment, "TPB ", 'https://thepiratebay.org/search/' + theRealIMDbID);
       addLink(fragment, "RARGB ", 'https://rarbgmirror.com/torrents.php?search=' + theRealIMDbID);
       addLink(fragment, "IMDb ", 'https://www.imdb.com/title/'+theRealIMDbID);
       insertAfter(fragment, theRealIMDb);
    }
//    else alert("imdb not found");
})();

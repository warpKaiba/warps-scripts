// ==UserScript==
// @name         Twitter Minor Detector
// @namespace    http://tampermonkey.net/
// @downloadURL  https://github.com/warpKaiba/warps-scripts/raw/master/twitter_zoomer_detected.user.js
// @version      1.3
// @description  highlights minors in your followers list
// @author       warpKaiba
// @match        *twitter.com/*/followers*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    function main() {
        //console.log('hl minors main()')
        ////var users = $('.css-901oao.r-jwli3a.r-1qd0xha.r-a023e6.r-16dba41.r-ad9z0x.r-bcqeeo.r-glunga.r-1jeg54m.r-qvutc0'); //i fucking hate twitter so god damn much
        //var users = $("[aria-label='Timeline: Followers']")[0].firstChild.childNodes[5].firstChild.firstChild.firstChild.lastChild.lastChild.children //fuck this fuck you
        var users = $("[aria-label='Timeline: Followers']")[0].firstChild.childNodes;

        for (var i = 0; i < users.length; i++) {
            if (users[i].firstChild.firstChild.firstChild == null) {
                continue
            }

            var currentUser = users[i].firstChild.firstChild.firstChild.lastChild.lastChild;
            //i swear to god there is no better way to do this literally? web developers just crawl in the dirt and fucking die challenge

            var textContent = "";
            for (var k = currentUser.childNodes.length-1; k >= 0; k--) {
                if(currentUser.childNodes[k].childElementCount == 0) {
                    textContent += currentUser.childNodes[k].textContent;
                }
            }
            //console.log(textContent);

            if (textContent.match(/([^A-z]|^)minor([^A-z]|$)/ig)) { //looks for 'minor' not part of another word, (eg not "minority" or "minors")
                //users[i].parentNode.parentNode.parentNode.style = "background:rgb(150, 20, 20)!important;";
                users[i].firstChild.style = "background:rgb(100, 20, 20)!important;";
                continue;
            }

            var numbers = textContent.replaceAll(/\d{1,4}(\||\/|\.|\\|-|\s)\d{1,4}(\||\/|\.|\\|-|\s)\d{1,4}/g, "date_Was_Here")
            var array1 = Array.from(numbers.matchAll(/\D1\d\D/g), m => m[0])
            var array2 = Array.from(numbers.matchAll(/^1\d\D/g), m => m[0])
            var array3 = Array.from(numbers.matchAll(/\D1\d$/g), m => m[0])
            var array = array1.concat(array2).concat(array3)

            if (numbers != undefined) {

                for (var j = 0; j < array.length; j++) {
                    if (array[j].replaceAll(/[^0-9]/g, "") < 18) {
                        //console.log(numbers[j].slice(1,3));
                        //console.log(textContent.replaceAll(/\d{1,4}(\||\/|\.|\\|-|\s)\d{1,4}(\||\/|\.|\\|-|\s)\d{1,4}/g, "date_Was_Here"))
                        //users[i].parentNode.parentNode.parentNode.style = "background:rgb(50, 20, 20)!important;";
                        users[i].firstChild.style = "background:rgb(100, 20, 20)!important;";
                        //users[i].textContent += numbers[j]
                        continue;
                    }
                }
            }
        }
    }
    setInterval(main, 1000);
})();

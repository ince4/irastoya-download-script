// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ince4
// @match        https://www.irasutoya.com
// @match        https://www.irasutoya.com/search/label/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let container = document.querySelector('.widget.Blog')
    let img = document.querySelectorAll('.boxim img');
    let boxim = document.querySelectorAll('.boxim');
    if (container != null && img.length > 0) {
        // 样式
        let style = document.createElement("style");
        style.innerText = `.icon-font{position:absolute;z-index:6;cursor:'pointer';top:${img[0].width/16}px;right:${img[0].width/16}px;}.icon-font:hover path{fill:#f79833;}.icon-font path{transition:all .2s}`;
        style.type = "text/css";
        document.querySelector('head').appendChild(style);

        let iconGengDuo = `<svg t="1583414314610" class="icon-font" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2505" width="${img[0].width / 8}" height="${img[0].width / 8}"><path d="M207.872 512m-79.872 0a79.872 79.872 0 1 0 159.744 0 79.872 79.872 0 1 0-159.744 0Z" fill="#515151" p-id="2506"></path><path d="M512 512m-79.872 0a79.872 79.872 0 1 0 159.744 0 79.872 79.872 0 1 0-159.744 0Z" fill="#515151" p-id="2507"></path><path d="M816.128 512m-79.872 0a79.872 79.872 0 1 0 159.744 0 79.872 79.872 0 1 0-159.744 0Z" fill="#515151" p-id="2508"></path></svg>`;
        let iconDownLoad = `<svg t="1583406803528" class="icon-font" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1625" width="${img[0].width / 8}" height="${img[0].width / 8}"><path d="M1024.00262 643.51v320.074A59.977 59.977 0 0 1 964.46462 1024H59.54162A59.977 59.977 0 0 1 0.00162 963.584V643.511c0-33.353 9.363-53.394 42.277-53.394s43.74 20.04 43.74 53.394v293.961H938.57162V643.511c0-33.353 8.996-53.394 41.91-53.394 32.915 0 43.52 20.04 43.52 53.394z m-554.496-15.579V47.91C469.50662 14.482 480.18662 0 513.10162 0s48.2 14.482 48.2 47.835v580.023L717.97462 464.75c20.992-26.332 53.687-50.176 79.36-21.943 22.674 24.868 17.7 48.786-5.267 72.63l-237.494 246.2a59.1 59.1 0 0 1-85.066 0l-237.494-246.2c-23.04-23.844-19.237-51.93 0-72.63 19.163-20.626 53.76-1.829 76.8 21.943L469.50662 627.93z" p-id="1626" fill="#d37726"></path></svg>`;
        for (let i = 0; i < img.length; i++) {
            // 插入节点
            let icon = document.createElement('span');
            icon.innerHTML = iconGengDuo;
            icon.setAttribute('data-src', img[i].src);
            boxim[i].style.position = 'relative';
            boxim[i].appendChild(icon);
        }

        container.addEventListener('click', e => {
            if (e.target.nodeName === 'svg') {
                console.log('omg');
            }
        })
    }


})();
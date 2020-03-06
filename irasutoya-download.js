// ==UserScript==
// @name         irasutoya-download
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ince4
// @match        https://www.irasutoya.com
// @match        https://www.irasutoya.com/search*
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
        style.innerText = `.icon-font{position:absolute;z-index:6;cursor:'pointer';top:4px;right:4px;}.icon-font:hover path{fill:#f79833;}.icon-font path{transition:all .2s}.pannel{content:'';background-color: white;box-shadow: 1px 1px 3px 1px #b3b3b3;position:absolute;border-radius: 5px;top:30px;right:10px;padding:10px;font-size: 14px;user-select: none;}input {margin: 10px 0;text-align: center;}.length, .size-display {text-align: center;}.download-btn {text-align: center;border: 1px solid black;border-radius: 4px;line-height: 24px;cursor: pointer;margin-top: 10px;transition: .2s all;}.download-btn:hover {border-color: #f79833;color: #f79833;}`;
        style.type = "text/css";
        document.querySelector('head').appendChild(style);
        // 图标
        let iconGengDuo = `<svg t="1583414314610" class="icon-font" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2505" width="25px" height="25px"><path d="M207.872 512m-79.872 0a79.872 79.872 0 1 0 159.744 0 79.872 79.872 0 1 0-159.744 0Z" fill="#515151" p-id="2506"></path><path d="M512 512m-79.872 0a79.872 79.872 0 1 0 159.744 0 79.872 79.872 0 1 0-159.744 0Z" fill="#515151" p-id="2507"></path><path d="M816.128 512m-79.872 0a79.872 79.872 0 1 0 159.744 0 79.872 79.872 0 1 0-159.744 0Z" fill="#515151" p-id="2508"></path></svg>`;
        // 缩略图上设置按钮
        for (let i = 0; i < img.length; i++) {
            let icon = document.createElement('span');
            icon.innerHTML = iconGengDuo;
            icon.setAttribute('data-index', i);
            icon.setAttribute('data-src', img[i].src);
            boxim[i].style.position = 'relative';
            boxim[i].appendChild(icon);
        }
        document.createElement('div.pannel');
        // 展开
        let pannel = document.createElement('div');
        pannel.className = 'pannel';
        pannel.innerHTML = `<div>尺寸选择</div><label><input type="radio" name="size" value="180" checked>小&nbsp;</label><label><input type="radio" name="size" value="400">中&nbsp;</label><label><input type="radio" name="size" value="800">大&nbsp;</label><label><input id="cus" type="radio" name="size" value="1">自定义</label><div style="display: none;" class="length">边长 <input type="number" min="0" max="800"> px</div><div class="size-display">180 * 180 px</div><div class="download-btn">下载</div>`
        let isPannelShow = false;
        container.addEventListener('click', e => {
            if (e.target.nodeName === 'svg' || e.target.nodeName === 'path') {
                if (!isPannelShow) {
                    e.stopPropagation();
                    isPannelShow = true;
                    let index = e.target.parentNode.dataset.index || e.target.parentNode.parentNode.dataset.index;
                    let src = e.target.parentNode.dataset.src || e.target.parentNode.parentNode.dataset.src;
                    boxim[index].appendChild(pannel);
                    // 事件
                    let downloadBtn = document.querySelector('.download-btn');
                    let lengthBar = document.querySelector('.length');
                    let sizeDisplay = document.querySelector('.size-display');
                    let checkedRadio = document.querySelector('input[name="size"]:checked');
                    let cusInput = lengthBar.querySelector('input[type="number"]');
                    // 面板显示更新
                    pannel.addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (e.target.name === 'size') {
                          lengthBar.style.display = 'none';
                          checkedRadio = document.querySelector('input[name="size"]:checked');
                          sizeDisplay.innerHTML = `${checkedRadio.value} * ${checkedRadio.value} px`;
                          if (e.target.id === 'cus') {
                            cusInput.value = 1;
                            lengthBar.style.display = 'block';
                          }
                        }
                    })
                    // 面板显示更新
                    cusInput.addEventListener('change', function(e) {
                        e.stopPropagation();
                        this.value = this.value > 800 ? 800 : this.value;
                        this.value = this.value < 1 ? 1 : this.value;
                        sizeDisplay.innerHTML = `${this.value} * ${this.value} px`;
                    })
                     // 关闭展开
                     document.addEventListener('click', e2 => {
                         if (e2.target.className !== 'pannel' && isPannelShow === true) {
                             isPannelShow = false;
                             pannel.parentNode.removeChild(pannel);
                         }
                     },{once: true})
                     } else {
                         isPannelShow = false;
                         pannel.parentNode.removeChild(pannel);
                     }
            }
        })
    }
})();
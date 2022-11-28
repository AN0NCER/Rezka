// ==UserScript==
// @name         Rezka
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  download you film
// @author       Anoncer
// @match        https://rezka.ag/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rezka.ag
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    let show_log = false;
    let extension = 'm4v';
    let download = false;
    let is_mac = true;

    let interval, m3u8, resources, terminal;
    let rnd = 'rezka' + Math.floor(Math.random() * 101);

    async function Main() {
        interval = setInterval(() => {
            resources = performance.getEntriesByType('resource');
            log(resources);
            if (resources) {
                resources.forEach(element => {
                    if (get_url_extension(element.name) == "m3u8") {
                        let se = document.querySelector('#simple-seasons-tabs > li.b-simple_season__item.active').textContent ? document.querySelector('#simple-seasons-tabs > li.b-simple_season__item.active').textContent.replace(/^\D+/g, '') : '0';
                        let ep = document.querySelector('#simple-episodes-list-1 > li.b-simple_episode__item.active').textContent ? document.querySelector('#simple-episodes-list-1 > li.b-simple_episode__item.active').textContent.replace(/^\D+/g, '') : '0';
                        let qa = document.querySelector('#cdnplayer_settings > pjsdiv > pjsdiv:nth-child(1) > pjsdiv:nth-child(4)').textContent ? document.querySelector('#cdnplayer_settings > pjsdiv > pjsdiv:nth-child(1) > pjsdiv:nth-child(4)').textContent.replace(/\s/g, '') : 'null';
                        log(element);
                        m3u8 = element.name;
                        terminal = `ffmpeg -i ${m3u8} -c copy -bsf:a aac_adtstoasc s${se}-e${ep}-q${qa}.${extension}`;
                        if (download) {
                            generate_download_link(generate_file(terminal), `s${se}-e${ep}-q${qa}`);
                        } else {
                            show_command(terminal);
                        }
                        log(terminal, true);
                    }
                });
            }
            performance.clearResourceTimings();
        }, 1000);
    }

    async function log(data, lg = show_log) {
        if (lg) {
            console.log(data);
        }
    }

    function get_url_extension(url) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }

    function generate_file(content = "") {
        return new Blob([content], { type: 'text' });
    }

    function generate_download_link(file = new Blob(), name = "") {
        let ext = is_mac ? '.sh' : '.bat';
        let link = document.querySelector('#'+rnd);
        if (link){
            link = document.createElement('a');
        }
        link.setAttribute('href', URL.createObjectURL(file));
        link.setAttribute('download', name + ext);
        link.setAttribute('id', rnd);
        link.textContent = 'Завантажити епізод';
        let parent = document.querySelector('#main > div.b-container.b-wrapper > div > div.b-content__columns.pdt.clearfix > div.b-content__main');
        let before = document.querySelector('#main > div.b-container.b-wrapper > div > div.b-content__columns.pdt.clearfix > div.b-content__main > table.b-post__rating_table');
        parent.insertBefore(link, before);
    }

    function show_command(command) {
        if (!document.querySelector('#'+rnd)){
            let data = document.createElement('div');
            data.setAttribute('id', rnd);
            data.setAttribute('style', 'word-break: break-all;');
            data.textContent = command;
            let parent = document.querySelector('#main > div.b-container.b-wrapper > div > div.b-content__columns.pdt.clearfix > div.b-content__main');
            let before = document.querySelector('#main > div.b-container.b-wrapper > div > div.b-content__columns.pdt.clearfix > div.b-content__main > table.b-post__rating_table');
            parent.insertBefore(data, before);
        }else{
            document.querySelector('#'+rnd).textContent = command;
        }
    }

    Main();
})();
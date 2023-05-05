
;(function() {
    var miaoshou_loaded = false
    let timer;

    document.addEventListener("DOMContentLoaded", function() {
        var mutationObserver = new MutationObserver(function(m) {
            const currentTabId = get_uiCurrentTabContent()?.id
      
            if (currentTabId == "tab_miaoshou_assistant") {
                // may be called several times
                onMiaoshouLoad()
            }
        });
        mutationObserver.observe( gradioApp(), { childList:true, subtree:true })
    });


    function onMiaoshouLoad() {
        let modelDownloadParentDom = document.querySelector('#model_download_tab').parentNode

        let targetDom = modelDownloadParentDom.querySelectorAll('.tab-nav button')[2]
        targetDom.addEventListener('click', function() { delayTrigger(300) }, false)
    }

    function delayTrigger(delayMs) {
        if (timer) {
            window.clearTimeout(timer)
        }
        timer = window.setTimeout(setDomImages, delayMs)
    }
      

    function setDomImages() {
        // console.log('===========setDomImages')
        let dataSetWrapperDom = document.querySelector('#model_dataset')
        if (dataSetWrapperDom.offsetWidth > 0) {
            // load imgs which are visible to user first
            let imgDoms = dataSetWrapperDom.querySelectorAll('.model-item img')
            let otherImgDoms = []
            for (let domImg of imgDoms) {
                if (!domImg.getAttribute('src')) {
                    let domImgBottom = domImg.getBoundingClientRect().bottom
                    let domImgTop = domImg.getBoundingClientRect().top
                    let windowHeight = window.innerHeight
                    
                    if (domImgTop < windowHeight && domImgBottom > 0) {
                        let url = domImg.getAttribute('data-src')
                        console.log(url)
                        domImg.setAttribute('src', url)
                    } else {
                        otherImgDoms.push(domImg)
                    }
                } 
            }

            // load other imgs
            for (let domImg of otherImgDoms) {
                let url = domImg.getAttribute('data-src')
                domImg.setAttribute('src', url)
            }
        }
    }

    document.addEventListener("scroll", function () {
        // console.log("===========is scrolling")
        delayTrigger(100)
    })
})();



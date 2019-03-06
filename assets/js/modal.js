function Modal(){

    var body;
    var element;
    var article;
    var closeBtn;
    var contentWrapper;
    var modalCustomClass;
    var $originalContainer;


    function init(){
        html = document.querySelector('html');
        body = document.querySelector('body');
        element = document.createElement('div');
        contentWrapper = document.createElement('div');
        article = document.createElement('div');
        closeBtn = document.createElement('button');

        element.classList.add('full-width-content-container');
        contentWrapper.className += 'content-wrapper';
        article.className += 'article-wrapper';
        closeBtn.className += 'btn-close';


        element.appendChild(contentWrapper);
        contentWrapper.appendChild(article);

        body.insertBefore(element, body.firstChild);

        //body.addEventListener('click', function(e) {
        //    if(element.classList.contains('active')) {
        //        console.log('yeheee');
        //        hide();
        //    }
        //});



    }

    function show(){
        element.classList.add('active');
        html.classList.add('no-scroll');

        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            article.innerHTML = "";
            window.location.hash = "";
            hide();
        });

        if (window.location.search.indexOf('device=kiosk') >= 0 || localStorage.isKiosk) {
            $('.brand-modal .btn-link').css({display: "none"});
        }



        element.appendChild(closeBtn);


    }

    function hide(){

        if ($originalContainer) {
            $originalContainer.append(contentWrapper.children().first().detach());
        }

        $originalContainer = null;

        //contentWrapper.removeClass(modalCustomClass);
        //element.removeClass('active');
        html.classList.remove('no-scroll');
        element.classList.remove('active');
        //$('html').removeClass('scroll-disabled');
    }

    function setContent(content, className, origContainer){

        if (className) {
            modalCustomClass = className;
            contentWrapper.addClass(modalCustomClass);
        }

        $originalContainer = origContainer;

        contentWrapper.innerHTML = "";

        contentWrapper.appendChild(content);
        element.appendChild(closeBtn);

        setTimeout(function(){
            content.className += 'active';
        }, 0);
    }

    return {
        init: init,
        show: show,
        hide: hide,
        setContent: setContent
    };
}

var modal = new Modal();
modal.init();

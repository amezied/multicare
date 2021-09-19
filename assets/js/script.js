
window.onload = function() {
    // hide Loader
    $('#loader').addClass('hidden');

    // check if document is RTL or LTR
    isRTL = $('html').attr("lang") === 'ar';

/*
    // write placeholders automatically
    var labels = document.querySelectorAll("label:not(.custom-control-label)");
    var i = labels.length;
    while (i--) {
        var label = labels.item(i);
        var text = label.textContent;
        label.parentNode.classList.contains("required") && (text += "*");
        label.nextElementSibling.setAttribute("placeholder", text);
    }
*/



    //get current year
    let d = new Date();
    $('#current-year')[0].innerText = d.getFullYear()


    // isInViewport function
    $.fn.isInViewport = function () {
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();

        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    // Sweet Alert preparation
    window.swal = swal.mixin({
        confirmButtonColor: 'var(--secondary)',
        cancelButtonColor: 'var(--primary)',
    });
    window.toast = swal.mixin({
        toast: true,
        position: 'top',
        icon: 'success',
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        onOpen: (toast) => {
            toast.addEventListener('mouseenter', swal.stopTimer);
            toast.addEventListener('mouseleave', swal.resumeTimer)
        }
    });


    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

















    // Counter
    $(window).on('scroll',function() {
        $('.counter-number').each(function() {
            if ($(this).isInViewport()) {

                let $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum);
                            //alert('finished');
                        }
                    });
            } else{
                this.innerText='00'
            }
        });
    });



    // add .d-none class to selected option
    let selectedValue = $("input[name='payment']:checked").val()
    // add d-none class for both
    $('.monthly,.yearly').toggleClass('d-none')
    // remove d-none class from selected option
    $('.'+selectedValue).removeClass('d-none')


    // Packages type change
    $('#packages-payment input[type="radio"]').on('change',function(){
        $('.monthly,.yearly').toggleClass('d-none')
    })

    // Packages type change
    $('#packages-type').on('change','input[type="radio"]',function(e){
        let val = e.target.value
        // console.log(val)
        $('#packages tbody tr').show();

        // If there is a value hide all the rows except the ones with a data-year of that value
        if(val !== 'all') {
            $('#packages tbody tr').not($('#packages tbody tr[data-pkg-type="' + val + '"]')).hide();
        }
        $("#packages tbody tr:visible").each(function (index) {
            $(this).css("background-color", !(index & 1)? "rgba(0,0,0,.05)" : "rgba(0,0,0,0)");
        });
    })



    // captcha confirmation
    let recaptcha = document.querySelector('#g-recaptcha-response');

    if(recaptcha) {
        recaptcha.setAttribute("required", "required");
        recaptcha.oninvalid = function(e) {
            $("#not-robot").removeClass("d-none").addClass("d-block")
        }
    }


    $('[data-toggle="tooltip"]').tooltip()

};




/*

    // https://fancyapps.com/fancybox/3/docs/#options
    $('[data-fancybox="gallery"]').fancybox({
        animationEffect: "zoom",

        buttons: [
            "zoom",
            "share",
            "slideShow",
            "fullScreen",
            "download",
            "thumbs",
            "close"
        ],

        thumbs: {
            autoStart: true, // Display thumbnails on opening
        },

        lang: isRTL?'ar':'en',
        i18n: {
            en: {                CLOSE: "Close",
                NEXT: "Next",
                PREV: "Previous",
                ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                PLAY_START: "Start slideshow",
                PLAY_STOP: "Pause slideshow",
                FULL_SCREEN: "Full screen",
                THUMBS: "Thumbnails",
                DOWNLOAD: "Download",
                SHARE: "Share",
                ZOOM: "Zoom"
            },
            ar: {
                CLOSE: "أغلق",
                NEXT: "التالى",
                PREV: "السابق",
                ERROR: "المحتوى المطلوب لا يمكن تحميله. <br/> يرجى المحاولة مرة أخرى في وقت لاحق.",
                PLAY_START: "ابدا عرض الشرائح",
                PLAY_STOP: "وقفة عرض الشرائح",
                FULL_SCREEN: "تكبير الشاشة",
                THUMBS: "المصغرات",
                DOWNLOAD: "تحميل",
                SHARE: "شارك",
                ZOOM: "تكبير",
            }
        }
    });
*/

///////////////// fixed menu on scroll
$(window).scroll(function(){
    if ($(this).scrollTop() > 250) {
        $('nav.navbar').addClass("fixed-top animate");

        $('#scroll-top').addClass('show')

    }else{
        $('nav.navbar').removeClass("fixed-top animate");

        $('#scroll-top').removeClass('show')
    }
});


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}
function recaptchaCallback() {
    $("#not-robot").removeClass("d-block").addClass("d-none")
};


    // add class "active" to active route
    const path = window.location.href; // because the 'href' property of the DOM element is the absolute path

    $('nav li a').each((index,item)=>{
        if (item.href === path) {
            item.parentElement.classList.add('active')
        }
    });
    $('#application-tabs a.single-tab').each((index,item)=>{
        if (item.href === path) {
            item.classList.add('active')
            item.href = "#"
        }
    });
    $('#shipment-tabs a').each((index,item)=>{
        if (item.href === path) {
            item.classList.add('btn-primary')
            item.classList.remove('btn-l-gray')
            item.href = "#"
        }
    });
    $("#switch-language").on("click",function () {
        if (isRTL){
            $("html").attr("lang","en")
            $("#switch-language").text("ar")
        } else {
            $("html").attr("lang","ar")
            $("#switch-language").text("en")
        }
        isRTL =$('html').attr("lang") === 'ar'
    });

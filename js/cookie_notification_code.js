/*JS file of the Responsive JavaScript Cookie Notification Banner by Fabian Lins*/

$(document).ready(function() {

    cookie_note_animation_speed=100;
    cookie_note_read_more_scroll_speed=200;
    cookie_note_reject_link="https://google.com";
    cookie_note_readmore_link="#legal_disclosure";

    /*Cookie function*/
    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {   
        document.cookie = name+'=; Max-Age=-99999999;';  
    }

    /*Link check function*/
    function isExternal(url) {
        var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
        if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return true;
        if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"), "") !== location.host) return true;
        return false;
    }

    /*Shows the "#cookie_note_box" if the cookie is not set.*/
    if(getCookie("cookie_note_unactive")===null){
        $("#cookie_note_box").removeClass("cookie_note_hide")
    }

    /*Slides down the "#cookie_note_box" and sets a cookie.*/
    $(".cookie_note_ok_button").click(function(){
        $("#cookie_note_box").animate({marginTop:  $("#cookie_note_box").outerHeight(true)+"px"},cookie_note_animation_speed);
        setCookie("cookie_note_unactive","istrue");
    });

    /*Redirects to a reject site such as "Google".*/
    $(".cookie_reject_button").click(function(){
        window.location.href = cookie_note_reject_link;
    });

    /*Scrolls to the read more section or redirects if it is a link.*/
    $(".cookie_read_more_button").click(function(){
        if((isExternal(cookie_note_readmore_link)==true) || (cookie_note_readmore_link.includes("/")==true) || (cookie_note_readmore_link.includes(".html")==true)){
            window.location.href = cookie_note_readmore_link;
        }
        else{
            $("html, body").animate({
                scrollTop: $(cookie_note_readmore_link+"").offset().top		
            }, cookie_note_read_more_scroll_speed);
        }
    });

    /*Removes the focus after clicking any button.*/
    $(".cookie_note_button").click(function(){
        this.blur();
    });
});
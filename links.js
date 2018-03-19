window.onerror = function(msg, url, linenumber) {
    alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
    return true;
}

function doAnim(animTarget, change, restore) {
    requestAnimationFrame(function () {
        change(animTarget);
        var timeout;

        var transitionListener = function (timeout) {
            clearTimeout(timeout);
            animTarget.removeEventListener('transitionend', transitionListener);
            restore(animTarget);
        };

        timeout = setTimeout(function () {
            animTarget.removeEventListener('transitionend', transitionListener);
            restore(animTarget);
        }, 1000);
        
        animTarget.addEventListener('transitionend', transitionListener);
    });
}

function closeDetails(shouldAnimate) {
    var details = document.querySelector(".details-open");
    var container = document.querySelector('.candidates-listing');

    if (!details) {
        return;
    }

    shouldAnimate = shouldAnimate && window.innerWidth > 700;
    
    if (shouldAnimate) {
        var animTarget = details.querySelector('.artsy-shadow');
    
        var previousHeight = animTarget.clientHeight;
        details.style.display = 'block'; // keep it visible during animation
        animTarget.style.height = '0px';
        animTarget.style.minHeight = previousHeight + 'px';

        doAnim(animTarget, function () {
            animTarget.style.minHeight = '0px';
        }, function () {
            details.style.display = ''; // can hide now
            animTarget.style.height = '';
            animTarget.style.minHeight = '';
        });
    }

    details.classList.remove("details-open");
    container.classList.remove("has-open-details");
    document.body.classList.remove("has-open-details");
    
    document.querySelectorAll(".candidates-listing a.open").forEach(function (elm) {
        elm.classList.remove("open");
    });

}

function openDetails(candidate) {
    
    var details = document.getElementById("details-" + candidate);
    var container = document.querySelector('.candidates-listing');

    var alreadyOpen = document.querySelector(".details-open");
    var shouldAnimate = true;

    shouldAnimate = shouldAnimate && window.innerWidth > 700;

    if (alreadyOpen) {
        shouldAnimate = details.parentElement != alreadyOpen.parentElement;
        closeDetails(shouldAnimate);
    }

    if (details.parentElement.classList.contains("details-row-directors")) {
        // make sure we are on right tab
        openTab(true);
    }

    document.querySelector('a[href=\'#' + candidate + '\']').classList.add("open");
    details.className += " details-open";
    container.classList.add("has-open-details");
    document.body.classList.add("has-open-details");
    
    if (shouldAnimate) {
        var animTarget = details.querySelector('.artsy-shadow');
    
        var targetHeight = 500;
        animTarget.style.maxHeight = '0px';
        doAnim(animTarget, function () {
            animTarget.style.maxHeight = targetHeight + 'px';
        }, function () {
            animTarget.style.maxHeight = '';
        });
    }
}

function toggleDetails(candidate) {
    var details = document.getElementById("details-" + candidate);
    
    if (details.classList.contains("details-open")) {
        closeDetails(true);
        history.replaceState(null,null,".");
    } else {
        openDetails(candidate);
    }
}

function openTab(isDirectors) {
    document.querySelector(".candidates-executives").style.display = isDirectors ? 'none' : 'block';
    document.querySelector(".candidates-directors").style.display = isDirectors ? 'block' : 'none';

    document.querySelector(".candidates-tabs a.open").classList.remove('open');

    var name = isDirectors ? 'directors' : 'executives';

    document.querySelectorAll(".candidates-tabs a").forEach(function (link) {
        if (link.getAttribute('href') == ("#" + name)) {
            link.classList.add("open");
        }
    });

    closeDetails(false);
}

function handleHash(link, hash, shouldScroll) {
    history.replaceState(null,null,'#' + hash);

    if (hash == "video") {
        //alert("this will show the video once it is done");  
        return;
    }
    
    if (hash == "directors" || hash == "executives") {
        openTab(hash == "directors");
        return;
    }
    
    if (document.getElementById("details-" + hash)) { // Candidate details
        toggleDetails(hash);
        return;
    }

    // just scroll to anchor
    if (!shouldScroll) {
        return;
    }
    var anchor = Math.max(0, document.querySelector('a[name=\'' + hash + '\']').offsetTop - 50); 
    window.scroll({top: anchor, left: 0, behavior: 'smooth' });
}

document.querySelectorAll('a[href^=\'#\']').forEach(function (link) {
    link.addEventListener('click', function (event) {
        handleHash(this, this.getAttribute("href").substring(1), true);
        event.preventDefault();
    });
});

document.querySelectorAll('.details-close').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function (event) {
        closeDetails(true);
        history.replaceState(null,null,".");
    });
})

if (document.location.hash) {
    handleHash(null, document.location.hash.substring(1), window.scrollY == 0);
}

// Section header underlines
var sectionHeaders = document.querySelectorAll(".section-header");
function updateUnderlines() {
    sectionHeaders.forEach(function (header) {
        if (!header.classList.contains("been-visible")) {
            var viewportOffset = header.getBoundingClientRect();
            if (viewportOffset.top >= 0 && viewportOffset.bottom <= window.innerHeight) {
                header.classList.add("been-visible");
            }
        }
    });
    window.requestAnimationFrame(updateUnderlines);
}
updateUnderlines();


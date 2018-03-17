function closeDetails() {
    var details = document.querySelector(".details-open");
    var container = document.querySelector('.candidates-listing');

    if (!details) {
        return;
    }
    

    var animTarget = details.querySelector('.artsy-shadow');

    var previousHeight = animTarget.clientHeight;
    details.style.display = 'block'; // keep it visible during animation
    animTarget.style.height = '0px';
    animTarget.style.minHeight = previousHeight + 'px';
    // do animation after above takes effect
    requestAnimationFrame(function() {
        animTarget.style.minHeight = '0px';
        animTarget.addEventListener('transitionend', function(e) {
            // remove this event listener so it only gets triggered once
            animTarget.removeEventListener('transitionend', arguments.callee);
            details.style.display = ''; // can hide now
            animTarget.style.height = '';
            animTarget.style.minHeight = '';
        });
    });

    details.classList.remove("details-open");
    container.classList.remove("has-open-details");
    
    document.querySelectorAll(".candidates-listing a.open").forEach(function (elm) {
        elm.classList.remove("open");
    });
}

function openDetails(candidate) {
    
    var details = document.getElementById("details-" + candidate);
    var container = document.querySelector('.candidates-listing');

    if (document.querySelector(".details-open")) {
        closeDetails();
    }

    document.querySelector('a[href=\'#' + candidate + '\']').classList.add("open");
    details.className += " details-open";
    container.classList.add("has-open-details");
}

function toggleDetails(candidate) {
    var details = document.getElementById("details-" + candidate);
    
    if (details.classList.contains("details-open")) {
        closeDetails();
    } else {
        openDetails(candidate);
    }
}

function openTab(isDirectors, link) {
    document.querySelector(".candidates-executives").style.display = isDirectors ? 'none' : 'block';
    document.querySelector(".candidates-directors").style.display = isDirectors ? 'block' : 'none';

    document.querySelector(".candidates-tabs a.open").classList.remove('open');
    link.classList.add("open");

    closeDetails();
}

function handleHash(link, hash) {
    history.replaceState(null,null,'#' + hash);

    if (hash == "video") {
        alert("this will show the video once it is done");  
        return;
    }
    
    if (hash == "directors" || hash == "executives") {
        openTab(hash == "directors", link);
        return;
    }
    
    if (document.getElementById("details-" + hash)) { // Candidate details
        toggleDetails(hash);
        return;
    }

    // just scroll to anchor
    var anchor = Math.max(0, document.querySelector('a[name=\'' + hash + '\']').offsetTop - 50); 
    window.scroll({top: anchor, left: 0, behavior: 'smooth' });
}

document.querySelectorAll('a[href^=\'#\']').forEach(function (link) {
    link.addEventListener('click', function (event) {
        handleHash(this, this.getAttribute("href").substring(1));
        event.preventDefault();
    });
});

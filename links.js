function handleHash(link, hash) {
    if (hash == "video") {
        alert("this will show the video once it is done");  
    } else if (hash == "directors" || hash == "executives") {
        console.log("unimplemented");
    } else if (hash.indexOf("candidate-") == 0) {

        var position = hash.substring("candidate-".length);

        var container = document.querySelector('.candidates-listing');
        var details = document.getElementById("details-" + position);
        if (details.classList.contains("details-open")) {
            details.classList.remove("details-open");
            container.classList.remove("has-open-details");
        }

        document.querySelectorAll(".details-open").forEach(function (elm) {
            elm.classList.remove("details-open");
        });
        document.querySelectorAll("a.open").forEach(function (elm) {
            elm.classList.remove("open");
        });
        link.classList.add("open");
        details.className += " details-open";
        container.classList.add("has-open-details");
    } else {
        // just scroll to anchor
        var anchor = Math.max(0, document.querySelector('a[name=\'' + hash + '\']').offsetTop - 50); 
        window.scroll({top: anchor, left: 0, behavior: 'smooth' });
    }
}

document.querySelectorAll('a[href^=\'#\']').forEach(function (link) {
    link.addEventListener('click', function (event) {
        handleHash(this, this.getAttribute("href").substring(1));
        event.preventDefault();
    });
});

var votingBegins = 1522036800;
var votingEnds = 1522274400;

function updateCountdown() {
    var time = Math.floor((new Date()).getTime() / 1000);

    if (time >= votingEnds) {
        document.getElementsByClassName("header-right")[0].innerHTML = "Congratulations to our new representatives";
    } else {
        var name = document.getElementById("countdown-name");
        var days = document.getElementById("days");
        var hours = document.getElementById("hours");
        var minutes = document.getElementById("minutes");
        var seconds = document.getElementById("seconds");

        var target;
        if (time >= votingBegins) {
            name.innerHTML = "ends";
            target = votingEnds;
        } else {
            name.innerHTML = "begins";
            target = votingBegins;
        }

        var totalSeconds = target - time;
        var totalMinutes = Math.floor(totalSeconds / 60);
        var totalHours = Math.floor(totalMinutes / 60);
        var totalDays = Math.floor(totalHours / 24);

        var finalHours = totalHours - (totalDays * 24);
        var finalMinutes = totalMinutes - (totalHours * 60);
        var finalSeconds = totalSeconds - (totalMinutes * 60);

        days.innerHTML = totalDays;
        hours.innerHTML = finalHours;
        minutes.innerHTML = finalMinutes;
        seconds.innerHTML = finalSeconds;
    }   
}

updateCountdown();
setInterval(updateCountdown, 1000);
var votingBegins = 1522036800;
var votingEnds = 1522274400;

function updateCountdown() {
    var time = Math.floor((new Date()).getTime() / 1000);

    if (time >= votingEnds) {
        document.body.innerHTML = "<div class='election-over'>Congratulations to all elected candidates</div>";
    } else {
        var name = document.getElementById("countdown-name");
        var days = document.getElementById("days");
        var hours = document.getElementById("hours");
        var minutes = document.getElementById("minutes");
        var seconds = document.getElementById("seconds");
        var daysLabel = document.getElementById("days-label");
        var hoursLabel = document.getElementById("hours-label");
        var minutesLabel = document.getElementById("minutes-label");
        var secondsLabel = document.getElementById("seconds-label");

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
        daysLabel.innerHTML = totalDays == 1 ? "day" : "days";
        hoursLabel.innerHTML = finalHours == 1 ? "hour" : "hours";
        minutesLabel.innerHTML = finalMinutes == 1 ? "minute" : "minutes";
        secondsLabel.innerHTML = finalSeconds == 1 ? "second" : "seconds";
    }   
}

updateCountdown();
setInterval(updateCountdown, 1000);
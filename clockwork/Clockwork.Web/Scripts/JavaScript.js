//Before you start running the web, please run the API first and update this string or the web may not work.
let ApiString = "http://localhost:51336/";

function ShowInput() {
    let input = document.getElementById("timezoneInput");
    input.hidden = false;
    optionAdder();
}

function TimeZoneCollapes() {
    let timeZone = document.getElementById("timezoneInput");
    timeZone.hidden = true;
}

function optionAdder() {
    let select = document.getElementById("timeZone");
    let allOptions = ["US Eastern Standard Time", "Central Standard Time", "US Mountain Standard Time", "Samoa Standard Time", "Hawaiian Standard Time",
        "Alaskan Standard Time", "Pacific Standard Time", "Pacific Standard Time(Mexico)", "Mountain Standard Time(Mexico)",
        "Mountain Standard Time", "Central America Standard Time", "Central Standard Time(Mexico)",
        "Canada Central Standard Time", "SA Pacific Standard Time", "Eastern Standard Time", "Dateline Standard Time", "Venezuela Standard Time",
        "Paraguay Standard Time", "Atlantic Standard Time", "Central Brazilian Standard Time", "SA Western Standard Time", "Pacific SA Standard Time",
        "Newfoundland Standard Time", "E.South America Standard Time", "Argentina Standard Time", "SA Eastern Standard Time",
        "Greenland Standard Time", "Montevideo Standard Time", "Mid - Atlantic Standard Time", "Azores Standard Time", "Cape Verde Standard Time",
        "Morocco Standard Time", "GMT Standard Time", "Greenwich Standard Time", "W.Europe Standard Time", "Central Europe Standard Time",
        "Romance Standard Time", "Central European Standard Time", "W.Central Africa Standard Time", "Namibia Standard Time", "Jordan Standard Time",
        "GTB Standard Time", "Middle East Standard Time", "Egypt Standard Time", "Syria Standard Time", "South Africa Standard Time", "FLE Standard Time",
        "Israel Standard Time", "E.Europe Standard Time", "Arabic Standard Time", "Arab Standard Time", "Russian Standard Time",
        "E.Africa Standard Time", "Iran Standard Time", "Arabian Standard Time", "Azerbaijan Standard Time", "Mauritius Standard Time",
        "Georgian Standard Time", "Caucasus Standard Time", "Afghanistan Standard Time", "Ekaterinburg Standard Time", "Pakistan Standard Time",
        "West Asia Standard Time", "India Standard Time", "Sri Lanka Standard Time", "Nepal Standard Time", "Central Asia Standard Time",
        "Bangladesh Standard Time", "N.Central Asia Standard Time", "Myanmar Standard Time", "SE Asia Standard Time", "North Asia Standard Time",
        "China Standard Time", "North Asia East Standard Time", "Singapore Standard Time", "W.Australia Standard Time", "Taipei Standard Time",
        "Ulaanbaatar Standard Time", "Tokyo Standard Time", "Korea Standard Time", "Yakutsk Standard Time", "Cen.Australia Standard Time",
        "E.Australia Standard Time", "West Pacific Standard Time", "Tasmania Standard Time", "Vladivostok Standard Time",
        "Central Pacific Standard Time", "New Zealand Standard Time", "Fiji Standard Time", "Kamchatka Standard Time",
        "Tonga Standard Time"];
    for (let item of allOptions) {
        let option = document.createElement("option");
        option.value = item;
        option.innerText = item;
        select.appendChild(option);
    }

}

function GetZoneTime(timeZone) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        let output = document.getElementById("timeZoneOutput");
        output.innerText = "";
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            let localDateTime = response.time;
            let UTC = response.utcTime;
            LocalDateTimeArranger(localDateTime, output);
            UTCDateTimeArrager(UTC, output);
        }
        else if (this.status == 222) {
            output.innerText = this.responseText;
        }
    };
    let toSend = {
        zone: timeZone
    }
    xhttp.open("POST", ApiString + "api/currenttime", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(toSend));
    return false;
}

function UserAction() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            let localDateTime = response.time;
            let UTC = response.utcTime;
            let output = document.getElementById("output");
            let dismiss = document.getElementById("dismissOutput");
            dismiss.hidden = false;
            output.innerText = "";
            LocalDateTimeArranger(localDateTime, output);
            UTCDateTimeArrager(UTC, output);

            //document.getElementById("output").innerHTML = this.responseText;
        }
    };

    xhttp.open("GET", ApiString + "api/currenttime", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();

}

function dismissOutput() {
    let output = document.getElementById("output");
    output.innerText = "";
    let dismiss = document.getElementById("dismissOutput");
    dismiss.hidden = true;
}

function dismissDBOutput() {
    let output = document.getElementById("databaseOutput");
    output.innerText = "";
    let dismiss = document.getElementById("dismissDBOutput");
    dismiss.hidden = true;
}

function GetList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            let databaseOutput = document.getElementById("databaseOutput");
            let dismiss = document.getElementById("dismissDBOutput");
            dismiss.hidden = false;
            databaseOutput.innerText = "";
            for (let item of response) {
                let id = document.createElement("p");
                id.innerText = "currentTimeQueryId: " + item.currentTimeQueryId;
                databaseOutput.appendChild(id);
                let time = document.createElement("p");
                time.innerText = "time: " + item.time;
                databaseOutput.appendChild(time);
                let ip = document.createElement("p");
                ip.innerText = "clientIp: " + item.clientIp;
                databaseOutput.appendChild(ip);
                let utc = document.createElement("p");
                utc.innerText = "utcTime: " + item.utcTime;
                databaseOutput.appendChild(utc);
            }



        }
    };

    xhttp.open("GET", ApiString + "api/currenttime/database", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function LocalDateTimeArranger(localDateTime, output) {
    let localDate = DateGetter(localDateTime);
    let localTime = TimeGetter(localDateTime);
    let localTimeZone = TimeZoneGetter(localDateTime);
    let localDateTimeArticle = document.createElement("article");
    localDateTimeArticle.id = "localDateTime";
    let greeting = document.createElement("h3");
    greeting.innerText = TimelyGreeting(localTime) + ", Today's Date is:";
    localDateTimeArticle.appendChild(greeting);
    let monthp = document.createElement("P");
    monthp.id = "localMonthAndDate";
    monthp.innerText = localDate[1] + ", " + localDate[2];
    localDateTimeArticle.appendChild(monthp);
    let yearp = document.createElement("p");
    yearp.id = "localYear";
    yearp.innerText = localDate[0];
    localDateTimeArticle.appendChild(yearp);
    let timeIntro = document.createElement("h3");
    timeIntro.id = "timeIntro";
    timeIntro.innerText = "Your current time is:";
    localDateTimeArticle.appendChild(timeIntro);
    let timep = document.createElement("p");
    timep.id = "localTime";
    timep.innerText = localTime;
    localDateTimeArticle.appendChild(timep);
    if (localTimeZone) {
        let timeZoneIntro = document.createElement("h3");
        timeZoneIntro.id = "timeZoneIntro";
        timeZoneIntro.innerText = "Your current time zone is:";
        localDateTimeArticle.appendChild(timeZoneIntro);
        let timeZonep = document.createElement("p");
        timeZonep.id = "localTimeZone";
        timeZonep.innerText = localTimeZone;
        localDateTimeArticle.appendChild(timeZonep);
    }
    output.appendChild(localDateTimeArticle);
}

function UTCDateTimeArrager(UTC, output) {
    let UTCDate = DateGetter(UTC);
    let UTCTime = TimeGetter(UTC);
    let UTCArticle = document.createElement("article");
    UTCArticle.id = "UTC";
    let greeting = document.createElement("h3");
    greeting.innerText = "Current UTC Date is:";
    UTCArticle.appendChild(greeting);
    let monthp = document.createElement("P");
    monthp.id = "UTCMonthAndDate";
    monthp.innerText = UTCDate[1] + ", " + UTCDate[2];
    UTCArticle.appendChild(monthp);
    let yearp = document.createElement("p");
    yearp.id = "UTCYear";
    yearp.innerText = UTCDate[0];
    UTCArticle.appendChild(yearp);
    let timeIntro = document.createElement("h3");
    timeIntro.id = "timeIntro";
    timeIntro.innerText = "current UTC time is:";
    UTCArticle.appendChild(timeIntro);
    let timep = document.createElement("p");
    timep.id = "UTCTime";
    timep.innerText = UTCTime;
    UTCArticle.appendChild(timep);
    output.appendChild(UTCArticle);
}

function TimelyGreeting(time) {
    let result = "";
    let hour = time.split(":")[0];
    if (hour > 3 && hour < 12) {
        result = "Good Morning";
    }
    else if (hour >= 12 && hour < 18) {
        result = "Good Afternoon";
    }
    else {
        result = "Good Evening";
    }
    return result;
}

function DateGetter(dateTime) {
    let rawDate = dateTime.split("T")[0];
    let dateArray = rawDate.split("-");
    dateArray[1] = MonthSwitch(dateArray[1]);
    dateArray[2] = DateSwitch(dateArray[2]);
    return dateArray;
}

function TimeGetter(dateTime) {
    let rawTime = dateTime.split("T")[1];
    let timeResult = rawTime.split(".")[0];
    return timeResult;
}

function TimeZoneGetter(dateTime) {
    let rawTime = dateTime.split("T")[1];
    let timeLeft = rawTime.split(".")[1];
    let timeZoneResult = "";
    if (timeLeft.includes("-")) {
        timeZoneResult = "-" + timeLeft.split("-")[1];
    }
    return timeZoneResult;
}

function DateSwitch(dateNum) {
    let result = dateNum;
    if (dateNum == "01" || dateNum == "21" || dateNum == "31") {
        result += "st";
    }
    else if (dateNum == "02" || dateNum == "22") {
        result += "nd";
    }
    else if (dateNum == "03") {
        result += "rd";
    }
    else {
        result += "th";
    }
    return result;
}

function MonthSwitch(monthNum) {
    let result = "";
    switch (monthNum) {
        case "01":
            result = "January";
            break;
        case "02":
            result = "February";
            break;
        case "03":
            result = "March";
            break;
        case "04":
            result = "April";
            break;
        case "05":
            result = "May";
            break;
        case "06":
            result = "June";
            break;
        case "07":
            result = "July";
            break;
        case "08":
            result = "August";
            break;
        case "09":
            result = "September";
            break;
        case "10":
            result = "Octpber";
            break;
        case "11":
            result = "November";
            break;
        case "12":
            result = "December";
            break;

    }
    return result;
}
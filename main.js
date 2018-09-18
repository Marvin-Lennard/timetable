var tokens = ["STDBDA/*", "INPBPI/*", "MIPB/*", "INPBTI/*", "STDBDS/*", "WIPB/*", "BWPF/*"];
var urlP1 = "http://ws.inf.fh-dortmund.de/timetable/current/rest/CourseOfStudy/";
var urlP2 = "/Events?Accept=application/json";

var courseAdded = [];


tokens.forEach(token => getData(urlP1 + token + urlP2, createTable))


function getData(url, callback) {
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(data => callback(data))
}

function createTable(data) {



    data.forEach(course => {

        if (filter(course)) {
            //if (course.grade == ) {
            var th = document.createElement("th");
            th.className = "course";
            th.setAttribute("rowspan", course.timeSlotDuration);
            var p = document.createElement("p").innerText = "[" + course.courseOfStudy + "] " +
                course.courseId + " " +
                course.courseType + " " +
                course.lecturerId + " " +
                course.roomId + " " +
                course.studentSet + "\n" +
                course.name;
            th.append(p);

            th.addEventListener("click", function() {
                if (this.className == "course") {
                    this.className = "selected"
                } else {
                    this.className = "course"
                }
            })

            if (course.weekday == "Mon" || course.weekday == "Tue" || course.weekday == "Wed") {
                var rows = document.getElementById(course.weekday).getElementsByTagName("tr")
                rows[course.timeSlotBegin].append(th);
            }
        }
        //    }
    })
}


// <th rowspan="2" class="course">
//     <p>1337 V SZ AE01 A-P</p><br>
//     <p>Datenbanken 1</p>
// </th>
function filter(course) {
    var courses = [43023, 43051, 43022, 46898, 41065];
    for (var i = 0; i < courses.length; i++) {
        if (courses[i] == course.courseId)
            return true
    }
    return false;
}









































// var url = 'https://localhost:44317/api/verbrecher';
// var selectFld = document.getElementById("selectFld");
// selectFld.addEventListener('change', getVerbrecherId);
// document.getElementById("submit").addEventListener('click', insertVerbecher );

// getData(url, createOptions)


// function createOptions(data) {
//     for (var i = 0; i < data.length; i++) {
//         var option = document.createElement("option");
//         option.value = data[i].verbrecherId;
//         option.text = data[i].vorname + " " + data[i].nachname;
//         selectFld.add(option,null);
//     }
// }

// function getVerbrecherId() {
//     var verbrecherId = this.options[this.selectedIndex].value;
//     var vergehenUrl = "https://localhost:44317/api/verbrecher/" + verbrecherId + "/vergehen";
//     getData(vergehenUrl, fillTable);

// }


// function fillTable(data) {
//     var tb = document.getElementById('tb');
//     tb.innerHTML = "";
//     console.log(data[1]);
//     for (var i = 0; i < data.length; i++) {
//         var row = document.createElement("tr")
//         var beschreibungColumn = document.createElement('td');
//         beschreibungColumn.innerText = data[i].bezeichnung;
//         row.appendChild(beschreibungColumn);
//         var tatZeitpunktColumn = document.createElement('td');
//         tatZeitpunktColumn.innerText = data[i].tatZeitpunkt;
//         row.appendChild(tatZeitpunktColumn);
//         var stärkeColumn = document.createElement('td');
//         stärkeColumn.innerText = data[i].stärke;
//         row.appendChild(stärkeColumn)
//         tb.appendChild(row)
//     }
// }

// function getData(url, callback) {
//     fetch(url)
//         .then(function (response) {
//             return response.json();
//         }).then(data => callback(data))
// }
// function insertVerbecher() {
//     var postUrl = 'https://localhost:44317/api/Verbrecher';
//     var inputs = document.querySelectorAll('input');
//     var payload = {
//         vorname: inputs[0].value,
//         nachname: inputs[1].value,
//         geburtstag: inputs[2].value
//     };
//     fetch(postUrl, {
//         method: 'Post',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     }).then(function (response) {
//         return response.json();
//     }).then(function (data) {
//         console.log(data);
//     });
// }
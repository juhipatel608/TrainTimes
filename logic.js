var train = {
    destination: "",
    FirstTrain: "",
    freq: ""
}
$(document).ready(function () {
    var datab = firebase.database();

    datab.ref().on('value', function (snapshot) {

        var traindata = snapshot.val();
        var timeDiff = 0;
        var remaining = 0;
        var nextTrain = "";
        var arvl = "";

        //To create a moment from a Unix timestamp (seconds since the Unix Epoch), use 
        var num1 = moment.unix(value.FirstTrain);
        var num2 = moment();
        $("trainbody").empty();
        $.each(traindata, function (key, value) {

            timeDiff = numb2.diff(num1, "minutes");
            remaining = timeDiff % value.freq;
            arvl = value.freq - remaining;
            nextTrain = moment().add(arvl, "m").format("hh:mm: A");


            var tr1 = $("<tr>");
            tr1.addClass("trainRow");
            var tr2 = $("<th>");
            tr2.attr("scope", "row");
            tr2.html(key);


            var ln1 = $("<td>");
            ln1.html(value.destination);
            var ln2 = $("<td>");
            ln2.html(value.freq);
            var ln3 = $("<td>");
            ln3.html(nextTrain);
            var ln4 = $("<td>");
            ln4.html(arvl);
            tr1.append(ln1, ln2, ln3, ln4);
            $("trainbody").append(tr1);

        })

    });


    $("#submit").on("click", function (event) {
        event.preventDefault();
        var name = $("#input-train-name").val().trim();
        train.destination = $("#input-train-destination").val().trim();
        train.FirstTrain = $("#input-train-time").val().trim();
        train.freq = $("#input-train-frequency").val().trim();

        var trainnew ={
            [name]: train
        };
        datab.ref().update(trainnew);
    });
    

    function getNextTrain(firstTrainTime) {
    var datenew= new Date();
    var startTime = new Date(firstTrainTime);
    var currentTime = datenew.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }

});




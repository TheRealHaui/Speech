/**
 * Created by haui on 29.10.14.
 */
/*
 if (annyang) {

 var commands = {
 // annyang will capture anything after a splat (*) and pass it to the function.
 // e.g. saying "Show me Batman and Robin" is the same as calling showFlickr('Batman and Robin');
 'show me *term': showFlickr,

 // A named variable is a one word variable, that can fit anywhere in your command.
 // e.g. saying "calculate October stats" will call calculateStats('October');
 'calculate :month stats': calculateStats,

 // By defining a part of the following command as optional, annyang will respond to both:
 // "say hello to my little friend" as well as "say hello friend"
 'say hello (to my little) friend': greeting
 };

 var showFlickr = function (term) {
 alert(1);
 var url = 'http://api.flickr.com/services/rest/?tags=' + tag;
 $.getJSON(url);
 }

 var calculateStats = function (month) {
 $('#stats').text('Statistics for ' + month);
 }

 var greeting = function () {
 $('#greeting').text('Hello!');
 }

 annyang.addCommands(commands);

 annyang.start();

 }
 */


if (annyang) {

    //Variables that represent functions have to be defined
    //prior sticking it to commands
    var test = function () {

        alert('Test');

    }


    var presentTime = function () {

        var date = new Date();

        var msg = new SpeechSynthesisUtterance();

        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[10]; // Note: some voices don't support altering params
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 2; //0 to 2
        msg.text = 'It is ' + date.getHours() + ' o\'clock ' + date.getMinutes() + ' minutes and ' + date.getSeconds() + ' seconds.';


        msg.lang = 'en-US';


        msg.onend = function (e) {

        }

        window.speechSynthesis.speak(msg);

        document.getElementById("timeId").innerHTML = '<i><b><font color="blue">' + 'It is ' + date.getHours() + ' o\'clock ' + date.getMinutes() + ' minutes and ' + date.getSeconds() + ' seconds.' + '</b></font></i>';

    }


    var searchGoogle = function (term) {

        document.getElementById("googleId").innerHTML = document.getElementById("googleId").innerHTML
            + '<br/><i><b><font color="blue">' + 'Mojo' + '</b></font></i>';

    }


    // Let's define a command.
    var commands = {
        'hello': function () {
            document.getElementById("helloId").innerHTML = '<i><b><font color="blue">Hello Buddy.</b></font></i>';
        },
        'What is the time': presentTime,
        'What\s the time': presentTime,
        'Search (for) *term': searchGoogle
    };


    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening.
    annyang.start();
}

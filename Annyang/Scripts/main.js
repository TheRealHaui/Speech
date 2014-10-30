/**
 * Created by haui on 29.10.14.
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

        var msg = new SpeechSynthesisUtterance();

        var voices = window.speechSynthesis.getVoices();
        msg.voice = voices[10]; // Note: some voices don't support altering params
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 10; // 0.1 to 10
        msg.pitch = 2; //0 to 2
        msg.text = 'Yes, Sir! Searching for ' + term;


        msg.lang = 'en-AUS';


        msg.onend = function (e) {
        }

        window.speechSynthesis.speak(msg);


        document.getElementById("googleId").innerHTML = document.getElementById("googleId").innerHTML
            + '<br/><i><b><font color="blue">' + 'Searching for ' + '<a href="' + 'https://www.google.at/?gws_rd=ssl#newwindow=1&safe=off&q=' + term + '" target="_blank">' + term + '</a> </b></font></i>';

        var win = window.open('https://www.google.at/?gws_rd=ssl#newwindow=1&safe=off&q=' + term, '_blank');
        win.focus();

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


//Check if browser supports the Web Speech recognition API
if (!('webkitSpeechRecognition' in window)) {

    //Instantiate Recognition instance
    var recognition = new webkitSpeechRecognition();

    //Recognize speech continously
    recognition.continuous = true;

    //Define language AND dialect
    recognition.lang = 'en-US';

    //..

    //Define callbacks for recognition service
    recognition.onstart = function() {
        //Show fancy image
    };
    recognition.onerror = function(event) {
    };
    recognition.onend = function() {
    };
    recognition.onresult = function(event) {
        //Do fancy things.
    };

    //Start the natural language
    //speech recognition
    recognition.start();

}

//Check if browser supports the Web Speech synthesis API
if ('speechSynthesis' in window == false) {

    //Instantiate synthesis instance
    var msg = new SpeechSynthesisUtterance();

    //Set different options.
    //Volume, speaking rate ...
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10

    //Set text for digital narrative
    msg.text = 'Chuck Norris counted til infinity. Twice.';

    //Set language AND dialect
    msg.lang = 'en-AU';

    //Define callback for synthesis service
    msg.onend = function(e){
        //Do fancy things.
    }

    //Let your digital narrator
    //with australian accent start speaking.
    window.speechSynthesis.speak(msg);

}
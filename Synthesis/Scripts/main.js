/**
 * Created by haui on 29.10.14.
 */

var langs =
[
['Deutsch',         ['de-DE']],
['English',  ['en-US']]];



select_language.options[0] = new Option('Deutsch', 0);
select_language.options[1] = new Option('English', 1);

select_language.selectedIndex = 1;
updateCountry();

//Haui
//select_dialect.selectedIndex = 6;
showInfo('info_start');

//Haui
function updateCountry() {
    for (var i = select_dialect.options.length - 1; i >= 0; i--) {
        select_dialect.remove(i);
    }
    var list = langs[select_language.selectedIndex];
    for (var i = 1; i < list.length; i++) {
        select_dialect.options.add(new Option(list[i][1], list[i][0]));
    }
    select_dialect.style.visibility = list[1].length == 1 ? 'hidden' : 'visible';
}




if ('speechSynthesis' in window == false) {

    doUpgrade();
}
    else{

        //Firefox does not support speechsynthesis although it states it,
        if (window.mozInnerScreenX != null){
            doUpgrade();
        }

}





function doUpgrade() {
    start_button.style.visibility = 'hidden';
    showInfo('info_upgrade');
}



function showInfo(s) {
    if (s) {
        for (var child = info.firstChild; child; child = child.nextSibling) {
            if (child.style) {
                child.style.display = child.id == s ? 'inline' : 'none';
            }
        }
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }
}


function highlightAllText(element) {
    element.preventDefault;
    document.getElementById(element.id).focus();
    document.getElementById(element.id).select();
}




function getWhatToSayAsString(){
    return document.getElementById('results').value;
}



function startButton(event) {


    if (getWhatToSayAsString() == ""){
        document.getElementById('results').focus();
        showInfo('info_no_text');
        return;
    }





    start_img.src = 'Images/Microphone_2.gif';


    var msg = new SpeechSynthesisUtterance();

    var voices = window.speechSynthesis.getVoices();
    msg.voice = voices[10]; // Note: some voices don't support altering params
    msg.voiceURI = 'native';
    msg.volume = 1; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 2; //0 to 2
    msg.text = getWhatToSayAsString();



    var strUser = document.getElementById("select_language").options[document.getElementById("select_language").selectedIndex].text;

    if ( strUser == 'Deutsch' ){
        msg.lang = 'de-at';
    }
    else{
        msg.lang = 'en-US';
    }



    msg.onend = function(e){
        start_img.src = 'Images/Microphone_1.gif';
        showInfo('info_start');
    }

    window.speechSynthesis.speak(msg);


}
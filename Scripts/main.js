/**
 * Created by haui on 29.10.14.
 */

var langs =
[
['Deutsch',         ['de-DE']],
['English',  ['en-US']]];

/**
for (var i = 0; i < langs.length; i++) {
    select_language.options[i] = new Option(langs[i][0], i);
    }
**/

select_language.options[0] = new Option('Deutsch', 0);
select_language.options[1] = new Option('English', 1);

select_language.selectedIndex = 1;
updateCountry();

//Haui
//select_dialect.selectedIndex = 6;
showInfo('info_start');

<!-- Haui -->
<!--
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
-->


var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

if (!('webkitSpeechRecognition' in window)) {
    doUpgrade();
} else {
    start_button.style.display = 'inline-block';
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = function() {

        copy_button.style.display = 'none';

        recognizing = true;
        showInfo('info_speak_now');
        start_img.src = 'Images/Microphone_2.png';
    };

    recognition.onerror = function(event) {
        if (event.error == 'no-speech') {
            start_img.src = 'Images/Microphone_1.gif';
            showInfo('info_no_speech');
            ignore_onend = true;
        }
        if (event.error == 'audio-capture') {
            start_img.src = 'Images/Microphone_1.gif';
            showInfo('info_no_microphone');
            ignore_onend = true;
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
                showInfo('info_blocked');
            } else {
                showInfo('info_denied');
            }
            ignore_onend = true;
        }
    };

    recognition.onend = function() {
        recognizing = false;
        if (ignore_onend) {
            return;
        }
        start_img.src = 'Images/Microphone_1.gif';
        if (!final_transcript) {
            showInfo('info_start');
            return;
        }
        showInfo('');
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById('final_span'));
            window.getSelection().addRange(range);
        }

        showInfo('info_start');

    };

    recognition.onresult = function(event) {
        var interim_transcript = '';
        if (typeof(event.results) == 'undefined') {
            recognition.onend = null;
            recognition.stop();
            doUpgrade();
            return;
        }
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
        if (final_transcript || interim_transcript) {
            showButtons('inline-block');
        }

    };
}

function doUpgrade() {
    start_button.style.visibility = 'hidden';
    showInfo('info_upgrade');
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    var first_char = /\S/;
    function capitalize(s) {
        return s.replace(first_char, function(m) { return m.toUpperCase(); });
        }


    function startButton(event) {

        if (recognizing) {
        recognition.stop();
        return;
        }

        final_transcript = '';
        recognition.lang = select_dialect.value;
        recognition.start();
        ignore_onend = false;
        final_span.innerHTML = '';
        interim_span.innerHTML = '';
        start_img.src = 'Images/Microphone_2.png';
        showInfo('info_allow');
        showButtons('none');
        start_timestamp = event.timeStamp;
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

    var currStyle;


    function showButtons(style) {
        if (style == currStyle) {
        return;
        }
        currStyle = style;
        copy_button.style.display = style;
        copy_info.style.display = 'none';
        }



function copyButton() {

    if (recognizing) {
        recognizing = false;
        recognition.stop();
    }
    //copy_button.style.display = 'none';
    copy_info.style.display = 'inline-block';

}




// main.js
var client = new ZeroClipboard( document.getElementById("copy-button") );

client.on( "ready", function( readyEvent ) {
    // alert( "ZeroClipboard SWF is ready!" );

    client.on( "aftercopy", function( event ) {
        // `this` === `client`
        // `event.target` === the element that was clicked
        event.target.style.display = "none";
        alert("Copied text to clipboard: " + event.data["text/plain"] );
    } );
} );

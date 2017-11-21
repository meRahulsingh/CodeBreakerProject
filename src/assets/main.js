let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');


function guess() {
    let input = $('#user-guess');
    //add functionality to guess function here
    if (answer.val() == '' || attempt.val() == '') {
        setHiddenFields();
    }

    if (!validateInput(input.val())) {
        return false;
    }
    attempt.val(parseInt(attempt.val()) + 1 );

    if (getResults(input.val())) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if (attempt.val() >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}

function setHiddenFields() {
    var number = Math.floor(Math.random()*10000).toString();
    while (number.toString().length < 4) {
        number = '0' + number;
    }
    answer.val(number);
    attempt.val('0');
}

function setMessage(message) {
    $('#message').html(message);
}

function validateInput(input) {
    if (input.length == 4 ) {
        return true;
    } else {
        setMessage('Guesses must be exactly 4 characters long.');
        return false;
    }
}

function getResults(input) {
    var newResult = $('<div class="row"></div>');
    var newGuess = $('<span class="col-md-6"></span>');
    newGuess.html(input);
    var markers = $('<span class="col-md-6"></span>');
    var answerText = answer.val().toString();
    for (var i = 0; i < input.length; i++) {
        var marker = $('<span></span>')
        .addClass('glyphicon');
        if (input[i] === answerText[i]) {
            marker.addClass('glyphicon-ok');
        } else if (answerText.includes(input[i])) {
            marker.addClass('glyphicon-transfer');
        } else {
            marker.addClass('glyphicon-remove');
        }
        markers.append(marker);
    }
    newResult
    .append(newGuess)
    .append(markers)

    $('#results').append(newResult);

    if (markers.find('.glyphicon-ok').length === 4) {
        return true;
    } else {
        return false;
    }
}

function showAnswer(playerWon) {
    code = $('#code')
    .html(answer.val())[0];
    code.className = playerWon ? 'code success' : 'code failure';
}

function showReplay () {
    $('#guessing-div').css('display','none');
    $('#replay-div').css('display','block');
}
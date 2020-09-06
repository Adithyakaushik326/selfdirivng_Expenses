x = 0;
y = 0;
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}
function load_questions_and_options() {
    $('.main-question-container').html('');
    section_id = localStorage.getItem("test_section_id");
    sub_section_id = localStorage.getItem("test_sub_section_id");
    course_data = JSON.parse(localStorage.getItem('course_data'));
    student_data = JSON.parse(localStorage.getItem('course_student_data'));
    test_data = course_data['course_details']['section_details'][section_id]['session_details']['sub_section_details'][sub_section_id];
    console.log(student_data);
    if(student_data['course_details'][section_id]['sub_section_details'][sub_section_id]['taken'] == 1){
        console.log('test_taken');
        window.location.href = '/student/course2';
    }
    $('.test-heading').html(test_data['sub_section_title']);
    quick_access_data = ``;
    for (i in test_data['test_details']['questions']) {
        quick_access_data += `
        <div class="question-number-box" id="question_block_`+ i + `"><a href="#question_` + i + `">` + i + `</a></div>
        `;
    }
    $('.question-number-container').html(quick_access_data);
    question_answer_data = ``;
    question_number_counter = 1;
    console.log(test_data);
    for (question_id in test_data['test_details']['questions']) {
        if (test_data['test_details']['questions'][question_id]['question_type'] == "mcq") {
            temp_data = `
            <div class="container-fluid question-container" data-questiontype="mcq" data-questionno="`+ question_number_counter + `"
                id="question_`+ question_id + `">
                <div class="row">
                    <div class="col-10 question-row">
                        `+ question_number_counter + `. ` + test_data['test_details']['questions'][question_id]['question_title'] + `
                    </div>
                    <div class="col-2 text-right marks-row pr-5">Marks: `+ test_data['test_details']['questions'][question_id]['marks'] + `</div>
                </div>
                <div class="container-fluid options-container pl-4 mt-4">`;
            test_data['test_details']['questions'][question_id]['details']['options'] = shuffle(test_data['test_details']['questions'][question_id]['details']['options']);
            options_data = ``;
            for (options in test_data['test_details']['questions'][question_id]['details']['options']) {
                options_data += `
                <div class="row">
                    <label class="options-row">
                        <input type="radio" name="r_`+ question_number_counter + `" value="q_` + question_number_counter + `">
                        <div>`+ options + `</div>
                    </label>
                </div>
                `;
            }
            temp_data += options_data;
            temp_data += `
                </div>
            </div>
            `;
            $('.main-question-container').append(temp_data);
        }
        else if (test_data['test_details']['questions'][question_id]['question_type'] == "match") {
            temp_data = `
                <div class="container-fluid question-container" data-questiontype="match" data-questionno="`+ question_number_counter + `"
                id="question_`+ question_id + `">
                <div class="row">
                    <div class="col-10 question-row">
                        `+ question_number_counter + `. ` + test_data['test_details']['questions'][question_id]['question_title'] + `
                    </div>
                    <div class="col-2 text-right marks-row pr-5">Marks: `+ test_data['test_details']['questions'][question_id]['marks'] + `</div>
                </div>
                <div class="container-fluid match-container mt-4">
                    <div class="row match-row">`
            match_data = ``;
            choices_data = ``;
            choice_counter = 1;
            test_data['test_details']['questions'][question_id]['details'].forEach(element => {
                match_data += `
                <div class="col-6">
                    <div class="match-columns">
                        <div class="match-data">
                            `+ element['option'] + `
                        </div>
                        <div class="drop-container" id="q_`+ question_number_counter + `_b_` + choice_counter + `">
                        </div>
                    </div>
                </div>
                `;
                choices_data += `
                <div class="choice-data">
                    <div class="">`+ element['choice'] + `</div>
                </div>
                `;
                choice_counter += 1;
            });
            temp_data += match_data;
            temp_data += `
                    </div>
                    <div class="choices-heading">
                        Choices
                    </div>
                    <div class="row choices-row" id="q_`+ question_number_counter + `_b_` + choice_counter + `">
                    `+ choices_data + `
                    </div>
                </div>
            </div>
            `;
            $('.main-question-container').append(temp_data);
            darula_array = [];
            for (counter = 1; counter <= choice_counter; counter++) {
                darula_array.push(document.getElementById(`q_` + question_number_counter + `_b_` + counter));
            }
            dragula(darula_array);
        }
        else if (test_data['test_details']['questions'][question_id]['question_type'] == "text") {
            temp_data = `
            <div class="container-fluid question-container" data-questiontype="text" data-questionno="`+ question_number_counter + `"
                id="question_`+ question_id + `">
                <div class="row">
                    <div class="col-10 question-row">
                        `+ question_number_counter + `. ` + test_data['test_details']['questions'][question_id]['question_title'] + `
                    </div>
                    <div class="col-2 text-right marks-row pr-5">
                        Marks: `+ test_data['test_details']['questions'][question_id]['marks'] + `
                    </div>
                </div>
                <div class="row text-answer-container">
                    <textarea rows="10" class="input-textarea" placeholder=""></textarea>
                </div>
            </div>
            `;
            $('.main-question-container').append(temp_data);
        }
        question_number_counter += 1;
    }
    $(".page-loader-wrapper").fadeOut();
}
$(document).ready(function () {
    load_questions_and_options();
    var countdown = 30 * 60 * 1000;
    var timerId = setInterval(function () {
        countdown -= 1000;
        var min = Math.floor(countdown / (60 * 1000));
        //var sec = Math.floor(countdown - (min * 60 * 1000));  // wrong
        var sec = Math.floor((countdown - (min * 60 * 1000)) / 1000);  //correct
        if (countdown <= 0) {
            alert("30 min!");
            clearInterval(timerId);
            submit_test();
            //doSomething();
        } else {
            $(".timer").html(min + " mins " + sec + " secs");
        }

    }, 1000);
});
$('textarea').on('click focus', function () {
    console.log('here');
    y = 1;
});
$(document).on('mousedown', '.choice-data', function () {
    // c1 = $(this).closest('.match-container').find('.match-row').find('.match-data').length;
    // c2 = $(this).closest('.match-container').find('.match-row').find('.choice-data').length;
    // console.log(c1, c2);
    // if(c1 == c2){
    //     console.log('done');
    // }
    question_number = $(this).closest('.question-container').data('questionno');
    $('.question-number-container #question_block_' + question_number).addClass('greencolor');
    $('.question-number-container #question_block_' + question_number + ' a').addClass('greencolor');
});
$(document).on('change', 'input[type=radio]', function () {
    question_number = $(this).closest('.question-container').data('questionno');
    $('.question-number-container #question_block_' + question_number).addClass('greencolor');
    $('.question-number-container #question_block_' + question_number + ' a').addClass('greencolor');
});
$(document).on('input', 'textarea', function () {
    value = $(this).val();
    if (value.length > 0) {
        question_number = $(this).closest('.question-container').data('questionno');
        $('.question-number-container #question_block_' + question_number).addClass('greencolor');
        $('.question-number-container #question_block_' + question_number + ' a').addClass('greencolor');
    }
    else {
        question_number = $(this).closest('.question-container').data('questionno');
        $('.question-number-container #question_block_' + question_number).removeClass('greencolor');
        $('.question-number-container #question_block_' + question_number + ' a').removeClass('greencolor');
    }

});
function makegreen() {
    console.log('its green');
}
function submit_test() {
    data = {};
    n = $('.main-question-container .question-container').length;
    $('.main-question-container .question-container').each(function () {
        question_type = $(this).data('questiontype');
        question_no = $(this).data("questionno");
        question_id = $(this).attr('id').split("_")[1];
        if (question_type == "mcq") {
            selected_answer = $('input[name=r_' + question_no + ']:checked', this).parent().find('div').text();
            temp = {};
            temp["question_id"] = question_id;
            temp['question_type'] = "mcq";
            temp['answer'] = selected_answer;
            data[question_id] = temp;
        }
        else if (question_type == "match") {
            temp = [];
            $('.match-container .match-columns', this).each(function () {
                match = $('.match-data', this).text();
                answers = [];
                for (j = 0; j < $('.drop-container .choice-data', this).length; j++) {
                    answers.push($('.drop-container .choice-data', this).eq(j).text());
                }
                temp.push({ "match": match, "choice": answers });
            });
            data[question_id] = { "question_id": question_id, "question_type": "match", "answers": temp };
        }
        else if (question_type == "text") {
            answer = $('.text-answer-container .input-textarea', this).val();
            data[question_id] = { "question_id": question_id, "question_type": "text", "answer": answer };
        }
    });
    course_id = localStorage.getItem('student_course_id');
    d = {
        "course_id": course_id,
        "data": JSON.stringify(data),
        "section_id": localStorage.getItem("test_section_id"),
        "sub_section_id": localStorage.getItem("test_sub_section_id")
    };
    console.log(data);
    $.ajax({
        type: "POST",
        url: "/student/submittest",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
            if(ret_obj['status_code'] == 200){
                localStorage.setItem("course_student_data", ret_obj['data']);
                window.location.href = '/student/course2';
            }
        }
    });
}

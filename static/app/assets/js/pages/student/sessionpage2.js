function load_flashcards(param, section_id) {
    $('.course-section').css('display', 'block');
    $('.help-section').css('display', 'none');
    $('.survey-section').css('display', 'none');
    $('.certificate-section').css('display', 'none');
    $('.leaderboard-section').css('display', 'none');
    course_data = JSON.parse(localStorage.getItem('course_data'));
    card_data = course_data['course_details']['section_details'][section_id]['flash_card_details'];
    data = ``;
    for (card_ids in card_data) {
        data += `
        <div class="col-12 col-sm-12 col-md-6 col-lg-4">
            <div class="flashcard-container mt-3 shadow-lg" onclick="openflashmodal($(this), '#40e0d0')" style="background-color: #40e0d0;">
                <div class="flashcard-header">
                    <h1 class="h3">`+ card_data[card_ids]["card_title"] + `</h1>
                </div>
                <div class="flashcard-body">`;
        if (card_data[card_ids]["card_image"] != null) {
            data += `
            <div class="flashcard-image">
                        <div class="flashcard-image-container"
                            style="background-image: url('/static/uploads/`+ card_data[card_ids]["card_image"] + `');"></div>
                    </div>
            `;
        }

        data += `<div class="flashcard-text">
                        `+ card_data[card_ids]["card_content"] + `
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    $('.sessions-list li').each(function () {
        $(this).removeClass('active');
    });
    $(param).closest('ul').parent().addClass('active');
    $(param).parent().addClass('active');
    $('#session-details-container').css('display', 'none');
    $('#pdf-viewer-container').css('display', 'none');
    $('#flashcard-details-container').css('display', 'initial');
    $('.flashcards-row').html(data);
}
function openflashmodal(param, color) {
    heading = $(".flashcard-header .h3", param).text();
    image_link = $('.flashcard-image-container', param).css('background-image');
    console.log("image link", image_link);
    data = $('.flashcard-text', param).text();
    $(".modal .flashcard-header .h1").text(heading);
    if (image_link != undefined) {
        $(".modal .flashcard-image-container").css('display', 'block');
        $(".modal .flashcard-image-container").css('background-image', image_link);
    }
    else {
        $(".modal .flashcard-image-container").css('display', 'none');
    }
    $('.modal .flashcard-modal-text').text(data);
    $('#flashcardmodal .modal-content').css('background-color', color);
    $('#flashcardmodal').modal('show');
}
function submit_collect_response(section_id, sub_section_id) {
    descr = $('.response_text_area').val();
    title = $('.project-response-title').val();
    link = $('.project-response-title').val();
    response_data = {
        "title": title,
        "link": link,
        "description": descr
    };
    course_id = localStorage.getItem('student_course_id');
    // course_id = 1;
    d = {
        "course_id": course_id,
        "section_id": section_id,
        "sub_section_id": sub_section_id,
        "response": response_data
    };
    $.ajax({
        type: "POST",
        url: "/update_response",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
            if (ret_obj['status_code'] == 200) {
                console.log(JSON.parse(ret_obj['data']));
                localStorage.setItem('course_student_data', ret_obj['data']);
                $('.project-puzzle-container .completed-assignment-box').css('display', 'flex');
                $('.project-puzzle-container .mark-as-completed-button').css('display', 'none');
                $('#collect_response_modal').modal('hide');
                load_tabs(section_id);
            }
        }
    });
}
function markascompleted(param, section_id, sub_section_id, collect_response = true, data = null) {
    if (collect_response == true) {
        response_data = JSON.parse(data);
        $('.collect_response_heading').html(response_data['title']);
        $('.collect_response_description').html(response_data['description']);
        onclick_data = `submit_collect_response(` + section_id + `, ` + sub_section_id + `)`;
        $('.submit-collect-response-button').attr('onclick', onclick_data);
        $('#collect_response_modal').modal('show');
    }
    else {
        course_id = localStorage.getItem('student_course_id');
        // course_id = 1;
        d = {
            "course_id": course_id,
            "section_id": section_id,
            "sub_section_id": sub_section_id,
        };
        $.ajax({
            type: "POST",
            url: "/update_response",
            dataType: "Json",
            contentType: 'application/json',
            data: JSON.stringify(d),
            processData: false,
            success: function (ret_obj) {
                if (ret_obj['status_code'] == 200) {
                    dummy = JSON.parse(ret_obj['data']);
                    dummy2 = JSON.parse(localStorage.getItem('course_student_data'));
                    if (dummy['badge_level'] != dummy2['badge_level']) {
                        if (dummy['badge_level'] == 1) {
                            console.log('inbronze');
                            $('.badge-image-container').css('background-image', `url('/static/app/assets/images/bronze.png')`);
                            $('#display_badge_assigned_modal').modal('show');

                        }
                        else if (dummy['badge_level'] == 2) {
                            console.log('insilver');
                            $('.badge-image-container').css('background-image', `url('/static/app/assets/images/silver.png')`);
                            $('#display_badge_assigned_modal').modal('show');
                        }
                        else if (dummy['badge_level'] == 3) {
                            console.log('ingold');
                            $('.badge-image-container').css('background-image', `url('/static/app/assets/images/gold.png')`);
                            $('#display_badge_assigned_modal').modal('show');
                        }
                    }
                    console.log(JSON.parse(ret_obj['data']));
                    localStorage.setItem('course_student_data', ret_obj['data']);
                    $(param).siblings('.completed-assignment-box').css('display', 'flex');
                    $(param).css('display', 'none');
                    load_tabs(section_id);
                }
            }
        });
    }
}
function load_assignment(param, section_id) {
    $('.course-section').css('display', 'block');
    $('.help-section').css('display', 'none');
    $('.survey-section').css('display', 'none');
    $('.certificate-section').css('display', 'none');
    $('.leaderboard-section').css('display', 'none');
    $('#session-details-container').css('display', 'block');
    $('#pdf-viewer-container').css('display', 'none');
    $('#flashcard-details-container').css('display', 'none');
    load_tabs(section_id);
    $('.sessions-list li').each(function () {
        $(this).removeClass('active');
    });
    $(param).closest('ul').parent().addClass('active');
    $(param).parent().addClass('active');
}
function load_project(section_id, sub_section_id, project_sub_section_data, project_student_sub_section_data) {
    $('.load-content-container').css('display', 'none');
    $('.project-puzzle-container').css('display', 'flex');
    project_data = JSON.parse(project_sub_section_data);
    project_student_data = JSON.parse(project_student_sub_section_data);
    $('.project-puzzle-heading').html("Project: " + project_data['sub_section_title']);

    if (project_data['project_details']['hint'] != "") {
        if (project_student_data['show_hint'] == true) {
            $('.view-hint-link').css('display', 'initial');
            $('.modal-hint-container').html(project_data['project_details']['hint']);
        }
        else {
            $('.view-hint-link').css('display', 'none');
        }
    }
    else {
        $('.view-hint-link').css('display', 'none');
    }
    if (project_data['project_details']['solution_image'] != null) {
        if (project_student_data['show_solution'] == true) {
            $('.view-solution-link').css('display', 'initial');
            $('.solution-modal-container').css('background-image', `url('/static/uploads/` + project_data['project_details']['solution_image'] + `')`);
        }
        else {
            $('.view-solution-link').css('display', 'none');
        }
    }
    else {
        $('.view-solution-link').css('display', 'none');
    }
    console.log("project_data", project_data);
    $('.assignment-description-para').html(project_data['project_details']['description']);
    if (project_data['project_details']['question_image'] == null) {
        $('.question-image-container').css('display', 'none');
    }
    else {
        $('.question-image-container').css('display', 'block');
        $('.question-image-container').css('background-image', `url('/static/uploads/` + project_data['project_details']['question_image'] + `')`);
    }
    if (project_data['project_details']['link'] == "") {
        $('.visit-link-button').css('display', 'none');
    }
    else {
        $('.visit-link-button').css('display', 'inline-block');
        $('.visit-link-button').attr('onclick', `window.open('` + project_data['project_details']['link'] + `', '_blank')`);
    }
    if (project_student_data['done'] == 1) {
        $('.project-puzzle-container .completed-assignment-box').css('display', 'flex');
        $('.project-puzzle-container .mark-as-completed-button').css('display', 'none');
    }
    else {
        constructed_mark_as_completed_data = `markascompleted($(this), ` + section_id + `, ` + sub_section_id + `,`;
        if (project_data['project_details']['collect_response'] == true) {
            constructed_mark_as_completed_data += `true, `;
            constructed_mark_as_completed_data += `'` + JSON.stringify(project_data['project_details']['response_details']) + `')`;
        }
        else {
            constructed_mark_as_completed_data += `false)`;
        }
        $('.project-puzzle-container .mark-as-completed-button').attr('onclick', constructed_mark_as_completed_data);
        $('.project-puzzle-container .completed-assignment-box').css('display', 'none');
        $('.project-puzzle-container .mark-as-completed-button').css('display', 'inline-block');
    }
}
function load_puzzle(section_id, sub_section_id, project_sub_section_data, project_student_sub_section_data) {
    $('.load-content-container').css('display', 'none');
    $('.project-puzzle-container').css('display', 'flex');
    project_data = JSON.parse(project_sub_section_data);
    project_student_data = JSON.parse(project_student_sub_section_data);
    $('.project-puzzle-heading').html("Puzzle: " + project_data['sub_section_title']);

    if (project_data['puzzle_details']['hint'] != "") {
        if (project_student_data['show_hint'] == true) {
            $('.view-hint-link').css('display', 'initial');
            $('.modal-hint-container').html(project_data['puzzle_details']['hint']);
        }
        else {
            $('.view-hint-link').css('display', 'none');
        }
    }
    else {
        $('.view-hint-link').css('display', 'none');
    }
    if (project_data['puzzle_details']['solution_image'] != null) {
        if (project_student_data['show_solution'] == true) {
            $('.view-solution-link').css('display', 'initial');
            $('.solution-modal-container').css('background-image', `url('/static/uploads/` + project_data['puzzle_details']['solution_image'] + `')`);
        }
        else {
            $('.view-solution-link').css('display', 'none');
        }
    }
    else {
        $('.view-solution-link').css('display', 'none');
    }
    $('.assignment-description-para').html(project_data['puzzle_details']['description']);
    if (project_data['puzzle_details']['question_image'] == null) {
        $('.question-image-container').css('display', 'none');
    }
    else {
        $('.question-image-container').css('display', 'block');
        $('.question-image-container').css('background-image', `url('/static/uploads/` + project_data['puzzle_details']['question_image'] + `')`);
    }
    if (project_data['puzzle_details']['link'] == "") {
        $('.visit-link-button').css('display', 'none');
    }
    else {
        $('.visit-link-button').css('display', 'inline-block');
        $('.visit-link-button').attr('onclick', `window.open('` + project_data['puzzle_details']['link'] + `', '_blank')`);
    }
    if (project_student_data['done'] == 1) {
        $('.project-puzzle-container .completed-assignment-box').css('display', 'flex');
        $('.project-puzzle-container .mark-as-completed-button').css('display', 'none');
    }
    else {
        constructed_mark_as_completed_data = `markascompleted($(this), ` + section_id + `, ` + sub_section_id + `,`;
        console.log('markascompleted', project_data);
        if (project_data['puzzle_details']['collect_response'] == true) {
            constructed_mark_as_completed_data += `true, `;
            constructed_mark_as_completed_data += `'` + JSON.stringify(project_data['puzzle_details']['response_details']) + `')`;
        }
        else {
            constructed_mark_as_completed_data += `false)`;
        }
        $('.project-puzzle-container .mark-as-completed-button').attr('onclick', constructed_mark_as_completed_data);
        $('.project-puzzle-container .completed-assignment-box').css('display', 'none');
        $('.project-puzzle-container .mark-as-completed-button').css('display', 'inline-block');
    }
}
function load_audio(section_id, sub_section_id, audio_sub_section_data, audio_student_sub_section_data) {
    $('.load-content-container').css('display', 'none');
    $('.audio-details-container').css('display', 'flex');
    audio_data = JSON.parse(audio_sub_section_data);
    audio_student_data = JSON.parse(audio_student_sub_section_data);
    console.log("audio", audio_data);
    $('.audio-heading').html(audio_data['sub_section_title']);
    $('.audio-details-description-para').html(audio_data['audio_details']['description']);
    $('.player_audio').attr('src', `/static/uploads/` + audio_data['audio_details']['path']);
    if (audio_student_data['done'] == 1) {
        $('.audio-details-container .completed-assignment-box').css('display', 'flex');
        $('.audio-details-container .mark-as-completed-button').css('display', 'none');
    }
    else {
        constructed_mark_as_completed_data = `markascompleted($(this), ` + section_id + `, ` + sub_section_id + `,false)`;
        $('.audio-details-container .mark-as-completed-button').attr('onclick', constructed_mark_as_completed_data);
        $('.audio-details-container .completed-assignment-box').css('display', 'none');
        $('.audio-details-container .mark-as-completed-button').css('display', 'inline-block');
    }
}
function load_youtube(section_id, sub_section_id, youtube_sub_section_data, youtube_student_sub_section_data) {
    $('.load-content-container').css('display', 'none');
    $('.youtube-details-container').css('display', 'flex');
    youtube_data = JSON.parse(youtube_sub_section_data);
    youtube_student_data = JSON.parse(youtube_student_sub_section_data);
    $('.video-heading').html(youtube_data['sub_section_title']);
    $('.video-description-details').html(youtube_data['youtube_details']['description']);
    console.log(youtube_data);
    youtube_link = youtube_data['youtube_details']['link'].replace('watch?v=', 'embed/');
    $('.video-source-data').attr('src', youtube_link);
    console.log(youtube_student_data['done']);
    if (youtube_student_data['done'] == 1) {
        $('.youtube-details-container .completed-assignment-box').css('display', 'flex');
        $('.youtube-details-container .mark-as-completed-button').css('display', 'none');
    }
    else {
        constructed_mark_as_completed_data = `markascompleted($(this), ` + section_id + `, ` + sub_section_id + `,false)`;
        $('.youtube-details-container .mark-as-completed-button').attr('onclick', constructed_mark_as_completed_data);
        $('.youtube-details-container .completed-assignment-box').css('display', 'none');
        $('.youtube-details-container .mark-as-completed-button').css('display', 'inline-block');
    }
}
function load_test(section_id, sub_section_id, test_sub_section_data, test_student_sub_section_data) {
    $('.load-content-container').css('display', 'none');
    $('.test-details-container').css('display', 'flex');
    test_data = JSON.parse(test_sub_section_data);
    student_test_data = JSON.parse(test_student_sub_section_data);
    $('.test-heading').html(test_data['sub_section_title']);
    $('.test-details-description-para').html(test_data['test_details']['description']);
    if (student_test_data['taken'] == 0) {
        $('.test-details-container .start-test-button').css('display', 'inline-block');
        $('.test-details-container .completed-test-container').css('display', 'none');
        $('.test-details-container .start-test-button button').attr('onclick', `starttest($(this), ` + section_id + `, ` + sub_section_id + `)`)
        $('.test-details-container .completed-assignment-box').css('display', 'none');
    }
    else {
        $('.test-details-container .start-test-button').css('display', 'none');
        $('.test-details-container .completed-test-container').css('display', 'block');
        $('.test-details-container .completed-assignment-box').css('display', 'flex');
    }

}
function update_session_state(i, j) {
    course_id = localStorage.getItem('student_course_id');
    // course_id = 1;
    var d = {
        "course_id": course_id,
        "i": i,
        "j": j
    };
    localStorage.setItem('i_value', i);
    localStorage.setItem('j_value', j);
    $.ajax({
        type: "POST",
        url: "/student/update_session_state_dbop",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
        }
    });
}
function load_content(param, section_id, sub_section_id) {
    course_data = JSON.parse(localStorage.getItem('course_data'));
    student_data = JSON.parse(localStorage.getItem('course_student_data'));
    sub_section_data = course_data['course_details']['section_details'][section_id]['session_details']['sub_section_details'][sub_section_id];
    sub_section_student_data = student_data['course_details'][section_id]['sub_section_details'][sub_section_id];
    if (sub_section_data['sub_section_type'] == "project") {
        load_project(section_id, sub_section_id, JSON.stringify(sub_section_data), JSON.stringify(sub_section_student_data));
    }
    else if (sub_section_data['sub_section_type'] == "puzzle") {
        load_puzzle(section_id, sub_section_id, JSON.stringify(sub_section_data), JSON.stringify(sub_section_student_data));
    }
    else if (sub_section_data['sub_section_type'] == "audio") {
        load_audio(section_id, sub_section_id, JSON.stringify(sub_section_data), JSON.stringify(sub_section_student_data));
    }
    else if (sub_section_data['sub_section_type'] == "youtube") {
        load_youtube(section_id, sub_section_id, JSON.stringify(sub_section_data), JSON.stringify(sub_section_student_data));
    }
    else if (sub_section_data['sub_section_type'] == "test") {
        load_test(section_id, sub_section_id, JSON.stringify(sub_section_data), JSON.stringify(sub_section_student_data));
    }
    $('.projects-tabs .each-assignment-container').removeClass('assignment-choosen');
    $(param).addClass('assignment-choosen');
    i_value = 0;
    for (i = 0; i < $('.ml-menu li').length; i++) {
        if ($('.ml-menu li').eq(i).hasClass('active')) {
            i_value = i;
            break;
        }
    }
    j_value = 0;
    for (i = 0; i < $('.projects-tabs .each-assignment-container').length; i++) {
        if ($('.projects-tabs .each-assignment-container').eq(i).hasClass('assignment-choosen')) {
            j_value = i;
            break;
        }
    }
    update_session_state(i_value, j_value);
}
function load_tabs(section_id) {
    course_data = JSON.parse(localStorage.getItem('course_data'));
    student_data = JSON.parse(localStorage.getItem('course_student_data'));
    session_data = course_data['course_details']['section_details'][section_id];
    no_of_tabs = session_data['session_details']['no_of_subsections'];
    tabs_data = ``;
    for (tabs_id in session_data['session_details']['sub_section_details']) {
        tabs_data += `
        <div class="item">
            <div class="each-assignment-container pt-4" onclick="load_content($(this), ` +
            section_id +
            `,` +
            tabs_id +
            `)">
                <h5 class="h4 text-center project-counter-number">` +
            tabs_id
            + `</h5>
                <h6 class="h5 assignment-title text-center mt-3">` +
            session_data['session_details']['sub_section_details'][tabs_id]['sub_section_title']
            + `</h6>
                <i style="float:right;" class="check-icon-2 fas `;
        console.log(student_data);
        console.log("student_data", student_data['course_details'][section_id]['sub_section_details'][tabs_id]['done']);
        if (student_data['course_details'][section_id]['sub_section_details'][tabs_id]['done'] == 1) {
            tabs_data += 'fa-check-circle';
        }
        else if (student_data['course_details'][section_id]['sub_section_details'][tabs_id]['taken'] == 1) {
            tabs_data += 'fa-check-circle';
        }
        tabs_data += `"></i>
            </div>
        </div>
        `;
    }
    $('#basic_demo').owlCarousel('destroy');
    $('.projects-tabs').html(tabs_data);
    $("#basic_demo").owlCarousel({
        loop: false,
        margin: 15,
        nav: false,
        merge: true,
        dots: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 5
            },
            1000: {
                items: 6
            }
        }
    });
    $('.owl-carousel').removeClass('owl-hidden');
    j_value = localStorage.getItem('j_value');
    $('.projects-tabs .item').eq(0).find('.each-assignment-container').trigger('click');
    i_value = 0;
    for (i = 0; i < $('.ml-menu li').length; i++) {
        if ($('.ml-menu li').eq(i).hasClass('active')) {
            i_value = i;
            break;
        }
    }
    j_value = 0;
    for (i = 0; i < $('.projects-tabs .each-assignment-container').length; i++) {
        if ($('.projects-tabs .each-assignment-container').eq(i).hasClass('assignment-choosen')) {
            j_value = i;
            break;
        }
    }
    update_session_state(i_value, j_value);
}
function load_pdf(param, section_id) {
    $('.course-section').css('display', 'block');
    $('.help-section').css('display', 'none');
    $('.survey-section').css('display', 'none');
    $('.certificate-section').css('display', 'none');
    $('.leaderboard-section').css('display', 'none');
    course_data = JSON.parse(localStorage.getItem('course_data'));
    pdf_path = course_data['course_details']['section_details'][section_id]['pdf_path'];
    $('#pdf-viewer-container .page-title').text(course_data['course_details']['section_details'][section_id]['section_title']);
    $('#pdf-display-iframe').attr('src', '/static/uploads/' + pdf_path);
    $('.sessions-list li').each(function () {
        $(this).removeClass('active');
    });
    $(param).closest('ul').parent().addClass('active');
    $(param).parent().addClass('active');
    $('#session-details-container').css('display', 'none');
    $('#flashcard-details-container').css('display', 'none');
    $('#pdf-viewer-container').css('display', 'initial');
}
function submit_query() {
    doubt = $('.doubt_textarea').val();
    if (doubt.length < 1) {
        $('#ask_doubt_modal .error-message').removeClass('hidden');
    }
    else {
        $('#ask_doubt_modal .error-message').addClass('hidden');
        course_id = localStorage.getItem('student_course_id');
        // course_id = 1;
        var d = {
            "course_id": course_id,
            "question": doubt
        };
        $.ajax({
            type: "POST",
            url: "/student/ask_question",
            dataType: "Json",
            contentType: 'application/json',
            data: JSON.stringify(d),
            processData: false,
            success: function (ret_obj) {
                console.log(ret_obj);
                $('.doubt_textarea').val("");
                $('#ask_doubt_modal').modal('hide');
            }
        });
    }
}
function open_ask_doubt_modal() {
    console.log("this function is being called");
    $('#ask_doubt_modal').modal('show');
}
function openhelp_section(param) {
    $('.course-section').css('display', 'none');
    $('.survey-section').css('display', 'none');
    $('.leaderboard-section').css('display', 'none');
    $('.certificate-section').css('display', 'none');
    $('.help-section').css('display', 'block');
    $('.sessions-list li').each(function () {
        $(this).removeClass('active');
    });
    course_id = localStorage.getItem('student_course_id');
    // course_id = 1;
    var d = {
        "course_id": course_id,
    };
    $(param).parent().addClass('active');
    $.ajax({
        type: "POST",
        url: "/student/get_all_queries",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
            console.log(ret_obj);
            if (ret_obj['status_code'] == 200) {
                data = ``;
                for (i = 0; i < ret_obj['data'].length; i++) {
                    if (ret_obj['data'][i]['answer'] == null) {
                        data += `
                        <div class="container-fluid question-container mt-5 white-background" id="queries_container">
                            <div class="row question-row">
                                `+ ret_obj['data'][i]['question'] + `
                            </div>
                            <div class="row answer-row">
                                NOT ANSWERED YET
                            </div>
                        </div>
                        `;
                    }
                    else {
                        data += `
                        <div class="container-fluid question-container mt-5 grey-background" id="queries_container">
                            <div class="row question-row">
                                `+ ret_obj['data'][i]['question'] + `
                            </div>
                            <div class="row answer-row">
                                `+ ret_obj['data'][i]['answer'] + `
                            </div>
                        </div>
                        `;
                    }
                }
                $('.mega-query-container').html(data);
            }
        }
    });
}
function submit_survey() {
    data = [];
    i = 1;
    comments = $('#comments').val();
    $('.survey_questions_container .question-container').each(function () {
        question = $('.question-row', this).text();
        option_selected = $('input[name=r_' + (i) + ']:checked', this).parent().find('div').text();
        if (option_selected != "") {
            data.push({ "question": question, "points": option_selected });
        }
        i += 1;
    });
    console.log(i);
    if (data.length != (i - 2)) {
        alert("Please answer all the questions");
    }
    else if (comments == "") {
        alert("Please enter your suggestions");
    }
    else {
        data2 = { "questions": data, "testimonials": comments };
        course_id = localStorage.getItem('student_course_id');
        // course_id = 1;
        d = {
            "course_id": course_id,
            "data": JSON.stringify(data2)
        };
        $.ajax({
            type: "POST",
            url: "/student/submit_survey",
            dataType: "Json",
            contentType: 'application/json',
            data: JSON.stringify(d),
            processData: false,
            success: function (ret_obj) {
                if (ret_obj['status_code'] == 200) {
                    localStorage.setItem('course_student_data', ret_obj['data']);
                    $('.after_submitting_query_box').removeClass('hidden');
                    $('.before_submitting_query__box').addClass('hidden');
                }
            }
        });
    }
    console.log(data);
}
function open_surveyform(param) {
    $('.sessions-list li').each(function () {
        $(this).removeClass('active');
    });
    $(param).parent().addClass('active');
    course_student_data = localStorage.getItem('course_student_data');
    course_student_data = JSON.parse(course_student_data);
    survey = course_student_data['survey'];
    $('.course-section').css('display', 'none');
    $('.survey-section').css('display', 'block');
    $('.help-section').css('display', 'none');
    $('.certificate-section').css('display', 'none');
    $('.leaderboard-section').css('display', 'none');
    if (course_student_data['completed_percentage'] < 50.0) {
        $('.before_submitting_query__box').addClass('hidden');
        $('.after_submitting_query_box').addClass('hidden');
        $('.survey_warning_box').removeClass('hidden');
    }
    else if (survey === undefined) {
        $.ajax({
            type: "POST",
            url: "/student/get_survey_questions",
            dataType: "Json",
            contentType: 'application/json',
            data: JSON.stringify(d),
            processData: false,
            success: function (ret_obj) {
                console.log(ret_obj);
                if (ret_obj['status_code'] == 200) {
                    data = ``;
                    for (i = 0; i < ret_obj['data']['survey_details'].length; i++) {
                        data += `
                    <div class="container-fluid question-container">
                        <div class="row">
                            <div class="col-12 question-row">
                                `+ (i + 1) + `. ` + ret_obj['data']['survey_details'][i] + `
                            </div>
                        </div>
                        <div class="container-fluid options-container pl-4 mt-4">
                            <div class="row">
                                <div class="col">
                                    <label class="options-row">
                                        <input type="radio" name="r_`+ (i + 1) + `">
                                        <div>1</div>
                                    </label>
                                </div>
                                <div class="col">
                                    <label class="options-row">
                                        <input type="radio"name="r_`+ (i + 1) + `">
                                        <div>2</div>
                                    </label>
                                </div>
                                <div class="col">
                                    <label class="options-row">
                                        <input type="radio" name="r_`+ (i + 1) + `">
                                        <div>3</div>
                                    </label>
                                </div>
                                <div class="col">
                                    <label class="options-row">
                                        <input type="radio" name="r_`+ (i + 1) + `">
                                        <div>4</div>
                                    </label>
                                </div>
                                <div class="col">
                                    <label class="options-row">
                                        <input type="radio" name="r_`+ (i + 1) + `">
                                        <div>5</div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    }
                    data += `
                    <div class="container-fluid question-container">
                        <div class="row">
                            <div class="col-12 question-row">
                                We would love to hear about your experience
                            </div>
                        </div>
                        <div class="container-fluid options-container pl-4 mt-4">
                        <textarea name="" id="comments" cols="30" rows="10" class="form-control"></textarea>
                        </div>
                    `;
                    data += `
                <div class="container-fluid text-center">
                    <button class="btn btn-primary mt-4 mb-4 w-50" onclick="submit_survey()">
                    Submit
                    </button>
                </div>
                `;
                    $('.survey_questions_container').html(data);
                }
            }
        });
        $('.before_submitting_query__box').removeClass('hidden');
        $('.after_submitting_query_box').addClass('hidden');
        $('.survey_warning_box').addClass('hidden');
    }
    else {
        $('.before_submitting_query__box').addClass('hidden');
        $('.after_submitting_query_box').removeClass('hidden');
        $('.survey_warning_box').addClass('hidden');
    }

}
function open_leaderboard(param) {
    $('.sessions-list li').each(function () {
        $(this).removeClass('active');
    });
    $(param).parent().addClass('active');
    course_id = localStorage.getItem('student_course_id');
    console.log("leaderboard course_id", course_id);
    // course_id = 1;
    d = {
        "course_id": course_id
    };
    $.ajax({
        type: "POST",
        url: "/student/leaderboard",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
            console.log("leader", ret_obj);
            $('.course-section').css('display', 'none');
            $('.survey-section').css('display', 'none');
            $('.help-section').css('display', 'none');
            $('.certificate-section').css('display', 'none');
            $('.leaderboard-section').css('display', 'block');
            data = ``;
            for (i = 0; i < ret_obj['data'].length; i++) {
                data += `
                <tr>
                    <th scope="row">`+ (i + 1) + `</th>
                    <td>digitCodemy_`+ ret_obj['data'][i]['student_id'] + `</td>
                    <td>`+ ret_obj['data'][i]['name'] + `</td>
                    <td>`+ ret_obj['data'][i]['points'] + `</td>
                </tr>
                `;
            }
            $('.leaderboard-table tbody').html(data);
        }
    });
}
function open_download_certificate(param) {
    $('.sessions-list li').each(function () {
        $(this).removeClass('active');
    });
    $(param).parent().addClass('active');
    $('.course-section').css('display', 'none');
    $('.survey-section').css('display', 'none');
    $('.help-section').css('display', 'none');
    $('.certificate-section').css('display', 'block');
    $('.leaderboard-section').css('display', 'none');
    student_data = JSON.parse(localStorage.getItem('course_student_data'));
    if (student_data['completed_percentage'] == 100 && student_data['certificate'] == 1) {
        $('.certificate_download_box').removeClass('hidden');
        $('.certificate_warning_box').addClass('hidden');
    }
    else {
        $('.certificate_download_box').addClass('hidden');
        $('.certificate_warning_box').removeClass('hidden');
    }
}
function download_certificate() {
    window.open('certificate?course_id='+localStorage.getItem('student_course_id'));
    // check_badges_assigned();
    // window.open('certificate?course_id=5');
}
function fillnavbar() {
    data = JSON.parse(localStorage.getItem('course_data'));
    student_data = JSON.parse(localStorage.getItem('course_student_data'));
    console.log(data);
    $('.course-heading').html(data['course_name']);
    console.log(student_data);
    data2 = `
    <li>
        <a href="home" data-sessionid="-1" id="aside_home">
            <i class="fas fa-home"></i>
            <span>&nbsp;Home</span>
        </a>
    </li>
    <li>
        <a data-sessionid="-1" id="aside_leaderboard" onclick="open_leaderboard($(this))">
            <i class="fas fa-trophy"></i>
            <span>&nbsp;Leaderboard</span>
        </a>
    </li>
    <li>
        <a id="aside_course" onclick="return false;" class="menu-toggle toggled waves-effect waves-block">
            <i class="fas fa-laptop-code"></i>
            <span>Course</span>
        </a>
        <ul class="ml-menu" style="display:block">
    `;
    for (i in data['course_details']['section_details']) {
        if (data['course_details']['section_details'][i]['section_type'] == "session") {
            data2 += `
                <li>
                    <a class="assignment-title session-title" onclick="load_assignment($(this), '`+ data['course_details']['section_details'][i]['section_id'] + `')" id="aside_section_` + data['course_details']['section_details'][i]['section_id'] + `">
                        <img height="25" width="25" src="/static/app/assets/images/sessionicon.png">
                        <span>Session `+
                data['course_details']['section_details'][i]['session_details']['session_number'] +
                `:` +
                data['course_details']['section_details'][i]['session_details']['session_title'] +
                `</span>
            `;
            done_flag = 0;
            console.log("here", i, student_data['course_details'][data['course_details']['section_details'][i]['section_id']]);
            for (j in student_data['course_details'][data['course_details']['section_details'][i]['section_id']]['sub_section_details']) {
                if (student_data['course_details'][data['course_details']['section_details'][i]['section_id']]['sub_section_details'][j]['sub_section_type'] == "test") {
                    if (student_data['course_details'][data['course_details']['section_details'][i]['section_id']]['sub_section_details'][j]['taken'] == 0) {
                        done_flag = 1;
                        break;
                    }
                    else {
                        continue;
                    }
                }
                if (student_data['course_details'][data['course_details']['section_details'][i]['section_id']]['sub_section_details'][j]['done'] == 0) {
                    done_flag = 1;
                    break;
                }
            }
            if (done_flag == 0) {
                data2 += `<i style="float:right;" class="check-icon fas fa-check-circle"></i>`;
            }
            data2 += `</a></li>`;
        }
        else if (data['course_details']['section_details'][i]['section_type'] == "flashcard") {
            data2 += `
            <li>
                <a class="assignment-title session-title" onclick="load_flashcards($(this), '`+ data['course_details']['section_details'][i]['section_id'] + `')" id="aside_section_` + data['course_details']['section_details'][i]['section_id'] + `">
                    <img height="25" width="25" src="/static/app/assets/images/flashcardsicon.png">
                    <span>Flash Cards</span>
                </a>
            </li>
            `;
        }
        else if (data['course_details']['section_details'][i]['section_type'] == "pdfviewer") {
            data2 += `
            <li>
                <a class="assignment-title session-title" onclick="load_pdf($(this), '`+ data['course_details']['section_details'][i]['section_id'] + `')" id="aside_section_` + data['course_details']['section_details'][i]['section_id'] + `">
                    <img height="25" width="25" src="/static/app/assets/images/pdficon.png">
                    <span>Notes: `+
                data['course_details']['section_details'][i]['section_title']
                + `</span>
                </a>
            </li>
            `;
        }
    }
    data2 += `
        </ul>
    </li>
    <li>
        <a data-sessionid="-1" id="aside_survey" onclick="open_surveyform($(this))">
            <i class="fab fa-wpforms"></i>
            <span>&nbsp;Survey</span>
        </a>
    </li>
    <li>
        <a data-sessionid="-1" id="aside_help" onclick="openhelp_section($(this))">
            <i class="fab fa-hire-a-helper"></i>
            <span>&nbsp;Help</span>
        </a>
    </li>
    <li>
        <a data-sessionid="-1" id="aside_help" onclick="open_download_certificate($(this))">
            <i class="fas fa-certificate"></i>
            <span>&nbsp;Certificate</span>
        </a>
    </li>
    `;
    $('.sessions-list').html(data2);
}
function load_session_state() {
    course_id = localStorage.getItem('student_course_id');
    // course_id = 1;
    d = {
        "course_id": course_id
    };
    $.ajax({
        type: "POST",
        url: "get_session_state_dbop",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
            i_value = parseInt(ret_obj['data']['i_value']);
            j_value = parseInt(ret_obj['data']['j_value']);
            localStorage.setItem('i_value', i_value);
            localStorage.setItem('j_value', j_value);
            $('.ml-menu li').eq(i_value).find('a').trigger('click');
            // $('.projects-tabs .item').eq(j_value).find('.each-assignment-container').trigger('click');
            $(".page-loader-wrapper").fadeOut();
        }

    });
}
function starttest(param, section_id, sub_section_id) {
    localStorage.setItem("test_section_id", section_id);
    localStorage.setItem("test_sub_section_id", sub_section_id);
    student_course_data = JSON.parse(localStorage.getItem('course_student_data'));
    test_data = student_course_data['course_details'][section_id]['sub_section_details'][sub_section_id];
    console.log(test_data);
    if (test_data['taken'] == 0) {
        window.location.href = '/student/test';
    }

}
function check_badges_assigned() {
    course_id = localStorage.getItem('student_course_id');
    student_course_data = JSON.parse(localStorage.getItem('course_student_data'));
    d = {
        'course_id': course_id
    };
    $.ajax({
        type: "POST",
        url: "/student/getbadges",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
            if (ret_obj['status_code'] == 200) {
                console.log(student_course_data);
                if(!Array.isArray(student_course_data['badges'])){
                    i = JSON.parse(student_course_data['badges']).length;
                }
                else{
                    i = student_course_data['badges'].length;
                }
                j = ret_obj['data'].length;
                console.log(i, j);
                if (j != i) {
                    student_course_data['badges'] = JSON.stringify(ret_obj['data']);
                    localStorage.setItem('course_student_data', JSON.stringify(student_course_data));
                    $('.badge-image-container').css('background-image', `url('/static/badges/`+ret_obj['data'][j-1]+`.png')`);
                    $('#display_badge_assigned_modal').modal('show');
                }
            }
        }
    });
}
$(document).ready(function () {
    $('#login-student-name').text(localStorage.getItem('student_name'));
    course_id = localStorage.getItem('student_course_id');
    // course_id = 1;
    d = {
        "course_id": course_id
    };
    setInterval(check_badges_assigned, 300000);
    $.ajax({
        type: "POST",
        url: "/student_course_data",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
            if (ret_obj['status_code'] == 200) {
                course_data = ret_obj['data']['course_data'];
                course_student_data = ret_obj['data']['course_student_data'];
                localStorage.setItem("course_data", course_data);
                localStorage.setItem("course_student_data", course_student_data);
                fillnavbar();
                load_session_state();

                // $(".menu-toggle").on("click", function (e) {
                //     var $this = $(this);
                //     var $content = $this.next();

                //     if ($($this.parents("ul")[0]).hasClass("list")) {
                //         var $not = $(e.target).hasClass("menu-toggle")
                //             ? e.target
                //             : $(e.target).parents(".menu-toggle");

                //         $.each(
                //             $(".menu-toggle.toggled")
                //                 .not($not)
                //                 .next(),
                //             function (i, val) {
                //                 if ($(val).is(":visible")) {
                //                     $(val)
                //                         .prev()
                //                         .toggleClass("toggled");
                //                     $(val).slideUp();
                //                 }
                //             }
                //         );
                //     }

                //     $this.toggleClass("toggled");
                //     $content.slideToggle(200);
                // });
                $.MyAdmin.leftSideBar.activate();
            }
        }
    });
    //     $.MyAdmin = {};
    //     $.MyAdmin.options = {
    //         leftSideBar: {
    //             scrollColor: "rgba(0,0,0,0.5)",
    //             scrollWidth: "4px",
    //             scrollAlwaysVisible: false,
    //             scrollBorderRadius: "0",
    //             scrollRailBorderRadius: "0",
    //             scrollActiveItemWhenPageLoad: true,
    //             breakpointWidth: 1170
    //         },
    //         dropdownMenu: {
    //             effectIn: "pullDown",
    //             effectOut: "fadeOut"
    //         }
    //     };
    //     $.MyAdmin.leftSideBar = {
    //         activate: function () {
    //             var _this = this;
    //             var $body = $("body");
    //             var $overlay = $(".overlay");

    //             //Close sidebar
    //             $(window).on("click", function (e) {
    //                 var $target = $(e.target);
    //                 if (e.target.nodeName.toLowerCase() === "i") {
    //                     $target = $(e.target).parent();
    //                 }

    //                 if (
    //                     !$target.hasClass("bars") &&
    //                     _this.isOpen() &&
    //                     $target.parents("#leftsidebar").length === 0
    //                 ) {
    //                     if (!$target.hasClass("js-right-sidebar")) $overlay.fadeOut();
    //                     $body.removeClass("overlay-open");
    //                 }
    //             });

    //             $.each($(".menu-toggle.toggled"), function (i, val) {
    //                 $(val)
    //                     .next()
    //                     .slideToggle(0);
    //             });

    //             //When page load
    //             $.each($(".menu .list li.active"), function (i, val) {
    //                 var $activeAnchors = $(val).find("a:eq(0)");

    //                 $activeAnchors.addClass("toggled");
    //                 $activeAnchors.next().show();
    //             });

    //             //Collapse or Expand Menu
    //             $(".menu-toggle").on("click", function (e) {
    //                 var $this = $(this);
    //                 var $content = $this.next();

    //                 if ($($this.parents("ul")[0]).hasClass("list")) {
    //                     var $not = $(e.target).hasClass("menu-toggle")
    //                         ? e.target
    //                         : $(e.target).parents(".menu-toggle");

    //                     $.each(
    //                         $(".menu-toggle.toggled")
    //                             .not($not)
    //                             .next(),
    //                         function (i, val) {
    //                             if ($(val).is(":visible")) {
    //                                 $(val)
    //                                     .prev()
    //                                     .toggleClass("toggled");
    //                                 $(val).slideUp();
    //                             }
    //                         }
    //                     );
    //                 }

    //                 $this.toggleClass("toggled");
    //                 $content.slideToggle(320);
    //             });

    //             //Set menu height
    //             _this.setMenuHeight();
    //             _this.checkStatuForResize(true);
    //             $(window).resize(function () {
    //                 _this.setMenuHeight();
    //                 _this.checkStatuForResize(false);
    //             });

    //             //Set Waves
    //             Waves.attach(".menu .list a", ["waves-block"]);
    //             Waves.init();
    //         },
    //         setMenuHeight: function (isFirstTime) {
    //             if (typeof $.fn.slimScroll != "undefined") {
    //                 var configs = $.MyAdmin.options.leftSideBar;
    //                 //var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
    //                 var height = $(window).height() - $(".navbar").innerHeight();
    //                 var $el = $(".list");

    //                 $el.slimscroll({
    //                     height: height + "px",
    //                     color: configs.scrollColor,
    //                     size: configs.scrollWidth,
    //                     alwaysVisible: configs.scrollAlwaysVisible,
    //                     borderRadius: configs.scrollBorderRadius,
    //                     railBorderRadius: configs.scrollRailBorderRadius
    //                 });

    //                 //Scroll active menu item when page load, if option set = true
    //                 if ($.MyAdmin.options.leftSideBar.scrollActiveItemWhenPageLoad) {
    //                     var activeItemOffsetTop = $(".menu .list li.active")[0].offsetTop;
    //                     if (activeItemOffsetTop > 150)
    //                         $el.slimscroll({ scrollTo: activeItemOffsetTop + "px" });
    //                 }
    //             }
    //         },
    //         checkStatuForResize: function (firstTime) {
    //             var $body = $("body");
    //             var $openCloseBar = $(".navbar .navbar-header .bars");
    //             var width = $body.width();

    //             if (firstTime) {
    //                 $body
    //                     .find(".content, .sidebar")
    //                     .addClass("no-animate")
    //                     .delay(1000)
    //                     .queue(function () {
    //                         $(this)
    //                             .removeClass("no-animate")
    //                             .dequeue();
    //                     });
    //             }

    //             if (width < $.MyAdmin.options.leftSideBar.breakpointWidth) {
    //                 $body.addClass("ls-closed");
    //                 $openCloseBar.fadeIn();
    //             } else {
    //                 $body.removeClass("ls-closed");
    //                 $openCloseBar.fadeOut();
    //             }
    //         },
    //         isOpen: function () {
    //             return $("body").hasClass("overlay-open");
    //         }
    //     };

    //     /*  Left sidemenu collapse */
    //     $(document).on("click", ".sidemenu-collapse", function () {
    //         console.log("clicking");
    //         var $body = $("body");
    //         if ($body.hasClass("side-closed")) {
    //             $body.removeClass("side-closed");
    //             $body.removeClass("submenu-closed");
    //         } else {
    //             $body.addClass("side-closed");
    //             $body.addClass("submenu-closed");
    //         }
    //     });
    //     $(".content, .navbar").mouseenter(function () {
    //         var $body = $("body");
    //         $body.removeClass("side-closed-hover");
    //         $body.addClass("submenu-closed");
    //     });
    //     $(".sidebar").mouseenter(function () {
    //         var $body = $("body");
    //         $body.addClass("side-closed-hover");
    //         $body.removeClass("submenu-closed");
    //     });

    //     if (localStorage.getItem("sidebar_option")) {
    //         jQuery("body").addClass(localStorage.getItem("sidebar_option"));
    //     }
    //     if ($("body").hasClass("side-closed")) {
    //         $(".sidebar-user-panel").css({ display: "none" });
    //     } else {
    //         $(".sidebar-user-panel").css({ display: "block" });
    //     }
    //     jQuery(document).on("click", ".sidemenu-collapse", function () {
    //         var sidebar_option = "";
    //         if ($("body").hasClass("side-closed")) {
    //             var sidebar_option = "side-closed submenu-closed";
    //             $(".sidebar-user-panel").css({ display: "none" });
    //         } else {
    //             $(".sidebar-user-panel").css({ display: "block" });
    //         }
    //         jQuery("body").addClass(sidebar_option);
    //         localStorage.setItem("sidebar_option", sidebar_option);
    //     });
});
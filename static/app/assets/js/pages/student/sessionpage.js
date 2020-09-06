function update_session_state(i, j) {
    course_id = localStorage.getItem('course_id');
    var d = {
        "course_id": course_id,
        "i": i,
        "j": j
    };
    $.ajax({
        type: "POST",
        url: "/student/update_session_state_dbop",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
        }
    })
}
function load_content(i, j) {
    update_session_state(i, j);
    $('.each-assignment-container').each(function () {
        $(this).removeClass('assignment-choosen');
    });
    $('.each-assignment-container').eq(j).addClass('assignment-choosen');
    var data = localStorage.getItem('course_data');
    data = JSON.parse(data);
    console.log("data:", data, i);
    assignment_data = data[i]['assignment'][j];
    console.log(i, j, assignment_data);
    $('.assignment-heading').text((j + 1) + ". " + assignment_data['type'] + ": " + assignment_data['title']);
    $('.assignment-description-para').html(assignment_data['description']);
    if (assignment_data['ctsa']['show_hint'] == 1) {
        console.log('heretoo');
        $('.view-hint-link').removeClass('display-none');
        $('.modal-hint-container').text(assignment_data['hint']);
    }
    else {
        $('.view-hint-link').addClass('display-none');
        $('.modal-hint-container').text("");
    }
    if (assignment_data['ctsa']['show_solution'] == 1) {
        $('.view-solution-link').removeClass('display-none');
        $('.solution-modal-container').css("background-image", "url('" + assignment_data['solution_image'] + "')");

    }
    else {
        $('.view-solution-link').addClass('display-none');
        $('.solution-modal-container').css("background-image", "url('')");
    }
    if (assignment_data['question_image']) {
        $('.question-image-container').removeClass('display-none');
        $('.question-image-container').css("background-image", "url('" + assignment_data['question_image'] + "')");
    }
    else
        $('.question-image-container').addClass('display-none');
    if (assignment_data['link'] == "") {
        $('.visit-link-button').attr("disabled", "disabled");
        $('.visit-link-button').removeAttr("onclick");
    }
    else {
        $('.visit-link-button').removeAttr("disabled");
        $('.visit-link-button').attr("onclick", "openwebsite('" + assignment_data['link'] + "')");
    }
    console.log(assignment_data['ctsa']['done']);
    if (assignment_data['ctsa']['done'] == 1) {
        $('.mark-as-completed-button').removeClass('btn-primary');
        $('.mark-as-completed-button').addClass('btn-success');
        $('.mark-as-completed-button').text('Completed');
        $('.mark-as-completed-button').attr('data-done', '1');
    }
    else {
        $('.mark-as-completed-button').removeClass('btn-success');
        $('.mark-as-completed-button').addClass('btn-primary');
        $('.mark-as-completed-button').text('Mark as completed');
        $('.mark-as-completed-button').attr('data-done', '0');
    }
    $('.mark-as-completed-button').attr('onclick', "markcompleted($(this), " + assignment_data['ctsa']['ctsa_id'] + "," + i + ", '" + j + "')");
}
function openwebsite(url) {
    window.open(url, '_blank');
}
function markcompleted(param, ctsa_id, i, j) {
    course_id = localStorage.getItem('student_course_id');
    done = $(param).text();
    console.log('done', done);
    if (done.toUpperCase() == 'COMPLETED') {
        d = { "done": '0', "ctsa_id": ctsa_id, 'course_id': course_id };
        $.ajax({
            type: "POST",
            url: "/student/markassignment_dbop",
            dataType: "Json",
            contentType: 'application/json',
            data: JSON.stringify(d),
            processData: false,
            success: function (ret_obj) {
                console.log(ret_obj);
                if (ret_obj['status_code'] == 200) {
                    $(param).removeClass('btn-success');
                    $(param).addClass('btn-primary');
                    $(param).text("mark as completed");
                    $(param).attr('data-done', '0');
                    oldwidth = $(param).width();
                    $(param).text('mark as completed');
                    newwidth = $(param).outerWidth();
                    $(param).width(oldwidth);
                    $(param).animate({
                        width: newwidth + 'px'
                    }, 100);
                    data = localStorage.getItem('course_data');
                    data = JSON.parse(data);
                    data[parseInt(i)]['assignment'][parseInt(j)]['ctsa']['done'] = 0;
                    localStorage.setItem('course_data', JSON.stringify(data));
                    $('.each-assignment-container').eq(parseInt(j)).find('.check-icon-2').removeClass('fa-check-circle');
                    flag = 0;
                    for (k = 0; k < data[i]['assignment'].length; k++) {
                        if (data[i]['assignment'][k]['ctsa']['done'] == 0)
                            flag = 1;
                    }
                    if (flag == 0) {
                        $('.session-title').eq(i).find('.check-icon').addClass('fa-check-circle');
                    }
                    else {
                        $('.session-title').eq(i).find('.check-icon').removeClass('fa-check-circle');
                    }
                }
            }
        });
    }
    else {
        d = { "done": '1', "ctsa_id": ctsa_id, 'course_id': course_id };
        $.ajax({
            type: "POST",
            url: "/student/markassignment_dbop",
            dataType: "Json",
            contentType: 'application/json',
            data: JSON.stringify(d),
            processData: false,
            success: function (ret_obj) {
                if (ret_obj['status_code'] == 200) {
                    $(param).removeClass('btn-primary');
                    $(param).addClass('btn-success');
                    $(param).text("completed");
                    data = localStorage.getItem('course_data');
                    data = JSON.parse(data);
                    data[parseInt(i)]['assignment'][parseInt(j)]['ctsa']['done'] = 1;
                    localStorage.setItem('course_data', JSON.stringify(data));
                    $('.each-assignment-container').eq(parseInt(j)).find('.check-icon-2').addClass('fa-check-circle');
                    flag = 0;
                    for (k = 0; k < data[i]['assignment'].length; k++) {
                        if (data[i]['assignment'][k]['ctsa']['done'] == 0)
                            flag = 1;
                    }
                    if (flag == 0) {
                        $('.session-title').eq(i).find('.check-icon').addClass('fa-check-circle');
                    }
                    else {
                        $('.session-title').eq(i).find('.check-icon').removeClass('fa-check-circle');
                    }
                }
            }
        });
    }
}
function load_assignment(i, choose = 0, load_inner = true) {
    data = localStorage.getItem('course_data');
    data = JSON.parse(data);
    $('.page-title').text('Session ' + data[i]['number'] + ": " + data[i]['name']);
    assignment_data = data[i]['assignment'];
    app_data = ``;
    for (j = 0; j < assignment_data.length; j++) {
        app_data += `
        <div class="item " data-assignmentdone="`+ assignment_data[j]['ctsa']['done'] + `" data-assignmentid="` + assignment_data[j]['assignment_id'] + `" onclick="load_content(` + i + `, ` + j + `)">
            <div class="each-assignment-container pt-4`;
        app_data += `">
                <h5 class="h4 text-center project-counter-number">`+ (j + 1) + `</h5>`
        if (assignment_data[j]['ctsa']['done']) {
            // <h6 class="project-or-puzzle text-center">`+ assignment_data[j]['type'] + `</h6>
            app_data += `<h6 class="h5 assignment-title text-center mt-3">` + assignment_data[j]['title'] + `</h6>
                <i style="float:right;" class="check-icon-2 fas fa-check-circle"></i>
            </div>
        </div>`;
        } else {
            app_data += `<h6 class="h5 assignment-title text-center mt-3">` + assignment_data[j]['title'] + `</h6>
        <i style="float:right;" class="check-icon-2 fas"></i>
            </div>
        </div>`;
        }
    }
    $('.projects-tabs').html(app_data);
    if (load_inner) {
        load_content(i, 0);
    }
    $('#basic_demo').owlCarousel('destroy');
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
}
function fillnavbar(data) {
    console.log('here');
    data2 =
        `<li>
        <a href="home" data-sessionid="-1">
            <i class="fas fa-home"></i>
            <span>&nbsp;Home</span>
        </a>
    </li>`;
    for (i = 0; i < data.length; i++) {
        data2 += `<li><a href="#" class="assignment-title session-title" onClick="load_assignment(` + i + `)" data-sessionid="` + data[i]['session_id'] + `">
        <i class="fas fa-laptop-code"></i>
        <span>&nbsp;Session `+ data[i]['number'] + `: ` + data[i]['name'];
        flag = 0;
        for (k = 0; k < data[i]['assignment'].length; k++) {
            if (data[i]['assignment'][k]['ctsa']['done'] == 0)
                flag = 1;
        }
        if (flag == 0)
            // data2 += " background-green";
            data2 += `</span><i style="float:right;" class="check-icon fas fa-check-circle"></i>
        </a>
        </li>`;
        else
            data2 += `</span><i style="float:right;" class="check-icon fas"></i>
        </a>
        </li>`;
    }
    $('.sessions-list').html(data2);
}

$(document).ready(function () {
    course_id = localStorage.getItem('student_course_id');
    $(document).on('click', '.sessions-list li', function () {
        $('li.active').removeClass('active');
        $(this).addClass('active');
    });
    d = {
        'course_id': course_id
    }
    $.ajax({
        type: "POST",
        url: "/studentcourse_dbop",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (ret_obj) {
            if (ret_obj['status_code'] == 200) {
                data2 = ret_obj['data']['sessions'];
                $('.course-heading').text(ret_obj['data']['course_name']);
                console.log(data2);
                localStorage.setItem('course_data', JSON.stringify(data2));
                // console.log(data2);
                $.ajax({
                    type: "POST",
                    url: "/student/get_session_state_dbop",
                    dataType: "Json",
                    contentType: 'application/json',
                    data: JSON.stringify(d),
                    processData: false,
                    success: function (ret_obj) {
                        if (ret_obj['status_code'] == 200) {
                            setTimeout(function () {
                                $(".page-loader-wrapper").fadeOut();
                            }, 50);
                            fillnavbar(data2);
                            load_assignment(ret_obj['data']['i_value'], load_inner = false);
                            load_content(ret_obj['data']['i_value'], ret_obj['data']['j_value']);
                            $('.sessions-list li').eq(ret_obj['data']['i_value'] + 1).addClass('active');
                            $(".page-loader-wrapper").fadeOut();
                        }
                    }
                });
            }
            else {
                console.log('error');
            }
        }
    });
});

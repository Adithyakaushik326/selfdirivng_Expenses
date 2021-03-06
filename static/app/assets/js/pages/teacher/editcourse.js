
    $(document).ready(function () {
        // alert(localStorage.getItem('course_id'));
        if (localStorage.getItem('teacher_course_id') == null) {
            window.location.href = 'teacher';
        }

        get_edit_course()

    })
    function get_edit_course() {
        var d = {
            'course_id': localStorage.getItem('teacher_course_id'),
            'teacher_id': 1
        };

        $.ajax({
            type: "POST",
            url: "editcourse_dbop",
            dataType: 'Json',
            contentType: 'application/json',
            data: JSON.stringify(d),
            processData: false,
            success: function (obj) {
                console.log(obj);
                console.log('static/uploads/' + obj['course']['image'])
                var header = `<div class="course-banner-image" style="background-image: url('../static/uploads/` + obj['course']['image'] + `') ">

                                <h1 class="h2 course-name-heading">`+obj['course']['name']+`</h1>
                            </div>`
                $('#course-image-heading').html(header);
                var desc = `<p class="lead course-details-para mt-3 pl-3 pr-4 text-justify"><b
                                    class="course-description-heading">Course Description:</b></p>
                            <p class="lead course-details-para mt-1 pl-4 pr-4 text-justify"> `+ obj['course']['description'] + `</p>`;
                $('#course-description').html(desc);
                var session = ``;
                var c = 0;
                console.log('SESSIONS: ', obj['sessions']);
                for (i = 0; i < obj['sessions'].length; i++) {
                    section_id = obj['sessions'][i]['session_no'];
                    session += `<div class="panel-group session-details-container" id="accordion_s` + i + `"
                                            role="tablist" aria-multiselectable="true">
                                            <div class="panel panel-primary">
                                                <div class="panel-heading" role="tab" id="headingOne_s`+ i + `">
                                                    <h4 class="panel-title clearfix">
                                                        <a role="button" class="pull-left" data-toggle="collapse"
                                                            data-parent="#accordion_s`+ i + `" href="#collapseOne_s` + i + `"
                                                            aria-expanded="true" aria-controls="collapseOne_s`+ i + `">
                                                            Session <span class="session-number-span"> `+ obj['sessions'][i]['session_no'] + `:</span>
                                                            <span class="session-name-span">`+ obj['sessions'][i]['title'] + `</span>
                                                        </a>
                                                        
                                                    </h4>

                                                </div>
                                                <div id="collapseOne_s`+ i + `" class="panel-collapse collapse"
                                                    role="tabpanel" aria-labelledby="headingOne_s`+ i + `">
                                                    <div class="panel-body">
                                                        <div class="row session-row mt-3 pl-3 pr-3">
                                                            <div class="col-12 pl-5">
                                                                <div class="assignment-group">`;
                    for (j = 0; j < obj['sessions'][i]['assignment'].length; j++) {
                        session += `<div class="panel-group assignment-details-container"
                                                                        id="accordion_a`+ c + `" role="tablist"
                                                                        aria-multiselectable="true">
                                                                        <div class="panel panel-primary">
                                                                            <div class="panel-heading" role="tab"
                                                                                id="headingOne_a`+ c + `">
                                                                                <h4 class="panel-title clearfix">
                                                                                    <a role="button" class="pull-left"
                                                                                        data-toggle="collapse"
                                                                                        data-parent="#accordion_a`+ c + `"
                                                                                        href="#collapseOne_a`+ c + `"
                                                                                        aria-expanded="true"
                                                                                        aria-controls="collapseOne_a`+ c + `">
                                                                                        <span
                                                                                            class="project-type-heading">`+ obj['sessions'][i]['assignment'][j]['sub_section_type'] + `</span><span
                                                                                            class="project-title-heading">:
                                                                                            `+ obj['sessions'][i]['assignment'][j]['sub_section_title'] + `</span>
                                                                                    </a>`;
                        if (obj['sessions'][i]['assignment'][j]['sub_section_type'] == 'project' || obj['sessions'][i]['assignment'][j]['sub_section_type'] == 'puzzle') {
                            if (obj['sessions'][i]['assignment'][j]['show-hint'] == 1) {
                                session += `<button
                                                                                                class="btn btn-outline-danger no-box-shadow pull-right v-align-center mr-2"
                                                                                                type="button" onclick="disable($(this), 'hint','`+ section_id + `','` + j + `')">Disable
                                                                                                Hint</button>`;
                            }
                            else {
                                session += `<button
                                                                                                class="btn btn-outline-success no-box-shadow pull-right v-align-center mr-2"
                                                                                                type="button" onclick="enable($(this), 'hint','`+ section_id + `','` + j + `')">Enable
                                                                                                Hint</button>`;

                            }
                            if (obj['sessions'][i]['assignment'][j]['show-solution'] == 1) {
                                session += `
                                                                                            <button
                                                                                                class="btn btn-outline-danger no-box-shadow pull-right v-align-center mr-2"
                                                                                                type="button"onclick="disable($(this), 'solution','`+ section_id + `','` + j + `')">Disable
                                                                                                Solution</button>`;
                            }
                            else {
                                session += `
                                                                                            <button class="btn btn-outline-success no-box-shadow pull-right v-align-center mr-2"
                                                                                                type="button" onclick="enable($(this), 'solution','`+ section_id + `','` + j + `')">Enable
                                                                                                Solution</button>`;
                            }
                        }
                     
                        session += `</h4>
                                                                            </div>
                                                                        </div>
                                                                        <div id="collapseOne_a`+ c + `"
                                                                            class="panel-collapse collapse in"
                                                                            role="tabpanel"
                                                                            aria-labelledby="headingOne_a`+ c + `"
                                                                            data-parent="#accordion_a`+ c + `">

                                                                            <div class="panel-body">
                                                                                <div class="row mt-4 p-2 assignment-row pl-4 pr-4">
                                                                                    <p ><b class="course-description-heading">`+ obj['sessions'][i]['assignment'][j]['sub_section_type'] + ` Description:</b></p>
                                                                                    <div class="col-12"></div>`;
                        var type = obj['sessions'][i]['assignment'][j]['sub_section_type'] + '_details';
                        session += `<p class="lead">` + obj['sessions'][i]['assignment'][j][type]['description'] + `</p>
                                                                                    <div class="col-12"></div>`;
                        if (obj['sessions'][i]['assignment'][j]['sub_section_type'] == 'project' || obj['sessions'][i]['assignment'][j]['sub_section_type'] == 'puzzle') {
                            session += `<div class="col-6 mt-3 mb-3">
                                                                                        <button
                                                                                            class="btn btn-outline-primary w-100" onclick="displayimage('`+ obj['sessions'][i]['assignment'][j][type]['question_image'] + `')">
                                                                                            VIEW QUESTION
                                                                                        </button>
                                                                                    </div>
                                                                                    <div class="col-6 mt-3 mb-3">
                                                                                        <button
                                                                                            class="btn btn-outline-primary w-100" onclick="displayimage('`+ obj['sessions'][i]['assignment'][j][type]['solution_image'] + `')">VIEW
                                                                                            SOLUTION</button>
                                                                                    </div>
                                                                                    <div class="col-12 mt-3">
                                                                                        <div
                                                                                            class="form-group form-float">
                                                                                            <div class="form-line">
                                                                                                <p ><b class="course-description-heading">Link:</b></p>
                                                                                                <a class="lead" target="_blank" href="`+ obj['sessions'][i]['assignment'][j][type]['link'] + `">
                                                                                                    `+ obj['sessions'][i]['assignment'][j][type]['link'] + `</a>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="col-12">
                                                                                        <div
                                                                                            class="form-group form-float">
                                                                                            <div class="form-line">
                                                                                                <p class="assignment-hint-input"><b class="course-description-heading">Hint:</b></p>
                                                                                                <p
                                                                                                    class="assignment-hint-input">
                                                                                                    `+ obj['sessions'][i]['assignment'][j][type]['hint'] + `
                                                                                                </p>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>`;
                        }
                        else if (obj['sessions'][i]['assignment'][j]['sub_section_type'] == 'audio') {
                            session += `
                                                                                    <div class="form-line">
                                                                                        <p ><b class="course-description-heading">Audio:</b></p>
                                                                                        <a class="lead" target="_blank" href="`+ obj['sessions'][i]['assignment'][j][type]['path'] + `">
                                                                                            `+ obj['sessions'][i]['assignment'][j][type]['path'] + `</a>

                                                                                    </div>`;
                        }
                        else if (obj['sessions'][i]['assignment'][j]['sub_section_type'] == 'youtube') {
                            session += `
                                                                                    <div class="form-line">
                                                                                        <p ><b class="course-description-heading">video link:</b></p>
                                                                                        <a class="lead" target="_blank" href="`+ obj['sessions'][i]['assignment'][j][type]['link'] + `">
                                                                                            `+ obj['sessions'][i]['assignment'][j][type]['link'] + `</a>

                                                                                    </div>`;
                        }
                        else if (obj['sessions'][i]['assignment'][j]['sub_section_type'] == 'test') {
                            session += `
                                                                                    
                                                                                    <div class="form-line col-12">
                                                                                        <ul><b class="course-description-heading">Questions:</b><br>`;
                            console.log(obj['sessions'][i]['assignment'][j]['test_details']['questions']);
                            for (k = 0; k < Object.keys(obj['sessions'][i]['assignment'][j]['test_details']['questions']).length; k++) {
                                session += `
                                                                                            <li style="margin-left:10px">`+ obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['question_id'] + `.  ` + obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['question_title'] + `<p style="float:right">Marks:5</p> <li><br>`;
                                if (obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['question_type'] == 'mcq') {
                                    for (l = 0; l < obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['details']['options'].length; l++) {
                                        if (obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['details']['options'][l] == obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['details']['answer']) {
                                            session += `<p style="color:red">answer</p>`
                                        }
                                        else {
                                            session += `<p>options</p>`;
                                        }
                                    }
                                }
                                if (obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['question_type'] == 'match') {

                                    for (l = 0; l < obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['details'].length; l++) {
                                        session += `<div class="row">
                                                                                                                <div class="col-3">`+ obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['details'][l]['choice'] + `</div> 
                                                                                                                <div class="col-4">----------------------></div> 
                                                                                                                <div class="col-3">`+ obj['sessions'][i]['assignment'][j]['test_details']['questions'][k + 1]['details'][l]['option'] + `</div> 
                                                                                                            </div> `;
                                        // session+=`<p style="margin-left:30px">`+obj['sessions'][i]['assignment'][j]['test_details']['questions'][k+1]['details'][l]['choice']+`------>`+obj['sessions'][i]['assignment'][j]['test_details']['questions'][k+1]['details'][l]['option']+` </p>`;
                                    }
                                }
                            }
                            session += ` </ul>
                                                                                        

                                                                                    </div>`;
                        }


                        session += ` </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>`;
                        c += 1;
                    }
                    session += `</div>


                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;

                }
                $('.session-group').html(session);
            }
        })
    }
    function displayimage(url) {
        console.log("working")
        $('#displayimage-modal').modal("show");
        var body = `<div class="modal-body" id="image-display-modal" style="background-image: url('../static/uploads/` + url + `')">
                   
                    </div>`
        $('#displayimage-modal-body').html(body);
    }
    function enable(param, type, session_id, assignment_id) {
        console.log(type);
        console.log('assig' + assignment_id);
        console.log('session' + session_id)
        console.log('enable');
        var d = {
            'course_id': localStorage.getItem('teacher_course_id'),
            'session_id': session_id,
            'assignment_id': assignment_id,
            'type': 'enable',
            'value': type
        };
        $.ajax({
            type: "POST",
            url: "editcourse_dbop",
            dataType: 'Json',
            contentType: 'application/json',
            data: JSON.stringify(d),
            processData: false,
            success: function (obj) {
                $(param).removeClass('btn-outline-success');
                $(param).addClass('btn-outline-danger');
                if (type == 'hint') {
                    $(param).text("Disable Hint");
                    $(param).attr("onclick", `disable($(this), 'hint','` + session_id + `','` + assignment_id + `')`);
                }
                else {
                    $(param).text("Disable Solution");
                    $(param).attr("onclick", `disable($(this), 'solution', '` + session_id + `','` + assignment_id + `')`);
                }
            }
        })
    }
    function disable(param, type, session_id, assignment_id) {
        console.log(type);
        console.log('assig' + assignment_id);
        console.log('session' + session_id)
        console.log('disable');
        var d = {
            'course_id': localStorage.getItem('teacher_course_id'),
            'session_id': session_id,
            'assignment_id': assignment_id,
            'type': 'disable',
            'value': type
        };
        $.ajax({
            type: "POST",
            url: "editcourse_dbop",
            dataType: 'Json',
            contentType: 'application/json',
            data: JSON.stringify(d),
            processData: false,
            success: function (obj) {

                $(param).removeClass('btn-outline-danger');
                $(param).addClass('btn-outline-success');
                if (type == 'hint') {
                    $(param).text("Enable Hint");
                    $(param).attr("onclick", `enable($(this), 'hint','` + session_id + `','` + assignment_id + `')`);
                }
                else {
                    $(param).text("Enable Solution");
                    $(param).attr("onclick", `enable($(this), 'solution', '` + session_id + `','` + assignment_id + `')`);
                }
            }
        })
    }

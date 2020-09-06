var assignment_counter = 1, session_counter = 1;
$(document).ready(function () {
    assignment_counter = 1;
    session_counter = 1;
    $(document).on("change paste keyup", '.session-number-input-class', function () {
        $(this).closest('div.panel-collapse').siblings('div.panel-heading').find('.session-number-span').text($(this).val() + ":");
    });
    $(document).on("change paste keyup", '.session-name-input-class', function () {
        $(this).closest('div.panel-collapse').siblings('div.panel-heading').find('.session-name-span').text($(this).val());
    });
    $(document).on('focus', '.form-control', function () {
        $(this)
            .parent()
            .addClass("focused");
    });
    $(document).on('focusout', '.form-control', function () {
        var $this = $(this);
        if ($this.parents(".form-group").hasClass("form-float")) {
            if ($this.val() == "") {
                $this.parents(".form-line").removeClass("focused");
            }
        } else {
            $this.parents(".form-line").removeClass("focused");
        }
    });
    $(document).on("click", "body.form-float body.form-line body.form-label", function () {
        $(this)
            .parent()
            .find("input")
            .focus();
    });
    $(document).on("change", ".project-type-select", function () {
        $(this)
            .closest('div.panel-collapse')
            .siblings('div.panel-primary')
            .find('.project-type-heading')
            .text($('option:selected', this).text());
    });
    $(document).on("change paste keyup", ".project-title-input-class", function () {
        $(this)
            .closest('div.panel-collapse')
            .siblings('div.panel-primary')
            .find('.project-title-heading')
            .html(' - ' + $(this).val());
    });
});
function addassignments(param) {
    assignment_counter += 1;
    data = `
    <div class="panel-group assignment-details-container" id="accordion_a`+ assignment_counter + `"
        role="tablist" aria-multiselectable="true">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab"
                id="headingOne_a`+ assignment_counter + `">
                <h4 class="panel-title clearfix"
                    data-toggle="collapse"
                    data-parent="#accordion_a`+ assignment_counter + `"
                    href="#collapseOne_a`+ assignment_counter + `"
                    aria-expanded="true"
                    aria-controls="collapseOne_a`+ assignment_counter + `">
                    <a role="button"
                        class="pull-left">
                        <span class="project-type-heading">Project</span><span class="project-title-heading"></span>
                    </a>
                    <button
                        class="btn tblActnBtn pull-right v-align-center mr-2"
                        type="button"
                        onclick="deletesession($(this))"><i
                            class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
        </div>
        <div id="collapseOne_a`+ assignment_counter + `"
            class="panel-collapse collapse show"
            role="tabpanel"
            aria-labelledby="headingOne_a`+ assignment_counter + `"
            data-parent="#accordion_a`+ assignment_counter + `">

            <div class="panel-body">
                <div
                    class="row mt-4 p-2 assignment-row">
                    <div
                        class="col-4 col-sm-4 col-md-3 col-lg-3">
                        <select
                            class="browser-default project-type-select">
                            <option value="project"
                                selected="">Project</option>
                            <option value="puzzle">Puzzle</option>
                        </select>
                    </div>
                    <div
                        class="col-8 col-sm-8 col-md-9 col-lg-9">
                        <div
                            class="form-group form-float">
                            <div class="form-line">
                                <input type="text"
                                    class="form-control project-title-input-class"
                                    name="name"
                                    required>
                                <label
                                    class="form-label">
                                    Title</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div
                            class="form-group form-float">
                            <div class="form-line">
                                <textarea
                                    class="form-control no-resize project-description-input"
                                    rows="4"></textarea>
                                <label
                                    class="form-label">
                                    Description</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div
                            class="file-field input-field">
                            <div class="btn">
                                <span>UPLOAD
                                    QUESTION
                                    IMAGE</span>
                                <input type="file" class="assignment-question-image">
                            </div>
                            <div
                                class="file-path-wrapper">
                                <input
                                    class="file-path validate"
                                    type="text">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div
                            class="file-field input-field">
                            <div class="btn">
                                <span>UPLOAD
                                    SOLUTION
                                    IMAGE</span>
                                <input type="file" class="assignment-solution-image">
                            </div>
                            <div
                                class="file-path-wrapper">
                                <input
                                    class="file-path validate"
                                    type="text">
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div
                            class="form-group form-float">
                            <div class="form-line">
                                <input type="text"
                                    class="form-control assignment-link-input"
                                    name="name"
                                    required>
                                <label
                                    class="form-label">
                                    Link</label>
                            </div>
                        </div>
                    </div>
                    <div class="col-12">
                        <div
                            class="form-group form-float">
                            <div class="form-line">
                                <textarea
                                    class="form-control no-resize assignment-hint-input"
                                    rows="4"></textarea>
                                <label
                                    class="form-label">Hint</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    $(param).siblings('div.assignment-group').append(data);
}

function addsessions(param) {
    assignment_counter += 1;
    session_counter += 1;
    data = `
    <div class="panel-group session-details-container" id="accordion_s`+ session_counter + `" role="tablist"
        aria-multiselectable="true">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_s`+ session_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse"
                    data-parent="#accordion_s`+ session_counter + `" href="#collapseOne_s` + session_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_s`+ session_counter + `">
                    <a role="button" class="pull-left">
                        Session <span class="session-number-span"></span>
                        <span class="session-name-span"></span>
                    </a>
                    <button
                        class="btn tblActnBtn pull-right v-align-center mr-2"
                        type="button" onclick="deletesession($(this))"><i
                            class="material-icons v-align-center">delete</i></button>
                </h4>

            </div>
            <div id="collapseOne_s`+ session_counter + `" class="panel-collapse collapse show"
                role="tabpanel" aria-labelledby="headingOne_s`+ session_counter + `">
                <div class="panel-body">
                    <div class="row session-row mt-3 pl-3 pr-3">
                        <div class="col-md-6">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" class="form-control session-number-input-class"
                                        name="name" required>
                                    <label class="form-label">Session
                                        No.</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group form-float">
                                <div class="form-line">
                                    <input type="text" class="form-control session-name-input-class"
                                        name="name" required>
                                    <label class="form-label">Session
                                        Title</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 pl-5">
                            <div class="assignment-group">
                                <div class="panel-group assignment-details-container" id="accordion_a`+ assignment_counter + `"
                                    role="tablist" aria-multiselectable="true">
                                    <div class="panel panel-primary">
                                        <div class="panel-heading" role="tab"
                                            id="headingOne_a`+ assignment_counter + `">
                                            <h4 class="panel-title clearfix"
                                                data-toggle="collapse"
                                                data-parent="#accordion_a`+ assignment_counter + `"
                                                href="#collapseOne_a`+ assignment_counter + `"
                                                aria-expanded="true"
                                                aria-controls="collapseOne_a`+ assignment_counter + `">
                                                <a role="button"
                                                    class="pull-left">
                                                    <span class="project-type-heading">Project</span><span class="project-title-heading"></span>
                                                </a>
                                                <button
                                                    class="btn tblActnBtn pull-right v-align-center mr-2"
                                                    type="button"
                                                    onclick="deletesession($(this))"><i
                                                        class="material-icons v-align-center">delete</i></button>
                                            </h4>
                                        </div>
                                    </div>
                                    <div id="collapseOne_a`+ assignment_counter + `"
                                        class="panel-collapse collapse show"
                                        role="tabpanel"
                                        aria-labelledby="headingOne_a`+ assignment_counter + `"
                                        data-parent="#accordion_a`+ assignment_counter + `">

                                        <div class="panel-body">
                                            <div
                                                class="row mt-4 p-2 assignment-row">
                                                <div
                                                    class="col-4 col-sm-4 col-md-3 col-lg-3">
                                                    <select
                                                        class="browser-default project-type-select">
                                                        <option value="project"
                                                            selected="">Project</option>
                                                        <option value="puzzle">Puzzle</option>
                                                    </select>
                                                </div>
                                                <div
                                                    class="col-8 col-sm-8 col-md-9 col-lg-9">
                                                    <div
                                                        class="form-group form-float">
                                                        <div class="form-line">
                                                            <input type="text"
                                                                class="form-control project-title-input-class"
                                                                name="name"
                                                                required>
                                                            <label
                                                                class="form-label">
                                                                Title</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div
                                                        class="form-group form-float">
                                                        <div class="form-line">
                                                            <textarea
                                                                class="form-control no-resize project-description-input"
                                                                rows="4"></textarea>
                                                            <label
                                                                class="form-label">
                                                                Description</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div
                                                        class="file-field input-field">
                                                        <div class="btn">
                                                            <span>UPLOAD
                                                                QUESTION
                                                                IMAGE</span>
                                                            <input type="file" class="assignment-question-image">
                                                        </div>
                                                        <div
                                                            class="file-path-wrapper">
                                                            <input
                                                                class="file-path validate"
                                                                type="text">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div
                                                        class="file-field input-field">
                                                        <div class="btn">
                                                            <span>UPLOAD
                                                                SOLUTION
                                                                IMAGE</span>
                                                            <input type="file" class="assignment-solution-image">
                                                        </div>
                                                        <div
                                                            class="file-path-wrapper">
                                                            <input
                                                                class="file-path validate"
                                                                type="text">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div
                                                        class="form-group form-float">
                                                        <div class="form-line">
                                                            <input type="text"
                                                                class="form-control assignment-link-input"
                                                                name="name"
                                                                required>
                                                            <label
                                                                class="form-label">Link</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <div
                                                        class="form-group form-float">
                                                        <div class="form-line">
                                                            <textarea
                                                                class="form-control no-resize assignment-hint-input"
                                                                rows="4"></textarea>
                                                            <label
                                                                class="form-label">Hint</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button class="btn mt-3" type="button"
                                onclick="addassignments($(this))">
                                <span>ADD ASSIGNMENT</span>
                                <i class="material-icons">add</i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    $(param).siblings('div.session-group').append(data);
}

function deletesession(param) {
    heading = $(param).siblings('a').text();
    swal({
        title: "Are you sure?",
        text: "Deleteing - " + heading,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "DELETE",
        closeOnConfirm: true,
        closeOnCancel: true
    },
        function () {
            $(param).parent().parent().parent().parent().remove();
        });
}

function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onerror = reject;
        fr.onload = function () {
            resolve(fr.result);
        }
        fr.readAsDataURL(file);
    });
}
async function addcourse() {
    var data = {};
    course_name = $('div.course-details-container .course-name-input').val();
    course_description = $('div.course-details-container .course-description-input').val();
    course_image = $('div.course-details-container .course-image-input').prop('files')[0];
    if (course_image) {
        b64_course_image = await readAsDataURL(course_image);
        data['course_image'] = b64_course_image;
    }
    else
        data['course_image'] = null;
    data['course_name'] = course_name;
    data['course_desc'] = course_description;
    data['sessions'] = [];
    for (i = 0; i < $('div.session-details-container').length; i++) {
        console.log("session", i);
        sess = $('div.session-details-container').eq(i);
        var session_data = {};
        session_data['number'] = $('.session-number-input-class', sess).val();
        session_data['title'] = $('.session-name-input-class', sess).val();
        session_data['assignments'] = [];
        for (j = 0; j < $('div.assignment-details-container', sess).length; j++) {
            ass = $('div.assignment-details-container', sess).eq(j);
            var assignment_data = {};
            assignment_data['type'] = $('.project-type-select option:selected', ass).text();
            assignment_data['title'] = $('.project-title-input-class', ass).val();
            assignment_data['desc'] = $('.project-description-input', ass).val();
            question_image = $('.assignment-question-image', ass).prop('files')[0];
            solution_image = $('.assignment-solution-image', ass).prop('files')[0];
            assignment_data['link'] = $('.assignment-link-input', ass).val();
            assignment_data['hint'] = $('.assignment-hint-input', ass).val();
            if (question_image) {
                assignment_data['question_image'] = await readAsDataURL(question_image);
            }
            else {
                assignment_data['question_image'] = null;
            }
            if (solution_image) {
                assignment_data['soultion_image'] = await readAsDataURL(solution_image);
            }
            else {
                assignment_data['soultion_image'] = null;
            }
            session_data['assignments'].push(assignment_data);
        }

        data['sessions'].push(session_data);
    }
    // console.log(JSON.parse(data));
    swal(
        {
            title: "Are you Sure?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Okay",
            closeOnConfirm: true
        },
        function () {
            $.ajax({
                type: "POST",
                url: "addcourse_dbop",
                dataType: "Json",
                contentType: 'application/json',
                data: JSON.stringify(data),
                processData: false,
                success: function (ret_obj) {
                    swal(
                        {
                            title: "Done",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Okay",
                            closeOnConfirm: true
                        },
                        function () {
                            window.location.reload();
                        }
                    );

                }
            })
            //             }
            //           );
            console.log(JSON.stringify(data));

        });
}

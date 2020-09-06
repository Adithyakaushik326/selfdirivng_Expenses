section_counter = 1, sub_section_counter = 1, question_counter = 1;
$(document).ready(function () {
    section_counter = 1;
    sub_section_counter = 1;
    question_counter = 1;
    $(".page-loader-wrapper").fadeOut();
    d = {
        'course_id': localStorage.getItem('edit_course_admin_course_id')
    };
    d['course_id'] = 13;
    $.ajax({
        type: "POST",
        url: "/admin/get_course_details",
        dataType: "Json",
        contentType: 'application/json',
        data: JSON.stringify(d),
        processData: false,
        success: function (data) {
            console.log(data);
            process_data(data['data']);
        }
    })
});
function deletesegment(param) {
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
function addmoreoptions(param, section_question_counter) {
    var current_no_of_options = $(param).siblings('div.options-column').find('.option-title-input-class').length;
    var data = `
    <div class="col-md-4 col-sm-8 col-8 question-fields">
        <div class="form-group form-float">
            <div class="">
                <label class="form-label">
                    Option
                    `+ (current_no_of_options + 1) + `</label>
                <input type="text" class="form-control option-title-input-class" name="name" required>
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-4 col-4 question-fields">
        <div class="form-check form-check-radio">
            <label>
                <input name="option_q`+ section_question_counter + `" type="radio">
                <span>Correct
                    Answer</span>
            </label>
        </div>
    </div>
    `;
    $(param).siblings('div.options-column').find('div.row').append(data);
}
function addmorematchchoice(param) {
    var data = `
    <div class="col-sm-6 question-fields">
        <div class="form-group form-float">
            <div class="">
                <label class="form-label">
                    Choice</label>
                <input type="text" class="form-control question-option-input-class" required>
                
            </div>
        </div>
    </div>
    <div class="col-sm-6 question-fields">
        <div class="form-group form-float">
            <div class="">
                <label class="form-label">
                    Match</label>
                <input type="text" class="form-control match-option-input-class" required>
                
            </div>
        </div>
    </div>
    `;
    $(param).siblings('div.choices-column').find('div.row').append(data);
}
function addmcqquestion(param) {
    var data = `
    <div class="panel-group question-details-container" id="accordion_q`+ question_counter + `" role="tablist" aria-multiselectable="true" data-questiontype="mcq">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_q`+ question_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_q`+ question_counter + `" href="#collapseOne_q` + question_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_q`+ question_counter + `">
                    <a role="button" class="pull-left">
                        <span class="question-type-heading">MCQ</span><span class="question-title-heading"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_q`+ question_counter + `" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="headingOne_q` + question_counter + `"
                data-parent="#accordion_q`+ question_counter + `">
                <div class="panel-body">
                    <div class="row question-row">
                        <div class="col-10 question-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Question</label>
                                    <input type="text" class="form-control question-title-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Marks</label>
                                    <input type="number" min="0" class="form-control question-marks-input-class" name="name" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 options-column">
                            <div class="row options-row">
                                <div class="col-md-4 col-sm-8 col-8 question-fields">
                                    <div class="form-group form-float">
                                        <div class="">
                                        <label class="form-label">
                                                Option
                                                1</label>
                                            <input type="text" class="form-control option-title-input-class" name="name"
                                                required>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2 col-sm-4 col-4 question-fields">
                                    <div class="form-check form-check-radio">
                                        <label>
                                            <input name="option_q`+ question_counter + `" type="radio">
                                            <span>Correct
                                                Answer</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-8 col-8 question-fields">
                                    <div class="form-group form-float">
                                        <div class="">
                                        <label class="form-label">
                                                Option
                                                2</label>
                                            <input type="text" class="form-control option-title-input-class" name="name"
                                                required>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-2 col-sm-4 col-4 question-fields">
                                    <div class="form-check form-check-radio">
                                        <label>
                                            <input name="option_q`+ question_counter + `" type="radio">
                                            <span>Correct
                                                Answer</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Option"
                            class="btn waves-effect float-left ml-3" onclick="addmoreoptions($(this), `+ question_counter + `)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    question_counter += 1;
    $(param).parent().siblings('div.questions-group').append(data);
}
function addmatchquestion(param) {
    var data = `
    <div class="panel-group question-details-container" id="accordion_q`+ question_counter + `" role="tablist" aria-multiselectable="true" data-questiontype="match">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_q`+ question_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_q`+ question_counter + `" href="#collapseOne_q` + question_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_q`+ question_counter + `">
                    <a role="button" class="pull-left">
                        <span class="question-type-heading">Match the following</span><span class="question-title-heading"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_q`+ question_counter + `" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="headingOne_q` + question_counter + `"
                data-parent="#accordion_q`+ question_counter + `">
                <div class="panel-body">
                    <div class="row question-row">
                        <div class="col-10 question-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                Question</label>
                                    <input type="text" class="form-control question-title-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Marks</label>
                                    <input type="number" min="0" class="form-control question-marks-input-class" name="name" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 choices-column">
                            <div class="row mt-2">
                                <div class="col-sm-6 question-fields">
                                    <div class="form-group form-float">
                                        <div class="">
                                        <label class="form-label">
                                                Choice</label>
                                            <input type="text" class="form-control question-option-input-class" required>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 question-fields">
                                    <div class="form-group form-float">
                                        <div class="">
                                        <label class="form-label">
                                                Match</label>
                                            <input type="text" class="form-control match-option-input-class" required>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 question-fields">
                                    <div class="form-group form-float">
                                        <div class="">
                                        <label class="form-label">
                                                Choice</label>
                                            <input type="text" class="form-control question-option-input-class" required>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6 question-fields">
                                    <div class="form-group form-float">
                                        <div class="">
                                        <label class="form-label">
                                                Match</label>
                                            <input type="text" class="form-control match-option-input-class" required>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Choice and match"
                            class="btn waves-effect float-left ml-3" onclick="addmorematchchoice($(this))">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    question_counter += 1;
    $(param).parent().siblings('div.questions-group').append(data);
}
function addtextquestion(param) {
    var data = `
    <div class="panel-group question-details-container" id="accordion_q`+ question_counter + `" role="tablist" aria-multiselectable="true" data-questiontype="text">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_q`+ question_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_q`+ question_counter + `" href="#collapseOne_q` + question_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_q`+ question_counter + `">
                    <a role="button" class="pull-left">
                        <span class="question-type-heading">Text based</span><span class="question-title-heading"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_q`+ question_counter + `" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="headingOne_q` + question_counter + `"
                data-parent="#accordion_q`+ question_counter + `">
                <div class="panel-body">
                    <div class="row question-row">
                        <div class="col-10">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Question</label>
                                    <input type="text" class="form-control question-title-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Marks</label>
                                    <input type="number" min="0" class="form-control question-marks-input-class" name="name" required>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    question_counter += 1;
    $(param).parent().siblings('div.questions-group').append(data);
}
function addtest(param) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="test">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Test</span><span class="sub-section-title-heading"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12 test-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Title</label>
                                    <input type="text" class="form-control test-title-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 test-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Description</label>
                                    <textarea class="form-control no-resize test-description-input" rows="4"></textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="questions-group">
                            </div>
                            <div class="clearfix mt-3">
                                <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add MCQ Question"
                                    class="btn waves-effect float-left mr-4" onclick="addmcqquestion($(this))">
                                    <img height="25" width="25" src="/static/app/assets/images/mcqicon.png" alt="MCQ Questions">
                                </button>
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    title="Add Match Question" class="btn waves-effect float-left mr-4"
                                    onclick="addmatchquestion($(this))">
                                    <img height="25" width="25" src="/static/app/assets/images/matchicon.png"
                                        alt="Match Questions">
                                </button>
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    title="Add text Question" class="btn waves-effect float-left mr-4"
                                    onclick="addtextquestion($(this))">
                                    <img height="25" width="25" src="/static/app/assets/images/texticon.png" alt="Text Questions">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    $(param).parent().parent().find('div.sub-section-group').append(data);
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
}
function addproject(param) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="project">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Project</span><span class="sub-section-title-heading"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                Title</label>
                                    <input type="text" class="form-control sub-section-project-title-input-class" name="name"
                                        required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Description</label>
                                    <textarea class="form-control no-resize project-description-input"
                                        rows="4"></textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 project-fields ">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD
                                        QUESTION
                                        IMAGE</span>
                                    <input type="file" class="project-question-image">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 project-fields ">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD
                                        SOLUTION
                                        IMAGE</span>
                                    <input type="file" class="project-solution-image">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-12 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                    <label class="form-label">Link</label>
                                    <input type="text" class="form-control project-link-input" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                    <label class="form-label">Hint</label>
                                    <textarea class="form-control no-resize project-hint-input" rows="4"></textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-4 col-sm-4 col-md-3 col-lg-3 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                    <label>
                                        <input id="" type="checkbox" class="project-response-checkbox">
                                        <span>Collect
                                            Response</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 response-collector-container">
                            <div class="row">
                                <div class="col-8 col-sm-8 col-md-9 col-lg-9 project-fields ">
                                    <div class="form-group form-float">
                                        <div class="">
                                            <label class="form-label">
                                            Response
                                            Title</label>
                                            <input type="text"
                                                class="form-control project-response-title-input-class" name="name"
                                                required>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 project-fields ">
                                    <div class="form-group form-float">
                                        <div class="">
                                            <label class="form-label">
                                            Response
                                            Description</label>
                                            <textarea
                                                class="form-control no-resize project-response-description-input"
                                                rows="4"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    $(param).parent().parent().find('div.sub-section-group').append(data);
}
function addpuzzle(param) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="puzzle">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Puzzle</span><span class="sub-section-title-heading"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12  puzzle-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                Title</label>
                                    <input type="text" class="form-control sub-section-title-input-class" name="name"
                                        required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12  puzzle-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Description</label>
                                    <textarea class="form-control no-resize puzzle-description-input"
                                        rows="4"></textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6  puzzle-fields">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD
                                        QUESTION
                                        IMAGE</span>
                                    <input type="file" class="puzzle-question-image">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6  puzzle-fields">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD
                                        SOLUTION
                                        IMAGE</span>
                                    <input type="file" class="puzzle-solution-image">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-12  puzzle-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">Link</label>
                                    <input type="text" class="form-control puzzle-link-input" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12  puzzle-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">Hint</label>
                                    <textarea class="form-control no-resize puzzle-hint-input" rows="4"></textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-4 col-sm-4 col-md-3 col-lg-3  puzzle-fields">
                            <div class="form-group form-float">
                                <div class="">
                                    <label>
                                        <input id="" type="checkbox" class="puzzle-response-checkbox">
                                        <span>Collect
                                            Response</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 response-collector-container">
                            <div class="row">
                                <div class="col-8 col-sm-8 col-md-9 col-lg-9  puzzle-fields">
                                    <div class="form-group form-float">
                                        <div class="">
                                        <label class="form-label">
                                                Response
                                                Title</label>
                                            <input type="text"
                                                class="form-control puzzle-response-title-input-class" name="name"
                                                required>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12  puzzle-fields">
                                    <div class="form-group form-float">
                                        <div class="">
                                        <label class="form-label">
                                                Response
                                                Description</label>
                                            <textarea
                                                class="form-control no-resize puzzle-response-description-input"
                                                rows="4"></textarea>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    $(param).parent().parent().find('div.sub-section-group').append(data);
}
function addaudio(param) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="audio">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Audio File</span><span class="sub-section-title-heading"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12 audio-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Title</label>
                                    <input type="text" class="form-control audio-title-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 audio-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Description</label>
                                    <textarea class="form-control no-resize audio-description-input" rows="4"></textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 audio-fields">
                            <div class="form-group form-float">
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>UPLOAD
                                            AUDIO
                                            FILE</span>
                                        <input type="file" class="audio-file-input">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    $(param).parent().parent().find('div.sub-section-group').append(data);
}
function addyoutubevideo(param) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="youtube">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Youtube Video</span><span class="sub-section-title-heading"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12 youtube-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Title</label>
                                    <input type="text" class="form-control youtube-title-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 youtube-fields">
                            <div class="form-group form-float">
                                <div class="">
                                    <label class="form-label">Description</label>
                                    <textarea class="form-control no-resize youtube-description-input" rows="4"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 youtube-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Youtube Video Link</label>
                                    <input type="text" class="form-control youtube-link-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    $(param).parent().parent().find('div.sub-section-group').append(data);
}
function addcards(param) {
    var current_no_of_cards = $(param).siblings('div.section-row').find('.flash-card-title-input-class').length;
    var data = `
    <div class="col-sm-6 flash-card-fields">
        <div class="form-group form-float">
            <div class="">
            <label class="form-label">
                    Title `+ (current_no_of_cards + 1) + `</label>
                    <input type="text" class="form-control flash-card-title-input-class" name="name" required>
                
            </div>
        </div>
    </div>
    <div class="col-sm-6 flash-card-fields">
        <div class="file-field input-field">
            <div class="btn">
                <span>UPLOAD CARD IMAGE</span>
                <input type="file" class="flash-card-image">
            </div>
            <div class="file-path-wrapper">
                <input class="file-path validate" type="text">
            </div>
        </div>
    </div>
    <div class="col-12 flash-card-fields">
        <div class="form-group form-float">
            <div class="">
            <label class="form-label">
                    Card `+ (current_no_of_cards + 1) + `</label>
                <textarea class="form-control no-resize flash-card-description-input" rows="4"></textarea>
                
            </div>
        </div>
    </div>
    `;
    $(param).siblings('div.section-row').append(data);
}
function addsession(param) {
    var data = `
    <div class="panel-group session-details-container" id="accordion_s`+ section_counter + `" role="tablist" aria-multiselectable="true" data-sectiontype="session">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_s`+ section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_s`+ section_counter + `" href="#collapseOne_s` + section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_s`+ section_counter + `">
                    <a role="button" class="pull-left">
                        Session <span class="section-number-span"></span>
                        <span class="section-name-span"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_s`+ section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_s` + section_counter + `">
                <div class="panel-body">
                    <div class="row section-row mt-3 pl-3 pr-3">
                        <div class="col-md-6 session-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">Session
                                        No.</label>
                                    <input type="text" class="form-control session-number-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 session-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">Session
                                        Title</label>
                                    <input type="text" class="form-control session-name-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="sub-section-group">
                            </div>
                        </div>
                        <div class="clearfix mt-3">
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Project"
                                class="btn waves-effect float-left mr-4" onclick="addproject($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/projecticon.png">
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Puzzle"
                                class="btn waves-effect float-left mr-4" onclick="addpuzzle($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/puzzleicon.png">
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Audio"
                                class="btn waves-effect float-left mr-4" onclick="addaudio($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/audioicon.png">
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Youtube Video"
                                class="btn waves-effect float-left mr-4" onclick="addyoutubevideo($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/youtubeicon.png">
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Test"
                                class="btn waves-effect float-left mr-4" onclick="addtest($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/testicon.png">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    section_counter += 1;
    $(param).parent().siblings('div.section-group').append(data);
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" })
}
function addflashcards(param) {
    var data = `
    <div class="panel-group session-details-container" id="accordion_s`+ section_counter + `" role="tablist" aria-multiselectable="true" data-sectiontype="flashcard">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_s`+ section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_s`+ section_counter + `" href="#collapseOne_s` + section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_s`+ section_counter + `">
                    <a role="button" class="pull-left">
                        Flash Cards <span class="section-number-span"></span>
                        <span class="section-name-span"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_s`+ section_counter + `" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="headingOne_s` + section_counter + `">
                <div class="panel-body">
                    <div class="row section-row mt-3 pl-3 pr-3">
                        <div class="col-sm-6 flash-card-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Title 1</label>
                                        <input type="text" class="form-control flash-card-title-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 flash-card-fields">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD CARD IMAGE</span>
                                    <input type="file" class="flash-card-image">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="col-12 flash-card-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Card 1</label>
                                </div>
                                    <textarea class="form-control no-resize flash-card-description-input"
                                        rows="4"></textarea>
                                    
                            </div>
                        </div>
                    </div>
                    <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add More Cards"
                        class="btn waves-effect float-left mr-4" onclick="addcards($(this))">
                        <img height="25" width="25" src="/static/app/assets/images/addcardsicon.png">
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    section_counter += 1;
    $(param).parent().siblings('div.section-group').append(data);
}
function addpdfviewer(param) {
    var data = `
    <div class="panel-group session-details-container" id="accordion_s`+ section_counter + `" role="tablist" aria-multiselectable="true" data-sectiontype="pdfviewer">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_s`+ section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_s`+ section_counter + `" href="#collapseOne_s` + section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_s`+ section_counter + `">
                    <a role="button" class="pull-left">
                        Document <span class="section-number-span"></span>
                        <span class="section-name-span"></span>
                    </a>
                    <button class="btn tblActnBtn pull-right v-align-center mr-2" type="button"
                        onclick="deletesegment($(this))"><i class="material-icons v-align-center">delete</i></button>
                </h4>
            </div>
            <div id="collapseOne_s`+ section_counter + `" class="panel-collapse collapse show" role="tabpanel" aria-labelledby="headingOne_s` + section_counter + `">
                <div class="panel-body">
                    <div class="row section-row mt-3 pl-3 pr-3">
                        <div class="col-md-6 pdf-viewer-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">Section
                                        Title</label>
                                    <input type="text" class="form-control pdf-name-input-class" name="name" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 pdf-viewer-fields">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD PDF</span>
                                    <input type="file" class="pdf-file-input">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    section_counter += 1;
    $(param).parent().siblings('div.section-group').append(data);
}
function pre_load_project(project_object) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="project">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Project</span><span class="sub-section-title-heading">:&nbsp;`+ project_object['sub_section_title'] + `</span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                Title</label>
                                    <input type="text" class="form-control sub-section-project-title-input-class" name="name" value="`+ project_object['sub_section_title'] + `"
                                        required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Description</label>
                                    <textarea class="form-control no-resize project-description-input" value=""
                                        rows="10">`+ project_object['project_details']['description'] + `</textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 project-fields ">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD
                                        QUESTION
                                        IMAGE</span>
                                    <input type="file" class="project-question-image">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" `;
    if (project_object['project_details']['question_image'] != null) {
        data += `value="` + project_object['project_details']['question_image'] + `" `;
    }
    data += `>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 project-fields ">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD
                                        SOLUTION
                                        IMAGE</span>
                                    <input type="file" class="project-solution-image">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" `;
    if (project_object['project_details']['solution_image'] != null) {
        data += `value="` + project_object['project_details']['solution_image'] + `" `;
    }
    data += `>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                    <label class="form-label">Link</label>
                                    <input type="text" class="form-control project-link-input" name="name" value="`+ project_object['project_details']['link'] + `" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                    <label class="form-label">Hint</label>
                                    <textarea class="form-control no-resize project-hint-input" rows="4" value="`+ project_object['project_details']['hint'] + `"></textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-4 col-sm-4 col-md-3 col-lg-3 project-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                    <label>
                                        <input id="" type="checkbox" class="project-response-checkbox" `;
    if (project_object['project_details']['collect_response'] == true) {
        data += `checked `;
    }
    data += `>
                                        <span>Collect
                                            Response</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 response-collector-container">
                            <div class="row">
                                <div class="col-8 col-sm-8 col-md-9 col-lg-9 project-fields ">
                                    <div class="form-group form-float">
                                        <div class="">
                                            <label class="form-label">
                                            Response
                                            Title</label>
                                            <input type="text"
                                                class="form-control project-response-title-input-class" name="name" `;
    if (project_object['project_details']['response_details'] != null) {
        data += `value="` + project_object['project_details']['response_details']['title'] + `" `;
    }
    data += `
                                                required>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 project-fields ">
                                    <div class="form-group form-float">
                                        <div class="">
                                            <label class="form-label">
                                            Response
                                            Description</label>
                                            <textarea
                                                class="form-control no-resize project-response-description-input"
                                                rows="4"`;
    if (project_object['project_details']['response_details'] != null) {
        data += `value="` + project_object['project_details']['response_details']['description'] + `" `;
    }
    data += `></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    return data;
}
function pre_load_puzzle(puzzle_object) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="puzzle">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Puzzle</span><span class="sub-section-title-heading">:&nbsp;`+ puzzle_object['sub_section_title'] + `</span>
                    </a>
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12 puzzle-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                Title</label>
                                    <input type="text" class="form-control sub-section-puzzle-title-input-class" name="name" value="`+ puzzle_object['sub_section_title'] + `"
                                        required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 puzzle-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Description</label>
                                    <textarea class="form-control no-resize puzzle-description-input" value=""
                                        rows="10">`+ puzzle_object['puzzle_details']['description'] + `</textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 puzzle-fields ">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD
                                        QUESTION
                                        IMAGE</span>
                                    <input type="file" class="puzzle-question-image">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" `;
    if (puzzle_object['puzzle_details']['question_image'] != null) {
        data += `value="` + puzzle_object['puzzle_details']['question_image'] + `" `;
    }
    data += `>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 puzzle-fields ">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD
                                        SOLUTION
                                        IMAGE</span>
                                    <input type="file" class="puzzle-solution-image">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" `;
    if (puzzle_object['puzzle_details']['solution_image'] != null) {
        data += `value="` + puzzle_object['puzzle_details']['solution_image'] + `" `;
    }
    data += `>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 puzzle-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                    <label class="form-label">Link</label>
                                    <input type="text" class="form-control puzzle-link-input" name="name" value="`+ puzzle_object['puzzle_details']['link'] + `" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 puzzle-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                    <label class="form-label">Hint</label>
                                    <textarea class="form-control no-resize puzzle-hint-input" rows="4" value="`+ puzzle_object['puzzle_details']['hint'] + `"></textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-4 col-sm-4 col-md-3 col-lg-3 puzzle-fields ">
                            <div class="form-group form-float">
                                <div class="">
                                    <label>
                                        <input id="" type="checkbox" class="puzzle-response-checkbox" `;
    if (puzzle_object['puzzle_details']['collect_response'] == true) {
        data += `checked `;
    }
    data += `>
                                        <span>Collect
                                            Response</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 response-collector-container">
                            <div class="row">
                                <div class="col-8 col-sm-8 col-md-9 col-lg-9 puzzle-fields ">
                                    <div class="form-group form-float">
                                        <div class="">
                                            <label class="form-label">
                                            Response
                                            Title</label>
                                            <input type="text"
                                                class="form-control puzzle-response-title-input-class" name="name" `;
    if (puzzle_object['puzzle_details']['response_details'] != null) {
        data += `value="` + puzzle_object['puzzle_details']['response_details']['title'] + `" `;
    }
    data += `
                                                required>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 puzzle-fields ">
                                    <div class="form-group form-float">
                                        <div class="">
                                            <label class="form-label">
                                            Response
                                            Description</label>
                                            <textarea
                                                class="form-control no-resize puzzle-response-description-input"
                                                rows="4"`;
    if (puzzle_object['puzzle_details']['response_details'] != null) {
        data += `value="` + puzzle_object['puzzle_details']['response_details']['description'] + `" `;
    }
    data += `></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    return data;
}
function pre_load_audio(audio_object) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="audio">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Audio File</span><span class="sub-section-title-heading">:&nbsp;`+ audio_object['sub_section_title'] + `</span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12 audio-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Title</label>
                                    <input type="text" class="form-control audio-title-input-class" name="name" value="`+ audio_object['sub_section_title'] + `" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 audio-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Description</label>
                                    <textarea class="form-control no-resize audio-description-input" rows="4">`+ audio_object['audio_details']['description'] + `</textarea>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 audio-fields">
                            <div class="form-group form-float">
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>UPLOAD
                                            AUDIO
                                            FILE</span>
                                        <input type="file" class="audio-file-input">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text" `;
    if (audio_object['audio_details']['path'] != null) {
        data += `value="` + audio_object['audio_details']['path'] + `" `
    }
    data += `>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    return data;
}
function pre_load_video(video_object) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="youtube">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Youtube Video</span><span class="sub-section-title-heading">:&nbsp;`+ video_object['sub_section_title'] + `</span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12 youtube-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Title</label>
                                    <input type="text" class="form-control youtube-title-input-class" name="name" value="`+ video_object['sub_section_title'] + `" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 youtube-fields">
                            <div class="form-group form-float">
                                <div class="">
                                    <label class="form-label">Description</label>
                                    <textarea class="form-control no-resize youtube-description-input" rows="4">`+ video_object['youtube_details']['description'] + `</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 youtube-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Youtube Video Link</label>
                                    <input type="text" class="form-control youtube-link-input-class" name="name" value="`+ video_object['youtube_details']['link'] + `" required>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    return data;
}
function pre_load_mcq(mcq_object) {
    var data = `
    <div class="panel-group question-details-container" id="accordion_q`+ question_counter + `" role="tablist" aria-multiselectable="true" data-questiontype="mcq">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_q`+ question_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_q`+ question_counter + `" href="#collapseOne_q` + question_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_q`+ question_counter + `">
                    <a role="button" class="pull-left">
                        <span class="question-type-heading">MCQ</span><span class="question-title-heading">`+ mcq_object['question_title'] + `</span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_q`+ question_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_q` + question_counter + `"
                data-parent="#accordion_q`+ question_counter + `">
                <div class="panel-body">
                    <div class="row question-row">
                        <div class="col-10 question-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Question</label>
                                    <input type="text" class="form-control question-title-input-class" name="name" value="`+ mcq_object['question_title'] + `" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Marks</label>
                                    <input type="number" min="0" value="`+ mcq_object['marks'] + `"class="form-control question-marks-input-class" name="name" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 options-column">
                            <div class="row options-row">`;
    option_number_counter = 1;
    for (options in mcq_object['details']['options']) {
        data += `
        <div class="col-md-4 col-sm-8 col-8 question-fields">
        <div class="form-group form-float">
            <div class="">
            <label class="form-label">
                    Option
                    `+ option_number_counter + `</label>
                <input type="text" class="form-control option-title-input-class" name="name" value="`+ mcq_object['details']['options'][options] + `"
                    required>
                
            </div>
        </div>
    </div>
    <div class="col-md-2 col-sm-4 col-4 question-fields">
        <div class="form-check form-check-radio">
            <label>
                <input name="option_q`+ question_counter + `" type="radio" `;
        if (mcq_object['details']['options'][options] == mcq_object['details']['answer']) {
            data += `checked`;
        }
        data += ` >
                <span>Correct
                    Answer</span>
            </label>
        </div>
    </div>
        `;
        option_number_counter += 1;
    }
    data += `               </div>
                        </div>
                        <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Option"
                            class="btn waves-effect float-left ml-3" onclick="addmoreoptions($(this), `+ question_counter + `)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    question_counter += 1;
    return data;
}
function pre_load_match(match_object) {
    var data = `
    <div class="panel-group question-details-container" id="accordion_q`+ question_counter + `" role="tablist" aria-multiselectable="true" data-questiontype="match">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_q`+ question_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_q`+ question_counter + `" href="#collapseOne_q` + question_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_q`+ question_counter + `">
                    <a role="button" class="pull-left">
                        <span class="question-type-heading">Match</span><span class="question-title-heading">:&nbsp;`+ match_object['question_title'] + `</span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_q`+ question_counter + `" class="panel-collapse in" role="tabpanel" aria-labelledby="headingOne_q` + question_counter + `"
                data-parent="#accordion_q`+ question_counter + `">
                <div class="panel-body">
                    <div class="row question-row">
                        <div class="col-10 question-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                Question</label>
                                    <input type="text" class="form-control question-title-input-class" name="name" value="`+ match_object['question_title'] + `" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Marks</label>
                                    <input type="number" min="0" class="form-control question-marks-input-class" name="name" value="`+ match_object['marks'] + `" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 choices-column">
                            <div class="row mt-2">`;
    for (match_pair in match_object['details']) {
        data += `
        <div class="col-sm-6 question-fields">
            <div class="form-group form-float">
                <div class="">
                <label class="form-label">
                        Choice</label>
                    <input type="text" class="form-control question-option-input-class" value="`+ match_object['details'][match_pair]['option'] + `" required>
                    
                </div>
            </div>
        </div>
        <div class="col-sm-6 question-fields">
            <div class="form-group form-float">
                <div class="">
                <label class="form-label">
                        Match</label>
                    <input type="text" class="form-control match-option-input-class" value="`+ match_object['details'][match_pair]['choice'] + `" required>
                </div>
            </div>
        </div>
        `;
    }

    data += `</div>
                        </div>
                        <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Choice and match"
                            class="btn waves-effect float-left ml-3" onclick="addmorematchchoice($(this))">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    question_counter += 1;
    return data;
}
function pre_load_text(text_object) {
    var data = `
    <div class="panel-group question-details-container" id="accordion_q`+ question_counter + `" role="tablist" aria-multiselectable="true" data-questiontype="text">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_q`+ question_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_q`+ question_counter + `" href="#collapseOne_q` + question_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_q`+ question_counter + `">
                    <a role="button" class="pull-left">
                        <span class="question-type-heading">Text based</span><span class="question-title-heading">:&nbsp;`+ text_object['question_title'] + `</span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_q`+ question_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_q` + question_counter + `"
                data-parent="#accordion_q`+ question_counter + `">
                <div class="panel-body">
                    <div class="row question-row">
                        <div class="col-10">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Question</label>
                                    <input type="text" class="form-control question-title-input-class" name="name" value="`+ text_object['question_title'] + `" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-2">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Marks</label>
                                    <input type="number" min="0" class="form-control question-marks-input-class" name="name" value="`+ text_object['marks'] + `" required>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    question_counter += 1;
    return data;
}
function pre_load_test(test_object) {
    var data = `
    <div class="panel-group sub-section-details-container" id="accordion_ss`+ sub_section_counter + `" role="tablist" aria-multiselectable="true" data-subsectiontype="test">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_ss`+ sub_section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_ss`+ sub_section_counter + `" href="#collapseOne_ss` + sub_section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_ss`+ sub_section_counter + `">
                    <a role="button" class="pull-left">
                        <span class="sub-section-type-heading">Test</span><span class="sub-section-title-heading">:&nbsp;`+ test_object['sub_section_title'] + `</span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_ss`+ sub_section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_ss` + sub_section_counter + `"
                data-parent="#accordion_ss`+ sub_section_counter + `">
                <div class="panel-body">
                    <div class="row sub-section-row">
                        <div class="col-12 test-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Title</label>
                                    <input type="text" class="form-control test-title-input-class" name="name" value="`+ test_object['sub_section_title'] + `" required>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12 test-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">
                                        Description</label>
                                    <textarea class="form-control no-resize test-description-input" rows="4">`+ test_object['test_details']['description'] + `</textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="questions-group">`;
    for (each_question in test_object['test_details']['questions']) {
        if (test_object['test_details']['questions'][each_question]['question_type'] == "mcq") {
            data += pre_load_mcq(test_object['test_details']['questions'][each_question]);
        }
        else if (test_object['test_details']['questions'][each_question]['question_type'] == "match") {
            data += pre_load_match(test_object['test_details']['questions'][each_question]);
        }
        else if (test_object['test_details']['questions'][each_question]['question_type'] == "text") {
            data += pre_load_text(test_object['test_details']['questions'][each_question]);
        }
    }
    data += `
                            </div>
                            <div class="clearfix mt-3">
                                <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add MCQ Question"
                                    class="btn waves-effect float-left mr-4" onclick="addmcqquestion($(this))">
                                    <img height="25" width="25" src="/static/app/assets/images/mcqicon.png" alt="MCQ Questions">
                                </button>
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    title="Add Match Question" class="btn waves-effect float-left mr-4"
                                    onclick="addmatchquestion($(this))">
                                    <img height="25" width="25" src="/static/app/assets/images/matchicon.png"
                                        alt="Match Questions">
                                </button>
                                <button type="button" data-toggle="tooltip" data-placement="bottom"
                                    title="Add text Question" class="btn waves-effect float-left mr-4"
                                    onclick="addtextquestion($(this))">
                                    <img height="25" width="25" src="/static/app/assets/images/texticon.png" alt="Text Questions">
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    sub_section_counter += 1;
    return data;
}
function pre_load_session(data_object) {
    console.log(data_object);
    var data = `
    <div class="panel-group session-details-container" id="accordion_s`+ section_counter + `" role="tablist" aria-multiselectable="true" data-sectiontype="session">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_s`+ section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_s`+ section_counter + `" href="#collapseOne_s` + section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_s`+ section_counter + `">
                    <a role="button" class="pull-left">
                        Session <span class="section-number-span">`+ data_object['session_number'] + `</span>
                        <span class="section-name-span">`+ data_object['session_title'] + `</span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_s`+ section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_s` + section_counter + `">
                <div class="panel-body">
                    <div class="row section-row mt-3 pl-3 pr-3">
                        <div class="col-md-6 session-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">Session
                                        No.</label>
                                    <input type="text" class="form-control session-number-input-class" name="name" required value="`+ data_object['session_number'] + `">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 session-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">Session
                                        Title</label>
                                    <input type="text" class="form-control session-name-input-class" name="name" required value="`+ data_object['session_title'] + `">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="sub-section-group">`;

    for (each_sub_section in data_object['sub_section_details']) {
        if (data_object['sub_section_details'][each_sub_section]['sub_section_type'] == "project") {
            data += pre_load_project(data_object['sub_section_details'][each_sub_section]);
        }
        else if (data_object['sub_section_details'][each_sub_section]['sub_section_type'] == "puzzle") {
            data += pre_load_puzzle(data_object['sub_section_details'][each_sub_section]);
        }
        else if (data_object['sub_section_details'][each_sub_section]['sub_section_type'] == "audio") {
            data += pre_load_audio(data_object['sub_section_details'][each_sub_section]);
        }
        else if (data_object['sub_section_details'][each_sub_section]['sub_section_type'] == "youtube") {
            data += pre_load_video(data_object['sub_section_details'][each_sub_section]);
        }
        else if (data_object['sub_section_details'][each_sub_section]['sub_section_type'] == "test") {
            data += pre_load_test(data_object['sub_section_details'][each_sub_section]);
        }
    }
    data += `
                            </div>
                        </div>
                        <div class="clearfix mt-3">
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Project"
                                class="btn waves-effect float-left mr-4" onclick="addproject($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/projecticon.png">
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Puzzle"
                                class="btn waves-effect float-left mr-4" onclick="addpuzzle($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/puzzleicon.png">
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Audio"
                                class="btn waves-effect float-left mr-4" onclick="addaudio($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/audioicon.png">
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Youtube Video"
                                class="btn waves-effect float-left mr-4" onclick="addyoutubevideo($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/youtubeicon.png">
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add Test"
                                class="btn waves-effect float-left mr-4" onclick="addtest($(this))">
                                <img height="25" width="25" src="/static/app/assets/images/testicon.png">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    section_counter += 1;
    return data;
}
function pre_load_flashcards(data_object) {
    var data = `
    <div class="panel-group session-details-container" id="accordion_s`+ section_counter + `" role="tablist" aria-multiselectable="true" data-sectiontype="flashcard">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_s`+ section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_s`+ section_counter + `" href="#collapseOne_s` + section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_s`+ section_counter + `">
                    <a role="button" class="pull-left">
                        Flash Cards <span class="section-number-span"></span>
                        <span class="section-name-span"></span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_s`+ section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_s` + section_counter + `">
                <div class="panel-body">
                    <div class="row section-row mt-3 pl-3 pr-3">`;
    flashcards_counter = 1;
    for (each_flash_card in data_object) {
        data += `
        <div class="col-sm-6 flash-card-fields">
            <div class="form-group form-float">
                <div class="">
                <label class="form-label">
                        Title `+ flashcards_counter + `</label>
                        <input type="text" class="form-control flash-card-title-input-class" name="name" value="`+ data_object[each_flash_card]['card_title'] + `" required>
                    
                </div>
            </div>
        </div>
        <div class="col-sm-6 flash-card-fields">
            <div class="file-field input-field">
                <div class="btn">
                    <span>UPLOAD CARD IMAGE</span>
                    <input type="file" class="flash-card-image">
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text" `;
        if (data_object[each_flash_card]['card_image'] != null) {
            data += `value="` + data_object[each_flash_card]['card_image'] + `"`;
        }
        data += ` >
                </div>
            </div>
        </div>
        <div class="col-12 flash-card-fields">
            <div class="form-group form-float">
                <div class="">
                <label class="form-label">
                        Card `+ flashcards_counter + `</label>
                </div>
                    <textarea class="form-control no-resize flash-card-description-input"
                        rows="4">`+ data_object[each_flash_card]['card_content'] + `</textarea>
                    
            </div>
        </div>
        `;
    }

    data += `</div>
                    <button type="button" data-toggle="tooltip" data-placement="bottom" title="Add More Cards"
                        class="btn waves-effect float-left mr-4" onclick="addcards($(this))">
                        <img height="25" width="25" src="/static/app/assets/images/addcardsicon.png">
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    section_counter += 1;
    return data;
}
function pre_load_pdfviewer(data_object) {
    var data = `
    <div class="panel-group session-details-container" id="accordion_s`+ section_counter + `" role="tablist" aria-multiselectable="true" data-sectiontype="pdfviewer">
        <div class="panel panel-primary">
            <div class="panel-heading" role="tab" id="headingOne_s`+ section_counter + `">
                <h4 class="panel-title clearfix" data-toggle="collapse" data-parent="#accordion_s`+ section_counter + `" href="#collapseOne_s` + section_counter + `"
                    aria-expanded="true" aria-controls="collapseOne_s`+ section_counter + `">
                    <a role="button" class="pull-left">
                        Document <span class="section-number-span"></span>
                        <span class="section-name-span">`+ data_object['section_title'] + `</span>
                    </a>
                    
                </h4>
            </div>
            <div id="collapseOne_s`+ section_counter + `" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne_s` + section_counter + `">
                <div class="panel-body">
                    <div class="row section-row mt-3 pl-3 pr-3">
                        <div class="col-md-6 pdf-viewer-fields">
                            <div class="form-group form-float">
                                <div class="">
                                <label class="form-label">Section
                                        Title</label>
                                    <input type="text" class="form-control pdf-name-input-class" name="name" value="`+ data_object['section_title'] + `" required>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 pdf-viewer-fields">
                            <div class="file-field input-field">
                                <div class="btn">
                                    <span>UPLOAD PDF</span>
                                    <input type="file" class="pdf-file-input">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" `;
    if (data_object['pdf_path'] != null) {
        data += `value="` + data_object['pdf_path'] + `"`;
    }
    data += `>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    section_counter += 1;
    return data;
}
function process_data(data) {
    data = JSON.parse(data['data']);
    $('.course-name-input').val(data['course_name']);
    $('.course-description-input').val(data['course_description']);
    $('.course-image-input-dummy').val(data['course_image']);
    final_section_data = ``;
    for (each_section_id in data['course_details']['section_details']) {
        if (data['course_details']['section_details'][each_section_id]['section_type'] == "session") {
            final_section_data += pre_load_session(data['course_details']['section_details'][each_section_id]['session_details']);
        }
        else if (data['course_details']['section_details'][each_section_id]['section_type'] == "flashcard") {
            final_section_data += pre_load_flashcards(data['course_details']['section_details'][each_section_id]['flash_card_details']);
        }
        else if (data['course_details']['section_details'][each_section_id]['section_type'] == "pdfviewer") {
            final_section_data += pre_load_flashcards(data['course_details']['section_details'][each_section_id]);
        }
        $('.section-group').html(final_section_data);
    }
}

function updatecourse() {
    swal(
        {
            title: "Submit?",
            text: "Are you sure you want to submit?",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        },
        function () {
            files_counter = 1;
            form_data = new FormData();
            var complete_data = {};
            complete_data['course_name'] = $('.course-name-input').val();
            complete_data['course_description'] = $('.course-description-input').val();
            if ($('.course-image-input').val() == "") {
                if($('.course-image-input').parent().siblings('.file-path-wrapper').find('input').val() == ""){
                    complete_data['course_image'] = null;
                }
                else{
                    complete_data['course_image'] = "OLD_FILE_" + $('.course-image-input').parent().siblings('.file-path-wrapper').find('input').val();
                }
                
            }
            else {
                complete_data['course_image'] = "file_" + files_counter;
                form_data.append("file_" + files_counter, $('.course-image-input')[0].files[0]);
                files_counter += 1;
            }
            complete_data['course_details'] = {};
            complete_data['course_details']['number_of_sections'] = $('.section-group .session-details-container').length;
            complete_data['course_details']['section_details'] = {};
            for (i = 0; i < complete_data['course_details']['number_of_sections']; i++) {
                section = $('.section-group .session-details-container').eq(i);
                section_type = $(section).data('sectiontype');
                temporary_section_data = {};
                if (section_type == "session") {
                    temporary_section_data['section_type'] = section_type;
                    temporary_section_data['session_details'] = {};
                    temporary_section_data['session_details']['session_title'] = $('.session-name-input-class', section).val();
                    temporary_section_data['session_details']['session_number'] = $('.session-number-input-class', section).val();
                    temporary_section_data['session_details']['no_of_subsections'] = $('.sub-section-group .sub-section-details-container', section).length;
                    temporary_section_data['session_details']['sub_section_details'] = {};
                    for (j = 0; j < temporary_section_data['session_details']['no_of_subsections']; j++) {
                        sub_section = $('.sub-section-group .sub-section-details-container', section).eq(j);
                        sub_section_type = $(sub_section).data('subsectiontype');
                        temporary_sub_section_data = {};
                        temporary_sub_section_data['sub_section_type'] = sub_section_type;
                        if (sub_section_type == "project") {
                            temporary_sub_section_data['sub_section_title'] = $('.sub-section-project-title-input-class', sub_section).val();
                            temporary_sub_section_data['project_details'] = {};
                            temporary_sub_section_data['project_details']['description'] = $('.project-description-input', sub_section).val();
                            if ($('.project-question-image', sub_section).val() == "") {
                                if($('.project-question-image', sub_section).parent().siblings('.file-path-wrapper').find('input').val() == ""){
                                    temporary_sub_section_data['project_details']['question_image'] = null;
                                }
                                else{
                                    temporary_sub_section_data['project_details']['question_image'] = "OLD_FILE_" + $('.project-question-image', sub_section).parent().siblings('.file-path-wrapper').find('input').val();
                                }
                                
                            }
                            else {
                                temporary_sub_section_data['project_details']['question_image'] = 'file_' + files_counter;
                                form_data.append('file_' + files_counter, $('.project-question-image', sub_section)[0].files[0]);
                                files_counter += 1;
                            }

                            if ($('.project-solution-image', sub_section).val() == "") {
                                if($('.project-solution-image', sub_section).parent().siblings('.file-path-wrapper').find('input').val() == ""){
                                    temporary_sub_section_data['project_details']['solution_image'] = null;
                                }
                                else{
                                    temporary_sub_section_data['project_details']['solution_image'] = "OLD_FILE_" + $('.project-solution-image', sub_section).parent().siblings('.file-path-wrapper').find('input').val();
                                }
                            }
                            else {
                                temporary_sub_section_data['project_details']['solution_image'] = 'file_' + files_counter;
                                form_data.append('file_' + files_counter, $('.project-solution-image', sub_section)[0].files[0]);
                                files_counter += 1;
                            }
                            temporary_sub_section_data['project_details']['link'] = $('.project-link-input', sub_section).val();
                            temporary_sub_section_data['project_details']['hint'] = $('.project-hint-input', sub_section).val();
                            if ($('.project-response-checkbox', sub_section).is(':checked')) {
                                temporary_sub_section_data['project_details']['collect_response'] = true;
                                temporary_sub_section_data['project_details']['response_details'] = {};
                                temporary_sub_section_data['project_details']['response_details']['title'] = $('.project-response-title-input-class', sub_section).val();
                                temporary_sub_section_data['project_details']['response_details']['description'] = $('.project-response-description-input', sub_section).val();
                            }
                            else {
                                temporary_sub_section_data['project_details']['collect_response'] = false;
                                temporary_sub_section_data['project_details']['response_details'] = null;
                            }
                        }
                        else if (sub_section_type == "puzzle") {
                            temporary_sub_section_data['sub_section_title'] = $('.sub-section-puzzle-title-input-class', sub_section).val();
                            temporary_sub_section_data['puzzle_details'] = {};
                            temporary_sub_section_data['puzzle_details']['description'] = $('.puzzle-description-input', sub_section).val();
                            if ($('.puzzle-question-image', sub_section).val() == "") {
                                if($('.puzzle-question-image', sub_section).parent().siblings('.file-path-wrapper').find('input').val() == ""){
                                    temporary_sub_section_data['puzzle_details']['question_image'] = null;
                                }
                                else{
                                    temporary_sub_section_data['puzzle_details']['question_image'] = "OLD_FILE_" + $('.puzzle-question-image', sub_section).parent().siblings('.file-path-wrapper').find('input').val();
                                }
                            }
                            else {
                                temporary_sub_section_data['puzzle_details']['question_image'] = 'file_' + files_counter;
                                form_data.append('file_' + files_counter, $('.puzzle-question-image', sub_section)[0].files[0]);
                                files_counter += 1;
                            }

                            if ($('.puzzle-solution-image', sub_section).val() == "") {
                                if($('.puzzle-solution-image', sub_section).parent().siblings('.file-path-wrapper').find('input').val() == ""){
                                    temporary_sub_section_data['puzzle_details']['solution_image'] = null;
                                }
                                else{
                                    temporary_sub_section_data['puzzle_details']['solution_image'] = "OLD_FILE_" + $('.puzzle-solution-image', sub_section).parent().siblings('.file-path-wrapper').find('input').val();
                                }
                            }
                            else {
                                temporary_sub_section_data['puzzle_details']['solution_image'] = 'file_' + files_counter;
                                form_data.append('file_' + files_counter, $('.puzzle-solution-image', sub_section)[0].files[0]);
                                files_counter += 1;
                            }
                            temporary_sub_section_data['puzzle_details']['link'] = $('.puzzle-link-input', sub_section).val();
                            temporary_sub_section_data['puzzle_details']['hint'] = $('.puzzle-hint-input', sub_section).val();
                            if ($('.puzzle-response-checkbox', sub_section).is(':checked')) {
                                temporary_sub_section_data['puzzle_details']['collect_response'] = true;
                                temporary_sub_section_data['puzzle_details']['response_details'] = {};
                                temporary_sub_section_data['puzzle_details']['response_details']['title'] = $('.puzzle-response-title-input-class', sub_section).val();
                                temporary_sub_section_data['puzzle_details']['response_details']['description'] = $('.puzzle-response-description-input', sub_section).val();
                            }
                            else {
                                temporary_sub_section_data['puzzle_details']['collect_response'] = false;
                                temporary_sub_section_data['puzzle_details']['response_details'] = null;
                            }
                        }
                        else if (sub_section_type == 'audio') {
                            temporary_sub_section_data['sub_section_title'] = $('.audio-title-input-class', sub_section).val();
                            temporary_sub_section_data['audio_details'] = {};
                            temporary_sub_section_data['audio_details']['description'] = $('.audio-description-input', sub_section).val();
                            if ($('.audio-file-input', sub_section).val() == "") {
                                if($('.audio-file-input', sub_section).parent().siblings('.file-path-wrapper').find('input').val() == ""){
                                    temporary_sub_section_data['audio_details']['path'] = null;
                                }
                                else{
                                    temporary_sub_section_data['audio_details']['path'] = "OLD_FILE_" + $('.audio-file-input', sub_section).parent().siblings('.file-path-wrapper').find('input').val();
                                }
                            }
                            else {
                                temporary_sub_section_data['audio_details']['path'] = "file_" + files_counter;
                                form_data.append('file_' + files_counter, $('.audio-file-input', sub_section)[0].files[0]);
                                files_counter += 1;
                            }
                        }
                        else if (sub_section_type == "youtube") {
                            temporary_sub_section_data['sub_section_title'] = $('.youtube-title-input-class', sub_section).val();
                            temporary_sub_section_data['youtube_details'] = {};
                            temporary_sub_section_data['youtube_details']['description'] = $('.youtube-description-input', sub_section).val();
                            temporary_sub_section_data['youtube_details']['link'] = $('.youtube-link-input-class', sub_section).val();
                        }
                        else if (sub_section_type == "test") {
                            temporary_sub_section_data['sub_section_title'] = $('.test-title-input-class', sub_section).val();
                            temporary_sub_section_data['test_details'] = {};
                            temporary_sub_section_data['test_details']['description'] = $('.test-description-input', sub_section).val();
                            temporary_sub_section_data['test_details']['no_of_questions'] = $('.questions-group .question-details-container', sub_section).length;
                            total_marks = 0;
                            temporary_sub_section_data['test_details']['questions'] = {};
                            for (k = 0; k < temporary_sub_section_data['test_details']['no_of_questions']; k++) {
                                question_section = $('.questions-group .question-details-container', sub_section).eq(k);
                                question_type = $(question_section).data('questiontype');
                                temporary_question_data = {};
                                temporary_question_data['question_title'] = $('.question-title-input-class', question_section).val();
                                temporary_question_data['marks'] = $('.question-marks-input-class', question_section).val();
                                total_marks += temporary_question_data['marks'];
                                temporary_question_data['question_type'] = question_type;
                                if (question_type == "mcq") {
                                    temporary_question_data['evaluated'] = true;
                                    temporary_question_data['details'] = {};
                                    correct_answer = null;
                                    options = [];
                                    no_of_options = $('.options-row .option-title-input-class', question_section).length;
                                    for (l = 0; l < no_of_options; l++) {
                                        option = $('.options-row .option-title-input-class', question_section).eq(l);
                                        options.push($(option).val());
                                        if ($('.options-row input', question_section).eq(l).is(':checked')) {
                                            correct_answer = $(option).val();
                                        }
                                    }
                                    temporary_question_data['details']['options'] = options;
                                    temporary_question_data['details']['answer'] = correct_answer;
                                }
                                else if (question_type == "match") {
                                    temporary_question_data['evaluated'] = true;
                                    details_list = [];
                                    no_of_choices = $('.choices-column .question-option-input-class', question_section).length;
                                    for (l = 0; l < no_of_choices; l++) {
                                        temporary_choice_match = {};
                                        temporary_choice_match['option'] = $('.choices-column .question-option-input-class', question_section).eq(l).val();
                                        temporary_choice_match['choice'] = $('.choices-column .match-option-input-class', question_section).eq(l).val();
                                        details_list.push(temporary_choice_match);
                                    }
                                    temporary_question_data['details'] = details_list;
                                }
                                else if (question_type == "text") {
                                    temporary_question_data['evaluated'] = false;
                                }
                                temporary_question_data['question_id'] = (k + 1);
                                temporary_sub_section_data['test_details']['questions'][k + 1] = temporary_question_data;
                            }
                            temporary_sub_section_data['test_details']['max_marks'] = total_marks;
                        }
                        temporary_sub_section_data['sub_section_id'] = (j + 1);
                        temporary_section_data['session_details']['sub_section_details'][j + 1] = temporary_sub_section_data;
                    }
                }
                else if (section_type == "flashcard") {
                    temporary_section_data['section_type'] = section_type;
                    temporary_section_data['flash_card_details'] = {};
                    no_of_cards = $('.section-row .flash-card-title-input-class', section).length;
                    for (j = 0; j < no_of_cards; j++) {
                        temporary_flash_card = {};
                        temporary_flash_card['card_title'] = $('.section-row .flash-card-title-input-class', section).eq(j).val();
                        temporary_flash_card['card_content'] = $('.section-row .flash-card-description-input', section).eq(j).val();
                        if ($('.section-row .flash-card-image', section).eq(j).val() == "") {
                            if($('.section-row .flash-card-image', section).eq(j).parent().siblings('.file-path-wrapper').find('input').val() == ""){
                                temporary_flash_card['card_image'] = null;
                            }
                            else{
                                temporary_flash_card['card_image'] = "OLD_FILE_" + $('.section-row .flash-card-image', section).eq(j).parent().siblings('.file-path-wrapper').find('input').val();
                            }
                        }
                        else {
                            temporary_flash_card['card_image'] = "file_" + files_counter;
                            form_data.append('file_' + files_counter, $('.section-row .flash-card-image', section).eq(j)[0].files[0]);
                            files_counter += 1;
                        }
                        temporary_flash_card['card_id'] = (j + 1);
                        temporary_section_data['flash_card_details'][j + 1] = temporary_flash_card;
                    }
                }
                else if (section_type == "pdfviewer") {
                    temporary_section_data['section_type'] = section_type;
                    temporary_section_data['section_title'] = $('.pdf-name-input-class', section).val();
                    if ($('.pdf-file-input', section).val() == "") {
                        if($('.pdf-file-input', section).parent().siblings('.file-path-wrapper').find('input').val() == ""){
                            temporary_section_data['pdf_path'] = null;
                        }
                        else{
                            temporary_section_data['pdf_path'] = "OLD_FILE_" + $('.pdf-file-input', section).parent().siblings('.file-path-wrapper').find('input').val();
                        }
                    }
                    else {
                        temporary_section_data['pdf_path'] = "file_" + files_counter;
                        form_data.append('file_' + files_counter, $('.pdf-file-input', section)[0].files[0]);
                        files_counter += 1;
                    }
                }
                temporary_section_data['section_id'] = (i + 1);
                complete_data['course_details']['section_details'][i + 1] = temporary_section_data;
            }
            form_data.append('course_data', JSON.stringify(complete_data));
            form_data.append("course_data_id", localStorage.getItem('edit_course_admin_course_id'));
            console.log(complete_data);
            for (var pair of form_data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }
            $.ajax({
                type: 'POST',
                url: 'updatecourse',
                data: form_data,
                contentType: false,
                cache: false,
                processData: false,
                success: function (data) {
                    console.log(data);
                    if (data['status_code'] == 200) {
                        swal({
                            title: "Done",
                            test: "Added course successfully",
                            type: 'success'
                        },
                        function(){
                            window.location.reload();
                        });
                    }
                },
            });
        }
    );
    // $('.page-loader-wrapper').css('display', 'block');

}
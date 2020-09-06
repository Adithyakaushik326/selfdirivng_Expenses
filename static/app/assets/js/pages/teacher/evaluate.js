
        $(document).ready(function () {
            if (localStorage.getItem('teacher_course_id') == null) {
                window.location.href = 'teacher';
            }
            else {
                console.log('alert');
                var d = { 'course_id': localStorage.getItem('teacher_course_id') };
                $.ajax({
                    type: "POST",
                    url: "evaluate_dbop",
                    dataType: 'Json',
                    contentType: 'application/json',
                    data: JSON.stringify(d),
                    processData: false,
                    success: function (obj) {
                        var question = ``;
                        console.log(obj)
                        for (i = 0; i < Object.keys(obj['data']).length; i++) {
                            console.log(i + 'workinf')
                            for (j = 0; j < obj['data'][i][0].length; j++) {
                                question += `<div class='question_group'>
                                <div class="row question-row">`+obj['data'][i][0][j]['answer_details']['question']+`</div>
                                    <div class="row answer-row">`+obj['data'][i][0][j]['answer_details']['answer']+`</div>
                                    <div class="row assign-marks">
                                        <div class="col-3">
                                            <div>
                                                <label>Assign Marks out of `+obj['data'][i][0][j]['answer_details']['max_marks']+`</label>
                                                <input type="number" id ="marks" class="roundInput" value = 0>

                                            </div>
                                        </div>
                                        <div class="col-3 button-column">
                                            <button type="button" class="btn btn-success waves-effect assign-btn"
                                            onclick="updatemarks($(this),'`+obj['data'][i][1]+`','`+obj['data'][i][0][j]['session_id']+`','`+obj['data'][i][0][j]['sub_section_id']+`','`+obj['data'][i][0][j]['question_id']+`','`+obj['data'][i][0][j]['answer_details']['max_marks']+`')">
                                                ASSIGN
                                            </button>
                                        </div>
                                    </div>
                                    </div>`;
                            }
                        }
                        $('#evaluate_container').html(question);
                    }
                });
            }
        });
        function updatemarks(param,student_id,session_id,sub_section,question_id,max_marks)
        {
            console.log('der');
            var marks = $(param).parent().siblings('.col-3').find('#marks').val();
            if(parseInt(marks)>parseInt(max_marks))
            {
                alert('alloted marks greater then max marks')

            }
            else{
                console.log(marks); 
                var d = {'marks':marks,
                        'student_id':student_id,
                        'session_id':session_id,
                        'question_id':question_id,
                        'sub_section_id':sub_section,
                        'course_id':localStorage.getItem('teacher_course_id')
                        };
                        $.ajax({
                            type: "POST",
                            url: "evaluate_dbop",
                            dataType: 'Json',
                            contentType: 'application/json',
                            data: JSON.stringify(d),
                            processData: false,
                            success:function(obj)
                            {
                                console.log('done');
                                $(param).parent().parent().parent().addClass('hidden');
                            }
                        });
            }
        }
   

        $(document).ready(function () {
            if (localStorage.getItem('teacher_course_id') == null) {
                window.location.href = 'teacher';
            }
            else {
                console.log('alert');
                queries()
            }
            
        })
        function queries()
        {
            var d = { 'course_id': localStorage.getItem('teacher_course_id') };
                $.ajax({
                    type: "POST",
                    url: "queries_dbop",
                    dataType: 'Json',
                    contentType: 'application/json',
                    data: JSON.stringify(d),
                    processData: false,
                    success: function (obj) {
                        var query = ``;
                        var prev  = ``;
                        console.log(obj)
                        for (i = 0; i < obj['data'].length; i++) {
                            console.log(i + 'workinf')
                            if(obj['data'][i]['answered']==0)
                            {
                                query+=`<div class="row question-row">`+obj['data'][i]['question']+`</div>
                                <div class="row answer-row">
                                    <textarea id="textarea" placeholder="answer here"></textarea>
                                </div>
                                <div class="col-3 button-column">
                                    <button class="btn btn-success waves-effect assign-btn" onclick="submit('`+obj['data'][i]['q_id']+`',$(this))">
                                        ANSWER
                                    </button>
                                </div>`;
                            }
                            else{
                                prev+=`<div class="row question-row">`+obj['data'][i]['question']+`</div>
                            <div class="row answer-row">`+obj['data'][i]['answer']+`</div>`
                            }
                        
                        }
                        $('#queries_container').html(query);
                        $('#previous_container').html(prev);
                    }
                });
        }
        function submit(id,param)
        {
            console.log(id);
            console.log($(param).parents().find('textarea').val());
            var d = { 'q_id': id,
                    'answer':$(param).parents().find('textarea').val()};
                $.ajax({
                    type: "POST",
                    url: "queries_dbop",
                    dataType: 'Json',
                    contentType: 'application/json',
                    data: JSON.stringify(d),
                    processData: false,
                    success:function(obj)
                    {
                        queries();
                    }
                })
        }
   
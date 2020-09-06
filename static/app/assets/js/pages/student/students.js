
        $(document).ready(function(){
            
            
            // console.log(localStorage.getItem('teacher_course_id'));
            var d = {};
            console.log("working")
            $.ajax({
                type: "POST",
                url: "/admin/students_progress_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (ret_obj) {
                    var a = '';
                    for (i = 0; i < ret_obj['data'].length; i++) {
                        console.log(ret_obj['data'][i]);
                        a += `<tr>
                                                <td>`+ ret_obj['data'][i]['student_id'] + `</td>
                                                <td class ='click' onclick="details('`+ ret_obj['data'][i]['student_id'] + `','`+ ret_obj['data'][i]['course_id'] + `')">`+ ret_obj['data'][i]['name'] + `</td>
                                                <td>`+ ret_obj['data'][i]['email_id'] + `</td>
                                                <td>`+ ret_obj['data'][i]['phone_no'] + `</td>
                                                
                                                <td class="center">
                                                    <div class="progress">
                                                        <div class="progress-bar progress-bar-success width-per-`+ (parseInt( ret_obj['data'][i]['progress'])) + `" role="progressbar"
                                                            aria-valuemin="0" aria-valuemax="100" style="color:#f5f5f5;">`+ (parseInt(ret_obj['data'][i]['progress']))+ `%
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>`
                    }
                    $('#allstudents_tbody').html(a);
                    $(".js-basic-example").DataTable({
                        responsive: true
                    });

                }
            })
        })
        function details(student_id,course_id)
        {
            // alert('working');
            localStorage.setItem('admin_student_id',student_id);
            window.open('/admin/progress');
            localStorage.setItem('admin_course_id',course_id);
        }
 
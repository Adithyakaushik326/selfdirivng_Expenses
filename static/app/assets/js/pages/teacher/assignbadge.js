
    $(document).ready(function () {
        if (localStorage.getItem('teacher_course_id') == null) {
                window.location.href = 'teacher';
            }

       get_cts();
    });
    function get_cts()
    {
        var d = {};

$.ajax({
    type: "POST",
    url: "badge_dbop",
    dataType: 'Json',
    contentType: 'application/json',
    data: JSON.stringify(d),
    processData: false,
    success: function (obj) {
        console.log(obj)
        var student = ``;
        for (i = 0; i < obj['data']['student'].length; i++) {
            student += `<option value="` + obj['data']['student'][i]['student_id'] + `" >` + obj['data']['student'][i]['name'] + `</option>`
        }
        $('#select_student').html(student);
        
        
        var badge = ``;
        for (i = 0; i < obj['data']['badges'].length; i++) {
            // console.log(obj['data']['badges'][i]);
            console.log('nopt wonfa');
            badge += `<option>` + obj['data']['badges'][i] + `</option>`
        }
        $('#select_badge').html(badge);
        $('.select2').on("change", function () {
            console.log($('#select_student option:selected').text());
            // console.log($('#select_teacher').val());
            if (($('#select_student').val().length == 0) || ($('#select_badge').val() == 0) ) {
                // console.log('course');
                document.getElementById("assign_button").disabled = true;
            }
            else {
                document.getElementById("assign_button").disabled = false;
            }
        });
    }
})
    }
    function assignbadge() {
        var data = {
            'student_id': $('#select_student').val(),
            'badges': $('#select_badge').val(),
            'course_id': localStorage.getItem('teacher_course_id')
        };
        // var d = { 'id': 'adi' };
        $.ajax({
            type: "POST",
            url: "badge_dbop",
            dataType: 'Json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            processData: false,
            success: function (obj) {
               
                    swal(
                        {
                            title: "Assigned badges to students",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true
                        },
                        function () {
                            get_cts();
                        }
                    );
                
            }
        });
    }

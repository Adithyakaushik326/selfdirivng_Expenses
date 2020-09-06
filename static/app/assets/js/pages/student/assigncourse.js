
$(document).ready(function () {
    get_cts();
});
function get_cts() {
    var d = {};

    $.ajax({
        type: "POST",
        url: "assigncourse_dbop",
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
            var teacher = `<option></option>`;
            for (i = 0; i < obj['data']['teacher'].length; i++) {
                teacher += `<option value="` + obj['data']['teacher'][i]['teacher_id'] + `" >` + obj['data']['teacher'][i]['name'] + `</option>`
            }
            $('#select_teacher').html(teacher);
            var course = `<option></option>`;
            for (i = 0; i < obj['data']['course'].length; i++) {
                course += `<option value="` + obj['data']['course'][i]['course_id'] + `" >` + obj['data']['course'][i]['name'] + `</option>`
            }
            $('#select_course').html(course);
            $('.select2').on("change", function () {
                console.log($('#select_student option:selected').text());
                console.log($('#select_teacher').val());
                if (($('#select_student').val().length == 0) || ($('#select_course').val() == 0) || ($('#select_teacher').val() == 0)) {
                    console.log('course');
                    document.getElementById("select_button").disabled = true;
                }
                else {
                    document.getElementById("select_button").disabled = false;
                }
            });
        }
    })
}
function assigncourse() {
    var data = {
        'student_id': $('#select_student').val(),
        'teacher_id': $('#select_teacher').val(),
        'course_id': $('#select_course').val()
    };
    // var d = { 'id': 'adi' };
    $.ajax({
        type: "POST",
        url: "assigncourse_dbop",
        dataType: 'Json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        processData: false,
        success: function (obj) {
            if (obj['error']) {
                swal(
                    {
                        title: "Students already enrolled",
                        text: obj['error'],
                        type: "warning",
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
            else if (obj['status_code'] == 200) {
                // swal("Success", "Assigned course to students", "success");
                swal(
                    {
                        title: "Assigned course to students",
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
        }
    });
}

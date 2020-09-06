
        $(document).ready(function () {
            get_allteachers();
        })
        function get_allteachers() {
            var d = {};
            $.ajax({
                type: "POST",
                url: "allteachers_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (ret_obj) {
                    var a = '';
                    for (i = 0; i < ret_obj['data'].length; i++) {
                        console.log(ret_obj['data'][i]);
                        a += `<tr>
                                                <td>`+ ret_obj['data'][i]['teacher_id'] + `</td>
                                                <td>`+ ret_obj['data'][i]['name'] + `</td>
                                                <td>`+ ret_obj['data'][i]['email_id'] + `</td>
                                                <td>`+ ret_obj['data'][i]['phone_no'] + `</td>
                                                <td style="word-wrap: break-word; max-width: 300px;">`+ ret_obj['data'][i]['skills'] + ` </td>
                                                <td class="center">
                                                    <button class="btn tblActnBtn" onclick = "openmodal('`+ ret_obj['data'][i]['teacher_id'] + `')">
                                                        <i class="material-icons">mode_edit</i>
                                                    </button>
                                                    <button class="btn tblActnBtn" onclick = "delete_teacher('`+ ret_obj['data'][i]['teacher_id'] + `')">
                                                        <i class="material-icons">delete</i>
                                                    </button>
                                                </td>
                                            </tr>`
                    }
                    $('#allteachers_tbody').html(a);
                    datatable()
                }
            });
        }
        function openmodal(ret_obj) {
            console.log(ret_obj);
            var id = ret_obj;
            localStorage.setItem('teacher_id', id);
            var d = { 'id': id };
            $('#student-details').modal("show");
            $.ajax({
                type: "POST",
                url: "allteachers_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    $('#student-details').modal("show");

                    $('#password').removeClass('hidden');
                    $('#reset-password-form').addClass('hidden');
                    $('#contact_details').removeClass('hidden');
                    $('#reset-contact-details-form').addClass('hidden');
                    console.log(obj)
                    var header = `
                                <h5 class="card-header">
                                    Login Details
                                </h5>
                                <button id="edit-contact-details" class="btn header-edit-icon v-align-center" onclick="reset('`+ obj['data']['teacher_id'] + `','password')">
                                    <i class="material-icons">mode_edit</i>
                                </button>`;
                    $('#header_details').html(header);
                    $('#username').text(obj['data']['username']);
                    $('#password').text(obj['data']['password']);

                    var contact_header = `<h5 class="v-align-center">Contact Details</h5>
                                    <button id="edit-contact-details" class="btn header-edit-icon v-align-center" onclick="reset('`+ obj['data']['teacher_id'] + `','contact')">
                                        <i class="material-icons">mode_edit</i>
                                    </button>`;
                    $('#contact_header').html(contact_header);

                    var contact_details = `<div class="row mt-3">
                                        <div class="col-md-4 col-sm-4 col-4 offset-md-1">Email ID</div>
                                        <div class="col-md-1 col-sm-1 col-1">:</div>
                                        <div class="col-md-6 col-sm-7 col-7">`+ obj['data']['email_id'] + `</div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4 col-sm-4 col-4 offset-md-1">Date of Birth</div>
                                        <div class="col-md-1 col-sm-1 col-1">:</div>
                                        <div class="col-md-6 col-sm-7 col-7">`+ obj['data']['dob'] + `</div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4 col-sm-4 col-4 offset-md-1">Phone</div>
                                        <div class="col-md-1 col-sm-1 col-1">:</div>
                                        <div class="col-md-6 col-sm-7 col-7">`+ obj['data']['phone_no'] + `</div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4 col-sm-4 col-4 offset-md-1">Gender</div>
                                        <div class="col-md-1 col-sm-1 col-1">:</div>
                                        <div class="col-md-6 col-sm-7 col-7">`+ obj['data']['sex'] + `</div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4 col-sm-4 col-4 offset-md-1">Qualification</div>
                                        <div class="col-md-1 col-sm-1 col-1">:</div>
                                        <div class="col-md-6 col-sm-7 col-7">`+ obj['data']['qualification'] + `</div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-md-4 col-sm-4 col-4 offset-md-1">City</div>
                                        <div class="col-md-1 col-sm-1 col-1">:</div>
                                        <div class="col-md-6 col-sm-7 col-7">`+ obj['data']['city'] + `</div>
                                    </div>

                                    <div class="row mt-3">
                                        <div class="col-md-4 col-sm-4 col-4 offset-md-1">Skills</div>
                                        <div class="col-md-1 col-sm-1 col-1">:</div>
                                        <div class="col-md-6 col-sm-7 col-7">`+ obj['data']['skills'] + `</div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-md-4 col-sm-4 col-4 offset-md-1">Experience</div>
                                        <div class="col-md-1 col-sm-1 col-1">:</div>
                                        <div class="col-md-6 col-sm-7 col-7">`+ obj['data']['experience'] + ` years</div>
                                    </div>`;

                    $('#contact_details').html(contact_details);
                    $('#header_name').text(obj['data']['name']);
                    var students = ``;
                    for (i = 0; i < obj['students'].length; i++) {
                        students += `<tr>
                                    <td>`+ obj['students'][i]['student_id'] + `</td>
                                    <td>`+ obj['students'][i]['name'] + `</td>
                                    <td>`+ obj['students'][i]['email_id'] + `</td>
                                    <td>`+ obj['students'][i]['phone_no'] + `</td>
                                    <td style="word-wrap: break-word; max-width: 300px;">`+ obj['students'][i]['c_name'] + `
                                    </td>
                                </tr>`
                    }
                    $('#tbody_student').html(students);
                    // $("#modal-student").DataTable({
                    //     responsive: true
                    // });
                }
            });
        }
        function datatable() {
            $("#teacher_table").DataTable({
                responsive: true
            });
        }
        function reset(id, type) {
            if (type == 'password') {
                console.log('asnfj');
                $('#reset_modal_password').val($('#password').text());
                $('#password').toggleClass('hidden');
                $('#reset-password-form').toggleClass('hidden');
            }
            else if (type == 'contact') {
                $('#reset_modal_email').val($('#contact_details .col-7').eq(0).text());
                $('#reset_modal_dob').val($('#contact_details .col-7').eq(1).text());
                $('#reset_modal_phone').val($('#contact_details .col-7').eq(2).text());
                $('#reset_modal_qualification').val($('#contact_details .col-7').eq(4).text());
                $('#reset_modal_city').val($('#contact_details .col-7').eq(5).text());
                $('#reset_modal_experience').val($('#contact_details .col-7').eq(7).text());
                arr = $('#contact_details .col-7').eq(6).text().split(",");
                for (k = 0; k < arr.length; k++) {
                    $('#reset_modal_skills').tagsinput('add', arr[k]);
                }
                gender = $('#contact_details .col-7').eq(3).text();
                if (gender == 'M') {
                    $('#reset_modal_male').prop('checked', true);
                }
                else {
                    $('#reset_modal_female').prop('checked', true);
                }
                $('#contact_details').toggleClass('hidden');
                $('#reset-contact-details-form').toggleClass('hidden');
            }
        }
        function resetpassword() {
            var x = $('#reset-password-form').valid();
            console.log(x);
            if (!x)
                return;
            var id = localStorage.getItem('teacher_id')
            var d = {
                'id': id,
                'password': $('#reset_modal_password').val()
            };
            $.ajax({
                type: "POST",
                url: "allteachers_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log('working');
                    swal("Success", "Password update successfull", "success");
                    $('#reset_modal_password').val('');
                    openmodal(id);

                }
            });
        }
        function resetcontact() {
            var x = $('#reset-contact-details-form').valid();
            console.log(x);
            if (!x)
                return;
            var id = localStorage.getItem('teacher_id')
            var d = {
                'id': id,
                'dob': $('#reset_modal_dob').val(),
                'email': $('#reset_modal_email').val(),
                'phone': $('#reset_modal_phone').val(),
                'qualification': $('#reset_modal_qualification').val(),
                'city': $('#reset_modal_city').val(),
                'skills': $('#reset_modal_skills').val(),
                'experience': $('#reset_modal_experience').val(),
                'male': $('#reset_modal_male').is(':checked'),
                'female': $('#reset_modal_female').is(':checked')
            };
            $.ajax({
                type: "POST",
                url: "allteachers_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log(id);

                    $('#reset_modal_dob').val('');
                    $('#reset_modal_email').val('');
                    $('#reset_modal_qualification').val('');
                    $('#reset_modal_city').val('');
                    $('#reset_modal_skills').val('');
                    $('#reset_modal_experience').val('');
                    $('#reset_modal_phone').val('');
                    swal("Success", "Contact details update successfull", "success");
                    openmodal(id);
                }
            });
        }
        function delete_teacher(ret_obj) {
            var d = {
                'id': ret_obj,
                'delete': 1
            };
            swal(
                {
                    title: "Are you sure?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false
                },
                function () {
                    swal("Deleted!", "Teacher has been deleted", "success");
                    $.ajax({
                        type: "POST",
                        url: "allteachers_dbop",
                        dataType: 'Json',
                        contentType: 'application/json',
                        data: JSON.stringify(d),
                        processData: false,
                        success: function (obj) {
                            console.log('working');
                            get_allteachers();
                        }
                    })
                }
            );

        }

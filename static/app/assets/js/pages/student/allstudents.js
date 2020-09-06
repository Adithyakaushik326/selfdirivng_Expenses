
        $(document).ready(function () {
            get_allstudents();
        });
        function get_allstudents() {
            var d = {};
            $.ajax({
                type: "POST",
                url: "allstudents_dbop",
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
                                                <td>`+ ret_obj['data'][i]['name'] + `</td>
                                                <td>`+ ret_obj['data'][i]['email_id'] + `</td>
                                                <td>`+ ret_obj['data'][i]['phone_no'] + `</td>
                                                <td style="word-wrap: break-word; max-width: 300px;">`+ ret_obj['data'][i]['course_name'] + ` </td>
                                                <td class="center">
                                                    <button class="btn tblActnBtn" onclick = "openmodal('`+ ret_obj['data'][i]['student_id'] + `')">
                                                        <i class="material-icons">mode_edit</i>
                                                    </button>
                                                    <button class="btn tblActnBtn" onclick = "delete_student('`+ ret_obj['data'][i]['student_id'] + `')">
                                                        <i class="material-icons">delete</i>
                                                    </button>
                                                </td>
                                            </tr>`
                    }
                    $('#allstudents_tbody').html(a);
                    $(".js-basic-example").DataTable({
                        responsive: true
                    });
                }
            })
        };
        function openmodal(ret_obj) {
            console.log(ret_obj);
            var id = ret_obj;
            localStorage.setItem('student_id', id);
            var d = { 'id': id };

            $.ajax({
                type: "POST",
                url: "allstudents_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log(obj);
                    console.log(obj['data']);
                    $('#student-details').modal("show");
                    $('#modal_name').text(obj['data']['username']);
                    $('#modal_password').text(obj['data']['password'])
                    $('#header_name').text(obj['data']['name']);

                    var header = `<h6 class="details-header">Login Details</h6>
                                <button id="edit-login-details" class="btn header-edit-icon" onclick="reset('`+ obj['data']['id'] + `','password')">
                                    <i class="material-icons">mode_edit</i>
                                </button>`
                    $('#header_details').html(header);
                    var personal = `<h6 class="details-header">Login Details</h6>
                                <button id="edit-login-details" class="btn header-edit-icon" onclick="reset('`+ obj['data']['id'] + `','personal')">
                                    <i class="material-icons">mode_edit</i>
                                </button>`;
                    $('#personal_details_header').html(personal);
                    var header = `<h6 class="details-header">Contact Details</h6>
                                    <button id="edit-contact-details" class="btn header-edit-icon" onclick="reset('`+ obj['data']['id'] + `','contact')">
                                        <i class="material-icons">mode_edit</i>
                                    </button>`;
                    $('#contact_details_header').html(header);

                    var personal_details = `<h5 class="details-value">Age: ` + obj['data']['age'] + `</h5>
                                        <h5 class="details-value">DoB: `+ obj['data']['dob'] + `</h5>
                                        <h5 class="details-value">Grade: `+ obj['data']['grade'] + `</h5>
                                        <h5 class="details-value">Gender: `+ obj['data']['sex'] + `</h5>
                                        <h5 class="details-value">City: `+ obj['data']['city'] + `</h5>`
                    $('#personal_details_container').html(personal_details);

                    var contact_details = `<h5 class="details-value">Parent: ` + obj['data']['parent_name'] + `</h5>
                                    <h5 class="details-value">Email ID: `+ obj['data']['email_id'] + `</h5>
                                    <h5 class="details-value">Phone: `+ obj['data']['phone_no'] + `</h5>`;
                    $('#contact_details_container').html(contact_details);
                    $('#reset-password-form').addClass('hidden');
                    $('#reset-personal-details-form').addClass('hidden');
                    $('#reset-contact-details-form').addClass('hidden');
                    $('#modal_password').removeClass('hidden');
                    $('#personal_details_container').removeClass('hidden');
                    $('#contact_details_container').removeClass('hidden');
                    var course = ``;
                    var badge = ``;
                    for (j = 0; j < obj['course'].length; j++) {
                        console.log(j);
                        course += `<div class="row  course shadow-lg p-3 mb-5 rounded">
                                        <div class="col-lg-3 course-image-container">
                                            <div class="course-image" style="background-image:  url('static/uploads/`+obj['course'][j]['c_image']+`')">
                                                
                                            </div>
                                        </div>
                                        <div class="col-lg-9 course-body">
                                            <!--style="position:relative;">-->
                                            <div class="row course-heading">
                                                <div class="col-12">
                                                    <div class="header-details-container">
                                                        <h1 class="h4">`+ obj['course'][j]['c_name'] + `</h1>
                                                        <button id="edit-course-details" class="btn course-edit-icon" onclick="editcourse($(this))" >
                                                            <i class="material-icons">mode_edit</i>
                                                        </button>
                                                        
                                                        <button id="edit-course-detail" class="btn course-delete-icon" onclick ="delcourse('`+ obj['course'][j]['course_id'] + `')" >
                                                            <i class="material-icons">delete</i>
                                                        </button>
                                                    </div>
                                                    <!-- <h1 class="h4">Programming Fundamentals Level 1</h1> -->
                                                </div>
                                            </div>
                                            <div class="row course-details">
                                                <div class="col-md-4">Enrolled on: `+ obj['course'][j]['date'] + `</div>
                                                <div class="col-md-8">
                                                    <p class="modal_incharge">In-charge: `+ obj['course'][j]['teacher_name'] + `<p>
                                                    <form class="reset-assigned-teacher-form hidden" >
                                                        <div class="row">
                                                            <div class="col-3">In-charge</div>
                                                            <div class="col-4">
                                                                
                                                                <div class="form-group">
                                                                    <select class="select_course form-control select2 " data-placeholder="Select" id="">
                                                                    <option></option>
                                                                    <option>adi</option>
                                                                    <option>adi</option>
                                                                    <option>adi</option>
                                                                    <option>adi</option>
                                                                    <option>adi</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="col-4">
                                                                <button type="button"
                                                                    class="btn-outline-default" onclick="updateteacher($(this),'`+ obj['course'][j]['course_id'] + `')">Update</button>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div class="row course-progress"
                                                style="position: absolute; bottom: 5px;width: 100%;">
                                                <div class="col-12">
                                                    <div class="progress">
                                                        <div class="progress-bar progress-bar-success width-per-`+ Math.round(obj['course'][j]['percentage']) + `" role="progressbar"
                                                             aria-valuemin="0" aria-valuemax="100">`+ obj['course'][j]['percentage'] + `%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-10 mb-10"></div>`;
                                    if(obj['course'][j]['badge'] > 0){
                                    badge+=`<div class="col-4 ">
                                    <div class="badge-container" style="background-image: url('static/app/assets/images/badges/`+ obj['course'][j]['badge']+`.png');"></div>
                                        <h5 class="badge-container-name">`+ obj['course'][j]['c_name'] + `</h5>
                                </div>`;
                            }
                            console.log(obj['course'][j]['custom_badge']);
                            console.log(obj['course'][j]['custom_badge'].length);
                            for (l=0;l<obj['course'][j]['custom_badge'].length;l++)
                            {
                                badge+=`<div class="col-4 ">
                                            <div class="badge-container" style="background-image: url('static/app/assets/images/badges/`+ obj['course'][j]['custom_badge'][l]+`.png');"></div>
                                                <h5 class="badge-container-name">`+ obj['course'][j]['c_name'] + `</h5>
                                        </div>`;   
                            } 
                    }
               

                    $('#course_display').html(course);
                    var teacher = `<option></option>`;
                    for (k = 0; k < obj['teachers'].length; k++) {
                        console.log('wprking')
                        teacher += `<option value = "` + obj['teachers'][k]['teacher_id'] + `">` + obj['teachers'][k]['name'] + `</option>`;
                    }
                    $('.select_course').html(teacher);
                    $('#badge_body').html(badge);
                }
            });

        }
        function loadcourse_details(obj) {

        }
        function updateteacher(pointer, course_id) {
            console.log($(pointer).html());
            console.log($(pointer).closest('.row').find('.select_course').val());
            console.log(course_id)
            var id = localStorage.getItem('student_id');
            var d = {
                'id': id,
                'teacher_id': $(pointer).closest('.row').find('.select_course').val(),
                'course_id': course_id
            };
            $.ajax({
                type: "POST",
                url: "allstudents_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log('working');
                    swal("Success", "Teacher update successfull", "success");
                    // $('#reset_modal_password').val('');
                    // openmodal(id);
                    openmodal(id);

                }
            });

        }
        function delcourse(course_id) {
            console.log('it worked');
            console.log(course_id);
            var id = localStorage.getItem('student_id');
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
                    swal("Deleted!", "Student has been deleted", "success");
                    var d = {
                        'delete_course': course_id,
                        'id': id
                    };
                    $.ajax({
                        type: "POST",
                        url: "allstudents_dbop",
                        dataType: 'Json',
                        contentType: 'application/json',
                        data: JSON.stringify(d),
                        processData: false,
                        success: function (obj) {
                            console.log('working');
                            swal("Success", "Teacher update successfull", "success");
                            // $('#reset_modal_password').val('');
                            // openmodal(id);
                            openmodal(id);

                        }
                    });
                }
            );
        }
        function editcourse(param, course_id) {
            console.log($(param).html());
            console.log('course_id');
            console.log(course_id);
            $(param).closest('.course-heading').siblings('.course-details').find('.reset-assigned-teacher-form').toggleClass('hidden');
            // $('.reset-assigned-teacher-form').toggleClass('hidden');
            // $('.modal_incharge').toggleClass('hidden');
            $(param).closest('.course-heading').siblings('.course-details').find('.modal_incharge').toggleClass('hidden');


        }
        function reset(id, type) {
            if (type == 'password') {
                console.log('asnfj');
                $('#modal_password').toggleClass('hidden');
                $('#reset-password-form').toggleClass('hidden');
                pass = $('#modal_password').text();
                $('#reset_modal_password').trigger('focus');
                $('#reset_modal_password').val(pass);
            }
            else if (type == 'personal') {
                // age dob grade gennder city
                age = $('#personal_details_container .details-value').eq(0).text().split(": ");
                age = age[age.length - 1];
                console.log("Age", age);
                dob = $('#personal_details_container .details-value').eq(1).text().split(": ");
                dob = dob[dob.length - 1];
                grade = $('#personal_details_container h5').eq(2).text().split(": ");
                grade = grade[grade.length - 1];
                city = $('#personal_details_container h5').eq(4).text().split(": ");
                city = city[city.length - 1];
                gender = $('#personal_details_container h5').eq(3).text().split(": ");
                gender = gender[gender.length - 1];
                $("#reset_modal_age").val(age);
                $('#reset_modal_dob').val(dob);
                $('#reset_modal_grade').val(grade);
                $('#reset_modal_city').val(city);
                if(gender == 'M'){
                    $("#reset_modal_male").prop("checked", true);
                }
                else{
                    $("#reset_modal_female").prop("checked", true);
                }
                $('#personal_details_container').toggleClass('hidden');
                $('#reset-personal-details-form').toggleClass('hidden');
            }
            else if (type == 'contact') {
                pname = $('#contact_details_container h5').eq(0).text().split(": ");
                pname = pname[pname.length - 1];
                email = $('#contact_details_container h5').eq(1).text().split(": ");
                email = email[email.length - 1];
                phone = $('#contact_details_container h5').eq(2).text().split(": ");
                phone = phone[phone.length - 1];
                $('#reset_modal_parent_name').val(pname);
                $('#reset_modal_email').val(email);
                $('#reset_modal_phone').val(phone);
                $('#contact_details_container').toggleClass('hidden');
                $('#reset-contact-details-form').toggleClass('hidden');
            }
            console.log('testing local storage');
            console.log(localStorage.getItem('student_id'));

        }
        function resetpassword() {
            var x = $('#reset-contact-details-form').valid();
            console.log(x);
            if (!x)
                return;
            var id = localStorage.getItem('student_id')
            var d = {
                'id': id,
                'password': $('#reset_modal_password').val()
            };
            $.ajax({
                type: "POST",
                url: "allstudents_dbop",
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
        function resetpersonal_details() {
            var x = $('#reset-personal-details-form').valid();
            console.log(x);
            if (!x)
                return;
            var id = localStorage.getItem('student_id')
            var d = {
                'id': id,
                'age': $('#reset_modal_age').val(),
                'dob': $('#reset_modal_dob').val(),
                'grade': $('#reset_modal_grade').val(),
                'city': $('#reset_modal_city').val(),
                'male': $('#reset_modal_male').is(':checked'),
                'female': $('#reset_modal_female').is(':checked'),
            };
            $.ajax({
                type: "POST",
                url: "allstudents_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log('working');
                    swal("Success", "Personal details update successfull", "success");
                    $('#reset_modal_age').val('');
                    $('#reset_modal_dob').val('');
                    $('#reset_modal_grade').val('');
                    $('#reset_modal_city').val('');
                    openmodal(id);
                }
            });
        }
        function resetcontact() {
            var x = $('#reset-contact-details-form').valid();
            console.log(x);
            if (!x)
                return;
            var id = localStorage.getItem('student_id')
            var d = {
                'id': id,
                'parent_name': $('#reset_modal_parent_name').val(),
                'email': $('#reset_modal_email').val(),
                'phone': $('#reset_modal_phone').val()
            };
            $.ajax({
                type: "POST",
                url: "allstudents_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log('working');
                    swal("Success", "Contact details update successfull", "success");
                    $('#reset_modal_parent_name').val('');
                    $('#reset_modal_email').val('');
                    $('#reset_modal_phone').val('');
                    openmodal(id);
                }
            });
        }
        function delete_student(ret_obj) {
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
                    swal("Deleted!", "Student has been deleted", "success");
                    $.ajax({
                        type: "POST",
                        url: "allstudents_dbop",
                        dataType: 'Json',
                        contentType: 'application/json',
                        data: JSON.stringify(d),
                        processData: false,
                        success: function (obj) {
                            console.log('working');
                            get_allstudents();
                        }
                    })
                }
            );

        }
 
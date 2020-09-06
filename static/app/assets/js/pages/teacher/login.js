
        function call_alert() {
            // alert('Sorry , this feature is not yet available');
            swal("Sorry!", "This feature is not available");

        };
        function login() {
            
            var d = {
                'email': $('#email').val(),
                'password': $('#pass').val(),
                "type":"teacher"
            }
            $.ajax({
                type: "POST",
                url: "login_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log("ret_data", obj);
                    if (obj['status_code'] == '200') {
                        localStorage.setItem('course_teacher_id', obj['teacher_id']);
                        window.location.href = 'home';
                        console.log('working');
                    }
                    else {
                        swal("Invalid Credentials", '', "warning");
                    }
                }
            })
        }
    
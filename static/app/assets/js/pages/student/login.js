
        function call_alert() {
            // alert('Sorry , this feature is not yet available');
            swal("Sorry!", "This feature is not available");

        };
        function login() {
            // var x = $('#login').valid();
            // console.log(x);
            // if (!x)
            //     return;
            var d = {
                'email': $('#email').val(),
                'password': $('#pass').val(),
                'type':"student"
            }
            $.ajax({
                type: "POST",
                url: "login_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log(obj);
                    if (obj['status_code'] == '200') {
                        localStorage.setItem('student_name', obj['student_name']);
                        window.location.href = 'home';
                        console.log('working');
                    }
                    else {
                        swal("Invalid Credentials", '', "warning");
                    }
                }
            })
        }

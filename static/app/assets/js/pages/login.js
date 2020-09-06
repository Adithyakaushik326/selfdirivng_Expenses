
        function call_alert() {
           
            swal("Sorry!", "This feature is not available");

        };
        function login() {
            
            var d = {
                'email': $('#email').val(),
                'password': $('#pass').val(),

            }
            console.log(d);
            $.ajax({
                type: "POST",
                url: "login_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    if (obj['status_code'] == '200') {
                        window.location.href = 'home';
                        console.log('working');
                    }
                    else {
                        swal("Invalid Credentials", '', "warning");
                    }
                }
            })
        }


        function addteacher()
        {
            var x =  $("#form_validation").valid();

           if(!x)
            return;
            console.log($('#skills').val())
            var d = {
                'name' : $('#name').val(),
                'email':$('#email').val(),
                'phone':$('#phone').val(),
                'password':$('#password').val(),
                'dob':$('#dob').val(),
                'qualification':$('#qualification').val(),
                'experience':$('#experience').val(),
                'city':$('#city').val(),
                'skills':$('#skills').val(),
                'male':$('#male').is(':checked'),
                'female':$('#female').is(':checked')
            }
            console.log($('#male').is(':checked'));
            $.ajax({
                type:"POST",
                url:"addteacher_dbop",
                dataType:"Json",
                contentType:'application/json',
                data:JSON.stringify(d),
                processData:false,
                success:function(ret_obj)
                {
                    swal("Teacher successfully added!","", "success");
                    console.log(ret_obj);
                    $('#name').val('');
                    $('#email').val('');
                    $('#phone').val('');
                    $('#qualification').val('');
                    $('#experience').val('');
                    $('#dob').val('');
                    $('#city').val('');
                    $('#skills').val(''); 
                }
            })
        }
    
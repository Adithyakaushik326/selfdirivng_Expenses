
        function adddescription()
        {
            var x =  $("#form_validation").valid();

            if(!x)
             return;  
             var d = {
                'title': $('#title').val(),
                'date': $('#dob').val(),
                'desc': $('#description').val(),
                
            };
            console.log($('#paid').val());
            $.ajax({
                type: "POST",
                url: "adddescription_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (ret_obj) {
                    swal("Expense successfully added!", "", "success");
                    console.log(ret_obj);
                    $('#title').val('');
                    $('#dob').val('');
                    $('#description').val('');
                    
                }
            })

        }
        function addstudent() {
           var x =  $("#form_validation").valid();

           if(!x)
            return;
           console.log(x);

            var d = {
                'name': $('#name').val(),
                'dob': $('#dob').val(),
                'price': $('#price').val(),
                'paid':$('#paid').val(),
            };
            console.log($('#paid').val());
            $.ajax({
                type: "POST",
                url: "addexpense_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (ret_obj) {
                    swal("Expense successfully added!", "", "success");
                    console.log(ret_obj);
                    $('#name').val('');
                    $('#dob').val('');
                    $('#price').val('');
                    
                }
            })


        }

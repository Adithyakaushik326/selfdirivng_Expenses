function addstudents() {
    form_data = new FormData();
    if ($('.batch-add-excel-file').val() == "") {
        swal("Please upload a file");
    }
    else {
        form_data.append("add_student_file", $('.batch-add-excel-file')[0].files[0]);
        form_data.append("excel-file_name", $('.excel-file-name').val());
        console.log(form_data);
        $.ajax({
            type: 'POST',
            url: 'addstudentbulk',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                console.log(data);
            }
        });
    }
}
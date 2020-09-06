
        $(document).ready(function () {
            console.log("jebfjawen");
            dashboard_details()
        })
        function dashboard_details()
        {
            var d = {}
            $.ajax({
                type: "POST",
                url: "home_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log(obj)
                    $('#adi').text(obj['adi_sum']);
                    $('#amey').text(obj['amey_sum']);
                    $('#ani').text(obj['ani_sum']);
                    $('#abhi').text(obj['abhi_sum']);
                    var name = ['dummy','adi','amey','abhi','ani'];
                    var expense ='';
                    for(i=0;i<obj['expense'].length;i++)
                    {
                        console.log('expense')
                        paid = name[obj['expense'][i]['paid']]
                        expense+=`<tr>
                                                <td class="table-img">
                                                    `+obj['expense'][i]['expense_id']+`
                                                </td>
                                                <td>`+obj['expense'][i]['name']+`</td>
                                                <td >`+obj['expense'][i]['price']+`</td>
                                                <td>`+obj['expense'][i]['date']+`</td>
                                                <td>`+paid+`</td>
                                               
                                            </tr>`;

                    }
                    $('#dashboard_teachers').html(expense);
                    $('.page-loader-wrapper').fadeOut();
                }
            })
            
            

        }
      


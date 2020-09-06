
        $(document).ready(function(){
            $('#username').text(localStorage.getItem('teacher_name'));
            var d ={
                'teacher_id': localStorage.getItem('course_teacher_id')
            };
            $.ajax({
                type: "POST",
                url: "teacher_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj)
                {
                    console.log(obj)
                    var course = ``;
                    var counter = 0 ;
                    for(i=1;i<=obj['data'].length;i++)
                    {
                        if(i%3==1)
                        {
                            course += `<div class="col-md-3 col-sm-6 d-flex align-item-stretched">
                                        <div class="pricingTable w-100 ">
                                            <div class="pricingTable-header">
                                                <i class="material-icons">smartphone</i>
                                                
                                            </div>
                                            <h3 class="heading course-heading mt-10">`+obj['data'][i-1]['name']+`</h3>
                                            <div class="pricing-content">
                                                <ul>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['students']+`</b> Students</li>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['sessions']+`</b> Sessions</li>
                                                    
                                                    
                                                </ul>
                                            </div>
                                            <div class="pricingTable-signup">
                                                <a onclick="openmodal('`+obj['data'][i-1]['id']+`')">view more</a>
                                            </div>
                                        </div>
                                    </div>`;
                        }
                        else if(i%3==2)
                        {
                            course+=`<div class="col-md-3 col-sm-6 d-flex align-item-stretched">
                                        <div class="pricingTable w-100 blueColor">
                                            <div class="pricingTable-header">
                                                <i class="material-icons">developer_board</i>
                                                <!-- <div class="price-value"> $10.00
                                                    <span class="month">per month</span>
                                                </div> -->
                                            </div>
                                            <h3 class="heading course-heading">`+obj['data'][i-1]['name']+`</h3>
                                            <div class="pricing-content">
                                                <ul>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['students']+`</b> Students</li>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['sessions']+`</b> Sessions</li>
                                                    
                                                    
                                                </ul>
                                            </div>
                                            <div class="pricingTable-signup">
                                                <a onclick="openmodal('`+obj['data'][i-1]['id']+`')">view more</a>
                                            </div>
                                        </div>
                                    </div>`;
                        }
                        else if(i%3==0)
                        {
                            course+=`<div class="col-md-3 col-sm-6 d-flex align-item-stretched">
                                        <div class="pricingTable w-100  greenColor">
                                            <div class="pricingTable-header">
                                                <i class="material-icons">laptop_mac</i>
                                                
                                            </div>
                                            <h3 class="heading course-heading">`+obj['data'][i-1]['name']+`</h3>
                                            <div class="pricing-content">
                                                <ul>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['students']+`</b> Students</li>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['sessions']+`</b> Sessions</li>
                                                    
                                                    
                                                </ul>
                                            </div>
                                            <div class="pricingTable-signup">
                                                <a onclick="openmodal('`+obj['data'][i-1]['id']+`')">view more</a>
                                            </div>
                                        </div>
                                    </div>`
                        }

                    }
                    $(".page-loader-wrapper").fadeOut();
                   
                    $('#home_body').html(course);
                }
            });
        })
        function openmodal(course_id)
        {
            localStorage.setItem('teacher_course_id',course_id)
            window.location.href="editcourse"
        }
    
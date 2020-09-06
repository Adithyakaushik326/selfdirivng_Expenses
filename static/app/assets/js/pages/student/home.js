
        icons_list = ['smartphone', 'developer_board', 'laptop_mac'];
        colour_codes = ['#ff9624', '#4b64ff', '#40c952'];
        colour_class_names = ['orangeColor', 'blueColor', 'greenColor'];
        $(document).ready(function () {
            $('#login-student-name').text(localStorage.getItem('student_name'));
            var d = {
                'student_id': 19
            }
            $.ajax({
                type: "POST",
                url: "student_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    // console.log(obj)
                    var course = ``;
                    var counter = 0;
                    for (i = 1; i <= obj['data'].length; i++) {
                        if (i % 3 == 1) {

                            var abc = Math.round(obj['data'][i - 1]['completed']);
                            course += `<div class="col-md-3 col-sm-6 d-flex align-item-stretched">
                                        <div class="pricingTable w-100 ">
                                            <div class="pricingTable-header">
                                                <i class="material-icons">smartphone</i>
                                                
                                            </div>
                                            <h3 class="heading course-heading mt-10">`+ obj['data'][i - 1]['name'] + `</h3>
                                            <div class="progress-circle c100 p`+ Math.round(obj['data'][i - 1]['completed']);
                            course += `">
                                                <span style="color: #ff9624;">`+ obj['data'][i - 1]['completed'].toFixed(2) + `%</span>
                                                <div class="slice">
                                                    <div class="bar" style="border-color:#ff9624"></div>
                                                    <div class="fill" style="`;
                            if (abc > 50) {
                                course += "border: 0.08em solid #ff9624;";
                            }
                            course += `"></div>
                                                </div>
                                                </div>
                                            <div class="pricingTable-signup">
                                                <a onclick="openmodal('`+ obj['data'][i - 1]['id'] + `')">view more</a>
                                            </div>
                                        </div>
                                    </div>`;
                        }
                        else if (i % 3 == 2) {
                            var abc = Math.round(obj['data'][i - 1]['completed']);
                            course += `<div class="col-md-3 col-sm-6 d-flex align-item-stretched">
                                        <div class="pricingTable w-100 blueColor">
                                            <div class="pricingTable-header">
                                                <i class="material-icons">developer_board</i>
                                                <!-- <div class="price-value"> $10.00
                                                    <span class="month">per month</span>
                                                </div> -->
                                            </div>
                                            <h3 class="heading course-heading">`+ obj['data'][i - 1]['name'] + `</h3>
                                            <div class="progress-circle c100 p`+ Math.round(obj['data'][i - 1]['completed']);
                            course += `">
                                                <span style="color: #4b64ff;">`+ obj['data'][i - 1]['completed'].toFixed(2) + `%</span>
                                                <div class="slice">
                                                    <div class="bar" style="border-color:#4b64ff"></div>
                                                    <div class="fill" style="`;
                            if (abc > 50) {
                                course += "border: 0.08em solid #4b64ff;";
                            }
                            course += `"></div>
                                                </div>
                                                </div>
                                            <div class="pricingTable-signup">
                                                <a onclick="openmodal('`+ obj['data'][i - 1]['id'] + `')">view more</a>
                                            </div>
                                        </div>
                                    </div>`;
                        }
                        else if (i % 3 == 0) {
                            var abc = Math.round(obj['data'][i - 1]['completed']);
                            course += `<div class="col-md-3 col-sm-6 d-flex align-item-stretched">
                                        <div class="pricingTable w-100  greenColor">
                                            <div class="pricingTable-header">
                                                <i class="material-icons">laptop_mac</i>
                                                
                                            </div>
                                            <h3 class="heading course-heading">`+ obj['data'][i - 1]['name'] + `</h3>
                                            <div class="progress-circle c100 p`+ Math.round(obj['data'][i - 1]['completed']);
                            course += `">
                                                <span style="color: ##40c952;">`+ obj['data'][i - 1]['completed'].toFixed(2) + `%</span>
                                                <div class="slice">
                                                    <div class="bar" style="border-color:#40c952"></div>
                                                    <div class="fill" style="`;
                            if (abc > 50) {
                                course += "border: 0.08em solid #40c952;";
                            }
                            course += `"></div>
                                                </div>
                                                </div>
                                            <div class="pricingTable-signup">
                                                <a onclick="openmodal('`+ obj['data'][i - 1]['id'] + `')">view more</a>
                                            </div>
                                        </div>
                                    </div>`
                        }

                    }
                    $('#home_body').html(course);
                }
            });
            $.ajax({
                type: "POST",
                url: "/get_other_courses",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    other_courses = ``;
                    for (i = 0; i < obj['data'].length; i++) {
                        other_courses += `
                        <div class="col-md-3 col-sm-6 d-flex align-item-stretched">
                            <div class="pricingTable w-100 `+ colour_class_names[i % 3] + `">
                                <div class="pricingTable-header ">
                                    <i class="material-icons">`+ icons_list[i % 3] + `</i>
                                </div>
                                <h3 class="heading course-heading mt-10 mb-5">`+ obj['data'][i]['course_name'] + `</h3>
                                
                            </div>
                        </div>
                        `;
                    }
                    $('#other_body').html(other_courses);
                }
            });
            $.ajax({
                type: "POST",
                url: "/get_all_badges",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    // console.log(obj);
                    final_data = ``;
                    for (i = 0; i < obj['data']['data1'].length; i++) {
                        if(obj['data']['data1'][i]['badge_level'] == 0){
                            continue;
                        }
                        // console.log(obj['data']['data1'][i]);
                        final_data += `
                        <div class="cols-2 ">
                            <div class="badge-container"
                                style="background-image: url('`;
                        if (obj['data']['data1'][i]['badge_level'] == 1) {
                            final_data += "/static/app/assets/images/bronze.png";
                        }
                        else if (obj['data']['data1'][i]['badge_level'] == 2) {
                            final_data += "/static/app/assets/images/silver.png";
                        }
                        else if (obj['data']['data1'][i]['badge_level'] == 3) {
                            final_data += "/static/app/assets/images/gold.png";
                        }
                        final_data += `');"></div>
                            <h5 class="badge-container-name">`+ obj['data']['data1'][i]['course_name'] + `</h5>
                        </div>
                        `;
                    }
                    console.log(obj['data']['data2']);
                    for (i = 0; i < obj['data']['data2'].length; i++) {
                        if(typeof obj['data']['data2'][i]['badges'] ==="string"){
                            obj['data']['data2'][i]['badges'] = JSON.parse(obj['data']['data2'][i]['badges']);
                        }
                        
                        console.log(obj['data']['data2'][i]);
                        course_name = obj['data']['data2'][i]['course_name'];
                        for (j = 0; j < obj['data']['data2'][i]['badges'].length; j++) {
                            final_data += `
                        <div class="cols-2 ">
                            <div class="badge-container"
                                style="background-image: url('`;
                            final_data += `/static/badges/` + obj['data']['data2'][i]['badges'][j] +".png";
                            final_data += `');"></div><h5 class="badge-container-name">`+ course_name + `</h5>
                        </div>
                        `;
                        }
                    }
                    $('#bages_body').html(final_data);
                    $('.page-loader-wrapper').fadeOut();
                }
            });
        });
        function openmodal(course_id) {
            localStorage.setItem('student_course_id', course_id)
            window.location.href = "course2"
        }

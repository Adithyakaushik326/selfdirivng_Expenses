
        $(document).ready(function(){
            console.log('working');
            var d = {}
            $.ajax({
                type: "POST",
                url: "allcourse_dbop",
                dataType: 'Json',
                contentType: 'application/json',
                data: JSON.stringify(d),
                processData: false,
                success: function (obj) {
                    console.log(obj['data'])
                    var course = ``
                    for(i=1;i<=obj['data'].length;i++)
                    {
                        if(i%3==1)
                        {
                            course += `<div class="col-md-4 col-sm-6 d-flex align-item-stretched">
                                        <div class="pricingTable w-100 ">
                                            <div class="pricingTable-header">
                                                <i class="material-icons">smartphone</i>
                                                
                                            </div>
                                            <h3 class="heading course-heading mt-10">`+obj['data'][i-1]['name']+`</h3>
                                            <div class="pricing-content">
                                                <ul>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['sessions']+`</b> Sessions</li>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['project']+`</b> Projects</li>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['puzzle']+`</b> Puzzles</li>
                                                    
                                                </ul>
                                            </div>
                                            <div class="pricingTable-signup">
                                                <a href="#">view more</a>
                                            </div>
                                        </div>
                                    </div>`;
                        }
                        else if(i%3==2)
                        {
                            course+=`<div class="col-md-4 col-sm-6 d-flex align-item-stretched">
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
                                                        <b>`+obj['data'][i-1]['sessions']+`</b> Sessions</li>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['project']+`</b> Projects</li>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['puzzle']+`</b> Puzzles</li>
                                                    
                                                </ul>
                                            </div>
                                            <div class="pricingTable-signup">
                                                <a href="#">view more</a>
                                            </div>
                                        </div>
                                    </div>`;
                        }
                        else if(i%3==0)
                        {
                            course+=`<div class="col-md-4 col-sm-6 d-flex align-item-stretched">
                                        <div class="pricingTable w-100  greenColor">
                                            <div class="pricingTable-header">
                                                <i class="material-icons">laptop_mac</i>
                                                
                                            </div>
                                            <h3 class="heading course-heading">`+obj['data'][i-1]['name']+`</h3>
                                            <div class="pricing-content">
                                                <ul>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['sessions']+`</b> Sessions</li>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['project']+`</b> Projects</li>
                                                    <li>
                                                        <b>`+obj['data'][i-1]['puzzle']+`</b> Puzzles</li>
                                                    
                                                </ul>
                                            </div>
                                            <div class="pricingTable-signup">
                                                <a href="#">view more</a>
                                            </div>
                                        </div>
                                    </div>`
                        }

                    }
                    $('#allcourse_table').html(course);
                }
            })     
        })
  
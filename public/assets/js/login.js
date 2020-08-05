$(document).ready(function () {

    $('#cmssubmit').prop('disabled',true);

    $('#cmsusername').keyup(function(){
        var username = $('#cmsusername').val();

        $.get('/checkUsername', {psername : username}, function(result){
            
            if(result.username == username){
                $('#cmsusername').css('border-color', '#d9dadc');
                $('#error').text('');
               

                $('#cmspassword').keyup(function(){
                    var pass = $('#cmspassword').val();
            
                    $.get('/checkPassword', {password : pass}, function(result){
                        
                        if(result.password == pass){
                            $('#cmspassword').css('border-color', '#d9dadc');
                            $('#error').text('');
                            $('#cmssubmit').prop('disabled',false);
                        }
            
                        else{
                            // $('#login-password').css('border-color', 'red');
                            // $('#error').text('Incorrect Password!');
                            $('#cmssubmit').prop('disabled',true);
                        }
                    })
                })
            }

            else{
                $('#cmsusername').css('border-color', 'red');
                $('#error').text('User does not exist!');
                $('#cmssubmit').prop('disabled',true);
            }
        })
    })

    $('#cmspassword').keyup(function(){
        var pass = $('#cmspassword').val();

        $.get('/checkPassword', {password : pass}, function(result){
            
            if(result.password == pass){
                // $('#login-password').css('border-color', '#d9dadc');
                // $('#error').text('');
                // $('#loginbutton').prop('disabled',false);

                $('#cmsusername').blur(function(){
                    var username = $('#cms-username').val();
            
                    $.get('/checkUsername', {username : username}, function(result){
                        
                        if(result.username == username){
                            $('#cmsusername').css('border-color', '#d9dadc');
                            $('#error').text('');
                            $('#cmssubmit').prop('disabled',false);
                        }
            
                        else{
                            //$('#login-username').css('border-color', 'red');
                            $('#cmssubmit').prop('disabled',true);
                        }
                    })
                })
            
            }

            else{
                $('#cmspassword').css('border-color', 'red');
                $('#error').text('User does not exist!');
                $('#cmssubmit').prop('disabled',true);
            }
        })
    })

    $('#cmspassword').focus(function(){
        var pass = $('#cmspassword').val();

        $.get('/checkPassword', {password : pass}, function(result){
            
            if(result.password == pass){
                $('#cmspassword').css('border-color', '#d9dadc');
                $('#error').text('');
                $('#cmssubmit').prop('disabled',false);
            }

            else{
                // $('#login-password').css('border-color', 'red');
                // $('#error').text('Incorrect Password!');
                $('#cmssubmit').prop('disabled',true);
            }
        })
    })

})

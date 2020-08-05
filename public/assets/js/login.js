$(document).ready(function () {

    $('#cms-submit').prop('disabled',true);

    $('#cms-username').keyup(function(){
        var username = $('#cms-username').val();

        $.get('/checkUsername', {psername : username}, function(result){
            
            if(result.username == username){
                $('#cms-username').css('border-color', '#d9dadc');
                $('#error').text('');
               

                $('#cms-password').keyup(function(){
                    var pass = $('#cms-password').val();
            
                    $.get('/checkPassword', {password : pass}, function(result){
                        
                        if(result.password == pass){
                            $('#cms-password').css('border-color', '#d9dadc');
                            $('#error').text('');
                            $('#cms-submit').prop('disabled',false);
                        }
            
                        else{
                            // $('#login-password').css('border-color', 'red');
                            // $('#error').text('Incorrect Password!');
                            $('#cms-submit').prop('disabled',true);
                        }
                    })
                })
            }

            else{
                $('#cms-username').css('border-color', 'red');
                $('#error').text('User does not exist!');
                $('#cms-submit').prop('disabled',true);
            }
        })
    })

    $('#cms-password').keyup(function(){
        var pass = $('#cms-password').val();

        $.get('/checkPassword', {password : pass}, function(result){
            
            if(result.password == pass){
                // $('#login-password').css('border-color', '#d9dadc');
                // $('#error').text('');
                // $('#loginbutton').prop('disabled',false);

                $('#cms-username').blur(function(){
                    var username = $('#cms-username').val();
            
                    $.get('/checkUsername', {username : username}, function(result){
                        
                        if(result.username == username){
                            $('#cms-username').css('border-color', '#d9dadc');
                            $('#error').text('');
                            $('#cms-submit').prop('disabled',false);
                        }
            
                        else{
                            //$('#login-username').css('border-color', 'red');
                            $('#cms-submit').prop('disabled',true);
                        }
                    })
                })
            
            }

            else{
                $('#cms-password').css('border-color', 'red');
                $('#error').text('User does not exist!');
                $('#cms-submit').prop('disabled',true);
            }
        })
    })

    $('#cms-password').focus(function(){
        var pass = $('#cms-password').val();

        $.get('/checkPassword', {password : pass}, function(result){
            
            if(result.password == pass){
                $('#cms-password').css('border-color', '#d9dadc');
                $('#error').text('');
                $('#cms-submit').prop('disabled',false);
            }

            else{
                // $('#login-password').css('border-color', 'red');
                // $('#error').text('Incorrect Password!');
                $('#cms-submit').prop('disabled',true);
            }
        })
    })

})

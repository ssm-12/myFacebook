$(document).ready(
  function(){

    //accessToken can be hardcoded here, Even if you don't provide here it will ask when the page will be loaded
    var accessToken = 'EAACEdEose0cBADZBTUQrIvOpftRZAfqQqQbiZCqtIRDjq3dUgmjQyXWczcRzmGRHjBCUyeXgFzF8yGOcu2uVrSk12MuITB7tb1IElX4ZAES78Jt5WN1ixnmrCmZASQQtt0lZBfqjCo8shlkZBsmi8UPpC2HGskBaDMZB0fmuNByLeeR8agq3xZBgc0qxPbt7e7ZB2egTGLxfTsMwZDZD';
    if(accessToken == '')
    {
        $('#myModal').modal('show');
    }
    else
    {
      getDataFromFB();
    }

    //Function to call the api and get data
    function getDataFromFB(){
      if(accessToken == '')
      {
          accessToken = $('#txtToken').val();
      }

      var fbUrl = "https://graph.facebook.com/me?fields=id,name,address,birthday,education,email,picture.width(316),cover,friends.limit(5)&access_token="  + accessToken;
      //Ajax Call
      $.ajax({url: fbUrl,
          success:
            function(result){
              $(".profileName").text(result.name.toUpperCase());
              if(result.picture != 'undefined')
              {
                $("#imgProfilePic").attr('src',result.picture.data.url);
              }

              //Setting Cover Pic dynamically
              if(result.cover != 'undefined')
              {
                $(".bgimg-1").css('background-image','url(' + result.cover.source + ')');
              }

              //About Section
              if(result.about != 'undefined')
              {
                $("#aboutMe").text(result.about);
              }

              //Education Section
              var introDiv = "";//"<div class=\"well well-sm \" style=\"text-align: center; color: black;\">";
              var education = result.education;
              if(typeof(education) == 'undefined')
              {
                introDiv += "<p>Eduction Details Not Found</p>";
              }
              else {
                for(i=0; i<education.length; i++)
                {
                  if(education[i].type == 'College')
                  {
                    introDiv += "<p>Studied at - <i style=\"color: black\"><b>"+education[i].school.name+"</b></i></p>";
                  }
                  else {
                    introDiv += "<p>Went to - <i style=\"color: black\"><b>"+education[i].school.name+"</b></i></p>";
                  }
                }
              }
              $("#divEducation").append(introDiv);

              //Contact Sectio
              introDiv = "";
              var email = result.email;
              if(typeof(email) == 'undefined')
              {
                introDiv += "<p>Thank you for visiting my page...</p>";
              }
              else {
                introDiv += "<p>My Email ID is <b>"+email+"</b>. You can contact me anytime. Thanks for visiting my page.</p>";
              }
              $("#divContact").append(introDiv);
              console.log(result);
            },
          error:
            function(result){
              alert("Something is interrupting the connection to the server. Please try again later !!!");
            }
      });
    }
    //Getting data from FB API ends here

    //starts here - Get the access token on button click
    $('#btnSubmit').click(
      function(){
        getDataFromFB();
        $('#myModal').modal('hide');
      }
    )
    //Ends here
  }
);

$(document).ready(
  function(){
    //accessToken can be hardcoded here, Even if you don't provide here it will ask when the page will be loaded
    var accessToken = 'AACEdEose0cBADZBTUQrIvOpftRZAfqQqQbiZCqtIRDjq3dUgmjQyXWczcRzmGRHjBCUyeXgFzF8yGOcu2uVrSk12MuITB7tb1IElX4ZAES78Jt5WN1ixnmrCmZASQQtt0lZBfqjCo8shlkZBsmi8UPpC2HGskBaDMZB0fmuNByLeeR8agq3xZBgc0qxPbt7e7ZB2egTGLxfTsMwZDZD';
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

      var fbUrl = "https://graph.facebook.com/me?fields=id,name,picture.width(316),posts{created_time,full_picture,message,story,description,comments.limit(3)},about,photos.limit(6){picture},address,birthday,education,email,cover,friends.limit(5)&access_token="  + accessToken;
      //Ajax Call
      $.ajax({url: fbUrl,
          success:
            function(result){
              //Creating Divs for posts dynamically
              var postData = result.posts.data;
              for(i =0; i< postData.length; i++)
              {
                //Section for displaying all the posts - Starts Here
                var story = typeof(postData[i].story) == "undefined"? "" : " - " + postData[i].story;
                var description = typeof(postData[i].description) == "undefined"? "" : " - " + postData[i].description;
                var message = typeof(postData[i].message) == "undefined"? "" : " - " + postData[i].message;
                var newDiv = "<div class='posts'><div>";
                newDiv += "<h4 style=\"display:inline;\">Posted On: " + result.posts.data[i].created_time.substring(0,10) +"<h5 style=\"color:#999966; display:inline\">" + story +"</h5></h4>";
                if(message != "")
                {
                  newDiv += "<hr><div class=\"well well-sm\"><b>"+postData[i].message+"</b></div>";
                }
                if(description != "")
                {
                    newDiv += "<p>"+ description +"</p>";
                }
                else {
                    newDiv += "<hr>";
                }
                newDiv += "<img src='"+postData[i].full_picture+"' class='img-responsive img-rounded' />";
                newDiv += "</div></div><br>";
                $("#allPosts").append(newDiv);
                //Section for displaying all the posts - Ends Here
              }
              //postData Manipulation ends here

              //Displaying Today details
              var introDiv = "<div class=\"well well-sm \">";
              var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
              var months = [  "JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
              var dt = new Date();
              introDiv += "<p>Day: <i style=\"color: #5975AB\">"+days[dt.getDay()]+"</i></p>";
              introDiv += "<p>Today's Date: <i style=\"color: #5975AB\">"+dt.getDate()+"-"+months[dt.getMonth()]+"-"+dt.getFullYear()+"</i></p>";
              introDiv += "</div>";
              $("#about").after(introDiv);
              //Displaying Education details - Ends here

              //Displaying Welcome Message
              $("#about").append("<p style=\"color: green\">Welcome to the personal feed page of <i><b>"+result.name+"</b></i></p>");
              //console.log(result);

              //Testing
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
              //Testing


            },
          error:
            function(result){
              alert("Something is interrupting the connection to the server. Please try again later !!!\nIt may be because of the token has expired !!!");
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

var youtubeKey = 'AIzaSyA_5mwiVRZJ9ZJaituqv1ngICdL-5F17Pk';
var youtubeResult = "";
var videoId = [];
//Standard call that will just log the data out to the console
/*apis.youtube.getData("snowboarding", 5);
//Using an anonymous function as a callback
apis.youtube.getData("snowboarding", 5, function(success, resp){
    if(success){
        //do stuff with resp
    }
});
*/
$(document).ready(function(){
$('#search').click(function () {
    var searchResult = document.getElementById('query').value;

    apis.youtube.getData(searchResult, '10', function(success, resp){
    videoId = resp;
        console.log("before success call",resp.video[1]);
       if(success){
           apis.youtube.playVideo(resp.video[1].id, 195, 320);
           console.log("success called", resp);
       }
    });
    {

        console.log('YouTube', videoId[1], '195', 320);
        setTimeout(function () {
            apis.youtube.stopVideo()
        }, 20000);

        console.log("YouTube Failed");
    }



});

});
/*function youtubeSearch() {


}*/







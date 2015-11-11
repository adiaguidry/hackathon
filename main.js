var goodreads_key = 'key: orU88aqllNy1ZoJLTTH9Q';
var goodreads_secret = 'secret: 3fnOGoSE7vkY8s96FFeoppDlAiHXMGanqAORgCqwU8M';
var global_result;
var url = null;
var row = '.row1';
var currentarray;
var all_books_array = [];
var romance_books_array = [];
var health_books_array = [];
var positivity_books_array = [];
var passion_books_array = [];
var book_object = function (title, author, summary, image, myarr) {
    var self = this;
    this.image = image;
    this.title = title;
    this.author = author;
    this.summary = summary;
    this.find = function(){
        console.log(myarr);
        console.log(this.title);
        return myarr.indexOf(this);
    }
};
function appendbookobjecttoDOM(book_object, currrow){
    var img_tag = $('<img>');
    var a_tag = $('<a>');
    var h3_tag = $('<h3>').text(book_object.title);
    var div_tag = $('<div>').addClass('col-md-offset-1 col-md-2');
    $(a_tag).append(img_tag);
    $(h3_tag).append(a_tag);
    $(div_tag).append(h3_tag);
    $(div_tag).append(a_tag);
    $(currrow).append(div_tag);
    $(img_tag).attr('src', book_object.image).click(function(){
        console.log(book_object.find())
    });
    $('.book_name').html(book_object.title);
    $('p').html(book_object.author);
    console.log(all_books_array);
}
function twitterUpdate(){
    $('.twitter_well > ul').text('');
    apis.twitter.getData('#booknerdproblems', function(success, response){
        if(success){
            for(var i=0; i<response.tweets.statuses.length -12; i++){
                var tweets = response.tweets.statuses[i].text;
                var li = $('<li>').text(tweets).addClass("tweets");
                $('.twitter_well > ul').append(li);
            }

        }
    })
}
$(document).ready(function () {
    $.ajax({
        dataType: 'json',
        url: 'https://itunes.apple.com/us/rss/toppaidebooks/limit=10/json',
        success: function (result) {
            console.log('AJAX Success function called, with the following result:', result);
            global_result = result;
//traverse object
            var book_array = global_result.feed.entry;
            for (var i = 0; i < book_array.length - 2; i++) {
                var array = all_books_array;
                var book_image = global_result.feed.entry[i]["im:image"][2].label;
                var book_name = book_array[i]["im:name"].label;
                var book_author = book_array[i]["im:artist"].label;
                var book_summary = book_array[i].summary.label;
                var book = new book_object(book_name, book_author, book_summary, book_image, array);
                all_books_array.push(book);
            }
            for (var o = 0; o<all_books_array.length; o++){
                appendbookobjecttoDOM(all_books_array[o],row);
            }
        }
    });
    $('.navi').click(function () {
        switch (this.id) {
            case "st-control-2":
                url = 'https://itunes.apple.com/us/rss/toppaidebooks/limit=10/genre=9031/json';
                row = '.row2';
                currentarray = romance_books_array;
                break;
            case "st-control-3":
                url = 'https://itunes.apple.com/us/rss/toppaidebooks/limit=10/genre=9028/json';
                row = '.row3';
                currentarray = health_books_array;
                break;
            case "st-control-4":
                url = 'https://itunes.apple.com/us/rss/toppaidebooks/limit=10/genre=9028/json';
                row = '.row4';
                currentarray = positivity_books_array;
                break;
            case "st-control-5":
                url = 'https://itunes.apple.com/us/rss/toppaidebooks/limit=10/genre=9028/json';
                row = '.row5';
                currentarray = passion_books_array;
                break;
        }

        $(row).empty();
        $.ajax({
            dataType: 'json',
            url: url,
            success: function (result) {
                console.log('AJAX Success function called, with the following result:', result);
                global_result = result;
//traverse object
                var book_array = global_result.feed.entry;
                for (var i = 0; i < book_array.length - 2; i++) {
                    var array = currentarray;
                    var book_image = global_result.feed.entry[i]["im:image"][2].label;
                    var book_name = book_array[i]["im:name"].label;
                    var book_author = book_array[i]["im:artist"].label;
                    var book_summary = book_array[i].summary.label;
                    var book = new book_object(book_name, book_author, book_summary, book_image, array);
                    currentarray.push(book);
                }
                for (var o = 0; o<currentarray.length; o++){
                    appendbookobjecttoDOM(currentarray[o],row);
                }
            }
        });
    });








    //=============youtube search function with button====================//
    $('#search').click(function () {
        var searchResult = document.getElementById('query').value;

        apis.youtube.getData(searchResult, '10', function (success, resp) {
            videoId = resp;
            console.log("before success call", resp.video[1]);
            if (success) {
                apis.youtube.playVideo(resp.video[1].id, 195, 320);
                console.log("success called", resp);
            }
        });
        {

            console.log('YouTube', videoId[1], '195', 320);
            setTimeout(function () {
                apis.youtube.stopVideo()
            }, 200000);

            console.log("YouTube Failed");
        }


    });
}); //end document ready function//



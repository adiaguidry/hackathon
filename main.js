var goodreads_key = 'key: orU88aqllNy1ZoJLTTH9Q';
var goodreads_secret = 'secret: 3fnOGoSE7vkY8s96FFeoppDlAiHXMGanqAORgCqwU8M';
var global_result;
var audiobook_result;
var url = null;
var row;
var row1 = '.row1';
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
        youtubeSearch(book_object);
        console.log(book_object.find());
    });
    $('.book_name').html(book_object.author);
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
    });
}
$(document).ready(function () {
    $.ajax({
        dataType: 'json',
        url: 'https://itunes.apple.com/us/rss/topaudiobooks/limit=10/json',
        success: function (result) {
            console.log('111AJAX Success function called, with the following result:', result);
//traverse object
             audiobook_result = result;
            var audiobook_array = audiobook_result.feed.entry;
            for (var i = 0; i < audiobook_array.length - 2; i++) {
                var audiobook_image = audiobook_result.feed.entry[i]["im:image"][2].label;
                var audiobook_name = audiobook_array[i]["im:name"].label;
                var audiobook_author = audiobook_array[i]["im:artist"].label;
                //var audiobook_summary = book_array[i].summary.label;
                var img_tag = $('<img>').attr('src', audiobook_image).css('width','100px');
                $('.audiobooks').append(img_tag);
            }
        }
    });

    $.ajax({
        dataType: 'json',
        url: 'https://itunes.apple.com/us/rss/toppaidebooks/limit=10/json',
        success: function (result) {
            console.log('AJAX Success function called, with the following result:', result);
            global_result = result;
            all_books_array=[];
//traverse object
            var book_array = global_result.feed.entry;
            for (var i = 0; i < book_array.length - 2; i++) {
                var array = all_books_array;
                var book_image = global_result.feed.entry[i]["im:image"][2].label;
                var book_name = book_array[i]["im:name"].label;
                var book_author = book_array[i]["im:artist"].label;
                var book_summary = book_array[i].summary.label;
                var book = new book_object(book_name, book_author, book_summary, book_image, array);
                if(all_books_array.length<8){
                    all_books_array.push(book);
                }

            }
            $(row).empty();
            for (var o = 0; o<all_books_array.length; o++){
                appendbookobjecttoDOM(all_books_array[o],row1);
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
        $.ajax({
            dataType: 'json',
            url: url,
            success: function (result) {
                console.log('AJAX Success function called, with the following result:', result);
                global_result = result;
                currentarray=[];
//traverse object
                var book_array = global_result.feed.entry;
                for (var i = 0; i < book_array.length - 2; i++) {
                    var array = currentarray;
                    var book_image = global_result.feed.entry[i]["im:image"][2].label;
                    var book_name = book_array[i]["im:name"].label;
                    var book_author = book_array[i]["im:artist"].label;
                    var book_summary = book_array[i].summary.label;
                    var book = new book_object(book_name, book_author, book_summary, book_image, array);
                    if(currentarray.length<8){
                        currentarray.push(book);
                    }
                }
                $(row).empty();
                for (var o = 0; o<currentarray.length; o++){
                    appendbookobjecttoDOM(currentarray[o],row);
                }
            }
        });
    });

    //=============youtube search function with button====================//

}); //end document ready function//


function youtubeSearch(book_object) {
//        var searchResult = document.getElementById('query').value;

    var searchResult;
    searchResult = book_object.title;

    console.log( "This is the response", searchResult);
    apis.youtube.getData(searchResult, '10', function (success, resp) {

        console.log("before success call", resp.video[0]);
        if (success) {
            apis.youtube.playVideo(resp.video[0].id, 195, 320);
            console.log("success called", resp);
        }
    });
    {
//        console.log('YouTube', videoId[0], '195', 320);
        setTimeout(function () {
            apis.youtube.stopVideo()
        }, 200000);

        console.log("YouTube Failed");
    }

}
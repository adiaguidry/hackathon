var goodreads_key = 'key: orU88aqllNy1ZoJLTTH9Q';
var goodreads_secret = 'secret: 3fnOGoSE7vkY8s96FFeoppDlAiHXMGanqAORgCqwU8M';
var global_result;
var  book_object = function(title, author, summary){
   var self = this;
    this.title = title;
    this.author = author;
    this.summary = summary;
};
var all_books_array =[];


$(document).ready(function () {
        $.ajax({
            dataType: 'json',
            url: 'https://itunes.apple.com/us/rss/toppaidebooks/limit=10/genre=9031/json',
            success: function (result) {
                console.log('AJAX Success function called, with the following result:', result);
                global_result = result;
//traverse object
                var book_array = global_result.feed.entry;
                for(var i=0; i<book_array.length -2; i++){
                    var book_image = global_result.feed.entry[i]["im:image"][2].label;
                    var book_name = book_array[i]["im:name"].label;
                    var book_author = book_array[i]["im:artist"].label;
                    var book_summary = book_array[i].summary.label;
                    var img_tag = $('<img>');
                    var a_tag = $('<a>');
                    var h3_tag = $('<h3>').text(book_name);
                    var div_tag = $('<div>').addClass('col-md-3');
                    $(a_tag).append(img_tag);
                    $(h3_tag).append(a_tag);
                    $(div_tag).append(h3_tag);
                    $(div_tag).append(a_tag);
                    $('.row1').append(div_tag);
                    $(img_tag).attr('src',book_image);
                    $('.book_name').html(book_name);
                    $('p').html(book_author);

                   var book = new book_object(book_name, book_author, book_summary);
                    all_books_array.push(book);
                    console.log(all_books_array);

                    }
                }
        });
        console.log('End of click function');
});
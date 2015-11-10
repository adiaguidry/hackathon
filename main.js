var global_result;

$(document).ready(function () {
        $.ajax({
            dataType: 'json',
            url: 'https://itunes.apple.com/us/rss/toppaidebooks/limit=10/genre=9031/json',
            success: function (result) {
                console.log('AJAX Success function called, with the following result:', result);
                global_result = result;
//traverse object
                var book_array = global_result.feed.entry;
                for(var i=0; i<book_array.length; i++){
                    var book_image = global_result.feed.entry[i]["im:image"][2].label;
                    var book_name = book_array[i]["im:name"].label;
                    var book_author = book_array[i]["im:artist"].label;

                    $('img ').attr('src',book_image);
                    $('.book_name').html(book_name);
                    $('p').html(book_author);
                    }
                }

        });
        console.log('End of click function');
});
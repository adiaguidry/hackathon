

function twitterUpdate(){
    apis.twitter.getData('#booknerdproblems', function(success, response){
        if(success){
            console.log(response);
        }
    }
})

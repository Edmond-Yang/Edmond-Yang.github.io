var Tag , Name , len = 0 ;


function showTime(){
    var time = new Date() ;
    var year = time.getFullYear() ,
        month = time.getMonth() ,
        date = time.getDate() ,
        hour = time.getHours() ,
        minute = time.getMinutes() ,
        sec = time.getSeconds() ,
        day = time.getDay() ;

    var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day] ;

    var minute = minute<10 ? "0" + minute : "" + minute ;

    document.getElementById("time").innerHTML = year + "/" + month + "/" + date + "&nbsp;&nbsp;" + day + "&nbsp;&nbsp;" + hour + ":" + minute ;
    setTimeout("showTime()", 1000*(60-sec-1) ) ;
        
}

function tagUpgrade(){

    Tag = [], Name = [] ;

    $(".div_tag").empty() ;

    var url = "https://spreadsheets.google.com/feeds/cells/1UsrwANTAOWnoDQKXTwchAyGvzjxKPnnd_D2nqrBRQ1A/1/public/values?alt=json" ;

    $.getJSON(url, function(json){

        var key = json.feed.entry ;
        
        $(key).each( function(){

            len = this.gs$cell.row - 2 ;

            if(this.gs$cell.col == "1" || this.gs$cell.row == "1" )
                len = this.gs$cell.row - 2 ;
            else if(this.gs$cell.col == '2')
                Name[len] = this.gs$cell.$t ;
            else 
                Tag[len] = this.gs$cell.$t ;

        }) ;

        for(var i = 0 ; i < len + 1 ; i ++)
            $('.div_tag').append('<div class = "tag"> <h1>' + Tag[i] + "</h1> <p>" + Name[i] + "</p> </div>") ;

    }) ;

    setTimeout( 'tagUpgrade()', 1000* 60* 10) ;

}


function start(){
    showTime() ;
    tagUpgrade() ;
}


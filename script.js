function pasteBlock(name, foto, trackName) {
    var result = `
    <div class="block">
        <img src="${foto}" />
        <div>
        <p class="text1">${trackName}</p>
        <p class="text2">${name}</p>
        </div>
        
    </div>
    `
    return result;
}

function getAPI() {

  
    

    let value = $('#value1').val();

    const API_URL = `https://itunes.apple.com/search?term=${value}`;

    $.ajax({
        url: API_URL,
        type: 'GET',
        crossDomain: true,
        success: function (data) {
            var params = data;
            obj = JSON.parse(params);
            console.log(obj);
            for (var i = 0; i > obj.results.length; i++) {
                console.log(obj.results[i])
            }
            var html = '';
            $.each(obj.results, function (element, value) {
                console.log(element);
                html += pasteBlock(value.artistName, value.artworkUrl100, value.trackName);

            })

            $('#list').html('');
            $('#list').innerHTML = "";
            $('#list').append($.parseHTML(html))



        },
       

    })

}





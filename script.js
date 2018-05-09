function pasteBlock(name, foto, trackName) {
    var result = `
    <div class="block">
        <img src="${foto}" />
        <div class="block-body">
        <p class="text1">${trackName}</p>
        <div class="hr"></div>
        <p class="text2">${name}</p>
        </div>
    </div>
    `
    return result;
}

function getAPI() {

    let value = $('#value1').val();
    let list = $('#list');

    const API_URL = `https://itunes.apple.com/search?term=${value}`;

    $.ajax({
        url: API_URL,
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        success: data => {
                console.log(data);
            if(data.results.length === 0){
                 $('#totalNumber').html('<center>Sorry, no matches found</center>');
                 list.prev().html("");
                 list.html("");
            }
            else {

           

            list.pagination({
                dataSource: data.results,
                pageSize: 9,
                showPageNumbers: false,
                prevText:'<< Prev',
                nextText:'Next >>',

                callback: (response, pagination) => {
                    console.log(response, pagination);
                    $('#totalNumber').html(`<center>Found ${pagination.totalNumber} songs</center>`);
                    let html = "";
                    $.each(response, (index, item) => {
                        html += pasteBlock(item.artistName, item.artworkUrl100, item.trackName);
                    });

                    list.prev().html(html);
                }
            }) }
        },
    })
}
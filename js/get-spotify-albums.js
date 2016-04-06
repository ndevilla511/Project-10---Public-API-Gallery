$(document).ready(function() {
    var spotifyAPI = "https://api.spotify.com/v1/albums";
    var albumIds = {
        ids: "3FExLF5Qj6Y4nzsno0OuCx,0bCAjiUamIFqKJsekOYuRw,2Q14zcXltgFSwNnZQr91GI,3CCkWrqhWcKU7qXK3ooEEo,49LA20VMk65fQyEaIzYdvf,2fGCAYUMssLKiUAoNdxGLx,6LoD5uGEynY4eqstWDFKhg"
    };

    $.ajax({
        method: "GET",
        url: spotifyAPI,
        data: albumIds,
        success: function(response) {
            var albumObjectList = response.albums;
            console.log(response.albums);

            $.each(albumObjectList, function(i, album) {
                var newThumbnailElement = document.createElement('img');
                var trackList = [];
                $(newThumbnailElement).addClass('album-thumbnail');
                $(newThumbnailElement).attr('alt', album.name + ' album art');
                $(newThumbnailElement).css('z-index', -i);
                newThumbnailElement.src = album.images[1].url;

                $.each(album.tracks.items, function(j, track) {
                    trackList.push(track.name);
                }); //end $.each for track names

                $(newThumbnailElement).data({
                    albumArtLarge: album.images[0].url,
                    Album: album.name,
                    Artist: album.artists[0].name,
                    "Release Year": album.release_date.slice(0, 4),
                    "Track List": trackList
                });

                $('.main-content').append(newThumbnailElement);
            }); // end $.each for album
        } // end ajax success function
    }); //end ajax
});//end document ready


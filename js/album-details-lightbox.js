//Lightbox

//Create overlay
var $overlay = $('<div id="overlay"></div>');
var $albumContainer = $('<div id="album-container"></div>');
var $albumInfoContainer = $('<div id="album-info-container"></div>');
var $albumInfo = $('<table id="album-info"></table>');
var $albumArt = $('<img id="album-art-large">');
var $thumbnail = $(".album-thumbnail");
var currentAlbumIndex;

//Navigation arrows
var $rightarrow = $('<a id="rightarrow"><span>></span></a>');
var $leftarrow = $('<a id="leftarrow"><span><</span></a>');

//Append image to album div

$albumContainer.append($albumArt);
$albumInfoContainer.append($albumInfo);
$albumContainer.append($albumInfoContainer);
$overlay.append($albumContainer);

//Append overlay and arrows to body
$('body').append($leftarrow).append($overlay).append($rightarrow);

var getSpotifyAlbumDetails = function(albumKey, albumValue) {
    if (albumKey === "albumArtLarge") {
        $albumArt.attr("src", albumValue);
    } else if (typeof(albumValue) === "string") {
        console.log(albumValue + " will go in the unordered list");

        var newTableRow = document.createElement('tr');
        var newTableData1 = document.createElement('td');
        $(newTableData1).addClass('album-data');
        var newTableData2 = document.createElement('td');
        $(newTableData2).addClass('album-data-value');

        newTableData1.textContent = albumKey;
        newTableData2.textContent = albumValue;
        $(newTableRow).append(newTableData1, newTableData2);
        $albumInfo.append(newTableRow);

    } else {
        var orderedTrackList = document.createElement('ol');
        $(orderedTrackList).addClass('tracklist');
        var newTableRow2 = document.createElement('tr');
        var newTableData3 = document.createElement('td');
        $(newTableData3).addClass('album-data');
        var newTableData4 = document.createElement('td');
        $(newTableData4).addClass('album-data-value');
        $.each(albumValue, function (i, track) {
            var trackListItem = document.createElement('li');
            trackListItem.textContent = track;
            $(orderedTrackList).append(trackListItem);
        });
        newTableData3.textContent = albumKey;
        $(newTableData4).append(orderedTrackList);
        $(newTableRow2).append(newTableData3, newTableData4);
        $albumInfo.append(newTableRow2);
    }
};

//When the thumbnail is clicked on
$('body').on('click', '.album-thumbnail', function(){
    currentAlbumIndex = $(this).index();
    var wikiSearch = $(this).data().Album;
    $.each($(this).data(), getSpotifyAlbumDetails);

    //Show the overlay and arrows.
    $albumArt.fadeIn(200);
    $leftarrow.fadeIn(200);
    $rightarrow.fadeIn(200);
    $overlay.fadeIn(200);
});

//When overlay is clicked
$overlay.click(function() {
    //Hide overlay and arrows
    $leftarrow.fadeOut(200);
    $rightarrow.fadeOut(200);
    $overlay.fadeOut(200, function() {
        $albumArt.attr("src", "");
        $albumInfo.empty();
    });
});


/********Navigation Arrows********/

$rightarrow.click(function() {
    $albumInfo.empty();
    if (currentAlbumIndex === ($('.album-thumbnail').length - 1)) {
        $.each($($('.album-thumbnail')[0]).data(), getSpotifyAlbumDetails);
        currentAlbumIndex = 0;
    } else {
        $.each($($('.album-thumbnail')[currentAlbumIndex + 1]).data(), getSpotifyAlbumDetails);
        currentAlbumIndex += 1;
    }
});


$leftarrow.click(function() {
    $albumInfo.empty();
    if (currentAlbumIndex === 0) {
        $.each($($('.album-thumbnail')[$('.album-thumbnail').length - 1]).data(), getSpotifyAlbumDetails);
        currentAlbumIndex = $('.album-thumbnail').length - 1;
    } else {
        $.each($($('.album-thumbnail')[currentAlbumIndex - 1]).data(), getSpotifyAlbumDetails);
        currentAlbumIndex -= 1;
    }
});

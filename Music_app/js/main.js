/*var songList = ['Badri Ki Dulhania (Title Track)',
    'Humma Song', 'Nashe Si Chadh Gayi', 'The Breakup Song'];
var songName = ['./songs/song1.mp3','./songs/song2.mp3','./songs/song3.mp3','./songs/song4.mp3'];
var artistList = [' Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi','Badshah, Jubin Nautiyal, Shashaa Tirupati','Arijit Singh','Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi'];
var albumList = ['Badrinath ki Dulhania','Ok Jaanu','Befikre','Ae Dil Hai Mushkil'];
var durationList = ['2:56','3:15','2:34','2:29'];*/
var currentSongNumber = 1;
var willLoop = 0;
var willShuffle = 0;
var songs = [{
    'name': 'Badri Ki Dulhania (Title Track)',
    'artist': 'Neha Kakkar, Monali Thakur, Ikka Singh, Dev Negi',
    'album': 'Badrinath ki Dulhania',
    'duration': '2:56',
    'fileName': './songs/song1.mp3',
    'image':'song1.jpg'
},
    {
        'name': 'Humma Song',
        'artist': 'Badshah, Jubin Nautiyal, Shashaa Tirupati',
        'album': 'Ok Jaanu',
        'duration': '3:15',
        'fileName': './songs/song2.mp3',
        'image':'song2.jpg'
    },
    {
        'name': 'Nashe Si Chadh Gayi',
        'artist': 'Arijit Singh',
        'album': 'Befikre',
        'duration': '2:34',
        'fileName': './songs/song3.mp3',
        'image':'song3.jpg'
    },
    {
        'name': 'The Breakup Song',
        'artist': 'Nakash Aziz, Arijit Singh, Badshah, Jonita Gandhi',
        'album': 'Ae Dil Hai Mushkil',
        'duration': '2:29',
        'fileName': './songs/song4.mp3',
        'image':'song4.jpg'
    }];
function toggleSong()
{
    var song=$('audio')[0];
    if (song.paused == true) {
        console.log('Playing');
        $('.play-icon').removeClass('fa-play').addClass('fa-pause');
        song.play();
    } else {
        console.log('Pausing');
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        song.pause();
    }
}
/*function toggleSong() {
 var song = document.querySelector('audio');
 if(song.paused == true) {
 console.log('Playing');
 $('.play-icon').removeClass('fa-play').addClass('fa-pause');
 song.play();
 }
 else {
 console.log('Pausing');
 $('.play-icon').removeClass('fa-pause').addClass('fa-play');
 song.pause();
 }
 }*/

$('.welcome-screen button').on('click', function(){
    var name = $('#name-input').val();
    if (name.length > 2) {
        var message = "Welcome, " + name;
        $('.main .user-name').text(message);
        $('.welcome-screen').addClass('hidden');
        $('.main').removeClass('hidden');
    } else {
        $('#name-input').addClass('error');
    }
});
$('.play-icon').on('click', function() {  //song should toggle on playing and pausing icon as well
    var song = document.querySelector('audio');
    toggleSong();
});
$('body').on('keypress', function(event) {  //Song should toggle on pressing of spacebar as well
    var target = event.target;
    if (event.keyCode == 32 && target.tagName!='INPUT') {
        var song = document.querySelector('audio');
        toggleSong();
    }
});
function fancyTimeFormat(time)  //function to convert milliseconds time formant to minutes one(taken from stack overflow
{
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);//~~ is same as math.floor
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
function updateCurrentTime()
{
    var song = document.querySelector('audio');
    var currentTime = Math.floor(song.currentTime);
    currentTime = fancyTimeFormat(currentTime);
    var duration = Math.floor(song.duration);
    duration = fancyTimeFormat(duration);
    $('.time-elapsed').text(currentTime);
    $('.song-duration').text(duration);
}
function changeCurrentSongDetails(obj) {
    $('.current-song-image').attr('src', 'img/' + obj.image);
    $('.current-song-name').text(obj.name);
    $('.current-song-album').text(obj.artist);
}
$(document).ready(function() {     //can replace with window.onload=function()

    $('.current-song-image').attr('src','img/'+songs[0].image);
    $('.current-song-name').text(songs[0].name);
    $('.current-song-album').text(songs[0].album);

    for(var i = 0;i < songs.length;i++) {
        var obj = songs[i];
        var name = '#song' + (i+1);
        var song = $(name);
        song.find('.song-name').text(obj.name);
        song.find('.song-artist').text(obj.artist);
        song.find('.song-album').text(obj.album);
        song.find('.song-length').text(obj.duration);
        selectSongToPlay(obj.fileName,i+1,obj)
        updateCurrentTime();
        setInterval(function(){
            updateCurrentTime();
        },1000);
    }
    $('#songs').DataTable({
        paging: false
    });

});

/* $('#song1').on('click', function () {
 var audio = $('audio')[0];
 console.log(audio.src);
 var currentsong=audio.src;
 if (currentsong.search(songName[0]) != -1) {
 console.log("1st if");
 toggleSong();
 }
 else {
 audio.src = songName[0];
 console.log("1st else");
 toggleSong();
 }
 });
 $('#song2').on('click', function () {
 var audio = $('audio')[0];
 console.log(audio.src);
 var currentsong=audio.src;
 if (currentsong.search(songName[1]) != -1) {
 console.log("1st if");
 toggleSong();
 }
 else {
 audio.src = songName[1];
 console.log("1st else");
 toggleSong();
 }
 });
 $('#song3').on('click', function () {
 var audio = $('audio')[0];
 console.log(audio.src);
 var currentsong=audio.src;
 if (currentsong.search(songName[2]) != -1) {
 console.log("1st if");
 toggleSong();
 }
 else {
 audio.src = songName[2];
 console.log("1st else");
 toggleSong();
 }
 });
 $('#song4').on('click', function () {
 var audio = $('audio')[0];
 console.log(audio.src);
 var currentsong=audio.src;
 if (currentsong.search(songName[3]) != -1) {
 console.log("1st if");
 toggleSong();
 }
 else {
 audio.src = songName[3];
 console.log("1st else");
 toggleSong();
 }
 });*/
function selectSongToPlay(songName,position,obj) {       //From the list of song,select a song to be played
    var id = '#song' + position;
    $(id).click(function() {
        var audio = $('audio')[0];
        var currentSong = audio.src;
        if(currentSong.search(songName) != -1)
        {
            toggleSong();

        }
        else {
            audio.src = songName;
            toggleSong();
            changeCurrentSongDetails(obj);
        }
    });
};
$('.fa-repeat').on('click',function() {
    $('.fa-repeat').toggleClass('disabled');
    console.log(willLoop);
    willLoop = 1 - willLoop;
});
$('.fa-random').on('click',function() {
    $('.fa-random').toggleClass('disabled');
    willShuffle = 1 - willShuffle;
});
function timeJump() {
    var song = document.querySelector('audio');
    song.currentTime = song.duration - 5;
}
$('audio').on('ended',function() {
    var audio = document.querySelector('audio');
    if(currentSongNumber < songs.length) {
        var nextSongObj = songs[currentSongNumber];
        audio.src = nextSongObj.fileName; // Change Soure
        toggleSong(); // Play Next Song
        changeCurrentSongDetails(nextSongObj); // Update Image
        currentSongNumber = currentSongNumber + 1; // Change State

    }
    else {
        // Stop Playing
        $('.play-icon').removeClass('fa-pause').addClass('fa-play');
        audio.currentTime = 0;
        currentSongNumber=0;

    }
});
//for (var i = 0; i < songName.length ; i++) {
 //   selectSongToPlay(song/Name[i],i+1)
//}

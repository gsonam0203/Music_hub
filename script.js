console.log("spotify");
// initialize the variable
let songIndex = 0;

let audioElement = new Audio('songs/1.mp3');

let masterPlay = document.getElementById('masterPlay');

let myProgressBar =  document.getElementById('myProgressBar');

let gif =  document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName :"Let me love you" , filePath :"songs/1.mp3", coverPath:"cover/istockphoto-1203512641-170667a.jpg"},
    {songName :"Shaamat" , filePath :"song/2.mp3", coverPath:"cover/shaamat.jpg"},
    {songName :"Pasoori" , filePath :"songs/3.mp3", coverPath:"cover/Pasoori-Punjabi-2022-20220203181058-500x500.jpg"},
    {songName :"Dhokha" , filePath :"songs/4.mp3", coverPath:"cover/dhokha.avif"},
    {songName :"Barbadiyan" , filePath :"songs/5.mp3", coverPath:"cover/barbaadiyan.webp"},
    {songName :"Ae Dil Hai Mushkil" , filePath :"songs/6.mp3", coverPath:"cover/AeDilHaiMushkilCDAudioImage-310x300.jpg"},
    {songName :"Medley" , filePath :"song/7.mp3", coverPath:"cover/medley.jpg"}
    
]

songItems.forEach((element ,i)=> {
    //console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

//audioElement.play();
// handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity=1;
    }
    else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    gif.style.opacity=0;
    }
    
})
// listen to the event
audioElement.addEventListener('timeupdate',()=>{
    //console.log('timeupdate');
    // update seek bar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    //console.log(progress);
    myProgressBar.value = progress;
})


// to change the song time so that with incresing song seek bar also change
 myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
 })
 
 const makeAllPlays = ()=>{
   
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
   
 }

 Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' ,(e)=>{
           //console.log(e.target);
           makeAllPlays();
           songIndex = parseInt(e.target.id);
           e.target.classList.remove('fa-circle-play');
           e.target.classList.add('fa-circle-pause');
           audioElement.src = `songs/${songIndex+1}.mp3`;
           masterSongName.innerText = songs[songIndex].songName;
           audioElement.currentTime = 0;
           audioElement.play();
           gif.style.opacity = 1;
           masterPlay.classList.remove('fa-circle-play');
           masterPlay.classList.add('fa-circle-pause');
    })

    
 })

 document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
 })

 document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
 })
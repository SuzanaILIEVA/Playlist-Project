const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButon = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton =document.getElementById('play')
const playListButton = document.getElementById('playlist')

const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//sira
let index

//dongu 
let loop = true

//sarki listesi 
const songsList = [ 
    {   // js obje yapısı
        name : 'Rüyamda Buluttum',
        link : "assets/Can Bonomo - Rüyamda Buluttum (ft. Demet Evgar) [Official Vi.mp3",
        artist: "Can Bonomo",
        image : 'assets/can-demet-600x315h.jpg'
    },
    {
        name : 'Alaz Alaz',
        link : "assets/Buray - Alaz Alaz.mp3",
        artist: "Buray",
        image : 'assets/buray.jpeg'
    },
     {
        name : 'Love Me Back',
        link : "assets/Can Bonomo - Love Me Back - Turkey - Live - Grand Final - 2012 Eurovision Song Contest.mp3",
        artist: "Can Bonomo",
        image : 'assets/can .jpg'
    }, 
    {
        name : 'Senden Daha Güzel',
        link : "assets/Duman - Senden Daha Guzel.mp3",
        artist: "Duman",
        image : 'assets/duman .jpg'
    },
     {
        name : 'Düldül',
        link : "assets/Mabel Matiz - Düldül (feat. Melike Şahin).mp3",
        artist: "Mabel Matiz",
        image : 'assets/matız.jpg'
    },
     {
        name : 'Buzdan Şato',
        link : "assets/MODEL - Buzdan Şato.mp3",
        artist: "Model",
        image : 'assets/model_1.jpg'
    },

]

//sarkı atama
const setSong = (arrayIndex)=>{
    let {name, link, artist, image} = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

// sarkinin toplam suresi 
    audio.onloadeddata = ()=>{
        maxDuration.innerText = timeFormatter(audio.duration) //240
    }
    
    playAudio()

 // baslangicta bej oynatma listesi gizli geliyor
    playListContainer.classList.add('hide')
}

// ^ ikona basinca oynatma listesi gorunur oluyor
    playListButton.addEventListener('click',()=>{
    playListContainer.classList.remove('hide')
})


// zaman tutucu 
setInterval (()=>{
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
},1000)
 
//tekrar tiklanildiginda
repeatButon.addEventListener('click',()=>{
    if (repeatButon.classList.contains('active')){
        repeatButon.classList.remove('active') //aktifse donguyu kapat tekrar et
        audio.loop =false
        console.log('tekrar kapatildi ')

    }
    else{
        repeatButon.classList.add('active')
        audio.loop = true
        console.log('tekrar acildi ')
    }
})

//shuffle (karistirici) tiklandiginda
shuffleButton.addEventListener('click', ()=>{
    if (shuffleButton.classList.contains('active')){
        shuffleButton.classList.remove('active')
        loop = false
        console.log('karistirici kapali')
    }
    else{
        shuffleButton.classList.add('active')
        loop = true
        console.log('karistirici acik ')
    }
})

// ilerleme cubugu 
progressBar.addEventListener('click',(event)=>{
    let coordStart = progressBar.getBoundingClientRect().left
    console.log(coordStart)

    let coordEnd = event.clientX
       console.log(coordEnd)

    console.log(progressBar.offsetWidth)
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth

    currentProgress.style.width = progress * 100 + "%"
    audio.currentTime = progress * audio.duration

    
})


//sarkiyi oynat  fonksiyonu
const playAudio = () =>{
    audio.play()

    playButton.classList.add('hide')
    pauseButton.classList.remove('hide')
}


// sarkiyi durdur fonksiyonu

const pauseAudio = ()=>{
    audio.pause()

    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')

} 


//sonraki sarki 
const nextSong = () => {
    if (loop){ // dongu aciksa
        if( index == (songsList.length - 1 )){
            index = 0
        }
        else{
            index = index + 1
        }
        setSong(index)
    }
    else{ 
        // karistirici aciksa
        let randIndex = Math.floor(Math.random() * songsList.length)
        setSong(randIndex)
    }
}

// onceki sarki 
const previousSong = ()=>{
    if(index > 0 ){
        pauseAudio()
        index = index - 1 
    }
    else{
        index = songsList.length - 1 
    }
    setSong(index)
}

// sarki bittiginde sonrakine gecmesi icin
audio.onended = ()=>{
    nextSong()
}

// zamananlarini  duzenleme

const timeFormatter = (timeInput)=>{
    let minute = Math.floor(timeInput / 60 )
    minute = minute < 10 ? '0' + minute : minute

    let second = Math.floor(timeInput % 60 )
    second = second < 10 ? '0' + second : second //! eger saniye 10 dan kucukse basina 0 koy degilse kendisi, ? ve : if else anlaminda
    
    return`${minute}:${second}`
    
}

// calarken sarki suresi ilerledikce gecen sureyi gosteriyor
audio.addEventListener('timeupdate', ()=>{
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

// sarki listesini olustur
const initPlaylist = () =>{
    for (const i in songsList) {
          playListSongs.innerHTML += `
          <li class="playlistSongs" onclick="setSong(${i})">
          <div class="playlist-image-container">
          <img src="${songsList[i].image}"/>
          </div>
          <div class="playlist-song-details">
          <span id="playlist-song-name">
          ${songsList[i].name}
          </span>
          <span id="playlist-song-artist-album">
          ${songsList[i].artist}
          </span>
         </div>
        </li>`
        }
    }

  

//oynata tiklanildiginda 

playButton.addEventListener("click", playAudio)

//dura tiklanildiginda
pauseButton.addEventListener("click", pauseAudio)

//next sonrakine gec tiklanildiginda
nextButton.addEventListener('click', nextSong)

// oncekine tiklandiginda

prevButton.addEventListener('click', previousSong)



window.onload = ()=>{
    index = 0
    setSong(index)
    pauseAudio()
    initPlaylist()
}














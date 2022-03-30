const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Diable and enable
function toggleButton(){
    button.disabled = !button.disabled;
}

// function test(){
//    
// }
// test();
// Tell Me joke
function tellMe(joke){
    // console.log('tell Me: ',joke);
    VoiceRSS.speech({
       key: '9e9104fcb44a43b8a7d5c9b5c352ab5c',
       src: joke,
       hl: 'en-us',
       v: 'Linda',
       r: 0, 
       c: 'mp3',
       f: '44khz_16bit_stereo',
       ssml: false,
   });
}
// Get jokes from joke api
async function getJokes(){
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup){
            joke = `${data.setup} ... ${data.delivery}`;
        }else{
            joke = data.joke;
        }
// Call tell function
        tellMe(joke);
//  Button disabled
        toggleButton(); 
    }catch(error){
        console.log("whoops", error)
    }
}
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);
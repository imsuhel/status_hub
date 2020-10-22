

window.history.pushState({page: 1}, "", "");
window.onpopstate = function(event) {
    if(event){
        window.location.href = './index.html';
        // Code to handle back button or prevent from navigation
    }
}

const wallpaperElm = document.getElementById('wallpaper');
const textStatusElm = document.getElementById('textStatus');
const hindiJokeElm = document.getElementById('hindiJoke');
const imgQuoteElm = document.getElementById('imgQuote');
// below are the elements from home page
const home_joke = document.getElementById('home_joke');
const home_img = document.getElementById('home_img');
const home_quote = document.getElementById('home_quote');

// all addEventListener decleared here
wallpaperElm.addEventListener('click', wallpaperCall);
textStatusElm.addEventListener('click', textStatusCall);
hindiJokeElm.addEventListener('click', hindiJokeCall);
imgQuoteElm.addEventListener('click', imgQuoteCall);

// code to show data on home page
function homeText() {
  homeTextapi("https://type.fit/api/quotes");
  // api call here
  async function homeTextapi(textapiUrl) {
    fetch(textapiUrl).then(function(response) {
      return response.json();
    }).then(function(textapiData) {
      // console.log(textapiData);
      let textStatusHtml = '';
      for (let i = 0; i <= textapiData.length; i++) {
        let randomObj = Math.floor(Math.random() * textapiData.length)
        let obj = textapiData[randomObj];
        if (i === 18) {
          break;
        }
        // console.log(obj);
        let textHtml = `
                    <div class="card" data-aos="fade-right" data-aos-duration="1000">
                      <div class="status-card">
                        <span id="${i++}" class="status-desc">
                          ${obj.text}
                        </span>
                        <div id="test" class="d-flex justify-content-between align-items-center mt-4">
                          <button onclick="copyMsg(this)" class="btn waves-effect waves-light copy-btn">Copy</button>
                        </div>
                      </div>
                    </div>
                `
        textStatusHtml += textHtml;
      }
      home_quote.innerHTML = textStatusHtml;
    }).catch((error) => console.log(error));
  } //async function close here
};
window.onload = homeText();


function homeJoke() {
  homeJokeapi("https://gofugly.in/api/content/31");
  // api call here
  async function homeJokeapi(jokeUrl) {
    fetch(jokeUrl).then(function(response) {
      return response.json();
    }).then(function(jokeApiData) {
      let jokeObj = jokeApiData.result;
      let jokeHtml = '';
      for (i = 0; i < jokeObj.length; i++) {
        let randomJoke = Math.floor(Math.random() * jokeObj.length);
        let obj = jokeObj[randomJoke];
        // console.log(obj);
        let jokeData = obj;
        if (i === 18) {
          break;
        }
        // console.log(jokeData);
        let jokeformat = `
              <div id="${i++}" class="card" data-aos="fade-right" data-aos-duration="1000">
                <div class="status-card">
                  <span class="status-desc">
                    ${jokeData.joke}
                  </span>
                  <div class="d-flex justify-content-between align-items-center mt-4">
                    <button onclick="copyMsg(this)" class="btn waves-effect waves-light copy-btn">Copy</button>
                  </div>
                </div>
              </div>
            `
        jokeHtml += jokeformat;
      }
      home_joke.innerHTML = jokeHtml;
    }).catch((error) => console.log(error));
  } //async function close here
};
window.onload = homeJoke();


function homeImg() {
  const imgApi = '18081533-eacd5d1aa06f8c1de22a2bd00';
  homeImgapi(`https://pixabay.com/api/?key=${imgApi}&q=forest&image_type=photo&orientation=vertical&per_page=200 &pretty=true`)
  async function homeImgapi(img) {
    fetch(img).then(function(response) {
      return response.json();
    }).then(function(imgApiDate) {
      let mainImg = imgApiDate.hits;
      let textStatusHtml = '';
      for (let i = 0; i < mainImg.length; i++) {
        let randomImg = Math.floor(Math.random() * mainImg.length);
        let imgObj = mainImg[randomImg];
        if (i === 12) {
          break;
        }
        // console.log(imgObj);
        let textHtml = `
                <div class="col-md-2 col-6" data-aos="fade-right" data-aos-duration="1000">
                  <a href="${imgObj.largeImageURL}" download="${imgObj.largeImageURL}" target="_blank">
                    <div class="wallpaper-card">
                      <img src="${imgObj.webformatURL}" alt="${imgObj.tags}" class="img-fluid fetch-img">
                      <div class="d-flex justify-content-center p-1 rounded">
                        <a href="${imgObj.largeImageURL}" download="${imgObj.largeImageURL}" target="_blank">
                          <i class="fa fa-arrow-down"> </i>
                        </a>
                      </div>
                    </div>
                  </a>
                </div>`
        textStatusHtml += textHtml;
      }
      home_img.innerHTML = textStatusHtml;
    }).catch((error) => console.log(error));
  } //async close ehre
}
window.onload = homeImg();

// code to show data on home page close here



// copyMsg functino star tehre
function copyMsg(elem) {
  let status_card = elem.parentNode.parentNode;
  let status_desc = status_card.querySelector('.status-desc');
  elem.innerHTML = 'copied';
  var range = document.createRange();
  range.selectNode(status_desc);
  window.getSelection().removeAllRanges(); // clear current selection
  window.getSelection().addRange(range); // to select text
  document.execCommand("copy");
  window.getSelection().removeAllRanges(); // to deselect
  // console.log(range);
}

// add class and change backrond of banner
function changeElements(get_name, className) {
  document.getElementById('main').classList.add("main_close");
  document.getElementById('details').classList.add("details_show");
  document.getElementById('banner-bg').classList.add(className);
  document.getElementById('heading').innerHTML = get_name;
}




// wallpaperCall function here
function wallpaperCall() {
  document.getElementById('details_data').classList.remove('card-columns');
  document.getElementById('details_data').classList.add('row');
  const api = '18081533-eacd5d1aa06f8c1de22a2bd00';
  changeElements('Latest Wallpapers', 'wallpaper');
  document.getElementById('wallpaper_list').classList.add('details_show');
  let imgSrc = `https://pixabay.com/api/?key=${api}&q=world&image_type=photo&orientation=vertical&per_page=200 &pretty=true`;
  wallpaperapiCall(imgSrc);
  // api call herer
  async function wallpaperapiCall(imgUrl) {
    fetch(imgUrl).then(function(response) {
      return response.json();
    }).then(function(imgApiDate) {
      let mainImg = imgApiDate.hits;
      let textStatusHtml = '';
      for (let i = 0; i < mainImg.length; i++) {
        let randomImg = Math.floor(Math.random() * mainImg.length);
        let imgObj = mainImg[randomImg];
        // console.log(imgObj);
        let textHtml = `
              <div class="col-md-2 col-6" data-aos="fade-right" data-aos-duration="800">
                <a href="${imgObj.largeImageURL}" download="${imgObj.largeImageURL}" target="_blank">
                  <div class="wallpaper-card">
                    <img src="${imgObj.webformatURL}" alt="${imgObj.tags}" class="img-fluid fetch-img">
                    <div class="d-flex justify-content-center p-1 rounded">
                      <a href="${imgObj.largeImageURL}" download="${imgObj.largeImageURL}" target="_blank">
                        <i class="fa fa-arrow-down"> </i>
                      </a>
                    </div>
                  </div>
                </a>
              </div>`
        textStatusHtml += textHtml;
      }
      document.getElementById('details_data').innerHTML = textStatusHtml;
    }).catch((error) => console.log(error));
  } //async close ehre

  // grab all the wallpaper name buttn and addEventListener to them
  let btnGroup = document.querySelector('.btns-group');
  let buttons = btnGroup.querySelectorAll('.btn');
  buttons.forEach(function(currentBtn) {
    currentBtn.addEventListener('click', wallpalerName);
  });
  // function for all the addEventListener of wallpalerName buttons
  function wallpalerName(e) {
    let wallpapersName = e.target.value;
    document.getElementById('heading').innerHTML = wallpapersName + " Wallpaper";
    wallpaperapiCall(`https://pixabay.com/api/?key=${api}&q=${wallpapersName}&image_type=photo&orientation=vertical&per_page=200 &pretty=true`);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  }

} //wallpaperCall close here

// textStatusCall function herer
function textStatusCall() {
  changeElements('Text Status', 'textstatus');
  textapiCall("https://type.fit/api/quotes");
  // api call here
  async function textapiCall(textapiUrl) {
    fetch(textapiUrl).then(function(response) {
      return response.json();
    }).then(function(textapiData) {
      // console.log(textapiData);
      let textStatusHtml = '';
      for (let i = 0; i <= textapiData.length; i++) {
        let randomStatus = Math.floor(Math.random() * textapiData.length);
        let obj = textapiData[randomStatus];
        // console.log(obj)
        let textHtml = `
                    <div class="card" data-aos="fade-right" data-aos-duration="1000">
                      <div class="status-card">
                        <span id="${i++}" class="status-desc">
                          ${obj.text}
                        </span>
                        <div id="test" class="d-flex justify-content-between align-items-center mt-4">
                          <button onclick="copyMsg(this)" class="btn waves-effect waves-light copy-btn">Copy</button>
                        </div>
                      </div>
                    </div>
                `
        textStatusHtml += textHtml;
      }
      document.getElementById('details_data').innerHTML = textStatusHtml;
    }).catch((error) => console.log(error));
  } //async function close here

} //textStatusCall function close here

// hindiJokeCall function herer
function hindiJokeCall() {
  changeElements('Hindi Jokes', 'hindijoke');
  jokeapiCall('https://gofugly.in/api/content/3');
  // api call here
  async function jokeapiCall(jokeUrl) {
    fetch(jokeUrl).then(function(response) {
      return response.json();
    }).then(function(jokeApiData) {
      let jokeObj = jokeApiData.result;
      let jokeHtml = '';
      for (i = 0; i < jokeObj.length; i++) {
        let randomJoke = Math.floor(Math.random() * jokeObj.length);
        let jokeData = jokeObj[randomJoke];
        // console.log(jokeData);
        let jokeformat = `
              <div id="${i++}" class="card" data-aos="fade-right" data-aos-duration="1000">
                <div class="status-card">
                  <span class="status-desc">
                    ${jokeData.joke}
                  </span>
                  <div class="d-flex justify-content-between align-items-center mt-4">
                    <button onclick="copyMsg(this)" class="btn waves-effect waves-light copy-btn">Copy</button>
                  </div>
                </div>
              </div>
            `
        jokeHtml += jokeformat;
      }
      document.getElementById('details_data').innerHTML = jokeHtml;
    }).catch((error) => console.log(error));
  }
} //hindiJokeCall close ehre






// imgQuoteCall function herer
function imgQuoteCall() {
  const api = '18081533-eacd5d1aa06f8c1de22a2bd00';
  let imgSrc = `https://pixabay.com/api/?key=${api}&q=quotes&image_type=photo&orientation=vertical&per_page=100 &pretty=true`;
  changeElements('Image Quotes', 'imgQuote');
  // api call herer
  async function wallpaperapiCall(imgUrl) {
    fetch(imgUrl).then(function(response) {
      return response.json();
    }).then(function(imgApiDate) {
      let mainImg = imgApiDate.hits;
      let textStatusHtml = '';
      for (let i = 0; i < mainImg.length; i++) {
        let randomImgStatus = Math.floor(Math.random() * mainImg.length);
        let imgObj = mainImg[randomImgStatus];
        // console.log(imgObj);
        let textHtml = `
              <div class="col-md-2 col-6" data-aos="fade-right" data-aos-duration="1000">
                <div class="wallpaper-card">
                  <img src="${imgObj.webformatURL}" alt="${imgObj.tags}" class="img-fluid fetch-img">
                  <div class="d-flex justify-content-center p-1 rounded">
                    <a href="${imgObj.largeImageURL}" download="${imgObj.largeImageURL}" target="_blank">
                      <i class="fa fa-arrow-down"> </i>
                    </a>
                  </div>
                </div>
              </div>
          `
        textStatusHtml += textHtml;
      }
      document.getElementById('details_data').innerHTML = textStatusHtml;
    }).catch((error) => console.log(error));
  } //async close ehre
  wallpaperapiCall(imgSrc);
}

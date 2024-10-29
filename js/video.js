const loadvideos = (datavideo = "") => {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${datavideo}`
  )
    .then((res) => res.json())
    .then((data) => displayvideos(data.videos))
    .catch((error) => console.log("sorry somting is error", error));
};

const loaddetails = async (videoId) => {
  const stepx = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  );
  const data = await stepx.json();
  const sand = displaydetails(data.video);
};

const displaydetails = (video) => {
  const dateilscontainer = document.getElementById("modal-container");
  dateilscontainer.innerHTML = `
  <img src="${video.thumbnail}" />
  <p>${video.description}
  `;
  // document.getElementById("modal-show").onclick();
  document.getElementById("customModal").showModal();
};

const displayvideos = (videos) => {
  const videosContainer = document.getElementById("videos");
  document.getElementById("videos").innerHTML = "";

  if (videos.length == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `<div class="flex flex-col gap-5 justify-center items-center min-h-[300px] text-center ">
        <img src="asstes/icon.png" />
        <h1 class = "font-bold text-2xl"> Oops!! Sorry, There is no <br> content here </h1>
        </div>`;
  } else {
    videosContainer.classList.add("grid");
  }

  function maketime(number) {
    const step1 = parseInt(number / 3600);
    const step2 = parseInt(number % 3600);
    return `${step1}hrs ${step2} min ago`;
  }
  videos.forEach((video) => {
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
    <figure class="h-[200px] rounded-xl relative">
    <img src=${
      video.thumbnail
    } alt="Shoes" class="w-full h-full object-cover" />
    ${
      video.others.posted_date?.length == 0
        ? ""
        : `<span class="absolute right-2 bottom-2 bg-black rounded text-white text-x ">${maketime(
            video.others.posted_date
          )}</span>`
    }
        
        
        </figure>
        <div class="flex px-0 py-5 gap-5">
        
        <div>
        <img
        src=${video.authors[0].profile_picture}
        
        class="w-10 h-10 rounded-full object-cover" />
        </div>
        <div class="">
        <h1 class="font-bold">${video.title}</h1>
        <div class="flex gap-2  items-center ">
        <h1>${video.authors[0].profile_name}</h1>
        ${
          video.authors[0].verified === true
            ? `<img src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" class="w-5 h-5 rounded-full object-cover" />`
            : ``
        }
        </div>  
        <p> <button id"details-btn" onclick="loaddetails('${
          video.video_id
        }')" class="btn btn-error btn-sm">Details</button></p>
        </div>
        </div>
        `;

    videosContainer.append(card);
  });
};

const removeClass = () => {
  const step1 = document.getElementsByClassName("category-active");

  for (let btn of step1) {
    btn.classList.remove("active");
  }
};

const category1 = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeClass();
      const activebtn = document.getElementById(`btn-${id}`);
      activebtn.classList.add("active");
      displayvideos(data.category);
    })
    .catch((error) => console.log("sorry somting is error", error));
};

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log("sorry somting is error", error));
};

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="category1(${item.category_id})" class="btn category-active" >${item.category} </button>
    `;

    categoriesContainer.appendChild(buttonContainer);
  });
};

document.getElementById("search-in").addEventListener("keyup", (e) => {
  loadvideos(e.target.value);
});

loadCategories();

loadvideos();

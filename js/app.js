const loadNewPortal = async () => {
   const url = ('https://openapi.programming-hero.com/api/news/categories');
   try {
      const res = await fetch(url);
      const data = await res.json();
      return data.data.news_category
   }
   catch (err) {
      console.log(err);
   }
}

const showMenu = async () => {
   const newsCategory = await loadNewPortal();
   const categoryList = document.getElementById('category-list')
   newsCategory.forEach(category => {
      const li = document.createElement('li');
      li.classList.add('mractive');
      li.style.listStyle = 'none';
      li.style.cursor = 'pointer';
      li.innerHTML = `<a onclick="loadCategory(${category.category_id})">${category.category_name}</a>`;
         categoryList.appendChild(li);
   })
   
   }
showMenu();

// toggler spinner function
const spinnerLoading = isLoading => {
   const loadSpiner = document.getElementById('loading-spinner');
   if (isLoading) {
      loadSpiner.classList.remove('d-none');
   } else {
      loadSpiner.classList.add('d-none');
   }
}
const loadCategory = async (categoryId) => {
   const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
   // start spinner
      spinnerLoading(true);
      try {
         const res = await fetch(url);
         const data = await res.json();
         disPlayNews(data.data);
      }
      catch (err) {
         console.log(err);
      }
   }
   //home page a all data load korte nicer function ta active rakhte hobe
   loadCategory(08);

const disPlayNews = async (datas) => {
   const newsCategory = await loadNewPortal();
   const demoId = document.getElementById('demo');
   demoId.innerHTML = `${datas.length} items found from this Category`;
   const cardContainer = document.getElementById('card-container');
   cardContainer.innerHTML = '';
   datas.sort((a, b) => {
      return b.rating.number - a.rating.number;
   });
   datas.forEach(data => {
      // console.log(data);
      const { author, thumbnail_url, image_url, details, title, rating, _id } = data;
      const { img, name, published_date } = author;
      const { number } = rating;
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'mb-3');
      cardDiv.innerHTML = `
      <div class="row g-0 text-center text-lg-start">
         <div class="col-md-2 p-2 ">
            <img class="img-fluid" src="${thumbnail_url}" class="img-fluid rounded" alt="...">
         </div>
         <div class="col-md-10">
            <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details.slice(0, 200)}</p>
            <p class="card-text">${details.length > 200 ? details.slice(200, 250) + '...' : details}</p>
            <div class="d-flex justify-content-between align-items-center pt-4">
               <div class="d-flex align-items-center">
                  <img class="my-img me-3" src="${img}" alt="...">
                  <div>
                     <span>${name === 'system' ? 'No Name' : name}</span><br>
                     <span>${published_date ? published_date : 'No date'}</span>
                  </div>
               </div>   
               <div><i class="fa-solid fa-eye"></i> ${number}M</div>
               <div>
               <button data-bs-toggle="modal" data-bs-target="#showModal" class="border-0 px-3" onclick="showDetails('${_id}')"><i class="fa-solid fa-arrow-right text-primary"></i></button>
               </div>
            </div>
            </div>
         </div>
      </div>`;
      cardContainer.appendChild(cardDiv);
   });
   // stop spinner
   spinnerLoading(false);
}


const showDetails = async (showId) => {
   const url = `https://openapi.programming-hero.com/api/news/${showId}`;
   try {
      const res = await fetch(url);
      const data = await res.json();
      displayModal(data.data[0]);
   }
   catch (err) {
      console.log(err);
   }
}

const displayModal = async (singleData) => {
   const { author, thumbnail_url, image_url, details, title, rating, _id } = singleData;
   const { img, name, published_date } = author;
   const cardTitle = document.getElementById('showModalLabel');
   cardTitle.innerHTML = `${title}`
   const modalContainer = document.getElementById('modal-body');
   modalContainer.innerHTML = `
      <img class="img-fluid" src="${image_url}">
      <h5></h5>
      <p>${details.slice(0, 100)}</p>
      <p>${details.length > 100 ? details.slice(0, 100) + '...' : details}</p>
      <div class="d-flex align-items-center">
         <img class="my-img me-3" src="${img}" alt="...">
         <div>
            <span>${name === 'system' ? 'No Name' : name}</span><br>
            <span>${published_date ? published_date : 'No date'}</span>
         </div>
      </div> 
   `;
   console.log('hello modal');
}

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
      li.style.listStyle = 'none';
      li.style.cursor = 'pointer';
      li.innerHTML = `<a onclick="loadCategory(${category.category_id})">${category.category_name}</a>`;
      categoryList.appendChild(li);
      // console.log(category.category_name);
   })
}
showMenu();
const loadCategory = async (categoryId) => {
   const url = ``
   console.log(categoryId);
}
const productsContainer = document.getElementById("productsContainer");
const loadMoreButton = document.getElementById("loadMoreButton");
const inputSearch = document.getElementById("inputSearch");
const openCartButton = document.getElementById("openCartButton");
const cart = document.getElementById("cart");
const closeBtn =document.getElementById("close_btn");
const addToBasketContainer = document.createElement('div');
const eachBasketContent = document.getElementById('eachBasketContent');

const LIMIT = 8;
let total = 0;
let currentSkip = 0;

fetchProductList(currentSkip);

loadMoreButton.addEventListener("click", () => {
  currentSkip += LIMIT;
  if (currentSkip >= total) {
    loadMoreButton.hidden = true;
  } else {
    fetchProductList(currentSkip);
  }
});
inputSearch.addEventListener("input", () => {
  currentSkip = 0;
  fetchProductList(currentSkip, inputSearch.value);
  productsContainer.innerHTML = "";
});
function disableButton() {
  loadMoreButton.disabled = true;
  loadMoreButton.textContent = "Loading...";
}

function enableButton() {
  loadMoreButton.disabled = false;
  loadMoreButton.textContent = "Load more";
}

function fetchProductList(skip, q = "") {
  disableButton();
  fetch(
    `https://dummyjson.com/products/search?limit=${LIMIT}&skip=${skip}&q=${q}`
  )
    .then((res) => res.json())
    .then((data) => {
      total = data.total;
      let html = "";
      for (let product of data.products) {
        html += getProductHTML(product);
      }
      productsContainer.insertAdjacentHTML("beforeend", html);
      const addToCard = document.querySelectorAll(".addToCard");
      const eachProduct =document.querySelector('#eachProduct');
    })
    .finally(() => {
      enableButton();
    });
}

function getProductHTML({ title, price, thumbnail }) {
  return `
    <div 
      class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
    >
      <div
        class="flex items-end justify-end h-56 w-full bg-cover"
        style="background-image: url('${thumbnail}');"
      >
        <button 
          class="addToCard p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500" 
        >
          <svg
            class="h-5 w-5 pointer-events-none"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="px-5 py-3">
        <h3 class="text-gray-700 uppercase">${title}</h3>
        <span class="text-gray-500 mt-2">$${price}</span>
      </div>
    </div>
  `;
}
// function basketProducts({title, thumbnail}){
//   return `<div id="eachProduct" class="flex">
//   <img
//     class="h-20 w-20 object-cover rounded"
//     src="${thumbnail}"
//     alt=""
//   />
//   <div class="mx-3">
//     <h3 class="text-sm text-gray-600">${title}</h3>
//     <div class="flex items-center mt-2">
//       <button
//         class="text-gray-500 focus:outline-none focus:text-gray-600"
//       >
//         <svg
//           class="h-5 w-5"
//           fill="none"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           stroke-width="2"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
//           ></path>
//         </svg>
//       </button>
//       <span class="text-gray-700 mx-2">2</span>
//       <button
//         class="text-gray-500 focus:outline-none focus:text-gray-600"
//       >
//         <svg
//           class="h-5 w-5"
//           fill="none"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           stroke-width="2"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//         </svg>
//       </button>
//     </div>
//   </div>
// </div>
// <span class="text-gray-600">${price}</span>
// </div>`
// }

productsContainer.addEventListener("click", function (event) {
  if (event.target.matches(".addToCard")) {
    console.log('each product',eachProduct)
    addToBasketContainer.innerHTML=eachProduct;
    eachBasketContent.innerHTML = addToBasketContainer;


  }
});

openCartButton.addEventListener("click", function () {
  cart.classList.remove("translate-x-full");
  cart.classList.remove("ease-out");
  cart.classList.add("translate-x-0");
  cart.classList.add("ease-in");
  // cart.classList.add("translate-x-full");
  // cart.classList.add("ease-out");
  // cart.classList.remove("translate-x-0");
  // cart.classList.remove("ease-in");
});

// const addToCard = document.getElementById("addToCard");
// console.log("cardOpen", addToCard);

// addToCard.addEventListener("click", () => {
//   console.log("click");

// });

closeBtn.addEventListener("click", function(){
  cart.classList.remove("translate-x-0");
  cart.classList.remove("ease-in");
  cart.classList.add("translate-x-full");
  cart.classList.add("ease-out");


})
const loadData = async (dataLimit) => {
  preLoader(true);
  const url = 'https://openapi.programming-hero.com/api/ai/tools';
  const res = await fetch(url);
  const data = await res.json();
  getAllData(data.data.tools, dataLimit);
};
const getAllData = (data, dataLimit) => {
  const featuresContainer = document.getElementById('features-container');
  const showMoreButton = document.getElementById('show-more-btn');

  const eachData = (data) => {
    data.forEach((element) => {
      const feature = document.createElement('div');
      feature.classList.add('col-md-4', 'mb-5');
      feature.innerHTML = `
            <div class="card">
              <div  class="p-2 rounded">
                <img src="${element.image}" class="card-img-top p-3 rounded" alt="..."/>
              </div>
              <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>${element.features[0]}</li>
                    <li>${element.features[1]}</li>
                    <li>${element.features[2]}</li>
                </ol>
                <hr class="m-0"/>
              </div>
              <div class="p-3 row ">
                <div class="col-md-7">
                    <h4>${element.name}</h4>
                    <p>
                        <i class="fa-regular fa-calendar-days"></i>
                        <span>${element.published_in}</span>
                    </p>
                </div>
                <div class="col-md-5  text-end opacity-50 details-button" style="cursor:pointer;">
                <button
                type="button"
                class="btn btn-primary rounded-circle text-white bg-primary fs-3 "
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onclick="featureDetails('0'+${element.id})"
              >
               <i
                class="fa-solid fa-arrow-right-long "
                ></i>
              </button>
                </div>
              </div>
            </div>
        `;

      featuresContainer.appendChild(feature);
      preLoader(false);
    });
  };
  if (data.length > 6 && dataLimit === false) {
    showMoreButton.classList.remove('d-none');
    eachData(data.slice(0, 6));
    const showLess = document.getElementById('show-less-btn');
    showLess.classList.add('d-none');
  } else {
    eachData(data);
    showMoreButton.classList.add('d-none');
  }
};

// show more
document.getElementById('show-more').addEventListener('click', function () {
  const container = document.getElementById('features-container');
  container.innerHTML = '';
  const showLess = document.getElementById('show-less-btn');
  showLess.classList.remove('d-none');
  loadData(true);
});
// show less
document.getElementById('show-less').addEventListener('click', function () {
  const container = document.getElementById('features-container');
  container.innerHTML = '';
  loadData(false);
});
// Pre Loader
const preLoader = (loader) => {
  const shoButton = document.getElementById('show-more-btn');
  const showLess = document.getElementById('show-less');
  const preloader = document.getElementById('preloader');
  if (loader === true) {
    preloader.classList.remove('d-none');
    shoButton.classList.add('d-none');
    showLess.classList.add('d-none');
  } else {
    preloader.classList.add('d-none');
    shoButton.classList.remove('d-none');
    showLess.classList.remove('d-none');
  }
};
loadData(false);

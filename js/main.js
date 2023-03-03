const loadData = async (dataLimit) => {
  preLoader(true);
  const url = 'https://openapi.programming-hero.com/api/ai/tools';
  const res = await fetch(url);
  const data = await res.json();
  getAllData(data.data.tools, dataLimit);
};
const getAllData = (data, dataLimit) => {
  preLoader(false);
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
  const preloader = document.getElementById('preloader');
  if (loader === true) {
    preloader.classList.remove('d-none');
  } else {
    preloader.classList.add('d-none');
  }
};

loadData(false);
// modal
const featureDetails = async (id) => {
  const convertInt = parseInt(id);
  const ckDown = (id) => (convertInt >= 10 ? convertInt : id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${ckDown(id)}`;
  const res = await fetch(url);
  const data = await res.json();
  getFeaturesData(data.data);
};
const getFeaturesData = (data) => {
  addDetailsData(data);
};
const addDetailsData = (data) => {
  const detailsContainer = document.getElementById('details-container');
  detailsContainer.innerHTML = `
   <div class="col-md-6 px-4">
      <div class="description">
        <h4>${data.description}</h4>
      </div>
      <div class="row  my-3 justify-content-around">
        <div class="col-md-3 rounded text-white bg-primary opacity-75 pt-1 text-center">
          <span>${modalCost(data?.pricing[0]?.price, data?.pricing)}</span>
          <span>${modalCost(data?.pricing[0]?.plan, data?.pricing)}</span>
        </div>
        <div class="col-md-3 rounded text-white bg-primary opacity-75 pt-1 text-center">
          <span>${modalCost(data?.pricing[1]?.price, data?.pricing)}</span>
          <span>${data?.pricing[1]?.plan}</span>
        </div>
        <div class="col-md-3 rounded text-white bg-primary opacity-75 pt-1 text-center">
          <span>${data?.pricing[2]?.price}</span>
          <span>${data?.pricing[2]?.plan}</span>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
        <p class="fs-4">Features</p>
          <ul>
            <li style="font-size:14px;">${data.features['1'].feature_name}</li>
            <li style="font-size:14px;">${data.features['2'].feature_name}</li>
            <li style="font-size:14px;">${data.features['3'].feature_name}</li>
          </ul>
        </div>
        <div class="col-md-6">
        <p class="fs-4">Integrations</p>
        <ul>
            <li style="font-size:14px;">${integrations(
              undefined,
              undefined,
              data.integrations[0],
              data.integrations[0]
            )}</li>
            <li style="font-size:14px;">${integrations(
              undefined,
              undefined,
              data.integrations[1],
              data.integrations[1]
            )}</li>
            <li style="font-size:14px;">${integrations(
              undefined,
              undefined,
              data.integrations[2],
              data.integrations[2]
            )}</li>
          </ul>        
        </div>
      </div>
    </div>  



   
   
   </div>
   <div class="col-md-6 px-4 row">
     
       <img src="${data.image_link[0]}" class="card-img-top" alt="..." />
       <div class="card-body text-bottom align-self-center">
         <h6 class="card-title fs-4">${data.input_output_examples[0].input}</h6>
         <p class="card-text mt-3">
         ${inputOutput(data.input_output_examples[0].output)}
         </p>
       
     </div>
   </div>
   `;
  console.log(data.input_output_examples[0].output);
  function modalCost(data) {
    if (data === 'No cost' || data === '0') {
      return 'Free of Cost/';
    } else {
      return data;
    }
  }
};
function integrations(integrations1, integrations2, integrations3, mainData) {
  if (
    integrations1 === undefined &&
    integrations2 === undefined &&
    integrations3 === undefined
  ) {
    return 'No Data Found';
  } else {
    return mainData;
  }
}
function inputOutput(givenData) {
  if (
    givenData ===
    "function reverseString(str) {\n return str.split('').reverse().join('');\n}"
  ) {
    return 'No! Not Yet! Take a break!!!';
  } else {
    return givenData;
  }
}
featureDetails('01');

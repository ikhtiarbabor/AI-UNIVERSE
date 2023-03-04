const featureDetails = async (id) => {
  const convertInt = parseInt(id);
  const ckDown = (id) => (convertInt >= 10 ? convertInt : id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${ckDown(id)}`;
  const res = await fetch(url);
  const data = await res.json();
  addDetailsData(data.data);
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
            <span>${
              data.pricing == null
                ? 'Free of Cost/'
                : modalCost(data.pricing[0].price)
            }</span>
            <span>${
              data.pricing == null ? 'Basic' : modalCost(data.pricing[0].plan)
            }</span>
          </div>
          <div class="col-md-3 rounded text-white bg-primary opacity-75 pt-1 text-center">
            <span>${
              data.pricing == null
                ? 'Free of Cost/'
                : modalCost(data.pricing[1].price)
            }</span>
            <span>${
              data.pricing == null ? 'Pro' : modalCost(data.pricing[1].plan)
            }</span>
          </div>
          <div class="col-md-3 rounded text-white bg-primary opacity-75 pt-1 text-center">
            <span>${
              data.pricing == null
                ? 'Contact us for pricing Enterprise'
                : modalCost(data.pricing[2].price)
            }</span>
            <span>${
              data.pricing == null ? '' : modalCost(data.pricing[2].plan)
            }</span>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
          <p class="fs-4">Features</p>
            <ul>
              <li style="font-size:14px;">${
                data.features == null
                  ? 'No data Found'
                  : data.features['1'].feature_name
              }</li>
              <li style="font-size:14px;">${
                data.features == null
                  ? 'No data Found'
                  : data.features['2'].feature_name
              }</li>
              <li style="font-size:14px;">${
                data.features == null
                  ? 'No data Found'
                  : data.features['3'].feature_name
              }</li>
            </ul>
          </div>
          <div class="col-md-6">
          <p class="fs-4">Integrations</p>
          <ul>
              <li style="font-size:14px;">${
                data.integrations == null
                  ? 'No Data Found'
                  : integrations(
                      undefined,
                      undefined,
                      data.integrations[0],
                      data.integrations[0]
                    )
              }</li>
              <li style="font-size:14px;">${
                data.integrations == null
                  ? 'No Data Found'
                  : integrations(
                      undefined,
                      undefined,
                      data.integrations[1],
                      data.integrations[1]
                    )
              }</li>
              <li style="font-size:14px;">${
                data.integrations == null
                  ? 'No Data Found'
                  : integrations(
                      undefined,
                      undefined,
                      data.integrations[2],
                      data.integrations[2]
                    )
              }</li>
            </ul>        
          </div>
        </div>
      </div>  
     </div>
     <div class="col-md-6 px-4 row">
         <div class="text-end"><i style="display:${
           data.accuracy.score == null ? 'none' : 'inline-block'
         }">
         <span id="accuracy-btn" class="text-white p-2 rounded" style="position:relative; right:5px; background:#f97316; top:40px; }" >${
           data.accuracy == null ? '' : data.accuracy.score * 100 + '% accuracy'
         }</span>
         </i>
         
              <img src="${
                data.image_link == null ? 'IMAGE' : data.image_link[0]
              }" class="card-img-top" alt="..." style=""/>
              
          </div>
         <div class="card-body text-bottom align-self-center">
           <h6 class="card-title fs-4">${
             data.input_output_examples == null
               ? 'No! Not Yet! Take a break!!!'
               : data.input_output_examples[0].input
           }</h6>
           <p class="card-text mt-3">
           ${inputOutput(
             data.input_output_examples == null
               ? ''
               : data.input_output_examples[0].output
           )}
           </p>
       </div>
     </div>
     `;
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

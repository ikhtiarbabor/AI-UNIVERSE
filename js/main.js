const loadData = async () => {
  const url = 'https://openapi.programming-hero.com/api/ai/tools';
  const res = await fetch(url);
  const data = await res.json();
  getAllData(data.data.tools);
};
const getAllData = (data) => {
  const featuresContainer = document.getElementById('features-container');
  data.forEach((element) => {
    const feature = document.createElement('div');
    feature.classList.add('col-md-4', 'mb-5');
    feature.innerHTML = `
        <div class="card">
          <div style="height: 18vw;" class="p-2 rounded">
            <img src="${element.image}" class="card-img-top p-3 rounded" alt="..."/>
          </div>
          <div class="card-body">
            <h5 class="card-title">Features</h5>
            <ol>
                <li>${element.features[0]}</li>
                <li>${element.features[1]}</li>
                <li>${element.features[2]}</li>
            </ol>
            <hr />
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
    `;
    featuresContainer.appendChild(feature);
  });
};

loadData();

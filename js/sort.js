document.getElementById('sort-by-date').addEventListener('click', function () {
  const arrayData = async () => {
    preLoader(true);
    const url = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(url);
    const data = await res.json();
    const arrayData01 = data.data.tools;
    arrayData01.sort(function (a, b) {
      return new Date(b.published_in) - new Date(a.published_in);
    });
    const nothingContainer = document.getElementById('features-container');
    nothingContainer.innerHTML = '';
    getAllData(arrayData01);
  };

  arrayData();
});

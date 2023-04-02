export function normalisedImages(array) {
  return array.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    })
  );
}

export function checkLastPage(instance) {
  return Math.ceil(instance.totalHits / instance.per_page) === instance.page;
}

export function onScroll(container) {
  const { height: cardHeight } =
    container.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

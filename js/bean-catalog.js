(function () {
  const catalogUrl = "beans/catalog.json";

  function withVersion(src) {
    if (!src || src.includes("?v=")) return src;
    return `${src}?v=${window.MIRU_ASSET_VERSION || Date.now()}`;
  }

  function activeBeans(beans) {
    return beans.filter((bean) => bean.active);
  }

  async function loadBeanCatalog() {
    const version = window.MIRU_ASSET_VERSION || Date.now();
    const response = await fetch(`${catalogUrl}?v=${version}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Unable to load ${catalogUrl}`);
    }
    return response.json();
  }

  function renderBeanGallery(container, beans) {
    container.innerHTML = "";

    if (!beans.length) {
      container.innerHTML = "<p>No coffee origins are currently available.</p>";
      return;
    }

    beans.forEach((bean) => {
      const link = document.createElement("a");
      link.href = `beans.html?code=${encodeURIComponent(bean.code)}`;
      link.title = bean.name;

      const image = document.createElement("img");
      image.src = withVersion(bean.image);
      image.alt = bean.name || bean.code;

      link.appendChild(image);
      container.appendChild(link);
    });
  }

  function renderBeanThumbnails(container, beans, onSelect) {
    container.innerHTML = "";

    if (!beans.length) {
      container.innerHTML = "<p>No coffee origins are currently available.</p>";
      return;
    }

    beans.forEach((bean) => {
      const image = document.createElement("img");
      image.src = withVersion(bean.image);
      image.dataset.code = bean.code;
      image.alt = bean.name || bean.code;
      image.title = bean.name || bean.code;
      image.addEventListener("click", () => onSelect(bean));
      container.appendChild(image);
    });
  }

  window.MiruBeanCatalog = {
    activeBeans,
    load: loadBeanCatalog,
    renderGallery: renderBeanGallery,
    renderThumbnails: renderBeanThumbnails,
    withVersion
  };
})();

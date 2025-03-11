(function() {
  const pages = ["index.html", "sayfa1.html", "sayfa2.html", "sayfa3.html", "sayfa4.html"];
  let currentPage = window.location.pathname.split("/").pop() || "index.html";
  const currentIndex = pages.indexOf(currentPage);

  document.getElementById("next")?.addEventListener("click", function(e){
    e.preventDefault();
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      window.location.href = pages[currentIndex + 1];
    }
  });

  document.getElementById("former")?.addEventListener("click", function(e){
    e.preventDefault();
    if (currentIndex > 0) {
      window.location.href = pages[currentIndex - 1];
    }
  });
})
();

$(document).ready(function() {
  const ASSETS = "assets/";

  const elem = document.querySelector(".content.group");
  const iso = new Isotope(elem, {
    layoutMode: "vertical",
    itemSelector: "li"
  });

  const attachFilterEvent = (clickSelector, filtereeSelector) => {
    const filterEl = document.querySelector(clickSelector);
    $(filterEl).on("click", function(e) {
      e.preventDefault();
      iso.arrange({ filter: filtereeSelector });
    });
  };

  attachFilterEvent('.filter-projects', '.projects');
  attachFilterEvent('.filter-edu', '.edu');
  attachFilterEvent('.filter-links', '.links');

  const hoverImages = () => {
    if ($(window).width() < 500) {
      $("#ref-image").hide();
      return;
    }
  };

  // Preload images
  $("[data-image]").each(function(i, el){
    var thisImg = $(el).data("image");
    var image = new Image();
    image.src = ASSETS + thisImg;
  });

  $(window).on("mousemove", function(e){
    const x = e.clientX;
    const y = e.clientY;
    $("#ref-image").css({
      left: x + 5 + "px",
      top: y - 155 + "px"
    });
  });

  $('li').on("mouseenter", function(e) {
    const $this = $(this);
    const imgURL = $this.data("image");
    $("#ref-image").css("background-image", "url(" + ASSETS + imgURL + ")").show();
  });

  $('li').on("mouseleave", function(e) {
    $("#ref-image").css("background-image", "").hide();
  });

  iso.arrange({filter: '.projects'});
  hoverImages();
});

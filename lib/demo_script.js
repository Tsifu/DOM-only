$l(".add-li").on("click", () => {
  color = $l.getRandomColor();
  $l(".test-ul").append(`<li style="background-color: ${color}">${color}</li>`);
  $l(".sc-detail").attr("src", "./assets/detail/append.png");
});

$l(".change-li").on("click", () => {
  $l("li").html("Boom!");
  $l(".sc-detail").attr("src", "./assets/detail/html.png");
});

$l(".clear-li").on("click", () => {
  $l("li").empty();
  $l(".sc-detail").attr("src", "./assets/detail/empty.png");
});

$l(".change-attr").on("click", () => {
  if ($l(".img-div").find(".moon").htmlElements.length === 1) {
    $l(".moon").attr("src", "./assets/img/half_moon.jpeg");
    $l(".img-div").children().removeClass('moon');
  } else {
    $l(".img-div").children().attr("src", "./assets/img/full_moon.jpg");
    $l(".img-div").children().addClass('moon');
  }
  $l(".sc-detail").attr("src", "./assets/detail/change_button.png");
});

$l(".remove-li").on("click", () => {
  $l("ul").children().remove();
  $l(".sc-detail").attr("src", "./assets/detail/remove.png");
});

$l(".xhr-request").on("click", () => {
  $l.ajax({
    url: "http://api.giphy.com/v1/gifs?api_key=dc6zaTOxFJmzC&limit=1&ids=UkhHIZ37IDRGo",
    success(data){
      const imageUrl = data['data'][0]['images']['fixed_width']['url'];
      $l('.giphy').html(`<img src=${imageUrl}>`);
    }
  });

  $l(".sc-detail").attr("src", "./assets/detail/change_button.png");
});

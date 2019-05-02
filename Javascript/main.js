//grab the value in the search bar
$(document).ready(function() {
  $("#serachForm").on("submit", e => {
    var searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});
//ajax call and return the value
function getMovies(searchText) {
  $.ajax({
    url: "https://www.omdbapi.com/?t=" + searchText + "&apikey=trilogy",
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
      var movies = response.data.Search;
      var output = "";
      $.each(movies, (index, movie) => {
        output += `
        <div class="col-md-3">
        <div class="well text-center">
        <img src="${movie.Poster}">
        <h5>${movie.Title}</h5>
        <a onclick="movieSelected('${
          movie.imdbID
        }')" class="btn btn-primary" href="#">Movie Detail</a>
        `;
      });
      $("#movies").html(output);
    })

    .catch(err) => {
      console.log(err);
    });
}
function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}
function getMovie() {
  var movieId = sessionStorage.getItem("movieId");
  $.ajax({
    url: "https://www.omdbapi.com/?i=" + movieId + "&apikey=trilogy",
    method: "GET"
  })
    .then(function(response) {
      console.log(response);
      var movie = response.data;
      var output = `
      <div class="row">
      <div class="col-md-4">
      <img src="${movie.Poster}" class="thumbnail">
      </div>
      <div class="col-md-8">
      <h2>${movie.Title}</h2>
      <ul class="list-group">
      <li class="list-group-item">Genre: ${movie.Genre}</li>
      <li class="list-group-item">Released: ${movie.Released}</li>
      <li class="list-group-item">Rated: ${movie.Rated}</li>
      <li class="list-group-item">IMDB Rating: ${movie.imdbRating}</li>
      <li class="list-group-item">Director: ${movie.Director}</li>
      <li class="list-group-item">Writer: ${movie.Writer}</li>
      <li class="list-group-item">Actors: ${movie.Actors}</li>
      </ul>
      </div>
      </div>

      <div class="row">
      <div class="well">
      <h3>Plot</h3>
      ${movie.Plot}
      <hr>
      <a href="http://imdb.com/title/${
        movie.imdbID
      }" target="_blank" class="btn btn-primary">View IMDB</a>
      <a href="index.html" class="btn btn-default">Go Back To Search</a>
      </div>
      </div>
      `;
      $("#movie").html(output);
    })

    .catch(err => {
      console.log(err);
    });
}

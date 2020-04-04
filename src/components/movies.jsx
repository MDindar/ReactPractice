import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import {paginate} from "../utils/pagination";
export default class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage:1
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({currentPage:page});
  };

  render() {
    const { length: count } = this.state.movies.length;
    const {pageSize, currentPage , movies :allMovies}= this.state;
    if (count === 0) {
      return <p>There are no Movies in the databes</p>;
    }
    const movies = paginate(allMovies,currentPage,pageSize)
    return (
      <React.Fragment>
        <p>showing {count} movies in database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genere</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie._id}>
                <th>{movie.title}</th>
                <th>{movie.genre.name}</th>
                <th>{movie.numberInStock}</th>
                <th>{movie.dailyRentalRate}</th>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemCount={this.state.movies.length}
          pageSize={pageSize}
          onPageChange={this.handlePageChange}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

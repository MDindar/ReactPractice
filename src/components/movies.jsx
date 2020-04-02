import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
export default class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handleLike = movie => {
    console.log(movie);
    const movies =[...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] ={...movies[index]};
    movies[index].liked = !movies[index].liked;
    this.setState({movies});
  };

  render() {
    const { length: count } = this.state.movies.length;
    if (count === 0) {
      return <p>There are no Movies in the databes</p>;
    }

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
            {this.state.movies.map(movie => (
              <tr key={movie._id}>
                <th>{movie.title}</th>
                <th>{movie.genre.name}</th>
                <th>{movie.numberInStock}</th>
                <th>{movie.dailyRentalRate}</th>
                <td>
                  <Like liked={movie.liked} onClick={()=>this.handleLike(movie)} />
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
      </React.Fragment>
    );
  }
}

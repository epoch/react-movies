import React from 'react';
import axios from 'axios'
import Movie from './Movie'
// import logo from './logo.svg';
// import './App.css';


class App extends React.Component {

  state = {
    movies: [],
    searchTerm: '',
    isFetching: false
  }

  handleSubmit = e => {
    e.preventDefault()
    // what do I want to do?
    // make a request to omdb api
    // we need a module - axios
    // get movie title from input box - how?
    const { searchTerm } = this.state 
    const url = `http://omdbapi.com/?s=${searchTerm}&apikey=2f6435d9`

    axios.get(url)
      .then(res => {
        this.setState({
          movies: res.data.Search,
          isFetching: false
        })
      })

    this.setState({ isFetching: true })
  }

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    })
  }

  reMovie = id => {
    const { movies } = this.state
    this.setState({
      movies: movies.filter(movie => movie.imdbID !== id)
    })
  }

  renderMovie = (movie) => (
    <div onClick={() => this.reMovie(movie.imdbID)} key={movie.imdbID}>
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
    </div>
  )
  
  render() {
    const { movies, isFetching } = this.state
    
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit} action="">
          <input onChange={this.handleChange} type="text"/>
          <button>search</button>
        </form>
        <section>
          {
            isFetching ? 
              <p>loading...</p> : 
              movies.map(movie => (
                <Movie data={movie} onRemove={this.reMovie} />
              ))
          }
        </section>
      </div>
    )
  }
}

export default App;

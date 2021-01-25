import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
    this.fetchDog = this.fetchDog.bind(this);
  }

  componentDidMount() {
    this.fetchDog();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.data.message.includes("terrier")) {
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    localStorage.setItem("dogURL", JSON.stringify(this.state.data.message));
    const dogBreed = this.state.data.message.split("/")[4];
    alert(dogBreed);
  }

  fetchDog() {
    fetch("http://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(result => this.setState({ data: result }));
  }

  render() {
    if (this.state.data === "") return "Loading...";
    return (
      <main>
        <h3>Doguíneos</h3>
        <button type="button" onClick={this.fetchDog}>Novo Doguíneo</button>
        <section>
          <img src={this.state.data.message} alt="Imagem aleatória de um cachorro" />
        </section>
      </main>
    );
  }
}

export default App;

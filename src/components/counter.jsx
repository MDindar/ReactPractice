import React, { Component } from "react";

export default class Counter extends Component {
  state = {
    count: 0,
    imageUrl: "https://picsum.photos/200",
    tags: ["tag1", "tag2", "tag3"]
  };

  render() {
    return (
      <React.Fragment>
        <img src={this.state.imageUrl} alt="asdf" />
        <br />
        <span className={this.getBadgeCalsses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.handleIncrement()}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <br />
        {this.state.tags.length === 0 && "There is no tag"}
        {this.renderTags()}
      </React.Fragment>
    );
  }

  handleIncrement = () => {
    console.log(this);
    this.setState({ count: this.state.count + 1 });
  };

  renderTags() {
    return (
      <ul>
        {this.state.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }

  getBadgeCalsses() {
    let classes = "badge m-2 badge-";
    classes += this.state.count === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { count } = this.state;
    return count === 0 ? <h1>Zero</h1> : <h1>{count}</h1>;
  }
}

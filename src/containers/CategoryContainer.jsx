import React, { Component } from "react";
import SearchDisplay from "../components/SearchDisplay.jsx";
import Map from "../components/Map.jsx";
import debounce from "lodash.debounce";
import "../css/CategoryPage.css";

class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    // setTimeout(this.props.search(), 10000);

    // this.props.search();
    // if (this.props.categoryPage && this.props.current < 50) {
    window.onscroll = debounce(() => {
      this.props.moveMap();
      // console.log("scrolling");
      // if (this.props.current >= 50) return;

      // if (
      //   document.documentElement.scrollTop >
      //   document.documentElement.scrollHeight - window.innerHeight - 2
      // ) {
      // setTimeout(this.props.search(), 1000);

      // }
    });
    // }
    // window.addEventListener("loadend", this.props.search());
  }

  render() {
    // render map and list of businessess from searchResults arr in the state
    let search = null;
    let searchDisplayResults = this.props.searchResults.map((element, i) => {
      // console.log('search results', props.searchResults);
      // console.log("ELEMENT -> ", element);
      return (
        <div id="list">
          <button
            className="list-item searchItem"
            key={i}
            onClick={() =>
              this.props.selectVenue(
                element.id,
                element.name,
                element.url,
                element.image,
                element.location,
                element.phone,
                element.latitude,
                element.longitude
              )
            }
          >
            <img src={`${element.image}`} />
            {element.name}
            <br />
            {element.category}
            <br />
            {element.location.address1} {element.location.address2}
            <br />
            {element.location.city}, {element.location.state}{" "}
            {element.location.zip_code}
            {element.phone}
            <br />
            Wait Time: {element.waitTime}
            {/* // need to grab the unique id provided from the yelp api data search results that are saved in state. need to use it to save into our database */}
            {/* <button onClick={() => this.props.selectVenue(element.id, element.name, element.url, element.image, element.location, element.phone)}>Select</button> */}
          <div
            className="favbtn"
            id={
              this.props.favorites.indexOf(element) === -1
                ? null
                : "background-red"
            }
            onClick={(e) => {
              this.props.addToFavorites(e, element);
            }}
          >
            Favorite
          </div>
          </button>
        </div>
      );
    });

    if (this.props.categoryPage) {
      search = (
        <div id="category-body">
          <SearchDisplay searchDisplayResults={searchDisplayResults} />
          <Map
            name={this.props.mapName}
            venueLocation={this.props.venueLocation}
            latitude={this.props.latitude}
            longitude={this.props.longitude}
          />
        </div>
      );
    }

    return (
      <div>
        <section className="search-bar">
          <img
            id="logo-pic-category"
            src="https://image.flaticon.com/icons/png/512/876/876569.png"
          />
          <input
            type="input"
            id="searchInput"
            name="searchInput"
            placeholder="Business or Category"
            onChange={this.props.setInputValue}
          />
          <input
            type="input"
            id="location"
            name="location"
            placeholder="Location"
            onChange={this.props.setInputValue}
          />
          <input type="button" id="searchButton" onClick={this.props.search} />
          <input
            type="button"
            id="headerFavsBtn"
            value="My Favorites"
            onClick={this.props.headerFavsBtn}
          />
        </section>
        {search}
      </div>
    );
  }
}

export default CategoryContainer;

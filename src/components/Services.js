import React, { Component } from "react";
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: "free CockTails",
        info:
          "I am just writting anything for the sake of some content, Thank You for Reading!!!!"
      },
      {
        icon: <FaHiking />,
        title: "Endless hiking",
        info:
          "I am just writting anything for the sake of some content, Thank You for Reading!!!!"
      },
      {
        icon: <FaShuttleVan />,
        title: "Free Shuttle",
        info:
          "I am just writting anything for the sake of some content, Thank You for Reading!!!!"
      },
      {
        icon: <FaBeer />,
        title: "Strongest Beer",
        info:
          "I am just writting anything for the sake of some content, Thank You for Reading!!!!"
      }
    ]
  };
  render() {
    return (
      <section className="services">
        <Title title="Services" />
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return (
              <article key={index} className="service">
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    );
  }
}

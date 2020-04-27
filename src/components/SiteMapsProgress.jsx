import React, { Component } from 'react';

import 'react-circular-progressbar/dist/styles.css';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";

class SiteMapProgress extends Component{
    
    render(){
        function Example(props) {
            return (
              <div style={{ marginBottom: 80 }}>
                <hr style={{ border: "2px solid #ddd" }} />
                <div style={{ marginTop: 30, display: "flex" }}>
                  <div style={{ width: "30%", paddingRight: 30 }}>{props.children}</div>
                  <div style={{ width: "70%" }}>
                    <h3 className="h5">{props.label}</h3>
                    <p>{props.description}</p>
                  </div>
                </div>
              </div>
            );
          }
        
        const {name,URL, percent} = this.props;
        return(
            <div style={{ padding: "40px 40px 40px 40px" }}>
                <p>Name: {name}</p>
                <p>URL: {URL}</p>
                <Example label="Processing Report">
                    <CircularProgressbar
                        value={percent}
                        strokeWidth={50}
                        styles={buildStyles({
                        strokeLinecap: "butt"
                        })}
                    />
                </Example>
                
            </div>
        );
    }
}

export default SiteMapProgress;
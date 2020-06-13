import React, { Component } from "react";

export default class DropdownBox extends Component {
    constructor(props) {
        super(props);
        this.state = { IsOpen: false };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleUpt = this.handleUpt.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.setState({ IsOpen: false });
        }
    }
    handleUpt(open) {
        this.setState({ IsOpen: !open });
    }
    render() {
        return (
            <div
                className={`dropdown${this.state.IsOpen ? " show" : ""}`}
                ref={this.setWrapperRef}>
                <div style={{ float: "right" }}>
                    <button
                        type="button"
                        className="btn"
                        role="button"
                        data-toggle="dropdown"
                        onClick={this.handleUpt.bind(null, this.state.IsOpen)}>
                        <i className="fas fa-ellipsis-h"></i>
                    </button>
                </div>
                <div
                    className={`dropdown-menu${
                        this.state.IsOpen ? " show" : ""
                    }`}>
                    <button className="dropdown-item">Action</button>
                    <button className="dropdown-item">Another action</button>
                    <button className="dropdown-item">
                        Something else here
                    </button>
                </div>
            </div>
        );
    }
}

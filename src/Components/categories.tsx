import React from "react";

function Categories() {
    const num: number = 2;
    return (
        <div className="row categoriesContainer bg-secondary">
            <div className="btn-group-sm btn-group-secondary hideOverflow" role="group">
                <button type="button" className="btn btn-secondary">All</button>
                <button type="button" className="btn btn-secondary">Category one</button>
                <button type="button" className="btn btn-secondary">Category two</button>
                <button type="button" className="btn btn-secondary">Category three</button>
                <button type="button" className="btn btn-secondary">Category four</button>
                <button type="button" className="btn btn-secondary">Category five</button>
                <button type="button" className="btn btn-secondary">Category six</button>
                <button type="button" className="btn btn-secondary">Category seven</button>
                <button type="button" className="btn btn-secondary">Category eight</button>
                <button type="button" className="btn btn-secondary">Category nine</button>
                <button type="button" className="btn btn-secondary">Category ten</button>
                <button type="button" className="btn btn-secondary">Category eleven</button>
                <button type="button" className="btn btn-secondary">Category twelve</button>
            </div>
        </div>
    );
}

export default Categories;

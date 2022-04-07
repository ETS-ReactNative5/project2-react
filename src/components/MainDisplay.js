import React from 'react'

function MainDisplay() {
  return (
    <React.Fragment>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={require('../local-data/images/vanda-orchid.jpg')} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={require('../local-data/images/p1.jpg')} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={require('../local-data/images/p2.jpg')} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={require('../local-data/images/p3.jpg')} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={require('../local-data/images/p4.jpg')} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={require('../local-data/images/p5.jpg')} className="d-block w-100" alt="..." />
          </div>
          <div id='text-wrapper'>
          <h1>The Daily Orchid</h1>
          <h3>Lightweight Orchid Database</h3>
      </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
        {/* <div id='text-wrapper'>
          <h1>The Daily Orchid</h1>
          <h3>Lightweight Orchid Database</h3>
      </div> */}
      </div>

      

    </React.Fragment>

  )
}

export default MainDisplay
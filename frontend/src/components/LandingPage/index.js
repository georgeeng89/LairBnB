import './LandingPage.css'

function LandingPage() {
  return (
    <>
      <div>
        <img className='background-image' src='../../../images/homepage.jpg' />
      </div>
      <div className='explore-container'>
        <div className='explore-item1'>
          <p></p>
        </div>
        <div className='explore-item2'>
          <p></p>
          <a className='explore-button' href="/lairs">Explore Lairs</a>
        </div>
      </div>
    </>
  )
}
export default LandingPage

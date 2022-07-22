import './LandingPage.css'

function LandingPage() {
  return (
    <>
      {/* <div className='lairs-welcome splash'>
        <h2>
          Welcome
        </h2>

      </div> */}
      <div className='homepage-container'>
        <img className='background-image' src='../../../images/homepage.jpg' />
        <div class="centered homepage-text1">Welcome Primals</div>
        <div class="lower homepage-text2">Not sure where to go? Explore some Lairs! </div>
        <div class="lower2"><a className='explore-button' href="/lairs">Explore Lairs</a></div>
      </div>

      <div className='explore-container'>
        <div className='explore-item1'>
          <p className='explore-item-text'>Find the coziest Lair to stay at.</p>
        </div>
        <div className='explore-item2'>
          <p></p>
          <p className='explore-item-text'>Calm your mind and regain serenity with nature.</p>
        </div>
      </div>
    </>
  )
}
export default LandingPage

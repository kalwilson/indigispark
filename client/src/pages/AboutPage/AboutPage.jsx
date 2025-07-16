import './AboutPage.scss';

const AboutPage = () => {
  return (
    <>
      <section className="about">
        <h1 className="about__heading">About Lightling Labs</h1>
        {/* <img
          src="/src/assets/images/lightling-labs-banner.png"
          alt="A yellow, pink, purple, blue gradient with lines representing waves and the Lightling Labs logo: A half sun with sparkles."
          className="about__banner"
        /> */}
        <p className="about__details">
          Lightling Labs is an empowering, cozy platform designed for Indigenous
          creators, solopreneurs, and small business owners to build beautiful
          brands and digital presences. Whether starting a community-based
          initiative or launching a dream side hustle, Lightling Labs helps give
          guidance through brand-building with warmth and simplicity.
        </p>
      </section>
    </>
  );
};

export default AboutPage;

import { FC } from "react";

const Main: FC = () => {
  const handleOFClick = (): void => alert("Excuse me, why are you clicking that...?");

  return (
    <main>
      <section id="hero" className="hero">
        <div className="hero-image">
          <div className="fade"></div>
        </div>
        <h1 className="strong">Aaron Shiels</h1>
        <h4>Software architect, technology enthusiast, and all around pretty ok guy 🙂</h4>
        <div>
          <a href="https://www.linkedin.com/in/aaron-shiels-41601267" className="icon li"></a>
          <a href="https://github.com/AaronShiels" className="icon gh"></a>
          <a href="https://www.facebook.com/aaron.shiels" className="icon fb"></a>
          <a href="https://www.instagram.com/bigazza1000" className="icon ig"></a>
          <span className="icon of" onClick={handleOFClick}></span>
        </div>
      </section>
      <section id="bio" className="section">
        <h4 className="strong">About Me</h4>
        <div className="columns">
          <div className="half">
            <p>Hi, I'm Aaron 👋</p>
            <p>
              I am currently working as a software architect at <strong>Match Group</strong>'s Evergreen and Emerging division. Under the "Evergreen" banner, I
              work on maintaining and growing the backend platforms of a portfolio of well known dating brands, including <strong>Plenty of Fish</strong>,{" "}
              <strong>Match.com</strong>, and <strong>OkCupid</strong>. Under the "Emerging" banner, I work on new and experimental products and business
              avenues for the group.
            </p>
            <p>
              In my role as architect, I am responsible for building and executing on a technical vision for the platforms I work on. Some of my achievements
              while in this role include:
              <ul>
                <li>
                  The delivery of and migration to a <strong>mature, distributed dating platform</strong> to replace the aging legacy systems.
                </li>
                <li>
                  Guidance and evangilism of the (then) new guiding patterns and principles for the future platform, <strong>microservice architecture</strong>,{" "}
                  <strong>event-driven architecture</strong>, and <strong>CQRS</strong> to name a few.
                </li>
                <li>
                  Evaluation and successful adoption of modern hosting solutions, including <strong>Kubernetes</strong> and <strong>cloud services</strong>.
                </li>
                <li>
                  Design and delivery of a flexible <strong>API gateway solution</strong> in order to present the disparate components of the platform as a
                  single, homogeneous API.
                </li>
                <li>
                  Evaluation, adoption, and evangilism of a <strong>true continuous integration/continuous delivery</strong> pipeline, with a strong emphasis of{" "}
                  test-driven development power by Docker Compose.
                </li>
              </ul>
            </p>
          </div>
          <div className="half">
            <div className="timeline">
              <header className="timeline-header">
                <span className="icon large mtch"></span>
                <span>
                  <strong>Match Group</strong>
                  <br />
                  Online Dating
                  <br />
                  Vancouver, British Columbia
                </span>
              </header>
              <div className="timeline-row">
                <span>
                  <strong>Architect</strong>
                  <br />
                  <time dateTime="2022-01-01">January 2022 (Present)</time>
                </span>
              </div>
              <div className="timeline-row">
                <span>
                  <strong>Associate Architect</strong>
                  <br />
                  <time dateTime="2021-03-01">March 2021</time>
                </span>
              </div>
              <div className="timeline-row">
                <span>
                  <strong>Platform Engineering Lead</strong>
                  <br />
                  <time dateTime="2019-07-01">July 2019</time>
                </span>
              </div>
              <div className="timeline-row">
                <span>
                  <strong>Senior Web Developer</strong>
                  <br />
                  <time dateTime="2018-03-01">March 2018</time>
                </span>
              </div>
            </div>
            <div className="timeline">
              <header className="timeline-header">
                <span className="icon large clh"></span>
                <span>
                  <strong>Collection House Group</strong> (now Credit Corp)
                  <br />
                  Financial Services
                  <br />
                  Brisbane, Queensland
                </span>
              </header>
              <div className="timeline-row">
                <span>
                  <strong>Programming Team Leader</strong>
                  <br />
                  <time dateTime="2017-05-01">May 2017</time>
                </span>
              </div>
              <div className="timeline-row">
                <span>
                  <strong>Lead Developer</strong>
                  <br />
                  <time dateTime="2015-06-01">June 2015</time>
                </span>
              </div>
              <div className="timeline-row">
                <span>
                  <strong>Software Developer</strong>
                  <br />
                  <time dateTime="2013-04-01">April 2013</time>
                </span>
              </div>
            </div>
            <div className="timeline">
              <header className="timeline-header">
                <span className="icon large fp"></span>
                <span>
                  <strong>Fair Play AMS</strong>
                  <br />
                  Athlete Management
                  <br />
                  Brisbane, Queensland
                </span>
              </header>
              <div className="timeline-row">
                <span>
                  <strong>Software Developer</strong>
                  <br />
                  <time dateTime="2012-02-01">February 2012</time>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export { Main };

import { FC } from "react";

const Main: FC = () => {
  const handleOFClick = (): void => alert("Excuse me, why are you clicking that...?");

  return (
    <main>
      <section id="hero" className="section hero">
        <div className="hero-image">
          <div className="fade"></div>
        </div>
        <h1 className="title is-1 has-text-centered">Aaron Shiels</h1>
        <h4 className="subtitle is-4 has-text-centered">Software architect, technology enthusiast, and all around pretty ok guy 🙂</h4>
        <div className="container has-text-centered socials">
          <a href="https://www.linkedin.com/in/aaron-shiels-41601267" className="icon">
            <i className="li"></i>
          </a>
          <a href="https://github.com/AaronShiels" className="icon">
            <i className="gh"></i>
          </a>
          <a href="https://www.facebook.com/aaron.shiels" className="icon">
            <i className="fb"></i>
          </a>
          <a href="https://www.instagram.com/bigazza1000" className="icon">
            <i className="ig"></i>
          </a>
          <span className="icon" onClick={handleOFClick}>
            <i className="of"></i>
          </span>
        </div>
      </section>
      <section id="bio" className="section">
        <div className="content columns is-multiline">
          <div className="column is-12">
            <h4 className="title is-4 has-text-centered">About Me</h4>
          </div>
          <div className="column is-12">
            <p>Hi, I'm Aaron 👋</p>
            <br />
            <p>
              I am currently working as a software architect at <strong>Match Group</strong>'s Evergreen and Emerging division. Under the "Evergreen" banner, I
              work on maintaining and growing the backend platforms of a portfolio of well known dating brands, including <strong>Plenty of Fish</strong>,{" "}
              <strong>Match.com</strong>, and <strong>OkCupid</strong>. Under the "Emerging" banner, I work on new and experimental products and business
              avenues for the group.
            </p>
            <br />
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
          </div>
        </div>
      </section>
    </main>
  );
};

export { Main };

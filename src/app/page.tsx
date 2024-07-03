export default function Home() {
  return (
    <div className="space-y-12 font-sans">
      {/* Introduction Section */}
      <section className="text-center">
        <h1 className="text-2xl font-bold mb-4">Hello, World! 👋</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Hi, I&apos;m Vinayak Singh Bhadoriya, a Computer Science graduate from
          The University of Manchester currently getting my Masters at NYU
          Courant. I have a keen interest in Machine Learning and Artificial
          Intelligence, and have worked on projects ranging from topics like RNA
          folding and Natural Language Inference to Neural Network Optimization.
        </p>
        <p className="text-lg max-w-2xl mx-auto">
          You can scroll down to know a little bit more about me or head over to
          the{" "}
          <a href="./articles" className="text-pink-500 hover:underline">
            Articles
          </a>{" "}
          page if you&apos;re interested in my thoughts on Life, The Universe,
          and Everything.{" "}
        </p>
      </section>

      {/*Education Section*/}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Education</h2>
        <div className="justify-centre items-center px-4">
          <span className="text-lg mr-4">BSc Computer Science (2021-2024)</span>
          <span className="text-lg mr-4">The University of Manchester</span>
        </div>
        <div className="justify-between items-center px-4">
          <span className="text-lg mr-4">MSc Computer Science (2024-2026)</span>
          <span className="text-lg">NYU Courant</span>
        </div>
      </section>

      {/*Experience Section*/}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Work Experience</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="border border-pink-200 p-4 rounded-lg">
            <h3 className="text-xl font-bold">Business Technology Intern</h3>
            <p className="text-lg">
              Discover Financial Services | June 2023 - August 2023
            </p>
            <p className="text-base">
              Part of the Business Technology team, specifically working on the
              Diners Club International portal. Responsible for creating an
              automated health check for the portal using Playwright and Java,
              saving the team hours of manual testing every day.
            </p>
          </div>
          <div className="border border-pink-200 p-4 rounded-lg">
            <h3 className="text-xl font-bold">Academic Notetaker</h3>
            <p className="text-lg">Randstad | September 2022 - December 2023</p>
            <p className="text-base">
              Provided support to students with disabilities and attended
              various lectures and seminars taking accurate notes for students
              who found it hard to take notes themselves.
            </p>
          </div>
          <div className="border border-pink-200 p-4 rounded-lg">
            <h3 className="text-xl font-bold">Summer Intern</h3>
            <p className="text-lg">EY | August 2022 - September 2022</p>
            <p className="text-base">
              Shadowed a Tax Associate and contributed to the development of
              EY’s DigiTDS product which automates the ‘Tax Deducted at Source’
              and ‘Tax Collected at Source’ processes.
            </p>
          </div>
        </div>
      </section>

      {/*Projects Section*/}
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="space-y-4 max-w-2xl mx-auto">
          <div className="border border-pink-200 p-4 rounded-lg">
            <h3 className="text-xl font-bold">
              RNA Secondary Structure Prediction Using Machine Learning
            </h3>
            <p className="text-lg">
              As part of my undergraduate thesis I built a machine learning
              model which predicts the folded secondary structure given an RNA
              sequence, using a combination of traditional machine learning
              techniques and a dynamic programming algorithm developed by Zuker
              and Stiegler.
            </p>
            <a
              href="/report.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              The report is available here
            </a>
          </div>
          <div className="border border-pink-200 p-4 rounded-lg">
            <h3 className="text-xl font-bold">Natural Language Inference</h3>
            <p className="text-lg">
              Natural Language Inference(NLI) using traditional ML and Deep
              Learning methods where I implemented a Natural Language Inference
              model using traditional machine learning techniques like Logistic
              Regression, Random Forest and Gradient Boosting, as well as deep
              learning techniques like the Neural Network architecture proposed
              by Bowman et al.(2015) SNLI paper.
            </p>
            <a
              href="https://github.com/wukachn/uom-nlu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

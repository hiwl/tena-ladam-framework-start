
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Tenaladam</h1>
          
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-medical-blue">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Tenaladam was created to bridge the gap between modern pharmaceuticals and traditional healing practices. Our mission is to provide balanced, evidence-based information about both approaches to support informed healthcare decisions.
            </p>
            <p className="text-gray-700 mb-4">
              We believe that understanding the full spectrum of available treatments—from the latest FDA-approved medications to remedies used for centuries in traditional medicine systems—enables individuals to make more informed choices about their health.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-medical-green">Our Approach</h2>
            <p className="text-gray-700 mb-4">
              We apply the same rigorous standards to evaluating both modern and traditional medicines:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li className="mb-2">We provide information about efficacy based on scientific evidence when available</li>
              <li className="mb-2">We highlight potential side effects and safety concerns</li>
              <li className="mb-2">We note important interactions with other medications or substances</li>
              <li className="mb-2">We consider practical factors like cost and accessibility</li>
              <li className="mb-2">We acknowledge the cultural and historical context of traditional remedies</li>
            </ul>
            <p className="text-gray-700">
              When scientific evidence is limited for traditional remedies, we clearly state this while still respecting the historical use and cultural significance of these treatments.
            </p>
          </section>
          
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-medical-terracotta">Medical Disclaimer</h2>
            <div className="bg-medical-lightterracotta p-4 rounded-lg">
              <p className="text-gray-700 mb-4">
                The information provided on Tenaladam is for educational and informational purposes only and is not intended as medical advice, diagnosis, or treatment. 
              </p>
              <p className="text-gray-700 mb-4">
                Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or before starting any new treatment or discontinuing an existing treatment.
              </p>
              <p className="text-gray-700">
                Tenaladam is not a substitute for professional medical advice, diagnosis, or treatment. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.
              </p>
            </div>
          </section>
          
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-700 mb-4">
            Tenaladam was created by a team of 5 girls  who believe in the importance of providing comprehensive information about all treatment options.
            </p>
            </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              We welcome your feedback, questions, and suggestions. Please contact us at:
            </p>
            <p className="text-gray-700">
              Email: <a href="mailto:tenaladam6@gmail.com" className="text-medical-blue hover:underline">Contact via email</a>
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;

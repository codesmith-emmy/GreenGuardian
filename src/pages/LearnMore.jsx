// LearnMore.js
import React from "react";

const LearnMore = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
        About Smart Plant Care Assistant
      </h2>
      <div className="space-y-6 text-gray-800">
        <section>
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            Our Mission
          </h3>
          <p>
            At Smart Plant Care Assistant, our mission is to help plant
            enthusiasts nurture and maintain healthy plants effortlessly.
            Leveraging the power of artificial intelligence, we provide
            personalized care plans and real-time health assessments to ensure
            your plants thrive.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            Key Features
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Personalized Care Plans:</strong> Get tailored
              recommendations for watering, lighting, and fertilization based on
              your plant species.
            </li>
            <li>
              <strong>Health Assessments:</strong> Upload images of your plants
              to detect signs of pests, diseases, or nutrient deficiencies.
            </li>
            <li>
              <strong>Real-Time Notifications:</strong> Receive timely reminders
              and alerts to ensure your plants receive the care they need.
            </li>
            <li>
              <strong>User-Friendly Dashboard:</strong> Manage all your plants
              in one place with easy-to-understand insights and tips.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            How It Works
          </h3>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Get Started:</strong> Enter your plant species and upload
              an image of your plant.
            </li>
            <li>
              <strong>Receive Care Plans:</strong> Our AI analyzes the species
              and provides a customized care plan to keep your plant healthy.
            </li>
            <li>
              <strong>Health Monitoring:</strong> Upload images regularly to
              monitor your plant’s health and receive actionable insights.
            </li>
            <li>
              <strong>Stay Informed:</strong> Get notifications and tips to
              enhance your plant care routine.
            </li>
          </ol>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            Why Choose Us?
          </h3>
          <p>
            Whether you're a seasoned gardener or just starting, Smart Plant
            Care Assistant makes plant care simple and effective. Our
            intelligent system adapts to your unique needs, ensuring your plants
            always receive the best care possible.
          </p>
        </section>
      </div>
    </div>
  );
};

export default LearnMore;

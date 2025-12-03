import React from "react";
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-20 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="inline-block text-purple-600 font-semibold text-sm tracking-widest uppercase bg-purple-100 px-3 py-1 rounded-full mb-4">
          Powerful Features
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Why Choose FitTrack?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Our platform combines cutting-edge technology with proven fitness science to help you achieve your goals faster.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <FeatureCard
          icon="🔥"
          title="Create Challenges"
          description="Design your own fitness challenges and invite your friends to join."
          color="purple"
        />
        <FeatureCard
          icon="📊"
          title="Track Progress"
          description="Monitor workouts, activities, and achievements in real-time."
          color="pink"
        />
        <FeatureCard
          icon="🏆"
          title="Earn Rewards"
          description="Achieve milestones and earn badges to stay motivated."
          color="indigo"
        />
      </div>
    </section>
  );
};

export default Features;
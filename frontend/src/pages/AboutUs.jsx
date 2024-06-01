import React from 'react';

const AboutUs = () => {
  return (
    <div className="p-5 font-sans">
      <h1 className="text-4xl font-bold mb-5">About Us</h1>
      
      <section>
        <h2 className="text-2xl font-semibold mb-3">Welcome to <strong className="font-bold">AlgoForces</strong> – your ultimate destination for honing algorithmic skills and acing coding challenges!</h2>
        
        <h3 className="text-xl font-semibold mb-2">Who We Are</h3>
        <p className="mb-3">AlgoForces is a cutting-edge online judge platform dedicated to helping programmers of all levels improve their problem-solving abilities. Whether you're a beginner taking your first steps in coding or an experienced developer looking to sharpen your skills, AlgoForces provides the perfect arena for you to practice, compete, and grow.</p>
        
        <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
        <p className="mb-2">At AlgoForces, our mission is to:</p>
        <ul className="list-disc list-inside mb-3">
          <li><strong className="font-semibold">Empower Learners:</strong> We strive to make learning algorithms and data structures accessible and engaging for everyone.</li>
          <li><strong className="font-semibold">Foster a Community:</strong> We aim to build a vibrant community where coders can collaborate, compete, and support each other in their learning journeys.</li>
          <li><strong className="font-semibold">Promote Excellence:</strong> By offering a wide range of challenges and contests, we encourage our users to strive for excellence and continuously push their limits.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">What We Offer</h3>
        <ul className="list-disc list-inside mb-3">
          <li><strong className="font-semibold">Diverse Problem Set:</strong> Our extensive library features problems ranging from basic to advanced, covering a wide array of topics including sorting, searching, dynamic programming, graph theory, and more.</li>
          <li><strong className="font-semibold">Real-time Judging:</strong> Submit your solutions and receive instant feedback with our real-time judging system. Our automated environment ensures fair and accurate evaluation of your code.</li>
          <li><strong className="font-semibold">Contests and Competitions:</strong> Participate in regular contests and competitions to test your skills against other programmers. Climb the leaderboards and earn recognition for your coding prowess.</li>
          <li><strong className="font-semibold">Learning Resources:</strong> Access tutorials, articles, and discussions to deepen your understanding of algorithms and improve your coding techniques.</li>
          <li><strong className="font-semibold">Community Interaction:</strong> Engage with fellow coders through our forums and discussion boards. Share insights, ask questions, and collaborate on challenging problems.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Why Choose AlgoForces?</h3>
        <ul className="list-disc list-inside mb-3">
          <li><strong className="font-semibold">User-Friendly Interface:</strong> Our platform is designed to be intuitive and easy to navigate, allowing you to focus on solving problems without any distractions.</li>
          <li><strong className="font-semibold">Comprehensive Analytics:</strong> Track your progress with detailed analytics and performance metrics. Identify your strengths and areas for improvement to optimize your learning experience.</li>
          <li><strong className="font-semibold">Supportive Environment:</strong> We believe in fostering a supportive and inclusive environment where everyone is encouraged to learn and grow. Our community and support team are always here to help you on your coding journey.</li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">Join Us</h3>
        <p className="mb-3">Whether you're preparing for coding interviews, participating in competitive programming, or simply looking to enhance your algorithmic thinking, AlgoForces is the place for you. Join us today and become part of a dynamic community of passionate coders.</p>
        
        <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
        <p className="mb-3">Have questions or need assistance? Reach out to us at <a href="mailto:support@algoforces.com" className="text-blue-500 hover:text-blue-700">support@algoforces.com</a>. We're here to help!</p>
      </section>
      
      <footer>
        <p className="text-lg font-semibold">Together, let's code the future. Welcome to AlgoForces!</p>
      </footer>
    </div>
  );
};

export default AboutUs;
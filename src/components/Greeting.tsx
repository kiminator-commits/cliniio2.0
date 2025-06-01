import React, { useEffect, useState } from 'react';

const funGreetings = [
  "Welcome back, sterilization superstar! ✨",
  "Hey there, inventory rockstar! 🎸",
  "The clinic's MVP is back in action! 🏆",
  "Welcome to another day of medical excellence! 🌟",
  "Ready to tackle some sterilization challenges? 💪",
  "Back in the clinic and ready to shine! ✨",
  "Time to make those tools gleam! ✨",
  "Welcome back! The tools missed you! 🔧",
  "Let's make today spotlessly successful! ✨",
  "Ready to master the medical inventory? 📋",
  "The sterilization superstar has arrived! 🌟",
  "Let's make those tools SHINE today! ✨",
  "Welcome back to your sterilization kingdom! 👑"
];

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState(funGreetings[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * funGreetings.length);
    setGreeting(funGreetings[randomIndex]);
  }, []);

  return (
    <h1 className="text-2xl md:text-3xl font-bold text-[#5b5b5b] mb-2">
      {greeting}
    </h1>
  );
};

export default Greeting; 
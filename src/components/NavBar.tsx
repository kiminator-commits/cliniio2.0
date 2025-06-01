import React from "react";
import { mdiChartPie, mdiTrophy, mdiTarget } from "@mdi/js";
import Icon from "@mdi/react";
import Greeting from './Greeting';

const features = [
  { icon: mdiChartPie, bg: "teal", label: "Cumulative Stats" },
  { icon: mdiTrophy, bg: "purple", label: "Leaderboard" },
  { icon: mdiTarget, bg: "blue", label: "Daily Challenge" },
];

const NavBar = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <Greeting />
        <div className="flex gap-4 pr-8">
          {features.map((f) => (
            <div
              key={f.label}
              className={`rounded-xl w-12 h-12 flex items-center justify-center transition-transform duration-200 hover:scale-110 ${
                f.label === "Cumulative Stats" ? "bg-purple-400" :
                f.label === "Leaderboard" ? "bg-amber-400" :
                "bg-blue-600"
              }`}
              title={f.label}
            >
              <Icon path={f.icon} size={1.5} color="#fff" />
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Here&apos;s your impact and progress for today.
      </p>
    </div>
  );
};

export default NavBar; 
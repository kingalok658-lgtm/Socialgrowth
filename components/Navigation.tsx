import React from 'react';
import { LayoutDashboard, PlusCircle, LineChart, BrainCircuit } from 'lucide-react';

interface NavigationProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Stats' },
    { id: 'charts', icon: LineChart, label: 'Trends' },
    { id: 'add', icon: PlusCircle, label: 'Add' },
    { id: 'advisor', icon: BrainCircuit, label: 'Advisor' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-purple-400' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
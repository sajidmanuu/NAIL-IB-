// import React from 'react';
// import { motion } from 'framer-motion';
// import { Users, Trophy, BarChart, Mic, TrophyIcon } from 'lucide-react';

// const Home: React.FC = () => {
//   const features = [
//     {
//       title: 'Match Management',
//       description: 'Create and manage cricket matches with ease',
//       icon: <TrophyIcon className="w-12 h-12 text-indigo-600" />
//     },
//     {
//       title: 'Player Profiles',
//       description: 'Track player statistics and performance',
//       icon: <Users className="w-12 h-12 text-indigo-600" />
//     },
//     {
//       title: 'Team Management',
//       description: 'Organize teams and manage rosters',
//       icon: <Trophy className="w-12 h-12 text-indigo-600" />
//     },
//     {
//       title: 'Live Scoring',
//       description: 'Real-time match scoring and updates',
//       icon: <BarChart className="w-12 h-12 text-indigo-600" />
//     },
//     {
//       title: 'Commentary',
//       description: 'Add live commentary to matches',
//       icon: <Mic className="w-12 h-12 text-indigo-600" />
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section with Image Banner */}
//       <div className="relative h-[500px] overflow-hidden">
//         <motion.div
//           initial={{ scale: 1.1 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 1 }}
//           className="absolute inset-0"
//         >
//           <img
//             src="https://cdn.pixabay.com/photo/2013/07/25/10/12/cricket-166794_1280.jpg"
//             alt="Cricket Match"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-800/80" />
//         </motion.div>
        
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="text-white"
//           >
//             <h1 className="text-4xl md:text-6xl font-bold mb-6">
//               Welcome to Cricket Management System
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
//               Manage your cricket matches, players, and teams with our comprehensive platform.
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Features</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="p-6 text-center">
//                 <div className="flex justify-center mb-4">{feature.icon}</div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home; 


import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, BarChart, Mic, TrophyIcon } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      title: 'Match Management',
      description: 'Create and manage cricket matches with ease',
      icon: <TrophyIcon className="w-12 h-12 text-indigo-600" />
    },
    {
      title: 'Player Profiles',
      description: 'Track player statistics and performance',
      icon: <Users className="w-12 h-12 text-indigo-600" />
    },
    {
      title: 'Team Management',
      description: 'Organize teams and manage rosters',
      icon: <Trophy className="w-12 h-12 text-indigo-600" />
    },
    {
      title: 'Live Scoring',
      description: 'Real-time match scoring and updates',
      icon: <BarChart className="w-12 h-12 text-indigo-600" />
    },
    {
      title: 'Commentary',
      description: 'Add live commentary to matches',
      icon: <Mic className="w-12 h-12 text-indigo-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Image Banner */}
      <div className="relative w-full h-[500px] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src="https://cdn.pixabay.com/photo/2013/07/25/10/12/cricket-166794_1280.jpg"
            alt="Cricket Match"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-indigo-800/80" />
        </motion.div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Cricket Management System
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
              Manage your cricket matches, players, and teams with our comprehensive platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 p-6 text-center cursor-pointer w-full"
              onClick={() => console.log(`Clicked on ${feature.title}`)}
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

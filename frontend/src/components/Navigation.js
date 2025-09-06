// import React from 'react';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { Shield, User, LogOut } from 'lucide-react';
// import { cn } from '../lib/utils';

// const Navigation = ({ 
//   activeTab, 
//   onTabChange, 
//   isAuthenticated = false,
//   onAuthAction 
// }) => {
//   const tabs = [
//     { id: 'performance', label: 'Performance', badge: null },
//     { id: 'synchronous', label: 'Synchronous', badge: 'Live' },
//     { id: 'vertex', label: 'Vertex', badge: 'News' },
//     { id: 'suggestions', label: 'Suggestions', badge: 'AI' },
//     { id: 'about', label: 'About', badge: null }
//   ];

//   return (
//     <nav className="border-b bg-card shadow-card sticky top-0 z-50">
//       <div className="container mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center space-x-3">
//             <div className="p-2 bg-gradient-primary rounded-xl">
//               <Shield className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-foreground">Sentinel</h1>
//               <p className="text-xs text-muted-foreground">HR Performance Analytics</p>
//             </div>
//           </div>

//           {/* Navigation Tabs */}
//           <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
//             {tabs.map((tab) => (
//               <Button
//                 key={tab.id}
//                 variant={activeTab === tab.id ? "default" : "ghost"}
//                 size="sm"
//                 onClick={() => onTabChange(tab.id)}
//                 className={cn(
//                   "relative transition-all duration-200",
//                   activeTab === tab.id 
//                     ? "bg-primary text-primary-foreground shadow-sm" 
//                     : "hover:bg-muted"
//                 )}
//               >
//                 {tab.label}
//                 {tab.badge && (
//                   <Badge 
//                     variant="secondary" 
//                     className="ml-2 h-4 text-xs bg-accent/80"
//                   >
//                     {tab.badge}
//                   </Badge>
//                 )}
//               </Button>
//             ))}
//           </div>

//           {/* Auth Section */}
//           <div className="flex items-center space-x-3">
//             {isAuthenticated ? (
//               <div className="flex items-center space-x-3">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
//                     <User className="h-4 w-4 text-white" />
//                   </div>
//                   <span className="text-sm font-medium">HR Manager</span>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={onAuthAction}
//                   className="text-muted-foreground hover:text-foreground"
//                 >
//                   <LogOut className="h-4 w-4" />
//                 </Button>
//               </div>
//             ) : (
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={onAuthAction}
//                 className="border-primary/20 hover:bg-primary/5"
//               >
//                 Sign In
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;
import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Shield, User, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

const Navigation = ({ activeTab, onTabChange, isAuthenticated, username, onAuthAction }) => {
  const tabs = [
    { id: 'performance', label: 'Performance', badge: null },
    { id: 'synchronous', label: 'Synchronous', badge: 'Live' },
    { id: 'vertex', label: 'Vertex', badge: 'News' },
    { id: 'suggestions', label: 'Suggestions', badge: 'AI' },
    { id: 'about', label: 'About', badge: null }
  ];

  return (
    <nav className="border-b bg-card shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-primary rounded-xl">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Sentinel</h1>
            <p className="text-xs text-muted-foreground">HR Performance Analytics</p>
          </div>
        </div>

        {/* Tabs (only when logged in) */}
        {isAuthenticated && (
          <div className="flex items-center space-x-1 bg-muted/50 rounded-lg p-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative transition-all duration-200",
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-muted"
                )}
              >
                {tab.label}
                {tab.badge && (
                  <Badge variant="secondary" className="ml-2 h-4 text-xs bg-accent/80">
                    {tab.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        )}

        {/* Auth */}
        <div className="flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium">{username}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onAuthAction}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onAuthAction}
              className="border-primary/20 hover:bg-primary/5"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


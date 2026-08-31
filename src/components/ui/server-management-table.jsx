"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { X, Power, Pause, Play, RotateCcw } from "lucide-react";

export const defaultServers = [
  {
    id: "1",
    number: "01",
    serviceName: "CPCL Chennai Refinery SAP Node",
    osType: "linux",
    serviceLocation: "Chennai, Tamil Nadu",
    countryCode: "in",
    ip: "10.142.50.211",
    dueDate: "14 Oct 2027",
    standardizationRate: 98,
    status: "active"
  },
  {
    id: "2", 
    number: "02",
    serviceName: "IOCL Gujarat Refinery Sync Engine",
    osType: "windows",
    serviceLocation: "Vadodara, Gujarat", 
    countryCode: "in",
    ip: "10.204.113.158",
    dueDate: "14 Oct 2027",
    standardizationRate: 94,
    status: "active"
  },
  {
    id: "3",
    number: "03", 
    serviceName: "BPCL Mahul Refinery AI Connector",
    osType: "ubuntu",
    serviceLocation: "Mumbai, Maharashtra",
    countryCode: "in",
    ip: "10.192.2.37",
    dueDate: "27 Jun 2027",
    standardizationRate: 89,
    status: "active"
  },
  {
    id: "4",
    number: "04",
    serviceName: "HPCL Visakh Refinery Catalog Sync",
    osType: "ubuntu",
    serviceLocation: "Visakhapatnam, AP",
    countryCode: "in",
    ip: "10.198.51.23",
    dueDate: "30 May 2030",
    standardizationRate: 85,
    status: "active"
  },
  {
    id: "5",
    number: "05",
    serviceName: "ONGC Offshore Asset Catalog Node",
    osType: "windows",
    serviceLocation: "Mumbai High, Offshore",
    countryCode: "in",
    ip: "10.203.113.45",
    dueDate: "15 Dec 2026",
    standardizationRate: 72,
    status: "paused"
  }
];

export function ServerManagementTable({
  title = "Active Enterprise CPSE Catalog Sync Nodes",
  servers: initialServers = defaultServers,
  onStatusChange,
  className = ""
} = {}) {
  const [servers, setServers] = useState(initialServers);
  const [hoveredServer, setHoveredServer] = useState(null);
  const [selectedServer, setSelectedServer] = useState(null);
  const shouldReduceMotion = useReducedMotion();
  const themeContext = useTheme();
  const theme = themeContext?.theme || "dark";

  const handleStatusChange = (serverId, newStatus) => {
    if (onStatusChange) {
      onStatusChange(serverId, newStatus);
    }

    setServers(prev => prev.map(server => 
      server.id === serverId ? { ...server, status: newStatus } : server
    ));
  };

  const openServerModal = (server) => {
    setSelectedServer(server);
  };

  const closeServerModal = () => {
    setSelectedServer(null);
  };

  useEffect(() => {
    if (selectedServer) {
      const updatedServer = servers.find(s => s.id === selectedServer.id);
      if (updatedServer) {
        setSelectedServer(updatedServer);
      }
    }
  }, [servers, selectedServer]);

  const getOSIcon = (osType) => {
    switch (osType) {
      case "windows":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-1.5 border border-slate-700/50 shadow-xs">
            <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
              <path className="fill-white" d="M30,15H17c-0.6,0-1-0.4-1-1V3.3c0-0.5,0.4-0.9,0.8-1l13-2.3c0.3,0,0.6,0,0.8,0.2C30.9,0.4,31,0.7,31,1v13 C31,14.6,30.6,15,30,15z"/>
              <path className="fill-white" d="M13,15H1c-0.6,0-1-0.4-1-1V6c0-0.5,0.4-0.9,0.8-1l12-2c0.3,0,0.6,0,0.8,0.2C13.9,3.4,14,3.7,14,4v10 C14,14.6,13.6,15,13,15z"/>
              <path className="fill-white" d="M30,32c-0.1,0-0.1,0-0.2,0l-13-2.3c-0.5-0.1-0.8-0.5-0.8-1V18c0-0.6,0.4-1,1-1h13c0.6,0,1,0.4,1,1v13 c0,0.3-0.1,0.6-0.4,0.8C30.5,31.9,30.2,32,30,32z"/>
              <path className="fill-white" d="M13,29c-0.1,0-0.1,0-0.2,0l-12-2C0.4,26.9,0,26.5,0,26v-8c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1v10 c0,0.3-0.1,0.6-0.4,0.8C13.5,28.9,13.2,29,13,29z"/>
            </svg>
          </div>
        );
      case "ubuntu":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center p-1.5 border border-slate-700/50 shadow-xs">
            <svg width="16" height="16" viewBox="-5 0 32 32" fill="white">
              <path d="M16.469 9.375c-1.063-0.594-1.406-1.938-0.813-3 0.406-0.719 1.156-1.094 1.906-1.094 0.375 0 0.75 0.094 1.094 0.281 1.063 0.625 1.406 1.969 0.813 3-0.406 0.719-1.156 1.094-1.906 1.094-0.375 0-0.75-0.094-1.094-0.281zM21.938 15.594h-3.625c-0.125-1.688-0.969-3.188-2.25-4.156-0.219-0.156-0.438-0.313-0.688-0.469-0.813-0.438-1.75-0.688-2.75-0.688-1.031 0-1.969 0.25-2.813 0.719l-2-3.031c1.406-0.844 3.031-1.313 4.813-1.313 0.688 0 1.375 0.063 2.063 0.219-0.25 1.219 0.281 2.5 1.406 3.156 0.438 0.25 0.938 0.375 1.469 0.375 0.719 0 1.406-0.25 1.938-0.719 1.438 1.563 2.344 3.625 2.438 5.906zM7.125 8.438l2 3.031c-1.25 0.969-2.094 2.438-2.188 4.125-0.031 0.125-0.031 0.25-0.031 0.406 0 0.125 0 0.281 0.031 0.406 0.125 1.781 1.063 3.313 2.438 4.281l-1.906 3.094c-1.813-1.188-3.188-3-3.813-5.125 0.875-0.5 1.5-1.469 1.5-2.563s-0.625-2.094-1.563-2.594c0.594-2.063 1.844-3.844 3.531-5.063zM2.188 13.906c1.219 0 2.219 0.969 2.219 2.188s-1 2.219-2.219 2.219-2.188-1-2.188-2.219 0.969-2.188 2.188-2.188zM8.188 24.219l1.906-3.125c0.75 0.375 1.625 0.594 2.531 0.594 1 0 1.938-0.25 2.781-0.719 0.25-0.125 0.469-0.281 0.688-0.469 1.25-0.938 2.094-2.406 2.219-4.094h3.625c-0.094 2.375-1.094 4.531-2.656 6.125-0.469-0.344-1.063-0.531-1.656-0.531-0.531 0-1.031 0.125-1.469 0.375-1 0.594-1.531 1.656-1.469 2.719-0.688 0.156-1.375 0.25-2.063 0.25-1.625 0-3.125-0.406-4.438-1.125zM17.625 22.75c0.75 0 1.5 0.375 1.906 1.094 0.594 1.063 0.219 2.438-0.813 3.031-0.344 0.188-0.719 0.281-1.094 0.281-0.781 0-1.5-0.375-1.906-1.094-0.625-1.063-0.25-2.406 0.813-3.031 0.344-0.188 0.719-0.281 1.094-0.281z"/>
            </svg>
          </div>
        );
      case "linux":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-600 to-slate-800 flex items-center justify-center border border-slate-700/50 shadow-xs">
            <div className="text-white text-xs font-mono font-extrabold">L</div>
          </div>
        );
    }
  };

  const getCountryFlag = () => {
    return (
      <svg width="32" height="32" viewBox="0 0 90 60" fill="none" className="scale-125">
        <rect width="90" height="20" fill="#FF9933"/>
        <rect y="20" width="90" height="20" fill="#FFFFFF"/>
        <rect y="40" width="90" height="20" fill="#138808"/>
        <circle cx="45" cy="30" r="8" fill="none" stroke="#000080" strokeWidth="1.5"/>
      </svg>
    );
  };

  const getRateBars = (percentage, status) => {
    const filledBars = Math.round((percentage / 100) * 10);
    
    const getBarColor = (index) => {
      if (index >= filledBars) {
        return "bg-slate-700/40 border border-slate-700/30";
      }
      
      switch (status) {
        case "active":
          return "bg-emerald-400";
        case "paused":
          return "bg-amber-400";
        case "inactive":
          return "bg-rose-400/60";
        default:
          return "bg-emerald-400";
      }
    };
    
    return (
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-5 rounded-full transition-all duration-500 ${getBarColor(index)}`}
            />
          ))}
        </div>
        <span className="text-sm font-mono text-slate-200 font-bold min-w-[3rem]">
          {percentage}%
        </span>
      </div>
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <div className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <span className="text-emerald-400 text-xs font-bold">Synced</span>
          </div>
        );
      case "paused":
        return (
          <div className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <span className="text-amber-400 text-xs font-bold">In Sync</span>
          </div>
        );
      case "inactive":
        return (
          <div className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
            <span className="text-rose-400 text-xs font-bold">Offline</span>
          </div>
        );
    }
  };

  const getStatusGradient = (status) => {
    switch (status) {
      case "active":
        return "from-emerald-500/10 to-transparent";
      case "paused": 
        return "from-amber-500/10 to-transparent";
      case "inactive":
        return "from-rose-500/10 to-transparent";
    }
  };

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`}>
      <div className="relative border border-slate-800/80 rounded-2xl p-6 bg-[#0E172A] text-slate-100 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-lg font-extrabold text-white tracking-tight">{title}</h1>
            </div>
            <div className="text-xs text-slate-400 font-semibold">
              {servers.filter(s => s.status === "active").length} Synced Nodes • {servers.filter(s => s.status === "paused").length} Active Connectors
            </div>
          </div>
        </div>

        {/* Table */}
        <motion.div
          className="space-y-2.5"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {/* Headers */}
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            <div className="col-span-1">No</div>
            <div className="col-span-3">Enterprise Connector</div>
            <div className="col-span-2">Refinery / Hub</div>
            <div className="col-span-2">SAP IP</div>
            <div className="col-span-2">Standardization Rate</div>
            <div className="col-span-2 text-right font-extrabold">Status</div>
          </div>

          {/* Server Rows */}
          {servers.map((server) => (
            <motion.div
              key={server.id}
              variants={{
                hidden: { 
                  opacity: 0, 
                  x: -25,
                  scale: 0.95,
                  filter: "blur(4px)" 
                },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 28,
                    mass: 0.6,
                  },
                },
              }}
              className="relative cursor-pointer"
              onMouseEnter={() => setHoveredServer(server.id)}
              onMouseLeave={() => setHoveredServer(null)}
              onClick={() => openServerModal(server)}
            >
              <motion.div
                className="relative bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/50 rounded-xl p-4 overflow-hidden transition-all duration-200"
                whileHover={{
                  y: -1,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
              >
                {/* Status gradient overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-l ${getStatusGradient(server.status)} pointer-events-none`}
                  style={{ 
                    backgroundSize: "30% 100%", 
                    backgroundPosition: "right",
                    backgroundRepeat: "no-repeat"
                  }} 
                />
                
                {/* Grid Content */}
                <div className="relative grid grid-cols-12 gap-4 items-center">
                  {/* Number */}
                  <div className="col-span-1">
                    <span className="text-xl font-black text-slate-500">
                      {server.number}
                    </span>
                  </div>

                  {/* Service Name */}
                  <div className="col-span-3 flex items-center gap-3">
                    {getOSIcon(server.osType)}
                    <span className="text-slate-100 font-extrabold text-sm truncate">
                      {server.serviceName}
                    </span>
                  </div>

                  {/* Service Location */}
                  <div className="col-span-2 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-700/60 flex items-center justify-center flex-shrink-0">
                      <div className="w-full h-full">
                        {getCountryFlag(server.countryCode)}
                      </div>
                    </div>
                    <span className="text-xs text-slate-300 font-semibold truncate">
                      {server.serviceLocation}
                    </span>
                  </div>

                  {/* IP */}
                  <div className="col-span-2">
                    <span className="text-slate-300 font-mono text-xs font-bold">
                      {server.ip}
                    </span>
                  </div>

                  {/* Standardization Rate */}
                  <div className="col-span-2">
                    {getRateBars(server.standardizationRate, server.status)}
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex justify-end">
                    {getStatusBadge(server.status)}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Server Management Overlay - Inside Card */}
        <AnimatePresence>
          {selectedServer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col rounded-2xl z-10 overflow-hidden text-slate-100"
            >
              {/* Header with Actions */}
              <div className="relative bg-gradient-to-r from-slate-900 to-slate-950 p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl font-black text-slate-500">
                    {selectedServer.number}
                  </div>
                  {getOSIcon(selectedServer.osType)}
                  <div>
                    <h3 className="text-base font-extrabold text-white">
                      {selectedServer.serviceName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full overflow-hidden border border-slate-700 flex items-center justify-center">
                        <div className="w-full h-full scale-75">
                          {getCountryFlag(selectedServer.countryCode)}
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {selectedServer.serviceLocation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons in Header */}
                <div className="flex items-center gap-2">
                  {/* Start/Stop */}
                  {selectedServer.status === "active" ? (
                    <motion.button
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      onClick={() => handleStatusChange(selectedServer.id, "inactive")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Power className="w-3.5 h-3.5" />
                      Pause Sync
                    </motion.button>
                  ) : (
                    <motion.button
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                      onClick={() => handleStatusChange(selectedServer.id, "active")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Play className="w-3.5 h-3.5" />
                      Resume Sync
                    </motion.button>
                  )}

                  {/* Restart */}
                  <motion.button
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                    onClick={() => {
                      handleStatusChange(selectedServer.id, "inactive");
                      setTimeout(() => handleStatusChange(selectedServer.id, "active"), 1000);
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Re-index Catalog
                  </motion.button>

                  {/* Close Button */}
                  <motion.button
                    className="w-8 h-8 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full flex items-center justify-center border border-slate-700 ml-2 cursor-pointer"
                    onClick={closeServerModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-5 space-y-4 overflow-y-auto">
                {/* Server Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* IP Address */}
                  <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      SAP MM Gateway IP
                    </label>
                    <div className="text-xs font-mono font-bold text-slate-100 mt-1">
                      {selectedServer.ip}
                    </div>
                  </div>

                  {/* Due Date */}
                  <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Catalog Audit Date
                    </label>
                    <div className="text-xs font-bold text-slate-100 mt-1">
                      {selectedServer.dueDate}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Sync Status
                    </label>
                    <div className="mt-1">
                      {getStatusBadge(selectedServer.status)}
                    </div>
                  </div>
                </div>

                {/* Standardization Progress */}
                <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Material Standardization & Duplicate Elimination Rate
                  </label>
                  {getRateBars(selectedServer.standardizationRate, selectedServer.status)}
                </div>

                {/* Server Logs Preview */}
                <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    Catalog Synchronization Logs
                  </label>
                  <div className="font-mono text-xs space-y-1.5 max-h-28 overflow-y-auto p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                    <div className="text-emerald-400">[15:42:31] {selectedServer.serviceName} catalog mapped with 0 conflicts</div>
                    <div className="text-sky-400">[15:42:25] AI Vector Indexing complete: {selectedServer.standardizationRate}% catalog standardized</div>
                    <div className="text-slate-400">[15:40:05] SAP MM gateway active at {selectedServer.serviceLocation}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

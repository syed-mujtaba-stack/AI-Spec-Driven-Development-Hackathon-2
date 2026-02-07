<<<<<<< HEAD
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { DeleteTaskDialog } from "@/components/DeleteTaskDialog";
import { Calendar, CheckCircle2, Activity, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

export function TaskItem({
  task,
  onToggleComplete,
  onTaskUpdated,
  onTaskDeleted,
}: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(task.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Apex Protocol Geometry (Polygonal Clip)
  const CLIP_PATH = "polygon(1.5rem 0%, 100% 0%, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 0% 100%, 0% 1.5rem)";

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.005, transition: { duration: 0.3 } }}
      className="relative group p-[1px] transition-all duration-700 w-full"
    >
      {/* Reactive Atmospheric Depth Glow */}
      <AnimatePresence>
        {isHovered && !task.is_completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -inset-4 md:-inset-8 bg-primary/10 blur-[40px] md:blur-[80px] -z-10 rounded-full"
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <div
        style={{ clipPath: CLIP_PATH }}
        className={cn(
          "relative overflow-hidden transition-all duration-700",
          task.is_completed ? "bg-white/5 opacity-40 grayscale-[0.8]" : "bg-gradient-to-br from-primary/30 via-transparent to-white/10"
        )}
      >
        {/* Outer Structural Shell */}
        <div
          style={{ clipPath: CLIP_PATH }}
          className={cn(
            "relative flex flex-col md:flex-row items-stretch gap-0 bg-[#030014] w-full h-full min-h-[120px] md:min-h-[140px]",
            task.is_completed ? "bg-white/[0.01]" : "bg-white/[0.04]"
          )}
        >
          {/* Diagnostic Strip (Left/Top) */}
          <div className={cn(
            "w-full md:w-16 lg:w-20 shrink-0 flex flex-row md:flex-col items-center justify-center gap-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02] relative group-hover:bg-primary/5 transition-colors duration-500",
            task.is_completed && "border-primary/20"
          )}>
            <div className="flex items-center gap-2 md:rotate-[-90deg] whitespace-nowrap">
              <Calendar className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary/60" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 md:rotate-[-90deg] whitespace-nowrap">
              <Activity className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary/60" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">
                {task.is_completed ? "STABLE" : "PULSE"}
              </span>
            </div>

            {/* Diagnostic Side Indicator */}
            <div className={cn(
              "absolute left-0 bottom-0 md:top-0 w-full h-[2px] md:h-full md:w-[4px] transition-all duration-1000",
              task.is_completed ? "bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)]" : "bg-white/10"
            )} />
          </div>

          {/* Content Shell (Inner) */}
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 md:gap-8 p-5 md:p-8 relative overflow-hidden">
            {/* Interactive Scanlines Overlay */}
            <AnimatePresence>
              {isHovered && !task.is_completed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(124,58,237,0.3) 1px, rgba(124,58,237,0.3) 2px)",
                    backgroundSize: "100% 4px"
                  }}
                >
                  <motion.div
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Kinetic Checkbox System */}
            <div className="relative z-10 shrink-0">
              <div className="relative h-10 w-10 md:h-14 md:w-14 flex items-center justify-center">
                <Checkbox
                  checked={task.is_completed}
                  onCheckedChange={() => onToggleComplete(task.id)}
                  className="sr-only"
                />
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => onToggleComplete(task.id)}
                  className={cn(
                    "h-10 w-10 md:h-12 md:w-12 border-2 flex items-center justify-center transition-all duration-700 rotate-45 group-hover:rotate-[135deg]",
                    task.is_completed
                      ? "bg-primary border-primary shadow-[0_0_30px_rgba(var(--primary),0.5)] rotate-[225deg]"
                      : "border-white/10 hover:border-primary/50 bg-white/[0.02]"
                  )}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}
                >
                  <div className="-rotate-45 group-hover:-rotate-[135deg] transition-transform duration-700">
                    {task.is_completed ? (
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    ) : (
                      <Terminal className="h-5 w-5 md:h-6 md:w-6 text-white/20 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </motion.button>

                <AnimatePresence>
                  {task.is_completed && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 2, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8 }}
                      className="absolute -top-2 -right-2 text-primary"
                    >
                      <Sparkles className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Body Content */}
            <div className="flex-1 min-w-0 relative z-10 text-center sm:text-left">
              <div className="flex flex-col gap-1 md:gap-2">
                <motion.h3
                  animate={{
                    color: task.is_completed ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,1)",
                  }}
                  className={cn(
                    "font-black text-xl md:text-3xl lg:text-4xl tracking-tighter transition-all duration-700 truncate",
                    task.is_completed && "line-through italic"
                  )}
                >
                  {task.title}
                </motion.h3>

                {task.description && (
                  <motion.p
                    animate={{ opacity: task.is_completed ? 0.05 : 0.6 }}
                    className="text-white/80 text-sm md:text-lg lg:text-xl line-clamp-1 md:line-clamp-2 leading-tight font-medium font-mono"
                  >
                    {`>> ${task.description}`}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Action Systems */}
            <div className="flex items-center gap-3 relative z-10 shrink-0 mt-2 sm:mt-0">
              <div className="flex gap-1 md:gap-2 p-2 md:p-3 bg-white/[0.03] border border-white/5 backdrop-blur-md">
                <EditTaskDialog
                  task={task}
                  onTaskUpdated={onTaskUpdated}
                />
                <div className="w-[1px] h-4 md:h-6 bg-white/10 self-center mx-1" />
                <DeleteTaskDialog
                  task={task}
                  onTaskDeleted={onTaskDeleted}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
=======
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { DeleteTaskDialog } from "@/components/DeleteTaskDialog";
import { Calendar, CheckCircle2, Activity, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onTaskUpdated: (task: Task) => void;
  onTaskDeleted: (taskId: string) => void;
}

export function TaskItem({
  task,
  onToggleComplete,
  onTaskUpdated,
  onTaskDeleted,
}: TaskItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const formattedDate = new Date(task.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Apex Protocol Geometry (Polygonal Clip)
  const CLIP_PATH = "polygon(1.5rem 0%, 100% 0%, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 0% 100%, 0% 1.5rem)";

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.005, transition: { duration: 0.3 } }}
      className="relative group p-[1px] transition-all duration-700 w-full"
    >
      {/* Reactive Atmospheric Depth Glow */}
      <AnimatePresence>
        {isHovered && !task.is_completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -inset-4 md:-inset-8 bg-primary/10 blur-[40px] md:blur-[80px] -z-10 rounded-full"
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <div
        style={{ clipPath: CLIP_PATH }}
        className={cn(
          "relative overflow-hidden transition-all duration-700",
          task.is_completed ? "bg-white/5 opacity-40 grayscale-[0.8]" : "bg-gradient-to-br from-primary/30 via-transparent to-white/10"
        )}
      >
        {/* Outer Structural Shell */}
        <div
          style={{ clipPath: CLIP_PATH }}
          className={cn(
            "relative flex flex-col md:flex-row items-stretch gap-0 bg-[#030014] w-full h-full min-h-[120px] md:min-h-[140px]",
            task.is_completed ? "bg-white/[0.01]" : "bg-white/[0.04]"
          )}
        >
          {/* Diagnostic Strip (Left/Top) */}
          <div className={cn(
            "w-full md:w-16 lg:w-20 shrink-0 flex flex-row md:flex-col items-center justify-center gap-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02] relative group-hover:bg-primary/5 transition-colors duration-500",
            task.is_completed && "border-primary/20"
          )}>
            <div className="flex items-center gap-2 md:rotate-[-90deg] whitespace-nowrap">
              <Calendar className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary/60" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 md:rotate-[-90deg] whitespace-nowrap">
              <Activity className="h-2.5 w-2.5 md:h-3 md:w-3 text-primary/60" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">
                {task.is_completed ? "STABLE" : "PULSE"}
              </span>
            </div>

            {/* Diagnostic Side Indicator */}
            <div className={cn(
              "absolute left-0 bottom-0 md:top-0 w-full h-[2px] md:h-full md:w-[4px] transition-all duration-1000",
              task.is_completed ? "bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)]" : "bg-white/10"
            )} />
          </div>

          {/* Content Shell (Inner) */}
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 md:gap-8 p-5 md:p-8 relative overflow-hidden">
            {/* Interactive Scanlines Overlay */}
            <AnimatePresence>
              {isHovered && !task.is_completed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-0 pointer-events-none"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(124,58,237,0.3) 1px, rgba(124,58,237,0.3) 2px)",
                    backgroundSize: "100% 4px"
                  }}
                >
                  <motion.div
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="w-full h-1/2 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Kinetic Checkbox System */}
            <div className="relative z-10 shrink-0">
              <div className="relative h-10 w-10 md:h-14 md:w-14 flex items-center justify-center">
                <Checkbox
                  checked={task.is_completed}
                  onCheckedChange={() => onToggleComplete(task.id)}
                  className="sr-only"
                />
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => onToggleComplete(task.id)}
                  className={cn(
                    "h-10 w-10 md:h-12 md:w-12 border-2 flex items-center justify-center transition-all duration-700 rotate-45 group-hover:rotate-[135deg]",
                    task.is_completed
                      ? "bg-primary border-primary shadow-[0_0_30px_rgba(var(--primary),0.5)] rotate-[225deg]"
                      : "border-white/10 hover:border-primary/50 bg-white/[0.02]"
                  )}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}
                >
                  <div className="-rotate-45 group-hover:-rotate-[135deg] transition-transform duration-700">
                    {task.is_completed ? (
                      <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    ) : (
                      <Terminal className="h-5 w-5 md:h-6 md:w-6 text-white/20 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </motion.button>

                <AnimatePresence>
                  {task.is_completed && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 2, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8 }}
                      className="absolute -top-2 -right-2 text-primary"
                    >
                      <Sparkles className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Body Content */}
            <div className="flex-1 min-w-0 relative z-10 text-center sm:text-left">
              <div className="flex flex-col gap-1 md:gap-2">
                <motion.h3
                  animate={{
                    color: task.is_completed ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,1)",
                  }}
                  className={cn(
                    "font-black text-xl md:text-3xl lg:text-4xl tracking-tighter transition-all duration-700 truncate",
                    task.is_completed && "line-through italic"
                  )}
                >
                  {task.title}
                </motion.h3>

                {task.description && (
                  <motion.p
                    animate={{ opacity: task.is_completed ? 0.05 : 0.6 }}
                    className="text-white/80 text-sm md:text-lg lg:text-xl line-clamp-1 md:line-clamp-2 leading-tight font-medium font-mono"
                  >
                    {`>> ${task.description}`}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Action Systems */}
            <div className="flex items-center gap-3 relative z-10 shrink-0 mt-2 sm:mt-0">
              <div className="flex gap-1 md:gap-2 p-2 md:p-3 bg-white/[0.03] border border-white/5 backdrop-blur-md">
                <EditTaskDialog
                  task={task}
                  onTaskUpdated={onTaskUpdated}
                />
                <div className="w-[1px] h-4 md:h-6 bg-white/10 self-center mx-1" />
                <DeleteTaskDialog
                  task={task}
                  onTaskDeleted={onTaskDeleted}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
>>>>>>> 664613d (Add phase 2)

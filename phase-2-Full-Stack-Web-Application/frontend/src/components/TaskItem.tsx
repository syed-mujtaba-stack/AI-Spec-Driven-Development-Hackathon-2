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
  const CLIP_PATH = "polygon(2rem 0%, 100% 0%, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0% 100%, 0% 2rem)";

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
      className="relative group p-[1px] transition-all duration-700"
    >
      {/* Reactive Atmospheric Depth Glow */}
      <AnimatePresence>
        {isHovered && !task.is_completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -inset-8 bg-primary/10 blur-[80px] -z-10 rounded-full"
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
            "relative flex flex-col md:flex-row items-stretch gap-0 bg-[#030014] w-full h-full min-h-[140px]",
            task.is_completed ? "bg-white/[0.01]" : "bg-white/[0.04]"
          )}
        >
          {/* Diagnostic Strip (Left) */}
          <div className={cn(
            "w-full md:w-20 lg:w-24 shrink-0 flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 border-b md:border-b-0 md:border-r border-white/5 bg-white/[0.02] relative group-hover:bg-primary/5 transition-colors duration-500",
            task.is_completed && "border-primary/20"
          )}>
            <div className="flex items-center gap-2 md:rotate-[-90deg] whitespace-nowrap">
              <Calendar className="h-3 w-3 text-primary/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 md:rotate-[-90deg] whitespace-nowrap">
              <Activity className="h-3 w-3 text-primary/60" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                {task.is_completed ? "STABLE" : "PULSE"}
              </span>
            </div>

            {/* Diagnostic Side Indicator */}
            <div className={cn(
              "absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-1000",
              task.is_completed ? "bg-primary shadow-[0_0_20px_rgba(var(--primary),0.8)]" : "bg-white/10"
            )} />
          </div>

          {/* Content Shell (Inner) */}
          <div className="flex-1 flex flex-col md:flex-row items-center gap-8 p-8 relative overflow-hidden">
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
              <div className="relative h-14 w-14 flex items-center justify-center">
                <Checkbox
                  checked={task.is_completed}
                  onCheckedChange={() => onToggleComplete(task.id)}
                  className="sr-only"
                />
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  onClick={() => onToggleComplete(task.id)}
                  className={cn(
                    "h-12 w-12 border-2 flex items-center justify-center transition-all duration-700 rotate-45 group-hover:rotate-[135deg]",
                    task.is_completed
                      ? "bg-primary border-primary shadow-[0_0_30px_rgba(var(--primary),0.5)] rotate-[225deg]"
                      : "border-white/10 hover:border-primary/50 bg-white/[0.02]"
                  )}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)" }}
                >
                  <div className="-rotate-45 group-hover:-rotate-[135deg] transition-transform duration-700">
                    {task.is_completed ? (
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    ) : (
                      <Terminal className="h-6 w-6 text-white/20 group-hover:text-primary transition-colors" />
                    )}
                  </div>
                </motion.button>

                <AnimatePresence>
                  {task.is_completed && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: [1, 2.5, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 0.8 }}
                      className="absolute -top-4 -right-4 text-primary"
                    >
                      <Sparkles className="h-8 w-8" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Body Content */}
            <div className="flex-1 min-w-0 relative z-10 text-center md:text-left">
              <div className="flex flex-col gap-2">
                <motion.h3
                  animate={{
                    color: task.is_completed ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,1)",
                  }}
                  className={cn(
                    "font-black text-3xl lg:text-4xl tracking-tighter transition-all duration-700",
                    task.is_completed && "line-through italic"
                  )}
                >
                  {task.title}
                </motion.h3>

                {task.description && (
                  <motion.p
                    animate={{ opacity: task.is_completed ? 0.05 : 0.6 }}
                    className="text-white/80 text-lg lg:text-xl line-clamp-2 leading-tight font-medium font-mono"
                  >
                    {`>> ${task.description}`}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Action Systems */}
            <div className="flex items-center gap-4 relative z-10 shrink-0">
              <div className="flex gap-2 p-3 bg-white/[0.03] border border-white/5 backdrop-blur-md">
                <EditTaskDialog
                  task={task}
                  onTaskUpdated={onTaskUpdated}
                />
                <div className="w-[1px] h-6 bg-white/10 self-center mx-1" />
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

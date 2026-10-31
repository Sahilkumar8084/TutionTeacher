import { GraduationCap } from "lucide-react";

export default function AppName() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-content shadow-sm px-2">
        <GraduationCap size={20} />
      </span>
      <span className="text-lg font-bold tracking-tight">TutionTeacher</span>
    </div>
  );
}
export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import HabitForm from "@/components/habit-form";
import HabitItem from "@/components/habit-item";

export default async function HabitsPage() {
  const habits = await prisma.habit.findMany({
    include: {
      logs: {
        where: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lte: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      },
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mega habits</h1>
        <HabitForm />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {habits.map((habit) => (
          <HabitItem key={habit.id} id={habit.id} title={habit.title} logs={habit.logs} />
        ))}
      </div>
    </div>
  );
}

type Props = {
    skills: Record<string, number>;
    updateSkill: (id: string, value: number) => void;
};

const SKILLS = [
    { id: "skill-001", name: "Python" },
    { id: "skill-002", name: "SQL" },
    { id: "skill-003", name: "ETL Concepts" },
    { id: "skill-004", name: "Data Modeling" },
    { id: "skill-005", name: "Airflow (Basics)" },
    { id: "skill-006", name: "Git" },
];

export default function SkillSelector({ skills, updateSkill }: Props) {
    return (
        <div className="space-y-6">
            {SKILLS.map((skill) => (
                <div
                    key={skill.id}
                    className="
              flex items-center justify-between
              p-4 rounded-md
              border border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800
            "
                >
                    <span className="font-medium">
                        {skill.name}
                    </span>

                    <select
                        value={skills[skill.id] ?? 0}
                        onChange={(e) =>
                            updateSkill(skill.id, Number(e.target.value))
                        }
                        className="
                border rounded-md px-3 py-2 text-sm
                bg-white dark:bg-gray-900
                border-gray-300 dark:border-gray-600
              "
                    >
                        <option value={0}>Not Started</option>
                        <option value={1}>Beginner</option>
                        <option value={2}>Basic</option>
                        <option value={3}>Intermediate</option>
                        <option value={4}>Advanced</option>
                        <option value={5}>Expert</option>
                    </select>
                </div>
            ))}
        </div>
    );
}
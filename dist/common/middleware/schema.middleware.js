export const validateRequest = (rules) => {
    return (incoming, outgoing, forward) => {
        const problems = [];
        const sections = ["body", "params", "query"];
        for (const sectionKey of sections) {
            const sectionSchema = rules[sectionKey];
            if (!sectionSchema) {
                continue;
            }
            const outcome = sectionSchema.safeParse(incoming[sectionKey]);
            if (!outcome.success) {
                problems.push(...outcome.error.issues.map((issue) => issue.message));
            }
        }
        if (problems.length > 0) {
            return outgoing.status(400).json({
                success: false,
                message: "Validation Error",
                errors: problems,
            });
        }
        forward();
    };
};

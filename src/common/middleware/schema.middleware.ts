import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

interface ValidationSections {
    body?: ZodType;
    params?: ZodType;
    query?: ZodType;
}

export const validateRequest = (rules: ValidationSections) => {
    return (
        incoming: Request,
        outgoing: Response,
        forward: NextFunction
    ): void | Response => {
        const problems: string[] = [];

        const sections: (keyof ValidationSections)[] = ["body", "params", "query"];

        for (const sectionKey of sections) {
            const sectionSchema = rules[sectionKey];

            if (!sectionSchema) {
                continue;
            }

            const outcome = sectionSchema.safeParse(incoming[sectionKey]);

            if (!outcome.success) {
                problems.push(
                    ...outcome.error.issues.map((issue) => issue.message)
                );
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

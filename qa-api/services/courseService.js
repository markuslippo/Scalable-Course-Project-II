import { sql } from "../database/database.js";

const fetchCourses = async () => {
    try {
        return await sql`
        SELECT id, title, description 
        FROM courses;`;
    } catch (error) {
        console.error("Failed to fetch courses:", error);
        throw new Error("Failed to fetch courses");
    } 
};

export { fetchCourses }
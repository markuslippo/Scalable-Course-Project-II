import * as courseService from "../services/courseService.js"
import { cacheMethodCalls } from "../util/cacheUtil.js";

const cachedCourseService = cacheMethodCalls(courseService, []);

const fetchCourses = async () => {
  	return await cachedCourseService.fetchCourses();
  };

export { fetchCourses }
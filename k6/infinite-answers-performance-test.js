

import http from "k6/http";
import { sleep } from "k6";

export const options = {
    stages: [
      { duration: '2s', target: 10 }, 
      { duration: '5s', target: 10 }, 
      { duration: '2s', target: 0 },  
    ],
};

export default function () {
  http.get("http://localhost:7800/courses/4/questions/3");
  sleep(1);
}
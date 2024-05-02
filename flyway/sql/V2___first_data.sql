INSERT INTO courses (title, description) VALUES ('Basics', 'This course contains the basic elements of this web page.');
INSERT INTO courses (title, description) VALUES ('Infinite scrolling questions', 'This course contains questions to test infinite scrolling.');
INSERT INTO courses (title, description) VALUES ('Empty Course', 'This course does not contain anything yet.');
INSERT INTO courses (title, description) VALUES ('Infinite scrolling answers', 'This course contains answers to test infinite scrolling.');


INSERT INTO questions (course_id, user_uuid, title, body) VALUES (1, 'Test user', 'Best Practices for Handling High Traffic on a Web Application', 'Hi everyone, I''ve been working on a project for this course where I expect to handle a large number of concurrent users. I''m curious about what best practices you would recommend for managing high traffic on a web application?');
INSERT INTO questions (course_id, user_uuid, title, body) VALUES (1, 'Test user', 'Microservices Architecture for Scalability: Pros and Cons', 'Hello! I''m currently exploring different architectural designs for my course project and I''m leaning towards using a microservices architecture to ensure scalability. Could anyone share their experiences with microservices, particularly the benefits and challenges you''ve faced in terms of scalability, development, and maintenance?');
INSERT INTO questions (course_id, user_uuid, title, body) VALUES (1, 'Test user', 'Question title', 'This question is very bad');
INSERT INTO questions (course_id, user_uuid, title, body) VALUES (1, 'Test user', 'Question title 2', 'This question is very good');

INSERT INTO answers (question_id, user_uuid, body) VALUES (1, 'Test user', 'When it comes to managing high traffic on a web application, several best practices can help ensure scalability and performance:
Load Balancing: Distribute incoming traffic across multiple servers to prevent overloading any single server. Use load balancers such as NGINX, HAProxy, or AWS Elastic Load Balancing.

Caching: Implement caching mechanisms to store frequently accessed data or computed results. This reduces the load on the backend servers and improves response times. Tools like Redis or Memcached are commonly used for caching.

Database Optimization: Optimize database queries, indexes, and schema to improve performance. Consider using database replication, sharding, or NoSQL solutions for horizontal scalability.

Content Delivery Networks (CDNs): Utilize CDNs to cache static content like images, CSS, and JavaScript files closer to the users, reducing latency and server load.

Horizontal Scaling: Scale out by adding more server instances to handle increased traffic. Containerization and orchestration tools like Docker and Kubernetes simplify the management of a large number of instances.

Monitoring and Auto-scaling: Set up monitoring tools to track server performance, traffic patterns, and resource utilization. Implement auto-scaling solutions to automatically adjust the number of server instances based on predefined metrics.

Optimized Code and Resources: Write efficient code and optimize resource usage to maximize server capacity. Minimize the number of HTTP requests, use asynchronous processing, and compress data where possible.');

INSERT INTO answers (question_id, user_uuid, body) VALUES (1, 'Test user', 'I dont know');
INSERT INTO answers (question_id, user_uuid, body) VALUES (1, 'Test user', 'What should I eat');


INSERT INTO answers (question_id, user_uuid, body) VALUES (2, 'Test user', 'Microservices architecture offers several benefits and challenges in terms of scalability, development, and maintenance:
Pros:

Scalability: Microservices allow individual components of an application to be scaled independently based on demand, enabling better resource utilization and scalability.

Flexibility and Agility: Each microservice can be developed, deployed, and maintained independently, promoting agility and faster time-to-market for new features or updates.

Fault Isolation: Isolating services from each other helps contain failures, preventing them from affecting the entire system. This enhances resilience and fault tolerance.

Technology Diversity: Different microservices can be built using diverse technologies and programming languages, allowing teams to choose the best tools for each specific task.

Cons:

Complexity: Managing a large number of microservices introduces complexity in deployment, monitoring, and orchestration. This complexity can increase operational overhead and require specialized skills.

Communication Overhead: Inter-service communication adds latency and overhead, especially in distributed environments. Implementing efficient communication patterns and protocols is crucial for performance.

Data Management Challenges: Maintaining data consistency and coherence across multiple microservices can be challenging, particularly in distributed transactions and data migrations.

Deployment and Testing Complexity: Coordinating the deployment and testing of multiple microservices, along with their dependencies, requires robust automation and continuous integration/continuous deployment (CI/CD) pipelines.');
INSERT INTO answers (question_id, user_uuid, body) VALUES (2, 'Test user', 'Same as this ^');
INSERT INTO answers (question_id, user_uuid, body) VALUES (2, 'Test user', 'Yeah I agree');


INSERT INTO questions (course_id, user_uuid, title, body) VALUES (4, 'Test user', 'Infinite answers question', 'How can I create infinite answers to this question?');

DO $$
BEGIN
    FOR i IN 1..65 LOOP
        INSERT INTO questions (course_id, user_uuid, title, body)
        VALUES (2, 'Test user', 'Infinite scrolling ', 'This is the question body for infinite scrolling question');

        INSERT INTO answers (question_id, user_uuid, body)
        VALUES (5, 'Test user', 'This is the infinite scroll answer');
    END LOOP;
END $$;

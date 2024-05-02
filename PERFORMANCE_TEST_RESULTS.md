# Fetching courses performance:

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: courses-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 39s max duration (incl. graceful stop):
           * default: Up to 10 looping VUs for 9s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 1.4 MB 145 kB/s
     data_sent......................: 5.8 kB 594 B/s
     http_req_blocked...............: avg=156.55µs min=0s      med=0s      max=8.92ms  p(90)=0s      p(95)=358.85µs
     http_req_connecting............: avg=31.51µs  min=0s      med=0s      max=1.01ms  p(90)=0s      p(95)=64.57µs
     http_req_duration..............: avg=39.43ms  min=25.72ms med=34.68ms max=65.89ms p(90)=54.24ms p(95)=57.7ms
       { expected_response:true }...: avg=39.43ms  min=25.72ms med=34.68ms max=65.89ms p(90)=54.24ms p(95)=57.7ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 72
     http_req_receiving.............: avg=78.25µs  min=0s      med=0s      max=1.5ms   p(90)=53.18µs p(95)=571.3µs
     http_req_sending...............: avg=1.14µs   min=0s      med=0s      max=82.6µs  p(90)=0s      p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=39.35ms  min=25.72ms med=34.58ms max=65.89ms p(90)=54.24ms p(95)=57.24ms
     http_reqs......................: 72     7.420285/s
     iteration_duration.............: avg=1.04s    min=1.02s   med=1.04s   max=1.07s   p(90)=1.06s   p(95)=1.06s
     iterations.....................: 72     7.420285/s
     vus............................: 3      min=3      max=10
     vus_max........................: 10     min=10     max=10


running (09.7s), 00/10 VUs, 72 complete and 0 interrupted iterations


# Fetching questions performance:

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: questions-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 39s max duration (incl. graceful stop):
           * default: Up to 10 looping VUs for 9s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 1.4 MB 145 kB/s
     data_sent......................: 6.4 kB 657 B/s
     http_req_blocked...............: avg=113.57µs min=0s    med=0s      max=6.21ms  p(90)=0s      p(95)=315.34µs
     http_req_connecting............: avg=17.83µs  min=0s    med=0s      max=745.6µs p(90)=0s      p(95)=0s
     http_req_duration..............: avg=42.57ms  min=27ms  med=35.16ms max=99.47ms p(90)=61.18ms p(95)=67.4ms
       { expected_response:true }...: avg=42.57ms  min=27ms  med=35.16ms max=99.47ms p(90)=61.18ms p(95)=67.4ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 72
     http_req_receiving.............: avg=28.98µs  min=0s    med=0s      max=996.7µs p(90)=0s      p(95)=18.18µs
     http_req_sending...............: avg=15.28µs  min=0s    med=0s      max=539.6µs p(90)=0s      p(95)=14.31µs
     http_req_tls_handshaking.......: avg=0s       min=0s    med=0s      max=0s      p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=42.52ms  min=27ms  med=35.16ms max=99.47ms p(90)=61.17ms p(95)=67.14ms
     http_reqs......................: 72     7.385166/s
     iteration_duration.............: avg=1.05s    min=1.03s med=1.04s   max=1.1s    p(90)=1.07s   p(95)=1.07s
     iterations.....................: 72     7.385166/s
     vus............................: 3      min=3      max=10
     vus_max........................: 10     min=10     max=10


running (09.7s), 00/10 VUs, 72 complete and 0 interrupted iterations


# Fetching 20 questions perfomance

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: infinite-questions-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 39s max duration (incl. graceful stop):
           * default: Up to 10 looping VUs for 9s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 1.5 MB 151 kB/s
     data_sent......................: 6.6 kB 685 B/s
     http_req_blocked...............: avg=144.23µs min=0s      med=0s      max=6.98ms  p(90)=0s       p(95)=535.04µs
     http_req_connecting............: avg=35.23µs  min=0s      med=0s      max=1.46ms  p(90)=0s       p(95)=0s
     http_req_duration..............: avg=39.73ms  min=26.66ms med=34.69ms max=85.33ms p(90)=59.47ms  p(95)=69.68ms
       { expected_response:true }...: avg=39.73ms  min=26.66ms med=34.69ms max=85.33ms p(90)=59.47ms  p(95)=69.68ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 74
     http_req_receiving.............: avg=100.9µs  min=0s      med=0s      max=1.36ms  p(90)=515.27µs p(95)=612.93µs
     http_req_sending...............: avg=20.17µs  min=0s      med=0s      max=960.5µs p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s      p(90)=0s       p(95)=0s
     http_req_waiting...............: avg=39.61ms  min=26.66ms med=34.44ms max=84.82ms p(90)=59.47ms  p(95)=69.65ms
     http_reqs......................: 74     7.697549/s
     iteration_duration.............: avg=1.04s    min=1.02s   med=1.04s   max=1.09s   p(90)=1.06s    p(95)=1.07s
     iterations.....................: 74     7.697549/s
     vus............................: 4      min=4      max=10
     vus_max........................: 10     min=10     max=10


running (09.6s), 00/10 VUs, 74 complete and 0 interrupted iterations




# Fetching 20 answers performance 

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: infinite-answers-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 10 max VUs, 39s max duration (incl. graceful stop):
           * default: Up to 10 looping VUs for 9s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


     data_received..................: 1.4 MB 146 kB/s
     data_sent......................: 7.3 kB 751 B/s
     http_req_blocked...............: avg=126.65µs min=0s      med=0s      max=7.99ms   p(90)=0s      p(95)=0s
     http_req_connecting............: avg=15.97µs  min=0s      med=0s      max=607.9µs  p(90)=0s      p(95)=0s
     http_req_duration..............: avg=38.16ms  min=28.05ms med=34.46ms max=73.64ms  p(90)=53.75ms p(95)=57.53ms
       { expected_response:true }...: avg=38.16ms  min=28.05ms med=34.46ms max=73.64ms  p(90)=53.75ms p(95)=57.53ms
     http_req_failed................: 0.00%  ✓ 0        ✗ 72
     http_req_receiving.............: avg=68.98µs  min=0s      med=0s      max=1.34ms   p(90)=0s      p(95)=524.7µs
     http_req_sending...............: avg=18.4µs   min=0s      med=0s      max=561.69µs p(90)=0s      p(95)=35.46µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s
     http_req_waiting...............: avg=38.07ms  min=27.73ms med=34.46ms max=73.64ms  p(90)=53.68ms p(95)=57.53ms
     http_reqs......................: 72     7.433706/s
     iteration_duration.............: avg=1.04s    min=1.03s   med=1.04s   max=1.08s    p(90)=1.05s   p(95)=1.07s
     iterations.....................: 72     7.433706/s
     vus............................: 3      min=3      max=10
     vus_max........................: 10     min=10     max=10


running (09.7s), 00/10 VUs, 72 complete and 0 interrupted iterations
default ✓ [======================================] 00/10 VUs  9s


# Submit answer performance

          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: submit-answer-performance-test.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * ui: 5 iterations shared among 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


     browser_data_received.......: 1.8 MB 192 kB/s
     browser_data_sent...........: 62 kB  6.6 kB/s
     browser_http_req_duration...: avg=14.72ms  min=2.29ms   med=13ms     max=44.67ms  p(90)=26.16ms  p(95)=28.49ms
     browser_http_req_failed.....: 0.00%  ✓ 0        ✗ 140
     browser_web_vital_cls.......: avg=0.06018  min=0.05     med=0.062725 max=0.062725 p(90)=0.062725 p(95)=0.062725
     browser_web_vital_fcp.......: avg=148.16ms min=138.39ms med=146.9ms  max=167.6ms  p(90)=159.48ms p(95)=163.54ms
     browser_web_vital_fid.......: avg=360µs    min=200µs    med=200µs    max=900µs    p(90)=660µs    p(95)=780µs
     browser_web_vital_inp.......: avg=17.6ms   min=16ms     med=16ms     max=24ms     p(90)=20.8ms   p(95)=22.4ms
     browser_web_vital_lcp.......: avg=148.16ms min=138.39ms med=146.9ms  max=167.6ms  p(90)=159.48ms p(95)=163.54ms
     browser_web_vital_ttfb......: avg=35.94ms  min=30.5ms   med=34.3ms   max=44ms     p(90)=41.4ms   p(95)=42.7ms
     data_received...............: 0 B    0 B/s
     data_sent...................: 0 B    0 B/s
     iteration_duration..........: avg=1.47s    min=1.43s    med=1.45s    max=1.51s    p(90)=1.5s     p(95)=1.5s
     iterations..................: 5      0.539356/s
     vus.........................: 1      min=1      max=1
     vus_max.....................: 1      min=1      max=1


running (00m09.3s), 0/1 VUs, 5 complete and 0 interrupted iterations
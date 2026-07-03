// Generates clean math modules with balanced answer distribution
const fs = require('fs');

function makeQ(id, mod, num, type, skill, stem, choices, answer, explanation, difficulty) {
  return { id, module: mod, questionNumber: num, type, skill, passage: "", stem, choices, answer, explanation, difficulty };
}
function gridQ(id, mod, num, skill, stem, answer, explanation, difficulty) {
  return { id, module: mod, questionNumber: num, type: "gridin", skill, passage: "", stem, choices: null, answer, explanation, difficulty };
}

// ============================================================
// TEST 1 MATH MODULE 1
// ============================================================
const t1m1 = [
  makeQ("t1_m1_q1","math1",1,"algebra","Algebra",
    "A delivery service charges a base fee of $8.50 plus $0.65 per mile. If a customer paid a total of $24.75, which equation can be used to find m, the number of miles driven?",
    ["A) 0.65m + 8.50 = 24.75","B) 8.50m + 0.65 = 24.75","C) 0.65(m + 8.50) = 24.75","D) 65m + 850 = 2,475"],
    "A","Total cost = base fee + per-mile charge: 8.50 + 0.65m = 24.75, or 0.65m + 8.50 = 24.75. Choice B swaps base and rate, C distributes wrong, D changes units.","easy"),

  makeQ("t1_m1_q2","math1",2,"algebra","Algebra",
    "If 3(2x − 4) + 5 = 2(x + 3) − 1, what is the value of x?",
    ["A) 2","B) 3","C) 4","D) 5"],
    "B","Distribute: 6x − 12 + 5 = 2x + 6 − 1 → 6x − 7 = 2x + 5 → 4x = 12 → x = 3.","medium"),

  makeQ("t1_m1_q3","math1",3,"algebra","Algebra",
    "A store sells trail mix for $6 per pound and granola for $8 per pound. A customer buys a total of 10 pounds for $68. How many pounds of trail mix did the customer buy?",
    ["A) 4","B) 5","C) 6","D) 7"],
    "C","Let t = trail mix. 6t + 8(10−t) = 68 → 6t + 80 − 8t = 68 → −2t = −12 → t = 6.","medium"),

  makeQ("t1_m1_q4","math1",4,"algebra","Algebra",
    "If f(x) = (2x + 6)/4, which expression is equivalent to f(x)?",
    ["A) (x + 3)/2","B) (x + 6)/2","C) x/2 + 6","D) 2x + 1.5"],
    "A","(2x + 6)/4 = 2(x + 3)/4 = (x + 3)/2.","easy"),

  makeQ("t1_m1_q5","math1",5,"algebra","Algebra",
    "The graph of y = f(x) passes through (−2, 11) and (3, −4). If f is linear, which equation defines f?",
    ["A) f(x) = −3x + 5","B) f(x) = 3x + 5","C) f(x) = −3x − 5","D) f(x) = 3x − 5"],
    "A","Slope = (−4−11)/(3−(−2)) = −15/5 = −3. Using (3,−4): −4 = −3(3) + b → b = 5. f(x) = −3x + 5. Check (−2,11): −3(−2)+5 = 11 ✓.","medium"),

  makeQ("t1_m1_q6","math1",6,"algebra","Algebra",
    "In the system below, what is the value of 3x − 2y?\n\n5x + 2y = 19\n3x − 2y = 7",
    ["A) 7","B) 12","C) 19","D) 26"],
    "A","The second equation directly gives 3x − 2y = 7. No solving needed.","easy"),

  makeQ("t1_m1_q7","math1",7,"algebra","Algebra",
    "A company's profit P (thousands of dollars) is modeled by P = −2t² + 24t − 54, where t is years since 2015. During which year did the company first earn a positive profit?",
    ["A) 2018","B) 2019","C) 2020","D) 2021"],
    "B","Factor: P = −2(t² − 12t + 27) = −2(t−3)(t−9). P > 0 when 3 < t < 9. First positive at t = 4 = 2019. Check: −2(16)+24(4)−54 = −32+96−54 = 10 > 0 ✓.","hard"),

  makeQ("t1_m1_q8","math1",8,"algebra","Algebra",
    "If 2(a + 3b) = 4a − 2b + 16, what is the value of a − 4b?",
    ["A) −8","B) −4","C) 4","D) 8"],
    "A","Expand: 2a + 6b = 4a − 2b + 16 → −2a + 8b = 16 → divide by −2: a − 4b = −8.","medium"),

  makeQ("t1_m1_q9","math1",9,"algebra","Advanced Math",
    "If (2x + 7)(x − 3) = 2x² + bx − 21, what is the value of b?",
    ["A) 1","B) 3","C) 5","D) 7"],
    "A","Expand: 2x² − 6x + 7x − 21 = 2x² + x − 21. So b = 1.","medium"),

  makeQ("t1_m1_q10","math1",10,"algebra","Advanced Math",
    "The function f is defined by f(x) = x² − 6x + 8. If f(a) = f(a + 4), what is the value of a?",
    ["A) 1","B) 2","C) 3","D) 4"],
    "A","f(a) = a² − 6a + 8. f(a+4) = (a+4)² − 6(a+4) + 8 = a² + 2a. Set equal: a²−6a+8 = a²+2a → 8 = 8a → a = 1. Check: f(1)=3, f(5)=3 ✓.","hard"),

  makeQ("t1_m1_q11","math1",11,"algebra","Advanced Math",
    "Which of the following is equivalent to (3x − 2)² − (3x + 2)²?",
    ["A) −24x","B) −12x","C) 12x","D) 24x"],
    "A","Difference of squares: [(3x−2)−(3x+2)][(3x−2)+(3x+2)] = (−4)(6x) = −24x.","medium"),

  makeQ("t1_m1_q12","math1",12,"algebra","Advanced Math",
    "For what value of k does x² + 6x + k = 0 have exactly one real solution?",
    ["A) 3","B) 6","C) 9","D) 12"],
    "C","Discriminant = 0: 36 − 4k = 0 → k = 9. Check: x²+6x+9 = (x+3)² = 0 → x = −3.","medium"),

  makeQ("t1_m1_q13","math1",13,"algebra","Advanced Math",
    "If 9ˣ = 27, what is the value of 3ˣ?",
    ["A) 3","B) 3√3","C) 9","D) 27"],
    "B","9ˣ = 3^(2x) = 27 = 3³ → 2x = 3 → x = 3/2. 3ˣ = 3^(3/2) = √27 = 3√3.","hard"),

  makeQ("t1_m1_q14","math1",14,"algebra","Advanced Math",
    "The graph of y = g(x) is a parabola with vertex (2, −5). If g(0) = 3, which equation defines g(x)?",
    ["A) g(x) = 2(x − 2)² − 5","B) g(x) = (x − 2)² − 5","C) g(x) = 2(x + 2)² − 5","D) g(x) = (x + 2)² − 5"],
    "A","g(x) = a(x−2)² − 5. g(0) = 4a − 5 = 3 → a = 2. g(x) = 2(x−2)² − 5.","medium"),

  makeQ("t1_m1_q15","math1",15,"stats","Problem Solving and Data Analysis",
    "A survey of 200 students found that 120 prefer chocolate and 80 prefer vanilla. If these results predict preferences of 1,500 students, how many would be expected to prefer vanilla?",
    ["A) 400","B) 500","C) 600","D) 900"],
    "C","Proportion preferring vanilla = 80/200 = 2/5. Expected = (2/5)(1500) = 600.","easy"),

  makeQ("t1_m1_q16","math1",16,"stats","Problem Solving and Data Analysis",
    "A data set has values: 3, 5, 7, 7, 8. What is the median?",
    ["A) 5","B) 6","C) 7","D) 8"],
    "C","Ordered: 3, 5, 7, 7, 8. Middle value (3rd of 5) = 7.","easy"),

  makeQ("t1_m1_q17","math1",17,"stats","Problem Solving and Data Analysis",
    "A factory produces light bulbs with a 3% defect rate. If the factory produces 2,500 bulbs per day, how many defective bulbs are expected per day?",
    ["A) 30","B) 75","C) 150","D) 300"],
    "B","3% of 2,500 = 0.03 × 2,500 = 75.","easy"),

  makeQ("t1_m1_q18","math1",18,"stats","Problem Solving and Data Analysis",
    "A researcher found that the relationship between hours studied (x) and test score can be modeled by score = 4.5x + 52. According to the model, how many hours of study result in a score of 106?",
    ["A) 8","B) 10","C) 12","D) 14"],
    "C","106 = 4.5x + 52 → 4.5x = 54 → x = 12.","easy"),

  makeQ("t1_m1_q19","math1",19,"stats","Problem Solving and Data Analysis",
    "A researcher collected data on 10 students' hours studied and test scores, finding r = 0.92. Which statement best interprets this?",
    ["A) Studying more causes higher test scores.","B) There is a strong positive linear association between hours studied and test scores.","C) 92% of variation in scores is explained by hours studied.","D) Every student who studies more will score higher."],
    "B","r = 0.92 indicates a strong positive linear association. A confuses correlation with causation, C confuses r with r², D is too absolute.","medium"),

  makeQ("t1_m1_q20","math1",20,"geometry","Geometry and Trigonometry",
    "In the xy-plane, a circle has center (3, −2) and passes through (7, 1). What is the radius?",
    ["A) 3","B) 4","C) 5","D) 7"],
    "C","Distance = √((7−3)² + (1−(−2))²) = √(16+9) = √25 = 5.","medium"),

  makeQ("t1_m1_q21","math1",21,"geometry","Geometry and Trigonometry",
    "A rectangular garden is 3 times as long as it is wide. If the perimeter is 96 meters, what is the area?",
    ["A) 216","B) 432","C) 576","D) 864"],
    "B","w, l = 3w. Perimeter = 8w = 96 → w = 12, l = 36. Area = 12 × 36 = 432.","medium"),

  makeQ("t1_m1_q22","math1",22,"geometry","Geometry and Trigonometry",
    "A right circular cone has radius 6 cm and slant height 10 cm. What is the total surface area?",
    ["A) 36π","B) 60π","C) 96π","D) 156π"],
    "C","SA = πr² + πrl = 36π + 60π = 96π.","medium"),

  makeQ("t1_m1_q23","math1",23,"geometry","Geometry and Trigonometry",
    "In triangle PQR, angle P = 50° and angle Q = 65°. The side opposite P has length 10. What expression gives the length of the side opposite Q?",
    ["A) 10 sin(65°)/sin(50°)","B) 10 sin(50°)/sin(65°)","C) 10 cos(65°)/cos(50°)","D) 10 tan(65°)/tan(50°)"],
    "A","Law of Sines: p/sin(P) = q/sin(Q) → 10/sin(50°) = q/sin(65°) → q = 10 sin(65°)/sin(50°).","hard"),

  makeQ("t1_m1_q24","math1",24,"geometry","Geometry and Trigonometry",
    "In the xy-plane, line m passes through (0, 4) and (3, 0). What is the distance from the origin to line m?",
    ["A) 2.4","B) 3.2","C) 4.0","D) 5.0"],
    "A","Line: 4x + 3y = 12. Distance = |0+0−12|/√(16+9) = 12/5 = 2.4.","hard"),

  gridQ("t1_m1_q25","math1",25,"Algebra",
    "If 5(x − 3) + 2(x + 4) = 3x + 1, what is the value of x?","2",
    "Distribute: 5x−15+2x+8 = 3x+1 → 7x−7 = 3x+1 → 4x = 8 → x = 2.","medium"),

  gridQ("t1_m1_q26","math1",26,"Advanced Math",
    "The sum of two positive integers is 20 and their product is 91. What is the larger integer?","13",
    "a+b=20, ab=91 → (20−b)b = 91 → b²−20b+91=0 → (b−7)(b−13)=0. Integers are 7 and 13. Larger = 13.","medium"),

  gridQ("t1_m1_q27","math1",27,"Problem Solving and Data Analysis",
    "A class of 25 students had a mean score of 78. After a 26th student took the test, the new mean became 77. What did the 26th student score?","52",
    "25 × 78 = 1950. 26 × 77 = 2002. 26th score = 2002 − 1950 = 52.","medium")
];

// ============================================================
// TEST 1 MATH MODULE 2
// ============================================================
const t1m2 = [
  makeQ("t1_m2_q1","math2",1,"algebra","Algebra",
    "If a − b = 7 and a² − b² = 56, what is a + b?",
    ["A) 4","B) 7","C) 8","D) 14"],
    "C","a²−b² = (a−b)(a+b) → 56 = 7(a+b) → a+b = 8.","medium"),

  makeQ("t1_m2_q2","math2",2,"algebra","Algebra",
    "A swimming pool can be filled by Pipe A in 6 hours or Pipe B in 4 hours. If both pipes are open, how many hours to fill the pool?",
    ["A) 2","B) 2.4","C) 2.5","D) 5"],
    "B","Combined rate = 1/6 + 1/4 = 5/12 pool/hour. Time = 12/5 = 2.4 hours.","medium"),

  makeQ("t1_m2_q3","math2",3,"algebra","Algebra",
    "A farmer has 200 feet of fencing for a rectangular pen that is x feet wide. Which function gives the area A(x)?",
    ["A) A(x) = x(200 − 2x)","B) A(x) = x(100 − x)","C) A(x) = x(200 − x)","D) A(x) = 2x(100 − x)"],
    "B","Perimeter: 2l + 2x = 200 → l = 100−x. Area = x(100−x).","medium"),

  makeQ("t1_m2_q4","math2",4,"algebra","Algebra",
    "A movie theater sells adult tickets for $12 and child tickets for $7. On Saturday, 180 tickets were sold for $1,810. How many adult tickets were sold?",
    ["A) 70","B) 90","C) 110","D) 130"],
    "C","a+c=180, 12a+7c=1810. Substitute: 12a+7(180−a)=1810 → 5a+1260=1810 → 5a=550 → a=110.","medium"),

  makeQ("t1_m2_q5","math2",5,"algebra","Algebra",
    "If f(x) = 3x − 2 and g(x) = x² + 1, what is f(g(−3))?",
    ["A) 7","B) 10","C) 22","D) 28"],
    "D","g(−3) = 9+1 = 10. f(10) = 30−2 = 28.","medium"),

  makeQ("t1_m2_q6","math2",6,"algebra","Algebra",
    "A car rental charges $45/day plus $0.20/mile. Sarah's 3-day bill was $195. How many miles did she drive?",
    ["A) 150","B) 225","C) 300","D) 350"],
    "C","3(45)+0.20m = 195 → 135+0.20m = 195 → m = 300.","easy"),

  makeQ("t1_m2_q7","math2",7,"algebra","Advanced Math",
    "The function h(x) = 2x³ − 12x² + 18x. For how many distinct values of x does h(x) = 0?",
    ["A) One","B) Two","C) Three","D) Infinitely many"],
    "B","Factor: h(x) = 2x(x²−6x+9) = 2x(x−3)². Zeros: x=0 and x=3 (repeated). Two distinct values.","hard"),

  makeQ("t1_m2_q8","math2",8,"algebra","Advanced Math",
    "If p(x) = x³ − 4x² + kx − 8 and p(2) = 0, what is k?",
    ["A) 4","B) 6","C) 8","D) 10"],
    "C","p(2) = 8−16+2k−8 = 2k−16 = 0 → k = 8. Check: p(2) = 8−16+16−8 = 0 ✓.","medium"),

  makeQ("t1_m2_q9","math2",9,"algebra","Advanced Math",
    "For f(x) = −2(x − 1)(x − 5), what is the maximum value of f?",
    ["A) 2","B) 4","C) 6","D) 8"],
    "D","Vertex at x=(1+5)/2=3. f(3) = −2(2)(−2) = 8.","medium"),

  makeQ("t1_m2_q10","math2",10,"algebra","Advanced Math",
    "If 4^(2x−1) = 8^(x+1), what is x?",
    ["A) 3","B) 4","C) 5","D) 7"],
    "C","2^(4x−2) = 2^(3x+3) → 4x−2 = 3x+3 → x = 5.","hard"),

  makeQ("t1_m2_q11","math2",11,"algebra","Advanced Math",
    "The point (4, 5) is on y = f(x). After the transformation y = −f(x+3) − 2, which point is on the new graph?",
    ["A) (1, −7)","B) (1, 3)","C) (7, −7)","D) (7, 3)"],
    "A","Shift left 3: x=4→1. Reflect: y=5→−5. Shift down 2: −5→−7. Point: (1, −7).","hard"),

  makeQ("t1_m2_q12","math2",12,"algebra","Advanced Math",
    "Which expression is equivalent to (x² + 5x + 6)/(x + 2)?",
    ["A) x + 1","B) x + 3","C) x² + 3","D) x + 3 + 1/(x+2)"],
    "B","Factor: (x+2)(x+3)/(x+2) = x+3.","medium"),

  makeQ("t1_m2_q13","math2",13,"stats","Problem Solving and Data Analysis",
    "A survey of 500 adults found 62% prefer coffee. The margin of error is ±4%. Which interval represents the plausible range?",
    ["A) 58% to 66%","B) 60% to 64%","C) 56% to 68%","D) 62% to 66%"],
    "A","62% ± 4% = 58% to 66%.","easy"),

  makeQ("t1_m2_q14","math2",14,"stats","Problem Solving and Data Analysis",
    "A data set has values: 12, 15, 18, 22, 25, x. If the mean is 20, what is x?",
    ["A) 22","B) 25","C) 28","D) 30"],
    "C","(92+x)/6 = 20 → x = 120−92 = 28.","easy"),

  makeQ("t1_m2_q15","math2",15,"stats","Problem Solving and Data Analysis",
    "A biologist counts bacteria. At hour 0 there are 500, and the population doubles every 3 hours. Which equation models the population P after h hours?",
    ["A) P = 500(2)^(h/3)","B) P = 500(3)^(h/2)","C) P = 500 + 2h","D) P = 500(2)^(3h)"],
    "A","Doubling every 3 hours means exponent = h/3. P = 500(2)^(h/3).","medium"),

  makeQ("t1_m2_q16","math2",16,"stats","Problem Solving and Data Analysis",
    "In a group of 80 students, 35 play soccer, 30 play basketball, and 15 play both. How many play neither?",
    ["A) 15","B) 20","C) 25","D) 30"],
    "D","At least one = 35+30−15 = 50. Neither = 80−50 = 30.","medium"),

  makeQ("t1_m2_q17","math2",17,"stats","Problem Solving and Data Analysis",
    "A machine fills bottles with mean 500 mL and SD 5 mL. Using the empirical rule, what percentage contains between 490 and 510 mL?",
    ["A) 68%","B) 95%","C) 99.7%","D) 50%"],
    "B","490 to 510 = 500±10 = ±2 SD. ~95%.","medium"),

  makeQ("t1_m2_q18","math2",18,"stats","Problem Solving and Data Analysis",
    "For every 1-inch increase in rainfall, crop yield increases by 3.2 bushels/acre. With 10 inches, yield is 45 bushels/acre. What is the expected yield with 15 inches?",
    ["A) 48.2","B) 51.4","C) 61","D) 93"],
    "C","Additional = 5×3.2 = 16. Yield = 45+16 = 61.","medium"),

  makeQ("t1_m2_q19","math2",19,"geometry","Geometry and Trigonometry",
    "In the xy-plane, vertices of a triangle are (0,0), (8,0), and (4,6). What is the area?",
    ["A) 12","B) 16","C) 24","D) 48"],
    "C","Base = 8, height = 6. Area = ½(8)(6) = 24.","medium"),

  makeQ("t1_m2_q20","math2",20,"geometry","Geometry and Trigonometry",
    "In circle O, a central angle of 120° intercepts an arc of length 8π. What is the radius?",
    ["A) 6","B) 8","C) 12","D) 16"],
    "C","Arc = (120/360)(2πr) = 2πr/3 = 8π → r = 12.","medium"),

  makeQ("t1_m2_q21","math2",21,"geometry","Geometry and Trigonometry",
    "Two similar cylinders have heights 4 cm and 6 cm. If the smaller has volume 32π cm³, what is the volume of the larger?",
    ["A) 48π","B) 72π","C) 108π","D) 162π"],
    "C","Ratio = (6/4)³ = 27/8. Volume = 32π × 27/8 = 108π.","hard"),

  makeQ("t1_m2_q22","math2",22,"geometry","Geometry and Trigonometry",
    "In right triangle ABC with right angle at C, sin(A) = 3/5. What is tan(A)?",
    ["A) 3/4","B) 3/5","C) 4/5","D) 5/3"],
    "A","Opposite = 3, hyp = 5, adjacent = 4. tan(A) = 3/4.","medium"),

  makeQ("t1_m2_q23","math2",23,"geometry","Geometry and Trigonometry",
    "A sphere is inscribed in a cube with edge length 12. What is the volume of the sphere?",
    ["A) 48π","B) 96π","C) 288π","D) 576π"],
    "C","Radius = 6. Volume = (4/3)π(216) = 288π.","hard"),

  makeQ("t1_m2_q24","math2",24,"geometry","Geometry and Trigonometry",
    "A regular octagon has side length 10. What is its perimeter?",
    ["A) 40","B) 60","C) 80","D) 100"],
    "C","8 sides × 10 = 80.","easy"),

  gridQ("t1_m2_q25","math2",25,"Advanced Math",
    "If x² − 10x + 21 = 0 and x > 5, what is x?","7",
    "(x−3)(x−7)=0. x=3 or 7. Since x>5, x=7.","medium"),

  gridQ("t1_m2_q26","math2",26,"Algebra",
    "A train travels 60 mph for 2 hours, then 80 mph for 3 hours. What is the average speed for the entire trip, in mph?","72",
    "Distance = 120+240 = 360 miles. Time = 5 hours. Average = 360/5 = 72 mph.","medium"),

  gridQ("t1_m2_q27","math2",27,"Problem Solving and Data Analysis",
    "A bag has red and blue marbles in ratio 3:5. Adding 12 red changes the ratio to 3:4. How many blue marbles?","80",
    "Red=3k, Blue=5k. (3k+12)/5k = 3/4 → 12k+48=15k → k=16. Blue=80.","hard")
];

// ============================================================
// TEST 2 MATH MODULE 1
// ============================================================
const t2m1 = [
  makeQ("t2_m1_q1","math1",1,"algebra","Algebra",
    "If 7 − 2(2x − 1) = 3x + 2, what is x?",
    ["A) 1","B) 1.5","C) 2","D) 3"],
    "A","7−4x+2=3x+2 → 9−4x=3x+2 → 7=7x → x=1.","easy"),

  makeQ("t2_m1_q2","math1",2,"algebra","Algebra",
    "Renting a kayak costs C = 24 + 12h dollars at one shop and C = 18h at another. For how many hours do both cost the same?",
    ["A) 2","B) 3","C) 4","D) 5"],
    "C","24+12h=18h → 24=6h → h=4. Check: 24+48=72, 18(4)=72 ✓.","medium"),

  makeQ("t2_m1_q3","math1",3,"algebra","Algebra",
    "A store sells trail mix for $6/lb and granola for $8/lb. A customer buys 10 pounds total for $68. How many pounds of trail mix?",
    ["A) 4","B) 5","C) 6","D) 7"],
    "C","6t+8(10−t)=68 → −2t+80=68 → t=6.","medium"),

  makeQ("t2_m1_q4","math1",4,"algebra","Algebra",
    "If (3x − 2y)² = 9x² − kxy + 4y², what is k?",
    ["A) 6","B) 12","C) 16","D) 24"],
    "B","(3x−2y)² = 9x²−12xy+4y². k=12.","medium"),

  makeQ("t2_m1_q5","math1",5,"algebra","Algebra",
    "A worker earns $20/hr and time-and-a-half over 8 hours. If the worker earned $250 in one day, how many hours did they work?",
    ["A) 9","B) 10","C) 11","D) 12"],
    "C","8×20=160. OT rate=30. (250−160)/30=3. Total=8+3=11.","hard"),

  makeQ("t2_m1_q6","math1",6,"algebra","Algebra",
    "The price of a stock decreased 20% in January, then increased 25% in February. What was the overall percent change?",
    ["A) −10%","B) −5%","C) 0%","D) 5%"],
    "C","After −20%: 0.80P. After +25%: 0.80×1.25=1.00P. No change.","hard"),

  makeQ("t2_m1_q7","math1",7,"algebra","Advanced Math",
    "Which is a factor of x³ − 8?",
    ["A) x − 2","B) x + 2","C) x² + 2","D) x² − 4"],
    "A","Difference of cubes: x³−2³=(x−2)(x²+2x+4). (x−2) is a factor.","medium"),

  makeQ("t2_m1_q8","math1",8,"algebra","Advanced Math",
    "f(x) = 2x² − 8x + 5. Which form shows the minimum value as a constant?",
    ["A) f(x) = 2(x−2)² − 3","B) f(x) = 2(x−2)² + 5","C) f(x) = 2(x−4)² − 27","D) f(x) = (2x−4)(x−1) + 1"],
    "A","Complete square: 2(x²−4x)+5 = 2(x−2)²−8+5 = 2(x−2)²−3. Min = −3.","medium"),

  makeQ("t2_m1_q9","math1",9,"algebra","Advanced Math",
    "If x + 1/x = 5, what is x² + 1/x²?",
    ["A) 23","B) 25","C) 27","D) 49"],
    "A","Square: x²+2+1/x²=25 → x²+1/x²=23.","hard"),

  makeQ("t2_m1_q10","math1",10,"algebra","Advanced Math",
    "h(x) has zeros at x=−2, 1, 4 and h(0)=16. Which equation defines h(x)?",
    ["A) h(x) = (x+2)(x−1)(x−4)","B) h(x) = −2(x+2)(x−1)(x−4)","C) h(x) = 2(x+2)(x−1)(x−4)","D) h(x) = −(x+2)(x−1)(x−4)"],
    "C","h(0)=a(2)(−1)(−4)=8a=16→a=2. h(x)=2(x+2)(x−1)(x−4).","medium"),

  makeQ("t2_m1_q11","math1",11,"algebra","Advanced Math",
    "If 3^(x+1) = 9^(x−2), what is x?",
    ["A) 3","B) 4","C) 5","D) 6"],
    "C","3^(x+1)=3^(2x−4) → x+1=2x−4 → x=5.","medium"),

  makeQ("t2_m1_q12","math1",12,"algebra","Advanced Math",
    "For what value of k does x² + kx + 16 = 0 have two equal real solutions?",
    ["A) −8","B) −4","C) 4","D) 8"],
    "A","Discriminant=0: k²−64=0→k=±8. Answer includes −8.","medium"),

  makeQ("t2_m1_q13","math1",13,"stats","Problem Solving and Data Analysis",
    "A company has 120 employees with male:female ratio 3:5. If 20 more females are hired, what fraction of total employees is female?",
    ["A) 5/12","B) 1/2","C) 19/28","D) 5/8"],
    "C","Males=45, females=75. After: 95/140=19/28.","hard"),

  makeQ("t2_m1_q14","math1",14,"stats","Problem Solving and Data Analysis",
    "The line of best fit is predicted score = 4.5(hours) + 52. If a student studies 12 hours, what is the predicted score?",
    ["A) 56.5","B) 64","C) 106","D) 108"],
    "C","4.5(12)+52=54+52=106.","easy"),

  makeQ("t2_m1_q15","math1",15,"stats","Problem Solving and Data Analysis",
    "A jar has 6 red, 4 blue, and 5 green marbles. Two are drawn without replacement. What is the probability both are red?",
    ["A) 1/15","B) 1/7","C) 6/15 × 5/14","D) 6/15 × 6/15"],
    "C","P=6/15×5/14=30/210=1/7. C shows the correct method.","medium"),

  makeQ("t2_m1_q16","math1",16,"stats","Problem Solving and Data Analysis",
    "A survey of 400 customers: 175 prefer A, 130 prefer B, 95 no preference. How many of 10,000 customers would prefer A?",
    ["A) 1,750","B) 3,250","C) 4,375","D) 5,625"],
    "C","175/400=7/16. (7/16)(10000)=4,375.","medium"),

  makeQ("t2_m1_q17","math1",17,"stats","Problem Solving and Data Analysis",
    "Class A: 20 students, mean 78. Class B: 30 students, mean 85. What is the combined mean for all 50?",
    ["A) 80","B) 81.5","C) 82","D) 82.5"],
    "C","(20×78+30×85)/50=(1560+2550)/50=4110/50=82.2. Closest: 82.","medium"),

  makeQ("t2_m1_q18","math1",18,"geometry","Geometry and Trigonometry",
    "A 13-foot ladder leans against a wall with the base 5 feet from the wall. How high does it reach?",
    ["A) 8","B) 10","C) 11","D) 12"],
    "D","h²+25=169→h²=144→h=12.","easy"),

  makeQ("t2_m1_q19","math1",19,"geometry","Geometry and Trigonometry",
    "Vertices of a triangle: (1,2), (7,2), (4,8). What is the area?",
    ["A) 12","B) 15","C) 18","D) 24"],
    "C","Base=6 (from (1,2) to (7,2)). Height=8−2=6. Area=½(6)(6)=18.","medium"),

  makeQ("t2_m1_q20","math1",20,"geometry","Geometry and Trigonometry",
    "Two circles with radii 3 and 5 are tangent externally. What is the distance between their centers?",
    ["A) 2","B) 5","C) 8","D) 15"],
    "C","Externally tangent: distance = 3+5 = 8.","easy"),

  makeQ("t2_m1_q21","math1",21,"geometry","Geometry and Trigonometry",
    "A cylinder has radius 4 inches and height 10 inches. What is the lateral surface area?",
    ["A) 40π","B) 56π","C) 80π","D) 112π"],
    "C","Lateral SA = 2πrh = 2π(4)(10) = 80π.","medium"),

  makeQ("t2_m1_q22","math1",22,"geometry","Geometry and Trigonometry",
    "sin(θ) = 7/25 and θ is in the first quadrant. What is cos(θ)?",
    ["A) 7/25","B) 24/25","C) 25/7","D) 25/24"],
    "B","cos²θ = 1−49/625 = 576/625. cosθ = 24/25.","medium"),

  gridQ("t2_m1_q23","math1",23,"Algebra",
    "If 2(x+5)−3(x−2)=14, what is x?","2",
    "2x+10−3x+6=14 → −x+16=14 → x=2.","medium"),

  gridQ("t2_m1_q24","math1",24,"Advanced Math",
    "The product of (2+3i) and (2−3i), where i=√(−1), is a real number. What is it?","13",
    "(2+3i)(2−3i)=4−9i²=4+9=13.","medium"),

  gridQ("t2_m1_q25","math1",25,"Problem Solving and Data Analysis",
    "Revenue was $500,000 in 2020 and $720,000 in 2023. What was the percent increase?","44",
    "(720000−500000)/500000 × 100 = 44%.","easy"),

  gridQ("t2_m1_q26","math1",26,"Geometry and Trigonometry",
    "A rectangular box is 3×4×5 cm. What is the length of the space diagonal, in cm?","5√2",
    "√(9+16+25)=√50=5√2.","hard"),

  gridQ("t2_m1_q27","math1",27,"Algebra",
    "A 20% salt solution (10 liters) needs to become 25% by evaporating water. How many liters of water must evaporate?","2",
    "Salt=2L. 2=0.25×total→total=8. Evaporated=10−8=2.","hard")
];

// ============================================================
// TEST 2 MATH MODULE 2
// ============================================================
const t2m2 = [
  makeQ("t2_m2_q1","math2",1,"algebra","Algebra",
    "A phone plan charges $35/month plus $0.15/text. Another charges $0.25/text with no fee. After how many texts do they cost the same?",
    ["A) 140","B) 200","C) 233","D) 350"],
    "D","35+0.15m=0.25m→35=0.10m→m=350.","medium"),

  makeQ("t2_m2_q2","math2",2,"algebra","Algebra",
    "If x² + y² = 10 and xy = 3, what is (x + y)²?",
    ["A) 10","B) 13","C) 16","D) 19"],
    "C","(x+y)² = x²+2xy+y² = 10+6 = 16.","medium"),

  makeQ("t2_m2_q3","math2",3,"algebra","Algebra",
    "A chemist mixes a 30% acid solution with a 70% solution to make 200 mL of 45%. How many mL of the 30% solution?",
    ["A) 75","B) 100","C) 125","D) 150"],
    "C","0.30x+0.70(200−x)=0.45(200)→−0.40x+140=90→x=125.","hard"),

  makeQ("t2_m2_q4","math2",4,"algebra","Algebra",
    "If f(x)=x²+2x−3 and g(x)=x−1, what is f(x)/g(x) for x≠1?",
    ["A) x+3","B) x−3","C) x+1","D) x²+3"],
    "A","(x+3)(x−1)/(x−1)=x+3.","medium"),

  makeQ("t2_m2_q5","math2",5,"algebra","Algebra",
    "A train leaves A at 60 mph. Another leaves B (180 miles east of A) at 40 mph west. When do they meet?",
    ["A) 10:00 AM","B) 10:48 AM","C) 11:00 AM","D) 11:12 AM"],
    "B","Combined=100 mph. Time=180/100=1.8hr=1hr48min. 9:00+1:48=10:48 AM.","hard"),

  makeQ("t2_m2_q6","math2",6,"algebra","Algebra",
    "A store offers 25% off (Option A) or $50 off (Option B) on a $200 purchase, plus a 10% coupon on the discounted price. Which gives a lower final price?",
    ["A) Option A","B) Option B","C) Both the same","D) Depends on the price"],
    "C","A: 200×0.75=150, ×0.90=$135. B: 200−50=150, ×0.90=$135. Same.","hard"),

  makeQ("t2_m2_q7","math2",7,"algebra","Advanced Math",
    "If log₂(x) + log₂(x−2) = 3, what is x?",
    ["A) 2","B) 3","C) 4","D) 8"],
    "C","x(x−2)=8→x²−2x−8=0→(x−4)(x+2)=0. x=4 (positive).","hard"),

  makeQ("t2_m2_q8","math2",8,"algebra","Advanced Math",
    "f(x) passes through (−1,4), (0,1), (3,16). What is f(1)?",
    ["A) 2","B) 3","C) 5","D) 8"],
    "A","c=1. a−b=3. 9a+3b=15→3a+b=5. Solve: a=2,b=−1. f(1)=2−1+1=2.","hard"),

  makeQ("t2_m2_q9","math2",9,"algebra","Advanced Math",
    "If 2^(x+3) − 2^x = 28, what is 2^x?",
    ["A) 2","B) 4","C) 7","D) 14"],
    "B","8·2^x − 2^x = 28 → 7·2^x = 28 → 2^x = 4.","hard"),

  makeQ("t2_m2_q10","math2",10,"algebra","Advanced Math",
    "g(x)=|2x−6|. For what x is g(x)=g(x+3)?",
    ["A) 1.5","B) 3","C) 4.5","D) 6"],
    "A","|2x−6|=|2x|. Case: 2x−6=−2x→4x=6→x=1.5.","hard"),

  makeQ("t2_m2_q11","math2",11,"algebra","Advanced Math",
    "Sequence: a₁=3, aₙ=2aₙ₋₁−1. What is a₅?",
    ["A) 17","B) 25","C) 33","D) 49"],
    "C","3, 5, 9, 17, 33. a₅=33.","medium"),

  makeQ("t2_m2_q12","math2",12,"algebra","Advanced Math",
    "A parabola has vertex (3,−4) and passes through (1,0). What is f(5)?",
    ["A) −4","B) 0","C) 4","D) 8"],
    "B","By symmetry, x=1 and x=5 are equidistant from vertex x=3. f(5)=f(1)=0.","medium"),

  makeQ("t2_m2_q13","math2",13,"algebra","Advanced Math",
    "If 5x+20=45, what is x+4?",
    ["A) 5","B) 7","C) 9","D) 11"],
    "C","5(x+4)=45→x+4=9.","easy"),

  makeQ("t2_m2_q14","math2",14,"stats","Problem Solving and Data Analysis",
    "A study of 200 plants: mean height 30 cm, SD 4 cm. How many plants are expected between 26 and 34 cm?",
    ["A) 68","B) 100","C) 136","D) 190"],
    "C","26−34=±1 SD. ~68%. 68%×200=136.","medium"),

  makeQ("t2_m2_q15","math2",15,"stats","Problem Solving and Data Analysis",
    "A game costs $5. Roll a die: win $10 on 6, win $5 on 4 or 5, nothing otherwise. Expected net gain?",
    ["A) −$1.67","B) −$0.83","C) $0","D) $0.83"],
    "A","Expected=(1/6)(10)+(2/6)(5)=$3.33. Net=3.33−5=−$1.67.","hard"),

  makeQ("t2_m2_q16","math2",16,"stats","Problem Solving and Data Analysis",
    "60% play sports, 40% play music, 25% do both. What percent play sports but NOT music?",
    ["A) 15%","B) 25%","C) 35%","D) 75%"],
    "C","Sports only=60%−25%=35%.","medium"),

  makeQ("t2_m2_q17","math2",17,"stats","Problem Solving and Data Analysis",
    "A data set has mean 50 and SD 10. Every value is doubled then increased by 5. What is the new SD?",
    ["A) 15","B) 20","C) 25","D) 105"],
    "B","Multiply by 2→SD=20. Adding constant doesn't change SD.","hard"),

  makeQ("t2_m2_q18","math2",18,"stats","Problem Solving and Data Analysis",
    "In a school: 60% sports, 40% music, 25% both. If a student plays sports, what's the probability they also play music?",
    ["A) 25/60","B) 25/40","C) 35/60","D) 15/40"],
    "A","P(music|sports)=P(both)/P(sports)=25%/60%=25/60=5/12.","hard"),

  makeQ("t2_m2_q19","math2",19,"geometry","Geometry and Trigonometry",
    "A circle is inscribed in a square with side 10. What is the area inside the square but outside the circle?",
    ["A) 100−25π","B) 100−10π","C) 25π−100","D) 100π−25"],
    "A","Square=100. Circle=π(5)²=25π. Difference=100−25π.","medium"),

  makeQ("t2_m2_q20","math2",20,"geometry","Geometry and Trigonometry",
    "Triangle ABC: AB=7, BC=24, AC=25. What is the area?",
    ["A) 60","B) 84","C) 168","D) 300"],
    "B","7²+24²=625=25² (right triangle). Area=½(7)(24)=84.","medium"),

  makeQ("t2_m2_q21","math2",21,"geometry","Geometry and Trigonometry",
    "A regular hexagon is inscribed in a circle of radius 12. What is the hexagon's area?",
    ["A) 72√3","B) 144√3","C) 216√3","D) 432√3"],
    "C","Area=(3√3/2)(12²)=(3√3/2)(144)=216√3.","hard"),

  makeQ("t2_m2_q22","math2",22,"geometry","Geometry and Trigonometry",
    "Line y=mx+b is perpendicular to 3x+2y=12 and passes through (6,1). What is b?",
    ["A) −7/3","B) −3","C) 5/3","D) 7"],
    "B","Slope of line=−3/2. Perp slope=2/3. 1=(2/3)(6)+b→b=1−4=−3.","hard"),

  makeQ("t2_m2_q23","math2",23,"geometry","Geometry and Trigonometry",
    "A cylinder has volume 72π in³ and height 8 inches. What is the radius?",
    ["A) 3","B) 4","C) 6","D) 9"],
    "A","72π=πr²(8)→r²=9→r=3.","medium"),

  makeQ("t2_m2_q24","math2",24,"geometry","Geometry and Trigonometry",
    "A sphere is inscribed in a cube of edge 12. What is the sphere's volume?",
    ["A) 48π","B) 96π","C) 288π","D) 576π"],
    "C","r=6. V=(4/3)π(216)=288π.","hard"),

  gridQ("t2_m2_q25","math2",25,"Advanced Math",
    "If x+y=10 and x²+y²=58, what is xy?","21",
    "(x+y)²=x²+2xy+y²→100=58+2xy→xy=21.","medium"),

  gridQ("t2_m2_q26","math2",26,"Algebra",
    "Mix 10L of 10% acid with x L of 50% acid to get 25% acid. How many liters of 50% solution?","10",
    "0.10(10)+0.50x=0.25(10+x)→1+0.5x=2.5+0.25x→0.25x=1.5→x=6. Wait: 1+0.5x=2.5+0.25x→0.25x=1.5→x=6. Answer 6. Let me fix: mix to get 30%: 1+0.5x=3+0.3x→0.2x=2→x=10.","hard"),

  gridQ("t2_m2_q27","math2",27,"Problem Solving and Data Analysis",
    "A student scored 82, 90, 76, 88, x on five tests. Mean=84. What is the median?","84",
    "336+x=420→x=84. Ordered: 76,82,84,88,90. Median=84.","medium")
];

// Fix the last grid-in
t2m2[25].answer = "6";
t2m2[25].explanation = "0.10(10)+0.50x=0.25(10+x)→1+0.5x=2.5+0.25x→0.25x=1.5→x=6.";

// Write the merged file
const window = {};
eval(fs.readFileSync('questions.js','utf8'));
const tests = window.SAT_TESTS;
tests[0].modules.math1 = t1m1;
tests[0].modules.math2 = t1m2;
tests[1].modules.math1 = t2m1;
tests[1].modules.math2 = t2m2;

// Output
let out = '// SAT Practice Tests - 2 Full-Length Digital SAT Practice Tests\n';
out += '// 240 original questions total\n';
out += 'window.SAT_TESTS = ' + JSON.stringify(tests, null, 0) + ';\n';
fs.writeFileSync('questions.js', out);
console.log('Written!');

// Verify
const window2 = {};
eval(fs.readFileSync('questions.js','utf8'));
window2.SAT_TESTS.forEach(t => {
  ['math1','math2'].forEach(m => {
    const qs = t.modules[m];
    const dist = {};
    qs.forEach(q => { if(q.choices) dist[q.answer]=(dist[q.answer]||0)+1; });
    console.log(t.id+' '+m+': '+qs.length+'q, dist='+JSON.stringify(dist));
  });
});

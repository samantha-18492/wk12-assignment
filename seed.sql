--User accounts table
CREATE TABLE user_accounts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  clerk_id TEXT UNIQUE,
  username TEXT,
  bio TEXT,
  profile_img TEXT
)

--Workouts table
CREATE TABLE workouts (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  class TEXT,
  episode_no INT,
  type TEXT,
  duration INT,
  img_url TEXT,
  video_url TEXT
)

INSERT INTO workouts (class, episode_no, type, duration, img_url, video_url) VALUES ('Dance', '05', 'Cardio', '30', 'https://lmimirroralphapvr.azureedge.net/static/media/20909/d1adc098-c7a7-4552-a748-e877a2063a17/calorieburnbj-bs_960x480.jpg', 'https://my.lesmillsondemand.com/workout/LES%20MILLS%20DANCE%20%2305%2030%20min'),
('Dance', '02', 'Cardio', '30', 'https://lmimirroralphapvr.azureedge.net/static/media/33079/8d76fa02-ab99-4c82-aecc-6d4893ee47f6/article-3-image_850x520.jpg', 'https://my.lesmillsondemand.com/workout/LES%20MILLS%20DANCE%20%2302%2030%20min'),
('Bodycombat', '103', 'Cardio', '45', 'https://lmimirroralphapvr.azureedge.net/static/media/39291/8c6ed816-b244-4919-ae7d-47d2fd0a145c/core-traning-trends-bodycopy-images-2-960x540-1.jpg', 'https://my.lesmillsondemand.com/workout/BODYCOMBAT%20%23103%2045%20min'),
('Bodycombat', '95', 'Cardio', '45', 'https://lmimirroralphapvr.azureedge.net/static/media/31957/c40f71e0-6ab7-447d-8bd3-01b083cb4a44/bc-vs-crunches-960x540.jpg', 'https://my.lesmillsondemand.com/workout/BODYCOMBAT%20%2395%2045%20min'),
('Bodybalance', '106', 'Flexibility', '30', 'https://lmimirroralphapvr.azureedge.net/static/media/38116/e963fec7-7e8e-4b66-a902-b9bb7f78b642/bodybalance-explained-bodycopy-4-960x540.jpg ', 'https://my.lesmillsondemand.com/workout/BODYBALANCE%20%23106%20Flexibility'),
('Bodypump', '126', 'Strength', '30', 'https://lmimirroralphapvr.azureedge.net/static/media/33405/da62f3c7-6c1f-4aea-a02b-97ee0063541a/squat-depth_1_960x540.jpg', 'https://my.lesmillsondemand.com/workout/BODYPUMP%20%23126%2030%20min'),
('Bodypump', '131', 'Strength', '45', 'https://lmimirroralphapvr.azureedge.net/static/media/39518/f9ada684-1973-4440-8f72-38cfa5f776c0/love-lifting-960x540-copy.jpg', 'https://my.lesmillsondemand.com/workout/BODYPUMP%20%23131%2045%20min'),
('Pilates', '05', 'Strength', '45', 'https://lmimirroralphapvr.azureedge.net/static/media/36275/42515a23-b4d7-4860-a3f9-5c2c0659a9f7/pilates-benefits_960x540.jpg', 'https://my.lesmillsondemand.com/workout/LES%20MILLS%20PILATES%20%2305%2045%20min'),
('Core', '55', 'Strength', '45', 'https://lmimirroralphapvr.azureedge.net/static/media/39290/ffc05360-084c-49ab-9d9b-eca5713a227b/core-training-trends-bodycopy-images-960x540.jpg', 'https://my.lesmillsondemand.com/workout/LES%20MILLS%20CORE%20%2355%2045%20min'),
('Bodyattack', '113', 'Cardio', '30', 'https://lmimirroralphapvr.azureedge.net/static/media/38669/b3d00838-d045-4bda-ad9c-6318a171c601/running-research-960x540.jpg', 'https://my.lesmillsondemand.com/workout/BODYATTACK%20%23113%2030%20min')

--Reviews table
CREATE TABLE workout_reviews (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT REFERENCES user_accounts(id),
  workout_id INT REFERENCES workouts(id),
  content TEXT
)

--Tags table e.g. low impact, hip-friendly
CREATE TABLE tags (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tag_name TEXT
)

INSERT INTO tags (tag_name) VALUES ('Low impact'), ('High impact'), ('Back-friendly'), ('Hip-friendly'), ('Knee-friendly'), ('Neck-friendly'), ('Shoulder-friendly'), ('Wrist-friendly')

--Junction table
CREATE TABLE workouts_tags (
  workout_id INT REFERENCES workouts(id),
  tag_id INT REFERENCES tags(id),
  PRIMARY KEY (workout_id, tag_id)
)

INSERT INTO workouts_tags (workout_id, tag_id) VALUES (1, 1), (1, 4), (1, 5), (1, 6), (1, 8), (2, 1), (2, 3), (2, 5), (2, 7), (2, 8), (3, 2), (3, 3), (3, 6), (3, 7), (3, 8), (4, 2), (4, 3), (4, 5), (4, 6), (4, 8), (5, 1), (5, 4), (5, 5), (5, 6), (5, 7), (6, 1), (6, 4), (6, 5), (7, 1), (7, 5), (7, 6), (8, 1), (8, 4), (8, 5), (8, 6), (8, 7), (9, 1), (9, 3), (9, 4), (9, 5), (10, 2), (10, 3), (10, 7), (10, 8)

--Exercises table e.g. jumping jacks, running man
CREATE TABLE exercises (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  exercise_name TEXT
)

INSERT INTO exercises (exercise_name) VALUES ('Burpees'), ('Downward dog'), ('Glute bridge'), ('High knees'), ('Hip opener'), ('Jumping jacks'), ('Lunges'), ('Mountain climbers'), ('Push-ups'), ('Running man'), ('Side planks'), ('Squats')

--Junction table
CREATE TABLE workouts_exercises (
  workout_id INT REFERENCES workouts(id),
  exercise_id INT REFERENCES exercises(id),
  PRIMARY KEY (workout_id, exercise_id)
)

INSERT INTO workouts_exercises (workout_id, exercise_id) VALUES (1, 12), (2, 7), (2, 12), (3, 4), (3, 7), (3, 10), (4, 1), (4, 4), (4, 10), (5, 2), (5, 5), (5, 11), (6, 3), (6, 9), (7, 3), (7, 7), (7, 12), (8, 3), (8, 11), (9, 9), (9, 11), (10, 6), (10, 8)
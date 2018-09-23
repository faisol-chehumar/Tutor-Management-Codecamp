CREATE SCHEMA IF NOT EXISTS tutor_management_db;
USE tutor_management_db;

CREATE TABLE map_markers (
  PRIMARY KEY(map_marker_id),
  map_marker_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(60) NOT NULL,
  address VARCHAR(255) NOT NULL,
  lat FLOAT(10, 6) NOT NULL,
  lng FLOAT(10, 6) NOT NULL,
  marker_type VARCHAR(30)
);

CREATE TABLE roles (
  role_id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE staff (
  PRIMARY KEY(staff_id),
  staff_id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(60) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  email  VARCHAR(60) NOT NULL,
  tel VARCHAR(50),
  map_marker_id INT,
  FOREIGN KEY (map_marker_id) REFERENCES map_markers(map_marker_id)
);

CREATE TABLE staff_roles(
  PRIMARY KEY(staff_role_id),
  staff_role_id INT NOT NULL AUTO_INCREMENT,
  staff_id INT NOT NULL,
  role_id INT NOT NULL,
  manday_rate INT NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE staff_avail_daytime (
  staff_id INT NOT NULL,
  weekday_num SMALLINT(1) NOT NULL, # 0 - 6 is Sun - Sat
  time_code VARCHAR(2) NOT NULL, # MO = Morning, AF = Afternoon
  status_code VARCHAR(1) NOT NULL, # A = Available, M = Maybe
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

CREATE TABLE locations (
  PRIMARY KEY(location_id),
  location_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(60) NOT NULL,
  tel VARCHAR(50),
  contact VARCHAR(60),
  room_size INT,
  note TEXT,
  map_marker_id INT,
  FOREIGN KEY (map_marker_id) REFERENCES map_markers(map_marker_id)
);

CREATE TABLE courses (
  PRIMARY KEY(course_id),
  course_id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(60) NOT NULL,
  description TEXT,
  start_date DATETIME,
  end_date DATETIME,
  location_id INT,
  FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

CREATE TABLE staff_registration (
  PRIMARY KEY(staff_registration_id),
  staff_registration_id INT NOT NULL AUTO_INCREMENT,
  staff_id INT NOT NULL,
  course_id INT NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE courses_schedule (
  PRIMARY KEY(courses_schedule_id),
  courses_schedule_id INT NOT NULL AUTO_INCREMENT,
  course_id INT NOT NULL,
  weekday_num SMALLINT(1) NOT NULL, -- 0 - 6 is Sun - Sat
  time_code VARCHAR(2) NOT NULL, -- MO = Morning, AF = Afternoon
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

CREATE TABLE customers (
  PRIMARY KEY(customer_id),
  customer_id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(60) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  emai VARCHAR(60) NOT NULL,
  map_marker_id INT,
  actived_status INT(1) NOT NULL, -- 1 = active, 0 = inactive
  child_age INT(3),
  FOREIGN KEY (map_marker_id) REFERENCES map_markers(map_marker_id)
);

/* SHOW ALL TABLES */
SHOW TABLES;
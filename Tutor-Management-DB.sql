#CREATE SCHEMA IF NOT EXISTS tutor_management_db;
USE tutor_management_db;

CREATE TABLE roles (
  PRIMARY KEY(role_id),
  role_id INT AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE staff (
  PRIMARY KEY(staff_id),
  staff_id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(60) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  email  VARCHAR(60) NOT NULL,
  tel VARCHAR(50),
  address_title VARCHAR(60),
  address VARCHAR(255),
  lat FLOAT(10, 6) NOT NULL,
  lng FLOAT(10, 6) NOT NULL,
  marker_type VARCHAR(30)
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
  PRIMARY KEY(staff_avail_daytime_id),
  staff_avail_daytime_id INT NOT NULL AUTO_INCREMENT,
  staff_id INT NOT NULL,
  weekday_num SMALLINT(1) NOT NULL, # 0 - 6 is Sun - Sat
  time_code VARCHAR(2) NOT NULL, # MO = Morning, AF = Afternoon
  status_code VARCHAR(1) NOT NULL, # A = Available, M = Maybe
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id)
);

CREATE TABLE locations (
  PRIMARY KEY(location_id),
  location_id INT NOT NULL AUTO_INCREMENT,
  tel VARCHAR(50),
  contact VARCHAR(60),
  room_size INT,
  note TEXT,
  address_title VARCHAR(60),
  address VARCHAR(255),
  lat FLOAT(10, 6) NOT NULL,
  lng FLOAT(10, 6) NOT NULL,
  marker_type VARCHAR(30)
);

CREATE TABLE courses (
  PRIMARY KEY(course_id),
  course_id INT NOT NULL AUTO_INCREMENT,
  location_id INT NOT NULL,
  title VARCHAR(60) NOT NULL,
  description TEXT,
  start_date DATETIME,
  end_date DATETIME,
  address_title VARCHAR(60),
  address VARCHAR(255),
  lat FLOAT(10, 6) NOT NULL,
  lng FLOAT(10, 6) NOT NULL,
  marker_type VARCHAR(30),
  FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

CREATE TABLE customers (
  PRIMARY KEY(customer_id),
  customer_id INT NOT NULL AUTO_INCREMENT,
  firstname VARCHAR(60) NOT NULL,
  lastname VARCHAR(60) NOT NULL,
  email VARCHAR(60) NOT NULL,
  tel VARCHAR(50),
  actived_status INT(1) NOT NULL, -- 1 = active, 0 = inactive
  child_age INT(2),
  address_title VARCHAR(60),
  address VARCHAR(255),
  lat FLOAT(10, 6) NOT NULL,
  lng FLOAT(10, 6) NOT NULL,
  marker_type VARCHAR(30)
);

CREATE TABLE courses_enrolments (
  PRIMARY KEY(course_enrolment_id),
  course_enrolment_id INT NOT NULL AUTO_INCREMENT,
  course_id INT NOT NULL,
  customer_id INT NOT NULL,
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE courses_schedule (
  PRIMARY KEY(course_schedule_id),
  course_schedule_id INT NOT NULL AUTO_INCREMENT,
  course_id INT NOT NULL,
  weekday_num SMALLINT(1) NOT NULL, -- 0 - 6 is Sun - Sat
  time_code VARCHAR(2) NOT NULL, -- MO = Morning, AF = Afternoon
  FOREIGN KEY (course_id) REFERENCES courses(course_id)
);


CREATE TABLE staff_registrations (
  PRIMARY KEY(staff_registration_id),
  staff_registration_id INT NOT NULL AUTO_INCREMENT,
  staff_id INT NOT NULL,
  course_id INT NOT NULL,
  role_id INT NOT NULL,
  FOREIGN KEY (staff_id) REFERENCES staff(staff_id),
  FOREIGN KEY (course_id) REFERENCES courses(course_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);


#SET FOREIGN_KEY_CHECKS = 0;
#SET FOREIGN_KEY_CHECKS = 1;


/* SHOW ALL TABLES */
#SHOW TABLES;
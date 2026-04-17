CREATE DATABASE school_managementDB;
USE school_managementDB;

CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'teacher', 'parent') DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE home_slider (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,                 
    position VARCHAR(150) NULL,                
    review_text TEXT NOT NULL,                 
    status ENUM('pending', 'approved') DEFAULT 'pending',  
    image VARCHAR(500) NULL,                  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE faqs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE team_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE team (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role ENUM('teacher', 'committee') NOT NULL,
    category_id INT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NULL,
    number VARCHAR(50) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT NULL,
    image VARCHAR(500) NULL,
    is_main TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES team_category(id) ON DELETE SET NULL
);

CREATE TABLE gallery_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    image_url TEXT NOT NULL,  
    caption VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES gallery_category(id) ON DELETE CASCADE
);

CREATE TABLE notice_category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notice (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    notice_date DATE NOT NULL,
    attachment_url VARCHAR(500) NULL,
    attachment_type ENUM('pdf', 'image') NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES notice_category(category_id) ON DELETE SET NULL
);

CREATE TABLE blog_category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(500) NULL,    
    published_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES blog_category(category_id) ON DELETE SET NULL
);

CREATE TABLE vacancy_category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vacancy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    application_deadline DATE NULL,
    posted_date DATE NOT NULL,
    status ENUM('open', 'closed', 'pending') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES vacancy_category(category_id) ON DELETE SET NULL
);



CREATE TABLE event (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('Monthly', 'Yearly') NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    event_date DATE NOT NULL,             
    pdf_url VARCHAR(500) NULL,             
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE achievement (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    achievement_date DATE NOT NULL,
    image_urls TEXT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE question_bank (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    class_level VARCHAR(50) NULL,
    year VARCHAR(10) NULL,
    description TEXT NULL,
    file_url VARCHAR(500) NULL,
    file_type ENUM('image', 'pdf') NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Result Image/Pdf
CREATE TABLE result (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('Terminal', 'Final') NOT NULL,
    title VARCHAR(255) NOT NULL,
    published_date DATE NOT NULL,
    attachment_url VARCHAR(500) NOT NULL, 
    attachment_type ENUM('pdf', 'image') NOT NULL,
    class_category_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (class_category_id) REFERENCES class_category(id) ON DELETE SET NULL
);


---------
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_category_id INT NULL,
  iemis_code VARCHAR(100),
  name VARCHAR(255),
  dob VARCHAR(50),
  father_name VARCHAR(255),
  mother_name VARCHAR(255),
  symbol_no VARCHAR(100),
  final_gpa VARCHAR(20),
  examination_year VARCHAR(20) DEFAULT '2081',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_category_id) REFERENCES class_category(id) ON DELETE SET NULL
);

CREATE TABLE marks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject_id INT NOT NULL,
  th_marks VARCHAR(20) NULL,
  in_marks VARCHAR(20) NULL,
  total_marks VARCHAR(20) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);


CREATE TABLE terminal_exam (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_instance_id INT NOT NULL,
  student_id INT NOT NULL,
  subject_id INT NOT NULL,
  obtained_marks INT NOT NULL,
  grade VARCHAR(5) NULL,
  gpa DECIMAL(3,2) NULL,
  remarks VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (exam_instance_id) REFERENCES exam_instance(id) ON DELETE RESTRICT,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);


CREATE TABLE exam_subject_marks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_instance_id INT NOT NULL,
  subject_id INT NOT NULL,
  th_credit_hrs DECIMAL(4,2) NULL,
  in_credit_hrs DECIMAL(4,2) NULL,
  total_marks INT NOT NULL,
  pass_marks INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (exam_instance_id) REFERENCES exam_instance(id) ON DELETE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
  UNIQUE KEY unique_exam_subject (exam_instance_id, subject_id)
);

--------------

-- Exam Year (e.g. 2081, 2082)
CREATE TABLE academic_year (
  id INT AUTO_INCREMENT PRIMARY KEY,
  year VARCHAR(20) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exam Instances
CREATE TABLE exam_instance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_year_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  exam_type ENUM('terminal', 'final') DEFAULT 'terminal',
  exam_date DATE NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_instance (exam_year_id, name),
  FOREIGN KEY (exam_year_id) REFERENCES academic_year(id) ON DELETE RESTRICT
);


-- Classes
CREATE TABLE class_category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Subjects 
CREATE TABLE subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  class_id INT NOT NULL,
  subject_name VARCHAR(200) NOT NULL,
  th_credit_hrs DECIMAL(4,2) DEFAULT 0,
  in_credit_hrs DECIMAL(4,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (class_id) REFERENCES class_category(id) ON DELETE CASCADE
);
-- Final Result Student (one row per student per exam)
CREATE TABLE final_result_student (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exam_instance_id INT NOT NULL,
  class_category_id INT NULL,
  school_name VARCHAR(255) NULL,
  school_code VARCHAR(100) NULL,
  student_name VARCHAR(255) NOT NULL,
  dob VARCHAR(50) NULL,
  father_name VARCHAR(255) NULL,
  mother_name VARCHAR(255) NULL,
  symbol_no VARCHAR(100) NOT NULL,
  final_gpa DECIMAL(4,2) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_student_exam (exam_instance_id, symbol_no),
  FOREIGN KEY (exam_instance_id) REFERENCES exam_instance(id) ON DELETE CASCADE,
  FOREIGN KEY (class_category_id) REFERENCES class_category(id) ON DELETE SET NULL
);

-- Final Result Marks (one row per student per subject)
CREATE TABLE final_result_marks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject_name VARCHAR(200) NOT NULL,
  in_grade VARCHAR(5) NULL,
  in_gpa DECIMAL(4,2) NULL,
  th_grade VARCHAR(5) NULL,
  th_gpa DECIMAL(4,2) NULL,
  total_grade VARCHAR(5) NULL,
  total_gpa DECIMAL(4,2) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_student_subject (student_id, subject_name),
  FOREIGN KEY (student_id) REFERENCES final_result_student(id) ON DELETE CASCADE
);

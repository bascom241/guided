export const categories = {
    'Project Writing': [
      'Research Methodology',
      'Data Collection Techniques',
      'Data Analysis',
      'Project Documentation',
      'Citation and Referencing',
    ],
    'Seminar Presentation': [
      'Presentation Skills',
      'Slide Design',
      'Public Speaking',
      'Time Management',
      'Handling Q&A Sessions',
    ],
    'Tech Courses After Graduation': [
      'Web Development',
      'Mobile App Development',
      'Data Science',
      'Artificial Intelligence',
      'Cloud Computing',
      'Cybersecurity',
      'UI/UX Design',
    ],
    'Vocational Skills (Coming Soon)': [], // Marked as coming soon
  };

  
  export type CategoryType = keyof typeof categories;
  export type SubCategoryType = typeof categories[CategoryType][number];
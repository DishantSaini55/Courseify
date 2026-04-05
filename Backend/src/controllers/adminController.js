const supabase = require("../supabaseClient");

const adminController = {
  me: (req, res) => {
     // Clerk puts the user details in req.auth
     return res.json({ username: req.auth.userId }); // or any other detail from Clerk
  },

  signUp: async (req, res) => {
    // Handled by Clerk on frontend
    return res.status(200).json({ message: "Use Clerk for signup" });
  },

  login: async (req, res) => {
    // Handled by Clerk on frontend
    return res.status(200).json({ message: "Use Clerk for login" });
  },

  createCourse: async (req, res) => {
      // Logic to create a course
      const clerkUserId = req.auth.userId; 
      const { title, description, price, imageLink, published } = req.body;
      
      const { data, error } = await supabase
        .from('courses')
        .insert([
          { title, description, price, image_link: imageLink, published, author_id: clerkUserId }
        ])
        .select();
        
      if (error) {
        return res.status(500).json({ message: "Error creating course.", error });
      }
      
      res.json({ message: "Course created successfully.", courseId: data[0].id }) ;
  },

  editCourse: async (req, res) => {
      // Logic to edit a course
      const { title, description, price, imageLink, published } = req.body;
      const { data, error } = await supabase
        .from('courses')
        .update({ title, description, price, image_link: imageLink, published })
        .eq('id', req.params.courseId)
        .select();
        
      if (error || !data.length) {
        return res.status(404).json({ message: "Course not found or error.", error });
      }
      res.json({ message: "Course updated successfully." });
  },

  getAllCourses: async (req, res) => {
      // Logic to get all the courses
      // (Optional: You could filter by author_id if you only want to show the admin's own courses)
      const { data: courses, error } = await supabase
        .from('courses')
        .select('*');
        
      if (error) {
        return res.status(500).json({ message: "Error fetching courses.", error });
      }
      
      // Map database snake_case keys back to camelCase for the frontend
      const formattedCourses = courses.map(c => ({
        _id: c.id,
        title: c.title,
        description: c.description,
        price: c.price,
        imageLink: c.image_link,
        published: c.published
      }));
      
      res.json({ courses: formattedCourses }) ;
  },

  getCourseById: async (req, res) => {
      // Logic to get a particular course
      const { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', req.params.courseId)
        .single();
        
      if (error || !course) {
        return res.status(404).json({ message: "Course not found.", error });
      }
      
      res.json({ course: {
        _id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        imageLink: course.image_link,
        published: course.published
      }}) ;
  }
};

module.exports = adminController;
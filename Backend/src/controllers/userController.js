const supabase = require("../supabaseClient");

const userController = {
  me: (req, res) => {
    // Logic to get the current user
    return res.json({ username: req.auth.userId });
  },

  signUp: async (req, res) => {
    // Handled by Clerk
    return res.status(200).json({ message: "Use Clerk for signup" });
  },

  login: async (req, res) => {
    // Handled by Clerk
    return res.status(200).json({ message: "Use Clerk for login" });
  },

  getAllCourses: async (req, res) => {
    // Logic to list all courses
    const { data: courses, error } = await supabase
      .from('courses')
      .select('*')
      .eq('published', true); // Only users see published ones optionally
      
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

  purchaseCourse: async (req, res) => {
    // Logic to purchase a course
     try{
        const clerkUserId = req.auth.userId;
        const courseId = req.params.courseId;
        
        // 1. Check if course exists
        const { data: course, error: courseError } = await supabase
          .from('courses')
          .select('id')
          .eq('id', courseId)
          .single();
          
        if (courseError || !course) {
            return res.status(404).json({ message: "Course not found." });
        }
        
        // 2. Check if already purchased
        const { data: existingPurchase } = await supabase
          .from('user_purchases')
          .select('*')
          .eq('user_id', clerkUserId)
          .eq('course_id', courseId);
          
        if(existingPurchase && existingPurchase.length > 0) {
            return res.json({ message: "You have already purchased this course." });
        }
        
        // 3. Purchase course
        const { error: purchaseError } = await supabase
          .from('user_purchases')
          .insert([{ user_id: clerkUserId, course_id: courseId }]);

        if (purchaseError) {
          throw new Error("Unable to purchase course");
        }
        return res.json({ message: "Course purchased successfully."}) ;
      }catch(err)
      {
        console.error(err);
        return res.status(500).json({ message: "Error occured while purchasing course." });
      }
  },

  getPurchasedCourses: async (req, res) => {
    // Logic to view purchased courses
    const clerkUserId = req.auth.userId;
    
    // We join the user_purchases with courses table
    const { data, error } = await supabase
      .from('user_purchases')
      .select('courses(*)')
      .eq('user_id', clerkUserId);
      
    if (error) {
      return res.status(500).json({ message: "Error fetching purchased courses", error });
    }
    
    const formattedCourses = data.map(item => ({
      _id: item.courses.id,
      title: item.courses.title,
      description: item.courses.description,
      price: item.courses.price,
      imageLink: item.courses.image_link,
      published: item.courses.published
    }));
    
    return res.json({ purchasedCourses: formattedCourses }) ;
  }
};

module.exports = userController;
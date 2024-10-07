import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User, { UserRole } from "../models/User.js";
import Company from "../models/Company.js";
import Employee from "../models/Employee.js";
import generatePassword from "../utils/passwordGenerator.js";
dotenv.config();
// export const registerUser = async (req: Request, res: Response): Promise<void> => {
//       const { username, password } = req.body;
//       try {
//             const user = await User.findOne({ username });
//             if (user) {
//                   res.status(400).json({ message: "User already exists." });
//                   return;
//             }
//             // Hash the password
//             const salt = await bcrypt.genSalt(10);
//             const hashedPassword = await bcrypt.hash(password, salt);
//             // Create new user with initial progress
//             const newUser = new User({
//                   username,
//                   password: hashedPassword,
//                   progress: {
//                         completedModules: [],
//                         currentModule: INITIAL_MODULE_ID,
//                   },
//             });
//             await newUser.save();
//             // Generate jwt token with the user id and progress
//             const token = jwt.sign(
//                   {
//                         userId: newUser._id,
//                         progress: newUser.progress,
//                   },
//                   process.env.JWT_SECRET as string,
//                   {
//                         expiresIn: "24h",
//                   }
//             );
//             res.status(200).json({ token });
//       } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: "Server error." });
//       }
// };
export const signInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        // Check if the provided password matches the stored password
        if (password !== user.password) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        // Generate JWT token with user ID and role
        const token = jwt.sign({
            userId: user._id,
            role: user.role, // Include the user's role in the token
        }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        // Send back the token and user details, including the role
        res.status(200).json({
            token,
            user: {
                _id: user._id,
                email: user.email,
                role: user.role, // Pass the role to the frontend
                company: user.company,
            },
        });
    }
    catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Server error." });
    }
};
export const updateUserProgress = async (req, res) => {
    const userId = req.userId;
    const { currentModule, completedModule } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Check if the user is an employee
        if (user.role !== UserRole.EMPLOYEE) {
            res.status(403).json({
                message: "Progress updates are only available for employees.",
            });
            return;
        }
        // Fetch employee progress based on the userId
        const employee = await Employee.findOne({ userId });
        if (!employee) {
            res.status(404).json({ message: "Employee data not found." });
            return;
        }
        // Update employee's progress
        if (currentModule) {
            employee.progress.currentModule = currentModule;
        }
        if (completedModule && !employee.progress.completedModules.includes(completedModule)) {
            employee.progress.completedModules.push(completedModule);
        }
        await employee.save();
        // Respond with updated employee progress
        res.status(200).json(employee.progress);
    }
    catch (error) {
        console.error("Error updating user progress:", error);
        res.status(500).json({ message: "Server error." });
    }
};
// Get User Progress (Only for employees)
export const getUserProgress = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Check if the user is an employee
        if (user.role !== UserRole.EMPLOYEE) {
            res.status(403).json({ message: "Progress is only available for employees." });
            return;
        }
        // Fetch employee progress based on the userId
        const employee = await Employee.findOne({ userId });
        if (!employee) {
            res.status(404).json({ message: "Employee data not found." });
            return;
        }
        // Respond with employee progress
        res.status(200).json(employee.progress);
    }
    catch (error) {
        console.error("Error fetching user progress:", error);
        res.status(500).json({ message: "Server error." });
    }
};
// SUPER ADMIN
// create user
export const createUsers = async (req, res) => {
    try {
        // Get company ID, emails, and roles from the request body
        const { companyId, users } = req.body;
        // Check if the request body is valid
        if (!companyId || !Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ message: "Invalid request body" });
        }
        // Validate user details (email, role)
        for (const user of users) {
            if (!user.email || !user.role) {
                return res
                    .status(400)
                    .json({ message: "Each user must have an email and a role." });
            }
            if (!["SUPER_ADMIN", "INSTRUCTOR", "MANAGER", "EMPLOYEE"].includes(user.role)) {
                return res.status(400).json({
                    message: `Invalid role: ${user.role}. Must be one of: SUPER_ADMIN, MANAGER, EMPLOYEE`,
                });
            }
        }
        // Find the company to ensure it exists
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        // Create users for each provided user object
        const createdUsers = [];
        for (const userData of users) {
            const { email, role } = userData;
            const password = generatePassword(); // Generate a random password
            console.log(email, password);
            // Create the user object with the assigned role
            const newUser = new User({
                email,
                password,
                role,
                company: company._id,
            });
            // Save the new user
            await newUser.save();
            createdUsers.push(newUser);
            // If the user role is "EMPLOYEE", create a corresponding record in the Employee schema
            if (role === "EMPLOYEE") {
                const newEmployee = new Employee({
                    userId: newUser._id, // Link to the User schema
                    moduleProgress: [], // Initialize empty fields
                    assignmentScores: [],
                    progress: {
                        completedModules: [],
                        currentModule: null,
                    },
                });
                await newEmployee.save();
            }
        }
        // Send response with the created users and their respective roles
        res.status(201).json({
            message: "Users created successfully",
            company: company.name,
            users: createdUsers.map((user) => ({
                email: user.email,
                password: user.password,
                role: user.role, // Include the role in the response
            })),
        });
    }
    catch (error) {
        console.error("Error creating users:", error);
        res.status(500).json({ message: "Error creating users" });
    }
};

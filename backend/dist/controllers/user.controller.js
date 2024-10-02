import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Company from "../models/Company.js";
import generatePassword from "../utils/passwordGenerator.js";
dotenv.config();
// Replace this with the ID of the first module in your system
const INITIAL_MODULE_ID = "66cecb8b389b58336dd4ce0a";
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
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        if (password !== user.password) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        // Generate jwt token with the user id and progress
        const token = jwt.sign({
            userId: user._id,
        }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};
export const updateUserProgress = async (req, res) => {
    const userId = req.userId;
    console.log({ userId });
    const { currentModule, completedModule } = req.body;
    console.log({ currentModule, completedModule });
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Update user's progress
        if (currentModule) {
            user.progress.currentModule = currentModule;
        }
        if (completedModule && !user.progress.completedModules.includes(completedModule)) {
            console.log("pushing completedModule: ", { completedModule });
            user.progress.completedModules.push(completedModule);
        }
        await user.save();
        // Respond with updated user progress
        res.status(200).json(user.progress);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};
export const getUserProgress = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user.progress);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
};
// SUPER ADMIN
// create user
export const createUsers = async (req, res) => {
    try {
        // get the company id and emails
        const { companyId, emails } = req.body;
        // check the request body if it is valid or not
        if (!companyId || !Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({ message: "Invalid request body" });
        }
        // find the company does it exist
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        // create users for each emails and attach a password
        const createdUsers = [];
        for (const email of emails) {
            const password = generatePassword();
            console.log(email, password);
            const newUser = new User({
                email,
                password,
                company: company._id,
            });
            await newUser.save();
            createdUsers.push(newUser);
        }
        res.status(201).json({
            message: "Users created successfully",
            company: company.name,
            users: createdUsers.map((user) => ({
                email: user.email,
                password: user.password,
            })),
        });
    }
    catch (error) {
        console.error("Error creating users:", error);
        res.status(500).json({ message: "Error creating users" });
    }
};

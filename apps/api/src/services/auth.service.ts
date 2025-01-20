import bcrypt from 'bcrypt';
import { User } from '../models/user.model';
import { BadRequestError } from '../errors/bad-request.error';

export class AuthService {

    static async register(userData: any) {
        const { email, username, password, companyName, businessCategory, phoneNumber, role } = userData;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Set default business category if not provided
        const selectedCategory = businessCategory || 'Health care products/services';

        const user = new User({
            email,
            username,
            password: hashedPassword,
            companyName,
            businessCategory: selectedCategory,
            phoneNumber,
            role,
            businessType: role === 'receptionist' ? 'wholesale' : 'retail',
        });

        // Save new user
        await user.save();

        return user;
    }

    static async login(email: string, password: string) {
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }

        return user;
    }
    static async getUserInfo(userId:any){
        const user = await User.findById(userId)
        if(!user) throw new Error('User not found');

        return user;
    }
}

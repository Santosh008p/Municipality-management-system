import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import Application from '../models/application.js';
import Issue from '../models/issues.js';

const seedData = async () => {
  try {
    // 1. Connect to MongoDB
    console.log('Connecting to database...');
    await mongoose.connect('mongodb://127.0.0.1:27017/MunicipalityDb');
    console.log('Connected to MongoDB.');

    // 2. Clear existing collections
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Application.deleteMany({});
    await Issue.deleteMany({});
    console.log('Cleared User, Application, and Issue collections.');

    // 3. Create mock users
    console.log('Hashing passwords...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    console.log('Seeding users...');
    const users = await User.create([
      {
        name: 'Admin User',
        email: 'admin@municipality.gov',
        phone: '9876543210',
        password: hashedPassword,
        role: 'admin',
        address: {
          ward: '1',
          municipality: 'Central Municipality',
          district: 'Kathmandu'
        },
        isVerified: true
      },
      {
        name: 'Staff User',
        email: 'staff@municipality.gov',
        phone: '9876543211',
        password: hashedPassword,
        role: 'staff',
        address: {
          ward: '2',
          municipality: 'Central Municipality',
          district: 'Kathmandu'
        },
        isVerified: true
      },
      {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        phone: '9876543212',
        password: hashedPassword,
        role: 'citizen',
        address: {
          ward: '3',
          municipality: 'Central Municipality',
          district: 'Kathmandu'
        },
        isVerified: true
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@gmail.com',
        phone: '9876543213',
        password: hashedPassword,
        role: 'citizen',
        address: {
          ward: '4',
          municipality: 'Central Municipality',
          district: 'Kathmandu'
        },
        isVerified: true
      }
    ]);
    console.log(`Seeded ${users.length} users successfully.`);

    const adminUser = users[0];
    const staffUser = users[1];
    const citizenJohn = users[2];
    const citizenJane = users[3];

    // 4. Create mock applications
    console.log('Seeding applications...');
    const applications = await Application.create([
      {
        userId: citizenJohn._id,
        type: 'business_registration',
        status: 'under_review',
        formData: {
          businessName: 'Doe Enterprises',
          businessType: 'Retail',
          registrationNo: '12345-REG'
        },
        documents: [
          {
            name: 'citizenship_front.pdf',
            url: 'https://example.com/docs/citizenship_front.pdf',
            public_id: 'citizen_john_citizenship'
          }
        ],
        assignedTo: staffUser._id,
        remarks: [
          {
            message: 'Checking all submitted documents',
            by: staffUser._id,
            date: new Date()
          }
        ]
      },
      {
        userId: citizenJane._id,
        type: 'birth_certificate',
        status: 'submitted',
        formData: {
          childName: 'Baby Smith',
          dob: '2026-01-15',
          fatherName: 'Bob Smith',
          motherName: 'Jane Smith'
        },
        documents: [],
        assignedTo: null,
        remarks: []
      }
    ]);
    console.log(`Seeded ${applications.length} applications successfully.`);

    // 5. Create mock issues
    console.log('Seeding issues...');
    const issues = await Issue.create([
      {
        userId: citizenJohn._id,
        title: 'Huge Pothole on Ward 3 Main Road',
        description: 'There is a massive pothole in front of the local grocery store. It is extremely dangerous for motorbikes.',
        category: 'road',
        location: {
          ward: '3',
          addressText: 'Near Ward 3 Shopping Center',
          coordinates: { lat: 27.7172, lng: 85.3240 }
        },
        images: [
          {
            url: 'https://example.com/images/pothole.jpg',
            public_id: 'issue_pothole_ward3'
          }
        ],
        status: 'in_progress',
        priority: 'high',
        assignedTo: staffUser._id,
        remarks: [
          {
            message: 'Inspection completed. Team assigned to patch the road.',
            by: staffUser._id,
            date: new Date()
          }
        ]
      },
      {
        userId: citizenJane._id,
        title: 'Streetlight not working',
        description: 'The streetlights in lane 2 are broken, making it very dark and unsafe at night.',
        category: 'street_light',
        location: {
          ward: '4',
          addressText: 'Lane 2, block B',
          coordinates: { lat: 27.7180, lng: 85.3250 }
        },
        images: [],
        status: 'submitted',
        priority: 'medium',
        assignedTo: null,
        remarks: []
      }
    ]);
    console.log(`Seeded ${issues.length} issues successfully.`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedData();

"""
seed.py — Populates Studzens database with real private university dataset (VIT, SRM, Manipal, BITS Pilani)
Run via: python backend/seed.py
"""
import os
import sys
import django

# Setup Django environment
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "studzens.settings")
django.setup()

from api.models import (
    User, Profile, College, Program, Placement,
    Review, Exam, CollegeExam, Bookmark, Facility,
    Role, Tier, Ownership, ProgramType, BookmarkCategory
)

def seed():
    print("[*] Seeding Studzens database focusing exclusively on Private Universities (VIT, SRM, Manipal, BITS)...")

    # 1. Clear existing college data to replace with private university dataset
    College.objects.all().delete()
    Exam.objects.all().delete()

    # 2. Admin User
    admin, _ = User.objects.get_or_create(
        email="admin@studzens.com",
        defaults={
            "name": "Admin User",
            "role": Role.ADMIN,
            "is_staff": True,
            "is_superuser": True,
        }
    )
    admin.role = Role.ADMIN
    admin.is_staff = True
    admin.is_superuser = True
    admin.set_password("admin123")
    admin.save()
    Profile.objects.get_or_create(user=admin, city="New Delhi", state="Delhi", target_stream="Computer Science")
    print("  [+] Admin Superuser active: admin@studzens.com (password: admin123)")

    # 3. Demo Student User
    student, _ = User.objects.get_or_create(
        email="student@studzens.com",
        defaults={
            "name": "Aarav Sharma",
            "role": Role.STUDENT,
        }
    )
    student.role = Role.STUDENT
    student.set_password("student123")
    student.save()
    Profile.objects.get_or_create(user=student, city="Bengaluru", state="Karnataka", target_stream="B.Tech CS", target_year=2026)
    print("  [+] Demo Student active: student@studzens.com (password: student123)")

    # 4. Entrance Exams
    viteee, _  = Exam.objects.get_or_create(name="VITEEE", defaults={"full_name": "Vellore Institute of Technology Engineering Entrance Examination", "level": "Institute"})
    srmjeee, _ = Exam.objects.get_or_create(name="SRMJEEE", defaults={"full_name": "SRM Joint Engineering Entrance Examination", "level": "Institute"})
    met, _     = Exam.objects.get_or_create(name="MET", defaults={"full_name": "Manipal Entrance Test", "level": "Institute"})
    bitsat, _  = Exam.objects.get_or_create(name="BITSAT", defaults={"full_name": "Birla Institute of Technology & Science Admission Test", "level": "National"})
    neet_ug, _ = Exam.objects.get_or_create(name="NEET UG", defaults={"full_name": "National Eligibility cum Entrance Test", "level": "National"})
    jee_main, _ = Exam.objects.get_or_create(name="JEE Main", defaults={"full_name": "Joint Entrance Examination (Main)", "level": "National"})
    print("  [+] Created Entrance Exams dataset (VITEEE, SRMJEEE, MET, BITSAT, NEET UG, JEE Main)")

    # 5. Colleges Dataset (VIT, SRM, Manipal, BITS Pilani)
    colleges_data = [
        # --- VIT GROUP ---
        {
            "name": "Vellore Institute of Technology, Vellore",
            "short_name": "VIT Vellore",
            "established_year": 1984,
            "city": "Vellore",
            "state": "Tamil Nadu",
            "tier": Tier.TIER_2,
            "ownership": Ownership.PRIVATE,
            "campus_size": "372 Acres",
            "faculty_count": 1800,
            "website": "https://vit.ac.in",
            "lat": 12.9692,
            "lng": 79.1559,
            "nirf_rank": 11,
            "avg_package_lpa": 9.2,
            "annual_fee_lpa": 1.98,
            "exams": [viteee],
            "programs": [
                {"name": "B.Tech CSE (Category 1)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 198000, "intake": 400},
                {"name": "B.Tech CSE (Category 2)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 307000, "intake": 350},
                {"name": "B.Tech CSE (Category 3)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 405000, "intake": 250},
                {"name": "B.Tech CSE (Category 4)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 448000, "intake": 150},
                {"name": "B.Tech CSE (Category 5)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 493000, "intake": 100},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 9.2, "highest_package": 102.0, "placement_rate": 84.0},
                {"year": 2023, "avg_package_lpa": 9.0, "highest_package": 102.0, "placement_rate": 86.0},
                {"year": 2022, "avg_package_lpa": 8.1, "highest_package": 75.0, "placement_rate": 83.0},
            ],
            "facilities": [{"name": "VITEEE 5-Category Fee System", "has_facility": True, "details": "Category 1 (₹1.98L/yr) to Category 5 (₹4.93L/yr) by VITEEE rank"}]
        },
        {
            "name": "Vellore Institute of Technology, Chennai",
            "short_name": "VIT Chennai",
            "established_year": 2010,
            "city": "Chennai",
            "state": "Tamil Nadu",
            "tier": Tier.TIER_2,
            "ownership": Ownership.PRIVATE,
            "campus_size": "192 Acres",
            "faculty_count": 850,
            "website": "https://chennai.vit.ac.in",
            "lat": 12.8406,
            "lng": 80.1534,
            "nirf_rank": 11,
            "avg_package_lpa": 8.5,
            "annual_fee_lpa": 1.98,
            "exams": [viteee],
            "programs": [
                {"name": "B.Tech CSE (Category 1)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 198000, "intake": 300},
                {"name": "B.Tech CSE (Category 2)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 307000, "intake": 250},
                {"name": "B.Tech CSE (Category 3)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 405000, "intake": 200},
                {"name": "B.Tech CSE (Category 4)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 448000, "intake": 100},
                {"name": "B.Tech CSE (Category 5)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 493000, "intake": 50},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 8.5, "highest_package": 75.0, "placement_rate": 82.0},
                {"year": 2023, "avg_package_lpa": 8.2, "highest_package": 75.0, "placement_rate": 84.0},
                {"year": 2022, "avg_package_lpa": 7.5, "highest_package": 60.0, "placement_rate": 80.0},
            ],
            "facilities": [{"name": "Centralized Placement Access", "has_facility": True, "details": "Shared dream company placement drives with VIT Vellore"}]
        },
        {
            "name": "Vellore Institute of Technology, AP (Amaravati)",
            "short_name": "VIT AP",
            "established_year": 2017,
            "city": "Amaravati",
            "state": "Andhra Pradesh",
            "tier": Tier.TIER_3,
            "ownership": Ownership.PRIVATE,
            "campus_size": "200 Acres",
            "faculty_count": 450,
            "website": "https://vitap.ac.in",
            "lat": 16.5417,
            "lng": 80.5158,
            "nirf_rank": 70,
            "avg_package_lpa": 7.3,
            "annual_fee_lpa": 1.98,
            "exams": [viteee],
            "programs": [
                {"name": "B.Tech CSE (Category 1)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 198000, "intake": 300},
                {"name": "B.Tech CSE (Category 2)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 307000, "intake": 250},
                {"name": "B.Tech CSE (Category 3)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 405000, "intake": 150},
                {"name": "B.Tech CSE (Category 4)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 448000, "intake": 100},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 7.3, "highest_package": 63.0, "placement_rate": 78.0},
                {"year": 2023, "avg_package_lpa": 7.0, "highest_package": 56.0, "placement_rate": 80.0},
                {"year": 2022, "avg_package_lpa": 6.3, "highest_package": 45.0, "placement_rate": 75.0},
            ],
            "facilities": [{"name": "Modern Tech Park & Hostels", "has_facility": True, "details": "High speed WiFi & air-conditioned dorms"}]
        },
        {
            "name": "Vellore Institute of Technology, Bhopal",
            "short_name": "VIT Bhopal",
            "established_year": 2017,
            "city": "Bhopal",
            "state": "Madhya Pradesh",
            "tier": Tier.TIER_3,
            "ownership": Ownership.PRIVATE,
            "campus_size": "350 Acres",
            "faculty_count": 400,
            "website": "https://vitbhopal.ac.in",
            "lat": 23.0768,
            "lng": 76.8523,
            "nirf_rank": 85,
            "avg_package_lpa": 6.8,
            "annual_fee_lpa": 1.98,
            "exams": [viteee],
            "programs": [
                {"name": "B.Tech CSE (Category 1)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 198000, "intake": 300},
                {"name": "B.Tech CSE (Category 2)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 307000, "intake": 250},
                {"name": "B.Tech CSE (Category 3)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 405000, "intake": 120},
                {"name": "B.Tech CSE (Category 4)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 448000, "intake": 80},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 6.8, "highest_package": 59.0, "placement_rate": 75.0},
                {"year": 2023, "avg_package_lpa": 6.5, "highest_package": 46.0, "placement_rate": 76.0},
                {"year": 2022, "avg_package_lpa": 5.9, "highest_package": 40.0, "placement_rate": 72.0},
            ],
            "facilities": [{"name": "AI Lab & Gaming Studio", "has_facility": True, "details": "Specialized AI/ML & Cyber Security studio"}]
        },

        # --- SRM GROUP ---
        {
            "name": "SRM Institute of Science and Technology, Kattankulathur",
            "short_name": "SRM KTR (Main Campus)",
            "established_year": 1985,
            "city": "Chennai",
            "state": "Tamil Nadu",
            "tier": Tier.TIER_2,
            "ownership": Ownership.PRIVATE,
            "campus_size": "250 Acres",
            "faculty_count": 1600,
            "website": "https://www.srmist.edu.in",
            "lat": 12.8231,
            "lng": 80.0442,
            "nirf_rank": 18,
            "avg_package_lpa": 7.7,
            "annual_fee_lpa": 3.0,
            "exams": [srmjeee],
            "programs": [
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 300000, "intake": 1500},
                {"name": "B.Tech CSE (AI & Machine Learning)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 350000, "intake": 400},
                {"name": "B.Tech CSE (Cyber Security)", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 325000, "intake": 200},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 7.7, "highest_package": 110.0, "placement_rate": 86.0},
                {"year": 2023, "avg_package_lpa": 7.5, "highest_package": 110.0, "placement_rate": 88.0},
                {"year": 2022, "avg_package_lpa": 6.8, "highest_package": 80.0, "placement_rate": 85.0},
            ],
            "facilities": [{"name": "Supercomputing Center & Tech Park", "has_facility": True, "details": "High performance GPU cluster & research labs"}]
        },
        {
            "name": "SRM Institute of Science and Technology, Ramapuram",
            "short_name": "SRM Ramapuram",
            "established_year": 2004,
            "city": "Chennai",
            "state": "Tamil Nadu",
            "tier": Tier.TIER_2,
            "ownership": Ownership.PRIVATE,
            "campus_size": "27 Acres",
            "faculty_count": 450,
            "website": "https://srmrmp.edu.in",
            "lat": 13.0312,
            "lng": 80.1812,
            "nirf_rank": 18,
            "avg_package_lpa": 6.5,
            "annual_fee_lpa": 2.5,
            "exams": [srmjeee],
            "programs": [
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 250000, "intake": 700},
                {"name": "B.Tech Information Technology", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 225000, "intake": 200},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 6.5, "highest_package": 42.0, "placement_rate": 80.0},
                {"year": 2023, "avg_package_lpa": 6.2, "highest_package": 40.0, "placement_rate": 82.0},
                {"year": 2022, "avg_package_lpa": 5.7, "highest_package": 35.0, "placement_rate": 78.0},
            ],
            "facilities": [{"name": "City Campus Infrastructure", "has_facility": True, "details": "Located in IT hub of Chennai with strong industry links"}]
        },
        {
            "name": "SRM Institute of Science and Technology, Vadapalani",
            "short_name": "SRM Vadapalani",
            "established_year": 2009,
            "city": "Chennai",
            "state": "Tamil Nadu",
            "tier": Tier.TIER_3,
            "ownership": Ownership.PRIVATE,
            "campus_size": "6 Acres",
            "faculty_count": 200,
            "website": "https://www.srmist.edu.in/vadapalani/",
            "lat": 13.0500,
            "lng": 80.2121,
            "nirf_rank": 18,
            "avg_package_lpa": 6.2,
            "annual_fee_lpa": 2.5,
            "exams": [srmjeee],
            "programs": [
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 250000, "intake": 400},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 6.2, "highest_package": 38.0, "placement_rate": 78.0},
                {"year": 2023, "avg_package_lpa": 5.9, "highest_package": 36.0, "placement_rate": 80.0},
                {"year": 2022, "avg_package_lpa": 5.4, "highest_package": 30.0, "placement_rate": 75.0},
            ],
            "facilities": [{"name": "Metro Connected Campus", "has_facility": True, "details": "Heart of Chennai city with metro connectivity"}]
        },
        {
            "name": "SRM Institute of Science and Technology, NCR Campus",
            "short_name": "SRM NCR Modinagar",
            "established_year": 1997,
            "city": "Ghaziabad",
            "state": "Uttar Pradesh",
            "tier": Tier.TIER_3,
            "ownership": Ownership.PRIVATE,
            "campus_size": "25 Acres",
            "faculty_count": 300,
            "website": "https://www.srmimtr.edu.in",
            "lat": 28.8342,
            "lng": 77.5833,
            "nirf_rank": 18,
            "avg_package_lpa": 5.8,
            "annual_fee_lpa": 2.1,
            "exams": [srmjeee],
            "programs": [
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 210000, "intake": 500},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 5.8, "highest_package": 35.0, "placement_rate": 74.0},
                {"year": 2023, "avg_package_lpa": 5.5, "highest_package": 32.0, "placement_rate": 76.0},
                {"year": 2022, "avg_package_lpa": 5.0, "highest_package": 28.0, "placement_rate": 71.0},
            ],
            "facilities": [{"name": "Delhi NCR Connectivity", "has_facility": True, "details": "Close proximity to Delhi NCR tech startups"}]
        },

        # --- MANIPAL (MAHE) GROUP ---
        {
            "name": "Manipal Institute of Technology, Manipal",
            "short_name": "MIT Manipal (Main Campus)",
            "established_year": 1957,
            "city": "Manipal",
            "state": "Karnataka",
            "tier": Tier.TIER_2,
            "ownership": Ownership.PRIVATE,
            "campus_size": "313 Acres",
            "faculty_count": 750,
            "website": "https://manipal.edu/mit.html",
            "lat": 13.3525,
            "lng": 74.7928,
            "nirf_rank": 61,
            "avg_package_lpa": 12.5,
            "annual_fee_lpa": 3.35,
            "exams": [met],
            "programs": [
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 335000, "intake": 240},
                {"name": "B.Tech Data Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 335000, "intake": 120},
                {"name": "B.Tech Electronics and Communication", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 310000, "intake": 200},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 12.5, "highest_package": 54.0, "placement_rate": 90.0},
                {"year": 2023, "avg_package_lpa": 12.0, "highest_package": 54.0, "placement_rate": 92.0},
                {"year": 2022, "avg_package_lpa": 10.8, "highest_package": 44.0, "placement_rate": 88.0},
            ],
            "facilities": [{"name": "Marena Indoor Sports Complex", "has_facility": True, "details": "World-class multi-storey sports arena"}]
        },
        {
            "name": "Manipal University, Jaipur",
            "short_name": "MUJ Jaipur",
            "established_year": 2011,
            "city": "Jaipur",
            "state": "Rajasthan",
            "tier": Tier.TIER_2,
            "ownership": Ownership.PRIVATE,
            "campus_size": "122 Acres",
            "faculty_count": 550,
            "website": "https://jaipur.manipal.edu",
            "lat": 26.8439,
            "lng": 75.5652,
            "nirf_rank": 76,
            "avg_package_lpa": 7.5,
            "annual_fee_lpa": 3.4,
            "exams": [met, jee_main],
            "programs": [
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 340000, "intake": 600},
                {"name": "B.Tech AI & Data Science", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 350000, "intake": 180},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 7.5, "highest_package": 85.0, "placement_rate": 85.0},
                {"year": 2023, "avg_package_lpa": 7.1, "highest_package": 55.0, "placement_rate": 86.0},
                {"year": 2022, "avg_package_lpa": 6.4, "highest_package": 40.0, "placement_rate": 82.0},
            ],
            "facilities": [{"name": "5-Star Standard Hostels", "has_facility": True, "details": "Resort style student housing and food court"}]
        },
        {
            "name": "Manipal Academy of Higher Education, Bengaluru",
            "short_name": "MAHE Bengaluru",
            "established_year": 2021,
            "city": "Bengaluru",
            "state": "Karnataka",
            "tier": Tier.TIER_2,
            "ownership": Ownership.PRIVATE,
            "campus_size": "80 Acres",
            "faculty_count": 300,
            "website": "https://manipal.edu/bengaluru.html",
            "lat": 13.1362,
            "lng": 77.5684,
            "nirf_rank": 61,
            "avg_package_lpa": 9.0,
            "annual_fee_lpa": 3.5,
            "exams": [met],
            "programs": [
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 350000, "intake": 300},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 9.0, "highest_package": 45.0, "placement_rate": 86.0},
                {"year": 2023, "avg_package_lpa": 8.4, "highest_package": 40.0, "placement_rate": 85.0},
                {"year": 2022, "avg_package_lpa": 7.8, "highest_package": 35.0, "placement_rate": 80.0},
            ],
            "facilities": [{"name": "Yelahanka Silicon Campus", "has_facility": True, "details": "Direct access to Bangalore IT Corridor"}]
        },

        # --- BITS PILANI GROUP ---
        {
            "name": "Birla Institute of Technology and Science, Pilani",
            "short_name": "BITS Pilani (Main Campus)",
            "established_year": 1964,
            "city": "Pilani",
            "state": "Rajasthan",
            "tier": Tier.TIER_1,
            "ownership": Ownership.PRIVATE,
            "campus_size": "328 Acres",
            "faculty_count": 700,
            "website": "https://www.bits-pilani.ac.in",
            "lat": 28.3639,
            "lng": 75.5869,
            "nirf_rank": 25,
            "avg_package_lpa": 20.5,
            "annual_fee_lpa": 5.41,
            "exams": [bitsat],
            "programs": [
                {"name": "B.E. Computer Science", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 541000, "intake": 140},
                {"name": "B.E. Electrical & Electronics", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 541000, "intake": 160},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 20.5, "highest_package": 60.7, "placement_rate": 95.0},
                {"year": 2023, "avg_package_lpa": 19.8, "highest_package": 60.0, "placement_rate": 96.0},
                {"year": 2022, "avg_package_lpa": 18.0, "highest_package": 50.0, "placement_rate": 94.0},
            ],
            "facilities": [{"name": "Zero Reservation Policy", "has_facility": True, "details": "100% merit-based admissions through BITSAT"}]
        },
        {
            "name": "Birla Institute of Technology and Science, Goa",
            "short_name": "BITS Goa",
            "established_year": 2004,
            "city": "Zuarinagar",
            "state": "Goa",
            "tier": Tier.TIER_1,
            "ownership": Ownership.PRIVATE,
            "campus_size": "180 Acres",
            "faculty_count": 350,
            "website": "https://www.bits-pilani.ac.in/goa/",
            "lat": 15.3911,
            "lng": 73.8782,
            "nirf_rank": 25,
            "avg_package_lpa": 19.2,
            "annual_fee_lpa": 5.41,
            "exams": [bitsat],
            "programs": [
                {"name": "B.E. Computer Science", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 541000, "intake": 120},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 19.2, "highest_package": 60.0, "placement_rate": 93.0},
                {"year": 2023, "avg_package_lpa": 18.5, "highest_package": 58.0, "placement_rate": 94.0},
                {"year": 2022, "avg_package_lpa": 17.2, "highest_package": 48.0, "placement_rate": 91.0},
            ],
            "facilities": [{"name": "Zuari River View Campus", "has_facility": True, "details": "State of the art innovation center & labs"}]
        },
        {
            "name": "Birla Institute of Technology and Science, Hyderabad",
            "short_name": "BITS Hyderabad",
            "established_year": 2008,
            "city": "Hyderabad",
            "state": "Telangana",
            "tier": Tier.TIER_1,
            "ownership": Ownership.PRIVATE,
            "campus_size": "200 Acres",
            "faculty_count": 400,
            "website": "https://www.bits-pilani.ac.in/hyderabad/",
            "lat": 17.5449,
            "lng": 78.5718,
            "nirf_rank": 25,
            "avg_package_lpa": 18.8,
            "annual_fee_lpa": 5.41,
            "exams": [bitsat],
            "programs": [
                {"name": "B.E. Computer Science", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 541000, "intake": 130},
            ],
            "placements": [
                {"year": 2024, "avg_package_lpa": 18.8, "highest_package": 60.0, "placement_rate": 92.5},
                {"year": 2023, "avg_package_lpa": 18.0, "highest_package": 57.0, "placement_rate": 93.5},
                {"year": 2022, "avg_package_lpa": 16.8, "highest_package": 46.0, "placement_rate": 90.0},
            ],
            "facilities": [{"name": "Shamirpet Innovation Park", "has_facility": True, "details": "Dedicated incubation center for student startups"}]
        },
    ]

    for data in colleges_data:
        exams_list = data.pop("exams", [])
        programs_list = data.pop("programs", [])
        placements_list = data.pop("placements", [])
        facilities_list = data.pop("facilities", [])

        college, created = College.objects.get_or_create(
            name=data["name"],
            defaults=data
        )

        for exam in exams_list:
            CollegeExam.objects.get_or_create(college=college, exam=exam)

        for prog in programs_list:
            Program.objects.get_or_create(
                college=college,
                name=prog["name"],
                defaults=prog
            )

        for plc in placements_list:
            Placement.objects.get_or_create(
                college=college,
                year=plc["year"],
                defaults=plc
            )

        for fac in facilities_list:
            Facility.objects.get_or_create(
                college=college,
                name=fac["name"],
                defaults=fac
            )

        print(f"  [+] Created College: {college.short_name}")

    print(f"[SUCCESS] Database re-seeded with {len(colleges_data)} top private university campuses (VIT, SRM, Manipal, BITS)!")

if __name__ == "__main__":
    seed()

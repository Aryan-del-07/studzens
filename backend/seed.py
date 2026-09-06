"""
seed.py — Populates rich real Indian college dataset for Studzens (Django backend)
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
    print("[*] Seeding Studzens database with expanded real Indian college dataset...")

    # 1. Admin User
    admin, created = User.objects.get_or_create(
        email="admin@studzens.com",
        defaults={
            "name": "Admin User",
            "role": Role.ADMIN,
            "is_staff": True,
            "is_superuser": True,
        }
    )
    if created:
        admin.set_password("admin123")
        admin.save()
        Profile.objects.get_or_create(user=admin, city="New Delhi", state="Delhi", target_stream="Computer Science")
        print("  [+] Created Superuser: admin@studzens.com (password: admin123)")

    # 2. Demo Student User
    student, created = User.objects.get_or_create(
        email="student@studzens.com",
        defaults={
            "name": "Aarav Sharma",
            "role": Role.STUDENT,
        }
    )
    if created:
        student.set_password("student123")
        student.save()
        Profile.objects.get_or_create(user=student, city="Bengaluru", state="Karnataka", target_stream="B.Tech CS", target_year=2026)
        print("  [+] Created Demo Student: student@studzens.com (password: student123)")

    # 3. Entrance Exams
    jee_adv, _  = Exam.objects.get_or_create(name="JEE Advanced", defaults={"full_name": "Joint Entrance Examination (Advanced)", "level": "National"})
    jee_main, _ = Exam.objects.get_or_create(name="JEE Main", defaults={"full_name": "Joint Entrance Examination (Main)", "level": "National"})
    bitsat, _   = Exam.objects.get_or_create(name="BITSAT", defaults={"full_name": "Birla Institute of Technology & Science Admission Test", "level": "National"})
    ugee, _     = Exam.objects.get_or_create(name="UGEE", defaults={"full_name": "Undergraduate Engineering Entrance Examination", "level": "Institute"})
    neet_ug, _  = Exam.objects.get_or_create(name="NEET UG", defaults={"full_name": "National Eligibility cum Entrance Test", "level": "National"})
    viteee, _   = Exam.objects.get_or_create(name="VITEEE", defaults={"full_name": "Vellore Institute of Technology Engineering Entrance Examination", "level": "Institute"})
    met, _      = Exam.objects.get_or_create(name="MET", defaults={"full_name": "Manipal Entrance Test", "level": "Institute"})
    comedk, _   = Exam.objects.get_or_create(name="COMEDK UGET", defaults={"full_name": "Consortium of Medical, Engineering and Dental Colleges of Karnataka", "level": "State"})
    print("  [+] Created Entrance Exams dataset")

    # 4. Colleges Dataset
    colleges_data = [
        # IITs
        {
            "name": "Indian Institute of Technology Bombay",
            "short_name": "IIT Bombay",
            "established_year": 1958,
            "city": "Mumbai",
            "state": "Maharashtra",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "550 Acres",
            "faculty_count": 650,
            "website": "https://www.iitb.ac.in",
            "lat": 19.1334,
            "lng": 72.9133,
            "nirf_rank": 3,
            "avg_package_lpa": 23.5,
            "annual_fee_lpa": 2.2,
            "exams": [jee_adv],
            "programs": [
                {"name": "Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 220000, "intake": 140},
                {"name": "Electrical Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 220000, "intake": 160},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 23.5, "highest_package": 120.0, "placement_rate": 91.5}],
            "facilities": [{"name": "Hostel & Dining", "has_facility": True, "details": "18 residential hostels"}]
        },
        {
            "name": "Indian Institute of Technology Delhi",
            "short_name": "IIT Delhi",
            "established_year": 1961,
            "city": "New Delhi",
            "state": "Delhi",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "320 Acres",
            "faculty_count": 600,
            "website": "https://home.iitd.ac.in",
            "lat": 28.5450,
            "lng": 77.1926,
            "nirf_rank": 2,
            "avg_package_lpa": 24.1,
            "annual_fee_lpa": 2.25,
            "exams": [jee_adv],
            "programs": [
                {"name": "Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 225000, "intake": 99},
                {"name": "Artificial Intelligence & Data Science", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 225000, "intake": 40},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 24.1, "highest_package": 130.0, "placement_rate": 92.0}],
            "facilities": [{"name": "Central Library", "has_facility": True, "details": "300,000+ volumes"}]
        },
        {
            "name": "Indian Institute of Technology Madras",
            "short_name": "IIT Madras",
            "established_year": 1959,
            "city": "Chennai",
            "state": "Tamil Nadu",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "630 Acres",
            "faculty_count": 590,
            "website": "https://www.iitm.ac.in",
            "lat": 12.9915,
            "lng": 80.2337,
            "nirf_rank": 1,
            "avg_package_lpa": 22.0,
            "annual_fee_lpa": 2.1,
            "exams": [jee_adv],
            "programs": [
                {"name": "Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 210000, "intake": 85},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 22.0, "highest_package": 110.0, "placement_rate": 90.0}],
            "facilities": [{"name": "IITM Research Park", "has_facility": True, "details": "Pioneering university research park"}]
        },
        {
            "name": "Indian Institute of Technology Kharagpur",
            "short_name": "IIT Kharagpur",
            "established_year": 1951,
            "city": "Kharagpur",
            "state": "West Bengal",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "2100 Acres",
            "faculty_count": 720,
            "website": "https://www.iitkgp.ac.in",
            "lat": 22.3193,
            "lng": 87.3099,
            "nirf_rank": 6,
            "avg_package_lpa": 21.2,
            "annual_fee_lpa": 2.15,
            "exams": [jee_adv],
            "programs": [
                {"name": "Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 215000, "intake": 110},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 21.2, "highest_package": 105.0, "placement_rate": 89.5}],
            "facilities": [{"name": "Nehru Museum & Central Library", "has_facility": True, "details": "Largest academic campus in India"}]
        },
        {
            "name": "Indian Institute of Technology Kanpur",
            "short_name": "IIT Kanpur",
            "established_year": 1959,
            "city": "Kanpur",
            "state": "Uttar Pradesh",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "1055 Acres",
            "faculty_count": 550,
            "website": "https://www.iitk.ac.in",
            "lat": 26.5123,
            "lng": 80.2329,
            "nirf_rank": 4,
            "avg_package_lpa": 23.1,
            "annual_fee_lpa": 2.2,
            "exams": [jee_adv],
            "programs": [
                {"name": "Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 220000, "intake": 115},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 23.1, "highest_package": 115.0, "placement_rate": 91.0}],
            "facilities": [{"name": "Airstrip & Flight Lab", "has_facility": True, "details": "Own 1000m flight runway and aircraft"}]
        },
        # BITS Campuses
        {
            "name": "Birla Institute of Technology and Science, Pilani",
            "short_name": "BITS Pilani",
            "established_year": 1964,
            "city": "Pilani",
            "state": "Rajasthan",
            "tier": Tier.TIER_1,
            "ownership": Ownership.PRIVATE,
            "campus_size": "328 Acres",
            "faculty_count": 450,
            "website": "https://www.bits-pilani.ac.in",
            "lat": 28.3639,
            "lng": 75.5870,
            "nirf_rank": 25,
            "avg_package_lpa": 20.8,
            "annual_fee_lpa": 5.5,
            "exams": [bitsat],
            "programs": [
                {"name": "B.E. Computer Science", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 550000, "intake": 200},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 20.8, "highest_package": 60.0, "placement_rate": 89.0}],
            "facilities": [{"name": "Practice School System", "has_facility": True, "details": "6-month corporate internship"}]
        },
        {
            "name": "BITS Pilani, K K Birla Goa Campus",
            "short_name": "BITS Goa",
            "established_year": 2004,
            "city": "Zuarinagar",
            "state": "Goa",
            "tier": Tier.TIER_1,
            "ownership": Ownership.PRIVATE,
            "campus_size": "180 Acres",
            "faculty_count": 220,
            "website": "https://www.bits-pilani.ac.in/goa/",
            "lat": 15.3905,
            "lng": 73.8770,
            "nirf_rank": 27,
            "avg_package_lpa": 19.5,
            "annual_fee_lpa": 5.5,
            "exams": [bitsat],
            "programs": [
                {"name": "B.E. Computer Science", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 550000, "intake": 160},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 19.5, "highest_package": 54.0, "placement_rate": 88.0}],
            "facilities": [{"name": "Coastal Research Hub", "has_facility": True, "details": "Supercomputing facility & oceanography lab"}]
        },
        # IIITs
        {
            "name": "International Institute of Information Technology, Hyderabad",
            "short_name": "IIIT Hyderabad",
            "established_year": 1998,
            "city": "Hyderabad",
            "state": "Telangana",
            "tier": Tier.TIER_1,
            "ownership": Ownership.SEMI_GOVERNMENT,
            "campus_size": "66 Acres",
            "faculty_count": 120,
            "website": "https://www.iiit.ac.in",
            "lat": 17.4455,
            "lng": 78.3489,
            "nirf_rank": 55,
            "avg_package_lpa": 30.2,
            "annual_fee_lpa": 4.0,
            "exams": [jee_main, ugee],
            "programs": [
                {"name": "B.Tech Computer Science & Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 400000, "intake": 150},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 30.2, "highest_package": 102.0, "placement_rate": 98.0}],
            "facilities": [{"name": "Research Centers", "has_facility": True, "details": "CVIT, LTRC, SERC world-class AI/ML research labs"}]
        },
        {
            "name": "International Institute of Information Technology, Bangalore",
            "short_name": "IIIT Bangalore",
            "established_year": 1999,
            "city": "Bengaluru",
            "state": "Karnataka",
            "tier": Tier.TIER_1,
            "ownership": Ownership.SEMI_GOVERNMENT,
            "campus_size": "9 Acres",
            "faculty_count": 85,
            "website": "https://www.iiitb.ac.in",
            "lat": 12.8449,
            "lng": 77.6632,
            "nirf_rank": 74,
            "avg_package_lpa": 27.5,
            "annual_fee_lpa": 3.8,
            "exams": [jee_main],
            "programs": [
                {"name": "iMTech Computer Science", "type": ProgramType.MTECH, "duration": 5, "annual_fee": 380000, "intake": 120},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 27.5, "highest_package": 80.0, "placement_rate": 96.0}],
            "facilities": [{"name": "Electronic City Tech Hub", "has_facility": True, "details": "Proximity to 200+ global tech giants"}]
        },
        # NITs
        {
            "name": "National Institute of Technology Tiruchirappalli",
            "short_name": "NIT Trichy",
            "established_year": 1964,
            "city": "Tiruchirappalli",
            "state": "Tamil Nadu",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "800 Acres",
            "faculty_count": 350,
            "website": "https://www.nitt.edu",
            "lat": 10.7589,
            "lng": 78.8132,
            "nirf_rank": 9,
            "avg_package_lpa": 16.5,
            "annual_fee_lpa": 1.45,
            "exams": [jee_main],
            "programs": [
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 145000, "intake": 115},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 16.5, "highest_package": 52.8, "placement_rate": 93.4}],
            "facilities": [{"name": "Siemens CoE", "has_facility": True, "details": "Advanced manufacturing research center"}]
        },
        {
            "name": "National Institute of Technology Karnataka, Surathkal",
            "short_name": "NIT Surathkal",
            "established_year": 1960,
            "city": "Mangaluru",
            "state": "Karnataka",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "295 Acres",
            "faculty_count": 320,
            "website": "https://www.nitk.ac.in",
            "lat": 13.0108,
            "lng": 74.7943,
            "nirf_rank": 12,
            "avg_package_lpa": 15.9,
            "annual_fee_lpa": 1.45,
            "exams": [jee_main],
            "programs": [
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 145000, "intake": 110},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 15.9, "highest_package": 54.5, "placement_rate": 92.8}],
            "facilities": [{"name": "Private Beach & Lighthouse", "has_facility": True, "details": "Only Indian university campus with a private beach"}]
        },
        # Delhi State Universities
        {
            "name": "Delhi Technological University",
            "short_name": "DTU",
            "established_year": 1941,
            "city": "New Delhi",
            "state": "Delhi",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "164 Acres",
            "faculty_count": 400,
            "website": "http://dtu.ac.in",
            "lat": 28.7499,
            "lng": 77.1170,
            "nirf_rank": 29,
            "avg_package_lpa": 15.8,
            "annual_fee_lpa": 2.19,
            "exams": [jee_main],
            "programs": [
                {"name": "Computer Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 219000, "intake": 360},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 15.8, "highest_package": 82.0, "placement_rate": 88.0}],
            "facilities": [{"name": "Innovation Foundation", "has_facility": True, "details": "DTU-IIF startup incubator"}]
        },
        {
            "name": "Netaji Subhas University of Technology",
            "short_name": "NSUT",
            "established_year": 1983,
            "city": "New Delhi",
            "state": "Delhi",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "145 Acres",
            "faculty_count": 310,
            "website": "http://nsut.ac.in",
            "lat": 28.6074,
            "lng": 77.0371,
            "nirf_rank": 60,
            "avg_package_lpa": 15.2,
            "annual_fee_lpa": 2.19,
            "exams": [jee_main],
            "programs": [
                {"name": "Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 219000, "intake": 300},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 15.2, "highest_package": 64.0, "placement_rate": 87.0}],
            "facilities": [{"name": "Incubation Center", "has_facility": True, "details": "TBI-NSUT venture studio"}]
        },
        # Medical
        {
            "name": "All India Institute of Medical Sciences, New Delhi",
            "short_name": "AIIMS New Delhi",
            "established_year": 1956,
            "city": "New Delhi",
            "state": "Delhi",
            "tier": Tier.TIER_1,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "115 Acres",
            "faculty_count": 800,
            "website": "https://www.aiims.edu",
            "lat": 28.5672,
            "lng": 77.2100,
            "nirf_rank": 1,
            "avg_package_lpa": 18.0,
            "annual_fee_lpa": 0.02,
            "exams": [neet_ug],
            "programs": [
                {"name": "MBBS", "type": ProgramType.MBBS, "duration": 5, "annual_fee": 1628, "intake": 125},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 18.0, "highest_package": 35.0, "placement_rate": 100.0}],
            "facilities": [{"name": "Apex Trauma Center", "has_facility": True, "details": "Premier medical research hospital in South Asia"}]
        },
        # Top Private & State Institutions
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
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 198000, "intake": 1200},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 9.2, "highest_package": 102.0, "placement_rate": 84.0}],
            "facilities": [{"name": "Smart Classrooms", "has_facility": True, "details": "Fully air-conditioned campus"}]
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
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 198000, "intake": 900},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 8.5, "highest_package": 75.0, "placement_rate": 82.0}],
            "facilities": [{"name": "Central Library & Labs", "has_facility": True, "details": "State of the art IT & AI infrastructure"}]
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
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 198000, "intake": 800},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 7.3, "highest_package": 63.0, "placement_rate": 78.0}],
            "facilities": [{"name": "Student Activity Center", "has_facility": True, "details": "Modern residential & sports amenities"}]
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
                {"name": "B.Tech Computer Science and Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 198000, "intake": 750},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 6.8, "highest_package": 59.0, "placement_rate": 75.0}],
            "facilities": [{"name": "AI Lab & Hackspace", "has_facility": True, "details": "Specialized AI/ML learning environment"}]
        },
        {
            "name": "COEP Technological University, Pune",
            "short_name": "COEP Pune",
            "established_year": 1854,
            "city": "Pune",
            "state": "Maharashtra",
            "tier": Tier.TIER_2,
            "ownership": Ownership.GOVERNMENT,
            "campus_size": "36 Acres",
            "faculty_count": 220,
            "website": "https://www.coep.org.in",
            "lat": 18.5293,
            "lng": 73.8565,
            "nirf_rank": 73,
            "avg_package_lpa": 11.5,
            "annual_fee_lpa": 1.15,
            "exams": [jee_main],
            "programs": [
                {"name": "B.Tech Computer Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 115000, "intake": 120},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 11.5, "highest_package": 50.5, "placement_rate": 91.0}],
            "facilities": [{"name": "Boat Club", "has_facility": True, "details": "Historic Mula river boat club"}]
        },
        {
            "name": "RV College of Engineering, Bengaluru",
            "short_name": "RVCE",
            "established_year": 1963,
            "city": "Bengaluru",
            "state": "Karnataka",
            "tier": Tier.TIER_2,
            "ownership": Ownership.PRIVATE,
            "campus_size": "52 Acres",
            "faculty_count": 280,
            "website": "https://rvce.edu.in",
            "lat": 12.9237,
            "lng": 77.4987,
            "nirf_rank": 96,
            "avg_package_lpa": 14.2,
            "annual_fee_lpa": 2.5,
            "exams": [comedk],
            "programs": [
                {"name": "Computer Science & Engineering", "type": ProgramType.BTECH, "duration": 4, "annual_fee": 250000, "intake": 200},
            ],
            "placements": [{"year": 2024, "avg_package_lpa": 14.2, "highest_package": 62.0, "placement_rate": 92.0}],
            "facilities": [{"name": "Centre of Excellence in IoT", "has_facility": True, "details": "Supported by Bosch"}]
        }
    ]

    for c_data in colleges_data:
        exams_list = c_data.pop("exams", [])
        programs_list = c_data.pop("programs", [])
        placements_list = c_data.pop("placements", [])
        facilities_list = c_data.pop("facilities", [])

        college, c_created = College.objects.get_or_create(
            name=c_data["name"],
            defaults=c_data
        )

        for ex in exams_list:
            CollegeExam.objects.get_or_create(college=college, exam=ex)

        for prog in programs_list:
            Program.objects.get_or_create(college=college, name=prog["name"], defaults=prog)

        for plc in placements_list:
            Placement.objects.get_or_create(college=college, year=plc["year"], defaults=plc)

        for fac in facilities_list:
            Facility.objects.get_or_create(college=college, name=fac["name"], defaults=fac)

        if c_created:
            print(f"  [+] Created College: {college.short_name or college.name}")

    # Reviews
    iitb = College.objects.get(short_name="IIT Bombay")
    Review.objects.get_or_create(
        user=student,
        college=iitb,
        defaults={
            "rating": 5,
            "content": "Unmatched research opportunities, competitive environment, and amazing alumni network!",
        }
    )

    # Bookmarks
    Bookmark.objects.get_or_create(
        user=student,
        college=iitb,
        defaults={"category": BookmarkCategory.DREAM}
    )

    print(f"[SUCCESS] Database seeded with {College.objects.count()} real Indian colleges!")

if __name__ == "__main__":
    seed()
